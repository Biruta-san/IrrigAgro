import React from 'react';
import { Grid } from '@chakra-ui/react';
import TextInput from '../../../../components/TextInput';
import NumberInput from '../../../../components/NumberInput';

const FarmInformacoesPrincipais = ({campos, setCampos}) => {
    
    const handleOnChange = (e, campoAlterado) => {
        setCampos({...campos, [campoAlterado]: e});
    };


    return (
        <Grid templateColumns="repeat(2, 1fr)" gap="3px">
            <TextInput label={"Nome da Fazenda"} isRequired placeholder="Informe o Nome" value={campos.nome} onChange={(e) => handleOnChange(e.target.value, 'nome')}/>
            <TextInput label={"Descrição da Fazenda"} placeholder="Informe a Descrição" value={campos.descricao} onChange={(e) => handleOnChange(e.target.value, 'descricao')} />
            {/*<TextInput label={"Estado da Fazenda"} placeholder="Informe o Estado" value={campos.estado} onChange={(e) => handleOnChange(e, 'estado')}/>*/}
            <TextInput label={"Cidade da Fazenda"} placeholder="Informe a Cidade" value={campos.cidade} onChange={(e) => handleOnChange(e.target.value, 'cidade')}/>
            {/*<TextInput label={"Cep da Fazenda"} placeholder="Informe o Cep" value={campos.cep} onChange={(e) => handleOnChange(e, 'cep')}/>*/}
            <TextInput label={"Rua da Fazenda"} placeholder="Informe a Rua" value={campos.rua} onChange={(e) => handleOnChange(e.target.value, 'rua')}/>
            <TextInput label={"Responsável Tecnico da Fazenda"} placeholder="Informe o responsavel técnico" value={campos.respTec} onChange={(e) => handleOnChange(e.target.value, 'respTec')}/>
            <NumberInput isRequired label={"Area Irrigavel da Fazenda"} placeholder="Informe a area irrigavel" value={campos.areaIrrigavel} onChange={(e) => handleOnChange(e, 'areaIrrigavel')}/>
            <NumberInput label={"Area Total da Fazenda"} placeholder="Informe a area total" value={campos.areaTotal} onChange={(e) => handleOnChange(e, 'areaTotal')}/>
        </Grid>
    );
};

export default FarmInformacoesPrincipais;
