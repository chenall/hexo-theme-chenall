var util = hexo.util,
  format = util.format;
var description = function(data, callback){
  if (data.slug == 'test')
    hexo.log.log(data);
  if (!data.description){
    var text = data.content.replace(/<\/(p|br)>/i,'$&\n')
                .replace(/<pre>[\s\S]+?<\/pre>/g,'');
    text = format.strip_html(text).trim();
    if (text.length > 100){
      var i = 100;
      for(len=text.length;i<len;++i){
        var ch = text[i];
        switch(ch){
          case '\r':case '\n':
            break;
          default:
            continue;
        }
        break;
      }
      text = text.substr(0,i);
    }
    data.description = text;
  }
  callback(null, data);
};

var excerpt = function(data, callback){
  if (!data.excerpt && data.description)  data.excerpt = data.description;
  callback(null, data);
};

hexo.extend.filter.register('post', description);
//hexo.extend.filter.register('post', excerpt);