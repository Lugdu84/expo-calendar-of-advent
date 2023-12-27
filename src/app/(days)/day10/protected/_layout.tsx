import { Slot } from 'expo-router';
import { useEffect } from 'react';
import { authenticateAsync } from 'expo-local-authentication';

export default function BiometricProtectedLayout() {
	console.log('Protected');

	useEffect(() => {
		const authenticate = async () => {
			const response = await authenticateAsync();
			console.log(response);
		};

		authenticate();
	}, []);
	return <Slot />;
}
