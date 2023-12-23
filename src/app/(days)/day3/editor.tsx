import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Markdown from 'react-native-markdown-display';

export default function EditorScreen() {
	const copy = `# h1 Heading 8-)

## h2 Heading

### h3 Heading avec un long titre qui est même plus long que le titre précédent

This is normal text lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem,
quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.

List :
- item 1
- item 2
- item 3

> Blockquote

List orderer :
1. item 1
2. item 2
3. item 3

- To add an image: ![alt text](https://www.radiofrance.fr/s3/cruiser-production/2021/11/583b3917-c531-4786-8170-9ce8b1d1a81a/870x489_gettyimages-1265067608.jpg)
- To add a link: [Devaidaya](https://devaidaya.fr)

### h3 Heading avec un long titre qui est même plus long que le titre précédent

This is normal text lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem,
quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.

List :
- item 1
- item 2
- item 3

> Blockquote

List orderer :
1. item 1
2. item 2
3. item 3
`;
	return (
		<ScrollView
			style={styles.page}
			contentInsetAdjustmentBehavior="automatic">
			<Text>EditorScreen</Text>
			<Markdown style={markdownStyles}>{copy}</Markdown>
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
