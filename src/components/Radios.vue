<template>
  <div class="radios-wrap">
    <label class="label fl" v-for="(item,index) in options">
      
      <input type="radio" v-model="currentValue" class="radios" :value="item._id" :key="index">

      <div class="title-wrap">
        <span class="radios-title">{{item.name}}</span>
      </div>

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

<style lang="scss">
  .radios {
    display: none;
  }
  .title-wrap {
    padding:10px 15px;
    font-size: 12px;
    color:#444;
    border:1px solid #f1f1f1;
    border-radius: 4px;
    margin-right: 5px;
    cursor: pointer;
  }
  .radios:checked + .title-wrap {
    color:#fff;
    background: #409eff;
  }
</style>
