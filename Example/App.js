import React, {Component} from "react";
import {StyleSheet, Text, ScrollView} from 'react-native';
import TextInput from "react-native-input-validator";

export default class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: "Example of string",
        }
    }

    render(){
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Example{"\n"}react-native-input-validator</Text>
                <TextInput
                    value={this.state.value}
                    style={styles.input}
                    type={"email"}
                    onChangeText={(text) => {this.setState({value: text})}}>
                    <Text>Default</Text>
                </TextInput>
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
    }
});
