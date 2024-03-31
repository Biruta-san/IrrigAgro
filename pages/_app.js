import React from "react";
import {
    MENU_ITEM_BG_COLOR,
    MENU_ITEM_BG_COLOR_ACTIVE,
    MENU_ITEM_TEXT_COLOR,
    MENU_ITEM_BG_COLOR_HOVER,
    MENU_ITEM_ICON_COLOR,
    MENU_ITEM_ACTIVE_TEXT_COLOR,
    PASSWORD_ADDON_COLOR,
    PASSWORD_ADDON_COLOR_HOVER,
    PASSWORD_BUTTON_TEXT_COLOR
} from '../src/constants/colorConstants'
import { ChakraProvider, extendTheme, Flex, Center } from "@chakra-ui/react";
import Menu from "../src/patterns/Menu";
import { useRouter } from 'next/router';

const MyApp = ({ Component, pageProps }) => {

    const { pathname } = useRouter();

    const customTheme = extendTheme({
        components: {
            Button: {
                variants: {
                    menuItem: {
                        borderRadius: "10px",
                        bg: MENU_ITEM_BG_COLOR,
                        color: MENU_ITEM_TEXT_COLOR,
                        _focus: {
                            boxShadow: "none",
                            bg: MENU_ITEM_BG_COLOR_ACTIVE,
                            color: MENU_ITEM_ACTIVE_TEXT_COLOR
                        },
                        _hover: {
                            bg: MENU_ITEM_BG_COLOR_HOVER,
                            color: MENU_ITEM_TEXT_COLOR
                        },
                    },
                    menuCollapse: {
                        borderRadius: "5px",
                        bg: MENU_ITEM_BG_COLOR,
                        _hover: {
                            bg: PASSWORD_ADDON_COLOR_HOVER,
                            color: MENU_ITEM_TEXT_COLOR
                        },
                    },
                    addonButton: {
                        bg: PASSWORD_ADDON_COLOR,
                        _hover: {
                            bg: PASSWORD_ADDON_COLOR_HOVER,
                        },
                        _active:{
                            bg: PASSWORD_ADDON_COLOR
                        }
                    },
                    submitButton: {
                        bg: PASSWORD_ADDON_COLOR,
                        color: PASSWORD_BUTTON_TEXT_COLOR,
                        _hover: {
                            bg: PASSWORD_ADDON_COLOR_HOVER,
                        },
                        _active:{
                            bg: PASSWORD_ADDON_COLOR
                        }
                    }
                }
            },
            Icon: {
                variants: {
                    menuItem: {
                        transition: "width 0.5s , height 0.5s",
                        color: MENU_ITEM_ICON_COLOR,
                    }
                }
            },
        }
    });

    return (
        <ChakraProvider theme={customTheme}>
            {(pathname === '/' || pathname === '/register') ? (
                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    minHeight="100vh"
                >
                    <Component {...pageProps} />
                </Flex>
            ) : (
                <Flex direction="row">
                    <Menu />
                    <Component {...pageProps} />
                </Flex>
            )}
        </ChakraProvider>

    );

}

export default MyApp;