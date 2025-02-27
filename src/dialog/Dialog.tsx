import { Field } from "@/components/ui/field";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from "@/components/ui/dialog";
import { InsertStudyRecord } from "@/supabase/insert";
import {
  Button,
  Input,
  Stack,
} from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { UpdateStudyRecord } from "@/supabase/update";

type Form = {
  title: string;
  time: number;
};

type Props = {
  isNew: boolean
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  id?: string
  title?: string
  time?: number
}

export const Dialog: FC<Props> = (props) => {

  const { isNew, open, setOpen, id, title, time } = props
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue
  } = useForm<Form>();

  useEffect(() => {
    setValue("title", isNew ? "" : title!)
    setValue("time", isNew ? 0 : time!)

  }, [open])

  const submit = async (data: Form) => {
    console.log("登録データ:", data);
    const newtitle = getValues("title")
    const newtime = getValues("time")
    
    isNew ?
      await InsertStudyRecord({ title: newtitle, time: newtime }) :
      await UpdateStudyRecord({ id, title: newtitle, time: newtime })

    setOpen(false)
  };

  return (
    <>

      <DialogRoot
        lazyMount
        motionPreset="slide-in-bottom"
        trapFocus={false}
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
      >
        <DialogContent >
          <DialogHeader data-testid="dialogTitle" >
            {isNew ? "新規登録" : "記録編集"}
          </DialogHeader>
          <DialogBody mx={4}>
            <Stack gap={4}>
              {/* 学習内容 */}
              <Field label="学習内容">
                <Input
                  type="text"
                  {...register("title", {
                    required: "内容の入力は必須です",
                  })}
                />
                {errors.title && <span style={{ color: "red" }}>{errors.title.message}</span>}
              </Field>

              {/* 学習時間 */}
              <Field label="学習時間">
                <Input data-testid="inputTime"
                  type="number"
                  {...register("time", {
                    required: "時間の入力は必須です",
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "時間は0以上である必要があります",
                    },
                  })}
                />
                {errors.time && <span style={{ color: "red" }}>{errors.time.message}</span>}
              </Field>
            </Stack>
          </DialogBody>
          <DialogFooter>
          
            {/* ここで `handleSubmit(submit)` を適用 */}
            <Button onClick={handleSubmit(submit)}
              bgColor={"blue.500"}
              mr={"auto"}
              data-testid="buttonInsert"
            >
              {isNew ? "登録" : "保存"}</Button>
              <DialogCloseTrigger data-testid="closeTrigger" />
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </>
  );
};
