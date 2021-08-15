<template>
  <div class="bg">
    <div class="saba"></div>
    <el-row style="height:15%">
      <el-col :span="2">
        <a href="javascript:void(0)"><img @click="close" width="80%" style="margin-top:10%;margin-left:10%"
            src="/static/img/close.svg" /></a>
      </el-col>
      <el-col :span="3" :offset="19" style="padding-right:10px">

        <a href="javascript:void(0)"><img @click="upload" style="margin-top:15%" src="/static/img/done.svg" /></a>

      </el-col>
    </el-row>
    <el-row style="margin-top:18%">
      <el-col :span="4" style="margin-left:18%">
        <!-- <img style="width:100%;position:absolute;z-index:-1" src="/static/img/img-bg.svg"/> -->
        <a href="javascript:void(0)"><img @click="uploadMainBefore('upImgMain')" style="width:100%" ref="imgMain"
            src="../assets/icon/uploadImg.svg" /></a>
        <input type="file" accept="image/png,image/jpeg" ref="upImgMain" @change="uploadMain($event,'imgMain')" v-show="false">
      </el-col>

      <el-col :span="4" style="margin-left:31%">
        <el-col :span="12">
          <a href="javascript:void(0)"><img @click="uploadMainBefore('upReason1')" style="width:100%" ref="imgReason1"
              src="../assets/icon/uploadImg.svg" /></a>
          <input type="file" accept="image/png,image/jpeg" ref="upReason1" @change="uploadMain($event,'imgReason1')"
            v-show="false">
        </el-col>
        <el-col :span="12">
          <a href="javascript:void(0)"><img @click="uploadMainBefore('upReason2')" style="width:100%" ref="imgReason2"
              src="../assets/icon/uploadImg.svg" /></a>
          <input type="file" accept="image/png,image/jpeg" ref="upReason2" @change="uploadMain($event,'imgReason2')"
            v-show="false">
        </el-col>
        <el-col :span="12">
          <a href="javascript:void(0)"><img @click="uploadMainBefore('upReason3')" style="width:100%" ref="imgReason3"
              src="../assets/icon/uploadImg.svg" /></a>
          <input type="file" accept="image/png,image/jpeg" ref="upReason3" @change="uploadMain($event,'imgReason3')"
            v-show="false">
        </el-col>
        <el-col :span="12">
          <a href="javascript:void(0)"><img @click="uploadMainBefore('upReason4')" style="width:100%" ref="imgReason4"
              src="../assets/icon/uploadImg.svg" /></a>
          <input type="file" accept="image/png,image/jpeg" ref="upReason4" @change="uploadMain($event,'imgReason4')"
            v-show="false">
        </el-col>
      </el-col>
    </el-row>
    <el-row style="margin-top:5%">
      <el-col :span="15" style="margin-left:18%">
        <input
          style="width:100%;border:none;border-radius:0;border-bottom:#000 3px solid;box-shadow: 0px 0px 0px 0px;background:none;outline:none;"
          type="text" maxlength="256" placeholder="your description." v-model="description">
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    components: {},
    name: 'HelloWorld',
    props: {
      'video': String,
    },
    data() {
      return {
        username: '',
        password: '',
        loginButton: '',
        login: "../assets/icon/loginBefore.svg",
        regis: "../assets/icon/registryBe.svg",
        description: '',
      }
    },
    methods: {
      uploadMainBefore(name) {
        this.$refs[name].click();
      },
      uploadMain(e, name) {
        let img = e.target.files[0];
        var reader = new FileReader();
        reader.onload = oFREvent => {
          this.$refs[name].src = oFREvent.target.result;
        };
        reader.readAsDataURL(img);
      },
      close() {
        this.$emit('close');
      },
      upload() {
        this.$api.me()
          .then(res => {
            if (res.result == -1) {
                  this.$router.push('/home')
                  return
            }
            let param = new FormData();
            param.append('username', res.data.username)
            param.append('description', this.description)
            param.append('video', this.video)
            param.append('picture', this.$refs.upImgMain.files[0])
            for(let i=1;i<5;i++) {
               if (this.$refs[`upReason${i}`].files[0] != undefined) {
                 param.append('reasons',this.$refs[`upReason${i}`].files[0])
               }
            }
            
            this.$api.post('uploadAnswer', param).then(res => {
              this.$emit('close');
            }).catch(err => {
              alert("upload failed");
            })
          });

      }

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bg {
    background-image: url("/static/img/upload-bg.png");
    background-size: cover;
    height: 100%;
    padding-bottom: 10%;
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

  .imgBg {
    background-image: url("/static/img/img-bg.svg");
    width: 100%;
    height: 119px;
    padding: 10%;
  }

</style>
