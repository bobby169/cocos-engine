/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2016-2022 Xiamen Yaji Software Co., Ltd.

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

#pragma once

#include "base/RefCounted.h"
#include "base/std/container/string.h"
#include "gfx-base/GFXDef.h"

namespace cc {

class Image : public RefCounted {
public:
    Image();
    ~Image() override;

    /** Supported formats for Image */
    enum class Format {
        //! JPEG
        JPG,
        //! PNG
        PNG,
        //! WebP
        WEBP,
        //! PVR
        PVR,
        //! ETC
        ETC,
        //! ETC2
        ETC2,
        //! ASTC
        ASTC,
        //! Raw Data
        RAW_DATA,
        //! Unknown format
        UNKNOWN
    };

    bool initWithImageFile(const ccstd::string &path);
    bool initWithImageData(const unsigned char *data, uint32_t dataLen);

    // @warning kFmtRawData only support RGBA8888
    bool initWithRawData(const unsigned char *data, uint32_t dataLen, int width, int height, int bitsPerComponent, bool preMulti = false);

    // data will be free outside.
    inline void takeData(unsigned char **outData) {
        *outData = _data;
        _data = nullptr;
    }

    // Getters
    inline unsigned char *getData() const { return _data; }
    inline uint32_t getDataLen() const { return _dataLen; }
    inline Format getFileType() const { return _fileType; }
    inline gfx::Format getRenderFormat() const { return _renderFormat; }
    inline int getWidth() const { return _width; }
    inline int getHeight() const { return _height; }
    inline ccstd::string getFilePath() const { return _filePath; }
    inline bool isCompressed() const { return _isCompressed; }

    /**
     @brief    Save Image data to the specified file, with specified format.
     @param    filename        the file's absolute path, including file suffix.
     @param    isToRGB        whether the image is saved as RGB format.
     */
    bool saveToFile(const std::string &filename, bool isToRGB = true);

protected:
    bool initWithJpgData(const unsigned char *data, uint32_t dataLen);
    bool initWithPngData(const unsigned char *data, uint32_t dataLen);
#if CC_USE_WEBP
    bool initWithWebpData(const unsigned char *data, uint32_t dataLen);
#endif
    bool initWithPVRData(const unsigned char *data, uint32_t dataLen);
    bool initWithPVRv2Data(const unsigned char *data, uint32_t dataLen);
    bool initWithPVRv3Data(const unsigned char *data, uint32_t dataLen);
    bool initWithETCData(const unsigned char *data, uint32_t dataLen);
    bool initWithETC2Data(const unsigned char *data, uint32_t dataLen);
    bool initWithASTCData(const unsigned char *data, uint32_t dataLen);

    bool saveImageToPNG(const std::string &filePath, bool isToRGB = true);
    bool saveImageToJPG(const std::string &filePath);

    unsigned char *_data = nullptr;
    uint32_t _dataLen = 0;
    int _width = 0;
    int _height = 0;
    Format _fileType = Format::UNKNOWN;
    gfx::Format _renderFormat;
    ccstd::string _filePath;
    bool _isCompressed = false;

    static Format detectFormat(const unsigned char *data, uint32_t dataLen);
    static bool isPng(const unsigned char *data, uint32_t dataLen);
    static bool isJpg(const unsigned char *data, uint32_t dataLen);
    static bool isWebp(const unsigned char *data, uint32_t dataLen);
    static bool isPvr(const unsigned char *data, uint32_t dataLen);
    static bool isEtc(const unsigned char *data, uint32_t dataLen);
    static bool isEtc2(const unsigned char *data, uint32_t dataLen);
    static bool isASTC(const unsigned char *data, uint32_t detaLen);

    static gfx::Format getASTCFormat(const unsigned char *pHeader);

    friend class ImageUtils;
};

} //namespace cc
