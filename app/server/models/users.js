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
    validate(user) {
            const keys = Object.keys(user);
            for(let key of keys){ //validates all user keys
                if (user[key] === null || user[key] == " ") return false;
            }

            //Load object array
            
            for(let i=0; i< this.data.length; i++){

                console.log("matric")
                console.log("'"+ this.data[i].matricNumber+"'"+" == "+ "'"+user.matricNumber  +"'"+" ??")
                console.log(typeof(this.data[i].matricNumber), typeof(user.matricNumber)); //console.clear();
                console.log(!(this.data[i].matricNumber === user.matricNumber));

                console.log("--------------------");


                console.log("mail")
                console.log("'"+ this.data[i].email+"'"+" == "+ "'"+user.email  +"'"+" ??")
                console.log(typeof(this.data[i].email), typeof(user.email)); //console.clear();
                console.log(!(this.data[i].email === user.email));

                console.log("--------------------");



                /*if(this.data[i].email == user.email) return false;
                console.log("the code chose to not hear word");
                if(this.data[i].matricNumber == user.matricNumber) return false;*/

                if(this.data[i].email == user.email || this.data[i].matricNumber == user.matricNumber){
                    return false;
                   break;
                 
                }


            }
            return true;

    }


}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};