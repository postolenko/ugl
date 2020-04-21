function getAnimation() {
  $(".animate").each(function() {
    if( $(this).offset().top <= $(document).scrollTop() + $(window).height() ) {
      $(this).addClass("active");
    }
  });
}
var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;
$(window).resize(function() {
  getAnimation();
  bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;
});
$(document).scroll(function() {
  getAnimation();
});
$(document).ready(function() {
  getAnimation();
  // ---------------------
  $("[data-popup-link]").on("click", function(e) {
      e.preventDefault();
      popupName = $(this).attr("data-popup-link");
      div = document.createElement('div');
      div.style.overflowY = 'scroll';
      div.style.width = '50px';
      div.style.height = '50px';
      div.style.visibility = 'hidden';
      document.body.appendChild(div);
      scrollWidth = div.offsetWidth - div.clientWidth;
      document.body.removeChild(div);
      $("body").addClass("fixed");
      $("body").css({
          "position" : "fixed",
          "top" :  -$(document).scrollTop() + "px",
          "overflow" : "hidden",
          "right" : 0,
          "left" : 0,
          "bottom" : 0,
          "padding-right" : scrollWidth + "px"
      });
      $(".popup_bg").fadeIn(300);
      $("[data-popup = '"+ popupName +"']").fadeIn(300);
  });
  $(".close_popup, .popup_bg").on("click", function(e) {
      e.preventDefault();
      curTop = $("body").css("top");
      curTop = Math.abs(parseInt(curTop, 10));
      $("body").attr("style", "");
      if (curTop !== 0) {
          $("html").scrollTop(curTop);
      }
      $("body").removeClass("fixed");
      $(".popup_bg").fadeOut(300);
      $(this).closest("[data-popup]").fadeOut(300);
  });
  $(this).keydown(function(eventObject){
      if (eventObject.which == 27 ) {
          curTop = $("body").css("top");
          curTop = Math.abs(parseInt(curTop, 10));
          $("body").attr("style", "");
          if (curTop !== 0) {
              $("html").scrollTop(curTop);
          }
          $("body").removeClass("fixed");
          $(".popup_bg").fadeOut(300);
          $("[data-popup]").fadeOut(300);
      }
  });
  $(document).on("mouseup", function(e) {
    if($(".popup").is(":visible")) {
      e.preventDefault();
      hide_element = $(".popup_content");
      if (!hide_element.is(e.target)
          && hide_element.has(e.target).length === 0) {
          curTop = $("body").css("top");
          curTop = Math.abs(parseInt(curTop, 10));
          $("body").attr("style", "");
          if (curTop !== 0) {
              $("html").scrollTop(curTop);
          }
          $("body").removeClass("fixed");
          $(".popup_bg").fadeOut(300);
          $("[data-popup]").fadeOut(300);
      }
    }
  });
  $("input[type='tel']").mask("+7 (999) 999-99-99");
  // ----------
  $(".respmenubtn").click(function(e) {
      e.preventDefault();
      if( $("#resp_nav").is(":hidden") ) {
          $("#resp_nav").fadeIn(300);
          $(this).addClass("active");
      } else {
          $("#resp_nav").fadeOut(300);
          $(this).removeClass("active");
      }
  });
  $("#resp_nav .close_btn").on("click", function(e) {
      e.preventDefault();
      $("#resp_nav").fadeOut(300);
      $(".respmenubtn").removeClass("active");
  });
  $(this).keydown(function(eventObject){
      if (eventObject.which == 27 &&
          $("#resp_nav").is(":visible") &&
          bodyWidth <= 767) {
              $("#resp_nav").fadeOut(300);
              $(".respmenubtn").removeClass("active");
      }
  });
  // ----------
});