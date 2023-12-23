import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

export default function DayOneScreen() {
	return (
		<View>
			<Stack.Screen options={{ title: 'Day 1' }} />
			<Text style={{ fontFamily: 'AmaticBold', fontSize: 100 }}>
				DayOneScreen
			</Text>
		</View>
	);
}
