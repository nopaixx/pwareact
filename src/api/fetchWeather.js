import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "e75bd5c9c3f5d638fde1920749c357b8";
export const fetchWeather = async query => {
	const { data } = await axios.get(URL, {
		params: {
			q: query,
			units: "metric",
			APPID: API_KEY
		}
	});

	return data;
};
