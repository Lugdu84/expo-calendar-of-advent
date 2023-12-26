import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import { AVPlaybackStatus, Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';

type MemoListItemProps = {
	memo: Memo;
};

export const progressUpdateIntervalMillis = 1000 / 60;

export default function MemoListItem({
	memo: { uri, metering },
}: MemoListItemProps) {
	const [sound, setSound] = useState<Sound>();
	const [status, setStatus] = useState<AVPlaybackStatus>();

	const isPlaying = status?.isLoaded ? status.isPlaying : false;
	const position = status?.isLoaded ? status.positionMillis : 0;
	const duration = status?.isLoaded ? status.durationMillis : 1;

	const progress = (position / duration!) * 100;

	const onPlaybackStatusUpdate = useCallback(
		async (newStatus: AVPlaybackStatus) => {
			setStatus(newStatus);
			if (!newStatus?.isLoaded || !sound) {
				return;
			}

			if (newStatus.didJustFinish) {
				// TODO: go to start of sound. It is possible ?
				// await sound.setPositionAsync(0);
			}
		},
		[sound]
	);

	const loadSound = async () => {
		console.log('Loading Sound');
		const { sound } = await Audio.Sound.createAsync(
			{ uri: uri },
			{ progressUpdateIntervalMillis },
			onPlaybackStatusUpdate
		);
		setSound(sound);

		sound.setOnAudioSampleReceived((data) => {
			// console.log(JSON.stringify(data, null, 2));
		});
	};

	async function playSound() {
		if (!sound) {
			return;
		}
		if (status?.isLoaded && status.isPlaying) {
			await sound.pauseAsync();
		} else {
			await sound.replayAsync();
		}
	}

	useEffect(() => {
		loadSound();
	}, [uri]);

	useEffect(() => {
		return sound
			? () => {
					console.log('Unloading Sound');
					sound.unloadAsync();
			  }
			: undefined;
	}, [sound]);

	const formatDuration = (millis: number) => {
		const minutes = Math.floor(millis / 60000);
		const seconds = Math.floor((millis % 60000) / 1000);
		return `${minutes}:${+seconds < 10 && '0'}${seconds}`;
	};

	const animatedIndicatorStyle = useAnimatedStyle(() => {
		return {
			left: withTiming(`${progress}%`, {
				duration: progressUpdateIntervalMillis,
			}),
		};
	});

	let numLines = 50;
	let lines = [];

	for (let i = 0; i < numLines; i++) {
		const meteringIndex = Math.floor((i * metering.length) / numLines);
		const nextMeteringIndex = Math.ceil(((i + 1) * metering.length) / numLines);
		const values = metering.slice(meteringIndex, nextMeteringIndex);
		const average = values.reduce((sum, a) => sum + a, 0) / values.length;
		// lines.push(memo.metering[meteringIndex]);
		lines.push(average);
	}

	return (
		<View style={styles.container}>
			<FontAwesome5
				onPress={playSound}
				name={isPlaying ? 'pause' : 'play'}
				size={24}
				color="gray"
			/>
			<View style={styles.playbackContainer}>
				{/* <View style={styles.playbackBackground} /> */}
				<View style={styles.wave}>
					{metering.map((db, index) => (
						<View
							key={index}
							style={[
								styles.waveLine,
								{
									height: interpolate(db, [-60, 0], [5, 50], Extrapolate.CLAMP),
									backgroundColor:
										progress > index / lines.length ? 'royalblue' : 'gainsboro',
								},
							]}
						/>
					))}
				</View>
				<Animated.View
					style={[styles.playbackIndicator, animatedIndicatorStyle]}
				/>
				<Text style={styles.textDuration}>
					{formatDuration(position)} / {formatDuration(duration!)}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		margin: 5,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 15,
		paddingVertical: 5,
		borderRadius: 10,
		gap: 15,

		// shadow
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	},
	playbackContainer: {
		flex: 1,
		height: 80,
		justifyContent: 'center',
	},
	playbackBackground: {
		height: 3,
		backgroundColor: 'gainsboro',
		borderRadius: 5,
	},
	wave: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 1,
	},
	waveLine: {
		flex: 1,
		height: 30,
		backgroundColor: 'gainsboro',
		borderRadius: 20,
	},
	playbackIndicator: {
		width: 10,
		aspectRatio: 1,
		borderRadius: 10,
		backgroundColor: 'royalblue',
		position: 'absolute',
	},
	textDuration: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		fontSize: 12,
		color: 'gray',
	},
});
