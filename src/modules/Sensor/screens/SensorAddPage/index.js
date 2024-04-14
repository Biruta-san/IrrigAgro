import React, {useState} from "react";
import { Box } from "@chakra-ui/react";
import TextInput from '../../../../components/TextInput';
import NumberInput from "../../../../components/NumberInput";

const SensorAddPage = () => {

    const [campos,setCampos] = useState({
        nome:'',
        latitude:0,
        longitude:0
    });

    const handleOnChange = (value, index) => {
        setCampos({...campos, [index]: value});
    }

    return(
        <Box>
            <TextInput label={"Descrição do Sensor"} isRequired placeholder="Informe o Nome" value={campos.nome} onChange={(e) => handleOnChange(e.target.value, 'nome')} />
            <NumberInput label={"Latitude"} placeholder="Informe a area irrigavel" value={campos.areaIrrigavel} onChange={(e) => handleOnChange(e, 'latitude')}/>
            <NumberInput label={"Longitude"} placeholder="Informe a area total" value={campos.areaTotal} onChange={(e) => handleOnChange(e, 'longitude')}/>
        </Box>
    );
}

export default SensorAddPage;