$(document).ready(function(){
    $('.client-info__button').on('click', function(e) {
        e.preventDefault();
        $('p.register__error').remove();
        $('.register__error').removeClass('register__error');

        var data = {
            order: $('#client-info__order').val(),
            firms: $('#client-info__firms').val(),
            buyer: $('#client-info__buyer').val(),
            title: $('#client-info__name').val(),
            opt: $('#client-info__opt').val(),
            price: $('#client-info__price').val(),
            number: $('#client-info__number').val(),
            delivery: $('#client-info__delivery').val(),
            deliverynotnal: $('#client-info__deliverynotnal').val(),
            nal: $('#client-info__nal').val(),
            notnal: $('#client-info__notnal').val(),
            pith: $('#client-info__pith').val(),
            datal: $('#client-info__datal').val(),
            client: $(".client-info__client-name").attr('id'),
            owner: $(".client-info__create").attr('id')
        };
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/products/product'
          }).done(function(data) {
              console.log(data);
            if(!data.ok) {
              $('.client-info__createss').before('<p class="register__error">' + data.error + '</p>');
            } else {
              location.reload();
            }
          });
      });

      $('.client-info__oplata').on('click', function(e) {
        e.preventDefault();
        $('p.register__error').remove();
        $('.register__error').removeClass('register__error');

        var data = {
            title: "Оплата",
            datal: $('#client-info__datal').val(),
            pith: $('#client-info__pith').val(),
            nal: $('#client-info__nal').val(),
            price: $('#client-info__price').val(),
            client: $(".client-info__client-name").attr('id'),
            owner: $(".client-info__create").attr('id')
        };
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/products/proplataman/g'
          }).done(function(data) {
              console.log(data);
            if(!data.ok) {
              $('.client-info__createss').before('<p class="register__error">' + data.error + '</p>');
            } else {
              location.reload();
            }
          });
      });

      $('.client-info__oplatanal').on('click', function(e) {
        e.preventDefault();
        $('p.register__error').remove();
        $('.register__error').removeClass('register__error');

        var data = {
            title: $('#client-info__name').val(),
            datal: $('#client-info__datal').val(),
            nal: $('#client-info__nal').val(),
            client: $(".client-info__client-name").attr('id'),
            owner: $(".client-info__create").attr('id')
        };
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/products/proplatanal/product'
          }).done(function(data) {
              console.log(data);
            if(!data.ok) {
              $('.client-info__createss').before('<p class="register__error">' + data.error + '</p>');
            } else {
              location.reload();
            }
          });
      });

      $('.client-info__oplatanotnal').on('click', function(e) {
        e.preventDefault();
        $('p.register__error').remove();
        $('.register__error').removeClass('register__error');

        var data = {
            title: $('#client-info__name').val(),
            datal: $('#client-info__datal').val(),
            notnal: $('#client-info__notnal').val(),
            client: $(".client-info__client-name").attr('id'),
            owner: $(".client-info__create").attr('id')
        };
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/products/proplatanotnal/product'
          }).done(function(data) {
              console.log(data);
            if(!data.ok) {
              $('.client-info__createss').before('<p class="register__error">' + data.error + '</p>');
            } else {
              location.reload();
            }
          });
      });
      $('.client-info__oplata-adm').on('click', function(e) {
        e.preventDefault();
        $('p.register__error').remove();
        $('.register__error').removeClass('register__error');

        var data = {
            title: $('#client-info__name').val(),
            datal: $('#client-info__datal').val(),
            pith: $('#client-info__pith').val(),
            nal: $('#client-info__nal').val(),
            notnal: $('#client-info__notnal').val(),
            price: $('#client-info__price').val(),
            client: $(".client-info__client-name").attr('id'),
            owner: $(".client-info__create").attr('id')
        };
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/products/proplatadm/gs'
          }).done(function(data) {
              console.log(data);
            if(!data.ok) {
              $('.client-info__createss').before('<p class="register__error">' + data.error + '</p>');
            } else {
              location.reload();
            }
          });
      });
});