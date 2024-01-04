import { View, Button, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import MarkdownDisplay from '@/components/markdown/MarkdownDisplay';

const description = `
# Day 10 : Biometrics
List of features :
- use FaceID
- use TouchID
`;

export default function DayTwoScreen() {
	return (
		<View style={styles.page}>
			<Stack.Screen options={{ title: 'Day 10 : Biometrics' }} />
			<MarkdownDisplay>{description}</MarkdownDisplay>
			<View style={styles.buttonsContainer}>
				<Link
					href={'/day10/protected/'}
					asChild>
					<Button title="Go to the Protected Page" />
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
