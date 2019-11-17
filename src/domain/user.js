"use strict";
class User {
    constructor(name,id) {
      this.name = name;
      this.id = id;
    }
    getName(){
        return this.name;
    }
    getId(){
        return this.id;
    }
}
module.exports = User;
