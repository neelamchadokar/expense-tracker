<template>

  <div id="app" class="bg-gradient-to-t from-white to-blue-200">
    <nav class="p-4 ">
      <b>Calendar Expenses</b>
    </nav>
    
    <CalendarPage></CalendarPage>
  </div>
</template>

<script>
import CalendarPage from './components/calendarPage.vue';

CalendarPage
export default {
  name: 'App',
  components: {
    CalendarPage
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin:0 !important;
  padding: 0 !important;
}
.scroll {
   width: 200px;
   height: 400px;
    background: red;
   overflow: scroll;
}
.scroll::-webkit-scrollbar {
    width: 12px;
}

.scroll::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    border-radius: 10px;
}

.scroll::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
}
/deep/.fc-daygrid-event-harness {
    cursor: pointer;
}
</style>
