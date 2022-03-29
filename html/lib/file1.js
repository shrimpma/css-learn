var fruits = Array(4);
fruits[0] = "Jon";
fruits[1] = "Yon";
fruits[2] = "Yon";
fruits[3] = "Yon";
var names = [];

console.log(typeof fruits, typeof names);
console.log(fruits.length);
console.log(names.length);

var lemmon = [];
lemmon["name"] = "Jon";
lemmon["age"] = 1940;
lemmon["living"] = false;
console.log(lemmon, typeof lemmon);

console.log("----------------------------");

var count = 1;

do {
  console.log(count);
  count++;
} while (count < 11);

function shout(num) {
  console.log("call shout");
  total = num * num;
  return total;
}

var total = "the total";

var res = shout(20);

console.log(total);

// dom
// document object

var dom = document.getElementById("wrapper");

console.log("the inner HTML:", dom.innerHTML);

// foreach div node

var divObj = document.getElementsByTagName("div");

var total = divObj.length;
for (var i = 0; i < total; i++) {
  console.log(`index #` + i, divObj[i].innerHTML);

  divObj[i].setAttribute("class", "default bg");
}

// get nodes

var nodes = document.getElementById("wrapper").childNodes;

var _len = nodes.length;

for (let index = 0; index < _len; index++) {
  const element = nodes[index];

  console.log("index:", element.nodeType);
}

// link bind event
var el = document.getElementById("test");

function modifyText(target) {
  console.log(target.target.tagName);
}
el.addEventListener("click", modifyText, false);

function processArray(items, process, callback) {
  var todo = items.concat(); //create a clone of the original
  setTimeout(function () {
    process(todo.shift());
    if (todo.length > 0) {
      setTimeout(arguments.callee, 25);
    } else {
      callback(items);
    }
  }, 25);
}

var items = [123, 789, 323, 778, 232, 654, 219, 543, 321, 160];
function outputValue(value) {
  console.log(value);
}
processArray(items, outputValue, function () {
  console.log("Done!");
});


var Timer = {
    _data: {},
    start: function (key) {
      this._data[key] = new Date();
    },
    stop: function (key) {
      var time = this._data[key];
      if (time) {
        this._data[key] = new Date() - time;
      }
    },
    getTime: function(key) {
      return Timer._data[key];
    }
  };
  
  Timer.start('createElement');
  var count = 5000;
  for (i = 0; i < count; i++) {
   element = document.createElement('div');
  }
  Timer.stop('createElement');
  console.log('created ' + count + ' in ' + Timer.getTime('createElement'));
  