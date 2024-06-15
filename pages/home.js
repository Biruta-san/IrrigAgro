import { Flex } from "@chakra-ui/react";

const Home = () => {
    return (
        <Flex pt="20px" direction={'row'} align={'center'} justify={'center'}>
            <iframe 
                title="IrrigAgro" 
                width="1280" 
                height="720" 
                src="https://app.powerbi.com/view?r=eyJrIjoiN2E4NDE5OTEtMDRmYi00NTE1LTg4MWQtMzBhOTI4Yzc0ZjcxIiwidCI6ImVhZWI1MDZhLTFiMmQtNGI2My1hYjkzLTMwMjY2ODhkNjE1YyJ9" 
                frameBorder="0"
                alt="Dados principais IrrigAgro" 
                allowFullScreen="true" />
        </Flex>
    );
}

export default Home;