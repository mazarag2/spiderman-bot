"use strict";
class SpiderProfile {
    constructor(userId,spidermanCount,milesCount) {
      this.userId = userId;
      this.spidermanCount = spidermanCount;
      this.milesCount = milesCount;
    }
    getSpiderCount(){
        return this.spidermanCount;
    }
    getId(){
        return this.id;
    }
    getMilesCount(){
        return this.milesCount;
    }
}
module.exports = SpiderProfile;
