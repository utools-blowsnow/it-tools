<script setup lang="ts">
import { tools } from '@/tools';
import { useToolStore } from '@/tools/tools.store';
import { RouterView, useRoute } from 'vue-router';
import { NGlobalStyle, NMessageProvider, NNotificationProvider, darkTheme } from 'naive-ui';
import { darkThemeOverrides, lightThemeOverrides } from './themes';
import { layouts } from './layouts';
import { useStyleStore } from './stores/style.store';

const route = useRoute();
const layout = computed(() => route?.meta?.layout ?? layouts.base);
const styleStore = useStyleStore();

const theme = computed(() => (styleStore.isDarkTheme ? darkTheme : null));
const themeOverrides = computed(() => (styleStore.isDarkTheme ? darkThemeOverrides : lightThemeOverrides));

const { locale } = useI18n();

// 如果在utools里面
if (window['utools']){

  console.log("create app");

  const initToolsFeatures = () => {
    let toolStore = useToolStore()
    // 扫描所有tools
    for (const tool of toolStore.tools) {
      utools.removeFeature(tool.path)

      let matchStr = (tool.keywords||[]).join("|")

      utools.setFeature({
        code: tool.path,
        explain: tool.description,
        cmds: [
          tool.name,
          ...(tool.cmds || []),
          // 关键词匹配
          {
            // 类型标记（必须）
            "type": "regex",
            // 指令名称（必须）
            "label": tool.name,
            "match": "/("+matchStr+")/i",
          },
        ],
      });
    }
  }

  // 扫描所有tools
  initToolsFeatures()

  console.log("set tools locale", locale.value);
}


syncRef(
  locale,
  useStorage('locale', locale),
);
</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <NGlobalStyle />
    <NMessageProvider placement="bottom">
      <NNotificationProvider placement="bottom-right">
        <component :is="layout">
          <RouterView />
        </component>
      </NNotificationProvider>
    </NMessageProvider>
  </n-config-provider>
</template>

<style>
body {
  min-height: 100%;
  margin: 0;
  padding: 0;
}

html {
  height: 100%;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}
</style>
