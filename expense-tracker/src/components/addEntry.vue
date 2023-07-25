<template>
    <div>
        <b-modal id="addEntry" hide-footer no-header centered>
    <template #modal-title>
      <span>Add expenses of <b>{{ dateClicked }}</b></span>
    </template>
    <div class="">
        <h3 class="">Categories
            <span v-if="!editMode" class="float-right cursor-pointer shadow-md rounded-sm py-1 px-3" @click="editMode=true">Add More</span>
            <span v-else class="float-right cursor-pointer shadow-md rounded-sm px-3 py-1" @click="saveCat">Done</span>
        </h3>
        <br>
        <div v-show="editMode">
            <div class="flex justify-between my-3">
    
    <input v-model="cate" type="text" name="" id="" class="border-2 w-[50%] px-2">
    <input type="color" name="" id="" v-model="col">
    <span class="bg-blue-00 p-2 rounded-md shadow-md text-black cursor-pointer" :disabled="!cate" @click="addCat">Add Category</span>
    
   </div>
        </div>
        <div class="objects flex flex-wrap">
            
        <span  v-for="list in listType" :key="list.id" class="my-2 mx-1" @click="selectType(list)">
            <span class="my-3">
                <span class="text-black rounded-lg p-2 text-lg m-auto cursor-pointer shadow-md" :style="{background:list.tag}">{{ list.categoryName }}</span><b-icon v-if="editMode" icon="x-circle" class ="icon" scale="1" variant="danger" @click="deleteCat(list._id)"></b-icon>
            </span>
    </span>
        <br>
        
    </div>
    <div v-show="!editMode" >
    
   <div class="flex justify-between mt-3">
    
    <div class="felx flex-col">
        <h3 class="my-1">Sub Category</h3>
        <input v-model="sub" type="text" name="" id="" class="border-2 w-[70%] px-2">
    </div>
    <div class="felx flex-col">
        <h3 class="my-1">Amount</h3>
       <div class="flex">
        <input v-model="amount" type="number" name="" id="" class="border-2 w-[70%] px-2">
        <span class="">Rs/-</span>
    <span class="rounded-md shadow-md text-black w-48 text-center" :style="{background:selected.tag}">{{ selected.categoryName }}</span>
       </div>
    </div>
    
    
   </div>
   <br>
    <h3 class="mt-1">Remarks</h3>
   <div class="flex justify-between mt-3">
    
    <input v-model="remark" type="text" name="" id="" class="border-2 w-[70%] px-2">
    
    
   </div>
    </div>
   <div class="flex justify-center pt-5 pb-2">
    <button @click="add" v-if="!editMode" class="sub">submit</button>
   </div></div>
  </b-modal>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        props:{
            dateClicked:String
        },
        data(){
            return{
                col:'#5cccc4',
                editMode:false,
                selected:{},
                amount:'',
                listType:[],
                cate:'',
                sub:"",
                remark:'',
                payload:{}
            }
        },
        methods:{
            selectType(list){
                this.selected=list
            },
            add(){
               if(this.amount>0){
                // this.$emit('addEvent',{type:this.selected,amount:this.amount, subC:this.sub,rem:this.remark})
                this.addEvent()
               }
                this.$bvModal.hide('addEntry')
                this.amount=0

            },
            addEvent(){

                // const req = new Promise((req,res)=>{
                //     return{

                //     }
                // })
                this.payload={
                    eventDate:this.dateClicked,
                    category:this.selected.categoryName,
                    subCategory:this.sub,
                    amount:this.amount,
                    remarks:this.remark
                }
                axios.post(process.env.VUE_APP_BASE_URL+'addEvent',this.payload)
                .then((res)=>{
                    console.log(res)
                    this.$emit('updateEvents','')
                })
                .catch((err)=>{
                    alert(JSON.stringify(err))
                })
            },
            saveCat(){
                    this.editMode=false},
            setTimer(){
setTimeout(()=>{
    this.getCategories()
},1000)
            },
            addCat(){
                if(this.cate==""){
                    return;
                }
                axios.post(process.env.VUE_APP_BASE_URL+'c/addCategory',{
                    categoryName:this.cate,
                    tag:this.col
                })
                .then((res)=>{
                    this.cate=""
                    console.log(res)
                    this.setTimer()
                })
                .catch((err)=>{
                    alert(JSON.stringify(err))
                })
                
            },
            async getCategories(){
                axios.get(process.env.VUE_APP_BASE_URL+'c/getCategories').then((response)=>{
                    console.log(response.data)
                    this.listType=response.data
                    if(this.listType.length){
                        this.selected=this.listType[0]
                    }
                    else{
                        this.selected={
                            categoryName:'',
                            tag:'#ffffff'
                        }
                    }
                    
                    // alert("ok")
                })
                .catch((err)=>{
                    console.log(err)
                })
            },
            deleteCat(id){
                // alert(id)
                // const params = new URLSearchParams({'id':id})
                // alert(params)
                axios.delete(process.env.VUE_APP_BASE_URL+'c/deleteCategory',{
                    params:{
                        'id':id
                    }
                })
                .then((res)=>{
                    console.log(res)
                    this.setTimer()
                })
                .catch((err)=>{
                    alert(JSON.stringify(err))
                })
            },
           
        },
        created(){
            this.getCategories()
            // this.getCategories1()
        },

    }
</script>

<style lang="css" src="./input.css">

</style>