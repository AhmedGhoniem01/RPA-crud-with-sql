const User = require('../models/user');

exports.getUsers = async (req, res) => {
        let result = await User.getAllusers();
        if(result){
        res.render("../views/userViews/users" , {title: "users", users: result})
        }else{
        return res.status(400).send(JSON.stringify({error: "Failed to get users list!"}));
        }  
}

exports.getUser = async (req , res) => {
    const {id} = req.params;
    let result = await User.getUser(id);
    if(result){
        res.render("../views/userViews/userDetails" , {title: "User Details" , user: result});
    }
    else{
        return res.status(400).send(JSON.stringify({error: "Failed to get user!"}));
    }    
};

exports.redirectCreateUser = (req,res) => {
    res.render("../views/userViews/createUser" , {title: "Create new user"} );
};

exports.createUser = async(req,res) => {
    let {name, email, password} = req.body;
    let result = await User.createUser(name, email, password); 
    if(result)
        res.redirect("/users");
    else
        return res.status(400).send(JSON.stringify({error: "Failed to create user!"}));
    }


exports.redirectUpdateUser = async(req,res) => {
    const {id} = req.params;
    let result = await User.getUser(id);
    if(result){
        res.render("../views/userViews/updateUser" , {title: "User Update" , user: result});
    }
    else{
        return res.status(400).send(JSON.stringify({error: "Failed to get user!"}));
    }
};

exports.updateUser = async(req, res) => {
    const {id} = req.params;
    let {name, email, password} = req.body;
    let result = await User.updateUser(id, name, email, password);
        if(result){
            res.redirect("/users");
        }else{
            return res.status(400).send(JSON.stringify({error: "Failed to update user!"}));
        }  
}

exports.deleteUser =  async(req, res) => {
    const {id} = req.params;
    let result = await User.deleteUser(id);
    if(result){
        res.redirect("/users")
    }else{
        return res.status(400).send(JSON.stringify({error: "Failed to delete user!"}));
    }       
};
