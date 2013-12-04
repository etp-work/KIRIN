/**
 * Directive, ki-selectall.
 * This directive helps on select all/diselect all of the specified ng-model.
 */
mainApp.directive('kiSelectall', [
    function() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                var cssMap = {
                    true: 'glyphicon-check',
                    false: 'glyphicon-unchecked'
                };
                var watchModel = attrs['kiSelectall'];
                var span = element.children().first();
                element.on('click', function(e){
                    if(span.hasClass(cssMap[true])){
                        span.removeClass(cssMap[true]);
                        span.addClass(cssMap[false]);
                        $.each(scope[watchModel], function(i, item){
                            item.selected = false;
                        });
                    }else{
                        span.removeClass(cssMap[false]);
                        span.addClass(cssMap[true]);
                        $.each(scope[watchModel], function(i, item){
                            item.selected = true;
                        });
                    }
                    scope.$apply();
                    e.preventDefault();
                });
            }
        }
   }]
);