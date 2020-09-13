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
  $('.manager-monet__check').on('click', function() {
    if(this.checked) {
      $(this).val(true)
    } else {
      $(this).val(false)
    }
  })
  $('.pay__item--check').on('click', function() {
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
  $("body").on("contextmenu", false);


  var deltaNotNal = document.querySelectorAll(".delta-notnal");
  var deltaNotNalOut = document.querySelectorAll(".delta-notnal__out"); 
  var productNumber = document.querySelectorAll(".products-number");
  var deltaNal = document.querySelectorAll(".delta-nal");
  var deltaNalOut = document.querySelectorAll(".delta-nal__out"); 


  var outDeltaNotNal = [];
  var outDeltaNal = [];

  for(var i = 0; i < deltaNotNal.length; i++) {
    outDeltaNotNal[i] = Math.round(+deltaNotNal[i].innerHTML / +productNumber[i].innerHTML);
  }

  for(var i = 0; i < deltaNotNalOut.length; i++) {
    deltaNotNalOut[i].innerHTML = outDeltaNotNal[i];
  }

  for(var i = 0; i < deltaNal.length; i++) {
    outDeltaNal[i] = Math.round(+deltaNal[i].innerHTML / +productNumber[i].innerHTML);
  }

  for(var i = 0; i < deltaNalOut.length; i++) {
    deltaNalOut[i].innerHTML = outDeltaNal[i];
  }

  var checkMoneySum = document.querySelectorAll('.manager-monet__check');
  var autosum = document.querySelector('.money__autosum--out');
  var arr = [];
  for(var i = 0; i < checkMoneySum.length; i++) {
    checkMoneySum[i].onclick = function() {
      var mon = +this.parentElement.previousElementSibling.children[1].innerHTML;
      var sum = 0;
      if(this.value == "true") {
        arr.push(mon);
        for(var j = 0; j < arr.length; j++) {
          sum += arr[j];
        }
      } else {
        arr.pop(mon);
        for(var j = 0; j < arr.length; j++) {
          sum += arr[j];
        }
      }
      autosum.innerHTML = sum;
    }
  }

  var buttonDelete = document.querySelectorAll(".button-delete");
  for(var i = 0; i < buttonDelete.length; i++) {
    buttonDelete[i].onclick = function() {
      var deletes = confirm("Ви впевнені що бажаєте видалити?")
      if(deletes == false) {
       return false;
      } else {
        return true;
      }
    }
  }

  var paySumMoney = document.querySelectorAll('.pay__item--check');
  var paySum = document.querySelector('.pay__sum--span');
  var arrmoney = [];
  for(var i = 0; i < paySumMoney.length; i++) {
    paySumMoney[i].onclick = function() {
      var mon = +this.parentElement.previousElementSibling.children[1].innerHTML;
      var sum = 0;
      if(this.value == "true") {
        arrmoney.push(mon);
        for(var j = 0; j < arrmoney.length; j++) {
          sum += arrmoney[j];
        }
      } else {
        arrmoney.pop(mon);
        for(var j = 0; j < arrmoney.length; j++) {
          sum += arrmoney[j];
        }
      }
      paySum.innerHTML = sum;
    }
  }

  var clientInfoSelector = document.querySelectorAll('.client-info__selector');
  for(var i = 0; i < clientInfoSelector.length; i++) {
    clientInfoSelector[i].onclick = function() {
      var before = this.previousElementSibling;
      before.value = this.value;
    }
  }

  setInterval(function() {
    window.location.href = '/api/auth/logout';
  }, 600000);
});
