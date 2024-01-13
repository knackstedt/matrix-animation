**matrix-animation** Easily create highly customizable JavaScript Matrix effects and use them as animated backgrounds for your website.

> Demo [here](https://matrix.dotglitch.dev/)

## Getting Started
> See the [example](./sample/index.html).

1. Install: `npm i matrix-animation`
2. Import:
##### UMD: 
```html
<script>window.exports = window</script>
<script src="https://www.unpkg.com/matrix-animation/dist/main.js"></script>
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
See [Types](./src/types) for available properties.