/**
 * Directive, bts-tooltips.
 * This directive provide the capability to display tooltip which provided by bootstrap.js
 */
mainApp.directive('btsTooltips', [ 
    function() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                $(element).tooltip();
            }
        }
   }]
);