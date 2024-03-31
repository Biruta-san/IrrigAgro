import React, {useState} from 'react';
import { Input, InputGroup, Button, InputRightAddon, Icon, Box } from '@chakra-ui/react';
import { FaEye, FaEyeSlash  } from "react-icons/fa";
import { PASSWORD_ADDON_COLOR } from '../../constants/colorConstants';
import {PASSWORD_BUTTON_TEXT_COLOR} from '../../constants/colorConstants';

const PasswordInput = ({value, onChange, id}) => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const ShowIcon = () => {
        return <Icon color={PASSWORD_BUTTON_TEXT_COLOR} as={show ? FaEye : FaEyeSlash} />;
    }

    return (
        <Box w='100%'>
            <InputGroup >
                <Input
                    id={id}
                    type={show ? 'text' : 'password'}
                    placeholder='Digite sua senha'
                    value={value}
                    onChange={(e) => onChange(e)}
                />
                <InputRightAddon bg={PASSWORD_ADDON_COLOR}>
                    <Button variant={{base: 'addonButton'}} h={'100%'} onClick={handleClick}>
                        <ShowIcon />
                    </Button>
                </InputRightAddon>
            </InputGroup>
        </Box>
    );
}

export default PasswordInput;