// скорость анимации
var durationAnimation = 500;

$(document).ready(function() {
  // событие клика по кнопке поиска
  $('#searchButton').on('click', function() {
    // скрываем все иконки кроме кнопки поиска
    $('.header__icons .header__icons__icon[id!="searchButton"]').hide(durationAnimation);
    // скрываем главные ссылки
    $('.header__main-links').hide(durationAnimation);
    // показываем поле поиска
    $('#searchInput').show(durationAnimation).focus();
  });

  // событие клика вне поля поиска
  $('#searchInput').on('blur', function() {
    // скрываем поле поиска
    $('#searchInput').hide(durationAnimation);
    // показываем все иконки
    $('.header__icons .header__icons__icon[id!="searchButton"]').show(durationAnimation);
    // если большая ширина экрана
    if (window.outerWidth > 960) {
      // показываем главные ссылки
      $('.header__main-links').show(durationAnimation);
    }
  });
});
