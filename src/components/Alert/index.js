import { 
    AlertDialog, 
    AlertDialogOverlay, 
    AlertDialogHeader, 
    AlertDialogBody, 
    AlertDialogFooter, 
    AlertDialogContent } 
from "@chakra-ui/react";
import { useColorModeValue } from "../ColorModeProvider";
import { BG_DARK_COLOR, BG_LIGHT_COLOR, MENU_TEXT_DARK_COLOR, MENU_TEXT_LIGHT_COLOR } from "../../constants/styleConstants";
import Button from "../Button";

const Alert = (props) => {
    const { isOpen, onClose, header, body } = props;

    const {theme, colorMode} = useColorModeValue();

    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                onClose={onClose}
                
            >
                <AlertDialogOverlay>
                    <AlertDialogContent bg={theme == 'light'? BG_LIGHT_COLOR : BG_DARK_COLOR}>
                        <AlertDialogHeader color={theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR} fontSize='lg' fontWeight='bold'>
                            {header}
                        </AlertDialogHeader>

                        <AlertDialogBody color={theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR}>
                            {body}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={onClose} ml={3}>
                                Fechar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
};

export default Alert;