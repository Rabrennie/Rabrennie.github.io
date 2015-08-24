var ywtgapp = angular.module("ywtgapp",[])
    .controller("ywtgController", function($scope, $interval){
        $scope.youwin="You win!";
        $scope.counter=0;
        $scope.notifications = [
            {title:"Winning",desc:"You have won the game!"},
        ]

        $scope.gameLoop = function(){
            $scope.counter++;
            if ($scope.counter === 100)
            {
                $scope.youwin = "You win more!";
                $scope.notifications.push({title:"More winning",desc:"You have won the game more!"})
            };
        }

        $interval($scope.gameLoop, 1000);
    });

ywtgapp.directive('notification', function(){
    return {
        scope:{
            title:'@notificationTitle',
            description:'@notificationDesc',
        },
        restrict:'E',
        replace:'true',
        templateUrl:'notification.html',
    };
})
