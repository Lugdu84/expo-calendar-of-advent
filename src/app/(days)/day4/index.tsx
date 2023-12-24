import { View, Button, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import MarkdownDisplay from '@/components/markdown/MarkdownDisplay';

const description = `
# Day 4 : Animation Splash Screen with Lottie
List of features :
- Markdown display
- Markdown editor
`;

export default function DayTwoScreen() {
	return (
		<View style={styles.page}>
			<Stack.Screen
				options={{ title: 'Day 4 : Animation Splash Screen with Lottie' }}
			/>
			<MarkdownDisplay>{description}</MarkdownDisplay>
			<View style={styles.buttonsContainer}>
				<Link
					href={'/day4/animation'}
					asChild>
					<Button title="Go to the animation" />
				</Link>
				<Link
					href={'/day4/splash'}
					asChild>
					<Button title="Go to Splash Screen" />
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
