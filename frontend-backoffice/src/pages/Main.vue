<template>
  <div class="" id="navbar">
    <Navbar/>
    <el-container>
      <div class="content">
        <router-view/>
      </div>
    </el-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  components: {
    Navbar
  }
  
}
</script>
<style>
#navbar {
  width: 100%;
  padding: 0;
  margin-top: 0;
}
.content {
  width: 100%;
  padding: 24px;
}
</style>