import { Card } from "@mantine/core";

function AboutPage() {
  const infoItems = [
    {
      icon: "🌡️",
      title: "Current weather",
      text: "Temperature, feels-like value, humidity, and the current condition for your searched city.",
    },
    {
      icon: "🕒",
      title: "Hourly forecast",
      text: "Today’s hourly forecast scrolls horizontally and starts near the current hour.",
    },
    {
      icon: "☀️",
      title: "UV index",
      text: "The UV card shows current UV strength on a green-to-red safety scale.",
    },
    {
      icon: "📅",
      title: "7-day forecast",
      text: "A compact daily list with icons, minimum and maximum temperatures, and range bars.",
    },
    {
      icon: "🎨",
      title: "Dynamic design",
      text: "Icons and the main card background change based on the current weather code.",
    },
    {
      icon: "🌍",
      title: "Data source",
      text: "Weather data comes from Open-Meteo and updates as forecast data changes.",
    },
  ];

  return (
    <section className="info-page">
      <Card className="page-card about-card" radius="xl" padding="xl">
        <p className="page-eyebrow about-eyebrow">About</p>
        <h1 className="page-title about-title">What the app shows</h1>

        <p className="page-intro about-intro">
          A simple weather dashboard for checking current conditions, today’s
          hourly forecast, UV strength, and the next few days.
        </p>

        <div className="about-info-grid">
          {infoItems.map((item) => (
            <article className="about-info-box" key={item.title}>
              <div className="about-icon" aria-hidden="true">
                {item.icon}
              </div>

              <div>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </Card>
    </section>
  );
}

export default AboutPage;
