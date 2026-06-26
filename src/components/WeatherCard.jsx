import { Card, Text, Title } from "@mantine/core"; // UI

function WeatherCard({ title, value, unit }) {
  return (
    <Card className="glass-card" radius="xl" padding="lg">
      <Title order={3} className="card-title">
        {title}
      </Title>

      <Text className="card-value">
        {value} {unit}
      </Text>
    </Card>
  );
}

export default WeatherCard;