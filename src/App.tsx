import {  ChakraProvider, defaultSystem, Flex, HStack, } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Row } from "./domain/Row";
import { Load } from "./supabase/load";
import { TableViewer } from "./components/body/tableViewer";
import { Header } from "./components/header/header";
import { Dialog } from "./dialog/Dialog";
import { ButtonInsert } from "./components/button/ButtonInsert";

function App() {
  const [rows, setRows] = useState<Row[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const getRows = async () => {
      const rows = await Load()
      setRows(rows)
      setIsLoading(false)
    }
    getRows()
  })
  const [open, setOpen] = useState(false)

  if (isLoading) {
    return <p data-testid="loading">Loading</p>
  }

  return (
    <ChakraProvider value={defaultSystem}>
           

      <HStack wrap="wrap" p={{ base: 4, md: 10 }}>
        <Flex mx={"auto"} justify="center" align="center" minH="10vh" direction={"column"}>
          <Header />
        <ButtonInsert onClick={() => setOpen(true)}/>
          <TableViewer rows={rows} />
        
        </Flex>
      </HStack>
      <Dialog isNew={true} open={open} setOpen={setOpen}/>
    </ChakraProvider>
  );
}

export default App;