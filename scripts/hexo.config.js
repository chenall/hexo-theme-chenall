var path = require('path');
var config_dir = path.dirname(hexo.configfile);
var config = hexo.config;

var joinPath = function(){
  var str = path.join.apply(this, arguments);

  if (str[str.length - 1] !== path.sep) str += path.sep;

  return str;
};

['public_dir','source_dir'].forEach(function(p){
  if (!config[p]){
    hexo.constant(p,joinPath(config_dir,p));
  } else {
    var test = config[p].match(/^:config(.*)$/);
    if (test){
      hexo.constant(p,joinPath(config_dir,test[1]));
    }
  }
})