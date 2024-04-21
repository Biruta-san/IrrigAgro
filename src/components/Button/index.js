import { SearchIcon, SmallAddIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { Button as ChakraButton } from "@chakra-ui/react";
import React from "react";
import { useColorModeValue } from "../ColorModeProvider";

const Button = (props) => {

    const { colorMode } = useColorModeValue();

    if(props.type == "cancel") {
        return (
            <ChakraButton
                variant={"outline"}
                leftIcon={<SmallCloseIcon color="red.500"/>}
                borderColor={"red.400"}
                _hover={{backgroundColor: "red.400"}}
                _active={{backgroundColor: "red.600"}}
                minWidth={"50px"}
                maxWidth={"150px"}
                {...props}
            >
                {props.children}
            </ChakraButton>
        )
    }
    else if(props.type == "submit") {
        return (
            <ChakraButton
                variant={"outline"}
                borderColor={"green.400"}
                _hover={{backgroundColor: "green.400"}}
                _active={{backgroundColor: "green.600"}}
                leftIcon={<SmallAddIcon color="green.500"/>}
                minWidth={"50px"}
                maxWidth={"150px"}
                {...props}
            >
                {props.children}
            </ChakraButton>
        )
    }

    else if(props.type == "search"){
        return (
            <ChakraButton
                variant={"outline"}
                borderColor={"blue.400"}
                _hover={{backgroundColor: "blue.400"}}
                _active={{backgroundColor: "blue.600"}}
                leftIcon={<SearchIcon color="blue.500"/>}
                minWidth={"50px"}
                maxWidth={"150px"}
                {...props}
            >
            {props.children}
        </ChakraButton>
        );
    }

    else {
        return (
            <ChakraButton
                backgroundColor={colorMode}
                {...props}
            >
                {props.children}
            </ChakraButton>
        )
    }

}

export default Button;