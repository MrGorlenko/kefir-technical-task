module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		eslint: {
			options: {
				overrideConfigFile: ".eslintrc.js",
			},
			target: ["src/**/*.{js,jsx,ts,tsx}"],
		},

		exec: {
			build: "npm run build",
		},
	});

	grunt.loadNpmTasks("grunt-eslint");
	grunt.loadNpmTasks("grunt-exec");

	grunt.registerTask("default", ["eslint", "exec:build"]);
};
