import { Stack } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
	View,
	Text,
	ActivityIndicator,
	StyleSheet,
	Pressable,
	Image,
	Button,
} from 'react-native';
// import { useIsFocused } from '@react-navigation/native';
import { useFocusEffect } from 'expo-router';
import {
	useCameraPermission,
	useCameraDevice,
	Camera,
	PhotoFile,
	TakePhotoOptions,
	useMicrophonePermission,
	VideoFile,
	useCodeScanner,
} from 'react-native-vision-camera';
import { Video, ResizeMode } from 'expo-av';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

export default function CameraScreen() {
	const { hasPermission, requestPermission } = useCameraPermission();
	const {
		hasPermission: microphonePermission,
		requestPermission: requestMicrophonePermission,
	} = useMicrophonePermission();
	const codeScanner = useCodeScanner({
		codeTypes: ['qr', 'ean-13'],
		onCodeScanned: (codes) => {
			console.log(`Scanned ${codes.length} codes!`);
		},
	});
	const [isFocused, setIsFocused] = useState(false);
	const [isQrCodeScanning, setIsQrCodeScanning] = useState(false);
	const [photo, setPhoto] = useState<PhotoFile>();
	const [video, setVideo] = useState<VideoFile>();
	const [flash, setFlash] = useState<TakePhotoOptions['flash']>('auto');
	const [recording, setRecording] = useState(false);
	const camera = useRef<Camera>(null);
	const videoRef = useRef<Video>(null);
	useFocusEffect(
		useCallback(() => {
			setIsFocused(true);
			return () => {
				setIsFocused(false);
			};
		}, [])
	);

	const device = useCameraDevice('back', {
		physicalDevices: ['ultra-wide-angle-camera'],
	});

	useEffect(() => {
		requestPermission();
		requestMicrophonePermission();
	}, [hasPermission]);

	if (!hasPermission || !microphonePermission) {
		return <ActivityIndicator />;
	}

	const onTakePicturePressed = async () => {
		if (!camera.current) return;

		if (recording) {
			await camera.current.stopRecording();
			return;
		}
		const newPhoto = await camera.current.takePhoto({
			flash: flash,
		});
		setPhoto(newPhoto);
	};

	const onStartRecording = () => {
		if (!camera.current) return;
		setRecording(true);
		camera.current.startRecording({
			onRecordingFinished: (video) => {
				setRecording(false);
				setVideo(video);
				console.log(video);
			},
			onRecordingError: (error) => {
				setRecording(false);
				console.log(error);
			},
		});
	};

	const uploadPhoto = async () => {
		if (!photo) return;
		const result = await fetch(`file://${photo.path}`);
		const data = await result.blob();

		// Upload data to your network storage
	};

	if (!device) return <Text>Camera device not found</Text>;

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ headerShown: false }} />
			<Camera
				ref={camera}
				device={device}
				isActive={isFocused && !photo && !video}
				style={StyleSheet.absoluteFill}
				photo={!isQrCodeScanning}
				video={!isQrCodeScanning}
				codeScanner={isQrCodeScanning ? codeScanner : undefined}
			/>
			{video && (
				<>
					<Video
						ref={videoRef}
						style={StyleSheet.absoluteFill}
						source={{
							uri: video.path,
						}}
						useNativeControls
						resizeMode={ResizeMode.CONTAIN}
						isLooping
						// onPlaybackStatusUpdate={status => setStatus(() => status)}
					/>
					<FontAwesome5
						onPress={() => setVideo(undefined)}
						name="arrow-left"
						size={24}
						color="white"
						style={styles.buttonClose}
					/>
				</>
			)}
			{photo && (
				<>
					<Image
						source={{ uri: photo.path }}
						style={StyleSheet.absoluteFill}
					/>
					<FontAwesome5
						onPress={() => setPhoto(undefined)}
						name="arrow-left"
						size={24}
						color="white"
						style={styles.buttonClose}
					/>
					<View style={styles.footerImage}>
						<Button
							title="upload"
							onPress={uploadPhoto}
						/>
					</View>
				</>
			)}
			{!video && !photo && (
				<>
					<View style={styles.buttonFlash}>
						<MaterialIcons
							name="flash-auto"
							size={24}
							color="white"
							style={{ opacity: flash === 'auto' ? 1 : 0.5 }}
							onPress={() => setFlash('auto')}
						/>
						<MaterialIcons
							name="flash-on"
							size={24}
							color="white"
							style={{ opacity: flash === 'on' ? 1 : 0.5 }}
							onPress={() => setFlash('on')}
						/>
						<MaterialIcons
							name="flash-off"
							size={24}
							color="white"
							style={{ opacity: flash === 'off' ? 1 : 0.5 }}
							onPress={() => setFlash('off')}
						/>
						<MaterialIcons
							name="qr-code"
							size={24}
							color="white"
							style={{ opacity: isQrCodeScanning ? 1 : 0.5 }}
							onPress={() => setIsQrCodeScanning((prev) => !prev)}
						/>
					</View>
					<Pressable
						style={[
							styles.buttonScreenShot,
							{ backgroundColor: recording ? 'red' : 'white' },
						]}
						onPress={onTakePicturePressed}
						onLongPress={onStartRecording}
					/>
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	buttonScreenShot: {
		position: 'absolute',
		bottom: 50,
		alignSelf: 'center',
		width: 60,
		height: 60,
		borderRadius: 30,
	},
	buttonClose: {
		position: 'absolute',
		top: 50,
		left: 20,
	},
	buttonFlash: {
		position: 'absolute',
		top: 50,
		right: 20,
		gap: 10,
	},
	footerImage: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		paddingBottom: 50,
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
});
