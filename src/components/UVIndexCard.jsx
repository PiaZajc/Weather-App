import { Card, Text, Title } from "@mantine/core";

function getUvLevel(uvIndex) {
  if (uvIndex < 3) return "Low";
  if (uvIndex < 6) return "Moderate";
  if (uvIndex < 8) return "High";
  if (uvIndex < 11) return "Very high";
  return "Extreme";
}

function UVIndexCard({ uvIndex }) {
  const safeUvIndex = Number.isFinite(Number(uvIndex)) ? Number(uvIndex) : 0;
  const roundedUvIndex = Math.round(safeUvIndex);

  // UV index is commonly displayed on a 0 to 11+ scale.
  // Values above 11 are capped visually at the end of the bar.
  const markerPosition = Math.min((safeUvIndex / 11) * 100, 100);
  const uvLevel = getUvLevel(safeUvIndex);

  return (
    <Card className="glass-card uv-card" radius="xl" padding="lg">
      <Text className="weather-card-title">UV Index</Text>

      <div className="uv-summary">
        <Title order={2} className="weather-card-value uv-card-value">
          {roundedUvIndex}
        </Title>

        <Text className="uv-card-level">{uvLevel}</Text>
      </div>

      <div className="uv-scale-wrap">
        <div
          className="uv-scale"
          aria-label={`Current UV index is ${roundedUvIndex}, ${uvLevel}`}
        >
          <div
            className="uv-scale-marker"
            style={{ left: `${markerPosition}%` }}
          ></div>
        </div>

        <div className="uv-scale-labels">
          <span>0</span>
          <span>3</span>
          <span>6</span>
          <span>8</span>
          <span>11+</span>
        </div>
      </div>

      <Text className="weather-card-description">Current UV strength</Text>
    </Card>
  );
}

export default UVIndexCard;
