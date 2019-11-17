"use strict";

var expect = require('chai').expect;
const root = process.env.PWD;
let User = require(`${root}/src/domain/user`);


describe('User', function() {
    
    describe('##testUser()', function(){

		it('should return values for a uSer when insantiated',function(){
			
            let userTest = new User('mike',123);
            expect(userTest.getId()).to.equal(123);
            expect(userTest.getName()).to.equal('mike');

		});
		
	});
	
});