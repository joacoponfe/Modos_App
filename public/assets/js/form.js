const Button = document.getElementById('sendButton');
const saveFile =(e) => {
    e.preventDefault();
    // Get the data from each element on the form.
    const age = document.getElementById('age');
    const sex = document.getElementById('sex');
    const education = document.getElementById('education');
    //const education_num = document.getElementById('education_num');
    const musical_knowledge = document.getElementById('musical-knowledge');
    const knows_mode = document.getElementById('knows-mode');

    const formData = {"age":age.value, "sex":sex.value, "education":education.value, 
    "musical_knowledge":musical_knowledge.value, "knows_mode":knows_mode.value};

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

Button.addEventListener("click", saveFile);