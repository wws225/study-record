import { UpdateStudyRecord } from "@/supabase/update";
import { supabase } from "@/utils/supabase";
import { Row } from "@/domain/Row";

//モックの宣言
jest.mock("@/utils/supabase", () => ({
  supabase: {
    from: jest.fn(),
  },
}));

describe("supabaseMethod", () => {
  it("update", async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      update: jest.fn(() => ({
        eq: jest.fn().mockResolvedValue({ data: { id: "1" }, error: null }) ,
      })),
    });
    const row: Row = { id: "1", title: "新しいタイトル", time: 1 };

    await expect(UpdateStudyRecord(row)).resolves.toEqual({
      data: { id: "1" },
      error: null,
    });
  });

  it("エラーが発生した場合の処理", async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      update: jest.fn(() => ({
        eq: jest.fn().mockResolvedValue({ data: null, error: new Error("更新に失敗") }),
      })),
    });

    const row: Row = { id: "1", title: "エラーテスト", time: 1 };

    await expect(UpdateStudyRecord(row)).resolves.toMatchObject({
      data: null,
      error: new Error("更新に失敗"),
    });
  });
});
