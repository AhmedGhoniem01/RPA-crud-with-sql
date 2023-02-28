const Robot = require('../models/robot');
const User = require('../models/user');

exports.getRobots = async (req, res) => {
        let result = await Robot.getAllRobots();
        if(result){
        res.render("../views/robotViews/robots" , {title: "robots", robots: result})
        }else{
        return res.status(400).send(JSON.stringify({error: "Failed to get robots list!"}));
        }  
}

exports.getRobotById = async (req , res) => {
    const {id} = req.params;
    let robotResult = await Robot.getRobotById(id);
    if(robotResult){
        let userResult = await User.getUserById(robotResult.user_id);
        res.render("../views/robotViews/robotDetails" , {title: "Robot Details" , robot: robotResult, user: userResult});
    }
    else{
        return res.status(400).send(JSON.stringify({error: "Failed to get robot!"}));
    }    
};

exports.getRobotByName = async (req , res) => {
    const {name} = req.params;
    let result = await Robot.getRobotByName(name);
    if(result){
        res.render("../views/robotViews/robotDetails" , {title: "Robot Details" , robot: result});
    }
    else{
        return res.status(400).send(JSON.stringify({error: "Failed to get ..robot!"}));
    }    
};

exports.redirectCreateRobot = async(req,res) => {
    let result = await User.getAllusers();
    if(result){
        res.render("../views/robotViews/createRobot", {title: "Create new robot", users: result} );
    }else{
        return res.status(400).send(JSON.stringify({error: "Failed to get users list!"}));
    } 
};

exports.createRobot = async(req,res) => {
    let {name, standard, attended, user} = req.body;
    attended = (attended) ? true : false;
    standard = (standard) ? true : false;
    let userResult = await User.getUserByName(user);
    let robotResult = await Robot.createRobot(name, standard, attended, userResult.id); 
    if(robotResult && userResult)
        res.redirect("/robots");
    else
        return res.status(400).send(JSON.stringify({error: "Failed to create robot!"}));
    }


exports.redirectUpdateRobot = async(req,res) => {
    const {id} = req.params;
    let result = await Robot.getRobotById(id);
    let users = await User.getAllusers();
    if(result && users){
        res.render("../views/robotViews/updateRobot" , {title: "Robot Update" , robot: result, users: users});
    }
    else{
        return res.status(400).send(JSON.stringify({error: "Failed to get robot!"}));
    }
};

exports.updateRobot = async(req, res) => {
    const {id} = req.params;
    let {name, standard, attended, user} = req.body;
    attended = (attended) ? true : false;
    standard = (standard) ? true : false;
    let userResult = await User.getUserByName(user);
    let robotResult = await Robot.updateRobot(id, name, standard, attended, userResult.id);
        if(userResult && robotResult){
            res.redirect("/robots");
        }else{
            return res.status(400).send(JSON.stringify({error: "Failed to update robot!"}));
        }  
}

exports.deleteRobot =  async(req, res) => {
    const {id} = req.params;
    let result = await Robot.deleteRobot(id);
    if(result){
        res.redirect("/robots")
    }else{
        return res.status(400).send(JSON.stringify({error: "Failed to delete robot!"}));
    }       
};
