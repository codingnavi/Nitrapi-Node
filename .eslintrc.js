module.exports = {
    "env": {
        "node": true,
	"es6": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            2,
            {
	     "SwitchCase": 1
    	    }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
	"eqeqeq": 2,
	"space-before-function-paren": 2,
	"keyword-spacing": 2,
	"eol-last": 2,
	"no-trailing-spaces": 2,
	"padded-blocks": [
		2,
		"never"],

	// set to 1 for finding errors?
	"no-console": 0,
	"no-unused-vars": 0
	


    }
};
