/**
 * Directive, en-dirty.
 * This directive watch the ng-models which you set as attribute with this directive, if any of the watched models become dirty, enable current element, otherwise, disable it.
 * For example:
 * <pre>
 *  <button type="submit" en-dirty='mcsPath, tomcatPath'>Save</button>
 * </pre>
 * Above example will watch two models ['mcsPath', 'tomcatPath'] in the same scope with current element. If any one of those value changed, enable this button, otherwise, disable it.
 */
mainApp.directive('enDirty', [
    function() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                var oprops = attrs['enDirty'].split(',');
                var nprops = {};
                var nkeys = [];
                angular.forEach(oprops, function(value){
                    nkeys.push($.trim(value));
                });
                
                scope.$watch('reset', function(newValue, oldValue){
                    if(newValue){
                        console.log("runs here");
                        scope.reset = false;
                        angular.forEach(nkeys, function(key){
                            nprops[key] = scope[key];
                        });
                        element.prop("disabled", true);
                    }
                });

                scope.$watchCollection("["+nkeys.toString()+"]", function(newValues){
                    element.prop("disabled", true);
                    for(var i = 0; i < newValues.length; i++){
                        if(nprops[nkeys[i]] !== newValues[i]){
                            element.prop("disabled", false);
                            return;
                        }
                    }
                });
            }
        }
   }]
);