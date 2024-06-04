import React, { useState, useMemo, useEffect } from 'react';
import { Box, Flex, useToast, useDisclosure } from "@chakra-ui/react";
import TextInput from '../../../../components/TextInput';
import Button from '../../../../components/Button';
import Link from '../../../../components/Link';
import { LIST_MEASURE_UNIT, LIST_PLANTA, LIST_SOIL_TYPE, POST_SENSOR } from '../../../../constants/apiRoutes';
import axios from 'axios';
import { useRouter } from 'next/router';
import Panel from '../../../../components/Panel';
import { isNullOrEmpty } from '../../../../utils/validate';
import CoordinateInput from "../../../../components/CoordinateInput";
import Modal from "../../../../components/Modal";
import dynamic from "next/dynamic";
import SelectData from '../../../../components/SelectData';

const PlantAddPage = () => {

    const router = useRouter();

    const toast = useToast();

    const [campos, setCampos] = useState({
        nome: "",
        descricao: "",
        unidadeMedidaId: null,
        tipoSoloId: null,
        plantaId: null,
        latitude: 0,
        longitude: 0
    });

    const [loading, setLoading] = useState(false);
    const [unidadeMedidas, setUnidadeMedidas] = useState([]);
    const [loadingUnidadeMedidas, setLoadingUnidadeMedidas] = useState(false);
    const [plantas, setPlantas] = useState([]);
    const [loadingPlantas, setLoadingPlantas] = useState(false);
    const [tipoSolos, setTipoSolos] = useState([]);
    const [loadingTipoSolos, setLoadingTipoSolos] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleChange = (value, name) => {
        setCampos((prevCampos) => ({
            ...prevCampos,
            [name]: value
        }));
    }

    const isInvalidForm = () => {
        return isNullOrEmpty(campos.nome) || isNullOrEmpty(campos.descricao);
    }

    useEffect(() => {
        const fetchData = () => {
            getPlantas();
            getTipoSolos();
            getUnidadeMedidas();
        }
        fetchData();
    }, []);

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

    const getUnidadeMedidas = async () => {
        setLoadingUnidadeMedidas(true);
        try {
            const response = await axios.get(LIST_MEASURE_UNIT);
            setUnidadeMedidas(response.data.rows);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingUnidadeMedidas(false);
        }
    };

    const postData = async () => {
        console.log(campos);
        try {
            setLoading(true);
            toast({
                title: "Adicionando sensor...",
                status: "info",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
                variant: "left-accent"
            });
            const response = await axios.post(POST_SENSOR, campos);
            if (response.data.status === 1)
                toast({
                    title: "Sensor Adicionado com sucesso",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-right",
                    variant: "left-accent"
                })
            else if (response.data.status === -1)
                toast({
                    title: "Erro ao adicionar sensor",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-right",
                    variant: "left-accent"
                });
        } catch (error) {
            console.error('Error inserting data:', error);
            toast({
                title: "Erro ao atualizar sensor",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
                variant: "left-accent"
            });
        } finally {
            setLoading(false);
            router.push('/sensor/search');
        }
    }

    const fixValue = (value, name) => {
        handleChange(value?.toFixed(6), name);
    }

    const DynamicMapComponent = useMemo(() => isOpen ? dynamic(
        () => import('../../../../components/Map'),
        { ssr: false }
    ) : null, [isOpen]);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                header={"Mapear Campos"}
                body={DynamicMapComponent && (
                    <DynamicMapComponent
                        latitude={campos.latitude}
                        setLatitude={(e) => fixValue(e, 'latitude')}
                        longitude={campos.longitude}
                        setLongitude={(e) => fixValue(e, 'longitude')}
                    />
                )}
            />
            <Flex w={"100%"} direction={"column"} align={"center"} justify={"flex-start"}>
                <Panel>
                    <Flex padding={"10px"} gap='10px' direction={"column"} >
                        <Flex direction={'row'} wrap={'wrap'} gap={"10px"}>
                            <Box style={{ flexGrow: 1, flexBasis: 200 }}>
                                <TextInput label={"Nome do Sensor"} isRequired placeholder="Informe o Nome" value={campos.nome} onChange={(e) => handleChange(e.target.value, 'nome')} />
                            </Box>
                            <Box style={{ flexGrow: 1, flexBasis: 200 }}>
                                <TextInput label={"Descrição do Sensor"} isRequired placeholder="Informe a descrição" value={campos.descricao} onChange={(e) => handleChange(e.target.value, 'descricao')} />
                            </Box>
                            <Box style={{ flexGrow: 1, flexBasis: 200 }}>
                                <CoordinateInput label={"Latitude"} placeholder={"Informe a latitude"} value={campos.latitude} onChange={(e) => fixValue(e, 'latitude')} onClick={onOpen} />
                            </Box>
                            <Box style={{ flexGrow: 1, flexBasis: 200 }}>
                                <CoordinateInput label={"Longitude"} placeholder={"Informe a longitude"} value={campos.longitude} onChange={(e) => fixValue(e, 'longitude')} onClick={onOpen} />
                            </Box>
                            <Box style={{ flexGrow: 1, flexBasis: 200 }}>
                                <SelectData
                                    options={unidadeMedidas}
                                    value={campos.unidadeMedidaId}
                                    label={'Unidade de Medida'}
                                    placeholder={'Selecione a unidade de medida'}
                                    loading={loadingUnidadeMedidas}
                                    onChange={(e) => handleChange(e?.value, "unidadeMedidaId")}
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
                    </Flex>
                </Panel>
                <Panel>
                    <Flex gap="20px" direction={"row"} p={"10px"} justify={"flex-start"} spacing={4}>
                        <Button isDisabled={isInvalidForm()} onClick={postData} type="submit" isLoading={loading}>Adicionar</Button>
                        <Link href="/plant/search">
                            <Button type="cancel" isLoading={loading}>Cancelar</Button>
                        </Link>
                    </Flex>
                </Panel>
            </Flex>
        </>
    );
}

export default PlantAddPage;