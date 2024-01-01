import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TaskStore = {
	tasks: Task[];
	filteredChecked: boolean | undefined;
	updateFilterChecked: (checked?: boolean | undefined) => void;
	updateSearch: (search: string) => void;
	search: string;
	filteredTasks: () => Task[];
	addTask: (title: string) => void;
	checkTask: (id: string) => void;
	deleteTask: (id: string) => void;
};

export const useTasksStore = create<TaskStore>()(
	devtools(
		persist(
			(set, get) => ({
				tasks: [],
				filteredChecked: undefined,
				search: '',
				updateFilterChecked: (checked: boolean | undefined = undefined) =>
					set(() => ({
						filteredChecked: checked,
					})),
				updateSearch: (search: string) =>
					set(() => ({ search: search.toLowerCase().trim() })),
				filteredTasks: () => {
					const { tasks, filteredChecked, search } = get();
					const newTasks = tasks.filter((task) => {
						if (filteredChecked === undefined) {
							return task.title.toLowerCase().includes(search);
						}
						return (
							task.title.toLowerCase().includes(search) &&
							task.completed === filteredChecked
						);
					});
					return newTasks;
				},
				addTask: (title: string) => {
					const task = {
						id: Math.random().toString(36),
						title,
						completed: false,
					};
					set((state) => ({ tasks: [...state.tasks, task] }));
				},
				checkTask: (id: string) => {
					const { tasks } = get();
					const taskIndex = tasks.findIndex((task) => task.id === id);
					if (taskIndex === -1) return;
					tasks[taskIndex].completed = !tasks[taskIndex].completed;
					set(() => ({
						tasks: [...tasks],
					}));
				},
				deleteTask: (id: string) => {
					const { tasks } = get();
					const newTasks = tasks.filter((task) => task.id !== id);
					set(() => ({ tasks: newTasks }));
				},
			}),
			{
				name: 'awesome-todo-lit',
				storage: createJSONStorage(() => AsyncStorage),
			}
		)
	)
);
