// ==UserScript==
// @id hello-iitc
// @name IITC Plugin: Hello World
// @category Misc
// @version 0.0.1
// @namespace https://tempuri.org/iitc/hello
// @description Hello, World plugin for IITC
// @include        https://*.ingress.com/intel*
// @include        http://*.ingress.com/intel*
// @match          https://*.ingress.com/intel*
// @match          http://*.ingress.com/intel*
// @grant none

// ==/UserScript==
// Wrapper function that will be stringified and injected
// into the document. Because of this, normal closure rules
// do not apply here.
function wrapper(plugin_info) {
    if(typeof window.plugin !== 'function') window.plugin = function() {};

    // PLUGIN START ////////////////////////////////

    plugin_info.buildName = 'hello';
    plugin_info.dateTimeVersion = '20150829103500';
    plugin_info.pluginId = 'hello';

    // The entry point for this plugin.
    function setup() {
        alert('Hello, IITC!');
    }

    setup.info = plugin_info; // Add an info property for IITC's plugin system
    if (!window.bootPlugins) window.bootPlugins = []; // Make sure window.bootPlugins exists and is an array
    // Add our startup hook
    window.bootPlugins.push(setup);
    // If IITC has already booted, immediately run the 'setup' function
    if (window.iitcLoaded && typeof setup === 'function') setup();
}

// PLUGIN END //////////////////////////////////////////////////

// Create a script element to hold our content script
let script = document.createElement('script');
let info = {};
// GM_info is defined by the assorted monkey-themed browser extensions
// and holds information parsed from the script header.
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) {
    info.script = {
        version: GM_info.script.version,
        name: GM_info.script.name,
        description: GM_info.script.description
    };
}

// Create a text node and our IIFE inside of it
let textContent = document.createTextNode('('+ wrapper +')('+ JSON.stringify(info) +')˓→');
// Add some content to the script element
script.appendChild(textContent);
// Finally, inject it... wherever.
(document.body || document.head || document.documentElement).appendChild(script);
