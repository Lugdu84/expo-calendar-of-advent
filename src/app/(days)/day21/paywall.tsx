import Package from '@/components/day21/Package';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Purchases, { PurchasesPackage } from 'react-native-purchases';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PaywallScreen() {
	const [offerings, setOfferings] = useState<PurchasesPackage[]>([]);
	useEffect(() => {
		const fetchOfferings = async () => {
			try {
				const offerings = await Purchases.getOfferings();

				if (
					offerings.current !== null &&
					offerings.current.availablePackages.length !== 0
				) {
					setOfferings(offerings.current.availablePackages);
				}
			} catch (e) {}
		};
		fetchOfferings();
	}, []);

	if (!offerings) {
		return (
			<View>
				<Text>Fail to fetch purchases...</Text>
			</View>
		);
	}

	return (
		<View style={styles.page}>
			<Stack.Screen options={{ headerShown: false }} />
			<SafeAreaView style={styles.container}>
				<Text style={styles.title}>Unlock Pro Access</Text>
				<Text style={styles.subtitle}>All prenium features</Text>
				<View style={styles.packages}>
					{offerings.map((offer) => (
						<Package
							key={offer.identifier}
							offering={offer}
						/>
					))}
				</View>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	page: { backgroundColor: '#ef4951', flex: 1 },
	container: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
	},
	title: {
		fontSize: 24,
		marginVertical: 20,
		color: 'white',
		fontFamily: 'InterBold',
	},
	subtitle: {
		fontSize: 16,
		color: 'gainsboro',
	},
	packages: {
		flexDirection: 'row',
		gap: 10,
		marginTop: 40,
	},
});
