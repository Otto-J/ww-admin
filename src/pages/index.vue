<template>
  <a-row style="background-color: var(--color-menu-light-bg)" class="container p-2 h-full">
    <a-col :span="12">列表页</a-col>
    <a-col :span="12">
      <a-form :model="formModel">
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
          <a-input v-model="formModel.cover" />
        </a-form-item>
        <!-- 下拉框 host -->
        <a-form-item field="host" label="主持人">
          <a-select :multiple="true" v-model="formModel.host" mode="tags">
            <a-option value="辛宝Otto">辛宝Otto</a-option>
            <a-option value="刘威Franky">刘威Franky</a-option>
            <a-option value="小白菜">小白菜</a-option>
            <a-option value="开翼">开翼</a-option>
          </a-select>
        </a-form-item>
        <!-- 飞行嘉宾，输入回车确认 -->
      </a-form>
    </a-col>
  </a-row>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

defineOptions({
  name: 'PageIndex'
})

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
</script>

<style module>
.page {
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  /* background-image: linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%); */
  --color-menu-light-bg: #fff;
  height: 100vh;
}
</style>
