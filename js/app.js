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
        })
    };
    $scope.newQuestion();

    // $scope.totalScore = function() {
    //   console.log('scoring things');
    //   $scope.score = $scope.myQuestion.value +
    // }

    $scope.correctAnswer = function() {
      $scope.score = $scope.myQuestion.value
      $scope.rightAnswer = $scope.myQuestion.answer
      if ($scope.userAnswer === $scope.myQuestion.answer) {
        console.log('correct');
        return ($scope.score + $scope.score)
      } else {
        console.log("incorrect");
        return ($scope.score - $scope.score)
      }
    }
});
