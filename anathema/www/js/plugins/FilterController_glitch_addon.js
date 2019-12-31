(function() {
	"use strict";

	Filter_Controller.filterNameMap["glitch"] = PIXI.filters.GlitchFilter;
	Filter_Controller.defaultFilterParam["glitch"] = [
		10, // slices, 2 - 20
		100, // offset, -400 - 400
		0 // direction, -180 - 180
	]

	Filter_Controller.updateFilterHandler["glitch"] = function(filter, params) {
		filter.slices = params[0];
		filter.offset = params[1];
		filter.direction = params[2];
	}

	Filter_Controller.filterSpecialInit["glitch"] = function(filter) {
		filter.fillMode = 2 // TRANSPARENT, ORIGINAL, LOOP, CLAMP, MIRROR
		filter.red = [2, 2];
		filter.blue = [10, -4];
		filter.green = [-10, 4];
		filter.sampleSize = 512; // Displacement map resolution
	}
})();