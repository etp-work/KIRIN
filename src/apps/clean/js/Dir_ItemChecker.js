/**
 * Directive, ki-itemchecker.
 * This directive watch the `cache.selected` attribute, true will set a `glyphicon-check` class on currect item, otherwise `glyphicon-unchecked` class will be set.
 */
mainApp.directive('kiItemchecker', [
    function() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                var cssMap = {
                    true: 'glyphicon-check',
                    false: 'glyphicon-unchecked'
                };
                var watchObj = attrs.kiItemchecker;
                scope.$watch(watchObj + ".selected", function(newValue, oldValue){
                    element.removeClass(cssMap[oldValue]);
                    element.addClass(cssMap[newValue]);
                });

                element.parent().on('click', function(e){
                    scope[watchObj].selected = !scope[watchObj].selected;
                    scope.$apply();
                    e.preventDefault();
                });
            }
        };
   }]
);