(function(e){function t(t){for(var r,a,o=t[0],c=t[1],l=t[2],h=0,d=[];h<o.length;h++)a=o[h],i[a]&&d.push(i[a][0]),i[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);u&&u(t);while(d.length)d.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],r=!0,o=1;o<n.length;o++){var c=n[o];0!==i[c]&&(r=!1)}r&&(s.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},i={app:0},s=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var l=0;l<o.length;l++)t(o[l]);var u=c;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("64a9"),i=n.n(r);i.a},"14ed":function(e,t,n){},"1b13":function(e,t,n){"use strict";var r=n("4d2d"),i=n.n(r);i.a},"1ecb":function(e,t,n){"use strict";var r=n("68be"),i=n.n(r);i.a},"4d2d":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d"),n("d1e7"),n("bf40");var r=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("v-app",{attrs:{dark:e.setTheme}},[n("v-container",{attrs:{fluid:""}},[n("v-switch",{staticClass:"switch",attrs:{color:"primary",label:e.selectedTheme},model:{value:e.goDark,callback:function(t){e.goDark=t},expression:"goDark"}}),n("Header",{attrs:{msg:"Cell Netowrk Viewer"}})],1),n("v-container",{attrs:{bg:"","grid-list-md":"",fluid:""}},[n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{md7:""}},[n("Graph",{attrs:{cellData:this.loadedData}})],1),n("v-flex",{attrs:{md5:""}},[n("CellList",{attrs:{cellData:this.loadedData}})],1)],1),n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{md7:""}},[n("CellDetails")],1),n("v-flex",{attrs:{md5:""}},[n("GeneDetails")],1)],1)],1)],1)],1)},s=[],a=(n("96cf"),n("3b8d")),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-layout",{attrs:{row:"",wrap:"","align-center":""}},[n("v-flex",{attrs:{md12:""}},[n("v-card",{attrs:{"max-height":"1300"}},[n("v-card-title",{staticClass:"justify-center"},[n("h4",{staticClass:"view-title"},[e._v("Cell Details View")]),n("v-spacer"),n("v-btn",{attrs:{medium:"",color:"red","justify-right":"",dark:""},on:{click:e.removeCellSelected}},[n("v-icon",{attrs:{dark:""}},[e._v("remove_circle")])],1)],1),n("v-card-text",[n("v-layout",{attrs:{row:""}},[e.cellSelectedExist&&e.geneDataExist(e.cellSelected[0])?n("v-flex",{attrs:{md12:"",sm12:""}},[n("v-layout",[n("v-flex",{attrs:{md9:"",sm12:""}},[n("v-text-field",{attrs:{"append-icon":"search",label:"search","single-line":"","hide-details":"","hide-no-data":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),n("v-spacer"),n("v-flex",{attrs:{md3:"",sm12:""}},[n("v-select",{attrs:{items:e.sortOptions,label:"sort"},on:{input:e.sortBasedOnOption},model:{value:e.option,callback:function(t){e.option=t},expression:"option"}})],1)],1),e.geneDataExist(e.cellSelected[0])?n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{md6:"",sm6:""}},[n("h3",{staticClass:"sub-title"},[e._v(e._s(e.cellSelected[0]))]),n("v-list",{staticClass:"list"},e._l(e.filteredData[0],function(t,r){return n("v-list-item",{key:r,class:[t[2]===e.geneNameOnHover?"highlight-theme":""],attrs:{dense:""},on:{click:function(n){return e.setGeneItem(t)},mouseover:function(n){return e.setGeneNameOnHover(t)},mouseleave:function(t){return e.clearGeneNameOnHover()}}},[n("span",[n("span",{staticClass:"index"},[e._v(e._s(t[2])+":")]),e._v("\n                      "+e._s(t[1])+"\n                    ")])])}),1)],1),2==e.cellSelected.length&&e.geneDataExist(e.cellSelected[1])?n("v-flex",{attrs:{md6:"",sm6:""}},[n("h3",{staticClass:"sub-title"},[e._v(e._s(e.cellSelected[1]))]),n("v-list",{staticClass:"list"},e._l(e.filteredData[1],function(t,r){return n("v-list-item",{key:r,class:[t[2]===e.geneNameOnHover?"highlight-theme":""],attrs:{dense:""},on:{click:function(n){return e.setGeneItem(t)},mouseover:function(n){return e.setGeneNameOnHover(t)},mouseleave:function(t){return e.clearGeneNameOnHover()}}},[n("span",[n("span",{staticClass:"index"},[e._v(e._s(t[2])+":")]),e._v("\n                      "+e._s(t[1])+"\n                    ")])])}),1)],1):e._e()],1):e._e()],1):e._e()],1)],1)],1)],1)],1)},c=[],l=(n("386d"),n("6762"),n("2fdb"),n("ac6a"),n("55dd"),n("5698")),u={name:"cell-details",props:[],mounted:function(){this.fetchData()},data:function(){return{cardHighlight:!1,loadedGeneData:{},sortOptions:["default","magnitude"],geneNameOnHover:""}},methods:{sortBasedOnOption:function(e){if(0!=this.$store.getters.getCellDetails.length)switch(e){case"magnitude":console.log(this.geneCellCopy1),this.geneCellCopy1=this.geneCellCopy1.sort(function(e,t){Math.abs(e[1]),Math.abs(t[1])})}},cellSelectedExist:function(){return 0!==this.$store.getters.getCellSelected.length},fetchData:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,l["c"]("./top_abs_10_dict.json");case 2:t=e.sent,this.loadedGeneData=Object.assign({},t);case 4:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),geneDataExist:function(e){return void 0!==this.loadedGeneData[e]},getDefaultCells:function(){var e=this.$store.getters.getCellSelected,t=[];return t.push(this.loadedGeneData[e[0]]),e.length>1&&t.push(this.loadedGeneData[e[1]]),t},sortCells:function(){var e=this.$store.getters.getCellSelected,t=[];return t.push(this.loadedGeneData[e[0]].concat().sort(function(e,t){return e[1]<t[1]?1:-1})),e.length>1&&t.push(this.loadedGeneData[e[1]].concat().sort(function(e,t){return e[1]<t[1]?1:-1})),t},removeCellSelected:function(){this.$store.dispatch("popFromCellSelected")},setGeneItem:function(e){this.$store.dispatch("changeGeneSelected",e[2])},setGeneNameOnHover:function(e){this.geneNameOnHover=e[2]},clearGeneNameOnHover:function(){this.geneNameOnHover=""}},computed:{cellSelected:{get:function(){return this.$store.getters.getCellSelected}},currentCells:function(){return"default"===this.$store.getters.getOption?this.getDefaultCells():this.sortCells()},dynamicData:function(){return 0==this.geneCellCopy1.length?void 0:this.$store.getters.getCellDetails},filteredData:function(){var e=this;if(""===this.$store.getters.getGeneSearch)return this.currentCells;var t=[],n=this.currentCells,r=[],i=[];return n.length>1&&n[1].forEach(function(t){t[2].includes(e.search)&&i.push(t)}),n.length>0&&n[0].forEach(function(t){t[2].includes(e.search)&&r.push(t)}),t.push(r),t.push(i),t},option:{get:function(){return this.$store.getters.getOption},set:function(e){this.$store.dispatch("changeOption",e)}},search:{get:function(){return this.$store.getters.getGeneSearch},set:function(e){this.$store.dispatch("changeGeneSearch",e)}},selectedTheme:function(){return!0===this.onHover?"highlight-theme":""}},watch:{cellSelected:function(){var e=this.$store.getters.getCellSelected;this.$store.dispatch("changeCellDetails",[]),0!==e.length&&(this.geneCellCopy1=this.loadedGeneData[e[0]],this.$store.dispatch("addToCellDetails",this.geneCellCopy1),e.length>1&&(this.geneCellCopy2=this.loadedGeneData[e[1]],this.$store.dispatch("addToCellDetails",this.geneCellCopy2)))}}},h=u,d=(n("9fbb"),n("2877")),f=Object(d["a"])(h,o,c,!1,null,"870a8dd8",null),p=f.exports,g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-layout",{attrs:{row:"",wrap:"","align-center":""}},[n("v-flex",{attrs:{md12:"",center:""}},[n("h1",{staticClass:"view-title"},[e._v("🦠"+e._s(e.msg)+"🧬")])])],1)},v=[],m={name:"app-header",props:{msg:String}},C=m,E=Object(d["a"])(C,g,v,!1,null,"6c560743",null),y=E.exports,S=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-layout",{attrs:{row:"",wrap:"","align-center":""}},[n("v-flex",{attrs:{md12:""}},[n("v-card",{attrs:{"max-height":"650"}},[n("v-card-title",{staticClass:"justify-center"},[n("h4",{staticClass:"view-title"},[e._v("Gene Details View")]),n("v-spacer"),n("v-btn",{attrs:{medium:"",color:"red","justify-right":"",dark:""},on:{click:e.removeGeneDetails}},[n("v-icon",{attrs:{dark:""}},[e._v("remove_circle")])],1)],1),n("v-card-text",[n("v-layout",{attrs:{row:"",wrap:""}},[e.geneNotEmpty()?n("v-flex",{attrs:{md9:"",sm12:""}},[n("v-text-field",{attrs:{"append-icon":"search",label:"search","single-line":"","hide-details":"","hide-no-data":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1):e._e(),n("v-spacer"),e.geneNotEmpty()?n("v-flex",{attrs:{md3:"",sm12:""}},[n("v-select",{attrs:{items:e.sortOptions,label:"sort"},on:{input:e.sortBasedOnOption},model:{value:e.option,callback:function(t){e.option=t},expression:"option"}})],1):e._e()],1),n("v-layout",[e.geneNotEmpty()?n("v-flex",[n("h3",{staticClass:"sub-title"},[e._v("Gene: "+e._s(e.geneSelected))]),n("div",{staticClass:"gene-web-link"},[n("a",{attrs:{target:"_blank"},on:{click:function(t){return e.navigateToGenePage()}}},[e._v("Gene data web link")])]),n("v-list",{staticClass:"list",class:{"max-height":e.listHeight}},e._l(e.filteredGeneCellList,function(t,r){return n("v-list-item",{key:r,on:{click:function(n){return e.setCellSelected(t[0])}}},[n("v-layout",[n("v-flex",{staticClass:"index",attrs:{md3:"","offset-md1":""}},[e._v(e._s(t[0])+": ")]),n("v-flex",{attrs:{md6:"","offset-md1":""}},[e._v(e._s(t[1]))])],1)],1)}),1)],1):e._e()],1)],1)],1)],1)],1)},x=[],L=n("768b"),b=(n("ffc1"),n("28a5"),n("a481"),{name:"gene-details",props:[],mounted:function(){this.fetchData()},data:function(){return{cellTypeNames:[],filteredList:[],listHeight:"400px",loadedDictData:{},sortOptions:["default","strength","magnitude"]}},methods:{fetchData:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,l["c"]("./top_abs_10_dict.json");case 2:t=e.sent,this.loadedDictData=Object.assign({},t);case 4:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),filterBySearchList:function(e){var t=this,n=[];return e.forEach(function(e){e[0].includes(t.search)&&n.push(e)}),n},formatToId:function(e){return e.split(" ").join("-").split("(").join("").split(")").join("").replace(/\//g,"-")},geneNotEmpty:function(){return""!==this.geneSelected},navigateToGenePage:function(){window.open("http://useast.ensembl.org/Homo_sapiens/Gene/Summary?g="+this.geneSelected,"_blank")},removeGeneDetails:function(){this.$store.dispatch("changeGeneSelected","")},returnToDefaultList:function(){for(var e=[],t=this,n=0,r=Object.entries(this.loadedDictData);n<r.length;n++)for(var i=Object(L["a"])(r[n],2),s=i[0],a=i[1],o=a,c=0;c<o.length;c++)if(o[c][2]===t.geneSelected){var l=s,u=a[c][1];e.push([l,u])}return this.filterBySearchList(e)},setCellSelected:function(e){var t=this.$store.getters.getCellSelected;t.length>1&&t.pop(),t.push(e),this.$store.dispatch("changeCellSelected",t)},sortBasedOnOption:function(e){switch(e){case"default":return this.filterBySearchList(this.filteredList);case"strength":return this.filterBySearchList(this.filteredList.sort(function(e,t){return Math.abs(e[1])>Math.abs(t[1])?-1:1}));case"magnitude":return this.filterBySearchList(this.filteredList.sort(function(e,t){return e[1]>t[1]?-1:1}))}},topGeneDataExist:function(e,t){return"undefined"!==typeof e[this.geneSelected]}},computed:{filteredGeneCellList:function(){return"default"===this.$store.getters.getGeneSearchOption?this.returnToDefaultList():this.sortBasedOnOption(this.$store.getters.getGeneSearchOption)},geneSelected:{get:function(){return this.$store.getters.getGeneSelected}},option:{get:function(){return this.$store.getters.getGeneSearchOption},set:function(e){this.$store.dispatch("changeGeneSearchOption",e)}},search:{get:function(){return this.$store.getters.getCellInGeneSearch},set:function(e){this.$store.dispatch("changeCellInGeneSearch",e)}}},watch:{geneSelected:function(){this.$store.dispatch("changeGeneSearchOption","default");var e=this;e.filteredList=[],this.$store.dispatch("changeTopGeneCellList",[]);for(var t=0,n=Object.entries(this.loadedDictData);t<n.length;t++)for(var r=Object(L["a"])(n[t],2),i=r[0],s=r[1],a=s,o=0;o<a.length;o++)if(a[o][2]===e.geneSelected){var c=i,l=s[o][1];e.filteredList.push([c,l]),e.$store.dispatch("addToTopGeneCellList",[c,l])}}}}),O=b,D=(n("1b13"),Object(d["a"])(O,S,x,!1,null,"7ccf93b6",null)),G=D.exports,w=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{md12:""}},[n("v-card",{attrs:{"max-height":"600"}},[n("v-card-title",{staticClass:"justify-center"},[n("h4",{staticClass:"view-title"},[e._v("Graph View")]),n("v-spacer"),e.cellType1?n("v-chip",{staticClass:"ma-2"},[e._v(e._s(e.cellType1))]):e._e(),e.cellType2?n("v-chip",{staticClass:"ma-2"},[e._v(e._s(e.cellType2))]):e._e()],1),n("div",{ref:"graph",attrs:{id:"graph"}})],1)],1)],1)},T=[],k=(n("6b54"),n("3b2b"),n("2ef0")),$=n.n(k),N=(n("7f7f"),n("75fc")),j=n("b0b4"),H=(n("5df3"),n("4f7f"),n("d225"));function A(e){if(!e.length)return 0;var t=e.reduce(function(e,t){return t+e}),n=t/e.length;return n}function P(e){return e.length?e.reduce(function(e,t){return t+e}):0}function I(e){for(var t=Array(e),n=0;n<t.length;n++)t[n]=[];return t}function R(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=e.getLevels();function i(e,r){e.primaryParent||console.log("node ".concat(e.index," ").concat(e.name," no primary parent"));var i=e.primaryParent.levelIdx,s=r.primaryParent.levelIdx;if(i!=s)return i-s;if(t>1)if(e.parents.length>1||r.parents.length>1){var a=A(e.parents.map(function(e){return e.levelIdx})),o=A(r.parents.map(function(e){return e.levelIdx}));if(a!=o)return a-o}else if(n>5&&1==e.children.length&&1==r.children.length){var c=e.children[0],l=r.children[0];while(1==c.children.length&&1==l.children.length)c=c.children[0],l=l.children[0];var u=c.levelIdx,h=l.levelIdx;return u-h}if(t>2&&e.dalevel.length&&r.dalevel.length){var d=A(e.dalevel.map(function(e){return e.levelIdx})),f=A(r.dalevel.map(function(e){return e.levelIdx}));if(d!=f)return d-f}return 0}var s=0;r.forEach(function(e,t){t>0&&e.sort(i),e.forEach(function(e,t){e.levelIdx=t,e.index=s++})}),e.nodes.sort(function(e,t){return e.index-t.index}),e.nodes.forEach(function(e){return e.primaryChildren.sort(function(e,t){return e.index-t.index})}),e.nodes.forEach(function(e){return e.children.sort(function(e,t){return e.index-t.index})})}var M=function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Object(H["a"])(this,e),this.name=t,this.height="height"in n?n.height:10,this.width="width"in n?n.width:10,this.parents=[],this.children=[],this.istree=void 0,this.index=void 0,this.phantom=!1,this.depth=-1,this.longest=-1,this.levelIdx=void 0,this.ancestors=new Set,this.descendentAncestors=new Set,this.dalevel=[],this.levelrank=void 0,this.x=void 0,this.y=void 0,this.primaryParent=void 0,this.primaryChildren=[],this.grandkidIndex=void 0,this.twidth=void 0},B=function e(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"#000",i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1;Object(H["a"])(this,e),this.source=t,this.target=n,this.color=r,this.value=i},V=function(){function e(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];Object(H["a"])(this,e),this.nodes=t,this.links=n,this.constraints=r,this.groups=i,this.analysis=void 0}return Object(j["a"])(e,[{key:"roots",value:function(){return this.nodes.filter(function(e){return!e.parents.length})}},{key:"leaves",value:function(){return this.nodes.filter(function(e){return!e.children.length})}},{key:"breadthFirst",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=[],r=this.roots();while(r.length){var i=r.shift();n.push(e(i)),i.children.forEach(function(e){t&&r.includes(e)||r.push(e)})}return n}},{key:"getLevels",value:function(){var e=this.nodes,t=Math.max.apply(Math,Object(N["a"])(e.map(function(e){return e.longest}))),n=I(t);return e.forEach(function(e){return n[e.longest-1].push(e)}),n.forEach(function(e){return e.forEach(function(e,t){return e.levelIdx=t})}),n}},{key:"orderNodes",value:function(){var e=0,t=[],n=this.nodes.filter(function(e){return!e.primaryParent});while(n.length){var r=n.shift();r.index=e++,t.push(r),r.primaryChildren.forEach(function(e){return n.push(e)})}this.nodes=t}},{key:"describe",value:function(){var e={};this.nodes.forEach(function(t){var n=t.parents.length;e[n]?e[n]++:e[n]=1})}},{key:"hierarchy",value:function(){var e,t=this.roots();function n(e){e.children=[],e.nchildren.forEach(function(t){var r={name:t.name,node:t,nchildren:t.primaryChildren};e.children.push(r),n(r)})}return e=1==t.length?{name:t[0].name,node:t[0],nchildren:t[0].primaryChildren}:{name:"Fake Root",node:void 0,nchildren:t},n(e),e}}]),e}();function F(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"name",n="[";return e.forEach(function(e){return n+=e[t]+" "}),n+="]",n}function z(e){var t=e.links.filter(function(e){return e.target.longest-e.source.longest>1}),n=e.links.filter(function(e){return e.target.longest-e.source.longest==1});e.oldLinks=e.links,t.forEach(function(t,r){t.target.parents.splice(t.target.parents.indexOf(t.source),1),t.source.children.splice(t.source.children.indexOf(t.target),1);for(var i=t.source,s=t.source.longest+1;s<t.target.longest;s++){var a=new M("connector-".concat(r,"-").concat(s));a.phantom=!0,a.parents.push(i),a.longest=s,a.depth=t.source.depth+1,a.istree=!1,i.children.push(a),e.nodes.push(a),n.push(new B(i,a)),i=a}t.target.parents.push(i),i.children.push(t.target),n.push(new B(i,t.target))}),e.links=n}function U(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=e.roots(),r=[];n.forEach(function(e){e.depth=1,r.push(e)});var i=function(){var e=r.shift();e.children.forEach(function(t){t.depth<1&&(t.depth=e.depth+1,r.push(t))})};while(r.length)i();r=[],n.forEach(function(e){e.longest=1,r.push(e)});var s=function(){var e=r.shift(),t=e.longest+1;e.children.forEach(function(e){e.longest<t&&(e.longest=t,r.push(e))})};while(r.length)s();function a(e){if(void 0!=e.istree)return e.istree;var t=!0;return e.children.forEach(function(e){(!a(e)||e.parents.length>1)&&(t=!1)}),e.istree=t,t}e.nodes.forEach(function(e){return a(e)}),t&&z(e),e.nodes.forEach(function(e,t){return e.index=t});var o=e.getLevels();e.breadthFirst(function(e){e.children.forEach(function(t){e.ancestors.forEach(function(e){return t.ancestors.add(e)}),t.ancestors.add(e)})});for(var c=o.length-1;c>=0;c--){var l=o[c];l.forEach(function(e){e.children.forEach(function(t){t.ancestors.forEach(function(t){return e.descendentAncestors.add(t)}),t.descendentAncestors.forEach(function(t){return e.descendentAncestors.add(t)})})})}e.nodes.forEach(function(e){e.dalevel=Object(N["a"])(e.descendentAncestors).filter(function(t){return t.longest==e.longest})})}function J(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"body",i=arguments.length>2?arguments[2]:void 0,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},a=s.nodeRadius||4.5,o=s.bezierVert||15,c=s.height||985,u=Math.max.apply(Math,Object(N["a"])(e.nodes.map(function(e){return e.x})))+a,h=l["d"](r).append("svg").attr("preserveAspectRatio","xMinYMin meet").attr("viewBox","0 0 ".concat(u," ").concat(c)).call(l["f"]().on("zoom",function(){h.attr("transform",l["a"].transform)})).append("g");function d(e,t,n,r){var i=o;return"C".concat(e,",").concat(t+a+i,",").concat(n,",").concat(r-a-i,",").concat(n,",").concat(r-a)}function f(e){return e.split(" ").join("-").split("(").join("").split(")").join("").split(",").join("").replace(/\//g,"-")}function p(e){return"path-"+f(e["source"]["name"])+"---"+f(e["target"]["name"])}function g(e){return e.phantom?"phantom-"+f(e.name):"circle-"+f(e.name)}function v(){var e=l["d"](this);e.attr("r",2*a);var t=n("7bac");(new t.Tooltip).data([{name:e.attr("name")}]).thead([function(e){return e.name}]).position("#"+e.attr("id")).render()}function m(){l["d"](this).attr("r",a),l["d"](".d3plus-tooltip").remove()}function C(){i.selectedCellName=l["d"](this).attr("name")}function E(e){return e.phantom?"phantom":"cell"}function _(e){return e.phantom?"#42b98300":(e.istree,"#faed27")}function y(e){return e.name}function S(e){return e.phantom?"none":"#000"}t=h.selectAll(".link").data(e.links.filter(function(e){return!e.source.phantom})).enter().append("svg:path").attr("id",p).attr("stroke-width",.75).attr("fill","none").attr("d",function(e){var t=e.source.x,n=e.source.y+a,r="M".concat(t,",").concat(n),i=e.target;while(i.phantom){var s=i.x,o=i.y;r+=d(t,n,s,o),r+="L".concat(s,",").concat(o+a),i=i.children[0],t=s,n=o}var c=i.x,l=i.y;return r+=d(t,n,c,l),r}),t.style("stroke",function(e){return e.color}).attr("class","link"),t.on("mouseover",function(){l["d"](this).style("stroke","#FF6F61")}),t.on("mouseout",function(e){l["d"](this).style("stroke",e.color)});var x=h.selectAll(".node").data(s.drawPhantoms?e.nodes:e.nodes.filter(function(e){return!e.phantom})).enter().append("circle").attr("name",y).attr("id",g).attr("class",E).attr("r",a).style("fill",_).style("stroke",S).style("stroke-width",.5).attr("cx",function(e){return e.x}).attr("cy",function(e){return e.y});x.filter(".cell").on("mouseover",v).on("mouseout",m).on("click",C),x.append("title").text(function(e){return"".concat(e.index,":").concat(e.name," ").concat(F(e.dalevel,"index")," tw:").concat(e.twidth)})}n("456d");function Y(e){var t=Object.keys(e).map(function(e){return new M(e)}),n={};t.forEach(function(e){n[e.name]=e}),t.forEach(function(e,t){return e.index=t});var r=[],i=function(t){e[t].forEach(function(e){var i=n[t],s=n[e];if(i||console.log("Bad node ".concat(t," as source")),s||console.log("Bad node ".concat(e," as target")),i&&s){var a=new B(i,s);r.push(a),i.children.push(s),s.parents.push(i)}})};for(var s in e)i(s);return new V(t,r)}function q(e){e.nodes.forEach(function(e){e.primaryParent=void 0;var t=0;e.parents.forEach(function(n){var r=n.children.length;r>t&&(t=r,e.primaryParent=n)})}),e.nodes.forEach(function(e){return e.primaryChildren=[]}),e.nodes.forEach(function(e){e.primaryParent&&e.primaryParent.primaryChildren.push(e)})}function K(e){var t=50,n=65,r=5,i=2,s=2;function a(e){return s+(e.phantom?i:r)}function o(e){return s+2*(e.phantom?i:r)}for(var c=e.getLevels(),l=c.length-1;l>=0;l--){var u=c[l];u.forEach(function(e){e.twidth=Math.max(o(e),P(e.primaryChildren.map(function(e){return e.twidth})))})}c.forEach(function(e,i){var s=r;e.forEach(function(e){e.x=Math.max(s+a(e),e.primaryParent?e.primaryParent.x:0),e.y=t+i*n,s=e.x-a(e)+e.twidth})});for(var h=e.nodes.length-1;h>=0;h--){var d=e.nodes[h];if(d.primaryChildren.length){var f=A(d.primaryChildren.map(function(e){return e.x})),p=e.nodes[h+1];if(p.longest==d.longest){var g=p.x-a(d)-a(p)+s;d.x=Math.min(g,f)}else d.x=f}}}var Q={name:"cell-graph",props:{cellData:Object},mounted:function(){},data:function(){return{cellType1:"",cellType2:"",keyValueDict:{},selectedCellName:"",listLocalCopy:[],listSize:2,loaded:!1,pathsDict:{}}},methods:{formatToId:function(e){return e.split(" ").join("-").split("(").join("").split(")").join("").replace(/\//g,"-")},generateListCopy:function(e){return Object.entries($.a.cloneDeep(e))},highlightSearch:function(e,t){},showGraph:function(){var e=Y(this.cellData);U(e),q(e);for(var t=0;t<20;t++)R(e,3,t);e.links.forEach(function(e){return e.color=e.target.primaryParent==e.source?"#42b983":"666"}),K(e),J(e,this.$refs.graph,this)}},computed:{cellSelected:{get:function(){return this.$store.getters.getCellSelected}},filteredData:function(){if(""===this.$store.getters.getSearch)return this.listLocalCopy;var e=new RegExp(this.search,"i");return this.listLocalCopy.filter(function(t){return e.test(t[0])||e.test(t[1])})},filteredDataReverse:function(){if(""===this.$store.getters.getSearch)return[];var e=new RegExp(this.search,"i");return this.listLocalCopy.filter(function(t){return!(e.test(t[0])||e.test(t[1]))})},topGeneCellList:{get:function(){return this.$store.getters.getTopGeneCellList}},search:{get:function(){return this.$store.getters.getSearch},set:function(e){return this.$store.dispatch("changeSearch",e)}}},watch:{cellData:function(){var e=this;this.loaded=!0,this.listLocalCopy=this.generateListCopy(this.cellData);var t=Object.entries(this.listLocalCopy);t.forEach(function(t){e.keyValueDict[t[1][0]]=t[1][1]}),console.log(this.keyValueDict);for(var n=0;n<this.listLocalCopy.length;n++)this.listLocalCopy[n].push(n.toString());this.showGraph()},cellSelected:function(){var e=this.$store.getters.getCellSelected;this.cellType1="",this.cellType2="",1==e.length?this.cellType1=e[0]:2==e.length&&(this.cellType1=e[0],this.cellType2=e[1]);var t=l["d"](this.$refs.graph).select("svg");t.selectAll(".cell").transition().style("fill","#faed27");for(var n=0;n<e.length;n++){var r=l["d"](this.$refs.graph).select("svg");r.select("#circle-"+this.formatToId(e[n])).transition().style("fill","#f33")}},filteredData:function(){this.highlightSearch(this.filteredDataReverse,this.$refs.graph)},selectedCellName:function(){var e=this.$store.getters.getCellSelected;while(e.length>=this.listSize)e.pop();e.push(this.selectedCellName),this.$store.dispatch("changeCellSelected",e)},topGeneCellList:function(){var e=l["d"](this.$refs.graph).select("svg"),t=l["d"](this.$refs.graph).select("svg");e.selectAll(".cell").transition().style("stroke","none");for(var n=this.$store.getters.getTopGeneCellList,r=0;r<n.length;r++)t.select("#circle-"+this.formatToId(n[r][0])).transition().style("stroke","#000").style("stroke-width","2px")}}},W=Q,X=(n("1ecb"),Object(d["a"])(W,w,T,!1,null,"2c5fa44c",null)),Z=X.exports,ee=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-layout",{attrs:{row:"",wrap:"","align-center":""}},[n("v-flex",{attrs:{md12:""}},[n("v-card",{attrs:{"max-height":"600"}},[n("v-card-title",{staticClass:"justify-left"},[n("h4",{staticClass:"view-title"},[e._v("List View")])]),n("v-card-text",[n("v-layout",[n("v-flex",{attrs:{md9:"",sm12:""}},[n("v-text-field",{attrs:{"append-icon":"search",label:"search","single-line":"","hide-details":"","hide-no-data":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),n("v-spacer"),n("v-flex",{attrs:{md3:"",sm12:""}},[n("v-select",{attrs:{items:e.sortOptions,label:"sort"},on:{input:e.sortBasedOnOption},model:{value:e.option,callback:function(t){e.option=t},expression:"option"}})],1)],1),n("v-layout",{staticClass:"list",class:{"max-height":e.listHeight},attrs:{row:"",wrap:""}},[e.loaded&&e.listLocalCopy?n("v-flex",{attrs:{md12:""}},[n("v-list",e._l(e.filteredData,function(t,r){return n("v-list-item",{key:r,staticClass:"list",on:{click:function(n){return e.setCellSelected(t[0])}}},[n("v-layout",[t[0]&&t[1]?n("v-flex",{staticClass:"index",attrs:{md3:"","offset-md1":""}},[e._v(e._s(t[0])+": ")]):e._e(),t[1]?n("v-flex",{attrs:{md6:"","offset-md1":""}},e._l(t[1],function(r,i){return n("v-list",{key:i,attrs:{dense:""}},[i===t[1].length-1?n("span",[e._v(e._s(r))]):n("span",[e._v(e._s(r)+",")])])}),1):e._e()],1)],1)}),1)],1):e._e()],1)],1)],1)],1)],1)},te=[],ne={name:"cell-list",props:{cellData:Object},mounted:function(){},data:function(){return{cardHeight:this.$store.getters.getCardHeight,detailItem:[],listHeight:"500px",listLocalCopy:[],listSize:2,loaded:!1,sortOptions:["default","neighbors"]}},methods:{setCellSelected:function(e){var t=this.$store.getters.getCellSelected;while(t.length>=this.listSize)t.pop();t.push(e),this.$store.dispatch("changeCellSelected",t)},generateListCopy:function(e){return Object.entries(_.cloneDeep(e))},sortBasedOnOption:function(e){switch(this.$store.dispatch("changeOption",String(e)),this.listLocalCopy=this.generateListCopy(this.cellData),e){case"neighbors":return this.listLocalCopy.sort(function(e,t){return e[1].length<t[1].length?1:-1})}},test:function(e){console.log("This click works")}},computed:{filteredData:function(){var e=this;return""===this.$store.getters.getSearch?this.listLocalCopy:this.listLocalCopy.filter(function(t){return t[0].includes(e.search)||t[1].includes(e.search)})},option:{get:function(){return this.$store.getters.getOption},set:function(e){this.$store.dispatch("changeOption",e)}},search:{get:function(){return this.$store.getters.getSearch},set:function(e){this.$store.dispatch("changeSearch",e)}}},watch:{cellData:function(){this.loaded=!0,this.listLocalCopy=this.generateListCopy(this.cellData)}}},re=ne,ie=(n("9b3c"),Object(d["a"])(re,ee,te,!1,null,"74ac2921",null)),se=ie.exports,ae={name:"app",components:{Header:y,Graph:Z,CellList:se,CellDetails:p,GeneDetails:G},mounted:function(){this.fetchData()},data:function(){return{loadedData:{},goDark:!0,search:""}},methods:{fetchData:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,l["c"]("./cell_type_graph.json");case 2:t=e.sent,this.loadedData=Object.assign({},t);case 4:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},computed:{selectedTheme:function(){return this.goDark?"Dark Theme":"Light Theme"},setTheme:function(){return 1==this.goDark?this.$vuetify.theme.dark=!0:this.$vuetify.theme.dark=!1}}},oe=ae,ce=(n("034f"),Object(d["a"])(oe,i,s,!1,null,null,null)),le=ce.exports,ue=n("415c"),he=n.n(ue),de=n("ce5b"),fe=n.n(de),pe=n("2f62");r["default"].use(pe["a"]);var ge={cellDetails:[],cellSelected:[],cellSelectedPrevious:"",topGeneCellList:[],topGeneCellListPrevious:[],geneSearchOption:"default",geneSelected:"",optionSelected:"default",cellInGeneSearch:"",geneSearch:"",search:""},ve={ADD_TO_CELL_DETAILS:function(e,t){e.cellDetails.push(t)},CHANGE_CELL_DETAILS:function(e,t){e.cellDetails=t},ADD_TO_CELL_SELECTED:function(e,t){e.cellSelected.push(t)},CHANGE_CELL_SELECTED:function(e,t){e.cellSelected=t},POP_FROM_CELL_SELECTED:function(e){e.cellSelected.pop()},ADD_TO_TOP_GENE_CELL_LIST:function(e,t){e.topGeneCellList.push(t)},CHANGE_TOP_GENE_CELL_LIST:function(e,t){e.topGeneCellList=t},CHANGE_TOP_GENE_CELL_LIST_PREVIOUS:function(e,t){e.topGeneCellListPrevious=t},CHANGE_CELL_SELECTED_PREVIOUS:function(e,t){e.cellSelectedPrevious=t},CHANGE_GENE_SEARCH_OPTION:function(e,t){e.geneSearchOption=t},CHANGE_GENE_SELECTED:function(e,t){e.geneSelected=t},CHANGE_CELL_IN_GENE_SEARCH:function(e,t){e.cellInGeneSearch=t},CHANGE_GENE_SEARCH:function(e,t){e.geneSearch=t},CHANGE_SEARCH:function(e,t){e.search=t},CHANGE_OPTION:function(e,t){e.optionSelected=t}},me={addToCellDetails:function(e,t){e.commit("ADD_TO_CELL_DETAILS",t)},changeCellDetails:function(e,t){e.commit("CHANGE_CELL_DETAILS",t)},addToCellSelected:function(e,t){e.commit("ADD_TO_CELL_SELECTED",t)},changeCellSelected:function(e,t){e.commit("CHANGE_CELL_SELECTED",t)},popFromCellSelected:function(e){e.commit("POP_FROM_CELL_SELECTED")},addToTopGeneCellList:function(e,t){e.commit("ADD_TO_TOP_GENE_CELL_LIST",t)},changeTopGeneCellList:function(e,t){e.commit("CHANGE_TOP_GENE_CELL_LIST",t)},changeTopGeneCellListPrevious:function(e,t){e.commit("CHANGE_TOP_GENE_CELL_LIST_PREVIOUS",t)},changeCellSelectedPrevious:function(e,t){e.commit("CHANGE_CELL_SELECTED_PREVIOUS",t)},changeGeneSearchOption:function(e,t){e.commit("CHANGE_GENE_SEARCH_OPTION",t)},changeGeneSelected:function(e,t){e.commit("CHANGE_GENE_SELECTED",t)},changeCellInGeneSearch:function(e,t){e.commit("CHANGE_CELL_IN_GENE_SEARCH",t)},changeGeneSearch:function(e,t){e.commit("CHANGE_GENE_SEARCH",t)},changeSearch:function(e,t){e.commit("CHANGE_SEARCH",t)},changeOption:function(e,t){e.commit("CHANGE_OPTION",t)}},Ce={getCellDetails:function(e){return e.cellDetails},getCellSelected:function(e){return e.cellSelected},getTopGeneCellList:function(e){return e.topGeneCellList},getTopGeneCellListPrevious:function(e){return e.topGeneCellListPrevious},getCellSelectedPrevious:function(e){return e.cellSelectedPrevious},getGeneSearchOption:function(e){return e.geneSearchOption},getGeneSelected:function(e){return e.geneSelected},getCellInGeneSearch:function(e){return e.cellInGeneSearch},getGeneSearch:function(e){return e.geneSearch},getSearch:function(e){return e.search},getOption:function(e){return e.optionSelected}},Ee=new pe["a"].Store({state:ge,mutations:ve,actions:me,getters:Ce});r["default"].config.productionTip=!1;var _e={name:"lodash"};r["default"].use(he.a,_e);var ye={iconfont:"md",theme:{dark:!0,themes:{dark:{primary:"#42b983",secondary:"#b0bec5",accent:"#8c9eff",error:"#b71c1c"},light:{primary:"#42b983",secondary:"#b0bec5",accent:"#8c9eff",error:"#b71c1c"}}}};r["default"].use(fe.a),new r["default"]({render:function(e){return e(le)},store:Ee,vuetify:new fe.a(ye)}).$mount("#app")},"64a9":function(e,t,n){},6507:function(e,t,n){},"68be":function(e,t,n){},"9b3c":function(e,t,n){"use strict";var r=n("6507"),i=n.n(r);i.a},"9fbb":function(e,t,n){"use strict";var r=n("14ed"),i=n.n(r);i.a}});
//# sourceMappingURL=app.f9929d6d.js.map