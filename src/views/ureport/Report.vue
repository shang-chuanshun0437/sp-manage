/*
 * Author: 阿甘
 * Email:519983770@qq.com
 */

<template>
  <div style="height: 100%;width: 100%">
    <iframe name="myiframe" id="myrame" src="http://47.94.86.112:8080/smartlock/ureport/designer" frameborder="0"
            align="left" width="100%" height="100%"  scrolling="auto" marginWidth=0 marginHeight=0
            onload="changeFrameHeight()">
      <p class="tip">你的浏览器不支持iframe标签</p>
    </iframe>
  </div>

</template>

<script>
import * as API from "../../axios/api";
import * as URL from "../../axios/url";

export default {
  computed: {
  },
  data() {
    return {

    };
  },
  created() {

  },
  methods: {
  }
};
</script>

<style>

</style>
