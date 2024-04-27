import { Card, CardBody, CardFooter, CardHeader, Flex, Heading } from "@chakra-ui/react";
import Button from '../../components/Button';
import Link from '../../components/Link';
import { isNotNullOrEmpty } from '../../utils/validate';
import { useColorModeValue } from "../../components/ColorModeProvider";
import { BG_DARK_COLOR, BG_LIGHT_COLOR, MENU_TEXT_DARK_COLOR, MENU_TEXT_LIGHT_COLOR } from "../../constants/styleConstants";

const DataCard = (props) => {
  
  const { theme } = useColorModeValue();

  return (
    <Card style={{transition: 'background-color 0.2s'}} bg={theme == 'light' ? BG_LIGHT_COLOR : BG_DARK_COLOR}>
      <CardHeader>
        <Heading style={{ color: theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR }}>{props.heading}</Heading>
      </CardHeader>
      <CardBody>
        {props.children}
      </CardBody>
      <CardFooter>
        <Flex direction={"row"} gap="10px">
          {isNotNullOrEmpty(props.hrefEdit) && (
            <Link href={props.hrefEdit}>
              <Button>
                Editar
              </Button>
            </Link>
          )
          }
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default DataCard;