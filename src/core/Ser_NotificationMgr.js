/**
 *  Define the notification manager service
 */
mainApp.factory('notificationMgr', ['$timeout', 

    function($timeout){
        var factory = {};
        var delayMap = {
            danger: 600000,
            warning: 180000,
            info: 30000,
            success: 15000
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
                title = options['title'] ? options['title'] : 'glyphicon-remove-sign';
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

        factory.addSuccess = function(msg){
            factory.addNotification({
                type: 'success',
                title: 'glyphicon-ok',
                msg: msg
            });
        };

        return factory;
}]);
