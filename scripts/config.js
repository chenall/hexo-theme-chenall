var fs = require('fs');

hexo.util.fs = fs;

var iLink = function(args, content){
  return '<!--[iLink[' + args.join(' ') + ']iLink]-->';
}

hexo.extend.tag.register('iLink',iLink);
hexo.extend.tag.register('ilink',iLink);

hexo.extend.tag.register('ijs',function(args, content){
  return '<!--[ijs[(function(){' + content + '})();]ijs]-->';
},true);

var userConfig = function()
{
  var configFile = hexo.source_dir + '_'+ hexo.config.theme+ '.yml';

  if (!fs.existsSync(configFile))
  {
    configFile = hexo.theme_dir + '_config.yml';
    if (!fs.existsSync(configFile))
      return;
  }
  hexo.log.d('Theme config file: ' + configFile.green);
  var cfg = global.usercfg = hexo.render.renderSync({path: configFile});
  var user_module_dir = hexo.source_dir + '_modules/';
  var user_widget_dir = hexo.source_dir + '_widgets/';
  
  if (fs.existsSync(user_widget_dir))
    cfg.user_widget_dir = user_widget_dir;

  if (fs.existsSync(user_module_dir))
    cfg.user_module_dir = user_module_dir;

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

var excerpt = function(data, callback){
  if (!data.excerpt && data.description){
    data.excerpt = data.description;
  }
  callback(null, data);
};

hexo.extend.helper.register('add_module', add_module);
hexo.extend.helper.register('RealPath', RealPath);
hexo.extend.helper.register('load_widgets',function(name,item,index){return usercfg.load_widgets(name,item,index);});
hexo.extend.filter.register('post', excerpt);

/*
hexo.extend.processor.register('_',function(data,callback){
  hexo.log.log(data);
  callback();
})
*/

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