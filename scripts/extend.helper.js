var pathFn = require('path'),
  fs = require('fs'),
  helper = hexo.extend.helper;

var add_module = function(mod)
{
  if (usercfg.themeconfig.loaded_modules.indexOf(mod) < 0){
    usercfg.themeconfig.loaded_modules.splice(-2,0,mod);
    hexo.log.d("Add Module: " + mod);
  }
}

var RealPath = function(item){
  var config = this.config || hexo.config;
  var root = config.root;
  if (!/^([a-z]+:)?\/{1,2}/.test(item)) item = root + item;
  return item;
}

helper.register('_partial',function(view,opt,only){
  var viewDir = this.view_dir || this.settings.views,
    path = pathFn.join(pathFn.dirname(this.filename.substring(viewDir.length)), view);

  if (hexo.theme.getView(':' + path)) view = ':' + path;

  return this.partial(view,opt,only);
})

helper.register('add_module', add_module);
helper.register('RealPath', RealPath);
helper.register('load_widgets',function(name,item,index){return usercfg.load_widgets(name,item,index);});
