<template>
  <div>
    <a-switch :checked="menuData.mode === 'vertical'" @change="changeMode" />
    Change Mode
    <span class="ant-divider" style="margin: 0 1em" />
    <a-switch :checked="menuData.theme === 'dark'" @change="changeTheme" />
    Change Theme
    <br />
    <br />
    <a-menu
      v-model:openKeys="menuData.openKeys"
      v-model:selectedKeys="menuData.selectedKeys"
      :mode="menuData.mode"
      :theme="menuData.theme"
    >
      <a-menu-item key="/dashboard">
        <template #icon>
          <home-outlined />
        </template>
        <span to="/dashboard">首页</span>
      </a-menu-item>
      <a-sub-menu key="/system">
        <template #icon>
          <setting-outlined />
        </template>
        <template #title>系统管理</template>
        <a-menu-item key="/user" index="/user">
          <template #icon>
            <user-outlined />
          </template>
          <span to="/user">用户管理</span>
        </a-menu-item>
        <a-menu-item key="/role">
          <template #icon>
            <PieChartOutlined />
          </template>
          <span to="/role">角色管理</span>
        </a-menu-item>
        <a-menu-item key="/menu">
          <template #icon>
            <unordered-list-outlined />
          </template>
          <span to="/menu">菜单管理</span>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>Navigation Three</template>
        <a-menu-item key="5">Option 3</a-menu-item>
        <a-menu-item key="6">Option 4</a-menu-item>
        <a-sub-menu key="sub1-2" title="Submenu">
          <a-menu-item key="7">Option 5</a-menu-item>
          <a-menu-item key="8">Option 6</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs } from "vue";
import type { MenuMode, MenuTheme } from "ant-design-vue";
const menuData = reactive({
  mode: "inline" as MenuMode,
  theme: "light" as MenuTheme,
  selectedKeys: ["1"],
  openKeys: ["sub1"],
});
const changeMode = (checked: boolean) => {
  menuData.mode = checked ? "vertical" : "inline";
};
const changeTheme = (checked: boolean) => {
  menuData.theme = checked ? "dark" : "light";
};
</script>
