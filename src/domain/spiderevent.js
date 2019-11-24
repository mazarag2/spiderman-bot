"use strict";
class SpiderEvent {
    constructor(userId,msg,datePosted) {
      this.userId = userId;
      this.msg = msg;
      this.datePosted = datePosted;
    }
    getMsg(){
        return this.msg;
    }
    getId(){
        return this.userId;
    }
    getDatePosted(){
        return this.datePosted;
    }
}
module.exports = SpiderEvent;
