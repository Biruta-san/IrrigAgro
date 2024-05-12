import React from 'react';
import { MENU_BG_LIGHT_COLOR, MENU_BG_DARK_COLOR, MENU_BG_BORDER_LIGHT_COLOR, MENU_BG_BORDER_DARK_COLOR, MENU_TEXT_LIGHT_COLOR, MENU_TEXT_DARK_COLOR } from '../../constants/styleConstants';
import { Box, Flex, Icon, IconButton } from '@chakra-ui/react';
import { MdOutlineLogout } from "react-icons/md";
import { useColorModeValue } from "../../components/ColorModeProvider";
import { FaSun, FaMoon } from 'react-icons/fa6';
import { FaUserCircle } from "react-icons/fa";
import PopoverMenu from '../../components/PopoverMenu';
import { useRouter } from 'next/router';


const Header = () => {

    const { colorMode, setColorMode, theme, setTheme } = useColorModeValue();

    const router = useRouter();

    const handleLogout = () => {
        router.push('/');
    }

    const ThemeIcon = () => {
        return (
            <Icon as={theme === 'light' ? FaSun : FaMoon} />
        );
    };

    const handleThemeChange = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    const menuItens = [{
        text: 'Logout',
        icon: MdOutlineLogout,
        onClick: () => handleLogout()
    }]

    return (
        <Flex
            direction={'row'}
            justify={'flex-end'}
            align={"center"}
            gap={"10px"}
            style={{
                backgroundColor: theme == 'light' ? MENU_BG_LIGHT_COLOR : MENU_BG_DARK_COLOR,
                padding: "10px",
                borderBottom: `1px solid ${theme == 'light' ? MENU_BG_BORDER_LIGHT_COLOR : MENU_BG_BORDER_DARK_COLOR}`,
                transition: 'background-color 0.2s'
            }}>
            <Box>
                <input style={{ backgroundColor: theme == 'light' ? MENU_BG_LIGHT_COLOR : MENU_BG_DARK_COLOR, transition: 'background-color 0.2s' }} type="color" value={colorMode} onChange={(e) => setColorMode(e.target.value)} />
            </Box>
            <Box>
                <IconButton
                    transition={'background-color 0.2s'}
                    bg={'transparent'}
                    color={colorMode}
                    onClick={() => handleThemeChange()}
                    icon={<ThemeIcon />}
                    _hover={{
                        backgroundColor: 'transparent'
                    }}
                    _active={{
                        backgroundColor: 'transparent'
                    }}
                    _focus={{
                        backgroundColor: 'transparent'
                    }}
                />
            </Box>
            <Box>
                <PopoverMenu OpenIcon={FaUserCircle} MenuItens={menuItens} />
            </Box>
        </Flex>
    );
}

export default Header;