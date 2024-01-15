export type MatrixOptions = Partial<{
    /**
     * Control whether the animation starts automatically.
     * 
     * @default true
     */
    autoStart: boolean;
    /**
     * Control if rain particles are added into columns.
     * 
     * @default true
     */
    columnRain: boolean;
    /**
     * Control if rain particles are automatically added based 
     * on `rainWidth` and `rainDensity`.
     * 
     * @default false
     */
    disableAutoRain: boolean;
    /**
     * Control how quickly the particle fades. 
     * Should be a number between 1 and 0. 
     * @default 0.05
     */
    fadeStrength: number;
    /**
     * Control how many raindrops are added to the scene.
     * Must have `disableAutoRain` set to true to activate.
     */
    rainCount: number;
    /**
     * Control how dense the rain droplets are added.
     * Should be a number between 0 and 2.
     * (Higher values are possible but not recommended)
     * @default 2
     */
    rainDensity: number;
    /**
     * Control how wide the rain droplets are.
     * @default 12
     */    
    rainWidth: number;
    /**
     * Control how wide the rain droplets are.
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
     */    
    rainDrop: MatrixAnimationRaindropOptions;
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
     * @default "0
     */
    headBloomSize: number;
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
     * @broken
     */
    warmupIterations: number;
}>;

export type MatrixAnimationRaindropOptions = Partial<{
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
     * Control the character list that the drop can choose from.
     * 
     * @default "<UNICODE_BRAILLE_CHARACTERS>"
     */
    charArray: string[];
    /**
     * Control the color of the head of the drop.
     * - Can be hex/rgb(a)/hls format.
     * 
     * @default "rgba(255,255,255,0.8)"
     */
    headColor: string;
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
    // /**
    //  * Configure the speed at which the 
    //  */
    // xSpeed: number;
}>;