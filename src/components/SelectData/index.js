import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../ColorModeProvider";
import { isNullOrEmpty } from "../../utils/validate";
import tinycolor from "tinycolor2";
import { BG_DARK_COLOR, BG_LIGHT_COLOR, MENU_BG_BORDER_DARK_COLOR, MENU_BG_BORDER_LIGHT_COLOR, MENU_BG_DARK_COLOR, MENU_BG_LIGHT_COLOR, MENU_TEXT_DARK_COLOR, MENU_TEXT_LIGHT_COLOR, PLACEHOLDER_TEXT_DARK_COLOR, PLACEHOLDER_TEXT_LIGHT_COLOR } from "../../constants/styleConstants";
import Select from 'react-select'

const SelectData = (props) => {
    const { value, onChange, options, placeholder, label, isRequired, loading } = props;

    const { colorMode, theme } = useColorModeValue();

    const darkenColor = tinycolor(colorMode).darken().toString();
    const lightenColor = tinycolor(colorMode).lighten().lighten().toString();
    const isDark = tinycolor(colorMode).isDark();
    const isLightenColorDark = tinycolor(lightenColor).isDark();

    const selectStyles = {
        control: (styles, { isFocused }) => (
            {
                ...styles,
                backgroundColor: theme == 'light' ? MENU_BG_LIGHT_COLOR : MENU_BG_DARK_COLOR,
                color: theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR,
                transition: 'all 0.2s',
                borderColor: isFocused ? colorMode : 
                             isNullOrEmpty(value) && isRequired ? '#f56565' : 
                             theme == 'light' ? MENU_BG_BORDER_LIGHT_COLOR : MENU_BG_BORDER_DARK_COLOR,
                borderWidth: isNullOrEmpty(value) && isRequired ? '2px' : '1.5px',
                minHeight: '40px',
                maxHeight: '70px',
                borderRadius: '5px'
            }
        ),
        option: (styles, { isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isSelected ? colorMode :
                                 isFocused ? lightenColor : theme == 'light' ? BG_LIGHT_COLOR : BG_DARK_COLOR,
                color: isSelected ? isDark ? MENU_TEXT_DARK_COLOR : MENU_TEXT_LIGHT_COLOR :
                       isFocused ? isLightenColorDark ? MENU_TEXT_DARK_COLOR : MENU_TEXT_LIGHT_COLOR : colorMode,
                fontWeight: 'normal'
            }
        },
        menuList: (styles) => ({ ...styles, backgroundColor: theme == 'light' ? BG_LIGHT_COLOR : BG_DARK_COLOR }),
        placeholder: (styles) => ({ ...styles, color: theme == 'light' ? PLACEHOLDER_TEXT_LIGHT_COLOR : PLACEHOLDER_TEXT_DARK_COLOR, fontWeight: 'normal'}),
        singleValue: (styles) => ({ ...styles, color: theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR, fontWeight: 'normal' }),
    }


    return (
        <Box flex="1">
            <Skeleton startColor={lightenColor} endColor={darkenColor} fadeDuration={0.5} isLoaded={!loading}>
                <Flex direction="row" mb={"3px"} gap="5px">
                    <Text color={theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR}>
                        {label}
                    </Text>
                    <Text color={'red.400'}>
                        {`${isRequired ? '*' : ''}`}
                    </Text>
                </Flex>
            </Skeleton>
            <Skeleton startColor={lightenColor} endColor={darkenColor} fadeDuration={0.5} isLoaded={!loading}>
                <Select
                    placeholder={placeholder}
                    theme={
                        (theme) => (
                            {
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary: colorMode,
                                    primary25: lightenColor
                                }
                            }
                        )}
                    styles={selectStyles}
                    isClearable={true}
                    onChange={onChange}
                    options={options}
                    isInvalid={isNullOrEmpty(value) && isRequired}
                />
            </Skeleton>
        </Box>
    );
}

export default SelectData;