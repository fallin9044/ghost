<template>
  <div class="paint">
    <main>
      <article class="pan">
        <section id="perspective">

          <section id="axis">
            <template v-for="(answer,i) in answers">
              <div v-bind:key="i" ref="item" class="answer-item" @mousedown="stopBubble" @mousemove="stopBubble"
                @mouseup="stopBubble"
                :style="{'margin-left':answer['x']+'px','margin-top':answer['y']+'px','position':'absolute'}"
                @mouseover="changeClass({i})" @mouseout="changeClassBack({i})">
                <img width="100px" height="100px" :src="answer.picture" @click="checkComment({i})" />
              </div>
            </template>

          </section>
        </section>
      </article>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'map',
    props: {
      answers: {
        type: Array,
      }
    },
    data() {
      return {
        target: {
          position: {
            x: 0,
            y: 0
          },
          zoom: 100
        },
        transform: {
          position: {
            x: 0,
            y: 0
          },
          zoom: 0
        },
        selected: -1
      }
    },
    mounted() {
      this.drawLine();
    },
    methods: {
      setTarget() {
        this.$api.me().then(user => {
          for (let a in this.answers) {
            let mid = this.answers[a]
            if (mid.username == user.username) {
              this.target.position.x = -mid.x - 50;
              this.target.position.y = -mid.y - 50;
              this.target.zoom = 100
              this.selected = a
              return;
            }
          }
        });
      },
      checkComment(e) {
        this.$emit('checkComment', e['i']);
        this.selected = e['i']
      },

      changeClass(e) {
        this.selected = e['i']
        //this.$refs.item[e['i']].setAttribute('class','answer-item-h')
      },
      changeClassBack(e) {
        this.selected = -1
        //this.$refs.item[e['i']].setAttribute('class','answer-item')
      },
      stopBubble(e) {
        if (e && e.stopPropagation) { //非IE浏览器 
          e.stopPropagation();
        } else { //IE浏览器 
          window.event.cancelBubble = true;
        }
      }
    },
    watch: {
      target: {
        handler(n, o) {
          let transform = this.transform
          transform.position.x += n.position.x - transform.position.x;
          transform.position.y += n.position.y - transform.position.y;
          transform.zoom += n.zoom - transform.zoom;

          transform.position.x = parseFloat(transform.position.x.toFixed(2));
          transform.position.y = parseFloat(transform.position.y.toFixed(2));
          transform.zoom = parseFloat(transform.zoom.toFixed(2));

          perspective.style.transform =
            perspective.style.msTransform =
            perspective.style.mozTransform =
            perspective.style.webkitTransform = 'translate(' + transform.position.x + 'px, ' + transform.position.y +
            'px) scale3d(' + transform.zoom / 100 + ', ' + transform.zoom / 100 + ', ' + transform.zoom / 100 + ')';
        },
        deep: true
      },
      selected: {
        handler(n, o) {
          if (undefined != this.$refs.item[o]) {
            this.$refs.item[o].setAttribute('class', 'answer-item')
          }
          if (n == -1) {
            return;
          }
          this.$refs.item[n].setAttribute('class', 'answer-item-h')
        }
      }
    },
    mounted() {
      var $ = document.querySelectorAll.bind(document);

      /* -------------------------------- */
      /* ---------- Navigation ---------- */
      /* -------------------------------- */
      var article = $('article')[0];
      var perspective = $('#perspective')[0];

      var click = false;
      var cursor = {
        x: 0,
        y: 0
      };

      var target = this.target;
      var targetOnDown = {
        position: {
          x: 0,
          y: 0
        },
        zoom: 0
      };

      article.onmousedown = function (e) {
        if (e.which < 3) {
          if (e.which == 2) article.className = 'pan';
          if (article.className == 'pan')
            article.style.cursor = '-webkit-grabbing';
          cursor.x = e.pageX;
          cursor.y = e.pageY;
          targetOnDown.position.x = target.position.x;
          targetOnDown.position.y = target.position.y;
          targetOnDown.zoom = target.zoom;
          click = true;
        }
      };
      article.onmousemove = function (e) {
        if (click) {
          switch (article.className) {
            case 'pan':
              target.position.x = targetOnDown.position.x + e.pageX - cursor.x;
              target.position.y = targetOnDown.position.y + e.pageY - cursor.y;
              break;

          }
        }
      };
      article.onmouseup = function (e) {
        click = false;
        if (article.className == 'pan')
          article.style.cursor = '';
        if (e.which == 2) returnValue();
      };

      article.addEventListener('mousewheel', scroll, false);
      article.addEventListener('DOMMouseScroll', scroll, false);

      function scroll(e) {
        e.preventDefault();
        var delta = (e.wheelDelta) ? e.wheelDelta : -e.detail;
        target.zoom += (delta > 0) ? 15 : -15;
        if (target.zoom < 50) target.zoom = 50;
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  body {
    width: 100vw;
    height: 100vh;
    font-family: Trebuchet MS;
    background: #191919;
    user-select: none;
  }

  main {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  article {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1250px;
    cursor: -webkit-grab;
  }

  #axis {
    margin-top: -6px;
    position: relative;
    transform-style: preserve-3d;
  }


  #perspective {
    width: 0;
    height: 0;
    transform-style: preserve-3d;

  }

  #perspective.reset {
    transition: transform 1s ease-in-out;
  }




  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-right: solid 5px #222;
    background: #5f5f5f;
  }

  .paint {
    background-image: url("/static/img/answer-bg.png");
  }

  .answer-item {
    height: 100px;
    width: 100px;
    background-color: white;
    border-width: 3px;
    border-radius: 3px;
    border-color: white;
    border-style: solid;
  }

  .answer-item-h {
    height: 100px;
    width: 100px;
    border-width: 3px;
    background-color: white;
    border-radius: 3px;
    border-color: rgb(235, 132, 49);
    border-style: solid;
    z-index:100;
  }

</style>
