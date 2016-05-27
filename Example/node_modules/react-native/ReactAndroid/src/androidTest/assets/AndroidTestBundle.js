(function(global) {global.
__DEV__=true;

global.__BUNDLE_START_TIME__=Date.now();
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {var 
modules=Object.create(null);
var inGuard=false;

function define(id,factory){
modules[id]={
factory:factory,
module:{exports:{}},
isInitialized:false,
hasError:false};


if(__DEV__){
babelHelpers.extends(modules[id].module,{
hot:{
acceptCallback:null,
accept:function accept(callback){
modules[id].module.hot.acceptCallback=callback;}}});}}






function _require(id){
var mod=modules[id];
if(mod&&mod.isInitialized){
return mod.module.exports;}


return requireImpl(id);}


function requireImpl(id){
if(global.ErrorUtils&&!inGuard){
inGuard=true;
var returnValue;
try{
returnValue=requireImpl.apply(this,arguments);}
catch(e){
global.ErrorUtils.reportFatalError(e);}

inGuard=false;
return returnValue;}


var mod=modules[id];
if(!mod){
var msg='Requiring unknown module "'+id+'"';
if(__DEV__){
msg+='. If you are sure the module is there, try restarting the packager or running "npm install".';}

throw new Error(msg);}


if(mod.hasError){
throw new Error(
'Requiring module "'+id+'" which threw an exception');}








if(__DEV__){var 
Systrace=_require.Systrace;}


try{


mod.isInitialized=true;

if(__DEV__){
Systrace.beginEvent('JS_require_'+id);}




mod.factory.call(global,global,_require,mod.module,mod.module.exports);

if(__DEV__){
Systrace.endEvent();}}

catch(e){
mod.hasError=true;
mod.isInitialized=false;
throw e;}


return mod.module.exports;}


if(__DEV__){
_require.Systrace={beginEvent:function beginEvent(){},endEvent:function endEvent(){}};}


global.__d=define;
global.require=_require;

if(__DEV__){(function(){
function accept(id,factory,inverseDependencies){
var mod=modules[id];

if(!mod){
define(id,factory);
return true;}


if(!mod.module.hot){
console.warn(
'Cannot accept module because Hot Module Replacement '+
'API was not installed.');

return false;}



if(factory){
mod.factory=factory;}

mod.isInitialized=false;
_require(id);

if(mod.module.hot.acceptCallback){
mod.module.hot.acceptCallback();
return true;}else 
{

if(!inverseDependencies){
throw new Error('Undefined `inverseDependencies`');}



return acceptAll(inverseDependencies[id],inverseDependencies);}}



function acceptAll(modules,inverseDependencies){
if(!modules||modules.length===0){
return true;}


var notAccepted=modules.filter(function(module){
return !accept(module,undefined,inverseDependencies);});


var parents=[];
for(var i=0;i<notAccepted.length;i++){

if(inverseDependencies[notAccepted[i]].length===0){
return false;}


parents.pushAll(inverseDependencies[notAccepted[i]]);}


return acceptAll(parents,inverseDependencies);}


global.__accept=accept;})();}
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {Object.

















assign=function(target,sources){
if(__DEV__){
if(target==null){
throw new TypeError('Object.assign target cannot be null or undefined');}

if(typeof target!=='object'&&typeof target!=='function'){
throw new TypeError(
'In this environment the target of assign MUST be an object.'+
'This error is a performance optimization and not spec compliant.');}}




for(var nextIndex=1;nextIndex<arguments.length;nextIndex++){
var nextSource=arguments[nextIndex];
if(nextSource==null){
continue;}


if(__DEV__){
if(typeof nextSource!=='object'&&
typeof nextSource!=='function'){
throw new TypeError(
'In this environment the sources for assign MUST be an object.'+
'This error is a performance optimization and not spec compliant.');}}








for(var key in nextSource){
if(__DEV__){
var hasOwnProperty=Object.prototype.hasOwnProperty;
if(!hasOwnProperty.call(nextSource,key)){
throw new TypeError(
'One of the sources for assign has an enumerable key on the '+
'prototype chain. This is an edge case that we do not support. '+
'This error is a performance optimization and not spec compliant.');}}



target[key]=nextSource[key];}}



return target;};
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {var 

















inspect=function(){























function inspect(obj,opts){
var ctx={
seen:[],
stylize:stylizeNoColor};

return formatValue(ctx,obj,opts.depth);}


function stylizeNoColor(str,styleType){
return str;}


function arrayToHash(array){
var hash={};

array.forEach(function(val,idx){
hash[val]=true;});


return hash;}



function formatValue(ctx,value,recurseTimes){

var primitive=formatPrimitive(ctx,value);
if(primitive){
return primitive;}



var keys=Object.keys(value);
var visibleKeys=arrayToHash(keys);



if(isError(value)&&(
keys.indexOf('message')>=0||keys.indexOf('description')>=0)){
return formatError(value);}



if(keys.length===0){
if(isFunction(value)){
var name=value.name?': '+value.name:'';
return ctx.stylize('[Function'+name+']','special');}

if(isRegExp(value)){
return ctx.stylize(RegExp.prototype.toString.call(value),'regexp');}

if(isDate(value)){
return ctx.stylize(Date.prototype.toString.call(value),'date');}

if(isError(value)){
return formatError(value);}}



var base='',array=false,braces=['{','}'];


if(isArray(value)){
array=true;
braces=['[',']'];}



if(isFunction(value)){
var n=value.name?': '+value.name:'';
base=' [Function'+n+']';}



if(isRegExp(value)){
base=' '+RegExp.prototype.toString.call(value);}



if(isDate(value)){
base=' '+Date.prototype.toUTCString.call(value);}



if(isError(value)){
base=' '+formatError(value);}


if(keys.length===0&&(!array||value.length==0)){
return braces[0]+base+braces[1];}


if(recurseTimes<0){
if(isRegExp(value)){
return ctx.stylize(RegExp.prototype.toString.call(value),'regexp');}else 
{
return ctx.stylize('[Object]','special');}}



ctx.seen.push(value);

var output;
if(array){
output=formatArray(ctx,value,recurseTimes,visibleKeys,keys);}else 
{
output=keys.map(function(key){
return formatProperty(ctx,value,recurseTimes,visibleKeys,key,array);});}



ctx.seen.pop();

return reduceToSingleString(output,base,braces);}



function formatPrimitive(ctx,value){
if(isUndefined(value))
return ctx.stylize('undefined','undefined');
if(isString(value)){
var simple='\''+JSON.stringify(value).replace(/^"|"$/g,'').
replace(/'/g,"\\'").
replace(/\\"/g,'"')+'\'';
return ctx.stylize(simple,'string');}

if(isNumber(value))
return ctx.stylize(''+value,'number');
if(isBoolean(value))
return ctx.stylize(''+value,'boolean');

if(isNull(value))
return ctx.stylize('null','null');}



function formatError(value){
return '['+Error.prototype.toString.call(value)+']';}



function formatArray(ctx,value,recurseTimes,visibleKeys,keys){
var output=[];
for(var i=0,l=value.length;i<l;++i){
if(hasOwnProperty(value,String(i))){
output.push(formatProperty(ctx,value,recurseTimes,visibleKeys,
String(i),true));}else 
{
output.push('');}}


keys.forEach(function(key){
if(!key.match(/^\d+$/)){
output.push(formatProperty(ctx,value,recurseTimes,visibleKeys,
key,true));}});


return output;}



function formatProperty(ctx,value,recurseTimes,visibleKeys,key,array){
var name,str,desc;
desc=Object.getOwnPropertyDescriptor(value,key)||{value:value[key]};
if(desc.get){
if(desc.set){
str=ctx.stylize('[Getter/Setter]','special');}else 
{
str=ctx.stylize('[Getter]','special');}}else 

{
if(desc.set){
str=ctx.stylize('[Setter]','special');}}


if(!hasOwnProperty(visibleKeys,key)){
name='['+key+']';}

if(!str){
if(ctx.seen.indexOf(desc.value)<0){
if(isNull(recurseTimes)){
str=formatValue(ctx,desc.value,null);}else 
{
str=formatValue(ctx,desc.value,recurseTimes-1);}

if(str.indexOf('\n')>-1){
if(array){
str=str.split('\n').map(function(line){
return '  '+line;}).
join('\n').substr(2);}else 
{
str='\n'+str.split('\n').map(function(line){
return '   '+line;}).
join('\n');}}}else 


{
str=ctx.stylize('[Circular]','special');}}


if(isUndefined(name)){
if(array&&key.match(/^\d+$/)){
return str;}

name=JSON.stringify(''+key);
if(name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)){
name=name.substr(1,name.length-2);
name=ctx.stylize(name,'name');}else 
{
name=name.replace(/'/g,"\\'").
replace(/\\"/g,'"').
replace(/(^"|"$)/g,"'");
name=ctx.stylize(name,'string');}}



return name+': '+str;}



function reduceToSingleString(output,base,braces){
var numLinesEst=0;
var length=output.reduce(function(prev,cur){
numLinesEst++;
if(cur.indexOf('\n')>=0)numLinesEst++;
return prev+cur.replace(/\u001b\[\d\d?m/g,'').length+1;},
0);

if(length>60){
return braces[0]+(
base===''?'':base+'\n ')+
' '+
output.join(',\n  ')+
' '+
braces[1];}


return braces[0]+base+' '+output.join(', ')+' '+braces[1];}





function isArray(ar){
return Array.isArray(ar);}


function isBoolean(arg){
return typeof arg==='boolean';}


function isNull(arg){
return arg===null;}


function isNullOrUndefined(arg){
return arg==null;}


function isNumber(arg){
return typeof arg==='number';}


function isString(arg){
return typeof arg==='string';}


function isSymbol(arg){
return typeof arg==='symbol';}


function isUndefined(arg){
return arg===void 0;}


function isRegExp(re){
return isObject(re)&&objectToString(re)==='[object RegExp]';}


function isObject(arg){
return typeof arg==='object'&&arg!==null;}


function isDate(d){
return isObject(d)&&objectToString(d)==='[object Date]';}


function isError(e){
return isObject(e)&&(
objectToString(e)==='[object Error]'||e instanceof Error);}


function isFunction(arg){
return typeof arg==='function';}


function isPrimitive(arg){
return arg===null||
typeof arg==='boolean'||
typeof arg==='number'||
typeof arg==='string'||
typeof arg==='symbol'||
typeof arg==='undefined';}


function objectToString(o){
return Object.prototype.toString.call(o);}


function hasOwnProperty(obj,prop){
return Object.prototype.hasOwnProperty.call(obj,prop);}


return inspect;}();



var OBJECT_COLUMN_NAME='(index)';
var LOG_LEVELS={
trace:0,
info:1,
warn:2,
error:3};


function setupConsole(global){
if(!global.nativeLoggingHook){
return;}


function getNativeLogFunction(level){
return function(){
var str;
if(arguments.length===1&&typeof arguments[0]==='string'){
str=arguments[0];}else 
{
str=Array.prototype.map.call(arguments,function(arg){
return inspect(arg,{depth:10});}).
join(', ');}


var logLevel=level;
if(str.slice(0,9)==='Warning: '&&logLevel>=LOG_LEVELS.error){



logLevel=LOG_LEVELS.warn;}

global.nativeLoggingHook(str,logLevel);};}



var repeat=function repeat(element,n){
return Array.apply(null,Array(n)).map(function(){return element;});};


function consoleTablePolyfill(rows){

if(!Array.isArray(rows)){
var data=rows;
rows=[];
for(var key in data){
if(data.hasOwnProperty(key)){
var row=data[key];
row[OBJECT_COLUMN_NAME]=key;
rows.push(row);}}}



if(rows.length===0){
global.nativeLoggingHook('',LOG_LEVELS.info);
return;}


var columns=Object.keys(rows[0]).sort();
var stringRows=[];
var columnWidths=[];



columns.forEach(function(k,i){
columnWidths[i]=k.length;
for(var j=0;j<rows.length;j++){
var cellStr=rows[j][k].toString();
stringRows[j]=stringRows[j]||[];
stringRows[j][i]=cellStr;
columnWidths[i]=Math.max(columnWidths[i],cellStr.length);}});





var joinRow=function joinRow(row,space){
var cells=row.map(function(cell,i){
var extraSpaces=repeat(' ',columnWidths[i]-cell.length).join('');
return cell+extraSpaces;});

space=space||' ';
return cells.join(space+'|'+space);};


var separators=columnWidths.map(function(columnWidth){
return repeat('-',columnWidth).join('');});

var separatorRow=joinRow(separators,'-');
var header=joinRow(columns);
var table=[header,separatorRow];

for(var i=0;i<rows.length;i++){
table.push(joinRow(stringRows[i]));}






global.nativeLoggingHook('\n'+table.join('\n'),LOG_LEVELS.info);}



var originalConsole=global.console;
var descriptor=Object.getOwnPropertyDescriptor(global,'console');
if(descriptor){
Object.defineProperty(global,'originalConsole',descriptor);}


var console={
error:getNativeLogFunction(LOG_LEVELS.error),
info:getNativeLogFunction(LOG_LEVELS.info),
log:getNativeLogFunction(LOG_LEVELS.info),
warn:getNativeLogFunction(LOG_LEVELS.warn),
trace:getNativeLogFunction(LOG_LEVELS.trace),
table:consoleTablePolyfill};



Object.defineProperty(global,'console',{
value:console,
configurable:descriptor?descriptor.configurable:true,
enumerable:descriptor?descriptor.enumerable:true,
writable:descriptor?descriptor.writable:true});





if(__DEV__&&originalConsole){
Object.keys(console).forEach(function(methodName){
var reactNativeMethod=console[methodName];
if(originalConsole[methodName]){
console[methodName]=function(){
originalConsole[methodName].apply(originalConsole,arguments);
reactNativeMethod.apply(console,arguments);};}});}}






if(typeof module!=='undefined'){
module.exports=setupConsole;}else 
{
setupConsole(global);}
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {var 















ErrorUtils={
_inGuard:0,
_globalHandler:null,
setGlobalHandler:function setGlobalHandler(fun){
ErrorUtils._globalHandler=fun;},

getGlobalHandler:function getGlobalHandler(){
return ErrorUtils._globalHandler;},

reportError:function reportError(error){
ErrorUtils._globalHandler&&ErrorUtils._globalHandler(error);},

reportFatalError:function reportFatalError(error){
ErrorUtils._globalHandler&&ErrorUtils._globalHandler(error,true);},

applyWithGuard:function applyWithGuard(fun,context,args){
try{
ErrorUtils._inGuard++;
return fun.apply(context,args);}
catch(e){
ErrorUtils.reportError(e);}finally 
{
ErrorUtils._inGuard--;}},


applyWithGuardIfNeeded:function applyWithGuardIfNeeded(fun,context,args){
if(ErrorUtils.inGuard()){
return fun.apply(context,args);}else 
{
ErrorUtils.applyWithGuard(fun,context,args);}},


inGuard:function inGuard(){
return ErrorUtils._inGuard;},

guard:function guard(fun,name,context){
if(typeof fun!=='function'){
console.warn('A function must be passed to ErrorUtils.guard, got ',fun);
return null;}

name=name||fun.name||'<generated guard>';
function guarded(){
return (
ErrorUtils.applyWithGuard(
fun,
context||this,
arguments,
null,
name));}




return guarded;}};


global.ErrorUtils=ErrorUtils;






function setupErrorGuard(){
var onError=function onError(e){
global.console.error('Error: '+e.message+', stack:\n'+e.stack);};

global.ErrorUtils.setGlobalHandler(onError);}


setupErrorGuard();
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {if(











!String.prototype.startsWith){
String.prototype.startsWith=function(search){
'use strict';
if(this==null){
throw TypeError();}

var string=String(this);
var pos=arguments.length>1?
Number(arguments[1])||0:0;
var start=Math.min(Math.max(pos,0),string.length);
return string.indexOf(String(search),pos)===start;};}



if(!String.prototype.endsWith){
String.prototype.endsWith=function(search){
'use strict';
if(this==null){
throw TypeError();}

var string=String(this);
var stringLength=string.length;
var searchString=String(search);
var pos=arguments.length>1?
Number(arguments[1])||0:stringLength;
var end=Math.min(Math.max(pos,0),stringLength);
var start=end-searchString.length;
if(start<0){
return false;}

return string.lastIndexOf(searchString,start)===start;};}



if(!String.prototype.repeat){
String.prototype.repeat=function(count){
'use strict';
if(this==null){
throw TypeError();}

var string=String(this);
count=Number(count)||0;
if(count<0||count===Infinity){
throw RangeError();}

if(count===1){
return string;}

var result='';
while(count){
if(count&1){
result+=string;}

if(count>>=1){
string+=string;}}


return result;};}



if(!String.prototype.includes){
String.prototype.includes=function(search,start){
'use strict';
if(typeof start!=='number'){
start=0;}


if(start+search.length>this.length){
return false;}else 
{
return this.indexOf(search,start)!==-1;}};}
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {function 









findIndex(predicate,context){
if(this==null){
throw new TypeError(
'Array.prototype.findIndex called on null or undefined');}


if(typeof predicate!=='function'){
throw new TypeError('predicate must be a function');}

var list=Object(this);
var length=list.length>>>0;
for(var i=0;i<length;i++){
if(predicate.call(context,list[i],i,list)){
return i;}}


return -1;}


if(!Array.prototype.findIndex){
Object.defineProperty(Array.prototype,'findIndex',{
enumerable:false,
writable:true,
configurable:true,
value:findIndex});}




if(!Array.prototype.find){
Object.defineProperty(Array.prototype,'find',{
enumerable:false,
writable:true,
configurable:true,
value:function value(predicate,context){
if(this==null){
throw new TypeError(
'Array.prototype.find called on null or undefined');}


var index=findIndex.call(this,predicate,context);
return index===-1?undefined:this[index];}});}
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {if(












!Array.from){
Array.from=function(arrayLike){
if(arrayLike==null){
throw new TypeError('Object is null or undefined');}



var mapFn=arguments[1];
var thisArg=arguments[2];

var C=this;
var items=Object(arrayLike);
var symbolIterator=typeof Symbol==='function'?typeof Symbol==='function'?
Symbol.iterator:'@@iterator':
'@@iterator';
var mapping=typeof mapFn==='function';
var usingIterator=typeof items[symbolIterator]==='function';
var key=0;
var ret;
var value;

if(usingIterator){
ret=typeof C==='function'?
new C():
[];
var it=items[symbolIterator]();
var next;

while(!(next=it.next()).done){
value=next.value;

if(mapping){
value=mapFn.call(thisArg,value,key);}


ret[key]=value;
key+=1;}


ret.length=key;
return ret;}


var len=items.length;
if(isNaN(len)||len<0){
len=0;}


ret=typeof C==='function'?
new C(len):
new Array(len);

while(key<len){
value=items[key];

if(mapping){
value=mapFn.call(thisArg,value,key);}


ret[key]=value;

key+=1;}


ret.length=key;
return ret;};}
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {(






function(){

var hasOwnProperty=Object.prototype.hasOwnProperty;






if(typeof Object.entries!=='function'){
Object.entries=function(object){

if(object==null){
throw new TypeError('Object.entries called on non-object');}


var entries=[];
for(var key in object){
if(hasOwnProperty.call(object,key)){
entries.push([key,object[key]]);}}


return entries;};}








if(typeof Object.values!=='function'){
Object.values=function(object){

if(object==null){
throw new TypeError('Object.values called on non-object');}


var values=[];
for(var key in object){
if(hasOwnProperty.call(object,key)){
values.push(object[key]);}}


return values;};}})();
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {var 
















babelHelpers=global.babelHelpers={};

babelHelpers.createRawReactElement=function(){
var REACT_ELEMENT_TYPE=typeof Symbol==="function"&&(typeof Symbol==="function"?Symbol.for:"@@for")&&(typeof Symbol==="function"?Symbol.for:"@@for")("react.element")||0xeac7;
return function createRawReactElement(type,key,props){
return {
$$typeof:REACT_ELEMENT_TYPE,
type:type,
key:key,
ref:null,
props:props,
_owner:null};};}();




babelHelpers.classCallCheck=function(instance,Constructor){
if(!(instance instanceof Constructor)){
throw new TypeError("Cannot call a class as a function");}};



babelHelpers.createClass=function(){
function defineProperties(target,props){
for(var i=0;i<props.length;i++){
var descriptor=props[i];
descriptor.enumerable=descriptor.enumerable||false;
descriptor.configurable=true;
if("value" in descriptor)descriptor.writable=true;
Object.defineProperty(target,descriptor.key,descriptor);}}



return function(Constructor,protoProps,staticProps){
if(protoProps)defineProperties(Constructor.prototype,protoProps);
if(staticProps)defineProperties(Constructor,staticProps);
return Constructor;};}();



babelHelpers.defineProperty=function(obj,key,value){
if(key in obj){
Object.defineProperty(obj,key,{
value:value,
enumerable:true,
configurable:true,
writable:true});}else 

{
obj[key]=value;}


return obj;};


babelHelpers._extends=babelHelpers.extends=Object.assign||function(target){
for(var i=1;i<arguments.length;i++){
var source=arguments[i];

for(var key in source){
if(Object.prototype.hasOwnProperty.call(source,key)){
target[key]=source[key];}}}




return target;};


babelHelpers.get=function get(object,property,receiver){
if(object===null)object=Function.prototype;
var desc=Object.getOwnPropertyDescriptor(object,property);

if(desc===undefined){
var parent=Object.getPrototypeOf(object);

if(parent===null){
return undefined;}else 
{
return get(parent,property,receiver);}}else 

if("value" in desc){
return desc.value;}else 
{
var getter=desc.get;

if(getter===undefined){
return undefined;}


return getter.call(receiver);}};



babelHelpers.inherits=function(subClass,superClass){
if(typeof superClass!=="function"&&superClass!==null){
throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}


subClass.prototype=Object.create(superClass&&superClass.prototype,{
constructor:{
value:subClass,
enumerable:false,
writable:true,
configurable:true}});


if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;};


babelHelpers.interopRequireDefault=function(obj){
return obj&&obj.__esModule?obj:{
default:obj};};



babelHelpers.interopRequireWildcard=function(obj){
if(obj&&obj.__esModule){
return obj;}else 
{
var newObj={};

if(obj!=null){
for(var key in obj){
if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}



newObj.default=obj;
return newObj;}};



babelHelpers.objectWithoutProperties=function(obj,keys){
var target={};

for(var i in obj){
if(keys.indexOf(i)>=0)continue;
if(!Object.prototype.hasOwnProperty.call(obj,i))continue;
target[i]=obj[i];}


return target;};


babelHelpers.possibleConstructorReturn=function(self,call){
if(!self){
throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}


return call&&(typeof call==="object"||typeof call==="function")?call:self;};


babelHelpers.slicedToArray=function(){
function sliceIterator(arr,i){
var _arr=[];
var _n=true;
var _d=false;
var _e=undefined;

try{
for(var _i=arr[typeof Symbol==="function"?Symbol.iterator:"@@iterator"](),_s;!(_n=(_s=_i.next()).done);_n=true){
_arr.push(_s.value);

if(i&&_arr.length===i)break;}}

catch(err){
_d=true;
_e=err;}finally 
{
try{
if(!_n&&_i["return"])_i["return"]();}finally 
{
if(_d)throw _e;}}



return _arr;}


return function(arr,i){
if(Array.isArray(arr)){
return arr;}else 
if((typeof Symbol==="function"?Symbol.iterator:"@@iterator") in Object(arr)){
return sliceIterator(arr,i);}else 
{
throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();




babelHelpers.taggedTemplateLiteral=function(strings,raw){
return Object.freeze(Object.defineProperties(strings,{
raw:{
value:Object.freeze(raw)}}));};




babelHelpers.toArray=function(arr){
return Array.isArray(arr)?arr:Array.from(arr);};


babelHelpers.toConsumableArray=function(arr){
if(Array.isArray(arr)){
for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}

return arr2;}else 
{
return Array.from(arr);}};
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
__d(0 /* react-native/ReactAndroid/src/androidTest/assets/TestBundle.js */, function(global, require, module, exports) {'use strict';









console.disableYellowBox=true;


require(1 /* ScrollViewTestModule */);


var AppRegistry=require(189 /* AppRegistry */);

var apps=[
{
appKey:'ScrollViewTestApp',
component:function component(){return require(1 /* ScrollViewTestModule */).ScrollViewTestApp;}},

{
appKey:'HorizontalScrollViewTestApp',
component:function component(){return require(1 /* ScrollViewTestModule */).HorizontalScrollViewTestApp;}}];



AppRegistry.registerConfig(apps);
});
__d(1 /* ScrollViewTestModule */, function(global, require, module, exports) {'use strict';





var BatchedBridge=require(2 /* BatchedBridge */);
var React=require(28 /* React */);
var View=require(132 /* View */);
var ScrollView=require(175 /* ScrollView */);
var Text=require(182 /* Text */);
var StyleSheet=require(159 /* StyleSheet */);
var TouchableWithoutFeedback=require(187 /* TouchableWithoutFeedback */);
var ScrollListener=require(9 /* NativeModules */).ScrollListener;

var NUM_ITEMS=100;



var scrollViewApp;

var Item=React.createClass({displayName:'Item',
render:function render(){
return (
React.createElement(TouchableWithoutFeedback,{onPress:this.props.onPress},
React.createElement(View,{style:styles.item_container},
React.createElement(Text,{style:styles.item_text},this.props.text))));}});






var getInitialState=function getInitialState(){
var data=[];
for(var i=0;i<NUM_ITEMS;i++){
data[i]={text:'Item '+i+'!'};}

return {
data:data};};



var onScroll=function onScroll(e){
ScrollListener.onScroll(e.nativeEvent.contentOffset.x,e.nativeEvent.contentOffset.y);};


var onScrollBeginDrag=function onScrollBeginDrag(e){
ScrollListener.onScrollBeginDrag(e.nativeEvent.contentOffset.x,e.nativeEvent.contentOffset.y);};


var onScrollEndDrag=function onScrollEndDrag(e){
ScrollListener.onScrollEndDrag(e.nativeEvent.contentOffset.x,e.nativeEvent.contentOffset.y);};


var onItemPress=function onItemPress(itemNumber){
ScrollListener.onItemPress(itemNumber);};


var ScrollViewTestApp=React.createClass({displayName:'ScrollViewTestApp',
getInitialState:getInitialState,
onScroll:onScroll,
onItemPress:onItemPress,
onScrollBeginDrag:onScrollBeginDrag,
onScrollEndDrag:onScrollEndDrag,

scrollTo:function scrollTo(destX,destY){
this.refs.scrollView.scrollTo(destY,destX);},


render:function render(){var _this=this;
scrollViewApp=this;
var children=this.state.data.map(function(item,index){return (
React.createElement(Item,{
key:index,text:item.text,
onPress:_this.onItemPress.bind(_this,index)}));});

return (
React.createElement(ScrollView,{onScroll:this.onScroll,onScrollBeginDrag:this.onScrollBeginDrag,onScrollEndDrag:this.onScrollEndDrag,ref:'scrollView'},
children));}});





var HorizontalScrollViewTestApp=React.createClass({displayName:'HorizontalScrollViewTestApp',
getInitialState:getInitialState,
onScroll:onScroll,
onItemPress:onItemPress,

scrollTo:function scrollTo(destX,destY){
this.refs.scrollView.scrollTo(destY,destX);},


render:function render(){var _this2=this;
scrollViewApp=this;
var children=this.state.data.map(function(item,index){return (
React.createElement(Item,{
key:index,text:item.text,
onPress:_this2.onItemPress.bind(_this2,index)}));});

return (
React.createElement(ScrollView,{horizontal:true,onScroll:this.onScroll,ref:'scrollView'},
children));}});





var styles=StyleSheet.create({
item_container:{
padding:30,
backgroundColor:'#ffffff'},

item_text:{
flex:1,
fontSize:18,
alignSelf:'center'}});



var ScrollViewTestModule={
ScrollViewTestApp:ScrollViewTestApp,
HorizontalScrollViewTestApp:HorizontalScrollViewTestApp,
scrollTo:function scrollTo(destX,destY){
scrollViewApp.scrollTo(destX,destY);}};



BatchedBridge.registerCallableModule(
'ScrollViewTestModule',
ScrollViewTestModule);


module.exports=ScrollViewTestModule;
});
__d(2 /* BatchedBridge */, function(global, require, module, exports) {'use strict';











var MessageQueue=require(3 /* MessageQueue */);

var BatchedBridge=new MessageQueue(
__fbBatchedBridgeConfig.remoteModuleConfig,
__fbBatchedBridgeConfig.localModulesConfig);




var Systrace=require(4 /* Systrace */);
var JSTimersExecution=require(7 /* JSTimersExecution */);

BatchedBridge.registerCallableModule('Systrace',Systrace);
BatchedBridge.registerCallableModule('JSTimersExecution',JSTimersExecution);

if(__DEV__){
BatchedBridge.registerCallableModule('HMRClient',require(12 /* HMRClient */));}








Object.defineProperty(global,'__fbBatchedBridge',{value:BatchedBridge});

module.exports=BatchedBridge;
});
__d(3 /* MessageQueue */, function(global, require, module, exports) {'use strict';














var Systrace=require(4 /* Systrace */);
var ErrorUtils=require(6 /* ErrorUtils */);
var JSTimersExecution=require(7 /* JSTimersExecution */);
var Platform=require(10 /* Platform */);

var invariant=require(222 /* fbjs/lib/invariant */);
var keyMirror=require(224 /* fbjs/lib/keyMirror */);
var stringifySafe=require(11 /* stringifySafe */);

var MODULE_IDS=0;
var METHOD_IDS=1;
var PARAMS=2;
var CALL_IDS=3;
var MIN_TIME_BETWEEN_FLUSHES_MS=5;

var TRACE_TAG_REACT_APPS=1<<17;

var SPY_MODE=false;

var MethodTypes=keyMirror({
remote:null,
remoteAsync:null});


var guard=function guard(fn){
try{
fn();}
catch(error){
ErrorUtils.reportFatalError(error);}};var 



MessageQueue=function(){

function MessageQueue(remoteModules,localModules){var _this=this;babelHelpers.classCallCheck(this,MessageQueue);
this.RemoteModules={};

this._callableModules={};
this._queue=[[],[],[],0];
this._moduleTable={};
this._methodTable={};
this._callbacks=[];
this._callbackID=0;
this._callID=0;
this._lastFlush=0;
this._eventLoopStartTime=new Date().getTime();

[
'invokeCallbackAndReturnFlushedQueue',
'callFunctionReturnFlushedQueue',
'flushedQueue'].
forEach(function(fn){return _this[fn]=_this[fn].bind(_this);});

var modulesConfig=this._genModulesConfig(remoteModules);
this._genModules(modulesConfig);
localModules&&this._genLookupTables(
this._genModulesConfig(localModules),this._moduleTable,this._methodTable);


this._debugInfo={};
this._remoteModuleTable={};
this._remoteMethodTable={};
this._genLookupTables(
modulesConfig,this._remoteModuleTable,this._remoteMethodTable);}babelHelpers.createClass(MessageQueue,[{key:'callFunctionReturnFlushedQueue',value:function callFunctionReturnFlushedQueue(






module,method,args){var _this2=this;
guard(function(){
_this2.__callFunction(module,method,args);
_this2.__callImmediates();});


return this.flushedQueue();}},{key:'invokeCallbackAndReturnFlushedQueue',value:function invokeCallbackAndReturnFlushedQueue(


cbID,args){var _this3=this;
guard(function(){
_this3.__invokeCallback(cbID,args);
_this3.__callImmediates();});


return this.flushedQueue();}},{key:'flushedQueue',value:function flushedQueue()


{
this.__callImmediates();

var queue=this._queue;
this._queue=[[],[],[],this._callID];
return queue[0].length?queue:null;}},{key:'processModuleConfig',value:function processModuleConfig(


config,moduleID){
var module=this._genModule(config,moduleID);
this._genLookup(config,moduleID,this._remoteModuleTable,this._remoteMethodTable);
return module;}},{key:'getEventLoopRunningTime',value:function getEventLoopRunningTime()


{
return new Date().getTime()-this._eventLoopStartTime;}},{key:'__callImmediates',value:function __callImmediates()






{
Systrace.beginEvent('JSTimersExecution.callImmediates()');
guard(function(){return JSTimersExecution.callImmediates();});
Systrace.endEvent();}},{key:'__nativeCall',value:function __nativeCall(


module,method,params,onFail,onSucc){
if(onFail||onSucc){

this._callbackID>1<<5&&(
this._debugInfo[this._callbackID>>5]=null);

this._debugInfo[this._callbackID>>1]=[module,method];
onFail&&params.push(this._callbackID);
this._callbacks[this._callbackID++]=onFail;
onSucc&&params.push(this._callbackID);
this._callbacks[this._callbackID++]=onSucc;}


global.nativeTraceBeginAsyncFlow&&
global.nativeTraceBeginAsyncFlow(TRACE_TAG_REACT_APPS,'native',this._callID);
this._callID++;

this._queue[MODULE_IDS].push(module);
this._queue[METHOD_IDS].push(method);
this._queue[PARAMS].push(params);

var now=new Date().getTime();
if(global.nativeFlushQueueImmediate&&
now-this._lastFlush>=MIN_TIME_BETWEEN_FLUSHES_MS){
global.nativeFlushQueueImmediate(this._queue);
this._queue=[[],[],[],this._callID];
this._lastFlush=now;}

Systrace.counterEvent('pending_js_to_native_queue',this._queue[0].length);
if(__DEV__&&SPY_MODE&&isFinite(module)){
console.log('JS->N : '+this._remoteModuleTable[module]+'.'+
this._remoteMethodTable[module][method]+'('+JSON.stringify(params)+')');}}},{key:'__callFunction',value:function __callFunction(



module,method,args){
this._lastFlush=new Date().getTime();
this._eventLoopStartTime=this._lastFlush;
if(isFinite(module)){
method=this._methodTable[module][method];
module=this._moduleTable[module];}

Systrace.beginEvent(module+'.'+method+'()');
if(__DEV__&&SPY_MODE){
console.log('N->JS : '+module+'.'+method+'('+JSON.stringify(args)+')');}

var moduleMethods=this._callableModules[module];
invariant(
!!moduleMethods,
'Module %s is not a registered callable module.',
module);

moduleMethods[method].apply(moduleMethods,args);
Systrace.endEvent();}},{key:'__invokeCallback',value:function __invokeCallback(


cbID,args){
this._lastFlush=new Date().getTime();
this._eventLoopStartTime=this._lastFlush;
var callback=this._callbacks[cbID];
var debug=this._debugInfo[cbID>>1];
var module=debug&&this._remoteModuleTable[debug[0]];
var method=debug&&this._remoteMethodTable[debug[0]][debug[1]];
if(!callback){
var errorMessage='Callback with id '+cbID+': '+module+'.'+method+'() not found';
if(method){
errorMessage='The callback '+method+'() exists in module '+module+', '+'but only one callback may be registered to a function in a native module.';}


invariant(
callback,
errorMessage);}


var profileName=debug?'<callback for '+module+'.'+method+'>':cbID;
if(callback&&SPY_MODE&&__DEV__){
console.log('N->JS : '+profileName+'('+JSON.stringify(args)+')');}

Systrace.beginEvent('MessageQueue.invokeCallback('+
profileName+', '+stringifySafe(args)+')');
this._callbacks[cbID&~1]=null;
this._callbacks[cbID|1]=null;
callback.apply(null,args);
Systrace.endEvent();}},{key:'_genModulesConfig',value:function _genModulesConfig(











modules){
if(Array.isArray(modules)){
return modules;}else 
{
var moduleArray=[];
var moduleNames=Object.keys(modules);
for(var i=0,l=moduleNames.length;i<l;i++){
var moduleName=moduleNames[i];
var moduleConfig=modules[moduleName];
var _module=[moduleName];
if(moduleConfig.constants){
_module.push(moduleConfig.constants);}

var methodsConfig=moduleConfig.methods;
if(methodsConfig){
var methods=[];
var asyncMethods=[];
var methodNames=Object.keys(methodsConfig);
for(var j=0,ll=methodNames.length;j<ll;j++){
var methodName=methodNames[j];
var methodConfig=methodsConfig[methodName];
methods[methodConfig.methodID]=methodName;
if(methodConfig.type===MethodTypes.remoteAsync){
asyncMethods.push(methodConfig.methodID);}}


if(methods.length){
_module.push(methods);
if(asyncMethods.length){
_module.push(asyncMethods);}}}



moduleArray[moduleConfig.moduleID]=_module;}

return moduleArray;}}},{key:'_genLookupTables',value:function _genLookupTables(



modulesConfig,moduleTable,methodTable){var _this4=this;
modulesConfig.forEach(function(config,moduleID){
_this4._genLookup(config,moduleID,moduleTable,methodTable);});}},{key:'_genLookup',value:function _genLookup(



config,moduleID,moduleTable,methodTable){
if(!config){
return;}


var moduleName=void 0,methods=void 0;
if(moduleHasConstants(config)){var _config=babelHelpers.slicedToArray(
config,3);moduleName=_config[0];methods=_config[2];}else 
{var _config2=babelHelpers.slicedToArray(
config,2);moduleName=_config2[0];methods=_config2[1];}


moduleTable[moduleID]=moduleName;
methodTable[moduleID]=babelHelpers.extends({},methods);}},{key:'_genModules',value:function _genModules(


remoteModules){var _this5=this;
remoteModules.forEach(function(config,moduleID){
_this5._genModule(config,moduleID);});}},{key:'_genModule',value:function _genModule(



config,moduleID){var _this6=this;
if(!config){
return;}


var moduleName=void 0,constants=void 0,methods=void 0,asyncMethods=void 0;
if(moduleHasConstants(config)){var _config3=babelHelpers.slicedToArray(
config,4);moduleName=_config3[0];constants=_config3[1];methods=_config3[2];asyncMethods=_config3[3];}else 
{var _config4=babelHelpers.slicedToArray(
config,3);moduleName=_config4[0];methods=_config4[1];asyncMethods=_config4[2];}


var module={};
methods&&methods.forEach(function(methodName,methodID){
var methodType=
asyncMethods&&arrayContains(asyncMethods,methodID)?
MethodTypes.remoteAsync:MethodTypes.remote;
module[methodName]=_this6._genMethod(moduleID,methodID,methodType);});

babelHelpers.extends(module,constants);

if(!constants&&!methods&&!asyncMethods){
module.moduleID=moduleID;}


this.RemoteModules[moduleName]=module;
return module;}},{key:'_genMethod',value:function _genMethod(


module,method,type){
var fn=null;
var self=this;
if(type===MethodTypes.remoteAsync){
fn=function fn(){for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}
return new Promise(function(resolve,reject){
self.__nativeCall(
module,
method,
args,
function(data){
resolve(data);},

function(errorData){
var error=createErrorFromErrorData(errorData);
reject(error);});});};}else 



{
fn=function fn(){for(var _len2=arguments.length,args=Array(_len2),_key2=0;_key2<_len2;_key2++){args[_key2]=arguments[_key2];}
var lastArg=args.length>0?args[args.length-1]:null;
var secondLastArg=args.length>1?args[args.length-2]:null;
var hasSuccCB=typeof lastArg==='function';
var hasErrorCB=typeof secondLastArg==='function';
hasErrorCB&&invariant(
hasSuccCB,
'Cannot have a non-function arg after a function arg.');

var numCBs=hasSuccCB+hasErrorCB;
var onSucc=hasSuccCB?lastArg:null;
var onFail=hasErrorCB?secondLastArg:null;
args=args.slice(0,args.length-numCBs);
return self.__nativeCall(module,method,args,onFail,onSucc);};}


fn.type=type;
return fn;}},{key:'registerCallableModule',value:function registerCallableModule(


name,methods){
this._callableModules[name]=methods;}}]);return MessageQueue;}();




function moduleHasConstants(moduleArray){
return !Array.isArray(moduleArray[1]);}


function arrayContains(array,value){
return array.indexOf(value)!==-1;}


function createErrorFromErrorData(errorData){var 

message=

errorData.message;var extraErrorInfo=babelHelpers.objectWithoutProperties(errorData,['message']);
var error=new Error(message);
error.framesToPop=1;
return babelHelpers.extends(error,extraErrorInfo);}


module.exports=MessageQueue;
});
__d(4 /* Systrace */, function(global, require, module, exports) {'use strict';
























var GLOBAL=GLOBAL||this;
var TRACE_TAG_REACT_APPS=1<<17;
var TRACE_TAG_JSC_CALLS=1<<27;

var _enabled=false;
var _asyncCookie=0;
var _ReactPerf=null;
function ReactPerf(){
if(!_ReactPerf){
_ReactPerf=require(5 /* ReactPerf */);}

return _ReactPerf;}


var Systrace={
setEnabled:function setEnabled(enabled){
if(_enabled!==enabled){
if(enabled){
global.nativeTraceBeginLegacy&&global.nativeTraceBeginLegacy(TRACE_TAG_JSC_CALLS);}else 
{
global.nativeTraceEndLegacy&&global.nativeTraceEndLegacy(TRACE_TAG_JSC_CALLS);}}


_enabled=enabled;

ReactPerf().enableMeasure=enabled;},





beginEvent:function beginEvent(profileName){
if(_enabled){
profileName=typeof profileName==='function'?
profileName():profileName;
global.nativeTraceBeginSection(TRACE_TAG_REACT_APPS,profileName);}},



endEvent:function endEvent(){
if(_enabled){
global.nativeTraceEndSection(TRACE_TAG_REACT_APPS);}},








beginAsyncEvent:function beginAsyncEvent(profileName){
var cookie=_asyncCookie;
if(_enabled){
_asyncCookie++;
profileName=typeof profileName==='function'?
profileName():profileName;
global.nativeTraceBeginAsyncSection(TRACE_TAG_REACT_APPS,profileName,cookie,0);}

return cookie;},


endAsyncEvent:function endAsyncEvent(profileName,cookie){
if(_enabled){
profileName=typeof profileName==='function'?
profileName():profileName;
global.nativeTraceEndAsyncSection(TRACE_TAG_REACT_APPS,profileName,cookie,0);}},






counterEvent:function counterEvent(profileName,value){
if(_enabled){
profileName=typeof profileName==='function'?
profileName():profileName;
global.nativeTraceCounter&&
global.nativeTraceCounter(TRACE_TAG_REACT_APPS,profileName,value);}},



reactPerfMeasure:function reactPerfMeasure(objName,fnName,func){
return function(component){
if(!_enabled){
return func.apply(this,arguments);}


var name=objName==='ReactCompositeComponent'&&this.getName()||'';
Systrace.beginEvent(objName+'.'+fnName+'('+name+')');
var ret=func.apply(this,arguments);
Systrace.endEvent();
return ret;};},



swizzleReactPerf:function swizzleReactPerf(){
ReactPerf().injection.injectMeasure(Systrace.reactPerfMeasure);},






attachToRelayProfiler:function attachToRelayProfiler(relayProfiler){
relayProfiler.attachProfileHandler('*',function(name){
var cookie=Systrace.beginAsyncEvent(name);
return function(){
Systrace.endAsyncEvent(name,cookie);};});



relayProfiler.attachAggregateHandler('*',function(name,callback){
Systrace.beginEvent(name);
callback();
Systrace.endEvent();});},





swizzleJSON:function swizzleJSON(){
Systrace.measureMethods(JSON,'JSON',[
'parse',
'stringify']);},











measureMethods:function measureMethods(object,objectName,methodNames){
if(!__DEV__){
return;}


methodNames.forEach(function(methodName){
object[methodName]=Systrace.measure(
objectName,
methodName,
object[methodName]);});},













measure:function measure(objName,fnName,func){
if(!__DEV__){
return func;}


var profileName=objName+'.'+fnName;
return function(){
if(!_enabled){
return func.apply(this,arguments);}


Systrace.beginEvent(profileName);
var ret=func.apply(this,arguments);
Systrace.endEvent();
return ret;};}};




Systrace.setEnabled(global.__RCTProfileIsProfiling||false);

if(__DEV__){




require.Systrace=Systrace;}


module.exports=Systrace;
});
__d(5 /* ReactPerf */, function(global, require, module, exports) {'use strict';

















var ReactPerf={




enableMeasure:false,





storedMeasure:_noMeasure,






measureMethods:function measureMethods(object,objectName,methodNames){
if(process.env.NODE_ENV!=='production'){
for(var key in methodNames){
if(!methodNames.hasOwnProperty(key)){
continue;}

object[key]=ReactPerf.measure(objectName,methodNames[key],object[key]);}}},












measure:function measure(objName,fnName,func){
if(process.env.NODE_ENV!=='production'){
var measuredFunc=null;
var wrapper=function wrapper(){
if(ReactPerf.enableMeasure){
if(!measuredFunc){
measuredFunc=ReactPerf.storedMeasure(objName,fnName,func);}

return measuredFunc.apply(this,arguments);}

return func.apply(this,arguments);};

wrapper.displayName=objName+'_'+fnName;
return wrapper;}

return func;},


injection:{



injectMeasure:function injectMeasure(measure){
ReactPerf.storedMeasure=measure;}}};












function _noMeasure(objName,fnName,func){
return func;}


module.exports=ReactPerf;
});
__d(6 /* ErrorUtils */, function(global, require, module, exports) {var 











GLOBAL=this;













module.exports=GLOBAL.ErrorUtils;
});
__d(7 /* JSTimersExecution */, function(global, require, module, exports) {'use strict';











var invariant=require(222 /* fbjs/lib/invariant */);
var keyMirror=require(224 /* fbjs/lib/keyMirror */);
var performanceNow=require(223 /* fbjs/lib/performanceNow */);
var warning=require(232 /* fbjs/lib/warning */);
var Systrace=require(4 /* Systrace */);






var JSTimersExecution={
GUID:1,
Type:keyMirror({
setTimeout:null,
setInterval:null,
requestAnimationFrame:null,
setImmediate:null}),



callbacks:[],
types:[],
timerIDs:[],
immediates:[],






callTimer:function callTimer(timerID){
warning(timerID<=JSTimersExecution.GUID,'Tried to call timer with ID '+timerID+' but no such timer exists');
var timerIndex=JSTimersExecution.timerIDs.indexOf(timerID);





if(timerIndex===-1){
return;}

var type=JSTimersExecution.types[timerIndex];
var callback=JSTimersExecution.callbacks[timerIndex];


if(type===JSTimersExecution.Type.setTimeout||
type===JSTimersExecution.Type.setImmediate||
type===JSTimersExecution.Type.requestAnimationFrame){
JSTimersExecution._clearIndex(timerIndex);}


try{
if(type===JSTimersExecution.Type.setTimeout||
type===JSTimersExecution.Type.setInterval||
type===JSTimersExecution.Type.setImmediate){
callback();}else 
if(type===JSTimersExecution.Type.requestAnimationFrame){
var currentTime=performanceNow();
callback(currentTime);}else 
{
console.error('Tried to call a callback with invalid type: '+type);
return;}}

catch(e){

JSTimersExecution.errors=JSTimersExecution.errors||[];
JSTimersExecution.errors.push(e);}},







callTimers:function callTimers(timerIDs){
invariant(timerIDs.length!==0,'Probably shouldn\'t call "callTimers" with no timerIDs');

JSTimersExecution.errors=null;
timerIDs.forEach(JSTimersExecution.callTimer);

var errors=JSTimersExecution.errors;
if(errors){
var errorCount=errors.length;
if(errorCount>1){


for(var ii=1;ii<errorCount;ii++){
require(8 /* JSTimers */).setTimeout(
function(error){throw error;}.bind(null,errors[ii]),
0);}}



throw errors[0];}},







callImmediatesPass:function callImmediatesPass(){
Systrace.beginEvent('JSTimersExecution.callImmediatesPass()');



if(JSTimersExecution.immediates.length>0){
var passImmediates=JSTimersExecution.immediates.slice();
JSTimersExecution.immediates=[];



for(var i=0;i<passImmediates.length;++i){
JSTimersExecution.callTimer(passImmediates[i]);}}



Systrace.endEvent();

return JSTimersExecution.immediates.length>0;},






callImmediates:function callImmediates(){
JSTimersExecution.errors=null;
while(JSTimersExecution.callImmediatesPass()){}
if(JSTimersExecution.errors){
JSTimersExecution.errors.forEach(function(error){return (
require(8 /* JSTimers */).setTimeout(function(){throw error;},0));});}},




_clearIndex:function _clearIndex(i){
JSTimersExecution.timerIDs[i]=null;
JSTimersExecution.callbacks[i]=null;
JSTimersExecution.types[i]=null;}};



module.exports=JSTimersExecution;
});
__d(222 /* fbjs/lib/invariant.js */, function(global, require, module, exports) {'use strict';






















function invariant(condition,format,a,b,c,d,e,f){
if(process.env.NODE_ENV!=='production'){
if(format===undefined){
throw new Error('invariant requires an error message argument');}}



if(!condition){
var error;
if(format===undefined){
error=new Error('Minified exception occurred; use the non-minified dev environment '+'for the full error message and additional helpful warnings.');}else 
{
var args=[a,b,c,d,e,f];
var argIndex=0;
error=new Error(format.replace(/%s/g,function(){
return args[argIndex++];}));

error.name='Invariant Violation';}


error.framesToPop=1;
throw error;}}



module.exports=invariant;
});
__d(224 /* fbjs/lib/keyMirror.js */, function(global, require, module, exports) {'use strict';












var invariant=require(222 /* ./invariant */);



















var keyMirror=function keyMirror(obj){
var ret={};
var key;
!(obj instanceof Object&&!Array.isArray(obj))?process.env.NODE_ENV!=='production'?invariant(false,'keyMirror(...): Argument must be an object.'):invariant(false):undefined;
for(key in obj){
if(!obj.hasOwnProperty(key)){
continue;}

ret[key]=key;}

return ret;};


module.exports=keyMirror;
});
__d(223 /* fbjs/lib/performanceNow.js */, function(global, require, module, exports) {'use strict';












var performance=require(225 /* ./performance */);

var performanceNow;






if(performance.now){
performanceNow=function performanceNow(){
return performance.now();};}else 

{
performanceNow=function performanceNow(){
return Date.now();};}



module.exports=performanceNow;
});
__d(225 /* fbjs/lib/performance.js */, function(global, require, module, exports) {'use strict';












var ExecutionEnvironment=require(226 /* ./ExecutionEnvironment */);

var performance;

if(ExecutionEnvironment.canUseDOM){
performance=window.performance||window.msPerformance||window.webkitPerformance;}


module.exports=performance||{};
});
__d(226 /* fbjs/lib/ExecutionEnvironment.js */, function(global, require, module, exports) {'use strict';











var canUseDOM=!!(typeof window!=='undefined'&&window.document&&window.document.createElement);







var ExecutionEnvironment={

canUseDOM:canUseDOM,

canUseWorkers:typeof Worker!=='undefined',

canUseEventListeners:canUseDOM&&!!(window.addEventListener||window.attachEvent),

canUseViewport:canUseDOM&&!!window.screen,

isInWorker:!canUseDOM};



module.exports=ExecutionEnvironment;
});
__d(232 /* fbjs/lib/warning.js */, function(global, require, module, exports) {'use strict';











var emptyFunction=require(227 /* ./emptyFunction */);








var warning=emptyFunction;

if(process.env.NODE_ENV!=='production'){
warning=function warning(condition,format){
for(var _len=arguments.length,args=Array(_len>2?_len-2:0),_key=2;_key<_len;_key++){
args[_key-2]=arguments[_key];}


if(format===undefined){
throw new Error('`warning(condition, format, ...args)` requires a warning '+'message argument');}


if(format.indexOf('Failed Composite propType: ')===0){
return;}


if(!condition){
var argIndex=0;
var message='Warning: '+format.replace(/%s/g,function(){
return args[argIndex++];});

if(typeof console!=='undefined'){
console.error(message);}

try{



throw new Error(message);}
catch(x){}}};}




module.exports=warning;
});
__d(227 /* fbjs/lib/emptyFunction.js */, function(global, require, module, exports) {"use strict";











function makeEmptyFunction(arg){
return function(){
return arg;};}








function emptyFunction(){}

emptyFunction.thatReturns=makeEmptyFunction;
emptyFunction.thatReturnsFalse=makeEmptyFunction(false);
emptyFunction.thatReturnsTrue=makeEmptyFunction(true);
emptyFunction.thatReturnsNull=makeEmptyFunction(null);
emptyFunction.thatReturnsThis=function(){
return this;};

emptyFunction.thatReturnsArgument=function(arg){
return arg;};


module.exports=emptyFunction;
});
__d(8 /* JSTimers */, function(global, require, module, exports) {'use strict';













var RCTTiming=require(9 /* NativeModules */).Timing;
var JSTimersExecution=require(7 /* JSTimersExecution */);






var JSTimers={
Types:JSTimersExecution.Types,





_getFreeIndex:function _getFreeIndex(){
var freeIndex=JSTimersExecution.timerIDs.indexOf(null);
if(freeIndex===-1){
freeIndex=JSTimersExecution.timerIDs.length;}

return freeIndex;},






setTimeout:function setTimeout(func,duration){for(var _len=arguments.length,args=Array(_len>2?_len-2:0),_key=2;_key<_len;_key++){args[_key-2]=arguments[_key];}
var newID=JSTimersExecution.GUID++;
var freeIndex=JSTimers._getFreeIndex();
JSTimersExecution.timerIDs[freeIndex]=newID;
JSTimersExecution.callbacks[freeIndex]=function(){
return func.apply(undefined,args);};

JSTimersExecution.types[freeIndex]=JSTimersExecution.Type.setTimeout;
RCTTiming.createTimer(newID,duration||0,Date.now(),false);
return newID;},






setInterval:function setInterval(func,duration){for(var _len2=arguments.length,args=Array(_len2>2?_len2-2:0),_key2=2;_key2<_len2;_key2++){args[_key2-2]=arguments[_key2];}
var newID=JSTimersExecution.GUID++;
var freeIndex=JSTimers._getFreeIndex();
JSTimersExecution.timerIDs[freeIndex]=newID;
JSTimersExecution.callbacks[freeIndex]=function(){
return func.apply(undefined,args);};

JSTimersExecution.types[freeIndex]=JSTimersExecution.Type.setInterval;
RCTTiming.createTimer(newID,duration||0,Date.now(),true);
return newID;},






setImmediate:function setImmediate(func){for(var _len3=arguments.length,args=Array(_len3>1?_len3-1:0),_key3=1;_key3<_len3;_key3++){args[_key3-1]=arguments[_key3];}
var newID=JSTimersExecution.GUID++;
var freeIndex=JSTimers._getFreeIndex();
JSTimersExecution.timerIDs[freeIndex]=newID;
JSTimersExecution.callbacks[freeIndex]=function(){
return func.apply(undefined,args);};

JSTimersExecution.types[freeIndex]=JSTimersExecution.Type.setImmediate;
JSTimersExecution.immediates.push(newID);
return newID;},





requestAnimationFrame:function requestAnimationFrame(func){
var newID=JSTimersExecution.GUID++;
var freeIndex=JSTimers._getFreeIndex();
JSTimersExecution.timerIDs[freeIndex]=newID;
JSTimersExecution.callbacks[freeIndex]=func;
JSTimersExecution.types[freeIndex]=JSTimersExecution.Type.requestAnimationFrame;
RCTTiming.createTimer(newID,1,Date.now(),false);
return newID;},


clearTimeout:function clearTimeout(timerID){
JSTimers._clearTimerID(timerID);},


clearInterval:function clearInterval(timerID){
JSTimers._clearTimerID(timerID);},


clearImmediate:function clearImmediate(timerID){
JSTimers._clearTimerID(timerID);
var index=JSTimersExecution.immediates.indexOf(timerID);
if(index!==-1){
JSTimersExecution.immediates.splice(index,1);}},



cancelAnimationFrame:function cancelAnimationFrame(timerID){
JSTimers._clearTimerID(timerID);},


_clearTimerID:function _clearTimerID(timerID){


if(timerID==null){
return;}


var index=JSTimersExecution.timerIDs.indexOf(timerID);

if(index!==-1){
JSTimersExecution._clearIndex(index);
if(JSTimersExecution.types[index]!==JSTimersExecution.Type.setImmediate){
RCTTiming.deleteTimer(timerID);}}}};





module.exports=JSTimers;
});
__d(9 /* NativeModules */, function(global, require, module, exports) {'use strict';












var BatchedBridge=require(2 /* BatchedBridge */);
var RemoteModules=BatchedBridge.RemoteModules;

function normalizePrefix(moduleName){
return moduleName.replace(/^(RCT|RK)/,'');}





Object.keys(RemoteModules).forEach(function(moduleName){
var strippedName=normalizePrefix(moduleName);
if(RemoteModules['RCT'+strippedName]&&RemoteModules['RK'+strippedName]){
throw new Error(
'Module cannot be registered as both RCT and RK: '+moduleName);}


if(strippedName!==moduleName){
RemoteModules[strippedName]=RemoteModules[moduleName];
delete RemoteModules[moduleName];}});







var NativeModules={};
Object.keys(RemoteModules).forEach(function(moduleName){
Object.defineProperty(NativeModules,moduleName,{
configurable:true,
enumerable:true,
get:function get(){
var module=RemoteModules[moduleName];
if(module&&typeof module.moduleID==='number'&&global.nativeRequireModuleConfig){
var json=global.nativeRequireModuleConfig(moduleName);
var config=json&&JSON.parse(json);
module=config&&BatchedBridge.processModuleConfig(config,module.moduleID);
RemoteModules[moduleName]=module;}

return module;}});});













var UIManager=NativeModules.UIManager;
UIManager&&Object.keys(UIManager).forEach(function(viewName){
var viewConfig=UIManager[viewName];
if(viewConfig.Manager){(function(){
var constants=void 0;

Object.defineProperty(viewConfig,'Constants',{
configurable:true,
enumerable:true,
get:function get(){
if(constants){
return constants;}

constants={};
var viewManager=NativeModules[normalizePrefix(viewConfig.Manager)];
viewManager&&Object.keys(viewManager).forEach(function(key){
var value=viewManager[key];
if(typeof value!=='function'){
constants[key]=value;}});


return constants;}});


var commands=void 0;

Object.defineProperty(viewConfig,'Commands',{
configurable:true,
enumerable:true,
get:function get(){
if(commands){
return commands;}

commands={};
var viewManager=NativeModules[normalizePrefix(viewConfig.Manager)];
viewManager&&Object.keys(viewManager).forEach(function(key,index){
var value=viewManager[key];
if(typeof value==='function'){
commands[key]=index;}});


return commands;}});})();}});





module.exports=NativeModules;
});
__d(10 /* Platform */, function(global, require, module, exports) {'use strict';













var Platform={
OS:'android',
get Version(){return require(9 /* NativeModules */).AndroidConstants.Version;}};


module.exports=Platform;
});
__d(11 /* stringifySafe */, function(global, require, module, exports) {'use strict';
















function stringifySafe(arg){
var ret;
var type=typeof arg;
if(arg===undefined){
ret='undefined';}else 
if(arg===null){
ret='null';}else 
if(type==='string'){
ret='"'+arg+'"';}else 
if(type==='function'){
try{
ret=arg.toString();}
catch(e){
ret='[function unknown]';}}else 

{


try{
ret=JSON.stringify(arg);}
catch(e){
if(typeof arg.toString==='function'){
try{
ret=arg.toString();}
catch(E){}}}}



return ret||'["'+type+'" failed to stringify]';}


module.exports=stringifySafe;
});
__d(12 /* HMRClient */, function(global, require, module, exports) {'use strict';












var Platform=require(10 /* Platform */);
var invariant=require(222 /* fbjs/lib/invariant */);





var HMRClient={
enable:function enable(platform,bundleEntry,host,port){
invariant(platform,'Missing required parameter `platform`');
invariant(bundleEntry,'Missing required paramenter `bundleEntry`');
invariant(host,'Missing required paramenter `host`');




var WebSocket=require(13 /* WebSocket */);

var wsHostPort=port!==null&&port!==''?
host+':'+port:
host;


var wsUrl='ws://'+wsHostPort+'/hot?'+('platform='+
platform+'&')+('bundleEntry='+
bundleEntry.replace('.bundle','.js'));

var activeWS=new WebSocket(wsUrl);
activeWS.onerror=function(e){
var error='Hot loading isn\'t working because it cannot connect to the development server.\n\nTry the following to fix the issue:\n- Ensure that the packager server is running and available on the same network';






if(Platform.OS==='ios'){
error+='\n- Ensure that the Packager server URL is correctly set in AppDelegate';}else 



{
error+='\n- Ensure that your device/emulator is connected to your machine and has USB debugging enabled - run \'adb devices\' to see a list of connected devices\n- If you\'re on a physical device connected to the same machine, run \'adb reverse tcp:8081 tcp:8081\' to forward requests from your device\n- If your device is on the same Wi-Fi network, set \'Debug server host & port for device\' in \'Dev settings\' to your machine\'s IP address and the port of the local dev server - e.g. 10.0.1.1:8081';}







error+='\n\nURL: '+


host+':'+port+'\n\nError: '+

e.message;


throw new Error(error);};

activeWS.onmessage=function(_ref){var data=_ref.data;

var HMRLoadingView=require(21 /* HMRLoadingView */);

data=JSON.parse(data);

switch(data.type){
case 'update-start':{
HMRLoadingView.showMessage('Hot Loading...');
break;}

case 'update':{var _ret=function(){var _data$body=





data.body;var modules=_data$body.modules;var sourceMappingURLs=_data$body.sourceMappingURLs;var sourceURLs=_data$body.sourceURLs;var inverseDependencies=_data$body.inverseDependencies;

if(Platform.OS==='ios'){
var RCTRedBox=require(9 /* NativeModules */).RedBox;
RCTRedBox&&RCTRedBox.dismiss&&RCTRedBox.dismiss();}else 
{
var RCTExceptionsManager=require(9 /* NativeModules */).ExceptionsManager;
RCTExceptionsManager&&RCTExceptionsManager.dismissRedbox&&RCTExceptionsManager.dismissRedbox();}


var serverHost=void 0;

if(Platform.OS==='android'){
serverHost=require(9 /* NativeModules */).AndroidConstants.ServerHost;}else 
{
serverHost=port?host+':'+port:host;}


modules.forEach(function(_ref2,i){var id=_ref2.id;var code=_ref2.code;
code=code+'\n\n'+sourceMappingURLs[i];

require(23 /* SourceMapsCache */).fetch({
text:code,
url:'http://'+serverHost+sourceURLs[i],
sourceMappingURL:sourceMappingURLs[i]});





var injectFunction=typeof global.nativeInjectHMRUpdate==='function'?
global.nativeInjectHMRUpdate:
eval;

code=['__accept(',

id+',','function(global,require,module,exports){',''+

code,
'\n},',''+
JSON.stringify(inverseDependencies),');'].

join('');

injectFunction(code,sourceURLs[i]);});


HMRLoadingView.hide();
return 'break';}();if(_ret==='break')break;}

case 'update-done':{
HMRLoadingView.hide();
break;}

case 'error':{
HMRLoadingView.hide();
throw new Error(data.body.type+' '+data.body.description);}

default:{
throw new Error('Unexpected message: '+data);}}};}};






module.exports=HMRClient;
});
__d(13 /* WebSocket */, function(global, require, module, exports) {'use strict';












var RCTDeviceEventEmitter=require(14 /* RCTDeviceEventEmitter */);
var RCTWebSocketModule=require(9 /* NativeModules */).WebSocketModule;

var Platform=require(10 /* Platform */);
var WebSocketBase=require(19 /* WebSocketBase */);
var WebSocketEvent=require(20 /* WebSocketEvent */);

var base64=require(289 /* base64-js */);

var WebSocketId=0;
var CLOSE_NORMAL=1000;var 







WebSocket=function(_WebSocketBase){babelHelpers.inherits(WebSocket,_WebSocketBase);function WebSocket(){babelHelpers.classCallCheck(this,WebSocket);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(WebSocket).apply(this,arguments));}babelHelpers.createClass(WebSocket,[{key:'connectToSocketImpl',value:function connectToSocketImpl(



url,protocols,headers){
this._socketId=WebSocketId++;

RCTWebSocketModule.connect(url,protocols,headers,this._socketId);

this._registerEvents(this._socketId);}},{key:'closeConnectionImpl',value:function closeConnectionImpl(


code,reason){
this._closeWebSocket(this._socketId,code,reason);}},{key:'cancelConnectionImpl',value:function cancelConnectionImpl()


{
this._closeWebSocket(this._socketId);}},{key:'sendStringImpl',value:function sendStringImpl(


message){
RCTWebSocketModule.send(message,this._socketId);}},{key:'sendArrayBufferImpl',value:function sendArrayBufferImpl()


{

console.warn('Sending ArrayBuffers is not yet supported');}},{key:'_closeWebSocket',value:function _closeWebSocket(


id,code,reason){
if(Platform.OS==='android'){



var statusCode=typeof code==='number'?code:CLOSE_NORMAL;
var closeReason=typeof reason==='string'?reason:'';
RCTWebSocketModule.close(statusCode,closeReason,id);}else 
{
RCTWebSocketModule.close(id);}}},{key:'_unregisterEvents',value:function _unregisterEvents()



{
this._subs.forEach(function(e){return e.remove();});
this._subs=[];}},{key:'_registerEvents',value:function _registerEvents(


id){var _this2=this;
this._subs=[
RCTDeviceEventEmitter.addListener('websocketMessage',function(ev){
if(ev.id!==id){
return;}

var event=new WebSocketEvent('message',{
data:ev.type==='binary'?base64.toByteArray(ev.data).buffer:ev.data});

_this2.onmessage&&_this2.onmessage(event);
_this2.dispatchEvent(event);}),

RCTDeviceEventEmitter.addListener('websocketOpen',function(ev){
if(ev.id!==id){
return;}

_this2.readyState=_this2.OPEN;
var event=new WebSocketEvent('open');
_this2.onopen&&_this2.onopen(event);
_this2.dispatchEvent(event);}),

RCTDeviceEventEmitter.addListener('websocketClosed',function(ev){
if(ev.id!==id){
return;}

_this2.readyState=_this2.CLOSED;
var event=new WebSocketEvent('close');
event.code=ev.code;
event.reason=ev.reason;
_this2.onclose&&_this2.onclose(event);
_this2.dispatchEvent(event);
_this2._unregisterEvents();
_this2.close();}),

RCTDeviceEventEmitter.addListener('websocketFailed',function(ev){
if(ev.id!==id){
return;}

var event=new WebSocketEvent('error');
event.message=ev.message;
_this2.onerror&&_this2.onerror(event);
_this2.onclose&&_this2.onclose(event);
_this2.dispatchEvent(event);
_this2._unregisterEvents();
_this2.close();})];}}]);return WebSocket;}(WebSocketBase);





module.exports=WebSocket;
});
__d(14 /* RCTDeviceEventEmitter */, function(global, require, module, exports) {'use strict';












var EventEmitter=require(15 /* EventEmitter */);
var BatchedBridge=require(2 /* BatchedBridge */);

var RCTDeviceEventEmitter=new EventEmitter();

BatchedBridge.registerCallableModule(
'RCTDeviceEventEmitter',
RCTDeviceEventEmitter);


module.exports=RCTDeviceEventEmitter;
});
__d(15 /* EventEmitter */, function(global, require, module, exports) {var 












EmitterSubscription=require(16 /* EmitterSubscription */);
var ErrorUtils=require(6 /* ErrorUtils */);
var EventSubscriptionVendor=require(18 /* EventSubscriptionVendor */);
var emptyFunction=require(227 /* fbjs/lib/emptyFunction */);
var invariant=require(222 /* fbjs/lib/invariant */);var 














EventEmitter=function(){



function EventEmitter(){babelHelpers.classCallCheck(this,EventEmitter);
this._subscriber=new EventSubscriptionVendor();}babelHelpers.createClass(EventEmitter,[{key:'addListener',value:function addListener(

















eventType,listener,context){
return this._subscriber.addSubscription(
eventType,
new EmitterSubscription(this._subscriber,listener,context));}},{key:'once',value:function once(












eventType,listener,context){
var emitter=this;
return this.addListener(eventType,function(){
emitter.removeCurrentListener();
listener.apply(context,arguments);});}},{key:'removeAllListeners',value:function removeAllListeners(










eventType){
this._subscriber.removeAllSubscriptions(eventType);}},{key:'removeCurrentListener',value:function removeCurrentListener()























{
invariant(
!!this._currentSubscription,
'Not in an emitting cycle; there is no current subscription');

this._subscriber.removeSubscription(this._currentSubscription);}},{key:'listeners',value:function listeners(









eventType){
var subscriptions=this._subscriber.getSubscriptionsForType(eventType);
return subscriptions?
subscriptions.filter(emptyFunction.thatReturnsTrue).map(
function(subscription){
return subscription.listener;}):

[];}},{key:'emit',value:function emit(
















eventType){
var subscriptions=this._subscriber.getSubscriptionsForType(eventType);
if(subscriptions){
var keys=Object.keys(subscriptions);
for(var ii=0;ii<keys.length;ii++){
var key=keys[ii];
var subscription=subscriptions[key];


if(subscription){
this._currentSubscription=subscription;
subscription.listener.apply(
subscription.context,
Array.prototype.slice.call(arguments,1));}}



this._currentSubscription=null;}}}]);return EventEmitter;}();




module.exports=EventEmitter;
});
__d(16 /* EmitterSubscription */, function(global, require, module, exports) {'use strict';



















var EventSubscription=require(17 /* EventSubscription */);var 




EmitterSubscription=function(_EventSubscription){babelHelpers.inherits(EmitterSubscription,_EventSubscription);









function EmitterSubscription(subscriber,listener,context){babelHelpers.classCallCheck(this,EmitterSubscription);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(EmitterSubscription).call(this,
subscriber));
_this.listener=listener;
_this.context=context;return _this;}return EmitterSubscription;}(EventSubscription);



module.exports=EmitterSubscription;
});
__d(17 /* EventSubscription */, function(global, require, module, exports) {'use strict';var 






















EventSubscription=function(){





function EventSubscription(subscriber){babelHelpers.classCallCheck(this,EventSubscription);
this.subscriber=subscriber;}babelHelpers.createClass(EventSubscription,[{key:'remove',value:function remove()





{
this.subscriber.removeSubscription(this);}}]);return EventSubscription;}();



module.exports=EventSubscription;
});
__d(18 /* EventSubscriptionVendor */, function(global, require, module, exports) {'use strict';


















var invariant=require(222 /* fbjs/lib/invariant */);var 





EventSubscriptionVendor=function(){

function EventSubscriptionVendor(){babelHelpers.classCallCheck(this,EventSubscriptionVendor);
this._subscriptionsForType={};
this._currentSubscription=null;}babelHelpers.createClass(EventSubscriptionVendor,[{key:'addSubscription',value:function addSubscription(









eventType,subscription){
invariant(
subscription.subscriber===this,
'The subscriber of the subscription is incorrectly set.');
if(!this._subscriptionsForType[eventType]){
this._subscriptionsForType[eventType]=[];}

var key=this._subscriptionsForType[eventType].length;
this._subscriptionsForType[eventType].push(subscription);
subscription.eventType=eventType;
subscription.key=key;
return subscription;}},{key:'removeAllSubscriptions',value:function removeAllSubscriptions(








eventType){
if(eventType===undefined){
this._subscriptionsForType={};}else 
{
delete this._subscriptionsForType[eventType];}}},{key:'removeSubscription',value:function removeSubscription(









subscription){
var eventType=subscription.eventType;
var key=subscription.key;

var subscriptionsForType=this._subscriptionsForType[eventType];
if(subscriptionsForType){
delete subscriptionsForType[key];}}},{key:'getSubscriptionsForType',value:function getSubscriptionsForType(















eventType){
return this._subscriptionsForType[eventType];}}]);return EventSubscriptionVendor;}();



module.exports=EventSubscriptionVendor;
});
__d(19 /* WebSocketBase */, function(global, require, module, exports) {'use strict';












var EventTarget=require(259 /* event-target-shim */);

var CONNECTING=0;
var OPEN=1;
var CLOSING=2;
var CLOSED=3;var 




WebSocketBase=function(_EventTarget){babelHelpers.inherits(WebSocketBase,_EventTarget);

















function WebSocketBase(url,protocols,options){babelHelpers.classCallCheck(this,WebSocketBase);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(WebSocketBase).call(this));

_this.CONNECTING=CONNECTING;
_this.OPEN=OPEN;
_this.CLOSING=CLOSING;
_this.CLOSED=CLOSED;

if(typeof protocols==='string'){
protocols=[protocols];}


if(!Array.isArray(protocols)){
protocols=null;}


_this.readyState=_this.CONNECTING;
_this.connectToSocketImpl(url,protocols,options);return _this;}babelHelpers.createClass(WebSocketBase,[{key:'close',value:function close()


{
if(this.readyState===this.CLOSING||
this.readyState===this.CLOSED){
return;}


if(this.readyState===this.CONNECTING){
this.cancelConnectionImpl();}


this.readyState=this.CLOSING;
this.closeConnectionImpl();}},{key:'send',value:function send(


data){
if(this.readyState===this.CONNECTING){
throw new Error('INVALID_STATE_ERR');}


if(typeof data==='string'){
this.sendStringImpl(data);}else 
if(data instanceof ArrayBuffer){
this.sendArrayBufferImpl(data);}else 
{
throw new Error('Not supported data type');}}},{key:'closeConnectionImpl',value:function closeConnectionImpl()



{
throw new Error('Subclass must define closeConnectionImpl method');}},{key:'connectToSocketImpl',value:function connectToSocketImpl(


url,protocols,options){
throw new Error('Subclass must define connectToSocketImpl method');}},{key:'cancelConnectionImpl',value:function cancelConnectionImpl()


{
throw new Error('Subclass must define cancelConnectionImpl method');}},{key:'sendStringImpl',value:function sendStringImpl(


message){
throw new Error('Subclass must define sendStringImpl method');}},{key:'sendArrayBufferImpl',value:function sendArrayBufferImpl()


{
throw new Error('Subclass must define sendArrayBufferImpl method');}}]);return WebSocketBase;}(EventTarget);



WebSocketBase.CONNECTING=CONNECTING;
WebSocketBase.OPEN=OPEN;
WebSocketBase.CLOSING=CLOSING;
WebSocketBase.CLOSED=CLOSED;

module.exports=WebSocketBase;
});
__d(259 /* event-target-shim/lib/event-target.js */, function(global, require, module, exports) {"use strict";











var Commons=require(231 /* ./commons */);
var CustomEventTarget=require(234 /* ./custom-event-target */);
var EventWrapper=require(247 /* ./event-wrapper */);
var LISTENERS=Commons.LISTENERS;
var CAPTURE=Commons.CAPTURE;
var BUBBLE=Commons.BUBBLE;
var ATTRIBUTE=Commons.ATTRIBUTE;
var newNode=Commons.newNode;
var defineCustomEventTarget=CustomEventTarget.defineCustomEventTarget;
var createEventWrapper=EventWrapper.createEventWrapper;
var STOP_IMMEDIATE_PROPAGATION_FLAG=
EventWrapper.STOP_IMMEDIATE_PROPAGATION_FLAG;











var HAS_EVENTTARGET_INTERFACE=
typeof window!=="undefined"&&
typeof window.EventTarget!=="undefined";












var EventTarget=module.exports=function EventTarget(){
if(this instanceof EventTarget){









Object.defineProperty(this,LISTENERS,{value:Object.create(null)});}else 

if(arguments.length===1&&Array.isArray(arguments[0])){
return defineCustomEventTarget(EventTarget,arguments[0]);}else 

if(arguments.length>0){
var types=Array(arguments.length);
for(var i=0;i<arguments.length;++i){
types[i]=arguments[i];}







return defineCustomEventTarget(EventTarget,types);}else 

{
throw new TypeError("Cannot call a class as a function");}};



EventTarget.prototype=Object.create(
(HAS_EVENTTARGET_INTERFACE?window.EventTarget:Object).prototype,
{
constructor:{
value:EventTarget,
writable:true,
configurable:true},


addEventListener:{
value:function addEventListener(type,listener,capture){
if(listener==null){
return false;}

if(typeof listener!=="function"&&typeof listener!=="object"){
throw new TypeError("\"listener\" is not an object.");}


var kind=capture?CAPTURE:BUBBLE;
var node=this[LISTENERS][type];
if(node==null){
this[LISTENERS][type]=newNode(listener,kind);
return true;}


var prev=null;
while(node!=null){
if(node.listener===listener&&node.kind===kind){

return false;}

prev=node;
node=node.next;}


prev.next=newNode(listener,kind);
return true;},

configurable:true,
writable:true},


removeEventListener:{
value:function removeEventListener(type,listener,capture){
if(listener==null){
return false;}


var kind=capture?CAPTURE:BUBBLE;
var prev=null;
var node=this[LISTENERS][type];
while(node!=null){
if(node.listener===listener&&node.kind===kind){
if(prev==null){
this[LISTENERS][type]=node.next;}else 

{
prev.next=node.next;}

return true;}


prev=node;
node=node.next;}


return false;},

configurable:true,
writable:true},


dispatchEvent:{
value:function dispatchEvent(event){

var node=this[LISTENERS][event.type];
if(node==null){
return true;}



var wrapped=createEventWrapper(event,this);



while(node!=null){
if(typeof node.listener==="function"){
node.listener.call(this,wrapped);}else 

if(node.kind!==ATTRIBUTE&&typeof node.listener.handleEvent==="function"){
node.listener.handleEvent(wrapped);}


if(wrapped[STOP_IMMEDIATE_PROPAGATION_FLAG]){
break;}

node=node.next;}


return !wrapped.defaultPrevented;},

configurable:true,
writable:true}});
});
__d(231 /* event-target-shim/lib/commons.js */, function(global, require, module, exports) {"use strict";














var createUniqueKey=exports.createUniqueKey=typeof Symbol!=="undefined"?
Symbol:
function createUniqueKey(name){
return "[["+name+"_"+Math.random().toFixed(8).slice(2)+"]]";};








exports.LISTENERS=createUniqueKey("listeners");







exports.CAPTURE=1;







exports.BUBBLE=2;







exports.ATTRIBUTE=3;
















exports.newNode=function newNode(listener,kind){
return {listener:listener,kind:kind,next:null};};
});
__d(234 /* event-target-shim/lib/custom-event-target.js */, function(global, require, module, exports) {"use strict";











var Commons=require(231 /* ./commons */);
var LISTENERS=Commons.LISTENERS;
var ATTRIBUTE=Commons.ATTRIBUTE;
var newNode=Commons.newNode;












function getAttributeListener(eventTarget,type){
var node=eventTarget[LISTENERS][type];
while(node!=null){
if(node.kind===ATTRIBUTE){
return node.listener;}

node=node.next;}

return null;}










function setAttributeListener(eventTarget,type,listener){
if(typeof listener!=="function"&&typeof listener!=="object"){
listener=null;}


var prev=null;
var node=eventTarget[LISTENERS][type];
while(node!=null){
if(node.kind===ATTRIBUTE){

if(prev==null){
eventTarget[LISTENERS][type]=node.next;}else 

{
prev.next=node.next;}}else 


{
prev=node;}


node=node.next;}



if(listener!=null){
if(prev==null){
eventTarget[LISTENERS][type]=newNode(listener,ATTRIBUTE);}else 

{
prev.next=newNode(listener,ATTRIBUTE);}}}















exports.defineCustomEventTarget=function(EventTargetBase,types){
function EventTarget(){
EventTargetBase.call(this);}


var descripter={
constructor:{
value:EventTarget,
configurable:true,
writable:true}};



types.forEach(function(type){
descripter["on"+type]={
get:function get(){return getAttributeListener(this,type);},
set:function set(listener){setAttributeListener(this,type,listener);},
configurable:true,
enumerable:true};});



EventTarget.prototype=Object.create(EventTargetBase.prototype,descripter);

return EventTarget;};
});
__d(247 /* event-target-shim/lib/event-wrapper.js */, function(global, require, module, exports) {"use strict";











var createUniqueKey=require(231 /* ./commons */).createUniqueKey;











var STOP_IMMEDIATE_PROPAGATION_FLAG=
createUniqueKey("stop_immediate_propagation_flag");







var CANCELED_FLAG=createUniqueKey("canceled_flag");







var ORIGINAL_EVENT=createUniqueKey("original_event");







var wrapperPrototypeDefinition=Object.freeze({
stopPropagation:Object.freeze({
value:function stopPropagation(){
var e=this[ORIGINAL_EVENT];
if(typeof e.stopPropagation==="function"){
e.stopPropagation();}},


writable:true,
configurable:true}),


stopImmediatePropagation:Object.freeze({
value:function stopImmediatePropagation(){
this[STOP_IMMEDIATE_PROPAGATION_FLAG]=true;

var e=this[ORIGINAL_EVENT];
if(typeof e.stopImmediatePropagation==="function"){
e.stopImmediatePropagation();}},


writable:true,
configurable:true}),


preventDefault:Object.freeze({
value:function preventDefault(){
if(this.cancelable===true){
this[CANCELED_FLAG]=true;}


var e=this[ORIGINAL_EVENT];
if(typeof e.preventDefault==="function"){
e.preventDefault();}},


writable:true,
configurable:true}),


defaultPrevented:Object.freeze({
get:function defaultPrevented(){return this[CANCELED_FLAG];},
enumerable:true,
configurable:true})});







exports.STOP_IMMEDIATE_PROPAGATION_FLAG=STOP_IMMEDIATE_PROPAGATION_FLAG;












exports.createEventWrapper=function createEventWrapper(event,eventTarget){
var timeStamp=
typeof event.timeStamp==="number"?event.timeStamp:Date.now();

var propertyDefinition={
type:{value:event.type,enumerable:true},
target:{value:eventTarget,enumerable:true},
currentTarget:{value:eventTarget,enumerable:true},
eventPhase:{value:2,enumerable:true},
bubbles:{value:Boolean(event.bubbles),enumerable:true},
cancelable:{value:Boolean(event.cancelable),enumerable:true},
timeStamp:{value:timeStamp,enumerable:true},
isTrusted:{value:false,enumerable:true}};

propertyDefinition[STOP_IMMEDIATE_PROPAGATION_FLAG]={value:false,writable:true};
propertyDefinition[CANCELED_FLAG]={value:false,writable:true};
propertyDefinition[ORIGINAL_EVENT]={value:event};


if(typeof event.detail!=="undefined"){
propertyDefinition.detail={value:event.detail,enumerable:true};}


return Object.create(
Object.create(event,wrapperPrototypeDefinition),
propertyDefinition);};
});
__d(20 /* WebSocketEvent */, function(global, require, module, exports) {'use strict';var 




















WebSocketEvent=
function WebSocketEvent(type,eventInitDict){babelHelpers.classCallCheck(this,WebSocketEvent);
this.type=type.toString();
babelHelpers.extends(this,eventInitDict);};



module.exports=WebSocketEvent;
});
__d(289 /* base64-js/lib/b64.js */, function(global, require, module, exports) {var lookup='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function(exports){
'use strict';

var Arr=typeof Uint8Array!=='undefined'?
Uint8Array:
Array;

var PLUS='+'.charCodeAt(0);
var SLASH='/'.charCodeAt(0);
var NUMBER='0'.charCodeAt(0);
var LOWER='a'.charCodeAt(0);
var UPPER='A'.charCodeAt(0);
var PLUS_URL_SAFE='-'.charCodeAt(0);
var SLASH_URL_SAFE='_'.charCodeAt(0);

function decode(elt){
var code=elt.charCodeAt(0);
if(code===PLUS||
code===PLUS_URL_SAFE)
return 62;
if(code===SLASH||
code===SLASH_URL_SAFE)
return 63;
if(code<NUMBER)
return -1;
if(code<NUMBER+10)
return code-NUMBER+26+26;
if(code<UPPER+26)
return code-UPPER;
if(code<LOWER+26)
return code-LOWER+26;}


function b64ToByteArray(b64){
var i,j,l,tmp,placeHolders,arr;

if(b64.length%4>0){
throw new Error('Invalid string. Length must be a multiple of 4');}







var len=b64.length;
placeHolders='='===b64.charAt(len-2)?2:'='===b64.charAt(len-1)?1:0;


arr=new Arr(b64.length*3/4-placeHolders);


l=placeHolders>0?b64.length-4:b64.length;

var L=0;

function push(v){
arr[L++]=v;}


for(i=0,j=0;i<l;i+=4,j+=3){
tmp=decode(b64.charAt(i))<<18|decode(b64.charAt(i+1))<<12|decode(b64.charAt(i+2))<<6|decode(b64.charAt(i+3));
push((tmp&0xFF0000)>>16);
push((tmp&0xFF00)>>8);
push(tmp&0xFF);}


if(placeHolders===2){
tmp=decode(b64.charAt(i))<<2|decode(b64.charAt(i+1))>>4;
push(tmp&0xFF);}else 
if(placeHolders===1){
tmp=decode(b64.charAt(i))<<10|decode(b64.charAt(i+1))<<4|decode(b64.charAt(i+2))>>2;
push(tmp>>8&0xFF);
push(tmp&0xFF);}


return arr;}


function uint8ToBase64(uint8){
var i,
extraBytes=uint8.length%3,
output="",
temp,length;

function encode(num){
return lookup.charAt(num);}


function tripletToBase64(num){
return encode(num>>18&0x3F)+encode(num>>12&0x3F)+encode(num>>6&0x3F)+encode(num&0x3F);}



for(i=0,length=uint8.length-extraBytes;i<length;i+=3){
temp=(uint8[i]<<16)+(uint8[i+1]<<8)+uint8[i+2];
output+=tripletToBase64(temp);}



switch(extraBytes){
case 1:
temp=uint8[uint8.length-1];
output+=encode(temp>>2);
output+=encode(temp<<4&0x3F);
output+='==';
break;
case 2:
temp=(uint8[uint8.length-2]<<8)+uint8[uint8.length-1];
output+=encode(temp>>10);
output+=encode(temp>>4&0x3F);
output+=encode(temp<<2&0x3F);
output+='=';
break;}


return output;}


exports.toByteArray=b64ToByteArray;
exports.fromByteArray=uint8ToBase64;})(
typeof exports==='undefined'?this.base64js={}:exports);
});
__d(21 /* HMRLoadingView */, function(global, require, module, exports) {'use strict';













var ToastAndroid=require(22 /* ToastAndroid */);

var TOAST_SHORT_DELAY=2000;var 

HMRLoadingView=function(){function HMRLoadingView(){babelHelpers.classCallCheck(this,HMRLoadingView);}babelHelpers.createClass(HMRLoadingView,null,[{key:'showMessage',value:function showMessage(


message){
if(HMRLoadingView._showing){
return;}

ToastAndroid.show(message,ToastAndroid.SHORT);
HMRLoadingView._showing=true;
setTimeout(function(){
HMRLoadingView._showing=false;},
TOAST_SHORT_DELAY);}},{key:'hide',value:function hide()


{}}]);return HMRLoadingView;}();




module.exports=HMRLoadingView;
});
__d(22 /* ToastAndroid */, function(global, require, module, exports) {'use strict';












var RCTToastAndroid=require(9 /* NativeModules */).ToastAndroid;









var ToastAndroid={

SHORT:RCTToastAndroid.SHORT,
LONG:RCTToastAndroid.LONG,

show:function show(
message,
duration)
{
RCTToastAndroid.show(message,duration);}};




module.exports=ToastAndroid;
});
__d(23 /* SourceMapsCache */, function(global, require, module, exports) {'use strict';











var getObjectValues=require(24 /* getObjectValues */);
var SourceMapsUtils=require(25 /* SourceMapsUtils */);

var sourceMapsCache={};

var SourceMapsCache={
mainSourceMapID:'main',

fetch:function fetch(_ref){var text=_ref.text;var url=_ref.url;var fullSourceMappingURL=_ref.fullSourceMappingURL;
var sourceMappingURL=fullSourceMappingURL?
fullSourceMappingURL:
SourceMapsUtils.extractSourceMapURL({text:text,url:url});

sourceMapsCache[sourceMappingURL]=SourceMapsUtils.fetchSourceMap(
sourceMappingURL);},



getSourceMaps:function getSourceMaps(){
fetchMainSourceMap();
return Promise.all(getObjectValues(sourceMapsCache));}};



function fetchMainSourceMap(){
if(!sourceMapsCache[SourceMapsCache.mainSourceMapID]){
sourceMapsCache[SourceMapsCache.mainSourceMapID]=
SourceMapsUtils.fetchMainSourceMap();}}



module.exports=SourceMapsCache;
});
__d(24 /* getObjectValues */, function(global, require, module, exports) {function 


























getObjectValues(obj){
var values=[];
for(var key in obj){
values.push(obj[key]);}

return values;}


module.exports=getObjectValues;
});
__d(25 /* SourceMapsUtils */, function(global, require, module, exports) {'use strict';













var Promise=require(26 /* Promise */);
var NativeModules=require(9 /* NativeModules */);
var SourceMapConsumer=require(27 /* SourceMap */).SourceMapConsumer;
var SourceMapURL=require(220 /* ./source-map-url */);

var RCTSourceCode=NativeModules.SourceCode;
var RCTNetworking=NativeModules.Networking;

var SourceMapsUtils={
fetchMainSourceMap:function fetchMainSourceMap(){
return SourceMapsUtils._getMainSourceMapURL().then(function(url){return (
SourceMapsUtils.fetchSourceMap(url));});},



fetchSourceMap:function fetchSourceMap(sourceMappingURL){
return fetch(sourceMappingURL).
then(function(response){return response.text();}).
then(function(map){return new SourceMapConsumer(map);});},


extractSourceMapURL:function extractSourceMapURL(data){
var url=data.url;
var text=data.text;
var fullSourceMappingURL=data.fullSourceMappingURL;
if(fullSourceMappingURL){
return fullSourceMappingURL;}

var mapURL=SourceMapURL.getFrom(text);
if(!mapURL){
return null;}

if(!url){
return null;}

var baseURLs=url.match(/(.+:\/\/.*?)\//);
if(!baseURLs||baseURLs.length<2){
return null;}

return baseURLs[1]+mapURL;},


_getMainSourceMapURL:function _getMainSourceMapURL(){
if(global.RAW_SOURCE_MAP){
return Promise.resolve(global.RAW_SOURCE_MAP);}


if(!RCTSourceCode){
return Promise.reject(new Error('RCTSourceCode module is not available'));}


if(!RCTNetworking){

return Promise.reject(new Error('RCTNetworking module is not available'));}


return RCTSourceCode.getScriptText().
then(SourceMapsUtils.extractSourceMapURL).
then(function(url){
if(url===null){
return Promise.reject(new Error('No source map URL found. May be running from bundled file.'));}

return Promise.resolve(url);});}};




module.exports=SourceMapsUtils;
});
__d(26 /* Promise */, function(global, require, module, exports) {'use strict';












var Promise=require(228 /* fbjs/lib/Promise.native */);

if(__DEV__){
require(265 /* promise/setimmediate/rejection-tracking */).enable({
allRejections:true,
onUnhandled:function onUnhandled(id,error){var 
message=error.message;var stack=error.stack;
var warning=
'Possible Unhandled Promise Rejection (id: '+id+'):\n'+(
message==null?'':message+'\n')+(
stack==null?'':stack);
console.warn(warning);},

onHandled:function onHandled(id){
var warning=
'Promise Rejection Handled (id: '+id+')\n'+
'This means you can ignore any previous messages of the form '+('"Possible Unhandled Promise Rejection (id: '+
id+'):"');
console.warn(warning);}});}




module.exports=Promise;
});
__d(228 /* fbjs/lib/Promise.native.js */, function(global, require, module, exports) {'use strict';














var Promise=require(261 /* promise/setimmediate/es6-extensions */);
require(229 /* promise/setimmediate/done */);




Promise.prototype['finally']=function(onSettled){
return this.then(onSettled,onSettled);};


module.exports=Promise;
});
__d(261 /* promise/setimmediate/es6-extensions.js */, function(global, require, module, exports) {'use strict';



var Promise=require(296 /* ./core.js */);

module.exports=Promise;



var TRUE=valuePromise(true);
var FALSE=valuePromise(false);
var NULL=valuePromise(null);
var UNDEFINED=valuePromise(undefined);
var ZERO=valuePromise(0);
var EMPTYSTRING=valuePromise('');

function valuePromise(value){
var p=new Promise(Promise._61);
p._81=1;
p._65=value;
return p;}

Promise.resolve=function(value){
if(value instanceof Promise)return value;

if(value===null)return NULL;
if(value===undefined)return UNDEFINED;
if(value===true)return TRUE;
if(value===false)return FALSE;
if(value===0)return ZERO;
if(value==='')return EMPTYSTRING;

if(typeof value==='object'||typeof value==='function'){
try{
var then=value.then;
if(typeof then==='function'){
return new Promise(then.bind(value));}}

catch(ex){
return new Promise(function(resolve,reject){
reject(ex);});}}



return valuePromise(value);};


Promise.all=function(arr){
var args=Array.prototype.slice.call(arr);

return new Promise(function(resolve,reject){
if(args.length===0)return resolve([]);
var remaining=args.length;
function res(i,val){
if(val&&(typeof val==='object'||typeof val==='function')){
if(val instanceof Promise&&val.then===Promise.prototype.then){
while(val._81===3){
val=val._65;}

if(val._81===1)return res(i,val._65);
if(val._81===2)reject(val._65);
val.then(function(val){
res(i,val);},
reject);
return;}else 
{
var then=val.then;
if(typeof then==='function'){
var p=new Promise(then.bind(val));
p.then(function(val){
res(i,val);},
reject);
return;}}}



args[i]=val;
if(--remaining===0){
resolve(args);}}


for(var i=0;i<args.length;i++){
res(i,args[i]);}});};




Promise.reject=function(value){
return new Promise(function(resolve,reject){
reject(value);});};



Promise.race=function(values){
return new Promise(function(resolve,reject){
values.forEach(function(value){
Promise.resolve(value).then(resolve,reject);});});};






Promise.prototype['catch']=function(onRejected){
return this.then(null,onRejected);};
});
__d(296 /* promise/setimmediate/core.js */, function(global, require, module, exports) {'use strict';



function noop(){}


















var LAST_ERROR=null;
var IS_ERROR={};
function getThen(obj){
try{
return obj.then;}
catch(ex){
LAST_ERROR=ex;
return IS_ERROR;}}



function tryCallOne(fn,a){
try{
return fn(a);}
catch(ex){
LAST_ERROR=ex;
return IS_ERROR;}}


function tryCallTwo(fn,a,b){
try{
fn(a,b);}
catch(ex){
LAST_ERROR=ex;
return IS_ERROR;}}



module.exports=Promise;

function Promise(fn){
if(typeof this!=='object'){
throw new TypeError('Promises must be constructed via new');}

if(typeof fn!=='function'){
throw new TypeError('not a function');}

this._45=0;
this._81=0;
this._65=null;
this._54=null;
if(fn===noop)return;
doResolve(fn,this);}

Promise._10=null;
Promise._97=null;
Promise._61=noop;

Promise.prototype.then=function(onFulfilled,onRejected){
if(this.constructor!==Promise){
return safeThen(this,onFulfilled,onRejected);}

var res=new Promise(noop);
handle(this,new Handler(onFulfilled,onRejected,res));
return res;};


function safeThen(self,onFulfilled,onRejected){
return new self.constructor(function(resolve,reject){
var res=new Promise(noop);
res.then(resolve,reject);
handle(self,new Handler(onFulfilled,onRejected,res));});}

;
function handle(self,deferred){
while(self._81===3){
self=self._65;}

if(Promise._10){
Promise._10(self);}

if(self._81===0){
if(self._45===0){
self._45=1;
self._54=deferred;
return;}

if(self._45===1){
self._45=2;
self._54=[self._54,deferred];
return;}

self._54.push(deferred);
return;}

handleResolved(self,deferred);}


function handleResolved(self,deferred){
setImmediate(function(){
var cb=self._81===1?deferred.onFulfilled:deferred.onRejected;
if(cb===null){
if(self._81===1){
resolve(deferred.promise,self._65);}else 
{
reject(deferred.promise,self._65);}

return;}

var ret=tryCallOne(cb,self._65);
if(ret===IS_ERROR){
reject(deferred.promise,LAST_ERROR);}else 
{
resolve(deferred.promise,ret);}});}



function resolve(self,newValue){

if(newValue===self){
return reject(
self,
new TypeError('A promise cannot be resolved with itself.'));}


if(
newValue&&(
typeof newValue==='object'||typeof newValue==='function'))
{
var then=getThen(newValue);
if(then===IS_ERROR){
return reject(self,LAST_ERROR);}

if(
then===self.then&&
newValue instanceof Promise)
{
self._81=3;
self._65=newValue;
finale(self);
return;}else 
if(typeof then==='function'){
doResolve(then.bind(newValue),self);
return;}}


self._81=1;
self._65=newValue;
finale(self);}


function reject(self,newValue){
self._81=2;
self._65=newValue;
if(Promise._97){
Promise._97(self,newValue);}

finale(self);}

function finale(self){
if(self._45===1){
handle(self,self._54);
self._54=null;}

if(self._45===2){
for(var i=0;i<self._54.length;i++){
handle(self,self._54[i]);}

self._54=null;}}



function Handler(onFulfilled,onRejected,promise){
this.onFulfilled=typeof onFulfilled==='function'?onFulfilled:null;
this.onRejected=typeof onRejected==='function'?onRejected:null;
this.promise=promise;}








function doResolve(fn,promise){
var done=false;
var res=tryCallTwo(fn,function(value){
if(done)return;
done=true;
resolve(promise,value);},
function(reason){
if(done)return;
done=true;
reject(promise,reason);});

if(!done&&res===IS_ERROR){
done=true;
reject(promise,LAST_ERROR);}}
});
__d(229 /* promise/setimmediate/done.js */, function(global, require, module, exports) {'use strict';

var Promise=require(296 /* ./core.js */);

module.exports=Promise;
Promise.prototype.done=function(onFulfilled,onRejected){
var self=arguments.length?this.then.apply(this,arguments):this;
self.then(null,function(err){
setTimeout(function(){
throw err;},
0);});};
});
__d(265 /* promise/setimmediate/rejection-tracking.js */, function(global, require, module, exports) {'use strict';

var Promise=require(296 /* ./core */);

var DEFAULT_WHITELIST=[
ReferenceError,
TypeError,
RangeError];


var enabled=false;
exports.disable=disable;
function disable(){
enabled=false;
Promise._10=null;
Promise._97=null;}


exports.enable=enable;
function enable(options){
options=options||{};
if(enabled)disable();
enabled=true;
var id=0;
var displayId=0;
var rejections={};
Promise._10=function(promise){
if(
promise._81===2&&
rejections[promise._72])
{
if(rejections[promise._72].logged){
onHandled(promise._72);}else 
{
clearTimeout(rejections[promise._72].timeout);}

delete rejections[promise._72];}};


Promise._97=function(promise,err){
if(promise._45===0){
promise._72=id++;
rejections[promise._72]={
displayId:null,
error:err,
timeout:setTimeout(
onUnhandled.bind(null,promise._72),




matchWhitelist(err,DEFAULT_WHITELIST)?
100:
2000),

logged:false};}};



function onUnhandled(id){
if(
options.allRejections||
matchWhitelist(
rejections[id].error,
options.whitelist||DEFAULT_WHITELIST))

{
rejections[id].displayId=displayId++;
if(options.onUnhandled){
rejections[id].logged=true;
options.onUnhandled(
rejections[id].displayId,
rejections[id].error);}else 

{
rejections[id].logged=true;
logError(
rejections[id].displayId,
rejections[id].error);}}}




function onHandled(id){
if(rejections[id].logged){
if(options.onHandled){
options.onHandled(rejections[id].displayId,rejections[id].error);}else 
if(!rejections[id].onUnhandled){
console.warn(
'Promise Rejection Handled (id: '+rejections[id].displayId+'):');

console.warn(
'  This means you can ignore any previous messages of the form "Possible Unhandled Promise Rejection" with id '+
rejections[id].displayId+'.');}}}}






function logError(id,error){
console.warn('Possible Unhandled Promise Rejection (id: '+id+'):');
var errStr=(error&&(error.stack||error))+'';
errStr.split('\n').forEach(function(line){
console.warn('  '+line);});}



function matchWhitelist(error,list){
return list.some(function(cls){
return error instanceof cls;});}
});
__d(27 /* SourceMap */, function(global, require, module, exports) {var 























scope={};
wrapper.call(scope);

module.exports=scope.sourceMap;

function wrapper(){














function define(moduleName,deps,payload){
if(typeof moduleName!="string"){
throw new TypeError('Expected string, got: '+moduleName);}


if(arguments.length==2){
payload=deps;}


if(moduleName in define.modules){
throw new Error("Module already defined: "+moduleName);}

define.modules[moduleName]=payload;}
;




define.modules={};










function Domain(){
this.modules={};
this._currentModule=null;}


(function(){
















Domain.prototype.require=function(deps,callback){
if(Array.isArray(deps)){
var params=deps.map(function(dep){
return this.lookup(dep);},
this);
if(callback){
callback.apply(null,params);}

return undefined;}else 

{
return this.lookup(deps);}};



function normalize(path){
var bits=path.split('/');
var i=1;
while(i<bits.length){
if(bits[i]==='..'){
bits.splice(i-1,1);}else 
if(bits[i]==='.'){
bits.splice(i,1);}else 
{
i++;}}


return bits.join('/');}


function join(a,b){
a=a.trim();
b=b.trim();
if(/^\//.test(b)){
return b;}else 
{
return a.replace(/\/*$/,'/')+b;}}



function dirname(path){
var bits=path.split('/');
bits.pop();
return bits.join('/');}








Domain.prototype.lookup=function(moduleName){
if(/^\./.test(moduleName)){
moduleName=normalize(join(dirname(this._currentModule),moduleName));}


if(moduleName in this.modules){
var module=this.modules[moduleName];
return module;}


if(!(moduleName in define.modules)){
throw new Error("Module not defined: "+moduleName);}


var module=define.modules[moduleName];

if(typeof module=="function"){
var exports={};
var previousModule=this._currentModule;
this._currentModule=moduleName;
module(this.require.bind(this),exports,{id:moduleName,uri:""});
this._currentModule=previousModule;
module=exports;}



this.modules[moduleName]=module;

return module;};})();




define.Domain=Domain;
define.globalDomain=new Domain();
var require=define.globalDomain.require.bind(define.globalDomain);






define('source-map/source-map-generator',['require','exports','module','source-map/base64-vlq','source-map/util','source-map/array-set'],function(require,exports,module){

var base64VLQ=require('./base64-vlq');
var util=require('./util');
var ArraySet=require('./array-set').ArraySet;









function SourceMapGenerator(aArgs){
this._file=util.getArg(aArgs,'file');
this._sourceRoot=util.getArg(aArgs,'sourceRoot',null);
this._sources=new ArraySet();
this._names=new ArraySet();
this._mappings=[];
this._sourcesContents=null;}


SourceMapGenerator.prototype._version=3;






SourceMapGenerator.fromSourceMap=
function SourceMapGenerator_fromSourceMap(aSourceMapConsumer){
var sourceRoot=aSourceMapConsumer.sourceRoot;
var generator=new SourceMapGenerator({
file:aSourceMapConsumer.file,
sourceRoot:sourceRoot});

aSourceMapConsumer.eachMapping(function(mapping){
var newMapping={
generated:{
line:mapping.generatedLine,
column:mapping.generatedColumn}};



if(mapping.source){
newMapping.source=mapping.source;
if(sourceRoot){
newMapping.source=util.relative(sourceRoot,newMapping.source);}


newMapping.original={
line:mapping.originalLine,
column:mapping.originalColumn};


if(mapping.name){
newMapping.name=mapping.name;}}



generator.addMapping(newMapping);});

aSourceMapConsumer.sources.forEach(function(sourceFile){
var content=aSourceMapConsumer.sourceContentFor(sourceFile);
if(content){
generator.setSourceContent(sourceFile,content);}});


return generator;};












SourceMapGenerator.prototype.addMapping=
function SourceMapGenerator_addMapping(aArgs){
var generated=util.getArg(aArgs,'generated');
var original=util.getArg(aArgs,'original',null);
var source=util.getArg(aArgs,'source',null);
var name=util.getArg(aArgs,'name',null);

this._validateMapping(generated,original,source,name);

if(source&&!this._sources.has(source)){
this._sources.add(source);}


if(name&&!this._names.has(name)){
this._names.add(name);}


this._mappings.push({
generatedLine:generated.line,
generatedColumn:generated.column,
originalLine:original!=null&&original.line,
originalColumn:original!=null&&original.column,
source:source,
name:name});};






SourceMapGenerator.prototype.setSourceContent=
function SourceMapGenerator_setSourceContent(aSourceFile,aSourceContent){
var source=aSourceFile;
if(this._sourceRoot){
source=util.relative(this._sourceRoot,source);}


if(aSourceContent!==null){


if(!this._sourcesContents){
this._sourcesContents={};}

this._sourcesContents[util.toSetString(source)]=aSourceContent;}else 
{


delete this._sourcesContents[util.toSetString(source)];
if(Object.keys(this._sourcesContents).length===0){
this._sourcesContents=null;}}};














SourceMapGenerator.prototype.applySourceMap=
function SourceMapGenerator_applySourceMap(aSourceMapConsumer,aSourceFile){

if(!aSourceFile){
aSourceFile=aSourceMapConsumer.file;}

var sourceRoot=this._sourceRoot;

if(sourceRoot){
aSourceFile=util.relative(sourceRoot,aSourceFile);}



var newSources=new ArraySet();
var newNames=new ArraySet();


this._mappings.forEach(function(mapping){
if(mapping.source===aSourceFile&&mapping.originalLine){

var original=aSourceMapConsumer.originalPositionFor({
line:mapping.originalLine,
column:mapping.originalColumn});

if(original.source!==null){

if(sourceRoot){
mapping.source=util.relative(sourceRoot,original.source);}else 
{
mapping.source=original.source;}

mapping.originalLine=original.line;
mapping.originalColumn=original.column;
if(original.name!==null&&mapping.name!==null){


mapping.name=original.name;}}}




var source=mapping.source;
if(source&&!newSources.has(source)){
newSources.add(source);}


var name=mapping.name;
if(name&&!newNames.has(name)){
newNames.add(name);}},


this);
this._sources=newSources;
this._names=newNames;


aSourceMapConsumer.sources.forEach(function(sourceFile){
var content=aSourceMapConsumer.sourceContentFor(sourceFile);
if(content){
if(sourceRoot){
sourceFile=util.relative(sourceRoot,sourceFile);}

this.setSourceContent(sourceFile,content);}},

this);};













SourceMapGenerator.prototype._validateMapping=
function SourceMapGenerator_validateMapping(aGenerated,aOriginal,aSource,
aName){
if(aGenerated&&'line' in aGenerated&&'column' in aGenerated&&
aGenerated.line>0&&aGenerated.column>=0&&
!aOriginal&&!aSource&&!aName){

return;}else 

if(aGenerated&&'line' in aGenerated&&'column' in aGenerated&&
aOriginal&&'line' in aOriginal&&'column' in aOriginal&&
aGenerated.line>0&&aGenerated.column>=0&&
aOriginal.line>0&&aOriginal.column>=0&&
aSource){

return;}else 

{
throw new Error('Invalid mapping: '+JSON.stringify({
generated:aGenerated,
source:aSource,
orginal:aOriginal,
name:aName}));}};








SourceMapGenerator.prototype._serializeMappings=
function SourceMapGenerator_serializeMappings(){
var previousGeneratedColumn=0;
var previousGeneratedLine=1;
var previousOriginalColumn=0;
var previousOriginalLine=0;
var previousName=0;
var previousSource=0;
var result='';
var mapping;






this._mappings.sort(util.compareByGeneratedPositions);

for(var i=0,len=this._mappings.length;i<len;i++){
mapping=this._mappings[i];

if(mapping.generatedLine!==previousGeneratedLine){
previousGeneratedColumn=0;
while(mapping.generatedLine!==previousGeneratedLine){
result+=';';
previousGeneratedLine++;}}else 


{
if(i>0){
if(!util.compareByGeneratedPositions(mapping,this._mappings[i-1])){
continue;}

result+=',';}}



result+=base64VLQ.encode(mapping.generatedColumn-
previousGeneratedColumn);
previousGeneratedColumn=mapping.generatedColumn;

if(mapping.source){
result+=base64VLQ.encode(this._sources.indexOf(mapping.source)-
previousSource);
previousSource=this._sources.indexOf(mapping.source);


result+=base64VLQ.encode(mapping.originalLine-1-
previousOriginalLine);
previousOriginalLine=mapping.originalLine-1;

result+=base64VLQ.encode(mapping.originalColumn-
previousOriginalColumn);
previousOriginalColumn=mapping.originalColumn;

if(mapping.name){
result+=base64VLQ.encode(this._names.indexOf(mapping.name)-
previousName);
previousName=this._names.indexOf(mapping.name);}}}




return result;};


SourceMapGenerator.prototype._generateSourcesContent=
function SourceMapGenerator_generateSourcesContent(aSources,aSourceRoot){
return aSources.map(function(source){
if(!this._sourcesContents){
return null;}

if(aSourceRoot){
source=util.relative(aSourceRoot,source);}

var key=util.toSetString(source);
return Object.prototype.hasOwnProperty.call(this._sourcesContents,
key)?
this._sourcesContents[key]:
null;},
this);};





SourceMapGenerator.prototype.toJSON=
function SourceMapGenerator_toJSON(){
var map={
version:this._version,
file:this._file,
sources:this._sources.toArray(),
names:this._names.toArray(),
mappings:this._serializeMappings()};

if(this._sourceRoot){
map.sourceRoot=this._sourceRoot;}

if(this._sourcesContents){
map.sourcesContent=this._generateSourcesContent(map.sources,map.sourceRoot);}


return map;};





SourceMapGenerator.prototype.toString=
function SourceMapGenerator_toString(){
return JSON.stringify(this);};


exports.SourceMapGenerator=SourceMapGenerator;});






































define('source-map/base64-vlq',['require','exports','module','source-map/base64'],function(require,exports,module){

var base64=require('./base64');













var VLQ_BASE_SHIFT=5;


var VLQ_BASE=1<<VLQ_BASE_SHIFT;


var VLQ_BASE_MASK=VLQ_BASE-1;


var VLQ_CONTINUATION_BIT=VLQ_BASE;







function toVLQSigned(aValue){
return aValue<0?
(-aValue<<1)+1:
(aValue<<1)+0;}








function fromVLQSigned(aValue){
var isNegative=(aValue&1)===1;
var shifted=aValue>>1;
return isNegative?
-shifted:
shifted;}





exports.encode=function base64VLQ_encode(aValue){
var encoded="";
var digit;

var vlq=toVLQSigned(aValue);

do {
digit=vlq&VLQ_BASE_MASK;
vlq>>>=VLQ_BASE_SHIFT;
if(vlq>0){


digit|=VLQ_CONTINUATION_BIT;}

encoded+=base64.encode(digit);}while(
vlq>0);

return encoded;};






exports.decode=function base64VLQ_decode(aStr){
var i=0;
var strLen=aStr.length;
var result=0;
var shift=0;
var continuation,digit;

do {
if(i>=strLen){
throw new Error("Expected more digits in base 64 VLQ value.");}

digit=base64.decode(aStr.charAt(i++));
continuation=!!(digit&VLQ_CONTINUATION_BIT);
digit&=VLQ_BASE_MASK;
result=result+(digit<<shift);
shift+=VLQ_BASE_SHIFT;}while(
continuation);

return {
value:fromVLQSigned(result),
rest:aStr.slice(i)};};});










define('source-map/base64',['require','exports','module'],function(require,exports,module){

var charToIntMap={};
var intToCharMap={};

'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.
split('').
forEach(function(ch,index){
charToIntMap[ch]=index;
intToCharMap[index]=ch;});





exports.encode=function base64_encode(aNumber){
if(aNumber in intToCharMap){
return intToCharMap[aNumber];}

throw new TypeError("Must be between 0 and 63: "+aNumber);};





exports.decode=function base64_decode(aChar){
if(aChar in charToIntMap){
return charToIntMap[aChar];}

throw new TypeError("Not a valid base 64 digit: "+aChar);};});









define('source-map/util',['require','exports','module'],function(require,exports,module){











function getArg(aArgs,aName,aDefaultValue){
if(aName in aArgs){
return aArgs[aName];}else 
if(arguments.length===3){
return aDefaultValue;}else 
{
throw new Error('"'+aName+'" is a required argument.');}}


exports.getArg=getArg;

var urlRegexp=/([\w+\-.]+):\/\/((\w+:\w+)@)?([\w.]+)?(:(\d+))?(\S+)?/;
var dataUrlRegexp=/^data:.+\,.+/;

function urlParse(aUrl){
var match=aUrl.match(urlRegexp);
if(!match){
return null;}

return {
scheme:match[1],
auth:match[3],
host:match[4],
port:match[6],
path:match[7]};}


exports.urlParse=urlParse;

function urlGenerate(aParsedUrl){
var url=aParsedUrl.scheme+"://";
if(aParsedUrl.auth){
url+=aParsedUrl.auth+"@";}

if(aParsedUrl.host){
url+=aParsedUrl.host;}

if(aParsedUrl.port){
url+=":"+aParsedUrl.port;}

if(aParsedUrl.path){
url+=aParsedUrl.path;}

return url;}

exports.urlGenerate=urlGenerate;

function join(aRoot,aPath){
var url;

if(aPath.match(urlRegexp)||aPath.match(dataUrlRegexp)){
return aPath;}


if(aPath.charAt(0)==='/'&&(url=urlParse(aRoot))){
url.path=aPath;
return urlGenerate(url);}


return aRoot.replace(/\/$/,'')+'/'+aPath;}

exports.join=join;










function toSetString(aStr){
return '$'+aStr;}

exports.toSetString=toSetString;

function fromSetString(aStr){
return aStr.substr(1);}

exports.fromSetString=fromSetString;

function relative(aRoot,aPath){
aRoot=aRoot.replace(/\/$/,'');

var url=urlParse(aRoot);
if(aPath.charAt(0)=="/"&&url&&url.path=="/"){
return aPath.slice(1);}


return aPath.indexOf(aRoot+'/')===0?
aPath.substr(aRoot.length+1):
aPath;}

exports.relative=relative;

function strcmp(aStr1,aStr2){
var s1=aStr1||"";
var s2=aStr2||"";
return (s1>s2)-(s1<s2);}










function compareByOriginalPositions(mappingA,mappingB,onlyCompareOriginal){
var cmp;

cmp=strcmp(mappingA.source,mappingB.source);
if(cmp){
return cmp;}


cmp=mappingA.originalLine-mappingB.originalLine;
if(cmp){
return cmp;}


cmp=mappingA.originalColumn-mappingB.originalColumn;
if(cmp||onlyCompareOriginal){
return cmp;}


cmp=strcmp(mappingA.name,mappingB.name);
if(cmp){
return cmp;}


cmp=mappingA.generatedLine-mappingB.generatedLine;
if(cmp){
return cmp;}


return mappingA.generatedColumn-mappingB.generatedColumn;}
;
exports.compareByOriginalPositions=compareByOriginalPositions;










function compareByGeneratedPositions(mappingA,mappingB,onlyCompareGenerated){
var cmp;

cmp=mappingA.generatedLine-mappingB.generatedLine;
if(cmp){
return cmp;}


cmp=mappingA.generatedColumn-mappingB.generatedColumn;
if(cmp||onlyCompareGenerated){
return cmp;}


cmp=strcmp(mappingA.source,mappingB.source);
if(cmp){
return cmp;}


cmp=mappingA.originalLine-mappingB.originalLine;
if(cmp){
return cmp;}


cmp=mappingA.originalColumn-mappingB.originalColumn;
if(cmp){
return cmp;}


return strcmp(mappingA.name,mappingB.name);}
;
exports.compareByGeneratedPositions=compareByGeneratedPositions;});








define('source-map/array-set',['require','exports','module','source-map/util'],function(require,exports,module){

var util=require('./util');







function ArraySet(){
this._array=[];
this._set={};}





ArraySet.fromArray=function ArraySet_fromArray(aArray,aAllowDuplicates){
var set=new ArraySet();
for(var i=0,len=aArray.length;i<len;i++){
set.add(aArray[i],aAllowDuplicates);}

return set;};







ArraySet.prototype.add=function ArraySet_add(aStr,aAllowDuplicates){
var isDuplicate=this.has(aStr);
var idx=this._array.length;
if(!isDuplicate||aAllowDuplicates){
this._array.push(aStr);}

if(!isDuplicate){
this._set[util.toSetString(aStr)]=idx;}};








ArraySet.prototype.has=function ArraySet_has(aStr){
return Object.prototype.hasOwnProperty.call(this._set,
util.toSetString(aStr));};







ArraySet.prototype.indexOf=function ArraySet_indexOf(aStr){
if(this.has(aStr)){
return this._set[util.toSetString(aStr)];}

throw new Error('"'+aStr+'" is not in the set.');};







ArraySet.prototype.at=function ArraySet_at(aIdx){
if(aIdx>=0&&aIdx<this._array.length){
return this._array[aIdx];}

throw new Error('No element indexed by '+aIdx);};







ArraySet.prototype.toArray=function ArraySet_toArray(){
return this._array.slice();};


exports.ArraySet=ArraySet;});








define('source-map/source-map-consumer',['require','exports','module','source-map/util','source-map/binary-search','source-map/array-set','source-map/base64-vlq'],function(require,exports,module){

var util=require('./util');
var binarySearch=require('./binary-search');
var ArraySet=require('./array-set').ArraySet;
var base64VLQ=require('./base64-vlq');































function SourceMapConsumer(aSourceMap){
var sourceMap=aSourceMap;
if(typeof aSourceMap==='string'){
sourceMap=JSON.parse(aSourceMap.replace(/^\)\]\}'/,''));}


var version=util.getArg(sourceMap,'version');
var sources=util.getArg(sourceMap,'sources');


var names=util.getArg(sourceMap,'names',[]);
var sourceRoot=util.getArg(sourceMap,'sourceRoot',null);
var sourcesContent=util.getArg(sourceMap,'sourcesContent',null);
var mappings=util.getArg(sourceMap,'mappings');
var file=util.getArg(sourceMap,'file',null);



if(version!=this._version){
throw new Error('Unsupported version: '+version);}






this._names=ArraySet.fromArray(names,true);
this._sources=ArraySet.fromArray(sources,true);

this.sourceRoot=sourceRoot;
this.sourcesContent=sourcesContent;
this._mappings=mappings;
this.file=file;}









SourceMapConsumer.fromSourceMap=
function SourceMapConsumer_fromSourceMap(aSourceMap){
var smc=Object.create(SourceMapConsumer.prototype);

smc._names=ArraySet.fromArray(aSourceMap._names.toArray(),true);
smc._sources=ArraySet.fromArray(aSourceMap._sources.toArray(),true);
smc.sourceRoot=aSourceMap._sourceRoot;
smc.sourcesContent=aSourceMap._generateSourcesContent(smc._sources.toArray(),
smc.sourceRoot);
smc.file=aSourceMap._file;

smc.__generatedMappings=aSourceMap._mappings.slice().
sort(util.compareByGeneratedPositions);
smc.__originalMappings=aSourceMap._mappings.slice().
sort(util.compareByOriginalPositions);

return smc;};





SourceMapConsumer.prototype._version=3;




Object.defineProperty(SourceMapConsumer.prototype,'sources',{
get:function get(){
return this._sources.toArray().map(function(s){
return this.sourceRoot?util.join(this.sourceRoot,s):s;},
this);}});

































SourceMapConsumer.prototype.__generatedMappings=null;
Object.defineProperty(SourceMapConsumer.prototype,'_generatedMappings',{
get:function get(){
if(!this.__generatedMappings){
this.__generatedMappings=[];
this.__originalMappings=[];
this._parseMappings(this._mappings,this.sourceRoot);}


return this.__generatedMappings;}});



SourceMapConsumer.prototype.__originalMappings=null;
Object.defineProperty(SourceMapConsumer.prototype,'_originalMappings',{
get:function get(){
if(!this.__originalMappings){
this.__generatedMappings=[];
this.__originalMappings=[];
this._parseMappings(this._mappings,this.sourceRoot);}


return this.__originalMappings;}});








SourceMapConsumer.prototype._parseMappings=
function SourceMapConsumer_parseMappings(aStr,aSourceRoot){
var generatedLine=1;
var previousGeneratedColumn=0;
var previousOriginalLine=0;
var previousOriginalColumn=0;
var previousSource=0;
var previousName=0;
var mappingSeparator=/^[,;]/;
var str=aStr;
var mapping;
var temp;

while(str.length>0){
if(str.charAt(0)===';'){
generatedLine++;
str=str.slice(1);
previousGeneratedColumn=0;}else 

if(str.charAt(0)===','){
str=str.slice(1);}else 

{
mapping={};
mapping.generatedLine=generatedLine;


temp=base64VLQ.decode(str);
mapping.generatedColumn=previousGeneratedColumn+temp.value;
previousGeneratedColumn=mapping.generatedColumn;
str=temp.rest;

if(str.length>0&&!mappingSeparator.test(str.charAt(0))){

temp=base64VLQ.decode(str);
mapping.source=this._sources.at(previousSource+temp.value);
previousSource+=temp.value;
str=temp.rest;
if(str.length===0||mappingSeparator.test(str.charAt(0))){
throw new Error('Found a source, but no line and column');}



temp=base64VLQ.decode(str);
mapping.originalLine=previousOriginalLine+temp.value;
previousOriginalLine=mapping.originalLine;

mapping.originalLine+=1;
str=temp.rest;
if(str.length===0||mappingSeparator.test(str.charAt(0))){
throw new Error('Found a source and line, but no column');}



temp=base64VLQ.decode(str);
mapping.originalColumn=previousOriginalColumn+temp.value;
previousOriginalColumn=mapping.originalColumn;
str=temp.rest;

if(str.length>0&&!mappingSeparator.test(str.charAt(0))){

temp=base64VLQ.decode(str);
mapping.name=this._names.at(previousName+temp.value);
previousName+=temp.value;
str=temp.rest;}}



this.__generatedMappings.push(mapping);
if(typeof mapping.originalLine==='number'){
this.__originalMappings.push(mapping);}}}




this.__originalMappings.sort(util.compareByOriginalPositions);};






SourceMapConsumer.prototype._findMapping=
function SourceMapConsumer_findMapping(aNeedle,aMappings,aLineName,
aColumnName,aComparator){





if(aNeedle[aLineName]<=0){
throw new TypeError('Line must be greater than or equal to 1, got '+
aNeedle[aLineName]);}

if(aNeedle[aColumnName]<0){
throw new TypeError('Column must be greater than or equal to 0, got '+
aNeedle[aColumnName]);}


return binarySearch.search(aNeedle,aMappings,aComparator);};

















SourceMapConsumer.prototype.originalPositionFor=
function SourceMapConsumer_originalPositionFor(aArgs){
var needle={
generatedLine:util.getArg(aArgs,'line'),
generatedColumn:util.getArg(aArgs,'column')};


var mapping=this._findMapping(needle,
this._generatedMappings,
"generatedLine",
"generatedColumn",
util.compareByGeneratedPositions);

if(mapping){
var source=util.getArg(mapping,'source',null);
if(source&&this.sourceRoot){
source=util.join(this.sourceRoot,source);}

return {
source:source,
line:util.getArg(mapping,'originalLine',null),
column:util.getArg(mapping,'originalColumn',null),
name:util.getArg(mapping,'name',null)};}



return {
source:null,
line:null,
column:null,
name:null};};








SourceMapConsumer.prototype.sourceContentFor=
function SourceMapConsumer_sourceContentFor(aSource){
if(!this.sourcesContent){
return null;}


if(this.sourceRoot){
aSource=util.relative(this.sourceRoot,aSource);}


if(this._sources.has(aSource)){
return this.sourcesContent[this._sources.indexOf(aSource)];}


var url;
if(this.sourceRoot&&(
url=util.urlParse(this.sourceRoot))){




var fileUriAbsPath=aSource.replace(/^file:\/\//,"");
if(url.scheme=="file"&&
this._sources.has(fileUriAbsPath)){
return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];}


if((!url.path||url.path=="/")&&
this._sources.has("/"+aSource)){
return this.sourcesContent[this._sources.indexOf("/"+aSource)];}}



throw new Error('"'+aSource+'" is not in the SourceMap.');};
















SourceMapConsumer.prototype.generatedPositionFor=
function SourceMapConsumer_generatedPositionFor(aArgs){
var needle={
source:util.getArg(aArgs,'source'),
originalLine:util.getArg(aArgs,'line'),
originalColumn:util.getArg(aArgs,'column')};


if(this.sourceRoot){
needle.source=util.relative(this.sourceRoot,needle.source);}


var mapping=this._findMapping(needle,
this._originalMappings,
"originalLine",
"originalColumn",
util.compareByOriginalPositions);

if(mapping){
return {
line:util.getArg(mapping,'generatedLine',null),
column:util.getArg(mapping,'generatedColumn',null)};}



return {
line:null,
column:null};};



SourceMapConsumer.GENERATED_ORDER=1;
SourceMapConsumer.ORIGINAL_ORDER=2;

















SourceMapConsumer.prototype.eachMapping=
function SourceMapConsumer_eachMapping(aCallback,aContext,aOrder){
var context=aContext||null;
var order=aOrder||SourceMapConsumer.GENERATED_ORDER;

var mappings;
switch(order){
case SourceMapConsumer.GENERATED_ORDER:
mappings=this._generatedMappings;
break;
case SourceMapConsumer.ORIGINAL_ORDER:
mappings=this._originalMappings;
break;
default:
throw new Error("Unknown order of iteration.");}


var sourceRoot=this.sourceRoot;
mappings.map(function(mapping){
var source=mapping.source;
if(source&&sourceRoot){
source=util.join(sourceRoot,source);}

return {
source:source,
generatedLine:mapping.generatedLine,
generatedColumn:mapping.generatedColumn,
originalLine:mapping.originalLine,
originalColumn:mapping.originalColumn,
name:mapping.name};}).

forEach(aCallback,context);};


exports.SourceMapConsumer=SourceMapConsumer;});








define('source-map/binary-search',['require','exports','module'],function(require,exports,module){










function recursiveSearch(aLow,aHigh,aNeedle,aHaystack,aCompare){










var mid=Math.floor((aHigh-aLow)/2)+aLow;
var cmp=aCompare(aNeedle,aHaystack[mid],true);
if(cmp===0){

return aHaystack[mid];}else 

if(cmp>0){

if(aHigh-mid>1){

return recursiveSearch(mid,aHigh,aNeedle,aHaystack,aCompare);}



return aHaystack[mid];}else 

{

if(mid-aLow>1){

return recursiveSearch(aLow,mid,aNeedle,aHaystack,aCompare);}



return aLow<0?
null:
aHaystack[aLow];}}
















exports.search=function search(aNeedle,aHaystack,aCompare){
return aHaystack.length>0?
recursiveSearch(-1,aHaystack.length,aNeedle,aHaystack,aCompare):
null;};});









define('source-map/source-node',['require','exports','module','source-map/source-map-generator','source-map/util'],function(require,exports,module){

var SourceMapGenerator=require('./source-map-generator').SourceMapGenerator;
var util=require('./util');













function SourceNode(aLine,aColumn,aSource,aChunks,aName){
this.children=[];
this.sourceContents={};
this.line=aLine===undefined?null:aLine;
this.column=aColumn===undefined?null:aColumn;
this.source=aSource===undefined?null:aSource;
this.name=aName===undefined?null:aName;
if(aChunks!=null)this.add(aChunks);}








SourceNode.fromStringWithSourceMap=
function SourceNode_fromStringWithSourceMap(aGeneratedCode,aSourceMapConsumer){


var node=new SourceNode();



var remainingLines=aGeneratedCode.split('\n');


var lastGeneratedLine=1,lastGeneratedColumn=0;




var lastMapping=null;

aSourceMapConsumer.eachMapping(function(mapping){
if(lastMapping===null){



while(lastGeneratedLine<mapping.generatedLine){
node.add(remainingLines.shift()+"\n");
lastGeneratedLine++;}

if(lastGeneratedColumn<mapping.generatedColumn){
var nextLine=remainingLines[0];
node.add(nextLine.substr(0,mapping.generatedColumn));
remainingLines[0]=nextLine.substr(mapping.generatedColumn);
lastGeneratedColumn=mapping.generatedColumn;}}else 

{


if(lastGeneratedLine<mapping.generatedLine){
var code="";

do {
code+=remainingLines.shift()+"\n";
lastGeneratedLine++;
lastGeneratedColumn=0;}while(
lastGeneratedLine<mapping.generatedLine);


if(lastGeneratedColumn<mapping.generatedColumn){
var nextLine=remainingLines[0];
code+=nextLine.substr(0,mapping.generatedColumn);
remainingLines[0]=nextLine.substr(mapping.generatedColumn);
lastGeneratedColumn=mapping.generatedColumn;}


addMappingWithCode(lastMapping,code);}else 
{



var nextLine=remainingLines[0];
var code=nextLine.substr(0,mapping.generatedColumn-
lastGeneratedColumn);
remainingLines[0]=nextLine.substr(mapping.generatedColumn-
lastGeneratedColumn);
lastGeneratedColumn=mapping.generatedColumn;
addMappingWithCode(lastMapping,code);}}


lastMapping=mapping;},
this);



addMappingWithCode(lastMapping,remainingLines.join("\n"));


aSourceMapConsumer.sources.forEach(function(sourceFile){
var content=aSourceMapConsumer.sourceContentFor(sourceFile);
if(content){
node.setSourceContent(sourceFile,content);}});



return node;

function addMappingWithCode(mapping,code){
if(mapping===null||mapping.source===undefined){
node.add(code);}else 
{
node.add(new SourceNode(mapping.originalLine,
mapping.originalColumn,
mapping.source,
code,
mapping.name));}}};










SourceNode.prototype.add=function SourceNode_add(aChunk){
if(Array.isArray(aChunk)){
aChunk.forEach(function(chunk){
this.add(chunk);},
this);}else 

if(aChunk instanceof SourceNode||typeof aChunk==="string"){
if(aChunk){
this.children.push(aChunk);}}else 


{
throw new TypeError(
"Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+aChunk);}


return this;};








SourceNode.prototype.prepend=function SourceNode_prepend(aChunk){
if(Array.isArray(aChunk)){
for(var i=aChunk.length-1;i>=0;i--){
this.prepend(aChunk[i]);}}else 


if(aChunk instanceof SourceNode||typeof aChunk==="string"){
this.children.unshift(aChunk);}else 

{
throw new TypeError(
"Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+aChunk);}


return this;};









SourceNode.prototype.walk=function SourceNode_walk(aFn){
var chunk;
for(var i=0,len=this.children.length;i<len;i++){
chunk=this.children[i];
if(chunk instanceof SourceNode){
chunk.walk(aFn);}else 

{
if(chunk!==''){
aFn(chunk,{source:this.source,
line:this.line,
column:this.column,
name:this.name});}}}};











SourceNode.prototype.join=function SourceNode_join(aSep){
var newChildren;
var i;
var len=this.children.length;
if(len>0){
newChildren=[];
for(i=0;i<len-1;i++){
newChildren.push(this.children[i]);
newChildren.push(aSep);}

newChildren.push(this.children[i]);
this.children=newChildren;}

return this;};









SourceNode.prototype.replaceRight=function SourceNode_replaceRight(aPattern,aReplacement){
var lastChild=this.children[this.children.length-1];
if(lastChild instanceof SourceNode){
lastChild.replaceRight(aPattern,aReplacement);}else 

if(typeof lastChild==='string'){
this.children[this.children.length-1]=lastChild.replace(aPattern,aReplacement);}else 

{
this.children.push(''.replace(aPattern,aReplacement));}

return this;};









SourceNode.prototype.setSourceContent=
function SourceNode_setSourceContent(aSourceFile,aSourceContent){
this.sourceContents[util.toSetString(aSourceFile)]=aSourceContent;};








SourceNode.prototype.walkSourceContents=
function SourceNode_walkSourceContents(aFn){
for(var i=0,len=this.children.length;i<len;i++){
if(this.children[i] instanceof SourceNode){
this.children[i].walkSourceContents(aFn);}}



var sources=Object.keys(this.sourceContents);
for(var i=0,len=sources.length;i<len;i++){
aFn(util.fromSetString(sources[i]),this.sourceContents[sources[i]]);}};







SourceNode.prototype.toString=function SourceNode_toString(){
var str="";
this.walk(function(chunk){
str+=chunk;});

return str;};






SourceNode.prototype.toStringWithSourceMap=function SourceNode_toStringWithSourceMap(aArgs){
var generated={
code:"",
line:1,
column:0};

var map=new SourceMapGenerator(aArgs);
var sourceMappingActive=false;
var lastOriginalSource=null;
var lastOriginalLine=null;
var lastOriginalColumn=null;
var lastOriginalName=null;
this.walk(function(chunk,original){
generated.code+=chunk;
if(original.source!==null&&
original.line!==null&&
original.column!==null){
if(lastOriginalSource!==original.source||
lastOriginalLine!==original.line||
lastOriginalColumn!==original.column||
lastOriginalName!==original.name){
map.addMapping({
source:original.source,
original:{
line:original.line,
column:original.column},

generated:{
line:generated.line,
column:generated.column},

name:original.name});}


lastOriginalSource=original.source;
lastOriginalLine=original.line;
lastOriginalColumn=original.column;
lastOriginalName=original.name;
sourceMappingActive=true;}else 
if(sourceMappingActive){
map.addMapping({
generated:{
line:generated.line,
column:generated.column}});


lastOriginalSource=null;
sourceMappingActive=false;}

chunk.split('').forEach(function(ch){
if(ch==='\n'){
generated.line++;
generated.column=0;}else 
{
generated.column++;}});});



this.walkSourceContents(function(sourceFile,sourceContent){
map.setSourceContent(sourceFile,sourceContent);});


return {code:generated.code,map:map};};


exports.SourceNode=SourceNode;});





this.sourceMap={
SourceMapConsumer:require('source-map/source-map-consumer').SourceMapConsumer,
SourceMapGenerator:require('source-map/source-map-generator').SourceMapGenerator,
SourceNode:require('source-map/source-node').SourceNode};}
});
__d(220 /* react-native/Libraries/JavaScriptAppEngine/Initialization/source-map-url.js */, function(global, require, module, exports) {(














function(){
var define=null;




void function(root,factory){
if(typeof define==="function"&&define.amd){
define(factory);}else 
if(typeof exports==="object"){
module.exports=factory();}else 
{
root.sourceMappingURL=factory();}}(

this,function(){

var innerRegex=/[#@] source(?:Mapping)?URL=([^\s'"]*)/;

var regex=RegExp(
"(?:"+
"/\\*"+
"(?:\\s*\r?\n(?://)?)?"+
"(?:"+innerRegex.source+")"+
"\\s*"+
"\\*/"+
"|"+
"//(?:"+innerRegex.source+")"+
")"+
"\\s*$");


return {

regex:regex,
_innerRegex:innerRegex,

getFrom:function getFrom(code){
var match=code.match(regex);
return match?match[1]||match[2]||"":null;},


existsIn:function existsIn(code){
return regex.test(code);},


removeFrom:function removeFrom(code){
return code.replace(regex,"");},


insertBefore:function insertBefore(code,string){
var match=code.match(regex);
if(match){
return code.slice(0,match.index)+string+code.slice(match.index);}else 
{
return code+string;}}};});})();
});
__d(28 /* React */, function(global, require, module, exports) {'use strict';












var ReactIsomorphic=require(29 /* ReactIsomorphic */);
var ReactNativeImpl=require(50 /* ReactNativeImpl */);
var warning=require(232 /* fbjs/lib/warning */);

var React=babelHelpers.extends({},ReactIsomorphic);

var dedupe={};var _loop=function _loop(

key){
React[key]=ReactNativeImpl[key];
if(__DEV__){
Object.defineProperty(React,key,{
get:function get(){
warning(
dedupe[key],
'React.'+key+' is deprecated. Use ReactNative.'+key+
' from the "react-native" package instead.');

dedupe[key]=true;
return ReactNativeImpl[key];},

set:function set(value){

ReactNativeImpl[key]=value;}});}};for(var key in ReactNativeImpl){_loop(key);}





module.exports=React;
});
__d(29 /* ReactIsomorphic */, function(global, require, module, exports) {'use strict';












var ReactChildren=require(30 /* ./ReactChildren */);
var ReactComponent=require(40 /* ./ReactComponent */);
var ReactClass=require(42 /* ./ReactClass */);
var ReactDOMFactories=require(45 /* ./ReactDOMFactories */);
var ReactElement=require(32 /* ./ReactElement */);
var ReactElementValidator=require(46 /* ./ReactElementValidator */);
var ReactPropTypes=require(47 /* ./ReactPropTypes */);
var ReactVersion=require(48 /* ./ReactVersion */);

var assign=require(34 /* ./Object.assign */);
var onlyChild=require(49 /* ./onlyChild */);

var createElement=ReactElement.createElement;
var createFactory=ReactElement.createFactory;
var cloneElement=ReactElement.cloneElement;

if(process.env.NODE_ENV!=='production'){
createElement=ReactElementValidator.createElement;
createFactory=ReactElementValidator.createFactory;
cloneElement=ReactElementValidator.cloneElement;}


var React={



Children:{
map:ReactChildren.map,
forEach:ReactChildren.forEach,
count:ReactChildren.count,
toArray:ReactChildren.toArray,
only:onlyChild},


Component:ReactComponent,

createElement:createElement,
cloneElement:cloneElement,
isValidElement:ReactElement.isValidElement,



PropTypes:ReactPropTypes,
createClass:ReactClass.createClass,
createFactory:createFactory,
createMixin:function createMixin(mixin){

return mixin;},




DOM:ReactDOMFactories,

version:ReactVersion,


__spread:assign};


module.exports=React;
});
__d(30 /* ReactChildren */, function(global, require, module, exports) {'use strict';












var PooledClass=require(31 /* ./PooledClass */);
var ReactElement=require(32 /* ./ReactElement */);

var emptyFunction=require(233 /* fbjs/lib/emptyFunction */);
var traverseAllChildren=require(36 /* ./traverseAllChildren */);

var twoArgumentPooler=PooledClass.twoArgumentPooler;
var fourArgumentPooler=PooledClass.fourArgumentPooler;

var userProvidedKeyEscapeRegex=/\/(?!\/)/g;
function escapeUserProvidedKey(text){
return (''+text).replace(userProvidedKeyEscapeRegex,'//');}










function ForEachBookKeeping(forEachFunction,forEachContext){
this.func=forEachFunction;
this.context=forEachContext;
this.count=0;}

ForEachBookKeeping.prototype.destructor=function(){
this.func=null;
this.context=null;
this.count=0;};

PooledClass.addPoolingTo(ForEachBookKeeping,twoArgumentPooler);

function forEachSingleChild(bookKeeping,child,name){
var func=bookKeeping.func;
var context=bookKeeping.context;

func.call(context,child,bookKeeping.count++);}












function forEachChildren(children,forEachFunc,forEachContext){
if(children==null){
return children;}

var traverseContext=ForEachBookKeeping.getPooled(forEachFunc,forEachContext);
traverseAllChildren(children,forEachSingleChild,traverseContext);
ForEachBookKeeping.release(traverseContext);}











function MapBookKeeping(mapResult,keyPrefix,mapFunction,mapContext){
this.result=mapResult;
this.keyPrefix=keyPrefix;
this.func=mapFunction;
this.context=mapContext;
this.count=0;}

MapBookKeeping.prototype.destructor=function(){
this.result=null;
this.keyPrefix=null;
this.func=null;
this.context=null;
this.count=0;};

PooledClass.addPoolingTo(MapBookKeeping,fourArgumentPooler);

function mapSingleChildIntoContext(bookKeeping,child,childKey){
var result=bookKeeping.result;
var keyPrefix=bookKeeping.keyPrefix;
var func=bookKeeping.func;
var context=bookKeeping.context;

var mappedChild=func.call(context,child,bookKeeping.count++);
if(Array.isArray(mappedChild)){
mapIntoWithKeyPrefixInternal(mappedChild,result,childKey,emptyFunction.thatReturnsArgument);}else 
if(mappedChild!=null){
if(ReactElement.isValidElement(mappedChild)){
mappedChild=ReactElement.cloneAndReplaceKey(mappedChild,


keyPrefix+(mappedChild!==child?escapeUserProvidedKey(mappedChild.key||'')+'/':'')+childKey);}

result.push(mappedChild);}}



function mapIntoWithKeyPrefixInternal(children,array,prefix,func,context){
var escapedPrefix='';
if(prefix!=null){
escapedPrefix=escapeUserProvidedKey(prefix)+'/';}

var traverseContext=MapBookKeeping.getPooled(array,escapedPrefix,func,context);
traverseAllChildren(children,mapSingleChildIntoContext,traverseContext);
MapBookKeeping.release(traverseContext);}













function mapChildren(children,func,context){
if(children==null){
return children;}

var result=[];
mapIntoWithKeyPrefixInternal(children,result,null,func,context);
return result;}


function forEachSingleChildDummy(traverseContext,child,name){
return null;}









function countChildren(children,context){
return traverseAllChildren(children,forEachSingleChildDummy,null);}






function toArray(children){
var result=[];
mapIntoWithKeyPrefixInternal(children,result,null,emptyFunction.thatReturnsArgument);
return result;}


var ReactChildren={
forEach:forEachChildren,
map:mapChildren,
mapIntoWithKeyPrefixInternal:mapIntoWithKeyPrefixInternal,
count:countChildren,
toArray:toArray};


module.exports=ReactChildren;
});
__d(31 /* PooledClass */, function(global, require, module, exports) {'use strict';












var invariant=require(242 /* fbjs/lib/invariant */);








var oneArgumentPooler=function oneArgumentPooler(copyFieldsFrom){
var Klass=this;
if(Klass.instancePool.length){
var instance=Klass.instancePool.pop();
Klass.call(instance,copyFieldsFrom);
return instance;}else 
{
return new Klass(copyFieldsFrom);}};



var twoArgumentPooler=function twoArgumentPooler(a1,a2){
var Klass=this;
if(Klass.instancePool.length){
var instance=Klass.instancePool.pop();
Klass.call(instance,a1,a2);
return instance;}else 
{
return new Klass(a1,a2);}};



var threeArgumentPooler=function threeArgumentPooler(a1,a2,a3){
var Klass=this;
if(Klass.instancePool.length){
var instance=Klass.instancePool.pop();
Klass.call(instance,a1,a2,a3);
return instance;}else 
{
return new Klass(a1,a2,a3);}};



var fourArgumentPooler=function fourArgumentPooler(a1,a2,a3,a4){
var Klass=this;
if(Klass.instancePool.length){
var instance=Klass.instancePool.pop();
Klass.call(instance,a1,a2,a3,a4);
return instance;}else 
{
return new Klass(a1,a2,a3,a4);}};



var fiveArgumentPooler=function fiveArgumentPooler(a1,a2,a3,a4,a5){
var Klass=this;
if(Klass.instancePool.length){
var instance=Klass.instancePool.pop();
Klass.call(instance,a1,a2,a3,a4,a5);
return instance;}else 
{
return new Klass(a1,a2,a3,a4,a5);}};



var standardReleaser=function standardReleaser(instance){
var Klass=this;
!(instance instanceof Klass)?process.env.NODE_ENV!=='production'?invariant(false,'Trying to release an instance into a pool of a different type.'):invariant(false):undefined;
instance.destructor();
if(Klass.instancePool.length<Klass.poolSize){
Klass.instancePool.push(instance);}};



var DEFAULT_POOL_SIZE=10;
var DEFAULT_POOLER=oneArgumentPooler;










var addPoolingTo=function addPoolingTo(CopyConstructor,pooler){
var NewKlass=CopyConstructor;
NewKlass.instancePool=[];
NewKlass.getPooled=pooler||DEFAULT_POOLER;
if(!NewKlass.poolSize){
NewKlass.poolSize=DEFAULT_POOL_SIZE;}

NewKlass.release=standardReleaser;
return NewKlass;};


var PooledClass={
addPoolingTo:addPoolingTo,
oneArgumentPooler:oneArgumentPooler,
twoArgumentPooler:twoArgumentPooler,
threeArgumentPooler:threeArgumentPooler,
fourArgumentPooler:fourArgumentPooler,
fiveArgumentPooler:fiveArgumentPooler};


module.exports=PooledClass;
});
__d(242 /* fbjs/lib/invariant.js */, function(global, require, module, exports) {'use strict';























function invariant(condition,format,a,b,c,d,e,f){
if(process.env.NODE_ENV!=='production'){
if(format===undefined){
throw new Error('invariant requires an error message argument');}}



if(!condition){
var error;
if(format===undefined){
error=new Error('Minified exception occurred; use the non-minified dev environment '+'for the full error message and additional helpful warnings.');}else 
{
var args=[a,b,c,d,e,f];
var argIndex=0;
error=new Error(format.replace(/%s/g,function(){
return args[argIndex++];}));

error.name='Invariant Violation';}


error.framesToPop=1;
throw error;}}



module.exports=invariant;
});
__d(32 /* ReactElement */, function(global, require, module, exports) {'use strict';












var ReactCurrentOwner=require(33 /* ./ReactCurrentOwner */);

var assign=require(34 /* ./Object.assign */);
var canDefineProperty=require(35 /* ./canDefineProperty */);



var REACT_ELEMENT_TYPE=typeof Symbol==='function'&&Symbol['for']&&Symbol['for']('react.element')||0xeac7;

var RESERVED_PROPS={
key:true,
ref:true,
__self:true,
__source:true};




















var ReactElement=function ReactElement(type,key,ref,self,source,owner,props){
var element={

$$typeof:REACT_ELEMENT_TYPE,


type:type,
key:key,
ref:ref,
props:props,


_owner:owner};


if(process.env.NODE_ENV!=='production'){




element._store={};





if(canDefineProperty){
Object.defineProperty(element._store,'validated',{
configurable:false,
enumerable:false,
writable:true,
value:false});


Object.defineProperty(element,'_self',{
configurable:false,
enumerable:false,
writable:false,
value:self});



Object.defineProperty(element,'_source',{
configurable:false,
enumerable:false,
writable:false,
value:source});}else 

{
element._store.validated=false;
element._self=self;
element._source=source;}

Object.freeze(element.props);
Object.freeze(element);}


return element;};


ReactElement.createElement=function(type,config,children){
var propName;


var props={};

var key=null;
var ref=null;
var self=null;
var source=null;

if(config!=null){
ref=config.ref===undefined?null:config.ref;
key=config.key===undefined?null:''+config.key;
self=config.__self===undefined?null:config.__self;
source=config.__source===undefined?null:config.__source;

for(propName in config){
if(config.hasOwnProperty(propName)&&!RESERVED_PROPS.hasOwnProperty(propName)){
props[propName]=config[propName];}}}






var childrenLength=arguments.length-2;
if(childrenLength===1){
props.children=children;}else 
if(childrenLength>1){
var childArray=Array(childrenLength);
for(var i=0;i<childrenLength;i++){
childArray[i]=arguments[i+2];}

props.children=childArray;}



if(type&&type.defaultProps){
var defaultProps=type.defaultProps;
for(propName in defaultProps){
if(typeof props[propName]==='undefined'){
props[propName]=defaultProps[propName];}}}




return ReactElement(type,key,ref,self,source,ReactCurrentOwner.current,props);};


ReactElement.createFactory=function(type){
var factory=ReactElement.createElement.bind(null,type);





factory.type=type;
return factory;};


ReactElement.cloneAndReplaceKey=function(oldElement,newKey){
var newElement=ReactElement(oldElement.type,newKey,oldElement.ref,oldElement._self,oldElement._source,oldElement._owner,oldElement.props);

return newElement;};


ReactElement.cloneAndReplaceProps=function(oldElement,newProps){
var newElement=ReactElement(oldElement.type,oldElement.key,oldElement.ref,oldElement._self,oldElement._source,oldElement._owner,newProps);

if(process.env.NODE_ENV!=='production'){

newElement._store.validated=oldElement._store.validated;}


return newElement;};


ReactElement.cloneElement=function(element,config,children){
var propName;


var props=assign({},element.props);


var key=element.key;
var ref=element.ref;

var self=element._self;



var source=element._source;


var owner=element._owner;

if(config!=null){
if(config.ref!==undefined){

ref=config.ref;
owner=ReactCurrentOwner.current;}

if(config.key!==undefined){
key=''+config.key;}


for(propName in config){
if(config.hasOwnProperty(propName)&&!RESERVED_PROPS.hasOwnProperty(propName)){
props[propName]=config[propName];}}}






var childrenLength=arguments.length-2;
if(childrenLength===1){
props.children=children;}else 
if(childrenLength>1){
var childArray=Array(childrenLength);
for(var i=0;i<childrenLength;i++){
childArray[i]=arguments[i+2];}

props.children=childArray;}


return ReactElement(element.type,key,ref,self,source,owner,props);};







ReactElement.isValidElement=function(object){
return typeof object==='object'&&object!==null&&object.$$typeof===REACT_ELEMENT_TYPE;};


module.exports=ReactElement;
});
__d(33 /* ReactCurrentOwner */, function(global, require, module, exports) {'use strict';


















var ReactCurrentOwner={





current:null};



module.exports=ReactCurrentOwner;
});
__d(34 /* Object.assign */, function(global, require, module, exports) {'use strict';














function assign(target,sources){
if(target==null){
throw new TypeError('Object.assign target cannot be null or undefined');}


var to=Object(target);
var hasOwnProperty=Object.prototype.hasOwnProperty;

for(var nextIndex=1;nextIndex<arguments.length;nextIndex++){
var nextSource=arguments[nextIndex];
if(nextSource==null){
continue;}


var from=Object(nextSource);






for(var key in from){
if(hasOwnProperty.call(from,key)){
to[key]=from[key];}}}




return to;}


module.exports=assign;
});
__d(35 /* canDefineProperty */, function(global, require, module, exports) {'use strict';












var canDefineProperty=false;
if(process.env.NODE_ENV!=='production'){
try{
Object.defineProperty({},'x',{get:function get(){}});
canDefineProperty=true;}
catch(x){}}




module.exports=canDefineProperty;
});
__d(233 /* fbjs/lib/emptyFunction.js */, function(global, require, module, exports) {"use strict";












function makeEmptyFunction(arg){
return function(){
return arg;};}








function emptyFunction(){}

emptyFunction.thatReturns=makeEmptyFunction;
emptyFunction.thatReturnsFalse=makeEmptyFunction(false);
emptyFunction.thatReturnsTrue=makeEmptyFunction(true);
emptyFunction.thatReturnsNull=makeEmptyFunction(null);
emptyFunction.thatReturnsThis=function(){
return this;};

emptyFunction.thatReturnsArgument=function(arg){
return arg;};


module.exports=emptyFunction;
});
__d(36 /* traverseAllChildren */, function(global, require, module, exports) {'use strict';












var ReactCurrentOwner=require(33 /* ./ReactCurrentOwner */);
var ReactElement=require(32 /* ./ReactElement */);
var ReactInstanceHandles=require(37 /* ./ReactInstanceHandles */);

var getIteratorFn=require(39 /* ./getIteratorFn */);
var invariant=require(242 /* fbjs/lib/invariant */);
var warning=require(240 /* fbjs/lib/warning */);

var SEPARATOR=ReactInstanceHandles.SEPARATOR;
var SUBSEPARATOR=':';






var userProvidedKeyEscaperLookup={
'=':'=0',
'.':'=1',
':':'=2'};


var userProvidedKeyEscapeRegex=/[=.:]/g;

var didWarnAboutMaps=false;

function userProvidedKeyEscaper(match){
return userProvidedKeyEscaperLookup[match];}









function getComponentKey(component,index){
if(component&&component.key!=null){

return wrapUserProvidedKey(component.key);}


return index.toString(36);}








function escapeUserProvidedKey(text){
return (''+text).replace(userProvidedKeyEscapeRegex,userProvidedKeyEscaper);}









function wrapUserProvidedKey(key){
return '$'+escapeUserProvidedKey(key);}










function traverseAllChildrenImpl(children,nameSoFar,callback,traverseContext){
var type=typeof children;

if(type==='undefined'||type==='boolean'){

children=null;}


if(children===null||type==='string'||type==='number'||ReactElement.isValidElement(children)){
callback(traverseContext,children,


nameSoFar===''?SEPARATOR+getComponentKey(children,0):nameSoFar);
return 1;}


var child;
var nextName;
var subtreeCount=0;
var nextNamePrefix=nameSoFar===''?SEPARATOR:nameSoFar+SUBSEPARATOR;

if(Array.isArray(children)){
for(var i=0;i<children.length;i++){
child=children[i];
nextName=nextNamePrefix+getComponentKey(child,i);
subtreeCount+=traverseAllChildrenImpl(child,nextName,callback,traverseContext);}}else 

{
var iteratorFn=getIteratorFn(children);
if(iteratorFn){
var iterator=iteratorFn.call(children);
var step;
if(iteratorFn!==children.entries){
var ii=0;
while(!(step=iterator.next()).done){
child=step.value;
nextName=nextNamePrefix+getComponentKey(child,ii++);
subtreeCount+=traverseAllChildrenImpl(child,nextName,callback,traverseContext);}}else 

{
if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(didWarnAboutMaps,'Using Maps as children is not yet fully supported. It is an '+'experimental feature that might be removed. Convert it to a '+'sequence / iterable of keyed ReactElements instead.'):undefined;
didWarnAboutMaps=true;}


while(!(step=iterator.next()).done){
var entry=step.value;
if(entry){
child=entry[1];
nextName=nextNamePrefix+wrapUserProvidedKey(entry[0])+SUBSEPARATOR+getComponentKey(child,0);
subtreeCount+=traverseAllChildrenImpl(child,nextName,callback,traverseContext);}}}}else 



if(type==='object'){
var addendum='';
if(process.env.NODE_ENV!=='production'){
addendum=' If you meant to render a collection of children, use an array '+'instead or wrap the object using createFragment(object) from the '+'React add-ons.';
if(children._isReactElement){
addendum=' It looks like you\'re using an element created by a different '+'version of React. Make sure to use only one copy of React.';}

if(ReactCurrentOwner.current){
var name=ReactCurrentOwner.current.getName();
if(name){
addendum+=' Check the render method of `'+name+'`.';}}}



var childrenString=String(children);
!false?process.env.NODE_ENV!=='production'?invariant(false,'Objects are not valid as a React child (found: %s).%s',childrenString==='[object Object]'?'object with keys {'+Object.keys(children).join(', ')+'}':childrenString,addendum):invariant(false):undefined;}}



return subtreeCount;}


















function traverseAllChildren(children,callback,traverseContext){
if(children==null){
return 0;}


return traverseAllChildrenImpl(children,'',callback,traverseContext);}


module.exports=traverseAllChildren;
});
__d(37 /* ReactInstanceHandles */, function(global, require, module, exports) {'use strict';













var ReactRootIndex=require(38 /* ./ReactRootIndex */);

var invariant=require(242 /* fbjs/lib/invariant */);

var SEPARATOR='.';
var SEPARATOR_LENGTH=SEPARATOR.length;




var MAX_TREE_DEPTH=10000;








function getReactRootIDString(index){
return SEPARATOR+index.toString(36);}










function isBoundary(id,index){
return id.charAt(index)===SEPARATOR||index===id.length;}









function isValidID(id){
return id===''||id.charAt(0)===SEPARATOR&&id.charAt(id.length-1)!==SEPARATOR;}










function isAncestorIDOf(ancestorID,descendantID){
return descendantID.indexOf(ancestorID)===0&&isBoundary(descendantID,ancestorID.length);}









function getParentID(id){
return id?id.substr(0,id.lastIndexOf(SEPARATOR)):'';}











function getNextDescendantID(ancestorID,destinationID){
!(isValidID(ancestorID)&&isValidID(destinationID))?process.env.NODE_ENV!=='production'?invariant(false,'getNextDescendantID(%s, %s): Received an invalid React DOM ID.',ancestorID,destinationID):invariant(false):undefined;
!isAncestorIDOf(ancestorID,destinationID)?process.env.NODE_ENV!=='production'?invariant(false,'getNextDescendantID(...): React has made an invalid assumption about '+'the DOM hierarchy. Expected `%s` to be an ancestor of `%s`.',ancestorID,destinationID):invariant(false):undefined;
if(ancestorID===destinationID){
return ancestorID;}



var start=ancestorID.length+SEPARATOR_LENGTH;
var i;
for(i=start;i<destinationID.length;i++){
if(isBoundary(destinationID,i)){
break;}}


return destinationID.substr(0,i);}













function getFirstCommonAncestorID(oneID,twoID){
var minLength=Math.min(oneID.length,twoID.length);
if(minLength===0){
return '';}

var lastCommonMarkerIndex=0;

for(var i=0;i<=minLength;i++){
if(isBoundary(oneID,i)&&isBoundary(twoID,i)){
lastCommonMarkerIndex=i;}else 
if(oneID.charAt(i)!==twoID.charAt(i)){
break;}}


var longestCommonID=oneID.substr(0,lastCommonMarkerIndex);
!isValidID(longestCommonID)?process.env.NODE_ENV!=='production'?invariant(false,'getFirstCommonAncestorID(%s, %s): Expected a valid React DOM ID: %s',oneID,twoID,longestCommonID):invariant(false):undefined;
return longestCommonID;}















function traverseParentPath(start,stop,cb,arg,skipFirst,skipLast){
start=start||'';
stop=stop||'';
!(start!==stop)?process.env.NODE_ENV!=='production'?invariant(false,'traverseParentPath(...): Cannot traverse from and to the same ID, `%s`.',start):invariant(false):undefined;
var traverseUp=isAncestorIDOf(stop,start);
!(traverseUp||isAncestorIDOf(start,stop))?process.env.NODE_ENV!=='production'?invariant(false,'traverseParentPath(%s, %s, ...): Cannot traverse from two IDs that do '+'not have a parent path.',start,stop):invariant(false):undefined;

var depth=0;
var traverse=traverseUp?getParentID:getNextDescendantID;
for(var id=start;;id=traverse(id,stop)){
var ret;
if((!skipFirst||id!==start)&&(!skipLast||id!==stop)){
ret=cb(id,traverseUp,arg);}

if(ret===false||id===stop){

break;}

!(depth++<MAX_TREE_DEPTH)?process.env.NODE_ENV!=='production'?invariant(false,'traverseParentPath(%s, %s, ...): Detected an infinite loop while '+'traversing the React DOM ID tree. This may be due to malformed IDs: %s',start,stop,id):invariant(false):undefined;}}










var ReactInstanceHandles={





createReactRootID:function createReactRootID(){
return getReactRootIDString(ReactRootIndex.createReactRootIndex());},










createReactID:function createReactID(rootID,name){
return rootID+name;},










getReactRootIDFromNodeID:function getReactRootIDFromNodeID(id){
if(id&&id.charAt(0)===SEPARATOR&&id.length>1){
var index=id.indexOf(SEPARATOR,1);
return index>-1?id.substr(0,index):id;}

return null;},
















traverseEnterLeave:function traverseEnterLeave(leaveID,enterID,cb,upArg,downArg){
var ancestorID=getFirstCommonAncestorID(leaveID,enterID);
if(ancestorID!==leaveID){
traverseParentPath(leaveID,ancestorID,cb,upArg,false,true);}

if(ancestorID!==enterID){
traverseParentPath(ancestorID,enterID,cb,downArg,true,false);}},













traverseTwoPhase:function traverseTwoPhase(targetID,cb,arg){
if(targetID){
traverseParentPath('',targetID,cb,arg,true,false);
traverseParentPath(targetID,'',cb,arg,false,true);}},






traverseTwoPhaseSkipTarget:function traverseTwoPhaseSkipTarget(targetID,cb,arg){
if(targetID){
traverseParentPath('',targetID,cb,arg,true,true);
traverseParentPath(targetID,'',cb,arg,true,true);}},















traverseAncestors:function traverseAncestors(targetID,cb,arg){
traverseParentPath('',targetID,cb,arg,true,false);},


getFirstCommonAncestorID:getFirstCommonAncestorID,





_getNextDescendantID:getNextDescendantID,

isAncestorIDOf:isAncestorIDOf,

SEPARATOR:SEPARATOR};



module.exports=ReactInstanceHandles;
});
__d(38 /* ReactRootIndex */, function(global, require, module, exports) {'use strict';













var ReactRootIndexInjection={



injectCreateReactRootIndex:function injectCreateReactRootIndex(_createReactRootIndex){
ReactRootIndex.createReactRootIndex=_createReactRootIndex;}};



var ReactRootIndex={
createReactRootIndex:null,
injection:ReactRootIndexInjection};


module.exports=ReactRootIndex;
});
__d(39 /* getIteratorFn */, function(global, require, module, exports) {'use strict';














var ITERATOR_SYMBOL=typeof Symbol==='function'&&(typeof Symbol==='function'?Symbol.iterator:'@@iterator');
var FAUX_ITERATOR_SYMBOL='@@iterator';















function getIteratorFn(maybeIterable){
var iteratorFn=maybeIterable&&(ITERATOR_SYMBOL&&maybeIterable[ITERATOR_SYMBOL]||maybeIterable[FAUX_ITERATOR_SYMBOL]);
if(typeof iteratorFn==='function'){
return iteratorFn;}}



module.exports=getIteratorFn;
});
__d(240 /* fbjs/lib/warning.js */, function(global, require, module, exports) {'use strict';












var emptyFunction=require(233 /* ./emptyFunction */);








var warning=emptyFunction;

if(process.env.NODE_ENV!=='production'){
warning=function warning(condition,format){
for(var _len=arguments.length,args=Array(_len>2?_len-2:0),_key=2;_key<_len;_key++){
args[_key-2]=arguments[_key];}


if(format===undefined){
throw new Error('`warning(condition, format, ...args)` requires a warning '+'message argument');}


if(format.indexOf('Failed Composite propType: ')===0){
return;}


if(!condition){
var argIndex=0;
var message='Warning: '+format.replace(/%s/g,function(){
return args[argIndex++];});

if(typeof console!=='undefined'){
console.error(message);}

try{



throw new Error(message);}
catch(x){}}};}




module.exports=warning;
});
__d(40 /* ReactComponent */, function(global, require, module, exports) {'use strict';












var ReactNoopUpdateQueue=require(41 /* ./ReactNoopUpdateQueue */);

var canDefineProperty=require(35 /* ./canDefineProperty */);
var emptyObject=require(230 /* fbjs/lib/emptyObject */);
var invariant=require(242 /* fbjs/lib/invariant */);
var warning=require(240 /* fbjs/lib/warning */);




function ReactComponent(props,context,updater){
this.props=props;
this.context=context;
this.refs=emptyObject;


this.updater=updater||ReactNoopUpdateQueue;}


ReactComponent.prototype.isReactComponent={};


























ReactComponent.prototype.setState=function(partialState,callback){
!(typeof partialState==='object'||typeof partialState==='function'||partialState==null)?process.env.NODE_ENV!=='production'?invariant(false,'setState(...): takes an object of state variables to update or a '+'function which returns an object of state variables.'):invariant(false):undefined;
if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(partialState!=null,'setState(...): You passed an undefined or null state object; '+'instead, use forceUpdate().'):undefined;}

this.updater.enqueueSetState(this,partialState);
if(callback){
this.updater.enqueueCallback(this,callback);}};

















ReactComponent.prototype.forceUpdate=function(callback){
this.updater.enqueueForceUpdate(this);
if(callback){
this.updater.enqueueCallback(this,callback);}};








if(process.env.NODE_ENV!=='production'){
var deprecatedAPIs={
getDOMNode:['getDOMNode','Use ReactDOM.findDOMNode(component) instead.'],
isMounted:['isMounted','Instead, make sure to clean up subscriptions and pending requests in '+'componentWillUnmount to prevent memory leaks.'],
replaceProps:['replaceProps','Instead, call render again at the top level.'],
replaceState:['replaceState','Refactor your code to use setState instead (see '+'https://github.com/facebook/react/issues/3236).'],
setProps:['setProps','Instead, call render again at the top level.']};

var defineDeprecationWarning=function defineDeprecationWarning(methodName,info){
if(canDefineProperty){
Object.defineProperty(ReactComponent.prototype,methodName,{
get:function get(){
process.env.NODE_ENV!=='production'?warning(false,'%s(...) is deprecated in plain JavaScript React classes. %s',info[0],info[1]):undefined;
return undefined;}});}};




for(var fnName in deprecatedAPIs){
if(deprecatedAPIs.hasOwnProperty(fnName)){
defineDeprecationWarning(fnName,deprecatedAPIs[fnName]);}}}




module.exports=ReactComponent;
});
__d(41 /* ReactNoopUpdateQueue */, function(global, require, module, exports) {'use strict';












var warning=require(240 /* fbjs/lib/warning */);

function warnTDZ(publicInstance,callerName){
if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(false,'%s(...): Can only update a mounted or mounting component. '+'This usually means you called %s() on an unmounted component. '+'This is a no-op. Please check the code for the %s component.',callerName,callerName,publicInstance.constructor&&publicInstance.constructor.displayName||''):undefined;}}






var ReactNoopUpdateQueue={








isMounted:function isMounted(publicInstance){
return false;},










enqueueCallback:function enqueueCallback(publicInstance,callback){},














enqueueForceUpdate:function enqueueForceUpdate(publicInstance){
warnTDZ(publicInstance,'forceUpdate');},













enqueueReplaceState:function enqueueReplaceState(publicInstance,completeState){
warnTDZ(publicInstance,'replaceState');},












enqueueSetState:function enqueueSetState(publicInstance,partialState){
warnTDZ(publicInstance,'setState');},









enqueueSetProps:function enqueueSetProps(publicInstance,partialProps){
warnTDZ(publicInstance,'setProps');},









enqueueReplaceProps:function enqueueReplaceProps(publicInstance,props){
warnTDZ(publicInstance,'replaceProps');}};




module.exports=ReactNoopUpdateQueue;
});
__d(230 /* fbjs/lib/emptyObject.js */, function(global, require, module, exports) {'use strict';












var emptyObject={};

if(process.env.NODE_ENV!=='production'){
Object.freeze(emptyObject);}


module.exports=emptyObject;
});
__d(42 /* ReactClass */, function(global, require, module, exports) {'use strict';












var ReactComponent=require(40 /* ./ReactComponent */);
var ReactElement=require(32 /* ./ReactElement */);
var ReactPropTypeLocations=require(43 /* ./ReactPropTypeLocations */);
var ReactPropTypeLocationNames=require(44 /* ./ReactPropTypeLocationNames */);
var ReactNoopUpdateQueue=require(41 /* ./ReactNoopUpdateQueue */);

var assign=require(34 /* ./Object.assign */);
var emptyObject=require(230 /* fbjs/lib/emptyObject */);
var invariant=require(242 /* fbjs/lib/invariant */);
var keyMirror=require(237 /* fbjs/lib/keyMirror */);
var keyOf=require(236 /* fbjs/lib/keyOf */);
var warning=require(240 /* fbjs/lib/warning */);

var MIXINS_KEY=keyOf({mixins:null});




var SpecPolicy=keyMirror({



DEFINE_ONCE:null,




DEFINE_MANY:null,



OVERRIDE_BASE:null,





DEFINE_MANY_MERGED:null});


var injectedMixins=[];

var warnedSetProps=false;
function warnSetProps(){
if(!warnedSetProps){
warnedSetProps=true;
process.env.NODE_ENV!=='production'?warning(false,'setProps(...) and replaceProps(...) are deprecated. '+'Instead, call render again at the top level.'):undefined;}}

























var ReactClassInterface={







mixins:SpecPolicy.DEFINE_MANY,








statics:SpecPolicy.DEFINE_MANY,







propTypes:SpecPolicy.DEFINE_MANY,







contextTypes:SpecPolicy.DEFINE_MANY,







childContextTypes:SpecPolicy.DEFINE_MANY,













getDefaultProps:SpecPolicy.DEFINE_MANY_MERGED,















getInitialState:SpecPolicy.DEFINE_MANY_MERGED,





getChildContext:SpecPolicy.DEFINE_MANY_MERGED,

















render:SpecPolicy.DEFINE_ONCE,










componentWillMount:SpecPolicy.DEFINE_MANY,











componentDidMount:SpecPolicy.DEFINE_MANY,




















componentWillReceiveProps:SpecPolicy.DEFINE_MANY,





















shouldComponentUpdate:SpecPolicy.DEFINE_ONCE,
















componentWillUpdate:SpecPolicy.DEFINE_MANY,













componentDidUpdate:SpecPolicy.DEFINE_MANY,












componentWillUnmount:SpecPolicy.DEFINE_MANY,













updateComponent:SpecPolicy.OVERRIDE_BASE};












var RESERVED_SPEC_KEYS={
displayName:function displayName(Constructor,_displayName){
Constructor.displayName=_displayName;},

mixins:function mixins(Constructor,_mixins){
if(_mixins){
for(var i=0;i<_mixins.length;i++){
mixSpecIntoComponent(Constructor,_mixins[i]);}}},



childContextTypes:function childContextTypes(Constructor,_childContextTypes){
if(process.env.NODE_ENV!=='production'){
validateTypeDef(Constructor,_childContextTypes,ReactPropTypeLocations.childContext);}

Constructor.childContextTypes=assign({},Constructor.childContextTypes,_childContextTypes);},

contextTypes:function contextTypes(Constructor,_contextTypes){
if(process.env.NODE_ENV!=='production'){
validateTypeDef(Constructor,_contextTypes,ReactPropTypeLocations.context);}

Constructor.contextTypes=assign({},Constructor.contextTypes,_contextTypes);},





getDefaultProps:function getDefaultProps(Constructor,_getDefaultProps){
if(Constructor.getDefaultProps){
Constructor.getDefaultProps=createMergedResultFunction(Constructor.getDefaultProps,_getDefaultProps);}else 
{
Constructor.getDefaultProps=_getDefaultProps;}},


propTypes:function propTypes(Constructor,_propTypes){
if(process.env.NODE_ENV!=='production'){
validateTypeDef(Constructor,_propTypes,ReactPropTypeLocations.prop);}

Constructor.propTypes=assign({},Constructor.propTypes,_propTypes);},

statics:function statics(Constructor,_statics){
mixStaticSpecIntoComponent(Constructor,_statics);},

autobind:function autobind(){}};


function validateTypeDef(Constructor,typeDef,location){
for(var propName in typeDef){
if(typeDef.hasOwnProperty(propName)){


process.env.NODE_ENV!=='production'?warning(typeof typeDef[propName]==='function','%s: %s type `%s` is invalid; it must be a function, usually from '+'React.PropTypes.',Constructor.displayName||'ReactClass',ReactPropTypeLocationNames[location],propName):undefined;}}}




function validateMethodOverride(proto,name){
var specPolicy=ReactClassInterface.hasOwnProperty(name)?ReactClassInterface[name]:null;


if(ReactClassMixin.hasOwnProperty(name)){
!(specPolicy===SpecPolicy.OVERRIDE_BASE)?process.env.NODE_ENV!=='production'?invariant(false,'ReactClassInterface: You are attempting to override '+'`%s` from your class specification. Ensure that your method names '+'do not overlap with React methods.',name):invariant(false):undefined;}



if(proto.hasOwnProperty(name)){
!(specPolicy===SpecPolicy.DEFINE_MANY||specPolicy===SpecPolicy.DEFINE_MANY_MERGED)?process.env.NODE_ENV!=='production'?invariant(false,'ReactClassInterface: You are attempting to define '+'`%s` on your component more than once. This conflict may be due '+'to a mixin.',name):invariant(false):undefined;}}







function mixSpecIntoComponent(Constructor,spec){
if(!spec){
return;}


!(typeof spec!=='function')?process.env.NODE_ENV!=='production'?invariant(false,'ReactClass: You\'re attempting to '+'use a component class as a mixin. Instead, just use a regular object.'):invariant(false):undefined;
!!ReactElement.isValidElement(spec)?process.env.NODE_ENV!=='production'?invariant(false,'ReactClass: You\'re attempting to '+'use a component as a mixin. Instead, just use a regular object.'):invariant(false):undefined;

var proto=Constructor.prototype;




if(spec.hasOwnProperty(MIXINS_KEY)){
RESERVED_SPEC_KEYS.mixins(Constructor,spec.mixins);}


for(var name in spec){
if(!spec.hasOwnProperty(name)){
continue;}


if(name===MIXINS_KEY){

continue;}


var property=spec[name];
validateMethodOverride(proto,name);

if(RESERVED_SPEC_KEYS.hasOwnProperty(name)){
RESERVED_SPEC_KEYS[name](Constructor,property);}else 
{




var isReactClassMethod=ReactClassInterface.hasOwnProperty(name);
var isAlreadyDefined=proto.hasOwnProperty(name);
var isFunction=typeof property==='function';
var shouldAutoBind=isFunction&&!isReactClassMethod&&!isAlreadyDefined&&spec.autobind!==false;

if(shouldAutoBind){
if(!proto.__reactAutoBindMap){
proto.__reactAutoBindMap={};}

proto.__reactAutoBindMap[name]=property;
proto[name]=property;}else 
{
if(isAlreadyDefined){
var specPolicy=ReactClassInterface[name];


!(isReactClassMethod&&(specPolicy===SpecPolicy.DEFINE_MANY_MERGED||specPolicy===SpecPolicy.DEFINE_MANY))?process.env.NODE_ENV!=='production'?invariant(false,'ReactClass: Unexpected spec policy %s for key %s '+'when mixing in component specs.',specPolicy,name):invariant(false):undefined;



if(specPolicy===SpecPolicy.DEFINE_MANY_MERGED){
proto[name]=createMergedResultFunction(proto[name],property);}else 
if(specPolicy===SpecPolicy.DEFINE_MANY){
proto[name]=createChainedFunction(proto[name],property);}}else 

{
proto[name]=property;
if(process.env.NODE_ENV!=='production'){


if(typeof property==='function'&&spec.displayName){
proto[name].displayName=spec.displayName+'_'+name;}}}}}}}








function mixStaticSpecIntoComponent(Constructor,statics){
if(!statics){
return;}

for(var name in statics){
var property=statics[name];
if(!statics.hasOwnProperty(name)){
continue;}


var isReserved=name in RESERVED_SPEC_KEYS;
!!isReserved?process.env.NODE_ENV!=='production'?invariant(false,'ReactClass: You are attempting to define a reserved '+'property, `%s`, that shouldn\'t be on the "statics" key. Define it '+'as an instance property instead; it will still be accessible on the '+'constructor.',name):invariant(false):undefined;

var isInherited=name in Constructor;
!!isInherited?process.env.NODE_ENV!=='production'?invariant(false,'ReactClass: You are attempting to define '+'`%s` on your component more than once. This conflict may be '+'due to a mixin.',name):invariant(false):undefined;
Constructor[name]=property;}}










function mergeIntoWithNoDuplicateKeys(one,two){
!(one&&two&&typeof one==='object'&&typeof two==='object')?process.env.NODE_ENV!=='production'?invariant(false,'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'):invariant(false):undefined;

for(var key in two){
if(two.hasOwnProperty(key)){
!(one[key]===undefined)?process.env.NODE_ENV!=='production'?invariant(false,'mergeIntoWithNoDuplicateKeys(): '+'Tried to merge two objects with the same key: `%s`. This conflict '+'may be due to a mixin; in particular, this may be caused by two '+'getInitialState() or getDefaultProps() methods returning objects '+'with clashing keys.',key):invariant(false):undefined;
one[key]=two[key];}}


return one;}










function createMergedResultFunction(one,two){
return function mergedResult(){
var a=one.apply(this,arguments);
var b=two.apply(this,arguments);
if(a==null){
return b;}else 
if(b==null){
return a;}

var c={};
mergeIntoWithNoDuplicateKeys(c,a);
mergeIntoWithNoDuplicateKeys(c,b);
return c;};}











function createChainedFunction(one,two){
return function chainedFunction(){
one.apply(this,arguments);
two.apply(this,arguments);};}










function bindAutoBindMethod(component,method){
var boundMethod=method.bind(component);
if(process.env.NODE_ENV!=='production'){
boundMethod.__reactBoundContext=component;
boundMethod.__reactBoundMethod=method;
boundMethod.__reactBoundArguments=null;
var componentName=component.constructor.displayName;
var _bind=boundMethod.bind;

boundMethod.bind=function(newThis){
for(var _len=arguments.length,args=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){
args[_key-1]=arguments[_key];}





if(newThis!==component&&newThis!==null){
process.env.NODE_ENV!=='production'?warning(false,'bind(): React component methods may only be bound to the '+'component instance. See %s',componentName):undefined;}else 
if(!args.length){
process.env.NODE_ENV!=='production'?warning(false,'bind(): You are binding a component method to the component. '+'React does this for you automatically in a high-performance '+'way, so you can safely remove this call. See %s',componentName):undefined;
return boundMethod;}

var reboundMethod=_bind.apply(boundMethod,arguments);
reboundMethod.__reactBoundContext=component;
reboundMethod.__reactBoundMethod=method;
reboundMethod.__reactBoundArguments=args;
return reboundMethod;};}



return boundMethod;}







function bindAutoBindMethods(component){
for(var autoBindKey in component.__reactAutoBindMap){
if(component.__reactAutoBindMap.hasOwnProperty(autoBindKey)){
var method=component.__reactAutoBindMap[autoBindKey];
component[autoBindKey]=bindAutoBindMethod(component,method);}}}








var ReactClassMixin={





replaceState:function replaceState(newState,callback){
this.updater.enqueueReplaceState(this,newState);
if(callback){
this.updater.enqueueCallback(this,callback);}},









isMounted:function isMounted(){
return this.updater.isMounted(this);},











setProps:function setProps(partialProps,callback){
if(process.env.NODE_ENV!=='production'){
warnSetProps();}

this.updater.enqueueSetProps(this,partialProps);
if(callback){
this.updater.enqueueCallback(this,callback);}},












replaceProps:function replaceProps(newProps,callback){
if(process.env.NODE_ENV!=='production'){
warnSetProps();}

this.updater.enqueueReplaceProps(this,newProps);
if(callback){
this.updater.enqueueCallback(this,callback);}}};




var ReactClassComponent=function ReactClassComponent(){};
assign(ReactClassComponent.prototype,ReactComponent.prototype,ReactClassMixin);






var ReactClass={








createClass:function createClass(spec){
var Constructor=function Constructor(props,context,updater){



if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(this instanceof Constructor,'Something is calling a React component directly. Use a factory or '+'JSX instead. See: https://fb.me/react-legacyfactory'):undefined;}



if(this.__reactAutoBindMap){
bindAutoBindMethods(this);}


this.props=props;
this.context=context;
this.refs=emptyObject;
this.updater=updater||ReactNoopUpdateQueue;

this.state=null;




var initialState=this.getInitialState?this.getInitialState():null;
if(process.env.NODE_ENV!=='production'){

if(typeof initialState==='undefined'&&this.getInitialState._isMockFunction){


initialState=null;}}


!(typeof initialState==='object'&&!Array.isArray(initialState))?process.env.NODE_ENV!=='production'?invariant(false,'%s.getInitialState(): must return an object or null',Constructor.displayName||'ReactCompositeComponent'):invariant(false):undefined;

this.state=initialState;};

Constructor.prototype=new ReactClassComponent();
Constructor.prototype.constructor=Constructor;

injectedMixins.forEach(mixSpecIntoComponent.bind(null,Constructor));

mixSpecIntoComponent(Constructor,spec);


if(Constructor.getDefaultProps){
Constructor.defaultProps=Constructor.getDefaultProps();}


if(process.env.NODE_ENV!=='production'){




if(Constructor.getDefaultProps){
Constructor.getDefaultProps.isReactClassApproved={};}

if(Constructor.prototype.getInitialState){
Constructor.prototype.getInitialState.isReactClassApproved={};}}



!Constructor.prototype.render?process.env.NODE_ENV!=='production'?invariant(false,'createClass(...): Class specification must implement a `render` method.'):invariant(false):undefined;

if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(!Constructor.prototype.componentShouldUpdate,'%s has a method called '+'componentShouldUpdate(). Did you mean shouldComponentUpdate()? '+'The name is phrased as a question because the function is '+'expected to return a value.',spec.displayName||'A component'):undefined;
process.env.NODE_ENV!=='production'?warning(!Constructor.prototype.componentWillRecieveProps,'%s has a method called '+'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',spec.displayName||'A component'):undefined;}



for(var methodName in ReactClassInterface){
if(!Constructor.prototype[methodName]){
Constructor.prototype[methodName]=null;}}



return Constructor;},


injection:{
injectMixin:function injectMixin(mixin){
injectedMixins.push(mixin);}}};





module.exports=ReactClass;
});
__d(43 /* ReactPropTypeLocations */, function(global, require, module, exports) {'use strict';












var keyMirror=require(237 /* fbjs/lib/keyMirror */);

var ReactPropTypeLocations=keyMirror({
prop:null,
context:null,
childContext:null});


module.exports=ReactPropTypeLocations;
});
__d(237 /* fbjs/lib/keyMirror.js */, function(global, require, module, exports) {'use strict';













var invariant=require(242 /* ./invariant */);



















var keyMirror=function keyMirror(obj){
var ret={};
var key;
!(obj instanceof Object&&!Array.isArray(obj))?process.env.NODE_ENV!=='production'?invariant(false,'keyMirror(...): Argument must be an object.'):invariant(false):undefined;
for(key in obj){
if(!obj.hasOwnProperty(key)){
continue;}

ret[key]=key;}

return ret;};


module.exports=keyMirror;
});
__d(44 /* ReactPropTypeLocationNames */, function(global, require, module, exports) {'use strict';












var ReactPropTypeLocationNames={};

if(process.env.NODE_ENV!=='production'){
ReactPropTypeLocationNames={
prop:'prop',
context:'context',
childContext:'child context'};}



module.exports=ReactPropTypeLocationNames;
});
__d(236 /* fbjs/lib/keyOf.js */, function(global, require, module, exports) {"use strict";






















var keyOf=function keyOf(oneKeyObj){
var key;
for(key in oneKeyObj){
if(!oneKeyObj.hasOwnProperty(key)){
continue;}

return key;}

return null;};


module.exports=keyOf;
});
__d(45 /* ReactDOMFactories */, function(global, require, module, exports) {'use strict';













var ReactElement=require(32 /* ./ReactElement */);
var ReactElementValidator=require(46 /* ./ReactElementValidator */);

var mapObject=require(235 /* fbjs/lib/mapObject */);







function createDOMFactory(tag){
if(process.env.NODE_ENV!=='production'){
return ReactElementValidator.createFactory(tag);}

return ReactElement.createFactory(tag);}








var ReactDOMFactories=mapObject({
a:'a',
abbr:'abbr',
address:'address',
area:'area',
article:'article',
aside:'aside',
audio:'audio',
b:'b',
base:'base',
bdi:'bdi',
bdo:'bdo',
big:'big',
blockquote:'blockquote',
body:'body',
br:'br',
button:'button',
canvas:'canvas',
caption:'caption',
cite:'cite',
code:'code',
col:'col',
colgroup:'colgroup',
data:'data',
datalist:'datalist',
dd:'dd',
del:'del',
details:'details',
dfn:'dfn',
dialog:'dialog',
div:'div',
dl:'dl',
dt:'dt',
em:'em',
embed:'embed',
fieldset:'fieldset',
figcaption:'figcaption',
figure:'figure',
footer:'footer',
form:'form',
h1:'h1',
h2:'h2',
h3:'h3',
h4:'h4',
h5:'h5',
h6:'h6',
head:'head',
header:'header',
hgroup:'hgroup',
hr:'hr',
html:'html',
i:'i',
iframe:'iframe',
img:'img',
input:'input',
ins:'ins',
kbd:'kbd',
keygen:'keygen',
label:'label',
legend:'legend',
li:'li',
link:'link',
main:'main',
map:'map',
mark:'mark',
menu:'menu',
menuitem:'menuitem',
meta:'meta',
meter:'meter',
nav:'nav',
noscript:'noscript',
object:'object',
ol:'ol',
optgroup:'optgroup',
option:'option',
output:'output',
p:'p',
param:'param',
picture:'picture',
pre:'pre',
progress:'progress',
q:'q',
rp:'rp',
rt:'rt',
ruby:'ruby',
s:'s',
samp:'samp',
script:'script',
section:'section',
select:'select',
small:'small',
source:'source',
span:'span',
strong:'strong',
style:'style',
sub:'sub',
summary:'summary',
sup:'sup',
table:'table',
tbody:'tbody',
td:'td',
textarea:'textarea',
tfoot:'tfoot',
th:'th',
thead:'thead',
time:'time',
title:'title',
tr:'tr',
track:'track',
u:'u',
ul:'ul',
'var':'var',
video:'video',
wbr:'wbr',


circle:'circle',
clipPath:'clipPath',
defs:'defs',
ellipse:'ellipse',
g:'g',
image:'image',
line:'line',
linearGradient:'linearGradient',
mask:'mask',
path:'path',
pattern:'pattern',
polygon:'polygon',
polyline:'polyline',
radialGradient:'radialGradient',
rect:'rect',
stop:'stop',
svg:'svg',
text:'text',
tspan:'tspan'},

createDOMFactory);

module.exports=ReactDOMFactories;
});
__d(46 /* ReactElementValidator */, function(global, require, module, exports) {'use strict';



















var ReactElement=require(32 /* ./ReactElement */);
var ReactPropTypeLocations=require(43 /* ./ReactPropTypeLocations */);
var ReactPropTypeLocationNames=require(44 /* ./ReactPropTypeLocationNames */);
var ReactCurrentOwner=require(33 /* ./ReactCurrentOwner */);

var canDefineProperty=require(35 /* ./canDefineProperty */);
var getIteratorFn=require(39 /* ./getIteratorFn */);
var invariant=require(242 /* fbjs/lib/invariant */);
var warning=require(240 /* fbjs/lib/warning */);

function getDeclarationErrorAddendum(){
if(ReactCurrentOwner.current){
var name=ReactCurrentOwner.current.getName();
if(name){
return ' Check the render method of `'+name+'`.';}}


return '';}







var ownerHasKeyUseWarning={};

var loggedTypeFailures={};











function validateExplicitKey(element,parentType){
if(!element._store||element._store.validated||element.key!=null){
return;}

element._store.validated=true;

var addenda=getAddendaForKeyUse('uniqueKey',element,parentType);
if(addenda===null){

return;}

process.env.NODE_ENV!=='production'?warning(false,'Each child in an array or iterator should have a unique "key" prop.'+'%s%s%s',addenda.parentOrOwner||'',addenda.childOwner||'',addenda.url||''):undefined;}












function getAddendaForKeyUse(messageType,element,parentType){
var addendum=getDeclarationErrorAddendum();
if(!addendum){
var parentName=typeof parentType==='string'?parentType:parentType.displayName||parentType.name;
if(parentName){
addendum=' Check the top-level render call using <'+parentName+'>.';}}



var memoizer=ownerHasKeyUseWarning[messageType]||(ownerHasKeyUseWarning[messageType]={});
if(memoizer[addendum]){
return null;}

memoizer[addendum]=true;

var addenda={
parentOrOwner:addendum,
url:' See https://fb.me/react-warning-keys for more information.',
childOwner:null};





if(element&&element._owner&&element._owner!==ReactCurrentOwner.current){

addenda.childOwner=' It was passed a child from '+element._owner.getName()+'.';}


return addenda;}











function validateChildKeys(node,parentType){
if(typeof node!=='object'){
return;}

if(Array.isArray(node)){
for(var i=0;i<node.length;i++){
var child=node[i];
if(ReactElement.isValidElement(child)){
validateExplicitKey(child,parentType);}}}else 


if(ReactElement.isValidElement(node)){

if(node._store){
node._store.validated=true;}}else 

if(node){
var iteratorFn=getIteratorFn(node);

if(iteratorFn){
if(iteratorFn!==node.entries){
var iterator=iteratorFn.call(node);
var step;
while(!(step=iterator.next()).done){
if(ReactElement.isValidElement(step.value)){
validateExplicitKey(step.value,parentType);}}}}}}
















function checkPropTypes(componentName,propTypes,props,location){
for(var propName in propTypes){
if(propTypes.hasOwnProperty(propName)){
var error;



try{


!(typeof propTypes[propName]==='function')?process.env.NODE_ENV!=='production'?invariant(false,'%s: %s type `%s` is invalid; it must be a function, usually from '+'React.PropTypes.',componentName||'React class',ReactPropTypeLocationNames[location],propName):invariant(false):undefined;
error=propTypes[propName](props,propName,componentName,location);}
catch(ex){
error=ex;}

process.env.NODE_ENV!=='production'?warning(!error||error instanceof Error,'%s: type specification of %s `%s` is invalid; the type checker '+'function must return `null` or an `Error` but returned a %s. '+'You may have forgotten to pass an argument to the type checker '+'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and '+'shape all require an argument).',componentName||'React class',ReactPropTypeLocationNames[location],propName,typeof error):undefined;
if(error instanceof Error&&!(error.message in loggedTypeFailures)){


loggedTypeFailures[error.message]=true;

var addendum=getDeclarationErrorAddendum();
process.env.NODE_ENV!=='production'?warning(false,'Failed propType: %s%s',error.message,addendum):undefined;}}}}











function validatePropTypes(element){
var componentClass=element.type;
if(typeof componentClass!=='function'){
return;}

var name=componentClass.displayName||componentClass.name;
if(componentClass.propTypes){
checkPropTypes(name,componentClass.propTypes,element.props,ReactPropTypeLocations.prop);}

if(typeof componentClass.getDefaultProps==='function'){
process.env.NODE_ENV!=='production'?warning(componentClass.getDefaultProps.isReactClassApproved,'getDefaultProps is only used on classic React.createClass '+'definitions. Use a static property named `defaultProps` instead.'):undefined;}}



var ReactElementValidator={

createElement:function createElement(type,props,children){
var validType=typeof type==='string'||typeof type==='function';


process.env.NODE_ENV!=='production'?warning(validType,'React.createElement: type should not be null, undefined, boolean, or '+'number. It should be a string (for DOM elements) or a ReactClass '+'(for composite components).%s',getDeclarationErrorAddendum()):undefined;

var element=ReactElement.createElement.apply(this,arguments);



if(element==null){
return element;}







if(validType){
for(var i=2;i<arguments.length;i++){
validateChildKeys(arguments[i],type);}}



validatePropTypes(element);

return element;},


createFactory:function createFactory(type){
var validatedFactory=ReactElementValidator.createElement.bind(null,type);

validatedFactory.type=type;

if(process.env.NODE_ENV!=='production'){
if(canDefineProperty){
Object.defineProperty(validatedFactory,'type',{
enumerable:false,
get:function get(){
process.env.NODE_ENV!=='production'?warning(false,'Factory.type is deprecated. Access the class directly '+'before passing it to createFactory.'):undefined;
Object.defineProperty(this,'type',{
value:type});

return type;}});}}





return validatedFactory;},


cloneElement:function cloneElement(element,props,children){
var newElement=ReactElement.cloneElement.apply(this,arguments);
for(var i=2;i<arguments.length;i++){
validateChildKeys(arguments[i],newElement.type);}

validatePropTypes(newElement);
return newElement;}};




module.exports=ReactElementValidator;
});
__d(235 /* fbjs/lib/mapObject.js */, function(global, require, module, exports) {'use strict';












var hasOwnProperty=Object.prototype.hasOwnProperty;























function mapObject(object,callback,context){
if(!object){
return null;}

var result={};
for(var name in object){
if(hasOwnProperty.call(object,name)){
result[name]=callback.call(context,object[name],name,object);}}


return result;}


module.exports=mapObject;
});
__d(47 /* ReactPropTypes */, function(global, require, module, exports) {'use strict';












var ReactElement=require(32 /* ./ReactElement */);
var ReactPropTypeLocationNames=require(44 /* ./ReactPropTypeLocationNames */);

var emptyFunction=require(233 /* fbjs/lib/emptyFunction */);
var getIteratorFn=require(39 /* ./getIteratorFn */);
















































var ANONYMOUS='<<anonymous>>';

var ReactPropTypes={
array:createPrimitiveTypeChecker('array'),
bool:createPrimitiveTypeChecker('boolean'),
func:createPrimitiveTypeChecker('function'),
number:createPrimitiveTypeChecker('number'),
object:createPrimitiveTypeChecker('object'),
string:createPrimitiveTypeChecker('string'),

any:createAnyTypeChecker(),
arrayOf:createArrayOfTypeChecker,
element:createElementTypeChecker(),
instanceOf:createInstanceTypeChecker,
node:createNodeChecker(),
objectOf:createObjectOfTypeChecker,
oneOf:createEnumTypeChecker,
oneOfType:createUnionTypeChecker,
shape:createShapeTypeChecker};


function createChainableTypeChecker(validate){
function checkType(isRequired,props,propName,componentName,location,propFullName){
componentName=componentName||ANONYMOUS;
propFullName=propFullName||propName;
if(props[propName]==null){
var locationName=ReactPropTypeLocationNames[location];
if(isRequired){
return new Error('Required '+locationName+' `'+propFullName+'` was not specified in '+('`'+componentName+'`.'));}

return null;}else 
{
return validate(props,propName,componentName,location,propFullName);}}



var chainedCheckType=checkType.bind(null,false);
chainedCheckType.isRequired=checkType.bind(null,true);

return chainedCheckType;}


function createPrimitiveTypeChecker(expectedType){
function validate(props,propName,componentName,location,propFullName){
var propValue=props[propName];
var propType=getPropType(propValue);
if(propType!==expectedType){
var locationName=ReactPropTypeLocationNames[location];



var preciseType=getPreciseType(propValue);

return new Error('Invalid '+locationName+' `'+propFullName+'` of type '+('`'+preciseType+'` supplied to `'+componentName+'`, expected ')+('`'+expectedType+'`.'));}

return null;}

return createChainableTypeChecker(validate);}


function createAnyTypeChecker(){
return createChainableTypeChecker(emptyFunction.thatReturns(null));}


function createArrayOfTypeChecker(typeChecker){
function validate(props,propName,componentName,location,propFullName){
var propValue=props[propName];
if(!Array.isArray(propValue)){
var locationName=ReactPropTypeLocationNames[location];
var propType=getPropType(propValue);
return new Error('Invalid '+locationName+' `'+propFullName+'` of type '+('`'+propType+'` supplied to `'+componentName+'`, expected an array.'));}

for(var i=0;i<propValue.length;i++){
var error=typeChecker(propValue,i,componentName,location,propFullName+'['+i+']');
if(error instanceof Error){
return error;}}


return null;}

return createChainableTypeChecker(validate);}


function createElementTypeChecker(){
function validate(props,propName,componentName,location,propFullName){
if(!ReactElement.isValidElement(props[propName])){
var locationName=ReactPropTypeLocationNames[location];
return new Error('Invalid '+locationName+' `'+propFullName+'` supplied to '+('`'+componentName+'`, expected a single ReactElement.'));}

return null;}

return createChainableTypeChecker(validate);}


function createInstanceTypeChecker(expectedClass){
function validate(props,propName,componentName,location,propFullName){
if(!(props[propName] instanceof expectedClass)){
var locationName=ReactPropTypeLocationNames[location];
var expectedClassName=expectedClass.name||ANONYMOUS;
var actualClassName=getClassName(props[propName]);
return new Error('Invalid '+locationName+' `'+propFullName+'` of type '+('`'+actualClassName+'` supplied to `'+componentName+'`, expected ')+('instance of `'+expectedClassName+'`.'));}

return null;}

return createChainableTypeChecker(validate);}


function createEnumTypeChecker(expectedValues){
if(!Array.isArray(expectedValues)){
return createChainableTypeChecker(function(){
return new Error('Invalid argument supplied to oneOf, expected an instance of array.');});}



function validate(props,propName,componentName,location,propFullName){
var propValue=props[propName];
for(var i=0;i<expectedValues.length;i++){
if(propValue===expectedValues[i]){
return null;}}



var locationName=ReactPropTypeLocationNames[location];
var valuesString=JSON.stringify(expectedValues);
return new Error('Invalid '+locationName+' `'+propFullName+'` of value `'+propValue+'` '+('supplied to `'+componentName+'`, expected one of '+valuesString+'.'));}

return createChainableTypeChecker(validate);}


function createObjectOfTypeChecker(typeChecker){
function validate(props,propName,componentName,location,propFullName){
var propValue=props[propName];
var propType=getPropType(propValue);
if(propType!=='object'){
var locationName=ReactPropTypeLocationNames[location];
return new Error('Invalid '+locationName+' `'+propFullName+'` of type '+('`'+propType+'` supplied to `'+componentName+'`, expected an object.'));}

for(var key in propValue){
if(propValue.hasOwnProperty(key)){
var error=typeChecker(propValue,key,componentName,location,propFullName+'.'+key);
if(error instanceof Error){
return error;}}}



return null;}

return createChainableTypeChecker(validate);}


function createUnionTypeChecker(arrayOfTypeCheckers){
if(!Array.isArray(arrayOfTypeCheckers)){
return createChainableTypeChecker(function(){
return new Error('Invalid argument supplied to oneOfType, expected an instance of array.');});}



function validate(props,propName,componentName,location,propFullName){
for(var i=0;i<arrayOfTypeCheckers.length;i++){
var checker=arrayOfTypeCheckers[i];
if(checker(props,propName,componentName,location,propFullName)==null){
return null;}}



var locationName=ReactPropTypeLocationNames[location];
return new Error('Invalid '+locationName+' `'+propFullName+'` supplied to '+('`'+componentName+'`.'));}

return createChainableTypeChecker(validate);}


function createNodeChecker(){
function validate(props,propName,componentName,location,propFullName){
if(!isNode(props[propName])){
var locationName=ReactPropTypeLocationNames[location];
return new Error('Invalid '+locationName+' `'+propFullName+'` supplied to '+('`'+componentName+'`, expected a ReactNode.'));}

return null;}

return createChainableTypeChecker(validate);}


function createShapeTypeChecker(shapeTypes){
function validate(props,propName,componentName,location,propFullName){
var propValue=props[propName];
var propType=getPropType(propValue);
if(propType!=='object'){
var locationName=ReactPropTypeLocationNames[location];
return new Error('Invalid '+locationName+' `'+propFullName+'` of type `'+propType+'` '+('supplied to `'+componentName+'`, expected `object`.'));}

for(var key in shapeTypes){
var checker=shapeTypes[key];
if(!checker){
continue;}

var error=checker(propValue,key,componentName,location,propFullName+'.'+key);
if(error){
return error;}}


return null;}

return createChainableTypeChecker(validate);}


function isNode(propValue){
switch(typeof propValue){
case 'number':
case 'string':
case 'undefined':
return true;
case 'boolean':
return !propValue;
case 'object':
if(Array.isArray(propValue)){
return propValue.every(isNode);}

if(propValue===null||ReactElement.isValidElement(propValue)){
return true;}


var iteratorFn=getIteratorFn(propValue);
if(iteratorFn){
var iterator=iteratorFn.call(propValue);
var step;
if(iteratorFn!==propValue.entries){
while(!(step=iterator.next()).done){
if(!isNode(step.value)){
return false;}}}else 


{

while(!(step=iterator.next()).done){
var entry=step.value;
if(entry){
if(!isNode(entry[1])){
return false;}}}}}else 




{
return false;}


return true;
default:
return false;}}




function getPropType(propValue){
var propType=typeof propValue;
if(Array.isArray(propValue)){
return 'array';}

if(propValue instanceof RegExp){



return 'object';}

return propType;}




function getPreciseType(propValue){
var propType=getPropType(propValue);
if(propType==='object'){
if(propValue instanceof Date){
return 'date';}else 
if(propValue instanceof RegExp){
return 'regexp';}}


return propType;}



function getClassName(propValue){
if(!propValue.constructor||!propValue.constructor.name){
return '<<anonymous>>';}

return propValue.constructor.name;}


module.exports=ReactPropTypes;
});
__d(48 /* ReactVersion */, function(global, require, module, exports) {'use strict';












module.exports='0.14.8';
});
__d(49 /* onlyChild */, function(global, require, module, exports) {'use strict';











var ReactElement=require(32 /* ./ReactElement */);

var invariant=require(242 /* fbjs/lib/invariant */);












function onlyChild(children){
!ReactElement.isValidElement(children)?process.env.NODE_ENV!=='production'?invariant(false,'onlyChild must be passed a children with exactly one child.'):invariant(false):undefined;
return children;}


module.exports=onlyChild;
});
__d(50 /* ReactNativeImpl */, function(global, require, module, exports) {'use strict';














var ReactNativeDefaultInjection=require(51 /* ReactNativeDefaultInjection */);

var ReactCurrentOwner=require(33 /* ReactCurrentOwner */);
var ReactElement=require(32 /* ReactElement */);
var ReactInstanceHandles=require(37 /* ReactInstanceHandles */);
var ReactNativeMount=require(73 /* ReactNativeMount */);
var ReactUpdates=require(80 /* ReactUpdates */);

var findNodeHandle=require(84 /* findNodeHandle */);

ReactNativeDefaultInjection.inject();

var render=function render(
element,
mountInto,
callback)
{
return ReactNativeMount.renderComponent(element,mountInto,callback);};


var ReactNative={
hasReactNativeInitialized:false,
findNodeHandle:findNodeHandle,
render:render,
unmountComponentAtNode:ReactNativeMount.unmountComponentAtNode,


unstable_batchedUpdates:ReactUpdates.batchedUpdates,


unmountComponentAtNodeAndRemoveContainer:ReactNativeMount.unmountComponentAtNodeAndRemoveContainer};





if(
typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!=='undefined'&&
typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject==='function'){
__REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
CurrentOwner:ReactCurrentOwner,
InstanceHandles:ReactInstanceHandles,
Mount:ReactNativeMount,
Reconciler:require(75 /* ReactReconciler */),
TextComponent:require(92 /* ReactNativeTextComponent */)});}



module.exports=ReactNative;
});
__d(51 /* ReactNativeDefaultInjection */, function(global, require, module, exports) {'use strict';

















require(52 /* InitializeJavaScriptAppEngine */);

var EventPluginHub=require(97 /* EventPluginHub */);
var EventPluginUtils=require(99 /* EventPluginUtils */);
var IOSDefaultEventPluginOrder=require(104 /* IOSDefaultEventPluginOrder */);
var IOSNativeBridgeEventPlugin=require(105 /* IOSNativeBridgeEventPlugin */);
var NodeHandle=require(111 /* NodeHandle */);
var ReactElement=require(32 /* ReactElement */);
var ReactComponentEnvironment=require(87 /* ReactComponentEnvironment */);
var ReactDefaultBatchingStrategy=require(112 /* ReactDefaultBatchingStrategy */);
var ReactEmptyComponent=require(89 /* ReactEmptyComponent */);
var ReactInstanceHandles=require(37 /* ReactInstanceHandles */);
var ReactNativeComponentEnvironment=require(113 /* ReactNativeComponentEnvironment */);
var ReactNativeGlobalInteractionHandler=require(117 /* ReactNativeGlobalInteractionHandler */);
var ReactNativeGlobalResponderHandler=require(122 /* ReactNativeGlobalResponderHandler */);
var ReactNativeMount=require(73 /* ReactNativeMount */);
var ReactNativeTextComponent=require(92 /* ReactNativeTextComponent */);
var ReactNativeComponent=require(91 /* ReactNativeComponent */);
var ReactUpdates=require(80 /* ReactUpdates */);
var ResponderEventPlugin=require(123 /* ResponderEventPlugin */);
var UniversalWorkerNodeHandle=require(127 /* UniversalWorkerNodeHandle */);

var invariant=require(222 /* fbjs/lib/invariant */);


require(128 /* RCTEventEmitter */);
require(131 /* RCTLog */);
require(7 /* JSTimersExecution */);

function inject(){



EventPluginHub.injection.injectEventPluginOrder(IOSDefaultEventPluginOrder);
EventPluginHub.injection.injectInstanceHandle(ReactInstanceHandles);

ResponderEventPlugin.injection.injectGlobalResponderHandler(
ReactNativeGlobalResponderHandler);


ResponderEventPlugin.injection.injectGlobalInteractionHandler(
ReactNativeGlobalInteractionHandler);






EventPluginHub.injection.injectEventPluginsByName({
'ResponderEventPlugin':ResponderEventPlugin,
'IOSNativeBridgeEventPlugin':IOSNativeBridgeEventPlugin});


ReactUpdates.injection.injectReconcileTransaction(
ReactNativeComponentEnvironment.ReactReconcileTransaction);


ReactUpdates.injection.injectBatchingStrategy(
ReactDefaultBatchingStrategy);


ReactComponentEnvironment.injection.injectEnvironment(
ReactNativeComponentEnvironment);


var EmptyComponent=function EmptyComponent(){

var View=require(132 /* View */);
return ReactElement.createElement(View,{
collapsable:true,
style:{position:'absolute'}});};


ReactEmptyComponent.injection.injectEmptyComponent(EmptyComponent);

EventPluginUtils.injection.injectMount(ReactNativeMount);

ReactNativeComponent.injection.injectTextComponentClass(
ReactNativeTextComponent);

ReactNativeComponent.injection.injectGenericComponentClass(function(tag){

var info='';
if(typeof tag==='string'&&/^[a-z]/.test(tag)){
info+=' Each component name should start with an uppercase letter.';}

invariant(false,'Expected a component class, got %s.%s',tag,info);});


NodeHandle.injection.injectImplementation(UniversalWorkerNodeHandle);}


module.exports={
inject:inject};
});
__d(52 /* InitializeJavaScriptAppEngine */, function(global, require, module, exports) {require(























398 /* regenerator-runtime/runtime */);

if(typeof GLOBAL==='undefined'){
global.GLOBAL=this;}


if(typeof window==='undefined'){
global.window=GLOBAL;}


function setUpConsole(){

var ExceptionsManager=require(53 /* ExceptionsManager */);
ExceptionsManager.installConsoleErrorReporter();}

















function polyfillGlobal(name,newValue){var scope=arguments.length<=2||arguments[2]===undefined?GLOBAL:arguments[2];
var descriptor=Object.getOwnPropertyDescriptor(scope,name)||{




writable:true};


if(scope[name]!==undefined){
var backupName='original'+name[0].toUpperCase()+name.substr(1);
Object.defineProperty(scope,backupName,babelHelpers.extends({},descriptor,{value:scope[name]}));}


Object.defineProperty(scope,name,babelHelpers.extends({},descriptor,{value:newValue}));}





function polyfillIfNeeded(name,polyfill){var scope=arguments.length<=2||arguments[2]===undefined?GLOBAL:arguments[2];var descriptor=arguments.length<=3||arguments[3]===undefined?{}:arguments[3];
if(scope[name]===undefined){
Object.defineProperty(scope,name,babelHelpers.extends({},descriptor,{value:polyfill}));}}



function setUpErrorHandler(){
if(global.__fbDisableExceptionsManager){
return;}


function handleError(e,isFatal){
try{
require(53 /* ExceptionsManager */).handleException(e,isFatal);}
catch(ee){
console.log('Failed to print error: ',ee.message);}}



var ErrorUtils=require(6 /* ErrorUtils */);
ErrorUtils.setGlobalHandler(handleError);}









function setUpTimers(){
var JSTimers=require(8 /* JSTimers */);
GLOBAL.setTimeout=JSTimers.setTimeout;
GLOBAL.setInterval=JSTimers.setInterval;
GLOBAL.setImmediate=JSTimers.setImmediate;
GLOBAL.clearTimeout=JSTimers.clearTimeout;
GLOBAL.clearInterval=JSTimers.clearInterval;
GLOBAL.clearImmediate=JSTimers.clearImmediate;
GLOBAL.cancelAnimationFrame=JSTimers.clearInterval;
GLOBAL.requestAnimationFrame=function(cb){

return JSTimers.requestAnimationFrame(cb);};}



function setUpAlert(){
if(!GLOBAL.alert){
GLOBAL.alert=function(text){


require(55 /* Alert */).alert('Alert',''+text);};}}




function setUpPromise(){


GLOBAL.Promise=require(26 /* Promise */);}


function setUpXHR(){


polyfillGlobal('XMLHttpRequest',require(57 /* XMLHttpRequest */));
polyfillGlobal('FormData',require(58 /* FormData */));

var fetchPolyfill=require(62 /* fetch */);
polyfillGlobal('fetch',fetchPolyfill.fetch);
polyfillGlobal('Headers',fetchPolyfill.Headers);
polyfillGlobal('Request',fetchPolyfill.Request);
polyfillGlobal('Response',fetchPolyfill.Response);}


function setUpGeolocation(){
polyfillIfNeeded('navigator',{},GLOBAL,{
writable:true,
enumerable:true,
configurable:true});

polyfillGlobal('geolocation',require(63 /* Geolocation */),GLOBAL.navigator);}


function setUpMapAndSet(){
polyfillGlobal('Map',require(65 /* Map */));
polyfillGlobal('Set',require(69 /* Set */));}


function setUpProduct(){
Object.defineProperty(GLOBAL.navigator,'product',{value:'ReactNative'});}


function setUpWebSockets(){
polyfillGlobal('WebSocket',require(13 /* WebSocket */));}


function setUpProfile(){
if(__DEV__){
var Systrace=require(4 /* Systrace */);
Systrace.swizzleReactPerf();}}



function setUpProcessEnv(){
GLOBAL.process=GLOBAL.process||{};
GLOBAL.process.env=GLOBAL.process.env||{};
if(!GLOBAL.process.env.NODE_ENV){
GLOBAL.process.env.NODE_ENV=__DEV__?'development':'production';}}



function setUpNumber(){
polyfillIfNeeded('EPSILON',Math.pow(2,-52),Number);
polyfillIfNeeded('MAX_SAFE_INTEGER',Math.pow(2,53)-1,Number);
polyfillIfNeeded('MIN_SAFE_INTEGER',-(Math.pow(2,53)-1),Number);}


function setUpDevTools(){

if(__DEV__){
if(!window.document&&require(10 /* Platform */).OS==='ios'){
var setupDevtools=require(70 /* setupDevtools */);
setupDevtools();}}}




setUpProcessEnv();
setUpConsole();
setUpTimers();
setUpAlert();
setUpPromise();
setUpErrorHandler();
setUpXHR();
setUpGeolocation();
setUpMapAndSet();
setUpProduct();
setUpWebSockets();
setUpProfile();
setUpNumber();
setUpDevTools();



if(__DEV__){
require(93 /* RCTDebugComponentOwnership */);}

require(14 /* RCTDeviceEventEmitter */);
require(95 /* RCTNativeAppEventEmitter */);
require(96 /* PerformanceLogger */);

if(__DEV__){

require(306 /* react-transform-hmr */);}
});
__d(398 /* regenerator-runtime/runtime.js */, function(global, require, module, exports) {!









function(global){
"use strict";

var hasOwn=Object.prototype.hasOwnProperty;
var undefined;
var $Symbol=typeof Symbol==="function"?Symbol:{};
var iteratorSymbol=$Symbol.iterator||"@@iterator";
var toStringTagSymbol=$Symbol.toStringTag||"@@toStringTag";

var inModule=typeof module==="object";
var runtime=global.regeneratorRuntime;
if(runtime){
if(inModule){


module.exports=runtime;}



return;}




runtime=global.regeneratorRuntime=inModule?module.exports:{};

function wrap(innerFn,outerFn,self,tryLocsList){

var generator=Object.create((outerFn||Generator).prototype);
var context=new Context(tryLocsList||[]);



generator._invoke=makeInvokeMethod(innerFn,self,context);

return generator;}

runtime.wrap=wrap;











function tryCatch(fn,obj,arg){
try{
return {type:"normal",arg:fn.call(obj,arg)};}
catch(err){
return {type:"throw",arg:err};}}



var GenStateSuspendedStart="suspendedStart";
var GenStateSuspendedYield="suspendedYield";
var GenStateExecuting="executing";
var GenStateCompleted="completed";



var ContinueSentinel={};





function Generator(){}
function GeneratorFunction(){}
function GeneratorFunctionPrototype(){}

var Gp=GeneratorFunctionPrototype.prototype=Generator.prototype;
GeneratorFunction.prototype=Gp.constructor=GeneratorFunctionPrototype;
GeneratorFunctionPrototype.constructor=GeneratorFunction;
GeneratorFunctionPrototype[toStringTagSymbol]=GeneratorFunction.displayName="GeneratorFunction";



function defineIteratorMethods(prototype){
["next","throw","return"].forEach(function(method){
prototype[method]=function(arg){
return this._invoke(method,arg);};});}




runtime.isGeneratorFunction=function(genFun){
var ctor=typeof genFun==="function"&&genFun.constructor;
return ctor?
ctor===GeneratorFunction||


(ctor.displayName||ctor.name)==="GeneratorFunction":
false;};


runtime.mark=function(genFun){
if(Object.setPrototypeOf){
Object.setPrototypeOf(genFun,GeneratorFunctionPrototype);}else 
{
genFun.__proto__=GeneratorFunctionPrototype;
if(!(toStringTagSymbol in genFun)){
genFun[toStringTagSymbol]="GeneratorFunction";}}


genFun.prototype=Object.create(Gp);
return genFun;};







runtime.awrap=function(arg){
return new AwaitArgument(arg);};


function AwaitArgument(arg){
this.arg=arg;}


function AsyncIterator(generator){
function invoke(method,arg,resolve,reject){
var record=tryCatch(generator[method],generator,arg);
if(record.type==="throw"){
reject(record.arg);}else 
{
var result=record.arg;
var value=result.value;
if(value instanceof AwaitArgument){
return Promise.resolve(value.arg).then(function(value){
invoke("next",value,resolve,reject);},
function(err){
invoke("throw",err,resolve,reject);});}



return Promise.resolve(value).then(function(unwrapped){















result.value=unwrapped;
resolve(result);},
reject);}}



if(typeof process==="object"&&process.domain){
invoke=process.domain.bind(invoke);}


var previousPromise;

function enqueue(method,arg){
function callInvokeWithMethodAndArg(){
return new Promise(function(resolve,reject){
invoke(method,arg,resolve,reject);});}



return previousPromise=












previousPromise?previousPromise.then(
callInvokeWithMethodAndArg,


callInvokeWithMethodAndArg):
callInvokeWithMethodAndArg();}




this._invoke=enqueue;}


defineIteratorMethods(AsyncIterator.prototype);




runtime.async=function(innerFn,outerFn,self,tryLocsList){
var iter=new AsyncIterator(
wrap(innerFn,outerFn,self,tryLocsList));


return runtime.isGeneratorFunction(outerFn)?
iter:
iter.next().then(function(result){
return result.done?result.value:iter.next();});};



function makeInvokeMethod(innerFn,self,context){
var state=GenStateSuspendedStart;

return function invoke(method,arg){
if(state===GenStateExecuting){
throw new Error("Generator is already running");}


if(state===GenStateCompleted){
if(method==="throw"){
throw arg;}




return doneResult();}


while(true){
var delegate=context.delegate;
if(delegate){
if(method==="return"||
method==="throw"&&delegate.iterator[method]===undefined){


context.delegate=null;



var returnMethod=delegate.iterator["return"];
if(returnMethod){
var record=tryCatch(returnMethod,delegate.iterator,arg);
if(record.type==="throw"){


method="throw";
arg=record.arg;
continue;}}



if(method==="return"){


continue;}}



var record=tryCatch(
delegate.iterator[method],
delegate.iterator,
arg);


if(record.type==="throw"){
context.delegate=null;



method="throw";
arg=record.arg;
continue;}





method="next";
arg=undefined;

var info=record.arg;
if(info.done){
context[delegate.resultName]=info.value;
context.next=delegate.nextLoc;}else 
{
state=GenStateSuspendedYield;
return info;}


context.delegate=null;}


if(method==="next"){


context.sent=context._sent=arg;}else 

if(method==="throw"){
if(state===GenStateSuspendedStart){
state=GenStateCompleted;
throw arg;}


if(context.dispatchException(arg)){


method="next";
arg=undefined;}}else 


if(method==="return"){
context.abrupt("return",arg);}


state=GenStateExecuting;

var record=tryCatch(innerFn,self,context);
if(record.type==="normal"){


state=context.done?
GenStateCompleted:
GenStateSuspendedYield;

var info={
value:record.arg,
done:context.done};


if(record.arg===ContinueSentinel){
if(context.delegate&&method==="next"){


arg=undefined;}}else 

{
return info;}}else 


if(record.type==="throw"){
state=GenStateCompleted;


method="throw";
arg=record.arg;}}};}







defineIteratorMethods(Gp);

Gp[iteratorSymbol]=function(){
return this;};


Gp[toStringTagSymbol]="Generator";

Gp.toString=function(){
return "[object Generator]";};


function pushTryEntry(locs){
var entry={tryLoc:locs[0]};

if(1 in locs){
entry.catchLoc=locs[1];}


if(2 in locs){
entry.finallyLoc=locs[2];
entry.afterLoc=locs[3];}


this.tryEntries.push(entry);}


function resetTryEntry(entry){
var record=entry.completion||{};
record.type="normal";
delete record.arg;
entry.completion=record;}


function Context(tryLocsList){



this.tryEntries=[{tryLoc:"root"}];
tryLocsList.forEach(pushTryEntry,this);
this.reset(true);}


runtime.keys=function(object){
var keys=[];
for(var key in object){
keys.push(key);}

keys.reverse();



return function next(){
while(keys.length){
var key=keys.pop();
if(key in object){
next.value=key;
next.done=false;
return next;}}






next.done=true;
return next;};};



function values(iterable){
if(iterable){
var iteratorMethod=iterable[iteratorSymbol];
if(iteratorMethod){
return iteratorMethod.call(iterable);}


if(typeof iterable.next==="function"){
return iterable;}


if(!isNaN(iterable.length)){
var i=-1,next=function next(){
while(++i<iterable.length){
if(hasOwn.call(iterable,i)){
next.value=iterable[i];
next.done=false;
return next;}}



next.value=undefined;
next.done=true;

return next;};


return next.next=next;}}




return {next:doneResult};}

runtime.values=values;

function doneResult(){
return {value:undefined,done:true};}


Context.prototype={
constructor:Context,

reset:function reset(skipTempReset){
this.prev=0;
this.next=0;


this.sent=this._sent=undefined;
this.done=false;
this.delegate=null;

this.tryEntries.forEach(resetTryEntry);

if(!skipTempReset){
for(var name in this){

if(name.charAt(0)==="t"&&
hasOwn.call(this,name)&&
!isNaN(+name.slice(1))){
this[name]=undefined;}}}},





stop:function stop(){
this.done=true;

var rootEntry=this.tryEntries[0];
var rootRecord=rootEntry.completion;
if(rootRecord.type==="throw"){
throw rootRecord.arg;}


return this.rval;},


dispatchException:function dispatchException(exception){
if(this.done){
throw exception;}


var context=this;
function handle(loc,caught){
record.type="throw";
record.arg=exception;
context.next=loc;
return !!caught;}


for(var i=this.tryEntries.length-1;i>=0;--i){
var entry=this.tryEntries[i];
var record=entry.completion;

if(entry.tryLoc==="root"){



return handle("end");}


if(entry.tryLoc<=this.prev){
var hasCatch=hasOwn.call(entry,"catchLoc");
var hasFinally=hasOwn.call(entry,"finallyLoc");

if(hasCatch&&hasFinally){
if(this.prev<entry.catchLoc){
return handle(entry.catchLoc,true);}else 
if(this.prev<entry.finallyLoc){
return handle(entry.finallyLoc);}}else 


if(hasCatch){
if(this.prev<entry.catchLoc){
return handle(entry.catchLoc,true);}}else 


if(hasFinally){
if(this.prev<entry.finallyLoc){
return handle(entry.finallyLoc);}}else 


{
throw new Error("try statement without catch or finally");}}}},





abrupt:function abrupt(type,arg){
for(var i=this.tryEntries.length-1;i>=0;--i){
var entry=this.tryEntries[i];
if(entry.tryLoc<=this.prev&&
hasOwn.call(entry,"finallyLoc")&&
this.prev<entry.finallyLoc){
var finallyEntry=entry;
break;}}



if(finallyEntry&&(
type==="break"||
type==="continue")&&
finallyEntry.tryLoc<=arg&&
arg<=finallyEntry.finallyLoc){


finallyEntry=null;}


var record=finallyEntry?finallyEntry.completion:{};
record.type=type;
record.arg=arg;

if(finallyEntry){
this.next=finallyEntry.finallyLoc;}else 
{
this.complete(record);}


return ContinueSentinel;},


complete:function complete(record,afterLoc){
if(record.type==="throw"){
throw record.arg;}


if(record.type==="break"||
record.type==="continue"){
this.next=record.arg;}else 
if(record.type==="return"){
this.rval=record.arg;
this.next="end";}else 
if(record.type==="normal"&&afterLoc){
this.next=afterLoc;}},



finish:function finish(finallyLoc){
for(var i=this.tryEntries.length-1;i>=0;--i){
var entry=this.tryEntries[i];
if(entry.finallyLoc===finallyLoc){
this.complete(entry.completion,entry.afterLoc);
resetTryEntry(entry);
return ContinueSentinel;}}},




"catch":function _catch(tryLoc){
for(var i=this.tryEntries.length-1;i>=0;--i){
var entry=this.tryEntries[i];
if(entry.tryLoc===tryLoc){
var record=entry.completion;
if(record.type==="throw"){
var thrown=record.arg;
resetTryEntry(entry);}

return thrown;}}





throw new Error("illegal catch attempt");},


delegateYield:function delegateYield(iterable,resultName,nextLoc){
this.delegate={
iterator:values(iterable),
resultName:resultName,
nextLoc:nextLoc};


return ContinueSentinel;}};}(






typeof global==="object"?global:
typeof window==="object"?window:
typeof self==="object"?self:this);
});
__d(53 /* ExceptionsManager */, function(global, require, module, exports) {'use strict';












var exceptionID=0;




function reportException(e,isFatal){
var parseErrorStack=require(54 /* parseErrorStack */);
var RCTExceptionsManager=require(9 /* NativeModules */).ExceptionsManager;

var currentExceptionID=++exceptionID;
if(RCTExceptionsManager){
var stack=parseErrorStack(e);
if(isFatal){
RCTExceptionsManager.reportFatalException(e.message,stack,currentExceptionID);}else 
{
RCTExceptionsManager.reportSoftException(e.message,stack,currentExceptionID);}

if(__DEV__){
require(23 /* SourceMapsCache */).getSourceMaps().then(function(sourceMaps){
var prettyStack=parseErrorStack(e,sourceMaps);
RCTExceptionsManager.updateExceptionMessage(
e.message,
prettyStack,
currentExceptionID);}).


catch(function(error){


console.warn('Unable to load source map: '+error.message);});}}}








function handleException(e,isFatal){




if(!e.message){
e=new Error(e);}


(console._errorOriginal||console.error)(e.message);
reportException(e,isFatal);}






function installConsoleErrorReporter(){

if(console._errorOriginal){
return;}

console._errorOriginal=console.error.bind(console);
console.error=function reactConsoleError(){
console._errorOriginal.apply(null,arguments);
if(!console.reportErrorsAsExceptions){
return;}


if(arguments[0]&&arguments[0].stack){
reportException(arguments[0],false);}else 
{
var stringifySafe=require(11 /* stringifySafe */);
var str=Array.prototype.map.call(arguments,stringifySafe).join(', ');
if(str.slice(0,10)==='"Warning: '){



return;}

var error=new Error('console.error: '+str);
error.framesToPop=1;
reportException(error,false);}};


if(console.reportErrorsAsExceptions===undefined){
console.reportErrorsAsExceptions=true;}}



module.exports={handleException:handleException,installConsoleErrorReporter:installConsoleErrorReporter};
});
__d(54 /* parseErrorStack */, function(global, require, module, exports) {'use strict';











var stacktraceParser=require(241 /* stacktrace-parser */);

function resolveSourceMaps(sourceMapInstance,stackFrame){
try{
var orig=sourceMapInstance.originalPositionFor({
line:stackFrame.lineNumber,
column:stackFrame.column});

if(orig){

var queryStringStartIndex=orig.source.indexOf('?');
stackFrame.file=queryStringStartIndex===-1?
orig.source:
orig.source.substring(0,queryStringStartIndex);
stackFrame.lineNumber=orig.line;
stackFrame.column=orig.column;}}

catch(innerEx){}}



function parseErrorStack(e,sourceMaps){
if(!e||!e.stack){
return [];}


var stack=Array.isArray(e.stack)?e.stack:stacktraceParser.parse(e.stack);

var framesToPop=e.framesToPop||0;
while(framesToPop--){
stack.shift();}


if(sourceMaps){
sourceMaps.forEach(function(sourceMap,index){
stack.forEach(function(frame){
if(frame.file.indexOf(sourceMap.file)!==-1||
frame.file.replace('.map','.bundle').indexOf(
sourceMap.file)!==
-1){
resolveSourceMaps(sourceMap,frame);}});});}





return stack;}


module.exports=parseErrorStack;
});
__d(241 /* stacktrace-parser/index.js */, function(global, require, module, exports) {module.exports=require(250 /* ./lib/stacktrace-parser.js */);
});
__d(250 /* stacktrace-parser/lib/stacktrace-parser.js */, function(global, require, module, exports) {var 

UNKNOWN_FUNCTION='<unknown>';

var StackTraceParser={




parse:function parse(stackString){
var chrome=/^\s*at (?:(?:(?:Anonymous function)?|((?:\[object object\])?\S+(?: \[as \S+\])?)) )?\(?((?:file|http|https):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
gecko=/^(?:\s*(\S*)(?:\((.*?)\))?@)?(\S.*?):(\d+)(?::(\d+))?\s*$/i,
node=/^\s*at (?:((?:\[object object\])?\S+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i,
lines=stackString.split('\n'),
stack=[],
parts,
element;

for(var i=0,j=lines.length;i<j;++i){
if(parts=gecko.exec(lines[i])){
element={
'file':parts[3],
'methodName':parts[1]||UNKNOWN_FUNCTION,
'lineNumber':+parts[4],
'column':parts[5]?+parts[5]:null};}else 

if(parts=chrome.exec(lines[i])){
element={
'file':parts[2],
'methodName':parts[1]||UNKNOWN_FUNCTION,
'lineNumber':+parts[3],
'column':parts[4]?+parts[4]:null};}else 

if(parts=node.exec(lines[i])){
element={
'file':parts[2],
'methodName':parts[1]||UNKNOWN_FUNCTION,
'lineNumber':+parts[3],
'column':parts[4]?+parts[4]:null};}else 

{
continue;}


stack.push(element);}


return stack;}};




module.exports=StackTraceParser;
});
__d(55 /* Alert */, function(global, require, module, exports) {'use strict';












var AlertIOS=require(56 /* AlertIOS */);
var Platform=require(10 /* Platform */);
var DialogModuleAndroid=require(9 /* NativeModules */).DialogManagerAndroid;var 















































Alert=function(){function Alert(){babelHelpers.classCallCheck(this,Alert);}babelHelpers.createClass(Alert,null,[{key:'alert',value:function alert(


title,
message,
buttons,
type)
{
if(Platform.OS==='ios'){
if(typeof type!=='undefined'){
console.warn('Alert.alert() with a 4th "type" parameter is deprecated and will be removed. Use AlertIOS.prompt() instead.');
AlertIOS.alert(title,message,buttons,type);
return;}

AlertIOS.alert(title,message,buttons);}else 
if(Platform.OS==='android'){
AlertAndroid.alert(title,message,buttons);}}}]);return Alert;}();var 







AlertAndroid=function(){function AlertAndroid(){babelHelpers.classCallCheck(this,AlertAndroid);}babelHelpers.createClass(AlertAndroid,null,[{key:'alert',value:function alert(


title,
message,
buttons)
{
var config={
title:title||'',
message:message||''};



var validButtons=buttons?buttons.slice(0,3):[{text:'OK'}];
var buttonPositive=validButtons.pop();
var buttonNegative=validButtons.pop();
var buttonNeutral=validButtons.pop();
if(buttonNeutral){
config=babelHelpers.extends({},config,{buttonNeutral:buttonNeutral.text||''});}

if(buttonNegative){
config=babelHelpers.extends({},config,{buttonNegative:buttonNegative.text||''});}

if(buttonPositive){
config=babelHelpers.extends({},config,{buttonPositive:buttonPositive.text||''});}

DialogModuleAndroid.showAlert(
config,
function(errorMessage){return console.warn(message);},
function(action,buttonKey){
if(action!==DialogModuleAndroid.buttonClicked){
return;}

if(buttonKey===DialogModuleAndroid.buttonNeutral){
buttonNeutral.onPress&&buttonNeutral.onPress();}else 
if(buttonKey===DialogModuleAndroid.buttonNegative){
buttonNegative.onPress&&buttonNegative.onPress();}else 
if(buttonKey===DialogModuleAndroid.buttonPositive){
buttonPositive.onPress&&buttonPositive.onPress();}});}}]);return AlertAndroid;}();






module.exports=Alert;
});
__d(56 /* AlertIOS */, function(global, require, module, exports) {'use strict';












var RCTAlertManager=require(9 /* NativeModules */).AlertManager;var 






























AlertIOS=function(){function AlertIOS(){babelHelpers.classCallCheck(this,AlertIOS);}babelHelpers.createClass(AlertIOS,null,[{key:'alert',value:function alert(

























title,
message,
callbackOrButtons,
type)
{
if(typeof type!=='undefined'){
console.warn('AlertIOS.alert() with a 4th "type" parameter is deprecated and will be removed. Use AlertIOS.prompt() instead.');
this.prompt(title,message,callbackOrButtons,type);
return;}

this.prompt(title,message,callbackOrButtons,'default');}},{key:'prompt',value:function prompt(











































title,
message,
callbackOrButtons)


{var type=arguments.length<=3||arguments[3]===undefined?'plain-text':arguments[3];var defaultValue=arguments[4];
if(typeof type==='function'){
console.warn(
'You passed a callback function as the "type" argument to AlertIOS.prompt(). React Native is '+
'assuming  you want to use the deprecated AlertIOS.prompt(title, defaultValue, buttons, callback) '+
'signature. The current signature is AlertIOS.prompt(title, message, callbackOrButtons, type, defaultValue) '+
'and the old syntax will be removed in a future version.');

var callback=type;
var defaultValue=message;
RCTAlertManager.alertWithArgs({
title:title||undefined,
type:'plain-text',
defaultValue:defaultValue},
function(id,value){
callback(value);});

return;}


var callbacks=[];
var buttons=[];
var cancelButtonKey;
var destructiveButtonKey;
if(typeof callbackOrButtons==='function'){
callbacks=[callbackOrButtons];}else 

if(callbackOrButtons instanceof Array){
callbackOrButtons.forEach(function(btn,index){
callbacks[index]=btn.onPress;
if(btn.style==='cancel'){
cancelButtonKey=String(index);}else 
if(btn.style==='destructive'){
destructiveButtonKey=String(index);}

if(btn.text||index<(callbackOrButtons||[]).length-1){
var btnDef={};
btnDef[index]=btn.text||'';
buttons.push(btnDef);}});}




RCTAlertManager.alertWithArgs({
title:title||undefined,
message:message||undefined,
buttons:buttons,
type:type||undefined,
defaultValue:defaultValue,
cancelButtonKey:cancelButtonKey,
destructiveButtonKey:destructiveButtonKey},
function(id,value){
var cb=callbacks[id];
cb&&cb(value);});}}]);return AlertIOS;}();




module.exports=AlertIOS;
});
__d(57 /* XMLHttpRequest */, function(global, require, module, exports) {'use strict';












var FormData=require(58 /* FormData */);
var RCTNetworking=require(59 /* RCTNetworking */);
var XMLHttpRequestBase=require(60 /* XMLHttpRequestBase */);



function convertHeadersMapToArray(headers){
var headerArray=[];
for(var name in headers){
headerArray.push([name,headers[name]]);}

return headerArray;}var 


XMLHttpRequest=function(_XMLHttpRequestBase){babelHelpers.inherits(XMLHttpRequest,_XMLHttpRequestBase);function XMLHttpRequest(){babelHelpers.classCallCheck(this,XMLHttpRequest);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(XMLHttpRequest).apply(this,arguments));}babelHelpers.createClass(XMLHttpRequest,[{key:'sendImpl',value:function sendImpl(
method,url,headers,data,timeout){
var body;
if(typeof data==='string'){
body={string:data};}else 
if(data instanceof FormData){
body={
formData:data.getParts().map(function(part){
part.headers=convertHeadersMapToArray(part.headers);
return part;})};}else 


{
body=data;}

var useIncrementalUpdates=this.onreadystatechange?true:false;
var requestId=RCTNetworking.sendRequest(
method,
url,
convertHeadersMapToArray(headers),
body,
useIncrementalUpdates,
timeout);

this.didCreateRequest(requestId);}}]);return XMLHttpRequest;}(XMLHttpRequestBase);



module.exports=XMLHttpRequest;
});
__d(58 /* FormData */, function(global, require, module, exports) {'use strict';var 














































FormData=function(){


function FormData(){babelHelpers.classCallCheck(this,FormData);
this._parts=[];}babelHelpers.createClass(FormData,[{key:'append',value:function append(


key,value){





this._parts.push([key,value]);}},{key:'getParts',value:function getParts()


{
return this._parts.map(function(_ref){var _ref2=babelHelpers.slicedToArray(_ref,2);var name=_ref2[0];var value=_ref2[1];
var contentDisposition='form-data; name="'+name+'"';


var headers={'content-disposition':contentDisposition};





if(typeof value==='object'){
if(typeof value.name==='string'){
headers['content-disposition']+='; filename="'+value.name+'"';}

if(typeof value.type==='string'){
headers['content-type']=value.type;}

return babelHelpers.extends({},value,{headers:headers,fieldName:name});}


return {string:String(value),headers:headers,fieldName:name};});}}]);return FormData;}();




module.exports=FormData;
});
__d(59 /* RCTNetworking */, function(global, require, module, exports) {'use strict';













var RCTNetworkingNative=require(9 /* NativeModules */).Networking;

var _requestId=1;
var generateRequestId=function generateRequestId(){
return _requestId++;};var 






RCTNetworking=function(){function RCTNetworking(){babelHelpers.classCallCheck(this,RCTNetworking);}babelHelpers.createClass(RCTNetworking,null,[{key:'sendRequest',value:function sendRequest(

method,url,headers,data,useIncrementalUpdates,timeout){
var requestId=generateRequestId();
RCTNetworkingNative.sendRequest(
method,
url,
requestId,
headers,
data,
useIncrementalUpdates,
timeout);
return requestId;}},{key:'abortRequest',value:function abortRequest(


requestId){
RCTNetworkingNative.abortRequest(requestId);}},{key:'clearCookies',value:function clearCookies(


callback){
RCTNetworkingNative.clearCookies(callback);}}]);return RCTNetworking;}();



module.exports=RCTNetworking;
});
__d(60 /* XMLHttpRequestBase */, function(global, require, module, exports) {'use strict';












var RCTNetworking=require(59 /* RCTNetworking */);
var RCTDeviceEventEmitter=require(14 /* RCTDeviceEventEmitter */);
var invariant=require(222 /* fbjs/lib/invariant */);
var utf8=require(61 /* utf8 */);
var warning=require(232 /* fbjs/lib/warning */);




var UNSENT=0;
var OPENED=1;
var HEADERS_RECEIVED=2;
var LOADING=3;
var DONE=4;

var SUPPORTED_RESPONSE_TYPES={
arraybuffer:typeof global.ArrayBuffer==='function',
blob:typeof global.Blob==='function',
document:false,
json:true,
text:true,
'':true};var 





XMLHttpRequestBase=function(){












































function XMLHttpRequestBase(){babelHelpers.classCallCheck(this,XMLHttpRequestBase);
this.UNSENT=UNSENT;
this.OPENED=OPENED;
this.HEADERS_RECEIVED=HEADERS_RECEIVED;
this.LOADING=LOADING;
this.DONE=DONE;

this.onreadystatechange=null;
this.onload=null;
this.upload=undefined;
this.timeout=0;
this.ontimeout=null;
this.onerror=null;

this._reset();
this._method=null;
this._url=null;
this._aborted=false;
this._timedOut=false;
this._hasError=false;}babelHelpers.createClass(XMLHttpRequestBase,[{key:'_reset',value:function _reset()


{
this.readyState=this.UNSENT;
this.responseHeaders=undefined;
this.responseText='';
this.status=0;
delete this.responseURL;

this._requestId=null;

this._cachedResponse=undefined;
this._hasError=false;
this._headers={};
this._responseType='';
this._sent=false;
this._lowerCaseResponseHeaders={};

this._clearSubscriptions();
this._timedOut=false;}},{key:'didCreateRequest',value:function didCreateRequest(














































































requestId){var _this=this;
this._requestId=requestId;
this._subscriptions.push(RCTDeviceEventEmitter.addListener(
'didSendNetworkData',
function(args){var _didUploadProgress2;return (_didUploadProgress2=_this._didUploadProgress).call.apply(_didUploadProgress2,[_this].concat(babelHelpers.toConsumableArray(args)));}));

this._subscriptions.push(RCTDeviceEventEmitter.addListener(
'didReceiveNetworkResponse',
function(args){var _didReceiveResponse2;return (_didReceiveResponse2=_this._didReceiveResponse).call.apply(_didReceiveResponse2,[_this].concat(babelHelpers.toConsumableArray(args)));}));

this._subscriptions.push(RCTDeviceEventEmitter.addListener(
'didReceiveNetworkData',
function(args){var _didReceiveData2;return (_didReceiveData2=_this._didReceiveData).call.apply(_didReceiveData2,[_this].concat(babelHelpers.toConsumableArray(args)));}));

this._subscriptions.push(RCTDeviceEventEmitter.addListener(
'didCompleteNetworkResponse',
function(args){var _didCompleteResponse2;return (_didCompleteResponse2=_this._didCompleteResponse).call.apply(_didCompleteResponse2,[_this].concat(babelHelpers.toConsumableArray(args)));}));}},{key:'_didUploadProgress',value:function _didUploadProgress(



requestId,progress,total){
if(requestId===this._requestId&&this.upload&&this.upload.onprogress){
var event={
lengthComputable:true,
loaded:progress,
total:total};

this.upload.onprogress(event);}}},{key:'_didReceiveResponse',value:function _didReceiveResponse(



requestId,status,responseHeaders,responseURL){
if(requestId===this._requestId){
this.status=status;
this.setResponseHeaders(responseHeaders);
this.setReadyState(this.HEADERS_RECEIVED);
if(responseURL||responseURL===''){
this.responseURL=responseURL;}else 
{
delete this.responseURL;}}}},{key:'_didReceiveData',value:function _didReceiveData(




requestId,responseText){
if(requestId===this._requestId){
if(!this.responseText){
this.responseText=responseText;}else 
{
this.responseText+=responseText;}

this._cachedResponse=undefined;
this.setReadyState(this.LOADING);}}},{key:'_didCompleteResponse',value:function _didCompleteResponse(



requestId,error,timeOutError){
if(requestId===this._requestId){
if(error){
this.responseText=error;
this._hasError=true;
if(timeOutError){
this._timedOut=true;}}


this._clearSubscriptions();
this._requestId=null;
this.setReadyState(this.DONE);}}},{key:'_clearSubscriptions',value:function _clearSubscriptions()



{
(this._subscriptions||[]).forEach(function(sub){
sub.remove();});

this._subscriptions=[];}},{key:'getAllResponseHeaders',value:function getAllResponseHeaders()


{
if(!this.responseHeaders){

return null;}

var headers=this.responseHeaders||{};
return Object.keys(headers).map(function(headerName){
return headerName+': '+headers[headerName];}).
join('\n');}},{key:'getResponseHeader',value:function getResponseHeader(


header){
var value=this._lowerCaseResponseHeaders[header.toLowerCase()];
return value!==undefined?value:null;}},{key:'setRequestHeader',value:function setRequestHeader(


header,value){
if(this.readyState!==this.OPENED){
throw new Error('Request has not been opened');}

this._headers[header.toLowerCase()]=value;}},{key:'open',value:function open(


method,url,async){

if(this.readyState!==this.UNSENT){
throw new Error('Cannot open, already sending');}

if(async!==undefined&&!async){

throw new Error('Synchronous http requests are not supported');}

if(!url){
throw new Error('Cannot load an empty url');}

this._reset();
this._method=method.toUpperCase();
this._url=url;
this._aborted=false;
this.setReadyState(this.OPENED);}},{key:'sendImpl',value:function sendImpl(


method,url,headers,data,timeout){
throw new Error('Subclass must define sendImpl method');}},{key:'send',value:function send(


data){
if(this.readyState!==this.OPENED){
throw new Error('Request has not been opened');}

if(this._sent){
throw new Error('Request has already been sent');}

this._sent=true;
this.sendImpl(this._method,this._url,this._headers,data,this.timeout);}},{key:'abort',value:function abort()


{
this._aborted=true;
if(this._requestId){
RCTNetworking.abortRequest(this._requestId);}



if(!(this.readyState===this.UNSENT||
this.readyState===this.OPENED&&!this._sent||
this.readyState===this.DONE)){
this._reset();
this.setReadyState(this.DONE);}


this._reset();}},{key:'setResponseHeaders',value:function setResponseHeaders(


responseHeaders){
this.responseHeaders=responseHeaders||null;
var headers=responseHeaders||{};
this._lowerCaseResponseHeaders=
Object.keys(headers).reduce(function(lcaseHeaders,headerName){
lcaseHeaders[headerName.toLowerCase()]=headers[headerName];
return lcaseHeaders;},
{});}},{key:'setReadyState',value:function setReadyState(


newState){
this.readyState=newState;

var onreadystatechange=this.onreadystatechange;
if(onreadystatechange){


onreadystatechange.call(this,null);}

if(newState===this.DONE&&!this._aborted){
if(this._hasError){
if(this._timedOut){
this._sendEvent(this.ontimeout);}else 
{
this._sendEvent(this.onerror);}}else 


{
this._sendEvent(this.onload);}}}},{key:'_sendEvent',value:function _sendEvent(




newEvent){

if(newEvent){


newEvent(null);}}},{key:'responseType',get:function get(){return this._responseType;},set:function set(responseType){if(this.readyState>HEADERS_RECEIVED){throw new Error("Failed to set the 'responseType' property on 'XMLHttpRequest': The "+"response type cannot be set if the object's state is LOADING or DONE");}if(!SUPPORTED_RESPONSE_TYPES.hasOwnProperty(responseType)){warning('The provided value \''+responseType+'\' is not a valid \'responseType\'.');return;}invariant(SUPPORTED_RESPONSE_TYPES[responseType]||responseType==='document','The provided value \''+responseType+'\' is unsupported in this environment.');this._responseType=responseType;}},{key:'response',get:function get(){var responseType=this.responseType;if(responseType===''||responseType==='text'){return this.readyState<LOADING||this._hasError?'':this.responseText;}if(this.readyState!==DONE){return null;}if(this._cachedResponse!==undefined){return this._cachedResponse;}switch(this.responseType){case 'document':this._cachedResponse=null;break;case 'arraybuffer':this._cachedResponse=toArrayBuffer(this.responseText,this.getResponseHeader('content-type')||'');break;case 'blob':this._cachedResponse=new global.Blob([this.responseText],{type:this.getResponseHeader('content-type')||''});break;case 'json':try{this._cachedResponse=JSON.parse(this.responseText);}catch(_){this._cachedResponse=null;}break;default:this._cachedResponse=null;}return this._cachedResponse;}}]);return XMLHttpRequestBase;}();




XMLHttpRequestBase.UNSENT=UNSENT;
XMLHttpRequestBase.OPENED=OPENED;
XMLHttpRequestBase.HEADERS_RECEIVED=HEADERS_RECEIVED;
XMLHttpRequestBase.LOADING=LOADING;
XMLHttpRequestBase.DONE=DONE;

function toArrayBuffer(text,contentType){var 
length=text.length;
if(length===0){
return new ArrayBuffer(0);}


var charsetMatch=contentType.match(/;\s*charset=([^;]*)/i);
var charset=charsetMatch?charsetMatch[1].trim():'utf-8';

if(/^utf-?8$/i.test(charset)){
return utf8.encode(text);}else 
{
var array=new Uint8Array(length);
for(var i=0;i<length;i++){
array[i]=text.charCodeAt(i);}

return array.buffer;}}



module.exports=XMLHttpRequestBase;
});
__d(61 /* utf8 */, function(global, require, module, exports) {'use strict';var 












ByteVector=function(){



function ByteVector(size){babelHelpers.classCallCheck(this,ByteVector);
this._storage=new Uint8Array(size);
this._sizeWritten=0;}babelHelpers.createClass(ByteVector,[{key:'push',value:function push(


value){
var i=this._sizeWritten;
if(i===this._storage.length){
this._realloc();}

this._storage[i]=value;
this._sizeWritten=i+1;
return this;}},{key:'getBuffer',value:function getBuffer()


{
return this._storage.buffer.slice(0,this._sizeWritten);}},{key:'_realloc',value:function _realloc()


{
var storage=this._storage;
this._storage=new Uint8Array(align(storage.length*1.5));
this._storage.set(storage);}}]);return ByteVector;}();




exports.encode=function(string){var 
length=string.length;
var bytes=new ByteVector(length);









var nextCodePoint=string.charCodeAt(0);
for(var i=0;i<length;i++){
var codePoint=nextCodePoint;
nextCodePoint=string.charCodeAt(i+1);

if(codePoint<0x80){
bytes.push(codePoint);}else 
if(codePoint<0x800){
bytes.
push(0xc0|codePoint>>>6).
push(0x80|codePoint&0x3f);}else 
if(codePoint>>>10===0x36&&nextCodePoint>>>10===0x37){
codePoint=0x10000+((codePoint&0x3ff)<<10|nextCodePoint&0x3ff);
bytes.
push(0xf0|codePoint>>>18&0x7).
push(0x80|codePoint>>>12&0x3f).
push(0x80|codePoint>>>6&0x3f).
push(0x80|codePoint&0x3f);

i+=1;
nextCodePoint=string.charCodeAt(i+1);}else 
{
bytes.
push(0xe0|codePoint>>>12).
push(0x80|codePoint>>>6&0x3f).
push(0x80|codePoint&0x3f);}}


return bytes.getBuffer();};



function align(size){
return size%8?Math.floor(size/8)+1<<3:size;}
});
__d(62 /* fetch */, function(global, require, module, exports) {'use strict';
















var self={};

/**
 * Copyright (c) 2014 GitHub, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @preserve-header
 */
(function(){
'use strict';

if(self.fetch){
return;}


function normalizeName(name){
if(typeof name!=='string'){
name=String(name);}

if(/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)){
throw new TypeError('Invalid character in header field name');}

return name.toLowerCase();}


function normalizeValue(value){
if(typeof value!=='string'){
value=String(value);}

return value;}


function Headers(headers){
this.map={};

if(headers instanceof Headers){
headers.forEach(function(value,name){
this.append(name,value);},
this);}else 

if(headers){
Object.getOwnPropertyNames(headers).forEach(function(name){
this.append(name,headers[name]);},
this);}}



Headers.prototype.append=function(name,value){
name=normalizeName(name);
value=normalizeValue(value);
var list=this.map[name];
if(!list){
list=[];
this.map[name]=list;}

list.push(value);};


Headers.prototype['delete']=function(name){
delete this.map[normalizeName(name)];};


Headers.prototype.get=function(name){
var values=this.map[normalizeName(name)];
return values?values[0]:null;};


Headers.prototype.getAll=function(name){
return this.map[normalizeName(name)]||[];};


Headers.prototype.has=function(name){
return this.map.hasOwnProperty(normalizeName(name));};


Headers.prototype.set=function(name,value){
this.map[normalizeName(name)]=[normalizeValue(value)];};


Headers.prototype.forEach=function(callback,thisArg){
Object.getOwnPropertyNames(this.map).forEach(function(name){
this.map[name].forEach(function(value){
callback.call(thisArg,value,name,this);},
this);},
this);};


function consumed(body){
if(body.bodyUsed){
return Promise.reject(new TypeError('Already read'));}

body.bodyUsed=true;}


function fileReaderReady(reader){
return new Promise(function(resolve,reject){
reader.onload=function(){
resolve(reader.result);};

reader.onerror=function(){
reject(reader.error);};});}




function readBlobAsArrayBuffer(blob){
var reader=new FileReader();
reader.readAsArrayBuffer(blob);
return fileReaderReady(reader);}


function readBlobAsText(blob){
var reader=new FileReader();
reader.readAsText(blob);
return fileReaderReady(reader);}


var support={
blob:typeof FileReader==='function'&&typeof Blob==='function'&&function(){
try{
new Blob();
return true;}
catch(e){
return false;}}(),


formData:typeof FormData==='function',
arrayBuffer:typeof ArrayBuffer==='function'};


function Body(){
this.bodyUsed=false;

this._initBody=function(body){
this._bodyInit=body;
if(typeof body==='string'){
this._bodyText=body;}else 
if(support.blob&&Blob.prototype.isPrototypeOf(body)){
this._bodyBlob=body;}else 
if(support.formData&&FormData.prototype.isPrototypeOf(body)){
this._bodyFormData=body;}else 
if(!body){
this._bodyText='';}else 
if(support.arrayBuffer&&ArrayBuffer.prototype.isPrototypeOf(body)){}else 


{
throw new Error('unsupported BodyInit type');}


if(!this.headers.get('content-type')){
if(typeof body==='string'){
this.headers.set('content-type','text/plain;charset=UTF-8');}else 
if(this._bodyBlob&&this._bodyBlob.type){
this.headers.set('content-type',this._bodyBlob.type);}}};




if(support.blob){
this.blob=function(){
var rejected=consumed(this);
if(rejected){
return rejected;}


if(this._bodyBlob){
return Promise.resolve(this._bodyBlob);}else 
if(this._bodyFormData){
throw new Error('could not read FormData body as blob');}else 
{
return Promise.resolve(new Blob([this._bodyText]));}};



this.arrayBuffer=function(){
return this.blob().then(readBlobAsArrayBuffer);};


this.text=function(){
var rejected=consumed(this);
if(rejected){
return rejected;}


if(this._bodyBlob){
return readBlobAsText(this._bodyBlob);}else 
if(this._bodyFormData){
throw new Error('could not read FormData body as text');}else 
{
return Promise.resolve(this._bodyText);}};}else 


{
this.text=function(){
var rejected=consumed(this);
return rejected?rejected:Promise.resolve(this._bodyText);};}



if(support.formData){
this.formData=function(){
return this.text().then(decode);};}



this.json=function(){
return this.text().then(JSON.parse);};


return this;}



var methods=['DELETE','GET','HEAD','OPTIONS','POST','PUT'];

function normalizeMethod(method){
var upcased=method.toUpperCase();
return methods.indexOf(upcased)>-1?upcased:method;}


function Request(input,options){
options=options||{};
var body=options.body;
if(Request.prototype.isPrototypeOf(input)){
if(input.bodyUsed){
throw new TypeError('Already read');}

this.url=input.url;
this.credentials=input.credentials;
if(!options.headers){
this.headers=new Headers(input.headers);}

this.method=input.method;
this.mode=input.mode;
if(!body){
body=input._bodyInit;
input.bodyUsed=true;}}else 

{
this.url=input;}


this.credentials=options.credentials||this.credentials||'omit';
if(options.headers||!this.headers){
this.headers=new Headers(options.headers);}

this.method=normalizeMethod(options.method||this.method||'GET');
this.mode=options.mode||this.mode||null;
this.referrer=null;

if((this.method==='GET'||this.method==='HEAD')&&body){
throw new TypeError('Body not allowed for GET or HEAD requests');}

this._initBody(body);}


Request.prototype.clone=function(){
return new Request(this);};


function decode(body){
var form=new FormData();
body.trim().split('&').forEach(function(bytes){
if(bytes){
var split=bytes.split('=');
var name=split.shift().replace(/\+/g,' ');
var value=split.join('=').replace(/\+/g,' ');
form.append(decodeURIComponent(name),decodeURIComponent(value));}});


return form;}


function headers(xhr){
var head=new Headers();
var pairs=xhr.getAllResponseHeaders().trim().split('\n');
pairs.forEach(function(header){
var split=header.trim().split(':');
var key=split.shift().trim();
var value=split.join(':').trim();
head.append(key,value);});

return head;}


Body.call(Request.prototype);

function Response(bodyInit,options){
if(!options){
options={};}


this.type='default';
this.status=options.status;
this.ok=this.status>=200&&this.status<300;
this.statusText=options.statusText;
this.headers=options.headers instanceof Headers?options.headers:new Headers(options.headers);
this.url=options.url||'';
this._initBody(bodyInit);}

Body.call(Response.prototype);

Response.prototype.clone=function(){
return new Response(this._bodyInit,{
status:this.status,
statusText:this.statusText,
headers:new Headers(this.headers),
url:this.url});};



Response.error=function(){
var response=new Response(null,{status:0,statusText:''});
response.type='error';
return response;};


var redirectStatuses=[301,302,303,307,308];

Response.redirect=function(url,status){
if(redirectStatuses.indexOf(status)===-1){
throw new RangeError('Invalid status code');}


return new Response(null,{status:status,headers:{location:url}});};


self.Headers=Headers;
self.Request=Request;
self.Response=Response;

self.fetch=function(input,init){
return new Promise(function(resolve,reject){
var request;
if(Request.prototype.isPrototypeOf(input)&&!init){
request=input;}else 
{
request=new Request(input,init);}


var xhr=new XMLHttpRequest();

function responseURL(){
if('responseURL' in xhr){
return xhr.responseURL;}



if(/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())){
return xhr.getResponseHeader('X-Request-URL');}


return;}


xhr.onload=function(){
var status=xhr.status===1223?204:xhr.status;
if(status<100||status>599){
reject(new TypeError('Network request failed'));
return;}


var options={
status:status,
statusText:xhr.statusText,
headers:headers(xhr),
url:responseURL()};

var body='response' in xhr?xhr.response:xhr.responseText;
resolve(new Response(body,options));};


xhr.onerror=function(){
reject(new TypeError('Network request failed'));};


xhr.open(request.method,request.url,true);

if(request.credentials==='include'){
xhr.withCredentials=true;}


if('responseType' in xhr&&support.blob){
xhr.responseType='blob';}


request.headers.forEach(function(value,name){
xhr.setRequestHeader(name,value);});


xhr.send(typeof request._bodyInit==='undefined'?null:request._bodyInit);});};


self.fetch.polyfill=true;})();



module.exports=self;
});
__d(63 /* Geolocation */, function(global, require, module, exports) {'use strict';












var RCTDeviceEventEmitter=require(14 /* RCTDeviceEventEmitter */);
var RCTLocationObserver=require(9 /* NativeModules */).LocationObserver;

var invariant=require(222 /* fbjs/lib/invariant */);
var logError=require(64 /* logError */);
var warning=require(232 /* fbjs/lib/warning */);

var subscriptions=[];

var updatesEnabled=false;
























var Geolocation={







getCurrentPosition:function getCurrentPosition(
geo_success,
geo_error,
geo_options)
{
invariant(
typeof geo_success==='function',
'Must provide a valid geo_success callback.');

RCTLocationObserver.getCurrentPosition(
geo_options||{},
geo_success,
geo_error||logError);},







watchPosition:function watchPosition(success,error,options){
if(!updatesEnabled){
RCTLocationObserver.startObserving(options||{});
updatesEnabled=true;}

var watchID=subscriptions.length;
subscriptions.push([
RCTDeviceEventEmitter.addListener(
'geolocationDidChange',
success),

error?RCTDeviceEventEmitter.addListener(
'geolocationError',
error):
null]);

return watchID;},


clearWatch:function clearWatch(watchID){
var sub=subscriptions[watchID];
if(!sub){


return;}


sub[0].remove();

var sub1=sub[1];sub1&&sub1.remove();
subscriptions[watchID]=undefined;
var noWatchers=true;
for(var ii=0;ii<subscriptions.length;ii++){
if(subscriptions[ii]){
noWatchers=false;}}


if(noWatchers){
Geolocation.stopObserving();}},



stopObserving:function stopObserving(){
if(updatesEnabled){
RCTLocationObserver.stopObserving();
updatesEnabled=false;
for(var ii=0;ii<subscriptions.length;ii++){
var sub=subscriptions[ii];
if(sub){
warning('Called stopObserving with existing subscriptions.');
sub[0].remove();

var sub1=sub[1];sub1&&sub1.remove();}}


subscriptions=[];}}};




module.exports=Geolocation;
});
__d(64 /* logError */, function(global, require, module, exports) {'use strict';

















var logError=function logError(){
if(arguments.length===1&&arguments[0] instanceof Error){
var err=arguments[0];
console.error('Error: "'+err.message+'".  Stack:\n'+err.stack);}else 
{
console.error.apply(console,arguments);}};



module.exports=logError;
});
__d(65 /* Map */, function(global, require, module, exports) {var 



















guid=require(66 /* guid */);
var isNode=require(239 /* fbjs/lib/isNode */);
var toIterator=require(67 /* toIterator */);
var _shouldPolyfillES6Collection=require(68 /* _shouldPolyfillES6Collection */);

module.exports=function(global,undefined){




if(!_shouldPolyfillES6Collection('Map')){
return global.Map;}

























































var KIND_KEY='key';
var KIND_VALUE='value';
var KIND_KEY_VALUE='key+value';



var KEY_PREFIX='$map_';



var SECRET_SIZE_PROP;
if(__DEV__){
SECRET_SIZE_PROP='$size'+guid();}



var OLD_IE_HASH_PREFIX='IE_HASH_';var 

Map=function(){










function Map(iterable){babelHelpers.classCallCheck(this,Map);
if(!isObject(this)){
throw new TypeError('Wrong map object type.');}


initMap(this);

if(iterable!=null){
var it=toIterator(iterable);
var next;
while(!(next=it.next()).done){
if(!isObject(next.value)){
throw new TypeError('Expected iterable items to be pair objects.');}

this.set(next.value[0],next.value[1]);}}}babelHelpers.createClass(Map,[{key:'clear',value:function clear()








{
initMap(this);}},{key:'has',value:function has(









key){
var index=getIndex(this,key);
return !!(index!=null&&this._mapData[index]);}},{key:'set',value:function set(










key,value){
var index=getIndex(this,key);

if(index!=null&&this._mapData[index]){
this._mapData[index][1]=value;}else 
{
index=this._mapData.push([
key,
value])-
1;
setIndex(this,key,index);
if(__DEV__){
this[SECRET_SIZE_PROP]+=1;}else 
{
this.size+=1;}}



return this;}},{key:'get',value:function get(









key){
var index=getIndex(this,key);
if(index==null){
return undefined;}else 
{
return this._mapData[index][1];}}},{key:'delete',value:function _delete(











key){
var index=getIndex(this,key);
if(index!=null&&this._mapData[index]){
setIndex(this,key,undefined);
this._mapData[index]=undefined;
if(__DEV__){
this[SECRET_SIZE_PROP]-=1;}else 
{
this.size-=1;}

return true;}else 
{
return false;}}},{key:'entries',value:function entries()










{
return new MapIterator(this,KIND_KEY_VALUE);}},{key:'keys',value:function keys()








{
return new MapIterator(this,KIND_KEY);}},{key:'values',value:function values()








{
return new MapIterator(this,KIND_VALUE);}},{key:'forEach',value:function forEach(











callback,thisArg){
if(typeof callback!=='function'){
throw new TypeError('Callback must be callable.');}


var boundCallback=callback.bind(thisArg||undefined);
var mapData=this._mapData;




for(var i=0;i<mapData.length;i++){
var entry=mapData[i];
if(entry!=null){
boundCallback(entry[1],entry[0],this);}}}}]);return Map;}();






Map.prototype[toIterator.ITERATOR_SYMBOL]=Map.prototype.entries;var 

MapIterator=function(){









function MapIterator(map,kind){babelHelpers.classCallCheck(this,MapIterator);
if(!(isObject(map)&&map['_mapData'])){
throw new TypeError('Object is not a map.');}


if([KIND_KEY,KIND_KEY_VALUE,KIND_VALUE].indexOf(kind)===-1){
throw new Error('Invalid iteration kind.');}


this._map=map;
this._nextIndex=0;
this._kind=kind;}babelHelpers.createClass(MapIterator,[{key:'next',value:function next()








{
if(!this instanceof Map){
throw new TypeError('Expected to be called on a MapIterator.');}


var map=this._map;
var index=this._nextIndex;
var kind=this._kind;

if(map==null){
return createIterResultObject(undefined,true);}


var entries=map['_mapData'];

while(index<entries.length){
var record=entries[index];

index+=1;
this._nextIndex=index;

if(record){
if(kind===KIND_KEY){
return createIterResultObject(record[0],false);}else 
if(kind===KIND_VALUE){
return createIterResultObject(record[1],false);}else 
if(kind){
return createIterResultObject(record,false);}}}




this._map=undefined;

return createIterResultObject(undefined,true);}}]);return MapIterator;}();






MapIterator.prototype[toIterator.ITERATOR_SYMBOL]=function(){
return this;};













function getIndex(map,key){
if(isObject(key)){
var hash=getHash(key);
return map._objectIndex[hash];}else 
{
var prefixedKey=KEY_PREFIX+key;
if(typeof key==='string'){
return map._stringIndex[prefixedKey];}else 
{
return map._otherIndex[prefixedKey];}}}










function setIndex(map,key,index){
var shouldDelete=index==null;

if(isObject(key)){
var hash=getHash(key);
if(shouldDelete){
delete map._objectIndex[hash];}else 
{
map._objectIndex[hash]=index;}}else 

{
var prefixedKey=KEY_PREFIX+key;
if(typeof key==='string'){
if(shouldDelete){
delete map._stringIndex[prefixedKey];}else 
{
map._stringIndex[prefixedKey]=index;}}else 

{
if(shouldDelete){
delete map._otherIndex[prefixedKey];}else 
{
map._otherIndex[prefixedKey]=index;}}}}










function initMap(map){






map._mapData=[];







map._objectIndex={};


map._stringIndex={};


map._otherIndex={};







if(__DEV__){
if(isES5){



if(map.hasOwnProperty(SECRET_SIZE_PROP)){
map[SECRET_SIZE_PROP]=0;}else 
{
Object.defineProperty(map,SECRET_SIZE_PROP,{
value:0,
writable:true});

Object.defineProperty(map,'size',{
set:function set(v){
console.error(
'PLEASE FIX ME: You are changing the map size property which '+
'should not be writable and will break in production.');

throw new Error('The map size property is not writable.');},

get:function get(){return map[SECRET_SIZE_PROP];}});}




return;}}





map.size=0;}








function isObject(o){
return o!=null&&(typeof o==='object'||typeof o==='function');}









function createIterResultObject(value,done){
return {value:value,done:done};}



var isES5=function(){
try{
Object.defineProperty({},'x',{});
return true;}
catch(e){
return false;}}();









function isExtensible(o){
if(!isES5){
return true;}else 
{
return Object.isExtensible(o);}}











function getIENodeHash(node){
var uniqueID;
switch(node.nodeType){
case 1:
uniqueID=node.uniqueID;
break;
case 9:
uniqueID=node.documentElement.uniqueID;
break;
default:
return null;}


if(uniqueID){
return OLD_IE_HASH_PREFIX+uniqueID;}else 
{
return null;}}



var getHash=function(){
var propIsEnumerable=Object.prototype.propertyIsEnumerable;
var hashProperty=guid();
var hashCounter=0;







return function getHash(o){
if(o[hashProperty]){
return o[hashProperty];}else 
if(!isES5&&
o.propertyIsEnumerable&&
o.propertyIsEnumerable[hashProperty]){
return o.propertyIsEnumerable[hashProperty];}else 
if(!isES5&&
isNode(o)&&
getIENodeHash(o)){
return getIENodeHash(o);}else 
if(!isES5&&o[hashProperty]){
return o[hashProperty];}


if(isExtensible(o)){
hashCounter+=1;
if(isES5){
Object.defineProperty(o,hashProperty,{
enumerable:false,
writable:false,
configurable:false,
value:hashCounter});}else 

if(o.propertyIsEnumerable){




o.propertyIsEnumerable=function(){
return propIsEnumerable.apply(this,arguments);};

o.propertyIsEnumerable[hashProperty]=hashCounter;}else 
if(isNode(o)){




o[hashProperty]=hashCounter;}else 
{
throw new Error('Unable to set a non-enumerable property on object.');}

return hashCounter;}else 
{
throw new Error('Non-extensible objects are not allowed as keys.');}};}();




return Map;}(
Function('return this')());
});
__d(66 /* guid */, function(global, require, module, exports) {function 

























guid(){
return 'f'+(Math.random()*(1<<30)).toString(16).replace('.','');}


module.exports=guid;
});
__d(239 /* fbjs/lib/isNode.js */, function(global, require, module, exports) {'use strict';
















function isNode(object){
return !!(object&&(typeof Node==='function'?object instanceof Node:typeof object==='object'&&typeof object.nodeType==='number'&&typeof object.nodeName==='string'));}


module.exports=isNode;
});
__d(67 /* toIterator */, function(global, require, module, exports) {var 






























KIND_KEY='key';
var KIND_VALUE='value';
var KIND_KEY_VAL='key+value';

var ITERATOR_SYMBOL=typeof Symbol==='function'?typeof Symbol==='function'?
Symbol.iterator:'@@iterator':
'@@iterator';

var toIterator=function(){
if(!(Array.prototype[ITERATOR_SYMBOL]&&
String.prototype[ITERATOR_SYMBOL])){

return function(){var 
ArrayIterator=function(){

function ArrayIterator(array,kind){babelHelpers.classCallCheck(this,ArrayIterator);
if(!Array.isArray(array)){
throw new TypeError('Object is not an Array');}

this._iteratedObject=array;
this._kind=kind;
this._nextIndex=0;}babelHelpers.createClass(ArrayIterator,[{key:'next',value:function next()



{
if(!this instanceof ArrayIterator){
throw new TypeError('Object is not an ArrayIterator');}


if(this._iteratedObject==null){
return createIterResultObject(undefined,true);}


var array=this._iteratedObject;
var len=this._iteratedObject.length;
var index=this._nextIndex;
var kind=this._kind;

if(index>=len){
this._iteratedObject=undefined;
return createIterResultObject(undefined,true);}


this._nextIndex=index+1;

if(kind===KIND_KEY){
return createIterResultObject(index,false);}else 
if(kind===KIND_VALUE){
return createIterResultObject(array[index],false);}else 
if(kind===KIND_KEY_VAL){
return createIterResultObject([index,array[index]],false);}}},{key:




'@@iterator',value:function iterator(){
return this;}}]);return ArrayIterator;}();var 



StringIterator=function(){

function StringIterator(string){babelHelpers.classCallCheck(this,StringIterator);
if(typeof string!=='string'){
throw new TypeError('Object is not a string');}

this._iteratedString=string;
this._nextIndex=0;}babelHelpers.createClass(StringIterator,[{key:'next',value:function next()



{
if(!this instanceof StringIterator){
throw new TypeError('Object is not a StringIterator');}


if(this._iteratedString==null){
return createIterResultObject(undefined,true);}


var index=this._nextIndex;
var s=this._iteratedString;
var len=s.length;

if(index>=len){
this._iteratedString=undefined;
return createIterResultObject(undefined,true);}


var ret;
var first=s.charCodeAt(index);

if(first<0xD800||first>0xDBFF||index+1===len){
ret=s[index];}else 
{
var second=s.charCodeAt(index+1);
if(second<0xDC00||second>0xDFFF){
ret=s[index];}else 
{
ret=s[index]+s[index+1];}}



this._nextIndex=index+ret.length;

return createIterResultObject(ret,false);}},{key:



'@@iterator',value:function iterator(){
return this;}}]);return StringIterator;}();




function createIterResultObject(value,done){
return {value:value,done:done};}


return function(object,kind){
if(typeof object==='string'){
return new StringIterator(object);}else 
if(Array.isArray(object)){
return new ArrayIterator(object,kind||KIND_VALUE);}else 
{
return object[ITERATOR_SYMBOL]();}};}();}else 



{
return function(object){
return object[ITERATOR_SYMBOL]();};}}();








babelHelpers.extends(toIterator,{
KIND_KEY:KIND_KEY,
KIND_VALUE:KIND_VALUE,
KIND_KEY_VAL:KIND_KEY_VAL,
ITERATOR_SYMBOL:ITERATOR_SYMBOL});


module.exports=toIterator;
});
__d(68 /* _shouldPolyfillES6Collection */, function(global, require, module, exports) {function 
























shouldPolyfillES6Collection(collectionName){
var Collection=global[collectionName];
if(Collection==null){
return true;}






if(typeof global.Symbol!=='function'){
return true;}


var proto=Collection.prototype;




return Collection==null||
typeof Collection!=='function'||
typeof proto.clear!=='function'||
new Collection().size!==0||
typeof proto.keys!=='function'||
typeof proto.forEach!=='function';}


module.exports=shouldPolyfillES6Collection;
});
__d(69 /* Set */, function(global, require, module, exports) {var 



















Map=require(65 /* Map */);
var toIterator=require(67 /* toIterator */);
var _shouldPolyfillES6Collection=require(68 /* _shouldPolyfillES6Collection */);

module.exports=function(global,undefined){





if(!_shouldPolyfillES6Collection('Set')){
return global.Set;}var 











































Set=function(){










function Set(iterable){babelHelpers.classCallCheck(this,Set);
if(this==null||
typeof this!=='object'&&typeof this!=='function'){
throw new TypeError('Wrong set object type.');}


initSet(this);

if(iterable!=null){
var it=toIterator(iterable);
var next;
while(!(next=it.next()).done){
this.add(next.value);}}}babelHelpers.createClass(Set,[{key:'add',value:function add(












value){
this._map.set(value,value);
this.size=this._map.size;
return this;}},{key:'clear',value:function clear()







{
initSet(this);}},{key:'delete',value:function _delete(











value){
var ret=this._map.delete(value);
this.size=this._map.size;
return ret;}},{key:'entries',value:function entries()







{
return this._map.entries();}},{key:'forEach',value:function forEach(









callback){
var thisArg=arguments[1];
var it=this._map.keys();
var next;
while(!(next=it.next()).done){
callback.call(thisArg,next.value,next.value,this);}}},{key:'has',value:function has(











value){
return this._map.has(value);}},{key:'values',value:function values()







{
return this._map.values();}}]);return Set;}();




Set.prototype[toIterator.ITERATOR_SYMBOL]=Set.prototype.values;


Set.prototype.keys=Set.prototype.values;

function initSet(set){
set._map=new Map();
set.size=set._map.size;}


return Set;}(
Function('return this')());
});
__d(70 /* setupDevtools */, function(global, require, module, exports) {'use strict';












function setupDevtools(){
var messageListeners=[];
var closeListeners=[];
var ws=new window.WebSocket('ws://localhost:8097/devtools');

var FOR_BACKEND={
resolveRNStyle:require(71 /* flattenStyle */),
wall:{
listen:function listen(fn){
messageListeners.push(fn);},

onClose:function onClose(fn){
closeListeners.push(fn);},

send:function send(data){
ws.send(JSON.stringify(data));}}};



ws.onclose=handleClose;
ws.onerror=handleClose;
ws.onopen=function(){
tryToConnect();};


var hasClosed=false;
function handleClose(){
if(!hasClosed){
hasClosed=true;
setTimeout(setupDevtools,2000);
closeListeners.forEach(function(fn){return fn();});}}



function tryToConnect(){
ws.send('attach:agent');
var _interval=setInterval(function(){return ws.send('attach:agent');},500);
ws.onmessage=function(evt){
if(evt.data.indexOf('eval:')===0){
clearInterval(_interval);
initialize(evt.data.slice('eval:'.length));}};}




function initialize(text){
try{

eval(text);}
catch(e){
console.error('Failed to eval: '+e.message);
return;}

window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
CurrentOwner:require(33 /* ReactCurrentOwner */),
InstanceHandles:require(37 /* ReactInstanceHandles */),
Mount:require(73 /* ReactNativeMount */),
Reconciler:require(75 /* ReactReconciler */),
TextComponent:require(92 /* ReactNativeTextComponent */)});

ws.onmessage=handleMessage;}


function handleMessage(evt){


var data;
try{
data=JSON.parse(evt.data);}
catch(e){
return console.error('failed to parse json: '+evt.data);}


if(data.$close||data.$error){
closeListeners.forEach(function(fn){return fn();});
window.__REACT_DEVTOOLS_GLOBAL_HOOK__.emit('shutdown');
tryToConnect();
return;}

if(data.$open){
return;}

messageListeners.forEach(function(fn){
try{
fn(data);}
catch(e){



console.log(data);
throw e;}});}}





module.exports=setupDevtools;
});
__d(71 /* flattenStyle */, function(global, require, module, exports) {'use strict';












var ReactNativePropRegistry=require(72 /* ReactNativePropRegistry */);
var invariant=require(222 /* fbjs/lib/invariant */);



function getStyle(style){
if(typeof style==='number'){
return ReactNativePropRegistry.getByID(style);}

return style;}


function flattenStyle(style){
if(!style){
return undefined;}

invariant(style!==true,'style may be false but not true');

if(!Array.isArray(style)){
return getStyle(style);}


var result={};
for(var i=0,styleLength=style.length;i<styleLength;++i){
var computedStyle=flattenStyle(style[i]);
if(computedStyle){
for(var key in computedStyle){
result[key]=computedStyle[key];}}}



return result;}


module.exports=flattenStyle;
});
__d(72 /* ReactNativePropRegistry */, function(global, require, module, exports) {'use strict';












var objects={};
var uniqueID=1;
var emptyObject={};var 

ReactNativePropRegistry=function(){function ReactNativePropRegistry(){babelHelpers.classCallCheck(this,ReactNativePropRegistry);}babelHelpers.createClass(ReactNativePropRegistry,null,[{key:'register',value:function register(
object){
var id=++uniqueID;
if(__DEV__){
Object.freeze(object);}

objects[id]=object;
return id;}},{key:'getByID',value:function getByID(


id){
if(!id){


return emptyObject;}


var object=objects[id];
if(!object){
console.warn('Invalid style with id `'+id+'`. Skipping ...');
return emptyObject;}

return object;}}]);return ReactNativePropRegistry;}();



module.exports=ReactNativePropRegistry;
});
__d(73 /* ReactNativeMount */, function(global, require, module, exports) {'use strict';












var ReactElement=require(32 /* ReactElement */);
var ReactNativeTagHandles=require(74 /* ReactNativeTagHandles */);
var ReactPerf=require(5 /* ReactPerf */);
var ReactReconciler=require(75 /* ReactReconciler */);
var ReactUpdateQueue=require(78 /* ReactUpdateQueue */);
var ReactUpdates=require(80 /* ReactUpdates */);
var UIManager=require(83 /* UIManager */);

var emptyObject=require(238 /* fbjs/lib/emptyObject */);
var instantiateReactComponent=require(85 /* instantiateReactComponent */);
var shouldUpdateReactComponent=require(88 /* shouldUpdateReactComponent */);

function instanceNumberToChildRootID(rootNodeID,instanceNumber){
return rootNodeID+'['+instanceNumber+']';}







var TopLevelWrapper=function TopLevelWrapper(){};
TopLevelWrapper.prototype.isReactComponent={};
if(__DEV__){
TopLevelWrapper.displayName='TopLevelWrapper';}

TopLevelWrapper.prototype.render=function(){

return this.props;};










function mountComponentIntoNode(
componentInstance,
rootID,
container,
transaction){
var markup=ReactReconciler.mountComponent(
componentInstance,rootID,transaction,emptyObject);

componentInstance._renderedComponent._topLevelWrapper=componentInstance;
ReactNativeMount._mountImageIntoNode(markup,container);}









function batchedMountComponentIntoNode(
componentInstance,
rootID,
container){
var transaction=ReactUpdates.ReactReconcileTransaction.getPooled();
transaction.perform(
mountComponentIntoNode,
null,
componentInstance,
rootID,
container,
transaction);

ReactUpdates.ReactReconcileTransaction.release(transaction);}






var ReactNativeMount={
instanceCount:0,

_instancesByContainerID:{},


findNodeHandle:require(84 /* findNodeHandle */),
nativeTagToRootNodeID:function nativeTagToRootNodeID(nativeTag){
return ReactNativeTagHandles.tagToRootNodeID[nativeTag];},






renderComponent:function renderComponent(
nextElement,
containerTag,
callback)
{
var nextWrappedElement=new ReactElement(
TopLevelWrapper,
null,
null,
null,
null,
null,
nextElement);


var topRootNodeID=ReactNativeTagHandles.tagToRootNodeID[containerTag];
if(topRootNodeID){
var prevComponent=ReactNativeMount._instancesByContainerID[topRootNodeID];
if(prevComponent){
var prevWrappedElement=prevComponent._currentElement;
var prevElement=prevWrappedElement.props;
if(shouldUpdateReactComponent(prevElement,nextElement)){
ReactUpdateQueue.enqueueElementInternal(prevComponent,nextWrappedElement);
if(callback){
ReactUpdateQueue.enqueueCallbackInternal(prevComponent,callback);}

return prevComponent;}else 
{
ReactNativeMount.unmountComponentAtNode(containerTag);}}}




if(!ReactNativeTagHandles.reactTagIsNativeTopRootID(containerTag)){
console.error('You cannot render into anything but a top root');
return;}


var topRootNodeID=ReactNativeTagHandles.allocateRootNodeIDForTag(containerTag);
ReactNativeTagHandles.associateRootNodeIDWithMountedNodeHandle(
topRootNodeID,
containerTag);


var instance=instantiateReactComponent(nextWrappedElement);
ReactNativeMount._instancesByContainerID[topRootNodeID]=instance;

var childRootNodeID=instanceNumberToChildRootID(
topRootNodeID,
ReactNativeMount.instanceCount++);






ReactUpdates.batchedUpdates(
batchedMountComponentIntoNode,
instance,
childRootNodeID,
topRootNodeID);

var component=instance.getPublicInstance();
if(callback){
callback.call(component);}

return component;},






_mountImageIntoNode:ReactPerf.measure(

'ReactComponentBrowserEnvironment',
'mountImageIntoNode',
function(mountImage,containerID){


ReactNativeTagHandles.associateRootNodeIDWithMountedNodeHandle(
mountImage.rootNodeID,
mountImage.tag);

UIManager.setChildren(
ReactNativeTagHandles.mostRecentMountedNodeHandleForRootNodeID(containerID),
[mountImage.tag]);}),












unmountComponentAtNodeAndRemoveContainer:function unmountComponentAtNodeAndRemoveContainer(
containerTag)
{
ReactNativeMount.unmountComponentAtNode(containerTag);

UIManager.removeRootView(containerTag);},







unmountComponentAtNode:function unmountComponentAtNode(containerTag){
if(!ReactNativeTagHandles.reactTagIsNativeTopRootID(containerTag)){
console.error('You cannot render into anything but a top root');
return false;}


var containerID=ReactNativeTagHandles.tagToRootNodeID[containerTag];
var instance=ReactNativeMount._instancesByContainerID[containerID];
if(!instance){
return false;}

ReactNativeMount.unmountComponentFromNode(instance,containerID);
delete ReactNativeMount._instancesByContainerID[containerID];
return true;},











unmountComponentFromNode:function unmountComponentFromNode(
instance,
containerID)
{

ReactReconciler.unmountComponent(instance);
var containerTag=
ReactNativeTagHandles.mostRecentMountedNodeHandleForRootNodeID(containerID);
UIManager.removeSubviewsFromContainerWithID(containerTag);},


getNode:function getNode(rootNodeID){
return ReactNativeTagHandles.rootNodeIDToTag[rootNodeID];},


getID:function getID(nativeTag){
return ReactNativeTagHandles.tagToRootNodeID[nativeTag];}};



ReactNativeMount.renderComponent=ReactPerf.measure(
'ReactMount',
'_renderNewRootComponent',
ReactNativeMount.renderComponent);


module.exports=ReactNativeMount;
});
__d(74 /* ReactNativeTagHandles */, function(global, require, module, exports) {'use strict';












var invariant=require(222 /* fbjs/lib/invariant */);
var warning=require(232 /* fbjs/lib/warning */);














var INITIAL_TAG_COUNT=1;
var NATIVE_TOP_ROOT_ID_SEPARATOR='{TOP_LEVEL}';
var ReactNativeTagHandles={
tagsStartAt:INITIAL_TAG_COUNT,
tagCount:INITIAL_TAG_COUNT,

allocateTag:function allocateTag(){

while(this.reactTagIsNativeTopRootID(ReactNativeTagHandles.tagCount)){
ReactNativeTagHandles.tagCount++;}

var tag=ReactNativeTagHandles.tagCount;
ReactNativeTagHandles.tagCount++;
return tag;},











associateRootNodeIDWithMountedNodeHandle:function associateRootNodeIDWithMountedNodeHandle(
rootNodeID,
tag)
{
warning(rootNodeID&&tag,'Root node or tag is null when associating');
if(rootNodeID&&tag){
ReactNativeTagHandles.tagToRootNodeID[tag]=rootNodeID;
ReactNativeTagHandles.rootNodeIDToTag[rootNodeID]=tag;}},



allocateRootNodeIDForTag:function allocateRootNodeIDForTag(tag){
invariant(
this.reactTagIsNativeTopRootID(tag),
'Expect a native root tag, instead got ',tag);

return '.r['+tag+']'+NATIVE_TOP_ROOT_ID_SEPARATOR;},


reactTagIsNativeTopRootID:function reactTagIsNativeTopRootID(reactTag){

return reactTag%10===1;},


getNativeTopRootIDFromNodeID:function getNativeTopRootIDFromNodeID(nodeID){
if(!nodeID){
return null;}

var index=nodeID.indexOf(NATIVE_TOP_ROOT_ID_SEPARATOR);
if(index===-1){
return null;}

return nodeID.substr(0,index+NATIVE_TOP_ROOT_ID_SEPARATOR.length);},














mostRecentMountedNodeHandleForRootNodeID:function mostRecentMountedNodeHandleForRootNodeID(
rootNodeID)
{
return ReactNativeTagHandles.rootNodeIDToTag[rootNodeID];},


tagToRootNodeID:[],

rootNodeIDToTag:{}};


module.exports=ReactNativeTagHandles;
});
__d(75 /* ReactReconciler */, function(global, require, module, exports) {'use strict';












var ReactRef=require(76 /* ./ReactRef */);





function attachRefs(){
ReactRef.attachRefs(this,this._currentElement);}


var ReactReconciler={











mountComponent:function mountComponent(internalInstance,rootID,transaction,context){
var markup=internalInstance.mountComponent(rootID,transaction,context);
if(internalInstance._currentElement&&internalInstance._currentElement.ref!=null){
transaction.getReactMountReady().enqueue(attachRefs,internalInstance);}

return markup;},








unmountComponent:function unmountComponent(internalInstance){
ReactRef.detachRefs(internalInstance,internalInstance._currentElement);
internalInstance.unmountComponent();},











receiveComponent:function receiveComponent(internalInstance,nextElement,transaction,context){
var prevElement=internalInstance._currentElement;

if(nextElement===prevElement&&context===internalInstance._context){










return;}


var refsChanged=ReactRef.shouldUpdateRefs(prevElement,nextElement);

if(refsChanged){
ReactRef.detachRefs(internalInstance,prevElement);}


internalInstance.receiveComponent(nextElement,transaction,context);

if(refsChanged&&internalInstance._currentElement&&internalInstance._currentElement.ref!=null){
transaction.getReactMountReady().enqueue(attachRefs,internalInstance);}},










performUpdateIfNecessary:function performUpdateIfNecessary(internalInstance,transaction){
internalInstance.performUpdateIfNecessary(transaction);}};




module.exports=ReactReconciler;
});
__d(76 /* ReactRef */, function(global, require, module, exports) {'use strict';












var ReactOwner=require(77 /* ./ReactOwner */);

var ReactRef={};

function attachRef(ref,component,owner){
if(typeof ref==='function'){
ref(component.getPublicInstance());}else 
{

ReactOwner.addComponentAsRefTo(component,ref,owner);}}



function detachRef(ref,component,owner){
if(typeof ref==='function'){
ref(null);}else 
{

ReactOwner.removeComponentAsRefFrom(component,ref,owner);}}



ReactRef.attachRefs=function(instance,element){
if(element===null||element===false){
return;}

var ref=element.ref;
if(ref!=null){
attachRef(ref,instance,element._owner);}};



ReactRef.shouldUpdateRefs=function(prevElement,nextElement){












var prevEmpty=prevElement===null||prevElement===false;
var nextEmpty=nextElement===null||nextElement===false;

return (

prevEmpty||nextEmpty||nextElement._owner!==prevElement._owner||nextElement.ref!==prevElement.ref);};



ReactRef.detachRefs=function(instance,element){
if(element===null||element===false){
return;}

var ref=element.ref;
if(ref!=null){
detachRef(ref,instance,element._owner);}};



module.exports=ReactRef;
});
__d(77 /* ReactOwner */, function(global, require, module, exports) {'use strict';












var invariant=require(242 /* fbjs/lib/invariant */);































var ReactOwner={






isValidOwner:function isValidOwner(object){
return !!(object&&typeof object.attachRef==='function'&&typeof object.detachRef==='function');},











addComponentAsRefTo:function addComponentAsRefTo(component,ref,owner){
!ReactOwner.isValidOwner(owner)?process.env.NODE_ENV!=='production'?invariant(false,'addComponentAsRefTo(...): Only a ReactOwner can have refs. You might '+'be adding a ref to a component that was not created inside a component\'s '+'`render` method, or you have multiple copies of React loaded '+'(details: https://fb.me/react-refs-must-have-owner).'):invariant(false):undefined;
owner.attachRef(ref,component);},











removeComponentAsRefFrom:function removeComponentAsRefFrom(component,ref,owner){
!ReactOwner.isValidOwner(owner)?process.env.NODE_ENV!=='production'?invariant(false,'removeComponentAsRefFrom(...): Only a ReactOwner can have refs. You might '+'be removing a ref to a component that was not created inside a component\'s '+'`render` method, or you have multiple copies of React loaded '+'(details: https://fb.me/react-refs-must-have-owner).'):invariant(false):undefined;


if(owner.getPublicInstance().refs[ref]===component.getPublicInstance()){
owner.detachRef(ref);}}};





module.exports=ReactOwner;
});
__d(78 /* ReactUpdateQueue */, function(global, require, module, exports) {'use strict';












var ReactCurrentOwner=require(33 /* ./ReactCurrentOwner */);
var ReactElement=require(32 /* ./ReactElement */);
var ReactInstanceMap=require(79 /* ./ReactInstanceMap */);
var ReactUpdates=require(80 /* ./ReactUpdates */);

var assign=require(34 /* ./Object.assign */);
var invariant=require(242 /* fbjs/lib/invariant */);
var warning=require(240 /* fbjs/lib/warning */);

function enqueueUpdate(internalInstance){
ReactUpdates.enqueueUpdate(internalInstance);}


function getInternalInstanceReadyForUpdate(publicInstance,callerName){
var internalInstance=ReactInstanceMap.get(publicInstance);
if(!internalInstance){
if(process.env.NODE_ENV!=='production'){



process.env.NODE_ENV!=='production'?warning(!callerName,'%s(...): Can only update a mounted or mounting component. '+'This usually means you called %s() on an unmounted component. '+'This is a no-op. Please check the code for the %s component.',callerName,callerName,publicInstance.constructor.displayName):undefined;}

return null;}


if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(ReactCurrentOwner.current==null,'%s(...): Cannot update during an existing state transition '+'(such as within `render`). Render methods should be a pure function '+'of props and state.',callerName):undefined;}


return internalInstance;}






var ReactUpdateQueue={








isMounted:function isMounted(publicInstance){
if(process.env.NODE_ENV!=='production'){
var owner=ReactCurrentOwner.current;
if(owner!==null){
process.env.NODE_ENV!=='production'?warning(owner._warnedAboutRefsInRender,'%s is accessing isMounted inside its render() function. '+'render() should be a pure function of props and state. It should '+'never access something that requires stale data from the previous '+'render, such as refs. Move this logic to componentDidMount and '+'componentDidUpdate instead.',owner.getName()||'A component'):undefined;
owner._warnedAboutRefsInRender=true;}}


var internalInstance=ReactInstanceMap.get(publicInstance);
if(internalInstance){



return !!internalInstance._renderedComponent;}else 
{
return false;}},











enqueueCallback:function enqueueCallback(publicInstance,callback){
!(typeof callback==='function')?process.env.NODE_ENV!=='production'?invariant(false,'enqueueCallback(...): You called `setProps`, `replaceProps`, '+'`setState`, `replaceState`, or `forceUpdate` with a callback that '+'isn\'t callable.'):invariant(false):undefined;
var internalInstance=getInternalInstanceReadyForUpdate(publicInstance);






if(!internalInstance){
return null;}


if(internalInstance._pendingCallbacks){
internalInstance._pendingCallbacks.push(callback);}else 
{
internalInstance._pendingCallbacks=[callback];}





enqueueUpdate(internalInstance);},


enqueueCallbackInternal:function enqueueCallbackInternal(internalInstance,callback){
!(typeof callback==='function')?process.env.NODE_ENV!=='production'?invariant(false,'enqueueCallback(...): You called `setProps`, `replaceProps`, '+'`setState`, `replaceState`, or `forceUpdate` with a callback that '+'isn\'t callable.'):invariant(false):undefined;
if(internalInstance._pendingCallbacks){
internalInstance._pendingCallbacks.push(callback);}else 
{
internalInstance._pendingCallbacks=[callback];}

enqueueUpdate(internalInstance);},















enqueueForceUpdate:function enqueueForceUpdate(publicInstance){
var internalInstance=getInternalInstanceReadyForUpdate(publicInstance,'forceUpdate');

if(!internalInstance){
return;}


internalInstance._pendingForceUpdate=true;

enqueueUpdate(internalInstance);},













enqueueReplaceState:function enqueueReplaceState(publicInstance,completeState){
var internalInstance=getInternalInstanceReadyForUpdate(publicInstance,'replaceState');

if(!internalInstance){
return;}


internalInstance._pendingStateQueue=[completeState];
internalInstance._pendingReplaceState=true;

enqueueUpdate(internalInstance);},












enqueueSetState:function enqueueSetState(publicInstance,partialState){
var internalInstance=getInternalInstanceReadyForUpdate(publicInstance,'setState');

if(!internalInstance){
return;}


var queue=internalInstance._pendingStateQueue||(internalInstance._pendingStateQueue=[]);
queue.push(partialState);

enqueueUpdate(internalInstance);},









enqueueSetProps:function enqueueSetProps(publicInstance,partialProps){
var internalInstance=getInternalInstanceReadyForUpdate(publicInstance,'setProps');
if(!internalInstance){
return;}

ReactUpdateQueue.enqueueSetPropsInternal(internalInstance,partialProps);},


enqueueSetPropsInternal:function enqueueSetPropsInternal(internalInstance,partialProps){
var topLevelWrapper=internalInstance._topLevelWrapper;
!topLevelWrapper?process.env.NODE_ENV!=='production'?invariant(false,'setProps(...): You called `setProps` on a '+'component with a parent. This is an anti-pattern since props will '+'get reactively updated when rendered. Instead, change the owner\'s '+'`render` method to pass the correct value as props to the component '+'where it is created.'):invariant(false):undefined;



var wrapElement=topLevelWrapper._pendingElement||topLevelWrapper._currentElement;
var element=wrapElement.props;
var props=assign({},element.props,partialProps);
topLevelWrapper._pendingElement=ReactElement.cloneAndReplaceProps(wrapElement,ReactElement.cloneAndReplaceProps(element,props));

enqueueUpdate(topLevelWrapper);},









enqueueReplaceProps:function enqueueReplaceProps(publicInstance,props){
var internalInstance=getInternalInstanceReadyForUpdate(publicInstance,'replaceProps');
if(!internalInstance){
return;}

ReactUpdateQueue.enqueueReplacePropsInternal(internalInstance,props);},


enqueueReplacePropsInternal:function enqueueReplacePropsInternal(internalInstance,props){
var topLevelWrapper=internalInstance._topLevelWrapper;
!topLevelWrapper?process.env.NODE_ENV!=='production'?invariant(false,'replaceProps(...): You called `replaceProps` on a '+'component with a parent. This is an anti-pattern since props will '+'get reactively updated when rendered. Instead, change the owner\'s '+'`render` method to pass the correct value as props to the component '+'where it is created.'):invariant(false):undefined;



var wrapElement=topLevelWrapper._pendingElement||topLevelWrapper._currentElement;
var element=wrapElement.props;
topLevelWrapper._pendingElement=ReactElement.cloneAndReplaceProps(wrapElement,ReactElement.cloneAndReplaceProps(element,props));

enqueueUpdate(topLevelWrapper);},


enqueueElementInternal:function enqueueElementInternal(internalInstance,newElement){
internalInstance._pendingElement=newElement;
enqueueUpdate(internalInstance);}};




module.exports=ReactUpdateQueue;
});
__d(79 /* ReactInstanceMap */, function(global, require, module, exports) {'use strict';




















var ReactInstanceMap={






remove:function remove(key){
key._reactInternalInstance=undefined;},


get:function get(key){
return key._reactInternalInstance;},


has:function has(key){
return key._reactInternalInstance!==undefined;},


set:function set(key,value){
key._reactInternalInstance=value;}};




module.exports=ReactInstanceMap;
});
__d(80 /* ReactUpdates */, function(global, require, module, exports) {'use strict';












var CallbackQueue=require(81 /* ./CallbackQueue */);
var PooledClass=require(31 /* ./PooledClass */);
var ReactPerf=require(5 /* ./ReactPerf */);
var ReactReconciler=require(75 /* ./ReactReconciler */);
var Transaction=require(82 /* ./Transaction */);

var assign=require(34 /* ./Object.assign */);
var invariant=require(242 /* fbjs/lib/invariant */);

var dirtyComponents=[];
var asapCallbackQueue=CallbackQueue.getPooled();
var asapEnqueued=false;

var batchingStrategy=null;

function ensureInjected(){
!(ReactUpdates.ReactReconcileTransaction&&batchingStrategy)?process.env.NODE_ENV!=='production'?invariant(false,'ReactUpdates: must inject a reconcile transaction class and batching '+'strategy'):invariant(false):undefined;}


var NESTED_UPDATES={
initialize:function initialize(){
this.dirtyComponentsLength=dirtyComponents.length;},

close:function close(){
if(this.dirtyComponentsLength!==dirtyComponents.length){





dirtyComponents.splice(0,this.dirtyComponentsLength);
flushBatchedUpdates();}else 
{
dirtyComponents.length=0;}}};




var UPDATE_QUEUEING={
initialize:function initialize(){
this.callbackQueue.reset();},

close:function close(){
this.callbackQueue.notifyAll();}};



var TRANSACTION_WRAPPERS=[NESTED_UPDATES,UPDATE_QUEUEING];

function ReactUpdatesFlushTransaction(){
this.reinitializeTransaction();
this.dirtyComponentsLength=null;
this.callbackQueue=CallbackQueue.getPooled();
this.reconcileTransaction=ReactUpdates.ReactReconcileTransaction.getPooled(false);}


assign(ReactUpdatesFlushTransaction.prototype,Transaction.Mixin,{
getTransactionWrappers:function getTransactionWrappers(){
return TRANSACTION_WRAPPERS;},


destructor:function destructor(){
this.dirtyComponentsLength=null;
CallbackQueue.release(this.callbackQueue);
this.callbackQueue=null;
ReactUpdates.ReactReconcileTransaction.release(this.reconcileTransaction);
this.reconcileTransaction=null;},


perform:function perform(method,scope,a){


return Transaction.Mixin.perform.call(this,this.reconcileTransaction.perform,this.reconcileTransaction,method,scope,a);}});



PooledClass.addPoolingTo(ReactUpdatesFlushTransaction);

function batchedUpdates(callback,a,b,c,d,e){
ensureInjected();
batchingStrategy.batchedUpdates(callback,a,b,c,d,e);}









function mountOrderComparator(c1,c2){
return c1._mountOrder-c2._mountOrder;}


function runBatchedUpdates(transaction){
var len=transaction.dirtyComponentsLength;
!(len===dirtyComponents.length)?process.env.NODE_ENV!=='production'?invariant(false,'Expected flush transaction\'s stored dirty-components length (%s) to '+'match dirty-components array length (%s).',len,dirtyComponents.length):invariant(false):undefined;




dirtyComponents.sort(mountOrderComparator);

for(var i=0;i<len;i++){



var component=dirtyComponents[i];




var callbacks=component._pendingCallbacks;
component._pendingCallbacks=null;

ReactReconciler.performUpdateIfNecessary(component,transaction.reconcileTransaction);

if(callbacks){
for(var j=0;j<callbacks.length;j++){
transaction.callbackQueue.enqueue(callbacks[j],component.getPublicInstance());}}}}





var flushBatchedUpdates=function flushBatchedUpdates(){




while(dirtyComponents.length||asapEnqueued){
if(dirtyComponents.length){
var transaction=ReactUpdatesFlushTransaction.getPooled();
transaction.perform(runBatchedUpdates,null,transaction);
ReactUpdatesFlushTransaction.release(transaction);}


if(asapEnqueued){
asapEnqueued=false;
var queue=asapCallbackQueue;
asapCallbackQueue=CallbackQueue.getPooled();
queue.notifyAll();
CallbackQueue.release(queue);}}};



flushBatchedUpdates=ReactPerf.measure('ReactUpdates','flushBatchedUpdates',flushBatchedUpdates);





function enqueueUpdate(component){
ensureInjected();







if(!batchingStrategy.isBatchingUpdates){
batchingStrategy.batchedUpdates(enqueueUpdate,component);
return;}


dirtyComponents.push(component);}






function asap(callback,context){
!batchingStrategy.isBatchingUpdates?process.env.NODE_ENV!=='production'?invariant(false,'ReactUpdates.asap: Can\'t enqueue an asap callback in a context where'+'updates are not being batched.'):invariant(false):undefined;
asapCallbackQueue.enqueue(callback,context);
asapEnqueued=true;}


var ReactUpdatesInjection={
injectReconcileTransaction:function injectReconcileTransaction(ReconcileTransaction){
!ReconcileTransaction?process.env.NODE_ENV!=='production'?invariant(false,'ReactUpdates: must provide a reconcile transaction class'):invariant(false):undefined;
ReactUpdates.ReactReconcileTransaction=ReconcileTransaction;},


injectBatchingStrategy:function injectBatchingStrategy(_batchingStrategy){
!_batchingStrategy?process.env.NODE_ENV!=='production'?invariant(false,'ReactUpdates: must provide a batching strategy'):invariant(false):undefined;
!(typeof _batchingStrategy.batchedUpdates==='function')?process.env.NODE_ENV!=='production'?invariant(false,'ReactUpdates: must provide a batchedUpdates() function'):invariant(false):undefined;
!(typeof _batchingStrategy.isBatchingUpdates==='boolean')?process.env.NODE_ENV!=='production'?invariant(false,'ReactUpdates: must provide an isBatchingUpdates boolean attribute'):invariant(false):undefined;
batchingStrategy=_batchingStrategy;}};



var ReactUpdates={






ReactReconcileTransaction:null,

batchedUpdates:batchedUpdates,
enqueueUpdate:enqueueUpdate,
flushBatchedUpdates:flushBatchedUpdates,
injection:ReactUpdatesInjection,
asap:asap};


module.exports=ReactUpdates;
});
__d(81 /* CallbackQueue */, function(global, require, module, exports) {'use strict';












var PooledClass=require(31 /* ./PooledClass */);

var assign=require(34 /* ./Object.assign */);
var invariant=require(242 /* fbjs/lib/invariant */);












function CallbackQueue(){
this._callbacks=null;
this._contexts=null;}


assign(CallbackQueue.prototype,{








enqueue:function enqueue(callback,context){
this._callbacks=this._callbacks||[];
this._contexts=this._contexts||[];
this._callbacks.push(callback);
this._contexts.push(context);},








notifyAll:function notifyAll(){
var callbacks=this._callbacks;
var contexts=this._contexts;
if(callbacks){
!(callbacks.length===contexts.length)?process.env.NODE_ENV!=='production'?invariant(false,'Mismatched list of contexts in callback queue'):invariant(false):undefined;
this._callbacks=null;
this._contexts=null;
for(var i=0;i<callbacks.length;i++){
callbacks[i].call(contexts[i]);}

callbacks.length=0;
contexts.length=0;}},








reset:function reset(){
this._callbacks=null;
this._contexts=null;},





destructor:function destructor(){
this.reset();}});




PooledClass.addPoolingTo(CallbackQueue);

module.exports=CallbackQueue;
});
__d(82 /* Transaction */, function(global, require, module, exports) {'use strict';












var invariant=require(242 /* fbjs/lib/invariant */);






























































var Mixin={







reinitializeTransaction:function reinitializeTransaction(){
this.transactionWrappers=this.getTransactionWrappers();
if(this.wrapperInitData){
this.wrapperInitData.length=0;}else 
{
this.wrapperInitData=[];}

this._isInTransaction=false;},


_isInTransaction:false,





getTransactionWrappers:null,

isInTransaction:function isInTransaction(){
return !!this._isInTransaction;},



















perform:function perform(method,scope,a,b,c,d,e,f){
!!this.isInTransaction()?process.env.NODE_ENV!=='production'?invariant(false,'Transaction.perform(...): Cannot initialize a transaction when there '+'is already an outstanding transaction.'):invariant(false):undefined;
var errorThrown;
var ret;
try{
this._isInTransaction=true;




errorThrown=true;
this.initializeAll(0);
ret=method.call(scope,a,b,c,d,e,f);
errorThrown=false;}finally 
{
try{
if(errorThrown){


try{
this.closeAll(0);}
catch(err){}}else 
{


this.closeAll(0);}}finally 

{
this._isInTransaction=false;}}


return ret;},


initializeAll:function initializeAll(startIndex){
var transactionWrappers=this.transactionWrappers;
for(var i=startIndex;i<transactionWrappers.length;i++){
var wrapper=transactionWrappers[i];
try{




this.wrapperInitData[i]=Transaction.OBSERVED_ERROR;
this.wrapperInitData[i]=wrapper.initialize?wrapper.initialize.call(this):null;}finally 
{
if(this.wrapperInitData[i]===Transaction.OBSERVED_ERROR){



try{
this.initializeAll(i+1);}
catch(err){}}}}},











closeAll:function closeAll(startIndex){
!this.isInTransaction()?process.env.NODE_ENV!=='production'?invariant(false,'Transaction.closeAll(): Cannot close transaction when none are open.'):invariant(false):undefined;
var transactionWrappers=this.transactionWrappers;
for(var i=startIndex;i<transactionWrappers.length;i++){
var wrapper=transactionWrappers[i];
var initData=this.wrapperInitData[i];
var errorThrown;
try{




errorThrown=true;
if(initData!==Transaction.OBSERVED_ERROR&&wrapper.close){
wrapper.close.call(this,initData);}

errorThrown=false;}finally 
{
if(errorThrown){



try{
this.closeAll(i+1);}
catch(e){}}}}



this.wrapperInitData.length=0;}};



var Transaction={

Mixin:Mixin,




OBSERVED_ERROR:{}};



module.exports=Transaction;
});
__d(83 /* UIManager */, function(global, require, module, exports) {'use strict';












var UIManager=require(9 /* NativeModules */).UIManager;
var findNodeHandle=require(84 /* findNodeHandle */);

if(!UIManager.setChildren){




UIManager._cachedIndexArray=function(size){
var cachedResult=this._cachedIndexArray._cache[size];
if(!cachedResult){
var arr=[];
for(var i=0;i<size;i++){
arr[i]=i;}

this._cachedIndexArray._cache[size]=arr;
return arr;}else 
{
return cachedResult;}};


UIManager._cachedIndexArray._cache={};




UIManager.setChildren=function(containerTag,createdTags){
var indexes=this._cachedIndexArray(createdTags.length);
UIManager.manageChildren(containerTag,null,null,createdTags,indexes,null);};}



var _takeSnapshot=UIManager.takeSnapshot;


















UIManager.takeSnapshot=function _callee(
view,
options){return regeneratorRuntime.async(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:if(






_takeSnapshot){_context.next=3;break;}
console.warn('UIManager.takeSnapshot is not available on this platform');return _context.abrupt('return');case 3:


if(typeof view!=='number'&&view!=='window'){
view=findNodeHandle(view)||'window';}return _context.abrupt('return',

_takeSnapshot(view,options));case 5:case 'end':return _context.stop();}}},null,this);};


module.exports=UIManager;
});
__d(84 /* findNodeHandle */, function(global, require, module, exports) {'use strict';













var ReactCurrentOwner=require(33 /* ReactCurrentOwner */);
var ReactInstanceMap=require(79 /* ReactInstanceMap */);
var ReactNativeTagHandles=require(74 /* ReactNativeTagHandles */);

var invariant=require(222 /* fbjs/lib/invariant */);
var warning=require(232 /* fbjs/lib/warning */);































function findNodeHandle(componentOrHandle){
if(__DEV__){
var owner=ReactCurrentOwner.current;
if(owner!==null){
warning(
owner._warnedAboutRefsInRender,
'%s is accessing findNodeHandle inside its render(). '+
'render() should be a pure function of props and state. It should '+
'never access something that requires stale data from the previous '+
'render, such as refs. Move this logic to componentDidMount and '+
'componentDidUpdate instead.',
owner.getName()||'A component');

owner._warnedAboutRefsInRender=true;}}


if(componentOrHandle==null){
return null;}

if(typeof componentOrHandle==='number'){

return componentOrHandle;}


var component=componentOrHandle;



var internalInstance=ReactInstanceMap.get(component);
if(internalInstance){
return ReactNativeTagHandles.rootNodeIDToTag[internalInstance._rootNodeID];}else 
{
var rootNodeID=component._rootNodeID;
if(rootNodeID){
return ReactNativeTagHandles.rootNodeIDToTag[rootNodeID];}else 
{
invariant(


typeof component==='object'&&
'_rootNodeID' in component||


component.render!=null&&
typeof component.render==='function',

'findNodeHandle(...): Argument is not a component '+
'(type: %s, keys: %s)',
typeof component,
Object.keys(component));

invariant(
false,
'findNodeHandle(...): Unable to find node handle for unmounted '+
'component.');}}}





module.exports=findNodeHandle;
});
__d(238 /* fbjs/lib/emptyObject.js */, function(global, require, module, exports) {'use strict';











var emptyObject={};

if(process.env.NODE_ENV!=='production'){
Object.freeze(emptyObject);}


module.exports=emptyObject;
});
__d(85 /* instantiateReactComponent */, function(global, require, module, exports) {'use strict';













var ReactCompositeComponent=require(86 /* ./ReactCompositeComponent */);
var ReactEmptyComponent=require(89 /* ./ReactEmptyComponent */);
var ReactNativeComponent=require(91 /* ./ReactNativeComponent */);

var assign=require(34 /* ./Object.assign */);
var invariant=require(242 /* fbjs/lib/invariant */);
var warning=require(240 /* fbjs/lib/warning */);


var ReactCompositeComponentWrapper=function ReactCompositeComponentWrapper(){};
assign(ReactCompositeComponentWrapper.prototype,ReactCompositeComponent.Mixin,{
_instantiateReactComponent:instantiateReactComponent});


function getDeclarationErrorAddendum(owner){
if(owner){
var name=owner.getName();
if(name){
return ' Check the render method of `'+name+'`.';}}


return '';}









function isInternalComponentType(type){
return typeof type==='function'&&typeof type.prototype!=='undefined'&&typeof type.prototype.mountComponent==='function'&&typeof type.prototype.receiveComponent==='function';}









function instantiateReactComponent(node){
var instance;

if(node===null||node===false){
instance=new ReactEmptyComponent(instantiateReactComponent);}else 
if(typeof node==='object'){
var element=node;
!(element&&(typeof element.type==='function'||typeof element.type==='string'))?process.env.NODE_ENV!=='production'?invariant(false,'Element type is invalid: expected a string (for built-in components) '+'or a class/function (for composite components) but got: %s.%s',element.type==null?element.type:typeof element.type,getDeclarationErrorAddendum(element._owner)):invariant(false):undefined;


if(typeof element.type==='string'){
instance=ReactNativeComponent.createInternalComponent(element);}else 
if(isInternalComponentType(element.type)){



instance=new element.type(element);}else 
{
instance=new ReactCompositeComponentWrapper();}}else 

if(typeof node==='string'||typeof node==='number'){
instance=ReactNativeComponent.createInstanceForText(node);}else 
{
!false?process.env.NODE_ENV!=='production'?invariant(false,'Encountered invalid React node of type %s',typeof node):invariant(false):undefined;}


if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(typeof instance.construct==='function'&&typeof instance.mountComponent==='function'&&typeof instance.receiveComponent==='function'&&typeof instance.unmountComponent==='function','Only React Components can be mounted.'):undefined;}



instance.construct(node);




instance._mountIndex=0;
instance._mountImage=null;

if(process.env.NODE_ENV!=='production'){
instance._isOwnerNecessary=false;
instance._warnedAboutRefsInRender=false;}




if(process.env.NODE_ENV!=='production'){
if(Object.preventExtensions){
Object.preventExtensions(instance);}}



return instance;}


module.exports=instantiateReactComponent;
});
__d(86 /* ReactCompositeComponent */, function(global, require, module, exports) {'use strict';












var ReactComponentEnvironment=require(87 /* ./ReactComponentEnvironment */);
var ReactCurrentOwner=require(33 /* ./ReactCurrentOwner */);
var ReactElement=require(32 /* ./ReactElement */);
var ReactInstanceMap=require(79 /* ./ReactInstanceMap */);
var ReactPerf=require(5 /* ./ReactPerf */);
var ReactPropTypeLocations=require(43 /* ./ReactPropTypeLocations */);
var ReactPropTypeLocationNames=require(44 /* ./ReactPropTypeLocationNames */);
var ReactReconciler=require(75 /* ./ReactReconciler */);
var ReactUpdateQueue=require(78 /* ./ReactUpdateQueue */);

var assign=require(34 /* ./Object.assign */);
var emptyObject=require(230 /* fbjs/lib/emptyObject */);
var invariant=require(242 /* fbjs/lib/invariant */);
var shouldUpdateReactComponent=require(88 /* ./shouldUpdateReactComponent */);
var warning=require(240 /* fbjs/lib/warning */);

function getDeclarationErrorAddendum(component){
var owner=component._currentElement._owner||null;
if(owner){
var name=owner.getName();
if(name){
return ' Check the render method of `'+name+'`.';}}


return '';}


function StatelessComponent(Component){}
StatelessComponent.prototype.render=function(){
var Component=ReactInstanceMap.get(this)._currentElement.type;
return Component(this.props,this.context,this.updater);};



































var nextMountID=1;




var ReactCompositeComponentMixin={








construct:function construct(element){
this._currentElement=element;
this._rootNodeID=null;
this._instance=null;


this._pendingElement=null;
this._pendingStateQueue=null;
this._pendingReplaceState=false;
this._pendingForceUpdate=false;

this._renderedComponent=null;

this._context=null;
this._mountOrder=0;
this._topLevelWrapper=null;


this._pendingCallbacks=null;},











mountComponent:function mountComponent(rootID,transaction,context){
this._context=context;
this._mountOrder=nextMountID++;
this._rootNodeID=rootID;

var publicProps=this._processProps(this._currentElement.props);
var publicContext=this._processContext(context);

var Component=this._currentElement.type;


var inst;
var renderedElement;





var canInstantiate='prototype' in Component;

if(canInstantiate){
if(process.env.NODE_ENV!=='production'){
ReactCurrentOwner.current=this;
try{
inst=new Component(publicProps,publicContext,ReactUpdateQueue);}finally 
{
ReactCurrentOwner.current=null;}}else 

{
inst=new Component(publicProps,publicContext,ReactUpdateQueue);}}



if(!canInstantiate||inst===null||inst===false||ReactElement.isValidElement(inst)){
renderedElement=inst;
inst=new StatelessComponent(Component);}


if(process.env.NODE_ENV!=='production'){


if(inst.render==null){
process.env.NODE_ENV!=='production'?warning(false,'%s(...): No `render` method found on the returned component '+'instance: you may have forgotten to define `render`, returned '+'null/false from a stateless component, or tried to render an '+'element whose type is a function that isn\'t a React component.',Component.displayName||Component.name||'Component'):undefined;}else 
{


process.env.NODE_ENV!=='production'?warning(Component.prototype&&Component.prototype.isReactComponent||!canInstantiate||!(inst instanceof Component),'%s(...): React component classes must extend React.Component.',Component.displayName||Component.name||'Component'):undefined;}}





inst.props=publicProps;
inst.context=publicContext;
inst.refs=emptyObject;
inst.updater=ReactUpdateQueue;

this._instance=inst;


ReactInstanceMap.set(inst,this);

if(process.env.NODE_ENV!=='production'){



process.env.NODE_ENV!=='production'?warning(!inst.getInitialState||inst.getInitialState.isReactClassApproved,'getInitialState was defined on %s, a plain JavaScript class. '+'This is only supported for classes created using React.createClass. '+'Did you mean to define a state property instead?',this.getName()||'a component'):undefined;
process.env.NODE_ENV!=='production'?warning(!inst.getDefaultProps||inst.getDefaultProps.isReactClassApproved,'getDefaultProps was defined on %s, a plain JavaScript class. '+'This is only supported for classes created using React.createClass. '+'Use a static property to define defaultProps instead.',this.getName()||'a component'):undefined;
process.env.NODE_ENV!=='production'?warning(!inst.propTypes,'propTypes was defined as an instance property on %s. Use a static '+'property to define propTypes instead.',this.getName()||'a component'):undefined;
process.env.NODE_ENV!=='production'?warning(!inst.contextTypes,'contextTypes was defined as an instance property on %s. Use a '+'static property to define contextTypes instead.',this.getName()||'a component'):undefined;
process.env.NODE_ENV!=='production'?warning(typeof inst.componentShouldUpdate!=='function','%s has a method called '+'componentShouldUpdate(). Did you mean shouldComponentUpdate()? '+'The name is phrased as a question because the function is '+'expected to return a value.',this.getName()||'A component'):undefined;
process.env.NODE_ENV!=='production'?warning(typeof inst.componentDidUnmount!=='function','%s has a method called '+'componentDidUnmount(). But there is no such lifecycle method. '+'Did you mean componentWillUnmount()?',this.getName()||'A component'):undefined;
process.env.NODE_ENV!=='production'?warning(typeof inst.componentWillRecieveProps!=='function','%s has a method called '+'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',this.getName()||'A component'):undefined;}


var initialState=inst.state;
if(initialState===undefined){
inst.state=initialState=null;}

!(typeof initialState==='object'&&!Array.isArray(initialState))?process.env.NODE_ENV!=='production'?invariant(false,'%s.state: must be set to an object or null',this.getName()||'ReactCompositeComponent'):invariant(false):undefined;

this._pendingStateQueue=null;
this._pendingReplaceState=false;
this._pendingForceUpdate=false;

if(inst.componentWillMount){
inst.componentWillMount();


if(this._pendingStateQueue){
inst.state=this._processPendingState(inst.props,inst.context);}}




if(renderedElement===undefined){
renderedElement=this._renderValidatedComponent();}


this._renderedComponent=this._instantiateReactComponent(renderedElement);

var markup=ReactReconciler.mountComponent(this._renderedComponent,rootID,transaction,this._processChildContext(context));
if(inst.componentDidMount){
transaction.getReactMountReady().enqueue(inst.componentDidMount,inst);}


return markup;},








unmountComponent:function unmountComponent(){
var inst=this._instance;

if(inst.componentWillUnmount){
inst.componentWillUnmount();}


ReactReconciler.unmountComponent(this._renderedComponent);
this._renderedComponent=null;
this._instance=null;




this._pendingStateQueue=null;
this._pendingReplaceState=false;
this._pendingForceUpdate=false;
this._pendingCallbacks=null;
this._pendingElement=null;



this._context=null;
this._rootNodeID=null;
this._topLevelWrapper=null;




ReactInstanceMap.remove(inst);},
















_maskContext:function _maskContext(context){
var maskedContext=null;
var Component=this._currentElement.type;
var contextTypes=Component.contextTypes;
if(!contextTypes){
return emptyObject;}

maskedContext={};
for(var contextName in contextTypes){
maskedContext[contextName]=context[contextName];}

return maskedContext;},










_processContext:function _processContext(context){
var maskedContext=this._maskContext(context);
if(process.env.NODE_ENV!=='production'){
var Component=this._currentElement.type;
if(Component.contextTypes){
this._checkPropTypes(Component.contextTypes,maskedContext,ReactPropTypeLocations.context);}}


return maskedContext;},







_processChildContext:function _processChildContext(currentContext){
var Component=this._currentElement.type;
var inst=this._instance;
var childContext=inst.getChildContext&&inst.getChildContext();
if(childContext){
!(typeof Component.childContextTypes==='object')?process.env.NODE_ENV!=='production'?invariant(false,'%s.getChildContext(): childContextTypes must be defined in order to '+'use getChildContext().',this.getName()||'ReactCompositeComponent'):invariant(false):undefined;
if(process.env.NODE_ENV!=='production'){
this._checkPropTypes(Component.childContextTypes,childContext,ReactPropTypeLocations.childContext);}

for(var name in childContext){
!(name in Component.childContextTypes)?process.env.NODE_ENV!=='production'?invariant(false,'%s.getChildContext(): key "%s" is not defined in childContextTypes.',this.getName()||'ReactCompositeComponent',name):invariant(false):undefined;}

return assign({},currentContext,childContext);}

return currentContext;},











_processProps:function _processProps(newProps){
if(process.env.NODE_ENV!=='production'){
var Component=this._currentElement.type;
if(Component.propTypes){
this._checkPropTypes(Component.propTypes,newProps,ReactPropTypeLocations.prop);}}


return newProps;},










_checkPropTypes:function _checkPropTypes(propTypes,props,location){


var componentName=this.getName();
for(var propName in propTypes){
if(propTypes.hasOwnProperty(propName)){
var error;
try{


!(typeof propTypes[propName]==='function')?process.env.NODE_ENV!=='production'?invariant(false,'%s: %s type `%s` is invalid; it must be a function, usually '+'from React.PropTypes.',componentName||'React class',ReactPropTypeLocationNames[location],propName):invariant(false):undefined;
error=propTypes[propName](props,propName,componentName,location);}
catch(ex){
error=ex;}

if(error instanceof Error){



var addendum=getDeclarationErrorAddendum(this);

if(location===ReactPropTypeLocations.prop){

process.env.NODE_ENV!=='production'?warning(false,'Failed Composite propType: %s%s',error.message,addendum):undefined;}else 
{
process.env.NODE_ENV!=='production'?warning(false,'Failed Context Types: %s%s',error.message,addendum):undefined;}}}}},






receiveComponent:function receiveComponent(nextElement,transaction,nextContext){
var prevElement=this._currentElement;
var prevContext=this._context;

this._pendingElement=null;

this.updateComponent(transaction,prevElement,nextElement,prevContext,nextContext);},









performUpdateIfNecessary:function performUpdateIfNecessary(transaction){
if(this._pendingElement!=null){
ReactReconciler.receiveComponent(this,this._pendingElement||this._currentElement,transaction,this._context);}


if(this._pendingStateQueue!==null||this._pendingForceUpdate){
this.updateComponent(transaction,this._currentElement,this._currentElement,this._context,this._context);}},


















updateComponent:function updateComponent(transaction,prevParentElement,nextParentElement,prevUnmaskedContext,nextUnmaskedContext){
var inst=this._instance;

var nextContext=this._context===nextUnmaskedContext?inst.context:this._processContext(nextUnmaskedContext);
var nextProps;


if(prevParentElement===nextParentElement){


nextProps=nextParentElement.props;}else 
{
nextProps=this._processProps(nextParentElement.props);




if(inst.componentWillReceiveProps){
inst.componentWillReceiveProps(nextProps,nextContext);}}



var nextState=this._processPendingState(nextProps,nextContext);

var shouldUpdate=this._pendingForceUpdate||!inst.shouldComponentUpdate||inst.shouldComponentUpdate(nextProps,nextState,nextContext);

if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(typeof shouldUpdate!=='undefined','%s.shouldComponentUpdate(): Returned undefined instead of a '+'boolean value. Make sure to return true or false.',this.getName()||'ReactCompositeComponent'):undefined;}


if(shouldUpdate){
this._pendingForceUpdate=false;

this._performComponentUpdate(nextParentElement,nextProps,nextState,nextContext,transaction,nextUnmaskedContext);}else 
{


this._currentElement=nextParentElement;
this._context=nextUnmaskedContext;
inst.props=nextProps;
inst.state=nextState;
inst.context=nextContext;}},



_processPendingState:function _processPendingState(props,context){
var inst=this._instance;
var queue=this._pendingStateQueue;
var replace=this._pendingReplaceState;
this._pendingReplaceState=false;
this._pendingStateQueue=null;

if(!queue){
return inst.state;}


if(replace&&queue.length===1){
return queue[0];}


var nextState=assign({},replace?queue[0]:inst.state);
for(var i=replace?1:0;i<queue.length;i++){
var partial=queue[i];
assign(nextState,typeof partial==='function'?partial.call(inst,nextState,props,context):partial);}


return nextState;},














_performComponentUpdate:function _performComponentUpdate(nextElement,nextProps,nextState,nextContext,transaction,unmaskedContext){
var inst=this._instance;

var hasComponentDidUpdate=Boolean(inst.componentDidUpdate);
var prevProps;
var prevState;
var prevContext;
if(hasComponentDidUpdate){
prevProps=inst.props;
prevState=inst.state;
prevContext=inst.context;}


if(inst.componentWillUpdate){
inst.componentWillUpdate(nextProps,nextState,nextContext);}


this._currentElement=nextElement;
this._context=unmaskedContext;
inst.props=nextProps;
inst.state=nextState;
inst.context=nextContext;

this._updateRenderedComponent(transaction,unmaskedContext);

if(hasComponentDidUpdate){
transaction.getReactMountReady().enqueue(inst.componentDidUpdate.bind(inst,prevProps,prevState,prevContext),inst);}},









_updateRenderedComponent:function _updateRenderedComponent(transaction,context){
var prevComponentInstance=this._renderedComponent;
var prevRenderedElement=prevComponentInstance._currentElement;
var nextRenderedElement=this._renderValidatedComponent();
if(shouldUpdateReactComponent(prevRenderedElement,nextRenderedElement)){
ReactReconciler.receiveComponent(prevComponentInstance,nextRenderedElement,transaction,this._processChildContext(context));}else 
{

var thisID=this._rootNodeID;
var prevComponentID=prevComponentInstance._rootNodeID;
ReactReconciler.unmountComponent(prevComponentInstance);

this._renderedComponent=this._instantiateReactComponent(nextRenderedElement);
var nextMarkup=ReactReconciler.mountComponent(this._renderedComponent,thisID,transaction,this._processChildContext(context));
this._replaceNodeWithMarkupByID(prevComponentID,nextMarkup);}},






_replaceNodeWithMarkupByID:function _replaceNodeWithMarkupByID(prevComponentID,nextMarkup){
ReactComponentEnvironment.replaceNodeWithMarkupByID(prevComponentID,nextMarkup);},





_renderValidatedComponentWithoutOwnerOrContext:function _renderValidatedComponentWithoutOwnerOrContext(){
var inst=this._instance;
var renderedComponent=inst.render();
if(process.env.NODE_ENV!=='production'){

if(typeof renderedComponent==='undefined'&&inst.render._isMockFunction){


renderedComponent=null;}}



return renderedComponent;},





_renderValidatedComponent:function _renderValidatedComponent(){
var renderedComponent;
ReactCurrentOwner.current=this;
try{
renderedComponent=this._renderValidatedComponentWithoutOwnerOrContext();}finally 
{
ReactCurrentOwner.current=null;}

!(

renderedComponent===null||renderedComponent===false||ReactElement.isValidElement(renderedComponent))?process.env.NODE_ENV!=='production'?invariant(false,'%s.render(): A valid ReactComponent must be returned. You may have '+'returned undefined, an array or some other invalid object.',this.getName()||'ReactCompositeComponent'):invariant(false):undefined;
return renderedComponent;},










attachRef:function attachRef(ref,component){
var inst=this.getPublicInstance();
!(inst!=null)?process.env.NODE_ENV!=='production'?invariant(false,'Stateless function components cannot have refs.'):invariant(false):undefined;
var publicComponentInstance=component.getPublicInstance();
if(process.env.NODE_ENV!=='production'){
var componentName=component&&component.getName?component.getName():'a component';
process.env.NODE_ENV!=='production'?warning(publicComponentInstance!=null,'Stateless function components cannot be given refs '+'(See ref "%s" in %s created by %s). '+'Attempts to access this ref will fail.',ref,componentName,this.getName()):undefined;}

var refs=inst.refs===emptyObject?inst.refs={}:inst.refs;
refs[ref]=publicComponentInstance;},









detachRef:function detachRef(ref){
var refs=this.getPublicInstance().refs;
delete refs[ref];},








getName:function getName(){
var type=this._currentElement.type;
var constructor=this._instance&&this._instance.constructor;
return type.displayName||constructor&&constructor.displayName||type.name||constructor&&constructor.name||null;},










getPublicInstance:function getPublicInstance(){
var inst=this._instance;
if(inst instanceof StatelessComponent){
return null;}

return inst;},



_instantiateReactComponent:null};



ReactPerf.measureMethods(ReactCompositeComponentMixin,'ReactCompositeComponent',{
mountComponent:'mountComponent',
updateComponent:'updateComponent',
_renderValidatedComponent:'_renderValidatedComponent'});


var ReactCompositeComponent={

Mixin:ReactCompositeComponentMixin};



module.exports=ReactCompositeComponent;
});
__d(87 /* ReactComponentEnvironment */, function(global, require, module, exports) {'use strict';












var invariant=require(242 /* fbjs/lib/invariant */);

var injected=false;

var ReactComponentEnvironment={






unmountIDFromEnvironment:null,





replaceNodeWithMarkupByID:null,





processChildrenUpdates:null,

injection:{
injectEnvironment:function injectEnvironment(environment){
!!injected?process.env.NODE_ENV!=='production'?invariant(false,'ReactCompositeComponent: injectEnvironment() can only be called once.'):invariant(false):undefined;
ReactComponentEnvironment.unmountIDFromEnvironment=environment.unmountIDFromEnvironment;
ReactComponentEnvironment.replaceNodeWithMarkupByID=environment.replaceNodeWithMarkupByID;
ReactComponentEnvironment.processChildrenUpdates=environment.processChildrenUpdates;
injected=true;}}};





module.exports=ReactComponentEnvironment;
});
__d(88 /* shouldUpdateReactComponent */, function(global, require, module, exports) {'use strict';
























function shouldUpdateReactComponent(prevElement,nextElement){
var prevEmpty=prevElement===null||prevElement===false;
var nextEmpty=nextElement===null||nextElement===false;
if(prevEmpty||nextEmpty){
return prevEmpty===nextEmpty;}


var prevType=typeof prevElement;
var nextType=typeof nextElement;
if(prevType==='string'||prevType==='number'){
return nextType==='string'||nextType==='number';}else 
{
return nextType==='object'&&prevElement.type===nextElement.type&&prevElement.key===nextElement.key;}

return false;}


module.exports=shouldUpdateReactComponent;
});
__d(89 /* ReactEmptyComponent */, function(global, require, module, exports) {'use strict';












var ReactElement=require(32 /* ./ReactElement */);
var ReactEmptyComponentRegistry=require(90 /* ./ReactEmptyComponentRegistry */);
var ReactReconciler=require(75 /* ./ReactReconciler */);

var assign=require(34 /* ./Object.assign */);

var placeholderElement;

var ReactEmptyComponentInjection={
injectEmptyComponent:function injectEmptyComponent(component){
placeholderElement=ReactElement.createElement(component);}};



function registerNullComponentID(){
ReactEmptyComponentRegistry.registerNullComponentID(this._rootNodeID);}


var ReactEmptyComponent=function ReactEmptyComponent(instantiate){
this._currentElement=null;
this._rootNodeID=null;
this._renderedComponent=instantiate(placeholderElement);};

assign(ReactEmptyComponent.prototype,{
construct:function construct(element){},
mountComponent:function mountComponent(rootID,transaction,context){
transaction.getReactMountReady().enqueue(registerNullComponentID,this);
this._rootNodeID=rootID;
return ReactReconciler.mountComponent(this._renderedComponent,rootID,transaction,context);},

receiveComponent:function receiveComponent(){},
unmountComponent:function unmountComponent(rootID,transaction,context){
ReactReconciler.unmountComponent(this._renderedComponent);
ReactEmptyComponentRegistry.deregisterNullComponentID(this._rootNodeID);
this._rootNodeID=null;
this._renderedComponent=null;}});



ReactEmptyComponent.injection=ReactEmptyComponentInjection;

module.exports=ReactEmptyComponent;
});
__d(90 /* ReactEmptyComponentRegistry */, function(global, require, module, exports) {'use strict';














var nullComponentIDsRegistry={};





function isNullComponentID(id){
return !!nullComponentIDsRegistry[id];}






function registerNullComponentID(id){
nullComponentIDsRegistry[id]=true;}






function deregisterNullComponentID(id){
delete nullComponentIDsRegistry[id];}


var ReactEmptyComponentRegistry={
isNullComponentID:isNullComponentID,
registerNullComponentID:registerNullComponentID,
deregisterNullComponentID:deregisterNullComponentID};


module.exports=ReactEmptyComponentRegistry;
});
__d(91 /* ReactNativeComponent */, function(global, require, module, exports) {'use strict';












var assign=require(34 /* ./Object.assign */);
var invariant=require(242 /* fbjs/lib/invariant */);

var autoGenerateWrapperClass=null;
var genericComponentClass=null;

var tagToComponentClass={};
var textComponentClass=null;

var ReactNativeComponentInjection={


injectGenericComponentClass:function injectGenericComponentClass(componentClass){
genericComponentClass=componentClass;},



injectTextComponentClass:function injectTextComponentClass(componentClass){
textComponentClass=componentClass;},



injectComponentClasses:function injectComponentClasses(componentClasses){
assign(tagToComponentClass,componentClasses);}};









function getComponentClassForElement(element){
if(typeof element.type==='function'){
return element.type;}

var tag=element.type;
var componentClass=tagToComponentClass[tag];
if(componentClass==null){
tagToComponentClass[tag]=componentClass=autoGenerateWrapperClass(tag);}

return componentClass;}








function createInternalComponent(element){
!genericComponentClass?process.env.NODE_ENV!=='production'?invariant(false,'There is no registered component for the tag %s',element.type):invariant(false):undefined;
return new genericComponentClass(element.type,element.props);}






function createInstanceForText(text){
return new textComponentClass(text);}






function isTextComponent(component){
return component instanceof textComponentClass;}


var ReactNativeComponent={
getComponentClassForElement:getComponentClassForElement,
createInternalComponent:createInternalComponent,
createInstanceForText:createInstanceForText,
isTextComponent:isTextComponent,
injection:ReactNativeComponentInjection};


module.exports=ReactNativeComponent;
});
__d(92 /* ReactNativeTextComponent */, function(global, require, module, exports) {'use strict';












var ReactNativeTagHandles=require(74 /* ReactNativeTagHandles */);
var UIManager=require(83 /* UIManager */);

var invariant=require(222 /* fbjs/lib/invariant */);

var ReactNativeTextComponent=function ReactNativeTextComponent(props){};



babelHelpers.extends(ReactNativeTextComponent.prototype,{

construct:function construct(text){

this._currentElement=text;
this._stringText=''+text;
this._rootNodeID=null;},


mountComponent:function mountComponent(rootID,transaction,context){
invariant(
context.isInAParentText,
'RawText "'+this._stringText+'" must be wrapped in an explicit '+
'<Text> component.');

this._rootNodeID=rootID;
var tag=ReactNativeTagHandles.allocateTag();
var nativeTopRootID=ReactNativeTagHandles.getNativeTopRootIDFromNodeID(rootID);
UIManager.createView(
tag,
'RCTRawText',
nativeTopRootID?ReactNativeTagHandles.rootNodeIDToTag[nativeTopRootID]:null,
{text:this._stringText});

return {
rootNodeID:rootID,
tag:tag};},



receiveComponent:function receiveComponent(nextText,transaction,context){
if(nextText!==this._currentElement){
this._currentElement=nextText;
var nextStringText=''+nextText;
if(nextStringText!==this._stringText){
this._stringText=nextStringText;
UIManager.updateView(
ReactNativeTagHandles.mostRecentMountedNodeHandleForRootNodeID(
this._rootNodeID),

'RCTRawText',
{text:this._stringText});}}},





unmountComponent:function unmountComponent(){
this._currentElement=null;
this._stringText=null;
this._rootNodeID=null;}});




module.exports=ReactNativeTextComponent;
});
__d(93 /* RCTDebugComponentOwnership */, function(global, require, module, exports) {'use strict';
















var BatchedBridge=require(2 /* BatchedBridge */);
var DebugComponentOwnershipModule=require(9 /* NativeModules */).DebugComponentOwnershipModule;
var InspectorUtils=require(94 /* InspectorUtils */);
var ReactNativeTagHandles=require(74 /* ReactNativeTagHandles */);

function componentToString(component){
return component.getName?component.getName():'Unknown';}


function getRootTagForTag(tag){
var rootNodeID=ReactNativeTagHandles.tagToRootNodeID[tag];
if(!rootNodeID){
return null;}

var rootID=ReactNativeTagHandles.getNativeTopRootIDFromNodeID(rootNodeID);
if(!rootID){
return null;}

return ReactNativeTagHandles.rootNodeIDToTag[rootID];}


var RCTDebugComponentOwnership={








getOwnerHierarchy:function getOwnerHierarchy(requestID,tag){
var rootTag=getRootTagForTag(tag);
var instance=InspectorUtils.findInstanceByNativeTag(rootTag,tag);
var ownerHierarchy=instance?
InspectorUtils.getOwnerHierarchy(instance).map(componentToString):
null;
DebugComponentOwnershipModule.receiveOwnershipHierarchy(requestID,tag,ownerHierarchy);}};



BatchedBridge.registerCallableModule(
'RCTDebugComponentOwnership',
RCTDebugComponentOwnership);


module.exports=RCTDebugComponentOwnership;
});
__d(94 /* InspectorUtils */, function(global, require, module, exports) {'use strict';











var ReactInstanceHandles=require(37 /* ReactInstanceHandles */);
var ReactInstanceMap=require(79 /* ReactInstanceMap */);
var ReactNativeMount=require(73 /* ReactNativeMount */);
var ReactNativeTagHandles=require(74 /* ReactNativeTagHandles */);

function traverseOwnerTreeUp(hierarchy,instance){
if(instance){
hierarchy.unshift(instance);
traverseOwnerTreeUp(hierarchy,instance._currentElement._owner);}}



function findInstance(component,targetID){
if(targetID===findRootNodeID(component)){
return component;}

if(component._renderedComponent){
return findInstance(component._renderedComponent,targetID);}else 
{
for(var key in component._renderedChildren){
var child=component._renderedChildren[key];
if(ReactInstanceHandles.isAncestorIDOf(findRootNodeID(child),targetID)){
var instance=findInstance(child,targetID);
if(instance){
return instance;}}}}}






function findRootNodeID(component){
var internalInstance=ReactInstanceMap.get(component);
return internalInstance?internalInstance._rootNodeID:component._rootNodeID;}


function findInstanceByNativeTag(rootTag,nativeTag){
var containerID=ReactNativeTagHandles.tagToRootNodeID[rootTag];
var rootInstance=ReactNativeMount._instancesByContainerID[containerID];
var targetID=ReactNativeTagHandles.tagToRootNodeID[nativeTag];
if(!targetID){
return undefined;}

return findInstance(rootInstance,targetID);}


function getOwnerHierarchy(instance){
var hierarchy=[];
traverseOwnerTreeUp(hierarchy,instance);
return hierarchy;}


module.exports={findInstanceByNativeTag:findInstanceByNativeTag,getOwnerHierarchy:getOwnerHierarchy};
});
__d(95 /* RCTNativeAppEventEmitter */, function(global, require, module, exports) {'use strict';












var BatchedBridge=require(2 /* BatchedBridge */);
var EventEmitter=require(15 /* EventEmitter */);

var RCTNativeAppEventEmitter=new EventEmitter();

BatchedBridge.registerCallableModule(
'RCTNativeAppEventEmitter',
RCTNativeAppEventEmitter);


module.exports=RCTNativeAppEventEmitter;
});
__d(96 /* PerformanceLogger */, function(global, require, module, exports) {'use strict';











var BatchedBridge=require(2 /* BatchedBridge */);
var fbjsPerformanceNow=require(223 /* fbjs/lib/performanceNow */);

var performanceNow=global.nativePerformanceNow||fbjsPerformanceNow;

var timespans={};
var extras={};





var PerformanceLogger={
addTimespan:function addTimespan(key,lengthInMs,description){
if(timespans[key]){
if(__DEV__){
console.log(
'PerformanceLogger: Attempting to add a timespan that already exists ',
key);}


return;}


timespans[key]={
description:description,
totalTime:lengthInMs};},



startTimespan:function startTimespan(key,description){
if(timespans[key]){
if(__DEV__){
console.log(
'PerformanceLogger: Attempting to start a timespan that already exists ',
key);}


return;}


timespans[key]={
description:description,
startTime:performanceNow()};},



stopTimespan:function stopTimespan(key){
if(!timespans[key]||!timespans[key].startTime){
if(__DEV__){
console.log(
'PerformanceLogger: Attempting to end a timespan that has not started ',
key);}


return;}

if(timespans[key].endTime){
if(__DEV__){
console.log(
'PerformanceLogger: Attempting to end a timespan that has already ended ',
key);}


return;}


timespans[key].endTime=performanceNow();
timespans[key].totalTime=
timespans[key].endTime-timespans[key].startTime;},


clear:function clear(){
timespans={};
extras={};},


clearExceptTimespans:function clearExceptTimespans(keys){
timespans=Object.keys(timespans).reduce(function(previous,key){
if(keys.indexOf(key)!==-1){
previous[key]=timespans[key];}

return previous;},
{});
extras={};},


getTimespans:function getTimespans(){
return timespans;},


hasTimespan:function hasTimespan(key){
return !!timespans[key];},


logTimespans:function logTimespans(){
for(var key in timespans){
if(timespans[key].totalTime){
console.log(key+': '+timespans[key].totalTime+'ms');}}},




addTimespans:function addTimespans(newTimespans,labels){
for(var i=0,l=newTimespans.length;i<l;i+=2){
var label=labels[i/2];
PerformanceLogger.addTimespan(
label,
newTimespans[i+1]-newTimespans[i],
label);}},




setExtra:function setExtra(key,value){
if(extras[key]){
if(__DEV__){
console.log(
'PerformanceLogger: Attempting to set an extra that already exists ',
key);}


return;}

extras[key]=value;},


getExtras:function getExtras(){
return extras;}};



BatchedBridge.registerCallableModule(
'PerformanceLogger',
PerformanceLogger);


module.exports=PerformanceLogger;
});
__d(306 /* react-transform-hmr/lib/index.js */, function(global, require, module, exports) {'use strict';

Object.defineProperty(exports,'__esModule',{
value:true});


var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[typeof Symbol==='function'?Symbol.iterator:'@@iterator'](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally {try{if(!_n&&_i['return'])_i['return']();}finally {if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if((typeof Symbol==='function'?Symbol.iterator:'@@iterator') in Object(arr)){return sliceIterator(arr,i);}else {throw new TypeError('Invalid attempt to destructure non-iterable instance');}};}();

exports['default']=proxyReactComponents;

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}

var _reactProxy=require(245 /* react-proxy */);

var _globalWindow=require(373 /* global/window */);

var _globalWindow2=_interopRequireDefault(_globalWindow);

var componentProxies=undefined;
if(_globalWindow2['default'].__reactComponentProxies){
componentProxies=_globalWindow2['default'].__reactComponentProxies;}else 
{
componentProxies={};
Object.defineProperty(_globalWindow2['default'],'__reactComponentProxies',{
configurable:true,
enumerable:false,
writable:false,
value:componentProxies});}



function proxyReactComponents(_ref){
var filename=_ref.filename;
var components=_ref.components;
var imports=_ref.imports;
var locals=_ref.locals;

var _imports=_slicedToArray(imports,1);

var React=_imports[0];

var _locals=_slicedToArray(locals,1);

var hot=_locals[0].hot;

if(!React.Component){
throw new Error('imports[0] for react-transform-hmr does not look like React.');}


if(!hot||typeof hot.accept!=='function'){
throw new Error('locals[0] does not appear to be a `module` object with Hot Module '+'replacement API enabled. You should disable react-transform-hmr in '+'production by using `env` section in Babel configuration. See the '+'example in README: https://github.com/gaearon/react-transform-hmr');}


if(Object.keys(components).some(function(key){
return !components[key].isInFunction;}))
{
hot.accept(function(err){
if(err){
console.warn('[React Transform HMR] There was an error updating '+filename+':');
console.error(err);}});}




var forceUpdate=(0,_reactProxy.getForceUpdate)(React);

return function wrapWithProxy(ReactClass,uniqueId){
var _components$uniqueId=components[uniqueId];
var _components$uniqueId$isInFunction=_components$uniqueId.isInFunction;
var isInFunction=_components$uniqueId$isInFunction===undefined?false:_components$uniqueId$isInFunction;
var _components$uniqueId$displayName=_components$uniqueId.displayName;
var displayName=_components$uniqueId$displayName===undefined?uniqueId:_components$uniqueId$displayName;

if(isInFunction){
return ReactClass;}


var globalUniqueId=filename+'$'+uniqueId;
if(componentProxies[globalUniqueId]){
(function(){
console.info('[React Transform HMR] Patching '+displayName);
var instances=componentProxies[globalUniqueId].update(ReactClass);
setTimeout(function(){
return instances.forEach(forceUpdate);});})();}else 


{
componentProxies[globalUniqueId]=(0,_reactProxy.createProxy)(ReactClass);}


return componentProxies[globalUniqueId].get();};}



module.exports=exports['default'];
});
__d(245 /* react-proxy/modules/index.js */, function(global, require, module, exports) {'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});

exports.getForceUpdate=exports.createProxy=undefined;

var _supportsProtoAssignment=require(243 /* ./supportsProtoAssignment */);

var _supportsProtoAssignment2=_interopRequireDefault(_supportsProtoAssignment);

var _createClassProxy=require(376 /* ./createClassProxy */);

var _createClassProxy2=_interopRequireDefault(_createClassProxy);

var _reactDeepForceUpdate=require(387 /* react-deep-force-update */);

var _reactDeepForceUpdate2=_interopRequireDefault(_reactDeepForceUpdate);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

if(!(0,_supportsProtoAssignment2.default)()){
console.warn('This JavaScript environment does not support __proto__. '+'This means that react-proxy is unable to proxy React components. '+'Features that rely on react-proxy, such as react-transform-hmr, '+'will not function as expected.');}


exports.createProxy=_createClassProxy2.default;
exports.getForceUpdate=_reactDeepForceUpdate2.default;
});
__d(243 /* react-proxy/modules/supportsProtoAssignment.js */, function(global, require, module, exports) {"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});

exports.default=supportsProtoAssignment;
var x={};
var y={supports:true};
try{
x.__proto__=y;}
catch(err){}

function supportsProtoAssignment(){
return x.supports||false;}
;
});
__d(376 /* react-proxy/modules/createClassProxy.js */, function(global, require, module, exports) {'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});


var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};

var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[typeof Symbol==="function"?Symbol.iterator:"@@iterator"](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally {try{if(!_n&&_i["return"])_i["return"]();}finally {if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if((typeof Symbol==="function"?Symbol.iterator:"@@iterator") in Object(arr)){return sliceIterator(arr,i);}else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();

exports.default=proxyClass;
exports.default=createClassProxy;

var _find=require(249 /* lodash/find */);

var _find2=_interopRequireDefault(_find);

var _createPrototypeProxy=require(396 /* ./createPrototypeProxy */);

var _createPrototypeProxy2=_interopRequireDefault(_createPrototypeProxy);

var _bindAutoBindMethods=require(393 /* ./bindAutoBindMethods */);

var _bindAutoBindMethods2=_interopRequireDefault(_bindAutoBindMethods);

var _deleteUnknownAutoBindMethods=require(386 /* ./deleteUnknownAutoBindMethods */);

var _deleteUnknownAutoBindMethods2=_interopRequireDefault(_deleteUnknownAutoBindMethods);

var _supportsProtoAssignment=require(243 /* ./supportsProtoAssignment */);

var _supportsProtoAssignment2=_interopRequireDefault(_supportsProtoAssignment);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else {return Array.from(arr);}}

var RESERVED_STATICS=['length','name','arguments','caller','prototype','toString'];

function isEqualDescriptor(a,b){
if(!a&&!b){
return true;}

if(!a||!b){
return false;}

for(var key in a){
if(a[key]!==b[key]){
return false;}}


return true;}




var allProxies=[];
function findProxy(Component){
var pair=(0,_find2.default)(allProxies,function(_ref){
var _ref2=_slicedToArray(_ref,1);

var key=_ref2[0];
return key===Component;});

return pair?pair[1]:null;}

function addProxy(Component,proxy){
allProxies.push([Component,proxy]);}


function proxyClass(InitialComponent){


var existingProxy=findProxy(InitialComponent);
if(existingProxy){
return existingProxy;}


var prototypeProxy=(0,_createPrototypeProxy2.default)();
var CurrentComponent=undefined;
var ProxyComponent=undefined;

var staticDescriptors={};
function wasStaticModifiedByUser(key){

var currentDescriptor=Object.getOwnPropertyDescriptor(ProxyComponent,key);
return !isEqualDescriptor(staticDescriptors[key],currentDescriptor);}


function instantiate(factory,context,params){
var component=factory();

try{
return component.apply(context,params);}
catch(err){
(function(){

var instance=new (Function.prototype.bind.apply(component,[null].concat(_toConsumableArray(params))))();

Object.keys(instance).forEach(function(key){
if(RESERVED_STATICS.indexOf(key)>-1){
return;}

context[key]=instance[key];});})();}}





try{

ProxyComponent=new Function('factory','instantiate','return function '+(InitialComponent.name||'ProxyComponent')+'() {\n         return instantiate(factory, this, arguments);\n      }')(function(){
return CurrentComponent;},
instantiate);}
catch(err){

ProxyComponent=function ProxyComponent(){
return instantiate(function(){
return CurrentComponent;},
this,arguments);};}




ProxyComponent.prototype=prototypeProxy.get();


ProxyComponent.toString=function toString(){
return CurrentComponent.toString();};


function update(NextComponent){
if(typeof NextComponent!=='function'){
throw new Error('Expected a constructor.');}



var existingProxy=findProxy(NextComponent);
if(existingProxy){
return update(existingProxy.__getCurrent());}



CurrentComponent=NextComponent;


var mountedInstances=prototypeProxy.update(NextComponent.prototype);


ProxyComponent.prototype.constructor=ProxyComponent;


ProxyComponent.__proto__=NextComponent.__proto__;


Object.getOwnPropertyNames(NextComponent).forEach(function(key){
if(RESERVED_STATICS.indexOf(key)>-1){
return;}


var staticDescriptor=_extends({},Object.getOwnPropertyDescriptor(NextComponent,key),{
configurable:true});



if(!wasStaticModifiedByUser(key)){
Object.defineProperty(ProxyComponent,key,staticDescriptor);
staticDescriptors[key]=staticDescriptor;}});




Object.getOwnPropertyNames(ProxyComponent).forEach(function(key){
if(RESERVED_STATICS.indexOf(key)>-1){
return;}



if(NextComponent.hasOwnProperty(key)){
return;}



var descriptor=Object.getOwnPropertyDescriptor(ProxyComponent,key);
if(descriptor&&!descriptor.configurable){
return;}



if(!wasStaticModifiedByUser(key)){
delete ProxyComponent[key];
delete staticDescriptors[key];}});




ProxyComponent.displayName=NextComponent.displayName||NextComponent.name;


mountedInstances.forEach(_bindAutoBindMethods2.default);
mountedInstances.forEach(_deleteUnknownAutoBindMethods2.default);


return mountedInstances;}
;

function get(){
return ProxyComponent;}


function getCurrent(){
return CurrentComponent;}


update(InitialComponent);

var proxy={get:get,update:update};
addProxy(ProxyComponent,proxy);

Object.defineProperty(proxy,'__getCurrent',{
configurable:false,
writable:false,
enumerable:false,
value:getCurrent});


return proxy;}


function createFallback(Component){
var CurrentComponent=Component;

return {
get:function get(){
return CurrentComponent;},

update:function update(NextComponent){
CurrentComponent=NextComponent;}};}




function createClassProxy(Component){
return Component.__proto__&&(0,_supportsProtoAssignment2.default)()?proxyClass(Component):createFallback(Component);}
});
__d(249 /* lodash/find.js */, function(global, require, module, exports) {var baseEach=require(244 /* ./_baseEach */),
baseFind=require(272 /* ./_baseFind */),
baseFindIndex=require(274 /* ./_baseFindIndex */),
baseIteratee=require(281 /* ./_baseIteratee */),
isArray=require(275 /* ./isArray */);





































function find(collection,predicate){
predicate=baseIteratee(predicate,3);
if(isArray(collection)){
var index=baseFindIndex(collection,predicate);
return index>-1?collection[index]:undefined;}

return baseFind(collection,predicate,baseEach);}


module.exports=find;
});
__d(244 /* lodash/_baseEach.js */, function(global, require, module, exports) {var baseForOwn=require(248 /* ./_baseForOwn */),
createBaseEach=require(277 /* ./_createBaseEach */);









var baseEach=createBaseEach(baseForOwn);

module.exports=baseEach;
});
__d(248 /* lodash/_baseForOwn.js */, function(global, require, module, exports) {var baseFor=require(246 /* ./_baseFor */),
keys=require(262 /* ./keys */);









function baseForOwn(object,iteratee){
return object&&baseFor(object,iteratee,keys);}


module.exports=baseForOwn;
});
__d(246 /* lodash/_baseFor.js */, function(global, require, module, exports) {var createBaseFor=require(253 /* ./_createBaseFor */);












var baseFor=createBaseFor();

module.exports=baseFor;
});
__d(253 /* lodash/_createBaseFor.js */, function(global, require, module, exports) {function 






createBaseFor(fromRight){
return function(object,iteratee,keysFunc){
var index=-1,
iterable=Object(object),
props=keysFunc(object),
length=props.length;

while(length--){
var key=props[fromRight?length:++index];
if(iteratee(iterable[key],key,iterable)===false){
break;}}


return object;};}



module.exports=createBaseFor;
});
__d(262 /* lodash/keys.js */, function(global, require, module, exports) {var baseHas=require(255 /* ./_baseHas */),
baseKeys=require(252 /* ./_baseKeys */),
indexKeys=require(256 /* ./_indexKeys */),
isArrayLike=require(258 /* ./isArrayLike */),
isIndex=require(276 /* ./_isIndex */),
isPrototype=require(271 /* ./_isPrototype */);





























function keys(object){
var isProto=isPrototype(object);
if(!(isProto||isArrayLike(object))){
return baseKeys(object);}

var indexes=indexKeys(object),
skipIndexes=!!indexes,
result=indexes||[],
length=result.length;

for(var key in object){
if(baseHas(object,key)&&
!(skipIndexes&&(key=='length'||isIndex(key,length)))&&
!(isProto&&key=='constructor')){
result.push(key);}}


return result;}


module.exports=keys;
});
__d(255 /* lodash/_baseHas.js */, function(global, require, module, exports) {var getPrototype=require(251 /* ./_getPrototype */);


var objectProto=Object.prototype;


var hasOwnProperty=objectProto.hasOwnProperty;









function baseHas(object,key){



return hasOwnProperty.call(object,key)||
typeof object=='object'&&key in object&&getPrototype(object)===null;}


module.exports=baseHas;
});
__d(251 /* lodash/_getPrototype.js */, function(global, require, module, exports) {var 
nativeGetPrototype=Object.getPrototypeOf;








function getPrototype(value){
return nativeGetPrototype(Object(value));}


module.exports=getPrototype;
});
__d(252 /* lodash/_baseKeys.js */, function(global, require, module, exports) {var 
nativeKeys=Object.keys;









function baseKeys(object){
return nativeKeys(Object(object));}


module.exports=baseKeys;
});
__d(256 /* lodash/_indexKeys.js */, function(global, require, module, exports) {var baseTimes=require(254 /* ./_baseTimes */),
isArguments=require(266 /* ./isArguments */),
isArray=require(275 /* ./isArray */),
isLength=require(270 /* ./isLength */),
isString=require(269 /* ./isString */);









function indexKeys(object){
var length=object?object.length:undefined;
if(isLength(length)&&(
isArray(object)||isString(object)||isArguments(object))){
return baseTimes(length,String);}

return null;}


module.exports=indexKeys;
});
__d(254 /* lodash/_baseTimes.js */, function(global, require, module, exports) {function 








baseTimes(n,iteratee){
var index=-1,
result=Array(n);

while(++index<n){
result[index]=iteratee(index);}

return result;}


module.exports=baseTimes;
});
__d(266 /* lodash/isArguments.js */, function(global, require, module, exports) {var isArrayLikeObject=require(257 /* ./isArrayLikeObject */);


var argsTag='[object Arguments]';


var objectProto=Object.prototype;


var hasOwnProperty=objectProto.hasOwnProperty;






var objectToString=objectProto.toString;


var propertyIsEnumerable=objectProto.propertyIsEnumerable;



















function isArguments(value){

return isArrayLikeObject(value)&&hasOwnProperty.call(value,'callee')&&(
!propertyIsEnumerable.call(value,'callee')||objectToString.call(value)==argsTag);}


module.exports=isArguments;
});
__d(257 /* lodash/isArrayLikeObject.js */, function(global, require, module, exports) {var isArrayLike=require(258 /* ./isArrayLike */),
isObjectLike=require(267 /* ./isObjectLike */);


























function isArrayLikeObject(value){
return isObjectLike(value)&&isArrayLike(value);}


module.exports=isArrayLikeObject;
});
__d(258 /* lodash/isArrayLike.js */, function(global, require, module, exports) {var getLength=require(260 /* ./_getLength */),
isFunction=require(268 /* ./isFunction */),
isLength=require(270 /* ./isLength */);


























function isArrayLike(value){
return value!=null&&isLength(getLength(value))&&!isFunction(value);}


module.exports=isArrayLike;
});
__d(260 /* lodash/_getLength.js */, function(global, require, module, exports) {var baseProperty=require(263 /* ./_baseProperty */);












var getLength=baseProperty('length');

module.exports=getLength;
});
__d(263 /* lodash/_baseProperty.js */, function(global, require, module, exports) {function 






baseProperty(key){
return function(object){
return object==null?undefined:object[key];};}



module.exports=baseProperty;
});
__d(268 /* lodash/isFunction.js */, function(global, require, module, exports) {var isObject=require(264 /* ./isObject */);


var funcTag='[object Function]',
genTag='[object GeneratorFunction]';


var objectProto=Object.prototype;






var objectToString=objectProto.toString;



















function isFunction(value){



var tag=isObject(value)?objectToString.call(value):'';
return tag==funcTag||tag==genTag;}


module.exports=isFunction;
});
__d(264 /* lodash/isObject.js */, function(global, require, module, exports) {function 
























isObject(value){
var type=typeof value;
return !!value&&(type=='object'||type=='function');}


module.exports=isObject;
});
__d(270 /* lodash/isLength.js */, function(global, require, module, exports) {var 
MAX_SAFE_INTEGER=9007199254740991;




























function isLength(value){
return typeof value=='number'&&
value>-1&&value%1==0&&value<=MAX_SAFE_INTEGER;}


module.exports=isLength;
});
__d(267 /* lodash/isObjectLike.js */, function(global, require, module, exports) {function 























isObjectLike(value){
return !!value&&typeof value=='object';}


module.exports=isObjectLike;
});
__d(275 /* lodash/isArray.js */, function(global, require, module, exports) {var 
























isArray=Array.isArray;

module.exports=isArray;
});
__d(269 /* lodash/isString.js */, function(global, require, module, exports) {var isArray=require(275 /* ./isArray */),
isObjectLike=require(267 /* ./isObjectLike */);


var stringTag='[object String]';


var objectProto=Object.prototype;






var objectToString=objectProto.toString;



















function isString(value){
return typeof value=='string'||
!isArray(value)&&isObjectLike(value)&&objectToString.call(value)==stringTag;}


module.exports=isString;
});
__d(276 /* lodash/_isIndex.js */, function(global, require, module, exports) {var 
MAX_SAFE_INTEGER=9007199254740991;


var reIsUint=/^(?:0|[1-9]\d*)$/;









function isIndex(value,length){
length=length==null?MAX_SAFE_INTEGER:length;
return !!length&&(
typeof value=='number'||reIsUint.test(value))&&
value>-1&&value%1==0&&value<length;}


module.exports=isIndex;
});
__d(271 /* lodash/_isPrototype.js */, function(global, require, module, exports) {var 
objectProto=Object.prototype;








function isPrototype(value){
var Ctor=value&&value.constructor,
proto=typeof Ctor=='function'&&Ctor.prototype||objectProto;

return value===proto;}


module.exports=isPrototype;
});
__d(277 /* lodash/_createBaseEach.js */, function(global, require, module, exports) {var isArrayLike=require(258 /* ./isArrayLike */);









function createBaseEach(eachFunc,fromRight){
return function(collection,iteratee){
if(collection==null){
return collection;}

if(!isArrayLike(collection)){
return eachFunc(collection,iteratee);}

var length=collection.length,
index=fromRight?length:-1,
iterable=Object(collection);

while(fromRight?index--:++index<length){
if(iteratee(iterable[index],index,iterable)===false){
break;}}


return collection;};}



module.exports=createBaseEach;
});
__d(272 /* lodash/_baseFind.js */, function(global, require, module, exports) {function 












baseFind(collection,predicate,eachFunc,retKey){
var result;
eachFunc(collection,function(value,key,collection){
if(predicate(value,key,collection)){
result=retKey?key:value;
return false;}});


return result;}


module.exports=baseFind;
});
__d(274 /* lodash/_baseFindIndex.js */, function(global, require, module, exports) {function 









baseFindIndex(array,predicate,fromRight){
var length=array.length,
index=fromRight?length:-1;

while(fromRight?index--:++index<length){
if(predicate(array[index],index,array)){
return index;}}


return -1;}


module.exports=baseFindIndex;
});
__d(281 /* lodash/_baseIteratee.js */, function(global, require, module, exports) {var baseMatches=require(278 /* ./_baseMatches */),
baseMatchesProperty=require(340 /* ./_baseMatchesProperty */),
identity=require(345 /* ./identity */),
isArray=require(275 /* ./isArray */),
property=require(348 /* ./property */);








function baseIteratee(value){


if(typeof value=='function'){
return value;}

if(value==null){
return identity;}

if(typeof value=='object'){
return isArray(value)?
baseMatchesProperty(value[0],value[1]):
baseMatches(value);}

return property(value);}


module.exports=baseIteratee;
});
__d(278 /* lodash/_baseMatches.js */, function(global, require, module, exports) {var baseIsMatch=require(301 /* ./_baseIsMatch */),
getMatchData=require(328 /* ./_getMatchData */),
matchesStrictComparable=require(330 /* ./_matchesStrictComparable */);








function baseMatches(source){
var matchData=getMatchData(source);
if(matchData.length==1&&matchData[0][2]){
return matchesStrictComparable(matchData[0][0],matchData[0][1]);}

return function(object){
return object===source||baseIsMatch(object,source,matchData);};}



module.exports=baseMatches;
});
__d(301 /* lodash/_baseIsMatch.js */, function(global, require, module, exports) {var Stack=require(287 /* ./_Stack */),
baseIsEqual=require(315 /* ./_baseIsEqual */);


var UNORDERED_COMPARE_FLAG=1,
PARTIAL_COMPARE_FLAG=2;











function baseIsMatch(object,source,matchData,customizer){
var index=matchData.length,
length=index,
noCustomizer=!customizer;

if(object==null){
return !length;}

object=Object(object);
while(index--){
var data=matchData[index];
if(noCustomizer&&data[2]?
data[1]!==object[data[0]]:
!(data[0] in object))
{
return false;}}


while(++index<length){
data=matchData[index];
var key=data[0],
objValue=object[key],
srcValue=data[1];

if(noCustomizer&&data[2]){
if(objValue===undefined&&!(key in object)){
return false;}}else 

{
var stack=new Stack();
if(customizer){
var result=customizer(objValue,srcValue,key,object,source,stack);}

if(!(result===undefined?
baseIsEqual(srcValue,objValue,customizer,UNORDERED_COMPARE_FLAG|PARTIAL_COMPARE_FLAG,stack):
result))
{
return false;}}}



return true;}


module.exports=baseIsMatch;
});
__d(287 /* lodash/_Stack.js */, function(global, require, module, exports) {var stackClear=require(273 /* ./_stackClear */),
stackDelete=require(279 /* ./_stackDelete */),
stackGet=require(285 /* ./_stackGet */),
stackHas=require(283 /* ./_stackHas */),
stackSet=require(298 /* ./_stackSet */);








function Stack(values){
var index=-1,
length=values?values.length:0;

this.clear();
while(++index<length){
var entry=values[index];
this.set(entry[0],entry[1]);}}




Stack.prototype.clear=stackClear;
Stack.prototype['delete']=stackDelete;
Stack.prototype.get=stackGet;
Stack.prototype.has=stackHas;
Stack.prototype.set=stackSet;

module.exports=Stack;
});
__d(273 /* lodash/_stackClear.js */, function(global, require, module, exports) {function 






stackClear(){
this.__data__={'array':[],'map':null};}


module.exports=stackClear;
});
__d(279 /* lodash/_stackDelete.js */, function(global, require, module, exports) {var assocDelete=require(286 /* ./_assocDelete */);










function stackDelete(key){
var data=this.__data__,
array=data.array;

return array?assocDelete(array,key):data.map['delete'](key);}


module.exports=stackDelete;
});
__d(286 /* lodash/_assocDelete.js */, function(global, require, module, exports) {var assocIndexOf=require(288 /* ./_assocIndexOf */);


var arrayProto=Array.prototype;


var splice=arrayProto.splice;









function assocDelete(array,key){
var index=assocIndexOf(array,key);
if(index<0){
return false;}

var lastIndex=array.length-1;
if(index==lastIndex){
array.pop();}else 
{
splice.call(array,index,1);}

return true;}


module.exports=assocDelete;
});
__d(288 /* lodash/_assocIndexOf.js */, function(global, require, module, exports) {var eq=require(280 /* ./eq */);









function assocIndexOf(array,key){
var length=array.length;
while(length--){
if(eq(array[length][0],key)){
return length;}}


return -1;}


module.exports=assocIndexOf;
});
__d(280 /* lodash/eq.js */, function(global, require, module, exports) {function 































eq(value,other){
return value===other||value!==value&&other!==other;}


module.exports=eq;
});
__d(285 /* lodash/_stackGet.js */, function(global, require, module, exports) {var assocGet=require(284 /* ./_assocGet */);










function stackGet(key){
var data=this.__data__,
array=data.array;

return array?assocGet(array,key):data.map.get(key);}


module.exports=stackGet;
});
__d(284 /* lodash/_assocGet.js */, function(global, require, module, exports) {var assocIndexOf=require(288 /* ./_assocIndexOf */);









function assocGet(array,key){
var index=assocIndexOf(array,key);
return index<0?undefined:array[index][1];}


module.exports=assocGet;
});
__d(283 /* lodash/_stackHas.js */, function(global, require, module, exports) {var assocHas=require(282 /* ./_assocHas */);










function stackHas(key){
var data=this.__data__,
array=data.array;

return array?assocHas(array,key):data.map.has(key);}


module.exports=stackHas;
});
__d(282 /* lodash/_assocHas.js */, function(global, require, module, exports) {var assocIndexOf=require(288 /* ./_assocIndexOf */);









function assocHas(array,key){
return assocIndexOf(array,key)>-1;}


module.exports=assocHas;
});
__d(298 /* lodash/_stackSet.js */, function(global, require, module, exports) {var MapCache=require(295 /* ./_MapCache */),
assocSet=require(307 /* ./_assocSet */);


var LARGE_ARRAY_SIZE=200;











function stackSet(key,value){
var data=this.__data__,
array=data.array;

if(array){
if(array.length<LARGE_ARRAY_SIZE-1){
assocSet(array,key,value);}else 
{
data.array=null;
data.map=new MapCache(array);}}


var map=data.map;
if(map){
map.set(key,value);}

return this;}


module.exports=stackSet;
});
__d(295 /* lodash/_MapCache.js */, function(global, require, module, exports) {var mapClear=require(291 /* ./_mapClear */),
mapDelete=require(308 /* ./_mapDelete */),
mapGet=require(314 /* ./_mapGet */),
mapHas=require(313 /* ./_mapHas */),
mapSet=require(316 /* ./_mapSet */);








function MapCache(values){
var index=-1,
length=values?values.length:0;

this.clear();
while(++index<length){
var entry=values[index];
this.set(entry[0],entry[1]);}}




MapCache.prototype.clear=mapClear;
MapCache.prototype['delete']=mapDelete;
MapCache.prototype.get=mapGet;
MapCache.prototype.has=mapHas;
MapCache.prototype.set=mapSet;

module.exports=MapCache;
});
__d(291 /* lodash/_mapClear.js */, function(global, require, module, exports) {var Hash=require(294 /* ./_Hash */),
Map=require(293 /* ./_Map */);








function mapClear(){
this.__data__={
'hash':new Hash(),
'map':Map?new Map():[],
'string':new Hash()};}



module.exports=mapClear;
});
__d(294 /* lodash/_Hash.js */, function(global, require, module, exports) {var nativeCreate=require(290 /* ./_nativeCreate */);


var objectProto=Object.prototype;








function Hash(){}


Hash.prototype=nativeCreate?nativeCreate(null):objectProto;

module.exports=Hash;
});
__d(290 /* lodash/_nativeCreate.js */, function(global, require, module, exports) {var getNative=require(292 /* ./_getNative */);


var nativeCreate=getNative(Object,'create');

module.exports=nativeCreate;
});
__d(292 /* lodash/_getNative.js */, function(global, require, module, exports) {var isNative=require(304 /* ./isNative */);









function getNative(object,key){
var value=object[key];
return isNative(value)?value:undefined;}


module.exports=getNative;
});
__d(304 /* lodash/isNative.js */, function(global, require, module, exports) {var isFunction=require(268 /* ./isFunction */),
isHostObject=require(299 /* ./_isHostObject */),
isObject=require(264 /* ./isObject */),
toSource=require(297 /* ./_toSource */);





var reRegExpChar=/[\\^$.*+?()[\]{}|]/g;


var reIsHostCtor=/^\[object .+?Constructor\]$/;


var objectProto=Object.prototype;


var funcToString=Function.prototype.toString;


var hasOwnProperty=objectProto.hasOwnProperty;


var reIsNative=RegExp('^'+
funcToString.call(hasOwnProperty).replace(reRegExpChar,'\\$&').
replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,'$1.*?')+'$');




















function isNative(value){
if(!isObject(value)){
return false;}

var pattern=isFunction(value)||isHostObject(value)?reIsNative:reIsHostCtor;
return pattern.test(toSource(value));}


module.exports=isNative;
});
__d(299 /* lodash/_isHostObject.js */, function(global, require, module, exports) {function 






isHostObject(value){


var result=false;
if(value!=null&&typeof value.toString!='function'){
try{
result=!!(value+'');}
catch(e){}}

return result;}


module.exports=isHostObject;
});
__d(297 /* lodash/_toSource.js */, function(global, require, module, exports) {var 
funcToString=Function.prototype.toString;








function toSource(func){
if(func!=null){
try{
return funcToString.call(func);}
catch(e){}
try{
return func+'';}
catch(e){}}

return '';}


module.exports=toSource;
});
__d(293 /* lodash/_Map.js */, function(global, require, module, exports) {var getNative=require(292 /* ./_getNative */),
root=require(311 /* ./_root */);


var Map=getNative(root,'Map');

module.exports=Map;
});
__d(311 /* lodash/_root.js */, function(global, require, module, exports) {var checkGlobal=require(302 /* ./_checkGlobal */);


var objectTypes={
'function':true,
'object':true};



var freeExports=objectTypes[typeof exports]&&exports&&!exports.nodeType?
exports:
undefined;


var freeModule=objectTypes[typeof module]&&module&&!module.nodeType?
module:
undefined;


var freeGlobal=checkGlobal(freeExports&&freeModule&&typeof global=='object'&&global);


var freeSelf=checkGlobal(objectTypes[typeof self]&&self);


var freeWindow=checkGlobal(objectTypes[typeof window]&&window);


var thisGlobal=checkGlobal(objectTypes[typeof this]&&this);







var root=freeGlobal||
freeWindow!==(thisGlobal&&thisGlobal.window)&&freeWindow||
freeSelf||thisGlobal||Function('return this')();

module.exports=root;
});
__d(302 /* lodash/_checkGlobal.js */, function(global, require, module, exports) {function 






checkGlobal(value){
return value&&value.Object===Object?value:null;}


module.exports=checkGlobal;
});
__d(308 /* lodash/_mapDelete.js */, function(global, require, module, exports) {var Map=require(293 /* ./_Map */),
assocDelete=require(286 /* ./_assocDelete */),
hashDelete=require(300 /* ./_hashDelete */),
isKeyable=require(303 /* ./_isKeyable */);










function mapDelete(key){
var data=this.__data__;
if(isKeyable(key)){
return hashDelete(typeof key=='string'?data.string:data.hash,key);}

return Map?data.map['delete'](key):assocDelete(data.map,key);}


module.exports=mapDelete;
});
__d(300 /* lodash/_hashDelete.js */, function(global, require, module, exports) {var hashHas=require(305 /* ./_hashHas */);









function hashDelete(hash,key){
return hashHas(hash,key)&&delete hash[key];}


module.exports=hashDelete;
});
__d(305 /* lodash/_hashHas.js */, function(global, require, module, exports) {var nativeCreate=require(290 /* ./_nativeCreate */);


var objectProto=Object.prototype;


var hasOwnProperty=objectProto.hasOwnProperty;









function hashHas(hash,key){
return nativeCreate?hash[key]!==undefined:hasOwnProperty.call(hash,key);}


module.exports=hashHas;
});
__d(303 /* lodash/_isKeyable.js */, function(global, require, module, exports) {function 






isKeyable(value){
var type=typeof value;
return type=='string'||type=='number'||type=='symbol'||type=='boolean'?
value!=='__proto__':
value===null;}


module.exports=isKeyable;
});
__d(314 /* lodash/_mapGet.js */, function(global, require, module, exports) {var Map=require(293 /* ./_Map */),
assocGet=require(284 /* ./_assocGet */),
hashGet=require(309 /* ./_hashGet */),
isKeyable=require(303 /* ./_isKeyable */);










function mapGet(key){
var data=this.__data__;
if(isKeyable(key)){
return hashGet(typeof key=='string'?data.string:data.hash,key);}

return Map?data.map.get(key):assocGet(data.map,key);}


module.exports=mapGet;
});
__d(309 /* lodash/_hashGet.js */, function(global, require, module, exports) {var nativeCreate=require(290 /* ./_nativeCreate */);


var HASH_UNDEFINED='__lodash_hash_undefined__';


var objectProto=Object.prototype;


var hasOwnProperty=objectProto.hasOwnProperty;









function hashGet(hash,key){
if(nativeCreate){
var result=hash[key];
return result===HASH_UNDEFINED?undefined:result;}

return hasOwnProperty.call(hash,key)?hash[key]:undefined;}


module.exports=hashGet;
});
__d(313 /* lodash/_mapHas.js */, function(global, require, module, exports) {var Map=require(293 /* ./_Map */),
assocHas=require(282 /* ./_assocHas */),
hashHas=require(305 /* ./_hashHas */),
isKeyable=require(303 /* ./_isKeyable */);










function mapHas(key){
var data=this.__data__;
if(isKeyable(key)){
return hashHas(typeof key=='string'?data.string:data.hash,key);}

return Map?data.map.has(key):assocHas(data.map,key);}


module.exports=mapHas;
});
__d(316 /* lodash/_mapSet.js */, function(global, require, module, exports) {var Map=require(293 /* ./_Map */),
assocSet=require(307 /* ./_assocSet */),
hashSet=require(310 /* ./_hashSet */),
isKeyable=require(303 /* ./_isKeyable */);











function mapSet(key,value){
var data=this.__data__;
if(isKeyable(key)){
hashSet(typeof key=='string'?data.string:data.hash,key,value);}else 
if(Map){
data.map.set(key,value);}else 
{
assocSet(data.map,key,value);}

return this;}


module.exports=mapSet;
});
__d(307 /* lodash/_assocSet.js */, function(global, require, module, exports) {var assocIndexOf=require(288 /* ./_assocIndexOf */);









function assocSet(array,key,value){
var index=assocIndexOf(array,key);
if(index<0){
array.push([key,value]);}else 
{
array[index][1]=value;}}



module.exports=assocSet;
});
__d(310 /* lodash/_hashSet.js */, function(global, require, module, exports) {var nativeCreate=require(290 /* ./_nativeCreate */);


var HASH_UNDEFINED='__lodash_hash_undefined__';









function hashSet(hash,key,value){
hash[key]=nativeCreate&&value===undefined?HASH_UNDEFINED:value;}


module.exports=hashSet;
});
__d(315 /* lodash/_baseIsEqual.js */, function(global, require, module, exports) {var baseIsEqualDeep=require(351 /* ./_baseIsEqualDeep */),
isObject=require(264 /* ./isObject */),
isObjectLike=require(267 /* ./isObjectLike */);
















function baseIsEqual(value,other,customizer,bitmask,stack){
if(value===other){
return true;}

if(value==null||other==null||!isObject(value)&&!isObjectLike(other)){
return value!==value&&other!==other;}

return baseIsEqualDeep(value,other,baseIsEqual,customizer,bitmask,stack);}


module.exports=baseIsEqual;
});
__d(351 /* lodash/_baseIsEqualDeep.js */, function(global, require, module, exports) {var Stack=require(287 /* ./_Stack */),
equalArrays=require(332 /* ./_equalArrays */),
equalByTag=require(353 /* ./_equalByTag */),
equalObjects=require(342 /* ./_equalObjects */),
getTag=require(333 /* ./_getTag */),
isArray=require(275 /* ./isArray */),
isHostObject=require(299 /* ./_isHostObject */),
isTypedArray=require(338 /* ./isTypedArray */);


var PARTIAL_COMPARE_FLAG=2;


var argsTag='[object Arguments]',
arrayTag='[object Array]',
objectTag='[object Object]';


var objectProto=Object.prototype;


var hasOwnProperty=objectProto.hasOwnProperty;
















function baseIsEqualDeep(object,other,equalFunc,customizer,bitmask,stack){
var objIsArr=isArray(object),
othIsArr=isArray(other),
objTag=arrayTag,
othTag=arrayTag;

if(!objIsArr){
objTag=getTag(object);
objTag=objTag==argsTag?objectTag:objTag;}

if(!othIsArr){
othTag=getTag(other);
othTag=othTag==argsTag?objectTag:othTag;}

var objIsObj=objTag==objectTag&&!isHostObject(object),
othIsObj=othTag==objectTag&&!isHostObject(other),
isSameTag=objTag==othTag;

if(isSameTag&&!objIsObj){
stack||(stack=new Stack());
return objIsArr||isTypedArray(object)?
equalArrays(object,other,equalFunc,customizer,bitmask,stack):
equalByTag(object,other,objTag,equalFunc,customizer,bitmask,stack);}

if(!(bitmask&PARTIAL_COMPARE_FLAG)){
var objIsWrapped=objIsObj&&hasOwnProperty.call(object,'__wrapped__'),
othIsWrapped=othIsObj&&hasOwnProperty.call(other,'__wrapped__');

if(objIsWrapped||othIsWrapped){
var objUnwrapped=objIsWrapped?object.value():object,
othUnwrapped=othIsWrapped?other.value():other;

stack||(stack=new Stack());
return equalFunc(objUnwrapped,othUnwrapped,customizer,bitmask,stack);}}


if(!isSameTag){
return false;}

stack||(stack=new Stack());
return equalObjects(object,other,equalFunc,customizer,bitmask,stack);}


module.exports=baseIsEqualDeep;
});
__d(332 /* lodash/_equalArrays.js */, function(global, require, module, exports) {var arraySome=require(317 /* ./_arraySome */);


var UNORDERED_COMPARE_FLAG=1,
PARTIAL_COMPARE_FLAG=2;















function equalArrays(array,other,equalFunc,customizer,bitmask,stack){
var index=-1,
isPartial=bitmask&PARTIAL_COMPARE_FLAG,
isUnordered=bitmask&UNORDERED_COMPARE_FLAG,
arrLength=array.length,
othLength=other.length;

if(arrLength!=othLength&&!(isPartial&&othLength>arrLength)){
return false;}


var stacked=stack.get(array);
if(stacked){
return stacked==other;}

var result=true;
stack.set(array,other);


while(++index<arrLength){
var arrValue=array[index],
othValue=other[index];

if(customizer){
var compared=isPartial?
customizer(othValue,arrValue,index,other,array,stack):
customizer(arrValue,othValue,index,array,other,stack);}

if(compared!==undefined){
if(compared){
continue;}

result=false;
break;}


if(isUnordered){
if(!arraySome(other,function(othValue){
return arrValue===othValue||
equalFunc(arrValue,othValue,customizer,bitmask,stack);}))
{
result=false;
break;}}else 

if(!(
arrValue===othValue||
equalFunc(arrValue,othValue,customizer,bitmask,stack)))
{
result=false;
break;}}


stack['delete'](array);
return result;}


module.exports=equalArrays;
});
__d(317 /* lodash/_arraySome.js */, function(global, require, module, exports) {function 









arraySome(array,predicate){
var index=-1,
length=array.length;

while(++index<length){
if(predicate(array[index],index,array)){
return true;}}


return false;}


module.exports=arraySome;
});
__d(353 /* lodash/_equalByTag.js */, function(global, require, module, exports) {var Symbol=require(320 /* ./_Symbol */),
Uint8Array=require(312 /* ./_Uint8Array */),
equalArrays=require(332 /* ./_equalArrays */),
mapToArray=require(319 /* ./_mapToArray */),
setToArray=require(321 /* ./_setToArray */);


var UNORDERED_COMPARE_FLAG=1,
PARTIAL_COMPARE_FLAG=2;


var boolTag='[object Boolean]',
dateTag='[object Date]',
errorTag='[object Error]',
mapTag='[object Map]',
numberTag='[object Number]',
regexpTag='[object RegExp]',
setTag='[object Set]',
stringTag='[object String]',
symbolTag='[object Symbol]';

var arrayBufferTag='[object ArrayBuffer]',
dataViewTag='[object DataView]';


var symbolProto=Symbol?typeof Symbol==='function'?Symbol.prototype:'@@prototype':undefined,
symbolValueOf=symbolProto?symbolProto.valueOf:undefined;



















function equalByTag(object,other,tag,equalFunc,customizer,bitmask,stack){
switch(tag){
case dataViewTag:
if(object.byteLength!=other.byteLength||
object.byteOffset!=other.byteOffset){
return false;}

object=object.buffer;
other=other.buffer;

case arrayBufferTag:
if(object.byteLength!=other.byteLength||
!equalFunc(new Uint8Array(object),new Uint8Array(other))){
return false;}

return true;

case boolTag:
case dateTag:



return +object==+other;

case errorTag:
return object.name==other.name&&object.message==other.message;

case numberTag:

return object!=+object?other!=+other:object==+other;

case regexpTag:
case stringTag:



return object==other+'';

case mapTag:
var convert=mapToArray;

case setTag:
var isPartial=bitmask&PARTIAL_COMPARE_FLAG;
convert||(convert=setToArray);

if(object.size!=other.size&&!isPartial){
return false;}


var stacked=stack.get(object);
if(stacked){
return stacked==other;}

bitmask|=UNORDERED_COMPARE_FLAG;
stack.set(object,other);


return equalArrays(convert(object),convert(other),equalFunc,customizer,bitmask,stack);

case symbolTag:
if(symbolValueOf){
return symbolValueOf.call(object)==symbolValueOf.call(other);}}


return false;}


module.exports=equalByTag;
});
__d(320 /* lodash/_Symbol.js */, function(global, require, module, exports) {var root=require(311 /* ./_root */);


var Symbol=root.Symbol;

module.exports=Symbol;
});
__d(312 /* lodash/_Uint8Array.js */, function(global, require, module, exports) {var root=require(311 /* ./_root */);


var Uint8Array=root.Uint8Array;

module.exports=Uint8Array;
});
__d(319 /* lodash/_mapToArray.js */, function(global, require, module, exports) {function 






mapToArray(map){
var index=-1,
result=Array(map.size);

map.forEach(function(value,key){
result[++index]=[key,value];});

return result;}


module.exports=mapToArray;
});
__d(321 /* lodash/_setToArray.js */, function(global, require, module, exports) {function 






setToArray(set){
var index=-1,
result=Array(set.size);

set.forEach(function(value){
result[++index]=value;});

return result;}


module.exports=setToArray;
});
__d(342 /* lodash/_equalObjects.js */, function(global, require, module, exports) {var baseHas=require(255 /* ./_baseHas */),
keys=require(262 /* ./keys */);


var PARTIAL_COMPARE_FLAG=2;















function equalObjects(object,other,equalFunc,customizer,bitmask,stack){
var isPartial=bitmask&PARTIAL_COMPARE_FLAG,
objProps=keys(object),
objLength=objProps.length,
othProps=keys(other),
othLength=othProps.length;

if(objLength!=othLength&&!isPartial){
return false;}

var index=objLength;
while(index--){
var key=objProps[index];
if(!(isPartial?key in other:baseHas(other,key))){
return false;}}



var stacked=stack.get(object);
if(stacked){
return stacked==other;}

var result=true;
stack.set(object,other);

var skipCtor=isPartial;
while(++index<objLength){
key=objProps[index];
var objValue=object[key],
othValue=other[key];

if(customizer){
var compared=isPartial?
customizer(othValue,objValue,key,other,object,stack):
customizer(objValue,othValue,key,object,other,stack);}


if(!(compared===undefined?
objValue===othValue||equalFunc(objValue,othValue,customizer,bitmask,stack):
compared))
{
result=false;
break;}

skipCtor||(skipCtor=key=='constructor');}

if(result&&!skipCtor){
var objCtor=object.constructor,
othCtor=other.constructor;


if(objCtor!=othCtor&&
'constructor' in object&&'constructor' in other&&
!(typeof objCtor=='function'&&objCtor instanceof objCtor&&
typeof othCtor=='function'&&othCtor instanceof othCtor)){
result=false;}}


stack['delete'](object);
return result;}


module.exports=equalObjects;
});
__d(333 /* lodash/_getTag.js */, function(global, require, module, exports) {var DataView=require(318 /* ./_DataView */),
Map=require(293 /* ./_Map */),
Promise=require(323 /* ./_Promise */),
Set=require(322 /* ./_Set */),
WeakMap=require(324 /* ./_WeakMap */),
toSource=require(297 /* ./_toSource */);


var mapTag='[object Map]',
objectTag='[object Object]',
promiseTag='[object Promise]',
setTag='[object Set]',
weakMapTag='[object WeakMap]';

var dataViewTag='[object DataView]';


var objectProto=Object.prototype;






var objectToString=objectProto.toString;


var dataViewCtorString=toSource(DataView),
mapCtorString=toSource(Map),
promiseCtorString=toSource(Promise),
setCtorString=toSource(Set),
weakMapCtorString=toSource(WeakMap);








function getTag(value){
return objectToString.call(value);}




if(DataView&&getTag(new DataView(new ArrayBuffer(1)))!=dataViewTag||
Map&&getTag(new Map())!=mapTag||
Promise&&getTag(Promise.resolve())!=promiseTag||
Set&&getTag(new Set())!=setTag||
WeakMap&&getTag(new WeakMap())!=weakMapTag){
getTag=function getTag(value){
var result=objectToString.call(value),
Ctor=result==objectTag?value.constructor:undefined,
ctorString=Ctor?toSource(Ctor):undefined;

if(ctorString){
switch(ctorString){
case dataViewCtorString:return dataViewTag;
case mapCtorString:return mapTag;
case promiseCtorString:return promiseTag;
case setCtorString:return setTag;
case weakMapCtorString:return weakMapTag;}}


return result;};}



module.exports=getTag;
});
__d(318 /* lodash/_DataView.js */, function(global, require, module, exports) {var getNative=require(292 /* ./_getNative */),
root=require(311 /* ./_root */);


var DataView=getNative(root,'DataView');

module.exports=DataView;
});
__d(323 /* lodash/_Promise.js */, function(global, require, module, exports) {var getNative=require(292 /* ./_getNative */),
root=require(311 /* ./_root */);


var Promise=getNative(root,'Promise');

module.exports=Promise;
});
__d(322 /* lodash/_Set.js */, function(global, require, module, exports) {var getNative=require(292 /* ./_getNative */),
root=require(311 /* ./_root */);


var Set=getNative(root,'Set');

module.exports=Set;
});
__d(324 /* lodash/_WeakMap.js */, function(global, require, module, exports) {var getNative=require(292 /* ./_getNative */),
root=require(311 /* ./_root */);


var WeakMap=getNative(root,'WeakMap');

module.exports=WeakMap;
});
__d(338 /* lodash/isTypedArray.js */, function(global, require, module, exports) {var isLength=require(270 /* ./isLength */),
isObjectLike=require(267 /* ./isObjectLike */);


var argsTag='[object Arguments]',
arrayTag='[object Array]',
boolTag='[object Boolean]',
dateTag='[object Date]',
errorTag='[object Error]',
funcTag='[object Function]',
mapTag='[object Map]',
numberTag='[object Number]',
objectTag='[object Object]',
regexpTag='[object RegExp]',
setTag='[object Set]',
stringTag='[object String]',
weakMapTag='[object WeakMap]';

var arrayBufferTag='[object ArrayBuffer]',
dataViewTag='[object DataView]',
float32Tag='[object Float32Array]',
float64Tag='[object Float64Array]',
int8Tag='[object Int8Array]',
int16Tag='[object Int16Array]',
int32Tag='[object Int32Array]',
uint8Tag='[object Uint8Array]',
uint8ClampedTag='[object Uint8ClampedArray]',
uint16Tag='[object Uint16Array]',
uint32Tag='[object Uint32Array]';


var typedArrayTags={};
typedArrayTags[float32Tag]=typedArrayTags[float64Tag]=
typedArrayTags[int8Tag]=typedArrayTags[int16Tag]=
typedArrayTags[int32Tag]=typedArrayTags[uint8Tag]=
typedArrayTags[uint8ClampedTag]=typedArrayTags[uint16Tag]=
typedArrayTags[uint32Tag]=true;
typedArrayTags[argsTag]=typedArrayTags[arrayTag]=
typedArrayTags[arrayBufferTag]=typedArrayTags[boolTag]=
typedArrayTags[dataViewTag]=typedArrayTags[dateTag]=
typedArrayTags[errorTag]=typedArrayTags[funcTag]=
typedArrayTags[mapTag]=typedArrayTags[numberTag]=
typedArrayTags[objectTag]=typedArrayTags[regexpTag]=
typedArrayTags[setTag]=typedArrayTags[stringTag]=
typedArrayTags[weakMapTag]=false;


var objectProto=Object.prototype;






var objectToString=objectProto.toString;



















function isTypedArray(value){
return isObjectLike(value)&&
isLength(value.length)&&!!typedArrayTags[objectToString.call(value)];}


module.exports=isTypedArray;
});
__d(328 /* lodash/_getMatchData.js */, function(global, require, module, exports) {var isStrictComparable=require(326 /* ./_isStrictComparable */),
toPairs=require(327 /* ./toPairs */);








function getMatchData(object){
var result=toPairs(object),
length=result.length;

while(length--){
result[length][2]=isStrictComparable(result[length][1]);}

return result;}


module.exports=getMatchData;
});
__d(326 /* lodash/_isStrictComparable.js */, function(global, require, module, exports) {var isObject=require(264 /* ./isObject */);









function isStrictComparable(value){
return value===value&&!isObject(value);}


module.exports=isStrictComparable;
});
__d(327 /* lodash/toPairs.js */, function(global, require, module, exports) {var baseToPairs=require(325 /* ./_baseToPairs */),
keys=require(262 /* ./keys */);
























function toPairs(object){
return baseToPairs(object,keys(object));}


module.exports=toPairs;
});
__d(325 /* lodash/_baseToPairs.js */, function(global, require, module, exports) {var arrayMap=require(329 /* ./_arrayMap */);










function baseToPairs(object,props){
return arrayMap(props,function(key){
return [key,object[key]];});}



module.exports=baseToPairs;
});
__d(329 /* lodash/_arrayMap.js */, function(global, require, module, exports) {function 








arrayMap(array,iteratee){
var index=-1,
length=array.length,
result=Array(length);

while(++index<length){
result[index]=iteratee(array[index],index,array);}

return result;}


module.exports=arrayMap;
});
__d(330 /* lodash/_matchesStrictComparable.js */, function(global, require, module, exports) {function 








matchesStrictComparable(key,srcValue){
return function(object){
if(object==null){
return false;}

return object[key]===srcValue&&(
srcValue!==undefined||key in Object(object));};}



module.exports=matchesStrictComparable;
});
__d(340 /* lodash/_baseMatchesProperty.js */, function(global, require, module, exports) {var baseIsEqual=require(315 /* ./_baseIsEqual */),
get=require(334 /* ./get */),
hasIn=require(337 /* ./hasIn */),
isKey=require(346 /* ./_isKey */),
isStrictComparable=require(326 /* ./_isStrictComparable */),
matchesStrictComparable=require(330 /* ./_matchesStrictComparable */),
toKey=require(339 /* ./_toKey */);


var UNORDERED_COMPARE_FLAG=1,
PARTIAL_COMPARE_FLAG=2;









function baseMatchesProperty(path,srcValue){
if(isKey(path)&&isStrictComparable(srcValue)){
return matchesStrictComparable(toKey(path),srcValue);}

return function(object){
var objValue=get(object,path);
return objValue===undefined&&objValue===srcValue?
hasIn(object,path):
baseIsEqual(srcValue,objValue,undefined,UNORDERED_COMPARE_FLAG|PARTIAL_COMPARE_FLAG);};}



module.exports=baseMatchesProperty;
});
__d(334 /* lodash/get.js */, function(global, require, module, exports) {var baseGet=require(343 /* ./_baseGet */);


























function get(object,path,defaultValue){
var result=object==null?undefined:baseGet(object,path);
return result===undefined?defaultValue:result;}


module.exports=get;
});
__d(343 /* lodash/_baseGet.js */, function(global, require, module, exports) {var castPath=require(331 /* ./_castPath */),
isKey=require(346 /* ./_isKey */),
toKey=require(339 /* ./_toKey */);









function baseGet(object,path){
path=isKey(path,object)?[path]:castPath(path);

var index=0,
length=path.length;

while(object!=null&&index<length){
object=object[toKey(path[index++])];}

return index&&index==length?object:undefined;}


module.exports=baseGet;
});
__d(331 /* lodash/_castPath.js */, function(global, require, module, exports) {var isArray=require(275 /* ./isArray */),
stringToPath=require(336 /* ./_stringToPath */);








function castPath(value){
return isArray(value)?value:stringToPath(value);}


module.exports=castPath;
});
__d(336 /* lodash/_stringToPath.js */, function(global, require, module, exports) {var memoize=require(347 /* ./memoize */),
toString=require(335 /* ./toString */);


var rePropName=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g;


var reEscapeChar=/\\(\\)?/g;








var stringToPath=memoize(function(string){
var result=[];
toString(string).replace(rePropName,function(match,number,quote,string){
result.push(quote?string.replace(reEscapeChar,'$1'):number||match);});

return result;});


module.exports=stringToPath;
});
__d(347 /* lodash/memoize.js */, function(global, require, module, exports) {var MapCache=require(295 /* ./_MapCache */);


var FUNC_ERROR_TEXT='Expected a function';













































function memoize(func,resolver){
if(typeof func!='function'||resolver&&typeof resolver!='function'){
throw new TypeError(FUNC_ERROR_TEXT);}

var memoized=function memoized(){
var args=arguments,
key=resolver?resolver.apply(this,args):args[0],
cache=memoized.cache;

if(cache.has(key)){
return cache.get(key);}

var result=func.apply(this,args);
memoized.cache=cache.set(key,result);
return result;};

memoized.cache=new (memoize.Cache||MapCache)();
return memoized;}



memoize.Cache=MapCache;

module.exports=memoize;
});
__d(335 /* lodash/toString.js */, function(global, require, module, exports) {var baseToString=require(350 /* ./_baseToString */);






















function toString(value){
return value==null?'':baseToString(value);}


module.exports=toString;
});
__d(350 /* lodash/_baseToString.js */, function(global, require, module, exports) {var Symbol=require(320 /* ./_Symbol */),
isSymbol=require(341 /* ./isSymbol */);


var INFINITY=1/0;


var symbolProto=Symbol?typeof Symbol==='function'?Symbol.prototype:'@@prototype':undefined,
symbolToString=symbolProto?symbolProto.toString:undefined;









function baseToString(value){

if(typeof value=='string'){
return value;}

if(isSymbol(value)){
return symbolToString?symbolToString.call(value):'';}

var result=value+'';
return result=='0'&&1/value==-INFINITY?'-0':result;}


module.exports=baseToString;
});
__d(341 /* lodash/isSymbol.js */, function(global, require, module, exports) {var isObjectLike=require(267 /* ./isObjectLike */);


var symbolTag='[object Symbol]';


var objectProto=Object.prototype;






var objectToString=objectProto.toString;



















function isSymbol(value){
return typeof value=='symbol'||
isObjectLike(value)&&objectToString.call(value)==symbolTag;}


module.exports=isSymbol;
});
__d(346 /* lodash/_isKey.js */, function(global, require, module, exports) {var isArray=require(275 /* ./isArray */),
isSymbol=require(341 /* ./isSymbol */);


var reIsDeepProp=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
reIsPlainProp=/^\w*$/;









function isKey(value,object){
if(isArray(value)){
return false;}

var type=typeof value;
if(type=='number'||type=='symbol'||type=='boolean'||
value==null||isSymbol(value)){
return true;}

return reIsPlainProp.test(value)||!reIsDeepProp.test(value)||
object!=null&&value in Object(object);}


module.exports=isKey;
});
__d(339 /* lodash/_toKey.js */, function(global, require, module, exports) {var isSymbol=require(341 /* ./isSymbol */);


var INFINITY=1/0;








function toKey(value){
if(typeof value=='string'||isSymbol(value)){
return value;}

var result=value+'';
return result=='0'&&1/value==-INFINITY?'-0':result;}


module.exports=toKey;
});
__d(337 /* lodash/hasIn.js */, function(global, require, module, exports) {var baseHasIn=require(344 /* ./_baseHasIn */),
hasPath=require(370 /* ./_hasPath */);



























function hasIn(object,path){
return object!=null&&hasPath(object,path,baseHasIn);}


module.exports=hasIn;
});
__d(344 /* lodash/_baseHasIn.js */, function(global, require, module, exports) {function 







baseHasIn(object,key){
return key in Object(object);}


module.exports=baseHasIn;
});
__d(370 /* lodash/_hasPath.js */, function(global, require, module, exports) {var castPath=require(331 /* ./_castPath */),
isArguments=require(266 /* ./isArguments */),
isArray=require(275 /* ./isArray */),
isIndex=require(276 /* ./_isIndex */),
isKey=require(346 /* ./_isKey */),
isLength=require(270 /* ./isLength */),
isString=require(269 /* ./isString */),
toKey=require(339 /* ./_toKey */);










function hasPath(object,path,hasFunc){
path=isKey(path,object)?[path]:castPath(path);

var result,
index=-1,
length=path.length;

while(++index<length){
var key=toKey(path[index]);
if(!(result=object!=null&&hasFunc(object,key))){
break;}

object=object[key];}

if(result){
return result;}

var length=object?object.length:0;
return !!length&&isLength(length)&&isIndex(key,length)&&(
isArray(object)||isString(object)||isArguments(object));}


module.exports=hasPath;
});
__d(345 /* lodash/identity.js */, function(global, require, module, exports) {function 















identity(value){
return value;}


module.exports=identity;
});
__d(348 /* lodash/property.js */, function(global, require, module, exports) {var baseProperty=require(263 /* ./_baseProperty */),
basePropertyDeep=require(349 /* ./_basePropertyDeep */),
isKey=require(346 /* ./_isKey */),
toKey=require(339 /* ./_toKey */);























function property(path){
return isKey(path)?baseProperty(toKey(path)):basePropertyDeep(path);}


module.exports=property;
});
__d(349 /* lodash/_basePropertyDeep.js */, function(global, require, module, exports) {var baseGet=require(343 /* ./_baseGet */);








function basePropertyDeep(path){
return function(object){
return baseGet(object,path);};}



module.exports=basePropertyDeep;
});
__d(396 /* react-proxy/modules/createPrototypeProxy.js */, function(global, require, module, exports) {'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});

exports.default=createPrototypeProxy;

var _assign=require(362 /* lodash/assign */);

var _assign2=_interopRequireDefault(_assign);

var _difference=require(357 /* lodash/difference */);

var _difference2=_interopRequireDefault(_difference);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function createPrototypeProxy(){
var proxy={};
var current=null;
var mountedInstances=[];




function proxyToString(name){

return function toString(){
if(typeof current[name]==='function'){
return current[name].toString();}else 
{
return '<method was deleted>';}};}







function proxyMethod(name){

var proxiedMethod=function proxiedMethod(){
if(typeof current[name]==='function'){
return current[name].apply(this,arguments);}};




(0,_assign2.default)(proxiedMethod,current[name]);
proxiedMethod.toString=proxyToString(name);

return proxiedMethod;}





function proxiedComponentDidMount(){
mountedInstances.push(this);
if(typeof current.componentDidMount==='function'){
return current.componentDidMount.apply(this,arguments);}}


proxiedComponentDidMount.toString=proxyToString('componentDidMount');




function proxiedComponentWillUnmount(){
var index=mountedInstances.indexOf(this);

if(index!==-1){
mountedInstances.splice(index,1);}

if(typeof current.componentWillUnmount==='function'){
return current.componentWillUnmount.apply(this,arguments);}}


proxiedComponentWillUnmount.toString=proxyToString('componentWillUnmount');




function defineProxyProperty(name,descriptor){
Object.defineProperty(proxy,name,descriptor);}





function defineProxyPropertyWithValue(name,value){
var _ref=Object.getOwnPropertyDescriptor(current,name)||{};

var _ref$enumerable=_ref.enumerable;
var enumerable=_ref$enumerable===undefined?false:_ref$enumerable;
var _ref$writable=_ref.writable;
var writable=_ref$writable===undefined?true:_ref$writable;


defineProxyProperty(name,{
configurable:true,
enumerable:enumerable,
writable:writable,
value:value});}






function createAutoBindMap(){
if(!current.__reactAutoBindMap){
return;}


var __reactAutoBindMap={};
for(var name in current.__reactAutoBindMap){
if(typeof proxy[name]==='function'&&current.__reactAutoBindMap.hasOwnProperty(name)){
__reactAutoBindMap[name]=proxy[name];}}



return __reactAutoBindMap;}





function createAutoBindPairs(){
var __reactAutoBindPairs=[];

for(var i=0;i<current.__reactAutoBindPairs.length;i+=2){
var name=current.__reactAutoBindPairs[i];
var method=proxy[name];

if(typeof method==='function'){
__reactAutoBindPairs.push(name,method);}}



return __reactAutoBindPairs;}





function update(next){

current=next;


var currentNames=Object.getOwnPropertyNames(current);
var previousName=Object.getOwnPropertyNames(proxy);
var removedNames=(0,_difference2.default)(previousName,currentNames);


removedNames.forEach(function(name){
delete proxy[name];});



currentNames.forEach(function(name){
var descriptor=Object.getOwnPropertyDescriptor(current,name);
if(typeof descriptor.value==='function'){

defineProxyPropertyWithValue(name,proxyMethod(name));}else 
{

defineProxyProperty(name,descriptor);}});




defineProxyPropertyWithValue('componentDidMount',proxiedComponentDidMount);
defineProxyPropertyWithValue('componentWillUnmount',proxiedComponentWillUnmount);

if(current.hasOwnProperty('__reactAutoBindMap')){
defineProxyPropertyWithValue('__reactAutoBindMap',createAutoBindMap());}


if(current.hasOwnProperty('__reactAutoBindPairs')){
defineProxyPropertyWithValue('__reactAutoBindPairs',createAutoBindPairs());}



proxy.__proto__=next;

return mountedInstances;}





function get(){
return proxy;}


return {
update:update,
get:get};}

;
});
__d(362 /* lodash/assign.js */, function(global, require, module, exports) {var assignValue=require(356 /* ./_assignValue */),
copyObject=require(354 /* ./_copyObject */),
createAssigner=require(358 /* ./_createAssigner */),
isArrayLike=require(258 /* ./isArrayLike */),
isPrototype=require(271 /* ./_isPrototype */),
keys=require(262 /* ./keys */);


var objectProto=Object.prototype;


var hasOwnProperty=objectProto.hasOwnProperty;


var propertyIsEnumerable=objectProto.propertyIsEnumerable;


var nonEnumShadows=!propertyIsEnumerable.call({'valueOf':1},'valueOf');

































var assign=createAssigner(function(object,source){
if(nonEnumShadows||isPrototype(source)||isArrayLike(source)){
copyObject(source,keys(source),object);
return;}

for(var key in source){
if(hasOwnProperty.call(source,key)){
assignValue(object,key,source[key]);}}});




module.exports=assign;
});
__d(356 /* lodash/_assignValue.js */, function(global, require, module, exports) {var eq=require(280 /* ./eq */);


var objectProto=Object.prototype;


var hasOwnProperty=objectProto.hasOwnProperty;











function assignValue(object,key,value){
var objValue=object[key];
if(!(hasOwnProperty.call(object,key)&&eq(objValue,value))||
value===undefined&&!(key in object)){
object[key]=value;}}



module.exports=assignValue;
});
__d(354 /* lodash/_copyObject.js */, function(global, require, module, exports) {var assignValue=require(356 /* ./_assignValue */);











function copyObject(source,props,object,customizer){
object||(object={});

var index=-1,
length=props.length;

while(++index<length){
var key=props[index];

var newValue=customizer?
customizer(object[key],source[key],key,object,source):
source[key];

assignValue(object,key,newValue);}

return object;}


module.exports=copyObject;
});
__d(358 /* lodash/_createAssigner.js */, function(global, require, module, exports) {var isIterateeCall=require(352 /* ./_isIterateeCall */),
rest=require(360 /* ./rest */);








function createAssigner(assigner){
return rest(function(object,sources){
var index=-1,
length=sources.length,
customizer=length>1?sources[length-1]:undefined,
guard=length>2?sources[2]:undefined;

customizer=typeof customizer=='function'?(
length--,customizer):
undefined;

if(guard&&isIterateeCall(sources[0],sources[1],guard)){
customizer=length<3?undefined:customizer;
length=1;}

object=Object(object);
while(++index<length){
var source=sources[index];
if(source){
assigner(object,source,index,customizer);}}


return object;});}



module.exports=createAssigner;
});
__d(352 /* lodash/_isIterateeCall.js */, function(global, require, module, exports) {var eq=require(280 /* ./eq */),
isArrayLike=require(258 /* ./isArrayLike */),
isIndex=require(276 /* ./_isIndex */),
isObject=require(264 /* ./isObject */);











function isIterateeCall(value,index,object){
if(!isObject(object)){
return false;}

var type=typeof index;
if(type=='number'?
isArrayLike(object)&&isIndex(index,object.length):
type=='string'&&index in object)
{
return eq(object[index],value);}

return false;}


module.exports=isIterateeCall;
});
__d(360 /* lodash/rest.js */, function(global, require, module, exports) {var apply=require(355 /* ./_apply */),
toInteger=require(359 /* ./toInteger */);


var FUNC_ERROR_TEXT='Expected a function';


var nativeMax=Math.max;


























function rest(func,start){
if(typeof func!='function'){
throw new TypeError(FUNC_ERROR_TEXT);}

start=nativeMax(start===undefined?func.length-1:toInteger(start),0);
return function(){
var args=arguments,
index=-1,
length=nativeMax(args.length-start,0),
array=Array(length);

while(++index<length){
array[index]=args[start+index];}

switch(start){
case 0:return func.call(this,array);
case 1:return func.call(this,args[0],array);
case 2:return func.call(this,args[0],args[1],array);}

var otherArgs=Array(start+1);
index=-1;
while(++index<start){
otherArgs[index]=args[index];}

otherArgs[start]=array;
return apply(func,this,otherArgs);};}



module.exports=rest;
});
__d(355 /* lodash/_apply.js */, function(global, require, module, exports) {function 









apply(func,thisArg,args){
var length=args.length;
switch(length){
case 0:return func.call(thisArg);
case 1:return func.call(thisArg,args[0]);
case 2:return func.call(thisArg,args[0],args[1]);
case 3:return func.call(thisArg,args[0],args[1],args[2]);}

return func.apply(thisArg,args);}


module.exports=apply;
});
__d(359 /* lodash/toInteger.js */, function(global, require, module, exports) {var toNumber=require(364 /* ./toNumber */);


var INFINITY=1/0,
MAX_INTEGER=1.7976931348623157e+308;



























function toInteger(value){
if(!value){
return value===0?value:0;}

value=toNumber(value);
if(value===INFINITY||value===-INFINITY){
var sign=value<0?-1:1;
return sign*MAX_INTEGER;}

var remainder=value%1;
return value===value?remainder?value-remainder:value:0;}


module.exports=toInteger;
});
__d(364 /* lodash/toNumber.js */, function(global, require, module, exports) {var isFunction=require(268 /* ./isFunction */),
isObject=require(264 /* ./isObject */),
isSymbol=require(341 /* ./isSymbol */);


var NAN=0/0;


var reTrim=/^\s+|\s+$/g;


var reIsBadHex=/^[-+]0x[0-9a-f]+$/i;


var reIsBinary=/^0b[01]+$/i;


var reIsOctal=/^0o[0-7]+$/i;


var freeParseInt=parseInt;
























function toNumber(value){
if(typeof value=='number'){
return value;}

if(isSymbol(value)){
return NAN;}

if(isObject(value)){
var other=isFunction(value.valueOf)?value.valueOf():value;
value=isObject(other)?other+'':other;}

if(typeof value!='string'){
return value===0?value:+value;}

value=value.replace(reTrim,'');
var isBinary=reIsBinary.test(value);
return isBinary||reIsOctal.test(value)?
freeParseInt(value.slice(2),isBinary?2:8):
reIsBadHex.test(value)?NAN:+value;}


module.exports=toNumber;
});
__d(357 /* lodash/difference.js */, function(global, require, module, exports) {var baseDifference=require(380 /* ./_baseDifference */),
baseFlatten=require(379 /* ./_baseFlatten */),
isArrayLikeObject=require(257 /* ./isArrayLikeObject */),
rest=require(360 /* ./rest */);




















var difference=rest(function(array,values){
return isArrayLikeObject(array)?
baseDifference(array,baseFlatten(values,1,isArrayLikeObject,true)):
[];});


module.exports=difference;
});
__d(380 /* lodash/_baseDifference.js */, function(global, require, module, exports) {var SetCache=require(361 /* ./_SetCache */),
arrayIncludes=require(363 /* ./_arrayIncludes */),
arrayIncludesWith=require(369 /* ./_arrayIncludesWith */),
arrayMap=require(329 /* ./_arrayMap */),
baseUnary=require(365 /* ./_baseUnary */),
cacheHas=require(374 /* ./_cacheHas */);


var LARGE_ARRAY_SIZE=200;












function baseDifference(array,values,iteratee,comparator){
var index=-1,
includes=arrayIncludes,
isCommon=true,
length=array.length,
result=[],
valuesLength=values.length;

if(!length){
return result;}

if(iteratee){
values=arrayMap(values,baseUnary(iteratee));}

if(comparator){
includes=arrayIncludesWith;
isCommon=false;}else 

if(values.length>=LARGE_ARRAY_SIZE){
includes=cacheHas;
isCommon=false;
values=new SetCache(values);}

outer: 
while(++index<length){
var value=array[index],
computed=iteratee?iteratee(value):value;

value=comparator||value!==0?value:0;
if(isCommon&&computed===computed){
var valuesIndex=valuesLength;
while(valuesIndex--){
if(values[valuesIndex]===computed){
continue outer;}}


result.push(value);}else 

if(!includes(values,computed,comparator)){
result.push(value);}}


return result;}


module.exports=baseDifference;
});
__d(361 /* lodash/_SetCache.js */, function(global, require, module, exports) {var MapCache=require(295 /* ./_MapCache */),
cachePush=require(366 /* ./_cachePush */);









function SetCache(values){
var index=-1,
length=values?values.length:0;

this.__data__=new MapCache();
while(++index<length){
this.push(values[index]);}}




SetCache.prototype.push=cachePush;

module.exports=SetCache;
});
__d(366 /* lodash/_cachePush.js */, function(global, require, module, exports) {var isKeyable=require(303 /* ./_isKeyable */);


var HASH_UNDEFINED='__lodash_hash_undefined__';









function cachePush(value){
var map=this.__data__;
if(isKeyable(value)){
var data=map.__data__,
hash=typeof value=='string'?data.string:data.hash;

hash[value]=HASH_UNDEFINED;}else 

{
map.set(value,HASH_UNDEFINED);}}



module.exports=cachePush;
});
__d(363 /* lodash/_arrayIncludes.js */, function(global, require, module, exports) {var baseIndexOf=require(371 /* ./_baseIndexOf */);










function arrayIncludes(array,value){
return !!array.length&&baseIndexOf(array,value,0)>-1;}


module.exports=arrayIncludes;
});
__d(371 /* lodash/_baseIndexOf.js */, function(global, require, module, exports) {var indexOfNaN=require(367 /* ./_indexOfNaN */);










function baseIndexOf(array,value,fromIndex){
if(value!==value){
return indexOfNaN(array,fromIndex);}

var index=fromIndex-1,
length=array.length;

while(++index<length){
if(array[index]===value){
return index;}}


return -1;}


module.exports=baseIndexOf;
});
__d(367 /* lodash/_indexOfNaN.js */, function(global, require, module, exports) {function 








indexOfNaN(array,fromIndex,fromRight){
var length=array.length,
index=fromIndex+(fromRight?0:-1);

while(fromRight?index--:++index<length){
var other=array[index];
if(other!==other){
return index;}}


return -1;}


module.exports=indexOfNaN;
});
__d(369 /* lodash/_arrayIncludesWith.js */, function(global, require, module, exports) {function 








arrayIncludesWith(array,value,comparator){
var index=-1,
length=array.length;

while(++index<length){
if(comparator(value,array[index])){
return true;}}


return false;}


module.exports=arrayIncludesWith;
});
__d(365 /* lodash/_baseUnary.js */, function(global, require, module, exports) {function 






baseUnary(func){
return function(value){
return func(value);};}



module.exports=baseUnary;
});
__d(374 /* lodash/_cacheHas.js */, function(global, require, module, exports) {var isKeyable=require(303 /* ./_isKeyable */);


var HASH_UNDEFINED='__lodash_hash_undefined__';









function cacheHas(cache,value){
var map=cache.__data__;
if(isKeyable(value)){
var data=map.__data__,
hash=typeof value=='string'?data.string:data.hash;

return hash[value]===HASH_UNDEFINED;}

return map.has(value);}


module.exports=cacheHas;
});
__d(379 /* lodash/_baseFlatten.js */, function(global, require, module, exports) {var arrayPush=require(372 /* ./_arrayPush */),
isFlattenable=require(368 /* ./_isFlattenable */);












function baseFlatten(array,depth,predicate,isStrict,result){
var index=-1,
length=array.length;

predicate||(predicate=isFlattenable);
result||(result=[]);

while(++index<length){
var value=array[index];
if(depth>0&&predicate(value)){
if(depth>1){

baseFlatten(value,depth-1,predicate,isStrict,result);}else 
{
arrayPush(result,value);}}else 

if(!isStrict){
result[result.length]=value;}}


return result;}


module.exports=baseFlatten;
});
__d(372 /* lodash/_arrayPush.js */, function(global, require, module, exports) {function 







arrayPush(array,values){
var index=-1,
length=values.length,
offset=array.length;

while(++index<length){
array[offset+index]=values[index];}

return array;}


module.exports=arrayPush;
});
__d(368 /* lodash/_isFlattenable.js */, function(global, require, module, exports) {var isArguments=require(266 /* ./isArguments */),
isArray=require(275 /* ./isArray */),
isArrayLikeObject=require(257 /* ./isArrayLikeObject */);








function isFlattenable(value){
return isArrayLikeObject(value)&&(isArray(value)||isArguments(value));}


module.exports=isFlattenable;
});
__d(393 /* react-proxy/modules/bindAutoBindMethods.js */, function(global, require, module, exports) {'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});

exports.default=bindAutoBindMethods;












function bindAutoBindMethod(component,method){
var boundMethod=method.bind(component);

boundMethod.__reactBoundContext=component;
boundMethod.__reactBoundMethod=method;
boundMethod.__reactBoundArguments=null;

var componentName=component.constructor.displayName,
_bind=boundMethod.bind;

boundMethod.bind=function(newThis){
var args=Array.prototype.slice.call(arguments,1);
if(newThis!==component&&newThis!==null){
console.warn('bind(): React component methods may only be bound to the '+'component instance. See '+componentName);}else 
if(!args.length){
console.warn('bind(): You are binding a component method to the component. '+'React does this for you automatically in a high-performance '+'way, so you can safely remove this call. See '+componentName);
return boundMethod;}


var reboundMethod=_bind.apply(boundMethod,arguments);
reboundMethod.__reactBoundContext=component;
reboundMethod.__reactBoundMethod=method;
reboundMethod.__reactBoundArguments=args;

return reboundMethod;};


return boundMethod;}


function bindAutoBindMethodsFromMap(component){
for(var autoBindKey in component.__reactAutoBindMap){
if(!component.__reactAutoBindMap.hasOwnProperty(autoBindKey)){
return;}





if(component.hasOwnProperty(autoBindKey)&&component[autoBindKey].__reactBoundContext===component){
continue;}


var method=component.__reactAutoBindMap[autoBindKey];
component[autoBindKey]=bindAutoBindMethod(component,method);}}



function bindAutoBindMethods(component){
if(component.__reactAutoBindPairs){
bindAutoBindMethodsFromArray(component);}else 
if(component.__reactAutoBindMap){
bindAutoBindMethodsFromMap(component);}}



function bindAutoBindMethodsFromArray(component){
var pairs=component.__reactAutoBindPairs;

if(!pairs){
return;}


for(var i=0;i<pairs.length;i+=2){
var autoBindKey=pairs[i];

if(component.hasOwnProperty(autoBindKey)&&component[autoBindKey].__reactBoundContext===component){
continue;}


var method=pairs[i+1];

component[autoBindKey]=bindAutoBindMethod(component,method);}}
});
__d(386 /* react-proxy/modules/deleteUnknownAutoBindMethods.js */, function(global, require, module, exports) {'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});

exports.default=deleteUnknownAutoBindMethods;
function shouldDeleteClassicInstanceMethod(component,name){
if(component.__reactAutoBindMap&&component.__reactAutoBindMap.hasOwnProperty(name)){

return false;}


if(component.__reactAutoBindPairs&&component.__reactAutoBindPairs.indexOf(name)>=0){

return false;}


if(component[name].__reactBoundArguments!==null){

return false;}




return true;}


function shouldDeleteModernInstanceMethod(component,name){
var prototype=component.constructor.prototype;

var prototypeDescriptor=Object.getOwnPropertyDescriptor(prototype,name);

if(!prototypeDescriptor||!prototypeDescriptor.get){

return false;}


if(prototypeDescriptor.get().length!==component[name].length){

return false;}




return true;}


function shouldDeleteInstanceMethod(component,name){
var descriptor=Object.getOwnPropertyDescriptor(component,name);
if(typeof descriptor.value!=='function'){

return;}


if(component.__reactAutoBindMap||component.__reactAutoBindPairs){

return shouldDeleteClassicInstanceMethod(component,name);}else 
{

return shouldDeleteModernInstanceMethod(component,name);}}














function deleteUnknownAutoBindMethods(component){
var names=Object.getOwnPropertyNames(component);

names.forEach(function(name){
if(shouldDeleteInstanceMethod(component,name)){
delete component[name];}});}
});
__d(387 /* react-deep-force-update/lib/index.js */, function(global, require, module, exports) {"use strict";

exports.__esModule=true;
exports["default"]=getForceUpdate;
function traverseRenderedChildren(internalInstance,callback,argument){
callback(internalInstance,argument);

if(internalInstance._renderedComponent){
traverseRenderedChildren(internalInstance._renderedComponent,callback,argument);}else 
{
for(var key in internalInstance._renderedChildren){
if(internalInstance._renderedChildren.hasOwnProperty(key)){
traverseRenderedChildren(internalInstance._renderedChildren[key],callback,argument);}}}}





function setPendingForceUpdate(internalInstance){
if(internalInstance._pendingForceUpdate===false){
internalInstance._pendingForceUpdate=true;}}



function forceUpdateIfPending(internalInstance,React){
if(internalInstance._pendingForceUpdate===true){
var publicInstance=internalInstance._instance;
React.Component.prototype.forceUpdate.call(publicInstance);}}



function getForceUpdate(React){
return function(instance){
var internalInstance=instance._reactInternalInstance;
traverseRenderedChildren(internalInstance,setPendingForceUpdate);
traverseRenderedChildren(internalInstance,forceUpdateIfPending,React);};}



module.exports=exports["default"];
});
__d(373 /* global/window.js */, function(global, require, module, exports) {if(typeof window!=="undefined"){
module.exports=window;}else 
if(typeof global!=="undefined"){
module.exports=global;}else 
if(typeof self!=="undefined"){
module.exports=self;}else 
{
module.exports={};}
});
__d(97 /* EventPluginHub */, function(global, require, module, exports) {'use strict';












var EventPluginRegistry=require(98 /* ./EventPluginRegistry */);
var EventPluginUtils=require(99 /* ./EventPluginUtils */);
var ReactErrorUtils=require(101 /* ./ReactErrorUtils */);

var accumulateInto=require(102 /* ./accumulateInto */);
var forEachAccumulated=require(103 /* ./forEachAccumulated */);
var invariant=require(242 /* fbjs/lib/invariant */);
var warning=require(240 /* fbjs/lib/warning */);




var listenerBank={};





var eventQueue=null;








var executeDispatchesAndRelease=function executeDispatchesAndRelease(event,simulated){
if(event){
EventPluginUtils.executeDispatchesInOrder(event,simulated);

if(!event.isPersistent()){
event.constructor.release(event);}}};



var executeDispatchesAndReleaseSimulated=function executeDispatchesAndReleaseSimulated(e){
return executeDispatchesAndRelease(e,true);};

var executeDispatchesAndReleaseTopLevel=function executeDispatchesAndReleaseTopLevel(e){
return executeDispatchesAndRelease(e,false);};






var InstanceHandle=null;

function validateInstanceHandle(){
var valid=InstanceHandle&&InstanceHandle.traverseTwoPhase&&InstanceHandle.traverseEnterLeave;
process.env.NODE_ENV!=='production'?warning(valid,'InstanceHandle not injected before use!'):undefined;}
























var EventPluginHub={




injection:{





injectMount:EventPluginUtils.injection.injectMount,





injectInstanceHandle:function injectInstanceHandle(InjectedInstanceHandle){
InstanceHandle=InjectedInstanceHandle;
if(process.env.NODE_ENV!=='production'){
validateInstanceHandle();}},



getInstanceHandle:function getInstanceHandle(){
if(process.env.NODE_ENV!=='production'){
validateInstanceHandle();}

return InstanceHandle;},






injectEventPluginOrder:EventPluginRegistry.injectEventPluginOrder,




injectEventPluginsByName:EventPluginRegistry.injectEventPluginsByName},



eventNameDispatchConfigs:EventPluginRegistry.eventNameDispatchConfigs,

registrationNameModules:EventPluginRegistry.registrationNameModules,








putListener:function putListener(id,registrationName,listener){
!(typeof listener==='function')?process.env.NODE_ENV!=='production'?invariant(false,'Expected %s listener to be a function, instead got type %s',registrationName,typeof listener):invariant(false):undefined;

var bankForRegistrationName=listenerBank[registrationName]||(listenerBank[registrationName]={});
bankForRegistrationName[id]=listener;

var PluginModule=EventPluginRegistry.registrationNameModules[registrationName];
if(PluginModule&&PluginModule.didPutListener){
PluginModule.didPutListener(id,registrationName,listener);}},








getListener:function getListener(id,registrationName){
var bankForRegistrationName=listenerBank[registrationName];
return bankForRegistrationName&&bankForRegistrationName[id];},








deleteListener:function deleteListener(id,registrationName){
var PluginModule=EventPluginRegistry.registrationNameModules[registrationName];
if(PluginModule&&PluginModule.willDeleteListener){
PluginModule.willDeleteListener(id,registrationName);}


var bankForRegistrationName=listenerBank[registrationName];

if(bankForRegistrationName){
delete bankForRegistrationName[id];}},








deleteAllListeners:function deleteAllListeners(id){
for(var registrationName in listenerBank){
if(!listenerBank[registrationName][id]){
continue;}


var PluginModule=EventPluginRegistry.registrationNameModules[registrationName];
if(PluginModule&&PluginModule.willDeleteListener){
PluginModule.willDeleteListener(id,registrationName);}


delete listenerBank[registrationName][id];}},














extractEvents:function extractEvents(topLevelType,topLevelTarget,topLevelTargetID,nativeEvent,nativeEventTarget){
var events;
var plugins=EventPluginRegistry.plugins;
for(var i=0;i<plugins.length;i++){

var possiblePlugin=plugins[i];
if(possiblePlugin){
var extractedEvents=possiblePlugin.extractEvents(topLevelType,topLevelTarget,topLevelTargetID,nativeEvent,nativeEventTarget);
if(extractedEvents){
events=accumulateInto(events,extractedEvents);}}}



return events;},









enqueueEvents:function enqueueEvents(events){
if(events){
eventQueue=accumulateInto(eventQueue,events);}},








processEventQueue:function processEventQueue(simulated){


var processingEventQueue=eventQueue;
eventQueue=null;
if(simulated){
forEachAccumulated(processingEventQueue,executeDispatchesAndReleaseSimulated);}else 
{
forEachAccumulated(processingEventQueue,executeDispatchesAndReleaseTopLevel);}

!!eventQueue?process.env.NODE_ENV!=='production'?invariant(false,'processEventQueue(): Additional events were enqueued while processing '+'an event queue. Support for this has not yet been implemented.'):invariant(false):undefined;

ReactErrorUtils.rethrowCaughtError();},





__purge:function __purge(){
listenerBank={};},


__getListenerBank:function __getListenerBank(){
return listenerBank;}};




module.exports=EventPluginHub;
});
__d(98 /* EventPluginRegistry */, function(global, require, module, exports) {'use strict';













var invariant=require(242 /* fbjs/lib/invariant */);




var EventPluginOrder=null;




var namesToPlugins={};






function recomputePluginOrdering(){
if(!EventPluginOrder){

return;}

for(var pluginName in namesToPlugins){
var PluginModule=namesToPlugins[pluginName];
var pluginIndex=EventPluginOrder.indexOf(pluginName);
!(pluginIndex>-1)?process.env.NODE_ENV!=='production'?invariant(false,'EventPluginRegistry: Cannot inject event plugins that do not exist in '+'the plugin ordering, `%s`.',pluginName):invariant(false):undefined;
if(EventPluginRegistry.plugins[pluginIndex]){
continue;}

!PluginModule.extractEvents?process.env.NODE_ENV!=='production'?invariant(false,'EventPluginRegistry: Event plugins must implement an `extractEvents` '+'method, but `%s` does not.',pluginName):invariant(false):undefined;
EventPluginRegistry.plugins[pluginIndex]=PluginModule;
var publishedEvents=PluginModule.eventTypes;
for(var eventName in publishedEvents){
!publishEventForPlugin(publishedEvents[eventName],PluginModule,eventName)?process.env.NODE_ENV!=='production'?invariant(false,'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.',eventName,pluginName):invariant(false):undefined;}}}












function publishEventForPlugin(dispatchConfig,PluginModule,eventName){
!!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName)?process.env.NODE_ENV!=='production'?invariant(false,'EventPluginHub: More than one plugin attempted to publish the same '+'event name, `%s`.',eventName):invariant(false):undefined;
EventPluginRegistry.eventNameDispatchConfigs[eventName]=dispatchConfig;

var phasedRegistrationNames=dispatchConfig.phasedRegistrationNames;
if(phasedRegistrationNames){
for(var phaseName in phasedRegistrationNames){
if(phasedRegistrationNames.hasOwnProperty(phaseName)){
var phasedRegistrationName=phasedRegistrationNames[phaseName];
publishRegistrationName(phasedRegistrationName,PluginModule,eventName);}}


return true;}else 
if(dispatchConfig.registrationName){
publishRegistrationName(dispatchConfig.registrationName,PluginModule,eventName);
return true;}

return false;}










function publishRegistrationName(registrationName,PluginModule,eventName){
!!EventPluginRegistry.registrationNameModules[registrationName]?process.env.NODE_ENV!=='production'?invariant(false,'EventPluginHub: More than one plugin attempted to publish the same '+'registration name, `%s`.',registrationName):invariant(false):undefined;
EventPluginRegistry.registrationNameModules[registrationName]=PluginModule;
EventPluginRegistry.registrationNameDependencies[registrationName]=PluginModule.eventTypes[eventName].dependencies;}







var EventPluginRegistry={




plugins:[],




eventNameDispatchConfigs:{},




registrationNameModules:{},




registrationNameDependencies:{},










injectEventPluginOrder:function injectEventPluginOrder(InjectedEventPluginOrder){
!!EventPluginOrder?process.env.NODE_ENV!=='production'?invariant(false,'EventPluginRegistry: Cannot inject event plugin ordering more than '+'once. You are likely trying to load more than one copy of React.'):invariant(false):undefined;

EventPluginOrder=Array.prototype.slice.call(InjectedEventPluginOrder);
recomputePluginOrdering();},












injectEventPluginsByName:function injectEventPluginsByName(injectedNamesToPlugins){
var isOrderingDirty=false;
for(var pluginName in injectedNamesToPlugins){
if(!injectedNamesToPlugins.hasOwnProperty(pluginName)){
continue;}

var PluginModule=injectedNamesToPlugins[pluginName];
if(!namesToPlugins.hasOwnProperty(pluginName)||namesToPlugins[pluginName]!==PluginModule){
!!namesToPlugins[pluginName]?process.env.NODE_ENV!=='production'?invariant(false,'EventPluginRegistry: Cannot inject two different event plugins '+'using the same name, `%s`.',pluginName):invariant(false):undefined;
namesToPlugins[pluginName]=PluginModule;
isOrderingDirty=true;}}


if(isOrderingDirty){
recomputePluginOrdering();}},










getPluginModuleForEvent:function getPluginModuleForEvent(event){
var dispatchConfig=event.dispatchConfig;
if(dispatchConfig.registrationName){
return EventPluginRegistry.registrationNameModules[dispatchConfig.registrationName]||null;}

for(var phase in dispatchConfig.phasedRegistrationNames){
if(!dispatchConfig.phasedRegistrationNames.hasOwnProperty(phase)){
continue;}

var PluginModule=EventPluginRegistry.registrationNameModules[dispatchConfig.phasedRegistrationNames[phase]];
if(PluginModule){
return PluginModule;}}


return null;},






_resetEventPlugins:function _resetEventPlugins(){
EventPluginOrder=null;
for(var pluginName in namesToPlugins){
if(namesToPlugins.hasOwnProperty(pluginName)){
delete namesToPlugins[pluginName];}}


EventPluginRegistry.plugins.length=0;

var eventNameDispatchConfigs=EventPluginRegistry.eventNameDispatchConfigs;
for(var eventName in eventNameDispatchConfigs){
if(eventNameDispatchConfigs.hasOwnProperty(eventName)){
delete eventNameDispatchConfigs[eventName];}}



var registrationNameModules=EventPluginRegistry.registrationNameModules;
for(var registrationName in registrationNameModules){
if(registrationNameModules.hasOwnProperty(registrationName)){
delete registrationNameModules[registrationName];}}}};






module.exports=EventPluginRegistry;
});
__d(99 /* EventPluginUtils */, function(global, require, module, exports) {'use strict';












var EventConstants=require(100 /* ./EventConstants */);
var ReactErrorUtils=require(101 /* ./ReactErrorUtils */);

var invariant=require(242 /* fbjs/lib/invariant */);
var warning=require(240 /* fbjs/lib/warning */);









var injection={
Mount:null,
injectMount:function injectMount(InjectedMount){
injection.Mount=InjectedMount;
if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(InjectedMount&&InjectedMount.getNode&&InjectedMount.getID,'EventPluginUtils.injection.injectMount(...): Injected Mount '+'module is missing getNode or getID.'):undefined;}}};




var topLevelTypes=EventConstants.topLevelTypes;

function isEndish(topLevelType){
return topLevelType===topLevelTypes.topMouseUp||topLevelType===topLevelTypes.topTouchEnd||topLevelType===topLevelTypes.topTouchCancel;}


function isMoveish(topLevelType){
return topLevelType===topLevelTypes.topMouseMove||topLevelType===topLevelTypes.topTouchMove;}

function isStartish(topLevelType){
return topLevelType===topLevelTypes.topMouseDown||topLevelType===topLevelTypes.topTouchStart;}


var validateEventDispatches;
if(process.env.NODE_ENV!=='production'){
validateEventDispatches=function validateEventDispatches(event){
var dispatchListeners=event._dispatchListeners;
var dispatchIDs=event._dispatchIDs;

var listenersIsArr=Array.isArray(dispatchListeners);
var idsIsArr=Array.isArray(dispatchIDs);
var IDsLen=idsIsArr?dispatchIDs.length:dispatchIDs?1:0;
var listenersLen=listenersIsArr?dispatchListeners.length:dispatchListeners?1:0;

process.env.NODE_ENV!=='production'?warning(idsIsArr===listenersIsArr&&IDsLen===listenersLen,'EventPluginUtils: Invalid `event`.'):undefined;};}










function executeDispatch(event,simulated,listener,domID){
var type=event.type||'unknown-event';
event.currentTarget=injection.Mount.getNode(domID);
if(simulated){
ReactErrorUtils.invokeGuardedCallbackWithCatch(type,listener,event,domID);}else 
{
ReactErrorUtils.invokeGuardedCallback(type,listener,event,domID);}

event.currentTarget=null;}





function executeDispatchesInOrder(event,simulated){
var dispatchListeners=event._dispatchListeners;
var dispatchIDs=event._dispatchIDs;
if(process.env.NODE_ENV!=='production'){
validateEventDispatches(event);}

if(Array.isArray(dispatchListeners)){
for(var i=0;i<dispatchListeners.length;i++){
if(event.isPropagationStopped()){
break;}


executeDispatch(event,simulated,dispatchListeners[i],dispatchIDs[i]);}}else 

if(dispatchListeners){
executeDispatch(event,simulated,dispatchListeners,dispatchIDs);}

event._dispatchListeners=null;
event._dispatchIDs=null;}









function executeDispatchesInOrderStopAtTrueImpl(event){
var dispatchListeners=event._dispatchListeners;
var dispatchIDs=event._dispatchIDs;
if(process.env.NODE_ENV!=='production'){
validateEventDispatches(event);}

if(Array.isArray(dispatchListeners)){
for(var i=0;i<dispatchListeners.length;i++){
if(event.isPropagationStopped()){
break;}


if(dispatchListeners[i](event,dispatchIDs[i])){
return dispatchIDs[i];}}}else 


if(dispatchListeners){
if(dispatchListeners(event,dispatchIDs)){
return dispatchIDs;}}


return null;}





function executeDispatchesInOrderStopAtTrue(event){
var ret=executeDispatchesInOrderStopAtTrueImpl(event);
event._dispatchIDs=null;
event._dispatchListeners=null;
return ret;}











function executeDirectDispatch(event){
if(process.env.NODE_ENV!=='production'){
validateEventDispatches(event);}

var dispatchListener=event._dispatchListeners;
var dispatchID=event._dispatchIDs;
!!Array.isArray(dispatchListener)?process.env.NODE_ENV!=='production'?invariant(false,'executeDirectDispatch(...): Invalid `event`.'):invariant(false):undefined;
var res=dispatchListener?dispatchListener(event,dispatchID):null;
event._dispatchListeners=null;
event._dispatchIDs=null;
return res;}






function hasDispatches(event){
return !!event._dispatchListeners;}





var EventPluginUtils={
isEndish:isEndish,
isMoveish:isMoveish,
isStartish:isStartish,

executeDirectDispatch:executeDirectDispatch,
executeDispatchesInOrder:executeDispatchesInOrder,
executeDispatchesInOrderStopAtTrue:executeDispatchesInOrderStopAtTrue,
hasDispatches:hasDispatches,

getNode:function getNode(id){
return injection.Mount.getNode(id);},

getID:function getID(node){
return injection.Mount.getID(node);},


injection:injection};


module.exports=EventPluginUtils;
});
__d(100 /* EventConstants */, function(global, require, module, exports) {'use strict';












var keyMirror=require(237 /* fbjs/lib/keyMirror */);

var PropagationPhases=keyMirror({bubbled:null,captured:null});




var topLevelTypes=keyMirror({
topAbort:null,
topBlur:null,
topCanPlay:null,
topCanPlayThrough:null,
topChange:null,
topClick:null,
topCompositionEnd:null,
topCompositionStart:null,
topCompositionUpdate:null,
topContextMenu:null,
topCopy:null,
topCut:null,
topDoubleClick:null,
topDrag:null,
topDragEnd:null,
topDragEnter:null,
topDragExit:null,
topDragLeave:null,
topDragOver:null,
topDragStart:null,
topDrop:null,
topDurationChange:null,
topEmptied:null,
topEncrypted:null,
topEnded:null,
topError:null,
topFocus:null,
topInput:null,
topKeyDown:null,
topKeyPress:null,
topKeyUp:null,
topLoad:null,
topLoadedData:null,
topLoadedMetadata:null,
topLoadStart:null,
topMouseDown:null,
topMouseMove:null,
topMouseOut:null,
topMouseOver:null,
topMouseUp:null,
topPaste:null,
topPause:null,
topPlay:null,
topPlaying:null,
topProgress:null,
topRateChange:null,
topReset:null,
topScroll:null,
topSeeked:null,
topSeeking:null,
topSelectionChange:null,
topStalled:null,
topSubmit:null,
topSuspend:null,
topTextInput:null,
topTimeUpdate:null,
topTouchCancel:null,
topTouchEnd:null,
topTouchMove:null,
topTouchStart:null,
topVolumeChange:null,
topWaiting:null,
topWheel:null});


var EventConstants={
topLevelTypes:topLevelTypes,
PropagationPhases:PropagationPhases};


module.exports=EventConstants;
});
__d(101 /* ReactErrorUtils */, function(global, require, module, exports) {'use strict';













var caughtError=null;









function invokeGuardedCallback(name,func,a,b){
try{
return func(a,b);}
catch(x){
if(caughtError===null){
caughtError=x;}

return undefined;}}



var ReactErrorUtils={
invokeGuardedCallback:invokeGuardedCallback,





invokeGuardedCallbackWithCatch:invokeGuardedCallback,





rethrowCaughtError:function rethrowCaughtError(){
if(caughtError){
var error=caughtError;
caughtError=null;
throw error;}}};




if(process.env.NODE_ENV!=='production'){




if(typeof window!=='undefined'&&typeof window.dispatchEvent==='function'&&typeof document!=='undefined'&&typeof document.createEvent==='function'){
var fakeNode=document.createElement('react');
ReactErrorUtils.invokeGuardedCallback=function(name,func,a,b){
var boundFunc=func.bind(null,a,b);
var evtType='react-'+name;
fakeNode.addEventListener(evtType,boundFunc,false);
var evt=document.createEvent('Event');
evt.initEvent(evtType,false,false);
fakeNode.dispatchEvent(evt);
fakeNode.removeEventListener(evtType,boundFunc,false);};}}




module.exports=ReactErrorUtils;
});
__d(102 /* accumulateInto */, function(global, require, module, exports) {'use strict';












var invariant=require(242 /* fbjs/lib/invariant */);















function accumulateInto(current,next){
!(next!=null)?process.env.NODE_ENV!=='production'?invariant(false,'accumulateInto(...): Accumulated items must not be null or undefined.'):invariant(false):undefined;
if(current==null){
return next;}




var currentIsArray=Array.isArray(current);
var nextIsArray=Array.isArray(next);

if(currentIsArray&&nextIsArray){
current.push.apply(current,next);
return current;}


if(currentIsArray){
current.push(next);
return current;}


if(nextIsArray){

return [current].concat(next);}


return [current,next];}


module.exports=accumulateInto;
});
__d(103 /* forEachAccumulated */, function(global, require, module, exports) {'use strict';



















var forEachAccumulated=function forEachAccumulated(arr,cb,scope){
if(Array.isArray(arr)){
arr.forEach(cb,scope);}else 
if(arr){
cb.call(scope,arr);}};



module.exports=forEachAccumulated;
});
__d(104 /* IOSDefaultEventPluginOrder */, function(global, require, module, exports) {'use strict';












var IOSDefaultEventPluginOrder=[
'ResponderEventPlugin',
'IOSNativeBridgeEventPlugin'];


module.exports=IOSDefaultEventPluginOrder;
});
__d(105 /* IOSNativeBridgeEventPlugin */, function(global, require, module, exports) {'use strict';












var EventPropagators=require(106 /* EventPropagators */);
var SyntheticEvent=require(107 /* SyntheticEvent */);
var UIManager=require(83 /* UIManager */);

var merge=require(108 /* merge */);
var warning=require(232 /* fbjs/lib/warning */);

var customBubblingEventTypes=UIManager.customBubblingEventTypes;
var customDirectEventTypes=UIManager.customDirectEventTypes;

var allTypesByEventName={};

for(var bubblingTypeName in customBubblingEventTypes){
allTypesByEventName[bubblingTypeName]=customBubblingEventTypes[bubblingTypeName];}


for(var directTypeName in customDirectEventTypes){
warning(
!customBubblingEventTypes[directTypeName],
'Event cannot be both direct and bubbling: %s',
directTypeName);

allTypesByEventName[directTypeName]=customDirectEventTypes[directTypeName];}


var IOSNativeBridgeEventPlugin={

eventTypes:merge(customBubblingEventTypes,customDirectEventTypes),









extractEvents:function extractEvents(
topLevelType,
topLevelTarget,
topLevelTargetID,
nativeEvent)
{
var bubbleDispatchConfig=customBubblingEventTypes[topLevelType];
var directDispatchConfig=customDirectEventTypes[topLevelType];
var event=SyntheticEvent.getPooled(
bubbleDispatchConfig||directDispatchConfig,
topLevelTargetID,
nativeEvent);

if(bubbleDispatchConfig){
EventPropagators.accumulateTwoPhaseDispatches(event);}else 
if(directDispatchConfig){
EventPropagators.accumulateDirectDispatches(event);}else 
{
return null;}

return event;}};



module.exports=IOSNativeBridgeEventPlugin;
});
__d(106 /* EventPropagators */, function(global, require, module, exports) {'use strict';












var EventConstants=require(100 /* ./EventConstants */);
var EventPluginHub=require(97 /* ./EventPluginHub */);

var warning=require(240 /* fbjs/lib/warning */);

var accumulateInto=require(102 /* ./accumulateInto */);
var forEachAccumulated=require(103 /* ./forEachAccumulated */);

var PropagationPhases=EventConstants.PropagationPhases;
var getListener=EventPluginHub.getListener;





function listenerAtPhase(id,event,propagationPhase){
var registrationName=event.dispatchConfig.phasedRegistrationNames[propagationPhase];
return getListener(id,registrationName);}








function accumulateDirectionalDispatches(domID,upwards,event){
if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(domID,'Dispatching id must not be null'):undefined;}

var phase=upwards?PropagationPhases.bubbled:PropagationPhases.captured;
var listener=listenerAtPhase(domID,event,phase);
if(listener){
event._dispatchListeners=accumulateInto(event._dispatchListeners,listener);
event._dispatchIDs=accumulateInto(event._dispatchIDs,domID);}}










function accumulateTwoPhaseDispatchesSingle(event){
if(event&&event.dispatchConfig.phasedRegistrationNames){
EventPluginHub.injection.getInstanceHandle().traverseTwoPhase(event.dispatchMarker,accumulateDirectionalDispatches,event);}}






function accumulateTwoPhaseDispatchesSingleSkipTarget(event){
if(event&&event.dispatchConfig.phasedRegistrationNames){
EventPluginHub.injection.getInstanceHandle().traverseTwoPhaseSkipTarget(event.dispatchMarker,accumulateDirectionalDispatches,event);}}








function accumulateDispatches(id,ignoredDirection,event){
if(event&&event.dispatchConfig.registrationName){
var registrationName=event.dispatchConfig.registrationName;
var listener=getListener(id,registrationName);
if(listener){
event._dispatchListeners=accumulateInto(event._dispatchListeners,listener);
event._dispatchIDs=accumulateInto(event._dispatchIDs,id);}}}









function accumulateDirectDispatchesSingle(event){
if(event&&event.dispatchConfig.registrationName){
accumulateDispatches(event.dispatchMarker,null,event);}}



function accumulateTwoPhaseDispatches(events){
forEachAccumulated(events,accumulateTwoPhaseDispatchesSingle);}


function accumulateTwoPhaseDispatchesSkipTarget(events){
forEachAccumulated(events,accumulateTwoPhaseDispatchesSingleSkipTarget);}


function accumulateEnterLeaveDispatches(leave,enter,fromID,toID){
EventPluginHub.injection.getInstanceHandle().traverseEnterLeave(fromID,toID,accumulateDispatches,leave,enter);}


function accumulateDirectDispatches(events){
forEachAccumulated(events,accumulateDirectDispatchesSingle);}













var EventPropagators={
accumulateTwoPhaseDispatches:accumulateTwoPhaseDispatches,
accumulateTwoPhaseDispatchesSkipTarget:accumulateTwoPhaseDispatchesSkipTarget,
accumulateDirectDispatches:accumulateDirectDispatches,
accumulateEnterLeaveDispatches:accumulateEnterLeaveDispatches};


module.exports=EventPropagators;
});
__d(107 /* SyntheticEvent */, function(global, require, module, exports) {'use strict';













var PooledClass=require(31 /* ./PooledClass */);

var assign=require(34 /* ./Object.assign */);
var emptyFunction=require(233 /* fbjs/lib/emptyFunction */);
var warning=require(240 /* fbjs/lib/warning */);





var EventInterface={
type:null,
target:null,

currentTarget:emptyFunction.thatReturnsNull,
eventPhase:null,
bubbles:null,
cancelable:null,
timeStamp:function timeStamp(event){
return event.timeStamp||Date.now();},

defaultPrevented:null,
isTrusted:null};



















function SyntheticEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){
this.dispatchConfig=dispatchConfig;
this.dispatchMarker=dispatchMarker;
this.nativeEvent=nativeEvent;

var Interface=this.constructor.Interface;
for(var propName in Interface){
if(!Interface.hasOwnProperty(propName)){
continue;}

var normalize=Interface[propName];
if(normalize){
this[propName]=normalize(nativeEvent);}else 
{
if(propName==='target'){
this.target=nativeEventTarget;}else 
{
this[propName]=nativeEvent[propName];}}}




var defaultPrevented=nativeEvent.defaultPrevented!=null?nativeEvent.defaultPrevented:nativeEvent.returnValue===false;
if(defaultPrevented){
this.isDefaultPrevented=emptyFunction.thatReturnsTrue;}else 
{
this.isDefaultPrevented=emptyFunction.thatReturnsFalse;}

this.isPropagationStopped=emptyFunction.thatReturnsFalse;}


assign(SyntheticEvent.prototype,{

preventDefault:function preventDefault(){
this.defaultPrevented=true;
var event=this.nativeEvent;
if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(event,'This synthetic event is reused for performance reasons. If you\'re '+'seeing this, you\'re calling `preventDefault` on a '+'released/nullified synthetic event. This is a no-op. See '+'https://fb.me/react-event-pooling for more information.'):undefined;}

if(!event){
return;}


if(event.preventDefault){
event.preventDefault();}else 
{
event.returnValue=false;}

this.isDefaultPrevented=emptyFunction.thatReturnsTrue;},


stopPropagation:function stopPropagation(){
var event=this.nativeEvent;
if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(event,'This synthetic event is reused for performance reasons. If you\'re '+'seeing this, you\'re calling `stopPropagation` on a '+'released/nullified synthetic event. This is a no-op. See '+'https://fb.me/react-event-pooling for more information.'):undefined;}

if(!event){
return;}


if(event.stopPropagation){
event.stopPropagation();}else 
{
event.cancelBubble=true;}

this.isPropagationStopped=emptyFunction.thatReturnsTrue;},







persist:function persist(){
this.isPersistent=emptyFunction.thatReturnsTrue;},







isPersistent:emptyFunction.thatReturnsFalse,




destructor:function destructor(){
var Interface=this.constructor.Interface;
for(var propName in Interface){
this[propName]=null;}

this.dispatchConfig=null;
this.dispatchMarker=null;
this.nativeEvent=null;}});




SyntheticEvent.Interface=EventInterface;







SyntheticEvent.augmentClass=function(Class,Interface){
var Super=this;

var prototype=Object.create(Super.prototype);
assign(prototype,Class.prototype);
Class.prototype=prototype;
Class.prototype.constructor=Class;

Class.Interface=assign({},Super.Interface,Interface);
Class.augmentClass=Super.augmentClass;

PooledClass.addPoolingTo(Class,PooledClass.fourArgumentPooler);};


PooledClass.addPoolingTo(SyntheticEvent,PooledClass.fourArgumentPooler);

module.exports=SyntheticEvent;
});
__d(108 /* merge */, function(global, require, module, exports) {"use strict";
































var mergeInto=require(109 /* mergeInto */);








var merge=function merge(one,two){
var result={};
mergeInto(result,one);
mergeInto(result,two);
return result;};


module.exports=merge;
});
__d(109 /* mergeInto */, function(global, require, module, exports) {"use strict";

































var mergeHelpers=require(110 /* mergeHelpers */);

var checkMergeObjectArg=mergeHelpers.checkMergeObjectArg;
var checkMergeIntoObjectArg=mergeHelpers.checkMergeIntoObjectArg;







function mergeInto(one,two){
checkMergeIntoObjectArg(one);
if(two!=null){
checkMergeObjectArg(two);
for(var key in two){
if(!two.hasOwnProperty(key)){
continue;}

one[key]=two[key];}}}




module.exports=mergeInto;
});
__d(110 /* mergeHelpers */, function(global, require, module, exports) {"use strict";


































var invariant=require(222 /* fbjs/lib/invariant */);
var keyMirror=require(224 /* fbjs/lib/keyMirror */);





var MAX_MERGE_DEPTH=36;







var isTerminal=function isTerminal(o){
return typeof o!=='object'||o===null;};


var mergeHelpers={

MAX_MERGE_DEPTH:MAX_MERGE_DEPTH,

isTerminal:isTerminal,







normalizeMergeArg:function normalizeMergeArg(arg){
return arg===undefined||arg===null?{}:arg;},










checkMergeArrayArgs:function checkMergeArrayArgs(one,two){
invariant(
Array.isArray(one)&&Array.isArray(two),
'Tried to merge arrays, instead got %s and %s.',
one,
two);},







checkMergeObjectArgs:function checkMergeObjectArgs(one,two){
mergeHelpers.checkMergeObjectArg(one);
mergeHelpers.checkMergeObjectArg(two);},





checkMergeObjectArg:function checkMergeObjectArg(arg){
invariant(
!isTerminal(arg)&&!Array.isArray(arg),
'Tried to merge an object, instead got %s.',
arg);},






checkMergeIntoObjectArg:function checkMergeIntoObjectArg(arg){
invariant(
(!isTerminal(arg)||typeof arg==='function')&&!Array.isArray(arg),
'Tried to merge into an object, instead got %s.',
arg);},









checkMergeLevel:function checkMergeLevel(level){
invariant(
level<MAX_MERGE_DEPTH,
'Maximum deep merge depth exceeded. You may be attempting to merge '+
'circular structures in an unsupported way.');},








checkArrayStrategy:function checkArrayStrategy(strategy){
invariant(
strategy===undefined||strategy in mergeHelpers.ArrayStrategies,
'You must provide an array strategy to deep merge functions to '+
'instruct the deep merge how to resolve merging two arrays.');},










ArrayStrategies:keyMirror({
Clobber:true,
IndexByIndex:true})};




module.exports=mergeHelpers;
});
__d(111 /* NodeHandle */, function(global, require, module, exports) {var 




























































NodeHandle={



injection:{
injectImplementation:function injectImplementation(Impl){
NodeHandle._Implementation=Impl;}},



_Implementation:null,





getRootNodeID:function getRootNodeID(nodeHandle){
return NodeHandle._Implementation.getRootNodeID(nodeHandle);}};



module.exports=NodeHandle;
});
__d(112 /* ReactDefaultBatchingStrategy */, function(global, require, module, exports) {'use strict';












var ReactUpdates=require(80 /* ./ReactUpdates */);
var Transaction=require(82 /* ./Transaction */);

var assign=require(34 /* ./Object.assign */);
var emptyFunction=require(233 /* fbjs/lib/emptyFunction */);

var RESET_BATCHED_UPDATES={
initialize:emptyFunction,
close:function close(){
ReactDefaultBatchingStrategy.isBatchingUpdates=false;}};



var FLUSH_BATCHED_UPDATES={
initialize:emptyFunction,
close:ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)};


var TRANSACTION_WRAPPERS=[FLUSH_BATCHED_UPDATES,RESET_BATCHED_UPDATES];

function ReactDefaultBatchingStrategyTransaction(){
this.reinitializeTransaction();}


assign(ReactDefaultBatchingStrategyTransaction.prototype,Transaction.Mixin,{
getTransactionWrappers:function getTransactionWrappers(){
return TRANSACTION_WRAPPERS;}});



var transaction=new ReactDefaultBatchingStrategyTransaction();

var ReactDefaultBatchingStrategy={
isBatchingUpdates:false,





batchedUpdates:function batchedUpdates(callback,a,b,c,d,e){
var alreadyBatchingUpdates=ReactDefaultBatchingStrategy.isBatchingUpdates;

ReactDefaultBatchingStrategy.isBatchingUpdates=true;


if(alreadyBatchingUpdates){
callback(a,b,c,d,e);}else 
{
transaction.perform(callback,null,a,b,c,d,e);}}};




module.exports=ReactDefaultBatchingStrategy;
});
__d(113 /* ReactNativeComponentEnvironment */, function(global, require, module, exports) {'use strict';












var ReactNativeDOMIDOperations=require(114 /* ReactNativeDOMIDOperations */);
var ReactNativeReconcileTransaction=require(116 /* ReactNativeReconcileTransaction */);

var ReactNativeComponentEnvironment={

processChildrenUpdates:ReactNativeDOMIDOperations.dangerouslyProcessChildrenUpdates,

replaceNodeWithMarkupByID:ReactNativeDOMIDOperations.dangerouslyReplaceNodeWithMarkupByID,






unmountIDFromEnvironment:function unmountIDFromEnvironment(){},






clearNode:function clearNode(){},



ReactReconcileTransaction:ReactNativeReconcileTransaction};


module.exports=ReactNativeComponentEnvironment;
});
__d(114 /* ReactNativeDOMIDOperations */, function(global, require, module, exports) {'use strict';












var ReactNativeTagHandles=require(74 /* ReactNativeTagHandles */);
var ReactMultiChildUpdateTypes=require(115 /* ReactMultiChildUpdateTypes */);
var ReactPerf=require(5 /* ReactPerf */);
var UIManager=require(83 /* UIManager */);













var dangerouslyProcessChildrenUpdates=function dangerouslyProcessChildrenUpdates(childrenUpdates,markupList){
if(!childrenUpdates.length){
return;}

var byContainerTag={};


for(var i=0;i<childrenUpdates.length;i++){
var update=childrenUpdates[i];
var containerTag=ReactNativeTagHandles.mostRecentMountedNodeHandleForRootNodeID(update.parentID);
var updates=byContainerTag[containerTag]||(byContainerTag[containerTag]={});
if(update.type===ReactMultiChildUpdateTypes.MOVE_EXISTING){
(updates.moveFromIndices||(updates.moveFromIndices=[])).push(update.fromIndex);
(updates.moveToIndices||(updates.moveToIndices=[])).push(update.toIndex);}else 
if(update.type===ReactMultiChildUpdateTypes.REMOVE_NODE){
(updates.removeAtIndices||(updates.removeAtIndices=[])).push(update.fromIndex);}else 
if(update.type===ReactMultiChildUpdateTypes.INSERT_MARKUP){
var mountImage=markupList[update.markupIndex];
var tag=mountImage.tag;
var rootNodeID=mountImage.rootNodeID;
ReactNativeTagHandles.associateRootNodeIDWithMountedNodeHandle(rootNodeID,tag);
(updates.addAtIndices||(updates.addAtIndices=[])).push(update.toIndex);
(updates.addChildTags||(updates.addChildTags=[])).push(tag);}}





for(var updateParentTagString in byContainerTag){
var updateParentTagNumber=+updateParentTagString;
var childUpdatesToSend=byContainerTag[updateParentTagNumber];
UIManager.manageChildren(
updateParentTagNumber,
childUpdatesToSend.moveFromIndices,
childUpdatesToSend.moveToIndices,
childUpdatesToSend.addChildTags,
childUpdatesToSend.addAtIndices,
childUpdatesToSend.removeAtIndices);}};








var ReactNativeDOMIDOperations={
dangerouslyProcessChildrenUpdates:ReactPerf.measure(

'ReactDOMIDOperations',
'dangerouslyProcessChildrenUpdates',
dangerouslyProcessChildrenUpdates),








dangerouslyReplaceNodeWithMarkupByID:ReactPerf.measure(
'ReactDOMIDOperations',
'dangerouslyReplaceNodeWithMarkupByID',
function(id,mountImage){
var oldTag=ReactNativeTagHandles.mostRecentMountedNodeHandleForRootNodeID(id);
UIManager.replaceExistingNonRootView(oldTag,mountImage.tag);
ReactNativeTagHandles.associateRootNodeIDWithMountedNodeHandle(id,mountImage.tag);})};




module.exports=ReactNativeDOMIDOperations;
});
__d(115 /* ReactMultiChildUpdateTypes */, function(global, require, module, exports) {'use strict';












var keyMirror=require(237 /* fbjs/lib/keyMirror */);









var ReactMultiChildUpdateTypes=keyMirror({
INSERT_MARKUP:null,
MOVE_EXISTING:null,
REMOVE_NODE:null,
SET_MARKUP:null,
TEXT_CONTENT:null});


module.exports=ReactMultiChildUpdateTypes;
});
__d(116 /* ReactNativeReconcileTransaction */, function(global, require, module, exports) {'use strict';












var CallbackQueue=require(81 /* CallbackQueue */);
var PooledClass=require(31 /* PooledClass */);
var Transaction=require(82 /* Transaction */);





var ON_DOM_READY_QUEUEING={



initialize:function initialize(){
this.reactMountReady.reset();},





close:function close(){
this.reactMountReady.notifyAll();}};








var TRANSACTION_WRAPPERS=[ON_DOM_READY_QUEUEING];















function ReactNativeReconcileTransaction(){
this.reinitializeTransaction();
this.reactMountReady=CallbackQueue.getPooled(null);}


var Mixin={







getTransactionWrappers:function getTransactionWrappers(){
return TRANSACTION_WRAPPERS;},






getReactMountReady:function getReactMountReady(){
return this.reactMountReady;},






destructor:function destructor(){
CallbackQueue.release(this.reactMountReady);
this.reactMountReady=null;}};



babelHelpers.extends(
ReactNativeReconcileTransaction.prototype,
Transaction.Mixin,
ReactNativeReconcileTransaction,
Mixin);


PooledClass.addPoolingTo(ReactNativeReconcileTransaction);

module.exports=ReactNativeReconcileTransaction;
});
__d(117 /* ReactNativeGlobalInteractionHandler */, function(global, require, module, exports) {'use strict';












var InteractionManager=require(118 /* InteractionManager */);



var interactionHandle=null;

var ReactNativeGlobalInteractionHandler={
onChange:function onChange(numberActiveTouches){
if(numberActiveTouches===0){
if(interactionHandle){
InteractionManager.clearInteractionHandle(interactionHandle);
interactionHandle=null;}}else 

if(!interactionHandle){
interactionHandle=InteractionManager.createInteractionHandle();}}};




module.exports=ReactNativeGlobalInteractionHandler;
});
__d(118 /* InteractionManager */, function(global, require, module, exports) {'use strict';












var BatchedBridge=require(2 /* BatchedBridge */);
var EventEmitter=require(15 /* EventEmitter */);
var Set=require(69 /* Set */);
var TaskQueue=require(119 /* TaskQueue */);

var invariant=require(222 /* fbjs/lib/invariant */);
var keyMirror=require(224 /* fbjs/lib/keyMirror */);
var setImmediate=require(120 /* setImmediate */);




var _emitter=new EventEmitter();

var DEBUG_DELAY=0;


















































var InteractionManager={
Events:keyMirror({
interactionStart:true,
interactionComplete:true}),





runAfterInteractions:function runAfterInteractions(task){
return new Promise(function(resolve){
_scheduleUpdate();
if(task){
_taskQueue.enqueue(task);}

var name=task&&task.name||'?';
_taskQueue.enqueue({run:resolve,name:'resolve '+name});});},






createInteractionHandle:function createInteractionHandle(){
_scheduleUpdate();
var handle=++_inc;
_addInteractionSet.add(handle);
return handle;},





clearInteractionHandle:function clearInteractionHandle(handle){
invariant(
!!handle,
'Must provide a handle to clear.');

_scheduleUpdate();
_addInteractionSet.delete(handle);
_deleteInteractionSet.add(handle);},


addListener:_emitter.addListener.bind(_emitter),






setDeadline:function setDeadline(deadline){
_deadline=deadline;}};



var _interactionSet=new Set();
var _addInteractionSet=new Set();
var _deleteInteractionSet=new Set();
var _taskQueue=new TaskQueue({onMoreTasks:_scheduleUpdate});
var _nextUpdateHandle=0;
var _inc=0;
var _deadline=-1;




function _scheduleUpdate(){
if(!_nextUpdateHandle){
if(_deadline>0){
_nextUpdateHandle=setTimeout(_processUpdate,0+DEBUG_DELAY);}else 
{
_nextUpdateHandle=setImmediate(_processUpdate);}}}







function _processUpdate(){
_nextUpdateHandle=0;

var interactionCount=_interactionSet.size;
_addInteractionSet.forEach(function(handle){return (
_interactionSet.add(handle));});

_deleteInteractionSet.forEach(function(handle){return (
_interactionSet.delete(handle));});

var nextInteractionCount=_interactionSet.size;

if(interactionCount!==0&&nextInteractionCount===0){

_emitter.emit(InteractionManager.Events.interactionComplete);}else 
if(interactionCount===0&&nextInteractionCount!==0){

_emitter.emit(InteractionManager.Events.interactionStart);}



if(nextInteractionCount===0){
while(_taskQueue.hasTasksToProcess()){
_taskQueue.processNext();
if(_deadline>0&&
BatchedBridge.getEventLoopRunningTime()>=_deadline){

_scheduleUpdate();
break;}}}



_addInteractionSet.clear();
_deleteInteractionSet.clear();}


module.exports=InteractionManager;
});
__d(119 /* TaskQueue */, function(global, require, module, exports) {'use strict';












var invariant=require(222 /* fbjs/lib/invariant */);











var DEBUG=false;var 

















TaskQueue=function(){







function TaskQueue(_ref){var onMoreTasks=_ref.onMoreTasks;babelHelpers.classCallCheck(this,TaskQueue);
this._onMoreTasks=onMoreTasks;
this._queueStack=[{tasks:[],popable:false}];}babelHelpers.createClass(TaskQueue,[{key:'enqueue',value:function enqueue(







task){
this._getCurrentQueue().push(task);}},{key:'hasTasksToProcess',value:function hasTasksToProcess()












{
return this._getCurrentQueue().length>0;}},{key:'processNext',value:function processNext()





{
var queue=this._getCurrentQueue();
if(queue.length){
var task=queue.shift();
try{
if(task.gen){
DEBUG&&console.log('genPromise for task '+task.name);
this._genPromise(task);}else 
if(task.run){
DEBUG&&console.log('run task '+task.name);
task.run();}else 
{
invariant(
typeof task==='function',
'Expected Function, SimpleTask, or PromiseTask, but got:\n'+
JSON.stringify(task,null,2));

DEBUG&&console.log('run anonymous task');
task();}}

catch(e){
e.message='TaskQueue: Error with task '+(task.name||'')+': '+
e.message;
throw e;}}}},{key:'_getCurrentQueue',value:function _getCurrentQueue()







{
var stackIdx=this._queueStack.length-1;
var queue=this._queueStack[stackIdx];
if(queue.popable&&
queue.tasks.length===0&&
this._queueStack.length>1){
this._queueStack.pop();
DEBUG&&console.log('popped queue: ',{stackIdx:stackIdx,queueStackSize:this._queueStack.length});
return this._getCurrentQueue();}else 
{
return queue.tasks;}}},{key:'_genPromise',value:function _genPromise(



task){var _this=this;




this._queueStack.push({tasks:[],popable:false});
var stackIdx=this._queueStack.length-1;
DEBUG&&console.log('push new queue: ',{stackIdx:stackIdx});
DEBUG&&console.log('exec gen task '+task.name);
task.gen().
then(function(){
DEBUG&&console.log('onThen for gen task '+task.name,{stackIdx:stackIdx,queueStackSize:_this._queueStack.length});
_this._queueStack[stackIdx].popable=true;
_this.hasTasksToProcess()&&_this._onMoreTasks();}).

catch(function(ex){
ex.message='TaskQueue: Error resolving Promise in task '+task.name+': '+ex.message;
throw ex;}).

done();}}]);return TaskQueue;}();




module.exports=TaskQueue;
});
__d(120 /* setImmediate */, function(global, require, module, exports) {module.
















exports=global.setImmediate||
require(121 /* ImmediateImplementation */).setImmediate;
});
__d(121 /* ImmediateImplementation */, function(global, require, module, exports) {/**
 * @generated SignedSource<<57d0446bbd1186485d372efe6b323dca>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright (c) 2012 Barnesandnoble.com, llc, Donavon West, and Domenic
 * Denicola
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @preserve-header
 * @providesModule ImmediateImplementation
 */

(function(global,undefined){
"use strict";

var nextHandle=1;
var tasksByHandle={};
var queueHead={};
var queueTail=queueHead;
var currentlyRunningATask=false;
var doc=global.document;
var setImmediate;

function addFromSetImmediateArguments(args){
var handler=args[0];
args=Array.prototype.slice.call(args,1);
tasksByHandle[nextHandle]=function(){
handler.apply(undefined,args);};

queueTail=queueTail.next={handle:nextHandle++};
return queueTail.handle;}


function flushQueue(){
var next,task;
while(!currentlyRunningATask&&(next=queueHead.next)){
queueHead=next;
if(task=tasksByHandle[next.handle]){
currentlyRunningATask=true;
try{
task();
currentlyRunningATask=false;}finally 
{
clearImmediate(next.handle);
if(currentlyRunningATask){
currentlyRunningATask=false;






if(queueHead.next){
setImmediate(flushQueue);}}}}}}







function clearImmediate(handle){
delete tasksByHandle[handle];}


function canUsePostMessage(){


if(global.postMessage&&!global.importScripts){
var postMessageIsAsynchronous=true;

var onMessage=function onMessage(){
postMessageIsAsynchronous=false;
if(global.removeEventListener){
global.removeEventListener("message",onMessage,false);}else 
{
global.detachEvent("onmessage",onMessage);}};



if(global.addEventListener){
global.addEventListener("message",onMessage,false);}else 
if(global.attachEvent){
global.attachEvent("onmessage",onMessage);}else 
{
return false;}


global.postMessage("","*");
return postMessageIsAsynchronous;}}



function installPostMessageImplementation(){


var messagePrefix="setImmediate$"+Math.random()+"$";
var onGlobalMessage=function onGlobalMessage(event){
if(event.source===global&&
typeof event.data==="string"&&
event.data.indexOf(messagePrefix)===0){
flushQueue();}};



if(global.addEventListener){
global.addEventListener("message",onGlobalMessage,false);}else 
{
global.attachEvent("onmessage",onGlobalMessage);}


setImmediate=function setImmediate(){
var handle=addFromSetImmediateArguments(arguments);
global.postMessage(messagePrefix+handle,"*");
return handle;};}



function installMessageChannelImplementation(){
var channel=new MessageChannel();
channel.port1.onmessage=flushQueue;
setImmediate=function setImmediate(){
var handle=addFromSetImmediateArguments(arguments);
channel.port2.postMessage(handle);
return handle;};}



function installReadyStateChangeImplementation(){
var html=doc.documentElement;
setImmediate=function setImmediate(){
var handle=addFromSetImmediateArguments(arguments);


var script=doc.createElement("script");
script.onreadystatechange=function(){
script.onreadystatechange=null;
html.removeChild(script);
script=null;
flushQueue();};

html.appendChild(script);
return handle;};}



function installSetTimeoutImplementation(){
setImmediate=function setImmediate(){
setTimeout(flushQueue,0);
return addFromSetImmediateArguments(arguments);};}



if(canUsePostMessage()){

installPostMessageImplementation();}else 

if(global.MessageChannel){

installMessageChannelImplementation();}else 

if(doc&&"onreadystatechange" in doc.createElement("script")){

installReadyStateChangeImplementation();}else 

{

installSetTimeoutImplementation();}


exports.setImmediate=setImmediate;
exports.clearImmediate=clearImmediate;})(
Function("return this")());
});
__d(122 /* ReactNativeGlobalResponderHandler */, function(global, require, module, exports) {'use strict';












var ReactNativeTagHandles=require(74 /* ReactNativeTagHandles */);
var UIManager=require(83 /* UIManager */);

var ReactNativeGlobalResponderHandler={
onChange:function onChange(from,to,blockNativeResponder){
if(to!==null){
UIManager.setJSResponder(
ReactNativeTagHandles.mostRecentMountedNodeHandleForRootNodeID(to),
blockNativeResponder);}else 

{
UIManager.clearJSResponder();}}};




module.exports=ReactNativeGlobalResponderHandler;
});
__d(123 /* ResponderEventPlugin */, function(global, require, module, exports) {'use strict';












var EventConstants=require(100 /* ./EventConstants */);
var EventPluginUtils=require(99 /* ./EventPluginUtils */);
var EventPropagators=require(106 /* ./EventPropagators */);
var ReactInstanceHandles=require(37 /* ./ReactInstanceHandles */);
var ResponderSyntheticEvent=require(124 /* ./ResponderSyntheticEvent */);
var ResponderTouchHistoryStore=require(125 /* ./ResponderTouchHistoryStore */);

var accumulate=require(126 /* ./accumulate */);
var invariant=require(242 /* fbjs/lib/invariant */);
var keyOf=require(236 /* fbjs/lib/keyOf */);

var isStartish=EventPluginUtils.isStartish;
var isMoveish=EventPluginUtils.isMoveish;
var isEndish=EventPluginUtils.isEndish;
var executeDirectDispatch=EventPluginUtils.executeDirectDispatch;
var hasDispatches=EventPluginUtils.hasDispatches;
var executeDispatchesInOrderStopAtTrue=EventPluginUtils.executeDispatchesInOrderStopAtTrue;





var responderID=null;





var trackedTouchCount=0;




var previousActiveTouches=0;

var changeResponder=function changeResponder(nextResponderID,blockNativeResponder){
var oldResponderID=responderID;
responderID=nextResponderID;
if(ResponderEventPlugin.GlobalResponderHandler!==null){
ResponderEventPlugin.GlobalResponderHandler.onChange(oldResponderID,nextResponderID,blockNativeResponder);}};



var eventTypes={




startShouldSetResponder:{
phasedRegistrationNames:{
bubbled:keyOf({onStartShouldSetResponder:null}),
captured:keyOf({onStartShouldSetResponderCapture:null})}},












scrollShouldSetResponder:{
phasedRegistrationNames:{
bubbled:keyOf({onScrollShouldSetResponder:null}),
captured:keyOf({onScrollShouldSetResponderCapture:null})}},










selectionChangeShouldSetResponder:{
phasedRegistrationNames:{
bubbled:keyOf({onSelectionChangeShouldSetResponder:null}),
captured:keyOf({onSelectionChangeShouldSetResponderCapture:null})}},







moveShouldSetResponder:{
phasedRegistrationNames:{
bubbled:keyOf({onMoveShouldSetResponder:null}),
captured:keyOf({onMoveShouldSetResponderCapture:null})}},






responderStart:{registrationName:keyOf({onResponderStart:null})},
responderMove:{registrationName:keyOf({onResponderMove:null})},
responderEnd:{registrationName:keyOf({onResponderEnd:null})},
responderRelease:{registrationName:keyOf({onResponderRelease:null})},
responderTerminationRequest:{
registrationName:keyOf({onResponderTerminationRequest:null})},

responderGrant:{registrationName:keyOf({onResponderGrant:null})},
responderReject:{registrationName:keyOf({onResponderReject:null})},
responderTerminate:{registrationName:keyOf({onResponderTerminate:null})}};




































































































































































































function setResponderAndExtractTransfer(topLevelType,topLevelTargetID,nativeEvent,nativeEventTarget){
var shouldSetEventType=isStartish(topLevelType)?eventTypes.startShouldSetResponder:isMoveish(topLevelType)?eventTypes.moveShouldSetResponder:topLevelType===EventConstants.topLevelTypes.topSelectionChange?eventTypes.selectionChangeShouldSetResponder:eventTypes.scrollShouldSetResponder;


var bubbleShouldSetFrom=!responderID?topLevelTargetID:ReactInstanceHandles.getFirstCommonAncestorID(responderID,topLevelTargetID);





var skipOverBubbleShouldSetFrom=bubbleShouldSetFrom===responderID;
var shouldSetEvent=ResponderSyntheticEvent.getPooled(shouldSetEventType,bubbleShouldSetFrom,nativeEvent,nativeEventTarget);
shouldSetEvent.touchHistory=ResponderTouchHistoryStore.touchHistory;
if(skipOverBubbleShouldSetFrom){
EventPropagators.accumulateTwoPhaseDispatchesSkipTarget(shouldSetEvent);}else 
{
EventPropagators.accumulateTwoPhaseDispatches(shouldSetEvent);}

var wantsResponderID=executeDispatchesInOrderStopAtTrue(shouldSetEvent);
if(!shouldSetEvent.isPersistent()){
shouldSetEvent.constructor.release(shouldSetEvent);}


if(!wantsResponderID||wantsResponderID===responderID){
return null;}

var extracted;
var grantEvent=ResponderSyntheticEvent.getPooled(eventTypes.responderGrant,wantsResponderID,nativeEvent,nativeEventTarget);
grantEvent.touchHistory=ResponderTouchHistoryStore.touchHistory;

EventPropagators.accumulateDirectDispatches(grantEvent);
var blockNativeResponder=executeDirectDispatch(grantEvent)===true;
if(responderID){

var terminationRequestEvent=ResponderSyntheticEvent.getPooled(eventTypes.responderTerminationRequest,responderID,nativeEvent,nativeEventTarget);
terminationRequestEvent.touchHistory=ResponderTouchHistoryStore.touchHistory;
EventPropagators.accumulateDirectDispatches(terminationRequestEvent);
var shouldSwitch=!hasDispatches(terminationRequestEvent)||executeDirectDispatch(terminationRequestEvent);
if(!terminationRequestEvent.isPersistent()){
terminationRequestEvent.constructor.release(terminationRequestEvent);}


if(shouldSwitch){
var terminateType=eventTypes.responderTerminate;
var terminateEvent=ResponderSyntheticEvent.getPooled(terminateType,responderID,nativeEvent,nativeEventTarget);
terminateEvent.touchHistory=ResponderTouchHistoryStore.touchHistory;
EventPropagators.accumulateDirectDispatches(terminateEvent);
extracted=accumulate(extracted,[grantEvent,terminateEvent]);
changeResponder(wantsResponderID,blockNativeResponder);}else 
{
var rejectEvent=ResponderSyntheticEvent.getPooled(eventTypes.responderReject,wantsResponderID,nativeEvent,nativeEventTarget);
rejectEvent.touchHistory=ResponderTouchHistoryStore.touchHistory;
EventPropagators.accumulateDirectDispatches(rejectEvent);
extracted=accumulate(extracted,rejectEvent);}}else 

{
extracted=accumulate(extracted,grantEvent);
changeResponder(wantsResponderID,blockNativeResponder);}

return extracted;}










function canTriggerTransfer(topLevelType,topLevelTargetID,nativeEvent){
return topLevelTargetID&&(



topLevelType===EventConstants.topLevelTypes.topScroll&&!nativeEvent.responderIgnoreScroll||trackedTouchCount>0&&topLevelType===EventConstants.topLevelTypes.topSelectionChange||isStartish(topLevelType)||isMoveish(topLevelType));}









function noResponderTouches(nativeEvent){
var touches=nativeEvent.touches;
if(!touches||touches.length===0){
return true;}

for(var i=0;i<touches.length;i++){
var activeTouch=touches[i];
var target=activeTouch.target;
if(target!==null&&target!==undefined&&target!==0){

var isAncestor=ReactInstanceHandles.isAncestorIDOf(responderID,EventPluginUtils.getID(target));
if(isAncestor){
return false;}}}



return true;}


var ResponderEventPlugin={

getResponderID:function getResponderID(){
return responderID;},


eventTypes:eventTypes,













extractEvents:function extractEvents(topLevelType,topLevelTarget,topLevelTargetID,nativeEvent,nativeEventTarget){
if(isStartish(topLevelType)){
trackedTouchCount+=1;}else 
if(isEndish(topLevelType)){
trackedTouchCount-=1;
!(trackedTouchCount>=0)?process.env.NODE_ENV!=='production'?invariant(false,'Ended a touch event which was not counted in trackedTouchCount.'):invariant(false):undefined;}


ResponderTouchHistoryStore.recordTouchTrack(topLevelType,nativeEvent,nativeEventTarget);

var extracted=canTriggerTransfer(topLevelType,topLevelTargetID,nativeEvent)?setResponderAndExtractTransfer(topLevelType,topLevelTargetID,nativeEvent,nativeEventTarget):null;










var isResponderTouchStart=responderID&&isStartish(topLevelType);
var isResponderTouchMove=responderID&&isMoveish(topLevelType);
var isResponderTouchEnd=responderID&&isEndish(topLevelType);
var incrementalTouch=isResponderTouchStart?eventTypes.responderStart:isResponderTouchMove?eventTypes.responderMove:isResponderTouchEnd?eventTypes.responderEnd:null;

if(incrementalTouch){
var gesture=ResponderSyntheticEvent.getPooled(incrementalTouch,responderID,nativeEvent,nativeEventTarget);
gesture.touchHistory=ResponderTouchHistoryStore.touchHistory;
EventPropagators.accumulateDirectDispatches(gesture);
extracted=accumulate(extracted,gesture);}


var isResponderTerminate=responderID&&topLevelType===EventConstants.topLevelTypes.topTouchCancel;
var isResponderRelease=responderID&&!isResponderTerminate&&isEndish(topLevelType)&&noResponderTouches(nativeEvent);
var finalTouch=isResponderTerminate?eventTypes.responderTerminate:isResponderRelease?eventTypes.responderRelease:null;
if(finalTouch){
var finalEvent=ResponderSyntheticEvent.getPooled(finalTouch,responderID,nativeEvent,nativeEventTarget);
finalEvent.touchHistory=ResponderTouchHistoryStore.touchHistory;
EventPropagators.accumulateDirectDispatches(finalEvent);
extracted=accumulate(extracted,finalEvent);
changeResponder(null);}


var numberActiveTouches=ResponderTouchHistoryStore.touchHistory.numberActiveTouches;
if(ResponderEventPlugin.GlobalInteractionHandler&&numberActiveTouches!==previousActiveTouches){
ResponderEventPlugin.GlobalInteractionHandler.onChange(numberActiveTouches);}

previousActiveTouches=numberActiveTouches;

return extracted;},


GlobalResponderHandler:null,
GlobalInteractionHandler:null,

injection:{





injectGlobalResponderHandler:function injectGlobalResponderHandler(GlobalResponderHandler){
ResponderEventPlugin.GlobalResponderHandler=GlobalResponderHandler;},






injectGlobalInteractionHandler:function injectGlobalInteractionHandler(GlobalInteractionHandler){
ResponderEventPlugin.GlobalInteractionHandler=GlobalInteractionHandler;}}};




module.exports=ResponderEventPlugin;
});
__d(124 /* ResponderSyntheticEvent */, function(global, require, module, exports) {'use strict';













var SyntheticEvent=require(107 /* ./SyntheticEvent */);






var ResponderEventInterface={
touchHistory:function touchHistory(nativeEvent){
return null;}};









function ResponderSyntheticEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){
SyntheticEvent.call(this,dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget);}


SyntheticEvent.augmentClass(ResponderSyntheticEvent,ResponderEventInterface);

module.exports=ResponderSyntheticEvent;
});
__d(125 /* ResponderTouchHistoryStore */, function(global, require, module, exports) {'use strict';












var EventPluginUtils=require(99 /* ./EventPluginUtils */);

var invariant=require(242 /* fbjs/lib/invariant */);

var isMoveish=EventPluginUtils.isMoveish;
var isStartish=EventPluginUtils.isStartish;
var isEndish=EventPluginUtils.isEndish;

var MAX_TOUCH_BANK=20;
















var touchHistory={
touchBank:[],
numberActiveTouches:0,



indexOfSingleActiveTouch:-1,
mostRecentTimeStamp:0};


var timestampForTouch=function timestampForTouch(touch){



return touch.timeStamp||touch.timestamp;};







var initializeTouchData=function initializeTouchData(touch){
return {
touchActive:true,
startTimeStamp:timestampForTouch(touch),
startPageX:touch.pageX,
startPageY:touch.pageY,
currentPageX:touch.pageX,
currentPageY:touch.pageY,
currentTimeStamp:timestampForTouch(touch),
previousPageX:touch.pageX,
previousPageY:touch.pageY,
previousTimeStamp:timestampForTouch(touch)};};



var reinitializeTouchTrack=function reinitializeTouchTrack(touchTrack,touch){
touchTrack.touchActive=true;
touchTrack.startTimeStamp=timestampForTouch(touch);
touchTrack.startPageX=touch.pageX;
touchTrack.startPageY=touch.pageY;
touchTrack.currentPageX=touch.pageX;
touchTrack.currentPageY=touch.pageY;
touchTrack.currentTimeStamp=timestampForTouch(touch);
touchTrack.previousPageX=touch.pageX;
touchTrack.previousPageY=touch.pageY;
touchTrack.previousTimeStamp=timestampForTouch(touch);};


var validateTouch=function validateTouch(touch){
var identifier=touch.identifier;
!(identifier!=null)?process.env.NODE_ENV!=='production'?invariant(false,'Touch object is missing identifier'):invariant(false):undefined;
if(identifier>MAX_TOUCH_BANK){
console.warn('Touch identifier '+identifier+' is greater than maximum '+'supported '+MAX_TOUCH_BANK+' which causes performance issues '+'backfilling array locations for all of the indices.');}};



var recordStartTouchData=function recordStartTouchData(touch){
var touchBank=touchHistory.touchBank;
var identifier=touch.identifier;
var touchTrack=touchBank[identifier];
if(process.env.NODE_ENV!=='production'){
validateTouch(touch);}

if(touchTrack){
reinitializeTouchTrack(touchTrack,touch);}else 
{
touchBank[touch.identifier]=initializeTouchData(touch);}

touchHistory.mostRecentTimeStamp=timestampForTouch(touch);};


var recordMoveTouchData=function recordMoveTouchData(touch){
var touchBank=touchHistory.touchBank;
var touchTrack=touchBank[touch.identifier];
if(process.env.NODE_ENV!=='production'){
validateTouch(touch);
!touchTrack?process.env.NODE_ENV!=='production'?invariant(false,'Touch data should have been recorded on start'):invariant(false):undefined;}

touchTrack.touchActive=true;
touchTrack.previousPageX=touchTrack.currentPageX;
touchTrack.previousPageY=touchTrack.currentPageY;
touchTrack.previousTimeStamp=touchTrack.currentTimeStamp;
touchTrack.currentPageX=touch.pageX;
touchTrack.currentPageY=touch.pageY;
touchTrack.currentTimeStamp=timestampForTouch(touch);
touchHistory.mostRecentTimeStamp=timestampForTouch(touch);};


var recordEndTouchData=function recordEndTouchData(touch){
var touchBank=touchHistory.touchBank;
var touchTrack=touchBank[touch.identifier];
if(process.env.NODE_ENV!=='production'){
validateTouch(touch);
!touchTrack?process.env.NODE_ENV!=='production'?invariant(false,'Touch data should have been recorded on start'):invariant(false):undefined;}

touchTrack.previousPageX=touchTrack.currentPageX;
touchTrack.previousPageY=touchTrack.currentPageY;
touchTrack.previousTimeStamp=touchTrack.currentTimeStamp;
touchTrack.currentPageX=touch.pageX;
touchTrack.currentPageY=touch.pageY;
touchTrack.currentTimeStamp=timestampForTouch(touch);
touchTrack.touchActive=false;
touchHistory.mostRecentTimeStamp=timestampForTouch(touch);};


var ResponderTouchHistoryStore={
recordTouchTrack:function recordTouchTrack(topLevelType,nativeEvent){
var touchBank=touchHistory.touchBank;
if(isMoveish(topLevelType)){
nativeEvent.changedTouches.forEach(recordMoveTouchData);}else 
if(isStartish(topLevelType)){
nativeEvent.changedTouches.forEach(recordStartTouchData);
touchHistory.numberActiveTouches=nativeEvent.touches.length;
if(touchHistory.numberActiveTouches===1){
touchHistory.indexOfSingleActiveTouch=nativeEvent.touches[0].identifier;}}else 

if(isEndish(topLevelType)){
nativeEvent.changedTouches.forEach(recordEndTouchData);
touchHistory.numberActiveTouches=nativeEvent.touches.length;
if(touchHistory.numberActiveTouches===1){
for(var i=0;i<touchBank.length;i++){
var touchTrackToCheck=touchBank[i];
if(touchTrackToCheck!=null&&touchTrackToCheck.touchActive){
touchHistory.indexOfSingleActiveTouch=i;
break;}}


if(process.env.NODE_ENV!=='production'){
var activeTouchData=touchBank[touchHistory.indexOfSingleActiveTouch];
var foundActive=activeTouchData!=null&&!!activeTouchData.touchActive;
!foundActive?process.env.NODE_ENV!=='production'?invariant(false,'Cannot find single active touch'):invariant(false):undefined;}}}},





touchHistory:touchHistory};


module.exports=ResponderTouchHistoryStore;
});
__d(126 /* accumulate */, function(global, require, module, exports) {'use strict';












var invariant=require(242 /* fbjs/lib/invariant */);








function accumulate(current,next){
!(next!=null)?process.env.NODE_ENV!=='production'?invariant(false,'accumulate(...): Accumulated items must be not be null or undefined.'):invariant(false):undefined;
if(current==null){
return next;}else 
{


var currentIsArray=Array.isArray(current);
var nextIsArray=Array.isArray(next);
if(currentIsArray){
return current.concat(next);}else 
{
if(nextIsArray){
return [current].concat(next);}else 
{
return [current,next];}}}}





module.exports=accumulate;
});
__d(127 /* UniversalWorkerNodeHandle */, function(global, require, module, exports) {var 



ReactNativeTagHandles=require(74 /* ReactNativeTagHandles */);

var invariant=require(222 /* fbjs/lib/invariant */);

var UniversalWorkerNodeHandle={
getRootNodeID:function getRootNodeID(nodeHandle){
invariant(
nodeHandle!==undefined&&nodeHandle!==null&&nodeHandle!==0,
'No node handle defined');

return ReactNativeTagHandles.tagToRootNodeID[nodeHandle];}};



module.exports=UniversalWorkerNodeHandle;
});
__d(128 /* RCTEventEmitter */, function(global, require, module, exports) {'use strict';












var BatchedBridge=require(2 /* BatchedBridge */);
var ReactNativeEventEmitter=require(129 /* ReactNativeEventEmitter */);

BatchedBridge.registerCallableModule(
'RCTEventEmitter',
ReactNativeEventEmitter);



module.exports=ReactNativeEventEmitter;
});
__d(129 /* ReactNativeEventEmitter */, function(global, require, module, exports) {'use strict';












var EventPluginHub=require(97 /* EventPluginHub */);
var ReactEventEmitterMixin=require(130 /* ReactEventEmitterMixin */);
var ReactNativeTagHandles=require(74 /* ReactNativeTagHandles */);
var NodeHandle=require(111 /* NodeHandle */);
var EventConstants=require(100 /* EventConstants */);

var merge=require(108 /* merge */);
var warning=require(232 /* fbjs/lib/warning */);

var topLevelTypes=EventConstants.topLevelTypes;







var EMPTY_NATIVE_EVENT={};








var touchSubsequence=function touchSubsequence(touches,indices){
var ret=[];
for(var i=0;i<indices.length;i++){
ret.push(touches[indices[i]]);}

return ret;};













var removeTouchesAtIndices=function removeTouchesAtIndices(
touches,
indices)
{
var rippedOut=[];


var temp=touches;
for(var i=0;i<indices.length;i++){
var index=indices[i];
rippedOut.push(touches[index]);
temp[index]=null;}

var fillAt=0;
for(var j=0;j<temp.length;j++){
var cur=temp[j];
if(cur!==null){
temp[fillAt++]=cur;}}


temp.length=fillAt;
return rippedOut;};











var ReactNativeEventEmitter=merge(ReactEventEmitterMixin,{

registrationNames:EventPluginHub.registrationNameModules,

putListener:EventPluginHub.putListener,

getListener:EventPluginHub.getListener,

deleteListener:EventPluginHub.deleteListener,

deleteAllListeners:EventPluginHub.deleteAllListeners,











_receiveRootNodeIDEvent:function _receiveRootNodeIDEvent(
rootNodeID,
topLevelType,
nativeEventParam)
{
var nativeEvent=nativeEventParam||EMPTY_NATIVE_EVENT;
ReactNativeEventEmitter.handleTopLevel(
topLevelType,
rootNodeID,
rootNodeID,
nativeEvent,
nativeEvent.target);},










receiveEvent:function receiveEvent(
tag,
topLevelType,
nativeEventParam)
{
var rootNodeID=ReactNativeTagHandles.tagToRootNodeID[tag];
ReactNativeEventEmitter._receiveRootNodeIDEvent(
rootNodeID,
topLevelType,
nativeEventParam);},



























receiveTouches:function receiveTouches(
eventTopLevelType,
touches,
changedIndices)
{
var changedTouches=
eventTopLevelType===topLevelTypes.topTouchEnd||
eventTopLevelType===topLevelTypes.topTouchCancel?
removeTouchesAtIndices(touches,changedIndices):
touchSubsequence(touches,changedIndices);

for(var jj=0;jj<changedTouches.length;jj++){
var touch=changedTouches[jj];


touch.changedTouches=changedTouches;
touch.touches=touches;
var nativeEvent=touch;
var rootNodeID=null;
var target=nativeEvent.target;
if(target!==null&&target!==undefined){
if(target<ReactNativeTagHandles.tagsStartAt){
if(__DEV__){
warning(
false,
'A view is reporting that a touch occured on tag zero.');}}else 


{
rootNodeID=NodeHandle.getRootNodeID(target);}}


ReactNativeEventEmitter._receiveRootNodeIDEvent(
rootNodeID,
eventTopLevelType,
nativeEvent);}}});





module.exports=ReactNativeEventEmitter;
});
__d(130 /* ReactEventEmitterMixin */, function(global, require, module, exports) {'use strict';












var EventPluginHub=require(97 /* ./EventPluginHub */);

function runEventQueueInBatch(events){
EventPluginHub.enqueueEvents(events);
EventPluginHub.processEventQueue(false);}


var ReactEventEmitterMixin={










handleTopLevel:function handleTopLevel(topLevelType,topLevelTarget,topLevelTargetID,nativeEvent,nativeEventTarget){
var events=EventPluginHub.extractEvents(topLevelType,topLevelTarget,topLevelTargetID,nativeEvent,nativeEventTarget);
runEventQueueInBatch(events);}};



module.exports=ReactEventEmitterMixin;
});
__d(131 /* RCTLog */, function(global, require, module, exports) {'use strict';












var BatchedBridge=require(2 /* BatchedBridge */);

var invariant=require(222 /* fbjs/lib/invariant */);

var levelsMap={
log:'log',
info:'info',
warn:'warn',
error:'error',
fatal:'error'};var 


RCTLog=function(){function RCTLog(){babelHelpers.classCallCheck(this,RCTLog);}babelHelpers.createClass(RCTLog,null,[{key:'logIfNoNativeHook',value:function logIfNoNativeHook()

{
var args=Array.prototype.slice.call(arguments);
var level=args.shift();
var logFn=levelsMap[level];
invariant(
logFn,
'Level "'+level+'" not one of '+Object.keys(levelsMap));

if(typeof global.nativeLoggingHook==='undefined'){

console[logFn].apply(console,args);}

return true;}}]);return RCTLog;}();



BatchedBridge.registerCallableModule(
'RCTLog',
RCTLog);


module.exports=RCTLog;
});
__d(132 /* View */, function(global, require, module, exports) {'use strict';












var EdgeInsetsPropType=require(133 /* EdgeInsetsPropType */);
var NativeMethodsMixin=require(135 /* NativeMethodsMixin */);
var PropTypes=require(47 /* ReactPropTypes */);
var React=require(28 /* React */);
var ReactNativeStyleAttributes=require(139 /* ReactNativeStyleAttributes */);
var ReactNativeViewAttributes=require(155 /* ReactNativeViewAttributes */);
var StyleSheetPropType=require(156 /* StyleSheetPropType */);
var UIManager=require(83 /* UIManager */);
var ViewStylePropTypes=require(149 /* ViewStylePropTypes */);

var requireNativeComponent=require(157 /* requireNativeComponent */);

var stylePropType=StyleSheetPropType(ViewStylePropTypes);

var AccessibilityTraits=[
'none',
'button',
'link',
'header',
'search',
'image',
'selected',
'plays',
'key',
'text',
'summary',
'disabled',
'frequentUpdates',
'startsMedia',
'adjustable',
'allowsDirectInteraction',
'pageTurn'];


var AccessibilityComponentType=[
'none',
'button',
'radiobutton_checked',
'radiobutton_unchecked'];


var forceTouchAvailable=UIManager.RCTView.Constants&&
UIManager.RCTView.Constants.forceTouchAvailable||false;

var statics={
AccessibilityTraits:AccessibilityTraits,
AccessibilityComponentType:AccessibilityComponentType,




forceTouchAvailable:forceTouchAvailable};






















var View=React.createClass({displayName:'View',
mixins:[NativeMethodsMixin],





viewConfig:{
uiViewClassName:'RCTView',
validAttributes:ReactNativeViewAttributes.RCTView},


statics:babelHelpers.extends({},
statics),


propTypes:{




accessible:PropTypes.bool,






accessibilityLabel:PropTypes.string,






accessibilityComponentType:PropTypes.oneOf(AccessibilityComponentType),








accessibilityLiveRegion:PropTypes.oneOf([
'none',
'polite',
'assertive']),


















importantForAccessibility:PropTypes.oneOf([
'auto',
'yes',
'no',
'no-hide-descendants']),







accessibilityTraits:PropTypes.oneOfType([
PropTypes.oneOf(AccessibilityTraits),
PropTypes.arrayOf(PropTypes.oneOf(AccessibilityTraits))]),






onAccessibilityTap:PropTypes.func,





onMagicTap:PropTypes.func,





testID:PropTypes.string,






onResponderGrant:PropTypes.func,
onResponderMove:PropTypes.func,
onResponderReject:PropTypes.func,
onResponderRelease:PropTypes.func,
onResponderTerminate:PropTypes.func,
onResponderTerminationRequest:PropTypes.func,
onStartShouldSetResponder:PropTypes.func,
onStartShouldSetResponderCapture:PropTypes.func,
onMoveShouldSetResponder:PropTypes.func,
onMoveShouldSetResponderCapture:PropTypes.func,












hitSlop:EdgeInsetsPropType,










onLayout:PropTypes.func,


































pointerEvents:PropTypes.oneOf([
'box-none',
'none',
'box-only',
'auto']),

style:stylePropType,









removeClippedSubviews:PropTypes.bool,














renderToHardwareTextureAndroid:PropTypes.bool,














shouldRasterizeIOS:PropTypes.bool,








collapsable:PropTypes.bool,






















needsOffscreenAlphaCompositing:PropTypes.bool},


render:function render(){




return React.createElement(RCTView,this.props);}});



var RCTView=requireNativeComponent('RCTView',View,{
nativeOnly:{
nativeBackgroundAndroid:true}});



if(__DEV__){
var viewConfig=UIManager.viewConfigs&&UIManager.viewConfigs.RCTView||{};
for(var prop in viewConfig.nativeProps){
var viewAny=View;
if(!viewAny.propTypes[prop]&&!ReactNativeStyleAttributes[prop]){
throw new Error(
'View is missing propType for native prop `'+prop+'`');}}}





var ViewToExport=RCTView;
if(__DEV__){
ViewToExport=View;}else 
{
babelHelpers.extends(RCTView,statics);}


module.exports=ViewToExport;
});
__d(133 /* EdgeInsetsPropType */, function(global, require, module, exports) {'use strict';












var PropTypes=require(47 /* ReactPropTypes */);

var createStrictShapeTypeChecker=require(134 /* createStrictShapeTypeChecker */);

var EdgeInsetsPropType=createStrictShapeTypeChecker({
top:PropTypes.number,
left:PropTypes.number,
bottom:PropTypes.number,
right:PropTypes.number});


module.exports=EdgeInsetsPropType;
});
__d(134 /* createStrictShapeTypeChecker */, function(global, require, module, exports) {'use strict';












var ReactPropTypeLocationNames=require(44 /* ReactPropTypeLocationNames */);

var invariant=require(222 /* fbjs/lib/invariant */);
var merge=require(108 /* merge */);

function createStrictShapeTypeChecker(
shapeTypes)
{
function checkType(isRequired,props,propName,componentName,location){
if(!props[propName]){
if(isRequired){
invariant(
false,
'Required object `'+propName+'` was not specified in '+('`'+
componentName+'`.'));}


return;}

var propValue=props[propName];
var propType=typeof propValue;
var locationName=
location&&ReactPropTypeLocationNames[location]||'(unknown)';
if(propType!=='object'){
invariant(
false,
'Invalid '+locationName+' `'+propName+'` of type `'+propType+'` '+('supplied to `'+
componentName+'`, expected `object`.'));}




var allKeys=merge(props[propName],shapeTypes);
for(var key in allKeys){
var checker=shapeTypes[key];
if(!checker){
invariant(
false,
'Invalid props.'+propName+' key `'+key+'` supplied to `'+componentName+'`.'+'\nBad object: '+
JSON.stringify(props[propName],null,'  ')+'\nValid keys: '+
JSON.stringify(Object.keys(shapeTypes),null,'  '));}


var error=checker(propValue,key,componentName,location);
if(error){
invariant(
false,
error.message+'\nBad object: '+
JSON.stringify(props[propName],null,'  '));}}}




function chainedCheckType(
props,
propName,
componentName,
location)
{
return checkType(false,props,propName,componentName,location);}

chainedCheckType.isRequired=checkType.bind(null,true);
return chainedCheckType;}


module.exports=createStrictShapeTypeChecker;
});
__d(135 /* NativeMethodsMixin */, function(global, require, module, exports) {'use strict';












var ReactNativeAttributePayload=require(136 /* ReactNativeAttributePayload */);
var TextInputState=require(138 /* TextInputState */);
var UIManager=require(83 /* UIManager */);

var findNodeHandle=require(84 /* findNodeHandle */);
var invariant=require(222 /* fbjs/lib/invariant */);
























function warnForStyleProps(props,validAttributes){
for(var key in validAttributes.style){
if(!(validAttributes[key]||props[key]===undefined)){
console.error(
'You are setting the style `{ '+key+': ... }` as a prop. You '+
'should nest it in a style object. '+
'E.g. `{ style: { '+key+': ... } }`');}}}

















var NativeMethodsMixin={

















measure:function measure(callback){
UIManager.measure(
findNodeHandle(this),
mountSafeCallback(this,callback));},


















measureInWindow:function measureInWindow(callback){
UIManager.measureInWindow(
findNodeHandle(this),
mountSafeCallback(this,callback));},











measureLayout:function measureLayout(
relativeToNativeNode,
onSuccess,
onFail)
{
UIManager.measureLayout(
findNodeHandle(this),
relativeToNativeNode,
mountSafeCallback(this,onFail),
mountSafeCallback(this,onSuccess));},









setNativeProps:function setNativeProps(nativeProps){
if(__DEV__){
warnForStyleProps(nativeProps,this.viewConfig.validAttributes);}


var updatePayload=ReactNativeAttributePayload.create(
nativeProps,
this.viewConfig.validAttributes);


UIManager.updateView(
findNodeHandle(this),
this.viewConfig.uiViewClassName,
updatePayload);},







focus:function focus(){
TextInputState.focusTextInput(findNodeHandle(this));},





blur:function blur(){
TextInputState.blurTextInput(findNodeHandle(this));}};



function throwOnStylesProp(component,props){
if(props.styles!==undefined){
var owner=component._owner||null;
var name=component.constructor.displayName;
var msg='`styles` is not a supported property of `'+name+'`, did '+
'you mean `style` (singular)?';
if(owner&&owner.constructor&&owner.constructor.displayName){
msg+='\n\nCheck the `'+owner.constructor.displayName+'` parent '+
' component.';}

throw new Error(msg);}}


if(__DEV__){



var NativeMethodsMixin_DEV=NativeMethodsMixin;
invariant(
!NativeMethodsMixin_DEV.componentWillMount&&
!NativeMethodsMixin_DEV.componentWillReceiveProps,
'Do not override existing functions.');

NativeMethodsMixin_DEV.componentWillMount=function(){
throwOnStylesProp(this,this.props);};

NativeMethodsMixin_DEV.componentWillReceiveProps=function(newProps){
throwOnStylesProp(this,newProps);};}







var mountSafeCallback=function mountSafeCallback(context,callback){
return function(){
if(!callback||context.isMounted&&!context.isMounted()){
return;}

return callback.apply(context,arguments);};};



module.exports=NativeMethodsMixin;
});
__d(136 /* ReactNativeAttributePayload */, function(global, require, module, exports) {'use strict';












var Platform=require(10 /* Platform */);
var ReactNativePropRegistry=require(72 /* ReactNativePropRegistry */);

var deepDiffer=require(137 /* deepDiffer */);
var flattenStyle=require(71 /* flattenStyle */);

var emptyObject={};


























var removedKeys=null;
var removedKeyCount=0;

function translateKey(propKey){
if(propKey==='transform'){




if(Platform.OS==='android'){
return 'decomposedMatrix';}else 
{
return 'transformMatrix';}}


return propKey;}


function defaultDiffer(prevProp,nextProp){
if(typeof nextProp!=='object'||nextProp===null){

return true;}else 
{

return deepDiffer(prevProp,nextProp);}}



function resolveObject(idOrObject){
if(typeof idOrObject==='number'){
return ReactNativePropRegistry.getByID(idOrObject);}

return idOrObject;}


function restoreDeletedValuesInNestedArray(
updatePayload,
node,
validAttributes)
{
if(Array.isArray(node)){
var i=node.length;
while(i--&&removedKeyCount>0){
restoreDeletedValuesInNestedArray(
updatePayload,
node[i],
validAttributes);}}else 


if(node&&removedKeyCount>0){
var obj=resolveObject(node);
for(var propKey in removedKeys){
if(!removedKeys[propKey]){
continue;}

var nextProp=obj[propKey];
if(nextProp===undefined){
continue;}


var attributeConfig=validAttributes[propKey];
if(!attributeConfig){
continue;}


if(typeof nextProp==='function'){
nextProp=true;}

if(typeof nextProp==='undefined'){
nextProp=null;}


if(typeof attributeConfig!=='object'){

updatePayload[propKey]=nextProp;}else 
if(typeof attributeConfig.diff==='function'||
typeof attributeConfig.process==='function'){

var nextValue=typeof attributeConfig.process==='function'?
attributeConfig.process(nextProp):
nextProp;
updatePayload[propKey]=nextValue;}

removedKeys[propKey]=false;
removedKeyCount--;}}}




function diffNestedArrayProperty(
updatePayload,
prevArray,
nextArray,
validAttributes)
{
var minLength=prevArray.length<nextArray.length?
prevArray.length:
nextArray.length;
var i;
for(i=0;i<minLength;i++){


updatePayload=diffNestedProperty(
updatePayload,
prevArray[i],
nextArray[i],
validAttributes);}


for(;i<prevArray.length;i++){

updatePayload=clearNestedProperty(
updatePayload,
prevArray[i],
validAttributes);}


for(;i<nextArray.length;i++){

updatePayload=addNestedProperty(
updatePayload,
nextArray[i],
validAttributes);}


return updatePayload;}


function diffNestedProperty(
updatePayload,
prevProp,
nextProp,
validAttributes)
{

if(!updatePayload&&prevProp===nextProp){


return updatePayload;}


if(!prevProp||!nextProp){
if(nextProp){
return addNestedProperty(
updatePayload,
nextProp,
validAttributes);}


if(prevProp){
return clearNestedProperty(
updatePayload,
prevProp,
validAttributes);}


return updatePayload;}


if(!Array.isArray(prevProp)&&!Array.isArray(nextProp)){

return diffProperties(
updatePayload,
resolveObject(prevProp),
resolveObject(nextProp),
validAttributes);}



if(Array.isArray(prevProp)&&Array.isArray(nextProp)){

return diffNestedArrayProperty(
updatePayload,
prevProp,
nextProp,
validAttributes);}



if(Array.isArray(prevProp)){
return diffProperties(
updatePayload,

flattenStyle(prevProp),

resolveObject(nextProp),
validAttributes);}



return diffProperties(
updatePayload,
resolveObject(prevProp),

flattenStyle(nextProp),
validAttributes);}








function addNestedProperty(
updatePayload,
nextProp,
validAttributes)
{
if(!nextProp){
return updatePayload;}


if(!Array.isArray(nextProp)){

return addProperties(
updatePayload,
resolveObject(nextProp),
validAttributes);}



for(var i=0;i<nextProp.length;i++){

updatePayload=addNestedProperty(
updatePayload,
nextProp[i],
validAttributes);}



return updatePayload;}






function clearNestedProperty(
updatePayload,
prevProp,
validAttributes)
{
if(!prevProp){
return updatePayload;}


if(!Array.isArray(prevProp)){

return clearProperties(
updatePayload,
resolveObject(prevProp),
validAttributes);}



for(var i=0;i<prevProp.length;i++){

updatePayload=clearNestedProperty(
updatePayload,
prevProp[i],
validAttributes);}


return updatePayload;}








function diffProperties(
updatePayload,
prevProps,
nextProps,
validAttributes)
{
var attributeConfig;
var nextProp;
var prevProp;
var altKey;

for(var propKey in nextProps){
attributeConfig=validAttributes[propKey];
if(!attributeConfig){
continue;}


altKey=translateKey(propKey);
if(!validAttributes[altKey]){

altKey=propKey;}


prevProp=prevProps[propKey];
nextProp=nextProps[propKey];



if(typeof nextProp==='function'){
nextProp=true;


if(typeof prevProp==='function'){
prevProp=true;}}





if(typeof nextProp==='undefined'){
nextProp=null;
if(typeof prevProp==='undefined'){
prevProp=null;}}



if(removedKeys){
removedKeys[propKey]=false;}


if(updatePayload&&updatePayload[altKey]!==undefined){






if(typeof attributeConfig!=='object'){

updatePayload[altKey]=nextProp;}else 
if(typeof attributeConfig.diff==='function'||
typeof attributeConfig.process==='function'){

var nextValue=typeof attributeConfig.process==='function'?
attributeConfig.process(nextProp):
nextProp;
updatePayload[altKey]=nextValue;}

continue;}


if(prevProp===nextProp){
continue;}



if(typeof attributeConfig!=='object'){

if(defaultDiffer(prevProp,nextProp)){

(updatePayload||(updatePayload={}))[altKey]=nextProp;}}else 

if(typeof attributeConfig.diff==='function'||
typeof attributeConfig.process==='function'){

var shouldUpdate=prevProp===undefined||(
typeof attributeConfig.diff==='function'?
attributeConfig.diff(prevProp,nextProp):
defaultDiffer(prevProp,nextProp));

if(shouldUpdate){
var nextValue=typeof attributeConfig.process==='function'?
attributeConfig.process(nextProp):
nextProp;
(updatePayload||(updatePayload={}))[altKey]=nextValue;}}else 

{

removedKeys=null;
removedKeyCount=0;
updatePayload=diffNestedProperty(
updatePayload,
prevProp,
nextProp,
attributeConfig);

if(removedKeyCount>0&&updatePayload){
restoreDeletedValuesInNestedArray(
updatePayload,
nextProp,
attributeConfig);

removedKeys=null;}}}







for(var propKey in prevProps){
if(nextProps[propKey]!==undefined){
continue;}

attributeConfig=validAttributes[propKey];
if(!attributeConfig){
continue;}


altKey=translateKey(propKey);
if(!attributeConfig[altKey]){

altKey=propKey;}


if(updatePayload&&updatePayload[altKey]!==undefined){

continue;}


prevProp=prevProps[propKey];
if(prevProp===undefined){
continue;}


if(typeof attributeConfig!=='object'||
typeof attributeConfig.diff==='function'||
typeof attributeConfig.process==='function'){



(updatePayload||(updatePayload={}))[altKey]=null;
if(!removedKeys){
removedKeys={};}

if(!removedKeys[propKey]){
removedKeys[propKey]=true;
removedKeyCount++;}}else 

{



updatePayload=clearNestedProperty(
updatePayload,
prevProp,
attributeConfig);}}



return updatePayload;}





function addProperties(
updatePayload,
props,
validAttributes)
{

return diffProperties(updatePayload,emptyObject,props,validAttributes);}






function clearProperties(
updatePayload,
prevProps,
validAttributes)
{

return diffProperties(updatePayload,prevProps,emptyObject,validAttributes);}


var ReactNativeAttributePayload={

create:function create(
props,
validAttributes)
{
return addProperties(
null,
props,
validAttributes);},



diff:function diff(
prevProps,
nextProps,
validAttributes)
{
return diffProperties(
null,
prevProps,
nextProps,
validAttributes);}};





module.exports=ReactNativeAttributePayload;
});
__d(137 /* deepDiffer */, function(global, require, module, exports) {'use strict';















var deepDiffer=function deepDiffer(one,two){
if(one===two){

return false;}

if(typeof one==='function'&&typeof two==='function'){

return false;}

if(typeof one!=='object'||one===null){

return one!==two;}

if(typeof two!=='object'||two===null){


return true;}

if(one.constructor!==two.constructor){
return true;}

if(Array.isArray(one)){

var len=one.length;
if(two.length!==len){
return true;}

for(var ii=0;ii<len;ii++){
if(deepDiffer(one[ii],two[ii])){
return true;}}}else 


{
for(var key in one){
if(deepDiffer(one[key],two[key])){
return true;}}


for(var twoKey in two){


if(one[twoKey]===undefined&&two[twoKey]!==undefined){
return true;}}}



return false;};


module.exports=deepDiffer;
});
__d(138 /* TextInputState */, function(global, require, module, exports) {'use strict';
















var Platform=require(10 /* Platform */);
var UIManager=require(83 /* UIManager */);

var TextInputState={



_currentlyFocusedID:null,





currentlyFocusedField:function currentlyFocusedField(){
return this._currentlyFocusedID;},







focusTextInput:function focusTextInput(textFieldID){
if(this._currentlyFocusedID!==textFieldID&&textFieldID!==null){
this._currentlyFocusedID=textFieldID;
if(Platform.OS==='ios'){
UIManager.focus(textFieldID);}else 
if(Platform.OS==='android'){
UIManager.dispatchViewManagerCommand(
textFieldID,
UIManager.AndroidTextInput.Commands.focusTextInput,
null);}}},










blurTextInput:function blurTextInput(textFieldID){
if(this._currentlyFocusedID===textFieldID&&textFieldID!==null){
this._currentlyFocusedID=null;
if(Platform.OS==='ios'){
UIManager.blur(textFieldID);}else 
if(Platform.OS==='android'){
UIManager.dispatchViewManagerCommand(
textFieldID,
UIManager.AndroidTextInput.Commands.blurTextInput,
null);}}}};






module.exports=TextInputState;
});
__d(139 /* ReactNativeStyleAttributes */, function(global, require, module, exports) {'use strict';













var ImageStylePropTypes=require(140 /* ImageStylePropTypes */);
var TextStylePropTypes=require(148 /* TextStylePropTypes */);
var ViewStylePropTypes=require(149 /* ViewStylePropTypes */);

var keyMirror=require(224 /* fbjs/lib/keyMirror */);
var matricesDiffer=require(150 /* matricesDiffer */);
var processColor=require(151 /* processColor */);
var processTransform=require(152 /* processTransform */);
var sizesDiffer=require(154 /* sizesDiffer */);

var ReactNativeStyleAttributes=babelHelpers.extends({},
keyMirror(ViewStylePropTypes),
keyMirror(TextStylePropTypes),
keyMirror(ImageStylePropTypes));


ReactNativeStyleAttributes.transform={process:processTransform};
ReactNativeStyleAttributes.transformMatrix={diff:matricesDiffer};
ReactNativeStyleAttributes.shadowOffset={diff:sizesDiffer};


ReactNativeStyleAttributes.decomposedMatrix='decomposedMatrix';

var colorAttributes={process:processColor};
ReactNativeStyleAttributes.backgroundColor=colorAttributes;
ReactNativeStyleAttributes.borderBottomColor=colorAttributes;
ReactNativeStyleAttributes.borderColor=colorAttributes;
ReactNativeStyleAttributes.borderLeftColor=colorAttributes;
ReactNativeStyleAttributes.borderRightColor=colorAttributes;
ReactNativeStyleAttributes.borderTopColor=colorAttributes;
ReactNativeStyleAttributes.color=colorAttributes;
ReactNativeStyleAttributes.shadowColor=colorAttributes;
ReactNativeStyleAttributes.textDecorationColor=colorAttributes;
ReactNativeStyleAttributes.tintColor=colorAttributes;
ReactNativeStyleAttributes.textShadowColor=colorAttributes;
ReactNativeStyleAttributes.overlayColor=colorAttributes;

module.exports=ReactNativeStyleAttributes;
});
__d(140 /* ImageStylePropTypes */, function(global, require, module, exports) {'use strict';












var ImageResizeMode=require(141 /* ImageResizeMode */);
var LayoutPropTypes=require(142 /* LayoutPropTypes */);
var ReactPropTypes=require(47 /* ReactPropTypes */);
var ColorPropType=require(143 /* ColorPropType */);
var ShadowPropTypesIOS=require(145 /* ShadowPropTypesIOS */);
var TransformPropTypes=require(146 /* TransformPropTypes */);

var ImageStylePropTypes=babelHelpers.extends({},
LayoutPropTypes,
ShadowPropTypesIOS,
TransformPropTypes,{
resizeMode:ReactPropTypes.oneOf(Object.keys(ImageResizeMode)),
backfaceVisibility:ReactPropTypes.oneOf(['visible','hidden']),
backgroundColor:ColorPropType,
borderColor:ColorPropType,
borderWidth:ReactPropTypes.number,
borderRadius:ReactPropTypes.number,
overflow:ReactPropTypes.oneOf(['visible','hidden']),






tintColor:ColorPropType,
opacity:ReactPropTypes.number,

















overlayColor:ReactPropTypes.string,


borderTopLeftRadius:ReactPropTypes.number,
borderTopRightRadius:ReactPropTypes.number,
borderBottomLeftRadius:ReactPropTypes.number,
borderBottomRightRadius:ReactPropTypes.number});


module.exports=ImageStylePropTypes;
});
__d(141 /* ImageResizeMode */, function(global, require, module, exports) {'use strict';












var keyMirror=require(224 /* fbjs/lib/keyMirror */);





var ImageResizeMode=keyMirror({




contain:null,




cover:null,





stretch:null,





center:null});


module.exports=ImageResizeMode;
});
__d(142 /* LayoutPropTypes */, function(global, require, module, exports) {'use strict';












var ReactPropTypes=require(47 /* ReactPropTypes */);













var LayoutPropTypes={
width:ReactPropTypes.number,
height:ReactPropTypes.number,
top:ReactPropTypes.number,
left:ReactPropTypes.number,
right:ReactPropTypes.number,
bottom:ReactPropTypes.number,
margin:ReactPropTypes.number,
marginVertical:ReactPropTypes.number,
marginHorizontal:ReactPropTypes.number,
marginTop:ReactPropTypes.number,
marginBottom:ReactPropTypes.number,
marginLeft:ReactPropTypes.number,
marginRight:ReactPropTypes.number,
padding:ReactPropTypes.number,
paddingVertical:ReactPropTypes.number,
paddingHorizontal:ReactPropTypes.number,
paddingTop:ReactPropTypes.number,
paddingBottom:ReactPropTypes.number,
paddingLeft:ReactPropTypes.number,
paddingRight:ReactPropTypes.number,
borderWidth:ReactPropTypes.number,
borderTopWidth:ReactPropTypes.number,
borderRightWidth:ReactPropTypes.number,
borderBottomWidth:ReactPropTypes.number,
borderLeftWidth:ReactPropTypes.number,

position:ReactPropTypes.oneOf([
'absolute',
'relative']),



flexDirection:ReactPropTypes.oneOf([
'row',
'column']),



flexWrap:ReactPropTypes.oneOf([
'wrap',
'nowrap']),




justifyContent:ReactPropTypes.oneOf([
'flex-start',
'flex-end',
'center',
'space-between',
'space-around']),




alignItems:ReactPropTypes.oneOf([
'flex-start',
'flex-end',
'center',
'stretch']),




alignSelf:ReactPropTypes.oneOf([
'auto',
'flex-start',
'flex-end',
'center',
'stretch']),



flex:ReactPropTypes.number};


module.exports=LayoutPropTypes;
});
__d(143 /* ColorPropType */, function(global, require, module, exports) {'use strict';











var ReactPropTypes=require(47 /* ReactPropTypes */);
var ReactPropTypeLocationNames=require(44 /* ReactPropTypeLocationNames */);

var normalizeColor=require(144 /* normalizeColor */);

var colorPropType=function colorPropType(isRequired,props,propName,componentName,location,propFullName){
var color=props[propName];
if(color===undefined||color===null){
if(isRequired){
var locationName=ReactPropTypeLocationNames[location];
return new Error(
'Required '+locationName+' `'+(propFullName||propName)+
'` was not specified in `'+componentName+'`.');}


return;}


if(typeof color==='number'){



return;}


if(normalizeColor(color)===null){
var locationName=ReactPropTypeLocationNames[location];
return new Error(
'Invalid '+locationName+' `'+(propFullName||propName)+
'` supplied to `'+componentName+'`: '+color+'\n'+'Valid color formats are\n  - \'#f0f\' (#rgb)\n  - \'#f0fc\' (#rgba)\n  - \'#ff00ff\' (#rrggbb)\n  - \'#ff00ff00\' (#rrggbbaa)\n  - \'rgb(255, 255, 255)\'\n  - \'rgba(255, 255, 255, 1.0)\'\n  - \'hsl(360, 100%, 100%)\'\n  - \'hsla(360, 100%, 100%, 1.0)\'\n  - \'transparent\'\n  - \'red\'\n  - 0xff00ff00 (0xrrggbbaa)\n');}};
















var ColorPropType=colorPropType.bind(null,false);
ColorPropType.isRequired=colorPropType.bind(null,true);

module.exports=ColorPropType;
});
__d(144 /* normalizeColor */, function(global, require, module, exports) {'use strict';













function normalizeColor(color){
var match;

if(typeof color==='number'){
if(color>>>0===color&&color>=0&&color<=0xffffffff){
return color;}

return null;}



if(match=matchers.hex6.exec(color)){
return parseInt(match[1]+'ff',16)>>>0;}


if(names.hasOwnProperty(color)){
return names[color];}


if(match=matchers.rgb.exec(color)){
return (
parse255(match[1])<<24|
parse255(match[2])<<16|
parse255(match[3])<<8|
0x000000ff)>>>
0;}


if(match=matchers.rgba.exec(color)){
return (
parse255(match[1])<<24|
parse255(match[2])<<16|
parse255(match[3])<<8|
parse1(match[4]))>>>
0;}


if(match=matchers.hex3.exec(color)){
return parseInt(
match[1]+match[1]+
match[2]+match[2]+
match[3]+match[3]+
'ff',
16)>>>
0;}



if(match=matchers.hex8.exec(color)){
return parseInt(match[1],16)>>>0;}


if(match=matchers.hex4.exec(color)){
return parseInt(
match[1]+match[1]+
match[2]+match[2]+
match[3]+match[3]+
match[4]+match[4],
16)>>>
0;}


if(match=matchers.hsl.exec(color)){
return (
hslToRgb(
parse360(match[1]),
parsePercentage(match[2]),
parsePercentage(match[3]))|

0x000000ff)>>>
0;}


if(match=matchers.hsla.exec(color)){
return (
hslToRgb(
parse360(match[1]),
parsePercentage(match[2]),
parsePercentage(match[3]))|

parse1(match[4]))>>>
0;}


return null;}


function hue2rgb(p,q,t){
if(t<0){
t+=1;}

if(t>1){
t-=1;}

if(t<1/6){
return p+(q-p)*6*t;}

if(t<1/2){
return q;}

if(t<2/3){
return p+(q-p)*(2/3-t)*6;}

return p;}


function hslToRgb(h,s,l){
var q=l<0.5?l*(1+s):l+s-l*s;
var p=2*l-q;
var r=hue2rgb(p,q,h+1/3);
var g=hue2rgb(p,q,h);
var b=hue2rgb(p,q,h-1/3);

return (
Math.round(r*255)<<24|
Math.round(g*255)<<16|
Math.round(b*255)<<8);}




var NUMBER='[-+]?\\d*\\.?\\d+';
var PERCENTAGE=NUMBER+'%';

function call(){for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}
return '\\(\\s*('+args.join(')\\s*,\\s*(')+')\\s*\\)';}


var matchers={
rgb:new RegExp('rgb'+call(NUMBER,NUMBER,NUMBER)),
rgba:new RegExp('rgba'+call(NUMBER,NUMBER,NUMBER,NUMBER)),
hsl:new RegExp('hsl'+call(NUMBER,PERCENTAGE,PERCENTAGE)),
hsla:new RegExp('hsla'+call(NUMBER,PERCENTAGE,PERCENTAGE,NUMBER)),
hex3:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
hex4:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
hex6:/^#([0-9a-fA-F]{6})$/,
hex8:/^#([0-9a-fA-F]{8})$/};


function parse255(str){
var int=parseInt(str,10);
if(int<0){
return 0;}

if(int>255){
return 255;}

return int;}


function parse360(str){
var int=parseFloat(str);
return (int%360+360)%360/360;}


function parse1(str){
var num=parseFloat(str);
if(num<0){
return 0;}

if(num>1){
return 255;}

return Math.round(num*255);}


function parsePercentage(str){

var int=parseFloat(str,10);
if(int<0){
return 0;}

if(int>100){
return 1;}

return int/100;}


var names={
transparent:0x00000000,


aliceblue:0xf0f8ffff,
antiquewhite:0xfaebd7ff,
aqua:0x00ffffff,
aquamarine:0x7fffd4ff,
azure:0xf0ffffff,
beige:0xf5f5dcff,
bisque:0xffe4c4ff,
black:0x000000ff,
blanchedalmond:0xffebcdff,
blue:0x0000ffff,
blueviolet:0x8a2be2ff,
brown:0xa52a2aff,
burlywood:0xdeb887ff,
burntsienna:0xea7e5dff,
cadetblue:0x5f9ea0ff,
chartreuse:0x7fff00ff,
chocolate:0xd2691eff,
coral:0xff7f50ff,
cornflowerblue:0x6495edff,
cornsilk:0xfff8dcff,
crimson:0xdc143cff,
cyan:0x00ffffff,
darkblue:0x00008bff,
darkcyan:0x008b8bff,
darkgoldenrod:0xb8860bff,
darkgray:0xa9a9a9ff,
darkgreen:0x006400ff,
darkgrey:0xa9a9a9ff,
darkkhaki:0xbdb76bff,
darkmagenta:0x8b008bff,
darkolivegreen:0x556b2fff,
darkorange:0xff8c00ff,
darkorchid:0x9932ccff,
darkred:0x8b0000ff,
darksalmon:0xe9967aff,
darkseagreen:0x8fbc8fff,
darkslateblue:0x483d8bff,
darkslategray:0x2f4f4fff,
darkslategrey:0x2f4f4fff,
darkturquoise:0x00ced1ff,
darkviolet:0x9400d3ff,
deeppink:0xff1493ff,
deepskyblue:0x00bfffff,
dimgray:0x696969ff,
dimgrey:0x696969ff,
dodgerblue:0x1e90ffff,
firebrick:0xb22222ff,
floralwhite:0xfffaf0ff,
forestgreen:0x228b22ff,
fuchsia:0xff00ffff,
gainsboro:0xdcdcdcff,
ghostwhite:0xf8f8ffff,
gold:0xffd700ff,
goldenrod:0xdaa520ff,
gray:0x808080ff,
green:0x008000ff,
greenyellow:0xadff2fff,
grey:0x808080ff,
honeydew:0xf0fff0ff,
hotpink:0xff69b4ff,
indianred:0xcd5c5cff,
indigo:0x4b0082ff,
ivory:0xfffff0ff,
khaki:0xf0e68cff,
lavender:0xe6e6faff,
lavenderblush:0xfff0f5ff,
lawngreen:0x7cfc00ff,
lemonchiffon:0xfffacdff,
lightblue:0xadd8e6ff,
lightcoral:0xf08080ff,
lightcyan:0xe0ffffff,
lightgoldenrodyellow:0xfafad2ff,
lightgray:0xd3d3d3ff,
lightgreen:0x90ee90ff,
lightgrey:0xd3d3d3ff,
lightpink:0xffb6c1ff,
lightsalmon:0xffa07aff,
lightseagreen:0x20b2aaff,
lightskyblue:0x87cefaff,
lightslategray:0x778899ff,
lightslategrey:0x778899ff,
lightsteelblue:0xb0c4deff,
lightyellow:0xffffe0ff,
lime:0x00ff00ff,
limegreen:0x32cd32ff,
linen:0xfaf0e6ff,
magenta:0xff00ffff,
maroon:0x800000ff,
mediumaquamarine:0x66cdaaff,
mediumblue:0x0000cdff,
mediumorchid:0xba55d3ff,
mediumpurple:0x9370dbff,
mediumseagreen:0x3cb371ff,
mediumslateblue:0x7b68eeff,
mediumspringgreen:0x00fa9aff,
mediumturquoise:0x48d1ccff,
mediumvioletred:0xc71585ff,
midnightblue:0x191970ff,
mintcream:0xf5fffaff,
mistyrose:0xffe4e1ff,
moccasin:0xffe4b5ff,
navajowhite:0xffdeadff,
navy:0x000080ff,
oldlace:0xfdf5e6ff,
olive:0x808000ff,
olivedrab:0x6b8e23ff,
orange:0xffa500ff,
orangered:0xff4500ff,
orchid:0xda70d6ff,
palegoldenrod:0xeee8aaff,
palegreen:0x98fb98ff,
paleturquoise:0xafeeeeff,
palevioletred:0xdb7093ff,
papayawhip:0xffefd5ff,
peachpuff:0xffdab9ff,
peru:0xcd853fff,
pink:0xffc0cbff,
plum:0xdda0ddff,
powderblue:0xb0e0e6ff,
purple:0x800080ff,
rebeccapurple:0x663399ff,
red:0xff0000ff,
rosybrown:0xbc8f8fff,
royalblue:0x4169e1ff,
saddlebrown:0x8b4513ff,
salmon:0xfa8072ff,
sandybrown:0xf4a460ff,
seagreen:0x2e8b57ff,
seashell:0xfff5eeff,
sienna:0xa0522dff,
silver:0xc0c0c0ff,
skyblue:0x87ceebff,
slateblue:0x6a5acdff,
slategray:0x708090ff,
slategrey:0x708090ff,
snow:0xfffafaff,
springgreen:0x00ff7fff,
steelblue:0x4682b4ff,
tan:0xd2b48cff,
teal:0x008080ff,
thistle:0xd8bfd8ff,
tomato:0xff6347ff,
turquoise:0x40e0d0ff,
violet:0xee82eeff,
wheat:0xf5deb3ff,
white:0xffffffff,
whitesmoke:0xf5f5f5ff,
yellow:0xffff00ff,
yellowgreen:0x9acd32ff};


module.exports=normalizeColor;
});
__d(145 /* ShadowPropTypesIOS */, function(global, require, module, exports) {'use strict';












var ColorPropType=require(143 /* ColorPropType */);
var ReactPropTypes=require(47 /* ReactPropTypes */);

var ShadowPropTypesIOS={




shadowColor:ColorPropType,




shadowOffset:ReactPropTypes.shape(
{width:ReactPropTypes.number,height:ReactPropTypes.number}),





shadowOpacity:ReactPropTypes.number,




shadowRadius:ReactPropTypes.number};


module.exports=ShadowPropTypesIOS;
});
__d(146 /* TransformPropTypes */, function(global, require, module, exports) {'use strict';












var ReactPropTypes=require(47 /* ReactPropTypes */);
var deprecatedPropType=require(147 /* deprecatedPropType */);

var ArrayOfNumberPropType=ReactPropTypes.arrayOf(ReactPropTypes.number);

var TransformMatrixPropType=function TransformMatrixPropType(
props,
propName,
componentName)
{
if(props.transform&&props.transformMatrix){
return new Error(
'transformMatrix and transform styles cannot be used on the same '+
'component');}


return ArrayOfNumberPropType(props,propName,componentName);};


var TransformPropTypes={
transform:ReactPropTypes.arrayOf(
ReactPropTypes.oneOfType([
ReactPropTypes.shape({perspective:ReactPropTypes.number}),
ReactPropTypes.shape({rotate:ReactPropTypes.string}),
ReactPropTypes.shape({rotateX:ReactPropTypes.string}),
ReactPropTypes.shape({rotateY:ReactPropTypes.string}),
ReactPropTypes.shape({rotateZ:ReactPropTypes.string}),
ReactPropTypes.shape({scale:ReactPropTypes.number}),
ReactPropTypes.shape({scaleX:ReactPropTypes.number}),
ReactPropTypes.shape({scaleY:ReactPropTypes.number}),
ReactPropTypes.shape({translateX:ReactPropTypes.number}),
ReactPropTypes.shape({translateY:ReactPropTypes.number}),
ReactPropTypes.shape({skewX:ReactPropTypes.string}),
ReactPropTypes.shape({skewY:ReactPropTypes.string})])),


transformMatrix:TransformMatrixPropType,


scaleX:deprecatedPropType(ReactPropTypes.number,'Use the transform prop instead.'),
scaleY:deprecatedPropType(ReactPropTypes.number,'Use the transform prop instead.'),
rotation:deprecatedPropType(ReactPropTypes.number,'Use the transform prop instead.'),
translateX:deprecatedPropType(ReactPropTypes.number,'Use the transform prop instead.'),
translateY:deprecatedPropType(ReactPropTypes.number,'Use the transform prop instead.')};


module.exports=TransformPropTypes;
});
__d(147 /* deprecatedPropType */, function(global, require, module, exports) {'use strict';












var UIManager=require(83 /* UIManager */);




function deprecatedPropType(
propType,
explanation)
{
return function validate(props,propName,componentName){

if(!UIManager[componentName]&&props[propName]!==undefined){
console.warn('`'+propName+'` supplied to `'+componentName+'` has been deprecated. '+explanation);}


return propType(props,propName,componentName);};}



module.exports=deprecatedPropType;
});
__d(148 /* TextStylePropTypes */, function(global, require, module, exports) {'use strict';












var ReactPropTypes=require(47 /* ReactPropTypes */);
var ColorPropType=require(143 /* ColorPropType */);
var ViewStylePropTypes=require(149 /* ViewStylePropTypes */);


var TextStylePropTypes=babelHelpers.extends(Object.create(ViewStylePropTypes),{
color:ColorPropType,
fontFamily:ReactPropTypes.string,
fontSize:ReactPropTypes.number,
fontStyle:ReactPropTypes.oneOf(['normal','italic']),





fontWeight:ReactPropTypes.oneOf(
['normal','bold',
'100','200','300','400','500','600','700','800','900']),

textShadowOffset:ReactPropTypes.shape(
{width:ReactPropTypes.number,height:ReactPropTypes.number}),

textShadowRadius:ReactPropTypes.number,
textShadowColor:ColorPropType,



letterSpacing:ReactPropTypes.number,
lineHeight:ReactPropTypes.number,



textAlign:ReactPropTypes.oneOf(
['auto','left','right','center','justify']),




textAlignVertical:ReactPropTypes.oneOf(
['auto','top','bottom','center']),

textDecorationLine:ReactPropTypes.oneOf(
['none','underline','line-through','underline line-through']),




textDecorationStyle:ReactPropTypes.oneOf(
['solid','double','dotted','dashed']),




textDecorationColor:ColorPropType,



writingDirection:ReactPropTypes.oneOf(
['auto','ltr','rtl'])});



module.exports=TextStylePropTypes;
});
__d(149 /* ViewStylePropTypes */, function(global, require, module, exports) {'use strict';












var LayoutPropTypes=require(142 /* LayoutPropTypes */);
var ReactPropTypes=require(47 /* ReactPropTypes */);
var ColorPropType=require(143 /* ColorPropType */);
var ShadowPropTypesIOS=require(145 /* ShadowPropTypesIOS */);
var TransformPropTypes=require(146 /* TransformPropTypes */);




var ViewStylePropTypes=babelHelpers.extends({},
LayoutPropTypes,
ShadowPropTypesIOS,
TransformPropTypes,{
backfaceVisibility:ReactPropTypes.oneOf(['visible','hidden']),
backgroundColor:ColorPropType,
borderColor:ColorPropType,
borderTopColor:ColorPropType,
borderRightColor:ColorPropType,
borderBottomColor:ColorPropType,
borderLeftColor:ColorPropType,
borderRadius:ReactPropTypes.number,
borderTopLeftRadius:ReactPropTypes.number,
borderTopRightRadius:ReactPropTypes.number,
borderBottomLeftRadius:ReactPropTypes.number,
borderBottomRightRadius:ReactPropTypes.number,
borderStyle:ReactPropTypes.oneOf(['solid','dotted','dashed']),
borderWidth:ReactPropTypes.number,
borderTopWidth:ReactPropTypes.number,
borderRightWidth:ReactPropTypes.number,
borderBottomWidth:ReactPropTypes.number,
borderLeftWidth:ReactPropTypes.number,
opacity:ReactPropTypes.number,
overflow:ReactPropTypes.oneOf(['visible','hidden']),







elevation:ReactPropTypes.number});


module.exports=ViewStylePropTypes;
});
__d(150 /* matricesDiffer */, function(global, require, module, exports) {'use strict';




















var matricesDiffer=function matricesDiffer(one,two){
if(one===two){
return false;}

return !one||!two||
one[12]!==two[12]||
one[13]!==two[13]||
one[14]!==two[14]||
one[5]!==two[5]||
one[10]!==two[10]||
one[1]!==two[1]||
one[2]!==two[2]||
one[3]!==two[3]||
one[4]!==two[4]||
one[6]!==two[6]||
one[7]!==two[7]||
one[8]!==two[8]||
one[9]!==two[9]||
one[11]!==two[11]||
one[15]!==two[15];};


module.exports=matricesDiffer;
});
__d(151 /* processColor */, function(global, require, module, exports) {'use strict';











var Platform=require(10 /* Platform */);

var normalizeColor=require(144 /* normalizeColor */);


function processColor(color){
if(color===undefined||color===null){
return color;}


var int32Color=normalizeColor(color);
if(int32Color===null){
return undefined;}



int32Color=(int32Color<<24|int32Color>>>8)>>>0;

if(Platform.OS==='android'){




int32Color=int32Color|0x0;}

return int32Color;}


module.exports=processColor;
});
__d(152 /* processTransform */, function(global, require, module, exports) {'use strict';












var MatrixMath=require(153 /* MatrixMath */);
var Platform=require(10 /* Platform */);

var invariant=require(222 /* fbjs/lib/invariant */);
var stringifySafe=require(11 /* stringifySafe */);









function processTransform(transform){
var result=MatrixMath.createIdentityMatrix();

transform.forEach(function(transformation){
var key=Object.keys(transformation)[0];
var value=transformation[key];
if(__DEV__){
_validateTransform(key,value,transformation);}


switch(key){
case 'matrix':
MatrixMath.multiplyInto(result,result,value);
break;
case 'perspective':
_multiplyTransform(result,MatrixMath.reusePerspectiveCommand,[value]);
break;
case 'rotateX':
_multiplyTransform(result,MatrixMath.reuseRotateXCommand,[_convertToRadians(value)]);
break;
case 'rotateY':
_multiplyTransform(result,MatrixMath.reuseRotateYCommand,[_convertToRadians(value)]);
break;
case 'rotate':
case 'rotateZ':
_multiplyTransform(result,MatrixMath.reuseRotateZCommand,[_convertToRadians(value)]);
break;
case 'scale':
_multiplyTransform(result,MatrixMath.reuseScaleCommand,[value]);
break;
case 'scaleX':
_multiplyTransform(result,MatrixMath.reuseScaleXCommand,[value]);
break;
case 'scaleY':
_multiplyTransform(result,MatrixMath.reuseScaleYCommand,[value]);
break;
case 'translate':
_multiplyTransform(result,MatrixMath.reuseTranslate3dCommand,[value[0],value[1],value[2]||0]);
break;
case 'translateX':
_multiplyTransform(result,MatrixMath.reuseTranslate2dCommand,[value,0]);
break;
case 'translateY':
_multiplyTransform(result,MatrixMath.reuseTranslate2dCommand,[0,value]);
break;
case 'skewX':
_multiplyTransform(result,MatrixMath.reuseSkewXCommand,[_convertToRadians(value)]);
break;
case 'skewY':
_multiplyTransform(result,MatrixMath.reuseSkewYCommand,[_convertToRadians(value)]);
break;
default:
throw new Error('Invalid transform name: '+key);}});







if(Platform.OS==='android'){
return MatrixMath.decomposeMatrix(result);}

return result;}





function _multiplyTransform(
result,
matrixMathFunction,
args)
{
var matrixToApply=MatrixMath.createIdentityMatrix();
var argsWithIdentity=[matrixToApply].concat(args);
matrixMathFunction.apply(this,argsWithIdentity);
MatrixMath.multiplyInto(result,result,matrixToApply);}






function _convertToRadians(value){
var floatValue=parseFloat(value,10);
return value.indexOf('rad')>-1?floatValue:floatValue*Math.PI/180;}


function _validateTransform(key,value,transformation){
invariant(
!value.getValue,
'You passed an Animated.Value to a normal component. '+
'You need to wrap that component in an Animated. For example, '+
'replace <View /> by <Animated.View />.');


var multivalueTransforms=[
'matrix',
'translate'];

if(multivalueTransforms.indexOf(key)!==-1){
invariant(
Array.isArray(value),
'Transform with key of %s must have an array as the value: %s',
key,
stringifySafe(transformation));}


switch(key){
case 'matrix':
invariant(
value.length===9||value.length===16,
'Matrix transform must have a length of 9 (2d) or 16 (3d). '+
'Provided matrix has a length of %s: %s',
value.length,
stringifySafe(transformation));

break;
case 'translate':
break;
case 'rotateX':
case 'rotateY':
case 'rotateZ':
case 'rotate':
case 'skewX':
case 'skewY':
invariant(
typeof value==='string',
'Transform with key of "%s" must be a string: %s',
key,
stringifySafe(transformation));

invariant(
value.indexOf('deg')>-1||value.indexOf('rad')>-1,
'Rotate transform must be expressed in degrees (deg) or radians '+
'(rad): %s',
stringifySafe(transformation));

break;
case 'perspective':
invariant(
typeof value==='number',
'Transform with key of "%s" must be a number: %s',
key,
stringifySafe(transformation));

invariant(
value!==0,
'Transform with key of "%s" cannot be zero: %s',
key,
stringifySafe(transformation));

break;
default:
invariant(
typeof value==='number',
'Transform with key of "%s" must be a number: %s',
key,
stringifySafe(transformation));}}




module.exports=processTransform;
});
__d(153 /* MatrixMath */, function(global, require, module, exports) {'use strict';








var invariant=require(222 /* fbjs/lib/invariant */);





var MatrixMath={
createIdentityMatrix:function createIdentityMatrix(){
return [
1,0,0,0,
0,1,0,0,
0,0,1,0,
0,0,0,1];},



createCopy:function createCopy(m){
return [
m[0],m[1],m[2],m[3],
m[4],m[5],m[6],m[7],
m[8],m[9],m[10],m[11],
m[12],m[13],m[14],m[15]];},



createOrthographic:function createOrthographic(left,right,bottom,top,near,far){
var a=2/(right-left);
var b=2/(top-bottom);
var c=-2/(far-near);

var tx=-(right+left)/(right-left);
var ty=-(top+bottom)/(top-bottom);
var tz=-(far+near)/(far-near);

return [
a,0,0,0,
0,b,0,0,
0,0,c,0,
tx,ty,tz,1];},



createFrustum:function createFrustum(left,right,bottom,top,near,far){
var r_width=1/(right-left);
var r_height=1/(top-bottom);
var r_depth=1/(near-far);
var x=2*(near*r_width);
var y=2*(near*r_height);
var A=(right+left)*r_width;
var B=(top+bottom)*r_height;
var C=(far+near)*r_depth;
var D=2*(far*near*r_depth);
return [
x,0,0,0,
0,y,0,0,
A,B,C,-1,
0,0,D,0];},









createPerspective:function createPerspective(fovInRadians,aspect,near,far){
var h=1/Math.tan(fovInRadians/2);
var r_depth=1/(near-far);
var C=(far+near)*r_depth;
var D=2*(far*near*r_depth);
return [
h/aspect,0,0,0,
0,h,0,0,
0,0,C,-1,
0,0,D,0];},



createTranslate2d:function createTranslate2d(x,y){
var mat=MatrixMath.createIdentityMatrix();
MatrixMath.reuseTranslate2dCommand(mat,x,y);
return mat;},


reuseTranslate2dCommand:function reuseTranslate2dCommand(matrixCommand,x,y){
matrixCommand[12]=x;
matrixCommand[13]=y;},


reuseTranslate3dCommand:function reuseTranslate3dCommand(matrixCommand,x,y,z){
matrixCommand[12]=x;
matrixCommand[13]=y;
matrixCommand[14]=z;},


createScale:function createScale(factor){
var mat=MatrixMath.createIdentityMatrix();
MatrixMath.reuseScaleCommand(mat,factor);
return mat;},


reuseScaleCommand:function reuseScaleCommand(matrixCommand,factor){
matrixCommand[0]=factor;
matrixCommand[5]=factor;},


reuseScale3dCommand:function reuseScale3dCommand(matrixCommand,x,y,z){
matrixCommand[0]=x;
matrixCommand[5]=y;
matrixCommand[10]=z;},


reusePerspectiveCommand:function reusePerspectiveCommand(matrixCommand,p){
matrixCommand[11]=-1/p;},


reuseScaleXCommand:function reuseScaleXCommand(matrixCommand,factor){
matrixCommand[0]=factor;},


reuseScaleYCommand:function reuseScaleYCommand(matrixCommand,factor){
matrixCommand[5]=factor;},


reuseScaleZCommand:function reuseScaleZCommand(matrixCommand,factor){
matrixCommand[10]=factor;},


reuseRotateXCommand:function reuseRotateXCommand(matrixCommand,radians){
matrixCommand[5]=Math.cos(radians);
matrixCommand[6]=Math.sin(radians);
matrixCommand[9]=-Math.sin(radians);
matrixCommand[10]=Math.cos(radians);},


reuseRotateYCommand:function reuseRotateYCommand(matrixCommand,amount){
matrixCommand[0]=Math.cos(amount);
matrixCommand[2]=-Math.sin(amount);
matrixCommand[8]=Math.sin(amount);
matrixCommand[10]=Math.cos(amount);},



reuseRotateZCommand:function reuseRotateZCommand(matrixCommand,radians){
matrixCommand[0]=Math.cos(radians);
matrixCommand[1]=Math.sin(radians);
matrixCommand[4]=-Math.sin(radians);
matrixCommand[5]=Math.cos(radians);},


createRotateZ:function createRotateZ(radians){
var mat=MatrixMath.createIdentityMatrix();
MatrixMath.reuseRotateZCommand(mat,radians);
return mat;},


reuseSkewXCommand:function reuseSkewXCommand(matrixCommand,radians){
matrixCommand[4]=Math.sin(radians);
matrixCommand[5]=Math.cos(radians);},


reuseSkewYCommand:function reuseSkewYCommand(matrixCommand,radians){
matrixCommand[0]=Math.cos(radians);
matrixCommand[1]=Math.sin(radians);},


multiplyInto:function multiplyInto(out,a,b){
var a00=a[0],a01=a[1],a02=a[2],a03=a[3],
a10=a[4],a11=a[5],a12=a[6],a13=a[7],
a20=a[8],a21=a[9],a22=a[10],a23=a[11],
a30=a[12],a31=a[13],a32=a[14],a33=a[15];

var b0=b[0],b1=b[1],b2=b[2],b3=b[3];
out[0]=b0*a00+b1*a10+b2*a20+b3*a30;
out[1]=b0*a01+b1*a11+b2*a21+b3*a31;
out[2]=b0*a02+b1*a12+b2*a22+b3*a32;
out[3]=b0*a03+b1*a13+b2*a23+b3*a33;

b0=b[4];b1=b[5];b2=b[6];b3=b[7];
out[4]=b0*a00+b1*a10+b2*a20+b3*a30;
out[5]=b0*a01+b1*a11+b2*a21+b3*a31;
out[6]=b0*a02+b1*a12+b2*a22+b3*a32;
out[7]=b0*a03+b1*a13+b2*a23+b3*a33;

b0=b[8];b1=b[9];b2=b[10];b3=b[11];
out[8]=b0*a00+b1*a10+b2*a20+b3*a30;
out[9]=b0*a01+b1*a11+b2*a21+b3*a31;
out[10]=b0*a02+b1*a12+b2*a22+b3*a32;
out[11]=b0*a03+b1*a13+b2*a23+b3*a33;

b0=b[12];b1=b[13];b2=b[14];b3=b[15];
out[12]=b0*a00+b1*a10+b2*a20+b3*a30;
out[13]=b0*a01+b1*a11+b2*a21+b3*a31;
out[14]=b0*a02+b1*a12+b2*a22+b3*a32;
out[15]=b0*a03+b1*a13+b2*a23+b3*a33;},


determinant:function determinant(matrix){var _matrix=babelHelpers.slicedToArray(





matrix,16);var m00=_matrix[0];var m01=_matrix[1];var m02=_matrix[2];var m03=_matrix[3];var m10=_matrix[4];var m11=_matrix[5];var m12=_matrix[6];var m13=_matrix[7];var m20=_matrix[8];var m21=_matrix[9];var m22=_matrix[10];var m23=_matrix[11];var m30=_matrix[12];var m31=_matrix[13];var m32=_matrix[14];var m33=_matrix[15];
return (
m03*m12*m21*m30-m02*m13*m21*m30-
m03*m11*m22*m30+m01*m13*m22*m30+
m02*m11*m23*m30-m01*m12*m23*m30-
m03*m12*m20*m31+m02*m13*m20*m31+
m03*m10*m22*m31-m00*m13*m22*m31-
m02*m10*m23*m31+m00*m12*m23*m31+
m03*m11*m20*m32-m01*m13*m20*m32-
m03*m10*m21*m32+m00*m13*m21*m32+
m01*m10*m23*m32-m00*m11*m23*m32-
m02*m11*m20*m33+m01*m12*m20*m33+
m02*m10*m21*m33-m00*m12*m21*m33-
m01*m10*m22*m33+m00*m11*m22*m33);},










inverse:function inverse(matrix){
var det=MatrixMath.determinant(matrix);
if(!det){
return matrix;}var _matrix2=babelHelpers.slicedToArray(






matrix,16);var m00=_matrix2[0];var m01=_matrix2[1];var m02=_matrix2[2];var m03=_matrix2[3];var m10=_matrix2[4];var m11=_matrix2[5];var m12=_matrix2[6];var m13=_matrix2[7];var m20=_matrix2[8];var m21=_matrix2[9];var m22=_matrix2[10];var m23=_matrix2[11];var m30=_matrix2[12];var m31=_matrix2[13];var m32=_matrix2[14];var m33=_matrix2[15];
return [
(m12*m23*m31-m13*m22*m31+m13*m21*m32-m11*m23*m32-m12*m21*m33+m11*m22*m33)/det,
(m03*m22*m31-m02*m23*m31-m03*m21*m32+m01*m23*m32+m02*m21*m33-m01*m22*m33)/det,
(m02*m13*m31-m03*m12*m31+m03*m11*m32-m01*m13*m32-m02*m11*m33+m01*m12*m33)/det,
(m03*m12*m21-m02*m13*m21-m03*m11*m22+m01*m13*m22+m02*m11*m23-m01*m12*m23)/det,
(m13*m22*m30-m12*m23*m30-m13*m20*m32+m10*m23*m32+m12*m20*m33-m10*m22*m33)/det,
(m02*m23*m30-m03*m22*m30+m03*m20*m32-m00*m23*m32-m02*m20*m33+m00*m22*m33)/det,
(m03*m12*m30-m02*m13*m30-m03*m10*m32+m00*m13*m32+m02*m10*m33-m00*m12*m33)/det,
(m02*m13*m20-m03*m12*m20+m03*m10*m22-m00*m13*m22-m02*m10*m23+m00*m12*m23)/det,
(m11*m23*m30-m13*m21*m30+m13*m20*m31-m10*m23*m31-m11*m20*m33+m10*m21*m33)/det,
(m03*m21*m30-m01*m23*m30-m03*m20*m31+m00*m23*m31+m01*m20*m33-m00*m21*m33)/det,
(m01*m13*m30-m03*m11*m30+m03*m10*m31-m00*m13*m31-m01*m10*m33+m00*m11*m33)/det,
(m03*m11*m20-m01*m13*m20-m03*m10*m21+m00*m13*m21+m01*m10*m23-m00*m11*m23)/det,
(m12*m21*m30-m11*m22*m30-m12*m20*m31+m10*m22*m31+m11*m20*m32-m10*m21*m32)/det,
(m01*m22*m30-m02*m21*m30+m02*m20*m31-m00*m22*m31-m01*m20*m32+m00*m21*m32)/det,
(m02*m11*m30-m01*m12*m30-m02*m10*m31+m00*m12*m31+m01*m10*m32-m00*m11*m32)/det,
(m01*m12*m20-m02*m11*m20+m02*m10*m21-m00*m12*m21-m01*m10*m22+m00*m11*m22)/det];},






transpose:function transpose(m){
return [
m[0],m[4],m[8],m[12],
m[1],m[5],m[9],m[13],
m[2],m[6],m[10],m[14],
m[3],m[7],m[11],m[15]];},






multiplyVectorByMatrix:function multiplyVectorByMatrix(
v,
m)
{var _v=babelHelpers.slicedToArray(
v,4);var vx=_v[0];var vy=_v[1];var vz=_v[2];var vw=_v[3];
return [
vx*m[0]+vy*m[4]+vz*m[8]+vw*m[12],
vx*m[1]+vy*m[5]+vz*m[9]+vw*m[13],
vx*m[2]+vy*m[6]+vz*m[10]+vw*m[14],
vx*m[3]+vy*m[7]+vz*m[11]+vw*m[15]];},






v3Length:function v3Length(a){
return Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]);},





v3Normalize:function v3Normalize(
vector,
v3Length)
{
var im=1/(v3Length||MatrixMath.v3Length(vector));
return [
vector[0]*im,
vector[1]*im,
vector[2]*im];},







v3Dot:function v3Dot(a,b){
return a[0]*b[0]+
a[1]*b[1]+
a[2]*b[2];},






v3Combine:function v3Combine(
a,
b,
aScale,
bScale)
{
return [
aScale*a[0]+bScale*b[0],
aScale*a[1]+bScale*b[1],
aScale*a[2]+bScale*b[2]];},







v3Cross:function v3Cross(a,b){
return [
a[1]*b[2]-a[2]*b[1],
a[2]*b[0]-a[0]*b[2],
a[0]*b[1]-a[1]*b[0]];},



















quaternionToDegreesXYZ:function quaternionToDegreesXYZ(q,matrix,row){var _q=babelHelpers.slicedToArray(
q,4);var qx=_q[0];var qy=_q[1];var qz=_q[2];var qw=_q[3];
var qw2=qw*qw;
var qx2=qx*qx;
var qy2=qy*qy;
var qz2=qz*qz;
var test=qx*qy+qz*qw;
var unit=qw2+qx2+qy2+qz2;
var conv=180/Math.PI;

if(test>0.49999*unit){
return [0,2*Math.atan2(qx,qw)*conv,90];}

if(test<-0.49999*unit){
return [0,-2*Math.atan2(qx,qw)*conv,-90];}


return [
MatrixMath.roundTo3Places(
Math.atan2(2*qx*qw-2*qy*qz,1-2*qx2-2*qz2)*conv),

MatrixMath.roundTo3Places(
Math.atan2(2*qy*qw-2*qx*qz,1-2*qy2-2*qz2)*conv),

MatrixMath.roundTo3Places(
Math.asin(2*qx*qy+2*qz*qw)*conv)];},








roundTo3Places:function roundTo3Places(n){
var arr=n.toString().split('e');
return Math.round(arr[0]+'e'+(arr[1]?+arr[1]-3:3))*0.001;},













decomposeMatrix:function decomposeMatrix(transformMatrix){

invariant(
transformMatrix.length===16,
'Matrix decomposition needs a list of 3d matrix values, received %s',
transformMatrix);



var perspective=[];
var quaternion=[];
var scale=[];
var skew=[];
var translation=[];



if(!transformMatrix[15]){
return;}

var matrix=[];
var perspectiveMatrix=[];
for(var i=0;i<4;i++){
matrix.push([]);
for(var j=0;j<4;j++){
var value=transformMatrix[i*4+j]/transformMatrix[15];
matrix[i].push(value);
perspectiveMatrix.push(j===3?0:value);}}


perspectiveMatrix[15]=1;


if(!MatrixMath.determinant(perspectiveMatrix)){
return;}



if(matrix[0][3]!==0||matrix[1][3]!==0||matrix[2][3]!==0){


var rightHandSide=[
matrix[0][3],
matrix[1][3],
matrix[2][3],
matrix[3][3]];




var inversePerspectiveMatrix=MatrixMath.inverse(
perspectiveMatrix);

var transposedInversePerspectiveMatrix=MatrixMath.transpose(
inversePerspectiveMatrix);

var perspective=MatrixMath.multiplyVectorByMatrix(
rightHandSide,
transposedInversePerspectiveMatrix);}else 

{

perspective[0]=perspective[1]=perspective[2]=0;
perspective[3]=1;}



for(var i=0;i<3;i++){
translation[i]=matrix[3][i];}




var row=[];
for(i=0;i<3;i++){
row[i]=[
matrix[i][0],
matrix[i][1],
matrix[i][2]];}




scale[0]=MatrixMath.v3Length(row[0]);
row[0]=MatrixMath.v3Normalize(row[0],scale[0]);


skew[0]=MatrixMath.v3Dot(row[0],row[1]);
row[1]=MatrixMath.v3Combine(row[1],row[0],1.0,-skew[0]);


skew[0]=MatrixMath.v3Dot(row[0],row[1]);
row[1]=MatrixMath.v3Combine(row[1],row[0],1.0,-skew[0]);


scale[1]=MatrixMath.v3Length(row[1]);
row[1]=MatrixMath.v3Normalize(row[1],scale[1]);
skew[0]/=scale[1];


skew[1]=MatrixMath.v3Dot(row[0],row[2]);
row[2]=MatrixMath.v3Combine(row[2],row[0],1.0,-skew[1]);
skew[2]=MatrixMath.v3Dot(row[1],row[2]);
row[2]=MatrixMath.v3Combine(row[2],row[1],1.0,-skew[2]);


scale[2]=MatrixMath.v3Length(row[2]);
row[2]=MatrixMath.v3Normalize(row[2],scale[2]);
skew[1]/=scale[2];
skew[2]/=scale[2];




var pdum3=MatrixMath.v3Cross(row[1],row[2]);
if(MatrixMath.v3Dot(row[0],pdum3)<0){
for(i=0;i<3;i++){
scale[i]*=-1;
row[i][0]*=-1;
row[i][1]*=-1;
row[i][2]*=-1;}}




quaternion[0]=
0.5*Math.sqrt(Math.max(1+row[0][0]-row[1][1]-row[2][2],0));
quaternion[1]=
0.5*Math.sqrt(Math.max(1-row[0][0]+row[1][1]-row[2][2],0));
quaternion[2]=
0.5*Math.sqrt(Math.max(1-row[0][0]-row[1][1]+row[2][2],0));
quaternion[3]=
0.5*Math.sqrt(Math.max(1+row[0][0]+row[1][1]+row[2][2],0));

if(row[2][1]>row[1][2]){
quaternion[0]=-quaternion[0];}

if(row[0][2]>row[2][0]){
quaternion[1]=-quaternion[1];}

if(row[1][0]>row[0][1]){
quaternion[2]=-quaternion[2];}



var rotationDegrees;
if(
quaternion[0]<0.001&&quaternion[0]>=0&&
quaternion[1]<0.001&&quaternion[1]>=0)
{

rotationDegrees=[0,0,MatrixMath.roundTo3Places(
Math.atan2(row[0][1],row[0][0])*180/Math.PI)];}else 

{
rotationDegrees=MatrixMath.quaternionToDegreesXYZ(quaternion,matrix,row);}



return {
rotationDegrees:rotationDegrees,
perspective:perspective,
quaternion:quaternion,
scale:scale,
skew:skew,
translation:translation,

rotate:rotationDegrees[2],
rotateX:rotationDegrees[0],
rotateY:rotationDegrees[1],
scaleX:scale[0],
scaleY:scale[1],
translateX:translation[0],
translateY:translation[1]};}};





module.exports=MatrixMath;
});
__d(154 /* sizesDiffer */, function(global, require, module, exports) {'use strict';






var dummySize={width:undefined,height:undefined};

var sizesDiffer=function sizesDiffer(one,two){
one=one||dummySize;
two=two||dummySize;
return one!==two&&(
one.width!==two.width||
one.height!==two.height);};



module.exports=sizesDiffer;
});
__d(155 /* ReactNativeViewAttributes */, function(global, require, module, exports) {'use strict';












var ReactNativeStyleAttributes=require(139 /* ReactNativeStyleAttributes */);

var ReactNativeViewAttributes={};

ReactNativeViewAttributes.UIView={
pointerEvents:true,
accessible:true,
accessibilityLabel:true,
accessibilityComponentType:true,
accessibilityLiveRegion:true,
accessibilityTraits:true,
importantForAccessibility:true,
testID:true,
renderToHardwareTextureAndroid:true,
shouldRasterizeIOS:true,
onLayout:true,
onAccessibilityTap:true,
onMagicTap:true,
collapsable:true,
needsOffscreenAlphaCompositing:true,
style:ReactNativeStyleAttributes};


ReactNativeViewAttributes.RCTView=babelHelpers.extends({},
ReactNativeViewAttributes.UIView,{






removeClippedSubviews:true});


module.exports=ReactNativeViewAttributes;
});
__d(156 /* StyleSheetPropType */, function(global, require, module, exports) {'use strict';












var createStrictShapeTypeChecker=require(134 /* createStrictShapeTypeChecker */);
var flattenStyle=require(71 /* flattenStyle */);

function StyleSheetPropType(
shape)
{
var shapePropType=createStrictShapeTypeChecker(shape);
return function(props,propName,componentName,location){
var newProps=props;
if(props[propName]){

newProps={};
newProps[propName]=flattenStyle(props[propName]);}

return shapePropType(newProps,propName,componentName,location);};}



module.exports=StyleSheetPropType;
});
__d(157 /* requireNativeComponent */, function(global, require, module, exports) {'use strict';












var ReactNativeStyleAttributes=require(139 /* ReactNativeStyleAttributes */);
var UIManager=require(83 /* UIManager */);
var UnimplementedView=require(158 /* UnimplementedView */);

var createReactNativeComponentClass=require(163 /* createReactNativeComponentClass */);

var insetsDiffer=require(169 /* insetsDiffer */);
var pointsDiffer=require(170 /* pointsDiffer */);
var matricesDiffer=require(150 /* matricesDiffer */);
var processColor=require(151 /* processColor */);
var resolveAssetSource=require(171 /* resolveAssetSource */);
var sizesDiffer=require(154 /* sizesDiffer */);
var verifyPropTypes=require(174 /* verifyPropTypes */);
var warning=require(232 /* fbjs/lib/warning */);


















function requireNativeComponent(
viewName,
componentInterface,
extraConfig)
{
var viewConfig=UIManager[viewName];
if(!viewConfig||!viewConfig.NativeProps){
warning(false,'Native component for "%s" does not exist',viewName);
return UnimplementedView;}

var nativeProps=babelHelpers.extends({},
UIManager.RCTView.NativeProps,
viewConfig.NativeProps);

viewConfig.uiViewClassName=viewName;
viewConfig.validAttributes={};
viewConfig.propTypes=componentInterface&&componentInterface.propTypes;
for(var key in nativeProps){
var useAttribute=false;
var attribute={};

var differ=TypeToDifferMap[nativeProps[key]];
if(differ){
attribute.diff=differ;
useAttribute=true;}


var processor=TypeToProcessorMap[nativeProps[key]];
if(processor){
attribute.process=processor;
useAttribute=true;}


viewConfig.validAttributes[key]=useAttribute?attribute:true;}







viewConfig.validAttributes.style=ReactNativeStyleAttributes;

if(__DEV__){
componentInterface&&verifyPropTypes(
componentInterface,
viewConfig,
extraConfig&&extraConfig.nativeOnly);}


return createReactNativeComponentClass(viewConfig);}


var TypeToDifferMap={

CATransform3D:matricesDiffer,
CGPoint:pointsDiffer,
CGSize:sizesDiffer,
UIEdgeInsets:insetsDiffer};




function processColorArray(colors){
return colors&&colors.map(processColor);}


var TypeToProcessorMap={

CGColor:processColor,
CGColorArray:processColorArray,
UIColor:processColor,
UIColorArray:processColorArray,
CGImage:resolveAssetSource,
UIImage:resolveAssetSource,
RCTImageSource:resolveAssetSource,

Color:processColor,
ColorArray:processColorArray};


module.exports=requireNativeComponent;
});
__d(158 /* UnimplementedView */, function(global, require, module, exports) {'use strict';








var React=require(28 /* React */);
var StyleSheet=require(159 /* StyleSheet */);

var UnimplementedView=React.createClass({displayName:'UnimplementedView',
setNativeProps:function setNativeProps(){},




render:function render(){

var View=require(132 /* View */);
return (
React.createElement(View,{style:[styles.unimplementedView,this.props.style]},
this.props.children));}});





var styles=StyleSheet.create({
unimplementedView:{
borderWidth:1,
borderColor:'red',
alignSelf:'flex-start'}});



module.exports=UnimplementedView;
});
__d(159 /* StyleSheet */, function(global, require, module, exports) {'use strict';












var PixelRatio=require(160 /* PixelRatio */);
var ReactNativePropRegistry=require(72 /* ReactNativePropRegistry */);
var StyleSheetValidation=require(162 /* StyleSheetValidation */);

var flatten=require(71 /* flattenStyle */);

var hairlineWidth=PixelRatio.roundToNearestPixel(0.4);
if(hairlineWidth===0){
hairlineWidth=1/PixelRatio.get();}














































module.exports={

















hairlineWidth:hairlineWidth,








































flatten:flatten,




create:function create(obj){
var result={};
for(var key in obj){
StyleSheetValidation.validateStyle(key,obj);
result[key]=ReactNativePropRegistry.register(obj[key]);}

return result;}};
});
__d(160 /* PixelRatio */, function(global, require, module, exports) {'use strict';












var Dimensions=require(161 /* Dimensions */);var 


















PixelRatio=function(){function PixelRatio(){babelHelpers.classCallCheck(this,PixelRatio);}babelHelpers.createClass(PixelRatio,null,[{key:'get',value:function get()


















{
return Dimensions.get('window').scale;}},{key:'getFontScale',value:function getFontScale()













{
return Dimensions.get('window').fontScale||PixelRatio.get();}},{key:'getPixelSizeForLayoutSize',value:function getPixelSizeForLayoutSize(







layoutSize){
return Math.round(layoutSize*PixelRatio.get());}},{key:'roundToNearestPixel',value:function roundToNearestPixel(








layoutSize){
var ratio=PixelRatio.get();
return Math.round(layoutSize*ratio)/ratio;}},{key:'startDetecting',value:function startDetecting()



{}}]);return PixelRatio;}();


module.exports=PixelRatio;
});
__d(161 /* Dimensions */, function(global, require, module, exports) {'use strict';












var Platform=require(10 /* Platform */);
var UIManager=require(83 /* UIManager */);
var RCTDeviceEventEmitter=require(14 /* RCTDeviceEventEmitter */);

var invariant=require(222 /* fbjs/lib/invariant */);

var dimensions={};var 
Dimensions=function(){function Dimensions(){babelHelpers.classCallCheck(this,Dimensions);}babelHelpers.createClass(Dimensions,null,[{key:'set',value:function set(






dims){



if(dims&&dims.windowPhysicalPixels){

dims=JSON.parse(JSON.stringify(dims));

var windowPhysicalPixels=dims.windowPhysicalPixels;
dims.window={
width:windowPhysicalPixels.width/windowPhysicalPixels.scale,
height:windowPhysicalPixels.height/windowPhysicalPixels.scale,
scale:windowPhysicalPixels.scale,
fontScale:windowPhysicalPixels.fontScale};

if(Platform.OS==='android'){

var screenPhysicalPixels=dims.screenPhysicalPixels;
dims.screen={
width:screenPhysicalPixels.width/screenPhysicalPixels.scale,
height:screenPhysicalPixels.height/screenPhysicalPixels.scale,
scale:screenPhysicalPixels.scale,
fontScale:screenPhysicalPixels.fontScale};



delete dims.screenPhysicalPixels;}else 
{
dims.screen=dims.window;}


delete dims.windowPhysicalPixels;}


babelHelpers.extends(dimensions,dims);}},{key:'get',value:function get(

















dim){
invariant(dimensions[dim],'No dimension set for key '+dim);
return dimensions[dim];}}]);return Dimensions;}();



Dimensions.set(UIManager.Dimensions);
RCTDeviceEventEmitter.addListener('didUpdateDimensions',function(update){
Dimensions.set(update);});


module.exports=Dimensions;
});
__d(162 /* StyleSheetValidation */, function(global, require, module, exports) {'use strict';












var ImageStylePropTypes=require(140 /* ImageStylePropTypes */);
var ReactPropTypeLocations=require(43 /* ReactPropTypeLocations */);
var TextStylePropTypes=require(148 /* TextStylePropTypes */);
var ViewStylePropTypes=require(149 /* ViewStylePropTypes */);

var invariant=require(222 /* fbjs/lib/invariant */);var 

StyleSheetValidation=function(){function StyleSheetValidation(){babelHelpers.classCallCheck(this,StyleSheetValidation);}babelHelpers.createClass(StyleSheetValidation,null,[{key:'validateStyleProp',value:function validateStyleProp(
prop,style,caller){
if(!__DEV__){
return;}

if(allStylePropTypes[prop]===undefined){
var message1='"'+prop+'" is not a valid style property.';
var message2='\nValid style props: '+
JSON.stringify(Object.keys(allStylePropTypes).sort(),null,'  ');
styleError(message1,style,caller,message2);}

var error=allStylePropTypes[prop](
style,
prop,
caller,
ReactPropTypeLocations.prop);

if(error){
styleError(error.message,style,caller);}}},{key:'validateStyle',value:function validateStyle(



name,styles){
if(!__DEV__){
return;}

for(var prop in styles[name]){
StyleSheetValidation.validateStyleProp(prop,styles[name],'StyleSheet '+name);}}},{key:'addValidStylePropTypes',value:function addValidStylePropTypes(



stylePropTypes){
for(var key in stylePropTypes){
allStylePropTypes[key]=stylePropTypes[key];}}}]);return StyleSheetValidation;}();




var styleError=function styleError(message1,style,caller,message2){
invariant(
false,
message1+'\n'+(caller||'<<unknown>>')+': '+
JSON.stringify(style,null,'  ')+(message2||''));};



var allStylePropTypes={};

StyleSheetValidation.addValidStylePropTypes(ImageStylePropTypes);
StyleSheetValidation.addValidStylePropTypes(TextStylePropTypes);
StyleSheetValidation.addValidStylePropTypes(ViewStylePropTypes);

module.exports=StyleSheetValidation;
});
__d(163 /* createReactNativeComponentClass */, function(global, require, module, exports) {'use strict';













var ReactNativeBaseComponent=require(164 /* ReactNativeBaseComponent */);












var createReactNativeComponentClass=function createReactNativeComponentClass(
viewConfig)
{
var Constructor=function Constructor(element){
this._currentElement=element;

this._rootNodeID=null;
this._renderedChildren=null;};

Constructor.displayName=viewConfig.uiViewClassName;
Constructor.viewConfig=viewConfig;
Constructor.propTypes=viewConfig.propTypes;
Constructor.prototype=new ReactNativeBaseComponent(viewConfig);
Constructor.prototype.constructor=Constructor;

return Constructor;};


module.exports=createReactNativeComponentClass;
});
__d(164 /* ReactNativeBaseComponent */, function(global, require, module, exports) {'use strict';












var NativeMethodsMixin=require(135 /* NativeMethodsMixin */);
var ReactNativeAttributePayload=require(136 /* ReactNativeAttributePayload */);
var ReactNativeEventEmitter=require(129 /* ReactNativeEventEmitter */);
var ReactNativeTagHandles=require(74 /* ReactNativeTagHandles */);
var ReactMultiChild=require(165 /* ReactMultiChild */);
var UIManager=require(83 /* UIManager */);

var deepFreezeAndThrowOnMutationInDev=require(168 /* deepFreezeAndThrowOnMutationInDev */);
var invariant=require(222 /* fbjs/lib/invariant */);
var warning=require(232 /* fbjs/lib/warning */);

var registrationNames=ReactNativeEventEmitter.registrationNames;
var putListener=ReactNativeEventEmitter.putListener;
var deleteListener=ReactNativeEventEmitter.deleteListener;
var deleteAllListeners=ReactNativeEventEmitter.deleteAllListeners;














var ReactNativeBaseComponent=function ReactNativeBaseComponent(
viewConfig)
{
this.viewConfig=viewConfig;};






ReactNativeBaseComponent.Mixin={
getPublicInstance:function getPublicInstance(){

return this;},


construct:function construct(element){
this._currentElement=element;},


unmountComponent:function unmountComponent(){
deleteAllListeners(this._rootNodeID);
this.unmountChildren();
this._rootNodeID=null;},










initializeChildren:function initializeChildren(children,containerTag,transaction,context){
var mountImages=this.mountChildren(children,transaction,context);



if(mountImages.length){



var createdTags=[];
for(var i=0,l=mountImages.length;i<l;i++){
var mountImage=mountImages[i];
var childTag=mountImage.tag;
var childID=mountImage.rootNodeID;
warning(
mountImage&&mountImage.rootNodeID&&mountImage.tag,
'Mount image returned does not have required data');

ReactNativeTagHandles.associateRootNodeIDWithMountedNodeHandle(
childID,
childTag);

createdTags[i]=mountImage.tag;}

UIManager.setChildren(containerTag,createdTags);}},











receiveComponent:function receiveComponent(nextElement,transaction,context){
var prevElement=this._currentElement;
this._currentElement=nextElement;

if(__DEV__){
for(var key in this.viewConfig.validAttributes){
if(nextElement.props.hasOwnProperty(key)){
deepFreezeAndThrowOnMutationInDev(nextElement.props[key]);}}}




var updatePayload=ReactNativeAttributePayload.diff(
prevElement.props,
nextElement.props,
this.viewConfig.validAttributes);


if(updatePayload){
UIManager.updateView(
ReactNativeTagHandles.mostRecentMountedNodeHandleForRootNodeID(this._rootNodeID),
this.viewConfig.uiViewClassName,
updatePayload);}



this._reconcileListenersUponUpdate(
prevElement.props,
nextElement.props);

this.updateChildren(nextElement.props.children,transaction,context);},





_registerListenersUponCreation:function _registerListenersUponCreation(initialProps){
for(var key in initialProps){


if(registrationNames[key]&&initialProps[key]){
var listener=initialProps[key];
putListener(this._rootNodeID,key,listener);}}},









_reconcileListenersUponUpdate:function _reconcileListenersUponUpdate(prevProps,nextProps){
for(var key in nextProps){
if(registrationNames[key]&&nextProps[key]!==prevProps[key]){
if(nextProps[key]){
putListener(this._rootNodeID,key,nextProps[key]);}else 
{
deleteListener(this._rootNodeID,key);}}}},










mountComponent:function mountComponent(rootID,transaction,context){
this._rootNodeID=rootID;

var tag=ReactNativeTagHandles.allocateTag();

if(__DEV__){
for(var key in this.viewConfig.validAttributes){
if(this._currentElement.props.hasOwnProperty(key)){
deepFreezeAndThrowOnMutationInDev(this._currentElement.props[key]);}}}




var updatePayload=ReactNativeAttributePayload.create(
this._currentElement.props,
this.viewConfig.validAttributes);


var nativeTopRootID=ReactNativeTagHandles.getNativeTopRootIDFromNodeID(rootID);
if(nativeTopRootID==null){
invariant(
false,
'nativeTopRootID not found for tag '+tag+' view type '+
this.viewConfig.uiViewClassName+' with rootID '+rootID);}

UIManager.createView(
tag,
this.viewConfig.uiViewClassName,
ReactNativeTagHandles.rootNodeIDToTag[nativeTopRootID],
updatePayload);


this._registerListenersUponCreation(this._currentElement.props);
this.initializeChildren(
this._currentElement.props.children,
tag,
transaction,
context);

return {
rootNodeID:rootID,
tag:tag};}};








babelHelpers.extends(
ReactNativeBaseComponent.prototype,
ReactMultiChild.Mixin,
ReactNativeBaseComponent.Mixin,
NativeMethodsMixin);


module.exports=ReactNativeBaseComponent;
});
__d(165 /* ReactMultiChild */, function(global, require, module, exports) {'use strict';













var ReactComponentEnvironment=require(87 /* ./ReactComponentEnvironment */);
var ReactMultiChildUpdateTypes=require(115 /* ./ReactMultiChildUpdateTypes */);

var ReactCurrentOwner=require(33 /* ./ReactCurrentOwner */);
var ReactReconciler=require(75 /* ./ReactReconciler */);
var ReactChildReconciler=require(166 /* ./ReactChildReconciler */);

var flattenChildren=require(167 /* ./flattenChildren */);








var updateDepth=0;









var updateQueue=[];







var markupQueue=[];









function enqueueInsertMarkup(parentID,markup,toIndex){

updateQueue.push({
parentID:parentID,
parentNode:null,
type:ReactMultiChildUpdateTypes.INSERT_MARKUP,
markupIndex:markupQueue.push(markup)-1,
content:null,
fromIndex:null,
toIndex:toIndex});}











function enqueueMove(parentID,fromIndex,toIndex){

updateQueue.push({
parentID:parentID,
parentNode:null,
type:ReactMultiChildUpdateTypes.MOVE_EXISTING,
markupIndex:null,
content:null,
fromIndex:fromIndex,
toIndex:toIndex});}










function enqueueRemove(parentID,fromIndex){

updateQueue.push({
parentID:parentID,
parentNode:null,
type:ReactMultiChildUpdateTypes.REMOVE_NODE,
markupIndex:null,
content:null,
fromIndex:fromIndex,
toIndex:null});}










function enqueueSetMarkup(parentID,markup){

updateQueue.push({
parentID:parentID,
parentNode:null,
type:ReactMultiChildUpdateTypes.SET_MARKUP,
markupIndex:null,
content:markup,
fromIndex:null,
toIndex:null});}










function enqueueTextContent(parentID,textContent){

updateQueue.push({
parentID:parentID,
parentNode:null,
type:ReactMultiChildUpdateTypes.TEXT_CONTENT,
markupIndex:null,
content:textContent,
fromIndex:null,
toIndex:null});}








function processQueue(){
if(updateQueue.length){
ReactComponentEnvironment.processChildrenUpdates(updateQueue,markupQueue);
clearQueue();}}








function clearQueue(){
updateQueue.length=0;
markupQueue.length=0;}








var ReactMultiChild={








Mixin:{

_reconcilerInstantiateChildren:function _reconcilerInstantiateChildren(nestedChildren,transaction,context){
if(process.env.NODE_ENV!=='production'){
if(this._currentElement){
try{
ReactCurrentOwner.current=this._currentElement._owner;
return ReactChildReconciler.instantiateChildren(nestedChildren,transaction,context);}finally 
{
ReactCurrentOwner.current=null;}}}



return ReactChildReconciler.instantiateChildren(nestedChildren,transaction,context);},


_reconcilerUpdateChildren:function _reconcilerUpdateChildren(prevChildren,nextNestedChildrenElements,transaction,context){
var nextChildren;
if(process.env.NODE_ENV!=='production'){
if(this._currentElement){
try{
ReactCurrentOwner.current=this._currentElement._owner;
nextChildren=flattenChildren(nextNestedChildrenElements);}finally 
{
ReactCurrentOwner.current=null;}

return ReactChildReconciler.updateChildren(prevChildren,nextChildren,transaction,context);}}


nextChildren=flattenChildren(nextNestedChildrenElements);
return ReactChildReconciler.updateChildren(prevChildren,nextChildren,transaction,context);},










mountChildren:function mountChildren(nestedChildren,transaction,context){
var children=this._reconcilerInstantiateChildren(nestedChildren,transaction,context);
this._renderedChildren=children;
var mountImages=[];
var index=0;
for(var name in children){
if(children.hasOwnProperty(name)){
var child=children[name];

var rootID=this._rootNodeID+name;
var mountImage=ReactReconciler.mountComponent(child,rootID,transaction,context);
child._mountIndex=index++;
mountImages.push(mountImage);}}


return mountImages;},








updateTextContent:function updateTextContent(nextContent){
updateDepth++;
var errorThrown=true;
try{
var prevChildren=this._renderedChildren;

ReactChildReconciler.unmountChildren(prevChildren);

for(var name in prevChildren){
if(prevChildren.hasOwnProperty(name)){
this._unmountChild(prevChildren[name]);}}



this.setTextContent(nextContent);
errorThrown=false;}finally 
{
updateDepth--;
if(!updateDepth){
if(errorThrown){
clearQueue();}else 
{
processQueue();}}}},











updateMarkup:function updateMarkup(nextMarkup){
updateDepth++;
var errorThrown=true;
try{
var prevChildren=this._renderedChildren;

ReactChildReconciler.unmountChildren(prevChildren);
for(var name in prevChildren){
if(prevChildren.hasOwnProperty(name)){
this._unmountChildByName(prevChildren[name],name);}}


this.setMarkup(nextMarkup);
errorThrown=false;}finally 
{
updateDepth--;
if(!updateDepth){
if(errorThrown){
clearQueue();}else 
{
processQueue();}}}},












updateChildren:function updateChildren(nextNestedChildrenElements,transaction,context){
updateDepth++;
var errorThrown=true;
try{
this._updateChildren(nextNestedChildrenElements,transaction,context);
errorThrown=false;}finally 
{
updateDepth--;
if(!updateDepth){
if(errorThrown){
clearQueue();}else 
{
processQueue();}}}},














_updateChildren:function _updateChildren(nextNestedChildrenElements,transaction,context){
var prevChildren=this._renderedChildren;
var nextChildren=this._reconcilerUpdateChildren(prevChildren,nextNestedChildrenElements,transaction,context);
this._renderedChildren=nextChildren;
if(!nextChildren&&!prevChildren){
return;}

var name;


var lastIndex=0;
var nextIndex=0;
for(name in nextChildren){
if(!nextChildren.hasOwnProperty(name)){
continue;}

var prevChild=prevChildren&&prevChildren[name];
var nextChild=nextChildren[name];
if(prevChild===nextChild){
this.moveChild(prevChild,nextIndex,lastIndex);
lastIndex=Math.max(prevChild._mountIndex,lastIndex);
prevChild._mountIndex=nextIndex;}else 
{
if(prevChild){

lastIndex=Math.max(prevChild._mountIndex,lastIndex);
this._unmountChild(prevChild);}


this._mountChildByNameAtIndex(nextChild,name,nextIndex,transaction,context);}

nextIndex++;}


for(name in prevChildren){
if(prevChildren.hasOwnProperty(name)&&!(nextChildren&&nextChildren.hasOwnProperty(name))){
this._unmountChild(prevChildren[name]);}}},










unmountChildren:function unmountChildren(){
var renderedChildren=this._renderedChildren;
ReactChildReconciler.unmountChildren(renderedChildren);
this._renderedChildren=null;},










moveChild:function moveChild(child,toIndex,lastIndex){



if(child._mountIndex<lastIndex){
enqueueMove(this._rootNodeID,child._mountIndex,toIndex);}},










createChild:function createChild(child,mountImage){
enqueueInsertMarkup(this._rootNodeID,mountImage,child._mountIndex);},








removeChild:function removeChild(child){
enqueueRemove(this._rootNodeID,child._mountIndex);},








setTextContent:function setTextContent(textContent){
enqueueTextContent(this._rootNodeID,textContent);},








setMarkup:function setMarkup(markup){
enqueueSetMarkup(this._rootNodeID,markup);},













_mountChildByNameAtIndex:function _mountChildByNameAtIndex(child,name,index,transaction,context){

var rootID=this._rootNodeID+name;
var mountImage=ReactReconciler.mountComponent(child,rootID,transaction,context);
child._mountIndex=index;
this.createChild(child,mountImage);},










_unmountChild:function _unmountChild(child){
this.removeChild(child);
child._mountIndex=null;}}};






module.exports=ReactMultiChild;
});
__d(166 /* ReactChildReconciler */, function(global, require, module, exports) {'use strict';













var ReactReconciler=require(75 /* ./ReactReconciler */);

var instantiateReactComponent=require(85 /* ./instantiateReactComponent */);
var shouldUpdateReactComponent=require(88 /* ./shouldUpdateReactComponent */);
var traverseAllChildren=require(36 /* ./traverseAllChildren */);
var warning=require(240 /* fbjs/lib/warning */);

function instantiateChild(childInstances,child,name){

var keyUnique=childInstances[name]===undefined;
if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(keyUnique,'flattenChildren(...): Encountered two children with the same key, '+'`%s`. Child keys must be unique; when two children share a key, only '+'the first child will be used.',name):undefined;}

if(child!=null&&keyUnique){
childInstances[name]=instantiateReactComponent(child,null);}}








var ReactChildReconciler={








instantiateChildren:function instantiateChildren(nestedChildNodes,transaction,context){
if(nestedChildNodes==null){
return null;}

var childInstances={};
traverseAllChildren(nestedChildNodes,instantiateChild,childInstances);
return childInstances;},












updateChildren:function updateChildren(prevChildren,nextChildren,transaction,context){





if(!nextChildren&&!prevChildren){
return null;}

var name;
for(name in nextChildren){
if(!nextChildren.hasOwnProperty(name)){
continue;}

var prevChild=prevChildren&&prevChildren[name];
var prevElement=prevChild&&prevChild._currentElement;
var nextElement=nextChildren[name];
if(prevChild!=null&&shouldUpdateReactComponent(prevElement,nextElement)){
ReactReconciler.receiveComponent(prevChild,nextElement,transaction,context);
nextChildren[name]=prevChild;}else 
{
if(prevChild){
ReactReconciler.unmountComponent(prevChild,name);}


var nextChildInstance=instantiateReactComponent(nextElement,null);
nextChildren[name]=nextChildInstance;}}



for(name in prevChildren){
if(prevChildren.hasOwnProperty(name)&&!(nextChildren&&nextChildren.hasOwnProperty(name))){
ReactReconciler.unmountComponent(prevChildren[name]);}}


return nextChildren;},









unmountChildren:function unmountChildren(renderedChildren){
for(var name in renderedChildren){
if(renderedChildren.hasOwnProperty(name)){
var renderedChild=renderedChildren[name];
ReactReconciler.unmountComponent(renderedChild);}}}};






module.exports=ReactChildReconciler;
});
__d(167 /* flattenChildren */, function(global, require, module, exports) {'use strict';












var traverseAllChildren=require(36 /* ./traverseAllChildren */);
var warning=require(240 /* fbjs/lib/warning */);






function flattenSingleChildIntoContext(traverseContext,child,name){

var result=traverseContext;
var keyUnique=result[name]===undefined;
if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(keyUnique,'flattenChildren(...): Encountered two children with the same key, '+'`%s`. Child keys must be unique; when two children share a key, only '+'the first child will be used.',name):undefined;}

if(keyUnique&&child!=null){
result[name]=child;}}








function flattenChildren(children){
if(children==null){
return children;}

var result={};
traverseAllChildren(children,flattenSingleChildIntoContext,result);
return result;}


module.exports=flattenChildren;
});
__d(168 /* deepFreezeAndThrowOnMutationInDev */, function(global, require, module, exports) {'use strict';






























function deepFreezeAndThrowOnMutationInDev(object){
if(__DEV__){
if(typeof object!=='object'||
object===null||
Object.isFrozen(object)||
Object.isSealed(object)){
return;}


for(var key in object){
if(object.hasOwnProperty(key)){
object.__defineGetter__(key,identity.bind(null,object[key]));
object.__defineSetter__(key,throwOnImmutableMutation.bind(null,key));}}



Object.freeze(object);
Object.seal(object);

for(var key in object){
if(object.hasOwnProperty(key)){
deepFreezeAndThrowOnMutationInDev(object[key]);}}}}





function throwOnImmutableMutation(key,value){
throw Error(
'You attempted to set the key `'+key+'` with the value `'+
JSON.stringify(value)+'` on an object that is meant to be immutable '+
'and has been frozen.');}



function identity(value){
return value;}


module.exports=deepFreezeAndThrowOnMutationInDev;
});
__d(169 /* insetsDiffer */, function(global, require, module, exports) {'use strict';



















var dummyInsets={
top:undefined,
left:undefined,
right:undefined,
bottom:undefined};


var insetsDiffer=function insetsDiffer(
one,
two)
{
one=one||dummyInsets;
two=two||dummyInsets;
return one!==two&&(
one.top!==two.top||
one.left!==two.left||
one.right!==two.right||
one.bottom!==two.bottom);};



module.exports=insetsDiffer;
});
__d(170 /* pointsDiffer */, function(global, require, module, exports) {'use strict';

















var dummyPoint={x:undefined,y:undefined};

var pointsDiffer=function pointsDiffer(one,two){
one=one||dummyPoint;
two=two||dummyPoint;
return one!==two&&(
one.x!==two.x||
one.y!==two.y);};



module.exports=pointsDiffer;
});
__d(171 /* resolveAssetSource */, function(global, require, module, exports) {'use strict';
















var AssetRegistry=require(172 /* AssetRegistry */);
var AssetSourceResolver=require(173 /* AssetSourceResolver */);var _require=
require(9 /* NativeModules */);var SourceCode=_require.SourceCode;

var _customSourceTransformer=void 0,_serverURL=void 0,_bundleSourcePath=void 0;

function getDevServerURL(){
if(_serverURL===undefined){
var scriptURL=SourceCode.scriptURL;
var match=scriptURL&&scriptURL.match(/^https?:\/\/.*?\//);
if(match){

_serverURL=match[0];}else 
{

_serverURL=null;}}


return _serverURL;}


function getBundleSourcePath(){
if(_bundleSourcePath===undefined){
var scriptURL=SourceCode.scriptURL;
if(!scriptURL){

_bundleSourcePath=null;
return _bundleSourcePath;}

if(scriptURL.startsWith('assets://')){

_bundleSourcePath=null;
return _bundleSourcePath;}

if(scriptURL.startsWith('file://')){

_bundleSourcePath=scriptURL.substring(7,scriptURL.lastIndexOf('/')+1);}else 
{
_bundleSourcePath=scriptURL.substring(0,scriptURL.lastIndexOf('/')+1);}}



return _bundleSourcePath;}


function setCustomSourceTransformer(
transformer)
{
_customSourceTransformer=transformer;}






function resolveAssetSource(source){
if(typeof source==='object'){
return source;}


var asset=AssetRegistry.getAssetByID(source);
if(!asset){
return null;}


var resolver=new AssetSourceResolver(getDevServerURL(),getBundleSourcePath(),asset);
if(_customSourceTransformer){
return _customSourceTransformer(resolver);}

return resolver.defaultAsset();}


module.exports=resolveAssetSource;
module.exports.pickScale=AssetSourceResolver.pickScale;
module.exports.setCustomSourceTransformer=setCustomSourceTransformer;
});
__d(172 /* AssetRegistry */, function(global, require, module, exports) {'use strict';




















var assets=[];

function registerAsset(asset){


return assets.push(asset);}


function getAssetByID(assetId){
return assets[assetId-1];}


module.exports={registerAsset:registerAsset,getAssetByID:getAssetByID};
});
__d(173 /* AssetSourceResolver */, function(global, require, module, exports) {var 





















PixelRatio=require(160 /* PixelRatio */);
var Platform=require(10 /* Platform */);

var assetPathUtils=require(221 /* ../../local-cli/bundle/assetPathUtils */);
var invariant=require(222 /* fbjs/lib/invariant */);




function getScaledAssetPath(asset){
var scale=AssetSourceResolver.pickScale(asset.scales,PixelRatio.get());
var scaleSuffix=scale===1?'':'@'+scale+'x';
var assetDir=assetPathUtils.getBasePath(asset);
return assetDir+'/'+asset.name+scaleSuffix+'.'+asset.type;}





function getAssetPathInDrawableFolder(asset){
var scale=AssetSourceResolver.pickScale(asset.scales,PixelRatio.get());
var drawbleFolder=assetPathUtils.getAndroidDrawableFolderName(asset,scale);
var fileName=assetPathUtils.getAndroidResourceIdentifier(asset);
return drawbleFolder+'/'+fileName+'.'+asset.type;}var 


AssetSourceResolver=function(){







function AssetSourceResolver(serverUrl,bundlePath,asset){babelHelpers.classCallCheck(this,AssetSourceResolver);
this.serverUrl=serverUrl;
this.bundlePath=bundlePath;
this.asset=asset;}babelHelpers.createClass(AssetSourceResolver,[{key:'isLoadedFromServer',value:function isLoadedFromServer()


{
return !!this.serverUrl;}},{key:'isLoadedFromFileSystem',value:function isLoadedFromFileSystem()


{
return !!this.bundlePath;}},{key:'defaultAsset',value:function defaultAsset()


{
if(this.isLoadedFromServer()){
return this.assetServerURL();}


if(Platform.OS==='android'){
return this.isLoadedFromFileSystem()?
this.drawableFolderInBundle():
this.resourceIdentifierWithoutScale();}else 
{
return this.scaledAssetPathInBundle();}}},{key:'assetServerURL',value:function assetServerURL()







{
invariant(!!this.serverUrl,'need server to load from');
return this.fromSource(
this.serverUrl+getScaledAssetPath(this.asset)+
'?platform='+Platform.OS+'&hash='+this.asset.hash);}},{key:'scaledAssetPath',value:function scaledAssetPath()







{
return this.fromSource(getScaledAssetPath(this.asset));}},{key:'scaledAssetPathInBundle',value:function scaledAssetPathInBundle()






{
var path=this.bundlePath||'';
return this.fromSource(path+getScaledAssetPath(this.asset));}},{key:'resourceIdentifierWithoutScale',value:function resourceIdentifierWithoutScale()








{
invariant(Platform.OS==='android','resource identifiers work on Android');
return this.fromSource(assetPathUtils.getAndroidResourceIdentifier(this.asset));}},{key:'drawableFolderInBundle',value:function drawableFolderInBundle()







{
var path=this.bundlePath||'';
return this.fromSource(
'file://'+path+getAssetPathInDrawableFolder(this.asset));}},{key:'fromSource',value:function fromSource(



source){
return {
__packager_asset:true,
width:this.asset.width,
height:this.asset.height,
uri:source,
scale:AssetSourceResolver.pickScale(this.asset.scales,PixelRatio.get())};}}],[{key:'pickScale',value:function pickScale(



scales,deviceScale){

for(var i=0;i<scales.length;i++){
if(scales[i]>=deviceScale){
return scales[i];}}






return scales[scales.length-1]||1;}}]);return AssetSourceResolver;}();




module.exports=AssetSourceResolver;
});
__d(221 /* react-native/local-cli/bundle/assetPathUtils.js */, function(global, require, module, exports) {'use strict';









function getAndroidAssetSuffix(scale){
switch(scale){
case 0.75:return 'ldpi';
case 1:return 'mdpi';
case 1.5:return 'hdpi';
case 2:return 'xhdpi';
case 3:return 'xxhdpi';
case 4:return 'xxxhdpi';}}



function getAndroidDrawableFolderName(asset,scale){
var suffix=getAndroidAssetSuffix(scale);
if(!suffix){
throw new Error(
'Don\'t know which android drawable suffix to use for asset: '+
JSON.stringify(asset));}


var androidFolder='drawable-'+suffix;
return androidFolder;}


function getAndroidResourceIdentifier(asset){
var folderPath=getBasePath(asset);
return (folderPath+'/'+asset.name).
toLowerCase().
replace(/\//g,'_').
replace(/([^a-z0-9_])/g,'').
replace(/^assets_/,'');}


function getBasePath(asset){
var basePath=asset.httpServerLocation;
if(basePath[0]==='/'){
basePath=basePath.substr(1);}

return basePath;}


module.exports={
getAndroidAssetSuffix:getAndroidAssetSuffix,
getAndroidDrawableFolderName:getAndroidDrawableFolderName,
getAndroidResourceIdentifier:getAndroidResourceIdentifier,
getBasePath:getBasePath};
});
__d(174 /* verifyPropTypes */, function(global, require, module, exports) {'use strict';












var ReactNativeStyleAttributes=require(139 /* ReactNativeStyleAttributes */);







function verifyPropTypes(
componentInterface,
viewConfig,
nativePropsToIgnore)
{
if(!viewConfig){
return;}

var componentName=componentInterface.name||
componentInterface.displayName||
'unknown';
if(!componentInterface.propTypes){
throw new Error(
'`'+componentName+'` has no propTypes defined`');}



var nativeProps=viewConfig.NativeProps;
for(var prop in nativeProps){
if(!componentInterface.propTypes[prop]&&
!ReactNativeStyleAttributes[prop]&&(
!nativePropsToIgnore||!nativePropsToIgnore[prop])){
var message;
if(componentInterface.propTypes.hasOwnProperty(prop)){
message='`'+componentName+'` has incorrectly defined propType for native prop `'+
viewConfig.uiViewClassName+'.'+prop+'` of native type `'+nativeProps[prop];}else 
{
message='`'+componentName+'` has no propType for native prop `'+
viewConfig.uiViewClassName+'.'+prop+'` of native type `'+
nativeProps[prop]+'`';}
;
message+='\nIf you haven\'t changed this prop yourself, this usually means that '+
'your versions of the native code and JavaScript code are out of sync. Updating both '+
'should make this error go away.';
throw new Error(message);}}}




module.exports=verifyPropTypes;
});
__d(175 /* ScrollView */, function(global, require, module, exports) {'use strict';












var ColorPropType=require(143 /* ColorPropType */);
var EdgeInsetsPropType=require(133 /* EdgeInsetsPropType */);
var Platform=require(10 /* Platform */);
var PointPropType=require(176 /* PointPropType */);
var RCTScrollView=require(9 /* NativeModules */).UIManager.RCTScrollView;
var RCTScrollViewManager=require(9 /* NativeModules */).ScrollViewManager;
var React=require(28 /* React */);
var ReactNative=require(177 /* ReactNative */);
var ScrollResponder=require(178 /* ScrollResponder */);
var StyleSheet=require(159 /* StyleSheet */);
var StyleSheetPropType=require(156 /* StyleSheetPropType */);
var View=require(132 /* View */);
var ViewStylePropTypes=require(149 /* ViewStylePropTypes */);

var deprecatedPropType=require(147 /* deprecatedPropType */);
var dismissKeyboard=require(180 /* dismissKeyboard */);
var flattenStyle=require(71 /* flattenStyle */);
var invariant=require(222 /* fbjs/lib/invariant */);
var requireNativeComponent=require(157 /* requireNativeComponent */);
var processDecelerationRate=require(181 /* processDecelerationRate */);
var PropTypes=React.PropTypes;

var SCROLLVIEW='ScrollView';
var INNERVIEW='InnerScrollView';
















var ScrollView=React.createClass({displayName:'ScrollView',
propTypes:babelHelpers.extends({},
View.propTypes,{






automaticallyAdjustContentInsets:PropTypes.bool,





contentInset:EdgeInsetsPropType,





contentOffset:PointPropType,







bounces:PropTypes.bool,






bouncesZoom:PropTypes.bool,






alwaysBounceHorizontal:PropTypes.bool,






alwaysBounceVertical:PropTypes.bool,







centerContent:PropTypes.bool,















contentContainerStyle:StyleSheetPropType(ViewStylePropTypes),










decelerationRate:PropTypes.oneOfType([
PropTypes.oneOf(['fast','normal']),
PropTypes.number]),





horizontal:PropTypes.bool,







indicatorStyle:PropTypes.oneOf([
'default',
'black',
'white']),






directionalLockEnabled:PropTypes.bool,





canCancelContentTouches:PropTypes.bool,








keyboardDismissMode:PropTypes.oneOf([
'none',
'interactive',
'on-drag']),







keyboardShouldPersistTaps:PropTypes.bool,




maximumZoomScale:PropTypes.number,




minimumZoomScale:PropTypes.number,




onScroll:PropTypes.func,




onScrollAnimationEnd:PropTypes.func,





onContentSizeChange:PropTypes.func,






pagingEnabled:PropTypes.bool,




scrollEnabled:PropTypes.bool,












scrollEventThrottle:PropTypes.number,






scrollIndicatorInsets:EdgeInsetsPropType,





scrollsToTop:PropTypes.bool,



showsHorizontalScrollIndicator:PropTypes.bool,



showsVerticalScrollIndicator:PropTypes.bool,








stickyHeaderIndices:PropTypes.arrayOf(PropTypes.number),
style:StyleSheetPropType(ViewStylePropTypes),







snapToInterval:PropTypes.number,








snapToAlignment:PropTypes.oneOf([
'start',
'center',
'end']),







removeClippedSubviews:PropTypes.bool,




zoomScale:PropTypes.number,







refreshControl:PropTypes.element,




onRefreshStart:deprecatedPropType(
PropTypes.func,
'Use the `refreshControl` prop instead.'),









endFillColor:ColorPropType}),


mixins:[ScrollResponder.Mixin],

getInitialState:function getInitialState(){
return this.scrollResponderMixinGetInitialState();},


setNativeProps:function setNativeProps(props){
this.refs[SCROLLVIEW].setNativeProps(props);},





endRefreshing:function endRefreshing(){
RCTScrollViewManager.endRefreshing(
ReactNative.findNodeHandle(this));},









getScrollResponder:function getScrollResponder(){
return this;},


getScrollableNode:function getScrollableNode(){
return ReactNative.findNodeHandle(this.refs[SCROLLVIEW]);},


getInnerViewNode:function getInnerViewNode(){
return ReactNative.findNodeHandle(this.refs[INNERVIEW]);},













scrollTo:function scrollTo(
y,
x,
animated)
{
if(typeof y==='number'){
console.warn('`scrollTo(y, x, animated)` is deprecated. Use `scrollTo({x: 5, y: 5, animated: true})` instead.');}else 
{var _ref=
y||{};x=_ref.x;y=_ref.y;animated=_ref.animated;}


this.getScrollResponder().scrollResponderScrollTo({x:x||0,y:y||0,animated:animated!==false});},





scrollWithoutAnimationTo:function scrollWithoutAnimationTo(){var y=arguments.length<=0||arguments[0]===undefined?0:arguments[0];var x=arguments.length<=1||arguments[1]===undefined?0:arguments[1];
console.warn('`scrollWithoutAnimationTo` is deprecated. Use `scrollTo` instead');
this.scrollTo({x:x,y:y,animated:false});},


_handleScroll:function _handleScroll(e){
if(__DEV__){
if(this.props.onScroll&&!this.props.scrollEventThrottle&&Platform.OS==='ios'){
console.log(
'You specified `onScroll` on a <ScrollView> but not '+
'`scrollEventThrottle`. You will only receive one event. '+
'Using `16` you get all the events but be aware that it may '+
'cause frame drops, use a bigger number if you don\'t need as '+
'much precision.');}}



if(Platform.OS==='android'){
if(this.props.keyboardDismissMode==='on-drag'){
dismissKeyboard();}}


this.scrollResponderHandleScroll(e);},


_handleContentOnLayout:function _handleContentOnLayout(e){var _e$nativeEvent$layout=
e.nativeEvent.layout;var width=_e$nativeEvent$layout.width;var height=_e$nativeEvent$layout.height;
this.props.onContentSizeChange&&this.props.onContentSizeChange(width,height);},


render:function render(){
var contentContainerStyle=[
this.props.horizontal&&styles.contentContainerHorizontal,
this.props.contentContainerStyle];

if(__DEV__&&this.props.style){
var style=flattenStyle(this.props.style);
var childLayoutProps=['alignItems','justifyContent'].
filter(function(prop){return style&&style[prop]!==undefined;});
invariant(
childLayoutProps.length===0,
'ScrollView child layout ('+JSON.stringify(childLayoutProps)+
') must be applied through the contentContainerStyle prop.');}



var contentSizeChangeProps={};
if(this.props.onContentSizeChange){
contentSizeChangeProps={
onLayout:this._handleContentOnLayout};}



var contentContainer=
React.createElement(View,babelHelpers.extends({},
contentSizeChangeProps,{
ref:INNERVIEW,
style:contentContainerStyle,
removeClippedSubviews:this.props.removeClippedSubviews,
collapsable:false}),
this.props.children);


var alwaysBounceHorizontal=
this.props.alwaysBounceHorizontal!==undefined?
this.props.alwaysBounceHorizontal:
this.props.horizontal;

var alwaysBounceVertical=
this.props.alwaysBounceVertical!==undefined?
this.props.alwaysBounceVertical:
!this.props.horizontal;

var props=babelHelpers.extends({},
this.props,{
alwaysBounceHorizontal:alwaysBounceHorizontal,
alwaysBounceVertical:alwaysBounceVertical,
style:[styles.base,this.props.style],
onTouchStart:this.scrollResponderHandleTouchStart,
onTouchMove:this.scrollResponderHandleTouchMove,
onTouchEnd:this.scrollResponderHandleTouchEnd,
onScrollBeginDrag:this.scrollResponderHandleScrollBeginDrag,
onScrollEndDrag:this.scrollResponderHandleScrollEndDrag,
onMomentumScrollBegin:this.scrollResponderHandleMomentumScrollBegin,
onMomentumScrollEnd:this.scrollResponderHandleMomentumScrollEnd,
onStartShouldSetResponder:this.scrollResponderHandleStartShouldSetResponder,
onStartShouldSetResponderCapture:this.scrollResponderHandleStartShouldSetResponderCapture,
onScrollShouldSetResponder:this.scrollResponderHandleScrollShouldSetResponder,
onScroll:this._handleScroll,
onResponderGrant:this.scrollResponderHandleResponderGrant,
onResponderTerminationRequest:this.scrollResponderHandleTerminationRequest,
onResponderTerminate:this.scrollResponderHandleTerminate,
onResponderRelease:this.scrollResponderHandleResponderRelease,
onResponderReject:this.scrollResponderHandleResponderReject,
sendMomentumEvents:this.props.onMomentumScrollBegin||this.props.onMomentumScrollEnd?true:false});


var onRefreshStart=this.props.onRefreshStart;
if(onRefreshStart){


props.onRefreshStart=
function(){onRefreshStart&&onRefreshStart(this.endRefreshing);}.bind(this);}var 


decelerationRate=this.props.decelerationRate;
if(decelerationRate){
props.decelerationRate=processDecelerationRate(decelerationRate);}


var ScrollViewClass;
if(Platform.OS==='ios'){
ScrollViewClass=RCTScrollView;}else 
if(Platform.OS==='android'){
if(this.props.horizontal){
ScrollViewClass=AndroidHorizontalScrollView;}else 
{
ScrollViewClass=AndroidScrollView;}}


invariant(
ScrollViewClass!==undefined,
'ScrollViewClass must not be undefined');


var refreshControl=this.props.refreshControl;
if(refreshControl){
if(Platform.OS==='ios'){

return (
React.createElement(ScrollViewClass,babelHelpers.extends({},props,{ref:SCROLLVIEW}),
refreshControl,
contentContainer));}else 


if(Platform.OS==='android'){



return React.cloneElement(
refreshControl,
{style:props.style},
React.createElement(ScrollViewClass,babelHelpers.extends({},props,{style:styles.base,ref:SCROLLVIEW}),
contentContainer));}}




return (
React.createElement(ScrollViewClass,babelHelpers.extends({},props,{ref:SCROLLVIEW}),
contentContainer));}});





var styles=StyleSheet.create({
base:{
flex:1},

contentContainerHorizontal:{
alignSelf:'flex-start',
flexDirection:'row'}});



if(Platform.OS==='android'){
var nativeOnlyProps={nativeOnly:{'sendMomentumEvents':true}};
var AndroidScrollView=requireNativeComponent('RCTScrollView',ScrollView,nativeOnlyProps);
var AndroidHorizontalScrollView=requireNativeComponent(
'AndroidHorizontalScrollView',
ScrollView,
nativeOnlyProps);}else 

if(Platform.OS==='ios'){
var RCTScrollView=requireNativeComponent('RCTScrollView',ScrollView);}


module.exports=ScrollView;
});
__d(176 /* PointPropType */, function(global, require, module, exports) {'use strict';












var PropTypes=require(47 /* ReactPropTypes */);

var createStrictShapeTypeChecker=require(134 /* createStrictShapeTypeChecker */);

var PointPropType=createStrictShapeTypeChecker({
x:PropTypes.number,
y:PropTypes.number});


module.exports=PointPropType;
});
__d(177 /* ReactNative */, function(global, require, module, exports) {'use strict';












var ReactIsomorphic=require(29 /* ReactIsomorphic */);
var ReactNativeImpl=require(50 /* ReactNativeImpl */);
var warning=require(232 /* fbjs/lib/warning */);

var ReactNative=babelHelpers.extends({},ReactNativeImpl);

var dedupe={};

if(__DEV__){var _loop=function _loop(
key){
Object.defineProperty(ReactNative,key,{
get:function get(){
return ReactNativeImpl[key];},

set:function set(value){

ReactNativeImpl[key]=value;}});};for(var key in ReactNativeImpl){_loop(key);}}var _loop2=function _loop2(





_key){
ReactNative[_key]=ReactIsomorphic[_key];
if(__DEV__){
Object.defineProperty(ReactNative,_key,{
get:function get(){
warning(
dedupe[_key],
'ReactNative.'+_key+' is deprecated. Use React.'+_key+
' from the "react" package instead.');

dedupe[_key]=true;
return ReactIsomorphic[_key];},

set:function set(value){

ReactIsomorphic[_key]=value;}});}};for(var _key in ReactIsomorphic){_loop2(_key);}





module.exports=ReactNative;
});
__d(178 /* ScrollResponder */, function(global, require, module, exports) {'use strict';












var Dimensions=require(161 /* Dimensions */);
var Platform=require(10 /* Platform */);
var RCTDeviceEventEmitter=require(14 /* RCTDeviceEventEmitter */);
var React=require(28 /* React */);
var ReactNative=require(177 /* ReactNative */);
var Subscribable=require(179 /* Subscribable */);
var TextInputState=require(138 /* TextInputState */);
var UIManager=require(83 /* UIManager */);var _require=

require(9 /* NativeModules */);var ScrollViewManager=_require.ScrollViewManager;

var invariant=require(222 /* fbjs/lib/invariant */);
var warning=require(232 /* fbjs/lib/warning */);

















































































var IS_ANIMATING_TOUCH_START_THRESHOLD_MS=16;










var ScrollResponderMixin={
mixins:[Subscribable.Mixin],
scrollResponderMixinGetInitialState:function scrollResponderMixinGetInitialState(){
return {
isTouching:false,
lastMomentumScrollBeginTime:0,
lastMomentumScrollEndTime:0,






observedScrollSinceBecomingResponder:false,
becameResponderWhileAnimating:false};},






scrollResponderHandleScrollShouldSetResponder:function scrollResponderHandleScrollShouldSetResponder(){
return this.state.isTouching;},



























scrollResponderHandleStartShouldSetResponder:function scrollResponderHandleStartShouldSetResponder(){
return false;},













scrollResponderHandleStartShouldSetResponderCapture:function scrollResponderHandleStartShouldSetResponderCapture(e){

var currentlyFocusedTextInput=TextInputState.currentlyFocusedField();
if(!this.props.keyboardShouldPersistTaps&&
currentlyFocusedTextInput!=null&&
e.target!==currentlyFocusedTextInput){
return true;}

return this.scrollResponderIsAnimating();},












scrollResponderHandleResponderReject:function scrollResponderHandleResponderReject(){},

















scrollResponderHandleTerminationRequest:function scrollResponderHandleTerminationRequest(){
return !this.state.observedScrollSinceBecomingResponder;},







scrollResponderHandleTouchEnd:function scrollResponderHandleTouchEnd(e){
var nativeEvent=e.nativeEvent;
this.state.isTouching=nativeEvent.touches.length!==0;
this.props.onTouchEnd&&this.props.onTouchEnd(e);},





scrollResponderHandleResponderRelease:function scrollResponderHandleResponderRelease(e){
this.props.onResponderRelease&&this.props.onResponderRelease(e);



var currentlyFocusedTextInput=TextInputState.currentlyFocusedField();
if(!this.props.keyboardShouldPersistTaps&&
currentlyFocusedTextInput!=null&&
e.target!==currentlyFocusedTextInput&&
!this.state.observedScrollSinceBecomingResponder&&
!this.state.becameResponderWhileAnimating){
this.props.onScrollResponderKeyboardDismissed&&
this.props.onScrollResponderKeyboardDismissed(e);
TextInputState.blurTextInput(currentlyFocusedTextInput);}},



scrollResponderHandleScroll:function scrollResponderHandleScroll(e){
this.state.observedScrollSinceBecomingResponder=true;
this.props.onScroll&&this.props.onScroll(e);},





scrollResponderHandleResponderGrant:function scrollResponderHandleResponderGrant(e){
this.state.observedScrollSinceBecomingResponder=false;
this.props.onResponderGrant&&this.props.onResponderGrant(e);
this.state.becameResponderWhileAnimating=this.scrollResponderIsAnimating();},









scrollResponderHandleScrollBeginDrag:function scrollResponderHandleScrollBeginDrag(e){
this.props.onScrollBeginDrag&&this.props.onScrollBeginDrag(e);},





scrollResponderHandleScrollEndDrag:function scrollResponderHandleScrollEndDrag(e){
this.props.onScrollEndDrag&&this.props.onScrollEndDrag(e);},





scrollResponderHandleMomentumScrollBegin:function scrollResponderHandleMomentumScrollBegin(e){
this.state.lastMomentumScrollBeginTime=Date.now();
this.props.onMomentumScrollBegin&&this.props.onMomentumScrollBegin(e);},





scrollResponderHandleMomentumScrollEnd:function scrollResponderHandleMomentumScrollEnd(e){
this.state.lastMomentumScrollEndTime=Date.now();
this.props.onMomentumScrollEnd&&this.props.onMomentumScrollEnd(e);},













scrollResponderHandleTouchStart:function scrollResponderHandleTouchStart(e){
this.state.isTouching=true;
this.props.onTouchStart&&this.props.onTouchStart(e);},













scrollResponderHandleTouchMove:function scrollResponderHandleTouchMove(e){
this.props.onTouchMove&&this.props.onTouchMove(e);},







scrollResponderIsAnimating:function scrollResponderIsAnimating(){
var now=Date.now();
var timeSinceLastMomentumScrollEnd=now-this.state.lastMomentumScrollEndTime;
var isAnimating=timeSinceLastMomentumScrollEnd<IS_ANIMATING_TOUCH_START_THRESHOLD_MS||
this.state.lastMomentumScrollEndTime<this.state.lastMomentumScrollBeginTime;
return isAnimating;},







scrollResponderGetScrollableNode:function scrollResponderGetScrollableNode(){
return this.getScrollableNode?
this.getScrollableNode():
ReactNative.findNodeHandle(this);},













scrollResponderScrollTo:function scrollResponderScrollTo(
x,
y,
animated)
{
if(typeof x==='number'){
console.warn('`scrollResponderScrollTo(x, y, animated)` is deprecated. Use `scrollResponderScrollTo({x: 5, y: 5, animated: true})` instead.');}else 
{var _ref=
x||{};x=_ref.x;y=_ref.y;animated=_ref.animated;}

UIManager.dispatchViewManagerCommand(
this.scrollResponderGetScrollableNode(),
UIManager.RCTScrollView.Commands.scrollTo,
[x||0,y||0,animated!==false]);},






scrollResponderScrollWithoutAnimationTo:function scrollResponderScrollWithoutAnimationTo(offsetX,offsetY){
console.warn('`scrollResponderScrollWithoutAnimationTo` is deprecated. Use `scrollResponderScrollTo` instead');
this.scrollResponderScrollTo({x:offsetX,y:offsetY,animated:false});},








scrollResponderZoomTo:function scrollResponderZoomTo(
rect,
animated)
{
if(Platform.OS==='android'){
invariant('zoomToRect is not implemented');}else 
{
if('animated' in rect){var 
animated=rect.animated;var rect=babelHelpers.objectWithoutProperties(rect,['animated']);}else 
if(typeof animated!=='undefined'){
console.warn('`scrollResponderZoomTo` `animated` argument is deprecated. Use `options.animated` instead');}

ScrollViewManager.zoomToRect(this.scrollResponderGetScrollableNode(),rect,animated!==false);}},













scrollResponderScrollNativeHandleToKeyboard:function scrollResponderScrollNativeHandleToKeyboard(nodeHandle,additionalOffset,preventNegativeScrollOffset){
this.additionalScrollOffset=additionalOffset||0;
this.preventNegativeScrollOffset=!!preventNegativeScrollOffset;
UIManager.measureLayout(
nodeHandle,
ReactNative.findNodeHandle(this.getInnerViewNode()),
this.scrollResponderTextInputFocusError,
this.scrollResponderInputMeasureAndScrollToKeyboard);},













scrollResponderInputMeasureAndScrollToKeyboard:function scrollResponderInputMeasureAndScrollToKeyboard(left,top,width,height){
var keyboardScreenY=Dimensions.get('window').height;
if(this.keyboardWillOpenTo){
keyboardScreenY=this.keyboardWillOpenTo.endCoordinates.screenY;}

var scrollOffsetY=top-keyboardScreenY+height+this.additionalScrollOffset;





if(this.preventNegativeScrollOffset){
scrollOffsetY=Math.max(0,scrollOffsetY);}

this.scrollResponderScrollTo({x:0,y:scrollOffsetY,animated:true});

this.additionalOffset=0;
this.preventNegativeScrollOffset=false;},


scrollResponderTextInputFocusError:function scrollResponderTextInputFocusError(e){
console.error('Error measuring text field: ',e);},








componentWillMount:function componentWillMount(){
this.keyboardWillOpenTo=null;
this.additionalScrollOffset=0;
this.addListenerOn(RCTDeviceEventEmitter,'keyboardWillShow',this.scrollResponderKeyboardWillShow);
this.addListenerOn(RCTDeviceEventEmitter,'keyboardWillHide',this.scrollResponderKeyboardWillHide);
this.addListenerOn(RCTDeviceEventEmitter,'keyboardDidShow',this.scrollResponderKeyboardDidShow);
this.addListenerOn(RCTDeviceEventEmitter,'keyboardDidHide',this.scrollResponderKeyboardDidHide);},






























scrollResponderKeyboardWillShow:function scrollResponderKeyboardWillShow(e){
this.keyboardWillOpenTo=e;
this.props.onKeyboardWillShow&&this.props.onKeyboardWillShow(e);},


scrollResponderKeyboardWillHide:function scrollResponderKeyboardWillHide(e){
this.keyboardWillOpenTo=null;
this.props.onKeyboardWillHide&&this.props.onKeyboardWillHide(e);},


scrollResponderKeyboardDidShow:function scrollResponderKeyboardDidShow(e){


if(e){
this.keyboardWillOpenTo=e;}

this.props.onKeyboardDidShow&&this.props.onKeyboardDidShow(e);},


scrollResponderKeyboardDidHide:function scrollResponderKeyboardDidHide(e){
this.keyboardWillOpenTo=null;
this.props.onKeyboardDidHide&&this.props.onKeyboardDidHide(e);}};




var ScrollResponder={
Mixin:ScrollResponderMixin};


module.exports=ScrollResponder;
});
__d(179 /* Subscribable */, function(global, require, module, exports) {'use strict';






















var Subscribable={};

Subscribable.Mixin={

componentWillMount:function componentWillMount(){
this._subscribableSubscriptions=[];},


componentWillUnmount:function componentWillUnmount(){
this._subscribableSubscriptions.forEach(
function(subscription){return subscription.remove();});

this._subscribableSubscriptions=null;},















addListenerOn:function addListenerOn(
eventEmitter,
eventType,
listener,
context)
{
this._subscribableSubscriptions.push(
eventEmitter.addListener(eventType,listener,context));}};




module.exports=Subscribable;
});
__d(180 /* dismissKeyboard */, function(global, require, module, exports) {'use strict';








var TextInputState=require(138 /* TextInputState */);

function dismissKeyboard(){
TextInputState.blurTextInput(TextInputState.currentlyFocusedField());}


module.exports=dismissKeyboard;
});
__d(181 /* processDecelerationRate */, function(global, require, module, exports) {'use strict';











function processDecelerationRate(decelerationRate){
if(decelerationRate==='normal'){
decelerationRate=0.998;}else 
if(decelerationRate==='fast'){
decelerationRate=0.99;}

return decelerationRate;}


module.exports=processDecelerationRate;
});
__d(182 /* Text */, function(global, require, module, exports) {'use strict';












var NativeMethodsMixin=require(135 /* NativeMethodsMixin */);
var Platform=require(10 /* Platform */);
var React=require(28 /* React */);
var ReactNativeViewAttributes=require(155 /* ReactNativeViewAttributes */);
var StyleSheetPropType=require(156 /* StyleSheetPropType */);
var TextStylePropTypes=require(148 /* TextStylePropTypes */);
var Touchable=require(183 /* Touchable */);

var createReactNativeComponentClass=
require(163 /* createReactNativeComponentClass */);
var merge=require(108 /* merge */);

var stylePropType=StyleSheetPropType(TextStylePropTypes);

var viewConfig={
validAttributes:merge(ReactNativeViewAttributes.UIView,{
isHighlighted:true,
numberOfLines:true,
allowFontScaling:true}),

uiViewClassName:'RCTText'};



































var Text=React.createClass({displayName:'Text',
propTypes:{





numberOfLines:React.PropTypes.number,





onLayout:React.PropTypes.func,



onPress:React.PropTypes.func,





suppressHighlighting:React.PropTypes.bool,
style:stylePropType,



testID:React.PropTypes.string,




allowFontScaling:React.PropTypes.bool},

getDefaultProps:function getDefaultProps(){
return {
accessible:true,
allowFontScaling:true};},


getInitialState:function getInitialState(){
return merge(Touchable.Mixin.touchableGetInitialState(),{
isHighlighted:false});},


mixins:[NativeMethodsMixin],
viewConfig:viewConfig,
getChildContext:function getChildContext(){
return {isInAParentText:true};},

childContextTypes:{
isInAParentText:React.PropTypes.bool},

contextTypes:{
isInAParentText:React.PropTypes.bool},




_handlers:null,




touchableHandleActivePressIn:null,
touchableHandleActivePressOut:null,
touchableHandlePress:null,
touchableGetPressRectOffset:null,
render:function render(){var _this=this;
var newProps=this.props;
if(this.props.onStartShouldSetResponder||this.props.onPress){
if(!this._handlers){
this._handlers={
onStartShouldSetResponder:function onStartShouldSetResponder(){
var shouldSetFromProps=_this.props.onStartShouldSetResponder&&
_this.props.onStartShouldSetResponder();
var setResponder=shouldSetFromProps||!!_this.props.onPress;
if(setResponder&&!_this.touchableHandleActivePressIn){


for(var key in Touchable.Mixin){
if(typeof Touchable.Mixin[key]==='function'){
_this[key]=Touchable.Mixin[key].bind(_this);}}


_this.touchableHandleActivePressIn=function(){
if(_this.props.suppressHighlighting||!_this.props.onPress){
return;}

_this.setState({
isHighlighted:true});};



_this.touchableHandleActivePressOut=function(){
if(_this.props.suppressHighlighting||!_this.props.onPress){
return;}

_this.setState({
isHighlighted:false});};



_this.touchableHandlePress=function(){
_this.props.onPress&&_this.props.onPress();};


_this.touchableGetPressRectOffset=function(){
return PRESS_RECT_OFFSET;};}


return setResponder;},

onResponderGrant:function(e,dispatchID){
this.touchableHandleResponderGrant(e,dispatchID);
this.props.onResponderGrant&&
this.props.onResponderGrant.apply(this,arguments);}.
bind(this),
onResponderMove:function(e){
this.touchableHandleResponderMove(e);
this.props.onResponderMove&&
this.props.onResponderMove.apply(this,arguments);}.
bind(this),
onResponderRelease:function(e){
this.touchableHandleResponderRelease(e);
this.props.onResponderRelease&&
this.props.onResponderRelease.apply(this,arguments);}.
bind(this),
onResponderTerminate:function(e){
this.touchableHandleResponderTerminate(e);
this.props.onResponderTerminate&&
this.props.onResponderTerminate.apply(this,arguments);}.
bind(this),
onResponderTerminationRequest:function(){


var allowTermination=this.touchableHandleResponderTerminationRequest();
if(allowTermination&&this.props.onResponderTerminationRequest){
allowTermination=this.props.onResponderTerminationRequest.apply(this,arguments);}

return allowTermination;}.
bind(this)};}


newProps=babelHelpers.extends({},
this.props,
this._handlers,{
isHighlighted:this.state.isHighlighted});}


if(Touchable.TOUCH_TARGET_DEBUG&&newProps.onPress){
newProps=babelHelpers.extends({},
newProps,{
style:[this.props.style,{color:'magenta'}]});}


if(this.context.isInAParentText){
return React.createElement(RCTVirtualText,newProps);}else 
{
return React.createElement(RCTText,newProps);}}});











var PRESS_RECT_OFFSET={top:20,left:20,right:20,bottom:30};

var RCTText=createReactNativeComponentClass(viewConfig);
var RCTVirtualText=RCTText;

if(Platform.OS==='android'){
RCTVirtualText=createReactNativeComponentClass({
validAttributes:merge(ReactNativeViewAttributes.UIView,{
isHighlighted:true}),

uiViewClassName:'RCTVirtualText'});}



module.exports=Text;
});
__d(183 /* Touchable */, function(global, require, module, exports) {'use strict';












var BoundingDimensions=require(184 /* BoundingDimensions */);
var Position=require(185 /* Position */);
var React=require(28 /* React */);
var TouchEventUtils=require(377 /* fbjs/lib/TouchEventUtils */);
var View=require(132 /* View */);

var keyMirror=require(224 /* fbjs/lib/keyMirror */);
var normalizeColor=require(144 /* normalizeColor */);
var queryLayoutByID=require(186 /* queryLayoutByID */);

























































































var States=keyMirror({
NOT_RESPONDER:null,
RESPONDER_INACTIVE_PRESS_IN:null,
RESPONDER_INACTIVE_PRESS_OUT:null,
RESPONDER_ACTIVE_PRESS_IN:null,
RESPONDER_ACTIVE_PRESS_OUT:null,
RESPONDER_ACTIVE_LONG_PRESS_IN:null,
RESPONDER_ACTIVE_LONG_PRESS_OUT:null,
ERROR:null});





var IsActive={
RESPONDER_ACTIVE_PRESS_OUT:true,
RESPONDER_ACTIVE_PRESS_IN:true};






var IsPressingIn={
RESPONDER_INACTIVE_PRESS_IN:true,
RESPONDER_ACTIVE_PRESS_IN:true,
RESPONDER_ACTIVE_LONG_PRESS_IN:true};


var IsLongPressingIn={
RESPONDER_ACTIVE_LONG_PRESS_IN:true};





var Signals=keyMirror({
DELAY:null,
RESPONDER_GRANT:null,
RESPONDER_RELEASE:null,
RESPONDER_TERMINATED:null,
ENTER_PRESS_RECT:null,
LEAVE_PRESS_RECT:null,
LONG_PRESS_DETECTED:null});





var Transitions={
NOT_RESPONDER:{
DELAY:States.ERROR,
RESPONDER_GRANT:States.RESPONDER_INACTIVE_PRESS_IN,
RESPONDER_RELEASE:States.ERROR,
RESPONDER_TERMINATED:States.ERROR,
ENTER_PRESS_RECT:States.ERROR,
LEAVE_PRESS_RECT:States.ERROR,
LONG_PRESS_DETECTED:States.ERROR},

RESPONDER_INACTIVE_PRESS_IN:{
DELAY:States.RESPONDER_ACTIVE_PRESS_IN,
RESPONDER_GRANT:States.ERROR,
RESPONDER_RELEASE:States.NOT_RESPONDER,
RESPONDER_TERMINATED:States.NOT_RESPONDER,
ENTER_PRESS_RECT:States.RESPONDER_INACTIVE_PRESS_IN,
LEAVE_PRESS_RECT:States.RESPONDER_INACTIVE_PRESS_OUT,
LONG_PRESS_DETECTED:States.ERROR},

RESPONDER_INACTIVE_PRESS_OUT:{
DELAY:States.RESPONDER_ACTIVE_PRESS_OUT,
RESPONDER_GRANT:States.ERROR,
RESPONDER_RELEASE:States.NOT_RESPONDER,
RESPONDER_TERMINATED:States.NOT_RESPONDER,
ENTER_PRESS_RECT:States.RESPONDER_INACTIVE_PRESS_IN,
LEAVE_PRESS_RECT:States.RESPONDER_INACTIVE_PRESS_OUT,
LONG_PRESS_DETECTED:States.ERROR},

RESPONDER_ACTIVE_PRESS_IN:{
DELAY:States.ERROR,
RESPONDER_GRANT:States.ERROR,
RESPONDER_RELEASE:States.NOT_RESPONDER,
RESPONDER_TERMINATED:States.NOT_RESPONDER,
ENTER_PRESS_RECT:States.RESPONDER_ACTIVE_PRESS_IN,
LEAVE_PRESS_RECT:States.RESPONDER_ACTIVE_PRESS_OUT,
LONG_PRESS_DETECTED:States.RESPONDER_ACTIVE_LONG_PRESS_IN},

RESPONDER_ACTIVE_PRESS_OUT:{
DELAY:States.ERROR,
RESPONDER_GRANT:States.ERROR,
RESPONDER_RELEASE:States.NOT_RESPONDER,
RESPONDER_TERMINATED:States.NOT_RESPONDER,
ENTER_PRESS_RECT:States.RESPONDER_ACTIVE_PRESS_IN,
LEAVE_PRESS_RECT:States.RESPONDER_ACTIVE_PRESS_OUT,
LONG_PRESS_DETECTED:States.ERROR},

RESPONDER_ACTIVE_LONG_PRESS_IN:{
DELAY:States.ERROR,
RESPONDER_GRANT:States.ERROR,
RESPONDER_RELEASE:States.NOT_RESPONDER,
RESPONDER_TERMINATED:States.NOT_RESPONDER,
ENTER_PRESS_RECT:States.RESPONDER_ACTIVE_LONG_PRESS_IN,
LEAVE_PRESS_RECT:States.RESPONDER_ACTIVE_LONG_PRESS_OUT,
LONG_PRESS_DETECTED:States.RESPONDER_ACTIVE_LONG_PRESS_IN},

RESPONDER_ACTIVE_LONG_PRESS_OUT:{
DELAY:States.ERROR,
RESPONDER_GRANT:States.ERROR,
RESPONDER_RELEASE:States.NOT_RESPONDER,
RESPONDER_TERMINATED:States.NOT_RESPONDER,
ENTER_PRESS_RECT:States.RESPONDER_ACTIVE_LONG_PRESS_IN,
LEAVE_PRESS_RECT:States.RESPONDER_ACTIVE_LONG_PRESS_OUT,
LONG_PRESS_DETECTED:States.ERROR},

error:{
DELAY:States.NOT_RESPONDER,
RESPONDER_GRANT:States.RESPONDER_INACTIVE_PRESS_IN,
RESPONDER_RELEASE:States.NOT_RESPONDER,
RESPONDER_TERMINATED:States.NOT_RESPONDER,
ENTER_PRESS_RECT:States.NOT_RESPONDER,
LEAVE_PRESS_RECT:States.NOT_RESPONDER,
LONG_PRESS_DETECTED:States.NOT_RESPONDER}};






var HIGHLIGHT_DELAY_MS=130;

var PRESS_EXPAND_PX=20;

var LONG_PRESS_THRESHOLD=500;

var LONG_PRESS_DELAY_MS=LONG_PRESS_THRESHOLD-HIGHLIGHT_DELAY_MS;

var LONG_PRESS_ALLOWED_MOVEMENT=10;



































































var TouchableMixin={



componentWillUnmount:function componentWillUnmount(){
this.touchableDelayTimeout&&clearTimeout(this.touchableDelayTimeout);
this.longPressDelayTimeout&&clearTimeout(this.longPressDelayTimeout);
this.pressOutDelayTimeout&&clearTimeout(this.pressOutDelayTimeout);},









touchableGetInitialState:function touchableGetInitialState(){
return {
touchable:{touchState:undefined,responderID:null}};},







touchableHandleResponderTerminationRequest:function touchableHandleResponderTerminationRequest(){
return !this.props.rejectResponderTermination;},





touchableHandleStartShouldSetResponder:function touchableHandleStartShouldSetResponder(){
return !this.props.disabled;},





touchableLongPressCancelsPress:function touchableLongPressCancelsPress(){
return true;},








touchableHandleResponderGrant:function touchableHandleResponderGrant(e,dispatchID){



e.persist();

this.pressOutDelayTimeout&&clearTimeout(this.pressOutDelayTimeout);
this.pressOutDelayTimeout=null;

this.state.touchable.touchState=States.NOT_RESPONDER;
this.state.touchable.responderID=dispatchID;
this._receiveSignal(Signals.RESPONDER_GRANT,e);
var delayMS=
this.touchableGetHighlightDelayMS!==undefined?
Math.max(this.touchableGetHighlightDelayMS(),0):HIGHLIGHT_DELAY_MS;
delayMS=isNaN(delayMS)?HIGHLIGHT_DELAY_MS:delayMS;
if(delayMS!==0){
this.touchableDelayTimeout=setTimeout(
this._handleDelay.bind(this,e),
delayMS);}else 

{
this._handleDelay(e);}


var longDelayMS=
this.touchableGetLongPressDelayMS!==undefined?
Math.max(this.touchableGetLongPressDelayMS(),10):LONG_PRESS_DELAY_MS;
longDelayMS=isNaN(longDelayMS)?LONG_PRESS_DELAY_MS:longDelayMS;
this.longPressDelayTimeout=setTimeout(
this._handleLongDelay.bind(this,e),
longDelayMS+delayMS);},






touchableHandleResponderRelease:function touchableHandleResponderRelease(e){
this._receiveSignal(Signals.RESPONDER_RELEASE,e);},





touchableHandleResponderTerminate:function touchableHandleResponderTerminate(e){
this._receiveSignal(Signals.RESPONDER_TERMINATED,e);},





touchableHandleResponderMove:function touchableHandleResponderMove(e){


if(this.state.touchable.touchState===States.RESPONDER_INACTIVE_PRESS_IN){
return;}



if(!this.state.touchable.positionOnActivate){
return;}


var positionOnActivate=this.state.touchable.positionOnActivate;
var dimensionsOnActivate=this.state.touchable.dimensionsOnActivate;
var pressRectOffset=this.touchableGetPressRectOffset?
this.touchableGetPressRectOffset():{
left:PRESS_EXPAND_PX,
right:PRESS_EXPAND_PX,
top:PRESS_EXPAND_PX,
bottom:PRESS_EXPAND_PX};


var pressExpandLeft=pressRectOffset.left;
var pressExpandTop=pressRectOffset.top;
var pressExpandRight=pressRectOffset.right;
var pressExpandBottom=pressRectOffset.bottom;

var hitSlop=this.touchableGetHitSlop?
this.touchableGetHitSlop():null;

if(hitSlop){
pressExpandLeft+=hitSlop.left;
pressExpandTop+=hitSlop.top;
pressExpandRight+=hitSlop.right;
pressExpandBottom+=hitSlop.bottom;}


var touch=TouchEventUtils.extractSingleTouch(e.nativeEvent);
var pageX=touch&&touch.pageX;
var pageY=touch&&touch.pageY;

if(this.pressInLocation){
var movedDistance=this._getDistanceBetweenPoints(pageX,pageY,this.pressInLocation.pageX,this.pressInLocation.pageY);
if(movedDistance>LONG_PRESS_ALLOWED_MOVEMENT){
this._cancelLongPressDelayTimeout();}}



var isTouchWithinActive=
pageX>positionOnActivate.left-pressExpandLeft&&
pageY>positionOnActivate.top-pressExpandTop&&
pageX<
positionOnActivate.left+
dimensionsOnActivate.width+
pressExpandRight&&
pageY<
positionOnActivate.top+
dimensionsOnActivate.height+
pressExpandBottom;
if(isTouchWithinActive){
this._receiveSignal(Signals.ENTER_PRESS_RECT,e);
var curState=this.state.touchable.touchState;
if(curState===States.RESPONDER_INACTIVE_PRESS_IN){

this._cancelLongPressDelayTimeout();}}else 

{
this._cancelLongPressDelayTimeout();
this._receiveSignal(Signals.LEAVE_PRESS_RECT,e);}},

















































































_remeasureMetricsOnActivation:function _remeasureMetricsOnActivation(){
queryLayoutByID(
this.state.touchable.responderID,
null,
this._handleQueryLayout);},



_handleQueryLayout:function _handleQueryLayout(l,t,w,h,globalX,globalY){
this.state.touchable.positionOnActivate&&
Position.release(this.state.touchable.positionOnActivate);
this.state.touchable.dimensionsOnActivate&&
BoundingDimensions.release(this.state.touchable.dimensionsOnActivate);
this.state.touchable.positionOnActivate=Position.getPooled(globalX,globalY);
this.state.touchable.dimensionsOnActivate=BoundingDimensions.getPooled(w,h);},


_handleDelay:function _handleDelay(e){
this.touchableDelayTimeout=null;
this._receiveSignal(Signals.DELAY,e);},


_handleLongDelay:function _handleLongDelay(e){
this.longPressDelayTimeout=null;
var curState=this.state.touchable.touchState;
if(curState!==States.RESPONDER_ACTIVE_PRESS_IN&&
curState!==States.RESPONDER_ACTIVE_LONG_PRESS_IN){
console.error('Attempted to transition from state `'+curState+'` to `'+
States.RESPONDER_ACTIVE_LONG_PRESS_IN+'`, which is not supported. This is '+
'most likely due to `Touchable.longPressDelayTimeout` not being cancelled.');}else 
{
this._receiveSignal(Signals.LONG_PRESS_DETECTED,e);}},











_receiveSignal:function _receiveSignal(signal,e){
var responderID=this.state.touchable.responderID;
var curState=this.state.touchable.touchState;
var nextState=Transitions[curState]&&Transitions[curState][signal];
if(!responderID&&signal===Signals.RESPONDER_RELEASE){
return;}

if(!nextState){
throw new Error(
'Unrecognized signal `'+signal+'` or state `'+curState+
'` for Touchable responder `'+responderID+'`');}


if(nextState===States.ERROR){
throw new Error(
'Touchable cannot transition from `'+curState+'` to `'+signal+
'` for responder `'+responderID+'`');}


if(curState!==nextState){
this._performSideEffectsForTransition(curState,nextState,signal,e);
this.state.touchable.touchState=nextState;}},



_cancelLongPressDelayTimeout:function _cancelLongPressDelayTimeout(){
this.longPressDelayTimeout&&clearTimeout(this.longPressDelayTimeout);
this.longPressDelayTimeout=null;},


_isHighlight:function _isHighlight(state){
return state===States.RESPONDER_ACTIVE_PRESS_IN||
state===States.RESPONDER_ACTIVE_LONG_PRESS_IN;},


_savePressInLocation:function _savePressInLocation(e){
var touch=TouchEventUtils.extractSingleTouch(e.nativeEvent);
var pageX=touch&&touch.pageX;
var pageY=touch&&touch.pageY;
var locationX=touch&&touch.locationX;
var locationY=touch&&touch.locationY;
this.pressInLocation={pageX:pageX,pageY:pageY,locationX:locationX,locationY:locationY};},


_getDistanceBetweenPoints:function _getDistanceBetweenPoints(aX,aY,bX,bY){
var deltaX=aX-bX;
var deltaY=aY-bY;
return Math.sqrt(deltaX*deltaX+deltaY*deltaY);},













_performSideEffectsForTransition:function _performSideEffectsForTransition(curState,nextState,signal,e){var _this=this;
var curIsHighlight=this._isHighlight(curState);
var newIsHighlight=this._isHighlight(nextState);

var isFinalSignal=
signal===Signals.RESPONDER_TERMINATED||
signal===Signals.RESPONDER_RELEASE;

if(isFinalSignal){
this._cancelLongPressDelayTimeout();}


if(!IsActive[curState]&&IsActive[nextState]){
this._remeasureMetricsOnActivation();}


if(IsPressingIn[curState]&&signal===Signals.LONG_PRESS_DETECTED){
this.touchableHandleLongPress&&this.touchableHandleLongPress(e);}


if(newIsHighlight&&!curIsHighlight){
this._savePressInLocation(e);
this.touchableHandleActivePressIn&&this.touchableHandleActivePressIn(e);}else 
if(!newIsHighlight&&curIsHighlight&&this.touchableHandleActivePressOut){
if(this.touchableGetPressOutDelayMS&&this.touchableGetPressOutDelayMS()){
this.pressOutDelayTimeout=setTimeout(function(){
_this.touchableHandleActivePressOut(e);},
this.touchableGetPressOutDelayMS());}else 
{
this.touchableHandleActivePressOut(e);}}



if(IsPressingIn[curState]&&signal===Signals.RESPONDER_RELEASE){
var hasLongPressHandler=!!this.props.onLongPress;
var pressIsLongButStillCallOnPress=
IsLongPressingIn[curState]&&(
!hasLongPressHandler||
!this.touchableLongPressCancelsPress());


var shouldInvokePress=!IsLongPressingIn[curState]||pressIsLongButStillCallOnPress;
if(shouldInvokePress&&this.touchableHandlePress){
this.touchableHandlePress(e);}}



this.touchableDelayTimeout&&clearTimeout(this.touchableDelayTimeout);
this.touchableDelayTimeout=null;}};




var Touchable={
Mixin:TouchableMixin,
TOUCH_TARGET_DEBUG:false,



renderDebugView:function renderDebugView(_ref){var color=_ref.color;var hitSlop=_ref.hitSlop;
if(!Touchable.TOUCH_TARGET_DEBUG){
return null;}

if(!__DEV__){
throw Error('Touchable.TOUCH_TARGET_DEBUG should not be enabled in prod!');}

var debugHitSlopStyle={};
hitSlop=hitSlop||{top:0,bottom:0,left:0,right:0};
for(var key in hitSlop){
debugHitSlopStyle[key]=-hitSlop[key];}

var hexColor='#'+('00000000'+normalizeColor(color).toString(16)).substr(-8);
return (
React.createElement(View,{
pointerEvents:'none',
style:babelHelpers.extends({
position:'absolute',
borderColor:hexColor.slice(0,-2)+'55',
borderWidth:1,
borderStyle:'dashed',
backgroundColor:hexColor.slice(0,-2)+'0F'},
debugHitSlopStyle)}));}};





if(Touchable.TOUCH_TARGET_DEBUG){
console.warn('Touchable.TOUCH_TARGET_DEBUG is enabled');}


module.exports=Touchable;
});
__d(184 /* BoundingDimensions */, function(global, require, module, exports) {'use strict';





var PooledClass=require(31 /* PooledClass */);

var twoArgumentPooler=PooledClass.twoArgumentPooler;








function BoundingDimensions(width,height){
this.width=width;
this.height=height;}


BoundingDimensions.prototype.destructor=function(){
this.width=null;
this.height=null;};






BoundingDimensions.getPooledFromElement=function(element){
return BoundingDimensions.getPooled(
element.offsetWidth,
element.offsetHeight);};



PooledClass.addPoolingTo(BoundingDimensions,twoArgumentPooler);

module.exports=BoundingDimensions;
});
__d(185 /* Position */, function(global, require, module, exports) {'use strict';





var PooledClass=require(31 /* PooledClass */);

var twoArgumentPooler=PooledClass.twoArgumentPooler;









function Position(left,top){
this.left=left;
this.top=top;}


Position.prototype.destructor=function(){
this.left=null;
this.top=null;};


PooledClass.addPoolingTo(Position,twoArgumentPooler);

module.exports=Position;
});
__d(377 /* fbjs/lib/TouchEventUtils.js */, function(global, require, module, exports) {"use strict";











var TouchEventUtils={










extractSingleTouch:function extractSingleTouch(nativeEvent){
var touches=nativeEvent.touches;
var changedTouches=nativeEvent.changedTouches;
var hasTouches=touches&&touches.length>0;
var hasChangedTouches=changedTouches&&changedTouches.length>0;

return !hasTouches&&hasChangedTouches?changedTouches[0]:hasTouches?touches[0]:nativeEvent;}};



module.exports=TouchEventUtils;
});
__d(186 /* queryLayoutByID */, function(global, require, module, exports) {'use strict';












var ReactNativeTagHandles=require(74 /* ReactNativeTagHandles */);
var UIManager=require(83 /* UIManager */);
































var queryLayoutByID=function queryLayoutByID(
rootNodeID,
onError,
onSuccess)
{

UIManager.measure(
ReactNativeTagHandles.rootNodeIDToTag[rootNodeID],
onSuccess);};



module.exports=queryLayoutByID;
});
__d(187 /* TouchableWithoutFeedback */, function(global, require, module, exports) {'use strict';













var EdgeInsetsPropType=require(133 /* EdgeInsetsPropType */);
var React=require(28 /* React */);
var TimerMixin=require(392 /* react-timer-mixin */);
var Touchable=require(183 /* Touchable */);
var View=require(132 /* View */);

var ensurePositiveDelayProps=require(188 /* ensurePositiveDelayProps */);
var onlyChild=require(49 /* onlyChild */);
var warning=require(232 /* fbjs/lib/warning */);



var PRESS_RETENTION_OFFSET={top:20,left:20,right:20,bottom:30};










var TouchableWithoutFeedback=React.createClass({displayName:'TouchableWithoutFeedback',
mixins:[TimerMixin,Touchable.Mixin],

propTypes:{
accessible:React.PropTypes.bool,
accessibilityComponentType:React.PropTypes.oneOf(View.AccessibilityComponentType),
accessibilityTraits:React.PropTypes.oneOfType([
React.PropTypes.oneOf(View.AccessibilityTraits),
React.PropTypes.arrayOf(React.PropTypes.oneOf(View.AccessibilityTraits))]),




disabled:React.PropTypes.bool,




onPress:React.PropTypes.func,
onPressIn:React.PropTypes.func,
onPressOut:React.PropTypes.func,





onLayout:React.PropTypes.func,

onLongPress:React.PropTypes.func,




delayPressIn:React.PropTypes.number,



delayPressOut:React.PropTypes.number,



delayLongPress:React.PropTypes.number,







pressRetentionOffset:EdgeInsetsPropType,








hitSlop:EdgeInsetsPropType},


getInitialState:function getInitialState(){
return this.touchableGetInitialState();},


componentDidMount:function componentDidMount(){
ensurePositiveDelayProps(this.props);},


componentWillReceiveProps:function componentWillReceiveProps(nextProps){
ensurePositiveDelayProps(nextProps);},






touchableHandlePress:function touchableHandlePress(e){
this.props.onPress&&this.props.onPress(e);},


touchableHandleActivePressIn:function touchableHandleActivePressIn(e){
this.props.onPressIn&&this.props.onPressIn(e);},


touchableHandleActivePressOut:function touchableHandleActivePressOut(e){
this.props.onPressOut&&this.props.onPressOut(e);},


touchableHandleLongPress:function touchableHandleLongPress(e){
this.props.onLongPress&&this.props.onLongPress(e);},


touchableGetPressRectOffset:function touchableGetPressRectOffset(){
return this.props.pressRetentionOffset||PRESS_RETENTION_OFFSET;},


touchableGetHitSlop:function touchableGetHitSlop(){
return this.props.hitSlop;},


touchableGetHighlightDelayMS:function touchableGetHighlightDelayMS(){
return this.props.delayPressIn||0;},


touchableGetLongPressDelayMS:function touchableGetLongPressDelayMS(){
return this.props.delayLongPress===0?0:
this.props.delayLongPress||500;},


touchableGetPressOutDelayMS:function touchableGetPressOutDelayMS(){
return this.props.delayPressOut||0;},


render:function render(){

var child=onlyChild(this.props.children);
var children=child.props.children;
warning(
!child.type||child.type.displayName!=='Text',
'TouchableWithoutFeedback does not work well with Text children. Wrap children in a View instead. See '+(
child._owner&&child._owner.getName&&child._owner.getName()||'<unknown>'));

if(Touchable.TOUCH_TARGET_DEBUG&&child.type&&child.type.displayName==='View'){
if(!Array.isArray(children)){
children=[children];}

children.push(Touchable.renderDebugView({color:'red',hitSlop:this.props.hitSlop}));}

var style=Touchable.TOUCH_TARGET_DEBUG&&child.type&&child.type.displayName==='Text'?
[child.props.style,{color:'red'}]:
child.props.style;
return React.cloneElement(child,{
accessible:this.props.accessible!==false,
accessibilityLabel:this.props.accessibilityLabel,
accessibilityComponentType:this.props.accessibilityComponentType,
accessibilityTraits:this.props.accessibilityTraits,
testID:this.props.testID,
onLayout:this.props.onLayout,
hitSlop:this.props.hitSlop,
onStartShouldSetResponder:this.touchableHandleStartShouldSetResponder,
onResponderTerminationRequest:this.touchableHandleResponderTerminationRequest,
onResponderGrant:this.touchableHandleResponderGrant,
onResponderMove:this.touchableHandleResponderMove,
onResponderRelease:this.touchableHandleResponderRelease,
onResponderTerminate:this.touchableHandleResponderTerminate,
style:style,
children:children});}});




module.exports=TouchableWithoutFeedback;
});
__d(392 /* react-timer-mixin/TimerMixin.js */, function(global, require, module, exports) {'use strict';










var GLOBAL=typeof window==='undefined'?global:window;

var setter=function setter(_setter,_clearer,array){
return function(callback,delta){
var id=_setter(function(){
_clearer.call(this,id);
callback.apply(this,arguments);}.
bind(this),delta);

if(!this[array]){
this[array]=[id];}else 
{
this[array].push(id);}

return id;};};



var clearer=function clearer(_clearer,array){
return function(id){
if(this[array]){
var index=this[array].indexOf(id);
if(index!==-1){
this[array].splice(index,1);}}


_clearer(id);};};



var _timeouts='TimerMixin_timeouts';
var _clearTimeout=clearer(GLOBAL.clearTimeout,_timeouts);
var _setTimeout=setter(GLOBAL.setTimeout,_clearTimeout,_timeouts);

var _intervals='TimerMixin_intervals';
var _clearInterval=clearer(GLOBAL.clearInterval,_intervals);
var _setInterval=setter(GLOBAL.setInterval,function(){},_intervals);

var _immediates='TimerMixin_immediates';
var _clearImmediate=clearer(GLOBAL.clearImmediate,_immediates);
var _setImmediate=setter(GLOBAL.setImmediate,_clearImmediate,_immediates);

var _rafs='TimerMixin_rafs';
var _cancelAnimationFrame=clearer(GLOBAL.cancelAnimationFrame,_rafs);
var _requestAnimationFrame=setter(GLOBAL.requestAnimationFrame,_cancelAnimationFrame,_rafs);

var TimerMixin={
componentWillUnmount:function componentWillUnmount(){
this[_timeouts]&&this[_timeouts].forEach(function(id){
GLOBAL.clearTimeout(id);});

this[_timeouts]=null;
this[_intervals]&&this[_intervals].forEach(function(id){
GLOBAL.clearInterval(id);});

this[_intervals]=null;
this[_immediates]&&this[_immediates].forEach(function(id){
GLOBAL.clearImmediate(id);});

this[_immediates]=null;
this[_rafs]&&this[_rafs].forEach(function(id){
GLOBAL.cancelAnimationFrame(id);});

this[_rafs]=null;},


setTimeout:_setTimeout,
clearTimeout:_clearTimeout,

setInterval:_setInterval,
clearInterval:_clearInterval,

setImmediate:_setImmediate,
clearImmediate:_clearImmediate,

requestAnimationFrame:_requestAnimationFrame,
cancelAnimationFrame:_cancelAnimationFrame};


module.exports=TimerMixin;
});
__d(188 /* ensurePositiveDelayProps */, function(global, require, module, exports) {'use strict';












var invariant=require(222 /* fbjs/lib/invariant */);

var ensurePositiveDelayProps=function ensurePositiveDelayProps(props){
invariant(
!(props.delayPressIn<0||props.delayPressOut<0||
props.delayLongPress<0),
'Touchable components cannot have negative delay properties');};



module.exports=ensurePositiveDelayProps;
});
__d(189 /* AppRegistry */, function(global, require, module, exports) {'use strict';












var BatchedBridge=require(2 /* BatchedBridge */);
var ReactNative=require(177 /* ReactNative */);

var invariant=require(222 /* fbjs/lib/invariant */);
var renderApplication=require(190 /* renderApplication */);

if(__DEV__){


require(207 /* RCTRenderingPerf */);}


var runnables={};
























var AppRegistry={
registerConfig:function registerConfig(config){
for(var i=0;i<config.length;++i){
var appConfig=config[i];
if(appConfig.run){
AppRegistry.registerRunnable(appConfig.appKey,appConfig.run);}else 
{
invariant(appConfig.component,'No component provider passed in');
AppRegistry.registerComponent(appConfig.appKey,appConfig.component);}}},




registerComponent:function registerComponent(appKey,getComponentFunc){
runnables[appKey]={
run:function run(appParameters){return (
renderApplication(getComponentFunc(),appParameters.initialProps,appParameters.rootTag));}};

return appKey;},


registerRunnable:function registerRunnable(appKey,func){
runnables[appKey]={run:func};
return appKey;},


getAppKeys:function getAppKeys(){
return Object.keys(runnables);},


runApplication:function runApplication(appKey,appParameters){
console.log(
'Running application "'+appKey+'" with appParams: '+
JSON.stringify(appParameters)+'. '+
'__DEV__ === '+String(__DEV__)+
', development-level warning are '+(__DEV__?'ON':'OFF')+
', performance optimizations are '+(__DEV__?'OFF':'ON'));

invariant(
runnables[appKey]&&runnables[appKey].run,
'Application '+appKey+' has not been registered. This '+
'is either due to a require() error during initialization '+
'or failure to call AppRegistry.registerComponent.');

runnables[appKey].run(appParameters);},


unmountApplicationComponentAtRootTag:function unmountApplicationComponentAtRootTag(rootTag){
ReactNative.unmountComponentAtNodeAndRemoveContainer(rootTag);}};




BatchedBridge.registerCallableModule(
'AppRegistry',
AppRegistry);


module.exports=AppRegistry;
});
__d(190 /* renderApplication */, function(global, require, module, exports) {'use strict';












var Inspector=require(191 /* Inspector */);
var Portal=require(204 /* Portal */);
var RCTDeviceEventEmitter=require(14 /* RCTDeviceEventEmitter */);
var React=require(28 /* React */);
var ReactNative=require(177 /* ReactNative */);
var StyleSheet=require(159 /* StyleSheet */);
var Subscribable=require(179 /* Subscribable */);
var View=require(132 /* View */);

var invariant=require(222 /* fbjs/lib/invariant */);

var YellowBox=__DEV__?require(205 /* YellowBox */):null;


require(206 /* BackAndroid */);

var AppContainer=React.createClass({displayName:'AppContainer',
mixins:[Subscribable.Mixin],

getInitialState:function getInitialState(){
return {
inspectorVisible:false,
rootNodeHandle:null,
rootImportanceForAccessibility:'auto',
mainKey:1};},



toggleElementInspector:function toggleElementInspector(){
this.setState({
inspectorVisible:!this.state.inspectorVisible,
rootNodeHandle:ReactNative.findNodeHandle(this.refs.main)});},



componentDidMount:function componentDidMount(){
this.addListenerOn(
RCTDeviceEventEmitter,
'toggleElementInspector',
this.toggleElementInspector);


this._unmounted=false;},


renderInspector:function renderInspector(){var _this=this;
return this.state.inspectorVisible?
React.createElement(Inspector,{
rootTag:this.props.rootTag,
inspectedViewTag:this.state.rootNodeHandle,
onRequestRerenderApp:function onRequestRerenderApp(updateInspectedViewTag){
_this.setState(
function(s){return {mainKey:s.mainKey+1};},
function(){return updateInspectedViewTag(ReactNative.findNodeHandle(_this.refs.main));});}}):



null;},


componentWillUnmount:function componentWillUnmount(){
this._unmounted=true;},


setRootAccessibility:function setRootAccessibility(modalVisible){
if(this._unmounted){
return;}


this.setState({
rootImportanceForAccessibility:modalVisible?'no-hide-descendants':'auto'});},



render:function render(){
var RootComponent=this.props.rootComponent;
var appView=
React.createElement(View,{
ref:'main',
key:this.state.mainKey,
collapsable:!this.state.inspectorVisible,
style:styles.appContainer},
React.createElement(RootComponent,babelHelpers.extends({},
this.props.initialProps,{
rootTag:this.props.rootTag,
importantForAccessibility:this.state.rootImportanceForAccessibility})),
React.createElement(Portal,{
onModalVisibilityChanged:this.setRootAccessibility}));

return __DEV__?
React.createElement(View,{style:styles.appContainer},
appView,
React.createElement(YellowBox,null),
this.renderInspector()):

appView;}});



function renderApplication(
RootComponent,
initialProps,
rootTag)
{
invariant(
rootTag,
'Expect to have a valid rootTag, instead got ',rootTag);

ReactNative.render(
React.createElement(AppContainer,{
rootComponent:RootComponent,
initialProps:initialProps,
rootTag:rootTag}),
rootTag);}



var styles=StyleSheet.create({


appContainer:{
position:'absolute',
left:0,
top:0,
right:0,
bottom:0}});



module.exports=renderApplication;
});
__d(191 /* Inspector */, function(global, require, module, exports) {'use strict';












var Dimensions=require(161 /* Dimensions */);
var InspectorOverlay=require(192 /* InspectorOverlay */);
var InspectorPanel=require(196 /* InspectorPanel */);
var InspectorUtils=require(94 /* InspectorUtils */);
var React=require(28 /* React */);
var ReactNative=require(177 /* ReactNative */);
var StyleSheet=require(159 /* StyleSheet */);
var Touchable=require(183 /* Touchable */);
var UIManager=require(9 /* NativeModules */).UIManager;
var View=require(132 /* View */);

if(window.__REACT_DEVTOOLS_GLOBAL_HOOK__){

window.__REACT_DEVTOOLS_GLOBAL_HOOK__.resolveRNStyle=require(71 /* flattenStyle */);}var 


Inspector=function(_React$Component){babelHelpers.inherits(Inspector,_React$Component);


function Inspector(props){babelHelpers.classCallCheck(this,Inspector);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Inspector).call(this,
props));

_this.state={
devtoolsAgent:null,
panelPos:'bottom',
inspecting:true,
perfing:false,
inspected:null,
inspectedViewTag:_this.props.inspectedViewTag};return _this;}babelHelpers.createClass(Inspector,[{key:'componentDidMount',value:function componentDidMount()



{
if(window.__REACT_DEVTOOLS_GLOBAL_HOOK__){
this.attachToDevtools=this.attachToDevtools.bind(this);
window.__REACT_DEVTOOLS_GLOBAL_HOOK__.on('react-devtools',this.attachToDevtools);

if(window.__REACT_DEVTOOLS_GLOBAL_HOOK__.reactDevtoolsAgent){
this.attachToDevtools(window.__REACT_DEVTOOLS_GLOBAL_HOOK__.reactDevtoolsAgent);}}}},{key:'componentWillUnmount',value:function componentWillUnmount()




{
if(this._subs){
this._subs.map(function(fn){return fn();});}

if(window.__REACT_DEVTOOLS_GLOBAL_HOOK__){
window.__REACT_DEVTOOLS_GLOBAL_HOOK__.off('react-devtools',this.attachToDevtools);}}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(



newProps){
this.setState({inspectedViewTag:newProps.inspectedViewTag});}},{key:'attachToDevtools',value:function attachToDevtools(


agent){var _this2=this;
var _hideWait=null;
var hlSub=agent.sub('highlight',function(_ref){var node=_ref.node;var name=_ref.name;var props=_ref.props;
clearTimeout(_hideWait);
UIManager.measure(node,function(x,y,width,height,left,top){
_this2.setState({
hierarchy:[],
inspected:{
frame:{left:left,top:top,width:width,height:height},
style:props?props.style:{}}});});});




var hideSub=agent.sub('hideHighlight',function(){
if(_this2.state.inspected===null){
return;}


_hideWait=setTimeout(function(){
_this2.setState({
inspected:null});},

100);});

this._subs=[hlSub,hideSub];

agent.on('shutdown',function(){
_this2.setState({devtoolsAgent:null});
_this2._subs=null;});

this.setState({
devtoolsAgent:agent});}},{key:'setSelection',value:function setSelection(



i){var _this3=this;
var instance=this.state.hierarchy[i];


var publicInstance=instance._instance||{};
UIManager.measure(ReactNative.findNodeHandle(instance),function(x,y,width,height,left,top){
_this3.setState({
inspected:{
frame:{left:left,top:top,width:width,height:height},
style:publicInstance.props?publicInstance.props.style:{}},

selection:i});});}},{key:'onTouchInstance',value:function onTouchInstance(




instance,frame,pointerY){
if(this.state.devtoolsAgent){
this.state.devtoolsAgent.selectFromReactInstance(instance,true);}

var hierarchy=InspectorUtils.getOwnerHierarchy(instance);


var publicInstance=instance._instance||{};
var props=publicInstance.props||{};
this.setState({
panelPos:pointerY>Dimensions.get('window').height/2?'top':'bottom',
selection:hierarchy.length-1,
hierarchy:hierarchy,
inspected:{
style:props.style||{},
frame:frame}});}},{key:'setPerfing',value:function setPerfing(




val){
this.setState({
perfing:val,
inspecting:false,
inspected:null});}},{key:'setInspecting',value:function setInspecting(



val){
this.setState({
inspecting:val,
inspected:null});}},{key:'setTouchTargetting',value:function setTouchTargetting(



val){var _this4=this;
Touchable.TOUCH_TARGET_DEBUG=val;
this.props.onRequestRerenderApp(function(inspectedViewTag){
_this4.setState({inspectedViewTag:inspectedViewTag});});}},{key:'render',value:function render()



{
var panelContainerStyle=this.state.panelPos==='bottom'?{bottom:0}:{top:0};
return (
React.createElement(View,{style:styles.container,pointerEvents:'box-none'},
this.state.inspecting&&
React.createElement(InspectorOverlay,{
rootTag:this.props.rootTag,
inspected:this.state.inspected,
inspectedViewTag:this.state.inspectedViewTag,
onTouchInstance:this.onTouchInstance.bind(this)}),

React.createElement(View,{style:[styles.panelContainer,panelContainerStyle]},
React.createElement(InspectorPanel,{
devtoolsIsOpen:!!this.state.devtoolsAgent,
inspecting:this.state.inspecting,
perfing:this.state.perfing,
setPerfing:this.setPerfing.bind(this),
setInspecting:this.setInspecting.bind(this),
inspected:this.state.inspected,
hierarchy:this.state.hierarchy,
selection:this.state.selection,
setSelection:this.setSelection.bind(this),
touchTargetting:Touchable.TOUCH_TARGET_DEBUG,
setTouchTargetting:this.setTouchTargetting.bind(this)}))));}}]);return Inspector;}(React.Component);







var styles=StyleSheet.create({
container:{
position:'absolute',
backgroundColor:'transparent',
top:0,
left:0,
right:0,
bottom:0},

panelContainer:{
position:'absolute',
left:0,
right:0}});



module.exports=Inspector;
});
__d(192 /* InspectorOverlay */, function(global, require, module, exports) {'use strict';












var Dimensions=require(161 /* Dimensions */);
var InspectorUtils=require(94 /* InspectorUtils */);
var React=require(28 /* React */);
var StyleSheet=require(159 /* StyleSheet */);
var UIManager=require(9 /* NativeModules */).UIManager;
var View=require(132 /* View */);
var ElementBox=require(193 /* ElementBox */);

var PropTypes=React.PropTypes;





var InspectorOverlay=React.createClass({displayName:'InspectorOverlay',
propTypes:{
inspected:PropTypes.shape({
frame:PropTypes.object,
style:PropTypes.any}),

inspectedViewTag:PropTypes.number,
onTouchInstance:PropTypes.func.isRequired},


findViewForTouchEvent:function findViewForTouchEvent(e){var _this=this;var _e$nativeEvent$touche=
e.nativeEvent.touches[0];var locationX=_e$nativeEvent$touche.locationX;var locationY=_e$nativeEvent$touche.locationY;
UIManager.findSubviewIn(
this.props.inspectedViewTag,
[locationX,locationY],
function(nativeViewTag,left,top,width,height){
var instance=InspectorUtils.findInstanceByNativeTag(_this.props.rootTag,nativeViewTag);
if(!instance){
return;}

_this.props.onTouchInstance(instance,{left:left,top:top,width:width,height:height},locationY);});},




shouldSetResponser:function shouldSetResponser(e){
this.findViewForTouchEvent(e);
return true;},


render:function render(){
var content=null;
if(this.props.inspected){
content=React.createElement(ElementBox,{frame:this.props.inspected.frame,style:this.props.inspected.style});}


return (
React.createElement(View,{
onStartShouldSetResponder:this.shouldSetResponser,
onResponderMove:this.findViewForTouchEvent,
style:[styles.inspector,{height:Dimensions.get('window').height}]},
content));}});





var styles=StyleSheet.create({
inspector:{
backgroundColor:'transparent',
position:'absolute',
left:0,
top:0,
right:0}});



module.exports=InspectorOverlay;
});
__d(193 /* ElementBox */, function(global, require, module, exports) {'use strict';












var React=require(28 /* React */);
var View=require(132 /* View */);
var StyleSheet=require(159 /* StyleSheet */);
var BorderBox=require(194 /* BorderBox */);
var resolveBoxStyle=require(195 /* resolveBoxStyle */);

var flattenStyle=require(71 /* flattenStyle */);var 

ElementBox=function(_React$Component){babelHelpers.inherits(ElementBox,_React$Component);function ElementBox(){babelHelpers.classCallCheck(this,ElementBox);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(ElementBox).apply(this,arguments));}babelHelpers.createClass(ElementBox,[{key:'render',value:function render()
{
var style=flattenStyle(this.props.style)||{};
var margin=resolveBoxStyle('margin',style);
var padding=resolveBoxStyle('padding',style);
var frameStyle=this.props.frame;
if(margin){
frameStyle={
top:frameStyle.top-margin.top,
left:frameStyle.left-margin.left,
height:frameStyle.height+margin.top+margin.bottom,
width:frameStyle.width+margin.left+margin.right};}


var contentStyle={
width:this.props.frame.width,
height:this.props.frame.height};

if(padding){
contentStyle={
width:contentStyle.width-padding.left-padding.right,
height:contentStyle.height-padding.top-padding.bottom};}


return (
React.createElement(View,{style:[styles.frame,frameStyle],pointerEvents:'none'},
React.createElement(BorderBox,{box:margin,style:styles.margin},
React.createElement(BorderBox,{box:padding,style:styles.padding},
React.createElement(View,{style:[styles.content,contentStyle]})))));}}]);return ElementBox;}(React.Component);







var styles=StyleSheet.create({
frame:{
position:'absolute'},

content:{
backgroundColor:'rgba(200, 230, 255, 0.8)'},

padding:{
borderColor:'rgba(77, 255, 0, 0.3)'},

margin:{
borderColor:'rgba(255, 132, 0, 0.3)'}});



module.exports=ElementBox;
});
__d(194 /* BorderBox */, function(global, require, module, exports) {'use strict';












var React=require(28 /* React */);
var View=require(132 /* View */);var 

BorderBox=function(_React$Component){babelHelpers.inherits(BorderBox,_React$Component);function BorderBox(){babelHelpers.classCallCheck(this,BorderBox);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(BorderBox).apply(this,arguments));}babelHelpers.createClass(BorderBox,[{key:'render',value:function render()
{
var box=this.props.box;
if(!box){
return this.props.children;}

var style={
borderTopWidth:box.top,
borderBottomWidth:box.bottom,
borderLeftWidth:box.left,
borderRightWidth:box.right};

return (
React.createElement(View,{style:[style,this.props.style]},
this.props.children));}}]);return BorderBox;}(React.Component);





module.exports=BorderBox;
});
__d(195 /* resolveBoxStyle */, function(global, require, module, exports) {'use strict';





















function resolveBoxStyle(prefix,style){
var res={};
var subs=['top','left','bottom','right'];
var set=false;
subs.forEach(function(sub){
res[sub]=style[prefix]||0;});

if(style[prefix]){
set=true;}

if(style[prefix+'Vertical']){
res.top=res.bottom=style[prefix+'Vertical'];
set=true;}

if(style[prefix+'Horizontal']){
res.left=res.right=style[prefix+'Horizontal'];
set=true;}

subs.forEach(function(sub){
var val=style[prefix+capFirst(sub)];
if(val){
res[sub]=val;
set=true;}});


if(!set){
return;}

return res;}


function capFirst(text){
return text[0].toUpperCase()+text.slice(1);}


module.exports=resolveBoxStyle;
});
__d(196 /* InspectorPanel */, function(global, require, module, exports) {'use strict';












var React=require(28 /* React */);
var StyleSheet=require(159 /* StyleSheet */);
var Text=require(182 /* Text */);
var View=require(132 /* View */);
var ElementProperties=require(197 /* ElementProperties */);
var PerformanceOverlay=require(203 /* PerformanceOverlay */);
var Touchable=require(183 /* Touchable */);
var TouchableHighlight=require(200 /* TouchableHighlight */);

var PropTypes=React.PropTypes;var 

InspectorPanel=function(_React$Component){babelHelpers.inherits(InspectorPanel,_React$Component);function InspectorPanel(){babelHelpers.classCallCheck(this,InspectorPanel);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(InspectorPanel).apply(this,arguments));}babelHelpers.createClass(InspectorPanel,[{key:'renderWaiting',value:function renderWaiting()
{
if(this.props.inspecting){
return (
React.createElement(Text,{style:styles.waitingText},'Tap something to inspect it'));}




return React.createElement(Text,{style:styles.waitingText},'Nothing is inspected');}},{key:'render',value:function render()


{
var contents;
if(this.props.inspected){
contents=
React.createElement(ElementProperties,{
style:this.props.inspected.style,
frame:this.props.inspected.frame,
hierarchy:this.props.hierarchy,
selection:this.props.selection,
setSelection:this.props.setSelection});}else 


if(this.props.perfing){
contents=
React.createElement(PerformanceOverlay,null);}else 

{
contents=
React.createElement(View,{style:styles.waiting},
this.renderWaiting());}



return (
React.createElement(View,{style:styles.container},
!this.props.devtoolsIsOpen&&contents,
React.createElement(View,{style:styles.buttonRow},
React.createElement(Button,{
title:'Inspect',
pressed:this.props.inspecting,
onClick:this.props.setInspecting}),

React.createElement(Button,{title:'Perf',
pressed:this.props.perfing,
onClick:this.props.setPerfing}),

React.createElement(Button,{title:'Touchables',
pressed:this.props.touchTargetting,
onClick:this.props.setTouchTargetting}))));}}]);return InspectorPanel;}(React.Component);







InspectorPanel.propTypes={
devtoolsIsOpen:PropTypes.bool,
inspecting:PropTypes.bool,
setInspecting:PropTypes.func,
inspected:PropTypes.object,
perfing:PropTypes.bool,
setPerfing:PropTypes.func,
touchTargetting:PropTypes.bool,
setTouchTargetting:PropTypes.func};var 


Button=function(_React$Component2){babelHelpers.inherits(Button,_React$Component2);function Button(){babelHelpers.classCallCheck(this,Button);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Button).apply(this,arguments));}babelHelpers.createClass(Button,[{key:'render',value:function render()
{var _this3=this;
return (
React.createElement(TouchableHighlight,{onPress:function onPress(){return _this3.props.onClick(!_this3.props.pressed);},style:[
styles.button,
this.props.pressed&&styles.buttonPressed]},

React.createElement(Text,{style:styles.buttonText},this.props.title)));}}]);return Button;}(React.Component);





var styles=StyleSheet.create({
buttonRow:{
flexDirection:'row'},

button:{
backgroundColor:'rgba(0, 0, 0, 0.3)',
margin:2,
height:30,
justifyContent:'center',
alignItems:'center'},

buttonPressed:{
backgroundColor:'rgba(255, 255, 255, 0.3)'},

buttonText:{
textAlign:'center',
color:'white',
margin:5},

container:{
backgroundColor:'rgba(0, 0, 0, 0.7)'},

waiting:{
height:100},

waitingText:{
fontSize:20,
textAlign:'center',
marginVertical:20,
color:'white'}});



module.exports=InspectorPanel;
});
__d(197 /* ElementProperties */, function(global, require, module, exports) {'use strict';












var BoxInspector=require(198 /* BoxInspector */);
var PropTypes=require(47 /* ReactPropTypes */);
var React=require(28 /* React */);
var StyleInspector=require(199 /* StyleInspector */);
var StyleSheet=require(159 /* StyleSheet */);
var Text=require(182 /* Text */);
var TouchableHighlight=require(200 /* TouchableHighlight */);
var TouchableWithoutFeedback=require(187 /* TouchableWithoutFeedback */);
var View=require(132 /* View */);

var flattenStyle=require(71 /* flattenStyle */);
var mapWithSeparator=require(202 /* mapWithSeparator */);

var ElementProperties=React.createClass({displayName:'ElementProperties',
propTypes:{
hierarchy:PropTypes.array.isRequired,
style:PropTypes.oneOfType([
PropTypes.object,
PropTypes.array,
PropTypes.number])},



render:function render(){var _this=this;
var style=flattenStyle(this.props.style);
var selection=this.props.selection;


return (
React.createElement(TouchableWithoutFeedback,null,
React.createElement(View,{style:styles.info},
React.createElement(View,{style:styles.breadcrumb},
mapWithSeparator(
this.props.hierarchy,
function(item,i){return (
React.createElement(TouchableHighlight,{
key:'item-'+i,
style:[styles.breadItem,i===selection&&styles.selected],
onPress:function onPress(){return _this.props.setSelection(i);}},
React.createElement(Text,{style:styles.breadItemText},
item.getName?item.getName():'Unknown')));},



function(i){return (
React.createElement(Text,{key:'sep-'+i,style:styles.breadSep},'▸'));})),





React.createElement(View,{style:styles.row},
React.createElement(StyleInspector,{style:style}),
React.createElement(BoxInspector,{style:style,frame:this.props.frame})))));}});







var styles=StyleSheet.create({
breadSep:{
fontSize:8,
color:'white'},

breadcrumb:{
flexDirection:'row',
flexWrap:'wrap',
marginBottom:5},

selected:{
borderColor:'white',
borderRadius:5},

breadItem:{
borderWidth:1,
borderColor:'transparent',
marginHorizontal:2},

breadItemText:{
fontSize:10,
color:'white',
marginHorizontal:5},

row:{
flexDirection:'row',
alignItems:'center',
justifyContent:'space-between'},

info:{
padding:10},

path:{
color:'white',
fontSize:9}});



module.exports=ElementProperties;
});
__d(198 /* BoxInspector */, function(global, require, module, exports) {'use strict';












var React=require(28 /* React */);
var StyleSheet=require(159 /* StyleSheet */);
var Text=require(182 /* Text */);
var View=require(132 /* View */);
var resolveBoxStyle=require(195 /* resolveBoxStyle */);

var blank={
top:0,
left:0,
right:0,
bottom:0};var 


BoxInspector=function(_React$Component){babelHelpers.inherits(BoxInspector,_React$Component);function BoxInspector(){babelHelpers.classCallCheck(this,BoxInspector);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(BoxInspector).apply(this,arguments));}babelHelpers.createClass(BoxInspector,[{key:'render',value:function render()
{
var frame=this.props.frame;
var style=this.props.style;
var margin=style&&resolveBoxStyle('margin',style)||blank;
var padding=style&&resolveBoxStyle('padding',style)||blank;
return (
React.createElement(BoxContainer,{title:'margin',titleStyle:styles.marginLabel,box:margin},
React.createElement(BoxContainer,{title:'padding',box:padding},
React.createElement(View,null,
React.createElement(Text,{style:styles.innerText},'(',
frame.left,', ',frame.top,')'),

React.createElement(Text,{style:styles.innerText},
frame.width,' × ',frame.height)))));}}]);return BoxInspector;}(React.Component);var 








BoxContainer=function(_React$Component2){babelHelpers.inherits(BoxContainer,_React$Component2);function BoxContainer(){babelHelpers.classCallCheck(this,BoxContainer);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(BoxContainer).apply(this,arguments));}babelHelpers.createClass(BoxContainer,[{key:'render',value:function render()
{
var box=this.props.box;
return (
React.createElement(View,{style:styles.box},
React.createElement(View,{style:styles.row},
React.createElement(Text,{style:[this.props.titleStyle,styles.label]},this.props.title),
React.createElement(Text,{style:styles.boxText},box.top)),

React.createElement(View,{style:styles.row},
React.createElement(Text,{style:styles.boxText},box.left),
this.props.children,
React.createElement(Text,{style:styles.boxText},box.right)),

React.createElement(Text,{style:styles.boxText},box.bottom)));}}]);return BoxContainer;}(React.Component);





var styles=StyleSheet.create({
row:{
flexDirection:'row',
alignItems:'center',
justifyContent:'space-around'},

marginLabel:{
width:60},

label:{
fontSize:10,
color:'rgb(255,100,0)',
marginLeft:5,
flex:1,
textAlign:'left',
top:-3},

buffer:{
fontSize:10,
color:'yellow',
flex:1,
textAlign:'center'},

innerText:{
color:'yellow',
fontSize:12,
textAlign:'center',
width:70},

box:{
borderWidth:1,
borderColor:'grey'},

boxText:{
color:'white',
fontSize:12,
marginHorizontal:3,
marginVertical:2,
textAlign:'center'}});



module.exports=BoxInspector;
});
__d(199 /* StyleInspector */, function(global, require, module, exports) {'use strict';












var React=require(28 /* React */);
var StyleSheet=require(159 /* StyleSheet */);
var Text=require(182 /* Text */);
var View=require(132 /* View */);var 

StyleInspector=function(_React$Component){babelHelpers.inherits(StyleInspector,_React$Component);function StyleInspector(){babelHelpers.classCallCheck(this,StyleInspector);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(StyleInspector).apply(this,arguments));}babelHelpers.createClass(StyleInspector,[{key:'render',value:function render()
{var _this2=this;
if(!this.props.style){
return React.createElement(Text,{style:styles.noStyle},'No style');}

var names=Object.keys(this.props.style);
return (
React.createElement(View,{style:styles.container},
React.createElement(View,null,
names.map(function(name){return React.createElement(Text,{key:name,style:styles.attr},name,':');})),


React.createElement(View,null,
names.map(function(name){
var value=typeof _this2.props.style[name]==='object'?JSON.stringify(_this2.props.style[name]):_this2.props.style[name];
return React.createElement(Text,{key:name,style:styles.value},value);}))));}}]);return StyleInspector;}(React.Component);







var styles=StyleSheet.create({
container:{
flexDirection:'row'},

row:{
flexDirection:'row',
alignItems:'center',
justifyContent:'space-around'},

attr:{
fontSize:10,
color:'#ccc'},

value:{
fontSize:10,
color:'white',
marginLeft:10},

noStyle:{
color:'white',
fontSize:10}});



module.exports=StyleInspector;
});
__d(200 /* TouchableHighlight */, function(global, require, module, exports) {'use strict';














var ColorPropType=require(143 /* ColorPropType */);
var NativeMethodsMixin=require(135 /* NativeMethodsMixin */);
var React=require(28 /* React */);
var ReactNativeViewAttributes=require(155 /* ReactNativeViewAttributes */);
var StyleSheet=require(159 /* StyleSheet */);
var TimerMixin=require(392 /* react-timer-mixin */);
var Touchable=require(183 /* Touchable */);
var TouchableWithoutFeedback=require(187 /* TouchableWithoutFeedback */);
var View=require(132 /* View */);

var ensureComponentIsNative=require(201 /* ensureComponentIsNative */);
var ensurePositiveDelayProps=require(188 /* ensurePositiveDelayProps */);
var keyOf=require(375 /* fbjs/lib/keyOf */);
var merge=require(108 /* merge */);
var onlyChild=require(49 /* onlyChild */);



var DEFAULT_PROPS={
activeOpacity:0.8,
underlayColor:'black'};


var PRESS_RETENTION_OFFSET={top:20,left:20,right:20,bottom:30};




























var TouchableHighlight=React.createClass({displayName:'TouchableHighlight',
propTypes:babelHelpers.extends({},
TouchableWithoutFeedback.propTypes,{




activeOpacity:React.PropTypes.number,




underlayColor:ColorPropType,
style:View.propTypes.style,



onShowUnderlay:React.PropTypes.func,



onHideUnderlay:React.PropTypes.func}),


mixins:[NativeMethodsMixin,TimerMixin,Touchable.Mixin],

getDefaultProps:function getDefaultProps(){return DEFAULT_PROPS;},


_computeSyntheticState:function _computeSyntheticState(props){
return {
activeProps:{
style:{
opacity:props.activeOpacity}},


activeUnderlayProps:{
style:{
backgroundColor:props.underlayColor}},


underlayStyle:[
INACTIVE_UNDERLAY_PROPS.style,
props.style]};},




getInitialState:function getInitialState(){
return merge(
this.touchableGetInitialState(),this._computeSyntheticState(this.props));},



componentDidMount:function componentDidMount(){
ensurePositiveDelayProps(this.props);
ensureComponentIsNative(this.refs[CHILD_REF]);},


componentDidUpdate:function componentDidUpdate(){
ensureComponentIsNative(this.refs[CHILD_REF]);},


componentWillReceiveProps:function componentWillReceiveProps(nextProps){
ensurePositiveDelayProps(nextProps);
if(nextProps.activeOpacity!==this.props.activeOpacity||
nextProps.underlayColor!==this.props.underlayColor||
nextProps.style!==this.props.style){
this.setState(this._computeSyntheticState(nextProps));}},



viewConfig:{
uiViewClassName:'RCTView',
validAttributes:ReactNativeViewAttributes.RCTView},






touchableHandleActivePressIn:function touchableHandleActivePressIn(e){
this.clearTimeout(this._hideTimeout);
this._hideTimeout=null;
this._showUnderlay();
this.props.onPressIn&&this.props.onPressIn(e);},


touchableHandleActivePressOut:function touchableHandleActivePressOut(e){
if(!this._hideTimeout){
this._hideUnderlay();}

this.props.onPressOut&&this.props.onPressOut(e);},


touchableHandlePress:function touchableHandlePress(e){
this.clearTimeout(this._hideTimeout);
this._showUnderlay();
this._hideTimeout=this.setTimeout(this._hideUnderlay,
this.props.delayPressOut||100);
this.props.onPress&&this.props.onPress(e);},


touchableHandleLongPress:function touchableHandleLongPress(e){
this.props.onLongPress&&this.props.onLongPress(e);},


touchableGetPressRectOffset:function touchableGetPressRectOffset(){
return this.props.pressRetentionOffset||PRESS_RETENTION_OFFSET;},


touchableGetHitSlop:function touchableGetHitSlop(){
return this.props.hitSlop;},


touchableGetHighlightDelayMS:function touchableGetHighlightDelayMS(){
return this.props.delayPressIn;},


touchableGetLongPressDelayMS:function touchableGetLongPressDelayMS(){
return this.props.delayLongPress;},


touchableGetPressOutDelayMS:function touchableGetPressOutDelayMS(){
return this.props.delayPressOut;},


_showUnderlay:function _showUnderlay(){
if(!this.isMounted()||!this._hasPressHandler()){
return;}


this.refs[UNDERLAY_REF].setNativeProps(this.state.activeUnderlayProps);
this.refs[CHILD_REF].setNativeProps(this.state.activeProps);
this.props.onShowUnderlay&&this.props.onShowUnderlay();},


_hideUnderlay:function _hideUnderlay(){
this.clearTimeout(this._hideTimeout);
this._hideTimeout=null;
if(this._hasPressHandler()&&this.refs[UNDERLAY_REF]){
this.refs[CHILD_REF].setNativeProps(INACTIVE_CHILD_PROPS);
this.refs[UNDERLAY_REF].setNativeProps(babelHelpers.extends({},
INACTIVE_UNDERLAY_PROPS,{
style:this.state.underlayStyle}));

this.props.onHideUnderlay&&this.props.onHideUnderlay();}},



_hasPressHandler:function _hasPressHandler(){
return !!(
this.props.onPress||
this.props.onPressIn||
this.props.onPressOut||
this.props.onLongPress);},



render:function render(){
return (
React.createElement(View,{
accessible:true,
accessibilityLabel:this.props.accessibilityLabel,
accessibilityComponentType:this.props.accessibilityComponentType,
accessibilityTraits:this.props.accessibilityTraits,
ref:UNDERLAY_REF,
style:this.state.underlayStyle,
onLayout:this.props.onLayout,
hitSlop:this.props.hitSlop,
onStartShouldSetResponder:this.touchableHandleStartShouldSetResponder,
onResponderTerminationRequest:this.touchableHandleResponderTerminationRequest,
onResponderGrant:this.touchableHandleResponderGrant,
onResponderMove:this.touchableHandleResponderMove,
onResponderRelease:this.touchableHandleResponderRelease,
onResponderTerminate:this.touchableHandleResponderTerminate,
testID:this.props.testID},
React.cloneElement(
onlyChild(this.props.children),
{
ref:CHILD_REF}),


Touchable.renderDebugView({color:'green',hitSlop:this.props.hitSlop})));}});





var CHILD_REF=keyOf({childRef:null});
var UNDERLAY_REF=keyOf({underlayRef:null});
var INACTIVE_CHILD_PROPS={
style:StyleSheet.create({x:{opacity:1.0}}).x};

var INACTIVE_UNDERLAY_PROPS={
style:StyleSheet.create({x:{backgroundColor:'transparent'}}).x};


module.exports=TouchableHighlight;
});
__d(201 /* ensureComponentIsNative */, function(global, require, module, exports) {'use strict';












var invariant=require(222 /* fbjs/lib/invariant */);

var ensureComponentIsNative=function ensureComponentIsNative(component){
invariant(
component&&typeof component.setNativeProps==='function',
'Touchable child must either be native or forward setNativeProps to a '+
'native component');};



module.exports=ensureComponentIsNative;
});
__d(375 /* fbjs/lib/keyOf.js */, function(global, require, module, exports) {"use strict";





















var keyOf=function keyOf(oneKeyObj){
var key;
for(key in oneKeyObj){
if(!oneKeyObj.hasOwnProperty(key)){
continue;}

return key;}

return null;};


module.exports=keyOf;
});
__d(202 /* mapWithSeparator */, function(global, require, module, exports) {'use strict';






function mapWithSeparator(array,valueFunction,separatorFunction){
var results=[];
for(var i=0;i<array.length;i++){
results.push(valueFunction(array[i],i,array));
if(i!==array.length-1){
results.push(separatorFunction(i));}}


return results;}


module.exports=mapWithSeparator;
});
__d(203 /* PerformanceOverlay */, function(global, require, module, exports) {'use strict';












var PerformanceLogger=require(96 /* PerformanceLogger */);
var React=require(28 /* React */);
var StyleSheet=require(159 /* StyleSheet */);
var Text=require(182 /* Text */);
var View=require(132 /* View */);

var PerformanceOverlay=React.createClass({displayName:'PerformanceOverlay',
render:function render(){
var perfLogs=PerformanceLogger.getTimespans();
var items=[];

for(var key in perfLogs){
if(perfLogs[key].totalTime){
var unit=key==='BundleSize'?'b':'ms';
items.push(
React.createElement(View,{style:styles.row,key:key},
React.createElement(Text,{style:[styles.text,styles.label]},key),
React.createElement(Text,{style:[styles.text,styles.totalTime]},
perfLogs[key].totalTime+unit)));}}






return (
React.createElement(View,{style:styles.container},
items));}});





var styles=StyleSheet.create({
container:{
height:100,
paddingTop:10},

label:{
flex:1},

row:{
flexDirection:'row',
paddingHorizontal:10},

text:{
color:'white',
fontSize:12},

totalTime:{
paddingRight:100}});



module.exports=PerformanceOverlay;
});
__d(204 /* Portal */, function(global, require, module, exports) {'use strict';












var Platform=require(10 /* Platform */);
var React=require(28 /* React */);
var ReactNative=require(177 /* ReactNative */);
var StyleSheet=require(159 /* StyleSheet */);
var UIManager=require(83 /* UIManager */);
var View=require(132 /* View */);

var _portalRef;


var lastUsedTag=0;













var Portal=React.createClass({displayName:'Portal',
_modals:{},

statics:{






allocateTag:function allocateTag(){
return '__modal_'+ ++lastUsedTag;},








showModal:function showModal(tag,component){
if(!_portalRef){
console.error('Calling showModal but no Portal has been rendered.');
return;}

_portalRef._showModal(tag,component);},







closeModal:function closeModal(tag){
if(!_portalRef){
console.error('Calling closeModal but no Portal has been rendered.');
return;}

_portalRef._closeModal(tag);},





getOpenModals:function getOpenModals(){
if(!_portalRef){
console.error('Calling getOpenModals but no Portal has been rendered.');
return [];}

return _portalRef._getOpenModals();},


notifyAccessibilityService:function notifyAccessibilityService(){
if(!_portalRef){
console.error('Calling closeModal but no Portal has been rendered.');
return;}

_portalRef._notifyAccessibilityService();}},



getInitialState:function getInitialState(){
this._modals={};
return {};},


_showModal:function _showModal(tag,component){


if(this._getOpenModals().length===0){
this.props.onModalVisibilityChanged(true);}


this._modals[tag]=component;
this.forceUpdate();},


_closeModal:function _closeModal(tag){
if(!this._modals.hasOwnProperty(tag)){
return;}



if(this._getOpenModals().length===1){
this.props.onModalVisibilityChanged(false);}


delete this._modals[tag];
this.forceUpdate();},


_getOpenModals:function _getOpenModals(){
return Object.keys(this._modals);},


_notifyAccessibilityService:function _notifyAccessibilityService(){var _this=this;
if(Platform.OS==='android'){


setTimeout(function(){
if(_this._getOpenModals().length>0){
UIManager.sendAccessibilityEvent(
ReactNative.findNodeHandle(_this),
UIManager.AccessibilityEventTypes.typeWindowStateChanged);}},

0);}},



render:function render(){
_portalRef=this;
if(!this._modals){
return null;}

var modals=[];
for(var tag in this._modals){
modals.push(this._modals[tag]);}

if(modals.length===0){
return null;}

return (
React.createElement(View,{
style:styles.modalsContainer,
importantForAccessibility:'yes'},
modals));}});





var styles=StyleSheet.create({
modalsContainer:{
position:'absolute',
left:0,
top:0,
right:0,
bottom:0}});



module.exports=Portal;
});
__d(205 /* YellowBox */, function(global, require, module, exports) {'use strict';













var EventEmitter=require(15 /* EventEmitter */);

var Platform=require(10 /* Platform */);
var React=require(28 /* React */);
var StyleSheet=require(159 /* StyleSheet */);

var _warningEmitter=new EventEmitter();
var _warningMap=new Map();






















if(__DEV__){(function(){var _console=
console;var error=_console.error;var warn=_console.warn;
console.error=function(){
error.apply(console,arguments);

if(typeof arguments[0]==='string'&&
arguments[0].startsWith('Warning: ')){
updateWarningMap.apply(null,arguments);}};


console.warn=function(){
warn.apply(console,arguments);
updateWarningMap.apply(null,arguments);};})();}












function sprintf(format){for(var _len=arguments.length,args=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){args[_key-1]=arguments[_key];}
var index=0;
return format.replace(/%s/g,function(match){return args[index++];});}


function updateWarningMap(format){
var stringifySafe=require(11 /* stringifySafe */);

format=String(format);
var argCount=(format.match(/%s/g)||[]).length;for(var _len2=arguments.length,args=Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++){args[_key2-1]=arguments[_key2];}
var warning=[
sprintf.apply(undefined,[format].concat(babelHelpers.toConsumableArray(args.slice(0,argCount))))].concat(babelHelpers.toConsumableArray(
args.slice(argCount).map(stringifySafe))).
join(' ');

var count=_warningMap.has(warning)?_warningMap.get(warning):0;
_warningMap.set(warning,count+1);
_warningEmitter.emit('warning',_warningMap);}


function isWarningIgnored(warning){
return (
Array.isArray(console.ignoredYellowBox)&&
console.ignoredYellowBox.some(
function(ignorePrefix){return warning.startsWith(ignorePrefix);}));}




var WarningRow=function WarningRow(_ref){var count=_ref.count;var warning=_ref.warning;var onPress=_ref.onPress;
var Text=require(182 /* Text */);
var TouchableHighlight=require(200 /* TouchableHighlight */);
var View=require(132 /* View */);

var countText=count>1?
React.createElement(Text,{style:styles.listRowCount},'('+count+') '):
null;

return (
React.createElement(View,{style:styles.listRow},
React.createElement(TouchableHighlight,{
activeOpacity:0.5,
onPress:onPress,
style:styles.listRowContent,
underlayColor:'transparent'},
React.createElement(Text,{style:styles.listRowText,numberOfLines:2},
countText,
warning))));};






var WarningInspector=function WarningInspector(_ref2)





{var count=_ref2.count;var warning=_ref2.warning;var onClose=_ref2.onClose;var onDismiss=_ref2.onDismiss;var onDismissAll=_ref2.onDismissAll;
var ScrollView=require(175 /* ScrollView */);
var Text=require(182 /* Text */);
var TouchableHighlight=require(200 /* TouchableHighlight */);
var View=require(132 /* View */);

var countSentence=
'Warning encountered '+count+' time'+(count-1?'s':'')+'.';

return (
React.createElement(TouchableHighlight,{
activeOpacity:0.95,
underlayColor:backgroundColor(0.8),
onPress:onClose,
style:styles.inspector},
React.createElement(View,{style:styles.inspectorContent},
React.createElement(View,{style:styles.inspectorCount},
React.createElement(Text,{style:styles.inspectorCountText},countSentence)),

React.createElement(ScrollView,{style:styles.inspectorWarning},
React.createElement(Text,{style:styles.inspectorWarningText},warning)),

React.createElement(View,{style:styles.inspectorButtons},
React.createElement(TouchableHighlight,{
activeOpacity:0.5,
onPress:onDismiss,
style:styles.inspectorButton,
underlayColor:'transparent'},
React.createElement(Text,{style:styles.inspectorButtonText},'Dismiss')),



React.createElement(TouchableHighlight,{
activeOpacity:0.5,
onPress:onDismissAll,
style:styles.inspectorButton,
underlayColor:'transparent'},
React.createElement(Text,{style:styles.inspectorButtonText},'Dismiss All'))))));};var 









YellowBox=function(_React$Component){babelHelpers.inherits(YellowBox,_React$Component);






function YellowBox(props,context){babelHelpers.classCallCheck(this,YellowBox);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(YellowBox).call(this,
props,context));
_this.state={
inspecting:null,
warningMap:_warningMap};

_this.dismissWarning=function(warning){var _this$state=
_this.state;var inspecting=_this$state.inspecting;var warningMap=_this$state.warningMap;
if(warning){
warningMap.delete(warning);}else 
{
warningMap.clear();}

_this.setState({
inspecting:warning&&inspecting!==warning?inspecting:null,
warningMap:warningMap});};return _this;}babelHelpers.createClass(YellowBox,[{key:'componentDidMount',value:function componentDidMount()




{var _this2=this;
var scheduled=null;
this._listener=_warningEmitter.addListener('warning',function(warningMap){


scheduled=scheduled||setImmediate(function(){
scheduled=null;
_this2.setState({
warningMap:warningMap});});});}},{key:'componentWillUnmount',value:function componentWillUnmount()





{
if(this._listener){
this._listener.remove();}}},{key:'render',value:function render()



{var _this3=this;
if(console.disableYellowBox||this.state.warningMap.size===0){
return null;}

var ScrollView=require(175 /* ScrollView */);
var View=require(132 /* View */);

var inspecting=this.state.inspecting;
var inspector=inspecting!==null?
React.createElement(WarningInspector,{
count:this.state.warningMap.get(inspecting),
warning:inspecting,
onClose:function onClose(){return _this3.setState({inspecting:null});},
onDismiss:function onDismiss(){return _this3.dismissWarning(inspecting);},
onDismissAll:function onDismissAll(){return _this3.dismissWarning(null);}}):

null;

var rows=[];
this.state.warningMap.forEach(function(count,warning){
if(!isWarningIgnored(warning)){
rows.push(
React.createElement(WarningRow,{
key:warning,
count:count,
warning:warning,
onPress:function onPress(){return _this3.setState({inspecting:warning});},
onDismiss:function onDismiss(){return _this3.dismissWarning(warning);}}));}});





var listStyle=[
styles.list,

{height:Math.min(rows.length,4.4)*(rowGutter+rowHeight)}];

return (
React.createElement(View,{style:inspector?styles.fullScreen:listStyle},
React.createElement(ScrollView,{style:listStyle,scrollsToTop:false},
rows),

inspector));}}]);return YellowBox;}(React.Component);





var backgroundColor=function backgroundColor(opacity){return 'rgba(250, 186, 48, '+opacity+')';};
var textColor='white';
var rowGutter=1;
var rowHeight=46;

var styles=StyleSheet.create({
fullScreen:{
backgroundColor:'transparent',
position:'absolute',
left:0,
right:0,
top:0,
bottom:0},

inspector:{
backgroundColor:backgroundColor(0.95),
flex:1},

inspectorContainer:{
flex:1},

inspectorButtons:{
flexDirection:'row',
position:'absolute',
left:0,
right:0,
bottom:0},

inspectorButton:{
flex:1,
padding:22},

inspectorButtonText:{
color:textColor,
fontSize:14,
opacity:0.8,
textAlign:'center'},

inspectorContent:{
flex:1,
paddingTop:5},

inspectorCount:{
padding:15,
paddingBottom:0},

inspectorCountText:{
color:textColor,
fontSize:14},

inspectorWarning:{
padding:15,
position:'absolute',
top:39,
bottom:60},

inspectorWarningText:{
color:textColor,
fontSize:16,
fontWeight:'600'},

list:{
backgroundColor:'transparent',
position:'absolute',
left:0,
right:0,
bottom:0},

listRow:{
position:'relative',
backgroundColor:backgroundColor(0.95),
flex:1,
height:rowHeight,
marginTop:rowGutter},

listRowContent:{
flex:1},

listRowCount:{
color:'rgba(255, 255, 255, 0.5)'},

listRowText:{
color:textColor,
position:'absolute',
left:0,
top:Platform.OS==='android'?5:7,
marginLeft:15,
marginRight:15}});



module.exports=YellowBox;
});
__d(206 /* BackAndroid */, function(global, require, module, exports) {'use strict';












var DeviceEventManager=require(9 /* NativeModules */).DeviceEventManager;
var RCTDeviceEventEmitter=require(14 /* RCTDeviceEventEmitter */);

var DEVICE_BACK_EVENT='hardwareBackPress';





var _backPressSubscriptions=new Set();

RCTDeviceEventEmitter.addListener(DEVICE_BACK_EVENT,function(){
var backPressSubscriptions=new Set(_backPressSubscriptions);
var invokeDefault=true;
backPressSubscriptions.forEach(function(subscription){
if(subscription()){
invokeDefault=false;}});


if(invokeDefault){
BackAndroid.exitApp();}});



















var BackAndroid={

exitApp:function exitApp(){
DeviceEventManager.invokeDefaultBackPressHandler();},


addEventListener:function addEventListener(
eventName,
handler)
{
_backPressSubscriptions.add(handler);
return {
remove:function remove(){return BackAndroid.removeEventListener(eventName,handler);}};},



removeEventListener:function removeEventListener(
eventName,
handler)
{
_backPressSubscriptions.delete(handler);}};




module.exports=BackAndroid;
});
__d(207 /* RCTRenderingPerf */, function(global, require, module, exports) {'use strict';












var ReactDefaultPerf=require(208 /* ReactDefaultPerf */);

var invariant=require(222 /* fbjs/lib/invariant */);






var perfModules=[];
var enabled=false;

var RCTRenderingPerf={

toggle:function toggle(){
console.log('Render perfomance measurements enabled');
enabled=true;},


start:function start(){
if(!enabled){
return;}


ReactDefaultPerf.start();
perfModules.forEach(function(module){return module.start();});},


stop:function stop(){
if(!enabled){
return;}


ReactDefaultPerf.stop();
ReactDefaultPerf.printInclusive();
ReactDefaultPerf.printWasted();

var totalRender=0;
var totalTime=0;
var measurements=ReactDefaultPerf.getLastMeasurements();
for(var ii=0;ii<measurements.length;ii++){
var render=measurements[ii].render;
for(var nodeName in render){
totalRender+=render[nodeName];}

totalTime+=measurements[ii].totalTime;}

console.log('Total time spent in render(): '+totalRender+'ms');

perfModules.forEach(function(module){return module.stop();});},


register:function register(module){
invariant(
typeof module.start==='function',
'Perf module should have start() function');

invariant(
typeof module.stop==='function',
'Perf module should have stop() function');

perfModules.push(module);}};



module.exports=RCTRenderingPerf;
});
__d(208 /* ReactDefaultPerf */, function(global, require, module, exports) {'use strict';













var DOMProperty=require(209 /* ./DOMProperty */);
var ReactDefaultPerfAnalysis=require(210 /* ./ReactDefaultPerfAnalysis */);
var ReactMount=require(211 /* ./ReactMount */);
var ReactPerf=require(5 /* ./ReactPerf */);

var performanceNow=require(388 /* fbjs/lib/performanceNow */);

function roundFloat(val){
return Math.floor(val*100)/100;}


function addValue(obj,key,val){
obj[key]=(obj[key]||0)+val;}


var ReactDefaultPerf={
_allMeasurements:[],
_mountStack:[0],
_injected:false,

start:function start(){
if(!ReactDefaultPerf._injected){
ReactPerf.injection.injectMeasure(ReactDefaultPerf.measure);}


ReactDefaultPerf._allMeasurements.length=0;
ReactPerf.enableMeasure=true;},


stop:function stop(){
ReactPerf.enableMeasure=false;},


getLastMeasurements:function getLastMeasurements(){
return ReactDefaultPerf._allMeasurements;},


printExclusive:function printExclusive(measurements){
measurements=measurements||ReactDefaultPerf._allMeasurements;
var summary=ReactDefaultPerfAnalysis.getExclusiveSummary(measurements);
console.table(summary.map(function(item){
return {
'Component class name':item.componentName,
'Total inclusive time (ms)':roundFloat(item.inclusive),
'Exclusive mount time (ms)':roundFloat(item.exclusive),
'Exclusive render time (ms)':roundFloat(item.render),
'Mount time per instance (ms)':roundFloat(item.exclusive/item.count),
'Render time per instance (ms)':roundFloat(item.render/item.count),
'Instances':item.count};}));},






printInclusive:function printInclusive(measurements){
measurements=measurements||ReactDefaultPerf._allMeasurements;
var summary=ReactDefaultPerfAnalysis.getInclusiveSummary(measurements);
console.table(summary.map(function(item){
return {
'Owner > component':item.componentName,
'Inclusive time (ms)':roundFloat(item.time),
'Instances':item.count};}));


console.log('Total time:',ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2)+' ms');},


getMeasurementsSummaryMap:function getMeasurementsSummaryMap(measurements){
var summary=ReactDefaultPerfAnalysis.getInclusiveSummary(measurements,true);
return summary.map(function(item){
return {
'Owner > component':item.componentName,
'Wasted time (ms)':item.time,
'Instances':item.count};});},




printWasted:function printWasted(measurements){
measurements=measurements||ReactDefaultPerf._allMeasurements;
console.table(ReactDefaultPerf.getMeasurementsSummaryMap(measurements));
console.log('Total time:',ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2)+' ms');},


printDOM:function printDOM(measurements){
measurements=measurements||ReactDefaultPerf._allMeasurements;
var summary=ReactDefaultPerfAnalysis.getDOMSummary(measurements);
console.table(summary.map(function(item){
var result={};
result[DOMProperty.ID_ATTRIBUTE_NAME]=item.id;
result.type=item.type;
result.args=JSON.stringify(item.args);
return result;}));

console.log('Total time:',ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2)+' ms');},


_recordWrite:function _recordWrite(id,fnName,totalTime,args){

var writes=ReactDefaultPerf._allMeasurements[ReactDefaultPerf._allMeasurements.length-1].writes;
writes[id]=writes[id]||[];
writes[id].push({
type:fnName,
time:totalTime,
args:args});},



measure:function measure(moduleName,fnName,func){
return function(){
for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){
args[_key]=arguments[_key];}


var totalTime;
var rv;
var start;

if(fnName==='_renderNewRootComponent'||fnName==='flushBatchedUpdates'){




ReactDefaultPerf._allMeasurements.push({
exclusive:{},
inclusive:{},
render:{},
counts:{},
writes:{},
displayNames:{},
totalTime:0,
created:{}});

start=performanceNow();
rv=func.apply(this,args);
ReactDefaultPerf._allMeasurements[ReactDefaultPerf._allMeasurements.length-1].totalTime=performanceNow()-start;
return rv;}else 
if(fnName==='_mountImageIntoNode'||moduleName==='ReactBrowserEventEmitter'||moduleName==='ReactDOMIDOperations'||moduleName==='CSSPropertyOperations'||moduleName==='DOMChildrenOperations'||moduleName==='DOMPropertyOperations'){
start=performanceNow();
rv=func.apply(this,args);
totalTime=performanceNow()-start;

if(fnName==='_mountImageIntoNode'){
var mountID=ReactMount.getID(args[1]);
ReactDefaultPerf._recordWrite(mountID,fnName,totalTime,args[0]);}else 
if(fnName==='dangerouslyProcessChildrenUpdates'){

args[0].forEach(function(update){
var writeArgs={};
if(update.fromIndex!==null){
writeArgs.fromIndex=update.fromIndex;}

if(update.toIndex!==null){
writeArgs.toIndex=update.toIndex;}

if(update.textContent!==null){
writeArgs.textContent=update.textContent;}

if(update.markupIndex!==null){
writeArgs.markup=args[1][update.markupIndex];}

ReactDefaultPerf._recordWrite(update.parentID,update.type,totalTime,writeArgs);});}else 

{

var id=args[0];
if(typeof id==='object'){
id=ReactMount.getID(args[0]);}

ReactDefaultPerf._recordWrite(id,fnName,totalTime,Array.prototype.slice.call(args,1));}

return rv;}else 
if(moduleName==='ReactCompositeComponent'&&(fnName==='mountComponent'||fnName==='updateComponent'||
fnName==='_renderValidatedComponent')){

if(this._currentElement.type===ReactMount.TopLevelWrapper){
return func.apply(this,args);}


var rootNodeID=fnName==='mountComponent'?args[0]:this._rootNodeID;
var isRender=fnName==='_renderValidatedComponent';
var isMount=fnName==='mountComponent';

var mountStack=ReactDefaultPerf._mountStack;
var entry=ReactDefaultPerf._allMeasurements[ReactDefaultPerf._allMeasurements.length-1];

if(isRender){
addValue(entry.counts,rootNodeID,1);}else 
if(isMount){
entry.created[rootNodeID]=true;
mountStack.push(0);}


start=performanceNow();
rv=func.apply(this,args);
totalTime=performanceNow()-start;

if(isRender){
addValue(entry.render,rootNodeID,totalTime);}else 
if(isMount){
var subMountTime=mountStack.pop();
mountStack[mountStack.length-1]+=totalTime;
addValue(entry.exclusive,rootNodeID,totalTime-subMountTime);
addValue(entry.inclusive,rootNodeID,totalTime);}else 
{
addValue(entry.inclusive,rootNodeID,totalTime);}


entry.displayNames[rootNodeID]={
current:this.getName(),
owner:this._currentElement._owner?this._currentElement._owner.getName():'<root>'};


return rv;}else 
{
return func.apply(this,args);}};}};





module.exports=ReactDefaultPerf;
});
__d(209 /* DOMProperty */, function(global, require, module, exports) {'use strict';













var invariant=require(242 /* fbjs/lib/invariant */);

function checkMask(value,bitmask){
return (value&bitmask)===bitmask;}


var DOMPropertyInjection={




MUST_USE_ATTRIBUTE:0x1,
MUST_USE_PROPERTY:0x2,
HAS_SIDE_EFFECTS:0x4,
HAS_BOOLEAN_VALUE:0x8,
HAS_NUMERIC_VALUE:0x10,
HAS_POSITIVE_NUMERIC_VALUE:0x20|0x10,
HAS_OVERLOADED_BOOLEAN_VALUE:0x40,





























injectDOMPropertyConfig:function injectDOMPropertyConfig(domPropertyConfig){
var Injection=DOMPropertyInjection;
var Properties=domPropertyConfig.Properties||{};
var DOMAttributeNamespaces=domPropertyConfig.DOMAttributeNamespaces||{};
var DOMAttributeNames=domPropertyConfig.DOMAttributeNames||{};
var DOMPropertyNames=domPropertyConfig.DOMPropertyNames||{};
var DOMMutationMethods=domPropertyConfig.DOMMutationMethods||{};

if(domPropertyConfig.isCustomAttribute){
DOMProperty._isCustomAttributeFunctions.push(domPropertyConfig.isCustomAttribute);}


for(var propName in Properties){
!!DOMProperty.properties.hasOwnProperty(propName)?process.env.NODE_ENV!=='production'?invariant(false,'injectDOMPropertyConfig(...): You\'re trying to inject DOM property '+'\'%s\' which has already been injected. You may be accidentally '+'injecting the same DOM property config twice, or you may be '+'injecting two configs that have conflicting property names.',propName):invariant(false):undefined;

var lowerCased=propName.toLowerCase();
var propConfig=Properties[propName];

var propertyInfo={
attributeName:lowerCased,
attributeNamespace:null,
propertyName:propName,
mutationMethod:null,

mustUseAttribute:checkMask(propConfig,Injection.MUST_USE_ATTRIBUTE),
mustUseProperty:checkMask(propConfig,Injection.MUST_USE_PROPERTY),
hasSideEffects:checkMask(propConfig,Injection.HAS_SIDE_EFFECTS),
hasBooleanValue:checkMask(propConfig,Injection.HAS_BOOLEAN_VALUE),
hasNumericValue:checkMask(propConfig,Injection.HAS_NUMERIC_VALUE),
hasPositiveNumericValue:checkMask(propConfig,Injection.HAS_POSITIVE_NUMERIC_VALUE),
hasOverloadedBooleanValue:checkMask(propConfig,Injection.HAS_OVERLOADED_BOOLEAN_VALUE)};


!(!propertyInfo.mustUseAttribute||!propertyInfo.mustUseProperty)?process.env.NODE_ENV!=='production'?invariant(false,'DOMProperty: Cannot require using both attribute and property: %s',propName):invariant(false):undefined;
!(propertyInfo.mustUseProperty||!propertyInfo.hasSideEffects)?process.env.NODE_ENV!=='production'?invariant(false,'DOMProperty: Properties that have side effects must use property: %s',propName):invariant(false):undefined;
!(propertyInfo.hasBooleanValue+propertyInfo.hasNumericValue+propertyInfo.hasOverloadedBooleanValue<=1)?process.env.NODE_ENV!=='production'?invariant(false,'DOMProperty: Value can be one of boolean, overloaded boolean, or '+'numeric value, but not a combination: %s',propName):invariant(false):undefined;

if(process.env.NODE_ENV!=='production'){
DOMProperty.getPossibleStandardName[lowerCased]=propName;}


if(DOMAttributeNames.hasOwnProperty(propName)){
var attributeName=DOMAttributeNames[propName];
propertyInfo.attributeName=attributeName;
if(process.env.NODE_ENV!=='production'){
DOMProperty.getPossibleStandardName[attributeName]=propName;}}



if(DOMAttributeNamespaces.hasOwnProperty(propName)){
propertyInfo.attributeNamespace=DOMAttributeNamespaces[propName];}


if(DOMPropertyNames.hasOwnProperty(propName)){
propertyInfo.propertyName=DOMPropertyNames[propName];}


if(DOMMutationMethods.hasOwnProperty(propName)){
propertyInfo.mutationMethod=DOMMutationMethods[propName];}


DOMProperty.properties[propName]=propertyInfo;}}};



var defaultValueCache={};














var DOMProperty={

ID_ATTRIBUTE_NAME:'data-reactid',





































properties:{},






getPossibleStandardName:process.env.NODE_ENV!=='production'?{}:null,




_isCustomAttributeFunctions:[],





isCustomAttribute:function isCustomAttribute(attributeName){
for(var i=0;i<DOMProperty._isCustomAttributeFunctions.length;i++){
var isCustomAttributeFn=DOMProperty._isCustomAttributeFunctions[i];
if(isCustomAttributeFn(attributeName)){
return true;}}


return false;},










getDefaultValueForProperty:function getDefaultValueForProperty(nodeName,prop){
var nodeDefaults=defaultValueCache[nodeName];
var testElement;
if(!nodeDefaults){
defaultValueCache[nodeName]=nodeDefaults={};}

if(!(prop in nodeDefaults)){
testElement=document.createElement(nodeName);
nodeDefaults[prop]=testElement[prop];}

return nodeDefaults[prop];},


injection:DOMPropertyInjection};


module.exports=DOMProperty;
});
__d(210 /* ReactDefaultPerfAnalysis */, function(global, require, module, exports) {'use strict';












var assign=require(34 /* ./Object.assign */);


var DONT_CARE_THRESHOLD=1.2;
var DOM_OPERATION_TYPES={
'_mountImageIntoNode':'set innerHTML',
INSERT_MARKUP:'set innerHTML',
MOVE_EXISTING:'move',
REMOVE_NODE:'remove',
SET_MARKUP:'set innerHTML',
TEXT_CONTENT:'set textContent',
'setValueForProperty':'update attribute',
'setValueForAttribute':'update attribute',
'deleteValueForProperty':'remove attribute',
'setValueForStyles':'update styles',
'replaceNodeWithMarkup':'replace',
'updateTextContent':'set textContent'};


function getTotalTime(measurements){




var totalTime=0;
for(var i=0;i<measurements.length;i++){
var measurement=measurements[i];
totalTime+=measurement.totalTime;}

return totalTime;}


function getDOMSummary(measurements){
var items=[];
measurements.forEach(function(measurement){
Object.keys(measurement.writes).forEach(function(id){
measurement.writes[id].forEach(function(write){
items.push({
id:id,
type:DOM_OPERATION_TYPES[write.type]||write.type,
args:write.args});});});});




return items;}


function getExclusiveSummary(measurements){
var candidates={};
var displayName;

for(var i=0;i<measurements.length;i++){
var measurement=measurements[i];
var allIDs=assign({},measurement.exclusive,measurement.inclusive);

for(var id in allIDs){
displayName=measurement.displayNames[id].current;

candidates[displayName]=candidates[displayName]||{
componentName:displayName,
inclusive:0,
exclusive:0,
render:0,
count:0};

if(measurement.render[id]){
candidates[displayName].render+=measurement.render[id];}

if(measurement.exclusive[id]){
candidates[displayName].exclusive+=measurement.exclusive[id];}

if(measurement.inclusive[id]){
candidates[displayName].inclusive+=measurement.inclusive[id];}

if(measurement.counts[id]){
candidates[displayName].count+=measurement.counts[id];}}}





var arr=[];
for(displayName in candidates){
if(candidates[displayName].exclusive>=DONT_CARE_THRESHOLD){
arr.push(candidates[displayName]);}}



arr.sort(function(a,b){
return b.exclusive-a.exclusive;});


return arr;}


function getInclusiveSummary(measurements,onlyClean){
var candidates={};
var inclusiveKey;

for(var i=0;i<measurements.length;i++){
var measurement=measurements[i];
var allIDs=assign({},measurement.exclusive,measurement.inclusive);
var cleanComponents;

if(onlyClean){
cleanComponents=getUnchangedComponents(measurement);}


for(var id in allIDs){
if(onlyClean&&!cleanComponents[id]){
continue;}


var displayName=measurement.displayNames[id];




inclusiveKey=displayName.owner+' > '+displayName.current;

candidates[inclusiveKey]=candidates[inclusiveKey]||{
componentName:inclusiveKey,
time:0,
count:0};


if(measurement.inclusive[id]){
candidates[inclusiveKey].time+=measurement.inclusive[id];}

if(measurement.counts[id]){
candidates[inclusiveKey].count+=measurement.counts[id];}}}





var arr=[];
for(inclusiveKey in candidates){
if(candidates[inclusiveKey].time>=DONT_CARE_THRESHOLD){
arr.push(candidates[inclusiveKey]);}}



arr.sort(function(a,b){
return b.time-a.time;});


return arr;}


function getUnchangedComponents(measurement){



var cleanComponents={};
var dirtyLeafIDs=Object.keys(measurement.writes);
var allIDs=assign({},measurement.exclusive,measurement.inclusive);

for(var id in allIDs){
var isDirty=false;


for(var i=0;i<dirtyLeafIDs.length;i++){
if(dirtyLeafIDs[i].indexOf(id)===0){
isDirty=true;
break;}}



if(measurement.created[id]){
isDirty=true;}

if(!isDirty&&measurement.counts[id]>0){
cleanComponents[id]=true;}}


return cleanComponents;}


var ReactDefaultPerfAnalysis={
getExclusiveSummary:getExclusiveSummary,
getInclusiveSummary:getInclusiveSummary,
getDOMSummary:getDOMSummary,
getTotalTime:getTotalTime};


module.exports=ReactDefaultPerfAnalysis;
});
__d(211 /* ReactMount */, function(global, require, module, exports) {'use strict';












var DOMProperty=require(209 /* ./DOMProperty */);
var ReactBrowserEventEmitter=require(212 /* ./ReactBrowserEventEmitter */);
var ReactCurrentOwner=require(33 /* ./ReactCurrentOwner */);
var ReactDOMFeatureFlags=require(215 /* ./ReactDOMFeatureFlags */);
var ReactElement=require(32 /* ./ReactElement */);
var ReactEmptyComponentRegistry=require(90 /* ./ReactEmptyComponentRegistry */);
var ReactInstanceHandles=require(37 /* ./ReactInstanceHandles */);
var ReactInstanceMap=require(79 /* ./ReactInstanceMap */);
var ReactMarkupChecksum=require(216 /* ./ReactMarkupChecksum */);
var ReactPerf=require(5 /* ./ReactPerf */);
var ReactReconciler=require(75 /* ./ReactReconciler */);
var ReactUpdateQueue=require(78 /* ./ReactUpdateQueue */);
var ReactUpdates=require(80 /* ./ReactUpdates */);

var assign=require(34 /* ./Object.assign */);
var emptyObject=require(230 /* fbjs/lib/emptyObject */);
var containsNode=require(385 /* fbjs/lib/containsNode */);
var instantiateReactComponent=require(85 /* ./instantiateReactComponent */);
var invariant=require(242 /* fbjs/lib/invariant */);
var setInnerHTML=require(218 /* ./setInnerHTML */);
var shouldUpdateReactComponent=require(88 /* ./shouldUpdateReactComponent */);
var validateDOMNesting=require(219 /* ./validateDOMNesting */);
var warning=require(240 /* fbjs/lib/warning */);

var ATTR_NAME=DOMProperty.ID_ATTRIBUTE_NAME;
var nodeCache={};

var ELEMENT_NODE_TYPE=1;
var DOC_NODE_TYPE=9;
var DOCUMENT_FRAGMENT_NODE_TYPE=11;

var ownerDocumentContextKey='__ReactMount_ownerDocument$'+Math.random().toString(36).slice(2);


var instancesByReactRootID={};


var containersByReactRootID={};

if(process.env.NODE_ENV!=='production'){

var rootElementsByReactRootID={};}



var findComponentRootReusableArray=[];







function firstDifferenceIndex(string1,string2){
var minLen=Math.min(string1.length,string2.length);
for(var i=0;i<minLen;i++){
if(string1.charAt(i)!==string2.charAt(i)){
return i;}}


return string1.length===string2.length?-1:minLen;}







function getReactRootElementInContainer(container){
if(!container){
return null;}


if(container.nodeType===DOC_NODE_TYPE){
return container.documentElement;}else 
{
return container.firstChild;}}







function getReactRootID(container){
var rootElement=getReactRootElementInContainer(container);
return rootElement&&ReactMount.getID(rootElement);}












function getID(node){
var id=internalGetID(node);
if(id){
if(nodeCache.hasOwnProperty(id)){
var cached=nodeCache[id];
if(cached!==node){
!!isValid(cached,id)?process.env.NODE_ENV!=='production'?invariant(false,'ReactMount: Two valid but unequal nodes with the same `%s`: %s',ATTR_NAME,id):invariant(false):undefined;

nodeCache[id]=node;}}else 

{
nodeCache[id]=node;}}



return id;}


function internalGetID(node){



return node&&node.getAttribute&&node.getAttribute(ATTR_NAME)||'';}








function setID(node,id){
var oldID=internalGetID(node);
if(oldID!==id){
delete nodeCache[oldID];}

node.setAttribute(ATTR_NAME,id);
nodeCache[id]=node;}









function getNode(id){
if(!nodeCache.hasOwnProperty(id)||!isValid(nodeCache[id],id)){
nodeCache[id]=ReactMount.findReactNodeByID(id);}

return nodeCache[id];}









function getNodeFromInstance(instance){
var id=ReactInstanceMap.get(instance)._rootNodeID;
if(ReactEmptyComponentRegistry.isNullComponentID(id)){
return null;}

if(!nodeCache.hasOwnProperty(id)||!isValid(nodeCache[id],id)){
nodeCache[id]=ReactMount.findReactNodeByID(id);}

return nodeCache[id];}












function isValid(node,id){
if(node){
!(internalGetID(node)===id)?process.env.NODE_ENV!=='production'?invariant(false,'ReactMount: Unexpected modification of `%s`',ATTR_NAME):invariant(false):undefined;

var container=ReactMount.findReactContainerForID(id);
if(container&&containsNode(container,node)){
return true;}}



return false;}







function purgeID(id){
delete nodeCache[id];}


var deepestNodeSoFar=null;
function findDeepestCachedAncestorImpl(ancestorID){
var ancestor=nodeCache[ancestorID];
if(ancestor&&isValid(ancestor,ancestorID)){
deepestNodeSoFar=ancestor;}else 
{


return false;}}






function findDeepestCachedAncestor(targetID){
deepestNodeSoFar=null;
ReactInstanceHandles.traverseAncestors(targetID,findDeepestCachedAncestorImpl);

var foundNode=deepestNodeSoFar;
deepestNodeSoFar=null;
return foundNode;}











function mountComponentIntoNode(componentInstance,rootID,container,transaction,shouldReuseMarkup,context){
if(ReactDOMFeatureFlags.useCreateElement){
context=assign({},context);
if(container.nodeType===DOC_NODE_TYPE){
context[ownerDocumentContextKey]=container;}else 
{
context[ownerDocumentContextKey]=container.ownerDocument;}}


if(process.env.NODE_ENV!=='production'){
if(context===emptyObject){
context={};}

var tag=container.nodeName.toLowerCase();
context[validateDOMNesting.ancestorInfoContextKey]=validateDOMNesting.updatedAncestorInfo(null,tag,null);}

var markup=ReactReconciler.mountComponent(componentInstance,rootID,transaction,context);
componentInstance._renderedComponent._topLevelWrapper=componentInstance;
ReactMount._mountImageIntoNode(markup,container,shouldReuseMarkup,transaction);}










function batchedMountComponentIntoNode(componentInstance,rootID,container,shouldReuseMarkup,context){
var transaction=ReactUpdates.ReactReconcileTransaction.getPooled(
shouldReuseMarkup);
transaction.perform(mountComponentIntoNode,null,componentInstance,rootID,container,transaction,shouldReuseMarkup,context);
ReactUpdates.ReactReconcileTransaction.release(transaction);}











function unmountComponentFromNode(instance,container){
ReactReconciler.unmountComponent(instance);

if(container.nodeType===DOC_NODE_TYPE){
container=container.documentElement;}



while(container.lastChild){
container.removeChild(container.lastChild);}}













function hasNonRootReactChild(node){
var reactRootID=getReactRootID(node);
return reactRootID?reactRootID!==ReactInstanceHandles.getReactRootIDFromNodeID(reactRootID):false;}






function findFirstReactDOMImpl(node){


for(;node&&node.parentNode!==node;node=node.parentNode){
if(node.nodeType!==1){

continue;}

var nodeID=internalGetID(node);
if(!nodeID){
continue;}

var reactRootID=ReactInstanceHandles.getReactRootIDFromNodeID(nodeID);





var current=node;
var lastID;
do {
lastID=internalGetID(current);
current=current.parentNode;
if(current==null){


return null;}}while(

lastID!==reactRootID);

if(current===containersByReactRootID[reactRootID]){
return node;}}


return null;}







var TopLevelWrapper=function TopLevelWrapper(){};
TopLevelWrapper.prototype.isReactComponent={};
if(process.env.NODE_ENV!=='production'){
TopLevelWrapper.displayName='TopLevelWrapper';}

TopLevelWrapper.prototype.render=function(){

return this.props;};




















var ReactMount={

TopLevelWrapper:TopLevelWrapper,


_instancesByReactRootID:instancesByReactRootID,









scrollMonitor:function scrollMonitor(container,renderCallback){
renderCallback();},









_updateRootComponent:function _updateRootComponent(prevComponent,nextElement,container,callback){
ReactMount.scrollMonitor(container,function(){
ReactUpdateQueue.enqueueElementInternal(prevComponent,nextElement);
if(callback){
ReactUpdateQueue.enqueueCallbackInternal(prevComponent,callback);}});



if(process.env.NODE_ENV!=='production'){

rootElementsByReactRootID[getReactRootID(container)]=getReactRootElementInContainer(container);}


return prevComponent;},









_registerComponent:function _registerComponent(nextComponent,container){
!(container&&(container.nodeType===ELEMENT_NODE_TYPE||container.nodeType===DOC_NODE_TYPE||container.nodeType===DOCUMENT_FRAGMENT_NODE_TYPE))?process.env.NODE_ENV!=='production'?invariant(false,'_registerComponent(...): Target container is not a DOM element.'):invariant(false):undefined;

ReactBrowserEventEmitter.ensureScrollValueMonitoring();

var reactRootID=ReactMount.registerContainer(container);
instancesByReactRootID[reactRootID]=nextComponent;
return reactRootID;},









_renderNewRootComponent:function _renderNewRootComponent(nextElement,container,shouldReuseMarkup,context){



process.env.NODE_ENV!=='production'?warning(ReactCurrentOwner.current==null,'_renderNewRootComponent(): Render methods should be a pure function '+'of props and state; triggering nested component updates from '+'render is not allowed. If necessary, trigger nested updates in '+'componentDidUpdate. Check the render method of %s.',ReactCurrentOwner.current&&ReactCurrentOwner.current.getName()||'ReactCompositeComponent'):undefined;

var componentInstance=instantiateReactComponent(nextElement,null);
var reactRootID=ReactMount._registerComponent(componentInstance,container);





ReactUpdates.batchedUpdates(batchedMountComponentIntoNode,componentInstance,reactRootID,container,shouldReuseMarkup,context);

if(process.env.NODE_ENV!=='production'){

rootElementsByReactRootID[reactRootID]=getReactRootElementInContainer(container);}


return componentInstance;},















renderSubtreeIntoContainer:function renderSubtreeIntoContainer(parentComponent,nextElement,container,callback){
!(parentComponent!=null&&parentComponent._reactInternalInstance!=null)?process.env.NODE_ENV!=='production'?invariant(false,'parentComponent must be a valid React Component'):invariant(false):undefined;
return ReactMount._renderSubtreeIntoContainer(parentComponent,nextElement,container,callback);},


_renderSubtreeIntoContainer:function _renderSubtreeIntoContainer(parentComponent,nextElement,container,callback){
!ReactElement.isValidElement(nextElement)?process.env.NODE_ENV!=='production'?invariant(false,'ReactDOM.render(): Invalid component element.%s',typeof nextElement==='string'?' Instead of passing an element string, make sure to instantiate '+'it by passing it to React.createElement.':typeof nextElement==='function'?' Instead of passing a component class, make sure to instantiate '+'it by passing it to React.createElement.':

nextElement!=null&&nextElement.props!==undefined?' This may be caused by unintentionally loading two independent '+'copies of React.':''):invariant(false):undefined;

process.env.NODE_ENV!=='production'?warning(!container||!container.tagName||container.tagName.toUpperCase()!=='BODY','render(): Rendering components directly into document.body is '+'discouraged, since its children are often manipulated by third-party '+'scripts and browser extensions. This may lead to subtle '+'reconciliation issues. Try rendering into a container element created '+'for your app.'):undefined;

var nextWrappedElement=new ReactElement(TopLevelWrapper,null,null,null,null,null,nextElement);

var prevComponent=instancesByReactRootID[getReactRootID(container)];

if(prevComponent){
var prevWrappedElement=prevComponent._currentElement;
var prevElement=prevWrappedElement.props;
if(shouldUpdateReactComponent(prevElement,nextElement)){
var publicInst=prevComponent._renderedComponent.getPublicInstance();
var updatedCallback=callback&&function(){
callback.call(publicInst);};

ReactMount._updateRootComponent(prevComponent,nextWrappedElement,container,updatedCallback);
return publicInst;}else 
{
ReactMount.unmountComponentAtNode(container);}}



var reactRootElement=getReactRootElementInContainer(container);
var containerHasReactMarkup=reactRootElement&&!!internalGetID(reactRootElement);
var containerHasNonRootReactChild=hasNonRootReactChild(container);

if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(!containerHasNonRootReactChild,'render(...): Replacing React-rendered children with a new root '+'component. If you intended to update the children of this node, '+'you should instead have the existing children update their state '+'and render the new components instead of calling ReactDOM.render.'):undefined;

if(!containerHasReactMarkup||reactRootElement.nextSibling){
var rootElementSibling=reactRootElement;
while(rootElementSibling){
if(internalGetID(rootElementSibling)){
process.env.NODE_ENV!=='production'?warning(false,'render(): Target node has markup rendered by React, but there '+'are unrelated nodes as well. This is most commonly caused by '+'white-space inserted around server-rendered markup.'):undefined;
break;}

rootElementSibling=rootElementSibling.nextSibling;}}}




var shouldReuseMarkup=containerHasReactMarkup&&!prevComponent&&!containerHasNonRootReactChild;
var component=ReactMount._renderNewRootComponent(nextWrappedElement,container,shouldReuseMarkup,parentComponent!=null?parentComponent._reactInternalInstance._processChildContext(parentComponent._reactInternalInstance._context):emptyObject)._renderedComponent.getPublicInstance();
if(callback){
callback.call(component);}

return component;},














render:function render(nextElement,container,callback){
return ReactMount._renderSubtreeIntoContainer(null,nextElement,container,callback);},










registerContainer:function registerContainer(container){
var reactRootID=getReactRootID(container);
if(reactRootID){

reactRootID=ReactInstanceHandles.getReactRootIDFromNodeID(reactRootID);}

if(!reactRootID){

reactRootID=ReactInstanceHandles.createReactRootID();}

containersByReactRootID[reactRootID]=container;
return reactRootID;},









unmountComponentAtNode:function unmountComponentAtNode(container){




process.env.NODE_ENV!=='production'?warning(ReactCurrentOwner.current==null,'unmountComponentAtNode(): Render methods should be a pure function '+'of props and state; triggering nested component updates from render '+'is not allowed. If necessary, trigger nested updates in '+'componentDidUpdate. Check the render method of %s.',ReactCurrentOwner.current&&ReactCurrentOwner.current.getName()||'ReactCompositeComponent'):undefined;

!(container&&(container.nodeType===ELEMENT_NODE_TYPE||container.nodeType===DOC_NODE_TYPE||container.nodeType===DOCUMENT_FRAGMENT_NODE_TYPE))?process.env.NODE_ENV!=='production'?invariant(false,'unmountComponentAtNode(...): Target container is not a DOM element.'):invariant(false):undefined;

var reactRootID=getReactRootID(container);
var component=instancesByReactRootID[reactRootID];
if(!component){


var containerHasNonRootReactChild=hasNonRootReactChild(container);


var containerID=internalGetID(container);
var isContainerReactRoot=containerID&&containerID===ReactInstanceHandles.getReactRootIDFromNodeID(containerID);

if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(!containerHasNonRootReactChild,'unmountComponentAtNode(): The node you\'re attempting to unmount '+'was rendered by React and is not a top-level container. %s',isContainerReactRoot?'You may have accidentally passed in a React root node instead '+'of its container.':'Instead, have the parent component update its state and '+'rerender in order to remove this component.'):undefined;}


return false;}

ReactUpdates.batchedUpdates(unmountComponentFromNode,component,container);
delete instancesByReactRootID[reactRootID];
delete containersByReactRootID[reactRootID];
if(process.env.NODE_ENV!=='production'){
delete rootElementsByReactRootID[reactRootID];}

return true;},









findReactContainerForID:function findReactContainerForID(id){
var reactRootID=ReactInstanceHandles.getReactRootIDFromNodeID(id);
var container=containersByReactRootID[reactRootID];

if(process.env.NODE_ENV!=='production'){
var rootElement=rootElementsByReactRootID[reactRootID];
if(rootElement&&rootElement.parentNode!==container){
process.env.NODE_ENV!=='production'?warning(


internalGetID(rootElement)===reactRootID,'ReactMount: Root element ID differed from reactRootID.'):undefined;
var containerChild=container.firstChild;
if(containerChild&&reactRootID===internalGetID(containerChild)){




rootElementsByReactRootID[reactRootID]=containerChild;}else 
{
process.env.NODE_ENV!=='production'?warning(false,'ReactMount: Root element has been removed from its original '+'container. New container: %s',rootElement.parentNode):undefined;}}}




return container;},








findReactNodeByID:function findReactNodeByID(id){
var reactRoot=ReactMount.findReactContainerForID(id);
return ReactMount.findComponentRoot(reactRoot,id);},










getFirstReactDOM:function getFirstReactDOM(node){
return findFirstReactDOMImpl(node);},












findComponentRoot:function findComponentRoot(ancestorNode,targetID){
var firstChildren=findComponentRootReusableArray;
var childIndex=0;

var deepestAncestor=findDeepestCachedAncestor(targetID)||ancestorNode;

if(process.env.NODE_ENV!=='production'){

process.env.NODE_ENV!=='production'?warning(deepestAncestor!=null,'React can\'t find the root component node for data-reactid value '+'`%s`. If you\'re seeing this message, it probably means that '+'you\'ve loaded two copies of React on the page. At this time, only '+'a single copy of React can be loaded at a time.',targetID):undefined;}


firstChildren[0]=deepestAncestor.firstChild;
firstChildren.length=1;

while(childIndex<firstChildren.length){
var child=firstChildren[childIndex++];
var targetChild;

while(child){
var childID=ReactMount.getID(child);
if(childID){





if(targetID===childID){
targetChild=child;}else 
if(ReactInstanceHandles.isAncestorIDOf(childID,targetID)){




firstChildren.length=childIndex=0;
firstChildren.push(child.firstChild);}}else 

{





firstChildren.push(child.firstChild);}


child=child.nextSibling;}


if(targetChild){



firstChildren.length=0;

return targetChild;}}



firstChildren.length=0;

!false?process.env.NODE_ENV!=='production'?invariant(false,'findComponentRoot(..., %s): Unable to find element. This probably '+'means the DOM was unexpectedly mutated (e.g., by the browser), '+'usually due to forgetting a <tbody> when using tables, nesting tags '+'like <form>, <p>, or <a>, or using non-SVG elements in an <svg> '+'parent. '+'Try inspecting the child nodes of the element with React ID `%s`.',targetID,ReactMount.getID(ancestorNode)):invariant(false):undefined;},


_mountImageIntoNode:function _mountImageIntoNode(markup,container,shouldReuseMarkup,transaction){
!(container&&(container.nodeType===ELEMENT_NODE_TYPE||container.nodeType===DOC_NODE_TYPE||container.nodeType===DOCUMENT_FRAGMENT_NODE_TYPE))?process.env.NODE_ENV!=='production'?invariant(false,'mountComponentIntoNode(...): Target container is not valid.'):invariant(false):undefined;

if(shouldReuseMarkup){
var rootElement=getReactRootElementInContainer(container);
if(ReactMarkupChecksum.canReuseMarkup(markup,rootElement)){
return;}else 
{
var checksum=rootElement.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
rootElement.removeAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);

var rootMarkup=rootElement.outerHTML;
rootElement.setAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME,checksum);

var normalizedMarkup=markup;
if(process.env.NODE_ENV!=='production'){




var normalizer;
if(container.nodeType===ELEMENT_NODE_TYPE){
normalizer=document.createElement('div');
normalizer.innerHTML=markup;
normalizedMarkup=normalizer.innerHTML;}else 
{
normalizer=document.createElement('iframe');
document.body.appendChild(normalizer);
normalizer.contentDocument.write(markup);
normalizedMarkup=normalizer.contentDocument.documentElement.outerHTML;
document.body.removeChild(normalizer);}}



var diffIndex=firstDifferenceIndex(normalizedMarkup,rootMarkup);
var difference=' (client) '+normalizedMarkup.substring(diffIndex-20,diffIndex+20)+'\n (server) '+rootMarkup.substring(diffIndex-20,diffIndex+20);

!(container.nodeType!==DOC_NODE_TYPE)?process.env.NODE_ENV!=='production'?invariant(false,'You\'re trying to render a component to the document using '+'server rendering but the checksum was invalid. This usually '+'means you rendered a different component type or props on '+'the client from the one on the server, or your render() '+'methods are impure. React cannot handle this case due to '+'cross-browser quirks by rendering at the document root. You '+'should look for environment dependent code in your components '+'and ensure the props are the same client and server side:\n%s',difference):invariant(false):undefined;

if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(false,'React attempted to reuse markup in a container but the '+'checksum was invalid. This generally means that you are '+'using server rendering and the markup generated on the '+'server was not what the client was expecting. React injected '+'new markup to compensate which works but you have lost many '+'of the benefits of server rendering. Instead, figure out '+'why the markup being generated is different on the client '+'or server:\n%s',difference):undefined;}}}




!(container.nodeType!==DOC_NODE_TYPE)?process.env.NODE_ENV!=='production'?invariant(false,'You\'re trying to render a component to the document but '+'you didn\'t use server rendering. We can\'t do this '+'without using server rendering due to cross-browser quirks. '+'See ReactDOMServer.renderToString() for server rendering.'):invariant(false):undefined;

if(transaction.useCreateElement){
while(container.lastChild){
container.removeChild(container.lastChild);}

container.appendChild(markup);}else 
{
setInnerHTML(container,markup);}},



ownerDocumentContextKey:ownerDocumentContextKey,





getReactRootID:getReactRootID,

getID:getID,

setID:setID,

getNode:getNode,

getNodeFromInstance:getNodeFromInstance,

isValid:isValid,

purgeID:purgeID};


ReactPerf.measureMethods(ReactMount,'ReactMount',{
_renderNewRootComponent:'_renderNewRootComponent',
_mountImageIntoNode:'_mountImageIntoNode'});


module.exports=ReactMount;
});
__d(212 /* ReactBrowserEventEmitter */, function(global, require, module, exports) {'use strict';













var EventConstants=require(100 /* ./EventConstants */);
var EventPluginHub=require(97 /* ./EventPluginHub */);
var EventPluginRegistry=require(98 /* ./EventPluginRegistry */);
var ReactEventEmitterMixin=require(130 /* ./ReactEventEmitterMixin */);
var ReactPerf=require(5 /* ./ReactPerf */);
var ViewportMetrics=require(213 /* ./ViewportMetrics */);

var assign=require(34 /* ./Object.assign */);
var isEventSupported=require(214 /* ./isEventSupported */);
























































var alreadyListeningTo={};
var isMonitoringScrollValue=false;
var reactTopListenersCounter=0;




var topEventMapping={
topAbort:'abort',
topBlur:'blur',
topCanPlay:'canplay',
topCanPlayThrough:'canplaythrough',
topChange:'change',
topClick:'click',
topCompositionEnd:'compositionend',
topCompositionStart:'compositionstart',
topCompositionUpdate:'compositionupdate',
topContextMenu:'contextmenu',
topCopy:'copy',
topCut:'cut',
topDoubleClick:'dblclick',
topDrag:'drag',
topDragEnd:'dragend',
topDragEnter:'dragenter',
topDragExit:'dragexit',
topDragLeave:'dragleave',
topDragOver:'dragover',
topDragStart:'dragstart',
topDrop:'drop',
topDurationChange:'durationchange',
topEmptied:'emptied',
topEncrypted:'encrypted',
topEnded:'ended',
topError:'error',
topFocus:'focus',
topInput:'input',
topKeyDown:'keydown',
topKeyPress:'keypress',
topKeyUp:'keyup',
topLoadedData:'loadeddata',
topLoadedMetadata:'loadedmetadata',
topLoadStart:'loadstart',
topMouseDown:'mousedown',
topMouseMove:'mousemove',
topMouseOut:'mouseout',
topMouseOver:'mouseover',
topMouseUp:'mouseup',
topPaste:'paste',
topPause:'pause',
topPlay:'play',
topPlaying:'playing',
topProgress:'progress',
topRateChange:'ratechange',
topScroll:'scroll',
topSeeked:'seeked',
topSeeking:'seeking',
topSelectionChange:'selectionchange',
topStalled:'stalled',
topSuspend:'suspend',
topTextInput:'textInput',
topTimeUpdate:'timeupdate',
topTouchCancel:'touchcancel',
topTouchEnd:'touchend',
topTouchMove:'touchmove',
topTouchStart:'touchstart',
topVolumeChange:'volumechange',
topWaiting:'waiting',
topWheel:'wheel'};





var topListenersIDKey='_reactListenersID'+String(Math.random()).slice(2);

function getListeningForDocument(mountAt){


if(!Object.prototype.hasOwnProperty.call(mountAt,topListenersIDKey)){
mountAt[topListenersIDKey]=reactTopListenersCounter++;
alreadyListeningTo[mountAt[topListenersIDKey]]={};}

return alreadyListeningTo[mountAt[topListenersIDKey]];}












var ReactBrowserEventEmitter=assign({},ReactEventEmitterMixin,{




ReactEventListener:null,

injection:{



injectReactEventListener:function injectReactEventListener(ReactEventListener){
ReactEventListener.setHandleTopLevel(ReactBrowserEventEmitter.handleTopLevel);
ReactBrowserEventEmitter.ReactEventListener=ReactEventListener;}},








setEnabled:function setEnabled(enabled){
if(ReactBrowserEventEmitter.ReactEventListener){
ReactBrowserEventEmitter.ReactEventListener.setEnabled(enabled);}},






isEnabled:function isEnabled(){
return !!(ReactBrowserEventEmitter.ReactEventListener&&ReactBrowserEventEmitter.ReactEventListener.isEnabled());},























listenTo:function listenTo(registrationName,contentDocumentHandle){
var mountAt=contentDocumentHandle;
var isListening=getListeningForDocument(mountAt);
var dependencies=EventPluginRegistry.registrationNameDependencies[registrationName];

var topLevelTypes=EventConstants.topLevelTypes;
for(var i=0;i<dependencies.length;i++){
var dependency=dependencies[i];
if(!(isListening.hasOwnProperty(dependency)&&isListening[dependency])){
if(dependency===topLevelTypes.topWheel){
if(isEventSupported('wheel')){
ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel,'wheel',mountAt);}else 
if(isEventSupported('mousewheel')){
ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel,'mousewheel',mountAt);}else 
{


ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel,'DOMMouseScroll',mountAt);}}else 

if(dependency===topLevelTypes.topScroll){

if(isEventSupported('scroll',true)){
ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topScroll,'scroll',mountAt);}else 
{
ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topScroll,'scroll',ReactBrowserEventEmitter.ReactEventListener.WINDOW_HANDLE);}}else 

if(dependency===topLevelTypes.topFocus||dependency===topLevelTypes.topBlur){

if(isEventSupported('focus',true)){
ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topFocus,'focus',mountAt);
ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topBlur,'blur',mountAt);}else 
if(isEventSupported('focusin')){


ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topFocus,'focusin',mountAt);
ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topBlur,'focusout',mountAt);}



isListening[topLevelTypes.topBlur]=true;
isListening[topLevelTypes.topFocus]=true;}else 
if(topEventMapping.hasOwnProperty(dependency)){
ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(dependency,topEventMapping[dependency],mountAt);}


isListening[dependency]=true;}}},




trapBubbledEvent:function trapBubbledEvent(topLevelType,handlerBaseName,handle){
return ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelType,handlerBaseName,handle);},


trapCapturedEvent:function trapCapturedEvent(topLevelType,handlerBaseName,handle){
return ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelType,handlerBaseName,handle);},










ensureScrollValueMonitoring:function ensureScrollValueMonitoring(){
if(!isMonitoringScrollValue){
var refresh=ViewportMetrics.refreshScrollValues;
ReactBrowserEventEmitter.ReactEventListener.monitorScrollValue(refresh);
isMonitoringScrollValue=true;}},



eventNameDispatchConfigs:EventPluginHub.eventNameDispatchConfigs,

registrationNameModules:EventPluginHub.registrationNameModules,

putListener:EventPluginHub.putListener,

getListener:EventPluginHub.getListener,

deleteListener:EventPluginHub.deleteListener,

deleteAllListeners:EventPluginHub.deleteAllListeners});



ReactPerf.measureMethods(ReactBrowserEventEmitter,'ReactBrowserEventEmitter',{
putListener:'putListener',
deleteListener:'deleteListener'});


module.exports=ReactBrowserEventEmitter;
});
__d(213 /* ViewportMetrics */, function(global, require, module, exports) {'use strict';












var ViewportMetrics={

currentScrollLeft:0,

currentScrollTop:0,

refreshScrollValues:function refreshScrollValues(scrollPosition){
ViewportMetrics.currentScrollLeft=scrollPosition.x;
ViewportMetrics.currentScrollTop=scrollPosition.y;}};




module.exports=ViewportMetrics;
});
__d(214 /* isEventSupported */, function(global, require, module, exports) {'use strict';












var ExecutionEnvironment=require(381 /* fbjs/lib/ExecutionEnvironment */);

var useHasFeature;
if(ExecutionEnvironment.canUseDOM){
useHasFeature=document.implementation&&document.implementation.hasFeature&&


document.implementation.hasFeature('','')!==true;}


/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */
function isEventSupported(eventNameSuffix,capture){
if(!ExecutionEnvironment.canUseDOM||capture&&!('addEventListener' in document)){
return false;}


var eventName='on'+eventNameSuffix;
var isSupported=eventName in document;

if(!isSupported){
var element=document.createElement('div');
element.setAttribute(eventName,'return;');
isSupported=typeof element[eventName]==='function';}


if(!isSupported&&useHasFeature&&eventNameSuffix==='wheel'){

isSupported=document.implementation.hasFeature('Events.wheel','3.0');}


return isSupported;}


module.exports=isEventSupported;
});
__d(381 /* fbjs/lib/ExecutionEnvironment.js */, function(global, require, module, exports) {'use strict';












var canUseDOM=!!(typeof window!=='undefined'&&window.document&&window.document.createElement);







var ExecutionEnvironment={

canUseDOM:canUseDOM,

canUseWorkers:typeof Worker!=='undefined',

canUseEventListeners:canUseDOM&&!!(window.addEventListener||window.attachEvent),

canUseViewport:canUseDOM&&!!window.screen,

isInWorker:!canUseDOM};



module.exports=ExecutionEnvironment;
});
__d(215 /* ReactDOMFeatureFlags */, function(global, require, module, exports) {'use strict';












var ReactDOMFeatureFlags={
useCreateElement:false};


module.exports=ReactDOMFeatureFlags;
});
__d(216 /* ReactMarkupChecksum */, function(global, require, module, exports) {'use strict';












var adler32=require(217 /* ./adler32 */);

var TAG_END=/\/?>/;

var ReactMarkupChecksum={
CHECKSUM_ATTR_NAME:'data-react-checksum',





addChecksumToMarkup:function addChecksumToMarkup(markup){
var checksum=adler32(markup);


return markup.replace(TAG_END,' '+ReactMarkupChecksum.CHECKSUM_ATTR_NAME+'="'+checksum+'"$&');},







canReuseMarkup:function canReuseMarkup(markup,element){
var existingChecksum=element.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
existingChecksum=existingChecksum&&parseInt(existingChecksum,10);
var markupChecksum=adler32(markup);
return markupChecksum===existingChecksum;}};



module.exports=ReactMarkupChecksum;
});
__d(217 /* adler32 */, function(global, require, module, exports) {'use strict';












var MOD=65521;






function adler32(data){
var a=1;
var b=0;
var i=0;
var l=data.length;
var m=l&~0x3;
while(i<m){
for(;i<Math.min(i+4096,m);i+=4){
b+=(a+=data.charCodeAt(i))+(a+=data.charCodeAt(i+1))+(a+=data.charCodeAt(i+2))+(a+=data.charCodeAt(i+3));}

a%=MOD;
b%=MOD;}

for(;i<l;i++){
b+=a+=data.charCodeAt(i);}

a%=MOD;
b%=MOD;
return a|b<<16;}


module.exports=adler32;
});
__d(385 /* fbjs/lib/containsNode.js */, function(global, require, module, exports) {'use strict';













var isTextNode=require(378 /* ./isTextNode */);










function containsNode(_x,_x2){
var _again=true;

_function: while(_again){
var outerNode=_x,
innerNode=_x2;
_again=false;

if(!outerNode||!innerNode){
return false;}else 
if(outerNode===innerNode){
return true;}else 
if(isTextNode(outerNode)){
return false;}else 
if(isTextNode(innerNode)){
_x=outerNode;
_x2=innerNode.parentNode;
_again=true;
continue _function;}else 
if(outerNode.contains){
return outerNode.contains(innerNode);}else 
if(outerNode.compareDocumentPosition){
return !!(outerNode.compareDocumentPosition(innerNode)&16);}else 
{
return false;}}}




module.exports=containsNode;
});
__d(378 /* fbjs/lib/isTextNode.js */, function(global, require, module, exports) {'use strict';













var isNode=require(382 /* ./isNode */);





function isTextNode(object){
return isNode(object)&&object.nodeType==3;}


module.exports=isTextNode;
});
__d(382 /* fbjs/lib/isNode.js */, function(global, require, module, exports) {'use strict';

















function isNode(object){
return !!(object&&(typeof Node==='function'?object instanceof Node:typeof object==='object'&&typeof object.nodeType==='number'&&typeof object.nodeName==='string'));}


module.exports=isNode;
});
__d(218 /* setInnerHTML */, function(global, require, module, exports) {'use strict';














var ExecutionEnvironment=require(381 /* fbjs/lib/ExecutionEnvironment */);

var WHITESPACE_TEST=/^[ \r\n\t\f]/;
var NONVISIBLE_TEST=/<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/;









var setInnerHTML=function setInnerHTML(node,html){
node.innerHTML=html;};



if(typeof MSApp!=='undefined'&&MSApp.execUnsafeLocalFunction){
setInnerHTML=function setInnerHTML(node,html){
MSApp.execUnsafeLocalFunction(function(){
node.innerHTML=html;});};}




if(ExecutionEnvironment.canUseDOM){






var testElement=document.createElement('div');
testElement.innerHTML=' ';
if(testElement.innerHTML===''){
setInnerHTML=function setInnerHTML(node,html){





if(node.parentNode){
node.parentNode.replaceChild(node,node);}






if(WHITESPACE_TEST.test(html)||html[0]==='<'&&NONVISIBLE_TEST.test(html)){






node.innerHTML=String.fromCharCode(0xFEFF)+html;



var textNode=node.firstChild;
if(textNode.data.length===1){
node.removeChild(textNode);}else 
{
textNode.deleteData(0,1);}}else 

{
node.innerHTML=html;}};}}





module.exports=setInnerHTML;
});
__d(219 /* validateDOMNesting */, function(global, require, module, exports) {'use strict';












var assign=require(34 /* ./Object.assign */);
var emptyFunction=require(233 /* fbjs/lib/emptyFunction */);
var warning=require(240 /* fbjs/lib/warning */);

var validateDOMNesting=emptyFunction;

if(process.env.NODE_ENV!=='production'){












var specialTags=['address','applet','area','article','aside','base','basefont','bgsound','blockquote','body','br','button','caption','center','col','colgroup','dd','details','dir','div','dl','dt','embed','fieldset','figcaption','figure','footer','form','frame','frameset','h1','h2','h3','h4','h5','h6','head','header','hgroup','hr','html','iframe','img','input','isindex','li','link','listing','main','marquee','menu','menuitem','meta','nav','noembed','noframes','noscript','object','ol','p','param','plaintext','pre','script','section','select','source','style','summary','table','tbody','td','template','textarea','tfoot','th','thead','title','tr','track','ul','wbr','xmp'];


var inScopeTags=['applet','caption','html','table','td','th','marquee','object','template',




'foreignObject','desc','title'];


var buttonScopeTags=inScopeTags.concat(['button']);


var impliedEndTags=['dd','dt','li','option','optgroup','p','rp','rt'];

var emptyAncestorInfo={
parentTag:null,

formTag:null,
aTagInScope:null,
buttonTagInScope:null,
nobrTagInScope:null,
pTagInButtonScope:null,

listItemTagAutoclosing:null,
dlItemTagAutoclosing:null};


var updatedAncestorInfo=function updatedAncestorInfo(oldInfo,tag,instance){
var ancestorInfo=assign({},oldInfo||emptyAncestorInfo);
var info={tag:tag,instance:instance};

if(inScopeTags.indexOf(tag)!==-1){
ancestorInfo.aTagInScope=null;
ancestorInfo.buttonTagInScope=null;
ancestorInfo.nobrTagInScope=null;}

if(buttonScopeTags.indexOf(tag)!==-1){
ancestorInfo.pTagInButtonScope=null;}




if(specialTags.indexOf(tag)!==-1&&tag!=='address'&&tag!=='div'&&tag!=='p'){
ancestorInfo.listItemTagAutoclosing=null;
ancestorInfo.dlItemTagAutoclosing=null;}


ancestorInfo.parentTag=info;

if(tag==='form'){
ancestorInfo.formTag=info;}

if(tag==='a'){
ancestorInfo.aTagInScope=info;}

if(tag==='button'){
ancestorInfo.buttonTagInScope=info;}

if(tag==='nobr'){
ancestorInfo.nobrTagInScope=info;}

if(tag==='p'){
ancestorInfo.pTagInButtonScope=info;}

if(tag==='li'){
ancestorInfo.listItemTagAutoclosing=info;}

if(tag==='dd'||tag==='dt'){
ancestorInfo.dlItemTagAutoclosing=info;}


return ancestorInfo;};





var isTagValidWithParent=function isTagValidWithParent(tag,parentTag){

switch(parentTag){

case 'select':
return tag==='option'||tag==='optgroup'||tag==='#text';
case 'optgroup':
return tag==='option'||tag==='#text';


case 'option':
return tag==='#text';







case 'tr':
return tag==='th'||tag==='td'||tag==='style'||tag==='script'||tag==='template';


case 'tbody':
case 'thead':
case 'tfoot':
return tag==='tr'||tag==='style'||tag==='script'||tag==='template';


case 'colgroup':
return tag==='col'||tag==='template';


case 'table':
return tag==='caption'||tag==='colgroup'||tag==='tbody'||tag==='tfoot'||tag==='thead'||tag==='style'||tag==='script'||tag==='template';


case 'head':
return tag==='base'||tag==='basefont'||tag==='bgsound'||tag==='link'||tag==='meta'||tag==='title'||tag==='noscript'||tag==='noframes'||tag==='style'||tag==='script'||tag==='template';


case 'html':
return tag==='head'||tag==='body';}





switch(tag){
case 'h1':
case 'h2':
case 'h3':
case 'h4':
case 'h5':
case 'h6':
return parentTag!=='h1'&&parentTag!=='h2'&&parentTag!=='h3'&&parentTag!=='h4'&&parentTag!=='h5'&&parentTag!=='h6';

case 'rp':
case 'rt':
return impliedEndTags.indexOf(parentTag)===-1;

case 'caption':
case 'col':
case 'colgroup':
case 'frame':
case 'head':
case 'tbody':
case 'td':
case 'tfoot':
case 'th':
case 'thead':
case 'tr':




return parentTag==null;}


return true;};





var findInvalidAncestorForTag=function findInvalidAncestorForTag(tag,ancestorInfo){
switch(tag){
case 'address':
case 'article':
case 'aside':
case 'blockquote':
case 'center':
case 'details':
case 'dialog':
case 'dir':
case 'div':
case 'dl':
case 'fieldset':
case 'figcaption':
case 'figure':
case 'footer':
case 'header':
case 'hgroup':
case 'main':
case 'menu':
case 'nav':
case 'ol':
case 'p':
case 'section':
case 'summary':
case 'ul':

case 'pre':
case 'listing':

case 'table':

case 'hr':

case 'xmp':

case 'h1':
case 'h2':
case 'h3':
case 'h4':
case 'h5':
case 'h6':
return ancestorInfo.pTagInButtonScope;

case 'form':
return ancestorInfo.formTag||ancestorInfo.pTagInButtonScope;

case 'li':
return ancestorInfo.listItemTagAutoclosing;

case 'dd':
case 'dt':
return ancestorInfo.dlItemTagAutoclosing;

case 'button':
return ancestorInfo.buttonTagInScope;

case 'a':


return ancestorInfo.aTagInScope;

case 'nobr':
return ancestorInfo.nobrTagInScope;}


return null;};






var findOwnerStack=function findOwnerStack(instance){
if(!instance){
return [];}


var stack=[];

do {

stack.push(instance);}while(
instance=instance._currentElement._owner);
stack.reverse();
return stack;};


var didWarn={};

validateDOMNesting=function validateDOMNesting(childTag,childInstance,ancestorInfo){
ancestorInfo=ancestorInfo||emptyAncestorInfo;
var parentInfo=ancestorInfo.parentTag;
var parentTag=parentInfo&&parentInfo.tag;

var invalidParent=isTagValidWithParent(childTag,parentTag)?null:parentInfo;
var invalidAncestor=invalidParent?null:findInvalidAncestorForTag(childTag,ancestorInfo);
var problematic=invalidParent||invalidAncestor;

if(problematic){
var ancestorTag=problematic.tag;
var ancestorInstance=problematic.instance;

var childOwner=childInstance&&childInstance._currentElement._owner;
var ancestorOwner=ancestorInstance&&ancestorInstance._currentElement._owner;

var childOwners=findOwnerStack(childOwner);
var ancestorOwners=findOwnerStack(ancestorOwner);

var minStackLen=Math.min(childOwners.length,ancestorOwners.length);
var i;

var deepestCommon=-1;
for(i=0;i<minStackLen;i++){
if(childOwners[i]===ancestorOwners[i]){
deepestCommon=i;}else 
{
break;}}



var UNKNOWN='(unknown)';
var childOwnerNames=childOwners.slice(deepestCommon+1).map(function(inst){
return inst.getName()||UNKNOWN;});

var ancestorOwnerNames=ancestorOwners.slice(deepestCommon+1).map(function(inst){
return inst.getName()||UNKNOWN;});

var ownerInfo=[].concat(


deepestCommon!==-1?childOwners[deepestCommon].getName()||UNKNOWN:[],ancestorOwnerNames,ancestorTag,

invalidAncestor?['...']:[],childOwnerNames,childTag).join(' > ');

var warnKey=!!invalidParent+'|'+childTag+'|'+ancestorTag+'|'+ownerInfo;
if(didWarn[warnKey]){
return;}

didWarn[warnKey]=true;

if(invalidParent){
var info='';
if(ancestorTag==='table'&&childTag==='tr'){
info+=' Add a <tbody> to your code to match the DOM tree generated by '+'the browser.';}

process.env.NODE_ENV!=='production'?warning(false,'validateDOMNesting(...): <%s> cannot appear as a child of <%s>. '+'See %s.%s',childTag,ancestorTag,ownerInfo,info):undefined;}else 
{
process.env.NODE_ENV!=='production'?warning(false,'validateDOMNesting(...): <%s> cannot appear as a descendant of '+'<%s>. See %s.',childTag,ancestorTag,ownerInfo):undefined;}}};




validateDOMNesting.ancestorInfoContextKey='__validateDOMNesting_ancestorInfo$'+Math.random().toString(36).slice(2);

validateDOMNesting.updatedAncestorInfo=updatedAncestorInfo;


validateDOMNesting.isTagValidInContext=function(tag,ancestorInfo){
ancestorInfo=ancestorInfo||emptyAncestorInfo;
var parentInfo=ancestorInfo.parentTag;
var parentTag=parentInfo&&parentInfo.tag;
return isTagValidWithParent(tag,parentTag)&&!findInvalidAncestorForTag(tag,ancestorInfo);};}



module.exports=validateDOMNesting;
});
__d(388 /* fbjs/lib/performanceNow.js */, function(global, require, module, exports) {'use strict';













var performance=require(384 /* ./performance */);

var performanceNow;






if(performance.now){
performanceNow=function performanceNow(){
return performance.now();};}else 

{
performanceNow=function performanceNow(){
return Date.now();};}



module.exports=performanceNow;
});
__d(384 /* fbjs/lib/performance.js */, function(global, require, module, exports) {'use strict';













var ExecutionEnvironment=require(381 /* ./ExecutionEnvironment */);

var performance;

if(ExecutionEnvironment.canUseDOM){
performance=window.performance||window.msPerformance||window.webkitPerformance;}


module.exports=performance||{};
});
;require(52);
;require(4);
;require(0);
__SSTOKENSTRING = "@generated SignedSource<<8e7244b53c1c953d39cc2ef4dec0c6e3>>";
