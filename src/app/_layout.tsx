import AnimatedSpashScreen from '@/components/splash/AnimatedSpashScreen';
import {
	AmaticSC_400Regular,
	AmaticSC_700Bold,
	useFonts,
} from '@expo-google-fonts/amatic-sc';
import {
	Inter_600SemiBold,
	Inter_400Regular,
	Inter_700Bold,
	Inter_900Black,
} from '@expo-google-fonts/inter';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function RootLayout() {
	const [appReady, appSetReady] = useState(false);
	const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);
	const [fontLoaded, fontError] = useFonts({
		AmaticBold: AmaticSC_700Bold,
		Amatic: AmaticSC_400Regular,
		InterBold: Inter_700Bold,
		Inter: Inter_400Regular,
		InterSemiBold: Inter_600SemiBold,
		InterBlack: Inter_900Black,
	});

	useEffect(() => {
		if (fontLoaded || fontError) {
			// SplashScreen.hideAsync();
			appSetReady(true);
		}
	}, [fontLoaded, fontError]);

	const handleAnimationFinish = (isCancelled: boolean) => {
		if (isCancelled) {
			return;
		}
		setSplashAnimationFinished(true);
	};

	if (!splashAnimationFinished) {
		return <AnimatedSpashScreen onAnimationFinish={handleAnimationFinish} />;
	}
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Animated.View
				style={{ flex: 1 }}
				entering={FadeIn}>
				<Stack screenOptions={{}}>
					<Stack.Screen
						name="index"
						options={{ title: 'DEVember' }}
					/>
				</Stack>
			</Animated.View>
		</GestureHandlerRootView>
	);
}
