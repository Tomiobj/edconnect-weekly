const DataModel = require('./data_model');

class User {
    constructor(id, firstname, lastname, email, password, matricNumber, program, graduationYear) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.matricNumber = matricNumber;
        this.program = program;
        this.graduationYear = graduationYear;
    }

    getFullName() {
        return firstname + " " + lastname;
    }
}

class Users extends DataModel {
    authenticate(email, password) {
        if (this.email === email && this.password === password) return true;
        else return false;
    }

    getByEmail(email) {
        if(this.email.find(element => element == email)) return this.User;
        else return null;
    }

    getByMatricNumber(matricNumber) {
        if(this.matricNumber.find(element => element == matricNumber)) return this.User;
        else return null;
    }

    validate(obj) {
        if(this.email.find(element => element == email)) return false;
        if(this.matricNumber.find(element => element == matricNumber)) return false;
        if(this.password.length<=7) return false;

        return true;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};