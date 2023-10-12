interface Props {
  value: number;
  units: string;
}

export const WindSpeed: React.FC<Props> = ({ value, units }) => {
  return (
    <span className="font-semibold text-color-light">
      <span className="text-sm">{Math.round(value)}</span>
      &nbsp;
      <span className="text-xs">{units}</span>
    </span>
  )
}