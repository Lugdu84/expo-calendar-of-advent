import { Text, Pressable, StyleSheet, Animated } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import ReAnimated, { FadeInRight } from 'react-native-reanimated';
import Task from '@/model/Task';
import { database } from '@/database/watermelon';
import { checkTask, deleteTask } from '@/database/tasks';

type TaskListItemProps = {
	task: Task;
};

type RightActionsProps = {
	progress: Animated.AnimatedInterpolation<number>;
	dragX: Animated.AnimatedInterpolation<number>;
	id: string;
};

const AnimatedView = Animated.createAnimatedComponent(Pressable);

const RightActions = ({ progress, dragX, id }: RightActionsProps) => {
	const handleDelete = async () => {
		await deleteTask(id);
	};
	const trans = progress.interpolate({
		inputRange: [0, 1],
		outputRange: [400, 0],
	});
	return (
		<AnimatedView
			onPress={handleDelete}
			style={[
				styles.rightAction,
				{
					transform: [{ translateX: trans }],
				},
			]}>
			<Fontisto
				name="trash"
				size={22}
				color="white"
			/>
		</AnimatedView>
	);
};

export default function TaskListItem({
	task: { id, title, completed },
}: TaskListItemProps) {
	const color = completed ? 'green' : 'gray';

	console.log('TaskListItem', id, title, completed);

	const handleChangeCheck = async () => {
		await checkTask(id);
		// customEvent('task_checked', {
		// 	task_id: id,
		// 	task_title: title,
		// 	task_completed: completed,
		// });
	};
	return (
		<ReAnimated.View entering={FadeInRight}>
			<Swipeable
				renderRightActions={(progress, dragX) => (
					<RightActions
						progress={progress}
						dragX={dragX}
						id={id}
					/>
				)}>
				<Pressable
					style={styles.taskContainer}
					onPress={handleChangeCheck}>
					<Fontisto
						name={completed ? 'checkbox-active' : 'checkbox-passive'}
						size={22}
						color={color}
					/>
					<Text style={[styles.taskTitle, { color: color }]}>{title}</Text>
				</Pressable>
			</Swipeable>
		</ReAnimated.View>
	);
}

const styles = StyleSheet.create({
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
	rightAction: {
		backgroundColor: 'crimson',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
});
