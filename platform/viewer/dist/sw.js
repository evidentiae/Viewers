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
workbox.precaching.precacheAndRoute([{"revision":"cbd2ea6cbc47fc137409444ed496677c","url":"/0.bundle.1c465a46364dad4449c9.js"},{"revision":"5bd474e145fe51c28b1f2044ce71653b","url":"/1.ad1caeb1b993ebfa28f9.css"},{"revision":"37c6b1e97da96446a8c1dfb903184661","url":"/15.ad1caeb1b993ebfa28f9.css"},{"revision":"5b4892f8f0e2107f5791d8c45e8d59a4","url":"/15.bundle.e1c8f7b7e52b87ccf11e.js"},{"revision":"45fd28f3939afc67b44da2b855590b5d","url":"/16.bundle.536ceb087441654e7a48.js"},{"revision":"2625d1e558407a60e7b9a096615ba423","url":"/17.ad1caeb1b993ebfa28f9.css"},{"revision":"4a47e61087db47d6f0e5be70f2d9a8bc","url":"/17.bundle.cfa22c5811a8b3674e3a.js"},{"revision":"a077ced735cd0dda387fa23756b4a56d","url":"/18.bundle.9ac39b8c672c6748f0f2.js"},{"revision":"b9ef19c9219dc279d74c34fa3da4ea5c","url":"/19.bundle.f419fb5f8086eaf9530a.js"},{"revision":"41978920fd44d47a15c6f2df5aa8b045","url":"/20.bundle.0458ea8714084c0ffaf0.js"},{"revision":"0731d3258f53b657979535b290f4c7a3","url":"/8.ad1caeb1b993ebfa28f9.css"},{"revision":"260f7b0ecd47a2d3473d498bf9653b59","url":"/9.ad1caeb1b993ebfa28f9.css"},{"revision":"6597ec323475d5f86b76ed343733d982","url":"/CallbackPage.bundle.5c8d0f9fffe1632526a8.js"},{"revision":"2cbbf64481022d98c0a5351b0aefaeb4","url":"/ConnectedStandaloneRouting.bundle.d3293d1ac5d3c4ef7b00.js"},{"revision":"d4476cc254df3bfa520ad63b0fe5ab83","url":"/ConnectedStandaloneRouting~DentalViewerRouting~IHEInvokeImageDisplay~ViewerLocalFileData~ViewerRouting.bundle.7de119dc6fe682e8e7fa.js"},{"revision":"e3ff15e08a9ac617bca0fff73ea19a76","url":"/DentalViewerRouting.bundle.1e4bd306531f807c3333.js"},{"revision":"5dc38775f267e2d129579e8ff94bd452","url":"/DentalViewerRouting~ViewerRouting.bundle.fe079dc5caf72a0c5928.js"},{"revision":"47b75f5f26a709c524f493b55db9348f","url":"/IHEInvokeImageDisplay.bundle.d22bcbbaefd4a7fdfc9d.js"},{"revision":"12f466df2bc4b92fdc0352958f7e6431","url":"/StudyListRouting.bundle.36b7d7aacdf04461d400.js"},{"revision":"9738d14cb4031e3a8edd6f7141f5fbf7","url":"/ViewerLocalFileData.bundle.12cf646392b81a8102bb.js"},{"revision":"bd91511bca56cd7c24c10aeeebb09d43","url":"/ViewerRouting.bundle.7ecffd5018ce2b3f370e.js"},{"revision":"e442bc1a1370f6692e79ae52ab17d2cb","url":"/app-config.js"},{"revision":"c71a06ef96c7a1944c1e1c7b9e663f79","url":"/app.ad1caeb1b993ebfa28f9.css"},{"revision":"473e74a795f5a95dcfba304960bbcdf8","url":"/assets/Button_File.svg"},{"revision":"271da60b435c1445580caab72e656818","url":"/assets/Button_Folder.svg"},{"revision":"cb4f64534cdf8dd88f1d7219d44490db","url":"/assets/android-chrome-144x144.png"},{"revision":"5cde390de8a619ebe55a669d2ac3effd","url":"/assets/android-chrome-192x192.png"},{"revision":"e7466a67e90471de05401e53b8fe20be","url":"/assets/android-chrome-256x256.png"},{"revision":"9bbe9b80156e930d19a4e1725aa9ddae","url":"/assets/android-chrome-36x36.png"},{"revision":"5698b2ac0c82fe06d84521fc5482df04","url":"/assets/android-chrome-384x384.png"},{"revision":"56bef3fceec344d9747f8abe9c0bba27","url":"/assets/android-chrome-48x48.png"},{"revision":"3e8b8a01290992e82c242557417b0596","url":"/assets/android-chrome-512x512.png"},{"revision":"517925e91e2ce724432d296b687d25e2","url":"/assets/android-chrome-72x72.png"},{"revision":"4c3289bc690f8519012686888e08da71","url":"/assets/android-chrome-96x96.png"},{"revision":"cf464289183184df09292f581df0fb4f","url":"/assets/apple-touch-icon-1024x1024.png"},{"revision":"0857c5282c594e4900e8b31e3bade912","url":"/assets/apple-touch-icon-114x114.png"},{"revision":"4208f41a28130a67e9392a9dfcee6011","url":"/assets/apple-touch-icon-120x120.png"},{"revision":"cb4f64534cdf8dd88f1d7219d44490db","url":"/assets/apple-touch-icon-144x144.png"},{"revision":"977d293982af7e9064ba20806b45cf35","url":"/assets/apple-touch-icon-152x152.png"},{"revision":"6de91b4d2a30600b410758405cb567b4","url":"/assets/apple-touch-icon-167x167.png"},{"revision":"87bff140e3773bd7479a620501c4aa5c","url":"/assets/apple-touch-icon-180x180.png"},{"revision":"647386c34e75f1213830ea9a38913525","url":"/assets/apple-touch-icon-57x57.png"},{"revision":"0c200fe83953738b330ea431083e7a86","url":"/assets/apple-touch-icon-60x60.png"},{"revision":"517925e91e2ce724432d296b687d25e2","url":"/assets/apple-touch-icon-72x72.png"},{"revision":"c9989a807bb18633f6dcf254b5b56124","url":"/assets/apple-touch-icon-76x76.png"},{"revision":"87bff140e3773bd7479a620501c4aa5c","url":"/assets/apple-touch-icon-precomposed.png"},{"revision":"87bff140e3773bd7479a620501c4aa5c","url":"/assets/apple-touch-icon.png"},{"revision":"05fa74ea9c1c0c3931ba96467999081d","url":"/assets/apple-touch-startup-image-1182x2208.png"},{"revision":"9e2cd03e1e6fd0520eea6846f4278018","url":"/assets/apple-touch-startup-image-1242x2148.png"},{"revision":"5591e3a1822cbc8439b99c1a40d53425","url":"/assets/apple-touch-startup-image-1496x2048.png"},{"revision":"337de578c5ca04bd7d2be19d24d83821","url":"/assets/apple-touch-startup-image-1536x2008.png"},{"revision":"cafb4ab4eafe6ef946bd229a1d88e7de","url":"/assets/apple-touch-startup-image-320x460.png"},{"revision":"d9bb9e558d729eeac5efb8be8d6111cc","url":"/assets/apple-touch-startup-image-640x1096.png"},{"revision":"038b5b02bac8b82444bf9a87602ac216","url":"/assets/apple-touch-startup-image-640x920.png"},{"revision":"2177076eb07b1d64d663d7c03268be00","url":"/assets/apple-touch-startup-image-748x1024.png"},{"revision":"4fc097443815fe92503584c4bd73c630","url":"/assets/apple-touch-startup-image-750x1294.png"},{"revision":"2e29914062dce5c5141ab47eea2fc5d9","url":"/assets/apple-touch-startup-image-768x1004.png"},{"revision":"f692ec286b3a332c17985f4ed38b1076","url":"/assets/browserconfig.xml"},{"revision":"f3d9a3b647853c45b0e132e4acd0cc4a","url":"/assets/coast-228x228.png"},{"revision":"533ba1dcac7b716dec835a2fae902860","url":"/assets/favicon-16x16.png"},{"revision":"783e9edbcc23b8d626357ca7101161e0","url":"/assets/favicon-32x32.png"},{"revision":"0711f8e60267a1dfc3aaf1e3818e7185","url":"/assets/favicon.ico"},{"revision":"5df2a5b0cee399ac0bc40af74ba3c2cb","url":"/assets/firefox_app_128x128.png"},{"revision":"11fd9098c4b07c8a07e1d2a1e309e046","url":"/assets/firefox_app_512x512.png"},{"revision":"27cddfc922dca3bfa27b4a00fc2f5e36","url":"/assets/firefox_app_60x60.png"},{"revision":"2017d95fae79dcf34b5a5b52586d4763","url":"/assets/manifest.webapp"},{"revision":"cb4f64534cdf8dd88f1d7219d44490db","url":"/assets/mstile-144x144.png"},{"revision":"334895225e16a7777e45d81964725a97","url":"/assets/mstile-150x150.png"},{"revision":"e295cca4af6ed0365cf7b014d91b0e9d","url":"/assets/mstile-310x150.png"},{"revision":"cbefa8c42250e5f2443819fe2c69d91e","url":"/assets/mstile-310x310.png"},{"revision":"aa411a69df2b33a1362fa38d1257fa9d","url":"/assets/mstile-70x70.png"},{"revision":"5609af4f69e40e33471aee770ea1d802","url":"/assets/yandex-browser-50x50.png"},{"revision":"cfea70d7ddc8f06f276ea0c85c4b2adf","url":"/assets/yandex-browser-manifest.json"},{"revision":"0ca44a1b8719e835645ffa804a9d1395","url":"/es6-shim.min.js"},{"revision":"e442bc1a1370f6692e79ae52ab17d2cb","url":"/google.js"},{"revision":"acdd1aacd079bfceef72b3bacec4e5c9","url":"/index.html"},{"revision":"4e41fd55c08031edf19119a1df1a0538","url":"/init-service-worker.js"},{"revision":"870f848acf5470b2cf369f6604fac737","url":"/manifest.json"},{"revision":"754d698a7b334af57c00f29723fd9751","url":"/oidc-client.min.js"},{"revision":"d05a380d50b74e629738ae6f62fb7e78","url":"/polyfill.min.js"},{"revision":"f528b6861c82ee4415fce0821fd695c1","url":"/silent-refresh.html"},{"revision":"67a9d557a640a41cc707c4fdd1b23df7","url":"/vendors~ConnectedStandaloneRouting~DentalViewerRouting~IHEInvokeImageDisplay~ViewerLocalFileData~Vie~7c275954.bundle.cbab0d2e081e3d69dc34.js"},{"revision":"1cdb6619fc09b190c53abad53a32e7ce","url":"/vendors~ViewerLocalFileData.bundle.3a2af65b39a706be8c50.js"},{"revision":"5469cc243b45dc1946ca5dbda34208b3","url":"/vendors~dicom-microscopy-viewer.bundle.5cb69150b222803a84e3.js"}]); // TODO: Cache API
// https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/cache-api
// Store DICOMs?
// Clear Service Worker cache?
// navigator.storage.estimate().then(est => console.log(est)); (2GB?)

/***/ })
/******/ ]);