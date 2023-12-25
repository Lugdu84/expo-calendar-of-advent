import { View, Button, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import MarkdownDisplay from '@/components/markdown/MarkdownDisplay';

const description = `
# Day 5 : AirBNB Map
List of features :
- Map
`;

export default function DayTwoScreen() {
	return (
		<View style={styles.page}>
			<Stack.Screen options={{ title: 'Day 5 : AirBnB' }} />
			<MarkdownDisplay>{description}</MarkdownDisplay>
			<View style={styles.buttonsContainer}>
				<Link
					href={'/day5/airbnb'}
					asChild>
					<Button title="Go to the AirBNB Map" />
				</Link>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		padding: 10,
	},
	buttonsContainer: {
		gap: 5,
	},
});
