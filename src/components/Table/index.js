import { Box, TableContainer, Table as CTable, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot } from "@chakra-ui/react";
import { useColorModeValue } from "../ColorModeProvider";
import tinycolor from "tinycolor2";
import { 
    BG_DARK_COLOR, 
    BG_LIGHT_COLOR, 
    MENU_BG_BORDER_DARK_COLOR, 
    MENU_BG_BORDER_LIGHT_COLOR, 
    MENU_TEXT_DARK_COLOR, 
    MENU_TEXT_LIGHT_COLOR } 
from "../../constants/styleConstants";
import hexToRgba from "hex-to-rgba";

const Table = ({ columns, data, footer, caption }) => {

    const { theme, colorMode } = useColorModeValue();
    const isDark = tinycolor(colorMode).isDark();
    const color = isDark ? "gray.200" : "gray.700";
    const borderColor = theme == 'light' ? MENU_BG_BORDER_LIGHT_COLOR : MENU_BG_BORDER_DARK_COLOR;
    const rowColor = theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR;
    const rowBackgroundStripedColor = theme == 'light' ? BG_LIGHT_COLOR : BG_DARK_COLOR;
    const rowBackgroundHoverColor = hexToRgba(colorMode, 0.3);

    return (
        <Box>
            <TableContainer style={{ transition: "margin 0.5s, background-color 0.2s"}} border="1px" borderColor={borderColor}>
                <CTable variant='simple'>
                    {caption && <TableCaption color={colorMode}>{caption}</TableCaption>}
                    <Thead>
                        <Tr bg={colorMode}>
                            {columns.map((header, index) => (
                                !header.hidden && <Th borderColor={borderColor} color={color} key={index}>{header.label}</Th>

                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((row, index) => (
                            <Tr style={{transition: "margin 0.5s, background-color 0.2s"}} bg={index % 2 > 0 ? rowBackgroundStripedColor : ''} _hover={{ backgroundColor: rowBackgroundHoverColor }} key={index}>
                                {columns.map((column, index) => (!column.hidden && <Td color={rowColor} fontWeight={'normal'} borderColor={borderColor} key={index}>{row[column.accessor]}</Td>))}
                            </Tr>
                        ))}
                    </Tbody>
                    {footer && (
                        <Tfoot>
                            {footer}
                        </Tfoot>
                    )}
                </CTable>
            </TableContainer>
        </Box>
    );
};

export default Table;