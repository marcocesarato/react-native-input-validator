import React, {Component} from 'react';
import {Animated, Easing, Keyboard, TextInput, TouchableOpacity} from 'react-native';
import {Palette, Style, CleanStyle, DirtyStyle} from "./style";
import validator from "validator";

/**
 * Text Input Validator
 * @author Marco Cesarato <cesarato.developer@gmail.com>
 */
class InputValidator extends Component {

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
            dirty: (value || this.props.placeholder),
            inputStyle: {
                borderBottomColor: "#ccc"
            },
        };

        this.style = this.state.dirty ? DirtyStyle : CleanStyle;

        this.state.labelStyle = {
            fontSize: new Animated.Value(this.style.fontSize),
            top: new Animated.Value(this.style.top)
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
     * Get input type
     * @returns {string}
     */
    getType(){
        return (this.props.type != null ? this.props.type : "");
    }

    /**
     * Get Label Style
     * @returns {{fontSize: *|AnimatedValue|AnimatedImplementation.Value, top: *|AnimatedValue|AnimatedImplementation.Value}}
     */
    getLabelStyle(){
        return {
            fontSize: new Animated.Value(this.state.style.fontSize),
            top: new Animated.Value(this.state.style.top)
        };
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
                if (!validator.isMobilePhone(text, 'any')) {
                    is_valid = false;
                }
                break;
            case "postal-code":
                if (!validator.isPostalCode(text, 'any')) {
                    is_valid = false;
                }
                break;
            case "numeric":
                if (!validator.isInt(text)) {
                    is_valid = false;
                }
                break;
            default:
                is_valid = !(this.props.required);
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

        this.setState({value: text, dirty: (text != null && !validator.isEmpty(text) || this.input.isFocused())});
        this.animate((text != null && !validator.isEmpty(text) || this.input.isFocused()));

        let is_valid = this.isValid(text);

        let labelStyle = {...this.state.labelStyle};
        let inputStyle = {...this.state.inputStyle};

        if (is_valid === false) {
            inputStyle.borderBottomColor = Palette.dangerColor;
            labelStyle.color = Palette.dangerColor;
        } else if (text != null && !validator.isEmpty(text) && is_valid === true) {
            inputStyle.borderBottomColor = Palette.successColor;
            labelStyle.color = Palette.successColor;
        } else {
            inputStyle.borderBottomColor = "#ccc";
            labelStyle.color = "#AAA";
        }

        this.setState({labelStyle: labelStyle, inputStyle: inputStyle, validated: is_valid});
    }

    /**
     * Animate floating label
     * @param dirty
     */
    animate(dirty) {
        let nextStyle = dirty ? DirtyStyle : CleanStyle;
        let labelStyle = this.state.labelStyle;
        let anims = Object.keys(nextStyle).map(prop => {
            return Animated.timing(
                labelStyle[prop],
                {
                    toValue: nextStyle[prop],
                    duration: 200
                },
                Easing.ease
            )
        });

        Animated.parallel(anims).start()
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
        this.animate(true);
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
            this.animate(false);
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
     * Render label
     * @returns {*}
     */
    renderLabel() {
        return (
            <Animated.Text
                ref='label'
                pointerEvents={"none"}
                numberOfLines={this.props.numberOfLines}
                style={[Style.label, this.props.labelStyle, this.state.labelStyle]}>
                {this.props.children} {this.props.required ? "(*)" : ""}
            </Animated.Text>
        )
    }

    /**
     * Render
     * @returns {*}
     */
    render() {

        let props = {
            ...this.props,
            onBlur: this.onBlur.bind(this),
            onChangeText: this.onChangeText.bind(this),
            onEndEditing: this.onEndEditing.bind(this),
            onFocus: this.onFocus.bind(this),
            password: this.props.secureTextEntry || this.props.password, // Compatibility
            secureTextEntry: this.props.secureTextEntry || this.props.password, // Compatibility
            style: [Style.input, this.state.inputStyle],
        }, elementStyles = [Style.element];

        if (this.props.inputStyle) {
            props.style.push(this.props.inputStyle);
        }

        if (this.props.style) {
            elementStyles.push(this.props.style);
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
                case "phone":
                    keyboardType = "phone-pad";
                    break;
            }
        }

        let onPress = props.onTouchStart;

        delete props.children;
        delete props.placeholder;
        delete props.inputStyle;
        delete props.labelStyle;
        delete props.onTouchStart;

        if (props.editable === false)
            props.pointerEvents = "none";

        return (
            <View style={elementStyles}>
                {this.renderLabel()}
                <TextInput
                    ref={(r) => {
                        this.input = r;
                    }}
                    keyboardType={keyboardType}
                    autoFocus={false}
                    {...props}
                    underlineColorAndroid={'transparent'}>
                </TextInput>
            </View>
        );
    }
}

export default InputValidator;