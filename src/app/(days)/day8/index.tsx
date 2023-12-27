import { View, Button, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import MarkdownDisplay from '@/components/markdown/MarkdownDisplay';

const description = `
# Day 8 : Weather App with Call API
List of features :
- Work with call API
`;

export default function DayTwoScreen() {
	return (
		<View style={styles.page}>
			<Stack.Screen options={{ title: 'Day 8 : Weather App' }} />
			<MarkdownDisplay>{description}</MarkdownDisplay>
			<View style={styles.buttonsContainer}>
				<Link
					href={'/day8/weather'}
					asChild>
					<Button title="Go to the Weather App" />
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
