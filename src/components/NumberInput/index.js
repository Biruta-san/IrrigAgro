import React from 'react';
import { NumberInput as CNumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Box, Text, Flex } from '@chakra-ui/react'
import { isNullOrEmpty } from '../../utils/validate';
import { useColorModeValue } from '../ColorModeProvider';
import { MENU_BG_BORDER_DARK_COLOR, MENU_BG_BORDER_LIGHT_COLOR, MENU_TEXT_DARK_COLOR, MENU_TEXT_LIGHT_COLOR } from '../../constants/styleConstants';

const NumberInput = ({
    value,
    onChange,
    label,
    isRequired,
    placeholder,
    mr = 3
}) => {

    const { colorMode, theme } = useColorModeValue();

    const handleChange = (newValueString) => {
        // Convert the new value from string to number
        const newValue = parseFloat(newValueString);

        // Call the onChange function with the new value
        onChange(newValue);
    };

    return (
        <Box flex="1">
            <Flex direction="row" mb={"3px"}>
                <Text color={theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR}>
                    {label}
                </Text>
                <Text color={'crimson'}>
                    {`${isRequired ? '*' : ''}`}
                </Text>
            </Flex>
            <CNumberInput
                min={0}
                variant={'outline'}
                isRequired={isRequired}
                placeholder={placeholder}
                focusBorderColor={colorMode}
                borderColor={theme == 'light' ? MENU_BG_BORDER_LIGHT_COLOR : MENU_BG_BORDER_DARK_COLOR}
                errorBorderColor='crimson'
                color={theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR}
                isInvalid={isNullOrEmpty(value) && isRequired}
                value={value}
                onChange={handleChange}
            >
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper
                        color={theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR} />
                    <NumberDecrementStepper
                        color={theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR} />
                </NumberInputStepper>

            </CNumberInput>
        </Box>
    );
};

export default NumberInput;