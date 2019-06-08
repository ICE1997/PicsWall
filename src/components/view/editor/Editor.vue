<template>
  <b-container class="editor" id="editor" ref="editor">
    <b-row>
      <b-col cols="6" class="previewModule">
        <b-row class="picsWallPreviewModule">
          <section class="picsWallPreviewMain">
            <div class="picsWallPreview"></div>
          </section>
        </b-row>

        <b-row class="picEditorModule">
          <b-row class="picEditorMain">
            <b-col class="pic-editor-outer" id="picEditorOuter" cols="11">
              <canvas class="picEditor" id="picEditor"></canvas>
            </b-col>

            <b-col cols="1" class="picEditorTool">
              <b-button
                pill
                variant="outline-secondary"
                class="inTool"
                id="addToSingle"
                ref="addToSingle"
              >导入</b-button>
            </b-col>
          </b-row>
        </b-row>
      </b-col>

      <b-col cols="3" class="picMaterialModule">
        <MaterialContainer :id="mt[0].id" :type="mt[0].type" :dataSet="bcgSource"/>
        <MaterialContainer :id="mt[1].id" :type="mt[1].type" :dataSet="picSource"/>
        <div class="addPic" id="addPic" @click="getfiles" ref="addPic">
          +
          <input
            id="picSelector"
            ref="picSelector"
            class="picSelector"
            @change="readFile"
            type="file"
            multiple
          >
        </div>
      </b-col>
      <b-col cols="3" class="decorationsModule">
        <MaterialContainer :id="mt[2].id" :type="mt[2].type" :dataSet="borderSource"/>
        <MaterialContainer :id="mt[3].id" :type="mt[3].type" :dataSet="hangingSource"/>
      </b-col>
    </b-row>
  </b-container>
</template>


<script>
import MaterialContainer from "./MaterialContainer.vue";
export default {
  name: "editor",
  components: {
    MaterialContainer
  },
  data() {
    return {
      mt: [
        {
          id: "bcgsBox",
          type: "背景"
        },
        {
          id: "picsBox",
          type: "素材"
        },
        {
          id: "bordersBox",
          type: "边框"
        },
        {
          id: "hangingsBox",
          type: "悬挂"
        }
      ],
      picSource: [
        {
          id: "ps0",
          s: "/src/img/brink.jpg"
        },
        {
          id: "ps1",
          s: "/src/img/green.jpg"
        },
        {
          id: "ps2",
          s: "/src/img/chalkboard.jpg"
        }
      ],
      borderSource: [
        {
          id: "bs0",
          s: "/src/img/brink.jpg"
        },
        {
          id: "bs1",
          s: "/src/img/green.jpg"
        },
        {
          id: "bs2",
          s: "/src/img/chalkboard.jpg"
        }
      ],
      bcgSource: [
        {
          id: "bcgs0",
          s: "/src/img/brink.jpg"
        },
        {
          id: "bcgs1",
          s: "/src/img/green.jpg"
        },
        {
          id: "bcgs2",
          s: "/src/img/chalkboard.jpg"
        }
      ],
      hangingSource: [
        {
          id: "hs0",
          s: "/src/img/brink.jpg"
        },
        {
          id: "hs1",
          s: "/src/img/green.jpg"
        },
        {
          id: "hs2",
          s: "/src/img/chalkboard.jpg"
        }
      ]
    };
  },

  watch: {
    picSource: function(o, n) {
      console.log("changed!");
    }
  },
  methods: {
    getfiles: function() {
      this.$refs.picSelector.click();
    },
    readFile: function() {
      let ps = document.getElementById("picSelector");
      let t = this;
      //获取并加载图片
      let fLen = ps.files.length;
      for (let i = 0; i < fLen; i++) {
        if (ps.files[i].name.match(/.jpg|.gif|.png|.jpeg|.bmp/i)) {
          //通过正则选出后缀是照片后缀的文件，i是ignore的意思，用于忽略大小写。但这并不完美，当文件为xxx.jpg.html时，也会匹配到
          let reader = new FileReader();
          reader.readAsDataURL(ps.files[i]);
          // reader.fileName = ps.files[i].name;
          reader.onload = function(e) {
            let picTemp = {
              id: "ps" + t.picSource.length,
              s: this.result
            };
            t.picSource.push(picTemp);
          };
        }
      }
    },
    initEditor() {
      console.log("???");
      let outer = window.document.getElementById("picEditorOuter");
      let canvas = new fabric.Canvas("picEditor");
      canvas.setHeight(400);
      canvas.setWidth(400);
      canvas.renderAll();
    },
  },

  computed: {},

  mounted() {
    this.initEditor();
  }
};
</script>


<style>
.rotateIn-enter-active {
  animation: rotateIn 1s;
}
.rotateIn-leave-active {
  animation: rotateIn 0.5s reverse;
}

@-webkit-keyframes rotateIn {
  from {
    -webkit-transform-origin: center;
    transform-origin: center;
    -webkit-transform: rotate3d(0, 0, 1, -200deg);
    transform: rotate3d(0, 0, 1, -200deg);
    opacity: 0;
  }

  to {
    -webkit-transform-origin: center;
    transform-origin: center;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes rotateIn {
  from {
    -webkit-transform-origin: center;
    transform-origin: center;
    -webkit-transform: rotate3d(0, 0, 1, -200deg);
    transform: rotate3d(0, 0, 1, -200deg);
    opacity: 0;
  }

  to {
    -webkit-transform-origin: center;
    transform-origin: center;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

.rotateIn {
  -webkit-animation-name: rotateIn;
  animation-name: rotateIn;
}

* {
  margin: 0;
  padding: 0;
}

.pic-editor-outer {
  margin-top: 1%;
  text-align: center;
}

.pic-editor-outer .canvas-container {
  border: 0.5px dotted #d8d8d8;
  margin: 0 auto;
}
</style>

<style scoped>
/*BASE*/
.title {
  position: relative;
  height: 10%;
  width: 100%;
  color: white;
  border-bottom: 0.5px solid #d8d8d8;
  border-top: 0.5px solid #d8d8d8;
}

.title div {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.editor {
  position: relative;
  max-width: 1920px !important;
  height: 960px;
  background-color: #555;
}

.editor .row {
  height: 100%;
}

.previewModule {
  position: relative;
  border-right: 0.5px solid #d8d8d8;
  /* background-color: green; */
}

.picMaterialModule {
  position: relative;
  border-right: 0.5px solid #d8d8d8;
}

.decorationsModule {
  position: relative;
  /* background-color: blue; */
}

.previewModule .row {
  height: 50% !important;
}

.picsWallPreviewModule {
  position: relative;
  width: 100%;
  height: 50%;
  /* background-color: #fff; */
}

.picsWallPreviewMain {
  position: absolute;
  width: 96%;
  height: 96%;
  margin: 1% 2%;
  border: 0.5px solid #d8d8d8;
}

.picsWallPreview {
  position: relative;
  margin-top: 1%;
  margin-left: auto;
  margin-right: auto;
  border: 0.5px dotted #d8d8d8;
  /* background-color: #fff; */
  width: 83.333%;
  height: 0;
  padding-bottom: 41.667%;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;

  background-image: url("/src/img/green.jpg");
}

.picEditorModule {
  position: relative;
  width: 100%;
  height: 50%;
}

.picEditorModule .row {
  height: 100% !important;
}

.picEditorMain {
  position: absolute;
  width: 96%;
  height: 100%;
  margin: 0 2%;
  border: 0.5px solid #d8d8d8;
}

.picEditor {
  position: relative;
  height: 100%;
  margin: 0 auto;
}

.picEditorTool {
  height: 100%;
  border-left: 0.5px solid #d8d8d8;
  padding: 0 !important;
  text-align: center;
}

.inTool {
  margin: 16px auto;
  color: #d8d8d8;
  background-color: rgba(255, 255, 255, 0.2);
  text-align: center;
}

.inTool:hover {
  background-color: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.2);
}

.inTool:focus,
.inTool.focus {
  color: white;
  box-shadow: 0 0 0 0.1rem rgba(255, 255, 255, 0.7);
}

.inTool:not(:disabled):not(.disabled):active:focus,
.inTool:not(:disabled):not(.disabled).active:focus,
.show > .inTool.dropdown-toggle:focus {
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.2);
}

.addPic {
  position: absolute;
  z-index: 99;
  right: 2%;
  bottom: 2%;
  width: 64px;
  height: 64px;
  color: white;
  text-align: center;
  line-height: 64px;
  font-size: 36px;
  border-radius: 50%;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.3);
}

.picSelector {
  position: absolute;
  display: none;
}
</style>



