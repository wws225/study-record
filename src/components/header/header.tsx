import { Box,  Heading } from "@chakra-ui/react"
import { FC } from "react"

export const Header :FC = () => {
    return (
        <Box w="100%" p={4} bg="gray.10"> 
            <Heading
                data-testid="title"
                as="h1"
                fontWeight={"bold"}
                textAlign={"center"}
                fontSize={"5xl"}
            >
                シン・学習記録アプリ
            </Heading>
        </Box>
    )
}