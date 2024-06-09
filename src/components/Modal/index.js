import { Modal as ChakraModal, Flex, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useColorModeValue } from "../ColorModeProvider";
import { BG_DARK_COLOR, BG_LIGHT_COLOR, MENU_TEXT_DARK_COLOR, MENU_TEXT_LIGHT_COLOR } from "../../constants/styleConstants";

const Modal = ({ isOpen, onClose, header, body, footer }) => {

    const { theme, colorMode } = useColorModeValue();

    return (
        <ChakraModal size={"xl"} isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
            <ModalOverlay />
            <ModalContent bg={theme == 'light' ? BG_LIGHT_COLOR : BG_DARK_COLOR}>
                <ModalHeader color={theme == 'light' ? MENU_TEXT_LIGHT_COLOR : MENU_TEXT_DARK_COLOR}>{header}</ModalHeader>
                <ModalCloseButton color={colorMode} />
                <Flex direction={"row"} align={"center"} justify={"center"}>
                    <ModalBody>
                        {body}
                    </ModalBody>
                </Flex>
                {footer && (
                    <ModalFooter>
                        {footer}
                    </ModalFooter>
                )}
            </ModalContent>
        </ChakraModal>
    );
}

export default Modal;