import { Pressable, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';

type DayListItemProps = {
	day: number;
};
export default function DayListItem({ day }: DayListItemProps) {
	return (
		<Link
			href={`/day${day}`}
			asChild>
			<Pressable style={styles.box}>
				<Text style={styles.text}>{day}</Text>
			</Pressable>
		</Link>
	);
}

const styles = StyleSheet.create({
	box: {
		backgroundColor: '#f9ede3',
		flex: 1,
		aspectRatio: 1,

		borderWidth: StyleSheet.hairlineWidth,
		borderColor: '#9b4521',
		borderRadius: 10,

		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		color: '#9b4521',
		fontSize: 70,
		fontFamily: 'AmaticBold',
	},
});
