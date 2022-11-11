import {
    useDisclosure,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    useTheme,
} from '@chakra-ui/react';

import { Token } from '../../../interfaces/Token.js';
import { ERC721InstanceProps } from '../ERC721Instance/index.js';
import { ERC721InstanceGrid } from '../ERC721InstanceGrid/index.js';

export interface ERC721InstanceGridModal {
    isOpen: boolean;
    tokens: ERC721InstanceProps[];
    onClick?: ({ networkId, address, tokenId }: Partial<Token>) => any;
}

export const ERC721InstanceGridModal = ({ isOpen, tokens, onClick }: ERC721InstanceGridModal) => {
    const { themes } = useTheme();
    const { onClose } = useDisclosure();
    const handleAssetSelect = null;

    const settings = {
        closeOnEsc: false,
        closeOnOverlayClick: false,
        isOpen: isOpen,
        onClose: onClose,
        isCentered: true,
        size: '2xl',
        autoFocus: false,
        trapFocus: false,
    };

    return (
        <>
            <Modal {...settings}>
                <ModalOverlay />
                <ModalContent bg={themes.color5} color={themes.color9} w={'100%'} maxW={'792px'}>
                    <ModalHeader mb={6} borderBottom={`1px solid ${themes.color6}`}>
                        Select an asset
                    </ModalHeader>

                    <ModalCloseButton />
                    <Box p={3}>
                        <ERC721InstanceGrid tokens={tokens} onClick={onClick} />
                    </Box>
                </ModalContent>
            </Modal>
        </>
    );
};
