const { fetchWeather, saveWeatherEntry, getWeatherSummary } = require('./weatherService');

const run = async () => {
  try {
    const entry = await fetchWeather();
    console.log("Fetched:", entry);

    await saveWeatherEntry(entry);
    console.log("Saved to MongoDB.");

    const summary = await getWeatherSummary("2024-03-01", "2024-04-01");
    console.log("Summary:", summary);
  } catch (err) {
    console.error("Error:", err.message);
  }
};

run();
