import { Box, Icon, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MENU_TEXT_DARK_COLOR, MENU_TEXT_LIGHT_COLOR } from '../../constants/styleConstants';
import Button from '../Button';
import { useColorModeValue } from '../ColorModeProvider';

const PasswordInput = ({ value, onChange, id, onKeyDown }) => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const { colorMode, theme } = useColorModeValue();


    const ShowIcon = () => {
        return <Icon color={theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR} as={show ? FaEye : FaEyeSlash} />;
    }

    return (
        <Box w='100%'>
            <InputGroup >
                <Input
                    id={id}
                    minHeight='40px'
                    maxHeight='70px'
                    borderRadius={'5px'}
                    type={show ? 'text' : 'password'}
                    placeholder='Digite sua senha'
                    focusBorderColor={colorMode}
                    borderWidth={'1.5px'}
                    value={value}
                    color={theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR}
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