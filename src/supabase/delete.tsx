import { supabase } from "@/utils/supabase";


export async function DeleteStudyRecord(id: string) {
    try {
        const { error } = await supabase
            .from("study-record")
            .delete()
            .eq("id",id);

        if (error) {
            console.error("データの削除中にエラーが発生しました:", error.message);
            return false
        }

        return true
    }
    catch {
        console.error("予期しないエラーが発生しました:");
        return false
    }
}