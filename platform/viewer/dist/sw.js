!function(e){var t={};function o(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/",o(o.s=0)}([function(e,t){importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.0.0-beta.1/workbox-sw.js"),workbox.core.skipWaiting(),workbox.core.clientsClaim(),workbox.routing.registerRoute(/\.(?:js|css)$/,new workbox.strategies.StaleWhileRevalidate({cacheName:"static-resources"})),workbox.routing.registerRoute(/^https:\/\/fonts\.googleapis\.com/,new workbox.strategies.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets"})),workbox.routing.registerRoute(/^https:\/\/fonts\.gstatic\.com/,new workbox.strategies.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new workbox.cacheableResponse.CacheableResponsePlugin({statuses:[0,200]}),new workbox.expiration.ExpirationPlugin({maxAgeSeconds:31536e3,maxEntries:30})]})),self.addEventListener("message",(function(e){if(e.data&&"SKIP_WAITING"===e.data.type)switch(e.data.type){case"SKIP_WAITING":break;default:console.warn("SW: Invalid message type: ".concat(e.data.type))}})),workbox.precaching.precacheAndRoute([{"revision":"c8306b92012c54bec0203a364e22d91c","url":"/0.71203ea6a158b1dcb6ed.css"},{"revision":"32d47685c0de61e7b7bb4513a5cd1412","url":"/1.bundle.bf3f9d1383e02b91afd9.js"},{"revision":"c307d458d54c9e1524984b0ae1f3e612","url":"/1.bundle.bf3f9d1383e02b91afd9.js.LICENSE"},{"revision":"f7ef3697b0d501b31255b988ad87b2ec","url":"/13.bundle.1a9fe1db39ab30c987de.js"},{"revision":"2ae9dab2b7458fc3693bb3986f0b5a18","url":"/13.bundle.1a9fe1db39ab30c987de.js.LICENSE"},{"revision":"4173d6a1c6b5bc7b9f401db0ceafddae","url":"/14.71203ea6a158b1dcb6ed.css"},{"revision":"703ccce6af4d941489fcd34156def301","url":"/14.bundle.c4eeef34f657b8fd2142.js"},{"revision":"1e9ce4e72db9a3ebe58f2a1a81c4af00","url":"/15.bundle.5126b8c98e199e17e396.js"},{"revision":"d180b8d8f9f4a9944460bc9e9be1128c","url":"/16.71203ea6a158b1dcb6ed.css"},{"revision":"b70eaabd0c76277d94b09c0248869dd7","url":"/16.bundle.b6e03430900ab23418f3.js"},{"revision":"239066ec74cb7bbbf41af1c33a7806db","url":"/17.bundle.841b124284a33ae8c99a.js"},{"revision":"dc08816e75b96564f6643ea92b6d1e3c","url":"/18.bundle.032658928997dc85a4d2.js"},{"revision":"8edfd9f86c5c058affbe74422f2707b4","url":"/19.bundle.85244d094e2b24424790.js"},{"revision":"3fc6ff4c81cd6a523bee927348ab17ad","url":"/19.bundle.85244d094e2b24424790.js.LICENSE"},{"revision":"6d71db6ec70a0e0c9f93f95f3ab3b305","url":"/3.71203ea6a158b1dcb6ed.css"},{"revision":"a0828c79df7c85c230ecc999cf7c6247","url":"/7.71203ea6a158b1dcb6ed.css"},{"revision":"27b02800f077e6c56a0626134c64a651","url":"/8.71203ea6a158b1dcb6ed.css"},{"revision":"920b7a95617f5408d277800ea60e3804","url":"/CallbackPage.bundle.7953eb980e695129a978.js"},{"revision":"3c6751fbffb795f5ad71af18a846353e","url":"/ConnectedStandaloneRouting.bundle.ec8b61b4876c13358ca6.js"},{"revision":"6be5699fe1f7a7b751fd08e7e84e56ab","url":"/ConnectedStandaloneRouting~IHEInvokeImageDisplay~StudyListRouting~ViewerLocalFileData~ViewerRouting.bundle.77a4a4b480711bc20025.js"},{"revision":"4250709b6ede5775d60367f51a3f5aaa","url":"/ConnectedStandaloneRouting~IHEInvokeImageDisplay~ViewerRouting.bundle.0b5e8588eb8ecba600d2.js"},{"revision":"564fcd18de0862df008adc2c5cd770fc","url":"/IHEInvokeImageDisplay.bundle.1f7cdd6269e3532ea59f.js"},{"revision":"ad16ec5aaf77e21baf189382a4dc2bac","url":"/StudyListRouting.bundle.2e78dcce85c608cbf4e7.js"},{"revision":"8a7ef67bf24c68854479bcb329de6187","url":"/ViewerLocalFileData.bundle.05d2381b92d316c366d2.js"},{"revision":"0754859e33a072d063bc381c5e0c88b4","url":"/ViewerRouting.bundle.2420e13f846595e4244f.js"},{"revision":"e442bc1a1370f6692e79ae52ab17d2cb","url":"/app-config.js"},{"revision":"ffe548de5168b120684396ca573daf56","url":"/app.71203ea6a158b1dcb6ed.css"},{"revision":"65f14f3d1d8447d373f26380816f4f33","url":"/app.bundle.cba645eeb6470cc9908a.js.LICENSE"},{"revision":"473e74a795f5a95dcfba304960bbcdf8","url":"/assets/Button_File.svg"},{"revision":"271da60b435c1445580caab72e656818","url":"/assets/Button_Folder.svg"},{"revision":"cb4f64534cdf8dd88f1d7219d44490db","url":"/assets/android-chrome-144x144.png"},{"revision":"5cde390de8a619ebe55a669d2ac3effd","url":"/assets/android-chrome-192x192.png"},{"revision":"e7466a67e90471de05401e53b8fe20be","url":"/assets/android-chrome-256x256.png"},{"revision":"9bbe9b80156e930d19a4e1725aa9ddae","url":"/assets/android-chrome-36x36.png"},{"revision":"5698b2ac0c82fe06d84521fc5482df04","url":"/assets/android-chrome-384x384.png"},{"revision":"56bef3fceec344d9747f8abe9c0bba27","url":"/assets/android-chrome-48x48.png"},{"revision":"3e8b8a01290992e82c242557417b0596","url":"/assets/android-chrome-512x512.png"},{"revision":"517925e91e2ce724432d296b687d25e2","url":"/assets/android-chrome-72x72.png"},{"revision":"4c3289bc690f8519012686888e08da71","url":"/assets/android-chrome-96x96.png"},{"revision":"cf464289183184df09292f581df0fb4f","url":"/assets/apple-touch-icon-1024x1024.png"},{"revision":"0857c5282c594e4900e8b31e3bade912","url":"/assets/apple-touch-icon-114x114.png"},{"revision":"4208f41a28130a67e9392a9dfcee6011","url":"/assets/apple-touch-icon-120x120.png"},{"revision":"cb4f64534cdf8dd88f1d7219d44490db","url":"/assets/apple-touch-icon-144x144.png"},{"revision":"977d293982af7e9064ba20806b45cf35","url":"/assets/apple-touch-icon-152x152.png"},{"revision":"6de91b4d2a30600b410758405cb567b4","url":"/assets/apple-touch-icon-167x167.png"},{"revision":"87bff140e3773bd7479a620501c4aa5c","url":"/assets/apple-touch-icon-180x180.png"},{"revision":"647386c34e75f1213830ea9a38913525","url":"/assets/apple-touch-icon-57x57.png"},{"revision":"0c200fe83953738b330ea431083e7a86","url":"/assets/apple-touch-icon-60x60.png"},{"revision":"517925e91e2ce724432d296b687d25e2","url":"/assets/apple-touch-icon-72x72.png"},{"revision":"c9989a807bb18633f6dcf254b5b56124","url":"/assets/apple-touch-icon-76x76.png"},{"revision":"87bff140e3773bd7479a620501c4aa5c","url":"/assets/apple-touch-icon-precomposed.png"},{"revision":"87bff140e3773bd7479a620501c4aa5c","url":"/assets/apple-touch-icon.png"},{"revision":"05fa74ea9c1c0c3931ba96467999081d","url":"/assets/apple-touch-startup-image-1182x2208.png"},{"revision":"9e2cd03e1e6fd0520eea6846f4278018","url":"/assets/apple-touch-startup-image-1242x2148.png"},{"revision":"5591e3a1822cbc8439b99c1a40d53425","url":"/assets/apple-touch-startup-image-1496x2048.png"},{"revision":"337de578c5ca04bd7d2be19d24d83821","url":"/assets/apple-touch-startup-image-1536x2008.png"},{"revision":"cafb4ab4eafe6ef946bd229a1d88e7de","url":"/assets/apple-touch-startup-image-320x460.png"},{"revision":"d9bb9e558d729eeac5efb8be8d6111cc","url":"/assets/apple-touch-startup-image-640x1096.png"},{"revision":"038b5b02bac8b82444bf9a87602ac216","url":"/assets/apple-touch-startup-image-640x920.png"},{"revision":"2177076eb07b1d64d663d7c03268be00","url":"/assets/apple-touch-startup-image-748x1024.png"},{"revision":"4fc097443815fe92503584c4bd73c630","url":"/assets/apple-touch-startup-image-750x1294.png"},{"revision":"2e29914062dce5c5141ab47eea2fc5d9","url":"/assets/apple-touch-startup-image-768x1004.png"},{"revision":"f692ec286b3a332c17985f4ed38b1076","url":"/assets/browserconfig.xml"},{"revision":"f3d9a3b647853c45b0e132e4acd0cc4a","url":"/assets/coast-228x228.png"},{"revision":"533ba1dcac7b716dec835a2fae902860","url":"/assets/favicon-16x16.png"},{"revision":"783e9edbcc23b8d626357ca7101161e0","url":"/assets/favicon-32x32.png"},{"revision":"0711f8e60267a1dfc3aaf1e3818e7185","url":"/assets/favicon.ico"},{"revision":"5df2a5b0cee399ac0bc40af74ba3c2cb","url":"/assets/firefox_app_128x128.png"},{"revision":"11fd9098c4b07c8a07e1d2a1e309e046","url":"/assets/firefox_app_512x512.png"},{"revision":"27cddfc922dca3bfa27b4a00fc2f5e36","url":"/assets/firefox_app_60x60.png"},{"revision":"2017d95fae79dcf34b5a5b52586d4763","url":"/assets/manifest.webapp"},{"revision":"cb4f64534cdf8dd88f1d7219d44490db","url":"/assets/mstile-144x144.png"},{"revision":"334895225e16a7777e45d81964725a97","url":"/assets/mstile-150x150.png"},{"revision":"e295cca4af6ed0365cf7b014d91b0e9d","url":"/assets/mstile-310x150.png"},{"revision":"cbefa8c42250e5f2443819fe2c69d91e","url":"/assets/mstile-310x310.png"},{"revision":"aa411a69df2b33a1362fa38d1257fa9d","url":"/assets/mstile-70x70.png"},{"revision":"5609af4f69e40e33471aee770ea1d802","url":"/assets/yandex-browser-50x50.png"},{"revision":"cfea70d7ddc8f06f276ea0c85c4b2adf","url":"/assets/yandex-browser-manifest.json"},{"revision":"0ca44a1b8719e835645ffa804a9d1395","url":"/es6-shim.min.js"},{"revision":"e442bc1a1370f6692e79ae52ab17d2cb","url":"/google.js"},{"revision":"6cec2c4482a29e1b8b349a05262e8fe7","url":"/index.html"},{"revision":"4e41fd55c08031edf19119a1df1a0538","url":"/init-service-worker.js"},{"revision":"870f848acf5470b2cf369f6604fac737","url":"/manifest.json"},{"revision":"754d698a7b334af57c00f29723fd9751","url":"/oidc-client.min.js"},{"revision":"d05a380d50b74e629738ae6f62fb7e78","url":"/polyfill.min.js"},{"revision":"f528b6861c82ee4415fce0821fd695c1","url":"/silent-refresh.html"},{"revision":"d5eced6afd80746b5ce921e1665749e9","url":"/vendors~ConnectedStandaloneRouting~IHEInvokeImageDisplay~ViewerLocalFileData~ViewerRouting.bundle.89e327d13ab946b7019a.js"},{"revision":"fd5ec362bc6acd90e8ff94d3100cf652","url":"/vendors~ViewerLocalFileData.bundle.e605dcf8d96f3e7e8084.js"},{"revision":"92a86ea08928ef1d029d24e904e0e03b","url":"/vendors~dicom-microscopy-viewer.bundle.564ca74b6b2b1691f36e.js"},{"revision":"2de3eb75701d6cb3d4158adbb65e9f3e","url":"/vendors~dicom-microscopy-viewer.bundle.564ca74b6b2b1691f36e.js.LICENSE"}])}]);
//# sourceMappingURL=sw.js.map