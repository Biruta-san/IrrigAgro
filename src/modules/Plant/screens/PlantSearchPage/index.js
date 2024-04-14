import React, { useEffect, useState } from 'react';
import Link from '../../../../components/Link';
import { Card, CardHeader, Heading, CardBody, Text, Stack, Flex, Box, SimpleGrid, CardFooter } from '@chakra-ui/react';
import TextInput from '../../../../components/TextInput';
import NumberInput from '../../../../components/NumberInput';
import Button from '../../../../components/Button';
import { PANEL_COLOR } from '../../../../constants/colorConstants';
import { GET_PLANTAS } from '../../../../constants/apiRoutes';	
import axios from 'axios';

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
            const response = await axios.get(GET_PLANTAS);
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
            console.log(response.data.rows);
        } catch (error) {
            console.error('Error inserting data:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Flex w={"100%"} direction={"column"} align={"center"} justify={"flex-start"}>
                <Box m={"10px"} w={"90%"} backgroundColor={PANEL_COLOR} borderRadius={"10px"}>
                    <SimpleGrid p={"10px"} minChildWidth={"20%"} spacing={4}>
                        <Box>
                            <TextInput value={campos.nome} onChange={(e) => handleChange(e.target.value, "nome")} label={"Nome"} />
                        </Box>
                        <Box>
                            <TextInput value={campos.descricao} onChange={(e) => handleChange(e.target.value, "descricao")} label={"Descricao"} />
                        </Box>
                        <Box>
                            <NumberInput value={campos.umidadeRecomendada} onChange={(e) => handleChange(e, "umidadeRecomendada")} label={"Umidade recomendada"} />
                        </Box>
                        <Box>
                            <NumberInput value={campos.temperaturaRecomendada} onChange={(e) => handleChange(e, "temperaturaRecomendada")} label={"Temperatura recomendada"} />
                        </Box>
                    </SimpleGrid>
                </Box>
                <Box m={"10px"} w={"90%"} backgroundColor={PANEL_COLOR} borderRadius={"10px"}>
                    <Flex gap="20px" direction={"row"} p={"10px"} justify={"flex-start"} spacing={4}>
                        <Button onClick={getData} type="submit" isLoading={loading}>Adicionar</Button>
                        <Link href="/plant/search">
                            <Button type="cancel" isLoading={loading}>Cancelar</Button>
                        </Link>
                    </Flex>
                </Box>
                <Box m={"10px"} w={"90%"} backgroundColor={PANEL_COLOR} borderRadius={"10px"}>
                    <Stack m={"20px"} spacing={4}>
                        {
                            data.map((item, index) => {
                                return (
                                    <Card key={index}>
                                        <CardHeader>
                                            <Heading>{item.nome}</Heading>
                                        </CardHeader>
                                        <CardBody>
                                            <Text>Descrição: {item.descricao}</Text>
                                            <Text>Umidade Recomendada: {item.umidadeRecomendada}</Text>
                                            <Text>Temperatura Recomendada: {item.temperaturaRecomendada}</Text>
                                        </CardBody>
                                        <CardFooter>
                                            <Button>Editar</Button>
                                        </CardFooter>
                                    </Card>
                                )
                            })
                        }
                    </Stack>
                </Box>
            </Flex>


        </>
    );
}

export default PlantSearchPage;