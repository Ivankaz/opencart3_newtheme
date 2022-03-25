var $callbackForm = null;

// показываю форму заказа обратного звонка
var showCallbackForm = function showCallbackForm() {
    $callbackForm.show();
}

// скрываю форму заказа обратного звонка
var hideCallbackForm = function hideCallbackForm() {
    $callbackForm.hide();
}

// отправляю форму заказа обратного звонка
var sendCallbackForm = function () {
    // проверяю поля на заполненность
    let hasError = false;

    $callbackForm.find('input[required]').each(function() {
        if ($(this).val() == '') {
            $(this).addClass('form-callback__input_error');
            hasError = true;
        } else {
            $(this).removeClass('form-callback__input_error');
        }
    });

    if (hasError) return;

    // отправляю данные клиента
    $.ajax({
        url: '/catalog/controller/common/sendCallbackForm.php',
        method: 'post',
        dataType: 'json',
        data: $callbackForm.find('form').serializeArray()
    })
    .done(function(data){
        if (data.result) {
            // показываю сообщение об успешной отправке
            alert('Мы скоро вам перезвоним!');
        } else {
            // показываю сообщение об ошибке
            alert('Не удалось отправить данные. Пожалуйста, свяжитесь с нами по телефону или соц. сетям.');
        }
    })
    .fail(function() {
        // показываю сообщение об ошибке
        alert('Не удалось отправить данные. Пожалуйста, свяжитесь с нами по телефону или соц. сетям.');
    })
    .always(function() {
        // скрываю форму
        hideCallbackForm();
    });
}

$(document).ready(function() {
  // селектор формы заказа обратного звонка
  $callbackForm = $('.form-callback');
});
