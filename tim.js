window.Tim = (function(){
  function isObject(a){
    return typeof a == 'object';
  }

  function isArray(a){
    return a.constructor == Array;
  }

  function merge(a, b){
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
      tag += ' ' + i + '="' + (isArray(props[i]) ? props[i].join(' ') : props[i]) + '"';
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
    props = merge(this.options.defaults[tag], props);
    return '<' + tagWithProps(tag, props) + '>';
  };

  Tim.prototype.contentTag = function(tag, props, content){
    props = merge(this.options.defaults[tag], props);
    return '<' + tagWithProps(tag, props) + '>' + (content || '') + '</' + tag + '>';
  };

  Tim.prototype.div = function(props, content){
    return this.contentTag('div', props, content);
  };

  Tim.prototype.ul = function(props, content){
    if(isArray(content)){
      for(var i = 0, l = content.length; i < l; i++){
        content[i] = this.li({}, content[i]);
      }
      content = content.join('');
    }
    return this.contentTag('div', props, content);
  };

  Tim.prototype.li = function(props, content){
    return this.contentTag('li', props, content);
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

  Tim.prototype.span = function(props, content){
    return this.contentTag('span', props, content);
  };

  Tim.prototype.small = function(props, content){
    return this.contentTag('small', props, content);
  };

  Tim.prototype.i = function(props, content){
    return this.contentTag('i', props, content);
  };

  Tim.prototype.fa = function(icon, extras){
    extras = extras && isArray(extras) ? ' fa-' + extras.join('fa-') : '';
    return this.i({ class: 'fa fa-' + icon + extras });
  }

  return Tim;
}());
