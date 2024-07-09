module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		jshint: {
			options: {
				reporter: require("jshint-stylish"),
				esversion: 6,
			},
			target: ["src/**/*.jsx"],
		},

		exec: {
			build: "npm run build",
		},
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-exec");

	grunt.registerTask("default", ["jshint", "exec:build"]);
};
