
$ = function(selector) {
  if (!(this instanceof $)) {
    return new $(selector);
  }
  var elements = document.querySelectorAll(selector);

  // Array.prototype.push.call(this, elements);
  for (var i = 0; i < elements.length; i++) {
    this[i] = elements[i];
  }
  this.length = elments.length;
};

tabs.$ = $;

var getText = function(el){
  var txt = "";
  $.each(el.childNodes, function(i, childNode){
    if (childNode.nodeType === NODE.TEXT_NODE) {
      txt += childNode.nodeValue;
    } else if(childNode.nodeType === NODE.COMMENT_NODE){
      txt += getText(childNode);
    }
  })

  return txt;
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
      $.each(this, function(i, el){
        el.innerHTML = newHtml;
      });
      return this;
    }
    else {
      //return this[0] && this[0].innerHTML;
      return this[0].innerHTML;
    }
  },
  val: function(newVal){
    if(arguments.length){
      $.each(this, function(i, el){
        el.value = newVal;
      });
      return this;
    }
    else{
      //return this[0] && this[0].value;
      return this[0].value;
    }
  },
  text: function(newText){
    this.html("");
    if(arguments.length){
      return $.each(this, function(i, el){
        // el.innerHTML = "";
        var text = document.createTextNode(newText);
        el.appendChild(text);
      });
    }
    else {
      return this[0] && getText(this[0]);
    }
  }
});
