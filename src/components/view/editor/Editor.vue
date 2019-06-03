<template>
    <div class="editor" id="editor" ref="editor">
        <section class="preview">
            <section class="picsWallPreviewModule">
                <section class="picsWallPreviewMain">
                    <div class="picsWallPreview"></div>
                </section>
            </section>

            <section class="singlePicPreviewModule">
                <section class="singlePicPreviewMain">
                    <canvas class="singlePicPreview" id="singlePicPreview"></canvas>
                    <section class="singlePicPreviewTool">
                        <div class="mdlTool"><button class="inTool" id="addToSingle" ref="addToSingle">导入</button></div>
                        <div class="mdlTool"><button class="inTool" id="inRotate" ref="inRotate">旋转</button></div>
                        <div class="mdlTool"><button class="inTool" id="inScale" ref="inScale">缩放</button></div>
                    </section>
                </section>
            </section>
        </section>

        <section class="picsModule">
            <header class="title">素材</header>
            <section class="picsBox" id="picsBox" ref="picsBox">
            </section>
            <div class="addPic" id="addPic" ref="addPic">
                +
                <input id="pickPic" ref="pickPic" class="pickPic" type="file" multiple />
            </div>

        </section>

        <section class="decorationsModule">
            <section class="mBorder">
                <header class="title">边框</header>
                <section class="borderBox" id="borderBox">
                    <div class="mbd">

                    </div>
                </section>
            </section>

            <section class="hangings">
                <header class="title">悬挂</header>
                <section class="hangingsBox" id="hangsBox">
                    <div class="hanging">

                    </div>
                </section>
            </section>
        </section>
    </div>
</template>

<style>
        * {
            margin: 0;
            padding: 0;
        }
</style>


<style scoped>

        
        .editor {
            position: relative;
            width: 100%;
            height: 960px;
            background-color: #555
        }
        
        .editor>.preview {
            position: relative;
            width: 50%;
            height: 100%;
            float: left;
            border-right: 0.5px solid #D8D8D8;
            /* background-color: green; */
        }
        
        .editor>.picsModule {
            position: relative;
            width: 24%;
            height: 100%;
            float: left;
            border-right: 0.5px solid #D8D8D8;
            border-top: 0.5px solid #D8D8D8;
            /* background-color: red; */
        }
        
        .title {
            height: 44px;
            width: 100%;
            color: white;
            line-height: 44px;
            text-align: center;
            border-bottom: 0.5px solid #D8D8D8;
        }
        
        .editor>.decorationsModule {
            position: relative;
            width: 25.9%;
            height: 100%;
            float: left;
            /* background-color: blue; */
        }
        
        .decorationsModule .mBorder {
            display: inline-block;
            height: 50%;
            width: 100%;
            border-bottom: 0.5px solid #D8D8D8;
        }
        
        .decorationsModule .hangings {
            display: inline-block;
            height: 50%;
            width: 100%;
        }
        
        .picsBox {
            display: inline-block;
            position: relative;
            width: 90%;
            height: 90%;
            margin: 5% 5%;
            overflow-x: hidden;
            overflow-y: auto;
            /* background-color: #fff; */
        }
        
        .pic {
            width: 48%;
            height: 18%;
            margin: 1% 1%;
            float: left;
            overflow: hidden;
            background-color: rgba(255, 255, 255, .3);
            border-radius: 4px;
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
            background-color: rgba(255, 255, 255, .3);
        }
        
        .pickPic {
            position: absolute;
            display: none;
        }
        
        .borderBox {
            position: relative;
            width: 90%;
            height: 80%;
            margin: 5% 5%;
            overflow-x: hidden;
            overflow-y: auto;
        }
        
        .hangingsBox {
            position: relative;
            width: 90%;
            height: 70%;
            margin: 5% 5%;
            overflow-x: hidden;
            overflow-y: auto;
        }
        
        .mbd {
            width: 20%;
            height: 18%;
            margin: 1% 2.5%;
            float: left;
            background-color: rgba(255, 255, 255, .3);
            border-radius: 4px;
        }
        
        .hanging {
            width: 20%;
            height: 18%;
            margin: 1% 2.5%;
            float: left;
            background-color: rgba(255, 255, 255, .3);
            border-radius: 4px;
        }
        
        .picsWallPreviewModule {
            position: relative;
            width: 100%;
            height: 50%;
            /* background-color: #fff; */
            border-bottom: .5px solid #D8D8D8
        }
        
        .picsWallPreviewMain {
            position: absolute;
            width: 96%;
            height: 96%;
            margin: 1% 2%;
            border: .5px solid #D8D8D8;
        }
        
        .picsWallPreview {
            position: absolute;
            width: 90%;
            left: 5%;
            top: 1%;
            height: 80%;
            border: .5px dotted #D8D8D8
        }
        
        .singlePicPreviewModule {
            position: relative;
            width: 100%;
            height: 50%;
            /* background-color: #fff; */
            border-top: .5px solid #D8D8D8
        }
        
        .singlePicPreviewMain {
            position: absolute;
            width: 96%;
            height: 96%;
            margin: 1% 2%;
            border: .5px solid #D8D8D8
        }
        
        .singlePicPreview {
            position: absolute;
            width: 90%;
            height: 100%;
        }
        
        .singlePicPreviewTool {
            position: absolute;
            right: 0;
            width: 10%;
            height: 100%;
            border-left: .5px solid #D8D8D8;
            /* background-color: #fff; */
        }
        
        .mdlTool {
            margin: 16px 0;
            color: #D8D8D8;
            text-align: center;
        }
        
        .mdlTool .inTool {
            width: 64px;
            height: 64px;
            font-size: 14px;
            border-radius: 50%;
            background-color: whitesmoke;
        }
</style>

<<script>
export default {
    name: 'editor',
    data() {
        return {
            picsSource: [],
        }
    },

    methods: {
        
    },

    computed: {
        
    },
}
</script>

