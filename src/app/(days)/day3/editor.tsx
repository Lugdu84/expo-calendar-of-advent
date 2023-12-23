import MarkdownDisplay from '@/components/markdown/MarkdownDisplay';

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

export default function EditorScreen() {
	return <MarkdownDisplay>{copy}</MarkdownDisplay>;
}
