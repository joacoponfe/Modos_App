const Button = document.getElementById('sendButton');
const saveFile =(e) => {
    e.preventDefault();
    // Get the data from each element on the form.
    const age = document.getElementById('age');
    const sex = document.getElementById('sex').value;
    const education = document.getElementById('education').value;
    //const education_num = document.getElementById('education_num');
    const musical_knowledge = document.getElementById('musical-knowledge').value;
    const instrument = document.getElementById('instrument').value;
    const knows_mode = document.getElementById('knows-mode').value;

    const formData = {"age":age.value, "sex":sex, "education":education, 
    "musical_knowledge":musical_knowledge, "instrument":instrument, "knows_mode":knows_mode};

    console.log(formData)

    const options = {
        method: 'POST',
        body: JSON.stringify({ formData }),
        headers: new Headers({ 'Content-type': 'application/json' })
        //headers: {"Content-type": "application/json;charset=UTF-8"}
    }
    const response = fetch("/api", options);
    location.href = "consigna.html";
}

const form = document.getElementById("form");

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = new FormData(form);
    console.log([...data]);
});

//Button.addEventListener("click", saveFile);