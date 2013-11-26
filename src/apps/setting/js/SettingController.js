/*
 * The controller for setting application
 */
mainApp.controller("SettingController", ['$scope', 'preMgr', function($scope, preMgr) {
    var settings = preMgr.getPreferences();
	$scope.mcsPath = settings.mcsPath;
    $scope.tomcatPath = settings.tomcatPath;
    $scope.reset = true;
    $scope.save = function(){
        var newSetting = {};
        if($scope.mcsPath !== settings.mcsPath){
            newSetting.mcsPath = $scope.mcsPath;
        }
        if($scope.tomcatPath !== settings.tomcatPath){
            newSetting.tomcatPath = $scope.tomcatPath;
        }
        preMgr.save(newSetting);
        $scope.reset = true;
    };
}]);