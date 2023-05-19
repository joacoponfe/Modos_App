import { url } from "./config.js";

// Create request object
const object = {};
object['id_melody_mode'] = 'jonico';

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
    try {
        const response = await query(requestJSON);
    } catch (error) {
        console.log(error);
        //window.location.href = "server_down.html";
    }
    const modeData = await response.json();
    console.log(modeData);
    console.log('me actualicé!')

    
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

  // radius in px
  radius: 300,

  // animation speed
  // slow, normal, fast
  maxSpeed: 'fast',
  initSpeed: 'fast',

  // 0 = top
  // 90 = left
  // 135 = right-bottom
  direction: 135,
  
  // interact with cursor move on mouse out
  keep: true
  
});

//To change the color of text randomly
//var colors = ['#34A853', '#FBBC05', '#4285F4', '#7FBC00', 'FFBA01', '01A6F0', '#F00105', '#AB0C76'];
//var colors = ['#044d59', '#59044f', '#ab0322', '#03ab87', '#abe305', '#49574a', '#d0e60e']
var colors = ['#044d59'];
var random_color = colors[Math.floor(Math.random() * colors.length)];
document.querySelector('.content').style.color = random_color;

document.getElementById('alegria-value').innerHTML = (alegria * 100).toFixed(0).toString().concat("%");
document.getElementById('tristeza-value').innerHTML = (tristeza * 100).toFixed(0).toString().concat("%");
document.getElementById('sorpresa-value').innerHTML = (sorpresa * 100).toFixed(0).toString().concat("%");
document.getElementById('asco-value').innerHTML = (asco * 100).toFixed(0).toString().concat("%");
document.getElementById('miedo-value').innerHTML = (miedo * 100).toFixed(0).toString().concat("%");
document.getElementById('enojo-value').innerHTML = (enojo * 100).toFixed(0).toString().concat("%");
// document.getElementById('otro-value').innerHTML = (otro * 100).toFixed(0).toString().concat("%");
document.getElementById('pos-value').innerHTML = (pos * 100).toFixed(0).toString().concat("%");
document.getElementById('neu-value').innerHTML = (neu * 100).toFixed(0).toString().concat("%");
document.getElementById('neg-value').innerHTML = (neg * 100).toFixed(0).toString().concat("%");

// Get the style sheet containing the alegria-bar animation
const stylesheet = document.styleSheets[1];

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
                var shadow_inset = (1-emotionPercentage)*100;
                keyframe.style.boxShadow = `inset -${shadow_inset}em 0 0 0 #f7f7f7`;
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
updateData();

// Call updateData function every 5 minutes
// setInterval(updateData, 5 * 60 * 1000);
