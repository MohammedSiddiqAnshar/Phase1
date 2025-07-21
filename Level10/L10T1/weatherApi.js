import axios from "axios";

const API_KEY = "eb85ea2d9fa59ddd7dcec16efbfc3cb6";

export const fetchWeatherByCity = async (city) => {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  return res.data;
};
