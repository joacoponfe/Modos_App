const alegria_value = document.getElementById("alegria-value");
const tristeza_value = document.getElementById("tristeza-value");
const sorpresa_value = document.getElementById("sorpresa-value");
const asco_value = document.getElementById("asco-value");
const miedo_value = document.getElementById("miedo-value");
const enojo_value = document.getElementById("enojo-value");
const otro_value = document.getElementById("otro-value");
const pos_value = document.getElementById("pos-value");
const neu_value = document.getElementById("neu-value");
const neg_value = document.getElementById("neg-value");

export function setValues(alegria_percentage, tristeza_percentage, sorpresa_percentage, asco_percentage, miedo_percentage, enojo_percentage, otro_percentage, pos_percentage, neu_percentage, neg_percentage){
    alegria_value.innerHTML = (alegria_percentage * 100).toString().concat("%");
    tristeza_value.innerHTML = (tristeza_percentage * 100).toString().concat("%");
    sorpresa_value.innerHTML = (sorpresa_percentage * 100).toString().concat("%");
    asco_value.innerHTML = (asco_percentage * 100).toString().concat("%");
    miedo_value.innerHTML = (miedo_percentage * 100).toString().concat("%");
    enojo_value.innerHTML = (enojo_percentage * 100).toString().concat("%");
    otro_value.innerHTML = (otro_percentage * 100).toString().concat("%");
    pos_value.innerHTML = (pos_percentage * 100).toString().concat("%");
    neu_value.innerHTML = (neu_percentage * 100).toString().concat("%");
    neg_value.innerHTML = (neg_percentage * 100).toString().concat("%");

};

//setValues(0.67, 0.05, 0.11, 0.04, 0.02, 0.04, 0.33, 0.25, 0.25, 0.5);










