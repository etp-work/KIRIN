/**
 * Directive, ki-delmonitor.
 * This directive helps on detect whether this element should be disabled or not due to given ng-model.
 */
mainApp.directive('kiDelmonitor', [
    function() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                var watchModel = attrs.kiDelmonitor;
                scope.$watch(watchModel, function(newValue, oldValue){
                    var disabled = true;
                    for(var i in newValue){
                        if(newValue[i].selected){
                            disabled = false;
                            break;
                        }
                    }
                    element.prop("disabled", disabled);
                }, true);
                   
            }
        };
   }]
);