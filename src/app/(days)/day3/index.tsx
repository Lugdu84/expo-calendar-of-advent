import { View, Button, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import MarkdownDisplay from '@/components/markdown/MarkdownDisplay';

const description = `
# Day 3 : Markdown
List of features :
- Markdown display
- Markdown editor
`;

export default function DayTwoScreen() {
	return (
		<View style={styles.page}>
			<Stack.Screen options={{ title: 'Day 3 : Markdown' }} />
			<MarkdownDisplay>{description}</MarkdownDisplay>
			<Link
				href={'/day3/editor'}
				asChild>
				<Button title="Go to editor" />
			</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		padding: 10,
	},
});
