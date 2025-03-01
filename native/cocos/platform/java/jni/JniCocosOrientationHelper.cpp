/****************************************************************************
 Copyright (c) 2020-2022 Xiamen Yaji Software Co., Ltd.

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
****************************************************************************/

#include <jni.h>
#include "cocos/bindings/event/EventDispatcher.h"
#include "platform/interfaces/modules/Device.h"
#include "platform/java/jni/JniHelper.h"
#include "platform/java/jni/glue/JniNativeGlue.h"
#if CC_PLATFORM == CC_PLATFORM_ANDROID
    #include "platform/BasePlatform.h"
    #include "platform/android/AndroidPlatform.h"
#endif

extern "C" {
//NOLINTNEXTLINE
JNIEXPORT void JNICALL Java_com_cocos_lib_CocosOrientationHelper_nativeOnOrientationChanged(JNIEnv *env, jclass thiz, jint rotation) {
    int orientation;
    switch (rotation) {
        case 0: //ROTATION_0
            orientation = (int)cc::Device::Orientation::PORTRAIT;
        case 1: //ROTATION_90
            orientation = (int)cc::Device::Orientation::LANDSCAPE_RIGHT;
        case 2: //ROTATION_180
            orientation = (int)cc::Device::Orientation::PORTRAIT_UPSIDE_DOWN;
        case 3: //ROTATION_270
            orientation = (int)cc::Device::Orientation::LANDSCAPE_LEFT;
    }

    cc::DeviceEvent ev;
    ev.type = cc::DeviceEvent::Type::ORIENTATION;
    ev.args[0].intVal = orientation;
#if CC_PLATFORM == CC_PLATFORM_ANDROID
    auto *platform = cc::BasePlatform::getPlatform();
    auto *androidPlatform = static_cast<cc::AndroidPlatform *>(platform);
    androidPlatform->dispatchEvent(ev);
#else
    JNI_NATIVE_GLUE()->dispatchEvent(ev);
#endif
}
}
