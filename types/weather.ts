// Raw Open-Meteo response shape for the fields requested by the app.
export interface OpenMeteoWeatherResponse {
	latitude: number;
	longitude: number;
	generationtime_ms: number;
	utc_offset_seconds: number;
	timezone: string;
	timezone_abbreviation: string;
	elevation: number;
	current_weather_units: {
		time: string;
		interval: string;
		temperature: string;
		windspeed: string;
		winddirection: string;
		is_day: string;
		weathercode: string;
	};
	current_weather: {
		time: string;
		interval: number;
		temperature: number;
		windspeed: number;
		winddirection: number;
		is_day: number;
		weathercode: number;
	};
	daily_units: {
		time: string;
		temperature_2m_max: string;
		temperature_2m_min: string;
	};
	daily: {
		time: string[];
		temperature_2m_max: number[];
		temperature_2m_min: number[];
	};
}

// Resolved weather data returned by getWeather().
export interface WeatherData {
	temperature: number;
	temperatureUnit: string;
	windSpeed: number;
	windSpeedUnit: string;
	windDirection: number;
	windDirectionUnit: string;
	weatherCode: number;
	isDay: boolean;
	maxTemperature: number;
	minTemperature: number;
	date: string;
	timezone: string;
}
