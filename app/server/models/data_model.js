class DataModel {
    constructor() {
        this.data = [];
    }

    getAll() {
        return this.data;
    }

    getById(id) {

        // finding a match for user id
        var user_obj = this.data.find(usr => {
            return(usr.id == id); 
        })
        
        //returning object if found
        if(user_obj) return user_obj;
        else return null;
    }

    save(obj) {
        if (this.validate(obj)) {
            this.data.push(obj);
            return true;
        }
        return false;
    }

    update(obj, id) {
        //console.log("obj -" +obj);
        //console.log("id" +id);
        //finding the user object that owns the id
        var update = this.data.find(element => element.id == id);
        //console.log("line -" +update);
        //return null if none is found
        if (update === undefined) return false;

        //????
        else {
            for(let key of Object.keys(obj)){
                //console.log();
                update[key]= obj[key];  
            }
            return true;
        }
    }

    delete(id) {
        if(this.data.find(user => user.id==id)){
            this.data=this.data.filter(user => user.id != id);
            return true;
        }
        else{
            return false;
            }

    }

    // this method will be overriden in the sub classes
    validate(obj) {
        return false;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;