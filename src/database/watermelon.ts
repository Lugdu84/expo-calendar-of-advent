import { Platform } from 'react-native';
import { Database, Model } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from '@/model/schema';
import migrations from '@/model/migrations';
import Task from '@/model/Task';

const adapter = new SQLiteAdapter({
	schema,
	// (You might want to comment it out for development purposes -- see Migrations documentation)
	migrations,
	// (optional database name or file system path)
	dbName: 'devember',
	// (recommended option, should work flawlessly out of the box on iOS. On Android,
	// additional installation steps have to be taken - disable if you run into issues...)
	jsi: true /* Platform.OS === 'ios' */,
	// (optional, but you should implement this method)
	onSetUpError: (error) => {
		console.log('OnSetUpError', error);
	},
});

export const database = new Database({
	adapter,
	modelClasses: [Task],
});
