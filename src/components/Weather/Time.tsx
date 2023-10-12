interface Props {
  value: Date;
}

export const Time: React.FC<Props> = ({ value }) => {
  const hours = value.getHours();

  let minutes: string | number = value.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return <span>{hours}:{minutes}</span>;
}