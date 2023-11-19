<template>
  <div
    class="container"
    style="max: width 600px;"
  >
    <h2 class="text-center mt-5">
      My vue to do app
    </h2>
    <div class="d-flex mt-5">
      <input
        type="text "
        v-model="task"
        placeholder="Enter task"
        class="w-100 form control"
      >
    </div>
  </div>
</template>

<script>
export default {
    name:'TodoApp'

}
</script>

<style>

</style>