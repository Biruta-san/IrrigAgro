import { Flex, Text } from '@chakra-ui/react';
import { isNotNullOrEmpty } from '../../utils/validate';
import { useColorModeValue } from '../ColorModeProvider';
import { MENU_TEXT_DARK_COLOR, MENU_TEXT_LIGHT_COLOR } from '../../constants/styleConstants';

const TextDescriptionValue = (props) => {
  
  const { theme } = useColorModeValue();

  return isNotNullOrEmpty(props.value) && (
    <Flex direction={"row"} gap="5px">
      <Text color={theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR}>{props.description}:</Text>
      <Text fontWeight={'normal'} color={theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR}>{props.value}</Text>
    </Flex>
  );
};

export default TextDescriptionValue;