console.log("hi");
// the first two inputs are the dimensions of the map, the next two inputs are the row numbers for the entrance and exit points for the map, counting down from the top of the map-top row is row 1 the last input will be an array with the values as individual strings for each row. //
function Map(numberOfRows, numberOfColumns, startingRow, endingRow, rows) {
  this.numberOfRows = numberOfRows;
  this.numberOfColumns = numberOfColumns;
  this.startingRow = startingRow;
  this.endingRow = endingRow;
  this.rows = rows;
}

Map.prototype.stitch = function(secondMap) {
  var startingRow = this.startingRow;
  var mapTopRelativeStart = startingRow - this.numberOfRows;
  var mapBotRelativeStart = this.numberOfRows - startingRow;
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
var testOne = new Map(3,4,1,2,testOneArray);
var testTwo = new Map(3,4,2,1,testTwoArray);

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
