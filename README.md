Blockrain.js
============

A tetris game in HTML5 + Javascript (with autoplay!)

# Setup

Create any element (a div, article, figure, whatever you want) and **make sure it has a width and a height set via CSS** . You can use any class, but we are using *.game* for this example.

```html
<div class="game" style="width:250px; height:500px;"></div>
```

Then you just include **jquery** and **blockrain** and setup the game with **$('.game').blockrain()**;

```html
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

Blockrain comes with many themes out-of-the-box, but you can create custom ones by **adding them to BlockrainThemes**. You have multiple settings and can even use **custom textures** (base64-encoded).

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

### Available themes:

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