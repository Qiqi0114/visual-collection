<template>
  <div>123</div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { getYearByZAPI, workLoadListAPI } from "../../api/visualizationAttempts";

//获取教学工作量
const workLoadList = async() =>{
    try{
        const res = await workLoadListAPI({
            yearId:'',
            mentId:'',
        })
        if(res.data.code === 200){

        }else{

        }
    }catch(e){

    }
}
//获取教学工作量合计
const getYearByZ = async() =>{
    try{
        const res = await getYearByZAPI({
            yearId:'',
        })
        if(res.data.code === 200){

        }else{
            
        }
    }catch(e){

    }
}
onMounted(()=>{
    debugger
     workLoadList();
     getYearByZ();
})
</script>

<style lang="scss" scoped>

</style>