//Log in, grab JWT from users.js
//created auth.js middleware
//======================================================================================================
//                                  Step 3:secure route with auth token
//                  
//======================================================================================================
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.MY_jwtSecret;
//Bring middleware
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

//=============================== Validate login and user
// @route   GET api/auth
// @desc    Get logged in user
// @access  Private

//Bring in middleware with 'auth'
router.get('/', auth, async (req, res) =>{
    try{ //-password, we don't want to return password
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//============================== Authenticatic the user
// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post(
    '/', 
    [check('email', 'Please include a valid email').isEmail(),
    check('password','Password is required').exists()
],
async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        //=================  Check Email ==============
        let user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ msg:'Invalid Credentails' })
        }
        //================  Check Password with bcrpty.compare ==============
        //if there is a user, we want to check password, 
        //using bcypt.compare(plain text password, hashed password of found user)
        const isMatch = await bcrypt.compare(password, user.password);

        //return will be true or false from isMatch
        //if not match
        if(!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' })
        }

        //================ JWT ==============
        const payload = {
            user:{
                id:user.id
            }
        }
        //jwt.sign(payload, secret(we need to hide it in another file), object option, call back)
        jwt.sign(
            payload, 
            secret, 
            {
            expiresIn: 360000
            }, 
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
    }
);

module.exports = router;

//======================================================================================================
//                                  Step 2:check authentication with express-validator
//                     check password with bcrypt.compare, get token from JWT if password is corrected
//======================================================================================================
// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const secret = process.env.MY_jwtSecret;
// const { check, validationResult } = require('express-validator');

// const User = require('../models/User');

// //=============================== Validate login and user
// // @route   GET api/auth
// // @desc    Get logged in user
// // @access  Private
// router.get('/', (req, res) =>{
//     res.send('Get logged in user')
// });

// //============================== Authenticatic the user
// // @route   POST api/auth
// // @desc    Auth user & get token
// // @access  Public
// router.post('/', [
//     check('email', 'Please include in a valid email').isEmail(),
//     check('password','Password is required').exists()
// ],
// async (req, res) =>{
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body;

//     try {
//         //=================  Check Email ==============
//         let user = await User.findOne({ email });

//         if(!user) {
//             return res.status(400).json({ msg:'Invalid Credentails' })
//         }
//         //================  Check Password with bcrpty.compare ==============
//         //if there is a user, we want to check password, 
//         //using bcypt.compare(plain text password, hashed password of found user)
//         const isMatch = await bcrypt.compare(password, user.password);

//         //return will be true or false from isMatch
//         //if not match
//         if(!isMatch) {
//             return res.status(400).json({ msg: 'Invalid Credentials' })
//         }

//         //================ JWT ==============
//         const payload = {
//             user:{
//                 id:user.id
//             }
//         }
//         //jwt.sign(payload, secret(we need to hide it in another file), object option, call back)
//         jwt.sign(
//             payload, 
//             secret, 
//             {
//             expiresIn: 360000
//             }, 
//             (err, token) => {
//                 if(err) throw err;
//                 res.json({ token });
//             }
//         );

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error')
//     }
//     }
// );

// module.exports = router;
//======================================================================================================
//                                  Step 1: Boiler plate
//======================================================================================================
// const express = require('express');
// const router = express.Router();

// // @route   GET api/auth
// // @desc    Get logged in user
// // @access  Private
// router.get('/', (req, res) =>{
//     res.send('Get logged in user')
// });

// // @route   POST api/auth
// // @desc    Auth user & get token
// // @access  Public
// router.post('/', (req, res) =>{
//     res.send('Log in user')
// });

// module.exports = router;