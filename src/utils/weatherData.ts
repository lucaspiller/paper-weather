export interface HourlyData {
  day: number;
  hour: number;
  isDay: boolean;
  temperature: number;
  precipitationProbability: number;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
}

export interface DailyData {
  day: number;
  temperatureMin: number;
  temperatureMax: number;
  precipitationProbability: number;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
}

export interface WeatherData {
  units: {
    temperature: string;
    windspeed: string;
  }
  sunrise: Date;
  sunset: Date;
  now: HourlyData;
  hourly: HourlyData[];
  daily: DailyData[];
}

export const parseWeatherData = (raw: any): WeatherData => {
  const allHourly = (raw.hourly.time as Array<any>).map((time, index): HourlyData => {
    return {
      day: new Date(time).getDay(),
      hour: new Date(time).getHours(),
      isDay: raw.hourly.is_day[index] === 1,
      temperature: raw.hourly.temperature_2m[index] as number,
      precipitationProbability: raw.hourly.precipitation_probability[index] as number,
      weatherCode: raw.hourly.weathercode[index] as number,
      windSpeed: raw.hourly.windspeed_10m[index] as number,
      windDirection: raw.hourly.winddirection_10m[index] as number,
    }
  })

  const now = allHourly.slice(new Date().getHours())[0];
  const hourly = allHourly.slice(new Date().getHours()).filter((_x, i) => i % 3 == 0).slice(1, 5);

  const daily = (raw.daily.time as Array<any>).map((time, index): DailyData => {
    return {
      day: new Date(time).getDay(),
      temperatureMin: raw.daily.temperature_2m_min[index] as number,
      temperatureMax: raw.daily.temperature_2m_max[index] as number,
      precipitationProbability: raw.daily.precipitation_probability_max[index] as number,
      weatherCode: raw.daily.weathercode[index] as number,
      windSpeed: raw.daily.windspeed_10m_max[index] as number,
      windDirection: raw.daily.winddirection_10m_dominant[index] as number,
    }
  }).slice(1, 6);

  return {
    units: {
      temperature: raw.hourly_units.temperature_2m,
      windspeed: raw.hourly_units.windspeed_10m,
    },
    sunrise: new Date(raw.daily.sunrise[0]),
    sunset: new Date(raw.daily.sunset[0]),
    now,
    hourly,
    daily,
  }
}

export const fetchWeatherData = async (lat: number, lng: number) => {
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,precipitation_probability,weathercode,windspeed_10m,winddirection_10m,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,windspeed_10m_max,winddirection_10m_dominant,sunrise,sunset&windspeed_unit=ms&timezone=auto`

  return fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => parseWeatherData(data));
};