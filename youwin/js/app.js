var ywtgapp = angular.module("ywtgapp",[])
    .controller("ywtgController", function($scope, $interval,$window){
        var achievements = {
            1:{title:"Winning",desc:"You have won the game!"},
            100:{title:"More Winning",desc:"You have won some more!"},
            250:{title:"Losing?",desc:"How did you just lose?"},
            300:{title:"Won Again",desc:"Bro it was just a prank!"},
            400:{title:"Won Again",desc:"Bro it was just a prank!"}
        },
        winStrings = {
            1:"You win!",
            100:"You win more!",
            250:"You lose!",
            300:"Just kidding, you win again!"
        },
        loopCount = 0,
        save = store.get("save");
        $scope.achievementModalShow = false;
        $scope.aboutModalShow = false;
        $scope.youwin="You win!";
        $scope.counter=0;
        $scope.notifications = [];
        $scope.achieved = {};


        //Save Handling
        if (save.achieved) {
            $scope.achieved = save.achieved;
        }
        if (save.counter){
            $scope.counter = save.counter;
        }
        if (save.date)
        {
            $scope.counter += Math.ceil((new Date().getTime() - save.date)/1000);
            for (var key in achievements) {
                if ($scope.counter >= key)
                {
                    if (!$scope.achieved[key])
                    {
                        $scope.notifications.push(achievements[key]);
                        $scope.achieved[key] = achievements[key];
                    }
                }
            }
            for (var key in winStrings) {
                if ($scope.counter >= key) {
                    $scope.youwin = winStrings[key];
                }
            }
        }
        $scope.saveGame = function(){
            store.set('save', {counter:$scope.counter, achieved:$scope.achieved,date:new Date().getTime()});
            //store.set('save', {counter:0, achieved:{}, date:new Date().getTime()});
        }
        $window.onbeforeunload =$scope.saveGame;


        //game logic
        $scope.gameLoop = function(){

            if (winStrings[$scope.counter]) {
                $scope.youwin = winStrings[$scope.counter];
            };
            if (achievements[$scope.counter]) {
                $scope.notifications.push(achievements[$scope.counter]);

                $scope.achieved[$scope.counter] = achievements[$scope.counter];
            };
            if (loopCount%60 === 0) {
                $scope.saveGame();
            };
            $scope.counter++;
            loopCount++;
        }


        //Modal Handling
        $scope.toggleAchievementModal = function()
        {
            $scope.achievementModalShow = !$scope.achievementModalShow;
        }
        $scope.toggleAboutModal = function()
        {
            $scope.aboutModalShow = !$scope.aboutModalShow;
        }

        //Run Game
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
