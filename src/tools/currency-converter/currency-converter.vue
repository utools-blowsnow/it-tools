<script setup lang="ts">
import moneysData from './moneys.json';
import { useQueryParamOrStorage } from '@/composable/queryParams';

const allCurrencies = Object.entries(moneysData).map(([k, v]) => ({ value: k, label: v || k }));
const currentCurrency = useQueryParamOrStorage<string>({ name: 'from', storageName: 'currency-conv:cur', defaultValue: 'cny' });
const otherCurrencies = useQueryParamOrStorage<{ name: string }[]>({ name: 'to', storageName: 'currency-conv:others', defaultValue: [{ name: 'usd' }] });
const amount = ref(1);
// 获取现在年月日
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const currentDatetime = ref('');

const convertedCurrencies = computedAsync<Record<string, number>>(async () => {
  const currentCurrencyValue = currentCurrency.value;
  const currentDatetimeValue = currentDatetime.value;
  const amountValue = amount.value;
  const otherCurrenciesValues = otherCurrencies.value;

  let result = {};
  for (const targetCurrency of otherCurrenciesValues) {
    const value = await convertOnDate(amountValue, currentCurrencyValue, targetCurrency.name, currentDatetimeValue);
    result = { ...result, [targetCurrency.name]: value };
  }
  return result;
});
const cache = {}
const convertOnDate = async (value: number, fromCurrency: string, toCurrency: string, inputDate: string) => {
  fromCurrency = fromCurrency.trim().toLowerCase();
  toCurrency = toCurrency.trim().toLowerCase();

  const cacheKey = `${fromCurrency}-${inputDate}`;
  let data = null;
  if (cache[cacheKey]){
    data = cache[cacheKey];
  }else{
    data = cache[cacheKey] = await fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${inputDate}/v1/currencies/${fromCurrency}.json`
    )
      .then((res) => res.json())
      .catch((_) => {
        throw new Error(`Error: ${fromCurrency} to ${toCurrency} conversion not available`);
      });;
  }

  return value * data[fromCurrency][toCurrency];
};

currentDatetime.value = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)
</script>

<template>
  <div>
    <c-card :title="$t('tools.currency-converter.title')" mb-2>
      <c-select
        v-model:value="currentCurrency"
        :label="$t('tools.currency-converter.from')"
        label-position="left"
        searchable
        :options="allCurrencies"
        mb-2
      />
      <n-form-item :label="$t('tools.currency-converter.fromDate')" label-placement="left" mb-2>
        <!--          不能超过今天日期-->
        <n-date-picker
          v-model:formatted-value="currentDatetime"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          :is-date-disabled="(current: number,phase: 'start' | 'end',value: [number, number] | null) => {
            return current > Date.now();
          }"
          type="date"
        />
      </n-form-item>

      <n-form-item :label="$t('tools.currency-converter.amount')" label-placement="left" mb-2>
        <n-input-number v-model:value="amount" :min="0" />
      </n-form-item>

      <c-card :title="$t('tools.currency-converter.convertedCurrencies')">
        <n-dynamic-input
          v-model:value="otherCurrencies"
          show-sort-button
          :on-create="() => ({ name: 'eur' })"
        >
          <template #default="{ value }">
            <div flex flex-wrap items-center gap-1>
              <n-select
                v-model:value="value.name"
                filterable
                placeholder="Please select a currency"
                :options="allCurrencies"
                w-full
              />
              <input-copyable readonly :value="convertedCurrencies ? convertedCurrencies[value.name] : 0" />
            </div>
          </template>
        </n-dynamic-input>
      </c-card>
    </c-card>

  </div>
</template>
