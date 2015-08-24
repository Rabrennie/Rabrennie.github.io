var ywtgapp = angular.module("ywtgapp",[])
    .controller("ywtgController", function($scope, $interval){
        var achievements = {
            1:{title:"Winning",desc:"You have won the game!"},
            100:{title:"More Winning",desc:"You have won some more!"},
            250:{title:"Losing?",desc:"How did you just lose?"},
            300:{title:"Won Again",desc:"Bro it was just a prank!"}
        },
        winStrings = {
            1:"You win!",
            100:"You win more!",
            250:"You lose!",
            300:"Just kidding, you win again!"
        }

        $scope.youwin="You win!";
        $scope.counter=0;
        $scope.notifications = [];

        $scope.gameLoop = function(){
            $scope.counter++;
            if (winStrings[$scope.counter]) {
                $scope.youwin = winStrings[$scope.counter];
            };
            if (achievements[$scope.counter]) {
                $scope.notifications.push(achievements[$scope.counter]);
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
