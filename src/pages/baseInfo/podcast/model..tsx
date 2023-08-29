import { db } from '@/utils/cloud'
import type { TableColumnData } from '@arco-design/web-vue'
import { ButtonGroup as AButtonGroup, Button } from '@arco-design/web-vue'
import dayjs from 'dayjs'

// @ts-ignore
export const useTable = () => {
  // query form
  const defaultQueryFormModel = () => ({
    name: ''
  })
  const queryFormModel = ref(defaultQueryFormModel())

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
      // dataIndex: 'date',
      width: 120,
      render({ record }) {
        return dayjs(record.date).format('YYYY-MM-DD')
      }
    },
    {
      title: '链接',
      render({ record }) {
        return (
          <AButtonGroup size="mini">
            <Button
              type="text"
              disabled={!record.xyz}
              onClick={() => {
                window.open(record.xyz)
              }}
            >
              小宇宙
            </Button>

            <Button
              type="text"
              disabled={!record.apple}
              onClick={() => {
                window.open(record.apple)
              }}
            >
              苹果
            </Button>
            <Button
              type="text"
              disabled={!record.ipfs}
              onClick={() => {
                window.open(record.ipfs)
              }}
            >
              IPFS
            </Button>
          </AButtonGroup>
        )
      }
    },
    {
      title: '操作',
      slotName: 'action',
      fixed: 'right'
    }
  ])

  const COL_NAME = 'ww-podcast'

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
  return {
    defaultQueryFormModel,
    queryFormModel,
    tableData,
    tableColumns,
    fetchTable
  }
}
