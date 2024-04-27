import React, { useState } from "react";
import {
    Box,
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Flex,
    Center
} from "@chakra-ui/react";
import { MENU_BG_LIGHT_COLOR, MENU_TEXT_DARK_COLOR, MENU_TEXT_LIGHT_COLOR } from "../../../constants/styleConstants";
import PasswordInput from "../../../components/PasswordInput";
import { createUser } from "../../../../firebaseSdk";
import { useRouter } from 'next/router';
import { Link } from "@chakra-ui/next-js";
import Button from '../../../components/Button';
import TextInput from '../../../components/TextInput';
import { useColorModeValue } from "../../../components/ColorModeProvider";
import Panel from "../../../components/Panel";

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

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
                router.push('/user');
            } else if (user == 'auth/invalid-email') {
                alert('Por favor, preencha um email válido!');
            } else if (user == 'auth/missing-password') {
                alert('Por favor, preencha uma senha que possua ao menos 6 caracteres!');
            } else if (user == 'auth/invalid-credential') {
                alert('Confira seus dados e tente novamente!');
            } else {
                alert(user);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
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
    );
}

export default Register;