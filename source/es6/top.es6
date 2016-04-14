$(function(){
	calcStart();
});

/** ボタンを押したときに実行される部分 */
function calcStart()
{
	var chunk = $("textarea[name=\"input-area\"]")[0].value;
	$(".output").text(chunk);
	console.log( "optimized : \n" + optimizeString(chunk) );

	var optimizedString = optimizeString(chunk);
	var inputArray = arrayingInput(optimizedString);

	console.log(inputArray);

}

/** 文字列の余分な空白を削る */
function optimizeString(_string)
{
	var string = _string.slice(0);
	// 行頭の空白成分を削る, 空白文字だけの行を削る
	string = string.replace(/^\s{1,}/gm, "");
	// 行尾の空白成分を削る
	string = string.replace(/\s{1,}$/gm, "");
	// 空白文字が連続する箇所は 1 space に
	string = string.replace(/\s{2,}/gm, " ");

	return string;
}

/** optimizeString() で正規化された文字列を、配列に格納し返す */
function arrayingInput(_string, _startLine)
{
	var string = _string.slice(0);
	if(_startLine === undefined)
	{
		_startLine = 0;
	}

	var lineStrings = string.split("\n");

	var inputArray = [];
	for(var line = _startLine; line < lineStrings.length; ++line)
	{
		inputArray.push(lineStrings[line].split(" "));
	}

	return inputArray;
}
