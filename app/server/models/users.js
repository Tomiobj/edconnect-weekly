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
        return this.firstname + " " + this.lastname;
    }
}

class Users extends DataModel {
    authenticate(email, password) {
        if (this.data.email === email && this.data.password === password) return true;
        else return false;
    }

    getByEmail(email) {
        var person = this.data.find(element => element.email == email);
        if (person === undefined) return null;
        else return person;    //i change this because it didnt make sense  returned person with if and null with else...in all
    }

    getByMatricNumber(matricNumber) {
        var person = this.data.find(element => element.email == matricNumber);
        if (person === undefined) return null;
        else return person;
    }
    validate(obj) {
        if(this.data.find(element => element == email)) return false;
        if(this.data.find(element => element == matricNumber)) return false;
        if(this.data["password"].length<7)  return false;

        return true;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};