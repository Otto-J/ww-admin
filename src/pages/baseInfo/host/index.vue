<template>
  <div class="w-full p-4 bg-white rounded-sm" style="height: 500px">
    <!-- <MdEditor v-model:text="text" /> -->
    <div class="text-right mb-4">
      <a-button type="primary" @click="addItem">添加</a-button>
    </div>
    <a-table
      :bordered="false"
      :hoverable="true"
      :stripe="true"
      :data="tableData"
      :columns="tableColumns"
    >
      <template #action="{ record }">
        <a-space>
          <a-button type="text" size="mini" @click="updateItem(record)">更新</a-button>
        </a-space>
      </template>
    </a-table>
    <a-modal
      v-model:visible="modelVisible.status"
      title-align="start"
      @cancel="onCancel"
      @ok="onOk"
    >
      <template #title>{{ modelVisible.type === 'add' ? '添加' : '编辑' }}</template>
      <a-form :model="formModel">
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
              <img v-if="formModel.avatar" :src="formModel.avatar" />
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
        <a-form-item field="wechatId" label="微信ID">
          <a-input v-model="formModel.wechatId" placeholder="后续自动开通账号" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import MdEditor from '@/components/md-editor.vue'
import type { TableColumnData } from '@arco-design/web-vue'
import { Cloud } from 'laf-client-sdk'

const cloud = new Cloud({
  // 这里 APPID 需要换成对应的 APPID
  baseUrl: 'https://admin.webworker.tech',
  // 这里是访问策略的入口地址，如果没有访问策略可不填
  dbProxyUrl: '/proxy/podcast',
  // 请求时带的 token，可空
  getAccessToken: () => localStorage.getItem('access_token') as string
})

const db = cloud.database()

defineOptions({
  name: 'PageHost'
})

const defaultFormModel = () => ({
  name: '',
  avatar: '',
  bio: '',
  link: '',
  isHost: false,
  wechatId: ''
})

const formModel = ref(defaultFormModel())

const modelVisible = ref({
  status: false,
  type: 'add'
})

const addItem = () => {
  modelVisible.value = {
    status: true,
    type: 'add'
  }
}

const fetchTable = () => {
  const col = db.collection('podcast-person')

  col.get().then((res) => {
    console.log(2, res)
    if (res.ok) {
      tableData.value = res.data
    }
  })
}

onMounted(() => {
  fetchTable()
})

const onOk = (e) => {
  const col = db.collection('podcast-person')

  col
    .add(formModel.value)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}
const onCancel = (e) => {}

const updateItem = (info: any) => {
  console.log(info._id)
  console.log(info)
}

const text = ref('')

const tableData = ref<any[]>([])
const tableColumns = ref<TableColumnData[]>([
  {
    title: '序号',
    render: ({ rowIndex }) => `${rowIndex + 1}`
  },
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '是否主播',
    render({ record }) {
      return record.isHost ? '是' : '否'
    }
  },
  {
    title: '操作',
    slotName: 'action'
  }
])
</script>

<route lang="json">
{
  "name": "PageHost",
  "meta": {
    "requiresAuth": false,
    "title": "嘉宾信息"
  }
}
</route>

<style>
.bytemd {
  height: 100%;
}
</style>
