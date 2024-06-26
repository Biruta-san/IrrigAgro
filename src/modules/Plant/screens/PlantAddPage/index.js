import React, { useState } from 'react';
import { Box, Flex, SimpleGrid, useToast } from "@chakra-ui/react";
import TextInput from '../../../../components/TextInput';
import NumberInput from '../../../../components/NumberInput';
import Button from '../../../../components/Button';
import Link from '../../../../components/Link';
import { POST_PLANTA } from '../../../../constants/apiRoutes';
import axios from 'axios';
import { useRouter } from 'next/router';
import Panel from '../../../../components/Panel';
import { isNullOrEmpty } from '../../../../utils/validate';

const PlantAddPage = () => {

    const router = useRouter();

    const toast = useToast();

    const [campos, setCampos] = useState({
        nome: "",
        descricao: "",
        umidadeRecomendada: 0,
        temperaturaRecomendada: 0
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (value, name) => {
        setCampos({
            ...campos,
            [name]: value
        });
    }

    const isInvalidForm = () =>{
        return isNullOrEmpty(campos.nome) || isNullOrEmpty(campos.descricao);
    }

    const postData = async () => {
        try {
            setLoading(true);
            toast({
                title: "Adicionando planta...",
                status: "info",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
                variant: "left-accent"
            });
            const response = await axios.post(POST_PLANTA, campos);
            if (response.data.status === 1)
                toast({
                    title: "Planta Adicionada com sucesso",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-right",
                    variant: "left-accent"
                })
            else if (response.data.status === -1)
                toast({
                    title: "Erro ao adicionar planta",
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
                <Flex padding={"10px"} gap='10px' direction={"column"} >
                    <Flex direction={'row'} wrap={'wrap'} gap={"10px"}>
                        <Box style={{ flexGrow: 1, flexBasis: 200 }}>
                            <TextInput isRequired={true} value={campos.nome} onChange={(e) => handleChange(e.target.value, "nome")} label={"Nome"} />
                        </Box>
                        <Box style={{ flexGrow: 1, flexBasis: 200 }}>
                            <TextInput isRequired={true} value={campos.descricao} onChange={(e) => handleChange(e.target.value, "descricao")} label={"Descricao"} />
                        </Box>
                        <Box style={{ flexGrow: 1, flexBasis: 200 }}>
                            <NumberInput value={campos.umidadeRecomendada} onChange={(e) => handleChange(e, "umidadeRecomendada")} label={"Umidade recomendada"} />
                        </Box>
                        <Box style={{ flexGrow: 1, flexBasis: 200 }}>
                            <NumberInput value={campos.temperaturaRecomendada} onChange={(e) => handleChange(e, "temperaturaRecomendada")} label={"Temperatura recomendada"} />
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
    );
}

export default PlantAddPage;