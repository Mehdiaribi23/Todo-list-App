<template>
  <!-- Conteneur principal du composant -->
  <div class="container-fluid vh-100 w-100 d-flex flex-column">
    <!-- Conteneur des boutons de l'en-tête -->
    <HeadContainer @onClickGo="onClickMenuButton" />

    <!-- Composant TodoHat pour le tri -->
    <div class="container w-100 flex-shrink-0">
      <TodoHat
        :order="getOrder"
        @handleSorting="handleSorting"
      />
    </div>

    <!-- Loader GIF affiché pendant le chargement -->
    <LoaderGif v-if="getLoading" />

    <!-- Bloc d'erreur affiché en cas d'erreur -->
    <ErrorBlock
      v-if="getIsError"
      :text="getError"
    />
    
    <!-- Composant TodoTable pour afficher les todos -->
    <TodoTable
      v-else
      :todos="getTodos"
      :order="getOrder"
      :scrolling="getScroll"
    />

    <!-- Composant ShowDialog pour afficher les dialogues -->
    <ShowDialog
      v-if="getShowState"
      @onClickCallback="onDialogChoice"
      :dialog-props="getDialogProps"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from 'vuex';

// Importation des composants nécessaires et des types/interfaces
import HeadContainer from "@/components/VisitTable/HeadButtonsContainer.vue";
import ErrorBlock from "@/components/ErrorBlock.vue";
import LoaderGif from "@/components/LoaderGif.vue";
import ShowDialog from "@/components/DialogForm/ShowDialog.vue";
import TodoHat from "@/components/TodoTable/TodoHat.vue";
import TodoTable from '@/components/TodoTable/TodoTable.vue';
import { IDialogItem, IDialogProps } from "@/types/Dialog";
import stringGuard from "@/modules/stringGuard";
import ITodo, { emptyItem } from './types/Todo';

export default defineComponent({
  name: "App",
  components: {
    HeadContainer,
    ErrorBlock,
    LoaderGif,
    ShowDialog,
    TodoHat,
    TodoTable,
  },
  computed:
    // Mappage des getters depuis le store Vuex
    mapGetters(['getTodos', 'getLoading', 'getOrder', 'getCurrentId', 'getShowState', 'getDialogProps', 'getScroll', 'getIsError', 'getError', 'getInputTodo', 'getInputState'])
  ,
  methods: {
    ...mapActions({
      // Mappage des actions depuis le store Vuex
      fetchData: 'fetchData',
      handleSorting: 'handleSorting',
      autoSelectCurrentItem: 'autoSelectCurrentItem',
      addItem: 'addItem',
      editItem: 'editItem',
      deleteItem: 'deleteItem',
      setShowState: 'setShowState',
      setDialogProps: 'setDialogProps',
      setInputTodo: 'setInputTodo',
      setInputState: 'setInputState',
      setError: 'setError'
    }),
    
    // Enveloppe pour gérer les appels d'API et les erreurs
    async CallerWrapper(props?: IDialogItem) {
      try {
        // Gestion des actions spécifiques
        if (props?.method === "RemoveItem") {
          this.deleteItem(this.getCurrentId);
          return;
        }
        if (props) {
          const body: ITodo = {
            todo: stringGuard(this.getInputTodo),
            state: this.getInputState,
            id: stringGuard(props?.id),
            createdAt: "",
          };
          if (props?.method === "AddItem") {
            this.addItem(body);
            return;
          } else if (props?.method === "EditItem") {
            body.id = this.getCurrentId;
            this.editItem(body);
            return;
          }
        }
        this.setError({ show: true, message: "action inattendue" });
      } catch (error) {
        this.setError({ show: true, message: "erreur inattendue" });
      }
    },

    // Gestion des choix de dialogue (Ok ou Annuler)
    onDialogChoice: async function (props: IDialogItem) {
      if (props.event === "Ok")
        await this.CallerWrapper(props);
      this.setShowState(false);
    },
 
    // Initialisation du formulaire de dialogue modal
    onClickMenuButton: function (type: string) {
      const props: IDialogProps = { type: type };
      if (type !== "AddItem") {
        const currentItem = this.getTodos.find(({ id }: ITodo) => id === this.getCurrentId);
        if (currentItem) {
          props.item = { ...currentItem };
          this.setInputTodo(currentItem.todo);
          this.setInputState(currentItem.state);
        }
      } else {
        props.item = { ...emptyItem };
        this.setInputTodo(emptyItem.todo);
        this.setInputState(emptyItem.state);
      }
      this.setDialogProps(props);
      this.setShowState(true);
    },
  },

  // Hook du cycle de vie du composant : monté
  mounted() {
    this.fetchData();
    this.handleSorting(this.getOrder.order);
    this.autoSelectCurrentItem();
  },
});
</script>

<style>
body {
  height: 100vh;
}

/* Style pour la barre de défilement personnalisée */
::-webkit-scrollbar {
  width: 8px;
  border: 1px solid #FF0000;
}
</style>
