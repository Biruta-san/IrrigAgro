import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Button from '../../../../components/Button';
import Link from '../../../../components/Link';
import NumberInput from '../../../../components/NumberInput';
import TextInput from '../../../../components/TextInput';
import { BASE_ROUTE_PLANTA } from '../../../../constants/apiRoutes';
import { PANEL_COLOR } from '../../../../constants/colorConstants';

const PlantEditPage = ({id, nome, descricao, temperaturaRecomendada, umidadeRecomendada}) => {

    const router = useRouter();

    const [campos, setCampos] = useState({
      id: id,
      nome: nome,
      descricao: descricao,
      temperaturaRecomendada: temperaturaRecomendada,
      umidadeRecomendada: umidadeRecomendada
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (value, name) => {
        setCampos({
            ...campos,
            [name]: value
        });
    }

    const putData = async () => {
        try{
            setLoading(true);
            const response = await axios.put(`${BASE_ROUTE_PLANTA}/${campos.id}`, campos);
        } catch (error) {
            console.error('Error inserting data:', error);
        } finally {
            setLoading(false);
            router.push('/plant/search');
        }
    }

    return (
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
                    <Button onClick={putData} type="submit" isLoading={loading}>Atualizar</Button>
                    <Link href="/plant/search">
                        <Button type="cancel" isLoading={loading}>Cancelar</Button>
                    </Link>
                </Flex>
            </Box>
        </Flex>
    );
}

export default PlantEditPage;