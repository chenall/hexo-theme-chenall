var fs = require('fs');
var userConfig = function()
{
  var configFile = hexo.source_dir + '_config.yml';
  if (!fs.existsSync(configFile))
  {
    configFile = hexo.theme_dir + '_config.yml';
    if (!fs.existsSync(configFile))
      return;
  }
  var cfg = global.usercfg = hexo.render.renderSync({path: configFile});
  cfg.cached_widgets = new Object;
  cfg.twbs_style = ['primary','success','info','warning','danger'];
  cfg.twbs_sty = function(i){return cfg.twbs_style[i%4];}
  UserConfig = null;//To Reload User Config
  hexo.log.d("User Configuration file load successfully.")
}

hexo.on('processAfter', userConfig);

var add_module = function(mod)
{
  if (usercfg.loaded_modules.indexOf(mod) < 0)
  {
    usercfg.loaded_modules.splice(-2,0,mod);
    hexo.log.d("Add Module: " + mod);
  }
}

var RealPath = function(item)
{
  var config = this.config || hexo.config;
  var root = config.root;
  if (!/^([a-z]+:)?\/{1,2}/.test(item)) item = root + item;
  return item;
}

hexo.extend.helper.register('add_module', add_module);
hexo.extend.helper.register('RealPath', RealPath);
hexo.extend.helper.register('load_widgets',function(name,item,index){return usercfg.load_widgets(name,item,index);});

hexo.__dump = function(obj)
{
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