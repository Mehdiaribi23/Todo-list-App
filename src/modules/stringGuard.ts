// Fonction utilitaire pour protéger contre les valeurs indéfinies ou nulles
export default function stringGuard(stringOrNo: string | undefined): string {
  if (stringOrNo === undefined) {
    return "";
  } else {
    return stringOrNo;
  }
}
