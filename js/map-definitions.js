var slightGainMaps = [];
var slightLossMaps = [];
var mediumGainMaps = [];
var mediumLossMaps = [];
var largeGainMaps = [];
var largeLossMaps = [];

var clickForCollape;
  var testOneArray = [
    "-1,-1,-1,-1",
    "-1,-1,-1,1",
    "1,1,1,0"
  ];
  var testTwoArray = [
    "-1,-1,-1,-1",
    "1,-1,-1,-1",
    "0,1,1,1"
  ];
  var slightGainArray = [
    "-1,-1,-1,-1,-1,-1,-1,-1,-1,-1",
    "-1,-1,-1,-1,6,-1,-1,-1,-1,-1",
    "-1,-1,-1,-1,-1,-1,-1,6,-1,-1",
    "-1,-1,6,-1,3,5,-1,-1,-1,-1",
    "-1,-1,-1,-1,3,0,2,1,1,1",
    "1,1,1,1,0,0,0,0,0,0",
  ];
  var slightLossArray = [
    "-1,-1,-1,-1,-1,-1,-1,-1,-1,-1",
    "-1,-1,-1,-1,-1,6,-1,-1,-1,-1",
    "1,1,1,-1,6,-1,-1,-1,-1,-1",
    "0,0,5,-1,-1,-1,-1,1,1,1",
    "0,0,0,2,2,2,2,0,0,0",
    "0,0,0,0,0,0,0,0,0,0",
  ];
  var elevationGainArray = [
    "-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1",
    "-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,1,1,-1,-1,-1,-1",
    "-1,-1,-1,-1,-1,1,1,1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1",
    "-1,-1,-1,-1,-1,-1,-1,-1,-1,6,-1,6,-1,-1,6,-1,-1,1",
    "-1,-1,-1,1,1,1,1,-1,-1,-1,-1,-1,-1,6,-1,6,-1,0",
    "-1,-1,-1,-1,-1,-1,-1,6,-1,-1,6,-1,6,6,-1,-1,-1,0",
    "-1,1,1,1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,6,0",
    "-1,-1,-1,-1,-1,-1,6,-1,-1,6,-1,-1,6,-1,-1,-1,-1,0",
    "1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0",
    "-1,-1,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0",
    "-1,-1,-1,-1,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0",
    "-1,1,1,1,-1,-1,1,1,1,-1,1,1,1,-1,-1,-1,-1,0",
    "4,4,4,4,4,4,-1,-1,-1,2,-1,-1,3,1,1,1,-1,0",
    "-1,-1,-1,-1,-1,-1,-1,-1,-1,3,-1,-1,3,-1,-1,-1,-1,0",
    "-1,-1,-1,-1,-1,-1,-1,6,-1,3,-1,-1,3,-1,1,1,1,0",
    "-1,-1,3,1,1,1,-1,-1,-1,-1,-1,-1,3,-1,-1,-1,-1,0",
    "-1,-1,-1,-1,-1,3,2,2,1,1,1,-1,3,1,1,1,-1,0",
    "-1,-1,-1,-1,-1,3,-1,-1,-1,-1,-1,-1,3,-1,-1,-1,-1,0",
    "1,1,1,-1,-1,3,-1,-1,-1,-1,-1,-1,3,-1,1,1,1,0",
    "-1,-1,-1,-1,-1,3,-1,1,1,1,1,-1,3,-1,-1,-1,-1,0",
    "-1,-1,-1,-1,-1,3,-1,-1,-1,-1,-1,2,3,1,1,1,-1,0",
    "-1,1,1,1,-1,3,-1,6,-1,6,-1,-1,-1,-1,-1,-1,-1,0",
    "-1,-1,-1,-1,-1,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,0",
    "1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,0,0"
  ];
  var elevationLossArray = [
    "-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1",
    "-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1",
    "1,1,-1,-1,-1,-1,-1,-1,3,-1,-1,-1",
    "-1,5,-1,-1,-1,-1,-1,-1,3,-1,-1,-1",
    "-1,4,2,-1,-1,-1,-1,-1,3,-1,-1,-1",
    "-1,-1,-1,-1,-1,-1,-1,-1,3,-1,-1,-1",
    "-1,1,1,1,1,1,1,1,1,6,6,-1",
    "-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,-1",
    "6,-1,6,-1,1,1,1,-1,-1,6,3,-1",
    "-1,-1,-1,-1,3,-1,-1,6,-1,-1,3,-1",
    "1,1,1,1,-1,-1,-1,-1,1,-1,3,-1",
    "-1,-1,-1,-1,-1,1,1,-1,-1,-1,3,-1",
    "-1,-1,1,1,1,-1,-1,1,1,1,-1,-1",
    "-1,6,-1,-1,-1,-1,6,-1,-1,-1,-1,-1",
    "-1,-1,-1,3,-1,-1,-1,-1,-1,6,-1,-1",
    "-1,1,1,0,1,1,-1,-1,-1,-1,-1,-1",
    "2,0,0,0,0,0,1,1,1,-1,-1,-1",
    "0,0,0,0,0,0,0,0,0,1,1,1"
  ];

var testOne = new Map(3,4,2,1,testOneArray);
var testTwo = new Map(3,4,1,2,testTwoArray);
var elevationGain = new Map(24, 18, 23, 3, elevationGainArray);
largeGainMaps.push(elevationGain);
largeGainMaps.push(testOne);

var elevationLoss = new Map(18, 12, 2, 17, elevationLossArray);
largeLossMaps.push(elevationLoss);
largeLossMaps.push(testTwo);
var slightGain = new Map(6, 10, 5, 4, slightGainArray);
slightGainMaps.push(slightGain);
slightGainMaps.push(testOne);
var slightLoss = new Map(6, 10, 2, 3, slightLossArray);
slightLossMaps.push(slightLoss);
slightLossMaps.push(testTwo);
