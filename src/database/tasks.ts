import Task from '@/model/Task';
import { database } from './watermelon';

export const addTask = async (title: string) => {
	await database.write(async () => {
		await database.get<Task>('tasks').create((task) => {
			task.title = title;
			task.completed = false;
		});
	});
};

export const deleteTask = async (id: string) => {
	await database.write(async () => {
		const task = await database.get<Task>('tasks').find(id);
		await task.destroyPermanently();
	});
};

export const checkTask = async (id: string) => {
	await database.write(async () => {
		const task = await database.get<Task>('tasks').find(id);
		await task.update((t) => {
			t.completed = !t.completed;
		});
	});
};
