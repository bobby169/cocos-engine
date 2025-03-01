/****************************************************************************
 Copyright (c) 2021 Xiamen Yaji Software Co., Ltd.

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

#include "base/std/container/string.h"
#include "base/std/container/vector.h"

namespace cc {

/**
 * @en Join strings to be a path.
 * @zh 拼接字符串为路径。
 * @example {@link cocos/core/utils/CCPath/join.js}
 */
ccstd::string join(const ccstd::vector<ccstd::string> &segments);

/**
 * @en Get the ext name of a path including '.', like '.png'.
 * @zh 返回 Path 的扩展名，包括 '.'，例如 '.png'。
 * @example {@link cocos/core/utils/CCPath/extname.js}
 */
ccstd::string extname(const ccstd::string &path);

/**
 * @en Get the main name of a file name.
 * @zh 获取文件名的主名称。
 * @deprecated
 */
ccstd::string mainFileName(const ccstd::string &fileName);

/**
 * @en Get the file name of a file path.
 * @zh 获取文件路径的文件名。
 * @example {@link cocos/core/utils/CCPath/basename.js}
 */
ccstd::string basename(const ccstd::string &path, const ccstd::string &extName = "");

/**
 * @en Get dirname of a file path.
 * @zh 获取文件路径的目录名。
 * @example {@link cocos/core/utils/CCPath/dirname.js}
 */
ccstd::string dirname(const ccstd::string &path);

/**
 * @en Change extname of a file path.
 * @zh 更改文件路径的扩展名。
 * @example {@link cocos/core/utils/CCPath/changeExtname.js}
 */
ccstd::string changeExtname(const ccstd::string &path, const ccstd::string &extName = "");

/**
 * @en Change file name of a file path.
 * @zh 更改文件路径的文件名。
 * @example {@link cocos/core/utils/CCPath/changeBasename.js}
 */
ccstd::string changeBasename(const ccstd::string &path, const ccstd::string &baseName, bool isSameExt = false);

ccstd::string normalize(const ccstd::string &url);

ccstd::string stripSep(const ccstd::string &path);

char getSeperator();

} // namespace cc
