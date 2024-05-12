import React, { useState } from "react";
import {
    Box,
    FormControl,
    FormLabel,
    FormHelperText,
    Flex,
    Center,
    useDisclosure
} from "@chakra-ui/react";
import { MENU_TEXT_DARK_COLOR, MENU_TEXT_LIGHT_COLOR } from "../../../constants/styleConstants";
import PasswordInput from "../../../components/PasswordInput";
import { createUser } from "../../../../firebaseSdk";
import { useRouter } from 'next/router';
import { Link } from "@chakra-ui/next-js";
import Button from '../../../components/Button';
import TextInput from '../../../components/TextInput';
import { useColorModeValue } from "../../../components/ColorModeProvider";
import Panel from "../../../components/Panel";
import Alert from "../../../components/Alert";

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [alertType, setAlertType] = useState(0);

    const ALERT_TYPES = {
        EMAIL: 1,
        SENHA_EM_BRANCO: 2,
        SENHA_FRACA: 3,
        EMAIL_UTILIZADO: 4,
        ERRO: 5
    }

    const { theme } = useColorModeValue();

    const router = useRouter();

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent the default behavior
            handleSubmit(e);
        }
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const user = await createUser(email, password);
            
            if (user.uid !== undefined && user.uid !== null && user.uid !== '') {
                router.push('/home');
            } else if (user == 'auth/invalid-email') {
                setAlertType(ALERT_TYPES.EMAIL);
                onOpen();
            } else if (user == 'auth/missing-password') {
                setAlertType(ALERT_TYPES.SENHA_EM_BRANCO);
                onOpen();
            } else if (user == 'auth/weak-password') {
                console.log(user)
                setAlertType(ALERT_TYPES.SENHA_FRACA);
                onOpen();
            } else if (user == 'auth/email-already-in-use') {
                setAlertType(ALERT_TYPES.EMAIL_UTILIZADO);
                onOpen();
            }
            else {
                setAlertType(ALERT_TYPES.ERRO);
                onOpen();
            }
        } catch (error) {
            setAlertType(ALERT_TYPES.ERRO);
            onOpen();
        } finally {
            setLoading(false);
        }
    }

    const RegisterAlert = () => {
        let header, body;
        switch (alertType) {
            case ALERT_TYPES.EMAIL:
                header = "Email Inválido";
                body = "Por favor, preencha um email válido!";
                break;
            case ALERT_TYPES.SENHA_EM_BRANCO:
                header = "Senha em branco";
                body = "Por favor, preencha uma senha!";
                break;
            case ALERT_TYPES.SENHA_FRACA:
                header = "Senha Fraca";
                body = "Por favor, prencha uma senha com 6 caracteres ou mais";
                break;
            case ALERT_TYPES.EMAIL_UTILIZADO:
                header = "Email em uso";
                body = "Este email já está cadastrado em nossa base de dados";
                break;
            case ALERT_TYPES.ERRO:
                header = "Erro";
                body = "Ocorreu um erro! Verifique seus dados e sua conexão com a internet e tente novamente!";
                break;
            default:
                header = "Erro";
                body = "Ocorreu um erro! Verifique seus dados e sua conexão com a internet e tente novamente!";
                break;
        }

        return (<Alert isOpen={isOpen} onClose={onClose} header={header} body={body} />);
    }

    return (
        <>
            {isOpen && <RegisterAlert />}
            <Center h="100vh">
                <Panel
                    w='50vw'>
                    <Flex
                        direction={'column'}
                        align={'center'}
                        justify={'center'}
                        p={8}
                    >
                        <FormControl>
                            <Flex
                                w='100%'
                                direction={'column'}
                                gap='10px'
                            >
                                <Box w='100%'>
                                    <FormLabel color={theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR}>Email</FormLabel>
                                    <TextInput
                                        id="email-input"
                                        type="email"
                                        placeholder="Digite seu email"
                                        value={email}
                                        onKeyDown={handleKeyPress}
                                        onChange={(e) => handleEmail(e)}
                                    />
                                    <FormHelperText>Nunca iremos compartilhar seu email</FormHelperText>
                                </Box>
                                <Box
                                    w='100%'
                                >
                                    <FormLabel color={theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR}>Senha</FormLabel>
                                    <PasswordInput
                                        id="password-input"
                                        value={password}
                                        onChange={handlePassword}
                                    />
                                </Box>
                                <Button
                                    onClick={handleSubmit}
                                    isLoading={loading}
                                    w={'100%'}
                                >
                                    Registrar
                                </Button>
                                <Link
                                    href='/'
                                    w='100%'>
                                    <Button
                                        w={'100%'}
                                    >
                                        Realizar Login
                                    </Button>
                                </Link>
                            </Flex>
                        </FormControl>
                    </Flex>
                </Panel>
            </Center>
        </>
    );
}

export default Register;