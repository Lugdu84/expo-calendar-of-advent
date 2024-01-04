// hooks pour gérer les tasks

import { useState } from 'react';

export const useTasks = (initialTasks?: TypeTask[]) => {
	const [tasks, setTasks] = useState<TypeTask[]>(initialTasks || []);
	const [search, setSearch] = useState<string>('');
	const [filteredChecked, setFilteredChecked] = useState<boolean | undefined>(
		undefined
	);

	const addTask = (title: string) => {
		const task = {
			id: Math.random().toString(36),
			title,
			completed: false,
		};
		setTasks([...tasks, task]);
	};

	const checkTask = (index: number) => {
		const newTasks = [...tasks];
		newTasks[index].completed = !newTasks[index].completed;
		setTasks(newTasks);
	};

	const deleteTask = (index: number) => {
		const newTasks = [...tasks];
		newTasks.splice(index, 1);
		setTasks(newTasks);
	};

	const updateSearch = (search: string) => {
		setSearch(search.toLowerCase().trim());
	};

	const filteredTasks = tasks.filter((task) => {
		if (filteredChecked === undefined) {
			return task.title.toLowerCase().includes(search);
		}
		return (
			task.title.toLowerCase().includes(search) &&
			task.completed === filteredChecked
		);
	});

	const updateFilterChecked = (checked: boolean | undefined = undefined) => {
		setFilteredChecked(checked);
	};

	return {
		tasks,
		filteredTasks,
		addTask,
		checkTask,
		deleteTask,
		updateSearch,
		search,
		updateFilterChecked,
		filteredChecked,
	};
};
