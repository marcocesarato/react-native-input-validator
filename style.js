/**
 * Input Validator - Style
 * @author Marco Cesarato <cesarato.developer@gmail.com>
 */

import {StyleSheet, Platform} from "react-native";

const inputStyle = {
	flex: 1,
	minHeight: 50,
	borderColor: "#FFF",
	borderBottomColor: "#CCC",
	backgroundColor: "transparent",
	justifyContent: "center",
	borderWidth: 1,
	color: "black",
	fontSize: 20,
	borderRadius: 4,
	marginTop: 20,
	...Platform.select({
		web: {
			outlineWidth: 0,
			outline: "none",
		},
	}),
};

const inputWebStyle = {
	...inputStyle,
};

export const Style = StyleSheet.create({
	element: {
		position: "relative",
		flex: 1,
		flexDirection: "row",
		//alignSelf: 'stretch',
		alignItems: "center",
		justifyContent: "flex-start",
	},
	input: Platform.OS === "web" ? inputWebStyle : inputStyle,
	label: {
		marginTop: 21,
		color: "#AAA",
		position: "absolute",
	},
	valid: {
		borderBottomWidth: 1,
		borderBottomColor: "#25863f",
	},
	invalid: {
		borderBottomWidth: 1,
		borderBottomColor: "#f04048",
	},
});

export const CleanStyle = {
	fontSize: 20,
	top: 7,
};

export const DirtyStyle = {
	fontSize: 12,
	top: -17,
};

export const Palette = {
	danger: "#f04048",
	success: "#25863f",
	normal: "#AAAAAA",
};
