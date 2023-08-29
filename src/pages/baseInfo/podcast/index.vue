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
        <a-form-item field="name" label="标题">
          <a-input v-model="queryFormModel.name" @press-enter="fetchTable()" />
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
import PodcastModel from './components/model.vue'
import { useTable } from './model.'

defineOptions({
  name: 'PagePodcast'
})

const { queryFormModel, tableData, tableColumns, fetchTable } = useTable()

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

onMounted(() => {
  fetchTable()
})
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
