Blockrain.js
============

A tetris game in HTML5 + Javascript (with autoplay!)

**[Check out the demo](http://aerolab.github.io/blockrain.js/)**

![Blockrain Screenshot](http://aerolab.github.io/blockrain.js/assets/images/blockrain.png)


# Setup

Create any element (a div, article, figure, whatever you want) and **make sure it has a width and a height set via CSS** . You can use any class, but we are using *.game* for this example.

```html
<div class="game" style="width:250px; height:500px;"></div>
```

Then you include **jquery** and **blockrain** before setting up the game with **$('.game').blockrain()**. Adding the CSS file is *strongly recommended*, as it provides some important styles for the UI (but you can customize them as needed).


```html
<!-- The stylesheet should go in the <head>, or be included in your CSS -->
<link rel="stylesheet" href="blockrain.css">

<!-- jQuery and Blockrain.js -->
<script src="jquery.js"></script>
<script src="blockrain.js"></script>
<script>
    $('.game').blockrain();
</script>
```

For extra fun, you can **enable continuous autoplay**, so the game plays itself continuously:

```js
$('.game').blockrain({ autoplay: true, autoplayRestart: true });
```

# Themes

Blockrain comes with many themes out-of-the-box. You can even create custom ones by **adding them to BlockrainThemes**. You have multiple settings and can even use **custom textures** (base64-encoded).

```js
{
  background: '#000000', // The main background color.
  backgroundGrid: '#101010', // You can draw a small background grid as well.
  primary: null, // Color of the falling blocks. This overrides the standard block color.
  secondary: null, // Color of the placed blocks. This overrides the standard block color.
  stroke: null, // Border color for the blocks.
  innerStroke: null, // A small border inside the blocks to give some texture.

  // The following are the colors of each piece
  blocks: {
    line:     '#fa1e1e',
    square:   '#f1fa1e',
    arrow:    '#d838cb',
    rightHook:'#f5821f',
    leftHook: '#42c6f0',
    rightZag: '#4bd838',
    leftZag:  '#fa1e1e'
  }
}
```

Here's an example of a retro theme (vim) with a **custom texture**:

```js
{
  background: '#000000',
  backgroundGrid: 'data:image/png;base64,iVBORw0KGgoAAA{AND SO ON}',
  primary: '#C2FFAE',
  secondary: '#C2FFAE',
  stroke: '#000000',
  strokeWidth: 3,
  innerStroke: null
}
```


### Creating custom designs

You can now use **completely custom designs for each block**! Just link to one image for each block when creating your theme and the plugin takes care of the rest. You can even use lists of images if you want BlockRain to pick a random design for each block.

**Keep in mind that the images need to follow the exact same format (rotation and width/height ratio) as [the blocks that are bundled with the custom theme](https://github.com/Aerolab/blockrain.js/tree/gh-pages/assets/blocks/custom)**.

Fun fact: Now you can rotate the square!


```js
'custom': {
  background: '#040304',
  backgroundGrid: '#000',
  complexBlocks: {
    line:     ['assets/blocks/custom/line.png', 'assets/blocks/custom/line.png'],
    square:   'assets/blocks/custom/square.png',
    arrow:    'assets/blocks/custom/arrow.png',
    rightHook:'assets/blocks/custom/rightHook.png',
    leftHook: 'assets/blocks/custom/leftHook.png',
    rightZag: 'assets/blocks/custom/rightZag.png',
    leftZag:  'assets/blocks/custom/leftZag.png'
  }
}
```


### Available themes:

* custom **NEW!**
* candy
* modern
* retro
* vim
* monochrome
* gameboy
* aerolab

Remember you can create custom themes or modify these to better suit your design needs.


# Options

Blockrain comes with many options to help customize the game:

```js
{
  autoplay: false, // Let a bot play the game
  autoplayRestart: true, // Restart the game automatically once a bot loses
  showFieldOnStart: true, // Show a bunch of random blocks on the start screen (it looks nice)
  theme: null, // The theme name or a theme object
  blockWidth: 10, // How many blocks wide the field is (The standard is 10 blocks)
  autoBlockWidth: false, // The blockWidth is dinamically calculated based on the autoBlockSize. Disabled blockWidth. Useful for responsive backgrounds
  autoBlockSize: 24, // The max size of a block for autowidth mode
  difficulty: 'normal', // Difficulty (normal|nice|evil).
  speed: 20, // The speed of the game. The higher, the faster the pieces go.

  // Copy
  playText: 'Let\'s play some Tetris',
  playButtonText: 'Play',
  gameOverText: 'Game Over',
  restartButtonText: 'Play Again',
  scoreText: 'Score',

  // Basic Callbacks
  onStart: function(){},
  onRestart: function(){},
  onGameOver: function(score){},

  // When a line is made. Returns the number of lines, score assigned and total score
  onLine: function(lines, scoreIncrement, score){}
}
```

# Methods

There are a few utility methods available to control the game. $game represents your game selector (like *$('.game')*, for example).

```js
// Start the game
$game.blockrain('start');

// Restart the game
$game.blockrain('restart');

// Trigger a game over
$game.blockrain('gameover');
```


```js
// Pause
$game.blockrain('pause');

// Resume
$game.blockrain('resume');
```

```js
// Enable or Disable Autoplay (true|false)
$game.blockrain('autoplay', true);
```

```js
// Enable or Disable Controls (true|false)
$game.blockrain('controls', true);
```

```js
// Change the theme. 

// You can provide a theme name...
$game.blockrain('theme', 'vim');

// Or a theme object. **Check out src/blockrain.jquery.themes.js** for examples.
$game.blockrain('theme', {
  background: '#ffffff',
  primary: '#ff7b00',
  secondary: '#000000'
});
```

```js
// Return the current score
var score = $game.blockrain('score');
```


# Building Blockrain.js

This will generate the full minified source under /build . It's basically License + libs + themes + src, concatenated and minified.

```gulp build```


# Credits

Blockrain.js is based on the [work by @mrcoles](http://mrcoles.com/tetris/), which is one of the best HTML5 tetris versions out there. The code was then modified and refactored to build a jQuery Plugin and added quite a few methods to easily add themes to it and make it simpler to implement.
