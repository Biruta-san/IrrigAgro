import { Card, CardBody, CardFooter, CardHeader, Flex, Heading } from "@chakra-ui/react";
import Button from '../../components/Button';
import Link from '../../components/Link';
import { isNotNullOrEmpty } from '../../utils/validate';

const DataCard = (props) => {
  return(
      <Card>
        <CardHeader>
            <Heading>{props.heading}</Heading>
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