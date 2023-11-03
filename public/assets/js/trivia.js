// Questions that will be asked
const Questions = [{
    q: "Al día de hoy, ¿cuál es la canción más escuchada en la plataforma musical Spotify?",
    a: [{ text: "Blinding Lights <br> (The Weeknd)", isCorrect: true },
    { text: "Shape of You <br> (Ed Sheeran)", isCorrect: false },
    { text: "Un Finde <br> (Big One, FMK, Ke Personajes)", isCorrect: false },
    { text: "La Marseillaise <br> (Himno nacional de Francia)", isCorrect: false }
    ],
    e: `La canción "Blinding Lights", interpretada por el artista canadiense The Weeknd, es la más escuchada de la plataforma Spotify. Pertenece al álbum After Hours y fue publicada el 29 de noviembre de 2019. La misma suma un total de ¡3846 millones de reproducciones!`
 
},
{
    q: "¿Quién compuso la letra de la famosa canción “Color esperanza”, lanzada en el año 2001?",
    a: [{ text: "Diego Torres", isCorrect: false,},
    { text: "Julieta Venegas", isCorrect: false },
    { text: "Coti Sorokin", isCorrect: true },
    { text: "Coti Nosiglia", isCorrect: false }
    ],
    e: "La canción, aunque interpretada y popularizada por Diego Torres, fue compuesta casi en su totalidad por Coti Sorokin, también autor de hits radiales como “Nada fue un error” y “Otra vez”. En varias entrevistas, Coti dijo haber escrito la letra arriba de un colectivo."
},
{
    q: "En los ‘90, Charly García se tiñó el pelo de rubio en honor a un/a artista que admiraba. ¿Quién?",
    a: [{ text: "David Bowie", isCorrect: false },
    { text: "Susana Giménez", isCorrect: false },
    { text: "Blondie", isCorrect: false },
    { text: "Kurt Cobain", isCorrect: true }
    ],
    e: "En 1994, Charly García apareció en los medios de comunicación con una melena rubia en homenaje al cantante estadounidense Kurt Cobain, líder de la banda de grunge Nirvana."
 
},
{
    q: "¿De qué canción tomó su melodía el cántico “Brasil, decime qué se siente”, famoso en la Copa Mundial de Fútbol de 2014?",
    a: [{ text: "Sultans of Swing <br> (Dire Straits)", isCorrect: false },
    { text: "Bad Moon Rising <br> (Creedence Clearwater Revival)", isCorrect: true },
    { text: "Imagine <br> (John Lennon)", isCorrect: false },
    { text: "Zamba de mi Esperanza <br> (Jorge Cafrune)", isCorrect: false }
    ],
    e: "Si bien ya había sido utilizada en cantos de cancha, fue adaptada para el mundial por un hincha argentino, según él, desde la ducha. Imprimió la letra para repartirla entre sus amigos y ganó una enorme popularidad durante la Copa."
},
{
    q: "¿Quién fue el compositor de la canción<br> El Arriero?",
    a: [
    {text: "Divididos", isCorrect: false },
    {text: "Atahualpa Yupanqui", isCorrect: true },
    {text: "José Larralde", isCorrect: false },
    {text: "Emiliano Martínez", isCorrect: false }
    ],
    e: "Conocida sobre todo por su estribillo “Las penas son de nosotros, las vaquitas son ajenas”, se volvió un slogan de protesta contra la desigualdad social. Además de varios intérpretes folclóricos que la hacen resurgir constantemente, la banda de rock Divididos hizo famosa una versión rock/blues de la canción."
},
{
    q: "¿Cuál de estas fue una banda del músico argentino Luis Alberto Spinetta?",
    a: [
    {text: "Spinetta y los jinetes <br>del alba", isCorrect: false },
    {text: "Spinetta y los peces <br>del infierno", isCorrect: false },
    {text: "Spinetta y los socios <br>del desierto", isCorrect: true },
    {text: "Avellana", isCorrect: false }
    ],
    e: "Luis Alberto Spinetta fue uno de los mayores exponentes de la música argentina y formó parte de varias bandas: Almendra, Pescado Rabioso, Invisible, Spinetta Jade, Spinetta y los Socios del Desierto, además de tener una prolífica carrera solista."
},
{
    q: "¿Cuál de los integrantes de Serú Girán interpreta la voz principal de su mítica canción “Seminare”?",
    a: [
    {text: "Charly García", isCorrect: false },
    {text: "David Lebón", isCorrect: true },
    {text: "Pedro Aznar", isCorrect: false },
    {text: "Oscar Moro", isCorrect: false }
    ],
    e: "Si bien Seminare fue compuesta por Charly García (tecladista), él sólo hace coros en la grabación de la misma junto a Pedro Aznar (bajista). Quien interpreta la voz principal es el guitarrista de la banda, David Lebón."
},
{
    q: "¿De qué provincia argentina es oriunda <br>la cantante Mercedes Sosa?",
    a: [
    {text: "Tucumán", isCorrect: true },
    {text: "La Pampa", isCorrect: false },
    {text: "Río Negro", isCorrect: false},
    {text: "Uruguay", isCorrect: false}
    ],
    e: "Mercedes Sosa, o “La Negra”, conocida como “la voz de América Latina” y máxima exponente de la música folclórica argentina, nació en San Miguel de Tucumán, en la provincia de Tucumán. Allí vivió hasta los 22 años, cuando se mudó a Mendoza."
},
{
    q: "¿Cuál de las sinfonías de Beethoven llegó <br> más lejos?",
    a: [
        {text: "Primera", isCorrect: false},
        {text: "Quinta", isCorrect: true},
        {text: "Reversa", isCorrect: false},
        {text: "Novena", isCorrect: false}  
    ],
    e: "La sinfonía Nro. 5 de Beethoven fue enviada por la NASA al espacio en las dos naves Voyager en el año 1977. Las naves cargaban un disco fonográfico con piezas musicales y saludos de todo el mundo, junto a imágenes del sistema solar, paisajes, animales y humanos en situaciones cotidianas."
},
{
    q: "Dentro de los 10 discos más vendidos en la historia del heavy metal, ¿cuántos pertenecen a Metallica?",
    a: [
        {text: "Ninguno", isCorrect: false},
        {text: "Dos", isCorrect: false},
        {text: "Seis", isCorrect: true},
        {text: "Diez", isCorrect: false}
    ],
    e: "Metallica es, por lejos, la banda con mayores ventas en el mundo del metal, con seis álbumes en su haber dentro del top ten. De hecho, posee los cinco títulos más vendidos del género, incluyendo el famoso Black Album (1991), con más de 30 millones de copias vendidas a nivel mundial."
},
{
    q: "¿Cuál de los siguientes es un ícono del jazz?",
    a: [
        {text: "Ella Fitzgerald", isCorrect: true},
        {text: "Ben Franklin", isCorrect: false},
        {text: "Peter Parker", isCorrect: false},
        {text: "Lance Armstrong", isCorrect: false}
    ],
    e: "Apodada “Lady Ella, la Reina del jazz y la Primera dama de la canción”, Ella Fitzgerald ganó 13 premios Grammy, además de un Grammy por su trayectoria artística, entre varios otros premios y un doctorado honorario en Música en la Universidad de Harvard. Las otras opciones hacen referencia a Aretha Franklin, Charlie Parker y Louis Armstrong, otros íconos del género."
},
{
    q: "¿Por lo general, cuántas teclas tiene un piano de cola?",
    a: [
        {text: "36", isCorrect: false},
        {text: "88", isCorrect: true},
        {text: "52", isCorrect: false},
        {text: "7", isCorrect: false}
    ],
    e: "Un piano de cola estándar posee 88 teclas (52 blancas + 36 negras). El piano original, en cambio, poseía 54 teclas y se llamaba “clavicémbalo col piano e forte”, literalmente “clavecín con [sonido] suave y fuerte”."
}
]
 
let currQuestion = 0
let score = 0
let questionCounter = 0

// Initialize score counter at the bottom of the page
const currentScore = document.getElementById("current-score");
currentScore.textContent = `Puntaje: ${score} de ${questionCounter}`;

function updateScore() {
    questionCounter++;
    currentScore.textContent = `Puntaje: ${score} de ${questionCounter}`;
}

// Set a countdown timer for 15 seconds
// let timeLeft = 5;
let elem = document.getElementById('timer');
let explanation = document.getElementById('exp');
// let timerId = setInterval(countdown, 1000);

function loadQues() {
    // Reset timer
    let timeLeft = 14;
    let timerId = setInterval(countdown, 1000);
    
    hideExplanation();

    function countdown() {
        if (timeLeft == 0) {
            disableRadioButtons();
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
    const explanation = document.getElementById("exp");
 
    question.innerHTML = Questions[currQuestion].q;
    opt.innerHTML = "";
    explanation.innerHTML = "";
 
    for (let i = 0; i < Questions[currQuestion].a.length; i++) {
        const choiceLabel = document.createElement("label");
        const choice = document.createElement("input");
        const choiceSpan = document.createElement("span");
        //const choiceLabel = document.createElement("label");
 
        choice.type = "radio";
        choice.name = "answer";
        choice.value = i;
 
        //choiceLabel.textContent = Questions[currQuestion].a[i].text;
        choiceSpan.innerHTML = Questions[currQuestion].a[i].text;
        //choicesdiv.appendChild(choice);
        //choicesdiv.appendChild(choiceLabel);
        choiceLabel.appendChild(choice);
        choiceLabel.appendChild(choiceSpan);
        opt.appendChild(choiceLabel);
    }
}
 
loadQues();


function loadScore() {
    const totalScore = document.getElementById("score");
    totalScore.style.display = "block";
    totalScore.textContent = '¡Completaste todas las preguntas!'
    const pleaseWait = document.createElement("p");
    pleaseWait.innerHTML = "Por favor esperá sentado <br> hasta que el guía te indique.";
    pleaseWait.style.fontSize = "2.5em";
    pleaseWait.style.fontWeight = "600";
    pleaseWait.style.letterSpacing = "0.1em";	
    document.getElementById("centered-element").appendChild(pleaseWait);
    document.getElementById("centered-element").style.top = "30%";
}
 
 
function nextQuestion() {
    if (currQuestion < Questions.length - 1) {
        currQuestion++;
        loadQues();
    } else {
        document.getElementById("opt").remove()
        document.getElementById("ques").remove()
        document.getElementById("timer").remove()
        document.getElementById("exp").remove()
        loadScore();
    }
}
 
function checkAns() {
    // Get index of the correct answer from Questions
    let correctAnswerIndex;
    for (let i = 0; i < Questions[currQuestion].a.length; i++) {
        if (Questions[currQuestion].a[i].isCorrect) {
            correctAnswerIndex = i;
            break;
        }
    }

    // Get the option that corresponds to the correct answer
    const correctAnswer = opt.children[correctAnswerIndex];
    // Add a green background
    correctAnswer.style.backgroundColor = "green";
    // Add a green background to the span, too
    correctAnswer.children[1].style.backgroundColor = "green";

    // Display explanation text after 1 second
    explanation.innerHTML = Questions[currQuestion].e;
    setTimeout(showExplanation, 1000);
    
    try {
        const selectedAns = parseInt(document.querySelector('input[name="answer"]:checked').value);
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
            opt.children[selectedAns].children[1].style.backgroundColor = "red";
        }
    } catch (error) {
        // The participant didn't select any option
        elem.innerHTML = 'La respuesta correcta es:';
    }
    
    updateScore();
    // Wait 10 seconds before showing the next question
    //let nextQuestionWaitTime = 20;
    //let nextQuestionTimeLeft = nextQuestionWaitTime;
    let nextQuestionTimeLeft = 14;
    let nextQuestionTimerId = setInterval(nextQuestionCountdown, 1000);

    function nextQuestionCountdown() {
        if (nextQuestionTimeLeft == 0) {
            elem.innerHTML = "Tenés 15 segundos para responder";
            clearTimeout(nextQuestionTimerId);
            nextQuestion();
        } else {
            nextQuestionTimeLeft--;
            if (nextQuestionTimeLeft < 11) {
                if (currQuestion < Questions.length - 1) { 
                    elem.innerHTML = 'Próxima pregunta en ' + nextQuestionTimeLeft + ' segundos...';
                } else {
                    elem.innerHTML = 'Resultados en ' + nextQuestionTimeLeft + ' segundos...';
                }
            }
        }
        
    }
}

function disableRadioButtons() {
    const radioButtons = document.querySelectorAll('input[name="answer"]');
    radioButtons.forEach(radio => {
        radio.disabled = true;
    });
}

function enableRadioButtons() {
    const radioButtons = document.querySelectorAll('input[name="answer"]');
    radioButtons.forEach(radio => {
        radio.disabled = false;
    });
}

function showExplanation() {
    explanation.style.display = "block";
}

function hideExplanation() {
    explanation.style.display = "none";
}