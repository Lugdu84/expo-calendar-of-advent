import { Slot } from 'expo-router';

import { Platform } from 'react-native';
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from '@/model/schema';
import migrations from '@/model/migrations';

const adapter = new SQLiteAdapter({
	schema,
	// (You might want to comment it out for development purposes -- see Migrations documentation)
	migrations,
	// (optional database name or file system path)
	// dbName: 'myapp',
	// (recommended option, should work flawlessly out of the box on iOS. On Android,
	// additional installation steps have to be taken - disable if you run into issues...)
	jsi: true /* Platform.OS === 'ios' */,
	// (optional, but you should implement this method)
	onSetUpError: (error) => {
		console.log('OnSetUpError', error);
	},
});

const database = new Database({
	adapter,
	modelClasses: [
		// Post, // ⬅️ You'll add Models to Watermelon here
	],
});

export default function LayoutLocalFirst() {
	console.warn('Configure watermelonDB here');
	return <Slot />;
}
