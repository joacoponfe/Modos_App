// const form = document.getElementById("form");
import { getCookie } from "./cookies.js";
import { url } from "./config.js";

document.addEventListener("DOMContentLoaded", function() {
    // Get references to all the questions
    const questions = document.querySelectorAll(".question");
    const nextButton = document.getElementById("next");
    const form = document.getElementById("form");
    let currentQuestionIndex = 0;

    // Hide all the questions except the first one
    for (let i = 1; i < questions.length; i++) {
        questions[i].style.display = "none";
    }

    // Function to show the next question
    function showNextQuestion() {
        // Check if question has been answered
        const currentQuestion = questions[currentQuestionIndex];
        const inputs = currentQuestion.querySelectorAll("input");
        let answered = false;
        // Check age field
        if (currentQuestionIndex == 0) {
            const age = inputs[0].value;
            if (age!="") {
                answered = true;
            }
            if (age < 12) {
                alert("Debe ser mayor de 12 años para participar.");
                return;
            }
        }
        // Check radio button fields
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].checked) {
                answered = true;
                break;
            }
        }
        if (!answered) {
            alert("Debe responder la pregunta antes de continuar.");
            return;
        }
        // If question has been answered, show the next question
        if (currentQuestionIndex < questions.length - 1) {
            questions[currentQuestionIndex].style.display = "none";
            currentQuestionIndex++;
            questions[currentQuestionIndex].style.display = "block";
        } else {
            // If there are no more questions, submit the form
            // alert("You have completed the form!");
            submitForm();
        }
    }
    // Event listener for the "Next" button
    nextButton.addEventListener("click", function(event){
        event.preventDefault();
        showNextQuestion();
    });
    
});

// form.addEventListener('submit', function (e) {
function submitForm() {
    // e.preventDefault();
    const form = document.getElementById("form");
    const formData = new FormData(form);
    //console.log([...data]);

    // Convert formData to JSON format
    const object = {};
    object['id_participant'] = getCookie('id_participant');
    formData.forEach(function(value, key){
        object[key] = value;
    object['consent'] = 'on'; // hardcode consent, highly insecure and not recommended
    });

    const formJSON = JSON.stringify(object);
    console.log(formJSON);

    async function query(form_data) {
        const response = await fetch(
            url + "/profiles_api/receive_form/",
            {
                headers: new Headers({ 'Content-type': 'application/json' }),
                method: "POST",
                body: form_data,
            }
        );
        //const result = await response.json();
        const result = await response;
        return result;
    }

    query(formJSON).then((response) => {
        //console.log(JSON.stringify(response));
        //console.log(response.json());
        response.json().then(body => console.log(body)|| body)
        .then(body => window.location.href = "volume.html")
    })
    .catch((error) => {
        console.error('Error:', error);
        console.log("El servidor está caído.");
        window.location.href = "server_down.html";   
    });
};