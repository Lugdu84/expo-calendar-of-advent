import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList } from 'react-native';
import DayListItem from '../components/core/DayListItem';
import {
	useFonts,
	AmaticSC_400Regular,
	AmaticSC_700Bold,
} from '@expo-google-fonts/amatic-sc';
import { Inter_900Black } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

const days = [...Array(24)].map((_, i) => i + 1);

export default function HomeScreen() {
	const [fontLoaded, fontError] = useFonts({
		AmaticBold: AmaticSC_700Bold,
		Amatic: AmaticSC_400Regular,
		Inter: Inter_900Black,
	});

	useEffect(() => {
		if (fontLoaded || fontError) {
			SplashScreen.hideAsync();
		}
	}, [fontLoaded, fontError]);

	if (!fontLoaded && !fontError) {
		return null;
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={days}
				contentContainerStyle={styles.content}
				columnWrapperStyle={styles.column}
				numColumns={2}
				renderItem={({ item }) => <DayListItem day={item} />}
			/>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	column: {
		gap: 10,
	},
	content: {
		gap: 10,
		padding: 10,
	},
});
