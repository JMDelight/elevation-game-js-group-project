console.log("hi");
// the first two inputs are the dimensions of the map, the next two inputs are the row numbers for the entrance and exit points for the map, counting down from the top of the map where the top row is row 1 the last input will be an array with the values as individual strings for each row. //
function Map(numberOfRows, numberOfColumns, startingRow, endingRow, rows) {
  this.numberOfRows = numberOfRows;
  this.numberOfColumns = numberOfColumns;
  this.startingRow = startingRow;
  this.endingRow = endingRow;
  this.rows = rows;
}

Map.prototype.output = function() {
  var outputString = "";
  for(var mapRow = 0; mapRow < this.rows.length; mapRow ++) {
    outputString = outputString + this.rows[mapRow] + "\n";
  }
  return outputString;
};

Map.prototype.stitch = function(secondMap) {
  // var startingRow = this.startingRow;
  // var mapTopRelativeToStart = 1 - startingRow;
  // var mapBotRelativeToStart = this.numberOfRows - this.startingRow;
  // var mapEndRelativeToStart = mapTopRelativeToStart + this.endingRow;
  // var startingRowMapTwo = secondMap.startingRow;
  // var mapTwoMapTopRelativeToStart = secondMap.startingRow - secondMap.numberOfRows;
  // var mapTwoMapBotRelativeToStart = secondMap.numberOfRows - secondMap.startingRow;
  // var mapTwoTopRelativeMapOneStart = mapEndRelativeToStart - mapTwoMapTopRelativeToStart;
  // var mapTwoBotRelativeMapOneStart = mapEndRelativeToStart + mapTwoMapBotRelativeToStart;
  console.log(this.rows);

  var start = this.startingRow;
  console.log(start, "start");
  var top = 1 - start;
  console.log(top, "top");
  var bot = this.numberOfRows - start;
  console.log(bot, "bot");
  var end = top + this.endingRow - 1;
  console.log(end, "end");
  var start2 = end;
  console.log(start2, "start2");
  var top2 = start2 + (1 - secondMap.startingRow);
  console.log(top2, "top2");
  var bot2 = start2 + (secondMap.numberOfRows - secondMap.startingRow);
  console.log(bot2, "bot2");
  var end2 = top2 + secondMap.endingRow;
  console.log(end2, "end2");


  var workingTop = top;
  var workingBot = bot;

  if(top2 < top) {
    workingTop = top2;
  }
  if(bot2 > bot) {
    workingBot = bot2;
  }
  var newMapArray = [];
  var mapOneWorkingRow = 0;
  var mapOneExtraRows = 0;
  var mapTwoWorkingRow = 0;
  var mapTwoExtraRows = 0;
  for(var y = workingTop; y <= workingBot; y ++) {
    var workingString = "";
    if ( y < top ) {
      workingString += this.rows[mapOneWorkingRow] + ",";
      mapOneExtraRows ++ ;
    } else if ( y <= bot ) {
      workingString += this.rows[mapOneWorkingRow] + ",";
        mapOneWorkingRow ++;
    } else {
      // debugger;
      var workingStringTwo = "";
      for(var i = 0; i < this.numberOfColumns; i ++) {
        workingStringTwo = workingStringTwo + "0,";
      }
      // if(workingStringTwo.charAt(workingStringTwo.length - 1) === workingStringTwo.charAt(workingStringTwo.length - 2)) {
      //   console.log(workingStringTwo);
      //   workingStringTwo = workingStringTwo.slice(0, -1);
      // }
      workingString += workingStringTwo;
    }

    if ( y < top2 ) {
      mapTwoExtraRows ++ ;
      workingString += secondMap.rows[mapTwoWorkingRow];
    } else if ( y <= bot2 ) {
      workingString += secondMap.rows[mapTwoWorkingRow];
        mapTwoWorkingRow ++;
    } else {
      // debugger;
      var workingStringTwoMapTwo = "";
      for ( var j = 0; j < secondMap.numberOfColumns; j ++) {
        workingStringTwoMapTwo += "0,";
      }
      if(workingStringTwoMapTwo.charAt(workingStringTwoMapTwo.length - 1) === ",") {
        console.log(workingStringTwoMapTwo);
        workingStringTwoMapTwo = workingStringTwoMapTwo.slice(0, -1);
      }
      workingString += workingStringTwoMapTwo;
    }
    newMapArray.push(workingString);
  }
  return new Map(newMapArray.length, this.numberOfColumns + secondMap.numberOfColumns, this.startingRow + mapOneExtraRows, secondMap.endingRow + mapTwoExtraRows, newMapArray);

};


var testOneArray = [
  "9,9,9,9",
  "9,9,9,1",
  "1,1,1,0"
];
var testTwoArray = [
  "9,9,9,9",
  "1,9,9,9",
  "0,1,1,1"
];
var testOne = new Map(3,4,2,1,testOneArray);
var testTwo = new Map(3,4,1,2,testTwoArray);

// for testing purposes, I replaced all values of '-1' with a value of '9' //
var elevationGainArray = [
  "9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9",
  "9,9,9,9,9,9,9,9,9,9,1,1,1,1,9,9,9,9",
  "9,9,9,9,9,1,1,1,1,9,9,9,9,9,9,9,9,9",
  "9,9,9,9,9,9,9,9,9,6,9,6,9,9,6,9,9,1",
  "9,9,9,1,1,1,1,9,9,9,9,9,9,6,9,6,9,0",
  "9,9,9,9,9,9,9,6,9,9,6,9,6,6,9,9,9,0",
  "9,1,1,1,1,9,9,9,9,9,9,9,9,9,9,9,6,0",
  "9,9,9,9,9,9,6,9,9,6,9,9,6,9,9,9,9,0",
  "1,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,0",
  "9,9,6,9,9,9,9,9,9,9,9,9,9,9,9,9,9,0",
  "9,9,9,9,6,9,9,9,9,9,9,9,9,9,9,9,9,0",
  "9,1,1,1,9,9,1,1,1,9,1,1,1,9,9,9,9,0",
  "4,4,4,4,4,4,9,9,9,2,9,9,3,1,1,1,9,0",
  "9,9,9,9,9,9,9,9,9,3,9,9,3,9,9,9,9,0",
  "9,9,9,9,9,9,9,6,9,3,9,9,3,9,1,1,1,0",
  "9,9,3,1,1,1,9,9,9,9,9,9,3,9,9,9,9,0",
  "9,9,9,9,9,3,2,2,1,1,1,9,3,1,1,1,9,0",
  "9,9,9,9,9,3,9,9,9,9,9,9,3,9,9,9,9,0",
  "1,1,1,9,9,3,9,9,9,9,9,9,3,9,1,1,1,0",
  "9,9,9,9,9,3,9,1,1,1,1,9,3,9,9,9,9,0",
  "9,9,9,9,9,3,9,9,9,9,9,2,3,1,1,1,9,0",
  "9,1,1,1,9,3,9,6,9,6,9,9,9,9,9,9,9,0",
  "9,9,9,9,9,3,9,9,9,9,9,9,9,9,9,1,1,0",
  "1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,0,0"
];
var elevationLossArray = [
  "9,9,9,9,9,9,9,9,9,9,9,9",
  "9,9,9,9,9,9,9,9,9,9,9,9",
  "1,1,9,9,9,9,9,9,3,9,9,9",
  "9,5,9,9,9,9,9,9,3,9,9,9",
  "9,4,2,9,9,9,9,9,3,9,9,9",
  "9,9,9,9,9,9,9,9,3,9,9,9",
  "9,1,1,1,1,1,1,1,1,6,6,9",
  "9,9,9,9,9,9,9,9,9,9,3,9",
  "6,9,6,9,1,1,1,9,9,6,3,9",
  "9,9,9,9,3,9,9,6,9,9,3,9",
  "1,1,1,1,9,9,9,9,1,9,3,9",
  "9,9,9,9,9,1,1,9,9,9,3,9",
  "9,9,1,1,1,9,9,1,1,1,9,9",
  "9,6,9,9,9,9,6,9,9,9,9,9",
  "9,9,9,3,9,9,9,9,9,6,9,9",
  "9,1,1,0,1,1,9,9,9,9,9,9",
  "2,0,0,0,0,0,1,1,1,9,9,9",
  "0,0,0,0,0,0,0,0,0,1,1,1"
];
var elevationGain = new Map(24, 18, 23, 3, elevationGainArray);
var elevationLoss = new Map(18, 12, 2, 17, elevationLossArray);
