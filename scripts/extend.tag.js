var extend = hexo.extend.tag;

var iLink = function(args, content){
  return '<!--[iLink[' + args.join(' ') + ']iLink]-->';
}

extend.register('iLink',iLink);
extend.register('ilink',iLink);

extend.register('ijs',function(args, content){
  return '<!--[ijs[(function(){' + content + '})();]ijs]-->';
},true);
