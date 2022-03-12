$(document).ready(function() {
    $('.heading__tab-name').on('click', function(event) {
        let $tabName = $(event.target);
        let tabId = $tabName.data('tab');
        if (tabId == undefined) return;
        console.log(tabId);

        let $tabNames = $tabName.parent().find('.heading__tab-name');
        $tabNames.removeClass('heading__tab-name_active');
        $tabName.addClass('heading__tab-name_active');

        var $tabs = $tabName.parents('.inner-wrapper').find('.tab');
        console.log($tabs);
        console.log('#'+tabId);
        let $tab = $tabs.filter('#'+tabId);
        console.log($tab);
        $tabs.removeClass('tab_active');
        $tab.addClass('tab_active');
    });
});
