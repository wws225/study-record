import { screen, fireEvent, waitFor } from "@testing-library/react";
import renderWithChakra from "./render/renderWithChakra";
import App from "@/App";


describe("InputValue", () => {
  it("入力なしで登録ボタンを押すとエラーメッセージが表示される", async () => {
    renderWithChakra(<App />);

    await screen.findByTestId("table")
    const button =screen.getByTestId("newButton")
    
    fireEvent.click(button);
    await screen.findByTestId("dialogTitle")


    const inputTime = screen.getByTestId("inputTime")
    fireEvent.change(inputTime, { target: { value: "" } })
    // 登録ボタンをクリック
    fireEvent.click(screen.getByTestId("buttonInsert"));

    // エラーメッセージが表示されることを確認
    await waitFor(() => {
      expect(screen.getByText("内容の入力は必須です")).toBeInTheDocument();
      expect(screen.getByText("時間の入力は必須です")).toBeInTheDocument();
    });

    fireEvent.change(inputTime, { target: { value: "-1" } })
    fireEvent.click(screen.getByText("登録"));
   await waitFor(() => {
    expect(screen.getByText("時間は0以上である必要があります")).toBeInTheDocument();
  });
  });
});
