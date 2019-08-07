(function(t){function e(e){for(var r,s,c=e[0],o=e[1],l=e[2],u=0,d=[];u<c.length;u++)s=c[u],a[s]&&d.push(a[s][0]),a[s]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(t[r]=o[r]);h&&h(e);while(d.length)d.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,c=1;c<n.length;c++){var o=n[c];0!==a[o]&&(r=!1)}r&&(i.splice(e--,1),t=s(s.s=n[0]))}return t}var r={},a={app:0},i=[];function s(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=r,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],o=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var h=o;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var r=n("64a9"),a=n.n(r);a.a},"0f6c":function(t,e,n){"use strict";var r=n("6df8"),a=n.n(r);a.a},"50ad":function(t,e,n){"use strict";var r=n("7b21"),a=n.n(r);a.a},"56d7":function(t,e,n){"use strict";n.r(e);n("14c6"),n("08c1"),n("4842"),n("d9fc"),n("d1e7"),n("bf40");var r=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("v-app",{attrs:{dark:t.setTheme}},[n("v-container",{attrs:{bg:"","grid-list-md":"","text-xs-center":""}},[n("v-layout",{attrs:{row:"","justify-space-between":""}},[n("v-flex",{attrs:{md2:""}},[n("v-switch",{attrs:{color:"primary",label:t.selectedTheme},model:{value:t.goDark,callback:function(e){t.goDark=e},expression:"goDark"}})],1),n("v-spacer")],1),n("v-layout",{attrs:{row:"",wrap:"","align-center":""}},[n("v-flex",[n("Header",{attrs:{msg:"Boilerplate for Cell Netowrk Viewer"}})],1)],1),n("v-layout",{attrs:{row:"",wrap:"","align-center":""}},[n("v-flex",{attrs:{md7:""}},[n("Graph",{attrs:{cellData:this.loadedData}})],1),n("v-flex",{attrs:{md5:""}},[n("List",{attrs:{cellData:this.loadedData}})],1)],1),n("v-layout",{attrs:{row:"",wrap:"","align-center":""}},[n("v-flex",{attrs:{md7:""}},[n("CellDetails")],1),n("v-flex",{attrs:{md5:""}},[n("GeneDetails")],1)],1)],1)],1)],1)},i=[],s=(n("96cf"),n("3b8d")),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{attrs:{row:"",wrap:"","align-center":""}},[n("v-flex",{attrs:{md12:""}},[n("v-card",{class:{height:t.cardHeight}},[n("v-card-title",{staticClass:"justify-center"},[n("h2",{staticClass:"title"},[t._v("Cell Details View")])]),n("v-card-text",[n("v-btn",{staticClass:"ma-2",attrs:{color:"red",dark:""},on:{click:t.removeCellSelected}},[t._v("\n          Remove Cell Details\n          "),n("v-icon",{attrs:{dark:"",right:""}},[t._v("remove_circle")])],1),n("v-layout",{attrs:{row:"",wrap:""}},[t.cellSelectedExist?n("v-flex",{attrs:{md12:"",sm12:""}},[n("h3",{staticClass:"sub-title"},[t._v(t._s(t.cellSelected))]),t.geneDataExist(t.cellSelected)?n("v-list",{staticClass:"list"},t._l(t.loadedGeneData[t.cellSelected],function(e,r){return n("v-list-item",{key:r,attrs:{dense:""},on:{click:function(e){return t.setGeneItem(r)}}},[r===t.loadedGeneData[t.cellSelected].length-1?n("span",[t._v(t._s(r)+": "+t._s(e))]):n("span",[t._v(t._s(r)+": "+t._s(e)+",")])])}),1):t._e()],1):n("v-flex",{attrs:{md12:"",sm12:""}},[n("p",{staticClass:"message"},[t._v("There are no top 10 gene data related to the selected cell type.")])])],1)],1)],1)],1)],1)},o=[],l=n("5698"),h={name:"cell-details",props:[],mounted:function(){this.fetchData()},data:function(){return{cardHeight:this.$store.getters.getCardHeight,loadedGeneData:{}}},methods:{cellSelectedExist:function(){return""!==this.$store.getters.getCellSelected},fetchData:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,l["b"]("./top_abs_10_dict.json");case 2:e=t.sent,this.loadedGeneData=Object.assign({},e),console.log(this.loadedGeneData);case 5:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),geneDataExist:function(t){return void 0!==this.loadedGeneData[t]},removeCellSelected:function(){this.$store.dispatch("changeCellSelected","")},setGeneItem:function(t){this.$store.dispatch("changeGeneSelected",t)}},computed:{cellSelected:{get:function(){return this.$store.getters.getCellSelected}}},watch:{}},u=h,d=(n("50ad"),n("2877")),f=Object(d["a"])(u,c,o,!1,null,"5499b6f5",null),p=f.exports,g=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{attrs:{row:"",wrap:"","align-center":""}},[n("v-flex",{attrs:{md12:"",center:""}},[n("h1",{staticClass:"display-1 font-weight-medium"},[t._v("🦠"+t._s(t.msg)+"🧬")])])],1)},v=[],m={name:"app-header",props:{msg:String}},x=m,y=Object(d["a"])(x,g,v,!1,null,"d128f154",null),b=y.exports,w=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{attrs:{row:"",wrap:"","align-center":""}},[n("v-flex",{attrs:{md12:""}},[n("v-card",{class:{height:t.cardHeight}},[n("v-card-title",{staticClass:"justify-center"},[n("h2",{staticClass:"title"},[t._v("Gene Details View")])]),n("v-card-text",[n("v-btn",{staticClass:"ma-2",attrs:{color:"red",dark:""},on:{click:t.removeGeneDetails}},[t._v("\n          Remove Gene Details\n          "),n("v-icon",{attrs:{dark:"",right:""}},[t._v("remove_circle")])],1),n("v-layout",{staticClass:"list",class:{"max-height":t.listHeight},attrs:{row:"",wrap:""}},[t.geneNotEmpty()?n("v-flex",{attrs:{md12:""}},[n("h3",{staticClass:"sub-title"},[t._v("Gene: "+t._s(t.geneSelected))]),n("v-list",t._l(t.filteredGeneCellList,function(e,r){return n("v-list-item",{key:r,staticClass:"list",on:{click:function(n){return t.setCellSelected(e[0])}}},[n("v-layout",[n("v-flex",{attrs:{md12:""}},[n("span",{staticClass:"index"},[t._v(t._s(e[0])+": ")]),n("span",[t._v(t._s(e[1]))])])],1)],1)}),1)],1):t._e()],1)],1)],1)],1)],1)},C=[],E=n("768b"),k=(n("ac6a"),n("ffc1"),{name:"gene-details",props:[],mounted:function(){this.fetchData()},data:function(){return{filteredGeneCellList:[],cardHeight:this.$store.getters.getCardHeight,cellTypeNames:[],listHeight:"400px",loadedDictData:{}}},methods:{fetchData:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,l["b"]("./top_abs_10_dict.json");case 2:e=t.sent,this.loadedDictData=Object.assign({},e);case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),geneNotEmpty:function(){return""!==this.geneSelected},removeGeneDetails:function(){this.$store.dispatch("changeGeneSelected","")},setCellSelected:function(t){this.$store.dispatch("changeCellSelected",t)},topGeneDataExist:function(t,e){return"undefined"!==typeof t[this.geneSelected]}},computed:{geneSelected:{get:function(){return this.$store.getters.getGeneSelected}}},watch:{geneSelected:function(){for(var t=this,e=0,n=Object.entries(this.loadedDictData);e<n.length;e++){var r=Object(E["a"])(n[e],2),a=r[0],i=r[1];(function(e,n){for(var r=0,a=Object.entries(n);r<a.length;r++){var i=Object(E["a"])(a[r],2),s=i[0],c=i[1];s===t.geneSelected&&t.filteredGeneCellList.push([e,c])}})(a,i)}}}}),D=k,S=Object(d["a"])(D,w,C,!1,null,"ad6c4998",null),O=S.exports,j=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{attrs:{row:"",wrap:"","align-center":""}},[n("v-flex",{attrs:{md12:""}},[n("v-card",{attrs:{height:"700"}},[n("v-card-title",{staticClass:"justify-center"},[n("h2",{staticClass:"title"},[t._v("Graph View")])]),n("v-layout",{attrs:{row:"",wrap:"","align-center":""}},[n("v-spacer"),n("v-flex",{attrs:{md3:"","mr-3":""}},[n("v-text-field",{attrs:{"append-icon":"search",label:"search the cell","single-line":"","hide-details":"","hide-no-data":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),n("v-card-text",[n("div",{ref:"graph",attrs:{id:"graph"}})])],1)],1)],1)],1)},M=[],L=(n("6b54"),n("386d"),n("3b2b"),n("456d"),n("28a5"),n("a481"),n("2220")),G=n("2ef0"),H=n.n(G),$=n("75fc"),A=(n("6762"),n("2fdb"),n("b0b4")),N=(n("5df3"),n("4f7f"),n("d225"));n("55dd"),n("7f7f");function T(t){if(!t.length)return 0;var e=t.reduce(function(t,e){return e+t}),n=e/t.length;return n}function I(t){return t.length?t.reduce(function(t,e){return e+t}):0}function P(t){for(var e=Array(t),n=0;n<e.length;n++)e[n]=[];return e}function R(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=t.getLevels();function a(t,r){t.primaryParent||console.log("node ".concat(t.index," ").concat(t.name," no primary parent"));var a=t.primaryParent.levelIdx,i=r.primaryParent.levelIdx;if(a!=i)return a-i;if(e>1)if(t.parents.length>1||r.parents.length>1){var s=T(t.parents.map(function(t){return t.levelIdx})),c=T(r.parents.map(function(t){return t.levelIdx}));if(s!=c)return s-c}else if(n>5&&1==t.children.length&&1==r.children.length){var o=t.children[0],l=r.children[0];while(1==o.children.length&&1==l.children.length)o=o.children[0],l=l.children[0];var h=o.levelIdx,u=l.levelIdx;return h-u}if(e>2&&t.dalevel.length&&r.dalevel.length){var d=T(t.dalevel.map(function(t){return t.levelIdx})),f=T(r.dalevel.map(function(t){return t.levelIdx}));if(d!=f)return d-f}return 0}var i=0;r.forEach(function(t,e){e>0&&t.sort(a),t.forEach(function(t,e){t.levelIdx=e,t.index=i++})}),t.nodes.sort(function(t,e){return t.index-e.index})}var F=function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Object(N["a"])(this,t),this.name=e,this.height="height"in n?n.height:10,this.width="width"in n?n.width:10,this.parents=[],this.children=[],this.istree=void 0,this.index=void 0,this.phantom=!1,this.depth=-1,this.longest=-1,this.levelIdx=void 0,this.ancestors=new Set,this.descendentAncestors=new Set,this.dalevel=[],this.levelrank=void 0,this.x=void 0,this.y=void 0,this.primaryParent=void 0,this.primaryChildren=[],this.grandkidIndex=void 0,this.twidth=void 0},V=function t(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"#42b983",a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1;Object(N["a"])(this,t),this.source=e,this.target=n,this.color=r,this.value=a},B=function(){function t(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];Object(N["a"])(this,t),this.nodes=e,this.links=n,this.constraints=r,this.groups=a,this.analysis=void 0}return Object(A["a"])(t,[{key:"roots",value:function(){return this.nodes.filter(function(t){return!t.parents.length})}},{key:"leaves",value:function(){return this.nodes.filter(function(t){return!t.children.length})}},{key:"breadthFirst",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=[],r=this.roots();while(r.length){var a=r.shift();n.push(t(a)),a.children.forEach(function(t){e&&r.includes(t)||r.push(t)})}return n}},{key:"getLevels",value:function(){var t=this.nodes,e=Math.max.apply(Math,Object($["a"])(t.map(function(t){return t.longest}))),n=P(e);return t.forEach(function(t){return n[t.longest-1].push(t)}),n.forEach(function(t){return t.forEach(function(t,e){return t.levelIdx=e})}),n}},{key:"orderNodes",value:function(){var t=0,e=[],n=this.nodes.filter(function(t){return!t.primaryParent});while(n.length){var r=n.shift();r.index=t++,e.push(r),r.primaryChildren.forEach(function(t){return n.push(t)})}this.nodes=e}},{key:"describe",value:function(){var t=Math.max.apply(Math,Object($["a"])(this.nodes.map(function(t){return t.depth}))),e=Math.max.apply(Math,Object($["a"])(this.nodes.map(function(t){return t.longest})));console.log("".concat(this.nodes.length," nodes, ").concat(this.links.length," links")),console.log("".concat(this.roots().length," roots, ").concat(this.leaves().length," leaves")),console.log("".concat(t," max depth, ").concat(e," max longest")),console.log("".concat(this.nodes.filter(function(t){return t.istree}).length," tree nodes"));var n={};this.nodes.forEach(function(t){var e=t.parents.length;n[e]?n[e]++:n[e]=1}),console.log("Parent Count:"),console.log(n)}}]),t}();function J(t){var e=t.links.filter(function(t){return t.target.longest-t.source.longest>1}),n=t.links.filter(function(t){return t.target.longest-t.source.longest==1});t.oldLinks=t.links,e.forEach(function(e,r){e.target.parents.splice(e.target.parents.indexOf(e.source),1),e.source.children.splice(e.source.children.indexOf(e.target),1);for(var a=e.source,i=e.source.longest+1;i<e.target.longest;i++){var s=new F("connector-".concat(r,"-").concat(i));s.phantom=!0,s.parents.push(a),s.longest=i,s.depth=e.source.depth+1,s.istree=!1,a.children.push(s),t.nodes.push(s),n.push(new V(a,s)),a=s}e.target.parents.push(a),a.children.push(e.target),n.push(new V(a,e.target))}),t.links=n}function Y(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=t.roots(),r=[];n.forEach(function(t){t.depth=1,r.push(t)});var a=function(){var t=r.shift();t.children.forEach(function(e){e.depth<1&&(e.depth=t.depth+1,r.push(e))})};while(r.length)a();r=[],n.forEach(function(t){t.longest=1,r.push(t)});var i=function(){var t=r.shift(),e=t.longest+1;t.children.forEach(function(t){t.longest<e&&(t.longest=e,r.push(t))})};while(r.length)i();function s(t){if(void 0!=t.istree)return t.istree;var e=!0;return t.children.forEach(function(t){(!s(t)||t.parents.length>1)&&(e=!1)}),t.istree=e,e}t.nodes.forEach(function(t){return s(t)}),e&&J(t),t.nodes.forEach(function(t,e){return t.index=e});var c=t.getLevels();t.breadthFirst(function(t){t.children.forEach(function(e){t.ancestors.forEach(function(t){return e.ancestors.add(t)}),e.ancestors.add(t)})});for(var o=c.length-1;o>=0;o--){var l=c[o];l.forEach(function(t){t.children.forEach(function(e){e.ancestors.forEach(function(e){return t.descendentAncestors.add(e)}),e.descendentAncestors.forEach(function(e){return t.descendentAncestors.add(e)})})})}t.nodes.forEach(function(t){t.dalevel=Object($["a"])(t.descendentAncestors).filter(function(e){return e.longest==t.longest})})}function q(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"body",r=arguments.length>2?arguments[2]:void 0,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};console.log(r);var i,s=a.height||800,c=a.nodeRadius||3,o=Math.max.apply(Math,Object($["a"])(t.nodes.map(function(t){return t.x})))+c,h=l["d"](e).append("svg").attr("preserveAspectRatio","xMinYMin meet").attr("viewBox","0 0 ".concat(o+50," ").concat(s+50)),u="paths";switch(u){case"arrows":h.append("svg:defs").append("svg:marker").attr("id","end-arrow").attr("viewBox","0 -5 10 10").attr("refX",6).attr("markerWidth",3).attr("markerHeight",3).attr("orient","auto").append("svg:path").attr("d","M0,-5L10,0L0,5"),i=h.selectAll(".link").data(t.links).enter().append("svg:path");break;case"lines":i=h.selectAll(".link").data(t.links).enter().append("svg:line");break;case"paths":i=h.selectAll(".link").data(t.links).enter().append("svg:path").attr("stroke-width",.75).attr("fill","none")}function d(t){return t.phantom?"phantom-"+t.name.split(" ").join("-").split("(").join("").split(")").join("").replace(/\//g,"-"):"circle-"+t.name.split(" ").join("-").split("(").join("").split(")").join("").replace(/\//g,"-")}function f(t){return t.phantom?"phantom":"cell"}function p(t){return t.phantom?1:c}function g(t){return t.name}function v(t){return t.phantom?"#42b983":(t.istree,"#FFF")}function m(t){return t.phantom?"none":"#000"}function x(){var t=l["d"](this);t.attr("r",2*c);var e=n("7bac");(new e.Tooltip).data([{name:t.attr("name")}]).thead([function(t){return t.name}]).position("#"+t.attr("id")).render()}function y(){l["d"](this).attr("r",c),l["d"](".d3plus-tooltip").remove()}function b(){r.selectedCellName=l["d"](this).attr("name")}i.style("stroke",function(t){return t.color}).attr("class","link");var w=h.selectAll(".node").data(t.nodes).enter().append("circle").attr("id",d).attr("class",f).attr("r",p).attr("name",g).style("fill",v).style("stroke",m).style("stoke-width",.5);function C(){switch(u){case"arrows":i.attr("d",function(t){var e=t.target.x-t.source.x,n=t.target.y-t.source.y,r=Math.sqrt(e*e+n*n),a=e/r,i=n/r,s=t.source.phantom?1:c,o=t.target.phantom?1:c+2,l=t.source.x+s*a,h=t.source.y+s*i,u=t.target.x-o*a,d=t.target.y-o*i;return"M"+l+","+h+"L"+u+","+d});break;case"lines":i.attr("x1",function(t){return t.source.x}),i.attr("y1",function(t){return t.source.y}),i.attr("x2",function(t){return t.target.x}),i.attr("y2",function(t){return t.target.y});break;case"paths":i.attr("d",function(t){var e=t.source.x,n=t.source.y+p(t.source),r=t.target.x,a=t.target.y-p(t.target);return"M".concat(e,",").concat(n,"C").concat(e,",").concat(n+15,",").concat(r,",").concat(a-15,",").concat(r,",").concat(a)});break}w.attr("cx",function(t){return t.x}).attr("cy",function(t){return t.y})}w.filter(".cell").on("mouseover",x).on("mouseout",y).on("click",b),console.log(w),console.log(t.nodes),C()}function z(t){var e=Object.keys(t).map(function(t){return new F(t)}),n={};e.forEach(function(t){n[t.name]=t}),e.forEach(function(t,e){return t.index=e});var r=[],a=function(e){t[e].forEach(function(t){var a=n[e],i=n[t];if(a&&i){var s=new V(a,i);r.push(s),a.children.push(i),i.parents.push(a)}})};for(var i in t)a(i);return new B(e,r)}function K(t){t.nodes.forEach(function(t){t.primaryParent=void 0;var e=0;t.parents.forEach(function(n){var r=n.children.length;r>e&&(e=r,t.primaryParent=n)})}),t.nodes.forEach(function(t){return t.primaryChildren=[]}),t.nodes.forEach(function(t){t.primaryParent&&t.primaryParent.primaryChildren.push(t)})}function W(t){var e=50,n=50,r=5,a=5,i=2;function s(t){return i+(t.phantom?a:r)}function c(t){return i+2*(t.phantom?a:r)}function o(t,e,n){n.push(t);while(n.length<e.length){var r=Math.max(Math.min.apply(Math,Object($["a"])(n))-1,0),a=Math.max(Math.max.apply(Math,Object($["a"])(n))+1),i=h[Math.max(r,0)],s=h[Math.max(a,e.length)];i>=s?(n.includes(r)||n.push(r),n.includes(a)||n.push(a)):(n.includes(a)||n.push(a),n.includes(r)||n.push(r))}}function l(t,e){e.push(Math.floor(t/2));while(e.length<t){var n=Math.max(Math.min.apply(Math,Object($["a"])(e))-1,0),r=Math.min(Math.max.apply(Math,Object($["a"])(e))+1,t);e.includes(n)||e.push(n),!e.includes(r)&&r<t&&e.push(r)}}for(var h=t.getLevels(),u=h.length-1;u>=0;u--){var d=h[u];d.forEach(function(t){t.twidth=Math.max(c(t),I(t.primaryChildren.map(function(t){return t.twidth})))})}var f=0,p=-1,g=[];h.forEach(function(t,e){t.length>f&&(p=e,f=t.length)}),o(p,h,g);var v=11*h[p].length;g.forEach(function(t){var a=h[t],i=0;a.forEach(function(r){r.x=i+s(r),r.y=e+t*n,i+=r.width});var c=v,o=0;if(t>g[0]){var u=[];l(h[t-1].length,u),c=h[t-1][u[0]].x-s(h[t-1][u[0]])/2,o=h[t-1][u[0]].x+s(h[t-1][u[0]])/2,u.forEach(function(e){var n=h[t-1][e],r=n.primaryChildren;r.sort(function(t,e){return t.index>e.index?1:e.index>t.index?-1:0});var a=I(r.map(function(t){return t.width})),i=n.x-a/2,l=n.x+a/2;e>u[0]&&r.length>0&&(i<o?(i=o,l=i+a):(i=Math.max(o,n.x+s(r[0])/2-a),l=i+a)),e<u[0]&&r.length>0&&(l>c?(i=c-a,l=c):(l=Math.min(c,n.x-s(r[r.length-1])+a),i=l-a)),r.length>0&&(c=Math.min(c,i),o=Math.max(o,l)),r.forEach(function(t){t.x=i+s(t),i+=t.width})})}if(t<g[0]){var d=[];l(h[t].length,d),c=v/2,o=v/2,d.forEach(function(t,e){var n=a[t],i=n.primaryChildren;i.sort(function(t,e){return t.index>e.index?1:e.index>t.index?-1:0});var s=c-n.width/2,l=o+n.width/2;if(i.length>0?(s=Math.min.apply(Math,Object($["a"])(i.map(function(t){return t.x})))-i[0].width/2,l=Math.max.apply(Math,Object($["a"])(i.map(function(t){return t.x})))+i[i.length-1].width/2):(s=c,l=o),t>d[0]&&(s<o?(s=o,l=s+n.width):0==i.length?(s=o,l=c+n.width):(s=Math.max(o,s),l=s+n.width)),t<d[0]){var h=Math.floor((d.length-e)/2);l>c?(l=c,s=l-n.width):0==i.length?(l=c,s=l-n.width):s<h*r*2?(l=h*r*2,s=l-n.width):(l=Math.min(c,l),s=l-n.width)}c=Math.min(c,s),o=Math.max(o,l);var u=l-s;n.x=l-u/2})}})}var X={name:"cell-graph",props:{cellData:Object},mounted:function(){},data:function(){return{selectedCellName:"",keyValueDict:[],listLocalCopy:[],loaded:!1}},methods:{generateListCopy:function(t){return Object.entries(H.a.cloneDeep(t))},highlightSearch:function(t,e){var n=l["d"](e).select("svg");if(n.selectAll(".cell").style("fill","#FFF"),t.length!==this.listLocalCopy.length&&""!==this.$store.getters.getSearch)for(var r=0;r<t.length;r++)n.select("#circle-"+t[r][0].split(" ").join("-").split("(").join("").split(")").join("").replace(/\//g,"-")).transition().style("fill","#ff7878")},showDag:function(){var t=this,e=2e3,n=2e3,r=[];Object.keys(this.cellData).forEach(function(e){var n=t.cellData[e];n.forEach(function(t){r.push([e,t])})});var a=L["a"]()(r),i=L["c"]().decross(L["b"]())(a);console.log(i),console.log("LINKS",i.links()),console.log("NODES",i.descendants());var s=l["d"](this.$refs.graph).append("svg").attr("preserveAspectRatio","xMinYMin meet").attr("viewBox","0 0 ".concat(e+50," ").concat(n+50)),c=l["c"]().curve(l["a"]).x(function(t){return t.x*e}).y(function(t){return t.y*n}),o=s.append("g").attr("transform","translate(".concat(0,",",0,")"));o.append("g").selectAll("path").data(i.links()).enter().append("path").attr("d",function(t){var e=t.source,n=t.target,r=t.data;return c([{x:e.x,y:e.y}].concat(r.points||[],[{x:n.x,y:n.y}]))}).attr("fill","none").attr("stroke","#42b983");var h=o.append("g").selectAll("g").data(i.descendants()).enter().append("g").attr("transform",function(t){var r=t.x,a=t.y;return"translate(".concat(r*e,", ").concat(a*n,")")});h.append("circle").attr("r",5).attr("fill","white").attr("stroke","black"),h.append("text").text(function(t){return t.id}).attr("text-anchor","middle").attr("alignment-baseline","middle").style("font-size","2px")},showDag2:function(){var t=z(this.cellData);Y(t),K(t);for(var e=0;e<20;e++)R(t,3,e);t.links.forEach(function(t){return t.color=(t.target.primaryParent,t.source,"#42b983")}),W(t),q(t,this.$refs.graph,this)}},computed:{filteredData:function(){if(""===this.$store.getters.getSearch)return this.listLocalCopy;var t=new RegExp(this.search,"i");return this.listLocalCopy.filter(function(e){return t.test(e[0])||t.test(e[1])})},search:{get:function(){return this.$store.getters.getSearch},set:function(t){return this.$store.dispatch("changeSearch",t)}}},watch:{cellData:function(){var t=this;this.loaded=!0,this.listLocalCopy=this.generateListCopy(this.cellData);var e=Object.entries(this.listLocalCopy);e.forEach(function(e){t.keyValueDict[e[1][0]]=e[1][1]}),console.log(this.keyValueDict);for(var n=0;n<this.listLocalCopy.length;n++)this.listLocalCopy[n].push(n.toString());this.showDag2()},filteredData:function(){this.highlightSearch(this.filteredData,this.$refs.graph)},selectedCellName:function(){this.$store.dispatch("changeCellSelected",this.selectedCellName)}}},Q=X,U=(n("0f6c"),Object(d["a"])(Q,j,M,!1,null,"9d814ccc",null)),Z=U.exports,tt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{attrs:{row:"",wrap:"","align-center":""}},[n("v-flex",{attrs:{md12:""}},[n("v-card",{attrs:{height:"700"}},[n("v-card-title",{staticClass:"justify-center"},[n("h2",{staticClass:"title"},[t._v("List View")])]),n("v-card-text",[n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{md8:"",sm12:""}},[n("v-text-field",{attrs:{"append-icon":"search",label:"search the cell","single-line":"","hide-details":"","hide-no-data":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),n("v-spacer"),n("v-flex",{attrs:{md3:"",sm12:""}},[n("v-select",{attrs:{items:t.sortOptions,label:"sort"},on:{input:t.sortBasedOnOption},model:{value:t.option,callback:function(e){t.option=e},expression:"option"}})],1)],1),n("v-layout",{staticClass:"list",class:{"max-height":t.listHeight},attrs:{row:"",wrap:""}},[t.loaded&&t.listLocalCopy?n("v-flex",{attrs:{md12:""}},[n("v-list",t._l(t.filteredData,function(e,r){return n("v-list-item",{key:r,on:{click:function(n){return t.setCellSelected(e[0])}}},[n("v-layout",[e[0]&&e[1]?n("v-flex",{staticClass:"index",attrs:{md2:"","offset-md1":""}},[t._v(t._s(e[0])+":")]):t._e(),e[1]?n("v-flex",{attrs:{md8:"","offset-md1":""}},t._l(e[1],function(r,a){return n("v-list",{key:a,attrs:{dense:""}},[a===e[1].length-1?n("span",[t._v(t._s(r))]):n("span",[t._v(t._s(r)+",")])])}),1):t._e()],1)],1)}),1)],1):t._e()],1)],1)],1)],1)],1)},et=[],nt={name:"cell-list",props:{cellData:Object},mounted:function(){},data:function(){return{cardHeight:this.$store.getters.getCardHeight,detailItem:[],listHeight:"400px",listLocalCopy:[],loaded:!1,sortOptions:["default","neighbors"]}},methods:{setCellSelected:function(t){this.$store.dispatch("changeCellSelected",t)},generateListCopy:function(t){return Object.entries(_.cloneDeep(t))},sortBasedOnOption:function(t){switch(this.$store.dispatch("changeOption",String(t)),this.listLocalCopy=this.generateListCopy(this.cellData),t){case"neighbors":this.listLocalCopy=this.listLocalCopy.sort(function(t,e){return t[1].length<e[1].length?1:-1});break}},test:function(t){console.log("This click works")}},computed:{filteredData:function(){if(""===this.$store.getters.getSearch)return this.listLocalCopy;var t=new RegExp(this.search,"i");return this.listLocalCopy.filter(function(e){return t.test(e[0])||t.test(e[1])})},option:{get:function(){return this.$store.getters.getOption},set:function(t){this.$store.dispatch("changeOption",t)}},search:{get:function(){return this.$store.getters.getSearch},set:function(t){this.$store.dispatch("changeSearch",t)}}},watch:{cellData:function(){this.loaded=!0,this.listLocalCopy=this.generateListCopy(this.cellData)},search:function(){console.log(this.search)}}},rt=nt,at=(n("5ca5"),Object(d["a"])(rt,tt,et,!1,null,"36c74494",null)),it=at.exports,st={name:"app",components:{CellDetails:p,Header:b,GeneDetails:O,Graph:Z,List:it},mounted:function(){this.fetchData()},data:function(){return{loadedData:{},goDark:!0,search:""}},methods:{fetchData:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,l["b"]("./cell_type_graph.json");case 2:e=t.sent,this.loadedData=Object.assign({},e);case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},computed:{selectedTheme:function(){return this.goDark?"Dark Theme":"Light Theme"},setTheme:function(){return 1==this.goDark?this.$vuetify.theme.dark=!0:this.$vuetify.theme.dark=!1}}},ct=st,ot=(n("034f"),Object(d["a"])(ct,a,i,!1,null,null,null)),lt=ot.exports,ht=n("415c"),ut=n.n(ht),dt=n("ce5b"),ft=n.n(dt),pt=n("2f62");r["default"].use(pt["a"]);var gt={cardHeight:"600px",cellSelected:"",geneSelected:"",optionSelected:"default",search:""},vt={CHANGE_CARD_HEIGHT:function(t,e){t.cardHeight=e},CHANGE_CELL_SELECTED:function(t,e){t.cellSelected=e},CHANGE_GENE_SELECTED:function(t,e){t.geneSelected=e},CHANGE_SEARCH:function(t,e){t.search=e},CHANGE_OPTION:function(t,e){t.optionSelected=e}},mt={changeCardHeight:function(t,e){t.commit("CHANGE_CARD_HEIGHT",e)},changeCellSelected:function(t,e){t.commit("CHANGE_CELL_SELECTED",e)},changeGeneSelected:function(t,e){t.commit("CHANGE_GENE_SELECTED",e)},changeSearch:function(t,e){t.commit("CHANGE_SEARCH",e)},changeOption:function(t,e){t.commit("CHANGE_OPTION",e)}},xt={getCardHeight:function(t){return t.cardHeight},getCellSelected:function(t){return t.cellSelected},getGeneSelected:function(t){return t.geneSelected},getSearch:function(t){return t.search},getOption:function(t){return t.optionSelected}},yt=new pt["a"].Store({state:gt,mutations:vt,actions:mt,getters:xt});r["default"].config.productionTip=!1;var bt={name:"lodash"};r["default"].use(ut.a,bt);var wt={iconfont:"md",theme:{dark:!0,themes:{dark:{primary:"#42b983",secondary:"#b0bec5",accent:"#8c9eff",error:"#b71c1c"},light:{primary:"#42b983",secondary:"#b0bec5",accent:"#8c9eff",error:"#b71c1c"}}}};r["default"].use(ft.a),new r["default"]({render:function(t){return t(lt)},store:yt,vuetify:new ft.a(wt)}).$mount("#app")},"5ca5":function(t,e,n){"use strict";var r=n("a508"),a=n.n(r);a.a},"64a9":function(t,e,n){},"6df8":function(t,e,n){},"7b21":function(t,e,n){},a508:function(t,e,n){}});
//# sourceMappingURL=app.86875e3b.js.map