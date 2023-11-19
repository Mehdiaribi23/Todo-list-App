/* eslint-disable */
// Déclaration du module pour les fichiers Vue (*.vue).
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
