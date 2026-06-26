import { Card, Text, Title } from "@mantine/core";

function WeatherCard({ title, value, unit = "", description = "" }) {
  return (
    <Card className="glass-card" radius="xl" padding="lg">
      <Text className="weather-card-title">{title}</Text>

      <Title order={2} className="weather-card-value">
        {value} {unit}
      </Title>

      {description && <Text className="weather-card-description">{description}</Text>}
    </Card>
  );
}

export default WeatherCard;
