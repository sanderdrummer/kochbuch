(this.webpackJsonpkochbuch=this.webpackJsonpkochbuch||[]).push([[0],{122:function(e,t,n){},131:function(e,t,n){"use strict";n.r(t);var c=n(3),a=n(0),r=n.n(a),i=n(13),s=n.n(i),o=(n(122),n(187)),u=n(102),l=n(186),j=n(188),b=n(190),d=n(18),f=n(65),h=n(23),p=n(176),O=n(174),x=n(172),m=n(161),v=n(196),g=n(163),k=Object(m.a)((function(e){return Object(v.a)({fab:{position:"fixed",bottom:e.spacing(8),right:e.spacing(2)}})})),w=function(e){var t=e.onClick,n=e.label,a=e.children,r=e.isLoading,i=k();return Object(c.jsx)(g.a,{onClick:t,disabled:r,className:i.fab,color:"primary","aria-label":n,children:a})},y=n(86),C=n(197),S=n(166),E=n(165),L=n(100),I=n.n(L),N=n(99),z=n.n(N),F=Object(m.a)((function(e){return Object(v.a)({root:{padding:"2px 4px",display:"flex",alignItems:"center"},input:{marginLeft:e.spacing(1),flex:1},iconButton:{padding:10},divider:{height:28,margin:4}})})),T=function(e){var t=e.onSubmit,n=e.label,a=F(),i=r.a.useState(""),s=Object(h.a)(i,2),o=s[0],u=s[1];return r.a.useEffect((function(){t(o)}),[t,o]),Object(c.jsxs)(y.a,{onSubmit:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(e){e.preventDefault(),t(o)})),component:"form",className:a.root,children:[Object(c.jsx)(C.a,{value:o,onChange:function(e){return u(e.target.value)},className:a.input,placeholder:n,inputProps:{"aria-label":n}}),Object(c.jsx)(E.a,{type:"button",color:"secondary",className:a.iconButton,"aria-label":"Suche l\xf6schen",onClick:function(){u(""),t("")},children:Object(c.jsx)(z.a,{})}),Object(c.jsx)(S.a,{className:a.divider,orientation:"vertical"}),Object(c.jsx)(E.a,{type:"submit",className:a.iconButton,"aria-label":"suchen",children:Object(c.jsx)(I.a,{})})]})},B=(n(195),n(192),n(15)),D=n.n(B),J=n(21),P=n(191),Z=n(194);function q(e){return G.apply(this,arguments)}function G(){return(G=Object(J.a)(D.a.mark((function e(t){var n;return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={method:"GET"},e.abrupt("return",fetch(t,n).then((function(e){return e.json()})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var K=new P.a,R=n(173),W=n(168),Y=n(169),_=n(167),A=n(170),H=n(171),M=n(175),Q=n(39),U="/rezepte",V="/einkaufliste",X=n(85),$="LIST_KEY",ee=function(e,t){localStorage.setItem(e,JSON.stringify(t))},te=function(){var e=function(e){var t=localStorage.getItem(e);if(t)return JSON.parse(t)}($);return e||{basket:[],list:[]}},ne=function(){var e=Object(J.a)(D.a.mark((function e(t){var n;return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(n=te()).list=n.list.filter((function(e){return e!==t})),n.basket.push(t),ee($,n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ce=function(e){var t=te();t.basket=t.basket.filter((function(t){return t!==e})),t.list.push(e),ee($,t)},ae=function(e){var t=te();t.list=[].concat(Object(X.a)(t.list),Object(X.a)(e)),ee($,t)},re=function(){var e=te();e.basket=[],ee($,e)},ie={list:[],basket:[]},se=function(e){var t=e.recipe,n=Object(d.g)(),a=r.a.useState(!1),i=Object(h.a)(a,2),s=i[0],o=i[1];return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(W.a,{selected:s,button:!0,onClick:function(){return o((function(e){return!e}))},children:Object(c.jsx)(Y.a,{primary:t.title})},t.title),Object(c.jsx)(S.a,{}),Object(c.jsx)(_.a,{in:s,mountOnEnter:!0,unmountOnExit:!0,children:Object(c.jsxs)(b.a,{mt:3,children:[Object(c.jsx)(A.a,{children:Object(c.jsx)(H.a,{title:null===t||void 0===t?void 0:t.title,action:Object(c.jsx)(x.a,{startIcon:Object(c.jsx)(R.a,{}),onClick:Object(J.a)(D.a.mark((function e(){return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:ae(null===t||void 0===t?void 0:t.ingredients.map((function(e){var t=e.amount,n=e.name;return"".concat(t," ").concat(n)}))),n.push(V);case 2:case"end":return e.stop()}}),e)}))),children:"zur Einkaufsliste"})})}),Object(c.jsx)(b.a,{mt:3,children:Object(c.jsxs)(A.a,{children:[Object(c.jsx)(H.a,{subheader:"Zutaten"}),Object(c.jsx)(O.a,{children:null===t||void 0===t?void 0:t.ingredients.map((function(e){return Object(c.jsxs)(W.a,{children:[e.amount," ",e.name]},e.name)}))})]})}),Object(c.jsx)(b.a,{mt:3,children:Object(c.jsxs)(A.a,{children:[Object(c.jsx)(H.a,{subheader:"Zubereitung"}),Object(c.jsx)(M.a,{children:Object(c.jsx)(Q.a,{style:{whiteSpace:"pre-wrap"},children:null===t||void 0===t?void 0:t.description})})]})})]})})]})},oe=function(){var e=Object(Z.a)("recipes",Object(J.a)(D.a.mark((function e(){var t;return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,q("https://raw.githubusercontent.com/sanderdrummer/recipes-md/master/parsed-recipes.json");case 2:return t=e.sent,e.abrupt("return",null!==t&&void 0!==t?t:[]);case 4:case"end":return e.stop()}}),e)})))),t=e.data,n=e.isLoading,a=e.isError,i=e.refetch,s=r.a.useState(""),o=Object(h.a)(s,2),u=o[0],l=o[1],j=r.a.useState(null!==t&&void 0!==t?t:[]),d=Object(h.a)(j,2),f=d[0],m=d[1];return r.a.useEffect((function(){m(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";if(!t)return e||[];var n=t.toLowerCase();return e.filter((function(e){return e.title.toLowerCase().includes(n)}))}(t,u))}),[u,t]),Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(T,{label:"was kochen ?",onSubmit:l}),Object(c.jsx)(O.a,{children:f.map((function(e){return Object(c.jsx)(se,{recipe:e},e.title)}))}),n&&Object(c.jsx)(p.a,{"aria-label":"loading","data-testid":"loader"}),a&&Object(c.jsxs)(b.a,{children:["rezepte konnten nicht geladen werden",Object(c.jsx)(x.a,{onClick:function(){return i()},children:"nochmal versuchen"})]})]})},ue="/rezepte/:id",le=function(){return Object(c.jsxs)(d.d,{children:[Object(c.jsx)(d.b,{exact:!0,path:U,component:oe}),Object(c.jsx)(d.b,{exact:!0,path:ue,component:se})]})},je=n(178),be=n(179),de=n(180),fe=n(193),he=n(198),pe=n(181),Oe=n(177),xe=n(189),me="shoppingList",ve=function(e){var t=e.onCompleted,n=r.a.useState(""),a=Object(h.a)(n,2),i=a[0],s=a[1];return r.a.useEffect((function(){var e=window.localStorage.getItem(me)||"";"string"===typeof e&&s(e)}),[]),r.a.useEffect((function(){var e=setTimeout((function(){window.localStorage.setItem(me,i)}),100);return function(){clearTimeout(e)}}),[i]),Object(c.jsx)(b.a,{children:Object(c.jsxs)(A.a,{children:[Object(c.jsx)(H.a,{title:"Einkaufsliste erweitern"}),Object(c.jsx)(M.a,{children:Object(c.jsxs)("form",{onSubmit:function(){var e=Object(J.a)(D.a.mark((function e(n){return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.preventDefault();try{ae([i]),s(""),t()}catch(n){console.log(n)}case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),children:[Object(c.jsx)(xe.a,{value:i,onChange:function(e){return s(e.target.value)},multiline:!0,fullWidth:!0,name:"listItems",label:"Einkaufsliste",required:!0}),Object(c.jsx)(x.a,{type:"submit",startIcon:Object(c.jsx)(Oe.a,{}),children:"speichern"})]})})]})})},ge=function(e){var t=e.onClearList,n=r.a.useState(!1),a=Object(h.a)(n,2),i=a[0],s=a[1],o=function(){return s(!1)};return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(x.a,{onClick:function(){return s(!0)},children:"Liste l\xf6schen"}),Object(c.jsxs)(je.a,{open:i,onClose:o,"aria-labelledby":"clear-list-dialog-title",children:[Object(c.jsx)(be.a,{id:"clear-list-dialog-title",children:"Die Einkaufsliste leeren ?"}),Object(c.jsxs)(de.a,{children:[Object(c.jsx)(x.a,{onClick:o,color:"primary",children:"nein"}),Object(c.jsx)(x.a,{onClick:Object(J.a)(D.a.mark((function e(){return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{re(),t(),o()}catch(n){console.log(n)}case 1:case"end":return e.stop()}}),e)}))),color:"primary",autoFocus:!0,children:"ja"})]})]})]})},ke=function(e){var t=e.items,n=e.onSelect,a=e.isChecked,r=e.headline;return 0===t.length?null:Object(c.jsxs)(A.a,{children:[Object(c.jsx)(H.a,{subheader:r}),Object(c.jsx)(M.a,{children:t.map((function(e){return Object(c.jsxs)(W.a,{button:!0,onClick:function(){n(e)},children:[Object(c.jsx)(Y.a,{children:e}),Object(c.jsx)(fe.a,{checked:a,inputProps:{"aria-label":"".concat(e," ist im Einkaufswagen")}})]},e)}))})]})},we=function(){var e=function(){var e=r.a.useState(ie),t=Object(h.a)(e,2),n=t[0],c=t[1];return{list:n,fetchList:function(){var e=te();ie=e,c(e)}}}(),t=e.list,n=e.fetchList,a=r.a.useState(!1),i=Object(h.a)(a,2),s=i[0],o=i[1];return r.a.useEffect((function(){n()}),[]),Object(c.jsxs)(c.Fragment,{children:[0===t.list.length&&0===t.basket.length&&Object(c.jsx)(b.a,{display:"flex",alignContent:"center",justifyContent:"center",children:"Du hast noch nichts auf der Einkaufsliste"}),Object(c.jsx)(ke,{items:t.list,isChecked:!1,headline:"In den Einkaufswagen",onSelect:function(){var e=Object(J.a)(D.a.mark((function e(t){return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:ne(t),n();case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}),Object(c.jsx)(b.a,{mt:3,mb:3}),Object(c.jsx)(ke,{items:t.basket,isChecked:!0,headline:"Schon dabei",onSelect:function(){var e=Object(J.a)(D.a.mark((function e(t){return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:ce(t),n();case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}),t.basket.length>0&&Object(c.jsx)(b.a,{mt:4,children:Object(c.jsx)(ge,{onClearList:n})}),Object(c.jsx)(he.a,{anchor:"top",open:s,onClose:function(){return o(!1)},children:Object(c.jsx)(ve,{onCompleted:function(){o(!1),n()}})}),Object(c.jsx)(w,{onClick:function(){return o(!0)},label:"brauche sachen",children:Object(c.jsx)(pe.a,{})})]})},ye=n(185),Ce=n(182),Se=n(183),Ee=n(184),Le=Object(m.a)((function(e){return Object(v.a)({nav:{marginTop:e.spacing(8),bottom:0,top:"auto"}})})),Ie=function(){var e=Object(d.g)(),t=Le(),n=Object(d.h)();return Object(c.jsx)(Ce.a,{position:"fixed",color:"primary",className:t.nav,children:Object(c.jsxs)(Se.a,{value:n.pathname,showLabels:!0,children:[Object(c.jsx)(Ee.a,{onClick:function(){return e.push(U)},value:U,label:"Rezepte",icon:Object(c.jsx)(ye.a,{})}),Object(c.jsx)(Ee.a,{onClick:function(){return e.push(V)},value:V,label:"Liste",icon:Object(c.jsx)(R.a,{})})]})})},Ne=function(){return Object(c.jsxs)(f.a,{children:[Object(c.jsxs)(d.d,{children:[Object(c.jsx)(d.b,{path:U,component:le}),Object(c.jsx)(d.b,{path:V,component:we}),Object(c.jsx)(d.a,{from:"/",to:U})]}),Object(c.jsx)(Ie,{})]})},ze=n(101);var Fe=function(){var e=Object(u.a)({palette:{primary:{main:"#00acc1"},secondary:{main:"#00bfa5"},type:"dark"}});return Object(c.jsxs)(l.a,{theme:e,children:[Object(c.jsx)(o.a,{}),Object(c.jsx)(ze.a,{client:K,children:Object(c.jsx)(j.a,{children:Object(c.jsx)(b.a,{mt:2,mb:8,children:Object(c.jsx)(Ne,{})})})})]})};s.a.render(Object(c.jsx)(Fe,{}),document.getElementById("root"))}},[[131,1,2]]]);
//# sourceMappingURL=main.13f3e1a2.chunk.js.map