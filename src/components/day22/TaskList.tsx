import { View, Button } from 'react-native';
import FooterList from './FooterList';
import TaskListItem from './TaskListItem';
import { withObservables } from '@nozbe/watermelondb/react';
import { database } from '@/database/watermelon';
import Task from '@/model/Task';
import { Model } from '@nozbe/watermelondb';
import { FlatList } from 'react-native-gesture-handler';

const enhance = withObservables(['tasks'], ({ tasks }) => {
	const observable = ['id', 'title', 'completed'];
	return {
		tasks: database.collections
			.get('tasks')
			.query()
			.observeWithColumns(observable),
	};
});

type TaskListProps = {
	tasks: Model[];
};

function TaskList({ tasks }: TaskListProps) {
	return (
		<FlatList
			ListHeaderComponent={() => (
				<View style={{ flexDirection: 'row' }}>
					<Button
						// color={filteredChecked === undefined ? 'green' : 'blue'}
						title="All"
						// onPress={() => updateFilterChecked()}
					/>
					<Button
						// color={filteredChecked === false ? 'green' : 'blue'}
						title="Active"
						// onPress={() => updateFilterChecked(false)}
					/>
					<Button
						// color={filteredChecked ? 'green' : 'blue'}
						title="Completed"
						// onPress={() => updateFilterChecked(true)}
					/>
				</View>
			)}
			// Pour être en dessous de la searchBar
			contentInsetAdjustmentBehavior="automatic"
			data={tasks}
			contentContainerStyle={{ gap: 10, padding: 10 }}
			renderItem={({ item, index }) => <TaskListItem task={item as Task} />}
			ListFooterComponent={() => <FooterList />}
		/>
	);
}

export default enhance(TaskList);
