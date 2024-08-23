import { Box, Button, ChakraProvider } from '@chakra-ui/react'
import React, { useState } from 'react'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    Portal
} from '@chakra-ui/react'
import { executeCode } from './API';

function Output({ editorRef, language }) {

    const [output, setOutput] = useState(null);

    const runCode = async () => {
        const code = editorRef.current.getValue();
        if (!code) return;
        try {
            const { run: result } = await executeCode(language, code);
            setOutput(result.output);
        } catch (error) {

        }

    }

    return (
        <ChakraProvider>
            <Popover>
                <PopoverTrigger>
                    <Button
                        w={100}
                        colorScheme="green"
                        mb={4}
                        fontWeight={900}
                        position="absolute"
                        top="5"
                        right="5"
                        zIndex={2}
                    >
                        OUTPUT
                    </Button>
                </PopoverTrigger>
                <Portal>
                    <PopoverContent border='none' px='5px' w='80vw'>
                        <PopoverHeader>
                            <Button
                                w={70}
                                variant="outline"
                                colorScheme="green"
                                mb={4}
                                fontWeight={900}
                                onClick={runCode}
                            >Run</Button>
                        </PopoverHeader>
                        <PopoverCloseButton color='red' size='30' />
                        <PopoverBody p='0px' bg='#262626'>
                            <Box
                                height='70vh'
                                p={2}
                                border="1px solid #ababab"
                                color="#ababab"
                                overflow='auto'
                            >
                                {output ? output : "Click Run Button to Execute the Code"}
                            </Box>
                        </PopoverBody>
                        <PopoverFooter fontWeight='900'>Coder Team Output</PopoverFooter>
                    </PopoverContent>
                </Portal>
            </Popover>
        </ChakraProvider >
    )
}

export default Output