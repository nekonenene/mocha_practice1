describe("top.Test", function()
{

	describe("0 を超えていれば true を返すはず", function()
	{
		it("0 のとき false", function()
		{
			var test = new Test(0);
			expect( test.isOverZero() ).toBeFalsy();
		});

		it("0 より大きいとき true", function()
		{
			var test = new Test(1);
			expect( test.isOverZero() ).toBeTruthy();
			for(var i = 0; i < 100; ++i)
			{
				var test = new Test( Math.random() * 100 + 1 );
				expect( test.isOverZero() ).toBeTruthy();
			}
		});

		it("0 以下のとき false", function()
		{
			for(var i = 0; i < 100; ++i)
			{
				var test = new Test( Math.random() * -100 );
				expect( test.isOverZero() ).toBeFalsy();
			}
		});
	});
});
