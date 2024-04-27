import React, { useState } from "react";
import {
    MENU_WIDE_WIDTH,
    MENU_WIDE_WIDTH_COLLAPSED,
    BG_LIGHT_COLOR,
    BG_DARK_COLOR
} from '../src/constants/styleConstants'
import { ChakraProvider, Flex, Grid, GridItem, useMediaQuery } from "@chakra-ui/react";
import Menu from "../src/patterns/Menu";
import { useRouter } from 'next/router';
import { ColorModeProvider, useColorModeValue } from "../src/components/ColorModeProvider";
import Header from "../src/patterns/Header";

const MyApp = ({ Component, pageProps }) => {

    const { pathname } = useRouter();

    const [menuActive, setMenuActive] = useState(true);

    const [isLargerThan550] = useMediaQuery('(min-width: 550px)');

    return (
        <ChakraProvider >
            <ColorModeProvider>
                {(pathname === '/' || pathname === '/register') ? (
                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        minHeight="100vh"
                        bg={() => {
                            const { theme } = useColorModeValue();
                            return theme == 'light' ? BG_LIGHT_COLOR : BG_DARK_COLOR
                        }}
                        style={{ transition: "margin 0.5s, background-color 0.2s"}}
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
                                <Menu isLargerThan550={isLargerThan550} menuActive={menuActive} setMenuActive={setMenuActive} />
                            </GridItem>

                            <GridItem  style={{ marginLeft: menuActive && isLargerThan550 ? MENU_WIDE_WIDTH : MENU_WIDE_WIDTH_COLLAPSED, transition: "margin 0.5s" }} rowSpan={1} colSpan={1}>
                                <Header />
                            </GridItem>
                            <GridItem bg={() => {
                                const { theme } = useColorModeValue();
                                return theme == 'light' ? BG_LIGHT_COLOR : BG_DARK_COLOR
                            }} style={{ marginLeft: menuActive && isLargerThan550 ? MENU_WIDE_WIDTH : MENU_WIDE_WIDTH_COLLAPSED, transition: "margin 0.5s, background-color 0.2s" }} rowSpan={1} colSpan={1}>
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