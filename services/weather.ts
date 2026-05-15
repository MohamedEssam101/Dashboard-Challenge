import { slowFetch } from "@/shared/slow-fetch";
import { OpenMeteoWeatherResponse, WeatherData } from "@/types/weather";

// Open-Meteo endpoint for current and daily Cairo weather.
const WEATHER_URL =
	"https://api.open-meteo.com/v1/forecast?latitude=30.04&longitude=31.24&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=Africa/Cairo";

export async function getWeather(): Promise<WeatherData> {
	// Weather is one section-level request, so the whole weather card loads together.
	const response = await slowFetch(WEATHER_URL);

	if (!response.ok) {
		// Treat non-2xx responses as section-level failures.
		throw new Error("Failed to fetch weather data");
	}

	const data: OpenMeteoWeatherResponse = await response.json();

	// Map the nested Open-Meteo payload into the flat WeatherData model used by the UI.
	return {
		temperature: data.current_weather.temperature,
		temperatureUnit: data.current_weather_units.temperature,
		windSpeed: data.current_weather.windspeed,
		windSpeedUnit: data.current_weather_units.windspeed,
		windDirection: data.current_weather.winddirection,
		windDirectionUnit: data.current_weather_units.winddirection,
		weatherCode: data.current_weather.weathercode,
		isDay: data.current_weather.is_day === 1,
		maxTemperature: data.daily.temperature_2m_max[0],
		minTemperature: data.daily.temperature_2m_min[0],
		date: data.daily.time[0],
		timezone: data.timezone,
	};
}
