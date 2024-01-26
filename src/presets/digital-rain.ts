import { MatrixOptions } from '../types';

export default Object.seal({
    rainWidth: 10,
    rainHeight: 8,
    minFrameTime: 50,
    rainGenerator: Object.seal({
        count: 200,
    }),
    rainDrop: Object.seal({
        direction: "TD",
        charArrays: ["ᚠᚡᚢᚣᚤᚥᚦᚧᚨᚩᚪᚫᚬᚭᚮᚯᚰᚱᚲᚳᚴᚵᚶᚷᚸᚹᚺᚻᚼᚽᚾᚿᛀᛁᛂᛃᛄᛅᛆᛇᛈᛉᛊᛋᛌᛍᛎᛏᛐᛑᛒᛓᛔᛕᛖᛗᛘᛙᛚᛛᛜᛝᛞᛟᛠᛡᛢᛣᛤᛥᛦᛧᛨᛩᛪ᛫᛬᛭ᛮᛯᛰᛱᛲᛳᛴᛵᛶᛷᛸ"],
        headColor: "rgba(135,112,255,.8)",
        trailColor: "rgba(62,141,225,1)",
        fontSize: 16,
        fontFamily: "Arial",
        randomizeFrameDelay: true,
        jitterLeftStrength: 6,
        jitterRightStrength: 0,
        jitterUpStrength: 0,
        jitterDownStrength: 0
    }),
    trailBloomSize: 1,
    trailBloomColor: "#0000ff",
    headBloomSize: 1,
    headBloomColor: "#0000ee",

    warmupIterations: 50,
    fadeStrength: 0.05,
}) as MatrixOptions;