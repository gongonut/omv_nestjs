"use strict";(self.webpackChunkOMV_15=self.webpackChunkOMV_15||[]).push([[958],{8958:(M,m,s)=>{s.r(m),s.d(m,{ItemDetailModule:()=>D});var l=s(6895),g=s(2510),f=s(5861),t=s(4650),v=s(4737),d=s(7009),I=s(9705),c=s(9549),u=s(5113),Z=s(3238),h=s(7392);function _(i,a){if(1&i&&(t.TgZ(0,"mat-option",29),t._uU(1),t.qZA()),2&i){const o=a.$implicit;t.Q6J("value",o.codigo),t.xp6(1),t.hij(" ",o.nombre," ")}}function x(i,a){if(1&i){const o=t.EpF();t.TgZ(0,"div")(1,"div",30)(2,"img",31),t.NdJ("click",function(){const r=t.CHM(o).index,w=t.oxw();return t.KtG(w.setImage(r))}),t.qZA()()()}if(2&i){const o=a.$implicit;t.xp6(2),t.Q6J("src",o,t.LSH)}}function A(i,a){if(1&i&&(t.TgZ(0,"li")(1,"span",22),t._uU(2,"MEDIDAS: "),t.qZA(),t._uU(3),t.qZA()),2&i){const o=t.oxw();t.xp6(3),t.lnq("Alto: ",o.storage.selItem.medidas_alto," cm, ancho: ",o.storage.selItem.medidas_ancho," cm, largo: ",o.storage.selItem.medidas_largo," cm")}}function T(i,a){if(1&i&&(t.TgZ(0,"li")(1,"span",22),t._uU(2,"DIAMETRO: "),t.qZA(),t._uU(3),t.qZA()),2&i){const o=t.oxw();t.xp6(3),t.hij("",o.storage.selItem.medidas_diametro," cm")}}function U(i,a){if(1&i&&(t.TgZ(0,"li")(1,"span",22),t._uU(2,"MEDIDAS: "),t.qZA(),t._uU(3),t.qZA()),2&i){const o=t.oxw();t.xp6(3),t.Oqu(o.storage.selItem.medidas_omv)}}const L=[{path:"",component:(()=>{class i{constructor(o,e,n){this.storage=o,this.snkBar=e,this.nvg=n,this.imageList=[],this.imageOptionList=[],this.imageSMList=[],this.imageXLList=[],this.SelImg=""}ngOnInit(){this.getImageLists(),this.SelImg=this.imageXLList[0]||""}getImageLists(o=""){if(this.imageList=[],this.imageOptionList=[{codigo:"",nombre:"Todo"}],this.storage.selItem.materiales.forEach(e=>{this.imageOptionList.push({codigo:e.codigo,nombre:e.color_nombre})}),0===o.length)this.selMaterial=this.storage.selItem.materiales[-1],this.storage.selItem.materiales.forEach(e=>{this.imageList=[...this.imageList,...e.imagenes]});else{const e=this.storage.selItem.materiales.find(n=>n.codigo===o);e&&(this.selMaterial=e,this.imageList=[...this.imageList,...e.imagenes])}this.imageSMList=[],this.imageXLList=[],this.imageList.forEach(e=>{this.imageSMList.push(e.imagen.file_sm),this.imageXLList.push(e.imagen.file_md)})}setImage(o){this.SelImg=this.imageXLList[o]||""}getInventario(){return this.selMaterial?this.selMaterial.inventario||0:Number(this.storage.selItem.cantidad)||0}add2Cotiza(){this.selMaterial?this.storage.addWishQuote("1",this.storage.selItem,this.selMaterial)?this.snkBar.open("Agregado a la lista de Cotizaci\xf3n","Ok",{duration:3e3}):this.snkBar.open("No existe inventario","Ok",{duration:3e3}):this.snkBar.open("Debe seleccionar un color","Ok",{duration:3e3})}add2WishList(){this.storage.addWishQuote("0",this.storage.selItem)}onSelectEvent(o){this.getImageLists(o)}onSelected(o){var e=this;return(0,f.Z)(function*(){e.goBack()})()}goBack(){this.nvg.onRouteDetail("","","itemlist",!0)}}return i.\u0275fac=function(o){return new(o||i)(t.Y36(v.g),t.Y36(d.ux),t.Y36(I.$))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-item-detail"]],decls:65,vars:16,consts:[[1,"p-2","h-full","w-full"],[1,"sticky","flex","items-center","top-0","z-1000","m-1","p-2","h-14","font-medium","text-white","text-xl","bg-black","border","border-slate-200","cursor-pointer",3,"click"],["aria-hidden","true","xmlns","http://www.w3.org/2000/svg","fill","none","viewBox","0 0 8 14",1,"h-6","w-6","text-yellow-200","dark:text-white"],["stroke","currentColor","stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"],[1,"ml-4","text-yellow-200"],[1,"ml-5","flex","flex-wrap","font-thin","gap-1","truncate"],[1,"h-4"],[1,"text-gray-400","truncate"],[1,"overflow-auto"],[1,"text-3xl","text-gray-700","text-center"],[1,"flex","flex-row","flex-wrap"],[1,"h-full","w-full","md:w-2/4","pr-8"],["alt","",1,"grow","w-fit","object-fill",3,"src"],["appearance","outline",1,"my-2","h-12","w-full"],[3,"selectionChange"],[3,"value",4,"ngFor","ngForOf"],[1,"h-2"],[1,"flex","flex-row","items-start","h-28","w-full","overflow-x-auto"],[4,"ngFor","ngForOf"],[1,"h-full","w-full","md:w-2/4"],[1,"pl-2","mt-2","font-medium"],[1,"grow","pl-4","list-disc","text-sm","max-h-72"],[1,"font-medium"],[1,"h-1"],[4,"ngIf"],[1,"flex","flex-row","justify-start","items-center","gap-3"],[1,"font-medium","bg-lime-300","p-2","w-52","rounded-md","shadow-lg","text-center","hover:text-red-800",3,"click"],["fontIcon","add_shopping_cart"],["fontIcon","favorite"],[3,"value"],[1,"h-20","w-24"],["alt","",1,"h-20","w-24","object-fill","border","border-gray-200",3,"src","click"]],template:function(o,e){1&o&&(t.TgZ(0,"div",0)(1,"div",1),t.NdJ("click",function(){return e.goBack()}),t.O4$(),t.TgZ(2,"svg",2),t._UZ(3,"path",3),t.qZA(),t.kcU(),t.TgZ(4,"div",4),t._uU(5," Cat\xe1logo "),t.qZA(),t.TgZ(6,"div",5)(7,"div",6),t._uU(8),t.qZA(),t.TgZ(9,"div",7),t._uU(10),t.qZA()()(),t.TgZ(11,"div",8)(12,"div",9),t._uU(13),t.qZA(),t.TgZ(14,"div",10)(15,"div",11),t._UZ(16,"img",12),t.TgZ(17,"mat-form-field",13)(18,"mat-label"),t._uU(19,"Color"),t.qZA(),t.TgZ(20,"mat-select",14),t.NdJ("selectionChange",function(r){return e.onSelectEvent(r.value)}),t.YNc(21,_,2,2,"mat-option",15),t.qZA()(),t._UZ(22,"div",16),t.TgZ(23,"div",17),t.YNc(24,x,3,1,"div",18),t.qZA()(),t.TgZ(25,"div",19)(26,"div",20),t._uU(27),t.qZA(),t._UZ(28,"div",6),t.TgZ(29,"ul",21)(30,"li")(31,"span",22),t._uU(32,"MATERIAL: "),t.qZA(),t._uU(33),t.qZA(),t._UZ(34,"div",23),t.YNc(35,A,4,3,"li",24),t.YNc(36,T,4,1,"li",24),t._UZ(37,"div",23),t.YNc(38,U,4,1,"li",24),t._UZ(39,"div",23),t.TgZ(40,"li")(41,"span",22),t._uU(42,"\xc1REA DE IMPRESI\xd3N APROXIMADA: "),t.qZA(),t._uU(43),t.qZA(),t._UZ(44,"div",23),t.TgZ(45,"li")(46,"span",22),t._uU(47,"MARCA: "),t.qZA(),t._uU(48),t.qZA(),t._UZ(49,"div",23)(50,"div",23),t.TgZ(51,"li")(52,"span",22),t._uU(53,"INVENTARIO: "),t.qZA(),t._uU(54),t.ALo(55,"number"),t.qZA(),t._UZ(56,"div",23),t.qZA(),t._UZ(57,"div",16),t.TgZ(58,"div",25)(59,"div",26),t.NdJ("click",function(){return e.add2Cotiza()}),t._uU(60," Cotizar "),t._UZ(61,"mat-icon",27),t.qZA(),t.TgZ(62,"div",26),t.NdJ("click",function(){return e.add2WishList()}),t._uU(63," Lista de deseos "),t._UZ(64,"mat-icon",28),t.qZA()()()()()()),2&o&&(t.xp6(8),t.hij(" ",e.storage.filter.catFilter[0]," "),t.xp6(2),t.hij(" ",e.storage.filter.catFilter[1]," "),t.xp6(3),t.Oqu(e.storage.selItem.descripcion_comercial),t.xp6(3),t.Q6J("src",e.SelImg,t.LSH),t.xp6(5),t.Q6J("ngForOf",e.imageOptionList),t.xp6(3),t.Q6J("ngForOf",e.imageSMList),t.xp6(3),t.Oqu(e.storage.selItem.descripcion_larga),t.xp6(6),t.Oqu(e.storage.selItem.material),t.xp6(2),t.Q6J("ngIf",e.storage.selItem.medidas_alto),t.xp6(1),t.Q6J("ngIf",e.storage.selItem.medidas_diametro),t.xp6(2),t.Q6J("ngIf",e.storage.selItem.medidas_omv),t.xp6(5),t.Oqu(e.storage.selItem.area_impresion),t.xp6(5),t.Oqu(e.storage.selItem.tecnica_marca_descripcion),t.xp6(6),t.hij("",t.lcZ(55,14,e.getInventario())," unidades"))},dependencies:[l.sg,l.O5,c.KE,c.hX,u.gD,Z.ey,h.Hw,l.JJ]}),i})()}];let C=(()=>{class i{}return i.\u0275fac=function(o){return new(o||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({imports:[g.Bz.forChild(L),g.Bz]}),i})();var p=s(4006);let D=(()=>{class i{}return i.\u0275fac=function(o){return new(o||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({imports:[l.ez,C,p.u5,p.UX,u.LD,h.Ps,d.ZX]}),i})()}}]);