var brain = require("../brain/brain"),
    sys = require("sys"),
    puts = sys.puts,
    csv = require('../node-csv');


var net = new NeuralNetwork();
info = [];

csv.csv.each("data.csv").addListener("data", function(data) {
  info.push({date : parseFloat(data[0]), value : parseFloat(data[1])});
}).addListener("end", function() {
  var depth = 15;
  var history = makeHistoryList(depth,info);
  history = history.slice(0, history.length-1);
  var totrain = history.map(function(item){
    return {input: item.slice(0,depth-2), output: [item[depth-1]]};
  });
  
  puts("Training with: ");
  puts(sys.inspect(totrain));
  net.train(totrain);
  var result = net.run([0.81370,0.81490,0.81190,0.81140,0.80880,0.80870,
                        0.81090,0.81930,0.81640,0.8090,0.79770,0.79610,0.79620]);
  puts("The result is: " + sys.inspect(result));
});


function makeHistoryList(depth, info){
  var counter = 0;
  var acc = [];
  info.forEach(function(item){
    if(counter>depth){
      acc.push(makeHistoryItem(counter,depth,info));
    }
    counter++;
  });
  return acc;
}

function makeHistoryItem(index, depth, info){
  var toreturn = [];
  for(var i=0; i<depth; i++){
    toreturn.push(info[index-i]['value']);
  }
  return toreturn.reverse();
}
