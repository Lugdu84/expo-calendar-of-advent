import { View, StyleSheet } from 'react-native';
import TinderCard from './TinderCard';
import { Stack } from 'expo-router';
import {
	runOnJS,
	useAnimatedReaction,
	useSharedValue,
} from 'react-native-reanimated';
import { useEffect, useState } from 'react';

const usersData = [
	{
		id: '1',
		name: 'David',
		image:
			'https://images.unsplash.com/photo-1703401895670-544fb2fd735d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8',
	},
	{
		id: '2',
		name: 'Aïcha',
		image:
			'https://images.unsplash.com/photo-1703401895670-544fb2fd735d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8',
	},
	{
		id: '3',
		name: 'Lucie',
		image:
			'https://images.unsplash.com/photo-1703401895670-544fb2fd735d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8',
	},
	{
		id: '4',
		name: 'Chris',
		image:
			'https://images.unsplash.com/photo-1703401895670-544fb2fd735d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8',
	},
];

export default function TinderScreen() {
	const [users, setUsers] = useState(usersData);
	const [index, setIndex] = useState(0);
	const activeIndex = useSharedValue(0);

	useAnimatedReaction(
		() => activeIndex.value,
		(value) => {
			if (Math.floor(value) !== index) {
				runOnJS(setIndex)(Math.floor(value));
			}
		}
	);

	useEffect(() => {
		if (index > users.length - 3) {
			console.log('Last 2 cards remining. Fetch more!');
			setUsers((usrs) => [...usrs, ...usersData.reverse()]);
		}
	}, [index]);

	const onResponse = (response: boolean) => {
		console.log('response', response);
	};

	return (
		<View style={styles.page}>
			<Stack.Screen options={{ headerShown: false }} />
			{users.map((user, index) => (
				<TinderCard
					key={`${user.id}-${index}`}
					user={user}
					numberOfCards={users.length}
					index={index}
					activeIndex={activeIndex}
					onResponse={onResponse}
				/>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
