//======================================================================================================
//                                  Step 2: After created Contact.js model
//======================================================================================================
const express = require('express');
const router = express.Router();
//Bring everytime to protect route
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');


const User = require('../models/User');
const Contact = require('../models/Contact');


// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get('/', auth, async (req, res) =>{
    //find user id and sort with the most recent contact
    try{ 
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/contacts
// @desc    Add new contacts
// @access  Private
//use [] for multiple middlewares
router.post(
    '/',
    [ 
        auth, 
        [
            check('name', 'Name is required')
                .not()
                .isEmpty()]
        ], 
        async (req, res) =>{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { name, email, phone,type } = req.body;

            try{
                const newContact = new Contact({
                    name,
                    email,
                    phone,
                    type,
                    user: req.user.id //we get from auth 
                });
                //*bug: forgot to put .save() here
                const contact = await newContact.save();

                res.json(contact);
            } catch (err) {
                console.error(er.message);
                res.status(500).send('Server Error');
            }
});

// @route   PUT api/contacts/:id
// @desc    Update contact
// @access  Private
router.put('/:id',auth, async (req, res) =>{
    const { name, email, phone,type } = req.body;

    //Build contact object: check if submitted
    const contactFields = {};
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try {
        //Find the contact by id
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({msg: 'Contact not found' });

        //Make sure user owns contacst
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'Not authorized' })
        }
        //calling Contact model
        contact = await Contact.findByIdAndUpdate(req.params.id,
            { $set: contactFields }, //set as we described above
            { new: true }); //if contact not exist, create it

            res.json(contact); //send update contact
            

    } catch(err) {
        console.error(er.message);
        res.status(500).send('Server Error')
    }

});

// @route   DELETE api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', auth, async (req, res) =>{
    try {
        //Find the contact by id
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({msg: 'Contact not found' });

        //Make sure user owns contacst
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'Not authorized' })
        }

        await Contact.findByIdAndRemove(req.params.id);
       

        res.json({ msg: 'Contact removed' }); 
            
    } catch(err) {
        console.error(er.message);
        res.status(500).send('Server Error')
    }
});

module.exports = router;

//======================================================================================================
//                                  Step 1: Boiler plate
//======================================================================================================
// const express = require('express');
// const router = express.Router();


// // @route   GET api/contacts
// // @desc    Get all users contacts
// // @access  Private
// router.get('/', (req, res) =>{
//     res.send('Get all contracts')
// });

// // @route   POST api/contacts
// // @desc    Add new contacts
// // @access  Private
// router.post('/', (req, res) =>{
//     res.send('Add contract')
// });

// // @route   PUT api/contacts/:id
// // @desc    Update contact
// // @access  Private
// router.put('/:id', (req, res) =>{
//     res.send('Update contract')
// });

// // @route   DELETE api/contacts/:id
// // @desc    Delete contact
// // @access  Private
// router.delete('/:id', (req, res) =>{
//     res.send('Delete contract')
// });

// module.exports = router;