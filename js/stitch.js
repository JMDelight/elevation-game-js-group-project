// numberOfRows and numberOfColumns are the dimensions of the map object
// startingRow and endingRow are the row numbers for the start and end point of the map. rows are numbered from the top downward.  The count starts at 1.
// rows is the information for the map, it is passed as an array of strings, with each element of the array being a string of numbers seperated by commas, each representing a single row.
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
// most of these variables are positions relative to the starting point of the map object.
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

      var workingStringTwo = "";
      for(var i = 0; i < this.numberOfColumns; i ++) {
        workingStringTwo = workingStringTwo + "0,";
      }
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
        workingStringTwoMapTwo = workingStringTwoMapTwo.slice(0, -1);
      }
      workingString += workingStringTwoMapTwo;
    }
    newMapArray.push(workingString);
  }
  return new Map(newMapArray.length, this.numberOfColumns + secondMap.numberOfColumns, this.startingRow + mapOneExtraRows, secondMap.endingRow + mapTwoExtraRows, newMapArray);

};
