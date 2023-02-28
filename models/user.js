//Require user queries
const userQueries = require('../db/queries').userQueryList;
const dbConnection = require('../db/dbConnection');

//user model constructor
class User{
    constructor(id, name, email, password){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static async getAllusers(){
        let queryText = userQueries.GET_ALL_USERS;
        try{
            const result = await dbConnection.dbQuery(queryText);
            let usersArray = [];
            result.forEach(userJson => {
                usersArray.push(new User(userJson.id, userJson.name, userJson.email, userJson.password))
            });
            return usersArray;
        }catch(err){
            console.log("Model-Handling-Error: Failed to fetch all users\n", err);
            return null;
        }
    }

    static async getUserById(id){
        let queryText = userQueries.GET_USER_BY_ID;
        let values = [id];
        try{
            const [result] = await dbConnection.dbQuery(queryText, values);
            let user = new User(result.id, result.name, result.email, result.password);
            return user;
        }catch(err){
            console.log("Model-Handling-Error: Failed to get user entity\n", err);
            return null;
        } 
    }

    static async getUserByName(name){
        let queryText = userQueries.GET_USER_BY_NAME;
        let values = [name];
        try{
            const [result] = await dbConnection.dbQuery(queryText, values);
            let user = new User(result.id, result.name, result.email, result.password);
            return user;
        }catch(err){
            console.log("Model-Handling-Error: Failed to get user entity\n", err);
            return null;
        } 
    }

    static async createUser(name, email, password){
        let queryText = userQueries.INSERT_USER;
        let values = [name, email, password];
        try{
            const result = await dbConnection.dbQuery(queryText, values);
            let user = new User(result.id, result.name, result.email, result.password);
            return user;
        }catch(err){
            console.log("Model-Handling-Error: Failed to create a user entity\n", err);
            return null;
        }
    }

    static async updateUser(id, name, email, password){
        let queryText = userQueries.UPDATE_USER;
        let values = [name, email, password, id];
        try{
            const result = await dbConnection.dbQuery(queryText, values);
            return result;
        }catch(err){
            console.log("Model-Handling-Error: Failed to update user entity\n", err);
            return null;
        }
    }

    static async deleteUser(id){
        let queryText = userQueries.DELETE_USER;
        let values = [id];
        try{
            const result = await dbConnection.dbQuery(queryText, values);
            return result;
        }catch(err){
            console.log("Model-Handling-Error: Failed to delete a user entity\n", err);
            return null;
        }
    }
}

module.exports = User;