import {
	View,
	StyleSheet,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	Button,
} from 'react-native';
import { useRef, useState } from 'react';
import { Stack } from 'expo-router';
import { FlatList } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';
import TaskListItem from '@/components/day15/TaskListItem';
import { useTasks } from '@/hooks/useTasks';

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
	const inputRef = useRef<TextInput>(null);
	const {
		filteredTasks,
		addTask,
		checkTask,
		deleteTask,
		updateSearch,
		updateFilterChecked,
		filteredChecked,
	} = useTasks(dummyTasks);

	const handleAddTask = (text: string) => {
		if (!text) return;
		if (!inputRef.current) return;
		addTask(text);
	};

	return (
		<KeyboardAvoidingView
			style={styles.page}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 140}>
			<Stack.Screen
				options={{
					title: 'TODO',
					headerSearchBarOptions: {
						hideWhenScrolling: false,
						onChangeText(e) {
							updateSearch(e.nativeEvent.text);
						},
					},
				}}
			/>

			<FlatList
				ListHeaderComponent={() => (
					<View style={{ flexDirection: 'row' }}>
						<Button
							color={filteredChecked === undefined ? 'green' : 'blue'}
							title="All"
							onPress={() => updateFilterChecked()}
						/>
						<Button
							color={filteredChecked === false ? 'green' : 'blue'}
							title="Active"
							onPress={() => updateFilterChecked(false)}
						/>
						<Button
							color={filteredChecked ? 'green' : 'blue'}
							title="Completed"
							onPress={() => updateFilterChecked(true)}
						/>
					</View>
				)}
				// Pour être en dessous de la searchBar
				contentInsetAdjustmentBehavior="automatic"
				data={filteredTasks}
				contentContainerStyle={{ gap: 10, padding: 10 }}
				renderItem={({ item, index }) => (
					<TaskListItem
						task={item}
						onChangeCheck={() => checkTask(index)}
						onDelete={() => deleteTask(index)}
					/>
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
