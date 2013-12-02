/**
 *  Define the Nodejs factory
 */
mainApp.factory('nodejs', [function(){
    var factory = {};
    var supportNodejs = function(){
        return typeof require !== 'undefined' && require;
    };
    factory.isNodeSupported = function(){
        return supportNodejs();
    };
    factory.require = function(module){
        if(supportNodejs()){
            return require(module);
        }
        //implicity undefined;
    };
    return factory;
}]);
