import { Box, Flex, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from '../../../../components/Button';
import Link from '../../../../components/Link';
import TextInput from '../../../../components/TextInput';
import { GET_DATA, LIST_PLANTA, LIST_SENSOR, LIST_SENSOR_TYPE, LIST_SOIL_TYPE } from '../../../../constants/apiRoutes';
import { isNotNullOrEmpty, isNullOrEmpty } from '../../../../utils/validate';
import Panel from '../../../../components/Panel';
import SelectData from '../../../../components/SelectData';
import Table from '../../../../components/Table';

const SensorDataSearchPage = () => {

    const toast = useToast();

    const [campos, setCampos] = useState({
        tipoSensorId: null,
        tipoSoloId: null,
        plantaId: null,
        sensorId: null
    });

    const [data, setData] = useState([]);
    const [plantas, setPlantas] = useState([]);
    const [loadingPlantas, setLoadingPlantas] = useState(false);
    const [tipoSolos, setTipoSolos] = useState([]);
    const [loadingTipoSolos, setLoadingTipoSolos] = useState(false);
    const [tipoSensores, setTipoSensores] = useState([]);
    const [loadingTipoSensores, setLoadingTipoSensores] = useState(false);
    const [sensores, setSensores] = useState([]);
    const [loadingSensores, setLoadingSensores] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleChange = (value, name) => {
        setCampos((prevCampos) => ({
            ...prevCampos,
            [name]: isNullOrEmpty(value) ? null : value
        }));
    }

    const inputDateTimeLocalFormat = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        // Formatted string in "YYYY-MM-DDTHH:MM" format
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            getData();
            getPlantas();
            getTipoSolos();
            getTipoSensores();
            getSensores();
        }
        fetchData();
    }, []);

    const getData = async () => {
        try {
            setLoading(true);
            toast({
                title: "Pesquisando dados...",
                status: "info",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
                variant: "left-accent"
            });
            const response = await axios.get(GET_DATA, {
                params: campos
            });

            console.log('response:', response);
            if (response?.data?.status === 1) {
                toast({
                    title: "Dados pesquisados com sucesso",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-right",
                    variant: "left-accent"
                })
                const dataFormated = response?.data?.rows?.map((item) => {
                    return {
                        id: item.DDSE_ID,
                        valorMetrica: item.DDSE_ValorMetrica,
                        dataExecucao: inputDateTimeLocalFormat(item.DDSE_DataExecucao),
                        sensorNome: item.SESO_Descricao,
                        unidadeMedidaSigla: item.UNME_Sigla,
                        tipoSoloNome: item.TPSO_Nome,
                        tipoSensorNome: item.TPSE_Nome,
                        plantaNome: item.PLNT_Nome,
                    }
                });
                setData(dataFormated);
            }
            else if (response?.data?.status === -1) {
                toast({
                    title: "Erro ao pesquisar dados",
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
                title: "Erro ao pesquisar dados",
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
    const getSensores = async () => {
        setLoadingSensores(true);
        try {
            const response = await axios.get(LIST_SENSOR);
            setSensores(response.data.rows);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingSensores(false);
        }
    };

    const columns = [
        {
            label: 'id',
            accessor: 'id',
            hidden: true
        },
        {
            label: 'Sensor',
            accessor: 'sensorNome',
            hidden: false
        },
        {
            label: 'Tipo Sensor',
            accessor: 'tipoSensorNome',
            hidden: false
        },
        {
            label: 'Valor Metrica',
            accessor: 'valorMetrica',
            hidden: false
        },
        {
            label: 'Unidade Medida',
            accessor: 'unidadeMedidaSigla',
            hidden: false
        },
        {
            label: 'Data de Execucao',
            accessor: 'dataExecucao',
            hidden: false
        },
        {
            label: 'Tipo Solo',
            accessor: 'tipoSoloNome',
            hidden: false
        },
        {
            label: 'Planta',
            accessor: 'plantaNome',
            hidden: false
        }
    ];

    return (
        <Flex w={"100%"} direction={"column"} align={"center"} justify={"flex-start"}>
            <Panel>
                <Flex padding={"10px"} gap='10px' direction={"column"} >
                    <Flex direction={'row'} wrap={'wrap'} gap={"10px"}>
                        <Box style={{ flexGrow: 1, flexBasis: 200 }}>
                            <SelectData
                                options={tipoSensores}
                                value={campos.tipoSensorId}
                                label={'Tipo de Sensor'}
                                placeholder={'Selecione o tipo'}
                                loading={loadingTipoSensores}
                                onChange={(e) => handleChange(e?.value, "tipoSensorId")}
                            />
                        </Box>
                        <Box style={{ flexGrow: 1, flexBasis: 200 }}>
                            <SelectData
                                options={sensores}
                                value={campos.sensorId}
                                label={'Sensor'}
                                placeholder={'Selecione o sensor'}
                                loading={loadingSensores}
                                onChange={(e) => handleChange(e?.value, "sensorId")}
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
                    <Box m={"20px"}>
                        <Table
                            columns={columns}
                            data={data}
                            caption="Dados de Sensores"
                        />
                    </Box>
                </Panel>
            )}
        </Flex>
    );
}

export default SensorDataSearchPage;