import { FC } from "react"
import { Button } from "../ui/button"


type Props = {
    onClick: React.MouseEventHandler<HTMLButtonElement>
}
export const ButtonInsert: FC<Props> = (props) => {
    const { onClick } = props

    return (
            <Button
            data-testid="newButton"
            onClick={onClick}
            ml={"auto"}
            mt={"5"}
            bgColor={"blue.500"}
            rounded={"2xl"}
            >
                新規登録
            </Button>
    )

}