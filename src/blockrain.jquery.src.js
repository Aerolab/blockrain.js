/**
 * BlockRain.js is based on http://mrcoles.com/tetris/
 * I haven't seen it on github, but it's one of the better js Tetris clones out there
 */

((function ( $ ) {

  "use strict";

  $.widget('aerolab.blockrain', {

    options: {
      autoplay: false,
      showFieldOnStart: true,
      theme: null,
      blockWidth: 10,
      autoBlockWidth: false,
      autoBlockSize: 24,
      difficulty: 'normal',

      playText: 'Let\'s play some Tetris',
      playButtonText: 'Play',
      gameOverText: 'Game Over',
      restartButtonText: 'Play Again',
      scoreText: 'Score',

      onStart: function(){},
      onRestart: function(){},
      onGameOver: function(){}
    },

    // Theme
    _theme: {

    },


    // UI Elements
    _$game: null,
    _$canvas: null,
    _$gameholder: null,
    _$start: null,
    _$gameover: null,
    _$score: null,
    _$scoreText: null,


    // Canvas
    _canvas: null,
    _ctx: null,


    // Useful stuff
    _autopilot: false,


    // Initialization
    _create: function() {

      var game = this;

      this._setTheme(this.options.theme);

      this._createHolder();
      this._createUI();

      this._refreshBlockSizes();

      this.updateSizes();

      $(window).resize(function(){
        game.updateSizes();
      });

      this._SetupShapeFactory();
      this._SetupFilled();
      this._SetupInfo();
      this._SetupBoard();

      this._info.init();
      this._board.init();

      this._setupControls();

    },



    _checkCollisions: function(x, y, blocks, checkDownOnly) {
      // x & y should be aspirational values
      var i = 0, len = blocks.length, a, b;
      for (; i<len; i += 2) {
        a = x + blocks[i];
        b = y + blocks[i+1];

        if (b >= this._BLOCK_HEIGHT || this._filled.check(a, b)) {
          return true;
        } else if (!checkDownOnly && a < 0 || a >= this._BLOCK_WIDTH) {
          return true;
        }
      }
      return false;
    },


    _board: null,
    _info: null,
    _filled: null,


    showStartMessage: function() {
      this._$start.show();
    },

    showGameOverMessage: function() {
      this._$gameover.show();
    },

    /**
     * Draws the background
     */
    _drawBackground: function() {

      if( typeof this._theme.background !== 'string' ) {
        return;
      }

      if( this._theme.backgroundGrid instanceof Image ) {

        // Not loaded
        if( this._theme.backgroundGrid.width === 0 || this._theme.backgroundGrid.height === 0 ){ return; }

        this._ctx.globalAlpha = 1.0;

        for( var x=0; x<this._BLOCK_WIDTH; x++ ) {
          for( var y=0; y<this._BLOCK_HEIGHT; y++ ) {
            var cx = x * this._block_size;
            var cy = y * this._block_size;

            this._ctx.drawImage( this._theme.backgroundGrid, 
                            0, 0, this._theme.backgroundGrid.width, this._theme.backgroundGrid.height, 
                            cx, cy, this._block_size, this._block_size);
          }
        }

      }
      else if( typeof this._theme.backgroundGrid === 'string' ) {

        var borderWidth = this._theme.strokeWidth;
        var borderDistance = Math.round(this._block_size*0.23);
        var squareDistance = Math.round(this._block_size*0.30);

        this._ctx.globalAlpha = 1.0;
        this._ctx.fillStyle = this._theme.backgroundGrid;

        for( var x=0; x<this._BLOCK_WIDTH; x++ ) {
          for( var y=0; y<this._BLOCK_HEIGHT; y++ ) {
            var cx = x * this._block_size;
            var cy = y * this._block_size;

            this._ctx.fillRect(cx+borderWidth, cy+borderWidth, this._block_size-borderWidth*2, this._block_size-borderWidth*2);
          }
        }

      }

      this._ctx.globalAlpha = 1.0;
    },



    /**
     * Draws one block (Each piece is made of 4 blocks)
     * The blockType is used to draw any block. 
     * The falling attribute is needed to apply different styles for falling and placed blocks.
     */
    _drawBlock: function(x, y, blockType, falling) {

      // convert x and y to pixel
      x = x * this._block_size;
      y = y * this._block_size;

      falling = typeof falling === 'boolean' ? falling : false;
      var borderWidth = this._theme.strokeWidth;
      var borderDistance = Math.round(this._block_size*0.23);
      var squareDistance = Math.round(this._block_size*0.30);

      var color = this._getBlockColor(blockType, falling);

      // Draw the main square
      this._ctx.globalAlpha = 1.0;

      // If it's an image, the block has a specific texture. Use that.
      if( color instanceof Image ) {
        this._ctx.globalAlpha = 1.0;

        // Not loaded
        if( color.width === 0 || color.height === 0 ){ return; }

        this._ctx.drawImage(color, 0, 0, color.width, color.height, x, y, this._block_size, this._block_size);

      }
      else if( typeof color === 'string' )
      {
        this._ctx.fillStyle = color;
        this._ctx.fillRect(x, y, this._block_size, this._block_size);

        // Inner Shadow
        if( typeof this._theme.innerShadow === 'string' ) {
          this._ctx.globalAlpha = 1.0;
          this._ctx.strokeStyle = this._theme.innerShadow;
          this._ctx.lineWidth = 1.0;

          // Draw the borders
          this._ctx.strokeRect(x+1, y+1, this._block_size-2, this._block_size-2);
        }

        // Decoration (borders)
        if( typeof this._theme.stroke === 'string' ) {
          this._ctx.globalAlpha = 1.0;
          this._ctx.fillStyle = this._theme.stroke;
          this._ctx.strokeStyle = this._theme.stroke;
          this._ctx.lineWidth = borderWidth;

          // Draw the borders
          this._ctx.strokeRect(x, y, this._block_size, this._block_size);
        }
        if( typeof this._theme.innerStroke === 'string' ) {
          // Draw the inner dashes
          this._ctx.fillStyle = this._theme.innerStroke;
          this._ctx.fillRect(x+borderDistance, y+borderDistance, this._block_size-borderDistance*2, borderWidth);
          // The rects shouldn't overlap, to prevent issues with transparency
          this._ctx.fillRect(x+borderDistance, y+borderDistance+borderWidth, borderWidth, this._block_size-borderDistance*2-borderWidth);
        }
        if( typeof this._theme.innerSquare === 'string' ) {
          // Draw the inner square
          this._ctx.fillStyle = this._theme.innerSquare;
          this._ctx.globalAlpha = 0.2;
          this._ctx.fillRect(x+squareDistance, y+squareDistance, this._block_size-squareDistance*2, this._block_size-squareDistance*2);
        }
      }

      // Return the alpha back to 1.0 so we don't create any issues with other drawings.
      this._ctx.globalAlpha = 1.0;
    },


    _getBlockColor: function(blockName, falling) {
      /**
       * The theme allows us to do many things:
       * - Use a specific color for the falling block (primary), regardless of the proper color.
       * - Use another color for the placed blocks (secondary).
       * - Default to the "original" block color in any of those cases by setting primary and/or secondary to null.
       * - With primary and secondary as null, all blocks keep their original colors.
       */

      if( typeof falling !== 'boolean' ){ falling = true; }
      if( falling ) {
        if( typeof this._theme.primary === 'string' && this._theme.primary !== '' ) {
          return this._theme.primary;
        } else {
          return this._theme.blocks[blockName];
        }
      } else {
        if( typeof this._theme.secondary === 'string' && this._theme.secondary !== '' ) {
          return this._theme.secondary;
        } else {
          return this._theme.blocks[blockName];
        }
      }
    },


    _Shape: function(game, orientations, symmetrical, blockType) {

      $.extend(this, {
        x: 0,
        y: 0,
        symmetrical: symmetrical,
        init: function() {
          $.extend(this, {
            orientation: 0,
            x: Math.floor(game._BLOCK_WIDTH / 2) - 1,
            y: -1
          });
          return this;
        },
        blockType: blockType,
        blocksLen: orientations[0].length,
        orientations: orientations,
        orientation: 0, // 4 possible
        rotate: function(right) {
          var orientation = (this.orientation + (right ? 1 : -1) + 4) % 4;

          //TODO - when past limit - auto shift and remember that too!
          if( ! this._checkCollisions(this.x, this.y, this.getBlocks(orientation)) ) {
            this.orientation = orientation;
          }
        },
        moveRight: function() {
          if( ! this._checkCollisions(this.x + 1, this.y, this.getBlocks()) ) {
            this.x++;
          }
        },
        moveLeft: function() {
          if( ! this._checkCollisions(this.x - 1, this.y, this.getBlocks()) ) {
            this.x--;
          }
        },
        getBlocks: function(orientation) { // optional param
          return this.orientations[orientation !== undefined ? orientation : this.orientation];
        },
        draw: function(drop, _x, _y, _orientation) {
          if (drop) this.y++;

          var blocks = this.getBlocks(_orientation),
              x = _x === undefined ? this.x : _x,
              y = _y === undefined ? this.y : _y,
              i = 0;

          for (; i<this.blocksLen; i += 2) {
            game._drawBlock(x + blocks[i], y + blocks[i+1], this.blockType, true);
          }
        },
        getBounds: function(_blocks) { // _blocks can be an array of blocks, an orientation index, or undefined
          var blocks = $.isArray(_blocks) ? _blocks : this.getBlocks(_blocks),
              i=0, len=blocks.length, minx=999, maxx=-999, miny=999, maxy=-999;
          for (; i<len; i+=2) {
            if (blocks[i] < minx) { minx = blocks[i]; }
            if (blocks[i] > maxx) { maxx = blocks[i]; }
            if (blocks[i+1] < miny) { miny = blocks[i+1]; }
            if (blocks[i+1] > maxy) { maxy = blocks[i+1]; }
          }
          return {
            left: minx,
            right: maxx,
            top: miny,
            bottom: maxy,
            width: maxx - minx,
            height: maxy - miny
          };
        }
      });

      return this.init();
    },


    /**
     * Shapes
     */
    _shapeFactory: null,

    _SetupShapeFactory: function(){
      var game = this;
      if( this._shapeFactory !== null ){ return; }

      this._shapeFactory = {
        line: function() {
          /*
           *   X        X
           *   O  XOXX  O XOXX
           *   X        X
           *   X        X
           */
          var ver = [0, -1, 0, -2, 0, -3, 0, -4],
          hor = [-1, -2, 0, -2, 1, -2, 2, -2];
          return new game._Shape(game, [ver, hor, ver, hor], true, 'line');
        },
        square: function() {
          /*
           *  XX
           *  XX
           */
          var s = [0, 0, 1, 0, 0, -1, 1, -1];
          return new game._Shape(game, [s, s, s, s], true, 'square');
        },
        arrow: function() {
          /*
           *    X   X       X
           *   XOX  OX XOX XO
           *        X   X   X
           */
          return new game._Shape(game, [
            [0, -1, 1, -1, 2, -1, 1, -2],
            [1, -2, 1, -1, 1, 0, 2, -1],
            [0, -1, 1, -1, 2, -1, 1, 0],
            [0, -1, 1, -1, 1, -2, 1, 0]
          ], false, 'arrow');
        },
        rightHook: function() {
          /*
           *       XX   X X
           *   XOX  O XOX O
           *   X    X     XX
           */
          return new game._Shape(game, [
            [0, 0, 0, -1, 1, -1, 2, -1],
            [0, -2, 1, 0, 1, -1, 1, -2],
            [0, -1, 1, -1, 2, -1, 2, -2],
            [0, -2, 0, -1, 0, 0, 1, 0]
          ], false, 'rightHook');
        },
        leftHook: function() {
          /*
           *        X X   XX
           *   XOX  O XOX O
           *     X XX     X
           */
          return new game._Shape(game, [
            [2, 0, 0, -1, 1, -1, 2, -1],
            [0, 0, 1, 0, 1, -1, 1, -2],
            [0, -2, 0, -1, 1, -1, 2, -1],
            [0, 0, 0, -1, 0, -2, 1, -2]
          ], false, 'leftHook');
        },
        leftZag: function() {
          /*
           *        X
           *   XO  OX
           *    XX X
           */
          var ver = [0, 0, 0, -1, 1, -1, 1, -2],
              hor = [0, -1, 1, -1, 1, 0, 2, 0];
          return new game._Shape(game, [hor, ver, hor, ver], true, 'leftZag');
        },
        rightZag: function() {
          /*
           *       X
           *    OX OX
           *   XX   X
           */
          var ver = [0, -2, 0, -1, 1, -1, 1, 0],
              hor = [0, 0, 1, 0, 1, -1, 2, -1];
          return new game._Shape(game, [hor, ver, hor, ver], true, 'rightZag');
        }
      };
    },


    _SetupFilled: function() {
      var game = this;
      if( this._filled !== null ){ return; }

      this._filled = {
        data: new Array(game._BLOCK_WIDTH * game._BLOCK_HEIGHT),
        score: 0,
        toClear: {},
        check: function(x, y) {
          return this.data[this.asIndex(x, y)];
        },
        add: function(x, y, blockType) {
          if (x >= 0 && x < game._BLOCK_WIDTH && y >= 0 && y < game._BLOCK_HEIGHT) {
            this.data[this.asIndex(x, y)] = blockType;
          }
        },
        asIndex: function(x, y) {
          return x + y*game._BLOCK_WIDTH;
        },
        asX: function(index) {
          return index % game._BLOCK_WIDTH;
        },
        asY: function(index) {
          return Math.floor(index / game._BLOCK_WIDTH);
        },
        clearAll: function() {
          this.data = new Array(game._BLOCK_WIDTH * game._BLOCK_HEIGHT);
        },
        _popRow: function(row_to_pop) {
          for (var i=WIDTH*(row_to_pop+1) - 1; i>=0; i--) {
            this.data[i] = (i >= game._BLOCK_WIDTH ? this.data[i-game._BLOCK_WIDTH] : undefined);
          }
        },
        checkForClears: function() {
          var startLines = game._board.lines;
          var rows = [], i, len, count, mod;

          for (i=0, len=this.data.length; i<len; i++) {
            mod = this.asX(i);
            if (mod == 0) count = 0;
            if (this.data[i] && typeof this.data[i] == 'string') {
              count += 1;
            }
            if (mod == game._BLOCK_WIDTH - 1 && count == game._BLOCK_WIDTH) {
              rows.push(this.asY(i));
            }
          }

          for (i=0, len=rows.length; i<len; i++) {
            this._popRow(rows[i]);
            game._board.lines++;
            if( game._board.lines % 10 == 0 && game._board.dropDelay > 1 ) {
              //board.dropDelay -= 2;
            }
          }

          var clearedLines = game._board.lines - startLines;
          this._updateScore(clearedLines);
        },
        _updateScore: function(numLines) {
          if( numLines <= 0 ) { return; }
          var scores = [0,400,1000,3000,12000];
          if( numLines >= scores.length ){ numLines = scores.length-1 }

          this.score += scores[numLines];
          game._$scoreText.text(this.score);
        },
        _resetScore: function() {
          this.score = 0;
          game._$scoreText.text(this.score);
        },
        draw: function() {
          for (var i=0, len=this.data.length, row, color; i<len; i++) {
            if (this.data[i] !== undefined) {
              row = this.asY(i);
              var blockType = this.data[i];
              game._drawBlock(this.asX(i), row, blockType);
            }
          }
        }
      };
    },


    _SetupInfo: function() {

      var game = this;

      this._info = {
        mode: game.options.difficulty,
          modes: [
        'normal',
        'nice',
        'evil'
      ],
        modesY: 170,
        autopilotY: null,

        init: function() {
        this.mode = game.options.difficulty;
      },
        setMode: function(mode) {
          this.mode = mode;
          game._board.nextShape(true);
        }
      };

    },


    _SetupBoard: function() {

      var game = this;
      var info = this._info

      this._board = {
        animateDelay: 1000 / game.options.speed,
          cur: null,

        lines: 0,

        dropCount: 0,
        dropDelay: 5, //5,

        init: function() {
          this.cur = this.nextShape();

          var start = [], blockTypes = [], i, ilen, j, jlen, color;

          // Draw a random blockrain screen
          blockTypes = Object.keys(game._shapeFactory);

          for (i=0, ilen=game._BLOCK_WIDTH; i<ilen; i++) {
            for (j=0, jlen=game._randChoice([game._randInt(0, 8), game._randInt(5, 9)]); j<jlen; j++) {
              if (!color || !game._randInt(0, 3)) color = game._randChoice(blockTypes);
              start.push([i, game._BLOCK_HEIGHT - j, color]);
            }
          }

          if( game.options.showFieldOnStart ) {
            game._drawBackground();
            for (i=0, ilen=start.length; i<ilen; i++) {
              game._drawBlock.apply(game, start[i]);
            }
          }

          this.showStartMessage();

        },
        showStartMessage: function() {
          game._$start.show();
        },
        showGameOverMessage: function() {
          game._$gameover.show();
        },
        nextShape: function(_set_next_only) {
          var next = this.next,
            func, shape, result;

          if (info.mode == 'nice' || info.mode == 'evil') {
            func = game._getNiceShapes;
          }
          else {
            func = game._getRandomShape();
          }



          if( game.options.no_preview ) {
            this.next = null;
            if (_set_next_only) return null;
            shape = func(game._filled, game._checkCollisions, game._BLOCK_WIDTH, game._BLOCK_HEIGHT, info.mode);
            if (!shape) throw new Error('No shape returned from shape function!', func);
            shape.init();
            result = shape;
          }
          else {
            shape = func(game._filled, game._checkCollisions, game._BLOCK_WIDTH, game._BLOCK_HEIGHT, info.mode);
            if (!shape) throw new Error('No shape returned from shape function!', func);
            shape.init();
            this.next = shape;
            if (_set_next_only) return null;
            result = next || this.nextShape();
          }

          if( game._autopilot ) { //fun little hack...
            game._getNiceShapes(game._filled, game._checkCollisions, game._BLOCK_WIDTH, game._BLOCK_HEIGHT, 'normal', result);
            result.orientation = result.best_orientation;
            result.x = result.best_x;
          }

          return result;
        },
        animate: function() {
          var drop = false,
            gameOver = false;

          game.updateSizes();

          if (!this.paused) {
            this.dropCount++;
            if( this.dropCount >= this.dropDelay || game._autopilot ) {
              drop = true;
              this.dropCount = 0;
            }

            // test for a collision
            if (drop) {
              var cur = this.cur, x = cur.x, y = cur.y, blocks = cur.getBlocks();
              if (game._checkCollisions(x, y+1, blocks, true)) {
                drop = false;
                for (var i=0; i<cur.blocksLen; i+=2) {
                  game._filled.add(x + blocks[i], y + blocks[i+1], cur.blockType);
                  if (y + blocks[i] < 0) {
                    gameOver = true;
                  }
                }
                game._filled.checkForClears();
                this.cur = this.nextShape();
              }
            }

            // Draw the blockrain field
            game._ctx.clearRect(0, 0, game._PIXEL_WIDTH, game._PIXEL_HEIGHT);
            game._drawBackground();
            game._filled.draw();
            this.cur.draw(drop);
          }

          if( gameOver ) {

            game.options.onGameOver(game._filled.score);

            if( autopilot ) {
              // On autoplay, restart the game automatically
              game.start();
            }
            else {
              this.showGameOverMessage();
              game._board.gameOver = true;
            }
          } else {

            window.setTimeout(function() {
              game._board.animate();
            }, this.animateDelay);

          }

        }
      };
    },

    // Utility Functions
    _randInt: function(a, b) { return a + Math.floor(Math.random() * (1 + b - a)); },
    _randSign: function() { return this._randInt(0, 1) * 2 - 1; },
    _randChoice: function(choices) { return choices[this._randInt(0, choices.length-1)]; },


    /**
     * Update the sizes of the renderer (this makes the game responsive)
     */
    updateSizes: function() {

      this._PIXEL_WIDTH = this.element.innerWidth();
      this._PIXEL_HEIGHT = this.element.innerHeight();

      this._BLOCK_WIDTH = this.options.blockWidth;
      this._BLOCK_HEIGHT = Math.floor(this.element.innerHeight() / this.element.innerWidth() * this._BLOCK_WIDTH);

      this._block_size = Math.floor(this._PIXEL_WIDTH / this._BLOCK_WIDTH);
      this._border_width = 2;

      // Recalculate the pixel width and height so the canvas always has the best possible size
      this._PIXEL_WIDTH = this._block_size * this._BLOCK_WIDTH;
      this._PIXEL_HEIGHT = this._block_size * this._BLOCK_HEIGHT;

      this._$canvas .attr('width', this._PIXEL_WIDTH)
                    .attr('height', this._PIXEL_HEIGHT);
    },


    /**
     * Find base64 encoded images and load them as image objects, which can be used by the canvas renderer
     */
    _preloadThemeAssets: function() {
      if( typeof this._theme.blocks !== 'undefined' ){
        var keys = Object.keys(this._theme.blocks);
        var base64check = new RegExp('^data:image/(png|gif|jpg);base64,', 'i');;

        // Load the blocks
        for( var i = 0; i < keys.length; i++ ) {
          this._theme.blocks[ keys[i] ]
          if( typeof this._theme.blocks[ keys[i] ] === 'string' ) {
            if( base64check.test( this._theme.blocks[ keys[i] ] ) ) {
              var base64src = this._theme.blocks[ keys[i] ];
              this._theme.blocks[ keys[i] ] = new Image();
              this._theme.blocks[ keys[i] ].src = base64src;
            }
          }
        }
      }

      // Load the bg
      if( typeof this._theme.backgroundGrid !== 'undefined' ){
        if( typeof this._theme.backgroundGrid === 'string' ) {
          if( base64check.test( this._theme.backgroundGrid ) ) {
            var base64src = this._theme.backgroundGrid;
            this._theme.backgroundGrid = new Image();
            this._theme.backgroundGrid.src = base64src;
          }
        }
      }

    },


    _setTheme: function(newTheme){

      // Setup the theme properly
      if( typeof newTheme === 'string' ) {
        this._theme = BlockrainThemes[newTheme];
      }
      else {
        this._theme = newTheme;
      }

      if( typeof this._theme === 'undefined' || this._theme === null ) {
        this._theme = BlockrainThemes['retro'];
      }

      if( isNaN(parseInt(this._theme.strokeWidth)) || typeof parseInt(this._theme.strokeWidth) !== 'number' ) {
        this._theme.strokeWidth = 2;
      }

      // Load the image assets
      this._preloadThemeAssets();
    },


    _createHolder: function() {

      // Create the main holder (it holds all the ui elements, the original element is just the wrapper)
      this._$gameholder = $('<div class="blockrain-game-holder"></div>');
      this._$gameholder.css('position', 'relative').css('width', '100%').css('height', '100%');

      this.element.html('').append(this._$gameholder);

      // Create the game canvas and context
      this._$canvas = $('<canvas style="display:block; width:100%; height:100%; padding:0; margin:0; border:none;" />');
      if( typeof this._theme.background === 'string' ) {
        this._$canvas.css('background-color', this._theme.background);
      }
      this._$gameholder.append(this._$canvas);

      this._canvas = this._$canvas.get(0);
      this._ctx = this._canvas.getContext('2d');

    },


    _createUI: function() {

      // Score
      this._$score = $(
        '<div class="blockrain-score-holder" style="position:absolute;">'+
          '<div class="blockrain-score">'+
            '<div class="blockrain-score-msg">'+ this.options.scoreText +'</div>'+
            '<div class="blockrain-score-num">0</div>'+
          '</div>'+
        '</div>').hide();
      this._$scoreText = this._$score.find('.blockrain-score-num');
      this._$gameholder.append(this._$score);

      // Create the start menu
      this._$start = $(
        '<div class="blockrain-start-holder" style="position:absolute;">'+
          '<div class="blockrain-start">'+
            '<div class="blockrain-start-msg">'+ this.options.playText +'</div>'+
            '<a class="blockrain-btn blockrain-start-btn">'+ this.options.playButtonText +'</a>'+
          '</div>'+
        '</div>').hide();
      this._$gameholder.append(this._$start);
      
      this._$start.find('.blockrain-start-btn').click(function(event){
        event.preventDefault();
        this.start();
        this.options.onStart();
      });

      // Create the game over menu
      this._$gameover = $(
        '<div class="blockrain-game-over-holder" style="position:absolute;">'+
          '<div class="blockrain-game-over">'+
            '<div class="blockrain-game-over-msg">'+ this.options.gameOverText +'</div>'+
            '<a class="blockrain-btn blockrain-game-over-btn">'+ this.options.restartButtonText +'</a>'+
          '</div>'+
        '</div>').hide();
      this._$gameover.find('.blockrain-game-over-btn').click(function(event){
        event.preventDefault();
        this.start();
        this.options.onRestart();
      });
      this._$gameholder.append(this._$gameover);

    },


    _refreshBlockSizes: function() {

      if( this.options.autoBlockWidth ) {
        this.options.blockWidth = Math.ceil( this.element.width() / this.options.autoBlockSize );
      }

    },


    /**
     * Start/Restart Game
     */
    start: function() {
      this._filled.clearAll();
      this._filled._resetScore();
      this._board.started = true;
      this._board.animate();

      this._$start.fadeOut(150);
      this._$gameover.fadeOut(150);
      this._$score.fadeIn(150);
    },


    _getNiceShapes: function() {
      /*
       * Things I need for this to work...
       *  - ability to test each shape with this._filled data
       *  - maybe give empty spots scores? and try to maximize the score?
       */

      var shapes = {},
          attr;

      for( var attr in this._shapeFactory ) {
        shapes[attr] = this._shapeFactory[attr]();
      }

      function scoreBlocks(possibles, blocks, x, y, filled, width, height) {
        var i, len=blocks.length, score=0, bottoms = {}, tx, ty, overlaps;

        // base score
        for (i=0; i<len; i+=2) {
          score += possibles[this._filled.asIndex(x + blocks[i], y + blocks[i+1])] || 0;
        }

        // overlap score -- //TODO - don't count overlaps if cleared?
        for (i=0; i<len; i+=2) {
          tx = blocks[i];
          ty = blocks[i+1];
          if (bottoms[tx] === undefined || bottoms[tx] < ty) {
            bottoms[tx] = ty;
          }
        }
        overlaps = 0;
        for (tx in bottoms) {
          tx = parseInt(tx);
          for (ty=bottoms[tx]+1, i=0; y+ty<height; ty++, i++) {
            if (!this._filled.check(x + tx, y + ty)) {
              overlaps += i == 0 ? 2 : 1; //TODO-score better
              //if (i == 0) overlaps += 1;
              break;
            }
          }
        }

        score = score - overlaps;

        return score;
      }

      function resetShapes() {
        for (var attr in shapes) {
          shapes[attr].x = 0;
          shapes[attr].y = -1;
        }
      }

      //TODO -- evil mode needs to realize that overlap is bad...
      var func = function(filled, checkCollisions, width, height, mode, _one_shape) {
        if (!_one_shape) resetShapes();

        var possibles = new Array(width * height),
            evil = mode == 'evil',
            x, y, py,
            attr, shape, i, blocks, bounds,
            score, best_shape, best_score = (evil ? 1 : -1) * 999, best_orientation, best_x,
            best_score_for_shape, best_orientation_for_shape, best_x_for_shape;

        for (x=0; x<width; x++) {
          for (y=0; y<=height; y++) {
            if (y == height || this._filled.check(x, y)) {
              for (py=y-4; py<y; py++) {
                possibles[this._filled.asIndex(x, py)] = py; //TODO - figure out better scoring?
              }
              break;
            }
          }
        }

        // for each shape...
        var opts = _one_shape === undefined ? shapes : {cur: _one_shape}; //BOO
        for (attr in opts) { //TODO - check in random order to prevent later shapes from winning
          shape = opts[attr];
          best_score_for_shape = -999;

          // for each orientation...
          for (i=0; i<(shape.symmetrical ? 2 : 4); i++) { //TODO - only look at unique orientations
            blocks = shape.getBlocks(i);
            bounds = shape.getBounds(blocks);

            // try each possible position...
            for (x=-bounds.left; x<width - bounds.width; x++) {
              for (y=-1; y<height - bounds.bottom; y++) {
                if( checkCollisions(x, y + 1, blocks, true) ) {
                  // collision
                  score = scoreBlocks(possibles, blocks, x, y, this._filled, width, height);
                  if (score > best_score_for_shape) {
                    best_score_for_shape = score;
                    best_orientation_for_shape = i;
                    best_x_for_shape = x;
                  }
                  break;
                }
              }
            }
          }

          if ((evil && best_score_for_shape < best_score) ||
              (!evil && best_score_for_shape > best_score)) {
            best_shape = shape;
            best_score = best_score_for_shape;
            best_orientation = best_orientation_for_shape;
            best_x = best_x_for_shape;
          }
        }

        best_shape.best_orientation = best_orientation;
        best_shape.best_x = best_x;

        return best_shape;
      };

      func.no_preview = true;
      return func;
    },


    _getRandomShape: function() {
      // Todo: The shapefuncs should be cached.
      var shapeFuncs = [];
      $.each(this._shapeFactory, function(k,v) { shapeFuncs.push(v); });

      return this._randChoice(shapeFuncs);
    },



    /**
     * Controls
     */
    _setupControls: function() {
      if( this.options.autoplay ) {
        // On autoplay, start the game right away
        this._autopilot = true;
        this.start();
      }
      else {

        $(document).keyup(function(evt) {
            return (!board.started && (evt.keyCode == 13 || evt.keyCode == 32)) ? startBoard(evt) : true;
        });

        $(document).keyup(function(evt) {
          if (evt.keyCode == 80) { /*p*/
            board.paused = !board.paused;
          }
        });

        $(document).safekeypress(function(evt) {
          var caught = false;
          if (board.cur) {
              caught = true;
              switch(evt.keyCode) {
                case 37: /*left*/ board.cur.moveLeft(); break;
                case 38: /*up*/ board.cur.rotate(true); break;
                case 39: /*right*/ board.cur.moveRight(); break;
                case 40: /*down*/ board.dropCount = board.dropDelay; break;
                case 88: /*x*/ board.cur.rotate(true); break;
                case 90: /*z*/ board.cur.rotate(false); break;
              default: caught = false;
              }
          }
          if (caught) evt.preventDefault();
          return !caught;
        });

      }
    }

  });

})(jQuery));