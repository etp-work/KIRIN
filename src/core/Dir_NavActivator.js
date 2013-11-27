/**
 * Directive, kiNavActivator
 */
mainApp.directive('kiNavactivator', ['$route', 
    function($route) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                /**
                 * Utilities
                 * @param location
                 * @returns
                 */
                function findTabFromLocation(location){
                    var index = location.indexOf("#/");       
                    if(index < 0)
                        return;
                    return location.substr(index + 1);
                }

                function activeTab(element, tab){
                    if(!tab)
                        return;
                    element.find('li').removeClass('active');
                    element.find('li').each(function(){
                        var ele = $(this);
                        if(tab === ele.find('a').attr('href').substr(1)){
                            ele.addClass("active");
                        }
                    });
                }

                scope.$on('$locationChangeSuccess', function(event, newLoc, oldLoc){
                    var tab = findTabFromLocation(newLoc);
                    activeTab(element, tab);
                });

            }
        }
   }]
);