import { supabase } from "@/utils/supabase";
import { Row } from "@/domain/Row";
import { InsertStudyRecord } from "@/supabase/insert";

jest.mock("@/utils/supabase", () => ({
  supabase: {
    from: jest.fn(),
  },
}));

describe("supabaseMethod", () => {
  it("insert成功時の処理", async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn(() => ({
        select: jest.fn().mockResolvedValue({ data: { id: "1" }, error: null }) ,
      })),
    });
    const row: Row = { title: "test", time: 1 };

    await expect(InsertStudyRecord(row)).resolves.toEqual(true);
  });

  it("insertエラー時の処理", async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn(() => ({
        select: jest.fn().mockResolvedValue({ data: null, error: new Error("挿入に失敗") }),
      })),
    });

    const row: Row = { title: "エラーテスト", time: 1 };

    await expect(InsertStudyRecord(row)).resolves.toEqual(false);
  });
});
