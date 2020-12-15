/*
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

/**
 * @packageDocumentation
 * @module asset
 */

import {ccclass, editable, serializable} from 'cc.decorator';
import { Scene } from '../scene-graph';
import { Asset } from './asset';
import { legacyCC } from '../global-exports';

/**
 * @en Class for scene loading.
 * @zh 场景资源类。
 *
 */
@ccclass('cc.SceneAsset')
export default class SceneAsset extends Asset {
    /**
     * @en The scene node
     * @zh 场景节点。
     */
    @editable
    @serializable
    public scene: Scene | null = null;

    /**
     * @en Indicates the native assets of this scene can be load after scene launched.
     * @zh 指示该场景依赖的资源可否在场景切换后再延迟加载。
     * @default false
     */
    @editable
    @serializable
    public asyncLoadAssets = false;
}

legacyCC.SceneAsset = SceneAsset;