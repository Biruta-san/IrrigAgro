import React, { useState } from "react";
import {
    Box,
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Button,
    Flex,
    Center
} from "@chakra-ui/react";
import { MENU_BG_COLOR } from "../../constants/colorConstants";
import PasswordInput from "../../components/PasswordInput";
import { logUser } from "../../utils/firebaseSdk";
import { useRouter } from 'next/router';
import { Link } from "@chakra-ui/next-js";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

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
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Center h="100vh">
            <Flex w='50vw' bg={MENU_BG_COLOR} borderRadius={'20px'} direction={'column'} align={'center'} justify={'center'} p={8}>
                <FormControl>
                    <Flex w='100%' direction={'column'} gap='10px'>
                        <Box w='100%'>
                            <FormLabel>Email</FormLabel>
                            <Input id="email-input" type="email" placeholder="Digite seu email" value={email} onChange={(e) => handleEmail(e)} />
                            <FormHelperText>Nunca iremos compartilhar seu email</FormHelperText>
                        </Box>
                        <Box w='100%'>
                            <FormLabel>Senha</FormLabel>
                            <PasswordInput id="password-input" value={password} onChange={handlePassword} />
                        </Box>
                        <Button onClick={handleSubmit} variant={{ base: 'submitButton' }} type="submit" isLoading={loading}>Login</Button>
                        <Link href='/register' w='100%'>
                            <Button variant={{ base: 'submitButton' }} w={'100%'}>Registrar</Button>
                        </Link>
                    </Flex>
                </FormControl>
            </Flex>
        </Center>
    );
}

export default Login;