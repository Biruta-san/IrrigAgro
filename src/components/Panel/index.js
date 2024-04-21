import { Box } from "@chakra-ui/react";
import { MENU_BG_BORDER_DARK_COLOR, MENU_BG_BORDER_LIGHT_COLOR, PANEL_DARK_COLOR, PANEL_LIGHT_COLOR } from "../../constants/styleConstants";
import { useColorModeValue } from "../ColorModeProvider";

const Panel = ({ children, ...props }) => {

    const { theme } = useColorModeValue();

    return (
        <Box
            m={"10px"}
            w={"90%"}
            border={`1px solid ${theme == 'light' ? MENU_BG_BORDER_LIGHT_COLOR : MENU_BG_BORDER_DARK_COLOR}`}
            backgroundColor={theme == 'light' ? PANEL_LIGHT_COLOR : PANEL_DARK_COLOR}
            style={{ transition: 'background-color 0.2s' }}
            borderRadius={"10px"}
            {...props}
        >
            {children}
        </Box>);
}

export default Panel;