/*
 * The controller for clean application
 */
mainApp.controller("CleanController", ['$scope', 'notificationMgr', 'cleanItemCollector', 'nodejs', function($scope, notificationMgr, cleanItemCollector, nodejs) {
    if(!nodejs.isNodeSupported()){
        notificationMgr.warning("You are not running in Nodejs environment, please check with administrator.");
        return;
    }

	cleanItemCollector.retrieveWidgetCaches().then(function(data){
        $scope.caches = data;
    });
}]);