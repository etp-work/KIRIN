/**
 *  Define the clean item collector factory
 */
mainApp.factory('cleanItemCollector', ['$q', 'notificationMgr', 'nodejs', function($q, notificationMgr, nodejs){
    var factory = {};
    var items = {
        widget: [],
        tomcat: []
    };
    if(!nodejs.isNodeSupported()){
        return factory;
    }
    var userHome = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
    var operaHome = userHome + "/AppData/Roaming/Opera/";
    var fs = nodejs.require('fs');

    factory.retrieveWidgetCaches = function(){
        var deferred = $q.defer();
        fs.readdir(operaHome, function(err, files){
            if(err){
                deferred.reject(err);
                return; 
            }
            items.widget = [];
            angular.forEach(files, function(value){
                if(value !== 'Opera' && value !== 'Opera Widget Installer'){
                    this.push({name: value, selected: false});
                }
            }, items.widget);

            deferred.resolve(items.widget);
        });

        fs.watch(operaHome, function(event, filename){
            console.log('event', event);
            console.log('filename', filename);
        });

        return deferred.promise;
    };
    return factory;
}]);
