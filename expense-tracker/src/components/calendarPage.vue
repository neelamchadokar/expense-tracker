<template>
    <div class="my-3 ">
        <addEntry v-on:updateEvents="updateEvents" :dateClicked="selectedDate"></addEntry>
        
        <div class="flex container1 justify-evenly ">
            <div class="cal lg:w-[45vw] flex justify-center align-middle" >

                <Fullcalendar :options="calendarOptions" class=" p-2 shadow-lg font-mono h-auto" >
                <template v-slot:eventContent='arg'>
      <i >
        <!-- {{ arg.event.extendedProps.organizer }}abc -->
        <span class="cursor-pointer">{{ arg.event.extendedProps.amount }} Rs
        <br>Total</span></i>
    </template></Fullcalendar>
            </div>
            <div class=" shadow-lg lg:w-[45vw]">
                <div class="flex justify-center">
                    <pieChart :label="labels" :series="series"></pieChart>
                </div>
                <div class="flex flex-col">
                    <allData v-on:updateEvents="updateEvents" :date='dateStr' :rows="rows"></allData>
                    <button class="p-1 bg-blue-300 rounded-md font-bold" @click="addrow">+ ADD</button>
                </div>
                <!-- <div class="">
                    <h2 class="flex justify-around">Income: <input type="number" name="" id="" class="px-2 border-2 w-48" v-model="income"><span>Expenses: </span>: <span><b>{{ total }}</b></span>
                     Savings:  <b>{{ income-total }}</b></h2>
                </div> -->
                <!-- <div class="chart bg-pink-100">
Liorem ipsum dolor sit amet consectetur adipisicing elit. Et a tenetur iusto molestias mollitia odio, ipsa itaque. Assumenda explicabo fugiat, nemo distinctio deserunt illo eligendi! Voluptatibus modi officiis a optio?
            </div> -->

            </div>
            
        </div>

    </div>
</template>

<script>
import pieChart from './graphs/pieChart.vue'
import addEntry from './addEntry.vue'
import allData from './allData.vue'
import Fullcalendar from '@fullcalendar/vue'
import DayGridPlugin from '@fullcalendar/daygrid'
import TimeGridPlugin from '@fullcalendar/timegrid'
import InteractionPlugin from '@fullcalendar/interaction'
import ListPlugin from '@fullcalendar/list'
// import dayEvent from './jsons/dayEvents.json'
// require('@fullcalendar/core/main.min.css')
// require('@fullcalendar/daygrid/main.min.css')
import axios from 'axios';
    export default {
        components:{
            Fullcalendar, addEntry, allData, pieChart
        },
        data(){
            return{
                labels:[],
                series:[],
                rows:[],
                income:25000,
                col:'#33ffda',
                // headerToolbar:{left:'dayGridMonth, timeGridWeek,timeGridDay',center:'', right:'prev today next'},
                calendarOptions: {
                    height:'auto',
                    headerToolbar:{left:'title',center:'', right:'prev today next'},
        plugins: [ DayGridPlugin, InteractionPlugin, TimeGridPlugin, ListPlugin ],
        initialView: 'dayGridMonth',
        dateClick:this.handleDateClick,
        eventClick:this.handleEventClick,
        events:[]
      },
      selectedDate:'',
      dateStr:new Date().toLocaleDateString('en-US')

            }
        },computed:{
            total(){
                let temp =this.rows.reduce((acc,val)=>{
                    // console.log(val)
                    return acc+val.amount
                },0)

                return temp
            }
        },
        methods:{
            addrow(){
                this.selectedDate=this.dateStr
                this.$bvModal.show('addEntry')
            },
            handleDateClick(arg){
                console.log(this.calendarOptions.events,'okay',this.calendarOptions,arg)
                // this.calendarOptions.events.push({title:'abc',date:arg.dateStr})
                this.selectedDate=arg.dateStr
                this.$bvModal.show('addEntry')
                
            },
            updateEvents(){
                console.log('update event')
                this.getEvents()
                this.getDayEvents()
                this.getDayPie()
            },
            handleEventClick(arg){

                this.dateStr=arg.event.startStr

console.log(arg.event,'event date')
               this.getDayEvents()
               this.getDayPie()

                // console.log('event clicked'+JSON.stringify(arg),this.dateStr)
                // this.$bvModal.show('allData')

            },
            getDayEvents(){
                axios.get(process.env.VUE_APP_BASE_URL+'dateEvents',{params:{
                    eventDate:this.dateStr
                }})
                .then((res)=>{
                    console.log(res,'all events')
                    this.rows=res.data
                    if(!this.rows.length){
                        this.labels=[]
                        this.series=[]
                    }
                    // this.rows=res.data.events
                })
                .catch((err)=>{
                    alert(JSON.stringify(err))
                })
            },
            getDayPie(){
                axios.get(process.env.VUE_APP_BASE_URL+'getDatePie',{params:{
                    eventDate:this.dateStr

                }})
                .then((res)=>{
                    this.labels=res.data.labels
                    this.series=res.data.series
                    console.log(res,'all events')
                    // this.rows=res.data
                    // this.rows=res.data.events
                })
                .catch((err)=>{
                    alert(JSON.stringify(err))
                })
            },
            getEvents(){
                axios.get(process.env.VUE_APP_BASE_URL+'getEvents')
                .then((res)=>{
                    console.log(res,'all events')
                    this.calendarOptions.events=res.data.events
                    // this.rows=res.data.events
                })
                .catch((err)=>{
                    alert(JSON.stringify(err))
                })
            },
            addEvent(param){
                console.log(param,'mydra')
                this.calendarOptions.events.push({title:param.type.key, date:this.selectedDate,amount:param.amount})
                // this.calendarOptions.events=[{title:param.type.key, date:this.selectedDate, amount:param.amount}]
            }
        },
        created(){
            this.getEvents()
        }
    }
</script>
<style lang="css" src="./input.css"></style>
<!-- <style lang="scss" scoped>

</style> -->