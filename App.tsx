import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import DayListItem from './src/components/core/DayListItem';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

const days = [...Array(24)].map((_, i) => i + 1);

export default function App() {
	const [fontLoaded, fontError] = useFonts({
		Inter: Inter_900Black,
	});

	if (!fontLoaded && !fontError) {
		return <ActivityIndicator />;
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
