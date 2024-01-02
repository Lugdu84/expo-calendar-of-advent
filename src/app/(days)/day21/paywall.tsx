import { useEffect } from 'react';
import { View, Text } from 'react-native';
import Purchases from 'react-native-purchases';

export default function PaywallScreen() {
	useEffect(() => {
		const fetchOfferings = async () => {
			try {
				const offerings = await Purchases.getOfferings();

				if (
					offerings.current !== null &&
					offerings.current.availablePackages.length !== 0
				) {
					console.log(
						JSON.stringify(offerings.current.availablePackages, null, 2)
					);
					// Display packages for sale
				}
			} catch (e) {}
		};
		fetchOfferings();
	}, []);
	return (
		<View>
			<Text>PaywallScreen</Text>
		</View>
	);
}
