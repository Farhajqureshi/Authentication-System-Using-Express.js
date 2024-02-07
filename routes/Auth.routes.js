const express = require('express');
const router = express.Router();
//reqire import controllers

const {signin,signup} = require('../controllers/Auth.controller');
const {auth,isStudent,isAdmin} = require('../middlewares/Auth.middleware');

// routes haindelers 

router.post('/signup', signup);
router.post('/signin', signin);

router.get('/auto', auth, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the portected routes for Tests"
    });
});

router.get('/student', auth, isStudent, (req, res) =>{
    res.json({
        success:true,
        message: "Welcome to the protected routes of Student"
    });
});

router.get('/admin', auth, isAdmin, (req, res) =>{
    res.json({
        success:true,
        message: "Welcome to the protected routes of Admin"
    });
});

// exports module routes
module.exports = router;

