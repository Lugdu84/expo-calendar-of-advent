import { Stack } from 'expo-router';
import { View, StyleSheet, FlatList, ViewToken } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import VideoPost from '@/components/day12/VideoPost';
import { useCallback, useEffect, useRef, useState } from 'react';

const dummyPosts = [
	{
		id: '1',
		uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/1.mp4',
		caption: "I'm on a boat",
	},
	{
		id: '2',
		uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4',
		caption: 'React Native!.',
	},
	{
		id: '3',
		uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/3.mp4',
		caption: 'This is amazing',
	},
	{
		id: '4',
		uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/4.mp4',
		caption: 'Beautiful',
	},
	{
		id: '5',
		uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/5.mp4',
		caption: 'Nature is amazing',
	},
];

type OnViewableItemsChanged = {
	changed: ViewToken[];
	viewableItems: ViewToken[];
};

export default function FeedScreen() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [activePostId, setActivePostId] = useState(posts[0]?.id);

	useEffect(() => {
		const fetchPosts = async () => {
			// fetch posts from API
			setPosts(dummyPosts);
		};
		fetchPosts();
	}, []);

	const onEndReached = useCallback(() => {
		const newPosts = dummyPosts.map((post) => {
			return { ...post, id: (Math.random() * 1_000_000_000).toString() };
		});
		setPosts((prevPosts) => [...prevPosts, ...newPosts]);
	}, []);

	const viewabilityConfigCallbackPairs = useRef([
		{
			viewabilityConfig: {
				itemVisiblePercentThreshold: 50,
			},
			onViewableItemsChanged: ({
				changed,
				viewableItems,
			}: OnViewableItemsChanged) => {
				if (viewableItems.length > 0 && viewableItems[0].isViewable) {
					setActivePostId(viewableItems[0].item.id);
				}
			},
		},
	]);
	return (
		<View style={styles.container}>
			<Stack.Screen options={{ headerShown: false }} />
			<StatusBar style="light" />
			<FlatList
				data={posts}
				renderItem={({ item }) => (
					<VideoPost
						post={item}
						activePostId={activePostId}
					/>
				)}
				showsVerticalScrollIndicator={false}
				pagingEnabled
				viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
				onEndReached={onEndReached}
				onEndReachedThreshold={1}
				keyExtractor={(item, index) => `${item.id}-${index}`}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: 'black' },
});
