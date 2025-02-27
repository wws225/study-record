import { Row } from "@/domain/Row";
import { supabase } from "@/utils/supabase";


export async function InsertStudyRecord(props: Row) {
    const { title, time } = props
    try {
        const { error } = await supabase
            .from("study-record")
            .insert([{ title, time }])
            .select();

        if (error) {
            console.error("データの挿入中にエラーが発生しました:", error.message);
            return false
        }
        return true
    }
    catch {
        console.error("予期しないエラーが発生しました:");
        return false
    }


}