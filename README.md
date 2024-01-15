**matrix-animation** Easily create highly customizable JavaScript Matrix effects and use them as animated backgrounds for your website.

> Demo [here](https://matrix.dotglitch.dev/)

## Getting Started
> See the [example](https://github.com/knackstedt/matrix-animation/blob/main/index.html).

1. Install: `npm i matrix-animation`
2. Import:
##### : 
```html
<script src="https://www.unpkg.com/matrix-animation/dist/matrix-animation.cjs"></script>
```
##### Module:
```js
import { MatrixAnimation } from "matrix-animation";
```
3. Create:
```js
const matrix = new MatrixAnimation(".container", options);
```
4. Control:
```js
matrix.pause(); // stop the animation
matrix.play(); // resume the animation

// Update color (while animation is running)
matrix.options.rain.rainDrop.headColor = "#00f";
```

## Configuration

Most configuration options are handled immediately via the options object.
See [Types](https://github.com/knackstedt/matrix-animation/blob/main/src/types) for available properties.