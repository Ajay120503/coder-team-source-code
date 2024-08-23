import React from 'react'
import Draggable from 'react-draggable';
import {
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    ChakraProvider,
    Tooltip
} from '@chakra-ui/react'
import { LANG_VERSIONS } from '../Const'

const languages = Object.entries(LANG_VERSIONS);

function DragMenu({ language, onSelect }) {
    return (
        <>
            <ChakraProvider>
                <Menu isLazy>
                    <Draggable>
                        <Tooltip hasArrow label='Chenge the Editor Language' placement='auto'>
                            <MenuButton
                                as={Button}
                                colorScheme="blue"
                                variant="solid"
                                size="md"
                                borderRadius="md"
                                fontSize="lg"
                                _hover={{ bg: 'blue.700' }}
                                _active={{ bg: 'blue.700' }}
                                position="absolute"
                                top="5" right="130"
                                zIndex={1}
                                style={{ fontWeight: 900 }}
                            >
                                {language.toUpperCase()}
                                <i style={{ marginLeft: "10px" }} class="fa-solid fa-caret-down"></i>
                            </MenuButton>
                        </Tooltip>
                    </Draggable>
                    <MenuList bg='transparent'>
                        {languages.map(([lang, version]) => (
                            <MenuItem
                                style={{ fontWeight: 600 }}
                                color={lang === language ? "blue.400" : "#fff"}
                                bg={lang === language ? "grey.700" : "transparent"}
                                _hover={{ bg: "#dbdbdb", color: "blue.400" }}
                                onClick={() => onSelect(lang)} key={lang}>{lang.toUpperCase()}
                                &nbsp;
                                <Text as='i' color='#6e6e6e' fontSize='xs'>{version}</Text>
                            </MenuItem>
                        ))
                        }
                    </MenuList>
                </Menu>
            </ChakraProvider>
        </>
    )
}

export default DragMenu