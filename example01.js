
$ = function(selector) {
  if (!(this instanceof $)) {
    return new $(selector);
  }

  debugger;
  var elements;
  if (typeof selector === 'string') {
    elements = document.querySelectorAll(selector);
  }
  else {
    elements = selector;
  }
  // Array.prototype.push.call(this, elements);
  for (var i = 0; i < elements.length; i++) {
    this[i] = elements[i];
  }
  this.length = elements.length;
};


var makeTraverser = function(cb){
  return function(){
    var elements = [], args = arguments;
    $.each(this, function(i, el){
      var ret = cb.apply(el, args);
      if (ret && isArrayLike(ret)) {
        [].push.apply(elements, ret);
      }
      else if (ret) {
        elements.push(ret);
      }
    });
    return $(elements);
  }
};
var getText = function(el){
  var txt = "";
  $.each(el.childNodes, function(i, childNode){
    if (childNode.nodeType === NODE.TEXT_NODE) {
      txt += childNode.nodeValue;
    } else if(childNode.nodeType === NODE.COMMENT_NODE){
      txt += getText(childNode);
    }
  });

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
      return fn.apply(context, arguments)
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
  },
  find: function(selector){
      var elements = [];

      $.each(this, function(i, el){
        var els = el.querySelectorAll(selector);
        [].push.apply(elements, els);
      });
      return $(elements);
  },

  next: makeTraverser(function(){
    var current = el.nextSibling;
    while(current && current.nodeType !== 1){
      current = current.nextSibling;
    }
    if (current) {
      elements.push(current);
    }
  }),

  prev: makeTraverser(function(){
    var current = el.previousSibling;
    while(current && current.nodeType !== 1){
      current = current.previousSibling;
    }
    if (current) {
      elements.push(current);
    }
  }),
  parent: makeTraverser(function(){
    return this.parentNode;
  }),
  children: makeTraverser(function(){
    return this.children;
  }),
  attr: function(attrName, value){
    if (arguments.length > 1) {
      return $.each(this, function(i, el){
        el.setAttribute(attrName, value);
      });
    }
    else {
      return this[0] && this[0].getAttribute(attrName);
    }
  },
  css: function(cssPropName, value){
    if (arguments.length > 1) {
      return $.each(this, function(i, el){
        el.style[cssPropName] = value;
      }
      );
    }
    else {
      return this[0] &&
            document.defaultView.getComputedStyle(this[0]).getPropertyValue(cssPropName);
    }
  },
  width: function(){
    var clientWidth = this[0].clientWidth;
    var leftPadding = this.css("padding-left"),
        rightPadding = this.css("padding-right");
    return clientWidth = parseInt(leftPadding) - parseInt(rightPadding);
  },
  offset: function(){
    var offset = this[0].getBoundingClientRect();
    return {
      top: offset.top + window.pageYOffset,
      left: offset.left + window.pageXOffset
    };
  },
  hide: function(){
    this.css("display", "none");
  },
  show: function(){
    this.css("display", ""):

      break;
  },

  //Events
  bind: function(eventName, handler){
    return $.each(this, function(i, el){
      el.addEventListener(eventName, handler, false);
    });
  },
  unbind: function(eventName, handler){
    return $.each(this, function(i, el){
      el.removeEventListener(eventName, handler, false);
    });

  },
  has: function(selector){
    var elements = [];

    $.each(this, function(i, el) {
      if (el.matches(selector)) {
        elements.push(el);
      }
    });
    return $(elements);
  },
  on: function(eventType, selector, handler){
    return this.bind(eventType, function(ev){

      var cur = ev.target;
      do {
        if ($([cur]).has(selector).length) {
          handler.call(cur, ev);
        }
        cur = cur.parentNode;
      } while (cur && cur !== ev.currentTarget);
    });
  },
  off: function(eventType, selector, handler) {},
  data: function(propName, data) {},

  //Extra
  addClass: function(className) {},
  removeClass: function(className) {},
  append: function(element) {},
});
fn: $.prototype;
