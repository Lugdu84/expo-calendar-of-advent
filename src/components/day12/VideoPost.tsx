import {
	View,
	StyleSheet,
	Text,
	Pressable,
	useWindowDimensions,
} from 'react-native';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';

type VideoPost = {
	post: Post;
	activePostId: string;
};

export default function VideoPost({
	activePostId,
	post: { uri, caption, id },
}: VideoPost) {
	const video = useRef<Video>(null);
	const [status, setStatus] = useState<AVPlaybackStatus>();
	const { height } = useWindowDimensions();

	useEffect(() => {
		if (!video.current) {
			return;
		}
		if (activePostId !== id) {
			video.current.pauseAsync();
		} else {
			video.current.playAsync();
		}
	}, [activePostId, video.current]);

	const onPress = () => {
		if (!video.current) {
			return;
		}
		if (isPlaying) {
			video.current.pauseAsync();
			return;
		}
		video.current.playAsync();
	};

	const isPlaying = status?.isLoaded && status.isPlaying;
	return (
		<View style={[styles.container, { height }]}>
			<Video
				ref={video}
				style={styles.video}
				source={{
					uri,
				}}
				resizeMode={ResizeMode.COVER}
				isLooping
				onPlaybackStatusUpdate={setStatus}
			/>

			<Pressable
				onPress={onPress}
				style={styles.content}>
				<LinearGradient
					colors={['transparent', 'rgba(0,0,0,0.8)']}
					style={[StyleSheet.absoluteFillObject, styles.overlay]}
				/>
				{!isPlaying && (
					<Ionicons
						name={'play'}
						size={70}
						color="rgba(255,255,255,0.6)"
						style={{ position: 'absolute', alignSelf: 'center', top: '50%' }}
					/>
				)}

				<SafeAreaView style={{ flex: 1 }}>
					<View style={styles.footer}>
						<View style={styles.leftColumn}>
							<Text style={styles.caption}>{caption}</Text>
						</View>

						<View style={styles.rightColumn}>
							<Ionicons
								name="heart"
								size={30}
								color="white"
							/>
							<Ionicons
								name="share-social-sharp"
								size={30}
								color="white"
							/>
							<Ionicons
								name="md-bookmark"
								size={30}
								color="white"
							/>
						</View>
					</View>
				</SafeAreaView>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
	content: {
		flex: 1,
		padding: 10,
	},
	footer: {
		marginTop: 'auto',
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	leftColumn: {
		flex: 1,
	},
	caption: {
		color: 'white',
		fontSize: 20,
		fontFamily: 'Inter',
	},
	rightColumn: {
		gap: 10,
	},
	video: {
		...StyleSheet.absoluteFillObject,
	},
	overlay: {
		top: '50%',
	},
});
