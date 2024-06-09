import { SearchIcon, SmallAddIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { Button as ChakraButton, Icon } from "@chakra-ui/react";
import React from "react";
import { useColorModeValue } from "../ColorModeProvider";
import { MENU_TEXT_DARK_COLOR, MENU_TEXT_LIGHT_COLOR } from "../../constants/styleConstants";
import tinycolor from "tinycolor2";
import { IoMdSave } from "react-icons/io";

const Button = (props) => {

    const { children, type, w = "120px" } = props;

    const { colorMode, theme } = useColorModeValue();
    const darkenColor = tinycolor(colorMode).darken().toString();
    const lightenColor = tinycolor(colorMode).lighten().toString();
    const isDark = tinycolor(colorMode).isDark();

    if (props.type == "cancel") {
        return (
            <ChakraButton
                variant={"outline"}
                color={theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR}
                leftIcon={<SmallCloseIcon color="red.500" />}
                borderColor={"red.400"}
                _hover={{ backgroundColor: "red.400" }}
                _active={{ backgroundColor: "red.600" }}
                w={w}
                {...props}
            >
                {props.children}
            </ChakraButton>
        )
    }
    else if (props.type == "submit") {
        return (
            <ChakraButton
                variant={"outline"}
                borderColor={"green.400"}
                color={theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR}
                _hover={{ backgroundColor: "green.400" }}
                _active={{ backgroundColor: "green.600" }}
                leftIcon={<SmallAddIcon color="green.500" />}
                w={w}
                {...props}
            >
                {props.children}
            </ChakraButton>
        )
    }

    else if (props.type == "search") {
        return (
            <ChakraButton
                variant={"outline"}
                color={theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR}
                borderColor={"blue.400"}
                _hover={{ backgroundColor: "blue.400" }}
                _active={{ backgroundColor: "blue.600" }}
                leftIcon={<SearchIcon color="blue.500" />}
                w={w}
                {...props}
            >
                {props.children}
            </ChakraButton>
        );
    }
    
    else if (props.type == "save") {
        return (
            <ChakraButton
                variant={"outline"}
                color={theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR}
                borderColor={colorMode}
                _hover={{ backgroundColor: lightenColor }}
                _active={{ backgroundColor: darkenColor }}
                leftIcon={<Icon as={IoMdSave} color={colorMode} />}
                w={w}
                {...props}
            >
                {props.children}
            </ChakraButton>
        );
    }

    else {
        return (
            <ChakraButton
                color={isDark ? MENU_TEXT_DARK_COLOR : MENU_TEXT_LIGHT_COLOR}
                _hover={{ backgroundColor: lightenColor }}
                _active={{ backgroundColor: darkenColor }}
                backgroundColor={colorMode}
                w={w}
                {...props}
            >
                {props.children}
            </ChakraButton>
        )
    }

}

export default Button;