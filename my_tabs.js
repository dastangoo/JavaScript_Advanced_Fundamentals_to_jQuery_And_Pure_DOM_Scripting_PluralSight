(function(){

  var tabPanel = function($li){
    var selector = $li.find("a").attr("href");
    return $(selector);
  }
  $.fn.tabs = function(){
    $.each(this, function(i, ul){
      var $ul = $([ul]);
      var $activeLi;
      $.each($ul.children(), function(i, li){
        var $li = $([li]);
        if (i == 0) {
          $activeLi = $li;
        }
        else {
          var $div = tabPanel($li);
          $div.hide();
        }
      });
      $ul.children().bind("click", function(){
        tabPanel($activeLi).hide();
        $activeLi = $([this]);
        tabPanel($activeLi).show();
        ev.preventDefault();
        
      });
    });
  };

$("#breeds").tabs()
})();
