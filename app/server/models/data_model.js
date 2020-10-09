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
        if(this.data.length>=id || !data[id]) return false;
        else {
            data.id=obj;
            return true;
        }
    }

    delete(id) {
        if(this.data.length>=id || !data[id]) return false;
        else {
            delete this.data.id;
            return true;
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