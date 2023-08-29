<template>
  <a-page-header class="bg-white rounded-md mb-4" :title="$route.meta.title">
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
    <query-header :model="queryForm" @submit="fetchTable">
      <!-- name input -->
      <a-form-item field="title" label="姓名6">
        <a-input v-model="queryForm.title" />
      </a-form-item>
    </query-header>
    <a-divider />
    <a-query-table :request="fetchTable" :columns="tableColumns" :params="queryForm">
      <template #action="{ record }">
        <a-space>
          <a-button size="small" type="text" @click="editItem(record)">编辑</a-button>
          <a-popconfirm content="Are you sure you want to delete?" @ok="deleteItem(record)">
            <a-button size="small" status="danger" type="text">删除</a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </a-query-table>

    <CommonModal
      v-model:visible="modalVisible.visible"
      :type="modalVisible.type"
      :id="modalVisible.id"
      @ok="onOk"
      @cancel="onCancel"
    >
      <a-form :model="modalForm">
        <!-- title -->
        <a-form-item field="title" label="标题">
          <a-input v-model="modalForm.title" />
        </a-form-item>
        <!-- order 顺序 -->
        <a-form-item field="order" label="顺序">
          <a-input-number v-model="modalForm.order" />
        </a-form-item>
        <!-- content text area -->
        <a-form-item field="content" label="内容">
          <a-textarea v-model="modalForm.content" />
        </a-form-item>
        <!-- 是否发布 switch -->
        <a-form-item field="publish" label="是否发布">
          <a-switch v-model="modalForm.publish" />
        </a-form-item>
      </a-form>
    </CommonModal>
  </div>
</template>
<script lang="ts" setup>
import { IconPlus } from '@arco-design/web-vue/lib/icon'
import { ref } from 'vue'
// import AQueryHeader from '@dangojs/a-query-header'
import AQueryTable from '@dangojs/a-query-table'
import { Message, type TableColumnData } from '@arco-design/web-vue'
import CommonModal from '@/components/common-modal.vue'
import { db } from '@/utils/cloud'

const addItem = () => {
  modalVisible.value.visible = true
}

const col = db.collection('podcast-remark')

const queryForm = ref({
  title: ''
})

const modalVisible = ref({
  visible: false,
  id: '',
  type: 'add' as 'add' | 'edit'
})

const tableColumns: TableColumnData[] = [
  // 序号
  {
    title: '序号',
    render: ({ rowIndex }) => rowIndex + 1,
    width: 80
  },
  {
    title: '标题',
    dataIndex: 'title',
    width: 200
  },
  // 排序 order
  {
    title: '权重',
    dataIndex: 'order',
    // 支持 sort
    // sorter: true
    sortable: {
      sortDirections: ['ascend', 'descend']
    },
    width: 100
  },
  {
    title: '内容',
    dataIndex: 'content'
  },
  // 是否发布 switch
  {
    title: '是否发布',
    dataIndex: 'publish',
    width: 100,
    render: ({ record }) => {
      return record.publish ? '是' : '否'
    }
  },
  {
    title: '操作',
    slotName: 'action',
    fixed: 'right',
    width: 140
  }
]

const editItem = (record: any) => {
  modalVisible.value = {
    visible: true,
    id: record._id,
    type: 'edit'
  }
}

watchEffect(() => {
  if (!modalVisible.value.visible) {
    modalVisible.value.id = ''
    modalVisible.value.type = 'add'
  }
})

// 监听id变化
watchEffect(() => {
  if (modalVisible.value.visible && modalVisible.value.id && modalVisible.value.type === 'edit') {
    col
      .doc(modalVisible.value.id)
      .get()
      .then((res) => {
        console.log(9, res)
        if (res.ok) {
          modalForm.value = res.data
        }
      })
      .catch((err) => {
        console.log(8, err)
      })
  }
})

// delete
const deleteItem = (record: any) => {
  // Message.error('暂不实现')

  col
    .doc(record._id)
    .remove()
    .then((res) => {
      console.log(9, res)
      if (res.ok) {
        Message.success('删除成功')
        fetchTable()
      } else {
        Message.error('删除失败')
      }
    })
    .catch((err) => {
      console.log(8, err)
      Message.error('删除失败')
    })
}

const fetchTable = async () => {
  return col
    .get()
    .then((res) => {
      console.log(9, res)
      if (res.ok) {
        return {
          success: true,
          data: res.data,
          total: 0
        }
      } else {
        return {
          success: false,
          data: [],
          total: 0
        }
      }
    })
    .catch(() => {
      return {
        success: false,
        data: [],
        total: 0
      }
    })
}
const defaultModalFrom = () => ({
  title: '',
  order: 1,
  content: '',
  publish: true
})
const modalForm = ref(defaultModalFrom())

const closeModal = () => {
  modalVisible.value.visible = false

  modalForm.value = defaultModalFrom()
}
const onOk = () => {
  console.log('ok', modalForm.value)
  if (modalVisible.value.type === 'add') {
    col
      .add(modalForm.value)
      .then(() => {
        console.log(45)
        closeModal()
        fetchTable()
      })
      .catch((err) => {
        console.log(8, err)
      })
  } else {
    col
      .doc(modalVisible.value.id)
      .update(modalForm.value)
      .then((res) => {
        // console.log(9, res)
        closeModal()
      })
      .catch((err) => {
        console.log(8, err)
      })
  }
}
const onCancel = () => {
  console.log(89)
  closeModal()
  //  add col podcast-remark
}
</script>

<route lang="json">
{
  "name": "PageWords",
  "meta": {
    "requiresAuth": false,
    "title": "文字片段"
  }
}
</route>

<style></style>
