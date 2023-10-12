interface Props {
  value: number;
}

export const Hour: React.FC<Props> = ({ value }) => {
  let hour = value % 12;

  if (hour == 0) {
    hour = 12;
  }

  const ampm = value >= 12 ? 'PM' : 'AM';

  return (
    <div className="mt-1 font-semibold">
      <span className="text-md">{hour}</span>
      &nbsp;
      <span className="text-sm">{ampm}</span>
    </div>
  )
}