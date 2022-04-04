import{d as E,o as k,c as B,b as m,r as te,x as y,y as O,z as I,A as M,f as H,w as x,B as ne,C as se,u as g,e as C,D as N,E as j,G as oe,q as F,h as ae,s as ie,H as re,F as le,I as ce,a as V,i as de}from"./vendor.cfaae494.js";import{B as K}from"./Button.463e13c0.js";import{u as W,Z as G,N as J,_ as ue}from"./index.cad5a9e0.js";import{u as L,B as f}from"./board.8560589b.js";var Y="/pacman-resolver/assets/wall.d1eeac38.png",z="/pacman-resolver/assets/street.a943c8c6.png",q="/pacman-resolver/assets/food.37631a6a.png",X="/pacman-resolver/assets/pacmon.cddf7029.png",me="/pacman-resolver/assets/remove.b16c524a.png";const fe={class:"absolute flex justify-center items-center w-full h-full transform -rotate-45 text-2xl select-none"},$=E({emits:["click"],setup(v,{emit:s}){return(n,c)=>(k(),B("div",{class:"relative cursor-pointer transition hover:bg-gray-800",onClick:c[0]||(c[0]=u=>s("click"))},[m("div",fe,[te(n.$slots,"default")])]))}}),ve=({element:v,initialVisible:s,cantOpenContextMenu:n})=>{const c=y(s||!1),u=y({top:0,left:0}),h=O(()=>{const{top:t,left:r}=u.value;return{top:`${t}px`,left:`${r}px`}}),e=t=>{const r=v.value,i=r.clientHeight,p=r.clientWidth;t.top+i>=window.innerHeight&&(t.top-=i),t.left+p>=window.innerWidth&&(t.left-=p),u.value=t},a=()=>c.value=!1,o=t=>{if(t.stopPropagation(),!c.value)return;const r=t.target;!v.value.contains(r)&&a()},l=async t=>{if(t.preventDefault(),n())return;const r={top:t.pageY,left:t.pageX};c.value&&a(),await M(),c.value=!0,e(r)};return window.addEventListener("click",o),window.addEventListener("contextmenu",l),I(()=>window.removeEventListener("contextmenu",l)),{isVisible:c,position:u,positionStyle:h,closeContextMenu:a}},pe={class:"relative select-none"},ge={class:"border-2 border-blue-300 bg-gray-900 rounded-full w-52 h-52 grid grid-cols-2 grid-rows-2 transform rotate-45 overflow-hidden shadow-xl shadow-gray-900 divide-gray-700 divide-x divide-y"},he=m("img",{src:Y,class:"w-9 h-9"},null,-1),we=m("img",{src:z,class:"w-9 h-9"},null,-1),_e=m("img",{src:q,class:"w-9 h-9"},null,-1),be=m("img",{src:X,class:"w-9 h-9"},null,-1),ye=m("div",{class:"rounded-full w-full h-full bg-gray-800 cursor-pointer flex justify-center items-center text-2xl hover:bg-gray-700"},[m("img",{src:me,class:"w-7 h-7"})],-1),xe=[ye],Ce=E({props:{visible:null},setup(v){const s=v,n=L(),c=W(),u=y(null),{isVisible:h,positionStyle:e,closeContextMenu:a}=ve({element:u,initialVisible:s.visible,cantOpenContextMenu:()=>n.isAnimating||n.isAnimatingInitialAnimation||!n.hasSelectedCoordinate}),o=l=>{if(l===f.PACMON){if(n.selectedCoordinate.length>1){c.show({status:J.ERROR,title:"Action Failed",subtitle:"Only one pacmon is allowed"});return}else if(n.hasPacmonInBoard){const t=n.getPacmonCoordinate,{y:r,x:i}=n.selectedCoordinate[0];n.setBoardItem(t,n.board[r][i])}}n.setBulkBoardItem(l),n.clearSelectedCoordinate(),a()};return(l,t)=>(k(),H(G,{duration:250},{default:x(()=>[ne(m("div",{ref_key:"wheelMenu",ref:u,class:"absolute",style:N(g(e))},[m("div",pe,[m("div",ge,[C($,{onClick:t[0]||(t[0]=r=>o(g(f).WALL))},{default:x(()=>[he]),_:1}),C($,{onClick:t[1]||(t[1]=r=>o(g(f).STREET))},{default:x(()=>[we]),_:1}),C($,{onClick:t[2]||(t[2]=r=>o(g(f).FOOD))},{default:x(()=>[_e]),_:1}),C($,{onClick:t[3]||(t[3]=r=>o(g(f).PACMON))},{default:x(()=>[be]),_:1})]),m("div",{class:"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 w-20 h-20 flex justify-center items-center p-1.5 shadow-md",onClick:t[4]||(t[4]=r=>o(g(f).EMPTY))},xe)])],4),[[se,g(h)]])]),_:1}))}}),Se=()=>{const v=y(!1),s=n=>{v.value=n.shiftKey};return j(()=>{window.addEventListener("keyup",s),window.addEventListener("keydown",s)}),I(()=>{window.removeEventListener("keyup",s),window.removeEventListener("keydown",s)}),{isShiftKeyPressed:v}},ke=v=>{const s=v.value,n=y(null),c=h=>{s.removeEventListener("transitionend",n.value),h()};return{animate:(h,{unmountClass:e}={unmountClass:!1})=>new Promise(a=>{const o=e?"remove":"add";s.classList[o](h),n.value=c.bind(globalThis,a),s.addEventListener("transitionend",n.value)})}},Ae={[f.STREET]:z,[f.FOOD]:q,[f.PACMON]:X,[f.WALL]:Y};const Be=["data-coordinate"],Oe=["src","alt"],Ee=E({props:{coordinate:null,item:null},setup(v){const s=v,n=L(),{isShiftKeyPressed:c}=Se(),u=y(null),h=e=>{if(!n.isAnimating){if(n.isInSelectedCoordinate(e)){n.removeSelectedCoordinate(e);return}c.value?n.setBulkSelectedCoordinate(e):n.setSelectedCoordinate(e)}};return oe(()=>{var e;return(e=n.getCell(s.coordinate))==null?void 0:e.swapDirection},async e=>{if(!u.value||!e)return;const{swap:a,resolve:o}=n.getCell(s.coordinate),{animate:l}=ke(u);await l(e),a&&a(),await l(e,{unmountClass:!0}),n.setCellDirection(s.coordinate,null),o&&await o()}),(e,a)=>(k(),B("div",{class:F(["box","select-none","m-1",{"box--active":g(n).isInSelectedCoordinate(s.coordinate)},{"cursor-not-allowed":g(n).isAnimating},{"cursor-pointer":!g(n).isAnimating}]),onClick:a[0]||(a[0]=o=>h(s.coordinate)),"data-coordinate":`${s.coordinate.y}|${s.coordinate.x}`},[C(G,{duration:300},{default:x(()=>[s.item?(k(),B("img",{key:0,class:F(["w-8","h-8","transition-transform","duration-300"]),src:g(Ae)[s.item],alt:s.item,ref_key:"box",ref:u},null,8,Oe)):ae("",!0)]),_:1})],10,Be))}});var $e=ue(Ee,[["__scopeId","data-v-8b55716e"]]);const Re=v=>{const s=JSON.parse(JSON.stringify(v)),n=([a,o])=>{const l=[[1,0],[-1,0],[0,1],[0,-1]],t=([i,p])=>i>=0&&i<s.length&&p>=0&&p<s[0].length,r=([i,p])=>[f.FOOD,f.STREET,f.PACMON].includes(s[i][p]);return l.map(([i,p])=>[i+a,p+o]).filter(t).filter(r)},c=()=>{for(let a=0;a<s.length;a++)for(let o=0;o<s[a].length;o++)if(s[a][o]===f.PACMON)return[a,o];return null},u=(a,o)=>{var r;const l=[o];let t=o;for(;t;){const i=a.find(p=>p.to.toString()===(t==null?void 0:t.toString()));i&&l.push(i.from),t=(r=i==null?void 0:i.from)!=null?r:null}return l.reverse()},h=(a,o)=>{const l=[],t=new Set,r=[a];for(;r.length;){const i=r.shift();t.add(i.toString());const[p,R]=i,P=o.find(S=>S.id===i.toString());if(s[p][R]===f.FOOD&&!P)return u(l,i);for(const S of n(i))t.has(S.toString())||(l.push({from:i,to:S}),r.push(S))}return null};return(()=>{const a=[];let o=c();if(!o)return[];let l=h(o,a);for(;l;)o=l[l.length-1],a.push({id:o.toString(),path:l}),l=h(o,a);return a})()};const Pe=m("header",{class:"text-center mb-12"},[m("h1",{class:"font-bold text-3xl mb-1"},"Setup your Board"),m("p",{class:"text-gray-400 text-sm"},"Put the obstacle inside the board")],-1),Te={class:"flex flex-col items-center",ref:"main"},Ie={class:"flex justify-center mt-12 space-x-6"},Ne=V(" Reset Board "),je=E({setup(v){const s=.1,n=1e3,c=y(null),u=y(!1),h=ie(),e=L(),a=W(),o=y([]),l=O(()=>e.isAnimating?"Resolving...":"Resolve!"),t=O(()=>({gridTemplateColumns:`repeat(${e.col}, minmax(0, 1fr))`,gridTemplateRows:`repeat(${e.row}, minmax(0, 1fr))`})),r=O(()=>e.isAnimating||e.isAnimatingInitialAnimation||e.isBoardHasEmptyCell),i=y(null);(!e.row||!e.col)&&(a.show({status:J.ERROR,title:"Invalid Row and Column",subtitle:"Invalid Row and Column you will be redirect back",duration:4500}),h.push({name:"Setup"}));const p=O(()=>e.board.reduce((d,w,_)=>(d.push(...w.map((b,A)=>({id:{y:_,x:A},value:b}))),d),[]));j(async()=>{e.isAnimatingInitialAnimation=!0,e.generateBoard(),await M();const d=e.row*e.col*s*n;c.value=setTimeout(()=>e.isAnimatingInitialAnimation=!1,d)});function*R(d){const w=[...d];for(;w.length;)yield w.shift()}const P=(d=500)=>new Promise(w=>setTimeout(w,d)),S=()=>{if(e.isAnimating||e.isAnimatingInitialAnimation)return;o.value=JSON.parse(JSON.stringify(e.board));const d=Re(e.board);e.generateCells(),console.log(d),i.value=R(d),Z()},Z=async()=>{e.clearSelectedCoordinate(),e.isAnimating=!0;let d=i.value.next().value;for(;d;){for(let w=0;w<d.path.length;w++){if(w===d.path.length-1)continue;const[_,b]=d.path[w],[A,T]=d.path[w+1],Q=e.board[_][b],D=e.board[A][T];e.swapCell({currentCoordinate:{y:_,x:b},nextCoordinate:{y:A,x:T}}),e.setCell({y:_,x:b},"swap",()=>{e.setCell({y:_,x:b},"swap",null),e.setBoardItem({y:_,x:b},D===f.FOOD?f.STREET:D),e.setBoardItem({y:A,x:T},Q)}),await new Promise(ee=>{e.setCell({y:_,x:b},"resolve",async()=>{e.setCell({y:_,x:b},"resolve",null),await P(0),ee()})})}d=i.value.next().value}e.isAnimating=!1,u.value=!0},U=()=>{e.board=o.value,u.value=!1};return I(()=>{e.resetBoard(),c.value&&clearTimeout(c.value)}),(d,w)=>(k(),B("section",null,[Pe,m("main",Te,[m("div",{class:"grid",style:N(g(t))},[C(re,{name:"fade"},{default:x(()=>[(k(!0),B(le,null,ce(g(p),(_,b)=>(k(),H($e,{key:b,coordinate:_.id,item:_.value,style:N({"--transitionDelay":`${b*s}s`})},null,8,["coordinate","item","style"]))),128))]),_:1})],4)],512),m("div",Ie,[C(K,{onClick:S,disabled:g(r)},{default:x(()=>[V(de(g(l)),1)]),_:1},8,["disabled"]),C(K,{color:"error",disabled:!u.value,onClick:U},{default:x(()=>[Ne]),_:1},8,["disabled"])]),C(Ce,{visible:!1})]))}});export{je as default};
