var extend = hexo.extend;
var route = hexo.route;
var fs = require('fs');

extend.generator.register(function(locals, render, callback){
  if (usercfg && usercfg.ajax_widgets)
  {
    var base_path = hexo.theme_dir + 'layout/_widget/static/';
    if (!fs.existsSync(base_path)) callback();
    var files=fs.readdirSync(base_path);
    files.forEach(function(file){
      var ff = file.match(/^(.+)\.ejs$/);
      if (ff == null)
        return;
      render('widgets/'+ff[1]+'.html', ['widget'],{name: ff[1],layout: 'widget'});
    });
  }
  callback();
});

hexo.on('generateBefore',function(){
  hexo.log.log('generateBefore');
})
hexo.on('generateAfter',function(){
  hexo.log.log('generateAfter');
})
