import React, {Component, Children} from "react";
import InputValidator from "./src/InputValidator";
import InputValidatorPlaceholder from "./src/InputValidatorPlaceholder";

/**
 * react-native-input-validator
 * @author Marco Cesarato <cesarato.developer@gmail.com>
 */
export default class TextInput extends Component {
	render() {
		if (Children.count(this.props.children)) {
			return <InputValidatorPlaceholder {...this.props} />;
		}
		return <InputValidator {...this.props} />;
	}
}
