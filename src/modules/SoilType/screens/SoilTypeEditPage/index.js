import { Box, Flex, useToast } from "@chakra-ui/react";
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Button from '../../../../components/Button';
import Link from '../../../../components/Link';
import TextInput from '../../../../components/TextInput';
import Panel from "../../../../components/Panel";
import { isNullOrEmpty } from "../../../../utils/validate";
import { BASE_ROUTE_SOIL_TYPE } from "../../../../constants/apiRoutes";

const SoilTypeEditPage = ({ id, nome, descricao }) => {

    const router = useRouter();

    const toast = useToast();

    const [campos, setCampos] = useState({
        id: id,
        nome: nome,
        descricao: descricao
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (value, name) => {
        setCampos({
            ...campos,
            [name]: value
        });
    }

    const isInvalidForm = () =>{
        return isNullOrEmpty(campos.nome);
    }

    const putData = async () => {
        try {
            setLoading(true);
            toast({
                title: "Atualizando tipo de solo...",
                status: "info",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
                variant: "left-accent"
            });
            const response = await axios.put(`${BASE_ROUTE_SOIL_TYPE}/${campos.id}`, campos);
            if (response.data.status === 1)
                toast({
                    title: "Tipo de Solo atualizada com sucesso",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-right",
                    variant: "left-accent"
                })
            else if (response.data.status === -1)
                toast({
                    title: "Erro ao atualizar tipo de solo",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-right",
                    variant: "left-accent"
                });
        } catch (error) {
            console.error('Error inserting data:', error);
            toast({
                title: "Erro ao atualizar tipo de solo",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
                variant: "left-accent"
            });
        } finally {
            setLoading(false);
            router.push('/soilType/search');
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
                            <TextInput value={campos.descricao} onChange={(e) => handleChange(e.target.value, "descricao")} label={"Descricao"} />
                        </Box>
                    </Flex>
                </Flex>
            </Panel>
            <Panel>
                <Flex gap="20px" direction={"row"} p={"10px"} justify={"flex-start"} spacing={4}>
                    <Button isDisabled={isInvalidForm()} onClick={putData} type="save" isLoading={loading}>Atualizar</Button>
                    <Link href="/soilType/search">
                        <Button type="cancel" isLoading={loading}>Cancelar</Button>
                    </Link>
                </Flex>
            </Panel>
        </Flex>
    );
}

export default SoilTypeEditPage;