var path = require('path'),
  fs = require('fs'),
  Source = require(hexo.lib_dir + '/core/source'),
  config_dir = path.dirname(hexo.configfile),
  config = hexo.config;

if (hexo.hasOwnProperty('env') && hexo.env.hasOwnProperty('debug')) hexo.debug = hexo.env.debug;

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

if (config.CustomDir && typeof(config.CustomDir) == 'object'){
  var joinPath = function(){
    var str = path.join.apply(this, arguments);
    if (str[str.length - 1] !== path.sep) str += path.sep;
    return str;
  };

  var custom = config.CustomDir;

  ['public_dir','source_dir','scaffold_dir'].forEach(function(p){
    if (!custom[p]) return;

    if (custom[p] == 'auto'){
      hexo.constant(p,joinPath(config_dir,p));
    } else {
      var test = custom[p].match(/^:config(.*)$/);

      if (test){
        hexo.constant(p,joinPath(config_dir,test[1]));
      } else {
        hexo.constant(p,joinPath(config_dir,custom[p]));
      }
    }
  })

  hexo.source = new Source();
}

var load_default_usercfg = function(){
  var cfg = global.usercfg = {
    ajax_widgets: true,
    updated: true,
    cached_widgets:true
  };
  cfg.twbs_style = ['primary','success','info','warning','danger'];
  var user_cfg = hexo.source_dir + '_' + hexo.config.theme + '.yml';

  if (!fs.existsSync(user_cfg)){
    user_cfg = hexo.theme_dir + '_config.yml';
    cfg.themeconfig = hexo.render.renderSync({path: user_cfg});
    hexo.log.i("User config file: " + user_cfg.green);
  }

  cfg.twbs_sty = function(i){return cfg.twbs_style[i%4];}
}

hexo.on('ready',load_default_usercfg);
