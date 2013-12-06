/**
 *  Define the clean item collector factory
 */
mainApp.factory('cleanItemCollector', ['$q', 'notificationMgr', '$rootScope', 'preMgr', '$timeout', 'nodejs', function($q, notificationMgr, $rootScope, preMgr, $timeout, nodejs){
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
    var tomcatHome;
    var fs = nodejs.require('fs');
    var watch = nodejs.require('watch');
    var endswith = function(str, suffix){
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    };
    var startswith = function(str, prefix){
        return str.indexOf(prefix) === 0;
    };
    var cacheFilter = function(filename, state){
        if(!state.isDirectory()){
            return false;
        }
        var endPart = filename.substring(operaHome.length);
        if(endPart === 'Opera'){
            return false;
        }
        if(endPart === 'Opera Widget Installer'){
            return false;
        }
        if(endPart.indexOf('\\') >-1){
            return false;
        }
        return true;
    };
    var warFilter = function(filename, state){
        if(!state.isDirectory()){
            return false;
        }
        var endPart = filename.substring(tomcatHome.length);
        if(endPart === 'ROOT'){
            return false;
        }
        if(endPart === 'manager'){
            return false;
        }
        if(endPart === 'host-manager'){
            return false;
        }
        if(endPart.indexOf('\\') > -1){
            return false;
        }
        return true;
    };
    var add = function(filename, arr, event){
        for(var i in arr){
            if(filename === arr[i].name){
                return;
            }
        }
        arr.push({name: filename, selected: false});
        $rootScope.$broadcast(event, arr);
    };
    var remove = function(filename, arr, event){
        for(var i in arr){
            if(filename === arr[i].name){
                arr.splice(i, 1);
                $rootScope.$broadcast(event, arr);
                return;
            }
        }
    };

    var cacheListenerStarted = false;
    var tomcatListenerStarted = false;

    factory.retrieveWidgetCaches = function(){
        var deferred = $q.defer();
        if(!cacheListenerStarted){
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
                
                watch.createMonitor(operaHome, {
                    ignoreDotFiles: true
                }, function (monitor) {
                    monitor.on("created", function (f, stat) {
                        if(!cacheFilter(f ,stat)){
                            return;
                        }
                        add(f.substring(operaHome.length), items.widget, 'widgetCacheChanged');
                    });
                    monitor.on("removed", function (f, stat) {
                        remove(f.substring(operaHome.length), items.widget, 'widgetCacheChanged');
                    });
                });

                cacheListenerStarted = true;
            });
        }else{
            $timeout(function(){
                deferred.resolve(items.widget);
            }, 500);
        }
        return deferred.promise;
    };

    factory.retrieveTomcatWars = function(){
        var deferred = $q.defer();
        tomcatHome = preMgr.get('tomcatPath') ? endswith(preMgr.get('tomcatPath'), '\\') ? preMgr.get('tomcatPath') + 'webapps\\' : preMgr.get('tomcatPath') + '\\webapps\\' : "undefined";

        if(!tomcatListenerStarted){
            fs.readdir(tomcatHome, function(err, files){
                if(err){
                    deferred.reject(err);
                    return; 
                }
                items.tomcat = [];
                $.each(files, function(i, file){
                    if(file === 'ROOT' || file === 'host-manager' || file === 'manager'){
                        return;
                    }
                    if(!startswith(file, 'portal') && !startswith(file, 'public') && !startswith(file, 'private') && !startswith(file, 'static')){
                        return;
                    }
                    var stat = fs.statSync(tomcatHome + "\\" + file);
                    if(!stat.isDirectory()){
                        return;
                    }
                    items.tomcat.push({name: file, selected: false});
                });

                deferred.resolve(items.tomcat);
                
                watch.createMonitor(tomcatHome, {
                    ignoreDotFiles: true
                }, function (monitor) {
                    monitor.on("created", function (f, stat) {
                        if(!warFilter(f ,stat)){
                            return;
                        }
                        add(f.substring(tomcatHome.length), items.tomcat, 'tomcatWarChanged');
                    });
                    monitor.on("removed", function (f, stat) {
                        remove(f.substring(tomcatHome.length), items.tomcat, 'tomcatWarChanged');
                    });
                });

                tomcatListenerStarted = true;
            });
        }else{
            $timeout(function(){
                deferred.resolve(items.tomcat);
            }, 500);
        }
        return deferred.promise;
    };
    

    return factory;
}]);
