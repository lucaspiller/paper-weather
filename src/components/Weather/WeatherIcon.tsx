interface Props {
  code: number;
  isDay: boolean;
  size: string;
}

const getIcon = (code: number, isDay: boolean) => {
  switch (code) {
    case 1: // mainly clear
    case 2: // partly cloudy
      if (isDay) {
        return 'cloud.sun';
      } else {
        return 'cloud.moon';
      }

    case 3: // overcast
      return 'cloud';

    case 45: // fog
    case 48: // depositing rime fog
      return 'cloud.fog';

    case 51: // light drizzle
    case 56: // light freezing drizzle
    case 61: // light rain
    case 66: // light freezing rain
    case 80: // light rain showers
      return 'cloud.drizzle';

    case 53: // moderate drizzle
    case 62: // moderate rain
    case 81: // moderate rain showers
    return 'cloud.rain';

    case 55: // dense drizzle
    case 57: // dense freezing drizzle
    case 63: // heavy rainy
    case 67: // heavy freezing rain
    case 82: // heavy rain showers
    return 'cloud.heavyrain';

    case 85: // light snow showers
    case 86: // heavy snow showers
    case 71: // light snow
    case 73: // moderate snow
    case 75: // heavy snow
      return 'cloud.snow';

    case 77: // snow grains
      return 'cloud.sleet';

    case 95: // thunderstorm
    case 96: // thunderstorm with slight hail
    case 99: // thunderstorm with heavy hail
      return 'cloud.bolt.rain';

    default: 
      if (isDay) {
        return 'sun';
      } else {
        return 'moon';
      }
  }
};

export const WeatherIcon: React.FC<Props> = ({ code, isDay, size }) => {
  const icon = getIcon(code, isDay);
  const className = `svg-filter inline-block ${size}`;

  return (
    <img src={`/icons/${icon}.svg`} alt="" title={code.toString()} className={className} />
  )
}

