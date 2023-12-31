import {
	View,
	Text,
	StyleSheet,
	Pressable,
	TextInput,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import { useRef, useState } from 'react';
import { Stack } from 'expo-router';
import { FlatList } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';

const dummyTasks: Task[] = [
	{
		id: '1',
		title: 'Render a list of tasks',
		completed: true,
	},
	{
		id: '2',
		title: 'Add a task',
		completed: false,
	},
	{
		id: '3',
		title: 'Complete a task',
		completed: false,
	},
	{
		id: '4',
		title: 'Delete a task',
		completed: false,
	},
	{
		id: '5',
		title: 'Update a task',
		completed: false,
	},
];

export default function TodosScreen() {
	const [tasks, setTasks] = useState(dummyTasks);
	const inputRef = useRef<TextInput>(null);

	const handleCheckTask = (index: number) => {
		const newTasks = [...tasks];
		newTasks[index].completed = !newTasks[index].completed;
		setTasks(newTasks);
	};

	const getColorForTask = (task: Task) => {
		return task.completed ? 'green' : 'gray';
	};

	const handleAddTask = (text: string) => {
		if (!text) return;
		if (!inputRef.current) return;
		const newTasks = [...tasks];
		newTasks.push({
			id: `${tasks.length + 1}`,
			title: text,
			completed: false,
		});
		inputRef.current.clear();
		setTasks(newTasks);
	};

	return (
		<KeyboardAvoidingView
			style={styles.page}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 140}>
			<Stack.Screen options={{ title: 'TODO' }} />
			<FlatList
				data={tasks}
				contentContainerStyle={{ gap: 10, padding: 10 }}
				renderItem={({ item, index }) => (
					<Pressable
						style={styles.taskContainer}
						onPress={() => handleCheckTask(index)}>
						<Fontisto
							name={item.completed ? 'checkbox-active' : 'checkbox-passive'}
							size={22}
							color={getColorForTask(item)}
						/>
						<Text style={[styles.taskTitle, { color: getColorForTask(item) }]}>
							{item.title}
						</Text>
					</Pressable>
				)}
				ListFooterComponent={() => (
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
				)}
			/>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		backgroundColor: 'white',
	},
	taskContainer: {
		padding: 5,
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
	},
	taskTitle: {
		fontFamily: 'Inter',
		fontSize: 16,
	},
	input: {
		flex: 1,
		fontFamily: 'Inter',
		fontSize: 16,
	},
});
