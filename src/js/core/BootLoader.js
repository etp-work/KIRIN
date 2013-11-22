/*
 * Bootloader
 */

var mainApp = angular.module('mainApp', ['ngRoute']);

mainApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/compile', {
            templateUrl: 'partials/compile.html',
            controller: 'CompileController'
        }).when('/clean', {
            templateUrl: 'partials/clean.html',
            controller: 'CleanController'
        }).when('/test', {
            templateUrl: 'partials/test.html',
            controller: 'TestController'
        }).when('/setting', {
            templateUrl: 'partials/setting.html',
            controller: 'SettingController'
        }).otherwise({
            redirectTo: '/setting'
        });
    }
]);