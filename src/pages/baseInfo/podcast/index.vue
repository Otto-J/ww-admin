<template>
  <div>
    <a-page-header class="bg-white rounded-md mb-4" :title="($route.meta.title as string)??''">
      <template #extra>
        <div class="text-right">
          <a-space>
            <a-button type="primary" @click="addItem">
              <template #icon>
                <IconPlus />
              </template>
              添加</a-button
            >
            <!-- <a-button type="primary" @click="genFile"> 生成md文件 </a-button> -->
          </a-space>
        </div>
      </template>
    </a-page-header>
    <div class="w-full p-4 bg-white rounded-md">
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
        :pagination="{
          pageSize: 20
        }"
        :columns="tableColumns"
      >
        <template #action="{ record }">
          <a-space>
            <a-button type="text" size="mini" @click="updateItem(record)">更新</a-button>
          </a-space>
        </template>
      </a-table>
    </div>
    <PodcastModel
      v-model:visible="modelStatus.visible"
      :id="modelStatus.id"
      :type="modelStatus.type"
      @refresh="fetchTable"
    ></PodcastModel>
  </div>
</template>

<script lang="tsx" setup>
import { IconPlus } from '@arco-design/web-vue/es/icon'
import { Cloud } from 'laf-client-sdk'
import { type TableColumnData } from '@arco-design/web-vue'
import PodcastModel from './components/model.vue'

defineOptions({
  name: 'PagePodcast'
})

// query form
const defaultQueryFormModel = () => ({
  name: ''
})
const queryFormModel = ref(defaultQueryFormModel())

const modelStatus = ref({
  visible: false,
  type: 'add' as 'add' | 'edit',
  id: ''
})

const addItem = () => {
  console.log('add')
  modelStatus.value = {
    visible: true,
    type: 'add',
    id: ''
  }
}

const updateItem = ({ _id }: any) => {
  console.log(_id)
  modelStatus.value = {
    visible: true,
    type: 'edit',
    id: _id
  }
}
// const genFile = () => {}

const cloud = new Cloud({
  // 这里 APPID 需要换成对应的 APPID
  baseUrl: 'https://admin.webworker.tech',
  // 这里是访问策略的入口地址，如果没有访问策略可不填
  dbProxyUrl: '/proxy/podcast',
  // 请求时带的 token，可空
  getAccessToken: () => localStorage.getItem('access_token') as string
})

const db = cloud.database()
const COL_NAME = 'ww-podcast'

const tableData = ref<any[]>([])
const tableColumns = ref<TableColumnData[]>([
  {
    title: '序号',
    dataIndex: 'No',
    width: 90,
    fixed: 'left',
    sortable: {
      sortDirections: ['ascend', 'descend']
    }
  },
  {
    title: '标题',
    dataIndex: 'title',
    // width: 160,
    fixed: 'left'
  },
  {
    title: '日期',
    dataIndex: 'date',
    width: 180
  },
  {
    title: '链接',
    render({ record }) {
      return (
        <a-button-group size="mini">
          <a-button
            type="text"
            disabled={!record.xyz}
            onClick={() => {
              window.open(record.xyz)
            }}
          >
            小宇宙
          </a-button>

          <a-button
            type="text"
            disabled={!record.apple}
            onClick={() => {
              window.open(record.apple)
            }}
          >
            苹果
          </a-button>
          <a-button
            type="text"
            disabled={!record.ipfs}
            onClick={() => {
              window.open(record.ipfs)
            }}
          >
            IPFS
          </a-button>
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

onMounted(() => {
  fetchTable(true)
})

const fetchTable = (isDesc = true) => {
  const col = db.collection(COL_NAME)

  col
    .where({
      title: new RegExp(queryFormModel.value.name, 'i')
    })
    // 按照 No 字段排序
    .orderBy('No', isDesc ? 'desc' : 'asc')
    .get()
    .then((res) => {
      console.log(2, res)
      if (res.ok) {
        tableData.value = res.data
      }
    })
}
</script>

<route lang="json">
{
  "name": "PagePodcast",
  "meta": {
    "requiresAuth": false,
    "title": "播客列表"
  }
}
</route>

<style></style>
