import axios from 'axios';
import React, { useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Input, Button } from '@chakra-ui/react'
import FarmInformacoesPrincipais from '../../Form/FarmInformacoesPrincipais';
import { isNullOrEmpty } from '../../../../utils/validate';
import { PASSWORD_ADDON_COLOR } from '../../../../constants/colorConstants';
import { POST_FAZENDAS } from '../../../../constants/apiRoutes';

const FarmAddPage = () => {

    const [camposPrincipais, setCamposPrincipais] = useState({
        nome: '',
        descricao: '',
        rua: '',
        cidade: '',
        estado: null,
        respTec: '',
        cep: 0,
        areaIrrigavel: 0,
        areaTotal: 0
    });

    const [loading, setLoading] = useState(false);
    
    const isInvalidForm = () => {
        return isNullOrEmpty(camposPrincipais.nome)
    }

    const postData = async () => {
        console.log(POST_FAZENDAS);
        try{
            setLoading(true);
            const response = await axios.post(POST_FAZENDAS, camposPrincipais);
            console.log(response);
        } catch (error) {
            console.error('Error inserting data:', error);
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <Box margin={"15px"} w="100%">
            <Box w="100%">
                <Tabs defaultIndex={0} isFitted variant="enclosed">
                    <TabList>
                        <Tab _selected={{color: PASSWORD_ADDON_COLOR}}>Informações Principais</Tab>
                        <Tab _selected={{color: PASSWORD_ADDON_COLOR}}>Mapeamento de Fazendas</Tab>
                        <Tab _selected={{color: PASSWORD_ADDON_COLOR}}>Sensores</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <FarmInformacoesPrincipais campos={camposPrincipais} setCampos={setCamposPrincipais}/>
                        </TabPanel>
                        <TabPanel>
                            <p>two!</p>
                        </TabPanel>
                        <TabPanel>
                            <p>three!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
            <Box w="100%">
                <Button
                    backgroundColor="green.400"
                    color='white'
                    variant="solid"
                    isDisabled={isInvalidForm()}
                    isLoading={loading}
                    onClick={() => postData()}
                >Salvar</Button>
            </Box>
        </Box>
    );
}

export default FarmAddPage;