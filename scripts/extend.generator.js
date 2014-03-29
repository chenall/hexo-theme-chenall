var extend = hexo.extend;
var route = hexo.route;
var fs = require('fs');

extend.generator.register(function(locals, render, callback){
  if (usercfg && usercfg.themeconfig && usercfg.themeconfig.ajax_widgets){
    var base_path = hexo.theme_dir + 'layout/_widgets/static/';

    if (!fs.existsSync(base_path)) callback();

    var files=fs.readdirSync(base_path);
    files.forEach(function(file){
      var ff = file.match(/^(.+)\.ejs$/);

      if (ff == null) return;

      render('widgets/'+ff[1]+'.html', ['widget'],{name: ff[1],layout: 'widget'});
    });
  }
  callback();
});

extend.generator.register(function(locals, render, callback){
  var posts = locals.posts;
  var SitePosts = [];
  posts.each(function(item){
    SitePosts.push({title: item.title,uri: item.path});
  })
  route.set('js/posts.js',JSON.stringify(SitePosts));
  callback();
});

hexo.on('generateBefore',function(){
  hexo.log.d('generateBefore');
})
hexo.on('generateAfter',function(){
  hexo.log.d('generateAfter');
})
