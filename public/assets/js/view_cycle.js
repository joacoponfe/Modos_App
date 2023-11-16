import { url } from "./config.js";

var major_modes = ['jonico', 'lidio', 'mixolidio'];
var currentIndex = 0; // Initialize the index

var tagCloud = null;

// Function to update id_melody_mode and cycle through major_modes
function updateMelodyMode() {
    id_melody_mode = major_modes[currentIndex];
    currentIndex = (currentIndex + 1) % major_modes.length; // Cycle through the list
  }

// Function to update the tagCloud with new data
function updateTagCloud(myTags) {
    if (tagCloud) {
      tagCloud.destroy(); // Destroy the existing tagCloud instance
    }
  
    tagCloud = TagCloud('.content', myTags, {
      // font size in px
      maxFontSize: 40,
      // radius in px
      radius: 400,
      // animation speed
      // slow, normal, fast
      maxSpeed: 'normal',
      initSpeed: 'normal',
      // 0 = top
      // 90 = left
      // 135 = right-bottom
      direction: 135,
      // interact with cursor move on mouse out
      keep: true
    });
  }
  
// Function to fade out the tag cloud
function fadeOutTagCloud() {
    const contentElement = document.querySelector('.content');
    contentElement.style.opacity = 0;
  }
  
// Function to fade in the updated tag cloud
function fadeInTagCloud() {
const contentElement = document.querySelector('.content');
contentElement.style.opacity = 1;
}
// Function to update the "h1" (Titulo de la página) text
function updateTitleText(mode) {
    const ModeElement = document.getElementById('ionian_mode');
    ModeElement.style.opacity = 0; // Start the fade-out effect
    if (mode === "jonico"){
        mode = "jónico";
      }   else if (mode=== "dorico"){
        mode = "dórico";
      }   else if (mode === "eolico"){
        mode = 'eólico';
  };
    setTimeout(() => {
      ModeElement.textContent = `Modo ${mode}`; // Update the text
      ModeElement.style.opacity = 1; // Start the fade-in effect
    }, 700); // Adjust the duration to match your CSS transition (0.5s in this example)
  }

// Function to update the "h1" (Titulo de la página) text
function updateNumberText(Number) {
    const num = document.getElementById('num');
    num.style.opacity = 0; // Start the fade-out effect
    setTimeout(() => {
        num.textContent = Number.toString(); // Update the text
        num.style.opacity = 1; // Start the fade-in effect
    }, 700); // Adjust the duration to match your CSS transition (0.5s in this example)
  }

async function updateData() {
    const object = {'id_melody_mode':id_melody_mode};
    const requestJSON = JSON.stringify(object);
    
    async function query(id_melody_mode) {
        const response = await fetch(
            url + "/profiles_api/mode_data/",
            {
                headers: new Headers({ 'Content-type': 'application/json' }),
                method: "POST",
                body: id_melody_mode,
            }
        );
        const result = await response;
        return result;
    }


    const response = await query(requestJSON);
    const modeData = await response.json();
    console.log(modeData);
    // Get current timestamp
    // var current_timestamp = new Date();
    // console.log('Datos actualizados exitosamente: '.concat(current_timestamp.toString()).concat('.'));

    ///Updates information displayed on website according to the selected mode.
    const myTags = modeData['word_lists'];                                                         // Get word list
    var alegria = modeData['alegria'];                                                             // Get "alegria"
    var tristeza = modeData['tristeza'];                                                           // Get "tristeza"
    var sorpresa = modeData['sorpresa'];                                                           // Get "sorpresa"
    var asco = modeData['asco'];                                                                   // Get "asco"
    var miedo = modeData['miedo'];                                                                 // Get "miedo"
    var enojo = modeData['enojo'];                                                                 // Get "enojo"
    var otro = modeData['otro'];                                                                   // Get "otro"
    var pos = modeData['pos'];                                                                     // Get "pos"
    var neu = modeData['neu'];                                                                     // Get "neu"
    var neg = modeData['neg'];                                                                     // Get "neg"
    var num_participants = modeData['num_participants'];

    const cajaPadre = document.querySelector('.caja-padre'); // Select the div with the class "caja-padre"
    // Fade out the caja-padre
    cajaPadre.style.opacity = 0;

    
    // Set the new value for the element
    var newNumber = num_participants;

    updateNumberText(newNumber);
    

    // Fade out the existing tag cloud
    fadeOutTagCloud();

    // After a short delay, update the tag cloud and fade it in
    setTimeout(() => {
    updateTagCloud(myTags);
    fadeInTagCloud();
    }, 700); // Adjust the duration to match your CSS transition (0.5s in this example)

    
    // Update the title with the current mode
    updateTitleText(id_melody_mode);

    // Change color of text
    await new Promise(r => setTimeout(r, 350));
    const rootStyles = getComputedStyle(document.documentElement);
    const main_colors = {'jonico': rootStyles.getPropertyValue('--bs-cyan'), 'dorico': rootStyles.getPropertyValue('--bs-yellow'), 'frigio': rootStyles.getPropertyValue('--bs-pink'), 'lidio': rootStyles.getPropertyValue('--bs-purple'), 'mixolidio': rootStyles.getPropertyValue('--bs-red'), 'eolico': rootStyles.getPropertyValue('--bs-orange'), 'locrio': rootStyles.getPropertyValue('--bs-mustard-green')};
    const main_colors_transparent = {'jonico': rootStyles.getPropertyValue('--bs-cyan-transparent'), 'dorico': rootStyles.getPropertyValue('--bs-yellow-transparent'), 'frigio': rootStyles.getPropertyValue('--bs-pink-transparent'), 'lidio': rootStyles.getPropertyValue('--bs-purple-transparent'), 'mixolidio': rootStyles.getPropertyValue('--bs-red-transparent'), 'eolico': rootStyles.getPropertyValue('--bs-orange-transparent'), 'locrio': rootStyles.getPropertyValue('--bs-mustard-green-transparent')};
    document.documentElement.style.setProperty('--main-color', main_colors[id_melody_mode]);
    document.documentElement.style.setProperty('--main-color-transparent', main_colors_transparent[id_melody_mode]);

    // Avoid percentage sum to be greater or smaller than 100%
    var alegria_redondeado = parseInt((alegria * 100).toFixed(0));
    var tristeza_redondeado = parseInt((tristeza * 100).toFixed(0));
    var sorpresa_redondeado = parseInt((sorpresa * 100).toFixed(0));
    var asco_redondeado = parseInt((asco * 100).toFixed(0));
    var miedo_redondeado = parseInt((miedo * 100).toFixed(0));
    var enojo_redondeado = parseInt((enojo * 100).toFixed(0));

    var emotions_redondeados = {'alegria': alegria_redondeado,'tristeza': tristeza_redondeado, 'sorpresa': sorpresa_redondeado, 'asco': asco_redondeado, 'miedo': miedo_redondeado, 'enojo': enojo_redondeado};
    var emotion_redondeado_sum = alegria_redondeado + tristeza_redondeado + sorpresa_redondeado + asco_redondeado + miedo_redondeado + enojo_redondeado;
    
    if (emotion_redondeado_sum > 100){
        // Get list of keys from emotions_redondeados sorted from smallest to largest value
        var emotions_redondeados_sorted_keys = Object.keys(emotions_redondeados).sort(function(a,b){return emotions_redondeados[a]-emotions_redondeados[b]});
        var emotions_redondeados_sorted_values = emotions_redondeados_sorted_keys.map(function(x){return emotions_redondeados[x]});
        // Subtract from each value in emotions_redondeados_sorted_values, starting from the smallest to the largest, until sum is exactly 100, and never go below 0 for any emotion
        var subtract = emotion_redondeado_sum - 100;
        for (var i = 0; i < emotions_redondeados_sorted_values.length; i++){
            var emotion = emotions_redondeados_sorted_values[i];
            if (emotion - subtract >= 0){
                emotions_redondeados_sorted_values[i] -= subtract;
                break;
            } else {
                subtract -= emotion;
                emotions_redondeados_sorted_values[i] = 0;
            };
        };
        // Update emotions_redondeados
        for (var i = 0; i < emotions_redondeados_sorted_keys.length; i++){
            var key = emotions_redondeados_sorted_keys[i];
            emotions_redondeados[key] = emotions_redondeados_sorted_values[i];
        };
        // Update emotion_redondeado_sum
        emotion_redondeado_sum = emotions_redondeados['alegria'] + emotions_redondeados['tristeza'] + emotions_redondeados['sorpresa'] + emotions_redondeados['asco'] + emotions_redondeados['miedo'] + emotions_redondeados['enojo'];
    } if (emotion_redondeado_sum < 100){
        // Get list of keys from emotions_redondeados sorted from largest to smallest value
        var emotions_redondeados_sorted_keys = Object.keys(emotions_redondeados).sort(function(a,b){return emotions_redondeados[b]-emotions_redondeados[a]});
        var emotions_redondeados_sorted_values = emotions_redondeados_sorted_keys.map(function(x){return emotions_redondeados[x]});
        // Add to each value in emotions_redondeados_sorted_values, starting from the largest to the smallest, until sum is exactly 100, and never go above 100 for any emotion
        var add = 100 - emotion_redondeado_sum;
        for (var i = 0; i < emotions_redondeados_sorted_values.length; i++){
            var emotion = emotions_redondeados_sorted_values[i];
            if (emotion + add <= 100){
                emotions_redondeados_sorted_values[i] += add;
                break;
            } else {
                add -= (100 - emotion);
                emotions_redondeados_sorted_values[i] = 100;
            };
        };
        // Update emotions_redondeados
        for (var i = 0; i < emotions_redondeados_sorted_keys.length; i++){
            var key = emotions_redondeados_sorted_keys[i];
            emotions_redondeados[key] = emotions_redondeados_sorted_values[i];
        };
        // Update emotion_redondeado_sum
        emotion_redondeado_sum = emotions_redondeados['alegria'] + emotions_redondeados['tristeza'] + emotions_redondeados['sorpresa'] + emotions_redondeados['asco'] + emotions_redondeados['miedo'] + emotions_redondeados['enojo'];
    };

    var pos_redondeado = parseInt((pos * 100).toFixed(0));
    var neu_redondeado = parseInt((neu * 100).toFixed(0));
    var neg_redondeado = parseInt((neg * 100).toFixed(0));

    var valence_redondeados = [pos_redondeado, neu_redondeado, neg_redondeado];
    var valence_redondeados_sum = pos_redondeado + neu_redondeado + neg_redondeado;

    if (valence_redondeados_sum > 100){
        // Get minimum value
        var min_value = Math.min(pos, neu, neg);
        // Get index of minimum value
        var min_index = [pos, neu, neg].indexOf(min_value);
        var subtract = valence_redondeados_sum - 100;
        // Subtract from minimum value
        valence_redondeados[min_index] -= subtract;
        // Update valence_redondeados_sum
        valence_redondeados_sum = valence_redondeados[0] + valence_redondeados[1] + valence_redondeados[2];
    } if (valence_redondeados_sum < 100){
        // Get maximum value
        var max_value = Math.max(pos, neu, neg);
        // Get index of maximum value
        var max_index = [pos, neu, neg].indexOf(max_value);
        var add = 100 - valence_redondeados_sum;
        // Add to maximum value
        valence_redondeados[max_index] += add;
        // Update valence_redoneados_sum
        valence_redondeados_sum = valence_redondeados[0] + valence_redondeados[1] + valence_redondeados[2];
    }
    
    document.getElementById('alegria-value').innerHTML = emotions_redondeados['alegria'].toString().concat("%");
    document.getElementById('tristeza-value').innerHTML = emotions_redondeados['tristeza'].toString().concat("%");
    document.getElementById('sorpresa-value').innerHTML = emotions_redondeados['sorpresa'].toString().concat("%");
    document.getElementById('asco-value').innerHTML = emotions_redondeados['asco'].toString().concat("%");
    document.getElementById('miedo-value').innerHTML = emotions_redondeados['miedo'].toString().concat("%");
    document.getElementById('enojo-value').innerHTML = emotions_redondeados['enojo'].toString().concat("%");
    // document.getElementById('otro-value').innerHTML = (otro * 100).toFixed(0).toString().concat("%");
    document.getElementById('pos-value').innerHTML = valence_redondeados[0].toString().concat("%");
    document.getElementById('neu-value').innerHTML = valence_redondeados[1].toString().concat("%");
    document.getElementById('neg-value').innerHTML = valence_redondeados[2].toString().concat("%");

    // If any of the three valence values is below 5%, do not display the text or the label
    if (valence_redondeados[0] < 5){
        pos_value.innerHTML = "";
        var pos_label = document.getElementById("pos-label");
        pos_label.innerHTML = "";
    } else if (valence_redondeados[1] < 5){
        neu_value.innerHTML = "";
        var neu_label = document.getElementById("neu-label");
        neu_label.innerHTML = "";
    } else if (valence_redondeados[2] < 5){
        neg_value.innerHTML = "";
        var neg_label = document.getElementById("neg-label");
        neg_label.innerHTML = "";
    };

    // Get the stylesheet containing the animation rules
    const stylesheet = document.styleSheets[2];

    // Find the animation rule we want to modify
    const emotionRuleNames = ['alegria-bar', 'tristeza-bar', 'sorpresa-bar', 'asco-bar', 'miedo-bar', 'enojo-bar'];
    const emotionPercentages = [alegria, tristeza, sorpresa, asco, miedo, enojo];
    for (var i = 0; i < emotionRuleNames.length; i++){
        var emotionRuleName = emotionRuleNames[i];
        var emotionPercentage = emotionPercentages[i];
        var animationRule = null;
        for (var j = 0; j < stylesheet.rules.length; j++) {
            var rule = stylesheet.rules[j];
            if (rule.type == CSSRule.KEYFRAMES_RULE && rule.name == emotionRuleName) {
                animationRule = rule;
                break; 
            };
        };

        if (animationRule) {
            // Modify the animation rule
            var keyframes = animationRule.cssRules;
            for (var k = 0; k < keyframes.length; k++){
                var keyframe = keyframes[k];
                if (keyframe.keyText == '100%'){
                    // var shadow_inset = (1-emotionPercentage)*100;
                    // keyframe.style.boxShadow = `inset -${shadow_inset}em 0 0 0 #f7f7f7`;
                    var width = emotionPercentage*100;
                    keyframe.style.width = `${width}%`;
                };
            };
        };

    };


    const sentimentRuleNames = ['positive-bar', 'neutral-bar', 'negative-bar'];
    const sentimentPercentages = [pos, neu, neg];
    for (var i = 0; i < sentimentRuleNames.length; i++){
        var sentimentRuleName = sentimentRuleNames[i];
        var sentimentPercentage = sentimentPercentages[i];
        var animationRule = null;
        for (var j = 0; j < stylesheet.rules.length; j++){
            var rule = stylesheet.rules[j];
            if (rule.type == CSSRule.KEYFRAMES_RULE && rule.name == sentimentRuleName) {
                animationRule = rule;
                break; 
            };
        };

        if (animationRule) {
            // Modify the animation rule
            var keyframes = animationRule.cssRules;
            for (var k = 0; k < keyframes.length; k++){
                var keyframe = keyframes[k];
                if (keyframe.keyText == '100%'){
                    var width = sentimentPercentage*100;
                    keyframe.style.width = `${width}%`;
                };
            };
        };
    };
    setTimeout(() => {  
    // Fade in the caja-padre
    cajaPadre.style.opacity = 1;}, 350); // Adjust the duration to match your CSS transition (0.5s in this example)

}

// Call updateData function initially
updateData().then((response) => {
    updateMelodyMode();
    //console.log('Datos actualizados exitosamente.');
})  
.catch((error) => {
    console.log("El servidor está caído.");
    window.location.href = "server_down.html";
});

// Call updateData function every minute
setInterval(() => {
    updateMelodyMode(); // Update id_melody_mode
    updateData().then((response) => {
    })
  }, 60 * 1000); // 60 seconds = 1 minute