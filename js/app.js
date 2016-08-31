var game;
var abcde = "Hi there";
var generatedMap;

var test1 = "";
var test2 = "";
for(x=0; x < 100; x ++) {
  test1 += "-1";
  if(x % 2) {
    test2 += "0";
  } else {
    test2 += "1";
  }
  if (x !== 99) {
    test1 += ",";
    test2 += ",";
  }
}
var runningMap = new Map(3, 100, 2, 2, [test1, test1, test2]);
console.log(runningMap);

var createMap = function(elevationArray) {
  var mapArray = [];
  var elevationDifference = [];
  for(var index = 0; index < elevationArray.length -1; index ++) {
    elevationDifference.push(elevationArray[index + 1] - elevationArray[index]);
  }
  elevationDifference.forEach(function(deltaElevation) {
    if(deltaElevation > 200) {
      mapArray.push(largeGainMaps[0]);
      largeGainMaps.push(largeGainMaps.shift());
    } else if (deltaElevation > 0) {
      mapArray.push(slightGainMaps[0]);
      slightGainMaps.push(slightGainMaps.shift());
    } else if (deltaElevation > -200) {
      mapArray.push(slightLossMaps[0]);
      slightLossMaps.push(slightLossMaps.shift());
    } else {
      mapArray.push(largeLossMaps[0]);
      largeLossMaps.push(largeLossMaps.shift());
    }
  });
  console.log(mapArray);
  console.log(elevationDifference);
  var returnMap = mapArray[0];
  for(var mapIndex = 1; mapIndex < mapArray.length; mapIndex ++) {
    returnMap = returnMap.stitch(mapArray[mapIndex]);
  }
  return returnMap;
};


$(function() {
  $('#start').click(function() {
    $('#start').toggle();
    // generatedMap = elevationGain.stitch(elevationGain).stitch(testOne).stitch(elevationLoss).stitch(elevationLoss);
    // generatedMap = runningMap.stitch(runningMap);
    // generatedMap = testOne.stitch(testTwo).stitch(testOne);
    generatedMap = createMap([0, 300, 750, 600, 400, 450, 200]);
    game = new Phaser.Game(800,600,Phaser.CANVAS,'');
    game.state.add('Boot',Game.Boot);
    game.state.add('Preloader',Game.Preloader);
    game.state.add('Mainmenu',Game.MainMenu);
    game.state.add('Level1',Game.Level1);

    game.state.start('Boot');
  });
});
