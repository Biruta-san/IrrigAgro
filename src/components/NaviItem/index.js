import React, { useState, useEffect } from "react";
import { Button, Icon, Fade } from "@chakra-ui/react";
import Link from "../Link";
import styles from './NaviItem.module.css';

const NaviItem = ({ href, children, icon, menuActive }) => {
    const [isDisplayed, setIsDisplayed] = useState(false)

    useEffect(() => {
        if (menuActive) {
            setTimeout(() => { setIsDisplayed(true) }, 200);
        } else {
            setIsDisplayed(false);
        }
    }, [menuActive]);

    return (
        <Link
            href={href}
        >
            <Button
                borderRadius="0px"
                w="100%"
                variant={{ base: "menuItem" }}
                style={{ justifyContent: "flex-start", alignItems: "center" }}
                className={styles.Button}
                leftIcon={<Icon
                    boxSize={menuActive ? "5" : "7"}
                    variant="menuItem"
                    as={icon} />
                }>
                {
                    isDisplayed &&
                    <Fade
                        in={menuActive}
                        className={`${styles.ButtonText}`}
                    >{children}
                    </Fade>
                }
            </Button>
        </Link>
    );
}

export default NaviItem;