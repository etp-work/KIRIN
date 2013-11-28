/**
 *  Define the notification manager service
 */
mainApp.factory('notificationMgr', ['$timeout', 

    function($timeout){
        var factory = {};
        var delayMap = {
            danger: 60000,
            warning: 30000,
            info: 10000,
            success: 5000
        };
        var notifications = [];

        var removeNotification = function(id){
            for(var i in notifications){
                if(notifications[i].id === id){
                    $timeout.cancel(notifications[i].timer);
                    notifications.splice(i, 1);
                    return;
                }
            }
        };
        
        factory.getNotifications = function(){
            return notifications;
        };
        
        factory.addNotification = function(options){
            var type;
            var title;
            var msg;
            var id = new Date().getTime();
            if(!options){
                type = "danger";
                title = "Oh shit!";
                msg = "Something wrong, man!";
            }else if(angular.isString(options)){
                type = "danger";
                title = "Oh shit!";
                msg = options;
            }else{
                type = options['type'] ? options['type'] : 'danger';
                title = options['title'] ? options['title'] : 'glyphicon-flash';
                msg = options['msg'] ? options['msg'] : 'Something wrong, man!';
            }

            var timer = $timeout(function(){
                removeNotification(id);
            }, delayMap[type]);

            notifications.push({
                id: id,
                type: "alert-" + type,
                title: title,
                msg: msg,
                timer: timer
            });
        };

        factory.removeNotification = function(id){
            removeNotification(id);
        };

        factory.success = function(msg){
            factory.addNotification({
                type: 'success',
                title: 'glyphicon-ok',
                msg: msg
            });
        };

        factory.warning = function(msg){
            factory.addNotification({
                type: 'warning',
                title: 'glyphicon-warning-sign',
                msg: msg
            });
        };

        factory.info = function(msg){
            factory.addNotification({
                type: 'info',
                title: 'glyphicon-globe',
                msg: msg
            });
        };

        factory.error = function(msg){
            factory.addNotification({
                type: 'danger',
                title: 'glyphicon-flash',
                msg: msg
            });
        };

        return factory;
}]);
