class DataModel {
    constructor() {
        this.data = [];
    }

    getAll() {
        return this.data;
    }

    getById(id) {
        if(this.data.length>=id) return false;
        else return data[id];
        //idk sha ill add || data.length =" " as per empty string if thst counts
        //as not found (in all)
    }

    save(obj) {
        if (this.validate(obj)) {
            this.data.push(obj);
            return true;
        }
        return false;
    }

    update(obj, id) {
        if(this.data.length>=id) return false;
        else {
            data[id]=obj;
        }
    }

    delete(id) {
        if(this.data.length>=id) return false;
        else {
            delete data[id];
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