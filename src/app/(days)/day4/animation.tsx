import { View, StyleSheet, Button } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRef } from 'react';

export default function AnimationScreen() {
	const animation = useRef<LottieView>(null);

	const handlePlay = () => {
		animation.current?.play();
	};
	const handlePause = () => {
		animation.current?.pause();
	};
	const handleReset = () => {
		animation.current?.reset();
		handlePlay();
	};
	return (
		<View style={styles.page}>
			<LottieView
				autoPlay
				ref={animation}
				style={{
					width: 200,
					height: 200,
					backgroundColor: '#eee',
				}}
				source={require('@assets/lottie/netfix.json')}
			/>
			<View style={styles.buttonsContainer}>
				<Button
					title="Play"
					onPress={handlePlay}
				/>
				<Button
					title="Pause"
					onPress={handlePause}
				/>
				<Button
					title="Reset"
					onPress={handleReset}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		padding: 10,
	},
	buttonsContainer: {
		flexDirection: 'row',
	},
	button: {
		flex: 1,
	},
});
