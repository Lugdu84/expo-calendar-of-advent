import { View, Button, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import MarkdownDisplay from '@/components/markdown/MarkdownDisplay';

const description = `
# Day 17 : Todo App with Zustand
List of features :
- Create a todo
- Delete a todo
- Update a todo
- Filter todos
`;

export default function DayTwoScreen() {
	return (
		<View style={styles.page}>
			<Stack.Screen
				options={{ title: 'Day 17 : Refactor ToDo App with zustand' }}
			/>
			<MarkdownDisplay>{description}</MarkdownDisplay>
			<View style={styles.buttonsContainer}>
				<Link
					href={'/day17/todos'}
					asChild>
					<Button title="Go to the ToDo App" />
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
