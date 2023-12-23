import MarkdownDisplay from '@/components/markdown/MarkdownDisplay';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Pressable } from 'react-native';

const template = `# Mardown Editor
Hello **world**!
`;
export default function EditorScreen() {
	const [content, setContent] = useState(template);
	const [showPreview, setShowPreview] = useState(false);
	return (
		<View style={styles.page}>
			<Stack.Screen options={{ title: 'Day 3 : Markdown' }} />
			<View style={styles.tabsContainer}>
				<Pressable
					onPress={() => setShowPreview(!showPreview)}
					style={styles.tab}>
					<Text style={styles.tabText}>
						{showPreview ? 'Show preview' : 'Show editor'}
					</Text>
				</Pressable>
			</View>
			{showPreview && (
				<TextInput
					defaultValue={content}
					multiline
					style={styles.input}
					numberOfLines={20}
					onChangeText={setContent}
					textAlignVertical="top"
				/>
			)}
			<MarkdownDisplay>{content}</MarkdownDisplay>
		</View>
	);
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		padding: 10,
	},
	input: {
		flex: 1,
		backgroundColor: 'white',
		fontSize: 16,
		padding: 10,
		borderRadius: 10,
	},
	tabsContainer: {
		flexDirection: 'row',
		gap: 10,
	},
	tab: {
		flex: 1,
		alignItems: 'center',
		padding: 10,
		borderRadius: 10,
		backgroundColor: '#f0f0f0',
		borderWidth: 1,
		borderColor: '#e0e0e0',
		marginBottom: 10,
	},
	tabText: {
		fontFamily: 'InterBold',
	},
});
