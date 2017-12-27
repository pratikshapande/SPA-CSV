/***** Polyfills *****/
Function.prototype.bind = function () {
    var fn = this,
        args = Array.prototype.slice.call(arguments),
        object = args.shift();
    return function () {
        return fn.apply(object, args.concat(Array.prototype.slice.call(arguments)));
    };
};

Function.prototype.method = function(name, func) {
	if(!this.prototype[name]) {
		this.prototype[name] = func;
    }
	return this;
}

/***** Currying *****/
Function.method("curry", function() {
	var args = Array.prototype.slice.apply(arguments);
	var self = this;

	return function() {
		return self.apply(null, args.concat(Array.prototype.slice.apply(arguments)));
	}
})

/***** Memoization *****/
var add = function() {
	var args = Array.prototype.slice.call(arguments);
    return args.reduce(function(a, i) {
		return a + i; var shell = function (n) {
    }, 0);
}

var fibonacci = function (n) {
	return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}
fibonacci(8);

var fibonacci = function() {
	var memo = [0, 1];
	var fib = function(n) {
		console.log(x++);
		var result = memo[n];
		if(typeof result !== 'number') {
			result = fib(n-1) + fib(n-2);
			memo[n] = result;
		}
		return result;
	};

	return fib;
}();
fibonacci(8);

var memoizer = function(memo, baseFunc) {
	var shell = function(n) {
		var result = memo[n];
		if(typeof result !== 'number') {
			result = baseFunc(shell, n);
			memo[n] = result;
		}
		return result;
	}

	return shell;
}
var factorial = memoizer([1, 1], function(shell, n) {
	return n * shell(n - 1);
});


/***** Others *****/
Function.method("new", function() {
	var that = Object.create(this.prototype);

	var other = this.apply(that, arguments);

	if(typeof other === 'object') {
		return other;
	} else {
		that;
	}
})



Array.method("flatten", function() {
	return this.reduce(function(sum, value) {
		var items = Array.isArray(value)? value.flatten() : value;
		return sum.concat(items);
    }, []);
});
[1,2,3,[4,5],[6,[7,8]]].flatten()


keywords.filter(function(item, index, arr) {
	return arr.lastIndexOf(item) === index;
}).sort(function(a, b) {
	return a < b ? -1 : 1;
});





/***** Debouncing *****/
function debounce(func, wait) {
	var timer = null;
	return function() {
		var self = this;
		var args = Array.prototype.slice.call(arguments);
		if(timer) clearTimeout(timer);
		
		timer = setTimeout(function() {
			timer = null;
			func.apply(self, args);
        }, wait);
    }
}
window.addEventListener('resize', debounce(function() {
	console.log(window.innerWidth);
}, 250));




/***** Singleton *****/
var mySingleton = (function () {
  // Instance stores a reference to the Singleton
  var instance;
  function init() {
    // Singleton
    // Private methods and variables
    function privateMethod(){
        console.log( "I am private" );
    }
    var privateVariable = "Im also private";
    var privateRandomNumber = Math.random();
    return {
      // Public methods and variables
      publicMethod: function () {
        console.log( "The public can see me!" );
      },
      publicProperty: "I am also public",
      getRandomNumber: function() {
        return privateRandomNumber;
      }
    };
  };
  return {
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function () {
      if ( !instance ) {
        instance = init();
      }
      return instance;
    }
  };
})();


function BaseElement() {
  this.element = null;
  this.createElement = function() {
	var el = this.getElementString();
    this.element = $(el);
  }
}
BaseElement.prototype.appendToElement = function(el) {
	this.createElement();
	el.append(this.element);
};
function Button(title) {
  this.title = title;
  this.getElementString = function() {
	return "<button>" + title + "</button>";
  }
}
Button.prototype = new BaseElement();
var b1 = new Button("Submit");  



function BaseElement() {
  this.element = null;
  this.createElement = function() {
	var el = this.getElementString();
    this.element = $(el);
  }
}
BaseElement.prototype.appendToElement = function(el) {
	this.createElement();
	el.append(this.element);
};
function Button(title) {
  BaseElement.call(this);
  this.title = title;
  this.getElementString = function() {
	return "<button>" + title + "</button>";
  }
}
var b1 = new Button("Submit");



function BaseElement() {
  this.element = null;
  this.createElement = function() {
	var el = this.getElementString();
    this.element = $(el);
  }
}
BaseElement.prototype.appendToElement = function(el) {
	this.createElement();
	el.append(this.element);
};
function Button(title) {
  BaseElement.call(this);
  this.title = title;
  this.getElementString = function() {
	return "<button>" + title + "</button>";
  }
}
Button.prototype = Object.create(BaseElement.prototype);
var b1 = new Button("Submit");




/***** jQuery Function *****/
$.grep([1,2,3,4,5,6,7,8,9,10], function(val, i) {
  return elem % 3 === 0;
});

jQuery filer is intended to be used with html elements and returns jQuery objects. It is also a chainable function which accpets filters like :first-child, :even etc.

$("li").filter(":even").filter(function(i, elem) {
  return i % 10 === 0;
}).css("background-color", "tomato");
jQuery grep is intended to be used with arrays.

var persons = [{name: 'prasanna', age: 23}, {name: 'prasanna', age: 31}, {name: 'prasanna', age: 28}];
$.map(persons, function(val, i) {
  return val.age;
});

function findMissingNumber(arr) {
  var count = arr.length + 1;
  var expectedTotal = count * (count + 1)/2;
  var actualTotal = a.reduce(function(sum, value) {
    return sum + value;
  }, 0);

  return expectedTotal - actualTotal;
}



/******* Eze Software *******/
function checkBalanced(str) {
  var stack = [];
  for (var i = 0; i < str.length; i++) {
    if (str[i] === '<') stack.push(str[i]);
    else if (str[i] === '>') {
      if (!stack.pop()) {
        break;
      }
    }
  }
  if (!stack.length && i === str.length) {
    return true;
  } else {
    return false;
  }
}

function balancedOrNot(expressions, maxReplacements) {
  var result = [];
  for (var i = 0; i < expressions.length; i++) {
    if (checkBalanced(expressions[i])) {
      result[i] = 1;
    } else {
      var flag = 0;
      for (var j = 0; j < maxReplacements[i]; j++) {
        expressions[i] = expressions[i].replace('>', '<>');
        if (checkBalanced(expressions[i])) {
          result[i] = 1;
          flag = 1;
          break;
        }
      }
      if (flag) {
        continue;
      } else {
        result[i] = 0;
      }
    }
  }
  return result;
}



function minimumMoves(a, m) {
  var moves = 0;
  for(var i = 0; i < a.length; i++) {
    var str1 = a[i]+"";
    var str2 = m[i]+"";
    for(var j = 0; j < str1.length; j++) {
      moves += Math.abs(parseInt(str1[j]) - parseInt(str2[j]));
        }
    }
  return moves;
}


function binaryAcending(elements) {
  function dec2bin(dec) {
    return (dec >>> 0).toString(2);
  }

  function count1s(bin) {
    return (bin.match(/1/g) || []).length
  }
  let temp = elements.map((value, i) => {
    let obj = {
      element: value,
      binary: dec2bin(value)
    };
    obj.countOf1s = count1s(obj.binary);
    return obj;
  });
  temp.sort(function(a, b) {
    if (a.countOf1s < b.countOf1s) return -1;
    else if (a.countOf1s > b.countOf1s) return 1;
    else {
      if (a.element < b.element) return -1;
      else if (a.element > b.element) return 1;
      else return 0;
    };
  });
  return temp.map((v) => v.element);
}

function stack() {
  this.elements = [];
  this.minStack = [];
  this.maxStack = [];
  this.getMin = function() {
    let len = this.minStack.length;
    return (len != 0 ? this.minStack[len - 1] : undefined);
  };
  this.getMax = function() {
    let len = this.maxStack.length;
    return (len != 0 ? this.maxStack[len - 1] : undefined);
  }
  this.push = function(elem) {
    if (this.elements.length == 0) {
      this.minStack.push(elem);
      this.maxStack.push(elem);
    } else {
      let len = this.minStack.length;
      if (this.minStack[len - 1] > elem) {
        this.minStack.push(elem);
      } else {
        this.minStack.push(this.minStack[len - 1]);
      }

      if (this.maxStack[len - 1] < elem) {
        this.maxStack.push(elem);
      } else {
        this.maxStack.push(this.maxStack[len - 1]);
      }      
    }
    this.elements.push(elem);
  }
  this.pop = function(elem) {
    if (this.elements.length) {
      this.minStack.pop();
      return this.elements.pop();
    }
    return undefined;
  }
}


/***** Find out middle element in a linked list *****/
while(current.next() != null){
    length++;
    if(length%2 ==0){
        middle = middle.next();
    }
    current = current.next();
}

if(length%2 == 1){
    middle = middle.next();
}


@Pipe({name: 'groupBy'})
export class GroupByPipe implements PipeTransform {
  transform(value: Array<any>, field: string): Array<any> {
    const groupedObj = value.reduce((prev, cur)=> {
      if(!prev[cur[field]]) {
        prev[cur[field]] = [cur];
      } else {
        prev[cur[field]].push(cur);
      }
      return prev;
    }, {});
    return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
  }
}

<div *ngFor="let item of employees | groupBy:'department'">
  Department {{ item.key }} has {{ item.value.length }} employees
</div>


