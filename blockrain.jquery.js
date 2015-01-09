/*!
 * BlockRain.js 0.1.0
 * jQuery plugin that lets you put a playable (and configurable) game of Tetris in your site or just leave it in auto in the background.
 * http://aerolab.github.io/blockrain.js/
 *
 * Copyright (c) 2015 Aerolab <hey@aerolab.co>
 *
 * Released under the MIT license
 * http://aerolab.github.io/blockrain.js/LICENSE.txt
 */
 // jQuery Widget
(function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){var t=0,i=Array.prototype.slice;e.cleanData=function(t){return function(i){var s,n,a;for(a=0;null!=(n=i[a]);a++)try{s=e._data(n,"events"),s&&s.remove&&e(n).triggerHandler("remove")}catch(o){}t(i)}}(e.cleanData),e.widget=function(t,i,s){var n,a,o,r,h={},l=t.split(".")[0];return t=t.split(".")[1],n=l+"-"+t,s||(s=i,i=e.Widget),e.expr[":"][n.toLowerCase()]=function(t){return!!e.data(t,n)},e[l]=e[l]||{},a=e[l][t],o=e[l][t]=function(e,t){return this._createWidget?(arguments.length&&this._createWidget(e,t),void 0):new o(e,t)},e.extend(o,a,{version:s.version,_proto:e.extend({},s),_childConstructors:[]}),r=new i,r.options=e.widget.extend({},r.options),e.each(s,function(t,s){return e.isFunction(s)?(h[t]=function(){var e=function(){return i.prototype[t].apply(this,arguments)},n=function(e){return i.prototype[t].apply(this,e)};return function(){var t,i=this._super,a=this._superApply;return this._super=e,this._superApply=n,t=s.apply(this,arguments),this._super=i,this._superApply=a,t}}(),void 0):(h[t]=s,void 0)}),o.prototype=e.widget.extend(r,{widgetEventPrefix:a?r.widgetEventPrefix||t:t},h,{constructor:o,namespace:l,widgetName:t,widgetFullName:n}),a?(e.each(a._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete a._childConstructors):i._childConstructors.push(o),e.widget.bridge(t,o),o},e.widget.extend=function(t){for(var s,n,a=i.call(arguments,1),o=0,r=a.length;r>o;o++)for(s in a[o])n=a[o][s],a[o].hasOwnProperty(s)&&void 0!==n&&(t[s]=e.isPlainObject(n)?e.isPlainObject(t[s])?e.widget.extend({},t[s],n):e.widget.extend({},n):n);return t},e.widget.bridge=function(t,s){var n=s.prototype.widgetFullName||t;e.fn[t]=function(a){var o="string"==typeof a,r=i.call(arguments,1),h=this;return a=!o&&r.length?e.widget.extend.apply(null,[a].concat(r)):a,o?this.each(function(){var i,s=e.data(this,n);return"instance"===a?(h=s,!1):s?e.isFunction(s[a])&&"_"!==a.charAt(0)?(i=s[a].apply(s,r),i!==s&&void 0!==i?(h=i&&i.jquery?h.pushStack(i.get()):i,!1):void 0):e.error("no such method '"+a+"' for "+t+" widget instance"):e.error("cannot call methods on "+t+" prior to initialization; "+"attempted to call method '"+a+"'")}):this.each(function(){var t=e.data(this,n);t?(t.option(a||{}),t._init&&t._init()):e.data(this,n,new s(a,this))}),h}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(i,s){s=e(s||this.defaultElement||this)[0],this.element=e(s),this.uuid=t++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=e(),this.hoverable=e(),this.focusable=e(),s!==this&&(e.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===s&&this.destroy()}}),this.document=e(s.style?s.ownerDocument:s.document||s),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this.options=e.widget.extend({},this.options,this._getCreateOptions(),i),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(t,i){var s,n,a,o=t;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof t)if(o={},s=t.split("."),t=s.shift(),s.length){for(n=o[t]=e.widget.extend({},this.options[t]),a=0;s.length-1>a;a++)n[s[a]]=n[s[a]]||{},n=n[s[a]];if(t=s.pop(),1===arguments.length)return void 0===n[t]?null:n[t];n[t]=i}else{if(1===arguments.length)return void 0===this.options[t]?null:this.options[t];o[t]=i}return this._setOptions(o),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled",!!t),t&&(this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus"))),this},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_on:function(t,i,s){var n,a=this;"boolean"!=typeof t&&(s=i,i=t,t=!1),s?(i=n=e(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),e.each(s,function(s,o){function r(){return t||a.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof o?a[o]:o).apply(a,arguments):void 0}"string"!=typeof o&&(r.guid=o.guid=o.guid||r.guid||e.guid++);var h=s.match(/^([\w:-]*)\s*(.*)$/),l=h[1]+a.eventNamespace,u=h[2];u?n.delegate(u,l,r):i.bind(l,r)})},_off:function(t,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(i).undelegate(i),this.bindings=e(this.bindings.not(t).get()),this.focusable=e(this.focusable.not(t).get()),this.hoverable=e(this.hoverable.not(t).get())},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,s){var n,a,o=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],a=i.originalEvent)for(n in a)n in i||(i[n]=a[n]);return this.element.trigger(i,s),!(e.isFunction(o)&&o.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,n,a){"string"==typeof n&&(n={effect:n});var o,r=n?n===!0||"number"==typeof n?i:n.effect||i:t;n=n||{},"number"==typeof n&&(n={duration:n}),o=!e.isEmptyObject(n),n.complete=a,n.delay&&s.delay(n.delay),o&&e.effects&&e.effects.effect[r]?s[t](n):r!==t&&s[r]?s[r](n.duration,n.easing,a):s.queue(function(i){e(this)[t](),a&&a.call(s[0]),i()})}}),e.widget});


$.fn.safekeypress = function(func, cfg) {

  cfg = $.extend({
    stopKeys: {37:1, 38:1, 39:1, 40:1}
  }, cfg);

  function isStopKey(evt) {
    var isStop = (cfg.stopKeys[evt.keyCode] || (cfg.moreStopKeys && cfg.moreStopKeys[evt.keyCode]));
    if (isStop) evt.preventDefault();
    return isStop;
  }

  function getKey(evt) { return 'safekeypress.' + evt.keyCode; }

  function keypress(evt) {
    var key = getKey(evt),
        val = ($.data(this, key) || 0) + 1;
    $.data(this, key, val);
    if (val > 0) return func.call(this, evt);
    return isStopKey(evt);
  }

  function keydown(evt) {
    var key = getKey(evt);
    $.data(this, key, ($.data(this, key) || 0) - 1);
    return func.call(this, evt);
  }

  function keyup(evt) {
    $.data(this, getKey(evt), 0);
    return isStopKey(evt);
  }

  return $(this).keypress(keypress).keydown(keydown).keyup(keyup);
};
/*!
 * BlockRain.js 0.1.0
 * jQuery plugin that lets you put a playable (and configurable) game of Tetris in your site or just leave it in auto in the background.
 * http://aerolab.github.io/blockrain.js/
 *
 * Copyright (c) 2015 Aerolab <hey@aerolab.co>
 *
 * Released under the MIT license
 * http://aerolab.github.io/blockrain.js/LICENSE.txt
 */
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



    _create: function() {

      var game = this;

      this._setTheme(this._theme);

      this._createHolder();
      this._createUI();

      this._refreshBlockSizes();

      // The game height is fixed at the start of the game
      this._canvas = $canvas.get(0);
      this._ctx = canvas.getContext('2d');

      var
      WIDTH = this.options.blockWidth,
      HEIGHT = Math.floor(this._$game.innerHeight() / this._$game.innerWidth() * WIDTH),
      PIXEL_WIDTH = this._$game.innerWidth(),
      PIXEL_HEIGHT = this._$game.innerHeight(),
      block_size = Math.floor(PIXEL_WIDTH / WIDTH),
      border_width = 2,
      autopilot = false;

      this.updateSizes();

      $(window).resize(function(){
        game.updateSizes();
      });

      /**
       * Draws the background
       */
      function drawBackground(this._ctx) {
        this._ctx = this._ctx || ctx;

        if( typeof this._theme.background !== 'string' ) {
          return;
        }

        if( this._theme.backgroundGrid instanceof Image ) {

          // Not loaded
          if( this._theme.backgroundGrid.width === 0 || this._theme.backgroundGrid.height === 0 ){ return; }

          this._ctx.globalAlpha = 1.0;

          for( var x=0; x<WIDTH; x++ ) {
            for( var y=0; y<HEIGHT; y++ ) {
              var cx = x * block_size;
              var cy = y * block_size;

              this._ctx.drawImage( this._theme.backgroundGrid, 
                              0, 0, this._theme.backgroundGrid.width, this._theme.backgroundGrid.height, 
                              cx, cy, block_size, block_size);
            }
          }

        }
        else if( typeof this._theme.backgroundGrid === 'string' ) {

          var borderWidth = this._theme.strokeWidth;
          var borderDistance = Math.round(block_size*0.23);
          var squareDistance = Math.round(block_size*0.30);

          this._ctx.globalAlpha = 1.0;
          this._ctx.fillStyle = this._theme.backgroundGrid;

          for( var x=0; x<WIDTH; x++ ) {
            for( var y=0; y<HEIGHT; y++ ) {
              var cx = x * block_size;
              var cy = y * block_size;

              this._ctx.fillRect(cx+borderWidth, cy+borderWidth, block_size-borderWidth*2, block_size-borderWidth*2);
            }
          }

        }

        this._ctx.globalAlpha = 1.0;
      }

      /**
       * Draws one block (Each piece is made of 4 blocks)
       */
      function drawBlock(x, y, blockType, this._ctx) {
        // convert x and y to pixel
        this._ctx = this._ctx || ctx;
        x = x * block_size;
        y = y * block_size;

        var borderWidth = this._theme.strokeWidth;
        var borderDistance = Math.round(block_size*0.23);
        var squareDistance = Math.round(block_size*0.30);

        var color = getBlockColor(blockType, false);

        // Draw the main square
        this._ctx.globalAlpha = 1.0;

        // If it's an image, the block has a specific texture. Use that.
        if( color instanceof Image ) {
          this._ctx.globalAlpha = 1.0;

          // Not loaded
          if( color.width === 0 || color.height === 0 ){ return; }

          this._ctx.drawImage(color, 0, 0, color.width, color.height, x, y, block_size, block_size);

        }
        else if( typeof color === 'string' )
        {
          this._ctx.fillStyle = color;
          this._ctx.fillRect(x, y, block_size, block_size);

          // Inner Shadow
          if( typeof this._theme.innerShadow === 'string' ) {
            this._ctx.globalAlpha = 1.0;
            this._ctx.strokeStyle = this._theme.innerShadow;
            this._ctx.lineWidth = 1.0;

            // Draw the borders
            this._ctx.strokeRect(x+1, y+1, block_size-2, block_size-2);
          }

          // Decoration (borders)
          if( typeof this._theme.stroke === 'string' ) {
            this._ctx.globalAlpha = 1.0;
            this._ctx.fillStyle = this._theme.stroke;
            this._ctx.strokeStyle = this._theme.stroke;
            this._ctx.lineWidth = borderWidth;

            // Draw the borders
            this._ctx.strokeRect(x, y, block_size, block_size);
          }
          if( typeof this._theme.innerStroke === 'string' ) {
            // Draw the inner dashes
            this._ctx.fillStyle = this._theme.innerStroke;
            this._ctx.fillRect(x+borderDistance, y+borderDistance, block_size-borderDistance*2, borderWidth);
            // The rects shouldn't overlap, to prevent issues with transparency
            this._ctx.fillRect(x+borderDistance, y+borderDistance+borderWidth, borderWidth, block_size-borderDistance*2-borderWidth);
          }
          if( typeof this._theme.innerSquare === 'string' ) {
            // Draw the inner square
            this._ctx.fillStyle = this._theme.innerSquare;
            this._ctx.globalAlpha = 0.2;
            this._ctx.fillRect(x+squareDistance, y+squareDistance, block_size-squareDistance*2, block_size-squareDistance*2);
          }
        }

        // Return the alpha back to 1.0 so we don't create any issues with other drawings.
        this._ctx.globalAlpha = 1.0;
      }


      // Theming
      function getBlockColor(blockName, falling) {
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
      };


      function Shape(orientations, symmetrical, blockType) {

        $.extend(this, {
          x: 0,
          y: 0,
          symmetrical: symmetrical,
          init: function() {
            $.extend(this, {
              orientation: 0,
              x: Math.floor(WIDTH / 2) - 1,
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
            if (!checkCollisions(this.x, this.y, this.getBlocks(orientation))) {
              this.orientation = orientation;
            }
          },
          moveRight: function() {
            if (!checkCollisions(this.x + 1, this.y, this.getBlocks())) {
              this.x++;
            }
          },
          moveLeft: function() {
            if (!checkCollisions(this.x - 1, this.y, this.getBlocks())) {
              this.x--;
            }
          },
          getBlocks: function(orientation) { // optional param
            return this.orientations[orientation !== undefined ? orientation : this.orientation];
          },
          draw: function(drop, _x, _y, _orientation, this._ctx) {
            if (drop) this.y++;

            var blocks = this.getBlocks(_orientation),
                x = _x === undefined ? this.x : _x,
                y = _y === undefined ? this.y : _y,
                i = 0;
            for (; i<this.blocksLen; i += 2) {
              drawBlock(x + blocks[i], y + blocks[i+1], this.blockType, this._ctx);
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
      };


      var shapeFuncs = [];
      $.each(this._shapeFactory, function(k,v) { shapeFuncs.push(v); });

      var filled = {
          data: new Array(WIDTH * HEIGHT),
          score: 0,
          toClear: {},
          check: function(x, y) {
            return this.data[this.asIndex(x, y)];
          },
          add: function(x, y, blockType) {
            if (x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT) {
              this.data[this.asIndex(x, y)] = blockType;
            }
          },
          asIndex: function(x, y) {
            return x + y*WIDTH;
          },
          asX: function(index) {
            return index % WIDTH;
          },
          asY: function(index) {
            return Math.floor(index / WIDTH);
          },
          clearAll: function() {
            this.data = new Array(WIDTH * HEIGHT);
          },
          _popRow: function(row_to_pop) {
            for (var i=WIDTH*(row_to_pop+1) - 1; i>=0; i--) {
              this.data[i] = (i >= WIDTH ? this.data[i-WIDTH] : undefined);
            }
          },
          checkForClears: function() {
            var startLines = board.lines;
            var rows = [], i, len, count, mod;

            for (i=0, len=this.data.length; i<len; i++) {
              mod = this.asX(i);
              if (mod == 0) count = 0;
              if (this.data[i] && typeof this.data[i] == 'string') {
                  count += 1;
              }
              if (mod == WIDTH - 1 && count == WIDTH) {
                rows.push(this.asY(i));
              }
            }

            for (i=0, len=rows.length; i<len; i++) {
              this._popRow(rows[i]);
              board.lines++;
              if (board.lines % 10 == 0 && board.dropDelay > 1) {
                //board.dropDelay -= 2;
              }
            }

            var clearedLines = board.lines - startLines;
            this._updateScore(clearedLines);
          },
          _updateScore: function(numLines) {
            if( numLines <= 0 ) { return; }
            var scores = [0,400,1000,3000,12000];
            if( numLines >= scores.length ){ numLines = scores.length-1 }

            this.score += scores[numLines];
            this._$scoreText.text(this.score);
          },
          _resetScore: function() {
            this.score = 0;
            this._$scoreText.text(this.score);
          },
          draw: function() {
            for (var i=0, len=this.data.length, row, color; i<len; i++) {
              if (this.data[i] !== undefined) {
                row = this.asY(i);
                blockType = this.data[i];
                drawBlock(this.asX(i), row, blockType);
              }
            }
          }
      };

      function checkCollisions(x, y, blocks, checkDownOnly) {
          // x & y should be aspirational values
          var i = 0, len = blocks.length, a, b;
          for (; i<len; i += 2) {
            a = x + blocks[i];
            b = y + blocks[i+1];

            if (b >= HEIGHT || filled.check(a, b)) {
              return true;
            } else if (!checkDownOnly && a < 0 || a >= WIDTH) {
              return true;
            }
          }
          return false;
      }

      var niceShapes = this._getNiceShapes(this._shapeFactory);

      var board = {
          animateDelay: 1000/this.options.speed,
          cur: null,

          lines: 0,

          dropCount: 0,
          dropDelay: 5, //5,

          init: function() {
            this.cur = this.nextShape();

            var start = [], blockTypes = [], i, ilen, j, jlen, color;

            // Draw a random blockrain screen
            blockTypes = Object.keys(this._shapeFactory);

            for (i=0, ilen=WIDTH; i<ilen; i++) {
              for (j=0, jlen=this._randChoice([this._randInt(0, 8), this._randInt(5, 9)]); j<jlen; j++) {
                if (!color || !this._randInt(0, 3)) color = this._randChoice(blockTypes);
                start.push([i, HEIGHT - j, color]);
              }
            }

            if( this.options.showFieldOnStart ) {
              drawBackground();
              for (i=0, ilen=start.length; i<ilen; i++) {
                drawBlock.apply(drawBlock, start[i]);
              }
            }

            this.showStartMessage();

          },
          showStartMessage: function() {
            this._$start.show();
          },
          showGameOverMessage: function() {
            this._$gameover.show();
          },
          nextShape: function(_set_next_only) {
            var next = this.next,
                func, shape, result;

            if (this._shapeFactory[info.mode]) {
              func = this._shapeFactory[info.mode];
            }
            else if (info.mode == 'nice' || info.mode == 'evil') {
              func = niceShapes;
            }
            else {
              func = this._randChoice(shapeFuncs);
            }

            if (func.no_preview) {
              this.next = null;
              if (_set_next_only) return null;
              shape = func(filled, checkCollisions, WIDTH, HEIGHT, info.mode);
              if (!shape) throw new Error('No shape returned from shape function!', func);
              shape.init();
              result = shape;
            }
            else {
              shape = func(filled, checkCollisions, WIDTH, HEIGHT, info.mode);
              if (!shape) throw new Error('No shape returned from shape function!', func);
              shape.init();
              this.next = shape;
              if (_set_next_only) return null;
              result = next || this.nextShape();
            }

            if (autopilot) { //fun little hack...
              niceShapes(filled, checkCollisions, WIDTH, HEIGHT, 'normal', result);
              result.orientation = result.best_orientation;
              result.x = result.best_x;
            }

            return result;
          },
          animate: function() {
            var drop = false,
                gameOver = false;

            updateSizes();

            if (!this.paused) {
              this.dropCount++;
              if( this.dropCount >= this.dropDelay || autopilot ) {
                drop = true;
                this.dropCount = 0;
              }

              // test for a collision
              if (drop) {
                var cur = this.cur, x = cur.x, y = cur.y, blocks = cur.getBlocks();
                if (checkCollisions(x, y+1, blocks, true)) {
                  drop = false;
                  for (var i=0; i<cur.blocksLen; i+=2) {
                    filled.add(x + blocks[i], y + blocks[i+1], cur.blockType);
                    if (y + blocks[i] < 0) {
                      gameOver = true;
                    }
                  }
                  filled.checkForClears();
                  this.cur = this.nextShape();
                }
              }

              // Draw the blockrain field
              ctx.clearRect(0, 0, PIXEL_WIDTH, PIXEL_HEIGHT);
              drawBackground();
              filled.draw();
              this.cur.draw(drop);
            }

            if( gameOver ) {

              this.options.onGameOver(filled.score);

              if( autopilot ) {
                // On autoplay, restart the game automatically
                this.start();
              }
              else {
                this.showGameOverMessage();
                board.gameOver = true;
              }
            } else {
              window.setTimeout(function() { board.animate(); }, this.animateDelay);
            }
          }
      };

      var info = {
          mode: this.options.difficulty,
          modes: [
            'normal',
            'nice',
            'evil'
          ],
          modesY: 170,
          autopilotY: null,

          init: function() {
            this.mode = this.options.difficulty;
          },
          setMode: function(mode) {
            this.mode = mode;
            board.nextShape(true);
          }
      };

      info.init();
      board.init();

      /**
       * Controls
       */
      if( this.options.autoplay ) {
        // On autoplay, start the game right away
        autopilot = true;
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

    },


    /**
     * Shapes
     */
    _shapeFactory: {
      line: function() {
        /*
         *   X        X
         *   O  XOXX  O XOXX
         *   X        X
         *   X        X
         */
        var ver = [0, -1, 0, -2, 0, -3, 0, -4],
        hor = [-1, -2, 0, -2, 1, -2, 2, -2];
        return new Shape([ver, hor, ver, hor], true, 'line');
      },
      square: function() {
        /*
         *  XX
         *  XX
         */
        var s = [0, 0, 1, 0, 0, -1, 1, -1];
        return new Shape([s, s, s, s], true, 'square');
      },
      arrow: function() {
        /*
         *    X   X       X
         *   XOX  OX XOX XO
         *        X   X   X
         */
        return new Shape([
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
        return new Shape([
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
        return new Shape([
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
        return new Shape([hor, ver, hor, ver], true, 'leftZag');
      },
      rightZag: function() {
        /*
         *       X
         *    OX OX
         *   XX   X
         */
        var ver = [0, -2, 0, -1, 1, -1, 1, 0],
            hor = [0, 0, 1, 0, 1, -1, 2, -1];
        return new Shape([hor, ver, hor, ver], true, 'rightZag');
      }
    },


    // Utility Functions
    _randInt: function(a, b) { return a + Math.floor(Math.random() * (1 + b - a)); },
    _randSign: function() { return this._randInt(0, 1) * 2 - 1; },
    _randChoice: function(choices) { return choices[this._randInt(0, choices.length-1)]; },


    /**
     * Update the sizes of the renderer (this makes the game responsive)
     */
    updateSizes: function() {
      PIXEL_WIDTH = this._$game.innerWidth();
      PIXEL_HEIGHT = this._$game.innerHeight();

      block_size = Math.floor(PIXEL_WIDTH / WIDTH);

      // Recalculate the pixel width and height so the canvas always has the best possible size
      PIXEL_WIDTH = block_size * WIDTH;
      PIXEL_HEIGHT = block_size * HEIGHT;

      border_width = 2;
      $canvas .attr('width', PIXEL_WIDTH)
              .attr('height', PIXEL_HEIGHT);
    }


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
      if( typeof this._theme === 'string' ) {
        this._theme = BlockrainThemes[this._theme];
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

      this._$game = $(this);

      this._$gameholder = $('<div class="blockrain-game-holder"></div>');
      this._$gameholder.css('position', 'relative').css('width', '100%').css('height', '100%');

      this._$game.html('').append(this._$gameholder);

    },


    _createUI: function() {

      // Create the canvas
      var $canvas = $('<canvas style="display:block; width:100%; height:100%; padding:0; margin:0; border:none;" />');
      if( typeof this._theme.background === 'string' ) {
        $canvas.css('background-color', this._theme.background);
      }
      this._$gameholder.append($canvas);

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
        this.options.blockWidth = Math.ceil( this._$game.width() / this.options.autoBlockSize );
      }

    },


    /**
     * Start/Restart Game
     */
    start: function() {
      filled.clearAll();
      filled._resetScore();
      board.started = true;
      board.animate();

      this._$start.fadeOut(150);
      this._$gameover.fadeOut(150);
      this._$score.fadeIn(150);
    },


    getNiceShapes: function(this._shapeFactory, undefined) {
      /*
       * Things I need for this to work...
       *  - ability to test each shape with filled data
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
          score += possibles[filled.asIndex(x + blocks[i], y + blocks[i+1])] || 0;
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
            if (!filled.check(x + tx, y + ty)) {
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
            if (y == height || filled.check(x, y)) {
              for (py=y-4; py<y; py++) {
                possibles[filled.asIndex(x, py)] = py; //TODO - figure out better scoring?
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
                if (checkCollisions(x, y + 1, blocks, true)) {
                  // collision
                  score = scoreBlocks(possibles, blocks, x, y, filled, width, height);
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
    };

  });

})(jQuery));
/*!
 * BlockRain.js 0.1.0
 * jQuery plugin that lets you put a playable (and configurable) game of Tetris in your site or just leave it in auto in the background.
 * http://aerolab.github.io/blockrain.js/
 *
 * Copyright (c) 2015 Aerolab <hey@aerolab.co>
 *
 * Released under the MIT license
 * http://aerolab.github.io/blockrain.js/LICENSE.txt
 */
 /**
 * Themes. You can add more custom themes to this object.
 */
var BlockrainThemes = {
  'candy': {
    background: '#040304',
    backgroundGrid: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAABcVBMVEUZGRkaGhobGxsAAAAcHBwBAQECAgIZGhwLCwsYGBgZGxYXFxcGBgYZGh8ZGh4aGhwZGxoWFhYeHh4bGRwdHR0HBwcaGxYFBQUDAwMeGRYZHBMEBAQcHB4VFRUXGh8aGhgbGxkgGBYdGRgcGhsUFBQQEBAbGRoWHRYbGhYdGBwdGRYaGR4UGyEaGRcMDAwREhcgICAAAgcbGx0aHBkSFBEZGxgYGR0JCQkbGR4SEhIABAAfHx8XFxUBBAATFAwZGhQZHBUeGBgICAgAAAgQEBgDAwAUFAobGxMXGxoQEBIdGRogGBUHAgAYEw0eGxQeGhcZHBEZGSEHAAUYDxAeGhkWGyEWGx4WHBoGBggXHBYEAAcWDRIcFhYcGBcZGRcTHR4THhoUHhYXGxwCAwgBAAITDw4ZGBYWGx8SHB4SHRkTHRUWGxUACgYCBwMAAQAREg0FBwQKDRIJDRYHDxIJDw8KDwgNDggQDA0QCw8MCgsNDQ3RXB2UAAABG0lEQVR4XjWMU4+tQRRE9+7uj8ax7bFt27Zt3PvrpyeZsx6qkpVKARUFKlIqcCivqEBBoMHRqCw3cmQ5KHINITHPHETCQezDnCwC1eMuqSvmYzmueojjwB8OMCUKIjRrhDFGfsN1ma8LaJ4Bqa9Q0dAP2zMxX38qlbQtqZXwL1eHsfFOW41E1GkjYUqARPFDS5PZNrwcUSXDkBAJAz/0tneoaiCAXnc5UykQxlcDg0OBQ0TPK4+kww1INB0mJqdKWDWr3mx4jivkan5hcSlrrJhSslTJFAhRdFhdS69njY3NreKObSEhWhB29/YPIFE7Oj4pnkoWQjwEZ+cXl/ZV7frm9k6yYkBCFO4fHp+eX17f3j8+v77//ZcF4Qfd6yVhNO1A+QAAAABJRU5ErkJggg==',
    blocks: {
      line:     'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAACuklEQVR4Xi2MzW4cRRSFz/2p6p4eT2zjjE2MHBQWvAALNjwDS8SOFc/FIyCxQgh2LFHkBQgJyQo/wXKCEZ7x9E9VV93LBPNJ516dxXfo/U8+HTZ9uzrZympTjLo4DbtDiBpXSBGMocI5lkaMhKv0fz+LVX9P6ZuvvxqBby+3L3eJu6Zt27DL4qgIWW0KsxPC3Kjxz5fPT3z48csvtHSHd0C/1374RddPX/9xK6JdcjEutNfqFJMBsQat3By+i/7VxqJ6c/zd5avvn1+N7dl2V9Ad92M2ViI2ksyWSJ2QXQXc5/H25jYcHHKl1YYebcJqw/rW03OOzfr89NHbR8vH3Wq9Olofrddni+XhycXJhBSkKFLxWeHBZFFDVyD343Rzc/0XeYSXeXZIJaam2V9pLsBOtRIKYAorXqvAg8giaKsCKw1zJAGFbKhwtxrdG9E3BQxAIW1xyYUKUIwNxMAwDEwuSgA5iAw2l5ITOeE/GLRMihIOsnQZnKqOlWXRUWidyYkFpCxtCF1s8D+seBggYVYRhChkqqjmld3NKhhu1XKuKUf4g6egEitkvqc5ewo+3ZOVZJO4Q4OSEDGRRyAQkYH8QfMUCR07KS8DIsO8xhjcnUXnSv4GMRYShSUG2MFCeby/awOJFyvF3TU22ckk3E3FQjci+mJVggwz12rKVEvWOk3dwWpIr7ezrU4XZ+9ciBAxWCVlhDb2o5cZTgBR17R3w45hgg8/fu+Dj643adZVXzCmebsbp5T6fhr2L9W8z5xLNsyDpl2btrsXPynS9NvVVc28xzMLPDCUYbVUMy+TMgdinupCEapdvPv0lqGwjW9fHsXjF39eIzRpnFbLdiy918qCWmclnq3mcWhVnzw5v+83XYz0+LPP/8lL704NB3BBdbCDKlChAq8QgRvmGSFouyo3vz7Lr/8FMHqie3VCpNQAAAAASUVORK5CYII=',
      square:   'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAACfUlEQVR4Xh3LvY5cRRBA4VNV3ffe+fEaZARgWfBExEhEZEg8A69AgkC8AzEiICMgJCdAxggsGRuW3Z3dmenbXVWskT6d7MiXnz3qclu87esm1qW3NteRuqaCIAmQABwPvPU2NyeaUa6P159/9QV3l/HqlWqN41El0PaadEJAoZBKqS9+eybL/tvvvi8PrHA4ku33pz9v5rafKmc0I7QhbiGaJSikyeCh1T7OG6fMluOvP/5+8csb+/RxhUtlEXA5KUMpiEpWwZKU3D799Zl1CtpEjsoh++HRxUMBVhgry4yUXLvstnE8qWi/HZndTEwpppj5XLIg7fZ4+fJlb91jzSlGhjc2O7RMj995nApRIRW0BHRl9UXLona6PYiGGKpaa50qPtQ96/5BCgkpBKghpI7VJZK5bmYju5IxQkZONqtbu+txd5ZEQFI0KaRRJxEZY0wjh/dqKqbZ/z9tqmJIqpQSnaD8T9sYkGqWmuTIZHgoWYupKh4SqSQimqrJfeV1gTECF4NKmUHwDFRqNSuJjMTxFQANNKGUyTBxYqSX6J6USdc1BquYFhEMFEQCUvSeC5rheL/Y74kAvX/OPXRZojIkqHkaLpMwWdYJm1fHlZIJotdXN7tFtczvvfuB5MIyRZwQ11pora2BTKOvva3zPKtStpsKLNNmmcr53xtFMtLaGLSR61IKKaPHenO1L2+qThqrn5FvPuGjjz8s4x+NI6Ptdvtxckywo0cjstZZZfZhNhSWNuoPP/5Udhebc8+tbp4//zPd6dcaGtJtWtUiVkhTWSJkTn3y5P15M19ervL1p9UZFzX9zHYmO1Ph3KFQK+rkIBMScbY7DicOzn+QRoW5iamqhgAAAABJRU5ErkJggg==',
      arrow:    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAACsklEQVR4XhWPu25bVxREZz/OuQ9RVKhXjBSu8gX5h+QD0udD8ilByjRpUqZxa6RxY8DuYlhwHhAc2qRIieK9vOfsvUMNBoPVrGLoh6+++7y7mbFfTNIVdShCxCGuAgE8tSilhOVWU6lrtPjPK33ffvvb6xd4KG9/+f1kenIYoAgOIc+AF9u5Rdteuvubty9LU168fqW9z7AFanr36uPZSOIgWHB1IJABKE0keSr3QdLolXitjw1n717++sfPP/7Ula6pfbYmeU7eaBybnzg6ewwpT8DW/vth2acFkzf9Pi0OOU1+/eVlM2/m14vZ+Rfz88t+Np+fnZ8tns1OL66vLss0FIughgppDumLzIpmYBrHz+uVsZVSsraorJoMQU5dOs3K3jaiSXGciNYoG3cQcbJjwiKC3Ny9ljhEEUlGBnh4IJwR+qQ6q7FbuMPBLEQCVjaYA0mYwcyIY6p5qYFQQqOexRMhHOqg6sV8mtiqQki51gSHV6YAMYMMxgIC2IOcBcIsQipBBCIjNqEQBWARjjAOHAtSh1eqk9bqLpBKQUSZE4ccIqpJFnWQiRSKypjUA1DgEDw5janNkgA4zKmGQtpgsNqhMoRCmRni4AgKJh6DB842TffENWWqU+m448eYje186GZT31nXo5EqPhUGIqoGwd1gtWFtRBeLxcXF1TydYh+td1E5lMdpOOxGr9bPOzdrtFGWk2lAg84e9/fYbGmsync0xD7mfkITgUMbJaKc26GOVn2sB61Gf958OE992wsoQjSSjBHUwEmlISTsxjEsOIsxP3v+/M3tey3wrRVh29wuA2Vo3Xoe3KP6Endhzh3v92NjKefcXZzETKxR+Sa+vt2s3/3z127YrYfN+mGz2m4+rT+tNuu77d3yfvn3+vbh8eH4bb3dLrer97c3q7L6H15gvODKB5u4AAAAAElFTkSuQmCC',
      rightHook:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAACqElEQVR4Xh3PO2tlZRSH8f9a73XvPTkTExl1dLAIKFpNY2Fl4UcT7G3FwmIaO3sbEfQjWAxDAkIORDHJyXFf3stayzC/9qke+ubrF0u7zqwfsJNFXEKtCAJriBGBoB0gNAZ5WIekcC0f+br8++3Pr1AP5Y/f6Xgfx4RqoB2kI27QgkYQw5BA2L95M+vTn379y0c2HI+Y5Ob6z3B/M/ZmlTieV7ISj9rXZ2n338NciEMedGshJacbZ9X16vK3H76vh/1paCOWiWvos5M1U9llLIebKeqz0zG4PmZ/dfl6XWc/9p4Ox/fMwnIcXrwL6ohPg54OZhYTUUc+w1YQ83z3kMadEKdp8EmE54cnKifTBLOr17cqtwIf4gAuKhUd8Lh4+TKPowjyOK1l8cxAm9nK2nWnsQeAyNtgldnClCLntkrRrTBcFyPjYRg8AEAY4JDhkhp7uOBIRbyqrmK+KcBm1qU30UbSxHcGnIGpKYk63dQxnC2sPcWo2slZUCCGYXPkkBnUqjcCSAGFsaOUQk5koqUqPFV5G2sDai+tG3vv6ZF3BojBzFrvpeij4KtDZTjPXTWGBA91uWJTo1WkqTAZoAbpT3ejd0YOBW1zoAHE/tG8FThm52KOLnDv1dA8DACTwbRU6TxSaX1WZII/1qBgwLvWtgN6ieQc2hC9hwLGTFS35eTJ7uOL5xxTkZI44l7BDGpwBke8FFCA9Pj2EAipHbd8Qre3fxOMDWykGryyM2Vv67JwmCJ7cQRRM6JXX+CrLz97/uHJ4bgHFUdKBi8B5gECLLAys4grAkr5Vt758ZdLTwhuPNvfHP7ZPzjrBAHYLBlChwPQ+jrtpq2UJv3i0/clni/Y03efYzxPvZdBkAzeAKATukENAoTA86ynZ3GrVQl3Eu/yJ/8D33mmeKR3Cz8AAAAASUVORK5CYII=',
      leftHook: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAACq0lEQVR4Xg3HO24mVRBH8X/Vrfv4ut02BjS8GSBAQuyCmE0gwSLICFgCBLASAhLiiQjQICFBMAMSFn63v+77qCp89EsO5U+/rus/0zQPPW8thXRQABLAjtHAAZ2gzGk2HRCG1YMPwgdf/fnXj1fX+O7732s/A0kzbwEUCW5Fgh8HGVdFTOn5H79NiZ/98rPATBVS8OzX5xTehYsxd3KFwXcGEljVOGVJ8a7W4Q4YT8sb33z70xdf/oB8HufzhjI0m2a3JLykuAyV4RGxrLVN5+f/3dxSKXJc59qfUk77djhdXhGx0/mMAg/rpm30bXq97Fp3su1mrMe19e46BLLw9Nb1w0WaZoO+fPmCNbTW3D1Fcjci77Cnn3wMhCBpWU7vuwqo3evgaar6QHRqfRXKhQiELFG1O6H3MZUyLpTIx24UMkNASbqZwZiN3AQsgKhZ6/VYR9OcDw/blg5xmKqPnIRBLQUZw4iIWQKydRcEcvLOOZ2A80Nv8SRv1iiHQWPXewbztm3MbObMYgpGCMwiwgwAIhJCAGBmjMD+KDJJThJzTI8TKZm5E9S7U3c0s6PrkVujvYbm0Qr1iceJ+GZ9772OMawNDNAgVm8cADcAQSgzCSiChZj8MRLwXCTPufQEC8SlVKPWNTJJ4BTDcds58tCaMsVoIQ8Nq2AgS97uVg2h7v29Dz86W86MGqB922F+djjsdbWE0eu233fbwF0opd57KYU43l5ewQ43N7d17CwUHJnlsl4QmUwkJJKZ5uXaLdBrnzl6EGbTbV2nVIiMuMU44EMwMjn76GMHeWAKhKuLvyXoC+F3IvXrfy9zmO/WKyUM6c1riWUY7btKiA+9UkyvPnk7KFMPtLz/uS9vrjVFLNqTUSEJNLN5hQL7gIXpsGytO0ekCduR/fg/hV+olVqSm3YAAAAASUVORK5CYII=',
      rightZag: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAACt0lEQVR4Xg3LOW6eVRQG4PcM937DP9hYlkgUQ6RQsAiEWAC7YCWUtGyAFqhpEHRI0CCBIjpHJBSxEhzkxP6H+93pHPz0D3358IsbuyY/XlCs7/YU5zjFZgdGp07BEDq4KXwA0PvuqIfDGbT0u69/+hZvr/DrH1gc1WENwUAGM3RDcXQGRbA9/e3nJPX3F5dqdY/ja8ztx++/+YhX5S6P47REODW2Pra+qsbOR5VFWwjHVPKJJF1FevPn019++O7jeYo3h5VG8Ua5OLnCh25T7+RwYfZavVz993q5OehccfImnV3nqdLjD54gTiDAF3cnEJrBAbZNSS//vTKP1FcTk0ppsfYzkpEt58Pls8vb29vTabDWYZJzjsqnJ+vHjx9tVvf3qG3QVpXJ0Y5L2xWmYbPt7W5WeK7RKUqICic7poQY6q4Fw2AUDSykUGUlQ0cUy3XUqCxm8Obe4SypVoRwOC7kLE5szIoBHsmlO6NJO3Qv5GEozI3IiE25K2EeLAiYADiBOwi51NLdCRrGcQ5xTLVUcg1BVeFszXtaWinkIAcALigQDwISby0Vq3dpR8IA2r1cKNfZRTq9F2c1iLuYqQcHg2Dmvbam08QUG1V07zASqDCLouSSE0tojCbGablFoMgkpMxht9QukvICASIXtNLy7rDDakVDeGepzpIUup1mlIZs5Dbo9OknnwEELGgZJgBhHHDYIx/v8/r98+d/P2cVVSOkitRPN9uXfz0j2rRSh1CZDKRmFomgnns62Wyvrq+ncTy2JJ/rRXv76vx04ymr83pci9gYRYISS4N3cgRKvYb15EHOHzy8fPaPgtMe8zHG5y8uH6y3wa7LPbNOIIkQRpCOZt7KzatHFx+Ww0Ki9NX8ZHWy7Sltchtz2aj32nicjZkpLr1m760vp5tN2e8jtHX0Yf4f3da+1L4oEEQAAAAASUVORK5CYII=',
      leftZag:  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAACtElEQVR4Xg2Lu25cZRhF93f5L3OOPeOQmJuDhEIHDa/CC/B4SHSICqS0CERDE2MJAYKEmITEcewZz/nvH7O0taq16eTL++P66nhCDegOAEhghFYhDDM0hSgowQkKkDIwJi0pP/72G9j24vIi8S7nN34lYG1VyOKg0uVKFFIiY/XL+R8s977+6nvttBMkovTDz9/Np3G3fTlvYkoFJswzaxtya2haQ0nUdGa2PLY6GD/9+vjJ+Y+bD+K2vFxtrLS3cQq9t1rLwUZ7IpuOAmQQ8u9/PgFDWbG5708/jK/Ti9OzExErhYVU1TMrCZqV7fY2Or2+uQ5H7zgPMNQF5HL7+upZeFeHLU//etrraM2YedQBAXsnoPXHn8yrcHVzE0LICWoECTQf+SG19dRqK3tMUxSRZtkIZtqbsblW+vF8/Pzy1XoNvdthjDas7He7swdno+JkM21v997r6A1MIKNBwiCiXssqhNsbcAwQosPTeek1MzBa947NmnewYcGR8Oh1sZG8s5LvQoACaK0Yegi+965MNWXnxIAx0AdyWnqDMjuh1KoIkYGNUPqh0zHaYcpwoin1ZiBFjFBVEWLm1ppzTkQAsAQYQdwhTap+dBCRXzkW6g2lIpdqRkYE1v1+AZgEuiRo8G2YaCBo75ZylSCdiMnoYPVefO1k8AYm7rlAjUDi7/ZN18HIffbp5zFO22Vf0bzXfsBQUu4DIJ6P1/t/XowB9RGl4Xj94M62zy+vou2sDUySyhJjTDXpAeL9YFKXaxYnuoL2BRfnzxghj7YKm4liHkszGkOUjtxIYjKM9ncpTnPr4+HDj8j+U5/B5R5k/vfv344m6rfXHb3NSqKvdrs5xKUWeN95nUd69Oi9vpQI0PtfTAn7eE/eLF0Y92eUjrcDISBmrBjbgkrIDPFYCfoCLPgflXOjuIEFgMYAAAAASUVORK5CYII='
    }
  },
  'modern': {
    primary: null,
    secondary: null,
    stroke: null,
    blocks: {
      line:     '#fa1e1e',
      square:   '#f1fa1e',
      arrow:    '#d838cb',
      rightHook:'#f5821f',
      leftHook: '#42c6f0',
      rightZag: '#4bd838',
      leftZag:  '#fa1e1e'
    }
  },
  'retro': {
    primary: null,
    secondary: null,
    stroke: '#000000',
    innerStroke: '#000000',
    blocks: {
      line:     '#fa1e1e',
      square:   '#f1fa1e',
      arrow:    '#d838cb',
      rightHook:'#f5821f',
      leftHook: '#42c6f0',
      rightZag: '#4bd838',
      leftZag:  '#fa1e1e'
    }
  },
  'monochrome': {
    primary: '#ffffff',
    secondary: '#ffffff',
    stroke: '#000000',
    innerStroke: '#000000'
  },
  'aerolab': {
    primary: '#ff7b00',
    secondary: '#000000'
  },
  'chocolate': {
    primary: '#7B3F00',
    secondary: '#7B3F00',
    stroke: '#291811',
    innerStroke: '#291811'
  },
  'gameboy': {
    background: '#C4CFA1',
    primary: null,
    secondary: null,
    stroke: '#414141',
    innerStroke: '#414141',
    innerSquare: '#000000',
    blocks: {
      line:     '#88926A',
      square:   '#585E44',
      arrow:    '#A4AC8C',
      rightHook:'#6B7353',
      leftHook: '#6B7353',
      rightZag: '#595F45',
      leftZag:  '#595F45'
    }
  },
  'vim': {
    background: '#000000',
    primary: '#C2FFAE',
    secondary: '#C2FFAE',
    stroke: '#000000',
    strokeWidth: 3,
    innerStroke: null
  },
};