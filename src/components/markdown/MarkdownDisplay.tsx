import { Text, StyleSheet, ScrollView } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { PropsWithChildren } from 'react';

export default function MarkdownDisplay({ children }: PropsWithChildren) {
	return (
		<ScrollView
			style={styles.page}
			contentInsetAdjustmentBehavior="automatic">
			<Markdown style={markdownStyles}>{children}</Markdown>
		</ScrollView>
	);
}

const markdownStyles = StyleSheet.create({
	heading1: {
		fontSize: 40,
		fontFamily: 'InterBlack',
		marginBottom: 5,
		marginTop: 10,
	},
	heading2: {
		fontSize: 30,
		fontFamily: 'InterBold',
		marginBottom: 5,
		marginTop: 10,
	},
	heading3: {
		fontSize: 22,
		fontFamily: 'InterSemiBold',
	},
	body: {
		fontSize: 16,
	},
});

const styles = StyleSheet.create({
	page: {
		flex: 1,
		padding: 10,
	},
});
