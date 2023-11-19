// Définition d'une liste de constantes représentant les états possibles d'une tâche (todo)
export const StatesTodo = ["New","In progress", "Done", "Paused", "Canceled"] as const;
// Définition d'un type qui représente l'union des états possibles d'une tâche ou une chaîne de caractères vide
export type StatesTodoType = (typeof StatesTodo)[number] | "";

// Interface représentant la structure d'une tâche (todo)
interface ITodo {
  id: string;
  todo: string;
  state: StatesTodoType;
  createdAt: string;
}
// Définition d'une tâche vide à utiliser comme point de départ pour créer de nouvelles tâches
export const emptyItem: ITodo = {
  id: "",
  todo: "",
  state: "",
  createdAt: "",
};

export default ITodo;
