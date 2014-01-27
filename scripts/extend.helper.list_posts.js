var _ = require('lodash');

function get_posts(site,options){
  if (!options) {
    options = {};
  }

  options = _.extend({
    count: 6,
    orderby: 'date',
    order: -1,
    query:{tags: '',categories: '',operator: ''},
  }, options);

  var posts = site.posts;
  var query_data = [];
  var conditions = options.query;
  var query_operator = 'and';

  var findData = function(data,source){
    var len = source.length;
    if (len == 0) return true;
    for (var i = 0; i < len; ++i){
      if (data.indexOf(source[i]) != -1) return true;
    }
    return false;
  }

  var array_case_find = function(data,value){
    value = value.toUpperCase();
    for(var i=0,len=data.length;i<len;++i){
      if (data[i].toUpperCase() == value) return true;
    }
    return false;
  }

  var get_index = function(type,query){
    if (_.isObject(query['_index'])) return query._index;

    if (!_.isObject(query)) query = query.split(/\s*,\s*/);
    if (query && query.length){
      var data = site[type].find({name: {$where: function(name){return array_case_find(query,name)}}});
      return data._index;
    }
    return false;
  }

  var keys = Object.keys(conditions);

  for (var i = 0, len = keys.length; i<len; ++i){
    var key = keys[i],
        query = conditions[key];
    switch(key)
    {
      case 'tags':
      case 'categories':
        {
          var _index = get_index(key,query);
          if (_index && _index.length){
            var obj = {};
            obj[key]= {$where: function(data){return findData(data,_index)}};
            query_data.push(obj);
          }
        }
        break;
      case 'operator':
        query_operator = query;
        break;
      default:
        {
          var obj = {};
          obj[key] = (typeof query == 'function')?{$where: query}:query;
          query_data.push(obj);
        }
        break;
    }
  }

  if (options.posts) posts = options.posts;

  if (options.orderby){
    if (options.orderby == 'random')
      posts = posts.random();
    else
      posts = posts.sort(options.orderby, options.order);
  }

  if (query_data.length){
    var query = {};
    var query_opt;

    if (options.count) query_opt = {limit: options.count};

    query['$'+query_operator] = query_data;

    return posts.find(query,query_opt);
  }

  return options.count?posts.limit(options.count):posts;
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
      style: 'list',
      separator: ', ',
      class: 'post',
    }, options);

    var posts = get_posts(this.site,options),
      style = options.style,
      root = this.config.root,
      ul = '<ul class="' + (options.ulClass?options.ulClass:options.class) + '">',
      li = '<li class="' + (options.liClass?options.liClass:options.class + '-list-item') + '">',
      arr = [];

    posts.each(function(post){
      arr.push( '<a href="' + root + post.path + '">' + (post.title?post.title:post.slug) + '</a>');
    });

    if (arr.lentgh == 0) return '';

    if (style != 'list') return arr.join(options.separator);

    return  ul + li + arr.join('</li>' + li) + '</li></ul>';
  })
};
