// возвращает jQuery-объект поля количества, текущее значение, шаг и разрешенный минимум
function getInputData(event = null) {
    let $input = $(event.target).siblings('input').first();
    let prevValue = parseInt($input.val());
    let step = parseInt($input.attr('step'));
    let min = parseInt($input.attr('min'));
    return [$input, prevValue, step, min];
}

// обработчик клика по кнопке уменьшения количества
$('.products__carousel__cards__card__quantity__button_minus, .page__content__products__card__quantity__button_minus').on('click', function(event) {
    [$input, prevValue, step, min] = getInputData(event);
    let newValue = prevValue - step;
    if (newValue >= min) {
        $input.val(newValue);
    }
});

// обработчик клика по кнопке увеличения количества
$('.products__carousel__cards__card__quantity__button_plus, .page__content__products__card__quantity__button_plus').on('click', function(event) {
    [$input, prevValue, step, min] = getInputData(event);
    let newValue = prevValue + step;
    $input.val(newValue);
});
