const QUIZ = {
  questions: [
    {
      text: 'Which soft drink debuted in 1982?',
      answers: [
        { text: 'Mountain Dew', isCorrect: false },
        { text: 'Dr. Pepper', isCorrect: false },
        { text: 'Faygo', isCorrect: false },
        { text: 'Diet Coke', isCorrect: true }
      ]
    },
    {
      text: 'Which US President served through most of the 1980s?',
      answers: [
        { text: 'Ronald Reagan', isCorrect: true },
        { text: 'Jimmy Carter', isCorrect: false },
        { text: 'George H.W. Bush', isCorrect: false },
        { text: 'Richard Nixon', isCorrect: false }
      ]
    },
    {
      text: "What is E.T.'s preferred candy?",
      answers: [
        { text: 'Starburst', isCorrect: false },
        { text: 'Milky Way', isCorrect: false },
        { text: "Reese's Pieces", isCorrect: true },
        { text: "Skittles", isCorrect: false }
      ]
    },
    {
      text: 'Which computer programming language was most popular in the 1980s?',
      answers: [
        { text: 'BASIC', isCorrect: true },
        { text: 'Java', isCorrect: false },
        { text: 'Python', isCorrect: false },
        { text: 'Perl', isCorrect: false }
      ]
    },
    {
      text: 'To play Atari, which channel would one need to set their TV to?',
      answers: [
        { text: 'Channel 1', isCorrect: false },
        { text: 'Channel 0', isCorrect: false },
        { text: 'Channel 3', isCorrect: true },
        { text: 'Channel Z', isCorrect: false }
      ]
    },
    {
      text: 'This car make and model was purchased more than any other in the 1980s:',
      answers: [
        { text: 'Toyota Camry', isCorrect: false },
        { text: 'Volkswagen Golf', isCorrect: false },
        { text: 'Ford Fiesta', isCorrect: false },
        { text: 'Ford Escort', isCorrect: true }
      ]
    },
    {
      text: 'I lift up my shirt, shake my belly and speak gibberish.  What am I doing?',
      answers: [
        { text: 'The Truffle Shuffle', isCorrect: true },
        { text: 'The Lambada', isCorrect: false },
        { text: 'The Electric Slide', isCorrect: false },
        { text: 'The Cabbage Patch', isCorrect: false }
      ]
    },
    {
      text: 'How many medals did the United States win in the 1980 Summer Olympics?',
      answers: [
        { text: '174', isCorrect: false },
        { text: '0', isCorrect: true },
        { text: '195', isCorrect: false },
        { text: '1', isCorrect: false }
      ]
    },
    {
      text: "It's 1986.  I'm an undercover cop who drives a Ferrari around Miami Beach.  What color is my sport jacket?"
,
      answers: [
        { text: 'White', isCorrect: true },
        { text: 'Black', isCorrect: false },
        { text: 'Red', isCorrect: false },
        { text: 'Silver', isCorrect: false }
      ]
    },
    {
      text: 'In 1981, this song was the first to contain rap vocals and reach Number 1 on US Billboard Hot 100 music charts:'
,
      answers: [
        { text: 'Ice, Ice Baby', isCorrect: false },
        { text: 'Rapture', isCorrect: true },
        { text: "Rapper's Delight", isCorrect: false },
        { text: 'Bust A Move', isCorrect: false }
      ]
    }
  ],
  userAnswers: [],
  scoresCommentary: [ 'Whoa, totally awesome!', 'Radical!', 'Man, that was fresh!', 'Like, fer sure.' , "Where's the beef?", 'Gag me with a spoon!', 'Gross me out the door!'],

  getCurrentQuestion: function() {
    return this.questions[this.userAnswers.length]
  },
  answerCurrentQuestion: function(answerNumber) {
    const selectedAnswer = this.getCurrentQuestion().answers[answerNumber]
    this.userAnswers.push(selectedAnswer)
    return selectedAnswer.isCorrect
  },
  getCurrentScore: function() {
    return this.userAnswers.filter( function (answer) {
      return answer.isCorrect
    }).length
  },
  generateScoresCommentary: function(score) {
    switch (score) {
      case 10:
        return this.scoresCommentary[0]
        break
      case 9:
        return this.scoresCommentary[1]
        break
      case 8:
      case 7:
        return this.scoresCommentary[2]
        break
      case 6:
      case 5:
        return this.scoresCommentary[3]
        break
      case 4:
      case 3:
        return this.scoresCommentary[4]
        break
      case 2:
      case 1:
        return this.scoresCommentary[5]
      case 0:
        return this.scoresCommentary[6]
        break
    }
  },
  getRightAnswer: function(index) {
    const potentialAnswers = this.questions[index].answers
    for (const answer of potentialAnswers) {
      if (answer.isCorrect) {
        return answer.text
      }
    }
  },
  getRightAnswer2: function(index) {
    return this.questions[index].answers.find(function(answer) {
      return answer.isCorrect
    })
  }
}

function runQuiz(isFirstTime) {
  if (QUIZ.userAnswers.length >= QUIZ.questions.length) {
    resultSummary(QUIZ.getCurrentScore(), QUIZ.generateScoresCommentary(QUIZ.getCurrentScore()))
  } else {
    displayQuestion(QUIZ.questions[QUIZ.userAnswers.length])
    if (isFirstTime) {
      handleFormSubmit()
    }
    displayQuizStatus(QUIZ.userAnswers.length, QUIZ.getCurrentScore())
  }
}

function displayQuestion(question) {
 const questionText = `\
      <section class="quizArea">
        <form class="questionForm" id="question_${QUIZ.userAnswers.length + 1}">
          <fieldset>
          <legend>${question.text}</legend>
          <ol>
            <li><input type="radio" id="answer1" name="response" value="0" required> <label for="answer1">${question.answers[0].text}</label></li>
            <li><input type="radio" id="answer2" name="response" value="1" required> <label for="answer2">${question.answers[1].text}</label></li>
            <li><input type="radio" id="answer3" name="response" value="2" required> <label for="answer3">${question.answers[2].text}</label></li>
            <li><input type="radio" id="answer4" name="response" value="3" required> <label for="answer4">${question.answers[3].text}</label></li>
          </ol>
            <input type="submit" id="submitAnswerButton" name="submit" value="Submit Answer">
          </fieldset>
        </form>
      </section>`
 $('main').html(questionText)
}

function displayQuizStatus(responseCount, score) {
  // this function will display the question number and current score
  let percentageScore = 0
  if ( responseCount !== 0 ) {
    percentageScore = score / responseCount * 100
  }
  const questionStatusText = `\
    <section class="quizStatus" aria-live="polite">
      <span class="questionNumber">Question ${responseCount + 1} of ${QUIZ.questions.length}</span>
      <span class="score">Score: ${score}/${responseCount} (${percentageScore.toFixed(0)}%)</span>
    </section>`
  $('main').append(questionStatusText)
}

function handleResult(isCorrect) {
  const rightAnswer = QUIZ.getRightAnswer(QUIZ.userAnswers.length - 1)
  const responseText = `\
    <section class="quizFeedback" aria-live="assertive">
      <p>You are ${ isCorrect ? 'right' : 'wrong' }!  The correct answer is ${rightAnswer}.</p>
      <button class="continueQuiz" id="continueQuizButton">
        <span class="buttonLabel">Next</span>
      </button>
    </section>`
  $('#submitAnswerButton').attr('type','hidden')
  $('section.quizStatus').remove()
  $('main').append(responseText)
  handleNextButton()
}

function resultSummary(score, commentary) {
  let percentageScore = score / QUIZ.questions.length * 100
  const quizResultsSummary = `\
  <section class="quizResults">
      <h2>Score: ${percentageScore.toFixed(0)}%.  ${commentary}</h2>
      <h2>Your quiz summary:</h2>
  </section>`
  $('main').html(quizResultsSummary)
  for (const summaryQuestion in QUIZ.questions) {
    const summaryQuestionText = (QUIZ.questions[summaryQuestion].text)
    const summaryRightAnswer = (QUIZ.getRightAnswer(summaryQuestion))
    const summaryUserAnswer = ((QUIZ.userAnswers[summaryQuestion].isCorrect ? '&#10004; ' : '&#10008; ') + 'Your Answer: ' + QUIZ.userAnswers[summaryQuestion].text)
    $('main').append(`\
        <section class="quizSummary">
          ${summaryQuestionText}
          <ul>
            <li>&#10004; Correct Answer: ${summaryRightAnswer}</li>
            <li>${summaryUserAnswer}</li>
          </ul>`)
  }
  $('main').append(`\
    </section>
    <section class="retryQuizButtonSection">
      <button class="retryQuiz" id="retryQuizButton">
        <span class="buttonLabel">Retry</span>
      </button>
    </section>
  </main>`)
  handleRetryButton()
}

function handleStartButton() {
  $('#startQuizButton').click(function(event) {
    runQuiz(true)
  })
}

function handleNextButton() {
  $('#continueQuizButton').click(function(event) {
    $('main').empty()
    runQuiz()
  })
}

function handleFormSubmit() {
  $('main').on('submit','form',function(event) {
    event.preventDefault()
    const getRadioInput = $('input[name=response]:checked').val()
    const isCorrect = QUIZ.answerCurrentQuestion(getRadioInput)
    handleResult(isCorrect)
  })
}

function handleRetryButton() {
  $('#retryQuizButton').click(function(event) {
    $('main').empty()
    QUIZ.userAnswers = []
    runQuiz()
  })
}

$(handleStartButton)
