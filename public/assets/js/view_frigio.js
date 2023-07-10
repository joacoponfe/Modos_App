import { url } from "./config.js";

// Create request object
const object = {'id_melody_mode':'frigio'};

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

async function updateData() {
    const response = await query(requestJSON);
    const modeData = await response.json();
    console.log(modeData);
    // Get current timestamp
    var current_timestamp = new Date();
    console.log('Datos actualizados exitosamente: '.concat(current_timestamp.toString()).concat('.'));

    
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

    var numberElement = document.querySelector('.number');
    // Set the new value for the element
    var newNumber = num_participants;
    numberElement.textContent = newNumber;

    var tagCloud = TagCloud('.content', myTags,{

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

    // Change color of text
    const rootStyles = getComputedStyle(document.documentElement);
    const main_colors = {'jonico': rootStyles.getPropertyValue('--bs-cyan'), 'dorico': rootStyles.getPropertyValue('--bs-yellow'), 'frigio': rootStyles.getPropertyValue('--bs-pink'), 'lidio': rootStyles.getPropertyValue('--bs-purple'), 'mixolidio': rootStyles.getPropertyValue('--bs-beige'), 'eolico': rootStyles.getPropertyValue('--bs-orange'), 'locrio': rootStyles.getPropertyValue('--bs-mustard-green')};
    const main_colors_transparent = {'jonico': rootStyles.getPropertyValue('--bs-cyan-transparent'), 'dorico': rootStyles.getPropertyValue('--bs-yellow-transparent'), 'frigio': rootStyles.getPropertyValue('--bs-pink-transparent'), 'lidio': rootStyles.getPropertyValue('--bs-purple-transparent'), 'mixolidio': rootStyles.getPropertyValue('--bs-beige-transparent'), 'eolico': rootStyles.getPropertyValue('--bs-orange-transparent'), 'locrio': rootStyles.getPropertyValue('--bs-mustard-green-transparent')};
    document.documentElement.style.setProperty('--main-color', main_colors['frigio']);
    document.documentElement.style.setProperty('--main-color-transparent', main_colors_transparent['frigio']);

    // Avoid percentage sum to be greater than 100%
    var alegria_redondeado = parseInt((alegria * 100).toFixed(0));
    var tristeza_redondeado = parseInt((tristeza * 100).toFixed(0));
    var sorpresa_redondeado = parseInt((sorpresa * 100).toFixed(0));
    var asco_redondeado = parseInt((asco * 100).toFixed(0));
    var miedo_redondeado = parseInt((miedo * 100).toFixed(0));
    var enojo_redondeado = parseInt((enojo * 100).toFixed(0));

    var emotions_redondeados = [alegria_redondeado, tristeza_redondeado, sorpresa_redondeado, asco_redondeado, miedo_redondeado, enojo_redondeado];
    var emotion_redondeado_sum = alegria_redondeado + tristeza_redondeado + sorpresa_redondeado + asco_redondeado + miedo_redondeado + enojo_redondeado;

    if (emotion_redondeado_sum > 100){
        // Get minimum value
        var min_value = Math.min(alegria, tristeza, sorpresa, asco, miedo, enojo);
    // Get index of minimum value
        var min_index = [alegria, tristeza, sorpresa, asco, miedo, enojo].indexOf(min_value);
        var subtract = emotion_redondeado_sum - 100;
        // Subtract from minimum value
        emotions_redondeados[min_index] -= subtract;
        // Update emotion_redondeado_sum
        emotion_redondeado_sum = emotions_redondeados[0] + emotions_redondeados[1] + emotions_redondeados[2] + emotions_redondeados[3] + emotions_redondeados[4] + emotions_redondeados[5];
    }

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
    }

    document.getElementById('alegria-value').innerHTML = emotions_redondeados[0].toString().concat("%");
    document.getElementById('tristeza-value').innerHTML = emotions_redondeados[1].toString().concat("%");
    document.getElementById('sorpresa-value').innerHTML = emotions_redondeados[2].toString().concat("%");
    document.getElementById('asco-value').innerHTML = emotions_redondeados[3].toString().concat("%");
    document.getElementById('miedo-value').innerHTML = emotions_redondeados[4].toString().concat("%");
    document.getElementById('enojo-value').innerHTML = emotions_redondeados[5].toString().concat("%");
    // document.getElementById('otro-value').innerHTML = (otro * 100).toFixed(0).toString().concat("%");
    document.getElementById('pos-value').innerHTML = valence_redondeados[0].toString().concat("%");
    document.getElementById('neu-value').innerHTML = valence_redondeados[1].toString().concat("%");
    document.getElementById('neg-value').innerHTML = valence_redondeados[2].toString().concat("%");

    // Get the style sheet containing the alegria-bar animation
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

}

// Call updateData function initially
updateData().then((response) => {
    //console.log('Datos actualizados exitosamente.');
})
.catch((error) => {
    console.log("El servidor está caído.");
    window.location.href = "server_down.html";
});

// Call updateData function every 5 minutes
// setInterval(updateData, 5 * 60 * 1000);

