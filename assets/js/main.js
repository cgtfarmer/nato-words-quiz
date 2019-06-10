
const ENTER_KEY_CODE = 13;
const THREE_SECONDS = 3000;

var selection;
var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http) {
	$http.get("data.json")
		.then(function(response) {
			$scope.data = response.data;
			displayQuestion($scope);
		});

	$scope.checkAnswer = function(event) {
		if(wasTriggeredByClickOrEnter(event)) {
			var correctAnswer = $scope.data[selection]["a"].toLowerCase();

			if(answerIsUndefinedOrIncorrect($scope.answer, correctAnswer)) {
				$("#result-icon").stop();
				$("#result-icon").html("&cross;");
				$("#result-icon").css("color", "#FF0000");
				$("#result-icon").css("opacity", "1");
				$("#result-icon").animate({opacity: 0}, THREE_SECONDS);
			} else {
				$("#result-icon").stop();
				$("#result-icon").html("&#x2713;");
				$("#result-icon").css("color", "#00FF00");
				$("#result-icon").css("opacity", "1");
				$("#result-icon").animate({opacity: 0}, THREE_SECONDS);

				displayQuestion($scope);
			}

			$scope.answer = "";
		}
	}

	$scope.toggleHelpTable = function() {
		var state = $("#help-btn").prop("value");
		if(state == "Show Help") {
			$("#help-table").show();
			$("#help-btn").prop("value", "Hide Help");
		} else {
			$("#help-table").hide();
			$("#help-btn").prop("value", "Show Help");
		}
	}

});

function answerIsUndefinedOrIncorrect(answer, correctAnswer) {
	return (answer == undefined) || (answer.toLowerCase() != correctAnswer);
}

function wasTriggeredByClickOrEnter(event) {
	return (event == undefined) || (event.keyCode == ENTER_KEY_CODE);
}

function displayQuestion($scope) {
	selection = Math.floor(Math.random() * $scope.data.length);
	$scope.question = $scope.data[selection]["q"];
	return;
}

