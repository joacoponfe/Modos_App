const i18next = require('i18next');
const Backend = require('i18next-http-backend');
//import i18next from '/i18next';
// Initialize i18next

i18next
  .use(Backend)
  .init({
    lng: 'es', // Default language
    backend: {
      loadPath: 'locales/{{lng}}.json', // Path to translation files
    },
  })
  .then(() => {
    // Translation resources are loaded and i18next is ready

    // Function to change the language
    function changeLanguage(lang) {
      i18next.changeLanguage(lang, (err, t) => {
        if (err) return console.error('Error loading translation:', err);
        // Call a function to update the UI with the new language
        updateUIWithTranslation();
      });
    }

    // Function to update the UI with translations
    function updateUIWithTranslation() {
      document.getElementById('nextButton').textContent = i18next.t('index:start');
    //   document.getElementById('description').textContent = i18next.t('home:description');
      // Add more UI elements as needed
    }

    // Event listener for language selection (e.g., a dropdown)
    document.getElementById('language-dropdown').addEventListener('change', (event) => {
      const selectedLanguage = event.target.value;
      changeLanguage(selectedLanguage);
    });

    // Initial UI update with translations
    updateUIWithTranslation();
  })
  .catch((err) => {
    console.error('Error initializing i18next:', err);
  });