<template>
    <div class="IndexBox">
        <div class="EachartsOne" id="EachartsOneId"></div>
        <div style="background-color: white; height: 500px; width: 411.5px; ">
        <div style="width: 100%;height: 50px;">
           <p style="color:#333;font-size: 14px; margin-left: 30px;line-height: 70px;">系统公告</p>
        </div>
            <el-divider></el-divider>
            <p class="Hover" >修复登录Bug</p>
            <p class="Hover">更新菜单功能</p>
            <p class="Hover">制作商品管理功能</p>
            <p class="Hover">修复上传图片Bug</p>
            <p class="Hover">增加路由权限判断</p>
            <p class="Hover">增加管理员功能</p>
            <p class="Hover">增加秒杀活动功能</p>
         </div>
    </div>
</template>

<script>
//EachartsOne柱状图
import * as echarts from 'echarts'
import { onMounted,reactive} from 'vue';



export default {
    setup() {
        // mounted
        onMounted(() => {
var chartDom = document.getElementById('EachartsOneId');
var myChart = echarts.init(chartDom);
var option;

option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [12000 , 13960, 20000, 12970, 15000, 13529, 14000],
      type: 'line'
    }
  ]
};


    option && myChart.setOption(option);

        });
      
    },
}

</script>

<style lang="scss" scoped>
.IndexBox {
    position: relative;
    display: flex;
    align-content: space-between;
    justify-self: space-around !important;
    flex-wrap: nowrap;
    gap: 100px;
    top: 30px;
}

.EachartsOne {
    width: 750px;
    height: 350px;
    background-color: white;
    position: relative;
    left: 40px;
}

.EachartsTwo {
    width: 550px;
    height: 550px;
    background-color: white;
    position: relative;
    left: 120px;
}
p{
    width: 100%;
    height: 60px;
    position: relative;
}
.Hover{
    position: relative;
    left: 20px;
    line-height: 30px;
    color: gray;
    overflow: hidden;
}
.Hover:hover{
    background-color: rgba($color: #eee, $alpha: 0.4);
}
</style>