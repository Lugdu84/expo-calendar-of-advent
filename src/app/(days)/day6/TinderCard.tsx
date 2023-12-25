import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

import Animated, {
	SharedValue,
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import { PanGesture } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('screen').width;
const tinderCardWidth = screenWidth * 0.8;

type TinderCardProps = {
	user: User;
	numberOfCards: number;
	index: number;
	activeIndex: SharedValue<number>;
	onResponse: (a: boolean) => void;
};

export default function TinderCard({
	user: { name, image },
	numberOfCards,
	index,
	activeIndex,
	onResponse,
}: TinderCardProps) {
	const translationX = useSharedValue(0);
	const animatedCard = useAnimatedStyle(() => ({
		opacity: interpolate(
			activeIndex.value,
			[index - 1, index, index + 1],
			[1 - 1 / 5, 1, 1]
		),
		transform: [
			{
				scale: interpolate(
					activeIndex.value,
					[index - 1, index, index + 1],
					[0.95, 1, 1]
				),
			},
			{
				translateY: interpolate(
					activeIndex.value,
					[index - 1, index, index + 1],
					[-30, 0, 0]
				),
			},
			{
				translateX: translationX.value,
			},
			{
				rotateZ: `${interpolate(
					translationX.value,
					[-screenWidth / 2, 0, screenWidth / 2],
					[-15, 0, 15]
				)}deg`,
			},
		],
	}));

	const gesture = Gesture.Pan()
		.onChange((event) => {
			translationX.value = event.translationX;

			activeIndex.value = interpolate(
				Math.abs(translationX.value),
				[0, 500],
				[index, index + 0.8]
			);
		})
		.onEnd((event) => {
			if (Math.abs(event.velocityX) > 400) {
				translationX.value = withSpring(Math.sign(event.velocityX) * 500, {
					velocity: event.velocityX,
				});
				activeIndex.value = withSpring(index + 1);

				runOnJS(onResponse)(event.velocityX > 0);
			} else {
				translationX.value = withSpring(0);
			}
		});

	return (
		<GestureDetector gesture={gesture}>
			<Animated.View
				style={[
					styles.card,
					animatedCard,
					{
						zIndex: numberOfCards - index,
					},
				]}>
				<Image
					style={[StyleSheet.absoluteFillObject, styles.image]}
					source={{ uri: image }}
				/>

				<LinearGradient
					// Background Linear Gradient
					colors={['transparent', 'rgba(0,0,0,0.8)']}
					style={[StyleSheet.absoluteFillObject, styles.overlay]}
				/>

				<View style={styles.footer}>
					<Text style={styles.name}>{name}</Text>
				</View>
			</Animated.View>
		</GestureDetector>
	);
}

const styles = StyleSheet.create({
	card: {
		width: tinderCardWidth,
		aspectRatio: 1 / 1.67,
		borderRadius: 15,

		position: 'absolute',

		justifyContent: 'flex-end',

		backgroundColor: 'white',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.25,
		shadowRadius: 2.22,
		elevation: 3,

		// overflow: 'hidden',
	},
	image: {
		borderRadius: 15,
	},
	overlay: {
		borderRadius: 15,
		top: '50%',
	},
	footer: {
		padding: 10,
	},
	name: {
		fontSize: 20,
		color: 'white',
		fontFamily: 'InterBold',
	},
});
