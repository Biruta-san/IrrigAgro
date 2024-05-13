import { Link } from "@chakra-ui/next-js";
import {
    Box,
    Center,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    useDisclosure
} from "@chakra-ui/react";
import { useRouter } from 'next/router';
import React, { useState } from "react";
import { logUser } from "../../../../firebaseSdk";
import Button from '../../../components/Button';
import PasswordInput from "../../../components/PasswordInput";
import { MENU_TEXT_DARK_COLOR, MENU_TEXT_LIGHT_COLOR } from "../../../constants/styleConstants";
import TextInput from "../../../components/TextInput";
import Panel from "../../../components/Panel";
import { useColorModeValue } from "../../../components/ColorModeProvider";
import Alert from "../../../components/Alert";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertType, setAlertType] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { theme } = useColorModeValue();

    const ALERT_TYPES = {
        EMAIL_INVALIDO: 1,
        SENHA_EM_BRANCO: 2,
        CREDENCIAL_INVALIDA: 3,
        ERRO: 4
    }

    const router = useRouter();

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const user = await logUser(email, password);
            if (user.uid !== undefined && user.uid !== null && user.uid !== '') {
                router.push('/home');
            } else if (user == 'auth/invalid-email') {
                setAlertType(ALERT_TYPES.EMAIL_INVALIDO);
                onOpen();
            } else if (user == 'auth/missing-password') {
                setAlertType(ALERT_TYPES.SENHA_EM_BRANCO);
                onOpen();
            } else if (user == 'auth/invalid-credential') {
                setAlertType(ALERT_TYPES.CREDENCIAL_INVALIDA);
                onOpen();
            }
            else if (user == 'auth/invalid-login-credentials') {
                setAlertType(ALERT_TYPES.CREDENCIAL_INVALIDA);
                onOpen();
            }
            else {
                setAlertType(ALERT_TYPES.ERRO);
                onOpen();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const RegisterAlert = () => {
        let header, body;
        switch (alertType) {
            case ALERT_TYPES.EMAIL_INVALIDO:
                header = "Email Inválido";
                body = "Por favor, preencha um email válido!";
                break;
            case ALERT_TYPES.SENHA_EM_BRANCO:
                header = "Senha em branco";
                body = "Por favor, preencha uma senha!";
                break;
            case ALERT_TYPES.CREDENCIAL_INVALIDA:
                header = "Credenciais invalidas";
                body = "Por favor, verifique seus dados e tente novamente!";
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
                            <Flex w='100%' direction={'column'} gap='10px'>
                                <Box w='100%'>
                                    <FormLabel color={theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR}>Email</FormLabel>
                                    <TextInput
                                        id="email-input"
                                        type="email"
                                        placeholder="Digite seu email"
                                        value={email}
                                        onChange={(e) => handleEmail(e)}
                                        onKeyDown={handleKeyPress} // Attach event handler here
                                    />
                                    <FormHelperText>Nunca iremos compartilhar seu email</FormHelperText>
                                </Box>
                                <Box w='100%'>
                                    <FormLabel color={theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR}>Senha</FormLabel>
                                    <PasswordInput
                                        id="password-input"
                                        value={password}
                                        onChange={handlePassword}
                                        onKeyDown={handleKeyPress} // Attach event handler here
                                    />
                                </Box>
                                <Button
                                    onClick={handleSubmit}
                                    isLoading={loading}
                                    w={'100%'}
                                >
                                    Login
                                </Button>
                                <Link
                                    href='/register'
                                    w='100%'
                                >
                                    <Button
                                        w={'100%'}
                                    >
                                        Registrar
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

export default Login;