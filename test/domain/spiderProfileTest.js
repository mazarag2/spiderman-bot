/*
  getSpiderCount(){
        return this.spidermanCount;
    }
    getId(){
        return this.id;
    }
    getMilesCount(){
        return this.milesCount;
    }
*/
"use strict";

var expect = require('chai').expect;
const root = process.env.PWD;
let spiderprofile = require(`${root}/src/domain/spiderprofile`);


describe('profile', function() {
    
    describe('##testProfile()', function(){

		it('should return values for a profile',function(){
			
            let profileTest = new spiderprofile(123,1,2);
            expect(profileTest.getSpiderCount()).to.equal(1);
            expect(profileTest.getId()).to.equal(123);
            expect(profileTest.getMilesCount()).to.equal(2)

		});
		
	});
	
});