const totalNumberOfQuestions = 5;
var questionCount = 1;
var correctCount = 0;
var currentQuestionIndex = 0;
var scienceQuestions= [
    {
      //question1:
    questionString: "What is Moore's law?",
    answers: [
      "The number of transistors that fit on a circuit doubles every 2 years",
      "Same as Fermi's paradox",
      "Hot air rises"
    ],
    correctAnswerString: "The number of transistors that fit on a circuit doubles every 2 years",
    correctAnswer: 0,
    userAnswer: null
  },
    //question2:
  {
    questionString: "What acceleration is the basis for the Theory Gravity?",
    answers: [
      "9.8 M/S^2",
      "100 mph",
      "200 mph"
    ],
    correctAnswerString: "9.8 M/S^2",
    correctAnswer: 0,
    userAnswer: null
  },
  //question3:
  {
    questionString: "What's the formula for Einstein's Theory of Relativity?",
    answers: [
      "E = MC^2",
      "a^2 * b^2 = c^2",
      "the Square root of 69"
    ],
    correctAnswerString: "E = MC^2",
    correctAnswer: 0,
    userAnswer: null
  },
  //question4:
  {
    questionString: "In Fluid Dynamics, which is the universal conduit?",
    answers: [
      "Liquid Nitrogen",
      "Water",
      "Mucosal membranes"
      ],
    correctAnswerString: "Water",
    correctAnswer: 1,
    userAnswer: null
  },
  //question5:
  {
    questionString: "What is the First law of Thermodynamics?" ,
    answers: [
      "Energy cannot be created nor destroyed, only transferred",
      "The total entropy can only increase over time for an isolated system",
      "You do not talk about thermodynamics "
    ],
    correctAnswerString: "Energy cannot be created nor destroyed, only transferred",
    correctAnswer: 0,
    userAnswer: null
  }
  ];
function setupBeginQuiz() {
  $('#start-quiz').on('click', function(startQuizButton)
  {
    $('#currentScore').empty();
    $('#start-quiz').fadeOut();
    $('#start-btn-instructions').fadeOut();
    $('#quiz-section').show();
    $('#quiz-form').show();
    $('#nav-results-status').fadeIn();
    $('#result-section').hide();
    $('#title-section').fadeOut();
    correctCount = 0;
    questionCount = 1;
    currentQuestion = 0;
    renderQuestion();
  });
}
console.log(setupBeginQuiz);
setupBeginQuiz();
function renderQuestion() 
{
      if (currentQuestionIndex >= 5) 
      {
      finishedQuiz();
      }
      else 
      {
      var currentQuestion = scienceQuestions[currentQuestionIndex];
      $('.questionText').text(currentQuestion.questionString);
      renderAnswers();
      }
}
console.log(renderQuestion);
function renderAnswers() 
{
  //careful of order in dot notation
  if (!scienceQuestions[currentQuestionIndex]) {
    return;
  }
  var currentAnswers= scienceQuestions[currentQuestionIndex];
  $('#answer1text').text(currentAnswers.answers[0]);// error at finish because no more answers to render!! attempted to create function
  $('#answer2text').text(currentAnswers.answers[1]);
  $('#answer3text').text(currentAnswers.answers[2]);
  console.log('correctAnswer:', currentAnswers.correctAnswer);
  
}
console.log(renderAnswers);
function handleUserAnswer(userSelected, correctAnswer) 
{ 
  $('.answerbutton').on('click', function(userSelection) 
  {
  var userSelected = $('input[name=answerchoice]:checked').val();
  //to extract number from string in Radio Button answerchoice
  parseInt(userSelected, 10);
  console.log('var userSelected:', userSelected);
  console.log('handleUserAnswer, user selection is:', parseInt(userSelected, 10));
  parseInt(userSelected, 10);
  $('#pleaseSelectAny').text('');
  enableSubmitButton();
  });
}
function enableSubmitButton()
{
  $('#submit-answer-button').prop('disabled',false);
  console.log('enableSubmitButton');
}
function disableSubmitButton()
{
  $('#submit-answer-button').prop('disabled',true);
  console.log('disableSubmitButton');
}
function setupSubmitButton() 
{
  //toggle submit off, and toggle next on
  $("#submit-answer-button").click(function (handleSubmitButton)
  {
  var correctAnswer = scienceQuestions[currentQuestionIndex].correctAnswer;
  var userSelected = $('input[name=answerchoice]:checked').val();
  parseInt(userSelected, 10);
  console.log('var userSelected:', userSelected);
  console.log('handleSubmitButton, user selection is:', parseInt(userSelected, 10));
  console.log('user picked:', $('input[name=answerchoice]:checked').val());
  disableSubmitButton();
    if (userSelected == correctAnswer) 
    { 
      correctCount++; //limit correctCount to only once per Submit button click
      //pressing A) + submit button can increase score over 5. make Max +1 correctCount per correctAnswer.
      console.log('itsCorrect');
      $('#answercorrect').text('Right! Hit Next Question to continue');
      $('#currentQuestionNum').text(questionCount);
      console.log("#of correct answers:", correctCount);
      $('#currentScore').text(correctCount);
      $('input[name=answerchoice]').prop('checked',false);
      $('#next-question-button').fadeIn();
      $("#pleaseSelectAny").text("");
    }
    if (userSelected === undefined) 
    {
    $("#pleaseSelectAny").text("Please select any answer");
    //How to clear Please Select Any after user selects a radio button, how to remove 'Incorrect'?, Can the submit button be removed, How to remove correct & incorrect answer strings before user presses next? Can these msgs be an alert instead ??
    console.log('No Selection');
    // returns "No Selection" at question #2 when 
    }
    else if (userSelected != correctAnswer) 
    {
      $('#answerincorrect').text('Incorrect, the answer is: '+ scienceQuestions[currentQuestionIndex].correctAnswerString);
      $("#pleaseSelectAny").text("");
    }
  });
}
setupSubmitButton();
function setupNextButton() 
{
  $('#next-question-button').click(function (handleNextButton)
  {
    enableSubmitButton();
    $('#answercorrect').text('');
    $('#answerincorrect').text('');
    if (currentQuestionIndex <= 5)
    {
    currentQuestionIndex++;//set an if statement there is Question, or run finishedQuiz or run showResultsresults
    renderQuestion(); //error at finish because no more questions to render!! How to clear this error??
    renderAnswers();
    questionCount++;
    }
    else 
    {
     showResults();
    }
    $('#next-question-button').fadeOut();
    $('#currentQuestionNum').text(questionCount);
    $('input[name=answerchoice]').prop('checked',false);
  }
  );
}
$(setupNextButton);
console.log(setupNextButton);
function finishedQuiz () 
{
 if(currentQuestionIndex <= totalNumberOfQuestions) 
 {
   showResults();
   $('#result-section').show();
  }
  console.log ('currentQuestionIndex:', currentQuestionIndex);
}
console.log(handleUserAnswer);
function resetQuiz() 
{
  $("#restart-Quiz").click(event => 
  {
  currentQuestionIndex = 0;
  questionCount = 1;
  correctCount = 0;
  $('#quiz-section').hide();
  $('#start-quiz').fadeIn();
  $('#nav-results-status').hide();
  $('#result-section').hide();
  $('#title-section').fadeIn();
  $('#start-btn-instructions').fadeIn();
  $('#instructions').fadeIn();
  $('#correctCount').empty();
  $('#currentQuestionNum').empty();
  $('#next-question-button').toggle();
  $('#pleaseSelectAny').empty();
  });
}
function showResults() 
{
  $('#quiz-section').fadeOut();
  $('#nav-results-status').fadeOut();
  $('#result-section').show();
  $('#instructions').fadeOut();
  $('#finalscore').text("You got [" + correctCount + " / 5] total Science questions correct");
 if (correctCount >= 3) 
   {
    $('#passed').fadeIn();
    $('#failed').hide();
   }
   else 
   {
    $('#passed').hide();
    $('#failed').show();
   }
}
$(resetQuiz);