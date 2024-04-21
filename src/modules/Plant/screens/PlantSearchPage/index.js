import { Box, Flex, SimpleGrid, Stack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from '../../../../components/Button';
import Link from '../../../../components/Link';
import NumberInput from '../../../../components/NumberInput';
import TextDescriptionValue from '../../../../components/TextDescriptionValue';
import TextInput from '../../../../components/TextInput';
import { GET_PLANTAS } from '../../../../constants/apiRoutes';
import { PANEL_COLOR } from '../../../../constants/colorConstants';
import DataCard from '../../../../patterns/DataCard';
import { isNotNullOrEmpty } from '../../../../utils/validate';

const PlantSearchPage = () => {

    const [campos, setCampos] = useState({
        nome: "",
        descricao: "",
        umidadeRecomendada: 0,
        temperaturaRecomendada: 0
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

            const response = await axios.get(GET_PLANTAS, {
                params: campos
            });
            const dataFormated = response.data.rows.map((item) => {
                return {
                    id: item.PLNT_ID,
                    nome: item.PLNT_Nome,
                    descricao: item.PLNT_Descricao,
                    umidadeRecomendada: item.PLNT_UmidadeRecomendada,
                    temperaturaRecomendada: item.PLNT_TemperaturaRecomendada
                }
            });
            setData(dataFormated);
        } catch (error) {
            console.error('Error inserting data:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Flex w={"100%"} direction={"column"} align={"center"} justify={"flex-start"}>
            <Box m={"10px"} w={"90%"} backgroundColor={PANEL_COLOR} borderRadius={"10px"}>
                <Flex padding={"10px"} gap='10px' direction={"column"} >
                    <Flex direction={'row'} wrap={'wrap'} gap={"10px"}>
                        <Box style={{ flexGrow: 1, flexBasis: 200 }}>
                            <TextInput value={campos.nome} onChange={(e) => handleChange(e.target.value, "nome")} label={"Nome"} />
                        </Box>
                        <Box style={{ flexGrow: 1, flexBasis: 200 }}>
                            <TextInput value={campos.descricao} onChange={(e) => handleChange(e.target.value, "descricao")} label={"Descricao"} />
                        </Box>
                        <Box style={{ flexGrow: 1, flexBasis: 200 }}>
                            <NumberInput value={campos.umidadeRecomendada} onChange={(e) => handleChange(e, "umidadeRecomendada")} label={"Umidade recomendada"} />
                        </Box>
                        <Box style={{ flexGrow: 1, flexBasis: 200 }}>
                            <NumberInput value={campos.temperaturaRecomendada} onChange={(e) => handleChange(e, "temperaturaRecomendada")} label={"Temperatura recomendada"} />
                        </Box>
                    </Flex>
                    <Flex direction={'row'} gap={'10px'}>
                        <Button onClick={getData} type="search" isLoading={loading}>Pesquisar</Button>
                        <Link href="/plant/add">
                            <Button onClick={getData} type="submit" isLoading={loading}>Adicionar</Button>
                        </Link>
                    </Flex>
                </Flex>
            </Box>
            {isNotNullOrEmpty(data) && <Box m={"10px"} w={"90%"} backgroundColor={PANEL_COLOR} borderRadius={"10px"}>
                <Stack m={"20px"} spacing={4}>
                    {
                        data.map((item, index) => {
                            return (
                                <Box key={index}>
                                    <DataCard hrefEdit={`/plant/edit/${item.id}`} heading={item.nome}>
                                        <TextDescriptionValue description={"Descricao"} value={item.descricao} />
                                        <TextDescriptionValue description={"Temperatura Recomendada"} value={item.umidadeRecomendada} />
                                        <TextDescriptionValue description={"Umidade Recomendada"} value={item.temperaturaRecomendada} />
                                    </DataCard>
                                </Box>
                            )
                        })
                    }
                </Stack>
            </Box>}
        </Flex>
    );
}

export default PlantSearchPage;