import { Redirect } from 'expo-router';
import { View, Text, StyleSheet, Alert, Pressable } from 'react-native';
import Purchases, { PurchasesPackage } from 'react-native-purchases';

type PackageProps = {
	offering: PurchasesPackage;
};

export default function Package({ offering }: PackageProps) {
	const handlePurchase = async () => {
		try {
			const { customerInfo, productIdentifier } =
				await Purchases.purchasePackage(offering);
			if (typeof customerInfo.entitlements.active['Prenium'] !== 'undefined') {
				Alert.alert('Success', 'You are now a Prenium user');
				Redirect({ href: '/day21/pro' });
			}
		} catch (e: any) {
			if (!e.userCancelled) {
				Alert.alert('Error', e.message);
			}
		}
	};
	return (
		<Pressable
			style={styles.package}
			onPress={handlePurchase}>
			<Text style={styles.packageDuration}>
				{' '}
				{offering.product.description}
			</Text>
			<Text style={styles.packagePrice}>{offering.product.priceString}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
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
