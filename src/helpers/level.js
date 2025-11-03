export const MAP_LAYOUTS = {
	1: [
		"===========================",
		"=@ ?                   #  =",
		"=                         =",
		"=                         =",
		"= $            %          =",
		"=                         =",
		"=         $              $=",
		"===========================",
	],
	2: [
		"==========                           ",
		"=@       =                           ",
		"=        =           =====           ",
		"=        =           =   =           ",
		"=        =           = $ =           ",
		"=        =============   =========   ",
		"= $                              =   ",
		"=                                ====",
		"=                                   =",
		"=   #                             $ =",
		"=               $                ====",
		"==================================   ",
	],
};

const reset_data = {
	paused: false,
	fuse_held: 0,
	fuse_dropped: 0,
};

const level_data = {
	1: {
		fuse_needed: 3,
		ghost_interval: 5,
		ghost_lasts: 2,
	},
	2: {
		fuse_needed: 4,
		ghost_interval: 5,
		ghost_lasts: 3,
	},
};

export function getLevelData(level) {
	return { ...level_data[level], ...reset_data };
}
