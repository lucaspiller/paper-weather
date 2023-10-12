interface Props {
  value: number;
}

export const Temperature: React.FC<Props> = ({ value }) => {
  return (
    <span className="font-semibold text-md">
      {Math.round(value)}°
    </span>
  )
}