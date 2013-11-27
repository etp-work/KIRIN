/**
 * Directive, ki-tooltips.
 * This directive provide the capability to display tooltip which provided by bootstrap.js
 */
mainApp.directive('kiTooltips', [ 
    function() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                $(element).tooltip();
            }
        }
   }]
);