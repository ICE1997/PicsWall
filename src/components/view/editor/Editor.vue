<template>
  <b-container class="editor" id="editor" ref="editor">
    <b-row>
      <b-col cols="6" class="previewModule">
        <b-row class="picsWallPreviewModule">
          <section class="picsWallPreviewMain">
            <canvas id="wallPreview" class="picsWallPreview"></canvas>
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
                @click="group"
              >组合</b-button>
              <b-button
                pill
                variant="outline-secondary"
                class="inTool"
                id="setBcgBtn"
                @click="setAsBcg"
              >设置背景</b-button>

              <b-button
                pill
                variant="outline-secondary"
                class="inTool"
                id="addTextBtn"
                @click="addText"
              >文字</b-button>

              <b-button pill variant="outline-secondary" class="inTool" @click="rmEl">删除</b-button>

              <b-button pill variant="outline-secondary" class="inTool" @click="saveCanvas">保存</b-button>
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
import { mapState, mapActions } from "vuex";

export default {
  name: "editor",
  components: {
    MaterialContainer
  },
  data() {
    return {
      mcs: ""
    };
  },
  computed: {
    ...mapState("editor", [
      "mt",
      "picSource",
      "borderSource",
      "bcgSource",
      "hangingSource",
      "editingMode",
      "editingData"
    ])
  },
  watch: {},
  methods: {
    /**
     * 保存canvas的json，以便复原
     */
    saveCanvas: function() {
      let c = this.mcs;
      let payload = {
        wall: JSON.stringify(c),
        id: ""
      };
      this.$store.dispatch("editor/save", payload);
    },
    /**
     * 删除被选择的元素
     */
    rmEl: function() {
      let c = this.mcs;
      let aobj = c.getActiveObject();
      if (!aobj) return;
      c.remove(aobj);
      c.requestRenderAll();
    },

    /**
     * 增加文字
     */
    addText: function() {
      let c = this.mcs;
      let colorPicker = document.createElement("input");
      let color = "#FFF";
      colorPicker.type = "color";
      colorPicker.click();

      var textbox = new fabric.Textbox("点击编辑", {
        left: 20,
        top: 50,
        fill: color
      });

      colorPicker.onchange = function(e) {
        textbox.set("fill", e.target.value);
        c.requestRenderAll();
      };

      c.add(textbox);
      c.requestRenderAll();
    },

    /**
     * 将选择的图片作为背景图片
     */
    setAsBcg: function() {
      let c = this.mcs;
      console.log(c.getActiveObject());
      if (!c.getActiveObject()) {
        return;
      }
      c.getActiveObject().evented = false;
      c.getActiveObject().hasControls = false;
      c.getActiveObject().selectable = false;
      c.requestRenderAll();
    },

    /**
     * 拖拽事件接收落点的函数
     */
    drop: function(e) {
      let c = this.mcs;
      e.preventDefault();
      let url = e.dataTransfer.getData("text/plain").slice(5, -2);
      fabric.Image.fromURL(url, function(img) {
        c.add(
          img.set({ left: 0, top: 0, angle: 0, selectable: true }).scale(0.1)
        );
      });
    },

    /**
     * 触发input，选择图片
     */
    getfiles: function() {
      this.$refs.picSelector.click();
    },

    /**
     * 读取选择的文件
     */
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
          reader.onload = function(e) {
            let picTemp = {
              id: "ps" + t.picSource.length,
              s: this.result
            };
            t.addPicToPicSource(picTemp);
          };
        }
      }
    },
    initEditor() {
      let canvas = new fabric.Canvas("picEditor");
      canvas.setHeight(400);
      canvas.setWidth(400);
      canvas.renderAll();
    },
    /**
     * 将图片添加到vuex的store中
     */
    addPicToPicSource(pic) {
      this.$store.dispatch("editor/addToPicSource", pic);
    },
    /**
     *组合所有选择的图片、文字等
     */
    group() {
      if (!this.mcs.getActiveObject()) {
        return;
      }
      if (this.mcs.getActiveObject().type !== "activeSelection") {
        return;
      }
      this.mcs.getActiveObject().toGroup();
      this.mcs.requestRenderAll();
    },

    /**
     * 初始化canvas
     */
    initP() {
      let t = document.getElementById("wallPreview");
      let canvas = new fabric.Canvas("wallPreview");
      canvas.setHeight(960 * 0.41667);
      canvas.setWidth(960 * 0.83333);
      this.mcs = canvas;
      canvas.renderAll();
      let upperCanvas = t.parentElement.getElementsByTagName("canvas")[1];
      upperCanvas.ondrop = this.drop;
    },

    /**
     *  加载素材
     */
    loadMaterial() {
      this.$store.dispatch("editor/loadMaterial");
    }
  },
  mounted() {
    this.$store.dispatch("user/init");
    this.initEditor();
    this.initP();
    this.loadMaterial();
    console.log("编辑模式")
    console.log(this.editingMode);
    console.log(this.editingData.canvasData);
    // if (this.editingMode) {
      console.log("可以编辑~~~");
      this.mcs.loadFromJSON(this.editingData.canvasData, this.mcs.renderAll.bind(this.mcs));
    // }
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

.picsWallPreviewMain {
  position: absolute;
  width: 96%;
  height: 96%;
  margin: 1% 2%;
  border: 0.5px solid #d8d8d8;
  text-align: center;
}

.picsWallPreview {
  position: relative;
  margin-top: 1%;
  margin-left: auto;
  margin-right: auto;
  border: 0.5px dotted #d8d8d8;
  /* background-color: #fff; */
  /* width: 83.333%; */
  /* height: 0; */
  /* padding-bottom: 41.667%; */
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.picsWallPreviewMain .canvas-container {
  margin: 0 auto;
}
</style>

<style scoped>
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
  text-align: center;
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



