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
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
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
			SplashScreen.hideAsync();
		}
	}, [fontLoaded, fontError]);

	if (!fontLoaded && !fontError) {
		return null;
	}
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Stack screenOptions={{}}>
				<Stack.Screen
					name="index"
					options={{ title: 'DEVember' }}
				/>
			</Stack>
		</GestureHandlerRootView>
	);
}
