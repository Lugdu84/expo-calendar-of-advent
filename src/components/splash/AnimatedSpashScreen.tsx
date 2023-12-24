import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRef } from 'react';
import Animated, { FadeIn, FadeOut, ZoomOut } from 'react-native-reanimated';

type AnimatedSpashScreenProps = {
	onAnimationFinish: (isCancelled: boolean) => void;
};

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function AnimatedSpashScreen({
	onAnimationFinish,
}: AnimatedSpashScreenProps) {
	const animation = useRef<LottieView>(null);
	return (
		<Animated.View style={styles.page}>
			<AnimatedLottieView
				exiting={ZoomOut}
				autoPlay
				ref={animation}
				loop={false}
				onAnimationFinish={onAnimationFinish}
				style={{
					width: '80%',
					maxWidth: 400,
					height: 200,
				}}
				source={require('@assets/lottie/netfix.json')}
			/>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'black',
	},
});
