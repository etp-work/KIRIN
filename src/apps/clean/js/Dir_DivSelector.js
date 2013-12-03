/**
 * Directive, ki-divselector.
 * This directive listen the .nav-pills, to visible the corresponding div.
 */
mainApp.directive('kiDivselector', [
    function() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                var activeDiv;
                if(element.find('li.active').length === 0){
                    var first = element.find('li').first();
                    first.addClass('active');
                    activeDiv =first.children().first().attr('href').substring(2);
                    scope["active" + activeDiv.charAt(0).toUpperCase() + activeDiv.slice(1)]();
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
                    activeDiv = $(this).attr('href').substring(2);
                    $("#" + activeDiv).show();
                    scope["active" + activeDiv.charAt(0).toUpperCase() + activeDiv.slice(1)]();
                    e.preventDefault();
                });
            }
        }
   }]
);