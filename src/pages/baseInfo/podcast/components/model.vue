<template>
  <a-modal
    :mask-closable="false"
    :visible="visible"
    title-align="start"
    :esc-to-close="false"
    width="800px"
    @cancel="onCancel"
    @ok="onOk"
    body-style="height:70vh;overflow-y:auto;"
  >
    <template #title>{{ props.type === 'add' ? '添加' : '编辑' }}</template>
    <a-form ref="formRef" :model="formModel" :rules="formRules">
      <a-form-item field="publish" label="是否发布">
        <a-switch v-model="formModel.publish" />
      </a-form-item>
      <a-form-item field="No" label="No.">
        <a-input-number v-model="formModel.No"></a-input-number>
      </a-form-item>
      <a-form-item field="title" label="标题">
        <a-input v-model="formModel.title" />
      </a-form-item>

      <a-form-item field="date" label="发布日期">
        <a-date-picker v-model="formModel.date" show-time format="YYYY-MM-DD hh:mm" />
      </a-form-item>
      <!-- 小宇宙 -->
      <a-form-item filed="xyz" label="小宇宙">
        <a-input v-model="formModel.xyz" />
      </a-form-item>
      <!-- field apple -->
      <a-form-item field="apple" label="苹果">
        <a-input v-model="formModel.apple" />
      </a-form-item>
      <!-- field ipfs -->
      <a-form-item field="ipfs" label="IPFS">
        <a-input v-model="formModel.ipfs" />
      </a-form-item>
      <!-- cover -->
      <a-form-item field="cover" label="封面">
        <a-space>
          <div>
            <a-image width="100" :src="formModel.cover" />
          </div>
          <a-input v-model="formModel.cover" />
        </a-space>
      </a-form-item>
      <!-- 下拉框 host -->
      <a-form-item field="host" label="主持人">
        <a-select :multiple="true" v-model="formModel.host" mode="tags">
          <a-option v-for="item of hostOptions" :key="item.value" :value="item.value">{{
            item.label
          }}</a-option>
        </a-select>
      </a-form-item>
      <!-- 嘉宾，输入回车确认 -->
      <a-form-item field="guest" label="嘉宾">
        <a-select :multiple="true" v-model="formModel.guest" mode="tags">
          <a-option v-for="item of guestOptions" :key="item.value" :value="item.value">{{
            item.label
          }}</a-option>
        </a-select>
      </a-form-item>
      <!-- 嘉宾信息 -->
      <a-form-item field="guestIntro" label="嘉宾信息">
        <md-editor v-model:text="formModel.guestIntro" class="w-full overflow-auto h-52" />
      </a-form-item>
      <!--  timeline -->
      <a-form-item field="timeline" label="时间轴">
        <md-editor v-model:text="formModel.timeline" class="w-full overflow-auto h-52" />
      </a-form-item>
    </a-form>
    <!-- <MdEditor v-model:text="text" /> -->
  </a-modal>
</template>
<script lang="ts" setup>
import { Message, type FieldRule, type FormInstance } from '@arco-design/web-vue'
import { Cloud } from 'laf-client-sdk'
import { computed, ref } from 'vue'
import { useCloned } from '@vueuse/core'
import MdEditor from '@/components/md-editor.vue'
import { handle403 } from '@/utils/loginStatus'
import { db } from '@/utils/cloud'

defineOptions({
  name: 'PagePodcastModel'
})

const props = withDefaults(
  defineProps<{
    visible: boolean
    type: 'add' | 'edit'
    id: string
  }>(),
  {
    status: false,
    type: 'add',
    id: ''
  }
)

const emits = defineEmits(['update:visible', 'refresh'])

const isCreate = computed(() => props.type === 'add')
const isUpdate = computed(() => props.type === 'edit')

const closeModel = () => {
  formModel.value = defaultFormModel()
  emits('update:visible', false)
}

const hostList = ref<any[]>([])

const fetchHost = () => {
  db.collection('podcast-person')
    .get()
    .then((res) => {
      console.log(res)
      if (res.ok) {
        hostList.value = res.data
      }
    })
}

const hostOptions = computed(() => {
  return hostList.value
    .filter((i) => i.isHost)
    .map((item) => ({
      label: item.name,
      value: item._id
    }))
})
// guestOptions
const guestOptions = computed(() => {
  return hostList.value
    .filter((i) => !i.isHost)
    .map((item) => ({
      label: item.name,
      value: item._id
    }))
})

onMounted(() => {
  fetchHost()
})

const text = ref('')

const formRef = ref<FormInstance>()

const COL_NAME = 'podcast-webworker'

const defaultFormModel = () => ({
  title: '',
  No: 0,
  date: '',
  cover: '',
  publish: true,
  xyz: '',
  apple: '',
  ipfs: '',
  host: [] as string[],
  guest: [] as string[],
  guestIntro: '',
  intro: '',
  guestImage: [] as string[],
  timeline: ''
})
const formModel = ref(defaultFormModel())

const formRules: Partial<Record<keyof ReturnType<typeof defaultFormModel>, FieldRule[]>> = {
  title: [
    {
      required: true,
      message: '必填'
    }
  ]
}

const fetchDetail = () => {
  db.collection(COL_NAME)
    .doc(props.id)
    .get()
    .then((res) => {
      formModel.value = res.data
    })
}

watchEffect(() => {
  if (isUpdate.value && props.id) {
    fetchDetail()
  }
})

const onOk = async () => {
  const validate = await formRef.value?.validate()
  if (validate) {
    return
  }
  const col = db.collection(COL_NAME)
  if (isCreate.value) {
    col
      .add(formModel.value)
      .then((res) => {
        Message.success('添加成功')
        closeModel()
        emits('refresh')
      })
      .catch((err) => {
        handle403(err)
      })
  } else if (isUpdate.value) {
    const id = props.id

    const { cloned } = useCloned({ ...formModel.value, _id: undefined })

    // update where id
    col
      .where({
        _id: id
      })
      .update(cloned.value)
      .then((res) => {
        Message.success('更新成功')
        closeModel()
        emits('refresh')
      })
      .catch((err) => {
        handle403(err)
      })
  } else {
    Message.warning('未知操作')
  }
}
const onCancel = () => {
  closeModel()
}
</script>

<style></style>
