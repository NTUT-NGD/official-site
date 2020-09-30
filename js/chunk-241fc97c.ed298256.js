(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-241fc97c"],{1326:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",t._l(t.getGames,(function(e,i){return a("v-row",{key:i},[e.name==t.name?a("v-col",{attrs:{cols:"12",md:"6",sm:"6",lg:"6"}},[a("h1",{staticClass:"text-right",staticStyle:{position:"relative",left:"-20px","font-size":"50px"}},[a("span",{staticClass:"hidden-sm-and-up caption"},[t._v(t._s(e.madeBy))]),t._v(" "+t._s(e.name)+" ")]),a("p",{staticClass:"hidden-xs-only text-right",staticStyle:{position:"relative",left:"-20px"}},[t._v(" "+t._s(e.madeBy)+" ")]),a("v-card-title",[a("h5",{staticClass:"hidden-sm-and-up",staticStyle:{"font-size":"15px"}},[t._v(" "+t._s(e.content)+" ")])]),a("h5",{staticClass:"text-right hidden-xs-only",staticStyle:{"font-size":"15px"}},[t._v(" "+t._s(e.content)+" ")])],1):t._e(),e.name==t.name?a("v-col",{attrs:{cols:"12",md:"6",sm:"6",lg:"6"}},[a("v-row",{staticClass:"d-flex flex-row-reverse"},[a("v-btn",{attrs:{icon:"",color:"primary",href:e.github}},[a("v-icon",{attrs:{color:"secondary"}},[t._v(" mdi-github ")])],1),a("v-btn",{attrs:{icon:"",color:"primary",href:e.materials}},[a("v-icon",{attrs:{color:"secondary"}},[t._v(" mdi-image ")])],1)],1),e.imgURL?a("v-img",{staticStyle:{position:"relative","z-index":"1"},attrs:{src:e.imgURL,"aspect-ratio":"1.7"}}):t._e(),e.imgURL?t._e():a("v-skeleton-loader",{staticClass:"mx-auto",attrs:{type:"image"}}),a("div",{staticClass:"hidden-xs-only",staticStyle:{"z-index":"0",position:"relative",top:"-10%",left:"-10%"}},[a("div",{staticClass:"quaternary d-flex align-end mb-6",staticStyle:{height:"100px",width:"300px"}},[a("span",{staticClass:"tertiary--text",staticStyle:{"font-size":"15px",position:"relative",top:"-10px",left:"15px"}},[t._v(t._s(e.license)+" ")])])])],1):t._e()],1)})),1)},s=[],n={name:"Games",components:{},data:function(){return{name:"Lomo",game:[]}},methods:{},mounted:function(){},computed:{getGames:function(){return this.$store.state.games}}},r=n,o=a("2877"),l=a("6544"),c=a.n(l),d=a("8336"),h=a("99d9"),p=a("62ad"),u=a("132d"),m=a("adda"),v=a("0fd9"),g=a("3129"),f=Object(o["a"])(r,i,s,!1,null,null,null);e["default"]=f.exports;c()(f,{VBtn:d["a"],VCardTitle:h["d"],VCol:p["a"],VIcon:u["a"],VImg:m["a"],VRow:v["a"],VSkeletonLoader:g["a"]})},"1f09":function(t,e,a){},3129:function(t,e,a){"use strict";a("a630"),a("c975"),a("d81d"),a("ac1f"),a("3ca3"),a("5319"),a("1276");var i=a("3835"),s=a("5530"),n=(a("1f09"),a("c995")),r=a("24b2"),o=a("7560"),l=a("58df"),c=a("80d2");e["a"]=Object(l["a"])(n["a"],r["a"],o["a"]).extend({name:"VSkeletonLoader",props:{boilerplate:Boolean,loading:Boolean,tile:Boolean,transition:String,type:String,types:{type:Object,default:function(){return{}}}},computed:{attrs:function(){return this.isLoading?this.boilerplate?{}:Object(s["a"])({"aria-busy":!0,"aria-live":"polite",role:"alert"},this.$attrs):this.$attrs},classes:function(){return Object(s["a"])(Object(s["a"])({"v-skeleton-loader--boilerplate":this.boilerplate,"v-skeleton-loader--is-loading":this.isLoading,"v-skeleton-loader--tile":this.tile},this.themeClasses),this.elevationClasses)},isLoading:function(){return!("default"in this.$scopedSlots)||this.loading},rootTypes:function(){return Object(s["a"])({actions:"button@2",article:"heading, paragraph",avatar:"avatar",button:"button",card:"image, card-heading","card-avatar":"image, list-item-avatar","card-heading":"heading",chip:"chip","date-picker":"list-item, card-heading, divider, date-picker-options, date-picker-days, actions","date-picker-options":"text, avatar@2","date-picker-days":"avatar@28",heading:"heading",image:"image","list-item":"text","list-item-avatar":"avatar, text","list-item-two-line":"sentences","list-item-avatar-two-line":"avatar, sentences","list-item-three-line":"paragraph","list-item-avatar-three-line":"avatar, paragraph",paragraph:"text@3",sentences:"text@2",table:"table-heading, table-thead, table-tbody, table-tfoot","table-heading":"heading, text","table-thead":"heading@6","table-tbody":"table-row-divider@6","table-row-divider":"table-row, divider","table-row":"table-cell@6","table-cell":"text","table-tfoot":"text@2, avatar@2",text:"text"},this.types)}},methods:{genBone:function(t,e){return this.$createElement("div",{staticClass:"v-skeleton-loader__".concat(t," v-skeleton-loader__bone")},e)},genBones:function(t){var e=this,a=t.split("@"),s=Object(i["a"])(a,2),n=s[0],r=s[1],o=function(){return e.genStructure(n)};return Array.from({length:r}).map(o)},genStructure:function(t){var e=[];t=t||this.type||"";var a=this.rootTypes[t]||"";if(t===a);else{if(t.indexOf(",")>-1)return this.mapBones(t);if(t.indexOf("@")>-1)return this.genBones(t);a.indexOf(",")>-1?e=this.mapBones(a):a.indexOf("@")>-1?e=this.genBones(a):a&&e.push(this.genStructure(a))}return[this.genBone(t,e)]},genSkeleton:function(){var t=[];return this.isLoading?t.push(this.genStructure()):t.push(Object(c["r"])(this)),this.transition?this.$createElement("transition",{props:{name:this.transition},on:{afterEnter:this.resetStyles,beforeEnter:this.onBeforeEnter,beforeLeave:this.onBeforeLeave,leaveCancelled:this.resetStyles}},t):t},mapBones:function(t){return t.replace(/\s/g,"").split(",").map(this.genStructure)},onBeforeEnter:function(t){this.resetStyles(t),this.isLoading&&(t._initialStyle={display:t.style.display,transition:t.style.transition},t.style.setProperty("transition","none","important"))},onBeforeLeave:function(t){t.style.setProperty("display","none","important")},resetStyles:function(t){t._initialStyle&&(t.style.display=t._initialStyle.display||"",t.style.transition=t._initialStyle.transition,delete t._initialStyle)}},render:function(t){return t("div",{staticClass:"v-skeleton-loader",attrs:this.attrs,on:this.$listeners,class:this.classes,style:this.isLoading?this.measurableStyles:void 0},[this.genSkeleton()])}})}}]);
//# sourceMappingURL=chunk-241fc97c.ed298256.js.map