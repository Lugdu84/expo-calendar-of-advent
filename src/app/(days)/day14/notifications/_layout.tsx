import { Slot, router } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import * as Device from 'expo-device';
import { Subscription, Notification } from 'expo-notifications';
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: true,
	}),
});

async function registerForPushNotificationsAsync() {
	let token;

	if (Platform.OS === 'android') {
		await Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		});
	}

	if (Device.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
		}
		// Learn more about projectId:
		// https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
		if (!Constants.expoConfig?.extra?.eas.projectId) {
			alert('Must set your projectId in app.json');
			return;
		}
		token = (
			await Notifications.getExpoPushTokenAsync({
				projectId: Constants.expoConfig.extra.eas.projectId,
			})
		).data;
		console.log('token', token);
	} else {
		alert('Must use physical device for Push Notifications');
	}

	return token;
}

export default function AppWithNotificationsLayout() {
	const [expoPushToken, setExpoPushToken] = useState<string>();
	const [notification, setNotification] = useState<Notification>();
	const notificationListener = useRef<Subscription>();
	const responseListener = useRef<Subscription>();

	useEffect(() => {
		let isMounted = true;
		// fetch Expo Push Token
		registerForPushNotificationsAsync().then((token) =>
			setExpoPushToken(token)
		);
		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) => {
				setNotification(notification);
			});
		responseListener.current =
			Notifications.addNotificationResponseReceivedListener((response) => {
				console.log('response', response);
				redirect(response.notification);
			});
		Notifications.getLastNotificationResponseAsync().then((response) => {
			// make it at the root layout for all application
			if (!isMounted || !response?.notification) {
				return;
			}
			redirect(response.notification);
			// for always opening app ... this is not cool !
		});

		return () => {
			isMounted = false;
			if (notificationListener.current)
				Notifications.removeNotificationSubscription(
					notificationListener.current
				);
			if (responseListener.current)
				Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);
	console.log('expoPushToken', expoPushToken);
	console.log('notification', notification);

	const redirect = (notification: Notifications.Notification) => {
		const url = notification.request.content.data?.url;
		if (url) {
			router.push(url);
		}
	};

	return (
		<>
			<Slot />
			{notification && (
				<View style={styles.notification}>
					<Text style={styles.notificationTitle}>
						Title: {notification.request.content.title}{' '}
					</Text>
					<Text>Body: {notification.request.content.body}</Text>
					<Text>Data: {JSON.stringify(notification.request.content.data)}</Text>
					<AntDesign
						name="close"
						size={24}
						color="black"
						onPress={() => setNotification(undefined)}
						style={styles.buttonClose}
					/>
				</View>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	notification: {
		position: 'absolute',
		bottom: 50,
		left: 10,
		right: 10,
		justifyContent: 'center',
		backgroundColor: 'gainsboro',
		padding: 10,
		borderRadius: 10,
	},
	notificationTitle: {
		fontSize: 20,
		fontFamily: 'InterBold',
	},
	buttonClose: {
		position: 'absolute',
		top: 5,
		right: 5,
	},
});
