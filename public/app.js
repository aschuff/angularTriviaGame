(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
let app = angular.module('jeopardyApp', []);
app.controller('jeopardyController', function($scope, $http) {

    $scope.historyArray = [];
    $scope.rightAnswer = '';
    $scope.userAnswer = '';
    $scope.score = 0;

    $scope.myQuestion = {
        answer: 'your answer',
        question: 'random question',
        value: 0,
        category: 'category',
    };

    $scope.newQuestion = function() {
        $http({
            method: 'GET',
            url: 'http://jservice.io/api/random',
        }).then(function(response) {
          console.log(response);
            $scope.myQuestion = response.data[0];
            $scope.historyArray.push({question: $scope.myQuestion.question});
            // $scope.historyArray.push({value: $scope.myQuestion.value});        
        })
    };
    $scope.newQuestion();

    $scope.correctAnswer = function() {
      $scope.rightAnswer = $scope.myQuestion.answer
      if ($scope.userAnswer === $scope.myQuestion.answer) {
        console.log('correct');
        let addScore = Number($scope.myQuestion.value + $scope.score)
        $scope.score = addScore
      } else {
        console.log("incorrect");
        let subScore = Number($scope.score - $scope.myQuestion.value)
        $scope.score = subScore
      }
    }
});

},{}]},{},[1])