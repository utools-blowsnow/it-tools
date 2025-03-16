<script setup lang="ts">
import { useQueryParam } from '@/composable/queryParams';
import { useUtoolsStorage } from '@/storage/utoolsStorage';
import { getDnsRecords } from '@layered/dns-records';
import types from './dns.records.types.json';
const searchValue = useQueryParam({ name: 'search', defaultValue: '' });
const results = ref<any[]>([]);
const servers = [
  {
    label: "cloudflare-dns",
    value: "cloudflare-dns"
  },
  {
    label: "google-dns",
    value: "google-dns"
  }
]

const server = useUtoolsStorage("dns-queries:server", servers[0].value)
const type = useUtoolsStorage("dns-queries:type", 'A')

const loading = ref(false)
const message = useMessage();
async function handleSearch() {
  try {
    loading.value = true;
    results.value  = await getDnsRecords(searchValue.value, type.value,server.value);
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

<template>
  <div>
    <c-input-text
      v-model:value="searchValue"
      label="域名名称："
      label-width="120px"
      label-position="left"
      placeholder="Name to query"
      mb-2
    />
    <c-select
      v-model:value="type"
      searchable
      label="DNS记录类型："
      label-width="120px"
      label-position="left"
      :options="Object.values(types).map(kv => ({ value: kv.value, label: `${kv.value}: ${kv.label}` }))"
      mb-2
    />
    <c-select
      v-model:value="server"
      searchable
      label="DNS服务器："
      label-width="120px"
      label-position="left"
      :options="Object.values(servers).map(kv => ({ value: kv.value, label: `${kv.label}` }))"
      mb-2
    />
    <div flex justify-center>
      <c-button v-if="loading" disabled>查询中...</c-button>
      <c-button v-else @click="handleSearch">查询</c-button>
    </div>

    <n-divider />

    <c-card>
      <div class="results-html">
        <c-table :data="results" mb-2 />
      </div>
    </c-card>
  </div>
</template>
