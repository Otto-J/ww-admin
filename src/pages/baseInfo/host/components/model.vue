<template>
  <a-modal
    :mask-closable="false"
    :visible="visible"
    title-align="start"
    @cancel="onCancel"
    @ok="onOk"
  >
    <template #title>{{ props.type === 'add' ? '添加' : '编辑' }}</template>
    <!-- <div>{{ props }},{{ formModel }}</div> -->
    <a-form ref="formRef" :rules="formRules" :model="formModel">
      <a-form-item field="name" label="姓名">
        <a-input v-model="formModel.name" />
      </a-form-item>
      <!-- is Host -->
      <a-form-item field="isHost" label="是否主播">
        <a-switch v-model="formModel.isHost" />
      </a-form-item>
      <!-- avatar -->
      <a-form-item field="avatar" label="头像">
        <a-space>
          <a-input v-model="formModel.avatar" placeholder="嘉宾头像" />
          <a-avatar>
            <img class="max-w-fit" v-if="formModel.avatar" :src="formModel.avatar" />
            <template v-else>A</template>
          </a-avatar>
        </a-space>
      </a-form-item>
      <!-- bio input -->
      <a-form-item field="bio" label="简介">
        <a-input v-model="formModel.bio" placeholder="一句话介绍" />
      </a-form-item>
      <!-- link -->
      <a-form-item field="link" label="链接">
        <a-input v-model="formModel.link" placeholder="嘉宾网络链接" />
      </a-form-item>
      <!-- wechatId -->
      <!-- <a-form-item field="wechatId" label="微信ID">
        <a-input v-model="formModel.wechatId" placeholder="后续自动开通账号" />
      </a-form-item> -->
      <!-- twitter -->
      <a-form-item field="twitter" label="Twitter">
        <a-input v-model="formModel.twitter" placeholder="Twitter" />
      </a-form-item>
      <!-- is show switch -->
      <a-form-item field="isShow" label="是否显示">
        <a-switch v-model="formModel.isShow" />
      </a-form-item>
      <!-- order number -->
      <a-form-item field="order" label="排序">
        <a-input-number v-model="formModel.order" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { Message, type FieldRule, type FormInstance } from '@arco-design/web-vue'
import { Cloud } from 'laf-client-sdk'
import { ref } from 'vue'
import { useCloned } from '@vueuse/core'

defineOptions({
  name: 'BaseInfoPersonModel'
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

const closeModel = () => {
  formModel.value = defaultFormModel()
  emits('update:visible', false)
}

const formRef = ref<FormInstance>()

const cloud = new Cloud({
  // 这里 APPID 需要换成对应的 APPID
  baseUrl: 'https://admin.webworker.tech',
  // 这里是访问策略的入口地址，如果没有访问策略可不填
  dbProxyUrl: '/proxy/podcast',
  // 请求时带的 token，可空
  getAccessToken: () => localStorage.getItem('access_token') as string
})
const db = cloud.database()
const defaultFormModel = () => ({
  name: '',
  avatar: '',
  bio: '',
  link: '',
  isHost: false,
  wechatId: '',
  twitter: '',
  isShow: true,
  order: 1
})
const formModel = ref(defaultFormModel())

const formRules: Partial<Record<keyof ReturnType<typeof defaultFormModel>, FieldRule[]>> = {
  name: [
    {
      required: true,
      message: '必填'
    }
  ]
}

const isCreate = computed(() => props.type === 'add')
const isUpdate = computed(() => props.type === 'edit')

watchEffect(() => {
  if (isUpdate.value && props.id) {
    if (props.visible) {
      const col = db.collection('podcast-person')
      col
        .doc(props.id)
        .get()
        .then((res) => {
          if (res.ok) {
            formModel.value = res.data
          }
        })
    } else {
      formModel.value = defaultFormModel()
    }
  }
})

const onOk = async () => {
  const validate = await formRef.value?.validate()
  if (validate) {
    return
  }
  const col = db.collection('podcast-person')
  if (isCreate.value) {
    col
      .add(formModel.value)
      .then((res) => {
        Message.success('添加成功')
        closeModel()
        emits('refresh')
      })
      .catch((err) => {
        Message.error('添加失败')
        console.log(err)
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
        Message.error('更新失败')
        console.log(err)
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
