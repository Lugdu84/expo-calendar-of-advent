import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Purchases from 'react-native-purchases';

export default function ProScreen() {
	const [isSubscribed, setIsSubscribed] = useState<boolean | undefined>(
		undefined
	);

	const checkSubscription = async () => {
		try {
			const customerInfo = await Purchases.getCustomerInfo();
			if (typeof customerInfo.entitlements.active['Prenium'] !== 'undefined') {
				setIsSubscribed(true);
			} else {
				setIsSubscribed(false);
			}
		} catch (e) {
			// Error fetching customer info
		}
	};

	useEffect(() => {
		checkSubscription();
	}, []);

	if (isSubscribed === undefined) {
		return <ActivityIndicator />;
	}

	if (!isSubscribed) {
		return <Redirect href="/day21/paywall" />;
	}
	return (
		<View>
			<Text>ProScreen</Text>
		</View>
	);
}
