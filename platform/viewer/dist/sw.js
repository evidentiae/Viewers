/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// https://developers.google.com/web/tools/workbox/guides/troubleshoot-and-debug
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0-beta.1/workbox-sw.js'); // Install newest
// https://developers.google.com/web/tools/workbox/modules/workbox-core

workbox.core.skipWaiting();
workbox.core.clientsClaim(); // Cache static assets that aren't precached

workbox.routing.registerRoute(/\.(?:js|css)$/, new workbox.strategies.StaleWhileRevalidate({
  cacheName: 'static-resources'
})); // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.

workbox.routing.registerRoute(/^https:\/\/fonts\.googleapis\.com/, new workbox.strategies.StaleWhileRevalidate({
  cacheName: 'google-fonts-stylesheets'
})); // Cache the underlying font files with a cache-first strategy for 1 year.

workbox.routing.registerRoute(/^https:\/\/fonts\.gstatic\.com/, new workbox.strategies.CacheFirst({
  cacheName: 'google-fonts-webfonts',
  plugins: [new workbox.cacheableResponse.CacheableResponsePlugin({
    statuses: [0, 200]
  }), new workbox.expiration.ExpirationPlugin({
    maxAgeSeconds: 60 * 60 * 24 * 365,
    // 1 Year
    maxEntries: 30
  })]
})); // MESSAGE HANDLER

self.addEventListener('message', function (event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    switch (event.data.type) {
      case 'SKIP_WAITING':
        // TODO: We'll eventually want this to be user prompted
        // workbox.core.skipWaiting();
        // workbox.core.clientsClaim();
        // TODO: Global notification to indicate incoming reload
        break;

      default:
        console.warn("SW: Invalid message type: ".concat(event.data.type));
    }
  }
});
workbox.precaching.precacheAndRoute([{"revision":"b421848d6d0a5602104f7c859ecb49e1","url":"/0.bundle.073ca4945766b798d189.js"},{"revision":"2c9732934f0fde20235b21ecebcc8c61","url":"/1.5e37c86b97aaedefbb78.css"},{"revision":"37c6b1e97da96446a8c1dfb903184661","url":"/15.5e37c86b97aaedefbb78.css"},{"revision":"b8292111042ebf2eb05d0c9fcd344d8d","url":"/15.bundle.433f953a7f616c64125f.js"},{"revision":"b5059456094d41386355d627ad129454","url":"/16.bundle.ceef69f6547f9a68de2e.js"},{"revision":"b276a11b31812f52a08c00b1e4b16e1e","url":"/17.5e37c86b97aaedefbb78.css"},{"revision":"2b62aacd9bd65ac4a8890e806b08b4b7","url":"/17.bundle.5b87831d01b97ba36f28.js"},{"revision":"2625d1e558407a60e7b9a096615ba423","url":"/18.5e37c86b97aaedefbb78.css"},{"revision":"8c4f0a590920fe80315212d31577e1bb","url":"/18.bundle.7e652464bd7e8e052c15.js"},{"revision":"10bc072525e6ce066de7a72e10e1e0d7","url":"/19.bundle.d779f4744c824bf3e7bb.js"},{"revision":"4ec4729a47f32fbaa314d7f3d819e1c8","url":"/20.bundle.b7540dfc39c53f762208.js"},{"revision":"0731d3258f53b657979535b290f4c7a3","url":"/8.5e37c86b97aaedefbb78.css"},{"revision":"260f7b0ecd47a2d3473d498bf9653b59","url":"/9.5e37c86b97aaedefbb78.css"},{"revision":"07470775f79e334b419aee5b29b2b21e","url":"/CallbackPage.bundle.415f2904d2569eb031de.js"},{"revision":"da0469fb5d4b6dc9007a412673d108c3","url":"/ConnectedStandaloneRouting.bundle.ed721255fc36de716050.js"},{"revision":"3b44f72c3ad77e62ec6f8c67b6a9c0a1","url":"/ConnectedStandaloneRouting~DentalViewerRouting~IHEInvokeImageDisplay~ViewerLocalFileData~ViewerRouting.bundle.7209e2521c01936d1a88.js"},{"revision":"b93cefed577fe19fd62c9f37776449b2","url":"/DentalViewerRouting.bundle.2902c3d56720089a2a43.js"},{"revision":"41d79af1847714b12e5944fc0b0b010c","url":"/DentalViewerRouting~ViewerRouting.bundle.2159e4e84a2ba676740c.js"},{"revision":"f014e50913329bf5719b63d7ee09f852","url":"/IHEInvokeImageDisplay.bundle.3eaebf1455e565b0fd68.js"},{"revision":"58811be9934c6ff79a916a73af19ad04","url":"/StudyListRouting.bundle.b659ecc47486f0476fd8.js"},{"revision":"3e2507a64635206d3ab16a3d335ebf61","url":"/ViewerLocalFileData.bundle.f008e818c55f3bd66291.js"},{"revision":"5f345a953d2b37e5d2ea037bbac0d6c6","url":"/ViewerRouting.bundle.865bb9867475e9bb64ec.js"},{"revision":"aa91819bea699fdc736a6f1204e9fe14","url":"/app-config.js"},{"revision":"772f65ffaffb923983f426d9f8813399","url":"/app.5e37c86b97aaedefbb78.css"},{"revision":"473e74a795f5a95dcfba304960bbcdf8","url":"/assets/Button_File.svg"},{"revision":"271da60b435c1445580caab72e656818","url":"/assets/Button_Folder.svg"},{"revision":"cb4f64534cdf8dd88f1d7219d44490db","url":"/assets/android-chrome-144x144.png"},{"revision":"5cde390de8a619ebe55a669d2ac3effd","url":"/assets/android-chrome-192x192.png"},{"revision":"e7466a67e90471de05401e53b8fe20be","url":"/assets/android-chrome-256x256.png"},{"revision":"9bbe9b80156e930d19a4e1725aa9ddae","url":"/assets/android-chrome-36x36.png"},{"revision":"5698b2ac0c82fe06d84521fc5482df04","url":"/assets/android-chrome-384x384.png"},{"revision":"56bef3fceec344d9747f8abe9c0bba27","url":"/assets/android-chrome-48x48.png"},{"revision":"3e8b8a01290992e82c242557417b0596","url":"/assets/android-chrome-512x512.png"},{"revision":"517925e91e2ce724432d296b687d25e2","url":"/assets/android-chrome-72x72.png"},{"revision":"4c3289bc690f8519012686888e08da71","url":"/assets/android-chrome-96x96.png"},{"revision":"cf464289183184df09292f581df0fb4f","url":"/assets/apple-touch-icon-1024x1024.png"},{"revision":"0857c5282c594e4900e8b31e3bade912","url":"/assets/apple-touch-icon-114x114.png"},{"revision":"4208f41a28130a67e9392a9dfcee6011","url":"/assets/apple-touch-icon-120x120.png"},{"revision":"cb4f64534cdf8dd88f1d7219d44490db","url":"/assets/apple-touch-icon-144x144.png"},{"revision":"977d293982af7e9064ba20806b45cf35","url":"/assets/apple-touch-icon-152x152.png"},{"revision":"6de91b4d2a30600b410758405cb567b4","url":"/assets/apple-touch-icon-167x167.png"},{"revision":"87bff140e3773bd7479a620501c4aa5c","url":"/assets/apple-touch-icon-180x180.png"},{"revision":"647386c34e75f1213830ea9a38913525","url":"/assets/apple-touch-icon-57x57.png"},{"revision":"0c200fe83953738b330ea431083e7a86","url":"/assets/apple-touch-icon-60x60.png"},{"revision":"517925e91e2ce724432d296b687d25e2","url":"/assets/apple-touch-icon-72x72.png"},{"revision":"c9989a807bb18633f6dcf254b5b56124","url":"/assets/apple-touch-icon-76x76.png"},{"revision":"87bff140e3773bd7479a620501c4aa5c","url":"/assets/apple-touch-icon-precomposed.png"},{"revision":"87bff140e3773bd7479a620501c4aa5c","url":"/assets/apple-touch-icon.png"},{"revision":"05fa74ea9c1c0c3931ba96467999081d","url":"/assets/apple-touch-startup-image-1182x2208.png"},{"revision":"9e2cd03e1e6fd0520eea6846f4278018","url":"/assets/apple-touch-startup-image-1242x2148.png"},{"revision":"5591e3a1822cbc8439b99c1a40d53425","url":"/assets/apple-touch-startup-image-1496x2048.png"},{"revision":"337de578c5ca04bd7d2be19d24d83821","url":"/assets/apple-touch-startup-image-1536x2008.png"},{"revision":"cafb4ab4eafe6ef946bd229a1d88e7de","url":"/assets/apple-touch-startup-image-320x460.png"},{"revision":"d9bb9e558d729eeac5efb8be8d6111cc","url":"/assets/apple-touch-startup-image-640x1096.png"},{"revision":"038b5b02bac8b82444bf9a87602ac216","url":"/assets/apple-touch-startup-image-640x920.png"},{"revision":"2177076eb07b1d64d663d7c03268be00","url":"/assets/apple-touch-startup-image-748x1024.png"},{"revision":"4fc097443815fe92503584c4bd73c630","url":"/assets/apple-touch-startup-image-750x1294.png"},{"revision":"2e29914062dce5c5141ab47eea2fc5d9","url":"/assets/apple-touch-startup-image-768x1004.png"},{"revision":"f692ec286b3a332c17985f4ed38b1076","url":"/assets/browserconfig.xml"},{"revision":"f3d9a3b647853c45b0e132e4acd0cc4a","url":"/assets/coast-228x228.png"},{"revision":"533ba1dcac7b716dec835a2fae902860","url":"/assets/favicon-16x16.png"},{"revision":"783e9edbcc23b8d626357ca7101161e0","url":"/assets/favicon-32x32.png"},{"revision":"0711f8e60267a1dfc3aaf1e3818e7185","url":"/assets/favicon.ico"},{"revision":"5df2a5b0cee399ac0bc40af74ba3c2cb","url":"/assets/firefox_app_128x128.png"},{"revision":"11fd9098c4b07c8a07e1d2a1e309e046","url":"/assets/firefox_app_512x512.png"},{"revision":"27cddfc922dca3bfa27b4a00fc2f5e36","url":"/assets/firefox_app_60x60.png"},{"revision":"2017d95fae79dcf34b5a5b52586d4763","url":"/assets/manifest.webapp"},{"revision":"cb4f64534cdf8dd88f1d7219d44490db","url":"/assets/mstile-144x144.png"},{"revision":"334895225e16a7777e45d81964725a97","url":"/assets/mstile-150x150.png"},{"revision":"e295cca4af6ed0365cf7b014d91b0e9d","url":"/assets/mstile-310x150.png"},{"revision":"cbefa8c42250e5f2443819fe2c69d91e","url":"/assets/mstile-310x310.png"},{"revision":"aa411a69df2b33a1362fa38d1257fa9d","url":"/assets/mstile-70x70.png"},{"revision":"5609af4f69e40e33471aee770ea1d802","url":"/assets/yandex-browser-50x50.png"},{"revision":"cfea70d7ddc8f06f276ea0c85c4b2adf","url":"/assets/yandex-browser-manifest.json"},{"revision":"0ca44a1b8719e835645ffa804a9d1395","url":"/es6-shim.min.js"},{"revision":"aa91819bea699fdc736a6f1204e9fe14","url":"/google.js"},{"revision":"8b2a6c71c3556b4326164fc7ae15701b","url":"/index.html"},{"revision":"4e41fd55c08031edf19119a1df1a0538","url":"/init-service-worker.js"},{"revision":"870f848acf5470b2cf369f6604fac737","url":"/manifest.json"},{"revision":"754d698a7b334af57c00f29723fd9751","url":"/oidc-client.min.js"},{"revision":"d05a380d50b74e629738ae6f62fb7e78","url":"/polyfill.min.js"},{"revision":"f528b6861c82ee4415fce0821fd695c1","url":"/silent-refresh.html"},{"revision":"267b5af285da74f3cbaecc1ae0fc43fc","url":"/vendors~ConnectedStandaloneRouting~DentalViewerRouting~IHEInvokeImageDisplay~ViewerLocalFileData~Vie~7c275954.bundle.bc16ab4c8367ad13a5ee.js"},{"revision":"0cd34d09cf224441f7e1ac11ece54194","url":"/vendors~ViewerLocalFileData.bundle.c3bb026e3a2b008db79a.js"},{"revision":"11535e644dceba9e49ab9b730fd2a574","url":"/vendors~dicom-microscopy-viewer.bundle.f91851bda7e76d180159.js"}]); // TODO: Cache API
// https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/cache-api
// Store DICOMs?
// Clear Service Worker cache?
// navigator.storage.estimate().then(est => console.log(est)); (2GB?)

/***/ })
/******/ ]);