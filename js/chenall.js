function loadjs(c,d){var a=document.createElement("script");a.async=!0;a.type="text/javascript";a.src=c;a.charset=d||"gbk";(document.getElementsByTagName("HEAD")[0]||document.getElementsByTagName("BODY")[0]).appendChild(a)};
var _protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
function SetToolTip(obj){
  if (!obj) obj = $('a');
  obj.mouseover(function(e){
    this.myTitle = this.title || this.innerText;
    this.myHref = decodeURI(this.href);
//    this.myHref = (this.myHref.length > 30 ? this.myHref.toString().substring(0,35)+"..." : this.myHref);
    this.title = "";
    var tooltip = "<div id='tooltip'><p>"+this.myTitle+"<em>"+this.myHref+"</em>"+"</p></div>";
    $('body').append(tooltip);
    $('#tooltip').css({"opacity":"0.8","top":(e.pageY+20)+"px","left":(e.pageX+10)+"px"}).show('fast');
  }).mouseout(function(){this.title = this.myTitle;$('#tooltip').remove();
  }).mousemove(function(e){$('#tooltip').css({"top":(e.pageY+20)+"px","left":(e.pageX+10)+"px"});
  });
}
jQuery(document).ready(function($){
  SetToolTip();
  $('.content p:first-child').addClass("fp");
  $('.ajax_widgets').each(function(){var src=$(this).attr('data-src');if(src)$(this).load(BASE_URI + 'widgets/'+src+'.html',function(){SetToolTip($(this).find('a'));});});
  $.each(_js2load,function(index,obj){loadjs(obj.src,obj.charset)});
})
