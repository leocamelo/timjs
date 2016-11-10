"use strict";

(function(root, factory){
  if(typeof module !== "undefined" &&
     typeof module.exports !== "undefined"){
    module.exports = factory();
  }else if(typeof define === "function" && define.amd){
    define(["Tim"], factory);
  }else{
    root.Tim = factory();
  }
}(this, function(){
  function _isUndefined(a){
    return typeof a == "undefined";
  }

  function _isObject(a){
    return a && a.constructor == Object;
  }

  function _isArray(a){
    return a && a.constructor == Array;
  }

  function _map(arr, tim, fn){
    var i = -1;
    var l = arr.length;
    var res = new Array(l);
    while(++i < l) res[i] = fn(tim, arr[i]);
    return res;
  }

  function _merge(a, b){
    var i, c = {};
    for(i in a){
      c[i] = a[i];
    }
    for(i in b){
      c[i] = _isObject(c[i]) && _isObject(b[i]) ? _merge(c[i], b[i]) : b[i];
    }
    return c;
  }

  function _tagWithProps(tag, props){
    var i, key, val;
    for(i in props){
      key = i.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      val = _isArray(props[i]) ? props[i].join(" ") : props[i];
      tag += " " + key + "=\"" + val + "\"";
    }
    return tag;
  }

  function _convertNode(tim, node){
    return _isArray(node) ? tim[node[0]](node[1], node[2]) : node;
  }

  function _tag(tag){
    return function(props){
      return this.tag(tag, props);
    }
  }

  function _contentTag(tag){
    return function(props, content){
      return this.contentTag(tag, props, content);
    }
  }

  function _listTag(tag){
    return function(props, content){
      if(_isArray(content)){
        var liGen = function(tim, li){
          return tim.li({}, _convertNode(tim, li));
        };
        content = _map(content, this, liGen).join("");
      }
      return this.contentTag(tag, props, content);
    }
  }

  var _defaults = {
    a: { href: "#" },
    input: { type: "text" },
    button: { type: "button" },
    form: { method: "post", "accept-charset": "UTF-8" }
  };

  var _fwDefaults = {
    bootstrap: {
      input: { class: "form-control" },
      select: { class: "form-control" },
      textarea: { class: "form-control" },
      button: { class: "btn btn-default" }
    }
  };

  function Tim(options){
    if(_isObject(options)){
      var defaults = _defaults;

      if(options.framework){
        defaults = _merge(defaults, _fwDefaults[options.framework]);
      }

      if(_isObject(options.defaults)){
        defaults = _merge(defaults, options.defaults);
      }

      this.options = _merge(options, { defaults: defaults });
    }else{
      this.options = { defaults: _defaults };
    }
  }

  Tim.prototype.do = function(content){
    return _map(content, this, _convertNode).join("");
  };

  Tim.prototype.tag = function(tag, props){
    props = _merge(this.options.defaults[tag], props);
    return "<" + _tagWithProps(tag, props) + ">";
  };

  Tim.prototype.contentTag = function(tag, props, content){
    props = _merge(this.options.defaults[tag], props);
    if(_isArray(content)) content = this.do(content);
    return "<" + _tagWithProps(tag, props) + ">" + (content || "") + "</" + tag + ">";
  };

  Tim.prototype.input = _tag("input");

  Tim.prototype.i = _contentTag("i");
  Tim.prototype.h1 = _contentTag("h1");
  Tim.prototype.h2 = _contentTag("h2");
  Tim.prototype.h3 = _contentTag("h3");
  Tim.prototype.h4 = _contentTag("h4");
  Tim.prototype.h5 = _contentTag("h5");
  Tim.prototype.h6 = _contentTag("h6");
  Tim.prototype.li = _contentTag("li");
  Tim.prototype.div = _contentTag("div");
  Tim.prototype.span = _contentTag("span");
  Tim.prototype.form = _contentTag("form");
  Tim.prototype.label = _contentTag("label");
  Tim.prototype.small = _contentTag("small");
  Tim.prototype.strong = _contentTag("strong");
  Tim.prototype.button = _contentTag("button");
  Tim.prototype.option = _contentTag("option");
  Tim.prototype.section = _contentTag("section");
  Tim.prototype.article = _contentTag("article");
  Tim.prototype.textarea = _contentTag("textarea");

  Tim.prototype.ul = _listTag("ul");
  Tim.prototype.ol = _listTag("ol");

  Tim.prototype.a = function(a, b, c){
    var props, content;
    if(_isUndefined(a) || _isObject(a)){
      props = a;
      content = b;
    }else{
      props = b || {};
      props.href = props.href || a;
      content = c;
    }
    return this.contentTag("a", props, content);
  };

  Tim.prototype.img = function(a, b){
    var props;
    if(_isUndefined(a) || _isObject(a)){
      props = a;
    }else{
      props = b || {};
      props.src = props.src || a;
    }
    return this.tag("img", props);
  };

  Tim.prototype.select = function(props, content){
    if(_isArray(content)) content = this.optionsForSelect(content);
    return this.contentTag("select", props, content);
  };

  Tim.prototype.optionsForSelect = function(options){
    for(var i = 0, l = options.length; i < l; i++){
      options[i] = _isArray(options[i])
        ? this.option({ value: options[i][1] }, options[i][0])
        : this.option({ value: options[i] }, options[i]);
    }
    return options.join("");
  };

  Tim.prototype.fa = function(icon, extras){
    extras = _isArray(extras) ? " fa-" + extras.join(" fa-") : "";
    return this.i({ class: "fa fa-" + icon + extras });
  };

  return Tim;
}));
