import { View, Button, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import MarkdownDisplay from '@/components/markdown/MarkdownDisplay';

const description = `
# Day 22 : Offline Mode
List of features :
- WatermelonDB
`;

export default function DayTwoScreen() {
	return (
		<View style={styles.page}>
			<Stack.Screen options={{ title: 'Day 22 : Offline Mode' }} />
			<MarkdownDisplay>{description}</MarkdownDisplay>
			<View style={styles.buttonsContainer}>
				<Link
					href={'/day22/local/'}
					asChild>
					<Button title="Go to the Offline Mode" />
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
