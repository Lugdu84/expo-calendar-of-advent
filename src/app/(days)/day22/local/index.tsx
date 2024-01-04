import {
	View,
	StyleSheet,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	Button,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Stack } from 'expo-router';

import TaskListItem from '@/components/day22/TaskListItem';
import { useTasksStore } from '@/stores/TaskStore';
import { database } from '@/database/watermelon';
import Task from '@/model/Task';
import FooterList from '@/components/day22/FooterList';
import TaskList from '@/components/day22/TaskList';

export default function LocalFirstScreen() {
	const inputRef = useRef<TextInput>(null);
	// const tasks = useTasksStore((state) => state.tasks);
	const [tasks, setTasks] = useState<Task[]>([]);
	const filteredChecked = useTasksStore((state) => state.filteredChecked);
	const updateFilterChecked = useTasksStore(
		(state) => state.updateFilterChecked
	);
	const filteredTasks = useTasksStore((state) => state.filteredTasks());
	// const addTask = useTasksStore((state) => state.addTask);
	const updateSearch = useTasksStore((state) => state.updateSearch);

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
			<TaskList />
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		backgroundColor: 'white',
	},
	taskTitle: {
		fontFamily: 'Inter',
		fontSize: 16,
	},
});
