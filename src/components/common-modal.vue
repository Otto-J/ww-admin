<template>
  <a-modal
    :mask-closable="false"
    :visible="visible"
    title-align="start"
    :esc-to-close="false"
    :width="props.width"
    @cancel="onCancel"
    @ok="onOk"
    body-style="max-height:70vh;overflow-y:auto;"
  >
    <template #title>{{ modalTitle }}</template>
    <slot></slot>
  </a-modal>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

defineOptions({
  name: 'CommonModal'
})

const props = withDefaults(
  defineProps<{
    visible: boolean
    type?: 'add' | 'edit'
    id?: string
    width?: string
    title?: string
  }>(),
  {
    status: false,
    type: 'add',
    id: '',
    width: '800px',
    title: ''
  }
)

const modalTitle = computed(() => props.title || (props.type === 'add' ? '添加' : '编辑'))

const emits = defineEmits(['update:visible', 'refresh', 'ok', 'cancel'])

// const isCreate = computed(() => props.type === 'add')
// const isUpdate = computed(() => props.type === 'edit')

const closeModel = () => {
  emits('update:visible', false)
}

const onOk = async () => {
  emits('ok')
}
const onCancel = () => {
  closeModel()
  emits('cancel')
}
</script>

<style></style>
