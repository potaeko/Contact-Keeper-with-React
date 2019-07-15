///Registration for user

//======================================================================================================
//                                   Step 5: JWL Jason Web Token
//======================================================================================================
const express = require('express');
const router = express.Router();
//Hash password
const bcrypt = require('bcryptjs');
//Jason Web Token, JWT
const jwt = require('jsonwebtoken');
//Validator
const { check, validationResult } = require('express-validator');
//import User model
const User = require('../models/User');
//bring in secret
const secret = process.env.MY_jwtSecret;

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
    '/', 
    [
        check('name', 'Please add name')
            .not()
            .isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({ min:6 })
    ],
    //validation
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //destructor pull from req.body that we assigned
        const { name, email, password } = req.body;

        try{
            //check if there is a user with that email, User model with mongoose method 'findOne'
            let user = await User.findOne({ email }); 
            //if user exist, return 
            if(user){
                return res.status(400).json({msg: 'User already exist'});
            }
            //if user doesn't exist, create new user with User model
            user = new User({
                name,
                email,
                password
            });

            //======= Hash Password =======
            //before we save, we need to bcrypt (hash) password with bcryptjs, 10 is secure level of salt
            const salt = await bcrypt.genSalt(10);
            //take salt and hash the password for user password, await for promise
            user.password = await bcrypt.hash(password, salt);
            //Test, save in database
            await user.save();
            // res.send('User saved')

            //======= Send to JWT =========
            const payload = {
                user:{
                    id:user.id
                }
            }
            //jwt.sign(payload, secret(we need to hide it in another file), object option, call back)
            jwt.sign(payload, secret, {
                expiresIn: 360000
            }, (err, token) => {
                if(err) throw err;
                res.json({ token });
            });

        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;



//======================================================================================================
//                                   Step 4: Set Express validation 
//                  Hash password with bcryptjs, test on postman and cloud mongodb
//======================================================================================================
// const express = require('express');
// const router = express.Router();
// // hash password
// const bcrypt = require('bcryptjs');
// // express-validator
// const { check, validationResult } = require('express-validator');
// const User = require('../models/User');
// router.post(
//     '/', 
//     [
//         check('name', 'Please add name')
//             .not()
//             .isEmpty(),
//         check('email', 'Please include a valid email').isEmail(),
//         check(
//             'password',
//             'Please enter a password with 6 or more characters'
//         ).isLength({ min:6 })
//     ],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         //#4 destructor pull from req.body that we assigned
//         const { name, email, password } = req.body;

//         try{
//             //check if there is a user with that email, User model with mongoose method 'findOne'
//             let user = await User.findOne({ email }); 
//             //if user exist, return 
//             if(user){
//                 return res.status(400).json({msg: 'User already exist'});
//             }
//             //if user doesn't exist, create new user with User model
//             user = new User({
//                 name,
//                 email,
//                 password
//             });

//             //#5 before we save, we need to bcrypt (hash) password with bcryptjs, 10 is secure level of salt
//             const salt = await bcrypt.genSalt(10);
//             //take salt and hash the password for user password, await for promise
//             user.password = await bcrypt.hash(password, salt);
//             //Test, save in database
//             await user.save();
//             res.send('User saved')

//         } catch (err) {
//             console.log(err.message);
//             res.status(500).send('Server Error');
//         }
//     }
// );
// module.exports = router;

//======================================================================================================
//                      Step 3: Set Express validation and test on postman
//======================================================================================================
// const express = require('express');
// const router = express.Router();
// // express-validator
// const { check, validationResult } = require('express-validator');
// const User = require('../models/User');
// router.post(
//     '/', 
//     [
//         check('name', 'Please add name')
//             .not()
//             .isEmpty(),
//         check('email', 'Please include a valid email').isEmail(),
//         check(
//             'password',
//             'Please enter a password with 6 or more characters'
//         ).isLength({ min:6 })
//     ],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//             res.send('passed'); //test on postman to see if we get the respond
//         }
//     );
// module.exports = router;    
//======================================================================================================
//              Step 2: Init middleware in server.js : app.use(express.json({ extended:false })); 
//                              Create User.js model to use mongoose
//======================================================================================================
// const express = require('express');
// const router = express.Router();
// //import User model
// const User = require('../models/User');

// // @route   POST api/users
// // @desc    Register a user
// // @access  Public

// router.post('/', (req, res) => {
//      //we need to add middleware in server.js to use req.body, and test out on postman
//      res.send(req.body);
// });
    
// module.exports = router;

//======================================================================================================
//                                  Step 1: Boiler plate
//======================================================================================================
// const express = require('express');
// const router = express.Router();

// // @route   POST api/users
// // @desc    Register a user
// // @access  Public
// router.post('/', (req, res) => {
//     res.send('Register a user')
// });
    
// module.exports = router;