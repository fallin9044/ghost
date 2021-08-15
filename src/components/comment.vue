<template>
  <div class="bg">
    <div class="saba" @click="close"></div>
    <el-row style="height:100%">
      <el-col :span="15" style="height:100%;padding:5px">
        <el-row style="height:14%">
          <el-col :span="2" :offset="1">
            <p>{{answer.username}}</p>
          </el-col>
          <el-col :span="2">
            <p v-if="answer.description != undefined">:&nbsp;{{answer.description}}</p>
          </el-col>
        </el-row>
        <el-row style="height:32%;margin-top:7%">
          <el-col :span="8" :offset="8" style="height:100%">
            <img style="width:100%" :src="answer.picture" />
          </el-col>
        </el-row>
        <el-row style="height:29%;margin-top:6%">
          <template v-for="(pic,i) in answer.reasonPic">
            <el-col v-bind:key="i" :span="5" :offset="1" style="height:100%">
              <img style="width:100%" :src="pic" />
            </el-col>
          </template>
        </el-row>
        <!-- <el-row style="height:16%;margin-top:7%">
          <el-col :span="5" :offset="1" style="height:100%">
            <p>{{answer.description}}</p>
          </el-col>
        </el-row> -->
        <el-row style="height:15%;margin-top:1%">
          <el-col :span="2" :offset="1" style="height:100%">
            <a href="javascript:void(0)"><img width="80%" style="margin-top:10%;margin-left:10%" @click="changeGreat"
                ref="great" src="/static/icon/greatb.svg" /></a>

          </el-col>
          <el-col :span="2" style="margin-top:-1%;margin-left:1%">
            <p>{{answer.thumbs}}</p>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="9" style="height:100%">
        <el-row style="padding:10px;height:87%;overflow:auto;" class="el-wrapper">
          <template v-for="(comm,i) in showComments">
            <div v-bind:key="i" class="cm">
              <p style="font-weight:700">{{comm.username}} :</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;{{comm.text}}</p>
              <p style="float:right;margin-block-start: unset;font-size:70%">at&nbsp;{{comm.date}}</p>
            </div>
          </template>
          <el-row style="margin-top:4%;margin-bottom:4%">
            <el-col :span="2" :offset="3">
              <a href="javascript:void(0)" @click="pre">&lt;&lt;&lt;</a>
            </el-col>
            <el-col :span="4  " :offset="6">
              <span>{{currentPage + 1}}/{{totalPage}}</span>
            </el-col>
            <el-col :span="2" :offset="4">
              <a href="javascript:void(0)" @click="next">&gt;&gt;&gt;</a>
            </el-col>
          </el-row>
        </el-row>
        <el-row style="padding-left:15px;margin-top:4%" v-show="comments.length !=0">
          <el-col :span="18">
            <input
              style="width:100%;border:none;border-radius:0;border-bottom:#000 3px solid;box-shadow: 0px 0px 0px 0px;background:none;outline:none;"
              type="text" maxlength="256" placeholder="your description." v-model="description">
          </el-col>
          <el-col :span="3" :offset="1">
            <button @click="doComment">submit</button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    components: {},
    name: 'HelloWorld',
    props: {
      answer: Object
    },
    data() {
      return {
        username: '',
        password: '',
        isGreat: false,
        comments: [],
        src: "",
        description: "",
        currentPage: 0,
        totalPage: 0
      }
    },
    methods: {
      changeGreat() {
        let url = "doGreat"
        if (this.isGreat) {
          url = "undoGreat"
        }
        this.$api.get(url, {
          answerId: this.answer.id
        }).then(res => {
          this.isGreat = !this.isGreat
          this.answer.thumbs += url == "doGreat" ? 1 : -1;
        })
      },
      close() {
        this.$emit('close');
      },
      next() {
        if (this.currentPage >= this.totalPage -1) return;
        this.currentPage += 1
      },
      pre() {
        if (this.currentPage <= 0) return;
        this.currentPage -= 1
      },
      doComment() {
        this.$api.post("doComment", {
          date: new Date(),
          answerId: this.answer.id,
          text: this.description
        }).then(res => {
          this.description = ""
          this.$api.get(`comments`, {
            answerId: this.answer.id
          }).then(res => {
            if (res.result == -1) {
                this.$router.push('/home')
                return
            }
            this.comments = res.data;
            this.currentPage = 0
            let yu = res.data.length % 5 != 0 ? 1 : 0
            this.totalPage = Math.floor(res.data.length / 5) + yu;
            for (let i of this.comments) {
              let date = new Date(i.date);
              i.date = this.dateFormat("HH:MM mm/dd/YYYY", date)
            }
          })
        })
      },
      dateFormat(fmt, date) {
        let ret;
        const opt = {
          "Y+": date.getFullYear().toString(), // 年
          "m+": (date.getMonth() + 1).toString(), // 月
          "d+": date.getDate().toString(), // 日
          "H+": date.getHours().toString(), // 时
          "M+": date.getMinutes().toString(), // 分
          "S+": date.getSeconds().toString() // 秒
          // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (let k in opt) {
          ret = new RegExp("(" + k + ")").exec(fmt);
          if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
          };
        };
        return fmt;
      }
    },

    watch: {
      isGreat: {
        handler(n, o) {
          this.$refs.great.src = n ? "/static/icon/greate.svg" : "/static/icon/greatb.svg";
        }
      },
      answer: {
        handler(n, o) {
          {
            this.$api.get("isGreat", {
              answerId: n.id
            }).then(res => {
              if (res.result == -1) {
                  this.$router.push('/home')
                  return
              }
              if (res.data.result) {
                this.isGreat = true;
              } else {
                this.isGreat = false;
              }
            })
            this.$api.get(`comments`, {
              answerId: n.id
            }).then(res => {
              this.comments = res.data;
              this.currentPage = 0;
              let yu = res.data.length % 5 != 0 ? 1 : 0
              this.totalPage = Math.floor(res.data.length / 5) + yu;
              console.log(this.comments)
            })
          }
        }
      }
    },
    computed: {
      showComments() {
        let start = this.currentPage * 5;
        let end = start + 5 > this.comments.length ? this.comments.length : start + 5
        return this.comments.slice(start, end)
      }
    },
    mounted() {
      this.$api.get("isGreat", {
        answerId: this.answer.id
      }).then(res => {
        if (res.result == -1) {
            this.$router.push('/home')
            return
        }
        if (res.data.result) {
          this.isGreat = true;
        } else {
          this.isGreat = false;
        }
      })
      this.$api.get(`comments`, {
        answerId: this.answer.id
      }).then(res => {
        if (res.result == -1) {
            this.$router.push('/home')
            return
        }
        this.comments = res.data;
        this.currentPage = 0;
  
        let yu = res.data.length % 5 != 0 ? 1 : 0
        this.totalPage = Math.floor(res.data.length / 5) + yu;
        console.log(this.totalPage)
        for (let i of this.comments) {
          let date = new Date(i.date);
          i.date = this.dateFormat("HH:MM mm/dd/YYYY", date)
        }
      })
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bg {
    background-image: url("/static/img/comment-bg.svg");
    background-size: cover;
    height: 100%;
    background-repeat: none;
  }

  .input {
    margin-top: 5%;
    border-width: 3px;
    border-color: rgb(0, 0, 0);
    border-style: solid;
    border-radius: 7px;
  }

  .saba {
    z-index: -1;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    background-color: rgb(202, 197, 197);
    opacity: 0.5;
  }

  .el-wrapper::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 1px;
    /*宽度竖滚动条的尺寸*/
    height: 5px;
    /*高度横滚动条的尺寸*/
  }

  .el-wrapper::-webkit-scrollbar-thumb {
    /*滚动条里面的条*/
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #6b797e;
  }

  .el-wrapper::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    border-radius: 5px;
    background: #ffffff;
  }

  p {
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }

  .cm {
    overflow: hidden;
    border-bottom: rgb(117, 116, 116) 1px solid;
  }

  a {
    text-decoration: none;
    color:rgb(99, 96, 96);
  }

</style>
