// Configure text plugin, that allows to load HTML files
require.config({
    paths: {
        text: "../lib/text"
    }
});

// Load the independent application presenters
require([
    "./presenter/details.js",
    "./presenter/search"
]);
