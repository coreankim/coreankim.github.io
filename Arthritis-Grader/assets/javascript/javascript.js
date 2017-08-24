$(document).ready(function() {
	    
	var questionIndex = 0;
	var currentGrade = 0;
	var buttonPressed = "";
	
	$("#start-button").on("click", function() {
		
		if (questionIndex < 11) {
			$("#arthritis-grader").attr("class", "container");
			$("#arthritis-grader").show();
			$("#question").show();		
			$("#question").html("<h2>"+questionBank[questionIndex].question+"</h2>");
			$("#options").show();			
			loadPictures(questionIndex);
		};
	});

	$("#reset-button").on("click", function() {
		questionIndex = 0;
		currentGrade = 0;
		loadPictures(questionIndex);
		$("#arthritis-grader").hide();
		$("#current-grade").html("<h3>Current arthritis grade: 0<h3>");
	});

	$("#question-row").on("click", function getButtonPressed() {
		buttonPressed = event.srcElement.id;
	});

	$("#next-button").on("click", function pressNext() {
		if (buttonPressed === "no-button") {
			clearPictures();
			respondToButtonInput(questionBank[questionIndex].binaryResponse[0]);
			if (questionIndex < 11) {
				loadPictures(questionIndex);
			}
		}
		if (buttonPressed === "yes-button") {
			clearPictures();
			respondToButtonInput(questionBank[questionIndex].binaryResponse[1]);
			if (questionIndex < 11) {
				loadPictures(questionIndex);
			}
		}
		$("#yes-button").prop("checked", false);
		$("#no-button").prop("checked", false);
	});

	function loadPictures(number) {
		for (i = 0; i < questionBank[number].images.length; i++) {
			$("#image"+i).attr("src", questionBank[number].images[i]);
		}
	};

	function clearPictures() {
		for (i = 0; i < 3; i++) {
			$("#image"+i).attr("src", "");
		}	
	}

	function respondToButtonInput(string) {
		if (string === "end") {
			if (currentGrade > 0) {
				$("#current-grade").html("<h3>Final arthritis grade: "+currentGrade+"</h3>");
				$("#arthritis-grader").hide();
			} else if (currentGrade === 0) {
				$("#current-grade").html("<h3>Final arthritis grade: "+currentGrade+"</h3>");
				$("#question").html("<h2>There is no arthritis. Here are reference pics of a normal facet:</h2>");
				$("#options").hide();
				questionIndex = 11;
				loadPictures(questionIndex);
			}
		}
		if (string === "end-with-score-change") {
			currentGrade = currentGrade + questionBank[questionIndex].score;
			if (currentGrade > 0) {
				$("#current-grade").html("<h3>Final arthritis grade: "+currentGrade+"</h3>");
				$("#arthritis-grader").hide();
			} else if (currentGrade === 0) {
				$("#current-grade").html("<h3>Final arthritis grade: "+currentGrade+"</h3>");
				$("#question").html("<h2>There is no arthritis. Here are reference pics of a normal facet:</h2>");
				$("#options").hide();
				questionIndex = 11;
				loadPictures(questionIndex);
			}
		}
		if (string === "next") {
			$("#question").html("<h2>"+questionBank[questionIndex].getNextQuestion(0).question+"</h2>");
			questionIndex = questionBank.indexOf(questionBank[questionIndex].getNextQuestion(0));
		}
		if (string === "next-with-score-change") {
			$("#question").html("<h2>"+questionBank[questionIndex].getNextQuestion(1).question+"</h2>");
			currentGrade = currentGrade + questionBank[questionIndex].score;
			$("#current-grade").html("<h3>Current arthritis grade: "+currentGrade+"</h3>");
			questionIndex = questionBank.indexOf(questionBank[questionIndex].getNextQuestion(1));
		}
	};

});