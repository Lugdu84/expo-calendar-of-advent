import { View, Text, Button } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function NotificationsScreen() {
	async function schedulePushNotification() {
		//TODO: Why no title and body in notification alert
		await Notifications.scheduleNotificationAsync({
			content: {
				title: 'dev title 📬',
				body: 'Here is body',
				data: { data: 'goes here' },
			},
			trigger: { seconds: 5 },
		});
	}
	console.warn('Setting up notifications');
	return (
		<View>
			<Text>Notifications Screen</Text>
			<Button
				title="Schedule send notifications"
				onPress={schedulePushNotification}
			/>
		</View>
	);
}
