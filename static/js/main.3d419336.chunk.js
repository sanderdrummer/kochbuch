(this.webpackJsonpkochbuch=this.webpackJsonpkochbuch||[]).push([[0],{101:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(10),c=a.n(l),i=(a(93),a(14)),u=a(9),o=a(46),s=a(162),m=a(160),p=a(73),f=a(161),h=a(131),E=a(169),d=a(154),b=a(155),g=a(156),v=a(163),k=a(165),O=a(16),w=a.n(O),j=a(23),y=a(143),C=a(145),x=a(148),z=a(136),R=a(137),I=a(138),S=a(164),L=a(141),B=a(26),F=a(144),N=a(140),W=a(146),D=a(147),T=a(142),q=a(134);const A=Object(h.a)(e=>Object(E.a)({fab:{position:"fixed",bottom:e.spacing(8),right:e.spacing(2)}})),J=({onClick:e,label:t,children:a})=>{const n=A();return r.a.createElement(q.a,{onClick:e,className:n.fab,color:"primary","aria-label":t},a)};var V=a(51),M=a(70),P=a(71),U=a(74),H=a(72),Z=new(function(e){function t(){var e;return Object(V.a)(this,t),(e=Object(M.a)(this,Object(P.a)(t).call(this,"ListDB6"))).listItems=void 0,e.recipes=void 0,e.version(1).stores({listItems:"title",recipes:"title,tags"}),e.listItems=e.table("listItems"),e.recipes=e.table("recipes"),e}return Object(U.a)(t,e),t}(H.a)),$=function(){var e=Object(j.a)(w.a.mark((function e(t){var a,n,r;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Z.recipes.where("title").equals(t).toArray();case 2:return a=e.sent,n=Object(i.a)(a,1),r=n[0],e.abrupt("return",r);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),G=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return Z.recipes.offset(e).limit(50).toArray()},K=function(e){return Z.recipes.add(e)},Q=function(e){return Z.recipes.put(e)},X=function(e){return Z.recipes.delete(e)},Y=function(e){return Z.recipes.bulkPut(e)},_=function(e){return Z.listItems.bulkPut(e.map((function(e){return{title:e,inBasket:!1}})))},ee=a(18),te={},ae=function(e){var t=r.a.useState(te[e]||""),a=Object(i.a)(t,2),n=a[0],l=a[1],c=function(){var e=Object(j.a)(w.a.mark((function e(t){var a;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!te[t]){e.next=4;break}return l(te[t]),e.abrupt("return");case 4:return l("pending"),e.next=7,$(t);case 7:a=e.sent,l(a),te[t]=a,e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),l("error");case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t){return e.apply(this,arguments)}}();return r.a.useEffect((function(){c(e)}),[e]),{status:n,retry:c,updateCache:function(e){te[e.title]=e}}},ne=function(e){var t=e.onComplete,a=e.recipe,n=r.a.useState(""),l=Object(i.a)(n,2),c=l[0],u=l[1];return r.a.createElement(z.a,null,r.a.createElement(R.a,{title:"Neues Rezept"}),r.a.createElement(I.a,null,r.a.createElement("form",{autoComplete:"off",onSubmit:function(){var e=Object(j.a)(w.a.mark((function e(n){var r,l;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=n.currentTarget,n.preventDefault(),l={title:r.titleName.value,tags:r.tags.value||"",ingredients:r.ingredients.value.split("\n"),description:r.description.value},e.prev=3,u("pending"),!a){e.next=10;break}return e.next=8,Q(l);case 8:e.next=12;break;case 10:return e.next=12,K(l);case 12:t(l),r.reset(),u("success"),e.next=21;break;case 17:e.prev=17,e.t0=e.catch(3),console.log(e.t0),u("error");case 21:case"end":return e.stop()}}),e,null,[[3,17]])})));return function(t){return e.apply(this,arguments)}}()},r.a.createElement(S.a,{margin:"normal",fullWidth:!0,defaultValue:null===a||void 0===a?void 0:a.title,required:!0,label:"Rezept Titel",name:"titleName"}),r.a.createElement(S.a,{margin:"normal",fullWidth:!0,defaultValue:null===a||void 0===a?void 0:a.tags,label:"Tags",name:"tags"}),r.a.createElement(S.a,{margin:"normal",multiline:!0,fullWidth:!0,required:!0,defaultValue:null===a||void 0===a?void 0:a.ingredients,label:"Zutaten",name:"ingredients"}),r.a.createElement(S.a,{margin:"normal",multiline:!0,fullWidth:!0,required:!0,defaultValue:null===a||void 0===a?void 0:a.description,label:"Zubereitung",name:"description"}),r.a.createElement(k.a,{mt:2},r.a.createElement(L.a,{disabled:"pending"===c,color:"primary",type:"submit"},a?"\xe4nderung an ".concat(a.title," speichern"):"neues Rezept speichern")),r.a.createElement(k.a,{bgcolor:"primary",mt:"2"},"pending"===c&&"erstelle Rezept","error"===c&&"oh oh da ist etwas schief gelaufen","success"===c&&"neues Rezept erstellt!"))))},re=function(){var e=Object(u.h)(),t=Object(u.i)().id,a=decodeURIComponent(t),n=ae(a),l=n.status,c=n.updateCache;return""===l||"pending"===l||"error"===l?r.a.createElement(T.a,{height:"12rem"}):r.a.createElement(r.a.Fragment,null,r.a.createElement(ne,{onComplete:function(t){c(t),e("/kochbuch/recipes/".concat(t.title))},recipe:l}),r.a.createElement(J,{label:"Rezept l\xf6schen",onClick:Object(j.a)(w.a.mark((function t(){return w.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,X(l.title);case 3:e("/kochbuch/recipes"),t.next=9;break;case 6:t.prev=6,t.t0=t.catch(0),console.log(t.t0);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})))},r.a.createElement(y.a,null)))},le=function(){var e=Object(u.h)(),t=Object(u.i)().id,a=decodeURIComponent(t),n=ae(a).status;return""===n||"pending"===n?r.a.createElement(T.a,{height:"12rem"}):"error"===n?r.a.createElement(k.a,null,"rezpete konnten nicht geladen werden"):r.a.createElement(k.a,{mt:3},r.a.createElement(z.a,null,r.a.createElement(R.a,{title:n.title,subheader:n.tags}),r.a.createElement(I.a,null,n.ingredients.map((function(e){return r.a.createElement(B.a,{key:e},e)})),r.a.createElement(B.a,{style:{whiteSpace:"pre-wrap"}},n.description)),r.a.createElement(F.a,null,r.a.createElement(L.a,{onClick:Object(j.a)(w.a.mark((function t(){return w.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,_(n.ingredients);case 2:e("/kochbuch/list");case 3:case"end":return t.stop()}}),t)})))},n.title," zur Einkaufsliste hinzuf\xfcgen"))),r.a.createElement(J,{onClick:function(){return e("edit")},label:"Rezept bearbeiten",children:r.a.createElement(C.a,null)}))},ce=function(){var e=function(){var e=r.a.useState([]),t=Object(i.a)(e,2),a=t[0],n=t[1],l=r.a.useState(!1),c=Object(i.a)(l,2),u=c[0],o=c[1],s=r.a.useRef(0);return{status:"",hasMore:u,recipes:a,fetchRecipes:function(){var e=Object(j.a)(w.a.mark((function e(){var t,r,l;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,G(s.current);case 3:if(!(t=e.sent).length){e.next=14;break}return s.current+=50,r=[].concat(Object(ee.a)(a),Object(ee.a)(t)),n(r),e.next=10,Z.recipes.count();case 10:l=e.sent,o(l!==r.length),e.next=15;break;case 14:o(!1);case 15:e.next=19;break;case 17:e.prev=17,e.t0=e.catch(0);case 19:case"end":return e.stop()}}),e,null,[[0,17]])})));return function(){return e.apply(this,arguments)}}()}}(),t=e.recipes,a=e.status,n=e.fetchRecipes,l=e.hasMore,c=Object(u.h)();return r.a.useEffect((function(){n()}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement(N.a,null,t.map((function(e){return r.a.createElement(W.a,{onClick:function(){return c("".concat(e.title))},key:e.title},r.a.createElement(D.a,{primary:e.title,secondary:e.tags}))}))),l&&r.a.createElement(L.a,{onClick:n},"Load more"),"error"===a&&r.a.createElement(k.a,null,"rezpete konnten nicht geladen werden"," ",r.a.createElement(L.a,{onClick:n},"nochmal versuchen")),r.a.createElement(J,{onClick:function(){return c("add")},label:"Rezept hinzuf\xfcgen",children:r.a.createElement(x.a,null)}))},ie=function(){var e=Object(u.h)();return r.a.createElement(u.c,null,r.a.createElement(u.a,{path:"/",element:r.a.createElement(ce,null)}),r.a.createElement(u.a,{path:"/add",element:r.a.createElement(ne,{onComplete:function(t){e("/kochbuch/recipes/"+t.title)}})}),r.a.createElement(u.a,{path:"/:id",element:r.a.createElement(le,null)}),r.a.createElement(u.a,{path:"/:id/edit",element:r.a.createElement(re,null)}))};let ue=[];const oe=()=>{const[e,t]=r.a.useState(ue);return{list:e,fetchList:async()=>{try{const e=await Z.listItems.toArray();ue=e,t(e)}catch{}}}};var se=a(150),me=a(151),pe=a(152),fe=a(166),he=a(153),Ee=a(167),de=a(149);const be=({onCompleted:e})=>r.a.createElement(k.a,null,r.a.createElement(z.a,null,r.a.createElement(R.a,{title:"Einkaufsliste erweitern"}),r.a.createElement(I.a,null,r.a.createElement("form",{onSubmit:async t=>{t.preventDefault();const a=t.currentTarget,n=a.listItems.value.split("\n");console.log(n);try{await _(n),a.reset(),e()}catch(t){console.log(t)}}},r.a.createElement(S.a,{multiline:!0,fullWidth:!0,name:"listItems",label:"Einkaufsliste",required:!0}),r.a.createElement(L.a,{type:"submit",startIcon:r.a.createElement(de.a,null)},"speichern"))))),ge=({onClearList:e})=>{const[t,a]=r.a.useState(!1),n=()=>a(!1);return r.a.createElement(r.a.Fragment,null,r.a.createElement(L.a,{onClick:()=>a(!0)},"Liste l\xf6schen"),r.a.createElement(se.a,{open:t,onClose:n,"aria-labelledby":"clear-list-dialog-title"},r.a.createElement(me.a,{id:"clear-list-dialog-title"},"Die Einkaufsliste leeren ?"),r.a.createElement(pe.a,null,r.a.createElement(L.a,{onClick:n,color:"primary"},"nein"),r.a.createElement(L.a,{onClick:async()=>{try{await Z.listItems.clear(),e(),n()}catch(t){console.log(t)}},color:"primary",autoFocus:!0},"ja"))))},ve=()=>{const{list:e,fetchList:t}=oe(),[a,n]=r.a.useState(!1);return r.a.useEffect(()=>{t()},[]),r.a.createElement(r.a.Fragment,null,r.a.createElement(N.a,null,e.map(e=>r.a.createElement(W.a,{button:!0,onClick:async()=>{var a;await(a={...e,inBasket:!e.inBasket},Z.listItems.put(a)),t()},key:e.title},r.a.createElement(D.a,null,e.title),r.a.createElement(fe.a,{checked:e.inBasket,inputProps:{"aria-label":`${e.title} ist im Einkaufswagen`}})))),r.a.createElement(he.a,null),e.length>0&&r.a.createElement(k.a,{mt:4},r.a.createElement(ge,{onClearList:t})),r.a.createElement(Ee.a,{anchor:"bottom",open:a,onOpen:()=>n(!0),onClose:()=>n(!1)},r.a.createElement(be,{onCompleted:()=>{n(!1),t()}})),r.a.createElement(J,{onClick:()=>n(!0),label:"brauche sachen"},r.a.createElement(x.a,null)))};var ke=a(168),Oe=function(){var e=r.a.useState(null),t=Object(i.a)(e,2),a=t[0],n=t[1],l=r.a.useState(),c=Object(i.a)(l,2),u=c[0],o=c[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement("input",{type:"file",onChange:function(e){var t=new FileReader;t.onload=function(e){console.log(e.target.result);var t=JSON.parse(e.target.result);n(t)},t.readAsText(e.target.files[0])}}),r.a.createElement(L.a,{onClick:Object(j.a)(w.a.mark((function e(){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o("pending"),e.prev=1,e.next=4,Y(a||[]);case 4:o("success"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),o("error");case 10:case"end":return e.stop()}}),e,null,[[1,7]])}))),disabled:null===a||"pending"===u},"importieren"),r.a.createElement(ke.a,{autoHideDuration:4e3,open:"error"===u,onClose:function(){return o(void 0)},message:"Oh nein der import hat leider nicht geklappt"}),r.a.createElement(ke.a,{autoHideDuration:4e3,anchorOrigin:{vertical:"top",horizontal:"left"},open:"success"===u,onClose:function(){return o(void 0)},message:"Import erfolgreich ".concat((null===a||void 0===a?void 0:a.length)||0," Rezepte hinzugef\xfcgt oder\n        aktualisiert")}))},we=function(){var e=r.a.useState(""),t=Object(i.a)(e,2),a=t[0],n=t[1],l=function(){var e=Object(j.a)(w.a.mark((function e(){var t,a;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Z.recipes.toArray();case 2:t=e.sent,a="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(t)),n(a);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.useEffect((function(){l()}),[]),a?r.a.createElement(L.a,{download:"recipes.json",href:a},"exportieren"):r.a.createElement(T.a,null)},je=function(){return r.a.createElement(k.a,null,r.a.createElement(B.a,null,"Einstellungen"),r.a.createElement(he.a,null),r.a.createElement(z.a,null,r.a.createElement(R.a,{title:"Rezepte"}),r.a.createElement(F.a,null,r.a.createElement(we,null))),r.a.createElement(z.a,null,r.a.createElement(I.a,null,r.a.createElement(Oe,null))))},ye=a(157),Ce=a(158),xe=a(159),ze=Object(h.a)((function(e){return Object(E.a)({nav:{marginTop:e.spacing(8),bottom:0,top:"auto"}})})),Re=function(){var e=Object(u.h)(),t=ze(),a=r.a.useState("recipes"),n=Object(i.a)(a,2),l=n[0],c=n[1];return r.a.useEffect((function(){e("/kochbuch/".concat(l))}),[e,l]),r.a.createElement(d.a,{position:"fixed",color:"primary",className:t.nav},r.a.createElement(b.a,{value:l,showLabels:!0},r.a.createElement(g.a,{onClick:function(){return c("recipes")},value:"recipes",label:"Rezepte",icon:r.a.createElement(ye.a,null)}),r.a.createElement(g.a,{onClick:function(){return c("list")},value:"list",label:"Liste",icon:r.a.createElement(Ce.a,null)}),r.a.createElement(g.a,{onClick:function(){return c("settings")},value:"settings",label:"Einstellungen",icon:r.a.createElement(xe.a,null)})))};var Ie=function(){var e=Object(m.a)("(prefers-color-scheme: dark)"),t=r.a.useMemo((function(){return Object(p.a)({palette:{type:e?"dark":"light"}})}),[e]);return r.a.createElement(f.a,{theme:t},r.a.createElement(s.a,null),r.a.createElement(o.a,null,r.a.createElement(v.a,null,r.a.createElement(k.a,{mt:2,mb:8},r.a.createElement(u.c,null,r.a.createElement(u.a,{path:"kochbuch/recipes/*",element:r.a.createElement(ie,null)}),r.a.createElement(u.a,{path:"kochbuch/list/*",element:r.a.createElement(ve,null)}),r.a.createElement(u.a,{path:"kochbuch/settings/*",element:r.a.createElement(je,null)})))),r.a.createElement(Re,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(Ie,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(e=>{e.unregister()}).catch(e=>{console.error(e.message)})},88:function(e,t,a){e.exports=a(101)},93:function(e,t,a){}},[[88,1,2]]]);
//# sourceMappingURL=main.3d419336.chunk.js.map