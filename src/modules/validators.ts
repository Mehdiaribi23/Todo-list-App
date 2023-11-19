// Fonction utilitaire pour utiliser des validateurs
export default function useValidators() {
  // Vérifie si un champ est vide
  const isEmpty = (fieldName: string, fieldValue: string | null) => {
    return !fieldValue ? "Le champ " + fieldName + " est requis" : "";
  };

  // Vérifie la longueur minimale d'une chaîne
  const minLength = (
    fieldName: string,
    fieldValue: string | null,
    min: number
  ) => {
    return ("" + fieldValue).length < min
      ? `Le champ ${fieldName} doit avoir au moins ${min} caractères`
      : "";
  };

  // Vérifie si une chaîne correspond à un format d'adresse e-mail
  const isEmail = (fieldName: string, fieldValue: string | null) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test("" + fieldValue)
      ? "L'entrée n'est pas une adresse " + fieldName + " valide"
      : "";
  };

  // Vérifie si une chaîne ne contient que des chiffres
  const isNum = (fieldName: string, fieldValue: string | null) => {
    const isNum = /^\d+$/.test("" + fieldValue);
    return !isNum ? "Le champ " + fieldName + " doit contenir uniquement des chiffres" : "";
  };

  // Vérifie si une chaîne contient des caractères spéciaux
  const isSpecial = (fieldName: string, fieldValue: string | null) => {
    const re = /[^a-zA-Z0-9]/;

    return re.test("" + fieldValue)
      ? "Le champ " + fieldName + " ne doit pas contenir de caractères spéciaux"
      : "";
  };

  // Vérifie si une chaîne ne contient que des lettres
  const isNumber = (fieldName: string, fieldValue: string | null) => {
    const re = /^[^0-9]+$/;

    return !re.test("" + fieldValue)
      ? "Le champ " + fieldName + " ne doit contenir que des lettres"
      : "";
  };

  // Retourne les validateurs sous forme d'objet
  return { isEmpty, minLength, isEmail, isNum, isNumber, isSpecial };
}
