//Require robot queries
const robotQueries = require('../db/queries').robotQueryList;
const dbConnection = require('../db/dbConnection');

//Robot model constructor
class Robot{
    constructor(id, name, standard, attended, user_id){
        this.id = id;
        this.name = name;
        this.standard = standard;
        this.attended = attended;
        this.user_id = user_id;
    }

    static async getAllRobots(){
        let queryText = robotQueries.GET_ALL_ROBOTS;
        try{
            const result = await dbConnection.dbQuery(queryText);
            let robotsArray = [];
            result.forEach(robotJson => {
                robotsArray.push(new Robot(robotJson.id, robotJson.name, robotJson.standard, robotJson.attended, robotJson.user_id))
            });
            return robotsArray;
        }catch(err){
            console.log("Model-Handling-Error: Failed to fetch all robots\n", err);
            return null;
        }
    }

    static async getRobotById(id){
        let queryText = robotQueries.GET_ROBOT_BY_ID;
        let values = [id];
        try{
            const [result] = await dbConnection.dbQuery(queryText, values);
            let robot = new Robot(result.id, result.name, result.standard, result.attended, result.user_id);
            return robot;
        }catch(err){
            console.log("Model-Handling-Error: Failed to get robot entity\n", err);
            return null;
        } 
    }

    static async getRobotByName(name){
        let queryText = robotQueries.GET_ROBOT_BY_NAME;
        let values = [name];
        try{
            const [result] = await dbConnection.dbQuery(queryText, values);
            let robot = new Robot(result.id, result.name, result.standard, result.attended, result.user_id);
            return robot;
        }catch(err){
            console.log("Model-Handling-Error: Failed to get robot entity\n", err);
            return null;
        } 
    }

    static async createRobot(name, standard, attended, user_id){
        let queryText = robotQueries.INSERT_ROBOT;
        let values = [name, standard, attended, user_id];
        try{
            const result = await dbConnection.dbQuery(queryText, values);
            let robot = new Robot(result.id, result.name, result.standard, result.attended, result.user_id);
            return robot;
        }catch(err){
            console.log("Model-Handling-Error: Failed to create a robot entity\n", err);
            return null;
        }
    }

    static async updateRobot(id, name, standard, attended, user_id){
        let queryText = robotQueries.UPDATE_ROBOT;
        let values = [name, standard, attended, user_id, id];
        try{
            const result = await dbConnection.dbQuery(queryText, values);
            return result;
        }catch(err){
            console.log("Model-Handling-Error: Failed to update robot entity\n", err);
            return null;
        }
    }

    static async deleteRobot(id){
        let queryText = robotQueries.DELETE_ROBOT;
        let values = [id];
        try{
            const result = await dbConnection.dbQuery(queryText, values);
            return result;
        }catch(err){
            console.log("Model-Handling-Error: Failed to delete a robot entity\n", err);
            return null;
        }
    }
}

module.exports = Robot;

