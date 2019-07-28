import React, {Component} from "react";
import {StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';
import TextInput from "react-native-input-validator";

export default class App extends Component {

    constructor(props){
        super(props);

        this.textInput = [];

        this.state = {
            value: "Example of string",
            valueRequired: "",
            valueNumber: 1,
        }
    }

    render(){
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Example{"\n"}react-native-input-validator</Text>
                <TextInput
                    onRef={(r) => {
                        this.textInput[0] = r;
                    }}
                    value={this.state.value}
                    style={styles.input}
                    onChangeText={(text) => {this.setState({value: text})}}>
                    <Text>Default</Text>
                </TextInput>
                <TextInput
                    onRef={(r) => {
                        this.textInput[1] = r;
                    }}
                    value={this.state.valueRequired}
                    required={true}
                    style={styles.input}
                    onChangeText={(text) => {this.setState({valueRequired: text})}}>
                    <Text>Required</Text>
                </TextInput>
                <TextInput
                    onRef={(r) => {
                        this.textInput[2] = r;
                    }}
                    value={this.state.value}
                    style={styles.input}
                    type={"email"}
                    onChangeText={(text) => {this.setState({value: text})}}>
                    <Text>Email</Text>
                </TextInput>
                <TextInput
                    onRef={(r) => {
                        this.textInput[3] = r;
                    }}
                    value={this.state.valueNumber}
                    style={styles.input}
                    type={"numeric"}
                    onChangeText={(text) => {this.setState({valueNumber: text})}}>
                    <Text>Number</Text>
                </TextInput>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        console.log(this.textInput);
                        this.textInput.map((item, i) => {
                           console.log("TextInput " + i, item.isValid());
                        });
                    }}>
                    <Text>Validate</Text>
                </TouchableOpacity>
                <Text>Check validation on console.</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 40,
    },
    title: {
        marginBottom: 40,
        fontSize: 30
    },
    input: {
        flex: 1,
        width: "auto",
        minWidth: 150,
    },
    button: {
        marginTop: 20,
        alignItems: "center",
        padding: 20,
        backgroundColor: "#DDD"
    }
});
