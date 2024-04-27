import React, { useState, useEffect } from "react";
import { Button, Icon, Fade, Text } from "@chakra-ui/react";
import Link from "../Link";
import styles from './NaviItem.module.css';
import { useColorModeValue } from "../ColorModeProvider";
import {
    MENU_BG_DARK_COLOR,
    MENU_BG_LIGHT_COLOR,
    MENU_ITEM_ACTIVE_DARK_TEXT_COLOR,
    MENU_ITEM_ACTIVE_LIGHT_TEXT_COLOR,
    MENU_ITEM_BG_DARK_COLOR_ACTIVE,
    MENU_ITEM_BG_DARK_COLOR_HOVER,
    MENU_ITEM_BG_LIGHT_COLOR_ACTIVE,
    MENU_ITEM_BG_LIGHT_COLOR_HOVER,
    MENU_ITEM_TEXT_DARK_COLOR,
    MENU_ITEM_TEXT_LIGHT_COLOR
} from "../../constants/styleConstants";

const NaviItem = ({ href, children, icon, menuActive, isLargerThan550 }) => {
    const [isDisplayed, setIsDisplayed] = useState(false)
    const { colorMode, theme } = useColorModeValue();

    useEffect(() => {
        if (menuActive && isLargerThan550) {
            setTimeout(() => { setIsDisplayed(true) }, 200);
        } else {
            setIsDisplayed(false);
        }
    }, [menuActive, isLargerThan550]);

    return (
        <Link
            href={href}
        >
            <Button
                borderRadius="0px"
                w="100%"
                bg={theme == 'light' ? MENU_BG_LIGHT_COLOR : MENU_BG_DARK_COLOR}
                _focus={{
                    backgroundColor: theme == 'light' ? MENU_ITEM_BG_LIGHT_COLOR_ACTIVE : MENU_ITEM_BG_DARK_COLOR_ACTIVE,
                    color: theme == 'light' ? MENU_ITEM_ACTIVE_LIGHT_TEXT_COLOR : MENU_ITEM_ACTIVE_DARK_TEXT_COLOR,
                }}
                _hover={{
                    backgroundColor: theme == 'light' ? MENU_ITEM_BG_LIGHT_COLOR_HOVER : MENU_ITEM_BG_DARK_COLOR_HOVER,
                    color: theme == 'light' ? MENU_ITEM_ACTIVE_LIGHT_TEXT_COLOR : MENU_ITEM_ACTIVE_DARK_TEXT_COLOR

                }}
                _before={{ color: theme == 'light' ? MENU_ITEM_TEXT_LIGHT_COLOR : MENU_ITEM_TEXT_DARK_COLOR }}
                style={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                    color: theme == 'light' ? '' : MENU_ITEM_TEXT_DARK_COLOR
                }}
                className={styles.Button}
                leftIcon={
                    <Icon
                        boxSize={menuActive && isLargerThan550 ? "5" : "7"}
                        style={{ transition: "width 0.5s , height 0.5s" }}
                        color={colorMode}
                        as={icon}
                    />
                }>
                {
                    isDisplayed &&
                    <Fade
                        in={menuActive}
                        className={`${styles.ButtonText}`}
                    >{children}
                    </Fade>
                }
                
                {
                    !isDisplayed && !isLargerThan550 &&
                    <Text
                        className={`${styles.ButtonText}`}
                    >{children}
                    </Text>
                }
            </Button>
        </Link >
    );
}

export default NaviItem;