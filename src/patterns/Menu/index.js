import React, { useState } from "react";
import NaviItem from "../../components/NaviItem";
import { HamburgerIcon } from '@chakra-ui/icons';
import { Flex, Button as ChakraButton, Box } from "@chakra-ui/react";
import {
    MENU_BG_LIGHT_COLOR,
    MENU_BG_DARK_COLOR,
    MENU_WIDE_WIDTH,
    MENU_WIDE_WIDTH_COLLAPSED,
    MENU_TRANSITION,
    MENU_BG_BORDER_LIGHT_COLOR,
    MENU_BG_BORDER_DARK_COLOR,
    MENU_ITEM_ACTIVE_LIGHT_TEXT_COLOR,
    MENU_ITEM_ACTIVE_DARK_TEXT_COLOR,
    MENU_ITEM_BG_LIGHT_COLOR_HOVER,
    MENU_ITEM_BG_DARK_COLOR_HOVER
} from '../../constants/styleConstants';
import menuRoutes from '../../constants/menuRoutes';
import { useColorModeValue } from "../../components/ColorModeProvider";

const Menu = ({ menuActive, setMenuActive }) => {

    const handleClick = () => {
        setMenuActive(!menuActive);
    }

    const { colorMode, theme } = useColorModeValue();

    return (
        <Box
            bg={theme == 'light' ? MENU_BG_LIGHT_COLOR : MENU_BG_DARK_COLOR
            }
            h='100vh'
            w={menuActive ? MENU_WIDE_WIDTH : MENU_WIDE_WIDTH_COLLAPSED}
            style={{ transition: `${MENU_TRANSITION}`, borderRight: `1px solid ${theme == 'light' ? MENU_BG_BORDER_LIGHT_COLOR : MENU_BG_BORDER_DARK_COLOR}`, transition: 'background-color 0.2s' }}
            position={"fixed"}
            display={'block'}
            top={0}
            left={0}
            overflowY={"auto"}
            zIndex={1}
        >

            <Flex gap="10px" direction="column" justify="center" wrap="nowrap" >
                <Box style={{ display: "inline", top: 0, left: 0, paddingLeft: "0.29vw", paddingTop: "1vh" }}>
                    <Flex direction="row" wrap="wrap" align="center">
                        <ChakraButton
                            onClick={handleClick}
                            backgroundColor={theme == 'light' ? MENU_BG_LIGHT_COLOR : MENU_BG_DARK_COLOR}
                            _hover={{
                                backgroundColor: theme == 'light' ? MENU_ITEM_BG_LIGHT_COLOR_HOVER : MENU_ITEM_BG_DARK_COLOR_HOVER,
                                color: theme == 'light' ? MENU_ITEM_ACTIVE_LIGHT_TEXT_COLOR : MENU_ITEM_ACTIVE_DARK_TEXT_COLOR
                            }}
                        >
                            <HamburgerIcon color={colorMode} />
                        </ChakraButton>
                    </Flex>
                </Box>

                {menuRoutes.map((menu, index) => (
                    menu.isVisible && (
                        <Box style={{ width: '100%' }} key={index}>
                            <Flex direction={"column"} justify={"center"}>
                                <NaviItem
                                    menuActive={menuActive}
                                    href={menu.href}
                                    icon={menu.icon}
                                    index={index}
                                    itemActive={menu.itemActive}
                                >
                                    {menu.name}
                                </NaviItem>
                            </Flex>
                        </Box>
                    )
                ))}
            </Flex>
        </Box >

    );
}

export default Menu;