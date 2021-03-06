/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org


 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var cocos2dApp = cc.Application.extend({
    config:document['ccConfig'],
    ctor:function (scene) {
        this._super();
        this.startScene = scene;
        cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
        cc.initDebugSetting();
        var doc = document.documentElement;
        var width = doc.clientWidth;
        var height = doc.clientHeight;
        cc.setup(this.config.tag, width, height);
        cc.AppController.shareAppController().didFinishLaunchingWithOptions();
    },
    applicationDidFinishLaunching:function () {
        if(cc.RenderDoesnotSupport()){
            //show Information to user
            alert("Browser doesn't support Canvas or WebGL");
            return false;
        }
        // initialize director
        var director = cc.Director.getInstance();
        //director.setContentScaleFactor(240/480);

        //cc.EGLView.getInstance().setDesignResolutionSize(800, 450, cc.RESOLUTION_POLICY.SHOW_ALL);

        // enable High Resource Mode(2x, such as iphone4) and maintains low resource on other devices.
        //director.enableRetinaDisplay(true);

        // turn on display FPS
        director.setDisplayStats(this.config['showFPS']);

        // set FPS. the default value is 1.0/60 if you don't call this
        director.setAnimationInterval(1.0 / this.config['frameRate']);

        var designSize = cc.size(1136,640);
        var resPolicy = cc.RESOLUTION_POLICY.SHOW_ALL;
        cc.EGLView.getInstance().setDesignResolutionSize(designSize.width, designSize.height, resPolicy);

        var scene = new cc.Scene();
        var layer = new TestController();
        scene.addChild(layer);
        director.runWithScene(scene);

        return true;
    }
});

var myApp = new cocos2dApp(TestController);

