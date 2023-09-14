import { language } from "./config.js";
import esTranslations from '../locales/es.json' assert { type: "json" };
import enTranslations from '../locales/en.json' assert { type: "json" };

// Set dictionary for translation
const translations = {
  es: esTranslations,
  en: enTranslations,
};

// Get all elements with an ID attribute
const elementsWithId = document.querySelectorAll("[id]");
// elementsWithId is a NodeList, you can convert it to an array if needed
const elementsArray = Array.from(elementsWithId);

// Loop through the elements and set the text content acccording to the translation in JSON file
elementsArray.forEach(element => {
  console.log("Element ID:", element.id);
  // Check if the element has a translation in the JSON file
  if (translations[language][page_id][element.id] === undefined) {
    console.log("No translation found for element ID:", element.id);
    return;
  } else {
    // If element is of input type, change its value
    if (element.tagName === "INPUT") {
      element.value = translations[language][page_id][element.id];
    } else if (element.tagName === "OPTION") {
      element.innerHTML = translations[language][page_id][element.id];
    } else if (element.tagName === "BUTTON") {
      element.innerHTML = translations[language][page_id][element.id];
    } else {
      // If element is of any other type, change its text content
      element.innerHTML = translations[language][page_id][element.id];
    }
  } 
});