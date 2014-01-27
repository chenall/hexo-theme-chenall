
if (hexo.hasOwnProperty('env') && hexo.env.hasOwnProperty('debug')) hexo.debug = hexo.env.debug;

var iLink = function(args, content){
  return '<!--[iLink[' + args.join(' ') + ']iLink]-->';
}

hexo.extend.tag.register('iLink',iLink);
hexo.extend.tag.register('ilink',iLink);

hexo.extend.tag.register('ijs',function(args, content){
  return '<!--[ijs[(function(){' + content + '})();]ijs]-->';
},true);

var load_default_usercfg = function(){
  var cfg = global.usercfg = {
    ajax_widgets: true,
    updated: true,
    cached_widgets:true
  };
  cfg.twbs_style = ['primary','success','info','warning','danger'];
  cfg.twbs_sty = function(i){return cfg.twbs_style[i%4];}
}

var load_usercfg = function(data,callback){
  if (data.type == 'delete'){
    usercfg.themeconfig = false;
  } else {
    hexo.log.i("User config file: " + data.source.green);
    usercfg.themeconfig = hexo.render.renderSync({path: data.source});
    hexo.log.d("User Configuration file load successfully.");
  }

  usercfg.cached_widgets = {};
  usercfg.updated = true;

  callback();
}

hexo.on('ready',load_default_usercfg);
//hexo.on('processBefore',userConfig);
//hexo.once('processAfter', userConfig);
hexo.extend.processor.register('_' + hexo.config.theme + '.yml',load_usercfg);

hexo.__dump = function(obj){
  var cache = [];
  return JSON.stringify(obj,function(key, value){
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return;
      }
      cache.push(value);
    }
    return value;
  });
}