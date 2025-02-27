import { Row } from "@/domain/Row";
import { supabase } from "@/utils/supabase";

export async function Load(): Promise<Row[]> {
    const responce = await supabase.from("study-record").select("*")
    if (responce.error) {
        throw new Error(responce.error.message)
    }
    const data = responce.data.map((row) => {
        return Row.newRow(row.id, row.title, row.time, row.created_at)
    })
    return data
}
