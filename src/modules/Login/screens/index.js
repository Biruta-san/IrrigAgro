import { Link } from "@chakra-ui/next-js";
import {
    Box,
    Center,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Input
} from "@chakra-ui/react";
import { useRouter } from 'next/router';
import React, { useState } from "react";
import { logUser } from "../../../../firebaseSdk";
import Button from '../../../components/Button';
import PasswordInput from "../../../components/PasswordInput";
import { MENU_BG_LIGHT_COLOR } from "../../../constants/styleConstants";
import TextInput from "../../../components/TextInput";

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
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent the default behavior
            handleSubmit(e);
        }
    };

    return (
        <Center h="100vh">
            <Flex 
                w='50vw' 
                bg={MENU_BG_LIGHT_COLOR} 
                borderRadius={'20px'} 
                direction={'column'} 
                align={'center'} 
                justify={'center'} 
                p={8}
            >
                <FormControl>
                    <Flex w='100%' direction={'column'} gap='10px'>
                        <Box w='100%'>
                            <FormLabel>Email</FormLabel>
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
                            <FormLabel>Senha</FormLabel>
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
        </Center>
    );
}

export default Login;