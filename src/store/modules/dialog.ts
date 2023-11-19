// Importation des éléments nécessaires depuis Vuex et d'autres fichiers
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import IDialog, { IDialogProps } from "../../types/Dialog";
import { RootStateStorable } from "./todo";
import stringGuard from "../../modules/stringGuard";
import useFormValidation from "@/modules/useFormValidation";
import useSubmitButtonState from "@/modules/useSubmitButtonState";

// Récupération des erreurs depuis le module de validation de formulaire
const { errors } = useFormValidation();

// Interface représentant l'état du module de la boîte de dialogue
const dialogState: IDialog = {
  show: false,
  disableConfirm: false,
  inputTodo: "",
  inputState: "",
  dialogProps: {
    type: "",
  },
};

// Getters du module de la boîte de dialogue
const dialogGetters: GetterTree<IDialog, RootStateStorable> = {
  getShowState(state): boolean {
    return state.show;
  },
  getDialogProps(state): IDialogProps {
    return state.dialogProps;
  },
  getInputTodo(state): string {
    return stringGuard(state.inputTodo);
  },
  getInputState(state): string {
    return stringGuard(state.inputState);
  },
  getTitle(state) {
    if (state.dialogProps.type === "EditItem") return "Modifier la tâche";
    else if (state.dialogProps.type === "AddItem") return "Ajouter une tâche";
    return "Confirmer la suppression de l'élément";
  },
  getSignupButtonDisabled(state) {
    return state.disableConfirm;
  },
};

// Actions du module de la boîte de dialogue
const dialogActions: ActionTree<IDialog, RootStateStorable> = {
  setShowState(ctx, value) {
    ctx.commit(value ? "setShowTrue" : "setShowFalse");
  },
  setDialogProps(ctx, value) {
    ctx.commit("updateDialogProps", value);
    ctx.commit("setSignupButtonDisabled");
  },
  setInputTodo(ctx, value) {
    ctx.commit("updateInputTodo", value);
    ctx.commit("setSignupButtonDisabled");
  },
  setInputState(ctx, value) {
    ctx.commit("updateInputState", value);
    ctx.commit("setSignupButtonDisabled");
  },
};

// Mutations du module de la boîte de dialogue
const dialogMutations: MutationTree<IDialog> = {
  setSignupButtonDisabled(state) {
    // Désactiver le bouton de confirmation s'il s'agit d'une suppression
    if (state.dialogProps.type === "RemoveItem") return true;

    // Créer un objet avec les données de la boîte de dialogue
    const dialogData = {
      todo: "" + state.inputTodo,
      state: "" + state.inputState,
    };

    // Utiliser le module de gestion de l'état du bouton de soumission pour obtenir l'état du bouton
    const { isButtonDisabled } = useSubmitButtonState(dialogData, errors);
    state.disableConfirm = isButtonDisabled();
  },
  setShowTrue(state) {
    state.show = true;
  },
  setShowFalse(state) {
    state.show = false;
  },
  updateDialogProps(state, value) {
    state.dialogProps = value;
  },
  updateInputTodo(state, value) {
    state.inputTodo = value;

    // Mettre à jour la description de la tâche dans les propriétés de la boîte de dialogue
    if (state.dialogProps.item)
      state.dialogProps.item = { ...state.dialogProps.item, todo: value };
  },
  updateInputState(state, value) {
    state.inputState = value;

    // Mettre à jour l'état de la tâche dans les propriétés de la boîte de dialogue
    if (state.dialogProps.item)
      state.dialogProps.item = { ...state.dialogProps.item, state: value };
  },
};

// Définition du module Vuex de la boîte de dialogue
const dialogStore: Module<IDialog, RootStateStorable> = {
  actions: dialogActions,
  mutations: dialogMutations,
  state: dialogState,
  getters: dialogGetters,
};

// Export du module Vuex de la boîte de dialogue
export default dialogStore;
