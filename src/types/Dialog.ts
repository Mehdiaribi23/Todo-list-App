import ITodo from "./Todo";

type EventType = "Ok" | "Cancel";

export interface IDialogProps {
  type: string,
  item?: ITodo,
}
// Interface représentant les propriétés attendues pour configurer une boîte de dialogue
export interface IDialogItem {
  event: EventType;
  method?: string;
  todo?: string;
  state?: string;
  createdAt?: string;
  id?: string;
}
// Interface représentant la structure globale d'une boîte de dialogue

export default interface IDialog {
  show: boolean,
  disableConfirm:boolean,
  inputTodo?:string,
  inputState?:string,
  dialogProps: IDialogProps;
}
