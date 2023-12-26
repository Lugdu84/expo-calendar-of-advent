import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import { useState } from 'react';
import { Recording } from 'expo-av/build/Audio';
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import MemoListItem from '@/components/audio/MemoListItem';

export default function VoiceMemosScreen() {
	const [recording, setRecording] = useState<Recording>();
	const [memos, setMemos] = useState<Memo[]>([]);
	const [audioMetering, setAudioMetering] = useState<number[]>([]);

	const metering = useSharedValue(-100);

	async function startRecording() {
		try {
			setAudioMetering([]);
			await Audio.requestPermissionsAsync();
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: true,
				playsInSilentModeIOS: true,
			});
			const { recording } = await Audio.Recording.createAsync(
				Audio.RecordingOptionsPresets.HIGH_QUALITY,
				undefined,
				100
			);
			setRecording(recording);
			recording.setOnRecordingStatusUpdate((status) => {
				if (status.metering) {
					metering.value = status.metering;
					setAudioMetering((prev) => [...prev, status.metering || -100]);
				}
			});
		} catch (err) {
			console.error('Failed to start recording', err);
		}
	}

	async function stopRecording() {
		if (!recording) {
			return;
		}
		setRecording(undefined);
		await recording.stopAndUnloadAsync();
		await Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
		});
		const uri = recording.getURI();
		console.log('Recording stopped and stored at', uri);
		if (uri) {
			setMemos([{ uri, metering: audioMetering }, ...memos]);
		}
	}

	const animatedRedCircle = useAnimatedStyle(() => {
		return {
			width: withTiming(recording ? '70%' : '100%'),
			borderRadius: withTiming(recording ? 5 : 30),
		};
	});

	const animatedRecordWave = useAnimatedStyle(() => {
		const size = withSpring(
			interpolate(metering.value, [-160, -60, 0], [0, 0, -100]),
			{ duration: 100 }
		);
		return {
			top: size,
			bottom: size,
			right: size,
			left: size,
		};
	});

	return (
		<View style={styles.container}>
			<FlatList
				data={memos}
				renderItem={({ item }) => <MemoListItem memo={item} />}
			/>
			<View style={styles.footer}>
				<View>
					<Animated.View style={[styles.recordWave, animatedRecordWave]} />
					<Pressable
						style={styles.recordButton}
						onPress={recording ? stopRecording : startRecording}>
						<Animated.View style={[styles.redCircle, animatedRedCircle]} />
					</Pressable>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#ecf0f1',
	},
	footer: {
		backgroundColor: 'white',
		height: 200,
		justifyContent: 'center',
		alignItems: 'center',
	},
	recordButton: {
		borderRadius: 30,
		width: 60,
		height: 60,
		borderWidth: 3,
		borderColor: 'gray',
		padding: 3,

		alignItems: 'center',
		justifyContent: 'center',

		backgroundColor: 'white',
	},
	redCircle: {
		backgroundColor: 'orangered',
		aspectRatio: 1,
		borderRadius: 30,
	},
	recordWave: {
		backgroundColor: '#ff000055',
		position: 'absolute',
		top: -20,
		bottom: -20,
		right: -20,
		left: -20,
		borderRadius: 100,
	},
});
