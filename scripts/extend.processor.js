var processor = hexo.extend.processor,
  pathFn = require('path'),
  View = require(hexo.lib_dir + 'theme/view'),
  yfm = hexo.util.yfm;

//站点自定义组件模块注册
processor.register('_:type/*path.ejs', function(data, callback){
  var path = data.params.path,
    extname = '.ejs',
    name = ':_'+ data.params.type + '/' + path,
    views = hexo.theme.views;

  if (!views.hasOwnProperty(name)) views[name] = {};

  var view = views[name][extname];

  if (view && data.type === 'delete'){
    view = null;
    return callback();
  }

  data.read({cache: true}, function(err, result){
    if (err) return callback(err);
    if (!view) view = views[name][extname] = new View(data.source, path, data.box);

    view.data = yfm(result);
    view.invalidate();
    callback();
  });
});

processor.register('_' + hexo.config.theme + '.yml',function(data, callback){
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
});