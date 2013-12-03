/*
 * The controller for clean application
 */
mainApp.controller("CleanController", ['$scope', 'notificationMgr', 'cleanItemCollector', 'nodejs', function($scope, notificationMgr, cleanItemCollector, nodejs) {
    if(!nodejs.isNodeSupported()){
        notificationMgr.warning("You are not running in Nodejs environment, please check with administrator.");
        return;
    }

    $scope.activeWidget = function(){
        if($scope.widgetActived){
            return;
        }
        cleanItemCollector.retrieveWidgetCaches().then(function(data){
            $scope.caches = data;
        });
        $scope.widgetActived = true;
    };

    $scope.activeTomcat = function(){
        if($scope.tomcatActived){
            return;
        }
        cleanItemCollector.retrieveTomcatWars().then(function(data){
            $scope.wars = data;
            $scope.tomcatActived = true;
        }, function(err){
            notificationMgr.warning("You haven't set Tomcat path yet, please set it first.");
        });

    };

    $scope.$on('widgetCacheChanged', function(event, data){
        $scope.$apply(function () {
            $scope.caches = data;
        });
    });

    $scope.$on('tomcatWarChanged', function(event, data){
        $scope.$apply(function () {
            $scope.wars = data;
        });
    });
}]);