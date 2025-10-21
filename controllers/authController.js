const User = require("../models/User")

const handleErrors = (err) =>{
    console.log(err.message, err.code);
    let errors = {email:"", password:""}

    if(err.code ===11000){
        errors.email = "that error already registered";
        return errors;
    }

    if(err.message.includes("user validation failed")){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
        })
    }
    return errors;

}

module.exports = {
    signup_get:(req, res) =>{
        res.render("signup")
    },
    signup_post: async(req, res) =>{
        const {email, password} = req.body;
        try {
            const user = await User.create({email,password});
            res.status(201).json(user);
        } catch (error) {
            const errors = handleErrors(error)
            res.status(400).json({errors});
            
            
        }

        res.send("new signup")
    },
    login_get:(req, res) =>{
        res.render("login")
    },
    login_post:(req, res) =>{
        res.send("user login")
    },
}