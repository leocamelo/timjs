var Tim = (function(){
  function isObject(a){
    return typeof a == 'object';
  }

  function merge(a, b){
    a = a || {};
    b = b || {};
    var c = {};
    for(var i in a){
      c[i] = a[i];
    }
    for(var i in b){
      c[i] = isObject(c[i]) ? merge(c[i], b[i]) : b[i];
    }
    return c;
  }

  function tagWithProps(tag, props){
    for(var i in props){
      tag += ' ' + i + '="' + props[i] + '"';
    }
    return tag;
  }

  var _defaults = {
    form: { method: 'post', 'accept-charset': 'UTF-8' },
    input: { type: 'text' }, a: { href: '#' },
    button: { type: 'button' }
  };

  var _fwDefaults = {
    bootstrap: {
      input: { class: 'form-control' },
      textarea: { class: 'form-control' },
      button: { class: 'btn' }
    }
  };

  var Tim = function(options){
    if(isObject(options)){
      var defaults = _defaults;
      if(options.framework){
        defaults = merge(defaults, _fwDefaults[options.framework] || {});
      }
      if(isObject(options.defaults)){
        defaults = merge(defaults, options.defaults);
      }
      this.options = merge(options, { defaults: defaults });
    }else{
      this.options = { defaults: _defaults };
    }
  };

  Tim.prototype.tag = function(tag, props){
    tag = tag || 'br';
    props = merge(this.options.defaults[tag], props);
    return '<' + tagWithProps(tag, props) + '>';
  };

  Tim.prototype.contentTag = function(tag, props, content){
    tag = tag || 'div';
    props = merge(this.options.defaults[tag], props);
    return '<' + tagWithProps(tag, props) + '>' + (content || '') + '</' + tag + '>';
  };

  Tim.prototype.div = function(props, content){
    return this.contentTag('div', props, content);
  };

  Tim.prototype.form = function(props, content){
    return this.contentTag('form', props, content);
  };

  Tim.prototype.label = function(props, content){
    return this.contentTag('label', props, content);
  };

  Tim.prototype.input = function(props){
    return this.tag('input', props);
  };

  Tim.prototype.textarea = function(props, content){
    return this.contentTag('textarea', props, content);
  };

  Tim.prototype.a = function(props, content){
    return this.contentTag('a', props, content);
  };

  return Tim;
}());
