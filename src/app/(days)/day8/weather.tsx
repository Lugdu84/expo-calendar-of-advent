import { useEffect, useState } from 'react';
import {
	View,
	Text,
	ActivityIndicator,
	StyleSheet,
	FlatList,
	ImageBackground,
} from 'react-native';
import * as Location from 'expo-location';
import ForcastItem from '@/components/day8/ForcastItem';
import { Stack } from 'expo-router';
import { getTemp } from '@/lib/utils';
import LottieView from 'lottie-react-native';

const bgImage =
	'https://images.unsplash.com/photo-1697665666330-7acf230fa830?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export default function WeatherScreen() {
	const [location, setLocation] = useState<Location.LocationObject | null>(
		null
	);
	const [errorMsg, setErrorMsg] = useState<String | null>(null);
	const [weather, setWeather] = useState<Weather | null>(null);
	const [forecast, setForecast] = useState<WeatherForecast[]>([]);
	const baseUrl = 'https://api.openweathermap.org/data/2.5/';

	const fetchWeather = async () => {
		if (!location) return;
		const latitude = location.coords.latitude;
		const longitude = location.coords.longitude;
		const url = `${baseUrl}weather?lat=${latitude}&lon=${longitude}&appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}&units=metric&lang=fr`;

		const response = await fetch(url);
		const data = await response.json();
		// console.log(JSON.stringify(weatherData, null, 2));
		setWeather(data);
	};

	const fetchForecast = async () => {
		if (!location) return;
		const latitude = location.coords.latitude;
		const longitude = location.coords.longitude;
		const url = `${baseUrl}forecast?lat=${latitude}&lon=${longitude}&&appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}&units=metric&lang=fr`;
		const response = await fetch(url);
		const data = await response.json();
		console.log(JSON.stringify(data, null, 2));
		setForecast(data.list);
	};

	useEffect(() => {
		if (location) {
			fetchWeather();
			fetchForecast();
		}
	}, [location]);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			}
			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();
	}, []);

	console.log(location);

	if (!weather) {
		return <ActivityIndicator />;
	}
	return (
		<ImageBackground
			source={{
				uri: bgImage,
			}}
			style={styles.container}>
			<Stack.Screen options={{ headerShown: false }} />
			<View
				style={{
					...StyleSheet.absoluteFillObject,
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
				}}
			/>
			<View style={styles.current}>
				<Text style={styles.location}>{weather.name}</Text>
				<Text style={styles.temp}>{getTemp(weather.main.temp)}°</Text>
				<LottieView
					source={
						weather.weather[0].main === 'Rain'
							? require('@assets/lottie/rain.json')
							: require('@assets/lottie/sun.json')
					}
					style={{ width: 200, aspectRatio: 1 }}
					autoPlay
					loop
				/>
				<Text style={styles.location}>{weather.weather[0].description}</Text>
			</View>
			<FlatList
				data={forecast}
				style={{
					flexGrow: 0,
					height: 150,
					marginBottom: 40,
				}}
				contentContainerStyle={{ gap: 10, paddingHorizontal: 10 }}
				showsHorizontalScrollIndicator={false}
				horizontal
				renderItem={({ item }) => <ForcastItem forecast={item} />}
			/>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
	},
	current: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	location: {
		fontFamily: 'Inter',
		fontSize: 30,
		color: 'lightgray',
	},
	temp: {
		fontFamily: 'InterBlack',
		fontSize: 70,
		color: '#fefefe',
	},
});
