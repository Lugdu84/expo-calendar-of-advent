type MainWeather = {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	humidity: number;
};

type Weather = {
	name: string;
	main: MainWeather;
	weather: [
		{
			main: string;
			description: string;
		}
	];
};

type WeatherForecast = {
	main: MainWeather;
	dt: number;
};
