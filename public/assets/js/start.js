const form = document.getElementById("form");

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    //console.log([...formData]);
    // Convert formData to JSON format
    const object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });
    
    const formJSON = JSON.stringify(object);
    console.log(formJSON);

    async function query(id_data) {
        const response = await fetch(
            "http://localhost:8000/profiles_api/receive_id/",
            {
                headers: new Headers({ 'Content-type': 'application/json' }),
                method: "POST",
                body: id_data,
            }
        );
        //const result = await response.json();
        const result = await response;
        return result;
    }

    query(formJSON).then((response) => {
        //console.log(JSON.stringify(response));
        //console.log(response.json());
        response.json().then(body => console.log(body) || body)
        .then(body => localStorage.setItem('id_participant', body['id_participant']) || body)
        .then(body => localStorage.setItem('id_exists', body['id_exists']) || body)
        .then(body => localStorage.setItem('id_melody_set', body['id_melody_set']) || body)
        .then(body => window.location.href = "form.html?" + body['id_participant']);
    });
    

    //window.location.href = "form.html?" + ;
});
