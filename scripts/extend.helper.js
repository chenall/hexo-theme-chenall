var path = require('path'),
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

helper.register('_partial',function(view,opt){
  var src = path.resolve(path.dirname(this.filename), view);

  if (!path.extname(src)) src += path.extname(this.filename);

  var type = src.slice(this.view_dir.length);

  if (type[0] == '_'){
    var dst = path.join(hexo.source_dir,type);
    if (fs.existsSync(dst)) hexo.log.d(dst),view = dst.replace(/\\/g, '/');
  }

  return this.partial(view,opt);
})

helper.register('add_module', add_module);
helper.register('RealPath', RealPath);
helper.register('load_widgets',function(name,item,index){return usercfg.load_widgets(name,item,index);});
