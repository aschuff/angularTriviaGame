(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    // $scope.questionArray.questionService.getQuestions();

    $scope.selectValue = function() {
      // for the value clicked on, grab the question associated with it
            console.log('clicky');
            questionService.getQuestions();
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
    let questionArray = [];
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
                console.log('ids', idArray);
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
                pointValue.forEach(function(element) {
                    valueArray.push(element.value)
                })
                console.log('values', valueArray);
            })
        })
      }
        let getQuestions = function() {
            questionArray.forEach(function(element) {
                $http({
                    method: 'GET',
                    url: `http://jservice.io/api/clues?category=${element}`,
                }).then(function(response) {
                  console.log(response);
                    let chosenQuestion = response.data
                    chosenQuestion.forEach(function(element){
                      console.log(element.question);
                      questionArray.push(element.question)
                    })
                    console.log('questionArray', questionArray);
                })
            })
        }
    getCategoryIds()
    getQuestions()

    return {
        getCategoryIds: function() {
            return categoryArray;
        },
        getValues: function() {
            return valueArray;
        },
        getQuestions: function() {
            return questionArray;
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

},{}]},{},[1])