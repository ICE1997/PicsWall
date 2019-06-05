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
              <b-button pill variant="outline-secondary" class="inTool" id="rotate" ref="rotate">旋转</b-button>
              <b-button pill variant="outline-secondary" class="inTool" id="scale" ref="scale">缩放</b-button>
            </b-col>
          </b-row>
        </b-row>
      </b-col>

      <b-col cols="3" class="picMaterialModule">
        <section class="mBackground">
          <header class="title">
            <div>背景</div>
          </header>
          <section class="bcgBox" id="bcgBox" ref="bcgBox">
            <div class="bcg"></div>
            <div class="bcg"></div>
            <div class="bcg"></div>
            <div class="bcg"></div>
            <div class="bcg"></div>
            <div class="bcg"></div>
            <div class="bcg"></div>
            <div class="bcg"></div>
            <div class="bcg"></div>
            <div class="bcg"></div>
          </section>
        </section>

        <section class="userMaterial">
          <header class="title">
            <div>素材</div>
          </header>

          <section class="picsBox" id="picsBox" ref="picsBox">
            <div class="pic"></div>
          </section>
          <div class="addPic" id="addPic" ref="addPic">
            +
            <input id="picSelector" ref="picSelector" class="picSelector" type="file" multiple>
          </div>
        </section>
      </b-col>

      <b-col cols="3" class="decorationsModule">
        <section class="mBorder">
          <header class="title">
            <div>边框</div>
          </header>
          <section class="borderBox" id="borderBox">
            <div class="mbd"></div>
          </section>
        </section>

        <section class="hangings">
          <header class="title">
            <div>悬挂</div>
          </header>
          <section class="hangingsBox" id="hangingsBox">
            <div class="hanging"></div>
          </section>
        </section>
      </b-col>
    </b-row>
  </b-container>
</template>

<style>
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
  /* background-color: #fff; */
  /* border-top: 0.5px solid #d8d8d8; */
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
  /* background-color: #fff; */
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

.mBackground {
  height: 50%;
  border-bottom: 0.5px solid #d8d8d8;
}

.bcgBox {
  position: relative;
  width: 100%;
  height: 80%;
  margin-top: 5%;
  margin-bottom: 5%;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
}

.bcg {
  position: relative;
  display: inline-block;
  background-color: #fff;
  width: 25%;
  height: 0;
  padding-bottom: 12.5%;
  border-radius: 8px;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  background-image: url("/src/img/brink.jpg");
  margin-top: 3%;
  margin-left: 5%;
  margin-right: 5%;
}

/* .bcg:focus,
.bcg.focus {
border: 1px solid blue;
}

.bcg:not(:disabled):not(.disabled):active:focus,
.bcg:not(:disabled):not(.disabled).active:focus,
.show > .inTool.dropdown-toggle:focus {
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.2);
} */

/* .bcg:active,.bcg:focus {
  border: 1px solid blue;
} */

.userMaterial {
  height: 50%;
}

.picsBox {
  position: relative;
  width: 100%;
  height: 80%;
  margin-top: 5%;
  margin-bottom: 5%;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
}

.pic {
  position: relative;
  display: inline-block;
  background-color: #fff;
  width: 25%;
  height: 0;
  padding-bottom: 12.5%;
  border-radius: 8px;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  background-image: url("/src/img/brink.jpg");
  margin-top: 3%;
  margin-left: 5%;
  margin-right: 5%;
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

.mBorder {
  display: inline-block;
  height: 50%;
  width: 100%;
  border-bottom: 0.5px solid #d8d8d8;
}

.borderBox {
  position: relative;
  width: 100%;
  height: 80%;
  margin-top: 5%;
  margin-bottom: 5%;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
}

.mbd {
  position: relative;
  display: inline-block;
  background-color: #fff;
  width: 25%;
  height: 0;
  padding-bottom: 12.5%;
  border-radius: 8px;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  background-image: url("/src/img/white.jpg");
  margin-top: 3%;
  margin-left: 5%;
  margin-right: 5%;
}

.hangings {
  display: inline-block;
  height: 50%;
  width: 100%;
}

.hangingsBox {
  position: relative;
  width: 100%;
  height: 80%;
  margin-top: 5%;
  margin-bottom: 5%;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
}

.hanging {
  position: relative;
  display: inline-block;
  background-color: #fff;
  width: 25%;
  height: 0;
  padding-bottom: 12.5%;
  border-radius: 8px;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  background-image: url("/src/img/brink.jpg");
  margin-top: 3%;
  margin-left: 5%;
  margin-right: 5%;
}
</style>

<script>
export default {
  name: "editor",
  data() {
    return {
      picsSource: []
    };
  },

  methods: {},

  computed: {},

  mounted() {
    console.log("???");
    let outer = window.document.getElementById("picEditorOuter");
    let canvas = new fabric.Canvas("picEditor");
    canvas.setHeight(400);
    canvas.setWidth(400);
    canvas.renderAll();

    var rect = new fabric.Rect({
      left: 100,
      top: 50,
      fill: "#D81B60",
      width: 50,
      height: 50,
      strokeWidth: 2,
      stroke: "#880E4F",
      rx: 10,
      ry: 10,
      angle: 45,
      scaleX: 3,
      scaleY: 3,
      hasControls: true
    });

    canvas.add(rect);
  }
};
</script>

