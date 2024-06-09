import { Box, Flex, IconButton, InputGroup, InputRightElement, NumberInput, NumberInputField, Text } from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useColorModeValue } from "../ColorModeProvider";
import { MENU_BG_BORDER_DARK_COLOR, MENU_BG_BORDER_LIGHT_COLOR, MENU_TEXT_DARK_COLOR, MENU_TEXT_LIGHT_COLOR } from "../../constants/styleConstants";
import { isNullOrEmpty } from "../../utils/validate";

const CoordinateInput = ({ value, onChange, label, placeholder, isRequired, onClick, ...props }) => {

    const { colorMode, theme } = useColorModeValue();

    const handleChange = (newValueString) => {
        const newValue = parseFloat(newValueString);

        onChange(newValue);
    };

    return (
        <Box flex="1">
            <Flex direction="row" mb={"3px"}>
                <Text color={theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR}>
                    {label}
                </Text>
                <Text color={'crimson'}>
                    {`${isRequired ? '*' : ''}`}
                </Text>
            </Flex>
            <InputGroup>
                <NumberInput
                    variant={'outline'}
                    isRequired={isRequired}
                    minHeight='40px'
                    maxHeight='70px'
                    placeholder={placeholder}
                    borderColor={theme == 'light' ? MENU_BG_BORDER_LIGHT_COLOR : MENU_BG_BORDER_DARK_COLOR}
                    focusBorderColor={colorMode}
                    errorBorderColor='crimson'
                    color={theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR}
                    isInvalid={isNullOrEmpty(value) && isRequired}
                    value={value}
                    onChange={handleChange}
                >
                    <NumberInputField borderWidth={'1.5px'} borderRadius={'5px'}/>
                    <InputRightElement width='4.5rem'>
                        <IconButton
                            onClick={onClick}
                            variant='ghost'
                            icon={<FaMapMarkerAlt />}
                            color={colorMode}
                            _hover={{backgroundColor: 'transparent'}}
                            _focus={{backgroundColor: 'transparent'}}
                        >
                        </IconButton>
                    </InputRightElement>

                </NumberInput>
            </InputGroup>
        </Box>
    );
};

export default CoordinateInput;