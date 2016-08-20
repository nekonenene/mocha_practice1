// var assert = require('chai').assert;
var assert = require('assert'); // chai がなくても基本的な assert テストはできる (expect 系には chai 必要)

global.document = require('jsdom').jsdom('<html></html>');
global.window = document.defaultView;
global.$ = require('jquery');

describe('Assert', function() {
	describe('#equal()', function () {
		it('与えられた値が等しいか', function (){
			assert.equal(2, 2);
			assert.equal(-1, -1);
		});
	});
});

describe('Array', function() {
	describe('#indexOf()', function () {
		it('配列に存在しない値を指定されたとき-1を返す', function (){
			var arr = [3, 5];
			assert.equal(-1, arr.indexOf(100));
		});
	});
});

describe('Foo', function() {
	var topjs = require('../source/top');
	console.log(topjs);

	describe('isOverZero()', function () {
		it('0以上の値が渡されたときにtrue', function (){
			assert.equal(true, topjs.isOverZero(100));
		});
		it('0が渡されたときにfalse', function (){
			assert.equal(false, topjs.isOverZero(0));
		});
		it('-1が渡されたときにfalse', function (){
			assert.equal(false, topjs.isOverZero(-1));
		});
	});
});
