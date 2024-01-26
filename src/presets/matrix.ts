import { MatrixOptions } from '../types';

export default Object.seal({
    rainWidth: 10,
    rainHeight: 18,
    minFrameTime: 125,
    syncFrame: false,
    rainDensity: 0.25,
    rainDrop: Object.seal({
        direction: "TD",
        charArrays: ["0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZアァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン"],
        headColor: "rgba(255,255,255,0.8)",
        trailColor: "rgba(62, 225, 78, 1.00)",
        fontSize: 16,
        fontFamily: "Backwards",
        randomizePosition: true,
        frameDelay: 50,
        minFrameDelay: 50,
        maxFrameDelay: 130,
        randomizeFrameDelay: true,
        jitterLeftStrength: 0,
        jitterRightStrength: 0,
        jitterUpStrength: 0,
        jitterDownStrength: 0
    }),
    trailBloomSize: 8,
    trailBloomColor: "#82ffa9",
    headBloomSize: 4,
    headBloomColor: "#ffffff",
    warmupIterations: 50,
    fadeStrength: 0.05,
}) as MatrixOptions;