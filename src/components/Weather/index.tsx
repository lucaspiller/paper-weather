import ReactDOMServer from 'react-dom/server';

import { Day } from "./Day";
import { Hour } from "./Hour";
import { PrecipitationProbability } from "./PrecipitationProbability";
import { Temperature } from "./Temperature";
import { WeatherIcon } from "./WeatherIcon";
import { WindSpeed } from "./WindSpeed";
import { WeatherData } from "../../utils/weatherData";
import { Time } from './Time';

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Header = () => {
  const d = new Date();
  const month = MONTHS[d.getMonth()];
  const day = DAYS[d.getDay()];

  return (
    <div className="font-semibold uppercase text-xs text-color-extra-light ml-4 mb-2">
      {day}, {month} {d.getDate()}, {d.getFullYear()}
    </div>
  )
}

const Now = ({ data }: { data: WeatherData }) => {
  const now = data.now;

  return (
    <div className="text-center">
      <div className="w-1/3 inline-block">
        <WeatherIcon code={now.weatherCode} isDay={now.isDay} size="w-32" />
      </div>
      <div className="w-1/3 inline-block text-5xl relative top-3">
        <Temperature value={now.temperature} />
      </div>
      <div className="w-1/3 inline-block font-semibold text-color-light text-xs text-left relative top-3">
        <div className="mt-2">
          <div className="w-1/2 inline-block">
            <img src="/icons/wind.svg" className="inline-block mr-2" />
            <WindSpeed value={now.windSpeed} units={data.units.windspeed} />
          </div>
          <div className="w-1/2 inline-block">
            <PrecipitationProbability value={now.precipitationProbability} />
          </div>
        </div>
        <div className="mt-2">
          <div className="w-1/2 inline-block">
            <img src="/icons/sunrise.svg" className="inline-block mr-2" />
            <Time value={data.sunrise} />
          </div>
          <div className="w-1/2 inline-block">
            <Time value={data.sunset} />
          </div>
        </div>
      </div>
    </div>
  )
}

const Hourly = ({ data }: { data: WeatherData }) => {
  return (
    <div className="text-center">
      {data.hourly.map((hourly) => {
        return (
          <div key={hourly.hour} className="inline-block w-1/4">
            <div>
              <Temperature value={hourly.temperature} />
            </div>
            <div>
              <PrecipitationProbability value={hourly.precipitationProbability} />
            </div>
            <div>
              <WeatherIcon code={hourly.weatherCode} isDay={hourly.isDay} size="w-14" />
            </div>
            <div className="mb-1">
              <WindSpeed value={hourly.windSpeed} units={data.units.windspeed} />
            </div>
            <Hour value={hourly.hour} />
          </div>
        );
      })}
    </div>
  );
}

const Daily = ({ data }: { data: WeatherData }) => {
  return (
    <div className="text-center mt-5">
      {data.daily.map((daily) => {
        return (
          <div key={daily.day}>
            <div className="inline-block w-1/5">
              <Day value={daily.day} />
            </div>
            <div className="inline-block w-1/5">
              <WeatherIcon code={daily.weatherCode} isDay size="w-10" />
            </div>
            <div className="inline-block w-1/5">
              <Temperature value={daily.temperatureMax} />
              <span className="text-color-extra-light">&nbsp;/&nbsp;</span>
              <Temperature value={daily.temperatureMin} />
            </div>
            <div className="inline-block w-1/5">
              <PrecipitationProbability value={daily.precipitationProbability} />
            </div>
            <div className="inline-block w-1/5">
              <WindSpeed value={daily.windSpeed} units={data.units.windspeed} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

const Weather = ({ data }: { data: WeatherData }) => {
  return (
    <div className="w-screen min-h-screen">
      <Header />
      <Now data={data} />
      <Hourly data={data} />
      <Daily data={data} />
    </div>
  );
}

const renderToString = (data: WeatherData) => {
  return ReactDOMServer.renderToString(<Weather data={data} />);
};

export default renderToString;