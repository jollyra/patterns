(function () {
	var pattern = {
		build: function build() {
			var canvas = $("<canvas width='" + this.w + "' height='" + this.h + "'" + "class='" + "pattern'>" + "</canvas>");
			this.ctx = canvas.get(0).getContext("2d");
			canvas.appendTo($("body"));
		},

		fillPixel: function fillPixel(x, y, colour) {
			this.ctx.fillStyle = colour;
			var ps = this.pixelScale;
			this.ctx.fillRect(x * ps, y * ps, ps, ps);
		},

		init: function init(size) {
			this.size = size;
			this.stick = []
			for(var i = 0; i < size * size; i++) {
				this.stick.push(0);
			}
		},

		render: function render(size) {
			for(var y = 0; y < this.size; y++) {
				for(var x = 0; x < this.size; x++) {
					var val = this.getTile(x,y);
					var colour;
					if (val === 1) {
						colour = "#33adff";
					} else if (val === 0) {
						colour = "#000000";
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

	var viewWidth = $(window).width();
	var pixelScale = 1;
	pattern.pixelScale =pixelScale;
	pattern.h = pattern.w = viewWidth;
	pattern.build();
	pattern.init(viewWidth / pixelScale);
	circular.writePattern();
	circular.render();
}) ()
