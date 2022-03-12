$(document).ready(function() {
    $('.owl-carousel__wrapper').each(function() {
        var owl = $(this).find('.owl-carousel').owlCarousel(
            {
                autoWidth: true,
                margin: 20,
                dots: true,
                items: 5,
            }
        );
        
        // при клике по кнопке Влево
        $(this).find('.owl-carousel-button-prev').on('click', function() {
            // Перематываем карусель назад
            owl.trigger('prev.owl.carousel');
        });

        // При клике по кнопке Вправо
        $(this).find('.owl-carousel-button-next').on('click', function() {
            // Перематываем карусель вперед
            owl.trigger('next.owl.carousel');
        });

        var dot = $(".heading__points__point");

        owl.on('changed.owl.carousel', function(e) {
            dot.removeClass("heading__points__point_active").eq(e.page.index).addClass("heading__points__point_active")
        });
        
        dot.on("click", function(event) {
            let $dot = $(event.target);
            var i = dot.index(this);
            let $owl = $dot.parents('.inner-wrapper').find('.tab_active .owl-carousel');
            $owl.trigger('to.owl.carousel', [i,300]);
        });
    }); 
});
