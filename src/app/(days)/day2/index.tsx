import { View, Text, Button } from 'react-native';
import { Link, Stack } from 'expo-router';

export default function DayTwoScreen() {
	return (
		<View>
			<Stack.Screen options={{ title: 'Day 2 : Onboarding' }} />
			<Text>DayTwo</Text>
			<Link
				href={'/day2/onboarding'}
				asChild>
				<Button title="Go to onboarding" />
			</Link>
		</View>
	);
}
