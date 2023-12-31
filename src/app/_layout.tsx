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
import Purchases from 'react-native-purchases';
import { Platform } from 'react-native';

import { vexo } from 'vexo-analytics';

const REVENUECAT_IOS_KEY = process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY;

if (!__DEV__) {
	vexo(process.env.EXPO_PUBLIC_VEXO_API_KEY!);
}

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
		if (Platform.OS === 'ios' && REVENUECAT_IOS_KEY) {
			Purchases.configure({ apiKey: REVENUECAT_IOS_KEY });
		}
	}, []);

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
