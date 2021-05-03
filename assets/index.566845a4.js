var e=Object.defineProperty,t=Object.prototype.hasOwnProperty,n=Object.getOwnPropertySymbols,a=Object.prototype.propertyIsEnumerable,l=(t,n,a)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[n]=a,r=(e,r)=>{for(var c in r||(r={}))t.call(r,c)&&l(e,c,r[c]);if(n)for(var c of n(r))a.call(r,c)&&l(e,c,r[c]);return e};import{r as c,m as s,c as o,F as i,P as m,I as u,a as p,C as E,D as d,S as h,B as b,b as f,d as g,e as k,T as y,f as v,g as C,h as S,A as L,i as w,j as P,k as j,L as F,l as I,n as N,o as O,p as x,q as D,R,s as $,t as _,u as T,v as z,w as K,x as B,y as M,M as U,z as Y,E as J,G as Z,H as q,J as A,K as G,N as W}from"./vendor.82f1c7be.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(n){const a=new URL(e,location),l=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((n,r)=>{const c=new URL(e,a);if(self[t].moduleMap[c])return n(self[t].moduleMap[c]);const s=new Blob([`import * as m from '${c}';`,`${t}.moduleMap['${c}']=m;`],{type:"text/javascript"}),o=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(s),onerror(){r(new Error(`Failed to import: ${e}`)),l(o)},onload(){n(self[t].moduleMap[c]),l(o)}});document.head.appendChild(o)})),self[t].moduleMap={}}}("/kochbuch/assets/");const H=e=>{const t=localStorage.getItem(e);if(t)return JSON.parse(t)},Q=(e,t)=>{localStorage.setItem(e,JSON.stringify(t))},V=(e,t)=>{const n=H(e),[a,l]=c.useState(null!=n?n:t);return c.useEffect((()=>{Q(e,a)}),[e,a]),[a,l]},X=()=>{const e=H("LIST_KEY");return e||{basket:[],list:[]}},ee=e=>{const t=X();t.list=[...t.list,...e],Q("LIST_KEY",t)};let te={list:[],basket:[]};const ne=s((e=>o({fab:{position:"fixed",bottom:e.spacing(8),right:e.spacing(2)}}))),ae=({onClick:e,label:t,children:n,isLoading:a})=>{const l=ne();return c.createElement(i,{onClick:e,disabled:a,className:l.fab,color:"primary","aria-label":t},n)},le=s((e=>o({root:{background:e.palette.background.paper,padding:"2px 4px",display:"flex",alignItems:"center",position:"sticky",top:e.spacing(1),zIndex:1},input:{marginLeft:e.spacing(1),flex:1},iconButton:{padding:10},divider:{height:28,margin:4}}))),re=({onSubmit:e,label:t})=>{const n=le(),[a,l]=c.useState("");return c.useEffect((()=>{e(a)}),[e,a]),c.createElement(m,{onSubmit:t=>{t.preventDefault(),e(a)},component:"form",className:n.root},c.createElement(u,{value:a,onChange:e=>l(e.target.value),className:n.input,placeholder:t,inputProps:{"aria-label":t}}),c.createElement(p,{type:"button",color:"secondary",className:n.iconButton,"aria-label":"Suche löschen",onClick:()=>{l(""),e("")}},c.createElement(E,null)),c.createElement(d,{className:n.divider,orientation:"vertical"}),c.createElement(p,{type:"submit",className:n.iconButton,"aria-label":"suchen"},c.createElement(h,null)))},ce=({onCompleted:e})=>{const[t,n]=V("shoppingList","");return c.createElement(b,null,c.createElement(f,null,c.createElement(g,{title:"Einkaufsliste erweitern"}),c.createElement(k,null,c.createElement("form",{onSubmit:async a=>{a.preventDefault(),ee(t.split("\n")),n(""),e()}},c.createElement(y,{autoFocus:!0,value:t,onChange:e=>n(e.target.value),multiline:!0,fullWidth:!0,name:"listItems",label:"Einkaufsliste",required:!0}),c.createElement(v,{type:"submit",startIcon:c.createElement(C,null)},"speichern")))))},se=({onClearList:e})=>{const[t,n]=c.useState(!1),a=()=>n(!1);return c.createElement(c.Fragment,null,c.createElement(v,{onClick:()=>n(!0)},"Liste löschen"),c.createElement(w,{open:t,onClose:a,"aria-labelledby":"clear-list-dialog-title"},c.createElement(P,{id:"clear-list-dialog-title"},"Die Einkaufsliste leeren ?"),c.createElement(j,null,c.createElement(v,{onClick:a,color:"primary"},"nein"),c.createElement(v,{onClick:async()=>{try{(()=>{const e=X();e.basket=[],Q("LIST_KEY",e)})(),e(),a()}catch(t){console.log(t)}},color:"primary",autoFocus:!0},"ja"))))},oe=({items:e,onSelect:t,isChecked:n,headline:a})=>0===e.length?null:c.createElement(f,null,c.createElement(g,{subheader:a}),c.createElement(k,null,e.map((e=>c.createElement(F,{button:!0,onClick:()=>{t(e)},key:e},c.createElement(I,null,e),c.createElement(N,{checked:n,inputProps:{"aria-label":`${e} ist im Einkaufswagen`}})))))),ie=()=>{const{list:e,fetchList:t}=(()=>{const[e,t]=c.useState(te);return{list:e,fetchList:()=>{const e=X();te=e,t(e)}}})(),[n,a]=c.useState(!1);return c.useEffect((()=>{t()}),[]),c.createElement(c.Fragment,null,0===e.list.length&&0===e.basket.length&&c.createElement(b,{display:"flex",alignContent:"center",justifyContent:"center"},"Du hast noch nichts auf der Einkaufsliste"),c.createElement(oe,{items:e.list,isChecked:!1,headline:"In den Einkaufswagen",onSelect:async e=>{(async e=>{const t=X();t.list=t.list.filter((t=>t!==e)),t.basket.push(e),Q("LIST_KEY",t)})(e),t()}}),c.createElement(b,{mt:3,mb:3}),c.createElement(oe,{items:e.basket,isChecked:!0,headline:"Schon dabei",onSelect:async e=>{(e=>{const t=X();t.basket=t.basket.filter((t=>t!==e)),t.list.push(e),Q("LIST_KEY",t)})(e),t()}}),e.basket.length>0&&c.createElement(b,{mt:4},c.createElement(se,{onClearList:t})),c.createElement(S,{anchor:"top",open:n,onClose:()=>a(!1)},c.createElement(ce,{onCompleted:()=>{a(!1),t()}})),c.createElement(ae,{onClick:()=>a(!0),label:"brauche sachen"},c.createElement(L,null)))},me=({recipe:e,action:t})=>{const[n,a]=c.useState(!1),[l,r]=c.useState(1);return c.createElement(c.Fragment,null,!n&&c.createElement(c.Fragment,null,c.createElement(F,{selected:n,button:!0,onClick:()=>a((e=>!e)),key:e.title},c.createElement(I,{primary:e.title})),c.createElement(d,null)),n&&c.createElement(b,{mt:3},c.createElement(f,null,c.createElement(g,{title:c.createElement(v,{onClick:()=>a(!1)},null==e?void 0:e.title),action:t})),c.createElement(c.Fragment,null,c.createElement(b,{mt:3},c.createElement(f,null,c.createElement(g,{subheader:"Zutaten",action:c.createElement(y,{select:!0,value:l,SelectProps:{native:!0},onChange:e=>r(Number(e.target.value))},[.25,.5,.75,1,1.25,1.5,1.75,2].map((e=>c.createElement("option",{value:e},e))))}),c.createElement(O,null,null==e?void 0:e.ingredients.map((e=>c.createElement(F,{key:e.name},((e,t=1)=>{var n,a;if(1===t)return e;const[l=0]=null!=(n=e.match(/[0-9.]+/g))?n:[],[r=""]=null!=(a=e.match(/[a-zA-Z]+/g))?a:[];return`${Number(l)*t}${r}`})(e.amount,l)," ",e.name)))))),c.createElement(b,{mb:3,mt:3},c.createElement(f,null,c.createElement(g,{subheader:"Zubereitung"}),c.createElement(k,null,c.createElement(x,{style:{whiteSpace:"pre-wrap"}},null==e?void 0:e.description)))))))},ue=()=>{const[e,t]=V("plan",{}),n=Object.values(e).filter((e=>e.isDone)),a=Object.values(e).filter((e=>!e.isDone));return{completedPlans:n,openPlans:a,clearPlans:()=>{t(a.reduce(((e,t)=>r(r({},e),{[t.recipe.title]:t})),{}))},addRecipe:n=>{const a=r(r({},e),{[n.title]:{isDone:!1,recipe:n}});t(a)},togglePlan:n=>{t(r(r({},e),{[n.recipe.title]:r(r({},n),{isDone:!n.isDone})}))}}},pe=()=>{const{openPlans:e,completedPlans:t,clearPlans:n,togglePlan:a}=ue();return c.createElement(c.Fragment,null,c.createElement(x,{variant:"h5"},"Wir kochen"),c.createElement(b,{p:1}),0===e.length&&c.createElement(x,null,"Noch nichts :/"),e.map((e=>c.createElement(c.Fragment,null,c.createElement(me,{key:e.recipe.title,recipe:e.recipe,action:c.createElement(v,{onClick:()=>{a(e)}},"Fertig gekocht")})))),c.createElement(b,{p:2}),t.length>0&&c.createElement(c.Fragment,null,c.createElement(x,{variant:"h5"},"Schon gekocht"),c.createElement(b,{p:1})),t.map((e=>c.createElement(c.Fragment,null,c.createElement(me,{key:e.recipe.title,recipe:e.recipe})))),c.createElement(b,{p:2}),c.createElement(b,{display:"flex",justifyContent:"space-between"},c.createElement(v,{onClick:()=>{const t=e.reduce(((e,t)=>e.concat(t.recipe.ingredients)),[]);ee(t.map((e=>`${e.amount} ${e.name}`)))},color:"primary"},"Plan zur Einkaufsliste"),c.createElement(v,{onClick:n},"Plan löschen")))};const Ee=()=>async function(e){return fetch(e,{method:"GET"}).then((e=>e.json()))}("https://raw.githubusercontent.com/sanderdrummer/recipes-md/master/parsed-recipes.json"),de=()=>{const{data:e,status:t,refetch:n}=(()=>{const[e,t]=c.useState("idle"),[n,a]=V("recipes-storage",[]),l=async()=>{t("fetching");try{const e=await Ee();a(e),t("done")}catch(e){t("error")}};return c.useEffect((()=>{l()}),[]),{status:e,data:n,refetch:l}})(),[a,l]=c.useState(""),[r,s]=c.useState(null!=e?e:[]);c.useEffect((()=>{s(((e=[],t="")=>{if(!t)return e||[];const n=t.toLowerCase();return e.filter((e=>e.title.toLowerCase().includes(n)))})(e,a))}),[a,e]);const{addRecipe:o}=ue();return c.createElement(c.Fragment,null,c.createElement(re,{label:"was kochen ?",onSubmit:l}),c.createElement(O,null,r.map((e=>c.createElement(me,{key:e.title,recipe:e,action:c.createElement(v,{onClick:()=>o(e)},"zum Koch Plan")})))),"fetching"===t&&c.createElement(D,{"aria-label":"loading","data-testid":"loader"}),"error"===t&&c.createElement(b,null,"rezepte konnten nicht geladen werden",c.createElement(v,{onClick:()=>n()},"nochmal versuchen")))},he=s((e=>o({nav:{marginTop:e.spacing(8),bottom:0,top:"auto"}}))),be=()=>{const e=he(),[t,n]=z();return c.createElement(K,{position:"fixed",color:"primary",className:e.nav},c.createElement(B,{value:t,showLabels:!0},c.createElement(M,{onClick:()=>n("/"),value:"/",label:"Rezepte",icon:c.createElement(U,null)}),c.createElement(M,{onClick:()=>n("/plan"),value:"/plan",label:"Plan",icon:c.createElement(Y,null)}),c.createElement(M,{onClick:()=>n("/einkaufliste"),value:"/einkaufliste",label:"Liste",icon:c.createElement(J,null)})))},fe=()=>c.createElement(R,{base:"/kochbuch"},c.createElement($,null,c.createElement(_,{path:"/",component:de}),c.createElement(_,{path:"/einkaufliste",component:ie}),c.createElement(_,{path:"/plan",component:pe}),c.createElement(T,{to:"/"})),c.createElement(be,null));function ge(){const e=Z({palette:{primary:{main:"#00acc1"},secondary:{main:"#00bfa5"},type:"dark"}});return c.createElement(q,{theme:e},c.createElement(A,null),c.createElement(G,null,c.createElement(b,{mt:2,mb:8},c.createElement(fe,null))))}W.render(c.createElement(ge,null),document.getElementById("root"));
