import React, { useState } from "react";
import {
    MENU_ITEM_BG_COLOR,
    MENU_ITEM_BG_COLOR_ACTIVE,
    MENU_ITEM_TEXT_COLOR,
    MENU_ITEM_BG_COLOR_HOVER,
    MENU_ITEM_ICON_COLOR,
    MENU_ITEM_ACTIVE_TEXT_COLOR,
    PASSWORD_ADDON_COLOR,
    PASSWORD_ADDON_COLOR_HOVER,
    PASSWORD_BUTTON_TEXT_COLOR,
    MENU_WIDE_WIDTH,
    MENU_WIDE_WIDTH_COLLAPSED
} from '../src/constants/colorConstants'
import { ChakraProvider, extendTheme, Flex, Center, Grid, GridItem, Box, Text } from "@chakra-ui/react";
import Menu from "../src/patterns/Menu";
import { useRouter } from 'next/router';
import { ColorModeProvider } from "../src/components/ColorModeProvider";
import Header from "../src/patterns/Header";

const MyApp = ({ Component, pageProps }) => {

    const { pathname } = useRouter();

    const [menuActive, setMenuActive] = useState(true);

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
                        _active: {
                            bg: PASSWORD_ADDON_COLOR
                        }
                    },
                    submitButton: {
                        bg: PASSWORD_ADDON_COLOR,
                        color: PASSWORD_BUTTON_TEXT_COLOR,
                        _hover: {
                            bg: PASSWORD_ADDON_COLOR_HOVER,
                        },
                        _active: {
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
            <ColorModeProvider>
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
                    <>
                        <Grid
                            h='100vh'
                            gridTemplateRows={'auto 1fr auto'}
                            gridTemplateColumns={'auto 1fr'}
                            color='blackAlpha.700'
                            fontWeight='bold'
                        >
                            <GridItem rowSpan={2} colSpan={1}>
                                <Menu menuActive={menuActive} setMenuActive={setMenuActive} />
                            </GridItem>

                            <GridItem style={{ marginLeft: menuActive ? MENU_WIDE_WIDTH : MENU_WIDE_WIDTH_COLLAPSED, transition: "margin 0.5s" }} rowSpan={1} colSpan={1}>
                                <Header />
                            </GridItem>
                            <GridItem style={{ marginLeft: menuActive ? MENU_WIDE_WIDTH : MENU_WIDE_WIDTH_COLLAPSED, transition: "margin 0.5s" }} rowSpan={1} colSpan={1}>
                                <Component {...pageProps} />
                            </GridItem>
                        </Grid>
                    </>
                )}
            </ColorModeProvider>
        </ChakraProvider>

    );

}

export default MyApp;