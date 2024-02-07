
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require('dotenv').config();
// singn uproute haindeler

exports.signup = async (req, res) => {
    try {
        // get data
        const {name,email,password,profile} = req.body;
        // check if user is alrady exits
        const existUsers = await User.findOne({email});

        if(existUsers) {
            return res.status(400).json({
                success : false,
                message : "User already exists"
            });
        }


        let hashedPassword;

        try {
            hashedPassword = await bcrypt.hash(password,10);
        } catch (error) {
            return res.status(400).json({
                success : false,
                message : "erro in hasing password"
            })
            
        }

        const users = await User.create({name,email,password:hashedPassword,profile});

        return res.status(200).json({
            success : true,
            users : users,
            message : "User created successfully",

        })
      
    } catch (error) {

        console.error(error);
        console.error(error.message);
        res.status(500).json({
            success : false,
            message : "User cannot be rasistered , please try again"
        })
        
    }
};

exports.signin = async (req, res) => {
    try {
        
        //1) Get Data From Request Body
        const {email, password} = req.body;

        //2) validate email and password 
        if(!email || !password) {
            return res.status(401).json({
                success : false,
                message : "Invalid email or password please fill deatails carefully"
            });
        };

        //3) check existing email 

        let user = await User.findOne({email});

        //4) if check user is does not exits
        if(!user){
            return res.status(401).json({
                success : false,
                message : "User is Not Ragistered"
            });
        };

        //5) if validate password and vailadate password is right to create jwt token 

        let payload = {
            email : user.email,
            id  : user._id,
            profile : user.profile
        }

        if(bcrypt.compare(password, user.password)){

           let token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn : "2h"
           });

           user = user.toObject();
           user.password = undefined;
           user.token = token;

           const options = {
            expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly : true
           }

           res.cookie("token",token,options).json({
            success : true,
            token,
            user,
            message : "User logged in successfully"
           });


        }else{
            return res.status(401).json({
                success : false,
                message : "Password do not match please fill carefully"
            });
        };


        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "User cannot be signed in please try again"
        })
    }
};
