export type MatrixOptions = Partial<{
    /**
     * Control whether the animation starts automatically.
     * 
     * @default true
     */
    autoStart: boolean;
    /**
     * Color of the bloom effect.
     * Does nothing if `bloomSize` is set to 0.
     * - Can be hex/rgb(a)/hls format.
     * @default "#0000"
     */
    bloomColor: string;
    /**
     * Size of the bloom effect.
     * @default 0
     */
    bloomSize: number;
    /**
     * Control how wide the rain droplets are.
     * @default 12
     */    
    rainWidth: number;
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
    /**
     * Control how quickly the particle fades. 
     * Should be a number between 1 and 0. 
     * @default 0.05
     */    
    fadeStrength: number;
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