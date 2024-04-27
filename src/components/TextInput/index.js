import React from 'react';
import { Input, Box, Text, Flex } from '@chakra-ui/react'
import { isNullOrEmpty } from '../../utils/validate';
import { useColorModeValue } from '../ColorModeProvider';
import { MENU_BG_BORDER_DARK_COLOR, MENU_BG_BORDER_LIGHT_COLOR, MENU_TEXT_DARK_COLOR, MENU_TEXT_LIGHT_COLOR } from '../../constants/styleConstants';

const TextInput = ({ 
    value, 
    onChange, 
    label, 
    isRequired, 
    placeholder, 
    mr = 3 
    }) => {
    const {colorMode, theme} = useColorModeValue();

    return (
        <Box flex="1">
            <Flex direction="row" mb={"3px"} gap="5px">
                <Text color={theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR}>
                    {label}
                </Text>
                <Text color={'red.400'}>
                    {`${isRequired ? '*' : ''}`}
                </Text>
            </Flex>
            <Input
                value={value}
                onChange={onChange}
                variant={'outline'}
                isRequired={isRequired}
                placeholder={placeholder}
                borderColor={theme == 'light' ? MENU_BG_BORDER_LIGHT_COLOR : MENU_BG_BORDER_DARK_COLOR}
                focusBorderColor={colorMode}
                errorBorderColor='red.400'
                color={theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR}
                isInvalid={isNullOrEmpty(value) && isRequired}
            />
        </Box>
    );
};

export default TextInput;