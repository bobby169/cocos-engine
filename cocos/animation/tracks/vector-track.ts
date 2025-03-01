import { ccclass, serializable } from 'cc.decorator';
import { RealCurve } from '../../core/curves';
import { Vec2, Vec3, Vec4 } from '../../core/math';
import { CLASS_NAME_PREFIX_ANIM, createEvalSymbol } from '../define';
import { Channel, RealChannel, RuntimeBinding, Track } from './track';
import { maskIfEmpty } from './utils';

const CHANNEL_NAMES: ReadonlyArray<string> = ['X', 'Y', 'Z', 'W'];

/**
 * @en
 * A vector track animates a vector(in 2, 3, 4 dimension) attribute of target.
 * @zh
 * 向量轨道描述目标上某个（二、三、四维）向量属性的动画。
 */
@ccclass(`${CLASS_NAME_PREFIX_ANIM}VectorTrack`)
export class VectorTrack extends Track {
    constructor () {
        super();
        this._channels = new Array(4) as VectorTrack['_channels'];
        for (let i = 0; i < this._channels.length; ++i) {
            const channel = new Channel<RealCurve>(new RealCurve());
            channel.name = CHANNEL_NAMES[i];
            this._channels[i] = channel;
        }
    }

    /**
     * @en Gets or sets the count of components(dimension) available while evaluating of this track.
     * @zh 获取或设置此轨道在求值时有效的分量数（维度）。
     */
    get componentsCount () {
        return this._nComponents;
    }

    set componentsCount (value) {
        this._nComponents = value;
    }

    /**
     * @en The four channel of the track.
     * @zh 返回此轨道的四条通道。
     * @returns An readonly four length array in which
     * the element at n denotes the channel of n-th vector component.
     */
    public channels () {
        return this._channels;
    }

    /**
     * @internal
     */
    public [createEvalSymbol] () {
        switch (this._nComponents) {
        default:
        case 2:
            return new Vec2TrackEval(
                maskIfEmpty(this._channels[0].curve),
                maskIfEmpty(this._channels[1].curve),
            );
        case 3:
            return new Vec3TrackEval(
                maskIfEmpty(this._channels[0].curve),
                maskIfEmpty(this._channels[1].curve),
                maskIfEmpty(this._channels[2].curve),
            );
        case 4:
            return new Vec4TrackEval(
                maskIfEmpty(this._channels[0].curve),
                maskIfEmpty(this._channels[1].curve),
                maskIfEmpty(this._channels[2].curve),
                maskIfEmpty(this._channels[3].curve),
            );
        }
    }

    @serializable
    private _channels: [RealChannel, RealChannel, RealChannel, RealChannel];

    @serializable
    private _nComponents: 2 | 3 | 4 = 4;
}

export class Vec2TrackEval {
    constructor (private _x: RealCurve | undefined, private _y: RealCurve | undefined) {

    }

    public evaluate (time: number, runtimeBinding: RuntimeBinding) {
        if ((!this._x || !this._y) && runtimeBinding.getValue) {
            Vec2.copy(this._result, runtimeBinding.getValue() as Vec2);
        }

        if (this._x) {
            this._result.x = this._x.evaluate(time);
        }
        if (this._y) {
            this._result.y = this._y.evaluate(time);
        }

        return this._result;
    }

    private _result: Vec2 = new Vec2();
}

export class Vec3TrackEval {
    constructor (private _x: RealCurve | undefined, private _y: RealCurve | undefined, private _z: RealCurve | undefined) {

    }

    public evaluate (time: number, runtimeBinding: RuntimeBinding) {
        if ((!this._x || !this._y || !this._z) && runtimeBinding.getValue) {
            Vec3.copy(this._result, runtimeBinding.getValue() as Vec3);
        }

        if (this._x) {
            this._result.x = this._x.evaluate(time);
        }
        if (this._y) {
            this._result.y = this._y.evaluate(time);
        }
        if (this._z) {
            this._result.z = this._z.evaluate(time);
        }

        return this._result;
    }

    private _result: Vec3 = new Vec3();
}

export class Vec4TrackEval {
    constructor (
        private _x: RealCurve | undefined,
        private _y: RealCurve | undefined,
        private _z: RealCurve | undefined,
        private _w: RealCurve | undefined,
    ) {

    }

    public evaluate (time: number, runtimeBinding: RuntimeBinding) {
        if ((!this._x || !this._y || !this._z || !this._w) && runtimeBinding.getValue) {
            Vec4.copy(this._result, runtimeBinding.getValue() as Vec4);
        }

        if (this._x) {
            this._result.x = this._x.evaluate(time);
        }
        if (this._y) {
            this._result.y = this._y.evaluate(time);
        }
        if (this._z) {
            this._result.z = this._z.evaluate(time);
        }
        if (this._w) {
            this._result.w = this._w.evaluate(time);
        }

        return this._result;
    }

    private _result: Vec4 = new Vec4();
}
