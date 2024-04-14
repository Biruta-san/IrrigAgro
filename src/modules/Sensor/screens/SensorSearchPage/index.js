import { Box } from "@chakra-ui/react";
import Link from '../../../../components/Link';
import Button from '../../../../components/Button';

const SensorSearchPage = () => {
    return (
        <Box>
            <Link href="/sensor/add">
                <Button>
                    Adicionar Sensor
                </Button>
            </Link>
        </Box>
    );
};

export default SensorSearchPage;