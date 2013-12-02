/**
 * Directive, ki-divselector.
 * This directive listen the .nav-pills, to visible the corresponding div.
 */
mainApp.directive('kiDivselector', [
    function() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                if(element.find('li.active').length === 0){
                    element.find('li').first().addClass('active');
                }
                element.find('li a').on('click', function(e){
                    var li = $(this).parent();
                    if(li.hasClass('active')){
                        e.preventDefault();
                        return;
                    }
                    $("#" + li.siblings().first().children().first().attr('href').substring(2)).hide();
                    li.siblings().removeClass('active');
                    li.addClass('active');
                    $("#" + $(this).attr('href').substring(2)).show();
                    e.preventDefault();
                });
            }
        }
   }]
);