import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';

type DayListItemProps = {
	day: number;
};
export default function DayListItem({ day }: DayListItemProps) {
	return (
		<View style={styles.box}>
			<Text style={styles.text}>{day}</Text>
		</View>
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
		fontFamily: 'Inter',
	},
});
