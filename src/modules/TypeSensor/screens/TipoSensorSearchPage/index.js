import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Flex, Stack, useToast } from '@chakra-ui/react';
import Button from '../../../../components/Button';
import Link from '../../../../components/Link';
import TextInput from '../../../../components/TextInput';
import DataCard from '../../../../patterns/DataCard';
import TextDescriptionValue from '../../../../components/TextDescriptionValue';
import { isNotNullOrEmpty } from '../../../../utils/validate';
import { GET_SENSOR_TYPE, LIST_MEASURE_UNIT } from '../../../../constants/apiRoutes';
import Panel from '../../../../components/Panel';
import SelectData from '../../../../components/SelectData';

const TipoSensorSearchPage = () => {
    const toast = useToast();

    const [campos, setCampos] = useState({
        nome: "",
        descricao: "",
        unidadeMedidaId: 0
    });

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [unidadeMedidas, setUnidadeMedidas] = useState([]);
    const [unidadeMedidaLoading, setUnidadeMedidaLoading] = useState(false);

    const handleChange = (value, name) => {
        setCampos((prevCampos) => ({
            ...prevCampos,
            [name]: value
        }));
    }

    useEffect(() => {
        const fetchData = async () => {
            getData();
            getUnidadeMedidas();
        }
        fetchData();
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

    const getData = async () => {
        try {
            setLoading(true);
            toast({
                title: "Pesquisando tipos de sensores...",
                status: "info",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
                variant: "left-accent"
            });

            const response = await axios.get(GET_SENSOR_TYPE, {
                params: campos
            });

            if (response?.data?.status === 1) {
                toast({
                    title: "Tipos de sensores pesquisados com sucesso",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-right",
                    variant: "left-accent"
                });
                const dataFormatted = response?.data?.rows?.map((item) => ({
                    id: item.TPSE_ID,
                    nome: item.TPSE_Nome,
                    descricao: item.TPSE_Descricao,
                    unidadeMedida: item.UNME_Nome
                }));
                setData(dataFormatted);
            }
            else if (response?.data?.status === -1) {
                toast({
                    title: "Erro ao pesquisar tipos de sensores",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-right",
                    variant: "left-accent"
                });
            }
        } catch (error) {
            console.error('Error inserting data:', error);
            toast({
                title: "Erro ao pesquisar tipos de sensores",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
                variant: "left-accent"
            });
        } finally {
            setLoading(false);
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
                                label={'Unidade de Medida'}
                                placeholder={'Selecione a unidade'}
                                loading={unidadeMedidaLoading}
                                onChange={(e) => handleChange(e?.value, "unidadeMedidaId")}
                            />
                        </Box>
                    </Flex>
                    <Flex direction={'row'} gap={'10px'}>
                        <Button onClick={getData} type="search" isLoading={loading}>Pesquisar</Button>
                        <Link href="/sensorType/add">
                            <Button type="submit">Adicionar</Button>
                        </Link>
                    </Flex>
                </Flex>
            </Panel>
            {isNotNullOrEmpty(data) && (
                <Panel>
                    <Stack m={"20px"} spacing={4}>
                        {
                            data.map((item, index) => (
                                <Box key={index}>
                                    <DataCard hrefEdit={`/sensorType/edit/${item.id}`} heading={item.nome}>
                                        <TextDescriptionValue description={"Descricao"} value={item.descricao} />
                                        <TextDescriptionValue description={"Unidade de Medida"} value={item.unidadeMedida} />
                                    </DataCard>
                                </Box>
                            ))
                        }
                    </Stack>
                </Panel>)}
        </Flex>
    );
}

export default TipoSensorSearchPage;
