<template>
  <Editor
    mode="split"
    :value="props.text"
    :preview-debounce="300"
    :locale="zhHans"
    :plugins="plugins"
    class="h-full self-md-editor"
    @change="handleChange"
  />
</template>
<script lang="ts" setup>
// @ts-ignore
import { Editor } from '@bytemd/vue-next'
import frontmatter from '@bytemd/plugin-frontmatter'
import gfm from '@bytemd/plugin-gfm'
import gemoji from '@bytemd/plugin-gemoji'
import highlight from '@bytemd/plugin-highlight'
import zhHans from 'bytemd/locales/zh_Hans.json'
import breaks from '@bytemd/plugin-breaks'
import '@/assets/md2.css'
// import '@/assets/md.css'
import 'highlight.js/styles/rainbow.css'
import 'bytemd/dist/index.css'

defineOptions({
  name: 'MDEditor'
})

const props = withDefaults(
  defineProps<{
    text: string
  }>(),
  {
    text: ''
  }
)

const emit = defineEmits<{
  'update:text': [value: string]
}>()

const plugins = [
  gfm(),
  frontmatter(),
  gemoji(),
  highlight(),
  breaks()
  // Add more plugins here
]
const handleChange = (e: any) => {
  emit('update:text', e)
}
</script>
