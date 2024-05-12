import { IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../ColorModeProvider";
import { BG_DARK_COLOR, BG_LIGHT_COLOR, MENU_TEXT_LIGHT_COLOR, MENU_TEXT_DARK_COLOR, MENU_BG_BORDER_LIGHT_COLOR, MENU_BG_BORDER_DARK_COLOR } from "../../constants/styleConstants";

const PopoverMenu = ({ OpenIcon, MenuItens }) => {

    const { theme, colorMode } = useColorModeValue();

    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<OpenIcon />}
                variant='outline'
                border={'none'}
                transition={'background-color 0.2s'}
                bg={'transparent'}
                color={colorMode}
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
            <MenuList bg={theme == 'light' ? BG_LIGHT_COLOR : BG_DARK_COLOR} borderColor={theme == 'light' ? MENU_BG_BORDER_LIGHT_COLOR : MENU_BG_BORDER_DARK_COLOR}>
                {
                    MenuItens.map((item, index) => {
                        return (
                            <MenuItem
                                bg={theme == 'light' ? BG_LIGHT_COLOR : BG_DARK_COLOR}
                                onClick={item.onClick}
                                key={index}
                                transition={'background-color 0.2s'}
                                icon={<item.icon color={colorMode} />}
                            >
                                <Text color={theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR}>
                                    {item.text}
                                </Text>
                            </MenuItem>
                        );
                    })
                }
            </MenuList>
        </Menu>
    );
}

export default PopoverMenu;