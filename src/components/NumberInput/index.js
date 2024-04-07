import React from 'react';
import { NumberInput as CNumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Box, Text, Flex } from '@chakra-ui/react'
import { isNullOrEmpty } from '../../utils/validate';

const NumberInput = ({
    value,
    onChange,
    label,
    isRequired,
    placeholder,
    mr = 3
}) => {

    const handleChange = (newValueString) => {
        // Convert the new value from string to number
        const newValue = parseFloat(newValueString);
        
        // Call the onChange function with the new value
        onChange(newValue);
    };

    return (
        <Box mr={mr} flex="1">
            <Flex direction="row" mb={"3px"}>
                <Text>
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
                focusBorderColor={"green.400"}
                errorBorderColor='crimson'
                isInvalid={isNullOrEmpty(value) && isRequired}
                value={value}
                onChange={handleChange}
            >
                <NumberInputField
                />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>

            </CNumberInput>
        </Box>
    );
};

export default NumberInput;