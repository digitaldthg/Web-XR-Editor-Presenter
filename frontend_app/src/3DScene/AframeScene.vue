<template>
  <a-scene>
    <!-- Basic box. -->
    <a-box color="tomato" depth="2" height="4" width="0.5"></a-box>
  </a-scene>
</template>

<script>
export default {
  name : "AframeScene",
  mounted(){
    console.log("ascene has loaded");
  },
  methods:{

  }

}
</script>