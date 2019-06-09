/**
 * Input Validator - Style
 * @author Marco Cesarato <cesarato.developer@gmail.com>
 */

import {StyleSheet} from 'react-native';

export const Style = StyleSheet.create({
    element: {
        position: 'relative',
        flex: 1,
        flexDirection: 'row',
        //alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    input: {
        flex: 1,
        minHeight: 50,
        borderColor: '#FFF',
        borderBottomColor: '#CCC',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        borderWidth: 1,
        color: 'black',
        fontSize: 20,
        borderRadius: 4,
        marginTop: 20,
    },
    label: {
        marginTop: 21,
        color: '#AAA',
        position: 'absolute'
    },
});

export const CleanStyle ={
    fontSize: 20,
    top: 7
};
export const DirtyStyle = {
    fontSize: 12,
    top: -17,
};

export const Palette = {
    danger: "#f04048",
    success: "#25863f"
};