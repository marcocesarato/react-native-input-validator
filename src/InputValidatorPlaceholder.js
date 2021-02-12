import React from "react";
import PropTypes from "prop-types";
import {Animated, Easing, /*TouchableOpacity,*/ View} from "react-native";
import {Palette, Style, CleanStyle, DirtyStyle} from "../style";
import validator from "validator";
import InputValidator from "./InputValidator";

/**
 * Text Input Validator
 * @author Marco Cesarato <cesarato.developer@gmail.com>
 */
class InputValidatorPlaceholder extends InputValidator {
	/**
	 * Constructor
	 * @param props
	 */
	constructor(props) {
		super(props);

		const value = this.parseValue(this.props.value);
		const dirty = !validator.isEmpty(value);

		this.styles = dirty ? DirtyStyle : CleanStyle;
		this.state = {
			...this.state,
			dirty: dirty,
		};
	}

	/**
	 * Component did mount
	 */
	componentDidMount() {
		this.setState({labelStyle: this.getLabelStyle()}, () => {
			super.componentDidMount();
		});
	}

	/**
	 * Component did update
	 * @param prevProps
	 * @param prevState
	 */
	componentDidUpdate(prevProps, prevState) {
		super.componentDidUpdate(prevProps, prevState);
		const dirty =
			!validator.isEmpty(this.parseValue()) || this.input.isFocused();
		if (prevState.dirty !== dirty) {
			this.setState({dirty: dirty});
			this.animate(dirty);
		}
	}

	/**
	 * Get Label Style
	 * @returns {{fontSize: *|AnimatedValue|AnimatedImplementation.Value, top: *|AnimatedValue|AnimatedImplementation.Value}}
	 */
	getLabelStyle() {
		return {
			fontSize: new Animated.Value(this.styles.fontSize),
			top: new Animated.Value(this.styles.top),
		};
	}

	/**
	 * Validate
	 * @param value
	 * @returns {boolean}
	 */
	validate(value = null) {
		const valid = super.validate(value);
		const text = this.parseValue(value).trim();
		const dirty = !validator.isEmpty(text) || this.input.isFocused();

		let labelStyle = this.getLabelStyle();

		if (valid === false && !this.props.required) {
			labelStyle.color = Palette.danger;
		} else if (!validator.isEmpty(text) && valid === true) {
			labelStyle.color = Palette.success;
		} else {
			labelStyle.color = Palette.normal;
		}

		this.animate(dirty);
		this.setState({labelStyle: labelStyle, dirty: dirty});

		return valid;
	}

	/**
	 * Animate floating label
	 * @param dirty
	 */
	animate(dirty) {
		let nextStyle = dirty ? DirtyStyle : CleanStyle;
		let labelStyle = this.state.labelStyle;
		let anims = Object.keys(nextStyle).map((prop) => {
			return Animated.timing(
				labelStyle[prop],
				{
					useNativeDriver: true,
					toValue: nextStyle[prop],
					duration: 200,
				},
				Easing.ease,
			);
		});

		Animated.parallel(anims).start();
	}

	/**
	 * On Focus
	 * @param event
	 * @param refName
	 */
	onFocus(event, refName) {
		this.animate(true);
		this.setState({dirty: true});
		super.onFocus(event, refName);
	}

	/**
	 * On Blur
	 */
	onBlur() {
		if (validator.isEmpty(this.parseValue())) {
			this.animate(false);
			this.setState({dirty: false});
		}
		super.onBlur(arguments);
	}

	/**
	 * Render label
	 * @returns {*}
	 */
	renderLabel() {
		return (
			<Animated.Text
				ref="label"
				pointerEvents={"none"}
				numberOfLines={this.props.numberOfLines}
				style={[Style.label, this.props.labelStyle, this.state.labelStyle]}>
				{this.props.children} {this.props.required ? "(*)" : ""}
			</Animated.Text>
		);
	}

	/**
	 * Render
	 * @returns {*}
	 */
	render() {
		return (
			<View style={[Style.element, this.props.containerStyle]}>
				{this.renderLabel()}
				{super.render()}
			</View>
		);
	}
}

InputValidatorPlaceholder.propTypes = {
	labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

InputValidatorPlaceholder.defaultProps = {
	placeholder: "",
	containerstyle: {},
	labelstyle: {},
};

export default InputValidatorPlaceholder;
