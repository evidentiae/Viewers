(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{1013:function(e,t,r){"use strict";function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(r,!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t,r,n,o,a,s){try{var c=e[a](s),i=c.value}catch(e){return void r(e)}c.done?t(i):Promise.resolve(i).then(n,o)}function c(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var a=e.apply(t,r);function c(e){s(a,n,o,c,i,"next",e)}function i(e){s(a,n,o,c,i,"throw",e)}c(void 0)}))}}function i(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var u=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,r,n,a,s,u,l,p;return t=e,(r=[{key:"setAccessToken",value:function(e){e||console.error("Access token is empty"),this.accessToken=e}},{key:"getUrlBaseDicomWeb",value:function(e,t,r,n){return this.urlBase+"/projects/".concat(e,"/locations/").concat(t,"/datasets/").concat(r,"/dicomStores/").concat(n,"/dicomWeb")}},{key:"getUrlPath",value:function(e,t,r,n){"/projects/".concat(e,"/locations/").concat(t,"/datasets/").concat(r,"/dicomStores/").concat(n)}},{key:"doRequest",value:(p=c(regeneratorRuntime.mark((function e(t){var r,n,a,s,c,i,u,l=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=l.length>1&&void 0!==l[1]?l[1]:{},n=l.length>2&&void 0!==l[2]?l[2]:{},a=new URL(t),s=null,a.search=new URLSearchParams(n),e.prev=5,e.next=8,fetch(a,o({},this.fetchConfig,{config:r}));case 8:return c=e.sent,e.prev=9,e.next=12,c.json();case 12:s=e.sent,e.next=17;break;case 15:e.prev=15,e.t0=e.catch(9);case 17:if(!(c.status>=200&&c.status<300&&null!=s)){e.next=27;break}if(null==s.nextPageToken){e.next=24;break}return n.pageToken=s.nextPageToken,e.next=22,this.doRequest(t,r,n);case 22:for(u in i=e.sent,s)s.hasOwnProperty(u)&&(s[u]=s[u].concat(i.data[u]));case 24:return e.abrupt("return",{isError:!1,status:c.status,data:s});case 27:return e.abrupt("return",{isError:!0,status:c.status,message:s&&s.error&&s.error.message||"Unknown error"});case 28:e.next=35;break;case 30:if(e.prev=30,e.t1=e.catch(5),!s||!s.error){e.next=34;break}return e.abrupt("return",{isError:!0,status:e.t1.status,message:e.t1.response.data.error.message||"Unspecified error"});case 34:return e.abrupt("return",{isError:!0,message:e.t1&&e.t1.message||"Oops! Something went wrong"});case 35:case"end":return e.stop()}}),e,this,[[5,30],[9,15]])}))),function(e){return p.apply(this,arguments)})},{key:"loadProjects",value:(l=c(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.doRequest("https://cloudresourcemanager.googleapis.com/v1/projects"));case 1:case"end":return e.stop()}}),e,this)}))),function(){return l.apply(this,arguments)})},{key:"loadLocations",value:(u=c(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.doRequest("".concat(this.urlBaseProject,"/").concat(t,"/locations")));case 1:case"end":return e.stop()}}),e,this)}))),function(e){return u.apply(this,arguments)})},{key:"loadDatasets",value:(s=c(regeneratorRuntime.mark((function e(t,r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.doRequest("".concat(this.urlBaseProject,"/").concat(t,"/locations/").concat(r,"/datasets")));case 1:case"end":return e.stop()}}),e,this)}))),function(e,t){return s.apply(this,arguments)})},{key:"loadDicomStores",value:(a=c(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.doRequest("".concat(this.urlBase,"/").concat(t,"/dicomStores")));case 1:case"end":return e.stop()}}),e,this)}))),function(e){return a.apply(this,arguments)})},{key:"fetchConfig",get:function(){var e=this.accessToken||window.access_token;if(e)throw new Error("OIDC access_token is not set");return{method:"GET",headers:{Authorization:"Bearer "+e}}}},{key:"urlBase",get:function(){return this.healthcareApiEndpoint||"https://healthcare.googleapis.com/v1beta1"},set:function(e){this.healthcareApiEndpoint=e}},{key:"urlBaseProject",get:function(){return this.urlBase+"/projects"}}])&&i(t.prototype,r),n&&i(t,n),e}();t.a=new u},1021:function(e,t,r){"use strict";r.d(t,"a",(function(){return n})),r.d(t,"c",(function(){return o})),r.d(t,"b",(function(){return a}));var n=function(e,t){var r=e.wadoUriRoot,n=e.qidoRoot,o=e.wadoRoot,a=e.dataset,s=void 0===a?"":a,c=e.dicomStore,i=void 0===c?"":c,u=e.location,l=void 0===u?"":u,p=e.project;return[{name:t,dataset:s,dicomStore:i,location:l,project:void 0===p?"":p,imageRendering:"wadors",thumbnailRendering:"wadors",type:"dicomWeb",active:!0,wadoUriRoot:r,qidoRoot:n,wadoRoot:o,supportsFuzzyMatching:!1,qidoSupportsIncludeField:!1}]},o=function(e){return e&&!!e.dataset&&!!e.dicomStore&&!!e.location&&!!e.project},a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=Object.keys(e).length,n=Object.keys(t).length;return!(!r||!n)&&(e.dataset===t.dataset&&e.dataset===t.dataset&&e.dicomStore===t.dicomStore&&e.location===t.location&&e.project===t.project)}},1034:function(e,t,r){"use strict";r.d(t,"a",(function(){return h}));var n=r(0),o=r(1013),a=r(1017),s=r(1021),c=r(58),i=(r(228),r(76)),u=function(e){return e&&e.servers&&e.servers.find((function(e){return!0===e.active}))},l=function(e,t,r,n,a){var c=[];if(e.enableGoogleCloudAdapter){o.a.urlBase=e.healthcareApiEndpoint;var i=o.a.getUrlBaseDicomWeb(t,r,n,a),u={project:t,location:r,dataset:n,dicomStore:a,wadoUriRoot:i,qidoRoot:i,wadoRoot:i};if(c=s.a(u,a),!p(c[0],e))return}return c},p=function(e,t){return t.enableGoogleCloudAdapter?s.c(e):!!e},d=function(e,t){e({type:"SET_SERVERS",servers:t})},f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,r=arguments.length>2?arguments[2]:void 0,n=arguments.length>3?arguments[3]:void 0,o=arguments.length>4?arguments[4]:void 0;arguments.length>5&&arguments[5],arguments.length>6&&arguments[6],arguments.length>7&&arguments[7],arguments.length>8&&arguments[8];if(!o.enableGoogleCloudAdapter)return!1;var a=t!==e&&t;if(a)return!1;if(!n||!n.length)return!1;if(!e.length||!r)return!0;var c=n[0],i=e.some(s.b.bind(void 0,c));return!i};function h(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.project,r=e.location,o=e.dataset,s=e.dicomStore,h=Object(c.d)((function(e){return e&&e.servers})),g=Object(a.a)(h),v=Object(c.c)(),m=Object(n.useContext)(i.c).appConfig,b=void 0===m?{}:m,w=u(h),y=l(b,t,r,o,s)||[];if(f(h.servers,g,w,y,b,t,r,o,s))d(v,y);else if(p(w,b))return w}},997:function(e,t,r){"use strict";r.r(t);var n=r(0),o=r.n(n),a=r(1),s=r.n(a),c=r(133),i=r(41),u=r(1040),l=r(1034),p=r(75),d=function(){return new URLSearchParams(Object(p.f)().search)},f=c.a.urlUtil,h=function(e,t){var r=f.queryString.getQueryFilters(t),n=r&&r.seriesInstanceUID,o=e||n;return f.paramString.parseParam(o)};function g(e){var t=e.match,r=e.location,n=t.params,a=n.project,s=n.location,c=n.dataset,p=n.dicomStore,g=n.studyInstanceUIDs,v=n.seriesInstanceUIDs,m=d().get("token");m&&(i.a.getAccessToken=function(){return m});var b=Object(l.a)({project:a,location:s,dataset:c,dicomStore:p}),w=f.paramString.parseParam(g),y=h(v,r);return b&&w?o.a.createElement(u.a,{studyInstanceUIDs:w,seriesInstanceUIDs:y}):null}g.propTypes={match:s.a.shape({params:s.a.shape({studyInstanceUIDs:s.a.string.isRequired,seriesInstanceUIDs:s.a.string,dataset:s.a.string,dicomStore:s.a.string,location:s.a.string,project:s.a.string})}),location:s.a.any};t.default=g}}]);
//# sourceMappingURL=ViewerRouting.bundle.b62aa5584f4fe56ecf1f.js.map