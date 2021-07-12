<template>
  <div>
    <img :src="source"  @mouseover="changeIndex()" @mouseout="changeIndexBack()" @click="fatherMethod"/>
  </div>
</template>

<script> 
export default {
  name: 'icon',
  props: {
    'src': String,
    'hover': {
            type: String,
            default: ''
        }
  },
  data () {
    return {
                uimgPath: require(`../assets/icon/${this.src}`),
        himgPath: this.hover !== '' ? require(`../assets/icon/${this.hover}`) : '',
        source: require(`../assets/icon/${this.src}`),
    }
  },
  methods: {
    changeIndex() {
        if (this.hover !== '') {
            this.source=this.himgPath
        }
    },
    changeIndexBack() {
        if (this.hover !== '') {
            this.source=this.uimgPath
        }
    },
    fatherMethod() {
      this.$emit('method');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
    height:40px;
}
</style>
