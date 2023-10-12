interface Props {
  value: number;
}

export const Day: React.FC<Props> = ({ value }) => {
  let label = '';

  switch (value) {
    case 0:
      label = 'Sun'
      break;
    case 1:
      label = 'Mon'
      break;
    case 2:
      label = 'Tue'
      break;
    case 3:
      label = 'Wed'
      break;
    case 4:
      label = 'Thu'
      break;
    case 5:
      label = 'Fri'
      break;
    case 6:
      label = 'Sat'
      break;
  }

  return (
    <span className="font-semibold mt-1 text-md">{label}</span>
  )
}