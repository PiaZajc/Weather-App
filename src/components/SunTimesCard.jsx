import { Card, Text, Title } from "@mantine/core";
import dayjs from "dayjs";

import sunriseIcon from "@meteocons/svg/fill/sunrise.svg";
import sunsetIcon from "@meteocons/svg/fill/sunset.svg";

function SunTimesCard({ sunrise, sunset }) {
  return (
    <Card className="glass-card sun-times-card" radius="xl" padding="lg">
      <Text className="weather-card-title">
        Sun Times
      </Text>

      <div className="sun-times-content">
        <div className="sun-time-item">
          <div className="sun-icon-box">
            <img
              src={sunriseIcon}
              alt="Sunrise"
              className="sun-meteocon"
            />
          </div>

          <div>
            <Text className="sun-time-label">Sunrise</Text>
            <Title order={3} className="sun-time-value">
              {dayjs(sunrise).format("HH:mm")}
            </Title>
          </div>
        </div>

        <div className="sun-time-item">
          <div className="sun-icon-box">
            <img
              src={sunsetIcon}
              alt="Sunset"
              className="sun-meteocon"
            />
          </div>

          <div>
            <Text className="sun-time-label">Sunset</Text>
            <Title order={3} className="sun-time-value">
              {dayjs(sunset).format("HH:mm")}
            </Title>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default SunTimesCard;