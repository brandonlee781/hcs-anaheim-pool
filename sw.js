if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let t={};const c=e=>i(e,o),l={module:{uri:o},exports:t,require:c};s[o]=Promise.all(n.map((e=>l[e]||c(e)))).then((e=>(r(...e),t)))}}define(["./workbox-7369c0e1"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index.8f053249.js",revision:null},{url:"assets/index.c7247fcc.css",revision:null},{url:"assets/workbox-window.prod.es5.d2780aeb.js",revision:null},{url:"index.html",revision:"f42cf2445c52faa784dc9787e471aaa9"},{url:"apple-touch-icon.png",revision:"81ae88e8d13334af48025b8e36b86898"},{url:"mstile-150x150.png",revision:"7dcc6fd5b39d333c17cf4a4019753144"},{url:"safari-pinned-tab.svg",revision:"7de9b28ba705606ed75f528bedb0c54a"},{url:"manifest.webmanifest",revision:"cac6884d12bb659bca936bf2f1eb0f84"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
