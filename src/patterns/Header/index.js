import React from 'react';
import { MENU_BG_LIGHT_COLOR, MENU_BG_DARK_COLOR, MENU_BG_BORDER_LIGHT_COLOR, MENU_BG_BORDER_DARK_COLOR, MENU_TEXT_LIGHT_COLOR, MENU_TEXT_DARK_COLOR } from '../../constants/styleConstants';
import { Box, Flex, Icon, IconButton, useStatStyles } from '@chakra-ui/react';
import { useColorModeValue } from "../../components/ColorModeProvider";
import { FaSun, FaMoon } from 'react-icons/fa6';


const Header = () => {

    const { colorMode, setColorMode, theme, setTheme } = useColorModeValue();

    const ThemeIcon = () => {
        return (
            <Icon as={theme === 'light' ? FaSun : FaMoon} />
        );
    };

    const handleThemeChange = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

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
                <IconButton transition={'background-color 0.2s'} backgroundColor={theme == 'light' ? MENU_BG_LIGHT_COLOR : MENU_BG_DARK_COLOR} color={theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR} onClick={() => handleThemeChange()} icon={<ThemeIcon />} />
            </Box>
        </Flex>
    );
}

export default Header;