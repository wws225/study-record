import { Row } from "@/domain/Row";
import { supabase } from "@/utils/supabase";

export async function UpdateStudyRecord(row: Row) {
    const { id, title, time } = row;

    try {
        const { data, error } = await supabase
            .from("study-record")
            .update({ title, time })
            .eq("id", id);

        if (error) {
            console.error("データの編集中にエラーが発生しました:", error.message);
            return { data: null, error };
        }

        return { data, error };
    } catch (err) {
        console.error("予期しないエラーが発生しました:", err);
        return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
    }
}
