<template>
  <div class="radios">
    <label class="label" v-for="(item,index) in options">
      
      <div class="title-wrap">
        <span>{{item.name}}</span>
      </div>

      <input type="radio" v-model="currentValue" class="radios" :value="item._id" :key="index">
    </label>
  </div>
</template>

<script>
export default {
  name:'',
  props:{
    options: {
      type:Array
    },
    value:String
  },
  data() {
    return {
      currentValue:[]
    }
  },
  watch: {
    value(val) {
      this.currentValue = val
    },
    currentValue(val) {
      this.$emit('input',val)
      this.$emit('change',val)
    }
  },
  components: {

  },
  methods: {

  }
}
</script>

<style scoped>
</style>
