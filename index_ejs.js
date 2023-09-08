import express from "express";
import path from "path";
import i18next from "i18next";
import i18nextMiddleware, { LanguageDetector } from "i18next-express-middleware";
import enTranslations from './locales/en.json' assert { type: "json" };
import esTranslations from './locales/es.json' assert { type: "json" };
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;

const app = express();

// Set the view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Initialize i18next and add middleware
i18next
  .init({
    lng: 'es',
    resources: {
      en: {
        translation: enTranslations,
      },
      es: {
        translation: esTranslations,
      },
    },
  });

app.use(i18nextMiddleware.handle(i18next));

// Middleware to inject the `t` function into res.locals
app.use((req, res, next) => {
  res.locals.t = req.t;
  next();
});

// Route to render the index.ejs view
app.get('/', (req, res) => {
  console.log(typeof req.t);
  res.render('index');
});

// Serve static assets (if needed)
app.use(express.static(path.join(__dirname, 'public/assets')));

// Start the Express server
app.listen(3000, '0.0.0.0', function() {
  console.log('Listening to port:  ' + 3000);
});

export {app};