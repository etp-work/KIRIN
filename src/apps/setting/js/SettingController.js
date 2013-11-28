/*
 * The controller for setting application
 */
mainApp.controller("SettingController", ['$scope', 'preMgr', 'notificationMgr', function($scope, preMgr, notificationMgr) {
    var settings = preMgr.getPreferences();
	$scope.mcsPath = settings.mcsPath;
    $scope.tomcatPath = settings.tomcatPath;
    $scope.testServer = settings.testServer;
    $scope.reset = true;
    $scope.save = function(){
        var newSetting = {};
        if($scope.mcsPath !== settings.mcsPath){
            newSetting.mcsPath = $scope.mcsPath;
        }
        if($scope.tomcatPath !== settings.tomcatPath){
            newSetting.tomcatPath = $scope.tomcatPath;
        }
        if($scope.testServer !== settings.testServer){
            newSetting.testServer = $scope.testServer;
        }
        preMgr.save(newSetting);
        $scope.reset = true;
        notificationMgr.success('Changes saved.');
    };
}]);