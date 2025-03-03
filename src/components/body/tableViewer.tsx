import { Dialog } from "@/dialog/Dialog";
import { Row } from "@/domain/Row";
import { DeleteStudyRecord } from "@/supabase/delete";
import {  Flex, HStack, Table } from "@chakra-ui/react";
import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

type Props = {
    rows: Row[]
}

export const TableViewer = (props: Props) => {
    const { rows } = props
    const [open, setOpen] = useState(false)
    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    const [time, setTime] = useState(0)
    const onClickEdit = (row: Row) =>
        () => {
            setOpen(true)
            setId(row.id!)
            setTitle(row.title)
            setTime(row.time)
        }

    const onClickDelete = (id: string) => () => DeleteStudyRecord(id);

    return (
        <Flex align='flex-start' key="table" mx="auto">

            <HStack wrap="wrap" p={{ base: 4, md: 10 }}>
                <Table.Root data-testid="table">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>学習内容</Table.ColumnHeader>
                            <Table.ColumnHeader>学習時間</Table.ColumnHeader>
                            <Table.ColumnHeader></Table.ColumnHeader>
                            <Table.ColumnHeader></Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {rows.map((row) => (
                            <Table.Row key={row.id}>
                                <Table.Cell>{row.title}</Table.Cell>
                                <Table.Cell>{row.time}</Table.Cell>
                                <Table.Cell>
                                    <MdModeEdit
                                        data-testid="editButton"
                                        onClick={onClickEdit(row)}
                                        cursor="pointer"
                                    >
                                        編集
                                    </MdModeEdit>
                                </Table.Cell>
                                <Table.Cell>
                                    <MdDeleteForever
                                        onClick={onClickDelete(row.id!)}
                                        cursor="pointer"

                                    >
                                        削除
                                    </MdDeleteForever>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </HStack>
            <Dialog isNew={false} open={open}
                setOpen={setOpen} id={id} title={title} time={time} />
        </Flex>
    );
};