const alegria = document.getElementById("alegria-value");
const tristeza = document.getElementById("tristeza-value");
const sorpresa = document.getElementById("sorpresa-value");
const asco = document.getElementById("asco-value");
const miedo = document.getElementById("miedo-value");
const enojo = document.getElementById("enojo-value");
const otro = document.getElementById("otro-value");
const pos = document.getElementById("pos-value");
const neu = document.getElementById("neu-value");
const neg = document.getElementById("neg-value");

function setValues(alegria_percentage, tristeza_percentage, sorpresa_percentage, asco_percentage, miedo_percentage, enojo_percentage, otro_percentage, pos_percentage, neu_percentage, neg_percentage){
    alegria.innerHTML = (alegria_percentage * 100).toString().concat("%");
    tristeza.innerHTML = (tristeza_percentage * 100).toString().concat("%");
    sorpresa.innerHTML = (sorpresa_percentage * 100).toString().concat("%");
    asco.innerHTML = (asco_percentage * 100).toString().concat("%");
    miedo.innerHTML = (miedo_percentage * 100).toString().concat("%");
    enojo.innerHTML = (enojo_percentage * 100).toString().concat("%");
    otro.innerHTML = (otro_percentage * 100).toString().concat("%");
    pos.innerHTML = (pos_percentage * 100).toString().concat("%");
    neu.innerHTML = (neu_percentage * 100).toString().concat("%");
    neg.innerHTML = (neg_percentage * 100).toString().concat("%");

};



setValues(0.67, 0.05, 0.11, 0.04, 0.02, 0.04, 0.33, 0.25, 0.25, 0.5);










