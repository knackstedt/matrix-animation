import { MatrixOptions, MatrixRaindropOptions } from './types';


const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const randomFloat = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
}

export class MatrixAnimation {
    private container: HTMLElement;
    private _ctx: CanvasRenderingContext2D;
    private _canvas: HTMLCanvasElement;
    get canvas() { return this._canvas; }
    get ctx() { return this._ctx ?? (this._ctx = this.canvas.getContext('2d')); }

    frameId = 0;
    fadeInterval = 0;
    // full screen dimensions
    canvasWidth = 0;
    canvasHeight = 0;

    availableCharSets = [];
    raindrops: MatrixRaindrop[] = [];

    private mutationObserver: MutationObserver;
    private resizeObserver: ResizeObserver;
    // Placeholder method that
    private performCanvasShift: Function = () => { /* NOP */ };
    // private lastFrameTime = Date.now();
    public stopAnimation = false; // Interrupt any active animation (used as a safety)
    private hasCreatedCanvas = false;
    rainWidth = 0;

    /**
     * 
     * @param selector CSS Selector or HTML element that we bootstrap the canvas onto
     * @param options Configuration options
     */
    constructor(
        private selector: string | HTMLElement,
        public options: MatrixOptions = {}
    ) {
        this.applyOptions(options);

        this.setupElements();

        this.resizeObserver = new ResizeObserver(() => this.onResize());
        this.resizeObserver.observe(this.container);

        // Watch the DOM tree -- if the contianer or canvas is destroyed
        // then we kill the animation
        this.mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach(m => {
                const removed = [...m.removedNodes.values()];
                if (removed.includes(this.container) || removed.includes(this.canvas)) {
                    this.dispose();
                }
            })
        });
        this.mutationObserver.observe(this.container, { childList: true });

        this.initCanvasShift();
        this.initCanvas();
    }

    /**
     * Remove all event listeners and dispose of all objects from memory.
     */
    dispose() {
        this.pause();
        this.resizeObserver.disconnect();
        this.mutationObserver.disconnect();

        this.raindrops.forEach(drop => {
            
        });

        if (this.hasCreatedCanvas) {
            this.canvas.remove();
        }
    }

    /**
     * Resume the animation from the 'paused' state
     */
    play() {
        if (this.fadeInterval) clearInterval(this.fadeInterval);
        if (this.frameId) cancelAnimationFrame(this.frameId);

        this.stopAnimation = false;
        this.fadeInterval = setInterval(() => {
            // Fade everything slightly
            this.ctx.fillStyle = `rgba(0,0,0,${this.options.fadeStrength ?? 0.05})`;
            this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        }, 20);
        
        this.render();
    }

    /**
     * Pause the animation.
     */
    pause() {
        this.stopAnimation = true;
        cancelAnimationFrame(this.frameId);
        clearInterval(this.fadeInterval);
    }

    applyOptions(options: MatrixOptions = this.options) {
        if (typeof this.options != "object")
            throw new Error("Options must be an object");

        this.options.minFrameTime = options.minFrameTime ?? 50;
        this.options.rainGenerator = options.rainGenerator ?? {};
        this.options.rainGenerator.density = this.options.rainGenerator?.density ?? options.rainGenerator?.density ?? 2;

        if (!Array.isArray(this.options.rainDrop)) {
            this.options.rainDrop = this.options.rainDrop ?? {};
            this.rainWidth =
                this.options.rainDrop.rainWidth =
                this.options.rainDrop.rainWidth ?? 12;
            this.options.rainDrop.alignToColumns = this.options.rainDrop.alignToColumns ?? true;
        }
        else {
            this.rainWidth = 12;
        }

        Object.entries(options)
            .filter(([key]) => key != "rainDrop")
            .forEach(([key, value]) => this.options[key] = value);

        if (typeof options.rainDrop == "object") {
            Object.entries(options.rainDrop)
                .forEach(([key, value]) => this.options.rainDrop[key] = value);
        }

        if (typeof options.rainGenerator == "object") {
            Object.entries(options.rainGenerator)
                .forEach(([key, value]) => this.options.rainGenerator[key] = value);
        }

        // Spread operator correctly serializes unicode
        let arrs = 
            this.options.charArrays
            ? Array.isArray(this.options.charArrays) 
                ? this.options.charArrays 
                : [this.options.charArrays]
            : !Array.isArray(this.options.rainDrop)
                ? this.options.rainDrop.charArrays
                    ? Array.isArray(this.options.rainDrop.charArrays) 
                        ? this.options.rainDrop.charArrays
                        : [this.options.rainDrop.charArrays]
                : ["0123456789"]
                : ["0123456789"];

        // console.log(arrs)
        this.availableCharSets = arrs;
    }

    /**
     * Handle resize events.
     * The component uses a ResizeObserver, so this should rarely need to be called.
     */
    onResize(refreshRain = true) {
        // Negative if shrunk, 0 if unchanged, positive if grown
        const widthChange = this.container.clientWidth - this.canvasWidth;
        const heightChange = this.container.clientHeight - this.canvasHeight;

        this.canvas.width = this.canvasWidth = this.container.clientWidth;
        this.canvas.height = this.canvasHeight = this.container.clientHeight;

        if (refreshRain) {
            if (widthChange > 0) {
                this.createRaindrops(true);
            }
            if (widthChange < 0) {
                // Remove all the cut-off rain
                this.raindrops = this.raindrops.filter(r => r.x < this.canvasWidth);
            }
            if (heightChange > 0) {
                // TBD.
            }
            if (heightChange < 0) {
                // Remove all the cut-off rain
                this.raindrops = this.raindrops.filter(r => r.x < this.canvasWidth);
            }

            // this.createRaindrops();
    
            // // Preemptively draw the characters
            // for (let i = 0; i < this.options.warmupIterations; i++)
            //     this.drawRain();
        }
    }

    /**
     * Reset the raindrops
     */
    resetRaindrops() {
        this.raindrops.splice(0);
        this.createRaindrops();
    }

    private setupElements() {
        if (typeof this.selector == "string") {
            let el = document.querySelector(this.selector);
            if (!el) {
                throw new Error("No element matching selector \"" + this.selector + "\"");
            }
            if (el.nodeName == "CANVAS") {
                this.container = el.parentElement;
            }
            else {
                this.container = el as HTMLElement;
            }
        }
        else if (this.selector instanceof HTMLElement) {
            if (this.selector.nodeName == "CANVAS") {
                this.container = this.selector.parentElement;
            }
            else {
                this.container = this.selector as HTMLElement;
            }
        }
        else {
            const error = new Error("Invalid selector passed to MatrixAnimation");
            error['selector'] = this.selector;
            error['options'] = this.options;
            throw error;
        }

        let canvas = this.container.querySelector("canvas");

        if (!canvas) {
            this.hasCreatedCanvas = true;
            canvas = document.createElement("canvas");
            this.container.append(canvas);
        }
        this._canvas = canvas;

        // TODO: this might need to be changed?
        if (getComputedStyle(this.container).position == 'static') {
            this.container.style.position = "relative";
        }
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.position = "absolute";
    }

    private initCanvasShift() {
        switch (this.options.windDirection) {
            case "LR": {
                this.performCanvasShift = () => {
                    this.ctx.globalCompositeOperation = "copy";
                    this.ctx.drawImage(this.ctx.canvas, this.options.windSpeed, 0);
                    // reset back to normal for subsequent operations.
                    this.ctx.globalCompositeOperation = "source-over";
                };
                break;
            }
            case "BU": {
                this.performCanvasShift = () => {
                    this.ctx.globalCompositeOperation = "copy";
                    this.ctx.drawImage(this.ctx.canvas, 0, -this.options.windSpeed);
                    // reset back to normal for subsequent operations.
                    this.ctx.globalCompositeOperation = "source-over";
                };
                break;
            }
            case "RL": {
                this.performCanvasShift = () => {
                    this.ctx.globalCompositeOperation = "copy";
                    this.ctx.drawImage(this.ctx.canvas, -this.options.windSpeed, 0);
                    // reset back to normal for subsequent operations.
                    this.ctx.globalCompositeOperation = "source-over";
                };
                break;
            }
            case "TD": {
                this.performCanvasShift = () => {
                    this.ctx.globalCompositeOperation = "copy";
                    this.ctx.drawImage(this.ctx.canvas, 0, this.options.windSpeed);
                    // reset back to normal for subsequent operations.
                    this.ctx.globalCompositeOperation = "source-over";
                };
                break;
            }
        }
    }

    private initCanvas() {
        this.onResize(false);

        this.createRaindrops();

        this.ctx.textAlign = "center";
        this.ctx.imageSmoothingEnabled = false;
        // Preemptively draw the characters
        // for (let i = 0; i < this.options.warmupIterations; i++)
            // this.drawRain();
    }

    private createRaindrops(add = false) {
        // If we aren't adding more rain, we're resetting things.
        if (!add) {
            this.raindrops.splice(0);
        }

        if (Array.isArray(this.options.rainDrop)) {
            // We have an array of preconfigured raindrops
        }
        else {
            const opts = this.options.rainGenerator;
            const maxColumns = this.canvasWidth / (this.rainWidth);

            let i = opts.count
                ? opts.count 
                :~~((opts.density ?? 2) * maxColumns);
            
            if (Array.isArray(this.options.rainDrop)) 
                throw new Error("Cannont set rainDrops when rainGenerator is set");

            const dropOpts = structuredClone(this.options.rainDrop);

            while (i--) {
                this.raindrops.push(
                    new MatrixRaindrop(
                        (this.options.rainDrop.alignToColumns ?? this.options.alignToColumns)
                            ? opts.density
                            ? (randomInt(0, maxColumns) * this.rainWidth)
                            : (i % maxColumns) * this.rainWidth
                            : randomFloat(0, this.canvasWidth),
                        randomFloat(0, this.canvasHeight),
                        this,
                        dropOpts
                    )
                );
            }
        }

        if (this.options.autoStart != false) {
            this.play();
        }
    }

    // Context bound to this class
    private render = (() => {
        if (this.stopAnimation) return;

        this.drawRain();
        this.frameId = requestAnimationFrame(this.render);
    }).bind(this);

    private drawRain() {
        let i = this.raindrops.length;
        const t = Date.now();

        // Call clear before we apply the fade fill
        this.ctx.shadowColor = this.options.trailBloomColor;
        this.ctx.shadowBlur = this.options.trailBloomSize;
        while (i--) {
            const drop = this.raindrops[i];
            
            if (t - drop.lastFrameTime > drop.config.frameDelay) {
                drop.clear(this.ctx);
            }
        }
        this.ctx.shadowColor = "";
        this.ctx.shadowBlur = 0;

        if (this.options.windSpeed > 0)
            this.performCanvasShift();

        // Fade everything slightly
        // this.ctx.fillStyle = `rgba(0,0,0,${this.options.fadeStrength ?? 0.05})`;
        // this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        i = this.raindrops.length;

        this.ctx.shadowColor = this.options.trailBloomColor;
        this.ctx.shadowBlur = this.options.trailBloomSize;

        while (i--) {
            const drop = this.raindrops[i];

            if (t - drop.lastFrameTime > drop.config.frameDelay) {
                // this.raindrops[i].clear(this.ctx);
                drop.draw(this.ctx);
                drop.lastFrameTime = t;
            }
        }

        this.ctx.shadowColor = "";
        this.ctx.shadowBlur = 0;
    }
}

class MatrixRaindrop {
    private charList: string[] = [];

    private trailChars: {
        x: number,
        y: number,
        char: string
    }[] = [];

    private shiftDirection: Function;
    private trailLength: number;
    private font: string;
    public lastFrameTime = 0;

    constructor(
        public x: number,
        public y: number,
        private matrixAnimation: MatrixAnimation,
        public config: MatrixRaindropOptions = {}
    ) {
        this.initConfig();
        this.randomizeChars();
        this.initMoveDirection();
        this.onRespawn();
    }

    private initConfig() {
        Object.keys(this.matrixAnimation).forEach(k => {
            this.config[k] = this.config[k] ?? this.matrixAnimation[k];
        });

        this.trailLength = 
            this.matrixAnimation.options.trailColorLogic == "sequential" 
            ? (this.config.trailColors ?? []).length 
            : 1//Math.ceil(1 / this.opacity);
        this.font = 
            (this.config.fontSize ?? 14) + 
            "px " + 
            (this.config.fontFamily ?? "Arial");
    }

    initMoveDirection() {
        const keepBoundsVertically = () => {
            if (this.x > this.matrixAnimation.canvasWidth) {
                this.x = 1;
            }
            else if (this.x < 0) {
                this.x = this.matrixAnimation.canvasWidth-1;
            }
        }
        const keepBoundsHorizontally = () => {
            if (this.y > this.matrixAnimation.canvasHeight) {
                this.y = 1;
            }
            else if (this.y < 0) {
                this.y = this.matrixAnimation.canvasHeight-1;
            }
        }

        switch (this.config.direction) {
            case "LR": {
                this.shiftDirection = () => {
                    this.x += (this.config.minMoveSpeed && this.config.maxMoveSpeed)
                        ? randomFloat(this.config.minMoveSpeed, this.config.maxMoveSpeed)
                        : (this.matrixAnimation.options.rainWidth ?? 0);

                    if (this.x > this.matrixAnimation.canvasWidth) {
                        this.randomizeChars();

                        this.x = randomFloat(-100, 0);
                        this.onRespawn();
                    }
                    keepBoundsHorizontally();
                };
                break;
            }
            case "BU": {
                this.shiftDirection = () => {
                    this.y -= (this.config.minMoveSpeed && this.config.maxMoveSpeed)
                        ? randomFloat(this.config.minMoveSpeed, this.config.maxMoveSpeed)
                        : (this.matrixAnimation.options.rainHeight ?? 0);

                        if (this.y < 0) {
                        this.randomizeChars();

                        this.y = randomFloat(this.matrixAnimation.canvasHeight, this.matrixAnimation.canvasHeight + 100);
                        this.onRespawn();
                    }
                    keepBoundsVertically();
                };
                break;
            }
            case "RL": {
                this.shiftDirection = () => {
                    this.x -= (this.config.minMoveSpeed && this.config.maxMoveSpeed)
                        ? randomFloat(this.config.minMoveSpeed, this.config.maxMoveSpeed)
                        : (this.matrixAnimation.options.rainWidth ?? 0);

                    if (this.x < 0) {
                        this.randomizeChars();

                        this.x = randomFloat(this.matrixAnimation.canvasWidth, this.matrixAnimation.canvasWidth + 100);
                        this.onRespawn();
                    }
                    keepBoundsHorizontally();
                };
                break;
            }
            case "TD":
            default: {
                this.shiftDirection = () => {
                    this.y += (this.config.minMoveSpeed && this.config.maxMoveSpeed)
                        ? randomFloat(this.config.minMoveSpeed, this.config.maxMoveSpeed)
                        : (this.matrixAnimation.options.rainHeight ?? 0);

                    if (this.y > this.matrixAnimation.canvasHeight) {
                        this.randomizeChars();

                        this.y = randomFloat(-100, 0);
                        this.onRespawn();
                    }
                    keepBoundsVertically();
                };
                break;
            }
        }
    }

    randomizeChars() {
        this.charList = this.matrixAnimation.availableCharSets[~~(Math.random() * this.matrixAnimation.availableCharSets.length)];
    }

    onRespawn() {
        if (this.matrixAnimation.options.charArrays?.length > 1) {
            this.randomizeChars();
        }

        if (this.config.randomizeFrameDelay) {
            this.config.frameDelay = randomInt(
                this.config.minFrameDelay ?? 30, 
                this.config.maxFrameDelay ?? 60
            );
        }

        // Randomize the position when the drop respawns
        if (this.config.randomizePosition) {
            if (this.config.direction == "LR" || this.config.direction == "RL") {
                const maxColumns = this.matrixAnimation.canvasHeight / (this.config.rainWidth);
                if (this.config.alignToColumns)
                    this.y = (randomInt(0, maxColumns) * this.config.rainWidth);
                else
                    this.y = randomFloat(0, this.matrixAnimation.canvasHeight);
            }
            else {
                const maxColumns = this.matrixAnimation.canvasWidth / (this.config.rainWidth);
                if (this.config.alignToColumns)
                    this.x = (randomInt(0, maxColumns) * this.config.rainWidth);
                else
                    this.x = randomFloat(0, this.matrixAnimation.canvasWidth);
            }
        }
    }

    clear(ctx: CanvasRenderingContext2D) {
        let i = this.trailChars.length;
        while (i--) {
            const char = this.trailChars[i];

            const fill = 
                this.config.trailColors
                ? this.matrixAnimation.options.trailColorLogic == "sequential"
                    ? (this.config.trailColors[i] ?? this.config.trailColors[this.config.trailColors.length -1])
                    : this.config.trailColors[randomInt(0, this.config.trailColors.length)]
                : this.config.trailColor || "#fff";
            ctx.fillStyle = fill;
            ctx.font = this.font;
            ctx.fillText(char.char, char.x, char.y);
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        const char = this.charList[randomInt(0, this.charList.length - 1)];

        this.trailChars.unshift({ char, x: this.x, y: this.y});
        this.trailChars.splice(this.trailLength);

        ctx.shadowColor = this.matrixAnimation.options.headBloomColor;
        ctx.shadowBlur = this.matrixAnimation.options.headBloomSize;
        ctx.fillStyle = this.config.headColor ?? "rgba(255,255,255,0.8)";
        ctx.font = this.font;
        ctx.fillText(char, this.x, this.y);
        ctx.shadowColor = "";
        ctx.shadowBlur = 0;

        if (this.config.jitterDownStrength || this.config.jitterUpStrength)
            this.y += randomFloat(-(this.config.jitterUpStrength ?? 0), this.config.jitterDownStrength ?? 0);
        if (this.config.jitterLeftStrength || this.config.jitterRightStrength)
            this.x += randomFloat(-(this.config.jitterLeftStrength ?? 0), this.config.jitterRightStrength ?? 0);

        this.shiftDirection();
    }
}