import { View, Text, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';

type CustomMarkerProps = {
	apartment: Apartment;
	onPress: () => void;
	isSelected: boolean;
};

export default function CustomMarker({
	apartment: { latitude, longitude, price },
	onPress,
	isSelected,
}: CustomMarkerProps) {
	const backgroundColor = isSelected ? 'green' : 'white';
	return (
		<Marker
			onPress={onPress}
			coordinate={{
				latitude: latitude,
				longitude: longitude,
			}}>
			<View
				style={[styles.contentMarker, { backgroundColor: backgroundColor }]}>
				<Text style={styles.textContentMarker}>{price} €</Text>
			</View>
		</Marker>
	);
}

const styles = StyleSheet.create({
	contentMarker: {
		borderRadius: 20,
		backgroundColor: 'white',
		padding: 5,
		paddingHorizontal: 10,
		borderColor: 'gray',
		borderWidth: 1,
	},
	textContentMarker: {
		fontSize: 12,
		fontFamily: 'Inter',
	},
});
