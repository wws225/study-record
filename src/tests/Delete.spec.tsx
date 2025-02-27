import { supabase } from "@/utils/supabase";
import { DeleteStudyRecord } from "@/supabase/delete";

jest.mock("@/utils/supabase", () => ({
  supabase: {
    from: jest.fn(),
  },
}));

describe("supabaseMethod", () => {
  it("delete成功時の処理", async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      delete: jest.fn(() => ({
        eq: jest.fn().mockResolvedValue({ data: { id: "1" }, error: null }) ,
      })),
    });

    await expect(DeleteStudyRecord("test")).resolves.toEqual(true);
  });

  it("deleteエラー時の処理", async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      delete: jest.fn(() => ({
        eq: jest.fn().mockResolvedValue({ data: null, error: new Error("挿入に失敗") }),
      })),
    });

    await expect(DeleteStudyRecord("test")).resolves.toEqual(false);
  });
});
