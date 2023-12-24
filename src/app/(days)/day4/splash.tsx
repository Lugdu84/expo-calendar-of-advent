import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRef } from 'react';
import { Stack } from 'expo-router';

export default function SplashScreen() {
	const animation = useRef<LottieView>(null);
	return (
		<View style={styles.page}>
			<Stack.Screen options={{ headerShown: false }} />
			<LottieView
				autoPlay
				ref={animation}
				style={{
					width: '80%',
					maxWidth: 400,
					height: 200,
				}}
				source={require('@assets/lottie/netfix.json')}
			/>
		</View>
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
