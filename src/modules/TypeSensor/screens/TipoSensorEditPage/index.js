import { Box, Flex, useToast } from "@chakra-ui/react";
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Button from '../../../../components/Button';
import Link from '../../../../components/Link';
import TextInput from '../../../../components/TextInput';
import { BASE_ROUTE_SENSOR_TYPE, LIST_MEASURE_UNIT } from '../../../../constants/apiRoutes';
import Panel from "../../../../components/Panel";
import { isNullOrEmpty } from "../../../../utils/validate";
import SelectData from "../../../../components/SelectData";

const TipoSensorEditPage = ({ id, nome, descricao, unidadeMedidaId }) => {

    const router = useRouter();

    const toast = useToast();

    const [campos, setCampos] = useState({
        id: id,
        nome: nome,
        descricao: descricao,
        unidadeMedidaId: unidadeMedidaId
    });

    const [loading, setLoading] = useState(false);
    const [unidadeMedidas, setUnidadeMedidas] = useState([]);
    const [unidadeMedidaLoading, setUnidadeMedidaLoading] = useState(false);

    const handleChange = (value, name) => {
        setCampos({
            ...campos,
            [name]: value
        });
    }

    useEffect(() => {
        getUnidadeMedidas();
    }, []);

    const getUnidadeMedidas = async () => {
        setUnidadeMedidaLoading(true);
        try {
            const response = await axios.get(LIST_MEASURE_UNIT);
            setUnidadeMedidas(response.data.rows);
        } catch (error) {
            console.error('Error inserting data:', error);
        } finally {
            setUnidadeMedidaLoading(false);
        }
    }


    const isInvalidForm = () => {
        return isNullOrEmpty(campos.nome) || isNullOrEmpty(campos.descricao) || isNullOrEmpty(campos.unidadeMedidaId);
    }

    const putData = async () => {
        try {
            setLoading(true);
            toast({
                title: "Atualizando tipo de sensor...",
                status: "info",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
                variant: "left-accent"
            });
            const response = await axios.put(`${BASE_ROUTE_SENSOR_TYPE}/${campos.id}`, campos);
            if (response?.data?.status === 1)
                toast({
                    title: "Tipo de sensor atualizado com sucesso",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-right",
                    variant: "left-accent"
                })
            else if (response?.data?.status === -1)
                toast({
                    title: "Erro ao atualizar tipo de sensor",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-right",
                    variant: "left-accent"
                });
        } catch (error) {
            console.error('Error inserting data:', error);
            toast({
                title: "Erro ao atualizar tipo de sensor",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
                variant: "left-accent"
            });
        } finally {
            setLoading(false);
            router.push('/sensorType/search');
        }
    }

    return (
        <Flex w={"100%"} direction={"column"} align={"center"} justify={"flex-start"}>
            <Panel>
                <Flex padding={"10px"} gap='10px' direction={"column"} >
                    <Flex direction={'row'} wrap={'wrap'} gap={"10px"}>
                        <Box style={{ flexGrow: 1, flexBasis: 200 }}>
                            <TextInput value={campos.nome} onChange={(e) => handleChange(e.target.value, "nome")} label={"Nome"} />
                        </Box>
                        <Box style={{ flexGrow: 1, flexBasis: 200 }}>
                            <TextInput value={campos.descricao} onChange={(e) => handleChange(e.target.value, "descricao")} label={"Descricao"} />
                        </Box>
                        <Box style={{ flexGrow: 1, flexBasis: 200 }}>
                            <SelectData
                                options={unidadeMedidas}
                                value={campos.unidadeMedidaId}
                                isRequired={true}
                                label={'Unidade de Medida'}
                                placeholder={'Selecione a unidade'}
                                loading={unidadeMedidaLoading}
                                onChange={(e) => handleChange(e?.value, "unidadeMedidaId")}
                            />
                        </Box>
                    </Flex>
                </Flex>
            </Panel>
            <Panel>
                <Flex gap="20px" direction={"row"} p={"10px"} justify={"flex-start"} spacing={4}>
                    <Button isDisabled={isInvalidForm()} onClick={putData} type="submit" isLoading={loading}>Atualizar</Button>
                    <Link href="/sensorType/search">
                        <Button type="cancel" isLoading={loading}>Cancelar</Button>
                    </Link>
                </Flex>
            </Panel>
        </Flex>
    );
}

export default TipoSensorEditPage;