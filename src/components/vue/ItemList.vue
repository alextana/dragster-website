<template>
  <div
    class="dragster-dropzone transition-colors bg-base-300 border border-primary/60 shadow-xl hover:shadow-primary/30 p-6 rounded-2xl"
  >
    <TransitionGroup name="fade" tag="div">
      <div v-for="item in props.items" :key="item.id">
        <div
          :id="item.id.toString()"
          class="dragster transition-colors text-center h-[50px] py-2 bg-base-100 hover:bg-primary hover:text-primary-content my-3 rounded-2xl grid place-content-center"
        >
          <h3>{{ item.name }}</h3>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
const props = defineProps(['items'])
</script>
