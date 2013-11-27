/**
 * Directive, kiNotification
 */
mainApp.directive('kiNotification', ['notificationMgr', 
    function(notificationMgr) {
        return {
            restrict: 'E',
            template: '<div ng-repeat="notification in notifications" class="notify"><div class="alert alert-dismissable" ng-class="notification.type" ng-show="$last"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong><span class="glyphicon" ng-class="notification.title"></span></strong>&nbsp;&nbsp;<span ng-bind="notification.msg"></span></div></div>',
            link: function (scope, element, attrs, controller) {
                scope.notifications = notificationMgr.getNotifications();
            }
        }
   }]
);