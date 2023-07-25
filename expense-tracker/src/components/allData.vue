<template>
    <div>
        <!-- <b-modal id="allData" hide-footer no-header centered>
    <template #modal-title> -->
      <div class="flex justify-around">
        <span>All expenses: <b>{{ date }}</b></span>
      <span><b>Total: {{ total }} Rs/-</b></span>
      </div>

    <!-- </template> -->
    <div class="">
        <b-table striped :items="rows" :fields="fields" 
        >
        <template #cell(category)="data">
            <span v-if="edit">
                <select v-model="data.item.category" placeholder="abc">
                    <option value="" disabled selected>Select your option</option>
                    <option>electricity</option>
  <option>B</option>
  <option>C</option>
</select>
            </span>
            <span v-else>{{ data.item.category }}</span>
        </template>
        <template #cell(action)="data">
            <b-icon v-if="edit" class="cursor-pointer" icon="check-circle-fill" variant="success" aria-hidden="true"></b-icon>
            <!-- <b-icon v-else class="cursor-pointer" icon="pencil-square" aria-hidden="true"></b-icon> -->
           

            <b-icon class="px-2 cursor-pointer" icon="trash-fill" variant="danger" aria-hidden="true" @click="deleteEvent(data.item._id)"></b-icon>
      </template>
    </b-table>
   </div><br>
  <!-- </b-modal> -->
    </div>
</template>

<script>
import dayEvent from './jsons/dayEvents.json'
import axios from 'axios';
    export default {
        props:{
date:String,
rows:Array
        },
        
        data(){
            return{
               fields:['category','subCategory','amount','remarks','action'],
                events:dayEvent,
                selected:{key:'shopping',tag:'green',id:1},
                amount:0,
                edit:false,
                selectedKey:''
                
            }
        },
        computed:{
            total(){
                let temp =this.rows.reduce((acc,val)=>{
                    // console.log(val)
                    return acc+val.amount
                },0)

                return temp
            }
        },
        methods:{
            selectType(list){
                this.selected=list
            },
            add(){
                this.$emit('addEvent',{type:this.selected,amount:this.amount})
                this.$bvModal.hide('allData')
                this.amount=0
            },
            deleteEvent(eid){
                
                console.log(eid,'iddddd')
                axios.delete(process.env.VUE_APP_BASE_URL+'delete',{
                    params:{
                        'id':eid
                    }
                })
                .then((res)=>{
                    
                    this.$emit('updateEvents','')
                    console.log(res.data)
                })
                .catch((err)=>{
                    alert(JSON.stringify(err))
                })

            }
        }
    }
</script>

<style lang="css" src="./input.css">

</style>