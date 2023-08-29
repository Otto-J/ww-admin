<template>
  <a-page-header class="bg-white rounded-md mb-4" :title="($route.meta.title as string)">
    <template #extra>
      <div class="text-right">
        <a-space>
          <a-button type="primary" @click="addItem">
            <template #icon>
              <IconPlus />
            </template>
            添加</a-button
          >
          <a-button type="primary" @click="genFile"> 生成md文件 </a-button>
        </a-space>
      </div>
    </template>
  </a-page-header>

  <div class="w-full p-4 bg-white rounded-md">
    <!-- <MdEditor v-model:text="text" /> -->

    <query-header :model="queryFormModel" @submit="fetchTable">
      <!-- name input -->
      <a-form-item field="name" label="姓名">
        <a-input v-model="queryFormModel.name" />
      </a-form-item>
    </query-header>
    <a-divider />

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
    <BaseInfoPersonModel
      v-model:visible="modelVisible.status"
      :type="modelVisible.type"
      :id="modelVisible.id"
      @refresh="refresh"
    />
  </div>
</template>

<script lang="tsx" setup>
// import MdEditor from '@/components/md-editor.vue'
import { type TableColumnData } from '@arco-design/web-vue'
import { Cloud } from 'laf-client-sdk'
import BaseInfoPersonModel from './components/model.vue'
import { IconTwitter, IconShareAlt, IconHeartFill, IconPlus } from '@arco-design/web-vue/es/icon'
import { generateFile } from './model'

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

const modelVisible = ref({
  status: false,
  type: 'add' as 'add' | 'edit',
  id: ''
})

const fetchTable = () => {
  const col = db.collection('podcast-person')

  col
    .where({
      name: new RegExp(queryFormModel.value.name, 'i')
    })
    .get()
    .then((res) => {
      console.log(2, res)
      if (res.ok) {
        tableData.value = res.data
      }
    })
}

// query form
const defaultQueryFormModel = () => ({
  name: ''
})
const queryFormModel = ref(defaultQueryFormModel())

// const clearQueryForm = () => {
//   queryFormModel.value = defaultQueryFormModel()
// }

watchEffect(() => {
  if (!modelVisible.value.status) {
    modelVisible.value.type = 'add'
    modelVisible.value.id = ''
    // fetchTable()
  }
})

const addItem = () => {
  modelVisible.value = {
    status: true,
    type: 'add',
    id: ''
  }
}

const refresh = () => {
  fetchTable()
}

const genFile = () => {
  generateFile(tableData.value)
}

onMounted(() => {
  fetchTable()
})

const updateItem = (info: any) => {
  modelVisible.value = {
    status: true,
    type: 'edit',
    id: info._id
  }
}

const tableData = ref<any[]>([])
const tableColumns = ref<TableColumnData[]>([
  {
    title: '序号',
    render: ({ rowIndex }) => `${rowIndex + 1}`,
    width: 60,
    fixed: 'left'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 160,
    fixed: 'left'
  },
  {
    title: '头像',
    width: 100,
    render({ record }) {
      return record.isHost ? (
        <a-avatar
          v-slots={{
            'trigger-icon': () => <IconHeartFill style="color:rgb(239, 68, 68)" />
          }}
        >
          <img class="max-w-fit" src={record.avatar} />
        </a-avatar>
      ) : (
        <a-avatar>
          <img class="max-w-fit" src={record.avatar} />
        </a-avatar>
      )
    }
  },

  {
    title: '简介',
    dataIndex: 'bio'
  },
  // twitter
  {
    title: '链接Link',
    render({ record }) {
      return (
        <a-button-group type="primary">
          {record.twitter && (
            <a-button
              type="text"
              onClick={() => {
                window.open(record.twitter)
              }}
              v-slots={{
                icon: () => <IconTwitter />
              }}
            ></a-button>
          )}
          {record.link && (
            <a-button
              type="text"
              onClick={() => {
                window.open(record.link)
              }}
              v-slots={{
                icon: () => <IconShareAlt />
              }}
            ></a-button>
          )}
        </a-button-group>
      )
    }
  },
  {
    title: '操作',
    slotName: 'action',
    fixed: 'right'
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
