"use strict";

$(function () {
	calcStart();
});

/** ボタンを押したときに実行される部分 */
function calcStart() {
	var chunk = $("textarea[name=\"input-area\"]")[0].value;
	$(".output").text(chunk);
	// console.log( "optimized : \n" + optimizeString(chunk) );

	var optimizedString = optimizeString(chunk);
	var inputArray = arrayingInput(optimizedString);

	var mapHeight = Number(inputArray[0][0]);
	var mapWidth = Number(inputArray[0][1]);
	var mapInputArray = inputArray.slice(1, mapHeight + 1);

	var mapArray = [];
	for (var x = 0; x < mapWidth; ++x) {
		mapArray[x] = [];
	}

	for (var line = 0; line < mapHeight; ++line) {
		var lineString = mapInputArray[line][0];
		for (var x = 0; x < mapWidth; ++x) {
			mapArray[x][line] = lineString[x];
		}
	}

	// console.log(mapArray);

	var initialPlace = [Number(inputArray[mapHeight + 1][0]) - 1, Number(inputArray[mapHeight + 1][0]) - 1];
	var moveTimes = Number(inputArray[mapHeight + 2][0]);

	// console.log("init : " + initialPlace + " , move : " + moveTimes);

	var currentPlace = initialPlace.slice(0);
	for (var i = 0; i < moveTimes; ++i) {
		var directionChar = inputArray[mapHeight + 3 + i][0][0];
		currentPlace = move(mapArray, mapWidth, mapHeight, currentPlace, directionChar);
		// console.log(currentPlace);
	}
	// console.log(currentPlace);

	console.log(Number(currentPlace[0]) + 1 + " " + (Number(currentPlace[1]) + 1) + "\n");
}

function move(_mapArray, _mapWidth, _mapHeight, _currentPlace, _direction) {
	var currentX = Number(_currentPlace[0]);
	var currentY = Number(_currentPlace[1]);

	var mapWidth = Number(_mapWidth);
	var mapHeight = Number(_mapHeight);

	switch (_direction) {
		case "U":
			while (currentY > 0) {
				--currentY;
				if (_mapArray[currentX][currentY] === ".") {
					break;
				}
			}
			break;
		case "D":
			while (currentY < mapHeight - 1) {
				++currentY;
				if (_mapArray[currentX][currentY] === ".") {
					break;
				}
			}
			break;
		case "R":
			while (currentX < mapWidth - 1) {
				++currentX;
				// console.log(_mapArray[currentX][currentY]);
				if (_mapArray[currentX][currentY] === ".") {
					break;
				}
			}
			break;
		case "L":
			while (currentX > 0) {
				--currentX;
				if (_mapArray[currentX][currentY] === ".") {
					break;
				}
			}
			break;
	}
	return [currentX, currentY];
}

/** 文字列の余分な空白を削る */
function optimizeString(_string) {
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
function arrayingInput(_string, _startLine) {
	var string = _string.slice(0);
	if (_startLine === undefined) {
		_startLine = 0;
	}

	var lineStrings = string.split("\n");

	var inputArray = [];
	for (var line = _startLine; line < lineStrings.length; ++line) {
		inputArray.push(lineStrings[line].split(" "));
	}

	return inputArray;
}