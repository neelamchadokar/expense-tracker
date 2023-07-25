<template>
    <div>
        <div>
            <div class="h-[35vh]">
                <span v-if="series">click on event to get graph</span>
      <apex-chart width="350" type="pie" :options="options" :series="series"></apex-chart>
    </div>
</div>
    </div>
</template>

<script>
/* eslint-disable */ 
import VueApexCharts from 'vue-apexcharts'
import dayEvent from './../jsons/dayEvents.json'
    export default {
        props:{
            label:Array,
            series:Array
        },
        data: function() {
    return {
        options: {
            
    labels: [],
    colors:['#FF2E00','#F5D547','#2DD881','#FE7F2D','#4062BB','#54DEFD','#C589E8','#C52233','#FCCA46','#DB3069']
  },
    //   series: dayEvent.map(item=>item.amount)
    }
  },
  watch:{
    label(nv,ov){
        console.log("ko",this.options)
        this.options = {labels:nv}
    }
  }
    }
</script>

<style lang="scss" scoped>

</style>