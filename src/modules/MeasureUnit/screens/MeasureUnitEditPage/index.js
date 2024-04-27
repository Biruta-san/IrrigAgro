import { Box, Flex, useToast } from "@chakra-ui/react";
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Button from '../../../../components/Button';
import Link from '../../../../components/Link';
import TextInput from '../../../../components/TextInput';
import { BASE_ROUTE_MEASURE_UNIT } from '../../../../constants/apiRoutes';
import Panel from "../../../../components/Panel";
import { isNullOrEmpty } from "../../../../utils/validate";

const MeasureUnitEditPage = ({ id, nome, sigla, descricao }) => {

    const router = useRouter();

    const toast = useToast();

    const [campos, setCampos] = useState({
        id: id,
        nome: nome,
        sigla: sigla,
        descricao: descricao
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (value, name) => {
        setCampos({
            ...campos,
            [name]: value
        });
    }
    
    const isInvalidForm = () => {
        return isNullOrEmpty(campos.nome) || isNullOrEmpty(campos.sigla);
    }

    const putData = async () => {
        try {
            setLoading(true);
            toast({
                title: "Atualizando Unidade de Medida...",
                status: "info",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
                variant: "left-accent"
            });
            const response = await axios.put(`${BASE_ROUTE_MEASURE_UNIT}/${campos.id}`, campos);
            if (response.data.status === 1)
                toast({
                    title: "Unidade de Medida atualizada com sucesso",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-right",
                    variant: "left-accent"
                })
            else if (response.data.status === -1)
                toast({
                    title: "Erro ao atualizar Unidade de Medida",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-right",
                    variant: "left-accent"
                });
        } catch (error) {
            console.error('Error inserting data:', error);
            toast({
                title: "Erro ao atualizar Unidade de Medida",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
                variant: "left-accent"
            });
        } finally {
            setLoading(false);
            router.push('/measureUnit/search');
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
                            <TextInput isRequired={true} value={campos.sigla} onChange={(e) => handleChange(e.target.value, "sigla")} label={"Sigla"} />
                        </Box>
                        <Box style={{ flexGrow: 1, flexBasis: 200 }}>
                            <TextInput value={campos.descricao} onChange={(e) => handleChange(e.target.value, "descricao")} label={"Descricao"} />
                        </Box>
                    </Flex>
                </Flex>
            </Panel>
            <Panel>
                <Flex gap="20px" direction={"row"} p={"10px"} justify={"flex-start"} spacing={4}>
                    <Button isDisabled={isInvalidForm()} onClick={putData} type="submit" isLoading={loading}>Atualizar</Button>
                    <Link href="/measureUnit/search">
                        <Button type="cancel" isLoading={loading}>Cancelar</Button>
                    </Link>
                </Flex>
            </Panel>
        </Flex>
    );
}

export default MeasureUnitEditPage;