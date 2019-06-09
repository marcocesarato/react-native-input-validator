import React, {Component} from 'react';
import {Keyboard, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import validator from "validator";
import {Style} from "../style";

/**
 * Input Text
 * @author Marco Cesarato <cesarato.developer@gmail.com>
 */
class InputText extends Component {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);

        const value = this.parseValue(this.props.value);

        this.state = {
            value: value,
            validated: true,
        };
    }

    /**
     * Component did update
     * @param prevProps
     */
    componentDidUpdate(prevProps) {
        const value = this.parseValue(this.props.value);
        if (!validator.isEmpty(value) && value !== this.state.value && prevProps.value !== value) {
            this.validate(value);
        }
    }

    /**
     * Component did mount
     */
    componentDidMount() {
        this.validate();
    }

    /**
     * Get locale
     * @returns {string}
     */
    getLocale(){
        return (this.props.locale != null ? this.props.locale : "any");
    }

    /**
     * Get input type
     * @returns {string}
     */
    getType(){
        return (this.props.type != null ? this.props.type : "");
    }

    /**
     * Null to empty
     * @param value
     * @returns string
     */
    parseValue(value) {
        value = (value == null ? '' : value);
        value = String(value).trim();
        return value;
    }

    /**
     * Get if validate
     * @returns {boolean}
     */
    isValidated() {
        return this.state.validated;
    }

    /**
     * Is valid
     * @param _text
     * @returns {boolean}
     */
    isValid(_text) {

        let is_valid = true;
        const text = this.parseValue(_text != null ? _text : this.state.value).trim();

        switch (this.getType()) {
            case "email":
                if (!validator.isEmail(text)) {
                    is_valid = false;
                }
                break;
            case "phone":
                if (!validator.isMobilePhone(text, this.getLocale())) {
                    is_valid = false;
                }
                break;
            case "currency":
                if (!validator.isCurrency(text, {symbol: this.props.symbol})) {
                    is_valid = false;
                }
                break;
            case "postal-code":
                if (!validator.isPostalCode(text, this.getLocale())) {
                    is_valid = false;
                }
                break;
            case "hex-color":
                if (!validator.isHexColor(text)) {
                    is_valid = false;
                }
                break;
            case "identity-card":
                if (!validator.isIdentityCard(text, this.getLocale())) {
                    is_valid = false;
                }
                break;
            case "credit-card":
                if (!validator.isCreditCard(text)) {
                    is_valid = false;
                }
                break;
            case "url":
                if (!validator.isURL(text)) {
                    is_valid = false;
                }
                break;
            case "numeric":
                if (!validator.isNumeric(text)) {
                    is_valid = false;
                }
                break;
            case "integer":
            case "int":
                if (!validator.isNumeric(text)) {
                    is_valid = false;
                }
                break;
            case "float":
                if (!validator.isFloat(text)) {
                    is_valid = false;
                }
                break;
            case "decimal":
                if (!validator.isDecimal(text)) {
                    is_valid = false;
                }
                break;
            case "alpha":
                if (!validator.isAlpha(text)) {
                    is_valid = false;
                }
                break;
            case "alphanumeric":
                if (!validator.isAlphanumeric(text)) {
                    is_valid = false;
                }
                break;
            default:
                is_valid = !(this.props.required);
                break;
        }

        if (validator.isEmpty(text)){
            is_valid = !(this.props.required);
        }

        return is_valid;
    }

    /**
     * Validate
     * @param _text
     */
    validate(_text) {
        let text = this.parseValue(_text != null ? _text : this.state.value);
        let is_valid = this.isValid(text);
        this.setState({value: text, validated: is_valid});
    }

    /**
     * Blur
     */
    blur() {
        this.input.blur();
        Keyboard.dismiss();
    }

    /**
     * On Focus
     * @param event
     * @param refName
     */
    onFocus(event, refName) {
        this.setState({dirty: true});
        if (this.props.onFocus) {
            this.props.onFocus(event, refName);
        }

    }

    /**
     * On Blur
     */
    onBlur() {
        Keyboard.dismiss();
        if (this.state.value == null || validator.isEmpty(this.state.value)) {
            this.setState({dirty: false});
        }
        if (this.props.onBlur) {
            this.props.onBlur(arguments);
        }
    }

    /**
     * On Change Text
     * @param text
     */
    onChangeText(text) {
        this.validate(text);
        if (this.props.onChangeText) {
            this.props.onChangeText(text);
        }
    }

    /**
     * On ending Editing
     * @param event
     */
    onEndEditing(event) {
        Keyboard.dismiss();
        if (this.props.onEndEditing) {
            this.props.onEndEditing(event);
        }
    }

    /**
     * Is focused
     * @returns {*}
     */
    isFocused(){
        return this.input.isFocused();
    }

    /**
     * Render
     * @returns {*}
     */
    render() {

        let validStyle = (this.props.styleValid ? this.props.validStyle : Style.valid);
        let invalidStyle = (this.props.styleInvalid ? this.props.invalidStyle : Style.invalid);

        let props = {
            ...this.props,
            onBlur: this.onBlur.bind(this),
            onChangeText: this.onChangeText.bind(this),
            onEndEditing: this.onEndEditing.bind(this),
            onFocus: this.onFocus.bind(this),
            password: this.props.secureTextEntry || this.props.password, // Compatibility
            secureTextEntry: this.props.secureTextEntry || this.props.password, // Compatibility
            style: [Style.input, this.props.style],
        };

        if(!validator.isEmpty(this.parseValue(this.state.value))){
            props.style.push(this.state.validated ? validStyle : invalidStyle);
        }

        let keyboardType = "default";

        if (this.props.type) {
            switch (this.props.type) {
                case "email":
                    keyboardType = "email-address";
                    break;
                case "numeric":
                    keyboardType = "numeric";
                    break;
                case "float":
                case "decimal":
                    keyboardType = "decimal-pad";
                    break;
                case "phone":
                    keyboardType = "phone-pad";
                    break;
            }
        }

        delete props.children;
        delete props.ref;

        if (props.editable === false) {
            props.pointerEvents = "none";
        }

        return (
            <TextInput
                ref={(r) => {
                    this.input = r;
                }}
                keyboardType={keyboardType}
                autoFocus={false}
                underlineColorAndroid={'transparent'}
                {...props}/>
        );
    }
}

InputText.propTypes = {
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onChangeText: PropTypes.func,
    onEndEditing: PropTypes.func,
    password: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
};

InputText.defaultProps = {
    type: 'default',
    value: '',
};

export default InputText;