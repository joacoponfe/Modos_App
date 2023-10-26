// Questions that will be asked
const Questions = [{
    q: "What is capital of India?",
    a: [{ text: "Gandhinagar", isCorrect: false },
    { text: "Surat", isCorrect: false },
    { text: "Delhi", isCorrect: true },
    { text: "Mumbai", isCorrect: false }
    ],
    e: "Delhi has been the capital of India for over 100 years. It is the center of the government and the home of the Prime Minister of India. Delhi is also the largest city in India."
 
},
{
    q: "What is the capital of Thailand?",
    a: [{ text: "Lampang", isCorrect: false, isSelected: false },
    { text: "Phuket", isCorrect: false },
    { text: "Ayutthaya", isCorrect: false },
    { text: "Bangkok", isCorrect: true }
    ],
    e: "Bangkok is the capital of Thailand. It is the largest city in Thailand and the center of the government. It is also the home of the King of Thailand."
},
{
    q: "What is the capital of Gujarat",
    a: [{ text: "Surat", isCorrect: false },
    { text: "Vadodara", isCorrect: false },
    { text: "Gandhinagar", isCorrect: true },
    { text: "Rajkot", isCorrect: false }
    ],
    e: "Gandhinagar is the capital of Gujarat. It is the center of the government and the home of the Chief Minister of Gujarat. Gandhinagar is also the largest city in Gujarat."
 
}
 
]
 
let currQuestion = 0
let score = 0

// Set a countdown timer for 20 seconds
// let timeLeft = 5;
let elem = document.getElementById('timer');
let explanation = document.getElementById('exp');
// let timerId = setInterval(countdown, 1000);

function loadQues() {
    // Reset timer
    let timeLeft = 5;
    let timerId = setInterval(countdown, 1000);

    function countdown() {
        if (timeLeft == 0) {
            clearTimeout(timerId);
            elem.innerHTML = 'Veamos cómo te fue...'
            // Check answer after 3 seconds
            setTimeout(checkAns, 3000);
        } else {
            elem.innerHTML = 'Tenés ' + timeLeft + ' segundos para responder';
            timeLeft--;
        }
    }
    
    const question = document.getElementById("ques");
    const opt = document.getElementById("opt");
 
    question.textContent = Questions[currQuestion].q;
    opt.innerHTML = ""
 
    for (let i = 0; i < Questions[currQuestion].a.length; i++) {
        const choiceLabel = document.createElement("label");
        const choice = document.createElement("input");
        const choiceSpan = document.createElement("span");
        //const choiceLabel = document.createElement("label");
 
        choice.type = "radio";
        choice.name = "answer";
        choice.value = i;
 
        //choiceLabel.textContent = Questions[currQuestion].a[i].text;
        choiceSpan.textContent = Questions[currQuestion].a[i].text;
        //choicesdiv.appendChild(choice);
        //choicesdiv.appendChild(choiceLabel);
        choiceLabel.appendChild(choice);
        choiceLabel.appendChild(choiceSpan);
        opt.appendChild(choiceLabel);
    }
}
 
loadQues();


 
function loadScore() {
    const totalScore = document.getElementById("score")
    totalScore.textContent = `You scored ${score} out of ${Questions.length}`
}
 
 
function nextQuestion() {
    if (currQuestion < Questions.length - 1) {
        currQuestion++;
        loadQues();
    } else {
        document.getElementById("opt").remove()
        document.getElementById("ques").remove()
        document.getElementById("btn").remove()
        loadScore();
    }
}
 
function checkAns() {
    const selectedAns = parseInt(document.querySelector('input[name="answer"]:checked').value);
    
    // Get index of the correct answer from Questions
    let correctAnswerIndex;
    for (let i = 0; i < Questions[currQuestion].a.length; i++) {
        if (Questions[currQuestion].a[i].isCorrect) {
            correctAnswerIndex = i;
            break;
        }
    }

    console.log(correctAnswerIndex);
    // Get the option that corresponds to the correct answer
    const correctAnswer = opt.children[correctAnswerIndex];
    console.log(correctAnswer);
    // Add a green background
    correctAnswer.style.backgroundColor = "green";
    // Add a green background to the span, too
    correctAnswer.children[1].style.backgroundColor = "green";

    // Display explanation text
    explanation.innerHTML = Questions[currQuestion].e;

    if (Questions[currQuestion].a[selectedAns].isCorrect) {
        score++;
        console.log("Correct");
        elem.innerHTML = '¡Correcto!'

        //nextQuestion();
    } else {
        console.log("Incorrect");
        elem.innerHTML = '¡Incorrecto!'
        // Get the correct answer from opt
        const opt = document.getElementById("opt");
        // Add a red background to the selected option
        console.log(opt.children[selectedAns]);
        //opt.children[selectedAns].style.backgroundColor = "red";
        // Apply red color to span, too
        opt.children[selectedAns].children[1].style.backgroundColor = "red";
        // Wait 10 seconds before showing the next question
        // setTimeout(nextQuestion, 10000);
    }

    // Wait 10 seconds before showing the next question
    let nextQuestionTimeLeft = 20;
    let nextQuestionTimerId = setInterval(nextQuestionCountdown, 1000);

    function nextQuestionCountdown() {
        if (nextQuestionTimeLeft == 0) {
            clearTimeout(nextQuestionTimerId);
            nextQuestion();
        } else {
            nextQuestionTimeLeft--;
            if (nextQuestionTimeLeft < 11) {
                elem.innerHTML = 'Próxima pregunta en ' + nextQuestionTimeLeft + ' segundos...';
            }
        }
        
    }
}