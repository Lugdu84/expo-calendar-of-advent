import { View, Text, Button } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';

export default function DayTwoScreen() {
	return (
		<View>
			<Stack.Screen options={{ title: 'Day 3 : Markdown' }} />
			<Text>DayTwo</Text>
			<Link
				href={'/day3/editor'}
				asChild>
				<Button title="Go to editor" />
			</Link>
		</View>
	);
}
