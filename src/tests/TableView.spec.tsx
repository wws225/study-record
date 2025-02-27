import { act } from "react";
import App from "../App";
import { fireEvent, render, screen } from "@testing-library/react";

describe("tableview", () => {
  it("awaittable", async () => {
    render(<App />);

    //ローディングが表示されているか
    expect(screen.getByTestId("loading")).toBeInTheDocument();

    const table = await screen.findByTestId("table")

    const newbutton = screen.getByTestId("newButton")

    //新規登録ボタンが存在するか
    expect(newbutton).toBeInTheDocument();

    //テーブルが表示されているか
    expect(table).toBeInTheDocument();

    //タイトルが表示されているか
    expect(screen.getByTestId("title")).toBeInTheDocument();

    fireEvent.click(newbutton);

    // 新規登録用のダイアログが表示されるか
    expect(await screen.findByTestId("dialogTitle")).toHaveTextContent("新規登録");

    const closeButton = screen.getByTestId("closeTrigger")

      await act(async () => {
    fireEvent.click(closeButton);
  });

    const editbuttons = screen.getAllByTestId("editButton")
   
    await act(async () => {
      fireEvent.click(editbuttons[0]);
    });
    expect(await screen.findByTestId("dialogTitle")).toHaveTextContent("記録編集");

  });
});
