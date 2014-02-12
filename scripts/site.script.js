var fs=require('fs'),
  file = hexo.file,
  path = require('path'),
  scriptDir = path.join(hexo.source_dir,'_scripts') ;

if (fs.existsSync(scriptDir)){
  file.list(scriptDir, function(err, files){
    if (err) return;

    files.forEach(function(item){
      try {
        require(path.join(scriptDir, item));
        hexo.log.d('Site Script load successfully: ' + item);
      } catch (err){
        hexo.log.e('Site Script load failed: ' + item);
      }
    });
  });
}
