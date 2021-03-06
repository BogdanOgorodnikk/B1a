$(document).ready(function(){
    $('#product-edit__click').on('click', function(e) {
        e.preventDefault();
        var id = $('.product-edit__id').attr('id');
        var price = $('#product-edit__price').val();
        var delivery = $('.product-edit__delivery-val').attr("id");
        var number = $('.product-edit__number-val').attr('id');
        var pricenotnal = $('.product-edit__pricenotnal-val').attr('id');
        var deliverynotnal = $('.product-edit__deliverynotnal-val').attr('id');
        var opt = $('.product-edit__opt-val').attr('id');
        var deltadebtnal = $('.product-edit__deltadebtnal-val').attr('id');
        var deltadebt = $('.product-edit__deltadebt-val').attr('id');
        if(price < 0) {
            $('.user-edit__form').before('<p class="register__error">' + 'Ви ввели не правильне число в ціну' + '</p>');
        } else if(delivery < 0) {
            $('.user-edit__form').before('<p class="register__error">' + 'Ви ввели не правильне число в доставку' + '</p>');
        } else if(number < 0) {
            $('.user-edit__form').before('<p class="register__error">' + 'Ви ввели не правильне число в кількість' + '</p>');
        } else {
            $(location).attr('href', `accountant/${id}/${price}/${delivery}/${number}/${pricenotnal}/${deliverynotnal}/${opt}/${deltadebtnal}/${deltadebt}`);
        }
    });
    $('#product-edit__click-admin').on('click', function(e) {
        e.preventDefault();
        var id = $('.product-edit__id').attr('id');
        var order = $('#product-edit__order').val();
        var car = $('#product-edit__car').val();
        var firms = $('#product-edit__firms').val();
        var datal = $('#product-edit__datal').val();
        var title = $('#product-edit__title').val();
        var number = $('#product-edit__number').val();
        var delivery = $('#product-edit__delivery').val();
        var price = $('#product-edit__price').val();
        var opt = $('#product-edit__opt').val();
        var nal = $('#product-edit__nal').val();
        var notnal = $('#product-edit__notnal').val();
        var pricenotnal = $('#product-edit__pricenotnal').val();
        var deliverynotnal = $('#product-edit__deliverynotnal').val();
        var client = $('#product-edit__owner').val();
        var deltadebtnal = $('.product-edit__deltadebtnal-val').attr('id');
        var deltadebt = $('.product-edit__deltadebt-val').attr('id');
        $(location).attr('href', `admin/${id}/${order}/${car}/${firms}/${datal}/${title}/${number}/${delivery}/${price}/${opt}/${nal}/${notnal}/${pricenotnal}/${deliverynotnal}/${deltadebtnal}/${deltadebt}/${client}`);
    });
    $('#product-edit__click-notnal').on('click', function(e) {
        e.preventDefault();
        var id = $('.product-edit__id').attr('id');
        var opt = $('.product-edit__opt-val').attr('id');
        var deliverynotnal = $('.product-edit__deliverynotnal-val').attr('id');
        var number = $('.product-edit__number-val').attr('id');
        var price = $('.product-edit__price-val').attr('id');
        var delivery = $('.product-edit__delivery-val').attr('id');
        var deltadebtnal = $('.product-edit__deltadebtnal-val').attr('id');
        var deltadebt = $('.product-edit__deltadebt-val').attr('id');
        var pricenotnal = $('#product-edit__pricenotnal').val();

        if(pricenotnal < 0) {
            $('.user-edit__form').before('<p class="register__error">' + 'Ви ввели не правильне число в ціну' + '</p>');
        } else if(delivery < 0) {
            $('.user-edit__form').before('<p class="register__error">' + 'Ви ввели не правильне число в доставку' + '</p>');
        } else if(number < 0) {
            $('.user-edit__form').before('<p class="register__error">' + 'Ви ввели не правильне число в кількість' + '</p>');
        } else {
            $(location).attr('href', `accountantnotnal/${id}/${pricenotnal}/${opt}/${deliverynotnal}/${number}/${price}/${delivery}/${deltadebtnal}/${deltadebt}`);
        }

    });

    $('.edit-money__button--btn').on('click', function(e) {
        e.preventDefault();
        var id = $('.edit-money__button').attr('id');
        var title = $('.edit-money__title').val();
        var nal = $('.edit-money__nal').val();
        var notnal = $('.edit-money__notnal').val();

        $(location).attr('href', `adminmoney/${id}/${title}/${nal}/${notnal}`);

    });



    $('.editmoney__button--click').on('click', function(e) {
        e.preventDefault();
        var id = $('.edittown__box--name').attr('id');
        var nal = $('.edittown__box--input').val();

        $(location).attr('href', `adm/${id}/${nal}`);

    });

    var checkautosum = document.querySelectorAll('.allseler__check');
    for(var i = 0; i < checkautosum.length; i++) {
      checkautosum[i].onclick = function() {
        var id = this.parentElement.id;
        var count = this.value;
        $(location).attr('href', `allselers/allselersum/${id}/${count}`)
      }
    }
});