import React, { useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Input, Button } from '@chakra-ui/react'
import FarmInformacoesPrincipais from '../../Form/FarmInformacoesPrincipais';

const FarmAddPage = () => {

    const [camposPrincipais, setCamposPrincipais] = useState({
        nome: '',
        descricao: '',
        endereco: '',
        cidade: '',
        estado: '',
        respTec: '',
        cep: '',
        areaIrrigavel: '',
        areaTotal: ''
    });

    return (
        <Box margin={"15px"} w="100%">
            <Box w="100%">
                <Tabs isFitted variant="enclosed">
                    <TabList>
                        <Tab>Informações Principais</Tab>
                        <Tab>Mapeamento de Fazendas</Tab>
                        <Tab>Sensores</Tab>
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
                <Button>Salvar</Button>
            </Box>
        </Box>
    );
}

export default FarmAddPage;