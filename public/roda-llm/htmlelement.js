(()=>{var st=Object.create;var Ce=Object.defineProperty;var it=Object.getOwnPropertyDescriptor;var ot=Object.getOwnPropertyNames;var lt=Object.getPrototypeOf,ct=Object.prototype.hasOwnProperty;var ut=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var pt=(t,e,n,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of ot(e))!ct.call(t,a)&&a!==n&&Ce(t,a,{get:()=>e[a],enumerable:!(r=it(e,a))||r.enumerable});return t};var dt=(t,e,n)=>(n=t!=null?st(lt(t)):{},pt(e||!t||!t.__esModule?Ce(n,"default",{value:t,enumerable:!0}):n,t));var Ve=ut((mn,me)=>{var Yt=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};var E=(function(t){var e=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,n=0,r={},a={manual:t.Prism&&t.Prism.manual,disableWorkerMessageHandler:t.Prism&&t.Prism.disableWorkerMessageHandler,util:{encode:function u(l){return l instanceof s?new s(l.type,u(l.content),l.alias):Array.isArray(l)?l.map(u):l.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(u){return Object.prototype.toString.call(u).slice(8,-1)},objId:function(u){return u.__id||Object.defineProperty(u,"__id",{value:++n}),u.__id},clone:function u(l,d){d=d||{};var h,g;switch(a.util.type(l)){case"Object":if(g=a.util.objId(l),d[g])return d[g];h={},d[g]=h;for(var v in l)l.hasOwnProperty(v)&&(h[v]=u(l[v],d));return h;case"Array":return g=a.util.objId(l),d[g]?d[g]:(h=[],d[g]=h,l.forEach(function(T,x){h[x]=u(T,d)}),h);default:return l}},getLanguage:function(u){for(;u;){var l=e.exec(u.className);if(l)return l[1].toLowerCase();u=u.parentElement}return"none"},setLanguage:function(u,l){u.className=u.className.replace(RegExp(e,"gi"),""),u.classList.add("language-"+l)},currentScript:function(){if(typeof document>"u")return null;if(document.currentScript&&document.currentScript.tagName==="SCRIPT")return document.currentScript;try{throw new Error}catch(h){var u=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(h.stack)||[])[1];if(u){var l=document.getElementsByTagName("script");for(var d in l)if(l[d].src==u)return l[d]}return null}},isActive:function(u,l,d){for(var h="no-"+l;u;){var g=u.classList;if(g.contains(l))return!0;if(g.contains(h))return!1;u=u.parentElement}return!!d}},languages:{plain:r,plaintext:r,text:r,txt:r,extend:function(u,l){var d=a.util.clone(a.languages[u]);for(var h in l)d[h]=l[h];return d},insertBefore:function(u,l,d,h){h=h||a.languages;var g=h[u],v={};for(var T in g)if(g.hasOwnProperty(T)){if(T==l)for(var x in d)d.hasOwnProperty(x)&&(v[x]=d[x]);d.hasOwnProperty(T)||(v[T]=g[T])}var R=h[u];return h[u]=v,a.languages.DFS(a.languages,function(N,m){m===R&&N!=u&&(this[N]=v)}),v},DFS:function u(l,d,h,g){g=g||{};var v=a.util.objId;for(var T in l)if(l.hasOwnProperty(T)){d.call(l,T,l[T],h||T);var x=l[T],R=a.util.type(x);R==="Object"&&!g[v(x)]?(g[v(x)]=!0,u(x,d,null,g)):R==="Array"&&!g[v(x)]&&(g[v(x)]=!0,u(x,d,T,g))}}},plugins:{},highlightAll:function(u,l){a.highlightAllUnder(document,u,l)},highlightAllUnder:function(u,l,d){var h={callback:d,container:u,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};a.hooks.run("before-highlightall",h),h.elements=Array.prototype.slice.apply(h.container.querySelectorAll(h.selector)),a.hooks.run("before-all-elements-highlight",h);for(var g=0,v;v=h.elements[g++];)a.highlightElement(v,l===!0,h.callback)},highlightElement:function(u,l,d){var h=a.util.getLanguage(u),g=a.languages[h];a.util.setLanguage(u,h);var v=u.parentElement;v&&v.nodeName.toLowerCase()==="pre"&&a.util.setLanguage(v,h);var T=u.textContent,x={element:u,language:h,grammar:g,code:T};function R(m){x.highlightedCode=m,a.hooks.run("before-insert",x),x.element.innerHTML=x.highlightedCode,a.hooks.run("after-highlight",x),a.hooks.run("complete",x),d&&d.call(x.element)}if(a.hooks.run("before-sanity-check",x),v=x.element.parentElement,v&&v.nodeName.toLowerCase()==="pre"&&!v.hasAttribute("tabindex")&&v.setAttribute("tabindex","0"),!x.code){a.hooks.run("complete",x),d&&d.call(x.element);return}if(a.hooks.run("before-highlight",x),!x.grammar){R(a.util.encode(x.code));return}if(l&&t.Worker){var N=new Worker(a.filename);N.onmessage=function(m){R(m.data)},N.postMessage(JSON.stringify({language:x.language,code:x.code,immediateClose:!0}))}else R(a.highlight(x.code,x.grammar,x.language))},highlight:function(u,l,d){var h={code:u,grammar:l,language:d};if(a.hooks.run("before-tokenize",h),!h.grammar)throw new Error('The language "'+h.language+'" has no grammar.');return h.tokens=a.tokenize(h.code,h.grammar),a.hooks.run("after-tokenize",h),s.stringify(a.util.encode(h.tokens),h.language)},tokenize:function(u,l){var d=l.rest;if(d){for(var h in d)l[h]=d[h];delete l.rest}var g=new c;return p(g,g.head,u),o(u,g,l,g.head,0),b(g)},hooks:{all:{},add:function(u,l){var d=a.hooks.all;d[u]=d[u]||[],d[u].push(l)},run:function(u,l){var d=a.hooks.all[u];if(!(!d||!d.length))for(var h=0,g;g=d[h++];)g(l)}},Token:s};t.Prism=a;function s(u,l,d,h){this.type=u,this.content=l,this.alias=d,this.length=(h||"").length|0}s.stringify=function u(l,d){if(typeof l=="string")return l;if(Array.isArray(l)){var h="";return l.forEach(function(R){h+=u(R,d)}),h}var g={type:l.type,content:u(l.content,d),tag:"span",classes:["token",l.type],attributes:{},language:d},v=l.alias;v&&(Array.isArray(v)?Array.prototype.push.apply(g.classes,v):g.classes.push(v)),a.hooks.run("wrap",g);var T="";for(var x in g.attributes)T+=" "+x+'="'+(g.attributes[x]||"").replace(/"/g,"&quot;")+'"';return"<"+g.tag+' class="'+g.classes.join(" ")+'"'+T+">"+g.content+"</"+g.tag+">"};function i(u,l,d,h){u.lastIndex=l;var g=u.exec(d);if(g&&h&&g[1]){var v=g[1].length;g.index+=v,g[0]=g[0].slice(v)}return g}function o(u,l,d,h,g,v){for(var T in d)if(!(!d.hasOwnProperty(T)||!d[T])){var x=d[T];x=Array.isArray(x)?x:[x];for(var R=0;R<x.length;++R){if(v&&v.cause==T+","+R)return;var N=x[R],m=N.inside,_=!!N.lookbehind,F=!!N.greedy,D=N.alias;if(F&&!N.pattern.global){var B=N.pattern.toString().match(/[imsuy]*$/)[0];N.pattern=RegExp(N.pattern.source,B+"g")}for(var q=N.pattern||N,M=h.next,S=g;M!==l.tail&&!(v&&S>=v.reach);S+=M.value.length,M=M.next){var A=M.value;if(l.length>u.length)return;if(!(A instanceof s)){var L=1,I;if(F){if(I=i(q,S,u,_),!I||I.index>=u.length)break;var K=I.index,U=I.index+I[0].length,P=S;for(P+=M.value.length;K>=P;)M=M.next,P+=M.value.length;if(P-=M.value.length,S=P,M.value instanceof s)continue;for(var G=M;G!==l.tail&&(P<U||typeof G.value=="string");G=G.next)L++,P+=G.value.length;L--,A=u.slice(S,P),I.index-=S}else if(I=i(q,0,A,_),!I)continue;var K=I.index,V=I[0],te=A.slice(0,K),oe=A.slice(K+V.length),Z=S+A.length;v&&Z>v.reach&&(v.reach=Z);var Q=M.prev;te&&(Q=p(l,Q,te),S+=te.length),f(l,Q,L);var $=new s(T,m?a.tokenize(V,m):V,D,V);if(M=p(l,Q,$),oe&&p(l,M,oe),L>1){var z={cause:T+","+R,reach:Z};o(u,l,d,M.prev,S,z),v&&z.reach>v.reach&&(v.reach=z.reach)}}}}}}function c(){var u={value:null,prev:null,next:null},l={value:null,prev:u,next:null};u.next=l,this.head=u,this.tail=l,this.length=0}function p(u,l,d){var h=l.next,g={value:d,prev:l,next:h};return l.next=g,h.prev=g,u.length++,g}function f(u,l,d){for(var h=l.next,g=0;g<d&&h!==u.tail;g++)h=h.next;l.next=h,h.prev=l,u.length-=g}function b(u){for(var l=[],d=u.head.next;d!==u.tail;)l.push(d.value),d=d.next;return l}if(!t.document)return t.addEventListener&&(a.disableWorkerMessageHandler||t.addEventListener("message",function(u){var l=JSON.parse(u.data),d=l.language,h=l.code,g=l.immediateClose;t.postMessage(a.highlight(h,a.languages[d],d)),g&&t.close()},!1)),a;var w=a.util.currentScript();w&&(a.filename=w.src,w.hasAttribute("data-manual")&&(a.manual=!0));function k(){a.manual||a.highlightAll()}if(!a.manual){var y=document.readyState;y==="loading"||y==="interactive"&&w&&w.defer?document.addEventListener("DOMContentLoaded",k):window.requestAnimationFrame?window.requestAnimationFrame(k):window.setTimeout(k,16)}return a})(Yt);typeof me<"u"&&me.exports&&(me.exports=E);typeof global<"u"&&(global.Prism=E);E.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]};E.languages.markup.tag.inside["attr-value"].inside.entity=E.languages.markup.entity;E.languages.markup.doctype.inside["internal-subset"].inside=E.languages.markup;E.hooks.add("wrap",function(t){t.type==="entity"&&(t.attributes.title=t.content.replace(/&amp;/,"&"))});Object.defineProperty(E.languages.markup.tag,"addInlined",{value:function(e,n){var r={};r["language-"+n]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:E.languages[n]},r.cdata=/^<!\[CDATA\[|\]\]>$/i;var a={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:r}};a["language-"+n]={pattern:/[\s\S]+/,inside:E.languages[n]};var s={};s[e]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return e}),"i"),lookbehind:!0,greedy:!0,inside:a},E.languages.insertBefore("markup","cdata",s)}});Object.defineProperty(E.languages.markup.tag,"addAttribute",{value:function(t,e){E.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+t+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[e,"language-"+e],inside:E.languages[e]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}});E.languages.html=E.languages.markup;E.languages.mathml=E.languages.markup;E.languages.svg=E.languages.markup;E.languages.xml=E.languages.extend("markup",{});E.languages.ssml=E.languages.xml;E.languages.atom=E.languages.xml;E.languages.rss=E.languages.xml;(function(t){var e=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;t.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+e.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+e.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+e.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+e.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:e,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},t.languages.css.atrule.inside.rest=t.languages.css;var n=t.languages.markup;n&&(n.tag.addInlined("style","css"),n.tag.addAttribute("style","css"))})(E);E.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/};E.languages.javascript=E.languages.extend("clike",{"class-name":[E.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/});E.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;E.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:E.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:E.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:E.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:E.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:E.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/});E.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:E.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}});E.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}});E.languages.markup&&(E.languages.markup.tag.addInlined("script","javascript"),E.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript"));E.languages.js=E.languages.javascript;(function(){if(typeof E>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var t="Loading\u2026",e=function(w,k){return"\u2716 Error "+w+" while fetching file: "+k},n="\u2716 Error: File does not exist or is empty",r={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},a="data-src-status",s="loading",i="loaded",o="failed",c="pre[data-src]:not(["+a+'="'+i+'"]):not(['+a+'="'+s+'"])';function p(w,k,y){var u=new XMLHttpRequest;u.open("GET",w,!0),u.onreadystatechange=function(){u.readyState==4&&(u.status<400&&u.responseText?k(u.responseText):u.status>=400?y(e(u.status,u.statusText)):y(n))},u.send(null)}function f(w){var k=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(w||"");if(k){var y=Number(k[1]),u=k[2],l=k[3];return u?l?[y,Number(l)]:[y,void 0]:[y,y]}}E.hooks.add("before-highlightall",function(w){w.selector+=", "+c}),E.hooks.add("before-sanity-check",function(w){var k=w.element;if(k.matches(c)){w.code="",k.setAttribute(a,s);var y=k.appendChild(document.createElement("CODE"));y.textContent=t;var u=k.getAttribute("data-src"),l=w.language;if(l==="none"){var d=(/\.(\w+)$/.exec(u)||[,"none"])[1];l=r[d]||d}E.util.setLanguage(y,l),E.util.setLanguage(k,l);var h=E.plugins.autoloader;h&&h.loadLanguages(l),p(u,function(g){k.setAttribute(a,i);var v=f(k.getAttribute("data-range"));if(v){var T=g.split(/\r\n?|\n/g),x=v[0],R=v[1]==null?T.length:v[1];x<0&&(x+=T.length),x=Math.max(0,Math.min(x-1,T.length)),R<0&&(R+=T.length),R=Math.max(0,Math.min(R,T.length)),g=T.slice(x,R).join(`
`),k.hasAttribute("data-start")||k.setAttribute("data-start",String(x+1))}y.textContent=g,E.highlightElement(y)},function(g){k.setAttribute(a,o),y.textContent=g})}}),E.plugins.fileHighlight={highlight:function(k){for(var y=(k||document).querySelectorAll(c),u=0,l;l=y[u++];)E.highlightElement(l)}};var b=!1;E.fileHighlight=function(){b||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),b=!0),E.plugins.fileHighlight.highlight.apply(this,arguments)}})()});function Oe(t={}){let e=Object.create(null),{path:n,headers:r}=t;return e.request=(a,s)=>{let i=`${n}${s?"?"+encodeURIComponent(s):""}`;return fetch(i,{method:a,headers:r})},e.create=()=>e.request("POST"),e.destroy=()=>e.request("DELETE"),e.describe=()=>e.request("GET"),e}function ve(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var ee=ve();function Be(t){ee=t}var se={exec:()=>null};function O(t,e=""){let n=typeof t=="string"?t:t.source,r={replace:(a,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(H.caret,"$1"),n=n.replace(a,i),r},getRegex:()=>new RegExp(n,e)};return r}var H={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},ht=/^(?:[ \t]*(?:\n|$))+/,gt=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ft=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ie=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,mt=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,xe=/(?:[*+-]|\d{1,9}[.)])/,He=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ue=O(He).replace(/bull/g,xe).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),bt=O(He).replace(/bull/g,xe).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Se=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,wt=/^[^\n]+/,Ee=/(?!\s*\])(?:\\.|[^\[\]\\])+/,kt=O(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ee).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),yt=O(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,xe).getRegex(),ge="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ae=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,vt=O("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ae).replace("tag",ge).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),qe=O(Se).replace("hr",ie).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ge).getRegex(),xt=O(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",qe).getRegex(),Te={blockquote:xt,code:gt,def:kt,fences:ft,heading:mt,hr:ie,html:vt,lheading:Ue,list:yt,newline:ht,paragraph:qe,table:se,text:wt},Ne=O("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ie).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ge).getRegex(),St={...Te,lheading:bt,table:Ne,paragraph:O(Se).replace("hr",ie).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ne).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ge).getRegex()},Et={...Te,html:O(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ae).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:se,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:O(Se).replace("hr",ie).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ue).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},At=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Tt=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ge=/^( {2,}|\\)\n(?!\s*$)/,Rt=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,fe=/[\p{P}\p{S}]/u,Re=/[\s\p{P}\p{S}]/u,je=/[^\s\p{P}\p{S}]/u,_t=O(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Re).getRegex(),Ze=/(?!~)[\p{P}\p{S}]/u,It=/(?!~)[\s\p{P}\p{S}]/u,Lt=/(?:[^\s\p{P}\p{S}]|~)/u,$t=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,We=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ft=O(We,"u").replace(/punct/g,fe).getRegex(),Ct=O(We,"u").replace(/punct/g,Ze).getRegex(),Xe="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ot=O(Xe,"gu").replace(/notPunctSpace/g,je).replace(/punctSpace/g,Re).replace(/punct/g,fe).getRegex(),Nt=O(Xe,"gu").replace(/notPunctSpace/g,Lt).replace(/punctSpace/g,It).replace(/punct/g,Ze).getRegex(),Pt=O("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,je).replace(/punctSpace/g,Re).replace(/punct/g,fe).getRegex(),zt=O(/\\(punct)/,"gu").replace(/punct/g,fe).getRegex(),Dt=O(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Mt=O(Ae).replace("(?:-->|$)","-->").getRegex(),Bt=O("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Mt).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),pe=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Ht=O(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",pe).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ye=O(/^!?\[(label)\]\[(ref)\]/).replace("label",pe).replace("ref",Ee).getRegex(),Ke=O(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ee).getRegex(),Ut=O("reflink|nolink(?!\\()","g").replace("reflink",Ye).replace("nolink",Ke).getRegex(),_e={_backpedal:se,anyPunctuation:zt,autolink:Dt,blockSkip:$t,br:Ge,code:Tt,del:se,emStrongLDelim:Ft,emStrongRDelimAst:Ot,emStrongRDelimUnd:Pt,escape:At,link:Ht,nolink:Ke,punctuation:_t,reflink:Ye,reflinkSearch:Ut,tag:Bt,text:Rt,url:se},qt={..._e,link:O(/^!?\[(label)\]\((.*?)\)/).replace("label",pe).getRegex(),reflink:O(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",pe).getRegex()},we={..._e,emStrongRDelimAst:Nt,emStrongLDelim:Ct,url:O(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Gt={...we,br:O(Ge).replace("{2,}","*").getRegex(),text:O(we.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ce={normal:Te,gfm:St,pedantic:Et},ae={normal:_e,gfm:we,breaks:Gt,pedantic:qt},jt={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Pe=t=>jt[t];function j(t,e){if(e){if(H.escapeTest.test(t))return t.replace(H.escapeReplace,Pe)}else if(H.escapeTestNoEncode.test(t))return t.replace(H.escapeReplaceNoEncode,Pe);return t}function ze(t){try{t=encodeURI(t).replace(H.percentDecode,"%")}catch{return null}return t}function De(t,e){let n=t.replace(H.findPipe,(s,i,o)=>{let c=!1,p=i;for(;--p>=0&&o[p]==="\\";)c=!c;return c?"|":" |"}),r=n.split(H.splitPipe),a=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),e)if(r.length>e)r.splice(e);else for(;r.length<e;)r.push("");for(;a<r.length;a++)r[a]=r[a].trim().replace(H.slashPipe,"|");return r}function re(t,e,n){let r=t.length;if(r===0)return"";let a=0;for(;a<r;){let s=t.charAt(r-a-1);if(s===e&&!n)a++;else if(s!==e&&n)a++;else break}return t.slice(0,r-a)}function Zt(t,e){if(t.indexOf(e[1])===-1)return-1;let n=0;for(let r=0;r<t.length;r++)if(t[r]==="\\")r++;else if(t[r]===e[0])n++;else if(t[r]===e[1]&&(n--,n<0))return r;return n>0?-2:-1}function Me(t,e,n,r,a){let s=e.href,i=e.title||null,o=t[1].replace(a.other.outputLinkReplace,"$1");r.state.inLink=!0;let c={type:t[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:i,text:o,tokens:r.inlineTokens(o)};return r.state.inLink=!1,c}function Wt(t,e,n){let r=t.match(n.other.indentCodeCompensation);if(r===null)return e;let a=r[1];return e.split(`
`).map(s=>{let i=s.match(n.other.beginningSpace);if(i===null)return s;let[o]=i;return o.length>=a.length?s.slice(a.length):s}).join(`
`)}var de=class{options;rules;lexer;constructor(t){this.options=t||ee}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let n=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?n:re(n,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let n=e[0],r=Wt(n,e[3]||"",this.rules);return{type:"code",raw:n,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:r}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let n=e[2].trim();if(this.rules.other.endingHash.test(n)){let r=re(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:re(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let n=re(e[0],`
`).split(`
`),r="",a="",s=[];for(;n.length>0;){let i=!1,o=[],c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))o.push(n[c]),i=!0;else if(!i)o.push(n[c]);else break;n=n.slice(c);let p=o.join(`
`),f=p.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${p}`:p,a=a?`${a}
${f}`:f;let b=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,s,!0),this.lexer.state.top=b,n.length===0)break;let w=s.at(-1);if(w?.type==="code")break;if(w?.type==="blockquote"){let k=w,y=k.raw+`
`+n.join(`
`),u=this.blockquote(y);s[s.length-1]=u,r=r.substring(0,r.length-k.raw.length)+u.raw,a=a.substring(0,a.length-k.text.length)+u.text;break}else if(w?.type==="list"){let k=w,y=k.raw+`
`+n.join(`
`),u=this.list(y);s[s.length-1]=u,r=r.substring(0,r.length-w.raw.length)+u.raw,a=a.substring(0,a.length-k.raw.length)+u.raw,n=y.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:a}}}list(t){let e=this.rules.block.list.exec(t);if(e){let n=e[1].trim(),r=n.length>1,a={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),i=!1;for(;t;){let c=!1,p="",f="";if(!(e=s.exec(t))||this.rules.block.hr.test(t))break;p=e[0],t=t.substring(p.length);let b=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,d=>" ".repeat(3*d.length)),w=t.split(`
`,1)[0],k=!b.trim(),y=0;if(this.options.pedantic?(y=2,f=b.trimStart()):k?y=e[1].length+1:(y=e[2].search(this.rules.other.nonSpaceChar),y=y>4?1:y,f=b.slice(y),y+=e[1].length),k&&this.rules.other.blankLine.test(w)&&(p+=w+`
`,t=t.substring(w.length+1),c=!0),!c){let d=this.rules.other.nextBulletRegex(y),h=this.rules.other.hrRegex(y),g=this.rules.other.fencesBeginRegex(y),v=this.rules.other.headingBeginRegex(y),T=this.rules.other.htmlBeginRegex(y);for(;t;){let x=t.split(`
`,1)[0],R;if(w=x,this.options.pedantic?(w=w.replace(this.rules.other.listReplaceNesting,"  "),R=w):R=w.replace(this.rules.other.tabCharGlobal,"    "),g.test(w)||v.test(w)||T.test(w)||d.test(w)||h.test(w))break;if(R.search(this.rules.other.nonSpaceChar)>=y||!w.trim())f+=`
`+R.slice(y);else{if(k||b.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||g.test(b)||v.test(b)||h.test(b))break;f+=`
`+w}!k&&!w.trim()&&(k=!0),p+=x+`
`,t=t.substring(x.length+1),b=R.slice(y)}}a.loose||(i?a.loose=!0:this.rules.other.doubleBlankLine.test(p)&&(i=!0));let u=null,l;this.options.gfm&&(u=this.rules.other.listIsTask.exec(f),u&&(l=u[0]!=="[ ] ",f=f.replace(this.rules.other.listReplaceTask,""))),a.items.push({type:"list_item",raw:p,task:!!u,checked:l,loose:!1,text:f,tokens:[]}),a.raw+=p}let o=a.items.at(-1);if(o)o.raw=o.raw.trimEnd(),o.text=o.text.trimEnd();else return;a.raw=a.raw.trimEnd();for(let c=0;c<a.items.length;c++)if(this.lexer.state.top=!1,a.items[c].tokens=this.lexer.blockTokens(a.items[c].text,[]),!a.loose){let p=a.items[c].tokens.filter(b=>b.type==="space"),f=p.length>0&&p.some(b=>this.rules.other.anyLine.test(b.raw));a.loose=f}if(a.loose)for(let c=0;c<a.items.length;c++)a.items[c].loose=!0;return a}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let n=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",a=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:n,raw:e[0],href:r,title:a}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let n=De(e[1]),r=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),a=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:e[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?s.align.push("right"):this.rules.other.tableAlignCenter.test(i)?s.align.push("center"):this.rules.other.tableAlignLeft.test(i)?s.align.push("left"):s.align.push(null);for(let i=0;i<n.length;i++)s.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:s.align[i]});for(let i of a)s.rows.push(De(i,s.header.length).map((o,c)=>({text:o,tokens:this.lexer.inline(o),header:!1,align:s.align[c]})));return s}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let n=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:n,tokens:this.lexer.inline(n)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let n=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=re(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=Zt(e[2],"()");if(s===-2)return;if(s>-1){let o=(e[0].indexOf("!")===0?5:4)+e[1].length+s;e[2]=e[2].substring(0,s),e[0]=e[0].substring(0,o).trim(),e[3]=""}}let r=e[2],a="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],a=s[3])}else a=e[3]?e[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Me(e,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:a&&a.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let n;if((n=this.rules.inline.reflink.exec(t))||(n=this.rules.inline.nolink.exec(t))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),a=e[r.toLowerCase()];if(!a){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return Me(n,a,n[0],this.lexer,this.rules)}}emStrong(t,e,n=""){let r=this.rules.inline.emStrongLDelim.exec(t);if(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(r[1]||r[2]||"")||!n||this.rules.inline.punctuation.exec(n)){let s=[...r[0]].length-1,i,o,c=s,p=0,f=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(f.lastIndex=0,e=e.slice(-1*t.length+s);(r=f.exec(e))!=null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(o=[...i].length,r[3]||r[4]){c+=o;continue}else if((r[5]||r[6])&&s%3&&!((s+o)%3)){p+=o;continue}if(c-=o,c>0)continue;o=Math.min(o,o+c+p);let b=[...r[0]][0].length,w=t.slice(0,s+r.index+b+o);if(Math.min(s,o)%2){let y=w.slice(1,-1);return{type:"em",raw:w,text:y,tokens:this.lexer.inlineTokens(y)}}let k=w.slice(2,-2);return{type:"strong",raw:w,text:k,tokens:this.lexer.inlineTokens(k)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let n=e[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),a=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&a&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:e[0],text:n}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let n,r;return e[2]==="@"?(n=e[1],r="mailto:"+n):(n=e[1],r=n),{type:"link",raw:e[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let n,r;if(e[2]==="@")n=e[0],r="mailto:"+n;else{let a;do a=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(a!==e[0]);n=e[0],e[1]==="www."?r="http://"+e[0]:r=e[0]}return{type:"link",raw:e[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let n=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:n}}}},X=class ke{tokens;options;state;tokenizer;inlineQueue;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||ee,this.options.tokenizer=this.options.tokenizer||new de,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:H,block:ce.normal,inline:ae.normal};this.options.pedantic?(n.block=ce.pedantic,n.inline=ae.pedantic):this.options.gfm&&(n.block=ce.gfm,this.options.breaks?n.inline=ae.breaks:n.inline=ae.gfm),this.tokenizer.rules=n}static get rules(){return{block:ce,inline:ae}}static lex(e,n){return new ke(n).lex(e)}static lexInline(e,n){return new ke(n).inlineTokens(e)}lex(e){e=e.replace(H.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,n=[],r=!1){for(this.options.pedantic&&(e=e.replace(H.tabCharGlobal,"    ").replace(H.spaceLine,""));e;){let a;if(this.options.extensions?.block?.some(i=>(a=i.call({lexer:this},e,n))?(e=e.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.space(e)){e=e.substring(a.raw.length);let i=n.at(-1);a.raw.length===1&&i!==void 0?i.raw+=`
`:n.push(a);continue}if(a=this.tokenizer.code(e)){e=e.substring(a.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=`
`+a.raw,i.text+=`
`+a.text,this.inlineQueue.at(-1).src=i.text):n.push(a);continue}if(a=this.tokenizer.fences(e)){e=e.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.heading(e)){e=e.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.hr(e)){e=e.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.blockquote(e)){e=e.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.list(e)){e=e.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.html(e)){e=e.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.def(e)){e=e.substring(a.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=`
`+a.raw,i.text+=`
`+a.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[a.tag]||(this.tokens.links[a.tag]={href:a.href,title:a.title});continue}if(a=this.tokenizer.table(e)){e=e.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.lheading(e)){e=e.substring(a.raw.length),n.push(a);continue}let s=e;if(this.options.extensions?.startBlock){let i=1/0,o=e.slice(1),c;this.options.extensions.startBlock.forEach(p=>{c=p.call({lexer:this},o),typeof c=="number"&&c>=0&&(i=Math.min(i,c))}),i<1/0&&i>=0&&(s=e.substring(0,i+1))}if(this.state.top&&(a=this.tokenizer.paragraph(s))){let i=n.at(-1);r&&i?.type==="paragraph"?(i.raw+=`
`+a.raw,i.text+=`
`+a.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(a),r=s.length!==e.length,e=e.substring(a.raw.length);continue}if(a=this.tokenizer.text(e)){e=e.substring(a.raw.length);let i=n.at(-1);i?.type==="text"?(i.raw+=`
`+a.raw,i.text+=`
`+a.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(a);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(e,n=[]){return this.inlineQueue.push({src:e,tokens:n}),n}inlineTokens(e,n=[]){let r=e,a=null;if(this.tokens.links){let o=Object.keys(this.tokens.links);if(o.length>0)for(;(a=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)o.includes(a[0].slice(a[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,a.index)+"["+"a".repeat(a[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(a=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,a.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(a=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)r=r.slice(0,a.index)+"["+"a".repeat(a[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let s=!1,i="";for(;e;){s||(i=""),s=!1;let o;if(this.options.extensions?.inline?.some(p=>(o=p.call({lexer:this},e,n))?(e=e.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.escape(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.tag(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.link(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(o.raw.length);let p=n.at(-1);o.type==="text"&&p?.type==="text"?(p.raw+=o.raw,p.text+=o.text):n.push(o);continue}if(o=this.tokenizer.emStrong(e,r,i)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.codespan(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.br(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.del(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.autolink(e)){e=e.substring(o.raw.length),n.push(o);continue}if(!this.state.inLink&&(o=this.tokenizer.url(e))){e=e.substring(o.raw.length),n.push(o);continue}let c=e;if(this.options.extensions?.startInline){let p=1/0,f=e.slice(1),b;this.options.extensions.startInline.forEach(w=>{b=w.call({lexer:this},f),typeof b=="number"&&b>=0&&(p=Math.min(p,b))}),p<1/0&&p>=0&&(c=e.substring(0,p+1))}if(o=this.tokenizer.inlineText(c)){e=e.substring(o.raw.length),o.raw.slice(-1)!=="_"&&(i=o.raw.slice(-1)),s=!0;let p=n.at(-1);p?.type==="text"?(p.raw+=o.raw,p.text+=o.text):n.push(o);continue}if(e){let p="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return n}},he=class{options;parser;constructor(t){this.options=t||ee}space(t){return""}code({text:t,lang:e,escaped:n}){let r=(e||"").match(H.notSpaceStart)?.[0],a=t.replace(H.endingNewline,"")+`
`;return r?'<pre><code class="language-'+j(r)+'">'+(n?a:j(a,!0))+`</code></pre>
`:"<pre><code>"+(n?a:j(a,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>
`}hr(t){return`<hr>
`}list(t){let e=t.ordered,n=t.start,r="";for(let i=0;i<t.items.length;i++){let o=t.items[i];r+=this.listitem(o)}let a=e?"ol":"ul",s=e&&n!==1?' start="'+n+'"':"";return"<"+a+s+`>
`+r+"</"+a+`>
`}listitem(t){let e="";if(t.task){let n=this.checkbox({checked:!!t.checked});t.loose?t.tokens[0]?.type==="paragraph"?(t.tokens[0].text=n+" "+t.tokens[0].text,t.tokens[0].tokens&&t.tokens[0].tokens.length>0&&t.tokens[0].tokens[0].type==="text"&&(t.tokens[0].tokens[0].text=n+" "+j(t.tokens[0].tokens[0].text),t.tokens[0].tokens[0].escaped=!0)):t.tokens.unshift({type:"text",raw:n+" ",text:n+" ",escaped:!0}):e+=n+" "}return e+=this.parser.parse(t.tokens,!!t.loose),`<li>${e}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let e="",n="";for(let a=0;a<t.header.length;a++)n+=this.tablecell(t.header[a]);e+=this.tablerow({text:n});let r="";for(let a=0;a<t.rows.length;a++){let s=t.rows[a];n="";for(let i=0;i<s.length;i++)n+=this.tablecell(s[i]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+r+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){let e=this.parser.parseInline(t.tokens),n=t.header?"th":"td";return(t.align?`<${n} align="${t.align}">`:`<${n}>`)+e+`</${n}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${j(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:n}){let r=this.parser.parseInline(n),a=ze(t);if(a===null)return r;t=a;let s='<a href="'+t+'"';return e&&(s+=' title="'+j(e)+'"'),s+=">"+r+"</a>",s}image({href:t,title:e,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let a=ze(t);if(a===null)return j(n);t=a;let s=`<img src="${t}" alt="${n}"`;return e&&(s+=` title="${j(e)}"`),s+=">",s}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:j(t.text)}},Ie=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}},Y=class ye{options;renderer;textRenderer;constructor(e){this.options=e||ee,this.options.renderer=this.options.renderer||new he,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ie}static parse(e,n){return new ye(n).parse(e)}static parseInline(e,n){return new ye(n).parseInline(e)}parse(e,n=!0){let r="";for(let a=0;a<e.length;a++){let s=e[a];if(this.options.extensions?.renderers?.[s.type]){let o=s,c=this.options.extensions.renderers[o.type].call({parser:this},o);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(o.type)){r+=c||"";continue}}let i=s;switch(i.type){case"space":{r+=this.renderer.space(i);continue}case"hr":{r+=this.renderer.hr(i);continue}case"heading":{r+=this.renderer.heading(i);continue}case"code":{r+=this.renderer.code(i);continue}case"table":{r+=this.renderer.table(i);continue}case"blockquote":{r+=this.renderer.blockquote(i);continue}case"list":{r+=this.renderer.list(i);continue}case"html":{r+=this.renderer.html(i);continue}case"paragraph":{r+=this.renderer.paragraph(i);continue}case"text":{let o=i,c=this.renderer.text(o);for(;a+1<e.length&&e[a+1].type==="text";)o=e[++a],c+=`
`+this.renderer.text(o);n?r+=this.renderer.paragraph({type:"paragraph",raw:c,text:c,tokens:[{type:"text",raw:c,text:c,escaped:!0}]}):r+=c;continue}default:{let o='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return r}parseInline(e,n=this.renderer){let r="";for(let a=0;a<e.length;a++){let s=e[a];if(this.options.extensions?.renderers?.[s.type]){let o=this.options.extensions.renderers[s.type].call({parser:this},s);if(o!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=o||"";continue}}let i=s;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let o='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return r}},ue=class{options;block;constructor(t){this.options=t||ee}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}provideLexer(){return this.block?X.lex:X.lexInline}provideParser(){return this.block?Y.parse:Y.parseInline}},Xt=class{defaults=ve();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=Y;Renderer=he;TextRenderer=Ie;Lexer=X;Tokenizer=de;Hooks=ue;constructor(...t){this.use(...t)}walkTokens(t,e){let n=[];for(let r of t)switch(n=n.concat(e.call(this,r)),r.type){case"table":{let a=r;for(let s of a.header)n=n.concat(this.walkTokens(s.tokens,e));for(let s of a.rows)for(let i of s)n=n.concat(this.walkTokens(i.tokens,e));break}case"list":{let a=r;n=n.concat(this.walkTokens(a.items,e));break}default:{let a=r;this.defaults.extensions?.childTokens?.[a.type]?this.defaults.extensions.childTokens[a.type].forEach(s=>{let i=a[s].flat(1/0);n=n.concat(this.walkTokens(i,e))}):a.tokens&&(n=n.concat(this.walkTokens(a.tokens,e)))}}return n}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(a=>{if(!a.name)throw new Error("extension name required");if("renderer"in a){let s=e.renderers[a.name];s?e.renderers[a.name]=function(...i){let o=a.renderer.apply(this,i);return o===!1&&(o=s.apply(this,i)),o}:e.renderers[a.name]=a.renderer}if("tokenizer"in a){if(!a.level||a.level!=="block"&&a.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=e[a.level];s?s.unshift(a.tokenizer):e[a.level]=[a.tokenizer],a.start&&(a.level==="block"?e.startBlock?e.startBlock.push(a.start):e.startBlock=[a.start]:a.level==="inline"&&(e.startInline?e.startInline.push(a.start):e.startInline=[a.start]))}"childTokens"in a&&a.childTokens&&(e.childTokens[a.name]=a.childTokens)}),r.extensions=e),n.renderer){let a=this.defaults.renderer||new he(this.defaults);for(let s in n.renderer){if(!(s in a))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let i=s,o=n.renderer[i],c=a[i];a[i]=(...p)=>{let f=o.apply(a,p);return f===!1&&(f=c.apply(a,p)),f||""}}r.renderer=a}if(n.tokenizer){let a=this.defaults.tokenizer||new de(this.defaults);for(let s in n.tokenizer){if(!(s in a))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let i=s,o=n.tokenizer[i],c=a[i];a[i]=(...p)=>{let f=o.apply(a,p);return f===!1&&(f=c.apply(a,p)),f}}r.tokenizer=a}if(n.hooks){let a=this.defaults.hooks||new ue;for(let s in n.hooks){if(!(s in a))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let i=s,o=n.hooks[i],c=a[i];ue.passThroughHooks.has(s)?a[i]=p=>{if(this.defaults.async)return Promise.resolve(o.call(a,p)).then(b=>c.call(a,b));let f=o.call(a,p);return c.call(a,f)}:a[i]=(...p)=>{let f=o.apply(a,p);return f===!1&&(f=c.apply(a,p)),f}}r.hooks=a}if(n.walkTokens){let a=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(i){let o=[];return o.push(s.call(this,i)),a&&(o=o.concat(a.call(this,i))),o}}this.defaults={...this.defaults,...r}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return X.lex(t,e??this.defaults)}parser(t,e){return Y.parse(t,e??this.defaults)}parseMarkdown(t){return(n,r)=>{let a={...r},s={...this.defaults,...a},i=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&a.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));s.hooks&&(s.hooks.options=s,s.hooks.block=t);let o=s.hooks?s.hooks.provideLexer():t?X.lex:X.lexInline,c=s.hooks?s.hooks.provideParser():t?Y.parse:Y.parseInline;if(s.async)return Promise.resolve(s.hooks?s.hooks.preprocess(n):n).then(p=>o(p,s)).then(p=>s.hooks?s.hooks.processAllTokens(p):p).then(p=>s.walkTokens?Promise.all(this.walkTokens(p,s.walkTokens)).then(()=>p):p).then(p=>c(p,s)).then(p=>s.hooks?s.hooks.postprocess(p):p).catch(i);try{s.hooks&&(n=s.hooks.preprocess(n));let p=o(n,s);s.hooks&&(p=s.hooks.processAllTokens(p)),s.walkTokens&&this.walkTokens(p,s.walkTokens);let f=c(p,s);return s.hooks&&(f=s.hooks.postprocess(f)),f}catch(p){return i(p)}}}onError(t,e){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let r="<p>An error occurred:</p><pre>"+j(n.message+"",!0)+"</pre>";return e?Promise.resolve(r):r}if(e)return Promise.reject(n);throw n}}},J=new Xt;function C(t,e){return J.parse(t,e)}C.options=C.setOptions=function(t){return J.setOptions(t),C.defaults=J.defaults,Be(C.defaults),C};C.getDefaults=ve;C.defaults=ee;C.use=function(...t){return J.use(...t),C.defaults=J.defaults,Be(C.defaults),C};C.walkTokens=function(t,e){return J.walkTokens(t,e)};C.parseInline=J.parseInline;C.Parser=Y;C.parser=Y.parse;C.Renderer=he;C.TextRenderer=Ie;C.Lexer=X;C.lexer=X.lex;C.Tokenizer=de;C.Hooks=ue;C.parse=C;var nn=C.options,an=C.setOptions,rn=C.use,sn=C.walkTokens,on=C.parseInline;var ln=Y.parse,cn=X.lex;var Le=dt(Ve());Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/};Prism.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]};Prism.languages.markup.tag.inside["attr-value"].inside.entity=Prism.languages.markup.entity;Prism.languages.markup.doctype.inside["internal-subset"].inside=Prism.languages.markup;Prism.hooks.add("wrap",function(t){t.type==="entity"&&(t.attributes.title=t.content.replace(/&amp;/,"&"))});Object.defineProperty(Prism.languages.markup.tag,"addInlined",{value:function(e,n){var r={};r["language-"+n]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:Prism.languages[n]},r.cdata=/^<!\[CDATA\[|\]\]>$/i;var a={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:r}};a["language-"+n]={pattern:/[\s\S]+/,inside:Prism.languages[n]};var s={};s[e]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return e}),"i"),lookbehind:!0,greedy:!0,inside:a},Prism.languages.insertBefore("markup","cdata",s)}});Object.defineProperty(Prism.languages.markup.tag,"addAttribute",{value:function(t,e){Prism.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+t+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[e,"language-"+e],inside:Prism.languages[e]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}});Prism.languages.html=Prism.languages.markup;Prism.languages.mathml=Prism.languages.markup;Prism.languages.svg=Prism.languages.markup;Prism.languages.xml=Prism.languages.extend("markup",{});Prism.languages.ssml=Prism.languages.xml;Prism.languages.atom=Prism.languages.xml;Prism.languages.rss=Prism.languages.xml;(function(t){function e(n,r){return"___"+n.toUpperCase()+r+"___"}Object.defineProperties(t.languages["markup-templating"]={},{buildPlaceholders:{value:function(n,r,a,s){if(n.language===r){var i=n.tokenStack=[];n.code=n.code.replace(a,function(o){if(typeof s=="function"&&!s(o))return o;for(var c=i.length,p;n.code.indexOf(p=e(r,c))!==-1;)++c;return i[c]=o,p}),n.grammar=t.languages.markup}}},tokenizePlaceholders:{value:function(n,r){if(n.language!==r||!n.tokenStack)return;n.grammar=t.languages[r];var a=0,s=Object.keys(n.tokenStack);function i(o){for(var c=0;c<o.length&&!(a>=s.length);c++){var p=o[c];if(typeof p=="string"||p.content&&typeof p.content=="string"){var f=s[a],b=n.tokenStack[f],w=typeof p=="string"?p:p.content,k=e(r,f),y=w.indexOf(k);if(y>-1){++a;var u=w.substring(0,y),l=new t.Token(r,t.tokenize(b,n.grammar),"language-"+r,b),d=w.substring(y+k.length),h=[];u&&h.push.apply(h,i([u])),h.push(l),d&&h.push.apply(h,i([d])),typeof p=="string"?o.splice.apply(o,[c,1].concat(h)):p.content=h}}else p.content&&i(p.content)}return o}i(n.tokens)}}})})(Prism);(function(t){var e=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;t.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+e.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+e.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+e.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+e.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:e,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},t.languages.css.atrule.inside.rest=t.languages.css;var n=t.languages.markup;n&&(n.tag.addInlined("style","css"),n.tag.addAttribute("style","css"))})(Prism);Prism.languages.javascript=Prism.languages.extend("clike",{"class-name":[Prism.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/});Prism.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:Prism.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:Prism.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/});Prism.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}});Prism.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}});Prism.languages.markup&&(Prism.languages.markup.tag.addInlined("script","javascript"),Prism.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript"));Prism.languages.js=Prism.languages.javascript;(function(t){t.languages.typescript=t.languages.extend("javascript",{"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,lookbehind:!0,greedy:!0,inside:null},builtin:/\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/}),t.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/,/\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,/\btype\b(?=\s*(?:[\{*]|$))/),delete t.languages.typescript.parameter,delete t.languages.typescript["literal-property"];var e=t.languages.extend("typescript",{});delete e["class-name"],t.languages.typescript["class-name"].inside=e,t.languages.insertBefore("typescript","function",{decorator:{pattern:/@[$\w\xA0-\uFFFF]+/,inside:{at:{pattern:/^@/,alias:"operator"},function:/^[\s\S]+/}},"generic-function":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,greedy:!0,inside:{function:/^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,generic:{pattern:/<[\s\S]+/,alias:"class-name",inside:e}}}}),t.languages.ts=t.languages.typescript})(Prism);(function(t){var e=t.util.clone(t.languages.javascript),n=/(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source,r=/(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source,a=/(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;function s(c,p){return c=c.replace(/<S>/g,function(){return n}).replace(/<BRACES>/g,function(){return r}).replace(/<SPREAD>/g,function(){return a}),RegExp(c,p)}a=s(a).source,t.languages.jsx=t.languages.extend("markup",e),t.languages.jsx.tag.pattern=s(/<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/.source),t.languages.jsx.tag.inside.tag.pattern=/^<\/?[^\s>\/]*/,t.languages.jsx.tag.inside["attr-value"].pattern=/=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/,t.languages.jsx.tag.inside.tag.inside["class-name"]=/^[A-Z]\w*(?:\.[A-Z]\w*)*$/,t.languages.jsx.tag.inside.comment=e.comment,t.languages.insertBefore("inside","attr-name",{spread:{pattern:s(/<SPREAD>/.source),inside:t.languages.jsx}},t.languages.jsx.tag),t.languages.insertBefore("inside","special-attr",{script:{pattern:s(/=<BRACES>/.source),alias:"language-javascript",inside:{"script-punctuation":{pattern:/^=(?=\{)/,alias:"punctuation"},rest:t.languages.jsx}}},t.languages.jsx.tag);var i=function(c){return c?typeof c=="string"?c:typeof c.content=="string"?c.content:c.content.map(i).join(""):""},o=function(c){for(var p=[],f=0;f<c.length;f++){var b=c[f],w=!1;if(typeof b!="string"&&(b.type==="tag"&&b.content[0]&&b.content[0].type==="tag"?b.content[0].content[0].content==="</"?p.length>0&&p[p.length-1].tagName===i(b.content[0].content[1])&&p.pop():b.content[b.content.length-1].content==="/>"||p.push({tagName:i(b.content[0].content[1]),openedBraces:0}):p.length>0&&b.type==="punctuation"&&b.content==="{"?p[p.length-1].openedBraces++:p.length>0&&p[p.length-1].openedBraces>0&&b.type==="punctuation"&&b.content==="}"?p[p.length-1].openedBraces--:w=!0),(w||typeof b=="string")&&p.length>0&&p[p.length-1].openedBraces===0){var k=i(b);f<c.length-1&&(typeof c[f+1]=="string"||c[f+1].type==="plain-text")&&(k+=i(c[f+1]),c.splice(f+1,1)),f>0&&(typeof c[f-1]=="string"||c[f-1].type==="plain-text")&&(k=i(c[f-1])+k,c.splice(f-1,1),f--),c[f]=new t.Token("plain-text",k,null,k)}b.content&&typeof b.content!="string"&&o(b.content)}};t.hooks.add("after-tokenize",function(c){c.language!=="jsx"&&c.language!=="tsx"||o(c.tokens)})})(Prism);(function(t){var e=t.util.clone(t.languages.typescript);t.languages.tsx=t.languages.extend("jsx",e),delete t.languages.tsx.parameter,delete t.languages.tsx["literal-property"];var n=t.languages.tsx.tag;n.pattern=RegExp(/(^|[^\w$]|(?=<\/))/.source+"(?:"+n.pattern.source+")",n.pattern.flags),n.lookbehind=!0})(Prism);(function(t){var e=/(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/.source;function n(f){return f=f.replace(/<inner>/g,function(){return e}),RegExp(/((?:^|[^\\])(?:\\{2})*)/.source+"(?:"+f+")")}var r=/(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source,a=/\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(/__/g,function(){return r}),s=/\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source;t.languages.markdown=t.languages.extend("markup",{}),t.languages.insertBefore("markdown","prolog",{"front-matter-block":{pattern:/(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,lookbehind:!0,greedy:!0,inside:{punctuation:/^---|---$/,"front-matter":{pattern:/\S+(?:\s+\S+)*/,alias:["yaml","language-yaml"],inside:t.languages.yaml}}},blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:"punctuation"},table:{pattern:RegExp("^"+a+s+"(?:"+a+")*","m"),inside:{"table-data-rows":{pattern:RegExp("^("+a+s+")(?:"+a+")*$"),lookbehind:!0,inside:{"table-data":{pattern:RegExp(r),inside:t.languages.markdown},punctuation:/\|/}},"table-line":{pattern:RegExp("^("+a+")"+s+"$"),lookbehind:!0,inside:{punctuation:/\||:?-{3,}:?/}},"table-header-row":{pattern:RegExp("^"+a+"$"),inside:{"table-header":{pattern:RegExp(r),alias:"important",inside:t.languages.markdown},punctuation:/\|/}}}},code:[{pattern:/((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,lookbehind:!0,alias:"keyword"},{pattern:/^```[\s\S]*?^```$/m,greedy:!0,inside:{"code-block":{pattern:/^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,lookbehind:!0},"code-language":{pattern:/^(```).+/,lookbehind:!0},punctuation:/```/}}],title:[{pattern:/\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,alias:"important",inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#.+/m,lookbehind:!0,alias:"important",inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:"punctuation"},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:"punctuation"},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:"url"},bold:{pattern:n(/\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/.source),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^..)[\s\S]+(?=..$)/,lookbehind:!0,inside:{}},punctuation:/\*\*|__/}},italic:{pattern:n(/\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/.source),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^.)[\s\S]+(?=.$)/,lookbehind:!0,inside:{}},punctuation:/[*_]/}},strike:{pattern:n(/(~~?)(?:(?!~)<inner>)+\2/.source),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^~~?)[\s\S]+(?=\1$)/,lookbehind:!0,inside:{}},punctuation:/~~?/}},"code-snippet":{pattern:/(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,lookbehind:!0,greedy:!0,alias:["code","keyword"]},url:{pattern:n(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/.source),lookbehind:!0,greedy:!0,inside:{operator:/^!/,content:{pattern:/(^\[)[^\]]+(?=\])/,lookbehind:!0,inside:{}},variable:{pattern:/(^\][ \t]?\[)[^\]]+(?=\]$)/,lookbehind:!0},url:{pattern:/(^\]\()[^\s)]+/,lookbehind:!0},string:{pattern:/(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,lookbehind:!0}}}}),["url","bold","italic","strike"].forEach(function(f){["url","bold","italic","strike","code-snippet"].forEach(function(b){f!==b&&(t.languages.markdown[f].inside.content.inside[b]=t.languages.markdown[b])})}),t.hooks.add("after-tokenize",function(f){if(f.language!=="markdown"&&f.language!=="md")return;function b(w){if(!(!w||typeof w=="string"))for(var k=0,y=w.length;k<y;k++){var u=w[k];if(u.type!=="code"){b(u.content);continue}var l=u.content[1],d=u.content[3];if(l&&d&&l.type==="code-language"&&d.type==="code-block"&&typeof l.content=="string"){var h=l.content.replace(/\b#/g,"sharp").replace(/\b\+\+/g,"pp");h=(/[a-z][\w-]*/i.exec(h)||[""])[0].toLowerCase();var g="language-"+h;d.alias?typeof d.alias=="string"?d.alias=[d.alias,g]:d.alias.push(g):d.alias=[g]}}}b(f.tokens)}),t.hooks.add("wrap",function(f){if(f.type==="code-block"){for(var b="",w=0,k=f.classes.length;w<k;w++){var y=f.classes[w],u=/language-(.+)/.exec(y);if(u){b=u[1];break}}var l=t.languages[b];if(l)f.content=t.highlight(p(f.content),l,b);else if(b&&b!=="none"&&t.plugins.autoloader){var d="md-"+new Date().valueOf()+"-"+Math.floor(Math.random()*1e16);f.attributes.id=d,t.plugins.autoloader.loadLanguages(b,function(){var h=document.getElementById(d);h&&(h.innerHTML=t.highlight(h.textContent,t.languages[b],b))})}}});var i=RegExp(t.languages.markup.tag.pattern.source,"gi"),o={amp:"&",lt:"<",gt:">",quot:'"'},c=String.fromCodePoint||String.fromCharCode;function p(f){var b=f.replace(i,"");return b=b.replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi,function(w,k){if(k=k.toLowerCase(),k[0]==="#"){var y;return k[1]==="x"?y=parseInt(k.slice(2),16):y=Number(k.slice(1)),c(y)}else{var u=o[k];return u||w}}),b}t.languages.md=t.languages.markdown})(Prism);Prism.languages.json={property:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,lookbehind:!0,greedy:!0},string:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,lookbehind:!0,greedy:!0},comment:{pattern:/\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,greedy:!0},number:/-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,punctuation:/[{}[\],]/,operator:/:/,boolean:/\b(?:false|true)\b/,null:{pattern:/\bnull\b/,alias:"keyword"}};Prism.languages.webmanifest=Prism.languages.json;(function(t){var e=/[*&][^\s[\]{},]+/,n=/!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/,r="(?:"+n.source+"(?:[ 	]+"+e.source+")?|"+e.source+"(?:[ 	]+"+n.source+")?)",a=/(?:[^\s\x00-\x08\x0e-\x1f!"#%&'*,\-:>?@[\]`{|}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.source.replace(/<PLAIN>/g,function(){return/[^\s\x00-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/.source}),s=/"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/.source;function i(o,c){c=(c||"").replace(/m/g,"")+"m";var p=/([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\]|\}|(?:[\r\n]\s*)?#))/.source.replace(/<<prop>>/g,function(){return r}).replace(/<<value>>/g,function(){return o});return RegExp(p,c)}t.languages.yaml={scalar:{pattern:RegExp(/([\-:]\s*(?:\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/.source.replace(/<<prop>>/g,function(){return r})),lookbehind:!0,alias:"string"},comment:/#.*/,key:{pattern:RegExp(/((?:^|[:\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\s*:\s)/.source.replace(/<<prop>>/g,function(){return r}).replace(/<<key>>/g,function(){return"(?:"+a+"|"+s+")"})),lookbehind:!0,greedy:!0,alias:"atrule"},directive:{pattern:/(^[ \t]*)%.+/m,lookbehind:!0,alias:"important"},datetime:{pattern:i(/\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?))?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?/.source),lookbehind:!0,alias:"number"},boolean:{pattern:i(/false|true/.source,"i"),lookbehind:!0,alias:"important"},null:{pattern:i(/null|~/.source,"i"),lookbehind:!0,alias:"important"},string:{pattern:i(s),lookbehind:!0,greedy:!0},number:{pattern:i(/[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/.source,"i"),lookbehind:!0},tag:n,important:e,punctuation:/---|[:[\]{}\-,|>?]|\.\.\./},t.languages.yml=t.languages.yaml})(Prism);(function(t){var e="\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b",n={pattern:/(^(["']?)\w+\2)[ \t]+\S.*/,lookbehind:!0,alias:"punctuation",inside:null},r={bash:n,environment:{pattern:RegExp("\\$"+e),alias:"constant"},variable:[{pattern:/\$?\(\([\s\S]+?\)\)/,greedy:!0,inside:{variable:[{pattern:/(^\$\(\([\s\S]+)\)\)/,lookbehind:!0},/^\$\(\(/],number:/\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,operator:/--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,punctuation:/\(\(?|\)\)?|,|;/}},{pattern:/\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,greedy:!0,inside:{variable:/^\$\(|^`|\)$|`$/}},{pattern:/\$\{[^}]+\}/,greedy:!0,inside:{operator:/:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,punctuation:/[\[\]]/,environment:{pattern:RegExp("(\\{)"+e),lookbehind:!0,alias:"constant"}}},/\$(?:\w+|[#?*!@$])/],entity:/\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/};t.languages.bash={shebang:{pattern:/^#!\s*\/.*/,alias:"important"},comment:{pattern:/(^|[^"{\\$])#.*/,lookbehind:!0},"function-name":[{pattern:/(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,lookbehind:!0,alias:"function"},{pattern:/\b[\w-]+(?=\s*\(\s*\)\s*\{)/,alias:"function"}],"for-or-select":{pattern:/(\b(?:for|select)\s+)\w+(?=\s+in\s)/,alias:"variable",lookbehind:!0},"assign-left":{pattern:/(^|[\s;|&]|[<>]\()\w+(?:\.\w+)*(?=\+?=)/,inside:{environment:{pattern:RegExp("(^|[\\s;|&]|[<>]\\()"+e),lookbehind:!0,alias:"constant"}},alias:"variable",lookbehind:!0},parameter:{pattern:/(^|\s)-{1,2}(?:\w+:[+-]?)?\w+(?:\.\w+)*(?=[=\s]|$)/,alias:"variable",lookbehind:!0},string:[{pattern:/((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,lookbehind:!0,greedy:!0,inside:r},{pattern:/((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,lookbehind:!0,greedy:!0,inside:{bash:n}},{pattern:/(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,lookbehind:!0,greedy:!0,inside:r},{pattern:/(^|[^$\\])'[^']*'/,lookbehind:!0,greedy:!0},{pattern:/\$'(?:[^'\\]|\\[\s\S])*'/,greedy:!0,inside:{entity:r.entity}}],environment:{pattern:RegExp("\\$?"+e),alias:"constant"},variable:r.variable,function:{pattern:/(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cargo|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|java|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|sysctl|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,lookbehind:!0},keyword:{pattern:/(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,lookbehind:!0},builtin:{pattern:/(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,lookbehind:!0,alias:"class-name"},boolean:{pattern:/(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/,lookbehind:!0},"file-descriptor":{pattern:/\B&\d\b/,alias:"important"},operator:{pattern:/\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,inside:{"file-descriptor":{pattern:/^\d/,alias:"important"}}},punctuation:/\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,number:{pattern:/(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,lookbehind:!0}},n.inside=t.languages.bash;for(var a=["comment","function-name","for-or-select","assign-left","parameter","string","environment","function","keyword","builtin","boolean","file-descriptor","operator","punctuation","number"],s=r.variable[1].inside,i=0;i<a.length;i++)s[a[i]]=t.languages.bash[a[i]];t.languages.sh=t.languages.bash,t.languages.shell=t.languages.bash})(Prism);(function(t){var e=[/"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/.source,/'[^']*'/.source,/\$'(?:[^'\\]|\\[\s\S])*'/.source,/<<-?\s*(["']?)(\w+)\1\s[\s\S]*?[\r\n]\2/.source].join("|");t.languages["shell-session"]={command:{pattern:RegExp(/^/.source+"(?:"+(/[^\s@:$#%*!/\\]+@[^\r\n@:$#%*!/\\]+(?::[^\0-\x1F$#%*?"<>:;|]+)?/.source+"|"+/[/~.][^\0-\x1F$#%*?"<>@:;|]*/.source)+")?"+/[$#%](?=\s)/.source+/(?:[^\\\r\n \t'"<$]|[ \t](?:(?!#)|#.*$)|\\(?:[^\r]|\r\n?)|\$(?!')|<(?!<)|<<str>>)+/.source.replace(/<<str>>/g,function(){return e}),"m"),greedy:!0,inside:{info:{pattern:/^[^#$%]+/,alias:"punctuation",inside:{user:/^[^\s@:$#%*!/\\]+@[^\r\n@:$#%*!/\\]+/,punctuation:/:/,path:/[\s\S]+/}},bash:{pattern:/(^[$#%]\s*)\S[\s\S]*/,lookbehind:!0,alias:"language-bash",inside:t.languages.bash},"shell-symbol":{pattern:/^[$#%]/,alias:"important"}}},output:/.(?:.*(?:[\r\n]|.$))*/},t.languages["sh-session"]=t.languages.shellsession=t.languages["shell-session"]})(Prism);(function(t){t.languages.ruby=t.languages.extend("clike",{comment:{pattern:/#.*|^=begin\s[\s\S]*?^=end/m,greedy:!0},"class-name":{pattern:/(\b(?:class|module)\s+|\bcatch\s+\()[\w.\\]+|\b[A-Z_]\w*(?=\s*\.\s*new\b)/,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:BEGIN|END|alias|and|begin|break|case|class|def|define_method|defined|do|each|else|elsif|end|ensure|extend|for|if|in|include|module|new|next|nil|not|or|prepend|private|protected|public|raise|redo|require|rescue|retry|return|self|super|then|throw|undef|unless|until|when|while|yield)\b/,operator:/\.{2,3}|&\.|===|<?=>|[!=]?~|(?:&&|\|\||<<|>>|\*\*|[+\-*/%<>!^&|=])=?|[?:]/,punctuation:/[(){}[\].,;]/}),t.languages.insertBefore("ruby","operator",{"double-colon":{pattern:/::/,alias:"punctuation"}});var e={pattern:/((?:^|[^\\])(?:\\{2})*)#\{(?:[^{}]|\{[^{}]*\})*\}/,lookbehind:!0,inside:{content:{pattern:/^(#\{)[\s\S]+(?=\}$)/,lookbehind:!0,inside:t.languages.ruby},delimiter:{pattern:/^#\{|\}$/,alias:"punctuation"}}};delete t.languages.ruby.function;var n="(?:"+[/([^a-zA-Z0-9\s{(\[<=])(?:(?!\1)[^\\]|\\[\s\S])*\1/.source,/\((?:[^()\\]|\\[\s\S]|\((?:[^()\\]|\\[\s\S])*\))*\)/.source,/\{(?:[^{}\\]|\\[\s\S]|\{(?:[^{}\\]|\\[\s\S])*\})*\}/.source,/\[(?:[^\[\]\\]|\\[\s\S]|\[(?:[^\[\]\\]|\\[\s\S])*\])*\]/.source,/<(?:[^<>\\]|\\[\s\S]|<(?:[^<>\\]|\\[\s\S])*>)*>/.source].join("|")+")",r=/(?:"(?:\\.|[^"\\\r\n])*"|(?:\b[a-zA-Z_]\w*|[^\s\0-\x7F]+)[?!]?|\$.)/.source;t.languages.insertBefore("ruby","keyword",{"regex-literal":[{pattern:RegExp(/%r/.source+n+/[egimnosux]{0,6}/.source),greedy:!0,inside:{interpolation:e,regex:/[\s\S]+/}},{pattern:/(^|[^/])\/(?!\/)(?:\[[^\r\n\]]+\]|\\.|[^[/\\\r\n])+\/[egimnosux]{0,6}(?=\s*(?:$|[\r\n,.;})#]))/,lookbehind:!0,greedy:!0,inside:{interpolation:e,regex:/[\s\S]+/}}],variable:/[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,symbol:[{pattern:RegExp(/(^|[^:]):/.source+r),lookbehind:!0,greedy:!0},{pattern:RegExp(/([\r\n{(,][ \t]*)/.source+r+/(?=:(?!:))/.source),lookbehind:!0,greedy:!0}],"method-definition":{pattern:/(\bdef\s+)\w+(?:\s*\.\s*\w+)?/,lookbehind:!0,inside:{function:/\b\w+$/,keyword:/^self\b/,"class-name":/^\w+/,punctuation:/\./}}}),t.languages.insertBefore("ruby","string",{"string-literal":[{pattern:RegExp(/%[qQiIwWs]?/.source+n),greedy:!0,inside:{interpolation:e,string:/[\s\S]+/}},{pattern:/("|')(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|(?!\1)[^\\#\r\n])*\1/,greedy:!0,inside:{interpolation:e,string:/[\s\S]+/}},{pattern:/<<[-~]?([a-z_]\w*)[\r\n](?:.*[\r\n])*?[\t ]*\1/i,alias:"heredoc-string",greedy:!0,inside:{delimiter:{pattern:/^<<[-~]?[a-z_]\w*|\b[a-z_]\w*$/i,inside:{symbol:/\b\w+/,punctuation:/^<<[-~]?/}},interpolation:e,string:/[\s\S]+/}},{pattern:/<<[-~]?'([a-z_]\w*)'[\r\n](?:.*[\r\n])*?[\t ]*\1/i,alias:"heredoc-string",greedy:!0,inside:{delimiter:{pattern:/^<<[-~]?'[a-z_]\w*'|\b[a-z_]\w*$/i,inside:{symbol:/\b\w+/,punctuation:/^<<[-~]?'|'$/}},string:/[\s\S]+/}}],"command-literal":[{pattern:RegExp(/%x/.source+n),greedy:!0,inside:{interpolation:e,command:{pattern:/[\s\S]+/,alias:"string"}}},{pattern:/`(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|[^\\`#\r\n])*`/,greedy:!0,inside:{interpolation:e,command:{pattern:/[\s\S]+/,alias:"string"}}}]}),delete t.languages.ruby.string,t.languages.insertBefore("ruby","number",{builtin:/\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Fixnum|Float|Hash|IO|Integer|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|Stat|String|Struct|Symbol|TMS|Thread|ThreadGroup|Time|TrueClass)\b/,constant:/\b[A-Z][A-Z0-9_]*(?:[?!]|\b)/}),t.languages.rb=t.languages.ruby})(Prism);(function(t){t.languages.erb={delimiter:{pattern:/^(\s*)<%=?|%>(?=\s*$)/,lookbehind:!0,alias:"punctuation"},ruby:{pattern:/\s*\S[\s\S]*/,alias:"language-ruby",inside:t.languages.ruby}},t.hooks.add("before-tokenize",function(e){var n=/<%=?(?:[^\r\n]|[\r\n](?!=begin)|[\r\n]=begin\s(?:[^\r\n]|[\r\n](?!=end))*[\r\n]=end)+?%>/g;t.languages["markup-templating"].buildPlaceholders(e,"erb",n)}),t.hooks.add("after-tokenize",function(e){t.languages["markup-templating"].tokenizePlaceholders(e,"erb")})})(Prism);Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0,greedy:!0},"string-interpolation":{pattern:/(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=\}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,greedy:!0,alias:"string"},string:{pattern:/(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^[\t ]*)@\w+(?:\.\w+)*/m,lookbehind:!0,alias:["annotation","punctuation"],inside:{punctuation:/\./}},keyword:/\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:False|None|True)\b/,number:/\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,operator:/[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/};Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest=Prism.languages.python;Prism.languages.py=Prism.languages.python;Prism.languages.sql={comment:{pattern:/(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,lookbehind:!0},variable:[{pattern:/@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,greedy:!0},/@[\w.$]+/],string:{pattern:/(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,greedy:!0,lookbehind:!0},identifier:{pattern:/(^|[^@\\])`(?:\\[\s\S]|[^`\\]|``)*`/,greedy:!0,lookbehind:!0,inside:{punctuation:/^`|`$/}},function:/\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,keyword:/\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:COL|_INSERT)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:ING|S)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,boolean:/\b(?:FALSE|NULL|TRUE)\b/i,number:/\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,operator:/[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|ILIKE|IN|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,punctuation:/[;[\]()`,.]/};(function(t){var e=/(?:[\w-]+|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*")/.source;function n(r){return r.replace(/__/g,function(){return e})}t.languages.toml={comment:{pattern:/#.*/,greedy:!0},table:{pattern:RegExp(n(/(^[\t ]*\[\s*(?:\[\s*)?)__(?:\s*\.\s*__)*(?=\s*\])/.source),"m"),lookbehind:!0,greedy:!0,alias:"class-name"},key:{pattern:RegExp(n(/(^[\t ]*|[{,]\s*)__(?:\s*\.\s*__)*(?=\s*=)/.source),"m"),lookbehind:!0,greedy:!0,alias:"property"},string:{pattern:/"""(?:\\[\s\S]|[^\\])*?"""|'''[\s\S]*?'''|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*"/,greedy:!0},date:[{pattern:/\b\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?\b/i,alias:"number"},{pattern:/\b\d{2}:\d{2}:\d{2}(?:\.\d+)?\b/,alias:"number"}],number:/(?:\b0(?:x[\da-zA-Z]+(?:_[\da-zA-Z]+)*|o[0-7]+(?:_[0-7]+)*|b[10]+(?:_[10]+)*))\b|[-+]?\b\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?\b|[-+]?\b(?:inf|nan)\b/,boolean:/\b(?:false|true)\b/,punctuation:/[.,=[\]{}]/}})(Prism);Prism.languages.ini={comment:{pattern:/(^[ \f\t\v]*)[#;][^\n\r]*/m,lookbehind:!0},section:{pattern:/(^[ \f\t\v]*)\[[^\n\r\]]*\]?/m,lookbehind:!0,inside:{"section-name":{pattern:/(^\[[ \f\t\v]*)[^ \f\t\v\]]+(?:[ \f\t\v]+[^ \f\t\v\]]+)*/,lookbehind:!0,alias:"selector"},punctuation:/\[|\]/}},key:{pattern:/(^[ \f\t\v]*)[^ \f\n\r\t\v=]+(?:[ \f\t\v]+[^ \f\n\r\t\v=]+)*(?=[ \f\t\v]*=)/m,lookbehind:!0,alias:"attr-name"},value:{pattern:/(=[ \f\t\v]*)[^ \f\n\r\t\v]+(?:[ \f\t\v]+[^ \f\n\r\t\v]+)*/,lookbehind:!0,alias:"attr-value",inside:{"inner-value":{pattern:/^("|').+(?=\1$)/,lookbehind:!0}}},punctuation:/=/};(function(t){t.languages.diff={coord:[/^(?:\*{3}|-{3}|\+{3}).*$/m,/^@@.*@@$/m,/^\d.*$/m]};var e={"deleted-sign":"-","deleted-arrow":"<","inserted-sign":"+","inserted-arrow":">",unchanged:" ",diff:"!"};Object.keys(e).forEach(function(n){var r=e[n],a=[];/^\w+$/.test(n)||a.push(/\w+/.exec(n)[0]),n==="diff"&&a.push("bold"),t.languages.diff[n]={pattern:RegExp("^(?:["+r+`].*(?:\r
?|
|(?![\\s\\S])))+`,"m"),alias:a,inside:{line:{pattern:/(.)(?=[\s\S]).*(?:\r\n?|\n)?/,lookbehind:!0},prefix:{pattern:/[\s\S]/,alias:/\w+/.exec(n)[0]}}}}),Object.defineProperty(t.languages.diff,"PREFIXES",{value:e})})(Prism);(function(t){function e(p){return RegExp("(^(?:"+p+"):[ 	]*(?![ 	]))[^]+","i")}t.languages.http={"request-line":{pattern:/^(?:CONNECT|DELETE|GET|HEAD|OPTIONS|PATCH|POST|PRI|PUT|SEARCH|TRACE)\s(?:https?:\/\/|\/)\S*\sHTTP\/[\d.]+/m,inside:{method:{pattern:/^[A-Z]+\b/,alias:"property"},"request-target":{pattern:/^(\s)(?:https?:\/\/|\/)\S*(?=\s)/,lookbehind:!0,alias:"url",inside:t.languages.uri},"http-version":{pattern:/^(\s)HTTP\/[\d.]+/,lookbehind:!0,alias:"property"}}},"response-status":{pattern:/^HTTP\/[\d.]+ \d+ .+/m,inside:{"http-version":{pattern:/^HTTP\/[\d.]+/,alias:"property"},"status-code":{pattern:/^(\s)\d+(?=\s)/,lookbehind:!0,alias:"number"},"reason-phrase":{pattern:/^(\s).+/,lookbehind:!0,alias:"string"}}},header:{pattern:/^[\w-]+:.+(?:(?:\r\n?|\n)[ \t].+)*/m,inside:{"header-value":[{pattern:e(/Content-Security-Policy/.source),lookbehind:!0,alias:["csp","languages-csp"],inside:t.languages.csp},{pattern:e(/Public-Key-Pins(?:-Report-Only)?/.source),lookbehind:!0,alias:["hpkp","languages-hpkp"],inside:t.languages.hpkp},{pattern:e(/Strict-Transport-Security/.source),lookbehind:!0,alias:["hsts","languages-hsts"],inside:t.languages.hsts},{pattern:e(/[^:]+/.source),lookbehind:!0}],"header-name":{pattern:/^[^:]+/,alias:"keyword"},punctuation:/^:/}}};var n=t.languages,r={"application/javascript":n.javascript,"application/json":n.json||n.javascript,"application/xml":n.xml,"text/xml":n.xml,"text/html":n.html,"text/css":n.css,"text/plain":n.plain},a={"application/json":!0,"application/xml":!0};function s(p){var f=p.replace(/^[a-z]+\//,""),b="\\w+/(?:[\\w.-]+\\+)+"+f+"(?![+\\w.-])";return"(?:"+p+"|"+b+")"}var i;for(var o in r)if(r[o]){i=i||{};var c=a[o]?s(o):o;i[o.replace(/\//g,"-")]={pattern:RegExp("("+/content-type:\s*/.source+c+/(?:(?:\r\n?|\n)[\w-].*)*(?:\r(?:\n|(?!\n))|\n)/.source+")"+/[^ \t\w-][\s\S]*/.source,"i"),lookbehind:!0,inside:r[o]}}i&&t.languages.insertBefore("http","header",i)})(Prism);(function(t){var e=/\\[\r\n](?:\s|\\[\r\n]|#.*(?!.))*(?![\s#]|\\[\r\n])/.source,n=/(?:[ \t]+(?![ \t])(?:<SP_BS>)?|<SP_BS>)/.source.replace(/<SP_BS>/g,function(){return e}),r=/"(?:[^"\\\r\n]|\\(?:\r\n|[\s\S]))*"|'(?:[^'\\\r\n]|\\(?:\r\n|[\s\S]))*'/.source,a=/--[\w-]+=(?:<STR>|(?!["'])(?:[^\s\\]|\\.)+)/.source.replace(/<STR>/g,function(){return r}),s={pattern:RegExp(r),greedy:!0},i={pattern:/(^[ \t]*)#.*/m,lookbehind:!0,greedy:!0};function o(c,p){return c=c.replace(/<OPT>/g,function(){return a}).replace(/<SP>/g,function(){return n}),RegExp(c,p)}t.languages.docker={instruction:{pattern:/(^[ \t]*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)(?:\\.|[^\r\n\\])*(?:\\$(?:\s|#.*$)*(?![\s#])(?:\\.|[^\r\n\\])*)*/im,lookbehind:!0,greedy:!0,inside:{options:{pattern:o(/(^(?:ONBUILD<SP>)?\w+<SP>)<OPT>(?:<SP><OPT>)*/.source,"i"),lookbehind:!0,greedy:!0,inside:{property:{pattern:/(^|\s)--[\w-]+/,lookbehind:!0},string:[s,{pattern:/(=)(?!["'])(?:[^\s\\]|\\.)+/,lookbehind:!0}],operator:/\\$/m,punctuation:/=/}},keyword:[{pattern:o(/(^(?:ONBUILD<SP>)?HEALTHCHECK<SP>(?:<OPT><SP>)*)(?:CMD|NONE)\b/.source,"i"),lookbehind:!0,greedy:!0},{pattern:o(/(^(?:ONBUILD<SP>)?FROM<SP>(?:<OPT><SP>)*(?!--)[^ \t\\]+<SP>)AS/.source,"i"),lookbehind:!0,greedy:!0},{pattern:o(/(^ONBUILD<SP>)\w+/.source,"i"),lookbehind:!0,greedy:!0},{pattern:/^\w+/,greedy:!0}],comment:i,string:s,variable:/\$(?:\w+|\{[^{}"'\\]*\})/,operator:/\\$/m}},comment:i},t.languages.dockerfile=t.languages.docker})(Prism);Prism.languages.makefile={comment:{pattern:/(^|[^\\])#(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/,lookbehind:!0},string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"builtin-target":{pattern:/\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,alias:"builtin"},target:{pattern:/^(?:[^:=\s]|[ \t]+(?![\s:]))+(?=\s*:(?!=))/m,alias:"symbol",inside:{variable:/\$+(?:(?!\$)[^(){}:#=\s]+|(?=[({]))/}},variable:/\$+(?:(?!\$)[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,keyword:/-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/,function:{pattern:/(\()(?:abspath|addsuffix|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:list|s)?)(?=[ \t])/,lookbehind:!0},operator:/(?:::|[?:+!])?=|[|@]/,punctuation:/[:;(){}]/};(function(t){var e=/\$(?:\w[a-z\d]*(?:_[^\x00-\x1F\s"'\\()$]*)?|\{[^}\s"'\\]+\})/i;t.languages.nginx={comment:{pattern:/(^|[\s{};])#.*/,lookbehind:!0,greedy:!0},directive:{pattern:/(^|\s)\w(?:[^;{}"'\\\s]|\\.|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\s+(?:#.*(?!.)|(?![#\s])))*?(?=\s*[;{])/,lookbehind:!0,greedy:!0,inside:{string:{pattern:/((?:^|[^\\])(?:\\\\)*)(?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/,lookbehind:!0,greedy:!0,inside:{escape:{pattern:/\\["'\\nrt]/,alias:"entity"},variable:e}},comment:{pattern:/(\s)#.*/,lookbehind:!0,greedy:!0},keyword:{pattern:/^\S+/,greedy:!0},boolean:{pattern:/(\s)(?:off|on)(?!\S)/,lookbehind:!0},number:{pattern:/(\s)\d+[a-z]*(?!\S)/i,lookbehind:!0},variable:e}},punctuation:/[{};]/}})(Prism);Prism.languages.c=Prism.languages.extend("clike",{comment:{pattern:/\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,greedy:!0},string:{pattern:/"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,greedy:!0},"class-name":{pattern:/(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,lookbehind:!0},keyword:/\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\b/,function:/\b[a-z_]\w*(?=\s*\()/i,number:/(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,operator:/>>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/});Prism.languages.insertBefore("c","string",{char:{pattern:/'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n]){0,32}'/,greedy:!0}});Prism.languages.insertBefore("c","string",{macro:{pattern:/(^[\t ]*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,lookbehind:!0,greedy:!0,alias:"property",inside:{string:[{pattern:/^(#\s*include\s*)<[^>]+>/,lookbehind:!0},Prism.languages.c.string],char:Prism.languages.c.char,comment:Prism.languages.c.comment,"macro-name":[{pattern:/(^#\s*define\s+)\w+\b(?!\()/i,lookbehind:!0},{pattern:/(^#\s*define\s+)\w+\b(?=\()/i,lookbehind:!0,alias:"function"}],directive:{pattern:/^(#\s*)[a-z]+/,lookbehind:!0,alias:"keyword"},"directive-hash":/^#/,punctuation:/##|\\(?=[\r\n])/,expression:{pattern:/\S[\s\S]*/,inside:Prism.languages.c}}}});Prism.languages.insertBefore("c","function",{constant:/\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\b/});delete Prism.languages.c.boolean;(function(t){var e=/\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|char8_t|class|co_await|co_return|co_yield|compl|concept|const|const_cast|consteval|constexpr|constinit|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int16_t|int32_t|int64_t|int8_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|uint16_t|uint32_t|uint64_t|uint8_t|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,n=/\b(?!<keyword>)\w+(?:\s*\.\s*\w+)*\b/.source.replace(/<keyword>/g,function(){return e.source});t.languages.cpp=t.languages.extend("c",{"class-name":[{pattern:RegExp(/(\b(?:class|concept|enum|struct|typename)\s+)(?!<keyword>)\w+/.source.replace(/<keyword>/g,function(){return e.source})),lookbehind:!0},/\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/,/\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i,/\b\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/],keyword:e,number:{pattern:/(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,greedy:!0},operator:/>>=?|<<=?|->|--|\+\+|&&|\|\||[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,boolean:/\b(?:false|true)\b/}),t.languages.insertBefore("cpp","string",{module:{pattern:RegExp(/(\b(?:import|module)\s+)/.source+"(?:"+/"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|<[^<>\r\n]*>/.source+"|"+/<mod-name>(?:\s*:\s*<mod-name>)?|:\s*<mod-name>/.source.replace(/<mod-name>/g,function(){return n})+")"),lookbehind:!0,greedy:!0,inside:{string:/^[<"][\s\S]+/,operator:/:/,punctuation:/\./}},"raw-string":{pattern:/R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,alias:"string",greedy:!0}}),t.languages.insertBefore("cpp","keyword",{"generic-function":{pattern:/\b(?!operator\b)[a-z_]\w*\s*<(?:[^<>]|<[^<>]*>)*>(?=\s*\()/i,inside:{function:/^\w+/,generic:{pattern:/<[\s\S]+/,alias:"class-name",inside:t.languages.cpp}}}}),t.languages.insertBefore("cpp","operator",{"double-colon":{pattern:/::/,alias:"punctuation"}}),t.languages.insertBefore("cpp","class-name",{"base-clause":{pattern:/(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,lookbehind:!0,greedy:!0,inside:t.languages.extend("cpp",{})}}),t.languages.insertBefore("inside","double-colon",{"class-name":/\b[a-z_]\w*\b(?!\s*::)/i},t.languages.cpp["base-clause"])})(Prism);Prism.languages.go=Prism.languages.extend("clike",{string:{pattern:/(^|[^\\])"(?:\\.|[^"\\\r\n])*"|`[^`]*`/,lookbehind:!0,greedy:!0},keyword:/\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,boolean:/\b(?:_|false|iota|nil|true)\b/,number:[/\b0(?:b[01_]+|o[0-7_]+)i?\b/i,/\b0x(?:[a-f\d_]+(?:\.[a-f\d_]*)?|\.[a-f\d_]+)(?:p[+-]?\d+(?:_\d+)*)?i?(?!\w)/i,/(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?[\d_]+)?i?(?!\w)/i],operator:/[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,builtin:/\b(?:append|bool|byte|cap|close|complex|complex(?:64|128)|copy|delete|error|float(?:32|64)|u?int(?:8|16|32|64)?|imag|len|make|new|panic|print(?:ln)?|real|recover|rune|string|uintptr)\b/});Prism.languages.insertBefore("go","string",{char:{pattern:/'(?:\\.|[^'\\\r\n]){0,10}'/,greedy:!0}});delete Prism.languages.go["class-name"];(function(t){var e=/\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record(?!\s*[(){}[\]<>=%~.:,;?+\-*/&|^])|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/,n=/(?:[a-z]\w*\s*\.\s*)*(?:[A-Z]\w*\s*\.\s*)*/.source,r={pattern:RegExp(/(^|[^\w.])/.source+n+/[A-Z](?:[\d_A-Z]*[a-z]\w*)?\b/.source),lookbehind:!0,inside:{namespace:{pattern:/^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,inside:{punctuation:/\./}},punctuation:/\./}};t.languages.java=t.languages.extend("clike",{string:{pattern:/(^|[^\\])"(?:\\.|[^"\\\r\n])*"/,lookbehind:!0,greedy:!0},"class-name":[r,{pattern:RegExp(/(^|[^\w.])/.source+n+/[A-Z]\w*(?=\s+\w+\s*[;,=()]|\s*(?:\[[\s,]*\]\s*)?::\s*new\b)/.source),lookbehind:!0,inside:r.inside},{pattern:RegExp(/(\b(?:class|enum|extends|implements|instanceof|interface|new|record|throws)\s+)/.source+n+/[A-Z]\w*\b/.source),lookbehind:!0,inside:r.inside}],keyword:e,function:[t.languages.clike.function,{pattern:/(::\s*)[a-z_]\w*/,lookbehind:!0}],number:/\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,operator:{pattern:/(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,lookbehind:!0},constant:/\b[A-Z][A-Z_\d]+\b/}),t.languages.insertBefore("java","string",{"triple-quoted-string":{pattern:/"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,greedy:!0,alias:"string"},char:{pattern:/'(?:\\.|[^'\\\r\n]){1,6}'/,greedy:!0}}),t.languages.insertBefore("java","class-name",{annotation:{pattern:/(^|[^.])@\w+(?:\s*\.\s*\w+)*/,lookbehind:!0,alias:"punctuation"},generics:{pattern:/<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,inside:{"class-name":r,keyword:e,punctuation:/[<>(),.:]/,operator:/[?&|]/}},import:[{pattern:RegExp(/(\bimport\s+)/.source+n+/(?:[A-Z]\w*|\*)(?=\s*;)/.source),lookbehind:!0,inside:{namespace:r.inside.namespace,punctuation:/\./,operator:/\*/,"class-name":/\w+/}},{pattern:RegExp(/(\bimport\s+static\s+)/.source+n+/(?:\w+|\*)(?=\s*;)/.source),lookbehind:!0,alias:"static",inside:{namespace:r.inside.namespace,static:/\b\w+$/,punctuation:/\./,operator:/\*/,"class-name":/\w+/}}],namespace:{pattern:RegExp(/(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)(?!<keyword>)[a-z]\w*(?:\.[a-z]\w*)*\.?/.source.replace(/<keyword>/g,function(){return e.source})),lookbehind:!0,inside:{punctuation:/\./}}})})(Prism);(function(t){for(var e=/\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|<self>)*\*\//.source,n=0;n<2;n++)e=e.replace(/<self>/g,function(){return e});e=e.replace(/<self>/g,function(){return/[^\s\S]/.source}),t.languages.rust={comment:[{pattern:RegExp(/(^|[^\\])/.source+e),lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/,greedy:!0},char:{pattern:/b?'(?:\\(?:x[0-7][\da-fA-F]|u\{(?:[\da-fA-F]_*){1,6}\}|.)|[^\\\r\n\t'])'/,greedy:!0},attribute:{pattern:/#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/,greedy:!0,alias:"attr-name",inside:{string:null}},"closure-params":{pattern:/([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/,lookbehind:!0,greedy:!0,inside:{"closure-punctuation":{pattern:/^\||\|$/,alias:"punctuation"},rest:null}},"lifetime-annotation":{pattern:/'\w+/,alias:"symbol"},"fragment-specifier":{pattern:/(\$\w+:)[a-z]+/,lookbehind:!0,alias:"punctuation"},variable:/\$\w+/,"function-definition":{pattern:/(\bfn\s+)\w+/,lookbehind:!0,alias:"function"},"type-definition":{pattern:/(\b(?:enum|struct|trait|type|union)\s+)\w+/,lookbehind:!0,alias:"class-name"},"module-declaration":[{pattern:/(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/,lookbehind:!0,alias:"namespace"},{pattern:/(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/,lookbehind:!0,alias:"namespace",inside:{punctuation:/::/}}],keyword:[/\b(?:Self|abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,/\b(?:bool|char|f(?:32|64)|[ui](?:8|16|32|64|128|size)|str)\b/],function:/\b[a-z_]\w*(?=\s*(?:::\s*<|\())/,macro:{pattern:/\b\w+!/,alias:"property"},constant:/\b[A-Z_][A-Z_\d]+\b/,"class-name":/\b[A-Z]\w*\b/,namespace:{pattern:/(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,inside:{punctuation:/::/}},number:/\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:f32|f64|[iu](?:8|16|32|64|size)?))?\b/,boolean:/\b(?:false|true)\b/,punctuation:/->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,operator:/[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/},t.languages.rust["closure-params"].inside.rest=t.languages.rust,t.languages.rust.attribute.inside.string=t.languages.rust.string})(Prism);var Kt={rb:"ruby",gemfile:"ruby",gemspec:"ruby",irb:"ruby",rake:"ruby",rails:"ruby",ru:"ruby",yml:"yaml",html:"markup",htm:"markup",xml:"markup",svg:"markup",xhtml:"markup",sh:"bash",shell:"bash",shellscript:"bash",zsh:"bash",ksh:"bash",console:"shell-session",terminal:"shell-session",js:"javascript",mjs:"javascript",cjs:"javascript",node:"javascript",ts:"typescript",md:"markdown",jsonc:"json",json5:"json",dockerfile:"docker",make:"makefile",mk:"makefile",patch:"diff",gitdiff:"diff",curl:"http",rest:"http",dotenv:"ini",env:"ini",cfg:"ini",conf:"nginx"};function be(){let t=Object.create(null);t.render=(n,r)=>{r.innerHTML=C.parse(n),r.querySelectorAll("pre code").forEach(a=>e(a)),r.querySelectorAll("a").forEach(a=>{a.target="_blank",a.rel="noopener"})};function e(n){let r=/\blang(?:uage)?-([\w-]+)/i.exec(n.className||""),a=r&&r[1].toLowerCase(),s=a&&(Kt[a]||a),i=s&&Le.default.languages[s];i&&(n.className=`language-${s}`,n.innerHTML=Le.default.highlight(n.textContent,i,s))}return t}function Qe(t={}){let e=Object.create(null),{url:n,body:r,headers:a,withCredentials:s=!1}=t,i=t.method||"POST",o={};e.CONNECTING=0,e.OPEN=1,e.CLOSED=2,e.readyState=e.CONNECTING,e.url=n;let c=null,p="",f=r==null?void 0:typeof r=="string"||r instanceof URLSearchParams||typeof FormData<"u"&&r instanceof FormData?r:new URLSearchParams(r),b=f instanceof URLSearchParams||f==null?{"Content-Type":"application/x-www-form-urlencoded",...a}:{...a},w=(l,d)=>{let h=typeof MessageEvent=="function"?new MessageEvent(l,{data:d}):{type:l,data:d};for(let g of o[l]||[])g(h)},k=l=>{let d="message",h=[];for(let g of l.split(`
`))g.startsWith("event:")?d=g.slice(6).trim():g.startsWith("data:")&&h.push(g.slice(5).trim());h.length&&w(d,h.join(`
`))},y=()=>{let l;for(;(l=p.indexOf(`

`))!==-1;){let d=p.slice(0,l);p=p.slice(l+2),k(d)}};e.addEventListener=(l,d)=>((o[l]||=[]).push(d),e),e.removeEventListener=(l,d)=>(o[l]=(o[l]||[]).filter(h=>h!==d),e),e.close=()=>{e.readyState!==e.CLOSED&&(e.readyState=e.CLOSED,c?.abort(),c=null)},e.active=()=>e.readyState===e.OPEN||e.readyState===e.CONNECTING,c=new AbortController;let u=c.signal;return fetch(n,{method:i,headers:b,body:f,signal:u,credentials:s?"include":"same-origin"}).then(async l=>{if(!l.ok)throw new Error(await l.text()||`${l.status}`);if(e.readyState===e.CLOSED)return;e.readyState=e.OPEN;let d=l.body.getReader(),h=new TextDecoder;for(;;){let{value:g,done:v}=await d.read();if(v)break;p+=h.decode(g,{stream:!0}),y()}e.close()}).catch(l=>{if(e.readyState===e.CLOSED||l.name==="AbortError"){e.close();return}e.close();let d=typeof MessageEvent=="function"?new MessageEvent("error",{data:l.message||String(l)}):{type:"error",data:l.message||String(l),message:l.message};for(let h of o.error||[])h(d)}),e}function Je(t={}){let e=Object.create(null),{path:n,headers:r}=t,a=["onContent","onToolCall","onToolReturn","onGoodbye","onError"],s=null;return e.onContent=t.onContent||(i=>{}),e.onToolCall=t.onToolCall||(i=>{}),e.onToolReturn=t.onToolReturn||(i=>{}),e.onGoodbye=t.onGoodbye||(i=>{}),e.onError=t.onError||(i=>{}),e.attach=i=>{if(s)return e;let o=Qe({url:n,headers:r,body:{q:i}});for(let c of a)o.addEventListener(c,p=>{e[c]?.(JSON.parse(p.data)),(c==="onGoodbye"||c==="onError")&&e.close()});return o.addEventListener("error",c=>{e.onError({error:c.data}),e.close()}),s=o,e},e.close=()=>{s&&(s.close(),s=null)},e.active=()=>!!s,e}function et(){let t=Object.create(null);return t.active=new Map,t.completed=new Map,t.onToolCall=e=>{t.active.set(e.id,e.name)},t.onToolReturn=e=>{t.active.delete(e.id),t.completed.set(e.name,(t.completed.get(e.name)||0)+1)},t}var Vt=200,Qt=6;function tt({root:t,host:e}){let n=Object.create(null),r=t.querySelector(".ac-panels"),a=t.querySelector(".ac-activity"),s=t.querySelector(".ac-panel-view"),i=s.querySelector(".ac-panel-title"),o=s.querySelector(".ac-panel-body"),c=s.querySelector(".ac-panel-note"),p=!1,f=be();n.items=[],n.open=null,n.set=S=>{n.items=S||[],queueMicrotask(()=>{let A=n.items.find(L=>L.open);A&&!n.open&&n.show(A.label)}),r.innerHTML="",n.items.forEach((A,L)=>{L&&r.append(u());let I=document.createElement("button");I.type="button",I.className="ac-panel",I.dataset.panel=A.label,I.setAttribute("part","panel"),I.setAttribute("aria-expanded","false");let U=document.createElement("span");if(U.className="ac-panel-label",U.textContent=A.label,I.append(U),A.badge){let P=document.createElement("span");P.className="ac-panel-badge",P.textContent=A.badge,I.append(P)}d(A.label)==="hover"&&I.addEventListener("pointerenter",()=>{n.open||n.show(A.label)}),I.addEventListener("click",P=>{P.preventDefault(),P.stopPropagation(),n.toggle(A.label)}),A.aside&&I.append(...Array.isArray(A.aside)?A.aside:[A.aside]),r.append(I)}),n.open&&!n.items.some(A=>A.label===n.open)&&n.close()};function b(S,A){let L=S.getAttribute("name");return L!==null&&L===A.getAttribute("name")}function w(S){return(S.querySelector("summary")||S).textContent.replace(/\s+/g," ").trim()}function k(S,A){let L=S.getAttribute("name"),I=A.filter(U=>U.getAttribute("name")===L);return{name:L,key:S.dataset.key||null,at:I.indexOf(S),of:I.length,label:w(S)}}function y(){let S=document.createElement("div");return S.className="ac-panel-spin",S.setAttribute("part","panel-spin"),S.setAttribute("role","status"),S.setAttribute("aria-label","Loading"),S.append(document.createElement("span")),S}function u(){let S=document.createElement("span");return S.className="ac-panel-divider",S.setAttribute("part","panel-divider"),S.setAttribute("aria-hidden","true"),S.textContent="|",S}function l(S){return r.querySelector(`.ac-panel[data-panel="${S}"]`)}n.refresh=()=>{for(let S of r.querySelectorAll(".ac-panel")){let A=S.dataset.panel===n.open;S.classList.toggle("is-open",A),S.setAttribute("aria-expanded",A?"true":"false")}},n.toggle=S=>{n.open===S?n.close():n.show(S)},n.show=async(S,A={})=>{let L=A.quiet===!0,I=n.items.find($=>$.label===S);if(!I)return;if(n.open!==S&&(n.open=S,n.refresh(),e.setAttribute("panel",S),i.textContent=S,c.hidden=!0,g(S),q()),n.follow=()=>{let $=n.items.find(z=>z.follow);$&&n.open!==$.label&&n.show($.label)},I.render){c.hidden=!0,o.innerHTML="",I.render(o);return}if(I.content){c.hidden=!0,o.innerHTML="";for(let $ of I.content)o.append($);return}let U=()=>{let $=[...o.querySelectorAll("details")];return{keys:new Set($.map(z=>z.dataset.key).filter(Boolean)),opened:$.filter(z=>z.open).map(z=>k(z,$))}},{keys:P,opened:G}=U();if(L&&R&&(N=!0,Date.now()-m<_))return;let K=++T;L||(c.hidden=!0,o.innerHTML="",o.append(y()));let V=null,te=!1;R=!0,m=Date.now();try{V=await I.load()}catch{te=!0}if(R=!1,N&&(N=!1,n.show(S,{quiet:!0})),te){L||(o.innerHTML="",c.textContent="That could not be loaded.",c.hidden=!1);return}if(n.open!==S||K<x)return;x=K,c.hidden=!0,L&&({keys:P,opened:G}=U());let oe=o.scrollTop;o.innerHTML=V||"";let Z=[...o.querySelectorAll("details")],Q=new Set;for(let $ of Z){let z=$.dataset.key;if(!(!$.hasAttribute("open")||!z||P.has(z))){Q.add($.getAttribute("name")),$.open=!0;for(let ne of Z)ne!==$&&b(ne,$)&&(ne.open=!1)}}for(let $ of G){if(Q.has($.name))continue;let z=Z.filter(W=>W.getAttribute("name")===$.name),ne=z.length>$.of?z[z.length-($.of-$.at)]:null,le=($.key!==null?Z.find(W=>W.dataset.key===$.key):null)||(z.length===$.of?z[$.at]:null)||ne||z.find(W=>w(W)===$.label);if(le){for(let W of Z)W!==le&&b(W,le)&&(W.open=!1);le.open=!0}}for(let $ of o.querySelectorAll("[data-markdown]"))f.render($.textContent,$);o.scrollTop=oe},n.close=()=>{n.open&&(n.open=null,n.refresh(),e.removeAttribute("panel"),M(),o.innerHTML="")};function d(S){let A=e.querySelectorAll("agent-panel[trigger]");for(let L of A)if(L.getAttribute("label")===S)return L.getAttribute("trigger");return null}function h(S){let A=e.querySelectorAll("agent-panel[appears-on]");for(let L of A)if(L.getAttribute("label")===S)return L.getAttribute("appears-on");return null}function g(S){if(h(S)==="right"){s.classList.add("is-side"),s.style.top=s.style.left=s.style.width=s.style.height=s.style.bottom="";return}s.classList.remove("is-side");let A=e.getBoundingClientRect(),I=(l(S)||a).getBoundingClientRect(),U=a.getBoundingClientRect(),P=Math.min(Math.max(Math.round(U.width/3),Vt),Math.round(U.width)),G=Math.min(Math.max(8,Math.round(I.left-A.left)),Math.max(8,Math.round(A.width-P-8)));s.style.left=`${G}px`,s.style.width=`${P}px`,s.style.top="auto",s.style.bottom=`${Math.round(A.bottom-I.top+Qt)}px`}function v(){if(p)return;p=!0,document.addEventListener("pointerdown",A=>{if(!n.open)return;let L=A.composedPath();!L.includes(s)&&!L.includes(r)&&!L.includes(e)&&n.close()},!0),document.addEventListener("keydown",A=>{A.key==="Escape"&&(t.querySelector("dialog[open]")||n.close())});let S=s.querySelector(".ac-panel-close");S&&S.addEventListener("click",()=>n.close())}typeof ResizeObserver=="function"&&new ResizeObserver(()=>{n.open&&g(n.open)}).observe(e),typeof window<"u"&&window.addEventListener("resize",()=>{n.open&&g(n.open)});let T=0,x=0,R=!1,N=!1,m=0,_=2e4,F=null;function D(){F&&clearTimeout(F),F=null}function B(){D(),F=setTimeout(()=>{F=null,n.close()},240)}function q(){v(),s.classList.add("is-open")}function M(){s.classList.remove("is-open")}if(typeof e<"u"&&typeof setInterval=="function"){let S=!1,A=()=>{if(!n.open)return;let L=n.open;n.open=null,n.show(L,{quiet:!0})};setInterval(()=>{let L=e.hasAttribute("busy");(L||S)&&A(),S=L},1200)}return n}function nt(t={}){let e=Object.create(null),n=t.host,r=t.root,a=r.querySelector(".ac-answer"),s=r.querySelector(".ac-form"),i=r.querySelector(".ac-reset"),o=r.querySelector(".ac-expand"),c=et(),p=tt({root:r,host:n}),f=r.querySelector('slot[name="panels"]'),b=()=>(f?.assignedElements()||[]).filter(m=>m.localName==="agent-panel").map(m=>m.panel()),w=()=>[...b(),...t.panels||[]].filter(Boolean);f&&f.addEventListener("slotchange",()=>p.set(w()));let k={data:{...t.labels||{},fallback:{call:"Running {name} tool\u2026",return:"Tool {name} finished"}},for(m){let{data:_}=this;return _[m]||_["*"]||_.default||_.fallback},slot(m,_){for(let F of n.children){let D=F.getAttribute("slot");if(D===`tool.${m}.${_}`||D===`tool.*.${_}`)return F}},text(m,_,F){let D=_==="return"?"return":"call",B=this.slot(m,D);if(B)return B.textContent;let q=this.for(m);switch(_){case"return":return typeof q=="string"?F.count?q:void 0:q.return;default:return typeof q=="string"?q:q.call}},icon(m,_){let F=_==="return"?"return-icon":"call-icon",D=this.slot(m,F);if(D)return D;let B=this.for(m);return typeof B=="object"&&B&&B[F]?B[F]:g.default(_)},substitute(m,_){return m.replace(/\{(\w+)(?:\.(\w+))?\}/g,(F,D,B)=>D==="arguments"?B?_.arguments?.[B]??"":"":_[D]??"")},resolve(m,_){let F=this.text(m.name,_,m);return typeof F=="function"&&(F=F(m)),typeof F=="string"&&(F=this.substitute(F,m)),{text:F,icon:this.icon(m.name,_)}},active(m){return this.resolve(m,"active")},done(m){return this.resolve(m,"return")}},y={el:r.querySelector(".ac-status"),thinking:"Thinking\u2026",render({text:m,icon:_,thinking:F}){let{el:D}=this;if(D.replaceChildren(),_&&D.append(_.cloneNode(!0)),m!=null){let B=document.createElement("span");B.textContent=m,F&&(B.className="is-thinking"),D.append(B)}},follow(){let m=[...c.active.keys()].pop();if(m!=null){this.render(k.active({id:m,name:c.active.get(m)}));return}if(x){this.render({text:this.thinking,thinking:!0});return}this.render({})}},u={el:r.querySelector(".ac-placeholder"),last:r.querySelector(".ac-last-message"),show(){let{el:m}=this;m.hidden=!1,this.last&&(this.last.hidden=!0)},hide(){let{el:m}=this;m.hidden=!0,this.last&&(this.last.hidden=!0)},restore(m){this.last&&(t.renderer.render(m,this.last),this.el.classList.add("is-restored"),this.el.hidden=!0,this.last.hidden=!1)},forget(){this.last&&(this.el.classList.remove("is-restored"),this.el.hidden=!1,this.last.hidden=!0,this.last.innerHTML="")}},l={el:r.querySelector(".ac-loading"),show(){this.el&&(this.el.hidden=!1)},hide(){this.el&&(this.el.hidden=!0)}};u.hide(),l.show();let d=m=>{l.hide(),n.dispatchEvent(new CustomEvent("describe",{detail:m})),!R&&(m?.last_message?u.restore(m.last_message):u.show())},h=async()=>{try{let m=await t.http.describe();if(!m.ok)throw new Error(String(m.status));d(await m.json())}catch{d(void 0)}},g={el:r,default(m){let{el:_}=this,F=_.querySelector(m==="return"?".ac-icon-return":".ac-icon-call");return F?F.content.cloneNode(!0):void 0}},v={el:r.querySelector(".ac-input"),get value(){return this.el.value},clear(){this.el.value=""},busy(m){this.el.readOnly=m,r.classList.toggle("is-busy",m),n.toggleAttribute("busy",m),m&&p.follow(),m?(this.resting=this.el.placeholder,this.el.placeholder="Working on your request..."):this.resting&&(this.el.placeholder=this.resting,this.resting=null)},focus(){this.el.focus({preventScroll:!0})}},T="",x=!1,R=!1,N=Je({path:t.path,headers:t.headers,onContent(m){x=!1,y.follow(),u.hide(),T+=m.text,t.renderer.render(T,a)},onToolCall(m){c.onToolCall(m),x=!1,y.follow()},onToolReturn(m){c.onToolReturn(m),x=!0,y.follow()},onGoodbye(m){c.active.clear(),x=!1,y.follow(),v.busy(!1),T.trim()===""&&m.answer&&t.renderer.render(m.answer,a),h()},onError(m){c.active.clear(),x=!1,y.follow(),v.busy(!1),u.hide(),a.classList.add("is-error");let _="Something went wrong. Please try again.";try{_=m.error||_}catch{}a.textContent=_,h()}});return e.talk=m=>{N.active()||(R=!0,c.active.clear(),c.completed.clear(),T="",a.innerHTML="",a.classList.remove("is-error"),u.hide(),v.busy(!0),x=!0,y.follow(),N.attach(m),v.clear(),v.focus())},e.restore=m=>{l.hide(),m?.last_message?u.restore(m.last_message):u.show()},e.reset=async()=>{N.close();try{await t.http.destroy()}catch{}a.innerHTML="",a.classList.remove("is-error"),u.forget(),u.show(),c.active.clear(),c.completed.clear(),x=!1,R=!1,y.follow(),v.busy(!1),v.focus(),h()},e.focus=()=>v.focus(),e.clear=()=>{a.innerHTML="",a.classList.remove("is-error")},s.addEventListener("submit",m=>{m.preventDefault();let _=v.value.trim();_&&e.talk(_)}),i.addEventListener("click",e.reset),o.addEventListener("click",()=>{let m=r.classList.toggle("is-expanded");n.toggleAttribute("expanded",m),o.setAttribute("aria-expanded",m?"true":"false"),o.title=m?"Collapse chat":"Expand chat",v.focus()}),y.follow(),h(),p.set(w()),e.setPanels=m=>{t.panels=m||[],p.set(w())},e}var Jt=`
<style>
  :host {
    display: block;
    box-sizing: border-box;
    color: inherit;
    font: inherit;
    /* Type, taken from r.uby.dev's console: a 14px answer, 13px status,
       12px action rows and an 11px label, expressed in em so the whole
       scale moves with --ac-font-size. The furniture - composer,
       status, action rows - reads in a mono stack, the way a console
       does, while answers stay in the page's own font. */
    --ac-font-size: 0.875em;
    --ac-font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    --ac-line-height: 1.6;
    --ac-radius: 8px;
    --ac-chip-radius: 6px;
    --ac-gap: 0.571em;
    --ac-expanded-height: min(80vh, 44rem);
    /* The console's own gutter: the furniture - the composer and the activity list -
       sits this far from the frame. */
    --ac-pad-x: 1.15em;
    /* The reading column: how much further the prose is inset than the
       furniture around it, so the answer has a measure to itself while the
       composer and the status line still run nearly the full width. It
       gives a little with the viewport so a narrow screen does not lose a
       third of its measure to the sides, and expanded - where the console
       takes most of the viewport - the column is wider. */
    --ac-pad-column: clamp(0.5em, 1vw, 1em);
    --ac-pad-column-expanded: clamp(1.25em, 4vw, 4em);
    /* The live line's ink: the page's text colour when the page names one,
       otherwise the same grey as the rest of the activity. It sits in a bar
       that is otherwise furniture, and it is the one thing on screen that
       is moving. */
    --ac-ink: var(--fg, var(--ac-muted));
    /* How far the reading column's content sits from the console's top and
       bottom - the greeting and a streamed answer alike. Zero by default,
       so an answer starts flush; a host whose greeting carries a leading
       margin sets it to match, and the text then holds still when the
       first response arrives. */
    --ac-lead: 0;
    /* Colour, taken from the page when the page names its palette -
       custom properties inherit into a shadow tree, so a site that
       defines --bg/--line/--surface/--muted/--accent gets the console
       in its own colours with no configuration. Plain neutrals
       otherwise: no colour functions, because one parked in a custom
       property cannot fall back, and turns currentColor. */
    --ac-accent: var(--accent, currentColor);
    --ac-background: var(--bg, transparent);
    --ac-border: var(--line, rgba(128, 128, 128, 0.35));
    --ac-surface: var(--surface, rgba(128, 128, 128, 0.08));
    --ac-muted: var(--muted, rgba(128, 128, 128, 1));
    font-size: var(--ac-font-size, 0.875em);
  }

  :host([disabled]) {
    opacity: 0.5;
    pointer-events: none;
  }

  .ac-console {
    position: relative;
    --ac-bar-scale: 0.86;
    align-items: stretch;
    background: var(--ac-background);
    border: 1px solid var(--ac-border);
    /* Open at the bottom: the composer closes the card, so the console is
       the top of it. */
    border-bottom: 0;
    border-radius: var(--ac-radius) var(--ac-radius) 0 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    /* No gap: the rows own their spacing. The bar belongs to the composer
       and sits flush against it, so a single gap between all of them would
       push the two apart. */
    height: var(--ac-height, auto);
    /* A console measured from its invitation alone is a thin strip when
       the host slots one line of greeting, so the default has a floor:
       the first answer has somewhere to arrive before the console starts
       to scroll. A taller invitation still wins, an explicit height or an
       expanded console overrides it, and a host that wants a different
       floor sets --ac-height-min. */
    min-height: var(--ac-height-min, 24em);
    overflow: hidden;
    padding: 1em var(--ac-pad-x);
  }

  /* Expanded, the console takes the height the host gave it. The overlay
     that presents it - a fixed, centred panel over a muted backdrop - is
     the host's: it has to be, because it styles the host element itself,
     and a rule in here can never win against the page's own rule for
     agent-console. Shadow styles yield to the page on the host, the same
     way they do on a slotted element. */
  :host([expanded]) .ac-console,
  .ac-console.is-expanded {
    /* The host named a height, so the default's floor does not apply. */
    height: var(--ac-expanded-height);
    min-height: 0;
  }

  .ac-body {
    flex: 1 1 auto;
    min-height: 0;
    /* Scrolling is the reader's: the console never moves this itself,
       and anchoring is off so a replaced answer cannot shift the view. */
    overflow: auto;
    overflow-anchor: none;
    overscroll-behavior: contain;
    /* The reading column. The console's own gutter stays on the frame, so
       the composer below keeps nearly the full width and the scrollbar sits
       at the console's edge rather than in the middle of the text. */
    padding-left: var(--ac-pad-column);
    padding-right: var(--ac-pad-column);
    /* Reserve the scrollbar's lane whether or not it is showing. The
       answer grows past the console as it streams, so a scrollbar that
       appeared mid-stream would narrow the content box and re-wrap every
       line - a ripple through the answer as it arrives. */
    scrollbar-gutter: stable;
    scrollbar-width: thin;
  }

  /* Expanded, the console takes most of the viewport, so the column gets
     more air. */
  :host([expanded]) .ac-body,
  .ac-console.is-expanded .ac-body {
    padding-left: var(--ac-pad-column-expanded);
    padding-right: var(--ac-pad-column-expanded);
  }

  .ac-answer {
    flex: 0 0 auto;
    line-height: var(--ac-line-height, 1.6);
    /* A long URL or a pasted token in an answer should wrap rather than
       widen the console past the reading column. */
    overflow-wrap: break-word;
  }

  /* One inset for the reading column's first line. The answer's own first
     block has its top margin zeroed below, and whatever a host slots in as
     a placeholder may carry one of its own, so the inset is set on the two
     boxes instead: greeting and answer start on the same line, and the
     text does not jump up when the first response arrives. */
  .ac-answer,
  .ac-placeholder {
    margin-top: var(--ac-lead, 0);
  }

  /* The same inset again underneath. The placeholder is the whole of what
     there is to read before a turn starts, so that end is bracketed; the
     answer runs past the bottom of the console and scrolls, so there it is
     the breathing room at the end of the text. */
  .ac-answer,
  .ac-placeholder {
    margin-bottom: var(--ac-lead, 0);
  }

  /* The answer arrives in two parts: the settled blocks, which are only
     ever appended to, and the trailing block, which is re-rendered as it
     is written. */
  .ac-answer > .ac-render-settled > :first-child { margin-top: 0; }
  .ac-answer > .ac-render-tail > :last-child { margin-bottom: 0; }

  .ac-answer > :first-child { margin-top: 0; }
  .ac-answer > :last-child { margin-bottom: 0; }
  .ac-answer.is-error { color: #b42318; }

  /* Markdown, at the sizes r.uby.dev's console ran at. Headings sit at body
     size in the body's own colour: the blue column and the weight are what
     set them apart, not scale or hue. Code chips on --ac-surface, pre with
     the accent on its edge. Everything is in em, so it follows
     --ac-font-size. */
  .ac-answer h1,
  .ac-answer h2,
  .ac-answer h3,
  .ac-answer h4,
  .ac-answer h5,
  .ac-answer h6 {
    border-left: 3px solid var(--ac-accent);
    font-size: 1em;
    font-weight: 600;
    line-height: 1.3;
    margin: 1em 0 0.57em;
    padding-left: 0.5em;
  }

  .ac-answer p { margin: 0 0 0.86em; }
  .ac-answer ul,
  .ac-answer ol { margin: 0 0 0.71em; padding-left: 1.43em; }
  .ac-answer li { margin-bottom: 0.43em; }
  .ac-answer li > p { margin-bottom: 0.43em; }
  .ac-answer strong { font-weight: 700; }
  .ac-answer em { color: var(--ac-muted); }

  /* A link is the prose: the page's ink, and the page's weight. Nothing
     marks it until the pointer arrives, when it bolds - which is the
     signal the rest of the site uses too. */
  .ac-answer a {
    color: inherit;
    font-weight: inherit;
    text-decoration: none;
  }

  .ac-answer a:hover { font-weight: 700; }

  .ac-answer code {
    background: var(--ac-surface);
    border-radius: 3px;
    font-family: var(--ac-font-mono);
    font-size: 0.9em;
    padding: 0.12em 0.28em;
    white-space: break-spaces;
  }

  .ac-answer pre {
    background: var(--ac-surface);
    border: 1px solid var(--ac-border);
    border-left: 3px solid var(--ac-accent);
    border-radius: var(--ac-chip-radius);
    margin: 0.86em 0 1em;
    overflow-x: auto;
    padding: 0.86em 1em;
  }

  .ac-answer pre code {
    background: transparent;
    border: 0;
    border-radius: 0;
    display: block;
    font-size: 0.93em;
    line-height: 1.6;
    overflow-wrap: normal;
    padding: 0;
    tab-size: 2;
    white-space: pre;
    word-break: normal;
  }

  /* A Prism theme, because a shadow tree cannot inherit the page's,
     so highlighted code would otherwise render as plain text. The
     palette is GitHub's, in both of its modes: the plain value is the
     light one and the light-dark() line picks per the page's own
     color-scheme, dropping back to the plain value where a browser
     does not know the function. */
  .ac-answer .token.punctuation { color: inherit; }

  .ac-answer .token.comment,
  .ac-answer .token.prolog,
  .ac-answer .token.doctype,
  .ac-answer .token.cdata {
    color: #6e7781;
    color: light-dark(#6e7781, #8b949e);
  }

  .ac-answer .token.property,
  .ac-answer .token.tag,
  .ac-answer .token.constant,
  .ac-answer .token.symbol,
  .ac-answer .token.deleted,
  .ac-answer .token.interpolation { color: inherit; }

  .ac-answer .token.boolean,
  .ac-answer .token.number {
    color: #0550ae;
    color: light-dark(#0550ae, #79c0ff);
  }

  .ac-answer .token.selector,
  .ac-answer .token.attr-name,
  .ac-answer .token.string,
  .ac-answer .token.char,
  .ac-answer .token.inserted,
  .ac-answer .token.string-literal {
    color: #0a3069;
    color: light-dark(#0a3069, #a5d6ff);
  }

  .ac-answer .token.builtin {
    color: #953800;
    color: light-dark(#953800, #ffa657);
  }

  .ac-answer .token.operator,
  .ac-answer .token.entity,
  .ac-answer .token.url {
    color: #0550ae;
    color: light-dark(#0550ae, #79c0ff);
  }

  .ac-answer .token.atrule,
  .ac-answer .token.attr-value,
  .ac-answer .token.keyword {
    color: #cf222e;
    color: light-dark(#cf222e, #ff7b72);
  }

  .ac-answer .token.function,
  .ac-answer .token.class-name,
  .ac-answer .token.method-definition {
    color: #8250df;
    color: light-dark(#8250df, #d2a8ff);
  }

  .ac-answer .token.regex,
  .ac-answer .token.important,
  .ac-answer .token.variable {
    color: #953800;
    color: light-dark(#953800, #ffa657);
  }

  .ac-answer .token.bold { font-weight: 700; }
  .ac-answer .token.italic { font-style: italic; }

  .ac-answer blockquote {
    border-left: 3px solid var(--ac-accent);
    color: var(--ac-muted);
    margin: 0 0 0.75em;
    padding-left: 0.75em;
  }

  .ac-answer table {
    border-collapse: collapse;
    font-size: 0.95em;
    margin: 0 0 0.75em;
    width: 100%;
  }

  .ac-answer th,
  .ac-answer td {
    border-top: 1px solid var(--ac-border);
    padding: 0.4em 0.5em;
    text-align: left;
  }

  .ac-answer th { font-weight: 600; }
  .ac-answer img { max-width: 100%; }
  .ac-answer hr { border: 0; border-top: 1px solid var(--ac-border); }

  /* The placeholder box takes the page's own ink, so a greeting slotted in
     from the page reads like the page's text rather than like furniture.
     The default greeting, used when the host slots none of its own, is
     styled below: it is a placeholder, and reads muted. */
  .ac-placeholder { color: inherit; }

  .ac-placeholder span { color: var(--ac-muted); }

  /* Before it can say anything, the console is asking where the
     conversation got to. It says so in the invitation's own box, with
     the pulse a running action has. */
  .ac-loading {
    color: var(--ac-muted);
    margin-bottom: var(--ac-lead, 0);
    margin-top: var(--ac-lead, 0);
  }

  .ac-loading span { animation: ac-pulse 1.6s ease-in-out infinite; }

  /* What a panel body holds while its markup is in flight. The ring is
     drawn in the card head's blue unless the host says otherwise. */
  .ac-panel-spin {
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: 7em;
  }

  .ac-panel-spin > span {
    animation: ac-spin 0.7s linear infinite;
    border: 2px solid var(--ac-hairline, rgba(128, 128, 128, 0.35));
    border-radius: 50%;
    border-top-color: var(--ac-card-head, #0969da);
    display: block;
    height: 18px;
    width: 18px;
  }

  @keyframes ac-spin {
    to { transform: rotate(360deg); }
  }

  /* The live line: which tool is running, "Thinking\u2026" while the turn waits
     on the model, and nothing at all in between. It is always on screen -
     the bar it sits in never blinks out - but it only speaks when it has
     something to say. */
.ac-status {
  align-items: center;
  color: var(--ac-ink);
  display: flex;
  font-family: var(--ac-font-mono);
  font-size: 0.88em;
  font-weight: 600;
  gap: 0.57em;
  letter-spacing: 0.01em;
  line-height: 1.2;
}

  .ac-status .is-thinking { font-style: italic; }

  /* The activity of the running turn, sitting at the top of the console:
     the live line says what is happening now, the summary counts what
     has happened, and the list is a disclosure away. Native <details>,
     so opening it is not our JavaScript. */
  .ac-activity {
    align-items: center;
    color: var(--ac-muted);
    display: flex;
    flex: 0 0 auto;
    gap: 0.71em;
    margin-left: calc(-1 * var(--ac-pad-x));
    margin-right: calc(-1 * var(--ac-pad-x));
    margin-top: 1.25em;
    min-height: 1.9em;
    padding: 0 0.72em;
    position: relative;
  }

  /* The bar steps down from the console's own text, and a card that belongs
     to the bar steps down from that: two steps, named here once so nothing
     that wants to be a card has to guess the arithmetic. */
  .ac-activity { font-size: calc(var(--ac-bar-scale) * 1em); }


  /* Panels: the bar's extras. A label opens a card above it. */
  .ac-panels {
    align-items: center;
    display: flex;
    flex: none;
    gap: 0.55em;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
  }

  /* A hairline between labels. */
  /* The pipe between two labels: the label's own size, so it stands as
     tall as the words it separates, and quiet enough not to be read as
     punctuation. */
  .ac-panel-divider {
    align-self: center;
    color: inherit;
    flex: none;
    font-family: var(--ac-font-mono);
    font-size: 0.78em;
    line-height: 1;
    opacity: 0.4;
    user-select: none;
  }

  /* The label carries the type, not the button: em
     sizes on both would compound. */
  .ac-panel {
    align-items: center;
    background: none;
    border: 0;
    border-radius: 0.25em;
    color: var(--ac-muted);
    cursor: pointer;
    display: flex;
    font: inherit;
    gap: 0.3em;
    padding: 0.1em 0;
  }

  /* Small, mono, tracked out, upper case: terminal
     furniture, not prose. */
  .ac-panel-label {
    align-items: center;
    color: inherit;
    display: flex;
    font-family: var(--ac-font-mono);
    font-size: 0.78em;
    font-weight: 700;
    letter-spacing: 0.08em;
    line-height: 1;
    text-transform: uppercase;
  }

  .ac-panel:hover,
  .ac-panel.is-open { color: var(--ac-accent); }

  .ac-panel:hover .ac-panel-label,
  .ac-panel.is-open .ac-panel-label {
    text-decoration: underline;
    text-underline-offset: 0.28em;
  }

  .ac-panel:focus-visible {
    outline: 2px solid var(--ac-accent);
    outline-offset: 2px;
  }

  .ac-panel-badge {
    border: 1px solid currentColor;
    border-radius: 0.25em;
    font-size: 0.72em;
    padding: 0 0.35em;
  }

  /* The card: one surface, one ink, one radius, a soft
     shadow. Every panel's card is this. */
  /* The card: a panel of the console, not a speech bubble. Its
     size is the host's to say, and it scrolls its own contents
     rather than the bar's. */
  .ac-card {
    background: var(--ac-help-background, #fff);
    background: var(--ac-help-background, light-dark(#fff, #161b22));
    border: 1px solid var(--ac-card-border, var(--ac-border));
    border-radius: 0.4em;
    box-shadow: var(--ac-card-shadow, 0 1px 2px rgba(0, 0, 0, 0.06), 0 12px 32px rgba(0, 0, 0, 0.18));
    color: var(--ac-help-ink, #1f2328);
    color: var(--ac-help-ink, light-dark(#1f2328, #e6edf3));
    display: none;
    flex-direction: column;
    font-family: inherit;
    font-size: var(--ac-card-size, 13px);
    line-height: 1.45;
    margin: 0;
    overflow: hidden;
    padding: 0;
    position: absolute;
    z-index: 3;
  }
  /* A sidebar panel is the console's box: a pane over the conversation. */
  .ac-card.is-side {
    bottom: 0;
    height: auto;
    left: 0;
    top: 0;
    width: 100%;
  }


  /* The heading: the card's blue, the ink on it, a rule
     under it, and tight. */
  /* The heading bar: white on the card's blue, square-edged, with
     a highlight along its top edge, like a title bar. */
  .ac-card-head {
    align-items: center;
    background: var(--ac-card-head, #0969da);
    background: var(--ac-card-head, light-dark(#0969da, #1f6feb));
    border-bottom: 1px solid var(--ac-card-head-rule, #0550ae);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);
    color: var(--ac-card-head-ink, #fff);
    display: flex;
    flex: none;
    font-family: var(--ac-font-mono);
    font-size: 0.72em;
    font-weight: 700;
    gap: 0.6em;
    justify-content: space-between;
    letter-spacing: 0.12em;
    margin: 0;
    min-height: 2.1em;
    padding: 0 0.7em;
    text-transform: uppercase;
  }

  /* The card's close control: in the heading, at the far edge, in the
     heading's own ink. */
  .ac-panel-close {
    background: none;
    border: 0;
    color: inherit;
    cursor: pointer;
    flex: none;
    font: inherit;
    font-size: 1.15em;
    line-height: 1;
    margin-left: auto;
    opacity: 0.75;
    padding: 0 0.1em;
  }

  .ac-panel-close:hover { opacity: 1; }
  .ac-panel-close:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }

  /* Panels should have room for their static content before becoming
     scrollable. Long-running traces can still scroll inside the body. */
  .ac-panel-view { max-height: min(70vh, 36em); }

  /* A closed popover is hidden by the user agent, but
     only when nothing author-level says otherwise. */
  .ac-card.is-open { display: flex; }

  /* Thin scrollbar, so a long trace reads as a pane and not
     as a page. */
  .ac-panel-body {
    overflow: auto;
    scrollbar-color: var(--ac-hairline, rgba(128, 128, 128, 0.4)) transparent;
    scrollbar-width: thin;
  }

  .ac-panel-note {
    color: inherit;
    font-size: 0.9em;
    opacity: 0.6;
    padding: 0.9em 0.7em;
  }

  .ac-panel-note[hidden] { display: none; }

  /* A turn: a disclosure, one open at a time. */
  .ac-panel-group { border-top: 1px solid var(--ac-hairline, rgba(128, 128, 128, 0.25)); }

  .ac-panel-group:first-child { border-top: 0; }

  /* A turn: a log group's heading, at the size of a heading. */
  .ac-panel-group-summary {
    align-items: center;
    cursor: pointer;
    display: flex;
    font-family: var(--ac-font-mono);
    font-size: 0.76em;
    font-weight: 500;
    gap: 0.5em;
    letter-spacing: 0.1em;
    list-style: none;
    opacity: 0.65;
    padding: 0.55em 0.7em;
    text-transform: uppercase;
    user-select: none;
  }

  .ac-panel-group-summary::-webkit-details-marker { display: none; }
  .ac-panel-group-summary:hover { color: var(--ac-accent); opacity: 1; }
  .ac-panel-group-summary:focus-visible { outline: 2px solid var(--ac-accent); outline-offset: -2px; }
  .ac-panel-group-summary .ac-icon { height: 0.8em; width: 0.8em; }

  .ac-panel-group[open] .ac-panel-group-summary .ac-icon { transform: rotate(180deg); }

  /* The count, in a chip: quiet, and the same shape as a
     label's badge. */
  /* Square chips, not pills: this is a console. */
  .ac-panel-group-count {
    border: 1px solid currentColor;
    border-radius: 0.25em;
    font-size: 0.85em;
    font-variant-numeric: tabular-nums;
    margin-left: auto;
    opacity: 0.7;
    padding: 0 0.35em;
  }

  .ac-panel-group .ac-panel-row:first-of-type { border-top: 0; }

  /* One row per thing that happened: a hairline between
     rows, nothing around them, and a tint under the
     pointer. */
  /* One event per line: a marker, its words, and how long it
     took, in columns. */
  /* One event per line: a mark, the kind of event, what it was
     called and what it carried, and how long it took. A row
     with no kind gives the mark its room back. */
  /* An event: the mark, the label and the body, and the time.
     Compact, and tall enough for what the event carried. */
  /* An event: the mark, and beside it the kind of thing that
     happened, what it was, and how long it took. */
  .ac-panel-row {
    align-items: start;
    border-top: 1px solid var(--ac-hairline, rgba(128, 128, 128, 0.25));
    display: grid;
    gap: 0 0.6em;
    grid-template-columns: 1.2em minmax(0, 1fr) auto;
    padding: 0.4em 0.7em 0.5em;
    transition: background 0.12s ease;
  }

  .ac-panel-row.has-kind {
    grid-template-columns: 1.7em 5.6em minmax(0, 1fr) auto;
  }

  .ac-panel-row:first-child { border-top: 0; }

  .ac-panel-row:hover { background: var(--ac-card-row, rgba(128, 128, 128, 0.08)); }

  /* The marker, in a column of its own so every row's words start
     at the same place. */
  /* The mark, big enough to notice, in a column of its own so
     every row's words start at the same place. */
  /* The mark, against the label rather than the body. */
  .ac-panel-row .ac-icon {
    color: inherit;
    height: 1.2em;
    margin-top: 0.1em;
    opacity: 0.9;
    width: 1.2em;
  }

  /* What each kind of event is, at a glance. */
  .ac-panel-row[data-icon="person"] .ac-icon { color: var(--ac-muted); }
  .ac-panel-row[data-icon="speech"] .ac-icon { color: var(--ac-accent); }
  .ac-panel-row[data-icon="tool"] .ac-icon { color: #bf8700; color: light-dark(#bf8700, #d29922); }
  .ac-panel-row[data-icon="return"] .ac-icon { color: #1a7f37; color: light-dark(#1a7f37, #3fb950); }
  .ac-panel-row[data-icon="clock"] .ac-icon { color: #0969da; color: light-dark(#0969da, #4493f8); }
  .ac-panel-row[data-icon="warn"] .ac-icon { color: #cf222e; opacity: 1; }

  /* What each kind of event is, at a glance. */
  .ac-panel-row[data-icon="person"] .ac-icon { color: var(--ac-muted); }
  .ac-panel-row[data-icon="speech"] .ac-icon { color: var(--ac-accent); }
  .ac-panel-row[data-icon="tool"] .ac-icon { color: #bf8700; color: light-dark(#bf8700, #d29922); }
  .ac-panel-row[data-icon="return"] .ac-icon { color: #1a7f37; color: light-dark(#1a7f37, #3fb950); }
  .ac-panel-row[data-icon="clock"] .ac-icon { color: #0969da; color: light-dark(#0969da, #4493f8); }
  .ac-panel-row[data-icon="warn"] .ac-icon { color: #cf222e; opacity: 1; }

  /* What each kind of event is, at a glance. */
  .ac-panel-row[data-icon="person"] .ac-icon { color: var(--ac-muted); }
  .ac-panel-row[data-icon="speech"] .ac-icon { color: var(--ac-accent); }
  .ac-panel-row[data-icon="tool"] .ac-icon { color: #bf8700; color: light-dark(#bf8700, #d29922); }
  .ac-panel-row[data-icon="return"] .ac-icon { color: #1a7f37; color: light-dark(#1a7f37, #3fb950); }
  .ac-panel-row[data-icon="clock"] .ac-icon { color: #0969da; color: light-dark(#0969da, #4493f8); }
  .ac-panel-row[data-icon="warn"] .ac-icon { color: #cf222e; opacity: 1; }

  /* The title, and the detail after it, on one line. */
  .ac-panel-row-kind {
    color: inherit;
    flex: none;
    font-family: var(--ac-font-mono);
    font-size: 0.68em;
    letter-spacing: 0.09em;
    opacity: 0.75;
    text-transform: uppercase;
  }

  /* The title, and the detail after it, on one line. */
  /* The label line: the kind of event, then what it was
     called. */
  /* The summary: what happened, and a plus when there is more folded
     behind it. */
  .ac-panel-row-label {
    align-items: baseline;
    cursor: pointer;
    display: flex;
    gap: 0.6em;
    list-style: none;
    min-width: 0;
    user-select: none;
  }

  /* Arguments and content are code-shaped, so they keep the mono
     face. */
  /* What the event carried, wrapped: an argument or a message
     is longer than a line. */
  /* What the event was, a line at a time: a name, each argument,
     a result. */
  .ac-panel-row-pairs {
    font-family: var(--ac-font-mono);
    font-size: 0.83em;
    margin-top: 0.1em;
  }

  .ac-panel-row-key { color: inherit; opacity: 0.6; }
  .ac-panel-row-key:after { content: ":"; }
  .ac-panel-row-value { color: inherit; overflow-wrap: anywhere; }

  /* What someone said, wrapped. */
  /* What the tool gave back: the shape of a parameter, told apart
     from them by a rule. */
  .ac-panel-row-result {
    border-top: 1px solid var(--ac-hairline, rgba(128, 128, 128, 0.25));
    margin-top: 0.25em;
    padding-top: 0.25em;
  }

  /* How long it took, in its own column: the number a reader
     is usually looking for. */
  /* How long it took, against the label. */
  .ac-panel-row-duration {
    color: inherit;
    flex: none;
    font-family: var(--ac-font-mono);
    font-size: 0.8em;
    font-variant-numeric: tabular-nums;
    opacity: 0.7;
    padding-top: 0.1em;
    text-align: right;
  }

  .ac-panel-row.is-error .ac-panel-row-title { color: #cf222e; }
  .ac-panel-row.is-error .ac-icon { color: #cf222e; opacity: 1; }
  .ac-panel-row.is-muted { opacity: 0.65; }

  @media (prefers-reduced-motion: reduce) {
    .ac-loading span { animation: none; }
    .ac-panel-spin > span { animation: none; }
  }


  /* An event: one thing that happened, and the control that opens it.
     Two columns at most: what it was, and the control at the edge. */
  /* The row is the control: no padding of its own, so the summary
     inside it is the whole row and every part of it is clickable. */
  .ac-panel-row {
    border-top: 1px solid var(--ac-hairline, rgba(128, 128, 128, 0.25));
    padding: 0;
    transition: background 0.12s ease;
  }

  /* The summary: a mark, two lines, and the control. */
  .ac-panel-row-label {
    align-items: flex-start;
    cursor: pointer;
    display: flex;
    gap: 0.55em;
    list-style: none;
    padding: 0.4em 0.7em 0.5em;
    user-select: none;
  }

  .ac-panel-row-label::-webkit-details-marker { display: none; }
  .ac-panel-row-label:focus-visible { outline: 2px solid var(--ac-accent); outline-offset: 2px; }
  .ac-panel-row-what { flex: 1 1 auto; min-width: 0; }

  .ac-panel-row-head {
    align-items: baseline;
    display: flex;
    gap: 0.55em;
    min-width: 0;
  }

  /* The mark, against the first line rather than the second. */
  .ac-panel-row .ac-icon {
    flex: none;
    height: 1.15em;
    margin-top: 0.1em;
    opacity: 0.9;
    width: 1.15em;
  }

  .ac-panel-row[data-icon="person"] .ac-icon { color: var(--ac-muted); }
  .ac-panel-row[data-icon="speech"] .ac-icon { color: var(--ac-accent); }
  .ac-panel-row[data-icon="tool"] .ac-icon { color: #bf8700; color: light-dark(#bf8700, #d29922); }
  .ac-panel-row[data-icon="return"] .ac-icon { color: #1a7f37; color: light-dark(#1a7f37, #3fb950); }
  .ac-panel-row[data-icon="clock"] .ac-icon { color: #0969da; color: light-dark(#0969da, #4493f8); }
  .ac-panel-row[data-icon="warn"] .ac-icon { color: #cf222e; opacity: 1; }

  .ac-panel-row-kind {
    color: inherit;
    flex: none;
    font-family: var(--ac-font-mono);
    font-size: 0.68em;
    letter-spacing: 0.09em;
    opacity: 0.75;
    text-transform: uppercase;
  }

  .ac-panel-row-kind[data-running] {
    color: #bf8700;
    color: light-dark(#bf8700, #d29922);
    opacity: 1;
  }

  /* How long it took: the right edge, in its own column, so the seconds
     line up down the trace. */
  .ac-panel-row-duration {
    color: inherit;
    flex: none;
    font-family: var(--ac-font-mono);
    font-size: 0.82em;
    font-variant-numeric: tabular-nums;
    margin-left: auto;
    min-width: 3.4em;
    text-align: right;
    white-space: nowrap;
  }

  .ac-panel-row-title {
    color: inherit;
    font-size: 0.94em;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* The second line: what the row was called, or what was said. */
  .ac-panel-row-subject {
    align-items: baseline;
    color: inherit;
    display: flex;
    font-family: var(--ac-font-mono);
    font-size: 0.78em;
    gap: 0.4em;
    min-width: 0;
  }

  .ac-panel-row-detail {
    color: inherit;
    display: block;
    font-family: var(--ac-font-mono);
    font-size: 0.83em;
    overflow-wrap: anywhere;
  }

  /* The key keeps its width, so a word cannot wrap letter by letter;
     the value gives way instead. */
  .ac-panel-row-key {
    color: inherit;
    flex: none;
    opacity: 0.6;
    white-space: nowrap;
  }

  .ac-panel-row-key:after { content: ":"; }

  .ac-panel-row-value {
    color: inherit;
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* What the control opens. */
  .ac-panel-row-body {
    font-family: var(--ac-font-mono);
    font-size: 0.78em;
    padding: 0 0.7em 0.6em 1.7em;
  }

  .ac-panel-row-pair {
    display: grid;
    gap: 0.4em;
    grid-template-columns: minmax(0, max-content) minmax(0, 1fr);
  }

  .ac-panel-row-result {
    border-top: 1px solid var(--ac-hairline, rgba(128, 128, 128, 0.25));
    margin-top: 0.25em;
    padding-top: 0.25em;
  }

  .ac-panel-row-result .ac-panel-row-key { color: #1a7f37; opacity: 1; }
  .ac-panel-row-result.is-error .ac-panel-row-key,
  .ac-panel-row-result.is-error .ac-panel-row-value { color: #cf222e; }


  /* A call pulses while it runs; once it returns it settles down. */

  /* Default icons, used when the host slots none of its own - and the
     sizing for the ones it does slot, which arrive as plain images. */
  .ac-icon,
  .ac-status > img,
  .ac-status > svg {
    flex: none;
    height: 1em;
    width: 1em;
  }


  /* Icons the host slots for the buttons, sized to match the ones above. */
  .ac-expand ::slotted(svg),
  .ac-reset ::slotted(svg) {
    display: block;
    height: 1em;
    width: 1em;
  }

  /* The composer: their form strip. A muted shell prompt, a borderless
     mono input, and the icon buttons at the end. It sits inside the
     console's own gutter, so the input keeps the width it had. */

  .ac-form {
    align-items: center;
    display: flex;
    font-family: var(--ac-font-mono);
    gap: var(--ac-gap);
    padding-top: 0.72em;
  }

  .ac-form:focus-within .ac-prompt { color: var(--ac-accent); }

  /* The prompt's two states: the sign, and the mark that replaces it while
     a turn is running. */
  .ac-prompt { display: inline-flex; align-items: center; }

  .ac-prompt-mark { display: none; height: 0.5em; width: 0.5em; }

  .ac-prompt-mark {
    animation: ac-breathe 1.1s ease-in-out infinite;
    background: currentColor;
    border-radius: 50%;
  }

  .ac-console.is-busy .ac-prompt-sign { display: none; }
  .ac-console.is-busy .ac-prompt-mark { display: block; }
  .ac-console.is-busy .ac-prompt { color: var(--ac-accent); }

  @keyframes ac-breathe {
    50% { opacity: 0.25; transform: scale(0.8); }
  }

  @media (prefers-reduced-motion: reduce) {
    .ac-prompt-mark { animation: none; }
  }

  .ac-prompt {
    color: var(--ac-muted);
    font-family: var(--ac-font-mono);
    user-select: none;
  }

  .ac-input {
    background: transparent;
    border: 0;
    color: inherit;
    flex: 1 1 auto;
    font: inherit;
    min-width: 0;
    padding: 0;
  }

  .ac-input:focus-visible { outline: none; }

  .ac-input::placeholder { color: var(--ac-muted); }

  .ac-input:read-only { opacity: 0.6; }

  .ac-buttons {
    display: flex;
    gap: 0.29em;
  }

  .ac-expand,
  .ac-reset {
    align-items: center;
    background: transparent;
    border: 0;
    color: var(--ac-muted);
    cursor: pointer;
    display: inline-flex;
    font: inherit;
    justify-content: center;
    padding: 0.15em;
  }

  .ac-expand:hover,
  .ac-reset:hover { color: var(--ac-accent); }

  /* The expand button shows the arrows that make sense for its state. */
  .ac-icon-collapse { display: none; }
  .ac-console.is-expanded .ac-icon-expand,
  :host([expanded]) .ac-icon-expand { display: none; }
  .ac-console.is-expanded .ac-icon-collapse,
  :host([expanded]) .ac-icon-collapse { display: block; }
</style>

<div class="ac-console" part="console">
<div class="ac-card ac-panel-view" part="card panel-view">
  <div class="ac-card-head ac-panel-head" part="card-head panel-head">
    <span class="ac-panel-title" part="panel-title"></span>
    <button class="ac-panel-close" part="panel-close" type="button" aria-label="Close">&#215;</button>
  </div>
  <div class="ac-panel-body" part="panel-body"></div>
  <div class="ac-panel-note" part="panel-note"></div>
</div>
  <template class="ac-icon-call"><svg class="ac-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></template>

  <template class="ac-icon-return"><svg class="ac-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></template>

  <div class="ac-body" part="body">
    <div class="ac-answer" part="answer"></div>

    <div class="ac-placeholder" part="placeholder">
      <slot name="placeholder"><span>Ask me anything.</span></slot>
    </div>

    <!-- Shown while the console asks where the conversation got to, so
         it never opens on an invitation that may not apply. -->
    <div class="ac-loading" part="loading"><span>Loading console\u2026</span></div>

    <!-- The last message of a conversation that has been somewhere. It
         carries the answer's class as well as its own name, so it is
         rendered, measured and highlighted as an answer is. -->
    <div class="ac-answer ac-last-message" part="last-message" hidden></div>
  </div>

    <div class="ac-activity" part="activity">
      <div class="ac-status" part="status" aria-live="polite"></div>

      <!-- The host's labels. Each opens a card. -->
      <div class="ac-panels" part="panels"></div>
    </div>


<!-- Panels arrive as <agent-panel> children. The
     slot finds them and keeps them off the page. -->
    <slot name="panels" hidden></slot>

  <form class="ac-form" part="form">
    <span class="ac-prompt" part="prompt" aria-hidden="true"><span class="ac-prompt-sign">$</span><span class="ac-prompt-mark" part="prompt-mark"></span></span>
    <input class="ac-input" part="input" type="text" autocomplete="off" placeholder="Ask\u2026" aria-label="Message">

    <div class="ac-buttons">
      <button class="ac-expand" part="expand" type="button" aria-expanded="false" title="Expand chat"><svg class="ac-icon ac-icon-expand" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg><svg class="ac-icon ac-icon-collapse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7"/></svg></button>
      <button class="ac-reset" part="reset" type="button" title="Reset console"><slot name="reset-icon"><svg class="ac-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 4v6h6M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg></slot></button>
      </div>
    </form>
</div>
`,at=document.createElement("template");at.innerHTML=Jt;function rt(){return at.content.cloneNode(!0)}var $e=class extends HTMLElement{static get observedAttributes(){return["path","agent","csrf","height","expanded","disabled","prompt","placeholder"]}constructor(){super(),this.attachShadow({mode:"open"}).append(rt())}connectedCallback(){if(this.console)return;let e=this.path||(this.agent?`agents/${this.agent}`:""),n=this.headers(),r=Oe({path:e,headers:n});this.console=nt({host:this,root:this.shadowRoot.querySelector(".ac-console"),http:r,path:e,headers:n,renderer:be(),labels:this.labels,panels:this.panels}),this.applyHeight(this.getAttribute("height")),this.applyPrompt(this.getAttribute("prompt")),this.applyPlaceholder(this.getAttribute("placeholder")),this.observePlaceholder(),this.disabled||this.focus()}attributeChangedCallback(e,n,r){e==="height"&&this.applyHeight(r),e==="prompt"&&this.applyPrompt(r),e==="placeholder"&&this.applyPlaceholder(r),e==="expanded"&&this.applyExpanded(r!==null)}applyExpanded(e){let n=this.shadowRoot?.querySelector(".ac-console");n&&n.classList.toggle("is-expanded",e)}applyPrompt(e){let n=this.shadowRoot?.querySelector(".ac-prompt-sign")||this.shadowRoot?.querySelector(".ac-prompt");n&&(n.textContent=e||"$")}applyPlaceholder(e){let n=this.shadowRoot?.querySelector(".ac-input");n&&(n.placeholder=e||"Ask\u2026")}applyHeight(e){let n=this.shadowRoot?.querySelector(".ac-console");if(!n)return;if(e){n.style.setProperty("--ac-height",e);return}n.style.removeProperty("--ac-height");let r=this.height();r>0&&n.style.setProperty("--ac-height",`${r}px`)}height(){let e=this.shadowRoot.querySelector(".ac-console"),n=this.shadowRoot.querySelector(".ac-placeholder"),r=this.shadowRoot.querySelector(".ac-loading"),a=this.shadowRoot.querySelector(".ac-last-message"),s=[n.hidden,r.hidden,a.hidden];n.hidden=!1,r.hidden=!0,a.hidden=!0;let i=e.offsetHeight;return[n,r,a].forEach((o,c)=>{o.hidden=s[c]}),i}observePlaceholder(){let e=this.shadowRoot,n=e?.querySelector(".ac-placeholder"),r=e?.querySelector(".ac-answer");if(!n||!r)return;let a=()=>!this.hasAttribute("height")&&!n.hidden&&r.childNodes.length===0;"ResizeObserver"in window&&(this.observer?.disconnect(),this.observer=new ResizeObserver(()=>{a()&&this.applyHeight()}),this.observer.observe(n)),document.fonts?.ready.then(()=>{a()&&this.applyHeight()})}disconnectedCallback(){this.observer?.disconnect(),this.observer=void 0}get path(){return this.getAttribute("path")||""}set path(e){this.setAttribute("path",e)}get agent(){return this.getAttribute("agent")||""}set agent(e){this.setAttribute("agent",e)}get prompt(){return this.getAttribute("prompt")||"$"}set prompt(e){this.setAttribute("prompt",e)}get placeholder(){return this.getAttribute("placeholder")||"Ask\u2026"}set placeholder(e){this.setAttribute("placeholder",e)}get disabled(){return this.hasAttribute("disabled")}set disabled(e){e?this.setAttribute("disabled",""):this.removeAttribute("disabled")}reset(){this.console.reset()}focus(){this.console.focus()}talk(e){this.console.talk(e)}clear(){this.console.clear()}headers(){let e=this.getAttribute("csrf")||"auto";if(e==="none")return{};let n=e==="auto"?document.querySelector('meta[name="_csrf"]')?.content:e;return n?{"X-CSRF-Token":n}:{}}get labels(){return this._labels||{}}set labels(e){this._labels=e||{}}get panels(){return this._panels||[]}set panels(e){this._panels=e||[],this.console&&this.console.setPanels(this._panels)}},Fe=class extends HTMLElement{get label(){return this.getAttribute("label")||""}set label(e){this.setAttribute("label",e)}get src(){return this.getAttribute("src")||""}set src(e){this.setAttribute("src",e)}panel(){let e=this.querySelector('[slot="aside"]'),n=[...this.children].filter(r=>r!==e);return{label:this.label,badge:this.getAttribute("badge")||"",icon:this.getAttribute("icon")||"dot",open:this.hasAttribute("open"),follow:this.hasAttribute("focus-on-turn-start"),aside:e||null,content:n.length?n:null,load:async()=>this.src?await(await fetch(this.src)).text():""}}};customElements.get("agent-console")||customElements.define("agent-console",$e);customElements.get("agent-panel")||customElements.define("agent-panel",Fe);})();
/*! Bundled license information:

prismjs/prism.js:
  (**
   * Prism: Lightweight, robust, elegant syntax highlighting
   *
   * @license MIT <https://opensource.org/licenses/MIT>
   * @author Lea Verou <https://lea.verou.me>
   * @namespace
   * @public
   *)
*/
