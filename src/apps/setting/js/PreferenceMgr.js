/**
 *  Define the settings loader factory
 */
mainApp.run(['preMgr', function(preMgr){
    preMgr.init();
}]);
mainApp.factory('preMgr', ['localStorageService', function(localStorageService){
    var factory = {};
    var settings = {};
    factory.init = function(){
        settings.mcsPath = localStorageService.get('mcsPath');
        settings.tomcatPath = localStorageService.get('tomcatPath');
        settings.testServer = localStorageService.get('testServer');
    };
    factory.getPreferences = function(){
        return settings;
    };
    factory.get = function(name){
        return settings[name];
    };
    factory.save = function(newSetting){
        for(var i in newSetting){
            localStorageService.add(i, newSetting[i]);
            settings[i] = newSetting[i];
        }
    };
    return factory;
}]);
