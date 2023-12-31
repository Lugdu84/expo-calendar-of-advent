import { Text, Pressable, StyleSheet, Animated } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import ReAnimated, { FadeInRight } from 'react-native-reanimated';

type TaskListItemProps = {
	task: Task;
	onChangeCheck: () => void;
	onDelete: () => void;
};

type RightActionsProps = {
	progress: Animated.AnimatedInterpolation<number>;
	dragX: Animated.AnimatedInterpolation<number>;
	onDelete: () => void;
};

const AnimatedView = Animated.createAnimatedComponent(Pressable);

const RightActions = ({ progress, dragX, onDelete }: RightActionsProps) => {
	const trans = progress.interpolate({
		inputRange: [0, 1],
		outputRange: [400, 0],
		// extrapolate: 'clamp',
	});
	return (
		<AnimatedView
			onPress={onDelete}
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
	onChangeCheck,
	onDelete,
	task: { id, title, completed },
}: TaskListItemProps) {
	const color = completed ? 'green' : 'gray';
	return (
		<ReAnimated.View entering={FadeInRight}>
			<Swipeable
				renderRightActions={(progress, dragX) => (
					<RightActions
						progress={progress}
						dragX={dragX}
						onDelete={onDelete}
					/>
				)}>
				<Pressable
					style={styles.taskContainer}
					onPress={onChangeCheck}>
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
