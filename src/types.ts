export type MatrixRaindropOptions = Partial<{
    /**
     * Control the direction that the rain drop moves.
     * 
     * |  |  |
     * | --- | --- |
     * | TD | Top=>Down |
     * | LR | Left=>Right |
     * | BU | Bottom=>Up |
     * | RL | Right=>Left |
     * 
     * @default "TD"
     */
    direction: "TD" | "LR" | "BU" | "RL";
    /**
     * Control how much a raindrop can jitter to the left per frame.
     * 
     * @default 0
     */
    jitterLeftStrength: number;
    /**
     * Control how much a raindrop can jitter to the right per frame.
     * 
     * @default 0
     */
    jitterRightStrength: number;
    /**
     * Control how much a raindrop can jitter upwards per frame.
     * 
     * @default 0
     */
    jitterUpStrength: number;
    /**
     * Control how much a raindrop can jitter downwards per frame.
     * 
     * @default 0
     */
    jitterDownStrength: number;
    /**
     * Control the character list that the drop can choose from.
     * 
     * Pass multiple strings to let the raindrop pick randomly from
     * a set of themes upon each reset
     * 
     * @default "<UNICODE_BRAILLE_CHARACTERS>"
     */
    charArrays: string | string[];
    /**
     * Control the color of the head of the drop.
     * - Can be hex/rgb(a)/hls format.
     * 
     * @default "rgba(255,255,255,0.8)"
     */
    headColor: string;
    /**
     * Control if rain particles are added into columns.
     * 
     * @default true
     */
    alignToColumns: boolean;
    /**
     * Control how wide the rain droplets are.
     * @default 12
     */
    rainWidth: number;
    /**
     * How many ms before the next movement for this drop.
     * enable `randomizeFrameDelay` to randomly change on
     * droplet respawn.
     * 
     * @default <calculated> via generator
     */
    frameDelay: number;
    /**
     * Should the raindrop randomly reposition on respawn
     * @default false
     */
    randomizePosition: boolean;
    /**
     * Minimum time between drawn frames in ms.
     * - `randomizeFrameDelay` must be `true` for this to take effect.
     * @default 30
     */
    minFrameDelay: number;
    /**
     * Maximum time between drawn frames in ms.
     * - `randomizeFrameDelay` must be `true` for this to take effect.
     * @default 60
     */
    maxFrameDelay: number;
    /**
     * Control whether frame delay is randomized between
     * `minFrameDelay` and `maxFrameDelay`
     * @default false
     */
    randomizeFrameDelay: boolean;
    /**
     * Control the max speed that the particle can move 
     * in it's current direction. If not set, particle
     * will move based on defined `rainHeight` or `rainWidth`
     * depending on if motion is vertical or horizontal respectively
     * 
     * @default null
     */
    minMoveSpeed: number;
    /**
     * Control the max speed that the particle can move 
     * in it's current direction. If not set, particle
     * will move based on defined `rainHeight` or `rainWidth`
     * depending on if motion is vertical or horizontal respectively
     * 
     * @default null
     */
    maxMoveSpeed: number;
    /**
     * Control the color of the drop's trail.
     * - `trailColors` will override this.
     * - Can be hex/rgb(a)/hls format.
     * 
     * @default "rgba(140,62,225,1)"
     */
    trailColor: string;
    /**
     * Control the color of the drop's trail. Trail randomly
     * picks a color from the list.
     * - Can be hex/rgb(a)/hls format.
     * 
     * @default []
     */
    trailColors: string[];
    /**
     * Control the font size for the rain characters.
     * 
     * @default 14
     */
    fontSize: number;
    /**
     * Configure the font family for the rain characters.
     * 
     * @default "Arial"
     */
    fontFamily: string;
}>;

export type MatrixRaindropInstanceOptions = Partial<MatrixRaindropOptions & {
    x: number,
    y: number,
    /**
     * TBD.
     */
    onLeaveView: (opts: MatrixRaindropOptions) => {

    };
}>

export type MatrixRainGeneratorOptions = Partial<{
    /**
     * Control how many raindrops are added to the scene.
     * If not specified, rain will automatically be added based on canvas width
     */
    count: number;
    /**
     * Control how dense the rain droplets are added.
     * Should be a number between 0 and 2.
     * (Higher values are possible but not recommended)
     * @default 2
     */
    density: number;
    /**
     * Control the direction that the rain drops move.
     * 
     * |  |  |
     * | --- | --- |
     * | TD | Top=>Down |
     * | LR | Left=>Right |
     * | BU | Bottom=>Up |
     * | RL | Right=>Left |
     * 
     * @default "TD"
     */
    direction: "TD" | "LR" | "BU" | "RL";    
    /**
     * Randomize the X position on clip off canvas
     * Only makes sense in combination with `direction`: `TD` and `BU`
     * @default false
     */
    randomizeXonLeaveView: boolean;
    /**
     * Randomize the Y position on clip off canvas
     * Only makes sense in combination with `direction`: `LR` and `RL`
     * @default false
     */
    randomizeYonLeaveView: boolean;
}>

export type MatrixOptions = Partial<MatrixRaindropOptions & {
    /**
     * Control whether the animation starts automatically.
     * 
     * @default true
     */
    autoStart: boolean;
    /**
     * Control how quickly the particle fades. 
     * Should be a number between 1 and 0. 
     * @default 0.05
     */
    fadeStrength: number;
    /**
     * 
     */
    rainGenerator: MatrixRainGeneratorOptions;
    /**
     * Control how tall the rain droplets are.
     * @default 0
     * @experimental
     */
    rainHeight: number;
    /**
     * Control the minimum amount of time between drawn frames.
     * @default 50
     */    
    minFrameTime: number;
    /**
     * Configuration for the Raindrops.
     * 
     * If an array is provided, array.length raindrops will be created.
     * If only one item is provided, it will be used as configuration for 
     * all of the raindrops
     * 
     * @default null
     */    
    rainDrop: MatrixRaindropOptions | MatrixRaindropInstanceOptions[];
    /**
     * Control the color of the bloom effect for the head.
     * - Does nothing if headBloomSize is less than 0.
     * - Can be hex/rgb(a)/hls format.
     * 
     * @default "rgba(255,255,255,0.8)"
     */
    headBloomColor: string;
    /**
     * Control the amount of bloom for the heads of the drop.
     * 
     * @default 0
     */
    headBloomSize: number;
    /**
     * WIP - move all raindrops in sync
     * @experimental
     * @default true
     */
    syncFrame: boolean;
    /**
     * Control the manner in which trail colors are applied
     * - `random` picks from the `trailColors` array randomly.
     * - `sequential` picks from the `trailColors` array in order.
     * 
     * @default "random"
     */
    trailColorLogic: "random" | "sequential";
    /**
     * Control the color of the bloom effect for the trail.
     * - Does nothing if trailBloomSize is less than 0.
     * - Can be hex/rgb(a)/hls format.
     * 
     * @default "rgba(255,255,255,0.8)"
     */
    trailBloomColor: string;
    /**
     * Control the amount of bloom for the trail of the drop.
     * 
     * @default "0
     */
    trailBloomSize: number;
    /**
     * Control how fast the canvas background translates
     * This creates a smoke movement effect.
     * Must be used in conjunction with `windDirection` to work.
     * @default 0
     */    
    windSpeed: number;
    /**
     * Control the direction that the canvas background translates
     * This creates a smoke movement effect.
     * Must be used in conjunction with `windSpeed` to work.
     * 
     * |  |  |
     * | --- | --- |
     * | TD | Top=>Down |
     * | LR | Left=>Right |
     * | BU | Bottom=>Up |
     * | RL | Right=>Left |
     * 
     * @default null
     */    
    windDirection: "TD" | "LR" | "BU" | "RL";
    /**
     * Control how many before-render iterations happen.
     * This makes rain particles appear already falling when the canvas first draws.
     * @hidden
    */
   warmupIterations: number;
}>;

