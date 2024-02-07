const jwt = require("jsonwebtoken");
// const { default: next } = require("next");
require("dotenv").config();

exports.isStudent = (req, res, next) => {
  try {
    const studenToken = req.body.token;

    if (!token) {
      return res.status(400).josn({
        success: false,
        message: "Missing token",
      });
    };

    try {
      const decode = jwt.verify(studenToken, process.env.JWT_SECRET);
      req.user = decode;
    } catch (error) {
        res.status(400).josn({
            success: false,
            message: "token is invalid",
        });
    };
    next();
  } catch (error) {
        console.error(error);
        console.log(error);
        res.status(400).josn({
            success: false,
            message: "something went wrong"
        });
  }
};




exports.isAdmin =  (req, res, next) => {
    try {
        const Admintoken = req.body.token;
        if(!token){
            return res.status(403).josn({
                success: false,
                message: "token is Missing"
            });
        };

        try {
            const decode = jwt.verify(Admintoken, process.env.JWT_SECRET);
            req.user = decode;
        } catch (error) {
            console.error(error);
            console.log(error);
            res.status(403).josn({
                success: false,
                message: "Token is Invalid",
            });
            
        }
        next();
    } catch (error) {

        console.error(error);
        console.log(error);
        res.status(403).josn({
            success: false,
            message: "Somethin went wrong"
        })
        
    }
}
