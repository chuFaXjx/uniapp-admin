<template>
  <div class="number-grow-warp">
  <div  class="FontBox" >
    <span style="font-size: 15px; color: black;">访问人数：</span>
    <span
      ref="numberGrow"
      :data-time="time"
      :class="{ 'number-grow': isShowClass }"
      >{{ value }}</span
    >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShowClass: {
      type: Boolean,
      default: true
    },
    time: {
      type: Number,
      default: 2
    },
    value: {
      type: Number,
      default: 0
    }
  },

  methods: {
    numberGrow(ele) {
      let _this = this

      let step = Math.ceil((_this.value * 10) / (_this.time * 1000))
      console.log(step)
      let current = 0
      let start = 0
      let t = setInterval(() => {
        start += step
        if (start > _this.value) {
          clearInterval(t)
          start = _this.value
          t = null
        }
        if (current === start) {
          return
        }
        current = start
        ele.innerHTML = this.numberPutComma(current)
      }, 10)
    },
    numberPutComma(value) {
      if (value === 0) {
        return 0
      }
     else if (Number(value)) {
        let intPartFormat = value
          .toString()
          .replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
        return intPartFormat
      }
    }
  },
  mounted() {
    this.numberGrow(this.$refs.numberGrow)
  },
  watch: {
    value: {
      deep: true,
      handler(newVal, oldVal) {
        this.numberGrow(this.$refs.numberGrow)
      }
    }
  }
}
</script>

<style scoped>

.number-grow-warp {
  width: 200px;
  height: 100px;
    background-color: white;
  border-radius: 18px;
  transform: translateZ(0);
  display: inline-block;
  position: relative;
  left: 40px;

}

.FontBox{
  position: relative;
  top: 20px;
  /* left: 20px; */
}

.number-grow {
  color: wheat;
  font-size: 30px;
  position: relative;
  top: 3px;
}
</style>