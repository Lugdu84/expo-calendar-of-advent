import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const days = [...Array(24)].map((_, i) => i + 1);

export default function App() {
	return (
		<View style={styles.container}>
			<FlatList
				data={days}
				contentContainerStyle={styles.content}
				columnWrapperStyle={styles.column}
				numColumns={2}
				renderItem={({ item }) => (
					<View style={styles.box}>
						<Text style={styles.text}>{item}</Text>
					</View>
				)}
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
	box: {
		backgroundColor: '#f9ede3',
		flex: 1,
		aspectRatio: 1,

		borderWidth: StyleSheet.hairlineWidth,
		borderColor: '#9b4521',
		borderRadius: 10,

		alignItems: 'center',
		justifyContent: 'center',
	},
	column: {
		gap: 10,
	},
	text: {
		color: '#9b4521',
		fontSize: 70,
	},
	content: {
		gap: 10,
		padding: 10,
	},
});
