import React, { useState } from "react";
import NaviItem from "../../components/NaviItem";
import { HamburgerIcon } from '@chakra-ui/icons';
import { Flex, Button as ChakraButton, Box } from "@chakra-ui/react";
import {
    MENU_BG_COLOR,
    MENU_WIDE_WIDTH,
    MENU_WIDE_WIDTH_COLLAPSED,
    MENU_TRANSITION
} from '../../constants/colorConstants';
import menuRoutes from '../../constants/menuRoutes';
import { useColorModeValue } from "../../components/ColorModeProvider";
import Button from "../../components/Button";

const Menu = ({menuActive, setMenuActive}) => {

    const handleClick = () => {
        setMenuActive(!menuActive);
    }

    const { colorMode, setColorMode } = useColorModeValue();

    return (
        <Box
            bg={MENU_BG_COLOR}
            h='100vh'
            w={menuActive ? MENU_WIDE_WIDTH : MENU_WIDE_WIDTH_COLLAPSED}
            style={{ transition: MENU_TRANSITION }}
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
                            variant={{ base: "menuCollapse" }}
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
        </Box>

    );
}

export default Menu;