import { Dialog as ChakraDialog, Portal, type DialogCloseTriggerProps } from '@chakra-ui/react';
import { CloseButton } from './close-button';
import * as React from 'react';

interface DialogContentProps extends ChakraDialog.ContentProps {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
  backdrop?: boolean;
  children?: React.ReactNode;
  asChild?: boolean;
  ref?: React.ForwardedRef<HTMLDivElement>;
}


 // DialogCloseTriggerPropsを継承した新しいインターフェースを定義し、childrenを追加

 interface NewDialogCloseTriggerProps extends DialogCloseTriggerProps {

   children?: React.ReactNode;

 }


export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(function DialogContent(props, ref) {
  const { children, portalled = true, portalRef, backdrop = true, ...rest } = props;
  const chakraDialogContentProps: DialogContentProps = {
    ref: ref,
    asChild: false,
    children: children,
  };

  return (
    <Portal disabled={!portalled} container={portalRef}>
      {backdrop && <ChakraDialog.Backdrop />}
      <ChakraDialog.Positioner>
        <ChakraDialog.Content {...rest} {...chakraDialogContentProps} />
      </ChakraDialog.Positioner>
    </Portal>
  );
});



 export const DialogCloseTrigger = React.forwardRef<HTMLButtonElement, NewDialogCloseTriggerProps>(function DialogCloseTrigger(props, ref) { // NewDialogCloseTriggerPropsに置き換え

  const chakraDialogCloseTriggerProps: DialogCloseTriggerProps = {
    asChild: true,
    position: 'absolute',
    top: '2',
    insetEnd: '2',
    children: (
      <CloseButton size="sm" ref={ref}>
        {props.children}
      </CloseButton>
    ),
  };

  return <ChakraDialog.CloseTrigger {...chakraDialogCloseTriggerProps} {...props} />;
});

export const DialogRoot = ChakraDialog.Root;
export const DialogFooter = ChakraDialog.Footer;
export const DialogHeader = ChakraDialog.Header;
export const DialogBody = ChakraDialog.Body;
export const DialogBackdrop = ChakraDialog.Backdrop;
export const DialogTitle = ChakraDialog.Title;
export const DialogDescription = ChakraDialog.Description;
export const DialogTrigger = ChakraDialog.Trigger;
export const DialogActionTrigger = ChakraDialog.ActionTrigger;
