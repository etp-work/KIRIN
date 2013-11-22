/*
 * Bootloader
 */

var mainApp = angular.module('mainApp', ['ngRoute']);

mainApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/compile', {
            template: 'partials/compile.html',
            controller: 'CompileController'
        }).when('/clean', {
            template: 'partials/clean.html',
            controller: 'CleanController'
        }).when('/test', {
            template: 'partials/test.html',
            controller: 'TestController'
        }).when('/setting', {
            template: 'partials/Setting.html',
            controller: 'SettingController'
        }).otherwise({
            redirectTo: '/setting'
        });
    }
]);