import { Box, Flex, Stack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from '../../../../components/Button';
import Link from '../../../../components/Link';
import TextDescriptionValue from '../../../../components/TextDescriptionValue';
import TextInput from '../../../../components/TextInput';
import DataCard from '../../../../patterns/DataCard';
import { isNotNullOrEmpty } from '../../../../utils/validate';
import Panel from '../../../../components/Panel';
import { GET_SOIL_TYPE } from '../../../../constants/apiRoutes';

const SoilTypeSearchPage = () => {

    const toast = useToast();

    const [campos, setCampos] = useState({
        nome: "",
        descricao: ""
    });

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);

    const handleChange = (value, name) => {
        setCampos({
            ...campos,
            [name]: value
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            await getData();
        }
        fetchData();
    }, []);

    const getData = async () => {
        try {
            setLoading(true);
            toast({
                title: "Pesquisando tipos de solo...",
                status: "info",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
                variant: "left-accent"
            });
            const response = await axios.get(GET_SOIL_TYPE, {
                params: campos
            });
            const dataFormated = response.data.rows.map((item) => {
                return {
                    id: item.TPSO_ID,
                    nome: item.TPSO_Nome,
                    descricao: item.TPSO_Descricao
                }
            });
            if (response.data.status === 1)
                toast({
                    title: "Tipos de solo pesquisados com sucesso",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-right",
                    variant: "left-accent"
                })
            else if (response.data.status === -1)
                toast({
                    title: "Erro ao pesquisar tipos de solo",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-right",
                    variant: "left-accent"
                });
            setData(dataFormated);
        } catch (error) {
            console.error('Error inserting data:', error);
            toast({
                title: "Erro ao pesquisar tipos de solo",
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
                    </Flex>
                    <Flex direction={'row'} gap={'10px'}>
                        <Button onClick={getData} type="search" isLoading={loading}>Pesquisar</Button>
                        <Link href="/soilType/add">
                            <Button onClick={getData} type="submit">Adicionar</Button>
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
                                        <DataCard hrefEdit={`/soilType/edit/${item.id}`} heading={item.nome}>
                                            <TextDescriptionValue description={"Descricao"} value={item.descricao} />
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

export default SoilTypeSearchPage;