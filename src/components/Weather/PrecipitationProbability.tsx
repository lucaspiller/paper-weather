interface Props {
  value: number;
}

export const PrecipitationProbability: React.FC<Props> = ({ value }) => {
  return (
    <span className="text-sm font-semibold text-color-light">
      {Math.round(value)}%
    </span>
  )
}