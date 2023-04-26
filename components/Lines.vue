<template>
  <v-sparkline :value="values" 
    color="#351BA9" 
    height="380"
    stroke-linecap="round" 
    :smooth = "radius"
    fill=true
    auto-draw></v-sparkline>
</template>

<script>
export default {
    data(){
        return {
            values: [0,55,45,92,65],
            radius: 60
        }
    }
}
</script>

<style>
.shadow-line {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);

}
</style>