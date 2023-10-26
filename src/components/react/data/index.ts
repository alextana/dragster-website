export const vueMain = `<template>
  <div>
    <div class="grid grid-cols-1 place-content-center w-full">
      <div class="lists w-full grid grid-cols-1 lg:grid-cols-2 gap-3 mt-8">
        <ItemList v-for="list in lists" :items="list" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDragster } from '@alextana/dragster/vue'
import ItemList from './ItemList.vue'

import { reactive } from 'vue'

// First list
const array1 = reactive([
  { id: 4453, name: 'Potato 🥔' },
  { id: 456, name: 'Aubergine 🍆' },
  { id: 789, name: 'Carrot 🥕 ' },
  { id: 321, name: 'Strawberry 🍓' },
  { id: 654, name: 'Peach 🍑' },
])

// Second list
const array2 = reactive([
  { id: 9874545, name: 'Dog 🐶' },
  { id: 6590, name: 'Cat 🐱' },
  { id: 322345, name: 'Whale 🐳' },
  { id: 785659, name: 'Horse 🐴' },
  { id: 246766, name: 'Bear 🧸' },
])

// useDragster hook
//  options:
//    items -> your lists
//    dropZoneClass -> the class of the lists container
//    itemClass -> the class to add to the dragged element
//    animationDuration -> the duration of the animation you're doing

const { lists, onDragEnd, onDragStart } = useDragster({
  items: [array1, array2],
  dropZoneClass: 'dragster-dropzone',
  itemClass: 'dragster',
  animationDuration: 200,
})
</script>

<style>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Make sure leaving animations have no transition so they don't stay visible */
.fade-leave-active {
  transition: 0s;
  opacity: 0;
  position: absolute;
}
.dragster {
  cursor: grab;
}
</style>`

export const vueItem = `<template>
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
`

export const reactMain = `
import { useDragster } from '@alextana/dragster/react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
// using FormKit's autoAnimate to animate the list with minimal effort

const DragDropExample = () => {
  const sets = [
    [
      { id: 4453, name: 'Potato 🥔' },
      { id: 456, name: 'Aubergine 🍆' },
      { id: 789, name: 'Carrot 🥕 ' },
      { id: 321, name: 'Strawberry 🍓' },
      { id: 654, name: 'Peach 🍑' },
    ],
    [
      { id: 9874545, name: 'Dog 🐶' },
      { id: 6590, name: 'Cat 🐱' },
      { id: 322345, name: 'Whale 🐳' },
      { id: 785659, name: 'Horse 🐴' },
      { id: 246766, name: 'Bear 🧸' },
    ],
  ]

  const { lists } = useDragster({
    items: sets,
    dropZoneClass: 'dragster-dropzone',
    itemClass: 'dragster',
    animationDuration: 200,
  })

  return (
    <div className='grid grid-cols-1 place-content-center w-full'>
      <div className='lists w-full grid grid-cols-1 lg:grid-cols-2 gap-3 mt-8'>
        {lists &&
          lists.map((list, index) => <ItemList key={index} items={list} />
        )}
      </div>
    </div>
  )
}

const ItemList = ({
  items,
}: {
  items: Array<{ id: number; name: string }>
}) => {
  const [parent] = useAutoAnimate()
  return (
    <div
      ref={parent}
      className='dragster-dropzone transition-colors bg-base-300 border border-primary/60
      shadow-xl hover:shadow-primary/30 p-6 rounded-2xl'
    >
      {items &&
        items.map((item) => (
          <div
            key={item.id}
            id={item.id.toString()}
            className='dragster cursor-grab transition-colors text-center
            h-[50px] py-2 bg-base-100 hover:bg-primary hover:text-primary-content
            my-3 rounded-2xl grid place-content-center'
          >
            <h3>{item.name}</h3>
          </div>
        ))}
    </div>
  )
}

export default DragDropExample
`
