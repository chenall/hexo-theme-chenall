var _ = require('lodash');

function get_posts(site,options){
  if (!options) {
    options = {};
  }

  options = _.extend({
    count: 6,
    orderby: 'date',
    order: -1,
    tags: '',
    categories: '',
  }, options);

  var posts = site.posts,tags,categories;
  var query_data = [];

  var findData = function(data,source){
    var len = source.length;
    if (len == 0) return true;
    for (var i = 0; i < len; ++i){
      if (data.indexOf(source[i]) != -1) return true;
    }
    return false;
  }


  var findtag = function(data){return findData(data,tags);}
  var findcategories = function(data){return findData(data,categories);}

  var array_case_find = function(data,value){
    value = value.toUpperCase();
    for(var i=0,len=data.length;i<len;++i){
      if (data[i].toUpperCase() == value) return true;
    }
    return false;
  }

  if (_.isObject(options.tags)){
    if (options.tags._index) tags = options.tags._index;
  } else {
    options.tags = options.tags.split(/\s*,\s*/);
    if (options.tags && options.tags.length){
      var data = site.tags.find({name: {$where: function(name){return array_case_find(options.tags,name)}}});
      tags = data._index;
    }
  }

  if (_.isObject(options.categories)){
    if (options.categories._index) categories = options.categories._index;
  } else {
    options.categories = options.categories.split(/\s*,\s*/);
    if (options.categories.length){
      var data = site.categories.find({name: {$where: function(name){return array_case_find(options.categories,name)}}});
      categories = data._index;
    }
  }

  if (tags && tags.length){query_data.push({type: 'tags',func: findtag});}
  if (categories && categories.length){query_data.push({type: 'categories',func: findcategories})}

  if (query_data.length){
    var query = {};
    query_data.forEach(function(data){
      query[data.type] = {$where: data.func};
    })
    posts = posts.find(query);
  }

  if (options.orderby == 'random')
    return posts.random().limit(options.count);
  return posts.sort(options.orderby, options.order).limit(options.count);
};

var helper = hexo.extend.helper;

if (!helper.store.get_posts){
  hexo.extend.helper.register('get_posts', function (options){
    return get_posts(this.site,options);
  });
}

if (!helper.store.list_posts){
  hexo.extend.helper.register('list_posts', function (options) {
    if (!options) {
      options = {};
    }

    options = _.extend({
      ulClass: '',
      liClass: '',
      class: 'list-group',
    }, options);

    var posts = get_posts(this.site,options);
    var style = options.style,
      ulClass = options.ulClass?options.ulClass:options.class;
      liClass = options.liClass?options.liClass:options.class + '-item';

    var result = '<ul class="' + ulClass + '">';
    var root = this.config.root;

    posts.each(function(post){
      result += '<li class="' + liClass + '"><a href="' + root + post.path + '">' + post.title + '</a></li>';
    });

    result += '</ul>'
    return result;
  })
};
