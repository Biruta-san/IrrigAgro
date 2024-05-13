import React, { useMemo, useState } from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import TextInput from '../../../../components/TextInput';
import CoordinateInput from "../../../../components/CoordinateInput";
import Modal from "../../../../components/Modal";
import dynamic from "next/dynamic";

const SensorAddPage = () => {

    const [campos, setCampos] = useState({
        nome: '',
        latitude: 0,
        longitude: 0
    });

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    const handleOnChange = (value, index) => {
        setCampos({ ...campos, [index]: value });
    }

    const { isOpen, onOpen, onClose } = useDisclosure();

    const DynamicMapComponent = useMemo(() => isOpen ? dynamic(
        () => import('../../../../components/Map'),
        { ssr: false }
    ) : null, [isOpen]);

    const fixLatitude = (value) => {
        setLatitude(value.toFixed(6));
    }

    const fixLongitude = (value) => {
        setLongitude(value.toFixed(6));
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                header={"Mapear Campos"}
                body={DynamicMapComponent && (
                    <DynamicMapComponent
                        latitude={latitude}
                        setLatitude={fixLatitude}
                        longitude={longitude}
                        setLongitude={fixLongitude}
                    />
                )}
            />
            <Box>
                <TextInput label={"Descrição do Sensor"} isRequired placeholder="Informe o Nome" value={campos.nome} onChange={(e) => handleOnChange(e.target.value, 'nome')} />
                <CoordinateInput label={"teste"} placeholder={"teste"} value={latitude} onChange={(e) => fixLatitude(e)} onClick={onOpen} />
                <CoordinateInput label={"teste"} placeholder={"teste"} value={longitude} onChange={(e) => fixLongitude(e)} onClick={onOpen} />
            </Box>
        </>
    );
}

export default SensorAddPage;