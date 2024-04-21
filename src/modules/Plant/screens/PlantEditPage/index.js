import { Box, Flex, SimpleGrid, useToast } from "@chakra-ui/react";
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Button from '../../../../components/Button';
import Link from '../../../../components/Link';
import NumberInput from '../../../../components/NumberInput';
import TextInput from '../../../../components/TextInput';
import { BASE_ROUTE_PLANTA } from '../../../../constants/apiRoutes';
import Panel from "../../../../components/Panel";

const PlantEditPage = ({ id, nome, descricao, temperaturaRecomendada, umidadeRecomendada }) => {

    const router = useRouter();

    const toast = useToast();

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
        try {
            setLoading(true);
            toast({
                title: "Atualizando planta...",
                status: "info",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
                variant: "left-accent"
            });
            const response = await axios.put(`${BASE_ROUTE_PLANTA}/${campos.id}`, campos);
            if (response.data.status === 1)
                toast({
                    title: "Planta atualizada com sucesso",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-right",
                    variant: "left-accent"
                })
            else if (response.data.status === -1)
                toast({
                    title: "Erro ao atualizar planta",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-right",
                    variant: "left-accent"
                });
        } catch (error) {
            console.error('Error inserting data:', error);
            toast({
                title: "Erro ao atualizar planta",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
                variant: "left-accent"
            });
        } finally {
            setLoading(false);
            router.push('/plant/search');
        }
    }

    return (
        <Flex w={"100%"} direction={"column"} align={"center"} justify={"flex-start"}>
            <Panel>
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
            </Panel>
            <Panel>
                <Flex gap="20px" direction={"row"} p={"10px"} justify={"flex-start"} spacing={4}>
                    <Button onClick={putData} type="submit" isLoading={loading}>Atualizar</Button>
                    <Link href="/plant/search">
                        <Button type="cancel" isLoading={loading}>Cancelar</Button>
                    </Link>
                </Flex>
            </Panel>
        </Flex>
    );
}

export default PlantEditPage;