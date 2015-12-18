(function () {
	var pattern = {
		viewWidth: $(window).width(),
		pixelScale: 1,
		colourA: "#FFFFFF",
		colourB: "#000000",
		render: function render() {
			this.initTiles(this.viewWidth / this.pixelScale);
			this.writePattern();
			this.attachCanvas();
			this.draw();
		},
		attachCanvas: function attachCanvas() {
			var canvas = $("<canvas width='" + this.viewWidth + "' height='" + this.viewWidth + "'" + "class='" + "pattern'>" + "</canvas>");
			this.ctx = canvas.get(0).getContext("2d");
			canvas.appendTo($("body"));
		},
		fillPixel: function fillPixel(x, y, colour) {
			this.ctx.fillStyle = colour;
			var ps = this.pixelScale;
			this.ctx.fillRect(x * ps, y * ps, ps, ps);
		},
		initTiles: function initTiles(size) {
			this.size = size;
			this.stick = []
			for(var i = 0; i < size * size; i++) {
				this.stick.push(0);
			}
		},
		draw: function () {
			for(var y = 0; y < this.size; y++) {
				for(var x = 0; x < this.size; x++) {
					var val = this.getTile(x,y);
					var colour;
					if (val === 1) {
						colour = this.colourA;
					} else if (val === 0) {
						colour = this.colourB;
					}
					this.fillPixel(x, y, colour);
				}
			}
		},
		getTile: function getTile(x, y) {
			var tileIdx = y * this.size + x;
			return this.stick[tileIdx];
		},
		setTile: function getTile(x, y, val) {
			var tileIdx = y * this.size + x;
			return this.stick[tileIdx] = val;
		}
	};

	var circular = Object.create(pattern);
	circular.writePattern = function writePattern() {
		for(var i = 1; i <= this.size; i++) {
			for(var j = 1; j <= this.size; j++) {
				var x = i * this.size/100;
				var y = j * this.size/100;
				var c = Math.trunc(x*x + y*y);
				if (c % 2 === 0) {
					this.setTile(j, i, 1);
				} else {
					this.setTile(j, i, 0);
				}
			}
		}
	};

	circular.pixelScale = 1;
	circular.colourA = "#33adff";
	circular.colourB = "#000000";
	circular.render();
})()
