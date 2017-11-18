$( document ).ready(function() {
	var game = {
		questions: [
		{
	   		question: "Which city is NOT a sister city of cleveland?",
	   		possibles: ["Alexandria", "Bratislava", "St Petersburg", "Bangalore"],
	   		id: 'question-one',
	   		answer: 2
		}, {
			question: "Which film was NOT filmed in Cleveland?",
			possibles: ["Draft Day", "The Shawshank Redemption", "The Avengers", "Spider Man 3"],
			id: 'question-two',
			answer: 1
		}, {
			question: "The Cleveland Browns won the super bowl in what year?",
			possibles: ["1967", "1955", "1948", "non of the above"],
			id: 'question-three',
			answer: 3
		}, {
			question: "This man was CEO of the Standard Oil company in Cleveland Ohio till 1897?",
			possibles: ["1801", "1810", "1799", "1796" ],
			id: 'question-four',
			answer: 3
		}, {
			question: "Written by Randy Newman this song was about the Cuyahoga River catching on fire",
			possibles: ["Burn on", "Run that river red", "Burning river blues", "Cuyahoga"],
			id: 'question-five',
			answer: 0
		}, {
			question: "In 2004, the vice presidental debate took place at what Cleveland university?",
			possibles: ["Cleveland State", "Cuyahoga community college", "John Carroll universiy", "Case Western Reserve"],
			id: 'question-six',
			answer: 1

		}, {
			question: "Which famous superhero was created by two cleveland writers?",
			possibles: ["Batman", "Superman", "Captain America", "Iron Man"],
			id: 'question-seven',
			answer: 1
		}, {
			question: 'What is the capital of Florida?',
			possibles: ["Al Capone", "John Nardi", "Danny Greene", "Eliot Ness"],
			id: 'question-eight',
			answer: 2
		}, {
			question: "This famous Cleveland DJ coined the term 'rock and roll'",
			possibles: ["Alan Freed", "Leo Mintz", "Johnny Hopper", "Tom 'moondog' Johnson"],
			id: 'question-nine',
			answer: 0
		}
		]}
 
    var number = 30;
    $('#timeLeft').on('click', run);

    $(".startGame").on("click", function (){
		$('.gameBoard').show();
		console.log('hello');

		$(this).hide();
	});


    function decrement(){
        number--;
        $('#timeLeft').html('<h2>' + number + " seconds"+'</h2>');
        if (number === 0){
        stop();
        }
    }

    function run(){
        counter = setInterval(decrement, 1000);
    }
    
    function stop(){
        clearInterval(counter);
        var audio= document.getElementById("audio")
        audio.play();
    }

    run();

function formTemplate(delta) {
	var qString = "<form id='questionOne'>"+ delta.question +"<br>";
	var possibles = delta.possibles;
	for (var i = 0; i < possibles.length; i++) {
		var possible = possibles[i];
		console.log(possible);
		qString = qString + "<input type='radio' name='"+delta.id+"' value="+ i +">"+ possible;

	}
	return qString + "</form>";
}
window.formTemplate = formTemplate;

function buildQuestions(){
	var questionHTML = ''
	for (var i = 0; i<game.questions.length; i++) {
		questionHTML = questionHTML + formTemplate(game.questions[i]);
	}
	$('#questions-container').append(questionHTML);

}

function isCorrect(question){
	var answers = $('[name='+question.id+']');
	var correct = answers.eq(question.answer);
	var isChecked = correct.is(':checked');
	return isChecked;
}

buildQuestions();

function resultsTemplate(question){
	var htmlBlock = '<div>'
	htmlBlock = htmlBlock + question.question + ': ' + isChecked;
	return htmlBlock + "</div>";
}

function checkAnswers (){
	var resultsHTML = '';
	var guessedAnswers = [];
	var correct = 0;
	var incorrect = 0;
	var unAnswered =0
	for (var i = 0; i<game.questions.length; i++) {
		if (isCorrect(game.questions[i])) {
			correct++;
		} else {
			if (checkAnswered(game.questions[i])) {
				incorrect++;
			} else {
				unAnswered++;
			}
		}

	}
	$('.results').html('correct: '+correct+ "<br>" +'incorrect: '+incorrect+ "<br>" +'unanswered: '+unAnswered);
}

function checkAnswered(question){
	var anyAnswered = false;
	var answers = $('[name='+question.id+']');
	for (var i = 0; i < answers.length; i++) {
		if (answers[i].checked) {
			anyAnswered = true;
		}
	}
	return anyAnswered;

}

	$('.btn').on('click', function() {
	checkAnswers();
	stop();
	$("#messageDiv").html("Game Over!");
	})
});