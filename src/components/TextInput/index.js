import React from 'react';
import { Input, Box, Text, Flex } from '@chakra-ui/react'
import { isNullOrEmpty } from '../../utils/validate';
import { useColorModeValue } from '../ColorModeProvider';

const TextInput = ({ 
    value, 
    onChange, 
    label, 
    isRequired, 
    placeholder, 
    mr = 3 
    }) => {
    const {colorMode} = useColorModeValue();

    return (
        <Box flex="1">
            <Flex direction="row" mb={"3px"}>
                <Text>
                    {label}
                </Text>
                <Text color={'crimson'}>
                    {`${isRequired ? '*' : ''}`}
                </Text>
            </Flex>
            <Input
                value={value}
                onChange={onChange}
                variant={'outline'}
                isRequired={isRequired}
                placeholder={placeholder}
                backgroundColor={"white"}
                focusBorderColor={colorMode}
                errorBorderColor='crimson'
                isInvalid={isNullOrEmpty(value) && isRequired}
            />
        </Box>
    );
};

export default TextInput;