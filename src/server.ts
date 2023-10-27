import express from 'express';
import { engine } from 'express-handlebars';
import renderWeather from './components/Weather';
import { fetchWeatherData } from './utils/weatherData';

const app = express();

app.use(express.static('public'))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/weather', async (req, res) => {
  const lat = +(req.query.lat || 51.5);
  const lng = +(req.query.lng || 0);

  const data = await fetchWeatherData(lat, lng);
  const html = renderWeather(data);

  res.render("weather", {
    layout: false,
    helpers: {
      html() {
        return html
      },
    },
  });
});

app.listen(3000, () => {
  console.log('Listening at http://localhost:3000');
});

process.on('SIGINT', function() {
  process.exit();
});