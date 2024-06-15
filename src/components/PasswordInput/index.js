import { Box, Icon, IconButton, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MENU_BG_BORDER_DARK_COLOR, MENU_BG_BORDER_LIGHT_COLOR, MENU_TEXT_DARK_COLOR, MENU_TEXT_LIGHT_COLOR, PLACEHOLDER_TEXT_DARK_COLOR, PLACEHOLDER_TEXT_LIGHT_COLOR } from '../../constants/styleConstants';
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
                    _placeholder={{ color: theme == 'light' ? PLACEHOLDER_TEXT_LIGHT_COLOR : PLACEHOLDER_TEXT_DARK_COLOR }}
                    focusBorderColor={colorMode}
                    borderWidth={'1.5px'}
                    value={value}
                    borderColor={theme == 'light' ? MENU_BG_BORDER_LIGHT_COLOR : MENU_BG_BORDER_DARK_COLOR}
                    color={theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR}
                    onChange={(e) => onChange(e)}
                    onKeyDown={onKeyDown}
                />
                <InputRightAddon minHeight='40px' maxHeight='70px' w='70px' borderColor={theme == 'light' ? MENU_BG_BORDER_LIGHT_COLOR : MENU_BG_BORDER_DARK_COLOR} bg={colorMode}>
                    <IconButton icon={<ShowIcon />} bg={colorMode} border='none' h='100%' w='70px' onClick={handleClick} />
                </InputRightAddon>
            </InputGroup>
        </Box>
    );
}

export default PasswordInput;