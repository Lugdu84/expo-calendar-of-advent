import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { Stack } from 'expo-router';
import apartments from '@assets/data/appartments.json';
import CustomMarker from '@/components/Map/CustomMarker';
import ApartmentListItem from '@/components/Map/ApartmentListItem';
import BottomSheet from '@gorhom/bottom-sheet';
import { useMemo, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

export default function AirBnbScreen() {
	const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(
		null
	);
	const snapPoints = useMemo(() => ['25%', '50%'], []);

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: 'Map' }} />
			<MapView
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				initialRegion={{
					latitude: 49.89,
					longitude: 4.9,
					latitudeDelta: 1,
					longitudeDelta: 0.5,
				}}>
				{apartments.map((apartment) => (
					<CustomMarker
						key={apartment.id}
						apartment={apartment}
						onPress={() => setSelectedApartment(apartment)}
					/>
				))}
			</MapView>
			{selectedApartment && (
				<View style={styles.selectedApartmentCard}>
					<ApartmentListItem apartment={selectedApartment} />
				</View>
			)}

			<BottomSheet
				// ref={bottomSheetRef}
				index={1}
				snapPoints={snapPoints}
				enablePanDownToClose
				// onChange={handleSheetChanges}
			>
				<View>
					<Text>Awesome 🎉</Text>
					<FlatList
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
});
