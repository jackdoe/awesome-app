import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
var font_size_base = 20;
var dark = {
    PRIMARY_COLOR: '#c9c9c9',
    FONT_SIZE_SMALL: font_size_base - 4,
    FONT_SIZE_MEDIUM: font_size_base,
    FONT_SIZE_LARGE: font_size_base + 4,
    FONT_WEIGHT_LIGHT: '100',
    FONT_WEIGHT_MEDIUM: '200',
    FONT_WEIGHT_BOLD: '500',
    BACKGROUND_COLOR_LIGHT: '#000',
    CONTAINER_PADDING: 20,
    FONT_FAMILY: 'Verdana'

};

var light = {
    PRIMARY_COLOR: '#2aabb8',
    FONT_SIZE_SMALL: font_size_base - 4,
    FONT_SIZE_MEDIUM: font_size_base,
    FONT_SIZE_LARGE: font_size_base + 4,
    FONT_WEIGHT_LIGHT: '100',
    FONT_WEIGHT_MEDIUM: '200',
    FONT_WEIGHT_BOLD: '400',
    BACKGROUND_COLOR_LIGHT: '#f0f6f7',
    CONTAINER_PADDING: 20,
    FONT_FAMILY: 'Menlo'
};

var getStyle = function (theme) {
    return StyleSheet.create({
        small_bold: {
            fontSize: theme.FONT_SIZE_SMALL,
            fontWeight: theme.FONT_WEIGHT_BOLD,
            fontFamily: theme.FONT_FAMILY,
            color: theme.PRIMARY_COLOR,
            margin: 10
        },

        nav_container: {
            backgroundColor: theme.BACKGROUND_COLOR_LIGHT,
            height: 30,
            borderTopColor: "transparent"
        },
        nav_text: {
            fontSize: theme.FONT_SIZE_SMALL,
            fontWeight: theme.FONT_WEIGHT_MEDIUM,
            fontFamily: theme.FONT_FAMILY
        },

        nav_inactive: {
            color: theme.PRIMARY_COLOR + '88'
        },
        nav_active: {
            color: theme.PRIMARY_COLOR
        },

        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.BACKGROUND_COLOR_LIGHT,
            paddingVertical: theme.CONTAINER_PADDING
        },

        large: {
            fontSize: theme.FONT_SIZE_LARGE,
            fontWeight: theme.FONT_WEIGHT_MEDIUM,
            fontFamily: theme.FONT_FAMILY,
            color: theme.PRIMARY_COLOR,
            margin: 10
        },

        small: {
            fontSize: theme.FONT_SIZE_SMALL,
            fontWeight: theme.FONT_WEIGHT_MEDIUM,
            fontFamily: theme.FONT_FAMILY,
            color: theme.PRIMARY_COLOR,
            margin: 10
        }
    });
}

var themes = {
    dark: getStyle(dark),
    light: getStyle(light)
}
export default themes