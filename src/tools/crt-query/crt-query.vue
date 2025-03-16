<template>
  <c-card>
    <div mx-auto max-w-sm>
      <c-input-text
        v-model:value="searchValue"
        size="large"
        :placeholder="$t('tools.crt-query.placeholder')"
        mb-3
      />
      <c-button v-if="loading" disabled>查询中...</c-button>
      <c-button v-else @click="handleSearch">查询</c-button>
      <div v-if="results.length">共查询：{{results.length}}条数据</div>
    </div>

  </c-card>

  <c-card>
    <div class="results-html">
      <c-table :data="results"
               :headers="['entry_timestamp', 'not_before', 'not_after', 'common_name', 'name_value', 'issuer_name']"
               mb-2 />
    </div>
  </c-card>
</template>

<script setup lang="ts">

import { useQueryParam } from '@/composable/queryParams';
import CrtQueryService from '@/tools/crt-query/crt-query.service';

const results = ref([])
const searchValue = useQueryParam({ name: 'search', defaultValue: '' })
const loading = ref(false)
const message = useMessage();

const handleSearch = async () => {
  try {
    loading.value = true;
    results.value = await CrtQueryService.search(searchValue.value);
  }catch (e) {
    console.error(e);
    message.error(e.message);
  } finally {
    loading.value = false;
  }
}
onMounted(() => {
  if (searchValue.value){
    handleSearch()
  }
})
</script>

<style lang="less" scoped>
</style>
