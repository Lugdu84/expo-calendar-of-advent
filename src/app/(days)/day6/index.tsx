import { View, Button, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import MarkdownDisplay from '@/components/markdown/MarkdownDisplay';

const description = `
# Day 6 : Tinder Swipe
List of features :
- Swipe
- Animation for swipe
`;

export default function DayTwoScreen() {
	return (
		<View style={styles.page}>
			<Stack.Screen options={{ title: 'Day 6 : Tinder Swipe' }} />
			<MarkdownDisplay>{description}</MarkdownDisplay>
			<View style={styles.buttonsContainer}>
				<Link
					href={'/day6/tinder'}
					asChild>
					<Button title="Go to the Tinder" />
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
