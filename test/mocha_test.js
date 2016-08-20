// var assert = require('chai').assert;
var assert = require('assert'); // chai がなくても基本的な assert テストはできる (expect 系には chai 必要)

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
