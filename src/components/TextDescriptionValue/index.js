import { Flex, Text } from '@chakra-ui/react';
import { isNotNullOrEmpty } from '../../utils/validate';

const TextDescriptionValue = (props) => {
  return isNotNullOrEmpty(props.value) && (
    <Flex direction={"row"} gap="3px">
      <Text>{props.description}:</Text>
      <Text>{props.value}</Text>
    </Flex>
  );
};

export default TextDescriptionValue;