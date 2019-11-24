"use strict";

var expect = require('chai').expect;
const root = process.env.PWD;
let spiderevent = require(`${root}/src/domain/spiderevent`);


describe('User', function() {
    
    describe('##testUser()', function(){

		it('should return values for a uSer when insantiated',function(){
			
            let eventTest = new spiderevent(123,"msg","2019-11-24T07:54:08.473Z");
            expect(eventTest.getId()).to.equal(123);
            expect(eventTest.getMsg()).to.equal('msg');
            expect(eventTest.getDatePosted()).to.equal("2019-11-24T07:54:08.473Z")

		});
		
	});
	
});