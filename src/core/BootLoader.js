/*
 * Bootloader
 */
angular.module('LocalStorageModule').value('prefix', 'kirin');
var mainApp = angular.module('mainApp', ['ngRoute', 'ngResource', 'ngGrid', 'ngAnimate', 'LocalStorageModule']);

mainApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/compile', {
            templateUrl: 'partials/compile/html/compile.html',
            controller: 'CompileController'
        }).when('/clean', {
            templateUrl: 'partials/clean/html/clean.html',
            controller: 'CleanController'
        }).when('/test', {
            templateUrl: 'partials/test/html/test.html',
            controller: 'TestController'
        }).when('/setting', {
            templateUrl: 'partials/setting/html/setting.html',
            controller: 'SettingController'
        }).otherwise({
            redirectTo: '/test'
        });
    }
]);