let userIcon = document.querySelectorAll(".show__table");
for(let i = 0; i < userIcon.length; i++) {
  userIcon[i].onclick = function() {
    this.nextElementSibling.classList.toggle("none");
  }
}

$(document).ready(function(){
  $(".btn-nav").on("click", function() {
      var target = $(this).data("target");
      $(target).toggleClass("nav__list--open");
  });
  $('.user-edit__checkbox').on('click', function() {
    if(this.checked) {
      $(this).val(true)
    } else {
      $(this).val(false)
    }
  })
  $('.pith__check').on('click', function() {
    if(this.checked) {
      $(this).val(true)
    } else {
      $(this).val(false)
    }
  })
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 250) {
      $('.client-product__menu').addClass("f-menu");
    } else {
      $('.client-product__menu').removeClass("f-menu");
    }
  });
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 0) {
      $('.client-allseler__menu').addClass("f-menu");
    } else {
      $('.client-allseler__menu').removeClass("f-menu");
    }
  });
  // $("body").on("contextmenu", false);
  setInterval(function() {
    window.location.href = '/api/auth/logout';
  }, 600000);
});
