const timeLeft = 10;
const timeBetweenQuestions = 4;

$(document).ready(function(){
  
  function Question(question, options, answer, imageUrl){
    this.question = question;
    this.options = options;
    this.answer = answer;
    this.imageUrl = imageUrl;
  }

  var triviaGame = {
    
    timerTimeOut: null,
    timeOutCounter: timeLeft,
    
    questions : [],
    questionIndex : 0,
    currentQuestionObj: null,

    winsCount: 0,
    wrongCount: 0,
   // blankQuestion:0, attempted to create  a property called blankQuestion and setting it with a value of 0. 
  

    initialize: function(){

      var question1 = new Question("1. What team was Kobe Bryant on?", 
        ["Chicago Bulls", "LA Lakers", "Orlando Magic", 
        "Atlanta Hawks"], "LA Lakers", "lakers.jpg");

        var question2 = new Question("2. What team was Michael jordan on?", 
        ["Chicago Bulls", "Oklahoma City Thunder", "Miami Heat", 
        "Atlanta Hawks"], "Chicago Bulls","bulls.jpg");

        var question3 = new Question("3. What team is Lebron James on?", 
        ["New York Knicks", "Portland Trailblazers", "Cleveland Cavaliers", 
        "Dallas Mavericks"], "Cleveland Cavaliers","cavs.png");

        var question4 = new Question("4. What team is Stephen Curry on?", 
        ["Brooklyn Nets", "Houston Rockets", "Golden State Warriors", 
        "San Antonio Spurs"], "Golden State Warriors","warriors.png");
      
        var question5 = new Question("5. Which team won a championship in 2005?", 
        ["La Lakers", "Chicago Bulls", "Golden State Warriors", 
        "San Antonio Spurs"], "San Antonio Spurs","spurs.png");
      
      triviaGame.questions.push(question1, question2, question3, question4, question5);
    },

    reset: function(){
      triviaGame.questionIndex = 0;
      triviaGame.winsCount = 0;
    },

    resetTimeOut: function(){
      triviaGame.timeOutCounter = timeLeft;
    },

    start: function(){
      triviaGame.reset();

      $("#start-div").hide();
      $("#final-div").hide();

      $("#timer-div").show();
      $("#trivia-div").show();

      triviaGame.nextQuestion();
    },

    nextQuestion: function(){
      if(triviaGame.questionIndex === triviaGame.questions.length){
        triviaGame.stop();
      }
      else{
        triviaGame.currentQuestionObj = triviaGame.questions[triviaGame.questionIndex];
        
        triviaGame.timerTimeOut = setInterval(triviaGame.updateTimer, 1000);
        triviaGame.displayTimeOut();
        triviaGame.displayQuestion();

        triviaGame.questionIndex++;
      }
    },

    displayQuestion: function(question){
      $("#trivia-div").show();
      $("#answer-div").hide();

      $("#question-div").text(triviaGame.currentQuestionObj.question);

      var newDiv = $('<div>');
      var optionsArray = triviaGame.currentQuestionObj.options;

      optionsArray.forEach(function(option){
        newDiv.append( $('<p><input type="radio" name="option" value="' + option + 
          '"></input><label class="option-label">' + option + '</label></p>'));
      });

      $("#options-div").html(newDiv);
    },

    evaluateAnswer: function(){
      triviaGame.clearTimer();
      var selectedAnswer = $(this).val();
    if( selectedAnswer === triviaGame.currentQuestionObj.answer){
        triviaGame.winsCount++;
        triviaGame.displayAnswer(true, "You got the answer right!");
      }
      else{
        triviaGame.displayAnswer(false, "Oh no! Your answer was wrong!");
        triviaGame.wrongCount++;
      }
    },

    displayAnswer: function(isCorrectAnswer, message){
      $("#trivia-div").hide();
      $("#answer-div").show();

      $("#result-div").html(message);

      var pAnswer = $('<p>');
      if(!isCorrectAnswer){
        pAnswer.html("The right answer was: " + triviaGame.currentQuestionObj.answer);
      }
      else{
        pAnswer.html( triviaGame.currentQuestionObj.answer);
      }
      $("#answer-img-div").html(pAnswer);
      
      var answerImage = $("<img>");
      var url = "assets/images/" + triviaGame.currentQuestionObj.imageUrl; 
      answerImage.attr("src", url);
      answerImage.addClass("answer-image");
      $("#answer-img-div").append(answerImage);

      setTimeout(triviaGame.nextQuestion, timeBetweenQuestions* 1000);
    },

    displayTimeOut: function(){
      $("#timeout").text("Time Remaining: " + triviaGame.timeOutCounter + " seconds");
    },

    updateTimer: function(){
      triviaGame.timeOutCounter--;
      triviaGame.displayTimeOut();
      
      if(triviaGame.timeOutCounter === 0){
       // triviaGame.blankQuestion++;  attempted to answer display unanswered questions by inputting counter within my if statement for the timeer runs out.
        triviaGame.clearTimer();
        triviaGame.displayAnswer(false, "Out of Time!");
        
      }
    },

    clearTimer: function(){
      clearInterval(triviaGame.timerTimeOut);
      triviaGame.resetTimeOut();
    },

    stop: function(){  
      $("#final-result-div").text("Correct answers: " + triviaGame.winsCount);
      $("#final").text("Wrong answers: " + triviaGame.wrongCount);
     // $("#blank").text("Questions left blank: " + triviaGame.blankQuestion); attempted to display unanswered questions.
      $("#timer-div").hide();
      $("#answer-div").hide();

      $("#final-div").show();
      $("#final").show();
      //$("#blank").show(); Attempted to display unanswered questions.  The end result displayed all 5 questions as blank so I have coded this aspect of the code out of the my program.
    }
  }

  triviaGame.initialize();

  $("#start-btn").click(triviaGame.start);

  $("#restart-btn").click(triviaGame.start);

  $('#options-div').on('change', 'input[name="option"]', triviaGame.evaluateAnswer);

});


