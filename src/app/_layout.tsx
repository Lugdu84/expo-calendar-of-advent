import {
	AmaticSC_400Regular,
	AmaticSC_700Bold,
	useFonts,
} from '@expo-google-fonts/amatic-sc';
import { Inter_900Black } from '@expo-google-fonts/inter';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';

export default function RootLayout() {
	const [fontLoaded, fontError] = useFonts({
		AmaticBold: AmaticSC_700Bold,
		Amatic: AmaticSC_400Regular,
		Inter: Inter_900Black,
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
		<Stack screenOptions={{}}>
			<Stack.Screen
				name="index"
				options={{ title: 'DEVember' }}
			/>
		</Stack>
	);
}
