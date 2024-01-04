import { View, StyleSheet, TextInput } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { useRef } from 'react';
import { addTask } from '@/database/tasks';

export default function FooterList() {
	const inputRef = useRef<TextInput>(null);

	const handleAddTask = async (text: string) => {
		if (!text) return;
		if (!inputRef.current) return;
		await addTask(text);
	};
	return (
		<View style={styles.taskContainer}>
			<Fontisto
				name={'checkbox-passive'}
				size={22}
				color="gray"
			/>
			<TextInput
				ref={inputRef}
				onSubmitEditing={(event) => handleAddTask(event.nativeEvent.text)}
				style={styles.input}
				placeholder="Add a task"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	taskContainer: {
		padding: 5,
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
	},
	input: {
		flex: 1,
		fontFamily: 'Inter',
		fontSize: 16,
	},
});
