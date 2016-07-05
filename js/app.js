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
