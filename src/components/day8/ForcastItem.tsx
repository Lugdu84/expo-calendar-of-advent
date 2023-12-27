import dayjs from 'dayjs';
import { View, Text, StyleSheet } from 'react-native';
import FR_fr from 'dayjs/locale/fr';
import { getTemp } from '@/lib/utils';
import { BlurView } from 'expo-blur';

type ForcastItemProps = {
	forecast: WeatherForecast;
};

export default function ForcastItem({
	forecast: { dt, main },
}: ForcastItemProps) {
	return (
		<BlurView
			intensity={50}
			style={styles.container}>
			<Text style={styles.temp}>{getTemp(main.temp)}°</Text>
			<Text style={styles.date}>
				{dayjs(dt * 1000)
					.locale(FR_fr)
					.format('dddd HH')}
				H
			</Text>
		</BlurView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
		borderColor: 'white',
		borderWidth: StyleSheet.hairlineWidth,
	},
	temp: {
		fontFamily: 'InterSemiBold',
		fontSize: 20,
		letterSpacing: 2,
		color: 'white',
	},
	date: {
		fontFamily: 'Inter',
		fontSize: 12,
		color: 'white',
	},
});
