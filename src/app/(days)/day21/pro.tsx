import { Redirect } from 'expo-router';
import { View, Text } from 'react-native';
import Purchases from 'react-native-purchases';

export default function ProScreen() {
	const isSubscribed = false;

	if (!isSubscribed) {
		return <Redirect href="/day21/paywall" />;
	}
	return (
		<View>
			<Text>ProScreen</Text>
		</View>
	);
}
