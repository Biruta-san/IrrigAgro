import { MENU_BG_COLOR } from '../../constants/colorConstants';
import { Box } from '@chakra-ui/react';
import { useColorModeValue } from "../../components/ColorModeProvider";

const Header = () => {

    const { colorMode, setColorMode } = useColorModeValue();

    return (
        <Box style={{ backgroundColor: MENU_BG_COLOR, padding: "10px" }}>
            <input type="color" value={colorMode} onChange={(e) => setColorMode(e.target.value)} />
        </Box>
    );
}

export default Header;