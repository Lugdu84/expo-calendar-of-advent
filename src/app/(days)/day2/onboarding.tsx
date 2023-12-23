import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import {
	Directions,
	Gesture,
	GestureDetector,
} from 'react-native-gesture-handler';
import Animated, {
	FadeIn,
	FadeOut,
	BounceInRight,
	BounceOutLeft,
	SlideInLeft,
} from 'react-native-reanimated';

const onboardingSteps = [
	{
		title: 'Welcome #DEVember',
		description: 'Daily React Native tutorials during december.',
		icon: 'snowflake',
	},
	{
		title: 'Lean and grow together',
		description: 'Learn but building 24 projects with React Native and Expo',
		icon: 'people-arrows',
	},
	{
		title: 'Education for children',
		description:
			'Contribute to the fundraiser "Education for children" to help children in need.',
		icon: 'book-reader',
	},
];

export default function OnBoardingScreen() {
	const [stepIndex, setStepIndex] = useState(0);

	const onContinue = () => {
		if (isLastScreen) {
			endOnboarding();
		}
		setStepIndex(stepIndex + 1);
	};

	const onBack = () => {
		if (stepIndex > 0) {
			setStepIndex(stepIndex - 1);
		}
	};

	const swiftForward = Gesture.Fling()
		.direction(Directions.LEFT)
		.onEnd(onContinue);

	const swipeBack = Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack);

	const composedGestures = Gesture.Race(swiftForward, swipeBack);

	const data = onboardingSteps[stepIndex];

	const isLastScreen = stepIndex === onboardingSteps.length - 1;

	const endOnboarding = () => {
		router.back();
	};
	return (
		<SafeAreaView style={styles.page}>
			<Stack.Screen options={{ headerShown: false }} />
			<StatusBar style="light" />
			<View style={styles.stepIndicatorContainer}>
				{onboardingSteps.map((_, index) => (
					<View
						style={[
							styles.stepIndicator,
							{ backgroundColor: index === stepIndex ? '#cef202' : 'gray' },
						]}
						key={index}
					/>
				))}
			</View>
			<GestureDetector gesture={composedGestures}>
				<View
					style={styles.pageContent}
					key={stepIndex}>
					<Animated.View
						entering={FadeIn}
						exiting={FadeOut}>
						<FontAwesome5
							style={styles.image}
							name={data.icon}
							size={100}
							color="#cef202"
						/>
					</Animated.View>

					<View style={styles.footer}>
						<Animated.Text
							entering={SlideInLeft.duration(500)}
							style={styles.title}>
							{data.title}
						</Animated.Text>
						<Animated.Text
							entering={SlideInLeft.delay(100)}
							style={styles.description}>
							{data.description}
						</Animated.Text>
						<View style={styles.buttonsRow}>
							<Text
								onPress={endOnboarding}
								style={styles.buttonText}>
								Skip
							</Text>
							<Pressable
								onPress={onContinue}
								style={styles.button}>
								<Text style={styles.buttonText}>Continue</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</GestureDetector>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#15141A',
	},
	pageContent: {
		flex: 1,
		padding: 20,
	},
	footer: {
		marginTop: 'auto',
	},
	image: {
		alignSelf: 'center',
		margin: 20,
	},
	title: {
		color: '#fdfdfd',
		marginVertical: 10,
		fontSize: 50,
		fontFamily: 'InterBlack',
		letterSpacing: 1.3,
	},
	description: {
		color: 'gray',
		fontSize: 20,
		fontFamily: 'Inter',
		lineHeight: 25,
	},
	buttonsRow: {
		marginTop: 20,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 20,
	},
	button: {
		backgroundColor: '#302e38',
		flex: 1,
		borderRadius: 50,
		alignItems: 'center',
	},
	buttonText: {
		color: '#fdfdfd',
		fontFamily: 'InterSemiBold',
		fontSize: 16,
		padding: 15,
		paddingHorizontal: 25,
	},
	stepIndicatorContainer: {
		flexDirection: 'row',
		gap: 3,
		marginHorizontal: 20,
	},
	stepIndicator: {
		flex: 1,
		height: 3,
		backgroundColor: 'gray',
		borderRadius: 10,
	},
});
