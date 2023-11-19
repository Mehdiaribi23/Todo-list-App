// Fonction utilitaire pour convertir une date en chaîne de caractères

export function dateToString(data: Date | boolean | string | number): string {
    // Si la valeur est une instance de Date, formater la date en chaîne
    if (data instanceof Date)
      return data.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
  
    return String(data);
  }
  