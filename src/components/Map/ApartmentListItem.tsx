import { View, Text, StyleSheet, Image, ViewStyle } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type ApartmentListItemProps = {
	apartment: Apartment;
	containerStyle?: ViewStyle;
};

export default function ApartmentListItem({
	apartment: { image, title, price, rating, numberOfStars, description },
	containerStyle,
}: ApartmentListItemProps) {
	return (
		<View style={[styles.card, containerStyle]}>
			<Image
				source={{ uri: image }}
				style={styles.image}
			/>
			<View style={styles.rightContainer}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.description}>{description}</Text>
				<View style={styles.footer}>
					<Text style={styles.price}>{price} €</Text>
					<View style={styles.ratings}>
						<FontAwesome
							name="star"
							size={16}
							color="black"
						/>
						<Text style={styles.price}>
							{rating} ({numberOfStars})
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		flex: 1,
		backgroundColor: 'white',
		borderRadius: 20,

		flexDirection: 'row',
		overflow: 'hidden',
	},
	rightContainer: {
		flex: 1,
		padding: 10,
	},
	description: {
		fontSize: 14,
		color: 'gray',
		fontFamily: 'Inter',
	},

	title: {
		fontSize: 16,
		fontFamily: 'InterBold',
		marginBottom: 10,
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 'auto',
	},
	price: {
		fontSize: 14,
		fontFamily: 'InterBold',
	},
	ratings: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 3,
	},
	image: {
		width: 120,
		aspectRatio: 1,
	},
});
