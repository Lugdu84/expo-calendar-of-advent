import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Purchases from 'react-native-purchases';
import { SafeAreaView } from 'react-native-safe-area-context';

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
		<View style={styles.page}>
			<Stack.Screen options={{ headerShown: false }} />
			<SafeAreaView style={styles.container}>
				<Text style={styles.title}>Unlock Pro Access</Text>
				<Text style={styles.subtitle}>All prenium features</Text>
				<View style={styles.packages}>
					<View style={styles.package}>
						<Text style={styles.packageDuration}>1 month</Text>
						<Text style={styles.packagePrice}>9.99 €</Text>
					</View>
					<View style={styles.package}>
						<Text style={styles.packageDuration}>1 month</Text>
						<Text style={styles.packagePrice}>9.99 €</Text>
					</View>
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
	package: {
		backgroundColor: 'white',
		alignItems: 'center',
		padding: 10,
		borderRadius: 10,
	},
	packageDuration: {
		fontFamily: 'Inter',
	},
	packagePrice: {
		fontSize: 24,
		fontFamily: 'InterBold',
	},
});
