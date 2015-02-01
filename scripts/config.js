var path = require('path'),
  fs = require('fs'),
  Source = require(hexo.lib_dir + '/core/source'),
  config_dir = path.dirname(hexo.configfile),
  config = hexo.config;

function testver(){
  var ver = hexo.env.version.split('.');
  var test = true;

  if (ver[0] < 2) test = false;
  else if (ver[0] == 2 && ver[1] < 5) test = false;

  if (test) return;
  
  var hexo_curver = 'hexo'.red + (' V' + hexo.env.version).green;
  var theme_curver = 'chenall'.green  + ' V2.2'.red;
  
  var error = 'Current version of ' + hexo_curver + ' Does not apply to the theme ' + theme_curver;
  error += ',Please use theme ' + 'chenall '.green + 'V1.0'.red + ' or upgrade to' + ' hexo 2.5.0 '.green + 'or latest.';
  error +='\n\n\t当前版本 ' + hexo_curver + ' 不适用于主题 ' + theme_curver + '\n请使用' + 'chenall '.green + 'V1.0'.red + ' 版主题或升级hexo到' + ' 2.5.0 '.green + '以上';
  error +='\n\nchenall V1.0:\n' + 'svn co https://github.com/chenall/hexo-theme-chenall/tags/V1.0 themes/chenall'.yellow;
  error +='\n\nhexo latest(升级):\n\t' + 'npm update hexo'.yellow;
  error +='\n\nhexo V2.5.X(安装指定版本):\n\t' + 'npm install hexo@2.5.3 -g'.yellow;
  error += '\n\n\t有什么疑问可以联系我 http://chenall.net';
  hexo.log.e(error);  
  process.exit(1);
}

function checkenv(){
  var store = hexo.extend.renderer.store;
  var error = '';
  if (!store['ejs']) error += '\tnpm install hexo-renderer-ejs\n';
  if (!store['md']) error += '\tnpm install hexo-renderer-marked\n';
  if (!store['styl']) error +='\tnpm install hexo-renderer-stylus\n';

  if (error){
    hexo.log.e('\t主题使用环境检测失败\n\n\t缺少必要插件,请使用以下命令安装:\n\n',error);
    process.exit(1);
  }
}

testver();
checkenv();

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
    hexo.log.i("Theme config file: " + user_cfg.green);
  }

  cfg.twbs_sty = function(i){return cfg.twbs_style[i%4];}
  hexo.log.d('Using theme ' + 'chenall V2.2'.green);
}

hexo.on('ready',load_default_usercfg);
