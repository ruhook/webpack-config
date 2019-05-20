<template>
   <div class="test">
     1233
     <img :src="testImg"/>
   </div>
</template>

<script>
import testImg from './test.png'
export default {
   data() {
     return {
       testImg
     }
   }
}
</script>

<style scoped lang='scss' type='text/css'>
.test {
  color:red;
}
</style>
