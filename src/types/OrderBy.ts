// Définition d'un type représentant les colonnes par lesquelles on peut ordonner
type OrderBy = "todo" | "state" | "createdAt";

export interface IOrder {
  order: OrderBy;
  reverse: boolean;
}

export default OrderBy;
