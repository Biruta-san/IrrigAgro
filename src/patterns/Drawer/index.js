import { Box, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, IconButton, Drawer as ChakraDrawer, background } from "@chakra-ui/react";
import NaviItem from "../../components/NaviItem";
import { CloseIcon } from "@chakra-ui/icons";
import { MENU_BG_DARK_COLOR, MENU_BG_LIGHT_COLOR } from "../../constants/styleConstants";
import { useColorModeValue } from "../../components/ColorModeProvider";

const Drawer = ({ isOpen, onClose, menuActive, setMenuActive, handleClick, menuRoutes, isLargerThan550 }) => {

    const { colorMode, theme } = useColorModeValue();

    return (
        <ChakraDrawer onCloseComplete={() => setMenuActive(!menuActive)} placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent bg={theme == 'light' ? MENU_BG_LIGHT_COLOR : MENU_BG_DARK_COLOR}>
                <DrawerHeader>
                    <IconButton 
                        variant={"outline"} 
                        color={"red.300"} 
                        borderColor={"red.300"} 
                        _hover={{ backgroundColor: "red.400" }} 
                        _active={{ backgroundColor: "red.500" }} 
                        onClick={handleClick} 
                        icon={<CloseIcon />} 
                    />
                </DrawerHeader>
                <DrawerBody>
                    <Flex gap="10px" direction="column" justify="center" wrap="nowrap" >
                        {menuRoutes.map((menu, index) => (
                            menu.isVisible && (
                                <Box style={{ width: '100%' }} key={index}>
                                    <Flex direction={"column"} justify={"center"}>
                                        <NaviItem
                                            menuActive={menuActive}
                                            isLargerThan550={isLargerThan550}
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
                </DrawerBody>
            </DrawerContent>
        </ChakraDrawer>
    );
}

export default Drawer;