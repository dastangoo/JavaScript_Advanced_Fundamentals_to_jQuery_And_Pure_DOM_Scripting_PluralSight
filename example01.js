$ = function(selector) {
  var elements = document.querySelectorAll(selector);

  // Array.prototype.push.call(this, elements);
  for (var i = 0; i < elements.length; i++) {
    this[i] = elements[i];
  }
  this.length = elments.length;
};

$.extend = function(target, object){
    for(var prop in object){
      if (object.hasOwnProperty(prop)) {
        target[prop] = object[prop];
      }
    }
    return target;
}
var isArrayLike = function(obj){
  if (typeof obj.length === "number") {
    if(obj.length === 0){
      return true;
    }
    else if (obj.length > 0) {
      return (obj.length - 1) in obj;
    }
  }
  return false;
};

$.extend($.prototype, {
  isArray: function(obj){
    return Object.prototype.toString.call(obj) === "[object Array]";
  },
  each: function(collection, cb){
    if (isArrayLike(collection)) {
      for (var i = 0; i < collection.length; i++) {
        var value = collection[i];
        cb.call(value, i, value);

      }
    }
    else {
      for(var prop in collection){
        if (collection.hasOwnProperty(prop)) {
          var value = collection[prop];
          cb.call(value, prop, value);
        }
      }
    }
    return collection;
  },
  makeArray: function(arr){
    var array = [];
    $.each(arr, function(i, value){
      array.push(value);
    });
    return array;
  },
  proxy: function(fn, context){
    return function(){
      retrun fn.apply(context, arguments)
    };
  }
});

$.extend($.prototype, {
  html: function(newHtml){
    if(arguments.length){
      return $.each(this, function(i, el){});
    }
    else {

    }
  }
});
