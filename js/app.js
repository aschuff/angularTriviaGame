let app = angular.module('jeopardyApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/home',
        })
        .when('/home', {
            controller: 'loginController',
            templateUrl: 'templates/logIn.html',
        })
        .when('/newgame', {
            controller: 'newgameController',
            templateUrl: 'templates/game.html',
        })
        .when('/gameover', {
            controller: 'gameoverController',
            templateUrl: 'templates/gameover.html',
        });
}]);
////CONTROLLERS////
app.controller('newgameController', ['questionService', '$scope', function(questionService, $scope) {
    $scope.categoryArray = questionService.getCategoryIds();
    $scope.valueArray = questionService.getValues();

    $scope.selectValue = function() {
      console.log('clicky');
      let questionValue = categoryArray
    }
    // $scope.rightAnswer = '';
    // $scope.userAnswer = '';
    // $scope.score = 0;
    //
    // $scope.myQuestion = {
    //     answer: 'your answer',
    //     question: 'random question',
    //     value: 0,
    //     category: 'category',
    // };
}]);
app.controller('loginController', function($scope, $http) {

})

app.controller('gameoverController', function($scope, $http) {

})

/////// Services //////
app.factory('userService', function($http) {
    let users = [];
});

app.factory('questionService', function($http) {
        let categoryArray = [];
        let valueArray = [];
        // let questionArray = [];
        let idArray = [];

        let getCategoryIds = function() {
            $http({
                method: 'GET',
                url: 'http://jservice.io/api/categories?count=5',
            }).then(function(response) {
                let categories = response.data;
                angular.copy(categories, categoryArray);
                console.log('categoryArray', categoryArray);
                categoryArray.forEach(function(element) {
                    idArray.push(element.id);
                    console.log('ids',idArray);
                })
                getValues();
            })
        }
        let getValues = function() {
            idArray.forEach(function(element) {
                $http({
                    method: 'GET',
                    url: `http://jservice.io/api/clues?category=${element}`,
                }).then(function(response) {
                    let pointValue = response.data.slice(0, 4)
                    pointValue.forEach(function(element){
                      valueArray.push(element.value)
                    })
                    console.log('values', valueArray);
                })
            })
};
  getCategoryIds()

  return {
    getCategoryIds: function() {
        return categoryArray;
    },
    getValues: function() {
      return valueArray;
    },
  }
});

// $scope.correctAnswer = function() {
//     $scope.rightAnswer = $scope.myQuestion.answer
//     if ($scope.userAnswer === $scope.myQuestion.answer) {
//         console.log('correct');
//         let addScore = Number($scope.myQuestion.value + $scope.score)
//         $scope.score = addScore
//     } else {
//         console.log("incorrect");
//         let subScore = Number($scope.score - $scope.myQuestion.value)
//         $scope.score = subScore
//     }
// }
