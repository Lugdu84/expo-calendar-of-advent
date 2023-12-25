import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { Stack } from 'expo-router';
import apartments from '@assets/data/appartments.json';
import CustomMarker from '@/components/Map/CustomMarker';
import ApartmentListItem from '@/components/Map/ApartmentListItem';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useMemo, useState } from 'react';

export default function AirBnbScreen() {
	const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(
		null
	);
	const [mapRegion, setMapRegion] = useState({
		latitude: 49.89,
		longitude: 4.9,
		latitudeDelta: 1,
		longitudeDelta: 0.5,
	});
	const snapPoints = useMemo(() => [75, '50%', '99%'], []);

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: 'Map' }} />
			<MapView
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				region={mapRegion}>
				{apartments.map((apartment) => (
					<CustomMarker
						key={apartment.id}
						apartment={apartment}
						onPress={() => setSelectedApartment(apartment)}
						isSelected={selectedApartment?.id === apartment.id}
					/>
				))}
			</MapView>
			{selectedApartment && (
				<ApartmentListItem
					apartment={selectedApartment}
					containerStyle={{
						position: 'absolute',
						width: '90%',
						bottom: +snapPoints[0] + 5,
						alignSelf: 'center',
					}}
				/>
			)}

			<BottomSheet
				// ref={bottomSheetRef}
				index={0}
				snapPoints={snapPoints}
				// onChange={(index) => console.log('change', index)}
				// onAnimate={(from, to) => console.log('animate', from, to)}
			>
				<View style={{ flex: 1 }}>
					<Text style={styles.listTitle}>Over {apartments.length} places</Text>
					<BottomSheetFlatList
						data={apartments}
						contentContainerStyle={{
							gap: 20,
							paddingHorizontal: 5,
						}}
						renderItem={({ item }) => <ApartmentListItem apartment={item} />}
						keyExtractor={(item) => item.id}
					/>
				</View>
			</BottomSheet>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative',
	},
	map: {
		width: '100%',
		height: '100%',
	},
	selectedApartmentCard: {
		position: 'absolute',
		width: '90%',
		bottom: 70,
		alignSelf: 'center',
	},
	listTitle: {
		textAlign: 'center',
		fontSize: 16,
		fontFamily: 'InterSemiBold',
		marginVertical: 5,
		marginBottom: 30,
	},
});
