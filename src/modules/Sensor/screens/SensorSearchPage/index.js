import { Box, Flex, Stack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from '../../../../components/Button';
import Link from '../../../../components/Link';
import TextDescriptionValue from '../../../../components/TextDescriptionValue';
import TextInput from '../../../../components/TextInput';
import { GET_SENSORES, LIST_PLANTA, LIST_SENSOR_TYPE, LIST_SOIL_TYPE } from '../../../../constants/apiRoutes';
import DataCard from '../../../../patterns/DataCard';
import { isNotNullOrEmpty, isNullOrEmpty } from '../../../../utils/validate';
import Panel from '../../../../components/Panel';
import SelectData from '../../../../components/SelectData';

const SensorSearchPage = () => {

    const toast = useToast();

    const [campos, setCampos] = useState({
        descricao: "",
        tipoSensorId: null,
        tipoSoloId: null,
        plantaId: null
    });

    const [data, setData] = useState([]);
    const [plantas, setPlantas] = useState([]);
    const [loadingPlantas, setLoadingPlantas] = useState(false);
    const [tipoSolos, setTipoSolos] = useState([]);
    const [loadingTipoSolos, setLoadingTipoSolos] = useState(false);
    const [tipoSensores, setTipoSensores] = useState([]);
    const [loadingTipoSensores, setLoadingTipoSensores] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleChange = (value, name) => {
        setCampos((prevCampos) => ({
            ...prevCampos,
            [name]: isNullOrEmpty(value) ? null : value
        }));
    }

    useEffect(() => {
        const fetchData = async () => {
            getData();
            getPlantas();
            getTipoSolos();
            getTipoSensores();
        }
        fetchData();
    }, []);

    const getData = async () => {
        try {
            setLoading(true);
            toast({
                title: "Pesquisando sensores...",
                status: "info",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
                variant: "left-accent"
            });
            const response = await axios.get(GET_SENSORES, {
                params: campos
            });

            if (response?.data?.status === 1) {
                toast({
                    title: "Sensores pesquisadas com sucesso",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-right",
                    variant: "left-accent"
                })
                const dataFormated = response?.data?.rows?.map((item) => {
                    return {
                        id: item.SESO_ID,
                        nome: item.SESO_Nome,
                        descricao: item.SESO_Descricao,
                        unidadeMedidaId: item.UNME_ID,
                        unidadeMedidaNome: item.UNME_Nome,
                        tipoSoloId: item.TPSO_ID,
                        tipoSoloNome: item.TPSO_Nome,
                        tipoSensorId: item.TPSE_ID,
                        tipoSensorNome: item.TPSE_Nome
                    }
                });
                setData(dataFormated);
            }
            else if (response?.data?.status === -1) {
                toast({
                    title: "Erro ao pesquisar sensores",
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
                title: "Erro ao pesquisar sensores",
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

    const getPlantas = async () => {
        setLoadingPlantas(true);
        try {
            const response = await axios.get(LIST_PLANTA);
            setPlantas(response.data.rows);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingPlantas(false);
        }
    }

    const getTipoSolos = async () => {
        setLoadingTipoSolos(true);
        try {
            const response = await axios.get(LIST_SOIL_TYPE);
            setTipoSolos(response.data.rows);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingTipoSolos(false);
        }
    }

    const getTipoSensores = async () => {
        setLoadingTipoSensores(true);
        try {
            const response = await axios.get(LIST_SENSOR_TYPE);
            setTipoSensores(response.data.rows);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingTipoSensores(false);
        }
    };

    return (
        <Flex w={"100%"} direction={"column"} align={"center"} justify={"flex-start"}>
            <Panel>
                <Flex padding={"10px"} gap='10px' direction={"column"} >
                    <Flex direction={'row'} wrap={'wrap'} gap={"10px"}>
                        <Box style={{ flexGrow: 1, flexBasis: 200 }}>
                            <TextInput
                                value={campos.descricao}
                                onChange={(e) => handleChange(e.target.value, "descricao")}
                                label={"Descricao"}
                                placeholder={'Informe a descrição'}
                            />
                        </Box>
                        <Box style={{ flexGrow: 1, flexBasis: 200 }}>
                            <SelectData
                                options={tipoSensores}
                                value={campos.tipoSensorId}
                                label={'Tipo de Sensor'}
                                placeholder={'Selecione o tipo de sensor'}
                                loading={loadingTipoSensores}
                                onChange={(e) => handleChange(e?.value, "tipoSensorId")}
                            />
                        </Box>
                        <Box style={{ flexGrow: 1, flexBasis: 200 }}>
                            <SelectData
                                options={plantas}
                                value={campos.plantaId}
                                label={'Planta'}
                                placeholder={'Selecione a planta'}
                                loading={loadingPlantas}
                                onChange={(e) => handleChange(e?.value, "plantaId")}
                            />
                        </Box>
                        <Box style={{ flexGrow: 1, flexBasis: 200 }}>
                            <SelectData
                                options={tipoSolos}
                                value={campos.tipoSoloId}
                                label={'Tipo de Solo'}
                                placeholder={'Selecione o tipo de solo'}
                                loading={loadingTipoSolos}
                                onChange={(e) => handleChange(e?.value, "tipoSoloId")}
                            />
                        </Box>
                    </Flex>
                    <Flex direction={'row'} gap={'10px'}>
                        <Button onClick={getData} type="search" isLoading={loading}>Pesquisar</Button>
                        <Link href="/sensor/add">
                            <Button type="submit">Adicionar</Button>
                        </Link>
                    </Flex>
                </Flex>
            </Panel>
            {isNotNullOrEmpty(data) && (
                <Panel>
                    <Stack m={"20px"} spacing={4}>
                        {
                            data.map((item, index) => {
                                return (
                                    <Box key={index}>
                                        <DataCard hrefEdit={`/plant/edit/${item.id}`} heading={item.descricao}>
                                            <TextDescriptionValue description={"Tipo de Sensor"} value={item.tipoSensorNome} />
                                            <TextDescriptionValue description={"Unidade de Medida"} value={item.unidadeMedidaNome} />
                                            <TextDescriptionValue description={"Tipo de Solo"} value={item.tipoSoloNome} />
                                        </DataCard>
                                    </Box>
                                )
                            })
                        }
                    </Stack>
                </Panel>
            )}
        </Flex>
    );
}

export default SensorSearchPage;