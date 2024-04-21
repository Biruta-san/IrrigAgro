import { Box, Icon, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PASSWORD_BUTTON_TEXT_COLOR } from '../../constants/styleConstants';
import Button from '../Button';
import { useColorModeValue } from '../ColorModeProvider';

const PasswordInput = ({value, onChange, id, onKeyDown }) => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const {colorMode} = useColorModeValue();


    const ShowIcon = () => {
        return <Icon color={'#000'} as={show ? FaEye : FaEyeSlash} />;
    }

    return (
        <Box w='100%'>
            <InputGroup >
                <Input
                    id={id}
                    type={show ? 'text' : 'password'}
                    placeholder='Digite sua senha'
                    focusBorderColor={colorMode}
                    value={value}
                    onChange={(e) => onChange(e)}
                    onKeyDown={onKeyDown}
                />
                <InputRightAddon bg={colorMode}>
                    <Button h={'100%'} onClick={handleClick}>
                        <ShowIcon />
                    </Button>
                </InputRightAddon>
            </InputGroup>
        </Box>
    );
}

export default PasswordInput;