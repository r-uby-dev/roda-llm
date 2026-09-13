(()=>{var et=Object.create;var Te=Object.defineProperty;var tt=Object.getOwnPropertyDescriptor;var nt=Object.getOwnPropertyNames;var rt=Object.getPrototypeOf,at=Object.prototype.hasOwnProperty;var st=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var it=(t,e,n,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of nt(e))!at.call(t,r)&&r!==n&&Te(t,r,{get:()=>e[r],enumerable:!(a=tt(e,r))||a.enumerable});return t};var ot=(t,e,n)=>(n=t!=null?et(rt(t)):{},it(e||!t||!t.__esModule?Te(n,"default",{value:t,enumerable:!0}):n,t));var je=st((cn,oe)=>{var jt=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};var S=(function(t){var e=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,n=0,a={},r={manual:t.Prism&&t.Prism.manual,disableWorkerMessageHandler:t.Prism&&t.Prism.disableWorkerMessageHandler,util:{encode:function p(l){return l instanceof s?new s(l.type,p(l.content),l.alias):Array.isArray(l)?l.map(p):l.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(p){return Object.prototype.toString.call(p).slice(8,-1)},objId:function(p){return p.__id||Object.defineProperty(p,"__id",{value:++n}),p.__id},clone:function p(l,d){d=d||{};var g,f;switch(r.util.type(l)){case"Object":if(f=r.util.objId(l),d[f])return d[f];g={},d[f]=g;for(var y in l)l.hasOwnProperty(y)&&(g[y]=p(l[y],d));return g;case"Array":return f=r.util.objId(l),d[f]?d[f]:(g=[],d[f]=g,l.forEach(function(T,v){g[v]=p(T,d)}),g);default:return l}},getLanguage:function(p){for(;p;){var l=e.exec(p.className);if(l)return l[1].toLowerCase();p=p.parentElement}return"none"},setLanguage:function(p,l){p.className=p.className.replace(RegExp(e,"gi"),""),p.classList.add("language-"+l)},currentScript:function(){if(typeof document>"u")return null;if(document.currentScript&&document.currentScript.tagName==="SCRIPT")return document.currentScript;try{throw new Error}catch(g){var p=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(g.stack)||[])[1];if(p){var l=document.getElementsByTagName("script");for(var d in l)if(l[d].src==p)return l[d]}return null}},isActive:function(p,l,d){for(var g="no-"+l;p;){var f=p.classList;if(f.contains(l))return!0;if(f.contains(g))return!1;p=p.parentElement}return!!d}},languages:{plain:a,plaintext:a,text:a,txt:a,extend:function(p,l){var d=r.util.clone(r.languages[p]);for(var g in l)d[g]=l[g];return d},insertBefore:function(p,l,d,g){g=g||r.languages;var f=g[p],y={};for(var T in f)if(f.hasOwnProperty(T)){if(T==l)for(var v in d)d.hasOwnProperty(v)&&(y[v]=d[v]);d.hasOwnProperty(T)||(y[T]=f[T])}var R=g[p];return g[p]=y,r.languages.DFS(r.languages,function(F,h){h===R&&F!=p&&(this[F]=y)}),y},DFS:function p(l,d,g,f){f=f||{};var y=r.util.objId;for(var T in l)if(l.hasOwnProperty(T)){d.call(l,T,l[T],g||T);var v=l[T],R=r.util.type(v);R==="Object"&&!f[y(v)]?(f[y(v)]=!0,p(v,d,null,f)):R==="Array"&&!f[y(v)]&&(f[y(v)]=!0,p(v,d,T,f))}}},plugins:{},highlightAll:function(p,l){r.highlightAllUnder(document,p,l)},highlightAllUnder:function(p,l,d){var g={callback:d,container:p,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};r.hooks.run("before-highlightall",g),g.elements=Array.prototype.slice.apply(g.container.querySelectorAll(g.selector)),r.hooks.run("before-all-elements-highlight",g);for(var f=0,y;y=g.elements[f++];)r.highlightElement(y,l===!0,g.callback)},highlightElement:function(p,l,d){var g=r.util.getLanguage(p),f=r.languages[g];r.util.setLanguage(p,g);var y=p.parentElement;y&&y.nodeName.toLowerCase()==="pre"&&r.util.setLanguage(y,g);var T=p.textContent,v={element:p,language:g,grammar:f,code:T};function R(h){v.highlightedCode=h,r.hooks.run("before-insert",v),v.element.innerHTML=v.highlightedCode,r.hooks.run("after-highlight",v),r.hooks.run("complete",v),d&&d.call(v.element)}if(r.hooks.run("before-sanity-check",v),y=v.element.parentElement,y&&y.nodeName.toLowerCase()==="pre"&&!y.hasAttribute("tabindex")&&y.setAttribute("tabindex","0"),!v.code){r.hooks.run("complete",v),d&&d.call(v.element);return}if(r.hooks.run("before-highlight",v),!v.grammar){R(r.util.encode(v.code));return}if(l&&t.Worker){var F=new Worker(r.filename);F.onmessage=function(h){R(h.data)},F.postMessage(JSON.stringify({language:v.language,code:v.code,immediateClose:!0}))}else R(r.highlight(v.code,v.grammar,v.language))},highlight:function(p,l,d){var g={code:p,grammar:l,language:d};if(r.hooks.run("before-tokenize",g),!g.grammar)throw new Error('The language "'+g.language+'" has no grammar.');return g.tokens=r.tokenize(g.code,g.grammar),r.hooks.run("after-tokenize",g),s.stringify(r.util.encode(g.tokens),g.language)},tokenize:function(p,l){var d=l.rest;if(d){for(var g in d)l[g]=d[g];delete l.rest}var f=new c;return u(f,f.head,p),o(p,f,l,f.head,0),b(f)},hooks:{all:{},add:function(p,l){var d=r.hooks.all;d[p]=d[p]||[],d[p].push(l)},run:function(p,l){var d=r.hooks.all[p];if(!(!d||!d.length))for(var g=0,f;f=d[g++];)f(l)}},Token:s};t.Prism=r;function s(p,l,d,g){this.type=p,this.content=l,this.alias=d,this.length=(g||"").length|0}s.stringify=function p(l,d){if(typeof l=="string")return l;if(Array.isArray(l)){var g="";return l.forEach(function(R){g+=p(R,d)}),g}var f={type:l.type,content:p(l.content,d),tag:"span",classes:["token",l.type],attributes:{},language:d},y=l.alias;y&&(Array.isArray(y)?Array.prototype.push.apply(f.classes,y):f.classes.push(y)),r.hooks.run("wrap",f);var T="";for(var v in f.attributes)T+=" "+v+'="'+(f.attributes[v]||"").replace(/"/g,"&quot;")+'"';return"<"+f.tag+' class="'+f.classes.join(" ")+'"'+T+">"+f.content+"</"+f.tag+">"};function i(p,l,d,g){p.lastIndex=l;var f=p.exec(d);if(f&&g&&f[1]){var y=f[1].length;f.index+=y,f[0]=f[0].slice(y)}return f}function o(p,l,d,g,f,y){for(var T in d)if(!(!d.hasOwnProperty(T)||!d[T])){var v=d[T];v=Array.isArray(v)?v:[v];for(var R=0;R<v.length;++R){if(y&&y.cause==T+","+R)return;var F=v[R],h=F.inside,E=!!F.lookbehind,A=!!F.greedy,L=F.alias;if(A&&!F.pattern.global){var _=F.pattern.toString().match(/[imsuy]*$/)[0];F.pattern=RegExp(F.pattern.source,_+"g")}for(var C=F.pattern||F,O=g.next,D=f;O!==l.tail&&!(y&&D>=y.reach);D+=O.value.length,O=O.next){var j=O.value;if(l.length>p.length)return;if(!(j instanceof s)){var K=1,P;if(A){if(P=i(C,D,p,E),!P||P.index>=p.length)break;var V=P.index,Qe=P.index+P[0].length,U=D;for(U+=O.value.length;V>=U;)O=O.next,U+=O.value.length;if(U-=O.value.length,D=U,O.value instanceof s)continue;for(var q=O;q!==l.tail&&(U<Qe||typeof q.value=="string");q=q.next)K++,U+=q.value.length;K--,j=p.slice(D,U),P.index-=D}else if(P=i(C,0,j,E),!P)continue;var V=P.index,Q=P[0],le=j.slice(0,V),Ae=j.slice(V+Q.length),ce=D+j.length;y&&ce>y.reach&&(y.reach=ce);var J=O.prev;le&&(J=u(l,J,le),D+=le.length),m(l,J,K);var Je=new s(T,h?r.tokenize(Q,h):Q,L,Q);if(O=u(l,J,Je),Ae&&u(l,O,Ae),K>1){var ue={cause:T+","+R,reach:ce};o(p,l,d,O.prev,D,ue),y&&ue.reach>y.reach&&(y.reach=ue.reach)}}}}}}function c(){var p={value:null,prev:null,next:null},l={value:null,prev:p,next:null};p.next=l,this.head=p,this.tail=l,this.length=0}function u(p,l,d){var g=l.next,f={value:d,prev:l,next:g};return l.next=f,g.prev=f,p.length++,f}function m(p,l,d){for(var g=l.next,f=0;f<d&&g!==p.tail;f++)g=g.next;l.next=g,g.prev=l,p.length-=f}function b(p){for(var l=[],d=p.head.next;d!==p.tail;)l.push(d.value),d=d.next;return l}if(!t.document)return t.addEventListener&&(r.disableWorkerMessageHandler||t.addEventListener("message",function(p){var l=JSON.parse(p.data),d=l.language,g=l.code,f=l.immediateClose;t.postMessage(r.highlight(g,r.languages[d],d)),f&&t.close()},!1)),r;var w=r.util.currentScript();w&&(r.filename=w.src,w.hasAttribute("data-manual")&&(r.manual=!0));function k(){r.manual||r.highlightAll()}if(!r.manual){var x=document.readyState;x==="loading"||x==="interactive"&&w&&w.defer?document.addEventListener("DOMContentLoaded",k):window.requestAnimationFrame?window.requestAnimationFrame(k):window.setTimeout(k,16)}return r})(jt);typeof oe<"u"&&oe.exports&&(oe.exports=S);typeof global<"u"&&(global.Prism=S);S.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]};S.languages.markup.tag.inside["attr-value"].inside.entity=S.languages.markup.entity;S.languages.markup.doctype.inside["internal-subset"].inside=S.languages.markup;S.hooks.add("wrap",function(t){t.type==="entity"&&(t.attributes.title=t.content.replace(/&amp;/,"&"))});Object.defineProperty(S.languages.markup.tag,"addInlined",{value:function(e,n){var a={};a["language-"+n]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:S.languages[n]},a.cdata=/^<!\[CDATA\[|\]\]>$/i;var r={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:a}};r["language-"+n]={pattern:/[\s\S]+/,inside:S.languages[n]};var s={};s[e]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return e}),"i"),lookbehind:!0,greedy:!0,inside:r},S.languages.insertBefore("markup","cdata",s)}});Object.defineProperty(S.languages.markup.tag,"addAttribute",{value:function(t,e){S.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+t+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[e,"language-"+e],inside:S.languages[e]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}});S.languages.html=S.languages.markup;S.languages.mathml=S.languages.markup;S.languages.svg=S.languages.markup;S.languages.xml=S.languages.extend("markup",{});S.languages.ssml=S.languages.xml;S.languages.atom=S.languages.xml;S.languages.rss=S.languages.xml;(function(t){var e=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;t.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+e.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+e.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+e.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+e.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:e,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},t.languages.css.atrule.inside.rest=t.languages.css;var n=t.languages.markup;n&&(n.tag.addInlined("style","css"),n.tag.addAttribute("style","css"))})(S);S.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/};S.languages.javascript=S.languages.extend("clike",{"class-name":[S.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/});S.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;S.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:S.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:S.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:S.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:S.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:S.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/});S.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:S.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}});S.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}});S.languages.markup&&(S.languages.markup.tag.addInlined("script","javascript"),S.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript"));S.languages.js=S.languages.javascript;(function(){if(typeof S>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var t="Loading\u2026",e=function(w,k){return"\u2716 Error "+w+" while fetching file: "+k},n="\u2716 Error: File does not exist or is empty",a={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},r="data-src-status",s="loading",i="loaded",o="failed",c="pre[data-src]:not(["+r+'="'+i+'"]):not(['+r+'="'+s+'"])';function u(w,k,x){var p=new XMLHttpRequest;p.open("GET",w,!0),p.onreadystatechange=function(){p.readyState==4&&(p.status<400&&p.responseText?k(p.responseText):p.status>=400?x(e(p.status,p.statusText)):x(n))},p.send(null)}function m(w){var k=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(w||"");if(k){var x=Number(k[1]),p=k[2],l=k[3];return p?l?[x,Number(l)]:[x,void 0]:[x,x]}}S.hooks.add("before-highlightall",function(w){w.selector+=", "+c}),S.hooks.add("before-sanity-check",function(w){var k=w.element;if(k.matches(c)){w.code="",k.setAttribute(r,s);var x=k.appendChild(document.createElement("CODE"));x.textContent=t;var p=k.getAttribute("data-src"),l=w.language;if(l==="none"){var d=(/\.(\w+)$/.exec(p)||[,"none"])[1];l=a[d]||d}S.util.setLanguage(x,l),S.util.setLanguage(k,l);var g=S.plugins.autoloader;g&&g.loadLanguages(l),u(p,function(f){k.setAttribute(r,i);var y=m(k.getAttribute("data-range"));if(y){var T=f.split(/\r\n?|\n/g),v=y[0],R=y[1]==null?T.length:y[1];v<0&&(v+=T.length),v=Math.max(0,Math.min(v-1,T.length)),R<0&&(R+=T.length),R=Math.max(0,Math.min(R,T.length)),f=T.slice(v,R).join(`
`),k.hasAttribute("data-start")||k.setAttribute("data-start",String(v+1))}x.textContent=f,S.highlightElement(x)},function(f){k.setAttribute(r,o),x.textContent=f})}}),S.plugins.fileHighlight={highlight:function(k){for(var x=(k||document).querySelectorAll(c),p=0,l;l=x[p++];)S.highlightElement(l)}};var b=!1;S.fileHighlight=function(){b||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),b=!0),S.plugins.fileHighlight.highlight.apply(this,arguments)}})()});function Re(t={}){let e=Object.create(null),{path:n,headers:a}=t;return e.request=(r,s)=>{let i=`${n}${s?"?"+encodeURIComponent(s):""}`;return fetch(i,{method:r,headers:a})},e.create=()=>e.request("POST"),e.destroy=()=>e.request("DELETE"),e.describe=()=>e.request("GET"),e}function ge(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var G=ge();function Ce(t){G=t}var X={exec:()=>null};function $(t,e=""){let n=typeof t=="string"?t:t.source,a={replace:(r,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(N.caret,"$1"),n=n.replace(r,i),a},getRegex:()=>new RegExp(n,e)};return a}var N={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},lt=/^(?:[ \t]*(?:\n|$))+/,ct=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ut=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,W=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,pt=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,fe=/(?:[*+-]|\d{1,9}[.)])/,Oe=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ne=$(Oe).replace(/bull/g,fe).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),dt=$(Oe).replace(/bull/g,fe).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),me=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ht=/^[^\n]+/,be=/(?!\s*\])(?:\\.|[^\[\]\\])+/,gt=$(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",be).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ft=$(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,fe).getRegex(),se="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",we=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,mt=$("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",we).replace("tag",se).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Pe=$(me).replace("hr",W).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",se).getRegex(),bt=$(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Pe).getRegex(),ke={blockquote:bt,code:ct,def:gt,fences:ut,heading:pt,hr:W,html:mt,lheading:Ne,list:ft,newline:lt,paragraph:Pe,table:X,text:ht},_e=$("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",W).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",se).getRegex(),wt={...ke,lheading:dt,table:_e,paragraph:$(me).replace("hr",W).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",_e).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",se).getRegex()},kt={...ke,html:$(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",we).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:X,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:$(me).replace("hr",W).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ne).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},yt=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,vt=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,De=/^( {2,}|\\)\n(?!\s*$)/,xt=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ie=/[\p{P}\p{S}]/u,ye=/[\s\p{P}\p{S}]/u,ze=/[^\s\p{P}\p{S}]/u,St=$(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ye).getRegex(),Me=/(?!~)[\p{P}\p{S}]/u,Et=/(?!~)[\s\p{P}\p{S}]/u,At=/(?:[^\s\p{P}\p{S}]|~)/u,Tt=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,Be=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Rt=$(Be,"u").replace(/punct/g,ie).getRegex(),_t=$(Be,"u").replace(/punct/g,Me).getRegex(),Ue="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",It=$(Ue,"gu").replace(/notPunctSpace/g,ze).replace(/punctSpace/g,ye).replace(/punct/g,ie).getRegex(),$t=$(Ue,"gu").replace(/notPunctSpace/g,At).replace(/punctSpace/g,Et).replace(/punct/g,Me).getRegex(),Lt=$("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ze).replace(/punctSpace/g,ye).replace(/punct/g,ie).getRegex(),Ft=$(/\\(punct)/,"gu").replace(/punct/g,ie).getRegex(),Ct=$(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Ot=$(we).replace("(?:-->|$)","-->").getRegex(),Nt=$("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Ot).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ne=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Pt=$(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ne).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),He=$(/^!?\[(label)\]\[(ref)\]/).replace("label",ne).replace("ref",be).getRegex(),Ge=$(/^!?\[(ref)\](?:\[\])?/).replace("ref",be).getRegex(),Dt=$("reflink|nolink(?!\\()","g").replace("reflink",He).replace("nolink",Ge).getRegex(),ve={_backpedal:X,anyPunctuation:Ft,autolink:Ct,blockSkip:Tt,br:De,code:vt,del:X,emStrongLDelim:Rt,emStrongRDelimAst:It,emStrongRDelimUnd:Lt,escape:yt,link:Pt,nolink:Ge,punctuation:St,reflink:He,reflinkSearch:Dt,tag:Nt,text:xt,url:X},zt={...ve,link:$(/^!?\[(label)\]\((.*?)\)/).replace("label",ne).getRegex(),reflink:$(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ne).getRegex()},pe={...ve,emStrongRDelimAst:$t,emStrongLDelim:_t,url:$(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Mt={...pe,br:$(De).replace("{2,}","*").getRegex(),text:$(pe.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ee={normal:ke,gfm:wt,pedantic:kt},Z={normal:ve,gfm:pe,breaks:Mt,pedantic:zt},Bt={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ie=t=>Bt[t];function z(t,e){if(e){if(N.escapeTest.test(t))return t.replace(N.escapeReplace,Ie)}else if(N.escapeTestNoEncode.test(t))return t.replace(N.escapeReplaceNoEncode,Ie);return t}function $e(t){try{t=encodeURI(t).replace(N.percentDecode,"%")}catch{return null}return t}function Le(t,e){let n=t.replace(N.findPipe,(s,i,o)=>{let c=!1,u=i;for(;--u>=0&&o[u]==="\\";)c=!c;return c?"|":" |"}),a=n.split(N.splitPipe),r=0;if(a[0].trim()||a.shift(),a.length>0&&!a.at(-1)?.trim()&&a.pop(),e)if(a.length>e)a.splice(e);else for(;a.length<e;)a.push("");for(;r<a.length;r++)a[r]=a[r].trim().replace(N.slashPipe,"|");return a}function Y(t,e,n){let a=t.length;if(a===0)return"";let r=0;for(;r<a;){let s=t.charAt(a-r-1);if(s===e&&!n)r++;else if(s!==e&&n)r++;else break}return t.slice(0,a-r)}function Ut(t,e){if(t.indexOf(e[1])===-1)return-1;let n=0;for(let a=0;a<t.length;a++)if(t[a]==="\\")a++;else if(t[a]===e[0])n++;else if(t[a]===e[1]&&(n--,n<0))return a;return n>0?-2:-1}function Fe(t,e,n,a,r){let s=e.href,i=e.title||null,o=t[1].replace(r.other.outputLinkReplace,"$1");a.state.inLink=!0;let c={type:t[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:i,text:o,tokens:a.inlineTokens(o)};return a.state.inLink=!1,c}function Ht(t,e,n){let a=t.match(n.other.indentCodeCompensation);if(a===null)return e;let r=a[1];return e.split(`
`).map(s=>{let i=s.match(n.other.beginningSpace);if(i===null)return s;let[o]=i;return o.length>=r.length?s.slice(r.length):s}).join(`
`)}var re=class{options;rules;lexer;constructor(t){this.options=t||G}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let n=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Y(n,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let n=e[0],a=Ht(n,e[3]||"",this.rules);return{type:"code",raw:n,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:a}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let n=e[2].trim();if(this.rules.other.endingHash.test(n)){let a=Y(n,"#");(this.options.pedantic||!a||this.rules.other.endingSpaceChar.test(a))&&(n=a.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:Y(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let n=Y(e[0],`
`).split(`
`),a="",r="",s=[];for(;n.length>0;){let i=!1,o=[],c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))o.push(n[c]),i=!0;else if(!i)o.push(n[c]);else break;n=n.slice(c);let u=o.join(`
`),m=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");a=a?`${a}
${u}`:u,r=r?`${r}
${m}`:m;let b=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(m,s,!0),this.lexer.state.top=b,n.length===0)break;let w=s.at(-1);if(w?.type==="code")break;if(w?.type==="blockquote"){let k=w,x=k.raw+`
`+n.join(`
`),p=this.blockquote(x);s[s.length-1]=p,a=a.substring(0,a.length-k.raw.length)+p.raw,r=r.substring(0,r.length-k.text.length)+p.text;break}else if(w?.type==="list"){let k=w,x=k.raw+`
`+n.join(`
`),p=this.list(x);s[s.length-1]=p,a=a.substring(0,a.length-w.raw.length)+p.raw,r=r.substring(0,r.length-k.raw.length)+p.raw,n=x.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:a,tokens:s,text:r}}}list(t){let e=this.rules.block.list.exec(t);if(e){let n=e[1].trim(),a=n.length>1,r={type:"list",raw:"",ordered:a,start:a?+n.slice(0,-1):"",loose:!1,items:[]};n=a?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=a?n:"[*+-]");let s=this.rules.other.listItemRegex(n),i=!1;for(;t;){let c=!1,u="",m="";if(!(e=s.exec(t))||this.rules.block.hr.test(t))break;u=e[0],t=t.substring(u.length);let b=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,d=>" ".repeat(3*d.length)),w=t.split(`
`,1)[0],k=!b.trim(),x=0;if(this.options.pedantic?(x=2,m=b.trimStart()):k?x=e[1].length+1:(x=e[2].search(this.rules.other.nonSpaceChar),x=x>4?1:x,m=b.slice(x),x+=e[1].length),k&&this.rules.other.blankLine.test(w)&&(u+=w+`
`,t=t.substring(w.length+1),c=!0),!c){let d=this.rules.other.nextBulletRegex(x),g=this.rules.other.hrRegex(x),f=this.rules.other.fencesBeginRegex(x),y=this.rules.other.headingBeginRegex(x),T=this.rules.other.htmlBeginRegex(x);for(;t;){let v=t.split(`
`,1)[0],R;if(w=v,this.options.pedantic?(w=w.replace(this.rules.other.listReplaceNesting,"  "),R=w):R=w.replace(this.rules.other.tabCharGlobal,"    "),f.test(w)||y.test(w)||T.test(w)||d.test(w)||g.test(w))break;if(R.search(this.rules.other.nonSpaceChar)>=x||!w.trim())m+=`
`+R.slice(x);else{if(k||b.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||f.test(b)||y.test(b)||g.test(b))break;m+=`
`+w}!k&&!w.trim()&&(k=!0),u+=v+`
`,t=t.substring(v.length+1),b=R.slice(x)}}r.loose||(i?r.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0));let p=null,l;this.options.gfm&&(p=this.rules.other.listIsTask.exec(m),p&&(l=p[0]!=="[ ] ",m=m.replace(this.rules.other.listReplaceTask,""))),r.items.push({type:"list_item",raw:u,task:!!p,checked:l,loose:!1,text:m,tokens:[]}),r.raw+=u}let o=r.items.at(-1);if(o)o.raw=o.raw.trimEnd(),o.text=o.text.trimEnd();else return;r.raw=r.raw.trimEnd();for(let c=0;c<r.items.length;c++)if(this.lexer.state.top=!1,r.items[c].tokens=this.lexer.blockTokens(r.items[c].text,[]),!r.loose){let u=r.items[c].tokens.filter(b=>b.type==="space"),m=u.length>0&&u.some(b=>this.rules.other.anyLine.test(b.raw));r.loose=m}if(r.loose)for(let c=0;c<r.items.length;c++)r.items[c].loose=!0;return r}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let n=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),a=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",r=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:n,raw:e[0],href:a,title:r}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let n=Le(e[1]),a=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),r=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:e[0],header:[],align:[],rows:[]};if(n.length===a.length){for(let i of a)this.rules.other.tableAlignRight.test(i)?s.align.push("right"):this.rules.other.tableAlignCenter.test(i)?s.align.push("center"):this.rules.other.tableAlignLeft.test(i)?s.align.push("left"):s.align.push(null);for(let i=0;i<n.length;i++)s.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:s.align[i]});for(let i of r)s.rows.push(Le(i,s.header.length).map((o,c)=>({text:o,tokens:this.lexer.inline(o),header:!1,align:s.align[c]})));return s}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let n=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:n,tokens:this.lexer.inline(n)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let n=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=Y(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=Ut(e[2],"()");if(s===-2)return;if(s>-1){let o=(e[0].indexOf("!")===0?5:4)+e[1].length+s;e[2]=e[2].substring(0,s),e[0]=e[0].substring(0,o).trim(),e[3]=""}}let a=e[2],r="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(a);s&&(a=s[1],r=s[3])}else r=e[3]?e[3].slice(1,-1):"";return a=a.trim(),this.rules.other.startAngleBracket.test(a)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?a=a.slice(1):a=a.slice(1,-1)),Fe(e,{href:a&&a.replace(this.rules.inline.anyPunctuation,"$1"),title:r&&r.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let n;if((n=this.rules.inline.reflink.exec(t))||(n=this.rules.inline.nolink.exec(t))){let a=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),r=e[a.toLowerCase()];if(!r){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return Fe(n,r,n[0],this.lexer,this.rules)}}emStrong(t,e,n=""){let a=this.rules.inline.emStrongLDelim.exec(t);if(!a||a[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(a[1]||a[2]||"")||!n||this.rules.inline.punctuation.exec(n)){let s=[...a[0]].length-1,i,o,c=s,u=0,m=a[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(m.lastIndex=0,e=e.slice(-1*t.length+s);(a=m.exec(e))!=null;){if(i=a[1]||a[2]||a[3]||a[4]||a[5]||a[6],!i)continue;if(o=[...i].length,a[3]||a[4]){c+=o;continue}else if((a[5]||a[6])&&s%3&&!((s+o)%3)){u+=o;continue}if(c-=o,c>0)continue;o=Math.min(o,o+c+u);let b=[...a[0]][0].length,w=t.slice(0,s+a.index+b+o);if(Math.min(s,o)%2){let x=w.slice(1,-1);return{type:"em",raw:w,text:x,tokens:this.lexer.inlineTokens(x)}}let k=w.slice(2,-2);return{type:"strong",raw:w,text:k,tokens:this.lexer.inlineTokens(k)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let n=e[2].replace(this.rules.other.newLineCharGlobal," "),a=this.rules.other.nonSpaceChar.test(n),r=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return a&&r&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:e[0],text:n}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let n,a;return e[2]==="@"?(n=e[1],a="mailto:"+n):(n=e[1],a=n),{type:"link",raw:e[0],text:n,href:a,tokens:[{type:"text",raw:n,text:n}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let n,a;if(e[2]==="@")n=e[0],a="mailto:"+n;else{let r;do r=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(r!==e[0]);n=e[0],e[1]==="www."?a="http://"+e[0]:a=e[0]}return{type:"link",raw:e[0],text:n,href:a,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let n=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:n}}}},M=class de{tokens;options;state;tokenizer;inlineQueue;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||G,this.options.tokenizer=this.options.tokenizer||new re,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:N,block:ee.normal,inline:Z.normal};this.options.pedantic?(n.block=ee.pedantic,n.inline=Z.pedantic):this.options.gfm&&(n.block=ee.gfm,this.options.breaks?n.inline=Z.breaks:n.inline=Z.gfm),this.tokenizer.rules=n}static get rules(){return{block:ee,inline:Z}}static lex(e,n){return new de(n).lex(e)}static lexInline(e,n){return new de(n).inlineTokens(e)}lex(e){e=e.replace(N.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let a=this.inlineQueue[n];this.inlineTokens(a.src,a.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,n=[],a=!1){for(this.options.pedantic&&(e=e.replace(N.tabCharGlobal,"    ").replace(N.spaceLine,""));e;){let r;if(this.options.extensions?.block?.some(i=>(r=i.call({lexer:this},e,n))?(e=e.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(e)){e=e.substring(r.raw.length);let i=n.at(-1);r.raw.length===1&&i!==void 0?i.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(e)){e=e.substring(r.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=`
`+r.raw,i.text+=`
`+r.text,this.inlineQueue.at(-1).src=i.text):n.push(r);continue}if(r=this.tokenizer.fences(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(e)){e=e.substring(r.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=`
`+r.raw,i.text+=`
`+r.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(e)){e=e.substring(r.raw.length),n.push(r);continue}let s=e;if(this.options.extensions?.startBlock){let i=1/0,o=e.slice(1),c;this.options.extensions.startBlock.forEach(u=>{c=u.call({lexer:this},o),typeof c=="number"&&c>=0&&(i=Math.min(i,c))}),i<1/0&&i>=0&&(s=e.substring(0,i+1))}if(this.state.top&&(r=this.tokenizer.paragraph(s))){let i=n.at(-1);a&&i?.type==="paragraph"?(i.raw+=`
`+r.raw,i.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(r),a=s.length!==e.length,e=e.substring(r.raw.length);continue}if(r=this.tokenizer.text(e)){e=e.substring(r.raw.length);let i=n.at(-1);i?.type==="text"?(i.raw+=`
`+r.raw,i.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(r);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(e,n=[]){return this.inlineQueue.push({src:e,tokens:n}),n}inlineTokens(e,n=[]){let a=e,r=null;if(this.tokens.links){let o=Object.keys(this.tokens.links);if(o.length>0)for(;(r=this.tokenizer.rules.inline.reflinkSearch.exec(a))!=null;)o.includes(r[0].slice(r[0].lastIndexOf("[")+1,-1))&&(a=a.slice(0,r.index)+"["+"a".repeat(r[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(r=this.tokenizer.rules.inline.anyPunctuation.exec(a))!=null;)a=a.slice(0,r.index)+"++"+a.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(r=this.tokenizer.rules.inline.blockSkip.exec(a))!=null;)a=a.slice(0,r.index)+"["+"a".repeat(r[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let s=!1,i="";for(;e;){s||(i=""),s=!1;let o;if(this.options.extensions?.inline?.some(u=>(o=u.call({lexer:this},e,n))?(e=e.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.escape(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.tag(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.link(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(o.raw.length);let u=n.at(-1);o.type==="text"&&u?.type==="text"?(u.raw+=o.raw,u.text+=o.text):n.push(o);continue}if(o=this.tokenizer.emStrong(e,a,i)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.codespan(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.br(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.del(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.autolink(e)){e=e.substring(o.raw.length),n.push(o);continue}if(!this.state.inLink&&(o=this.tokenizer.url(e))){e=e.substring(o.raw.length),n.push(o);continue}let c=e;if(this.options.extensions?.startInline){let u=1/0,m=e.slice(1),b;this.options.extensions.startInline.forEach(w=>{b=w.call({lexer:this},m),typeof b=="number"&&b>=0&&(u=Math.min(u,b))}),u<1/0&&u>=0&&(c=e.substring(0,u+1))}if(o=this.tokenizer.inlineText(c)){e=e.substring(o.raw.length),o.raw.slice(-1)!=="_"&&(i=o.raw.slice(-1)),s=!0;let u=n.at(-1);u?.type==="text"?(u.raw+=o.raw,u.text+=o.text):n.push(o);continue}if(e){let u="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return n}},ae=class{options;parser;constructor(t){this.options=t||G}space(t){return""}code({text:t,lang:e,escaped:n}){let a=(e||"").match(N.notSpaceStart)?.[0],r=t.replace(N.endingNewline,"")+`
`;return a?'<pre><code class="language-'+z(a)+'">'+(n?r:z(r,!0))+`</code></pre>
`:"<pre><code>"+(n?r:z(r,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>
`}hr(t){return`<hr>
`}list(t){let e=t.ordered,n=t.start,a="";for(let i=0;i<t.items.length;i++){let o=t.items[i];a+=this.listitem(o)}let r=e?"ol":"ul",s=e&&n!==1?' start="'+n+'"':"";return"<"+r+s+`>
`+a+"</"+r+`>
`}listitem(t){let e="";if(t.task){let n=this.checkbox({checked:!!t.checked});t.loose?t.tokens[0]?.type==="paragraph"?(t.tokens[0].text=n+" "+t.tokens[0].text,t.tokens[0].tokens&&t.tokens[0].tokens.length>0&&t.tokens[0].tokens[0].type==="text"&&(t.tokens[0].tokens[0].text=n+" "+z(t.tokens[0].tokens[0].text),t.tokens[0].tokens[0].escaped=!0)):t.tokens.unshift({type:"text",raw:n+" ",text:n+" ",escaped:!0}):e+=n+" "}return e+=this.parser.parse(t.tokens,!!t.loose),`<li>${e}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let e="",n="";for(let r=0;r<t.header.length;r++)n+=this.tablecell(t.header[r]);e+=this.tablerow({text:n});let a="";for(let r=0;r<t.rows.length;r++){let s=t.rows[r];n="";for(let i=0;i<s.length;i++)n+=this.tablecell(s[i]);a+=this.tablerow({text:n})}return a&&(a=`<tbody>${a}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+a+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){let e=this.parser.parseInline(t.tokens),n=t.header?"th":"td";return(t.align?`<${n} align="${t.align}">`:`<${n}>`)+e+`</${n}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${z(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:n}){let a=this.parser.parseInline(n),r=$e(t);if(r===null)return a;t=r;let s='<a href="'+t+'"';return e&&(s+=' title="'+z(e)+'"'),s+=">"+a+"</a>",s}image({href:t,title:e,text:n,tokens:a}){a&&(n=this.parser.parseInline(a,this.parser.textRenderer));let r=$e(t);if(r===null)return z(n);t=r;let s=`<img src="${t}" alt="${n}"`;return e&&(s+=` title="${z(e)}"`),s+=">",s}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:z(t.text)}},xe=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}},B=class he{options;renderer;textRenderer;constructor(e){this.options=e||G,this.options.renderer=this.options.renderer||new ae,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new xe}static parse(e,n){return new he(n).parse(e)}static parseInline(e,n){return new he(n).parseInline(e)}parse(e,n=!0){let a="";for(let r=0;r<e.length;r++){let s=e[r];if(this.options.extensions?.renderers?.[s.type]){let o=s,c=this.options.extensions.renderers[o.type].call({parser:this},o);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(o.type)){a+=c||"";continue}}let i=s;switch(i.type){case"space":{a+=this.renderer.space(i);continue}case"hr":{a+=this.renderer.hr(i);continue}case"heading":{a+=this.renderer.heading(i);continue}case"code":{a+=this.renderer.code(i);continue}case"table":{a+=this.renderer.table(i);continue}case"blockquote":{a+=this.renderer.blockquote(i);continue}case"list":{a+=this.renderer.list(i);continue}case"html":{a+=this.renderer.html(i);continue}case"paragraph":{a+=this.renderer.paragraph(i);continue}case"text":{let o=i,c=this.renderer.text(o);for(;r+1<e.length&&e[r+1].type==="text";)o=e[++r],c+=`
`+this.renderer.text(o);n?a+=this.renderer.paragraph({type:"paragraph",raw:c,text:c,tokens:[{type:"text",raw:c,text:c,escaped:!0}]}):a+=c;continue}default:{let o='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return a}parseInline(e,n=this.renderer){let a="";for(let r=0;r<e.length;r++){let s=e[r];if(this.options.extensions?.renderers?.[s.type]){let o=this.options.extensions.renderers[s.type].call({parser:this},s);if(o!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){a+=o||"";continue}}let i=s;switch(i.type){case"escape":{a+=n.text(i);break}case"html":{a+=n.html(i);break}case"link":{a+=n.link(i);break}case"image":{a+=n.image(i);break}case"strong":{a+=n.strong(i);break}case"em":{a+=n.em(i);break}case"codespan":{a+=n.codespan(i);break}case"br":{a+=n.br(i);break}case"del":{a+=n.del(i);break}case"text":{a+=n.text(i);break}default:{let o='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return a}},te=class{options;block;constructor(t){this.options=t||G}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}provideLexer(){return this.block?M.lex:M.lexInline}provideParser(){return this.block?B.parse:B.parseInline}},Gt=class{defaults=ge();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=B;Renderer=ae;TextRenderer=xe;Lexer=M;Tokenizer=re;Hooks=te;constructor(...t){this.use(...t)}walkTokens(t,e){let n=[];for(let a of t)switch(n=n.concat(e.call(this,a)),a.type){case"table":{let r=a;for(let s of r.header)n=n.concat(this.walkTokens(s.tokens,e));for(let s of r.rows)for(let i of s)n=n.concat(this.walkTokens(i.tokens,e));break}case"list":{let r=a;n=n.concat(this.walkTokens(r.items,e));break}default:{let r=a;this.defaults.extensions?.childTokens?.[r.type]?this.defaults.extensions.childTokens[r.type].forEach(s=>{let i=r[s].flat(1/0);n=n.concat(this.walkTokens(i,e))}):r.tokens&&(n=n.concat(this.walkTokens(r.tokens,e)))}}return n}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(n=>{let a={...n};if(a.async=this.defaults.async||a.async||!1,n.extensions&&(n.extensions.forEach(r=>{if(!r.name)throw new Error("extension name required");if("renderer"in r){let s=e.renderers[r.name];s?e.renderers[r.name]=function(...i){let o=r.renderer.apply(this,i);return o===!1&&(o=s.apply(this,i)),o}:e.renderers[r.name]=r.renderer}if("tokenizer"in r){if(!r.level||r.level!=="block"&&r.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=e[r.level];s?s.unshift(r.tokenizer):e[r.level]=[r.tokenizer],r.start&&(r.level==="block"?e.startBlock?e.startBlock.push(r.start):e.startBlock=[r.start]:r.level==="inline"&&(e.startInline?e.startInline.push(r.start):e.startInline=[r.start]))}"childTokens"in r&&r.childTokens&&(e.childTokens[r.name]=r.childTokens)}),a.extensions=e),n.renderer){let r=this.defaults.renderer||new ae(this.defaults);for(let s in n.renderer){if(!(s in r))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let i=s,o=n.renderer[i],c=r[i];r[i]=(...u)=>{let m=o.apply(r,u);return m===!1&&(m=c.apply(r,u)),m||""}}a.renderer=r}if(n.tokenizer){let r=this.defaults.tokenizer||new re(this.defaults);for(let s in n.tokenizer){if(!(s in r))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let i=s,o=n.tokenizer[i],c=r[i];r[i]=(...u)=>{let m=o.apply(r,u);return m===!1&&(m=c.apply(r,u)),m}}a.tokenizer=r}if(n.hooks){let r=this.defaults.hooks||new te;for(let s in n.hooks){if(!(s in r))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let i=s,o=n.hooks[i],c=r[i];te.passThroughHooks.has(s)?r[i]=u=>{if(this.defaults.async)return Promise.resolve(o.call(r,u)).then(b=>c.call(r,b));let m=o.call(r,u);return c.call(r,m)}:r[i]=(...u)=>{let m=o.apply(r,u);return m===!1&&(m=c.apply(r,u)),m}}a.hooks=r}if(n.walkTokens){let r=this.defaults.walkTokens,s=n.walkTokens;a.walkTokens=function(i){let o=[];return o.push(s.call(this,i)),r&&(o=o.concat(r.call(this,i))),o}}this.defaults={...this.defaults,...a}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return M.lex(t,e??this.defaults)}parser(t,e){return B.parse(t,e??this.defaults)}parseMarkdown(t){return(n,a)=>{let r={...a},s={...this.defaults,...r},i=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));s.hooks&&(s.hooks.options=s,s.hooks.block=t);let o=s.hooks?s.hooks.provideLexer():t?M.lex:M.lexInline,c=s.hooks?s.hooks.provideParser():t?B.parse:B.parseInline;if(s.async)return Promise.resolve(s.hooks?s.hooks.preprocess(n):n).then(u=>o(u,s)).then(u=>s.hooks?s.hooks.processAllTokens(u):u).then(u=>s.walkTokens?Promise.all(this.walkTokens(u,s.walkTokens)).then(()=>u):u).then(u=>c(u,s)).then(u=>s.hooks?s.hooks.postprocess(u):u).catch(i);try{s.hooks&&(n=s.hooks.preprocess(n));let u=o(n,s);s.hooks&&(u=s.hooks.processAllTokens(u)),s.walkTokens&&this.walkTokens(u,s.walkTokens);let m=c(u,s);return s.hooks&&(m=s.hooks.postprocess(m)),m}catch(u){return i(u)}}}onError(t,e){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let a="<p>An error occurred:</p><pre>"+z(n.message+"",!0)+"</pre>";return e?Promise.resolve(a):a}if(e)return Promise.reject(n);throw n}}},H=new Gt;function I(t,e){return H.parse(t,e)}I.options=I.setOptions=function(t){return H.setOptions(t),I.defaults=H.defaults,Ce(I.defaults),I};I.getDefaults=ge;I.defaults=G;I.use=function(...t){return H.use(...t),I.defaults=H.defaults,Ce(I.defaults),I};I.walkTokens=function(t,e){return H.walkTokens(t,e)};I.parseInline=H.parseInline;I.Parser=B;I.parser=B.parse;I.Renderer=ae;I.TextRenderer=xe;I.Lexer=M;I.lexer=M.lex;I.Tokenizer=re;I.Hooks=te;I.parse=I;var Wt=I.options,Kt=I.setOptions,Vt=I.use,Qt=I.walkTokens,Jt=I.parseInline;var en=B.parse,tn=M.lex;var Se=ot(je());Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/};Prism.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]};Prism.languages.markup.tag.inside["attr-value"].inside.entity=Prism.languages.markup.entity;Prism.languages.markup.doctype.inside["internal-subset"].inside=Prism.languages.markup;Prism.hooks.add("wrap",function(t){t.type==="entity"&&(t.attributes.title=t.content.replace(/&amp;/,"&"))});Object.defineProperty(Prism.languages.markup.tag,"addInlined",{value:function(e,n){var a={};a["language-"+n]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:Prism.languages[n]},a.cdata=/^<!\[CDATA\[|\]\]>$/i;var r={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:a}};r["language-"+n]={pattern:/[\s\S]+/,inside:Prism.languages[n]};var s={};s[e]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return e}),"i"),lookbehind:!0,greedy:!0,inside:r},Prism.languages.insertBefore("markup","cdata",s)}});Object.defineProperty(Prism.languages.markup.tag,"addAttribute",{value:function(t,e){Prism.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+t+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[e,"language-"+e],inside:Prism.languages[e]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}});Prism.languages.html=Prism.languages.markup;Prism.languages.mathml=Prism.languages.markup;Prism.languages.svg=Prism.languages.markup;Prism.languages.xml=Prism.languages.extend("markup",{});Prism.languages.ssml=Prism.languages.xml;Prism.languages.atom=Prism.languages.xml;Prism.languages.rss=Prism.languages.xml;(function(t){function e(n,a){return"___"+n.toUpperCase()+a+"___"}Object.defineProperties(t.languages["markup-templating"]={},{buildPlaceholders:{value:function(n,a,r,s){if(n.language===a){var i=n.tokenStack=[];n.code=n.code.replace(r,function(o){if(typeof s=="function"&&!s(o))return o;for(var c=i.length,u;n.code.indexOf(u=e(a,c))!==-1;)++c;return i[c]=o,u}),n.grammar=t.languages.markup}}},tokenizePlaceholders:{value:function(n,a){if(n.language!==a||!n.tokenStack)return;n.grammar=t.languages[a];var r=0,s=Object.keys(n.tokenStack);function i(o){for(var c=0;c<o.length&&!(r>=s.length);c++){var u=o[c];if(typeof u=="string"||u.content&&typeof u.content=="string"){var m=s[r],b=n.tokenStack[m],w=typeof u=="string"?u:u.content,k=e(a,m),x=w.indexOf(k);if(x>-1){++r;var p=w.substring(0,x),l=new t.Token(a,t.tokenize(b,n.grammar),"language-"+a,b),d=w.substring(x+k.length),g=[];p&&g.push.apply(g,i([p])),g.push(l),d&&g.push.apply(g,i([d])),typeof u=="string"?o.splice.apply(o,[c,1].concat(g)):u.content=g}}else u.content&&i(u.content)}return o}i(n.tokens)}}})})(Prism);(function(t){var e=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;t.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+e.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+e.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+e.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+e.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:e,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},t.languages.css.atrule.inside.rest=t.languages.css;var n=t.languages.markup;n&&(n.tag.addInlined("style","css"),n.tag.addAttribute("style","css"))})(Prism);Prism.languages.javascript=Prism.languages.extend("clike",{"class-name":[Prism.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/});Prism.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:Prism.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:Prism.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/});Prism.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}});Prism.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}});Prism.languages.markup&&(Prism.languages.markup.tag.addInlined("script","javascript"),Prism.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript"));Prism.languages.js=Prism.languages.javascript;(function(t){t.languages.typescript=t.languages.extend("javascript",{"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,lookbehind:!0,greedy:!0,inside:null},builtin:/\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/}),t.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/,/\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,/\btype\b(?=\s*(?:[\{*]|$))/),delete t.languages.typescript.parameter,delete t.languages.typescript["literal-property"];var e=t.languages.extend("typescript",{});delete e["class-name"],t.languages.typescript["class-name"].inside=e,t.languages.insertBefore("typescript","function",{decorator:{pattern:/@[$\w\xA0-\uFFFF]+/,inside:{at:{pattern:/^@/,alias:"operator"},function:/^[\s\S]+/}},"generic-function":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,greedy:!0,inside:{function:/^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,generic:{pattern:/<[\s\S]+/,alias:"class-name",inside:e}}}}),t.languages.ts=t.languages.typescript})(Prism);(function(t){var e=t.util.clone(t.languages.javascript),n=/(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source,a=/(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source,r=/(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;function s(c,u){return c=c.replace(/<S>/g,function(){return n}).replace(/<BRACES>/g,function(){return a}).replace(/<SPREAD>/g,function(){return r}),RegExp(c,u)}r=s(r).source,t.languages.jsx=t.languages.extend("markup",e),t.languages.jsx.tag.pattern=s(/<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/.source),t.languages.jsx.tag.inside.tag.pattern=/^<\/?[^\s>\/]*/,t.languages.jsx.tag.inside["attr-value"].pattern=/=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/,t.languages.jsx.tag.inside.tag.inside["class-name"]=/^[A-Z]\w*(?:\.[A-Z]\w*)*$/,t.languages.jsx.tag.inside.comment=e.comment,t.languages.insertBefore("inside","attr-name",{spread:{pattern:s(/<SPREAD>/.source),inside:t.languages.jsx}},t.languages.jsx.tag),t.languages.insertBefore("inside","special-attr",{script:{pattern:s(/=<BRACES>/.source),alias:"language-javascript",inside:{"script-punctuation":{pattern:/^=(?=\{)/,alias:"punctuation"},rest:t.languages.jsx}}},t.languages.jsx.tag);var i=function(c){return c?typeof c=="string"?c:typeof c.content=="string"?c.content:c.content.map(i).join(""):""},o=function(c){for(var u=[],m=0;m<c.length;m++){var b=c[m],w=!1;if(typeof b!="string"&&(b.type==="tag"&&b.content[0]&&b.content[0].type==="tag"?b.content[0].content[0].content==="</"?u.length>0&&u[u.length-1].tagName===i(b.content[0].content[1])&&u.pop():b.content[b.content.length-1].content==="/>"||u.push({tagName:i(b.content[0].content[1]),openedBraces:0}):u.length>0&&b.type==="punctuation"&&b.content==="{"?u[u.length-1].openedBraces++:u.length>0&&u[u.length-1].openedBraces>0&&b.type==="punctuation"&&b.content==="}"?u[u.length-1].openedBraces--:w=!0),(w||typeof b=="string")&&u.length>0&&u[u.length-1].openedBraces===0){var k=i(b);m<c.length-1&&(typeof c[m+1]=="string"||c[m+1].type==="plain-text")&&(k+=i(c[m+1]),c.splice(m+1,1)),m>0&&(typeof c[m-1]=="string"||c[m-1].type==="plain-text")&&(k=i(c[m-1])+k,c.splice(m-1,1),m--),c[m]=new t.Token("plain-text",k,null,k)}b.content&&typeof b.content!="string"&&o(b.content)}};t.hooks.add("after-tokenize",function(c){c.language!=="jsx"&&c.language!=="tsx"||o(c.tokens)})})(Prism);(function(t){var e=t.util.clone(t.languages.typescript);t.languages.tsx=t.languages.extend("jsx",e),delete t.languages.tsx.parameter,delete t.languages.tsx["literal-property"];var n=t.languages.tsx.tag;n.pattern=RegExp(/(^|[^\w$]|(?=<\/))/.source+"(?:"+n.pattern.source+")",n.pattern.flags),n.lookbehind=!0})(Prism);(function(t){var e=/(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/.source;function n(m){return m=m.replace(/<inner>/g,function(){return e}),RegExp(/((?:^|[^\\])(?:\\{2})*)/.source+"(?:"+m+")")}var a=/(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source,r=/\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(/__/g,function(){return a}),s=/\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source;t.languages.markdown=t.languages.extend("markup",{}),t.languages.insertBefore("markdown","prolog",{"front-matter-block":{pattern:/(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,lookbehind:!0,greedy:!0,inside:{punctuation:/^---|---$/,"front-matter":{pattern:/\S+(?:\s+\S+)*/,alias:["yaml","language-yaml"],inside:t.languages.yaml}}},blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:"punctuation"},table:{pattern:RegExp("^"+r+s+"(?:"+r+")*","m"),inside:{"table-data-rows":{pattern:RegExp("^("+r+s+")(?:"+r+")*$"),lookbehind:!0,inside:{"table-data":{pattern:RegExp(a),inside:t.languages.markdown},punctuation:/\|/}},"table-line":{pattern:RegExp("^("+r+")"+s+"$"),lookbehind:!0,inside:{punctuation:/\||:?-{3,}:?/}},"table-header-row":{pattern:RegExp("^"+r+"$"),inside:{"table-header":{pattern:RegExp(a),alias:"important",inside:t.languages.markdown},punctuation:/\|/}}}},code:[{pattern:/((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,lookbehind:!0,alias:"keyword"},{pattern:/^```[\s\S]*?^```$/m,greedy:!0,inside:{"code-block":{pattern:/^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,lookbehind:!0},"code-language":{pattern:/^(```).+/,lookbehind:!0},punctuation:/```/}}],title:[{pattern:/\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,alias:"important",inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#.+/m,lookbehind:!0,alias:"important",inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:"punctuation"},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:"punctuation"},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:"url"},bold:{pattern:n(/\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/.source),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^..)[\s\S]+(?=..$)/,lookbehind:!0,inside:{}},punctuation:/\*\*|__/}},italic:{pattern:n(/\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/.source),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^.)[\s\S]+(?=.$)/,lookbehind:!0,inside:{}},punctuation:/[*_]/}},strike:{pattern:n(/(~~?)(?:(?!~)<inner>)+\2/.source),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^~~?)[\s\S]+(?=\1$)/,lookbehind:!0,inside:{}},punctuation:/~~?/}},"code-snippet":{pattern:/(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,lookbehind:!0,greedy:!0,alias:["code","keyword"]},url:{pattern:n(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/.source),lookbehind:!0,greedy:!0,inside:{operator:/^!/,content:{pattern:/(^\[)[^\]]+(?=\])/,lookbehind:!0,inside:{}},variable:{pattern:/(^\][ \t]?\[)[^\]]+(?=\]$)/,lookbehind:!0},url:{pattern:/(^\]\()[^\s)]+/,lookbehind:!0},string:{pattern:/(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,lookbehind:!0}}}}),["url","bold","italic","strike"].forEach(function(m){["url","bold","italic","strike","code-snippet"].forEach(function(b){m!==b&&(t.languages.markdown[m].inside.content.inside[b]=t.languages.markdown[b])})}),t.hooks.add("after-tokenize",function(m){if(m.language!=="markdown"&&m.language!=="md")return;function b(w){if(!(!w||typeof w=="string"))for(var k=0,x=w.length;k<x;k++){var p=w[k];if(p.type!=="code"){b(p.content);continue}var l=p.content[1],d=p.content[3];if(l&&d&&l.type==="code-language"&&d.type==="code-block"&&typeof l.content=="string"){var g=l.content.replace(/\b#/g,"sharp").replace(/\b\+\+/g,"pp");g=(/[a-z][\w-]*/i.exec(g)||[""])[0].toLowerCase();var f="language-"+g;d.alias?typeof d.alias=="string"?d.alias=[d.alias,f]:d.alias.push(f):d.alias=[f]}}}b(m.tokens)}),t.hooks.add("wrap",function(m){if(m.type==="code-block"){for(var b="",w=0,k=m.classes.length;w<k;w++){var x=m.classes[w],p=/language-(.+)/.exec(x);if(p){b=p[1];break}}var l=t.languages[b];if(l)m.content=t.highlight(u(m.content),l,b);else if(b&&b!=="none"&&t.plugins.autoloader){var d="md-"+new Date().valueOf()+"-"+Math.floor(Math.random()*1e16);m.attributes.id=d,t.plugins.autoloader.loadLanguages(b,function(){var g=document.getElementById(d);g&&(g.innerHTML=t.highlight(g.textContent,t.languages[b],b))})}}});var i=RegExp(t.languages.markup.tag.pattern.source,"gi"),o={amp:"&",lt:"<",gt:">",quot:'"'},c=String.fromCodePoint||String.fromCharCode;function u(m){var b=m.replace(i,"");return b=b.replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi,function(w,k){if(k=k.toLowerCase(),k[0]==="#"){var x;return k[1]==="x"?x=parseInt(k.slice(2),16):x=Number(k.slice(1)),c(x)}else{var p=o[k];return p||w}}),b}t.languages.md=t.languages.markdown})(Prism);Prism.languages.json={property:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,lookbehind:!0,greedy:!0},string:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,lookbehind:!0,greedy:!0},comment:{pattern:/\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,greedy:!0},number:/-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,punctuation:/[{}[\],]/,operator:/:/,boolean:/\b(?:false|true)\b/,null:{pattern:/\bnull\b/,alias:"keyword"}};Prism.languages.webmanifest=Prism.languages.json;(function(t){var e=/[*&][^\s[\]{},]+/,n=/!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/,a="(?:"+n.source+"(?:[ 	]+"+e.source+")?|"+e.source+"(?:[ 	]+"+n.source+")?)",r=/(?:[^\s\x00-\x08\x0e-\x1f!"#%&'*,\-:>?@[\]`{|}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.source.replace(/<PLAIN>/g,function(){return/[^\s\x00-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/.source}),s=/"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/.source;function i(o,c){c=(c||"").replace(/m/g,"")+"m";var u=/([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\]|\}|(?:[\r\n]\s*)?#))/.source.replace(/<<prop>>/g,function(){return a}).replace(/<<value>>/g,function(){return o});return RegExp(u,c)}t.languages.yaml={scalar:{pattern:RegExp(/([\-:]\s*(?:\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/.source.replace(/<<prop>>/g,function(){return a})),lookbehind:!0,alias:"string"},comment:/#.*/,key:{pattern:RegExp(/((?:^|[:\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\s*:\s)/.source.replace(/<<prop>>/g,function(){return a}).replace(/<<key>>/g,function(){return"(?:"+r+"|"+s+")"})),lookbehind:!0,greedy:!0,alias:"atrule"},directive:{pattern:/(^[ \t]*)%.+/m,lookbehind:!0,alias:"important"},datetime:{pattern:i(/\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?))?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?/.source),lookbehind:!0,alias:"number"},boolean:{pattern:i(/false|true/.source,"i"),lookbehind:!0,alias:"important"},null:{pattern:i(/null|~/.source,"i"),lookbehind:!0,alias:"important"},string:{pattern:i(s),lookbehind:!0,greedy:!0},number:{pattern:i(/[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/.source,"i"),lookbehind:!0},tag:n,important:e,punctuation:/---|[:[\]{}\-,|>?]|\.\.\./},t.languages.yml=t.languages.yaml})(Prism);(function(t){var e="\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b",n={pattern:/(^(["']?)\w+\2)[ \t]+\S.*/,lookbehind:!0,alias:"punctuation",inside:null},a={bash:n,environment:{pattern:RegExp("\\$"+e),alias:"constant"},variable:[{pattern:/\$?\(\([\s\S]+?\)\)/,greedy:!0,inside:{variable:[{pattern:/(^\$\(\([\s\S]+)\)\)/,lookbehind:!0},/^\$\(\(/],number:/\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,operator:/--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,punctuation:/\(\(?|\)\)?|,|;/}},{pattern:/\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,greedy:!0,inside:{variable:/^\$\(|^`|\)$|`$/}},{pattern:/\$\{[^}]+\}/,greedy:!0,inside:{operator:/:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,punctuation:/[\[\]]/,environment:{pattern:RegExp("(\\{)"+e),lookbehind:!0,alias:"constant"}}},/\$(?:\w+|[#?*!@$])/],entity:/\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/};t.languages.bash={shebang:{pattern:/^#!\s*\/.*/,alias:"important"},comment:{pattern:/(^|[^"{\\$])#.*/,lookbehind:!0},"function-name":[{pattern:/(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,lookbehind:!0,alias:"function"},{pattern:/\b[\w-]+(?=\s*\(\s*\)\s*\{)/,alias:"function"}],"for-or-select":{pattern:/(\b(?:for|select)\s+)\w+(?=\s+in\s)/,alias:"variable",lookbehind:!0},"assign-left":{pattern:/(^|[\s;|&]|[<>]\()\w+(?:\.\w+)*(?=\+?=)/,inside:{environment:{pattern:RegExp("(^|[\\s;|&]|[<>]\\()"+e),lookbehind:!0,alias:"constant"}},alias:"variable",lookbehind:!0},parameter:{pattern:/(^|\s)-{1,2}(?:\w+:[+-]?)?\w+(?:\.\w+)*(?=[=\s]|$)/,alias:"variable",lookbehind:!0},string:[{pattern:/((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,lookbehind:!0,greedy:!0,inside:a},{pattern:/((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,lookbehind:!0,greedy:!0,inside:{bash:n}},{pattern:/(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,lookbehind:!0,greedy:!0,inside:a},{pattern:/(^|[^$\\])'[^']*'/,lookbehind:!0,greedy:!0},{pattern:/\$'(?:[^'\\]|\\[\s\S])*'/,greedy:!0,inside:{entity:a.entity}}],environment:{pattern:RegExp("\\$?"+e),alias:"constant"},variable:a.variable,function:{pattern:/(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cargo|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|java|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|sysctl|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,lookbehind:!0},keyword:{pattern:/(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,lookbehind:!0},builtin:{pattern:/(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,lookbehind:!0,alias:"class-name"},boolean:{pattern:/(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/,lookbehind:!0},"file-descriptor":{pattern:/\B&\d\b/,alias:"important"},operator:{pattern:/\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,inside:{"file-descriptor":{pattern:/^\d/,alias:"important"}}},punctuation:/\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,number:{pattern:/(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,lookbehind:!0}},n.inside=t.languages.bash;for(var r=["comment","function-name","for-or-select","assign-left","parameter","string","environment","function","keyword","builtin","boolean","file-descriptor","operator","punctuation","number"],s=a.variable[1].inside,i=0;i<r.length;i++)s[r[i]]=t.languages.bash[r[i]];t.languages.sh=t.languages.bash,t.languages.shell=t.languages.bash})(Prism);(function(t){var e=[/"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/.source,/'[^']*'/.source,/\$'(?:[^'\\]|\\[\s\S])*'/.source,/<<-?\s*(["']?)(\w+)\1\s[\s\S]*?[\r\n]\2/.source].join("|");t.languages["shell-session"]={command:{pattern:RegExp(/^/.source+"(?:"+(/[^\s@:$#%*!/\\]+@[^\r\n@:$#%*!/\\]+(?::[^\0-\x1F$#%*?"<>:;|]+)?/.source+"|"+/[/~.][^\0-\x1F$#%*?"<>@:;|]*/.source)+")?"+/[$#%](?=\s)/.source+/(?:[^\\\r\n \t'"<$]|[ \t](?:(?!#)|#.*$)|\\(?:[^\r]|\r\n?)|\$(?!')|<(?!<)|<<str>>)+/.source.replace(/<<str>>/g,function(){return e}),"m"),greedy:!0,inside:{info:{pattern:/^[^#$%]+/,alias:"punctuation",inside:{user:/^[^\s@:$#%*!/\\]+@[^\r\n@:$#%*!/\\]+/,punctuation:/:/,path:/[\s\S]+/}},bash:{pattern:/(^[$#%]\s*)\S[\s\S]*/,lookbehind:!0,alias:"language-bash",inside:t.languages.bash},"shell-symbol":{pattern:/^[$#%]/,alias:"important"}}},output:/.(?:.*(?:[\r\n]|.$))*/},t.languages["sh-session"]=t.languages.shellsession=t.languages["shell-session"]})(Prism);(function(t){t.languages.ruby=t.languages.extend("clike",{comment:{pattern:/#.*|^=begin\s[\s\S]*?^=end/m,greedy:!0},"class-name":{pattern:/(\b(?:class|module)\s+|\bcatch\s+\()[\w.\\]+|\b[A-Z_]\w*(?=\s*\.\s*new\b)/,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:BEGIN|END|alias|and|begin|break|case|class|def|define_method|defined|do|each|else|elsif|end|ensure|extend|for|if|in|include|module|new|next|nil|not|or|prepend|private|protected|public|raise|redo|require|rescue|retry|return|self|super|then|throw|undef|unless|until|when|while|yield)\b/,operator:/\.{2,3}|&\.|===|<?=>|[!=]?~|(?:&&|\|\||<<|>>|\*\*|[+\-*/%<>!^&|=])=?|[?:]/,punctuation:/[(){}[\].,;]/}),t.languages.insertBefore("ruby","operator",{"double-colon":{pattern:/::/,alias:"punctuation"}});var e={pattern:/((?:^|[^\\])(?:\\{2})*)#\{(?:[^{}]|\{[^{}]*\})*\}/,lookbehind:!0,inside:{content:{pattern:/^(#\{)[\s\S]+(?=\}$)/,lookbehind:!0,inside:t.languages.ruby},delimiter:{pattern:/^#\{|\}$/,alias:"punctuation"}}};delete t.languages.ruby.function;var n="(?:"+[/([^a-zA-Z0-9\s{(\[<=])(?:(?!\1)[^\\]|\\[\s\S])*\1/.source,/\((?:[^()\\]|\\[\s\S]|\((?:[^()\\]|\\[\s\S])*\))*\)/.source,/\{(?:[^{}\\]|\\[\s\S]|\{(?:[^{}\\]|\\[\s\S])*\})*\}/.source,/\[(?:[^\[\]\\]|\\[\s\S]|\[(?:[^\[\]\\]|\\[\s\S])*\])*\]/.source,/<(?:[^<>\\]|\\[\s\S]|<(?:[^<>\\]|\\[\s\S])*>)*>/.source].join("|")+")",a=/(?:"(?:\\.|[^"\\\r\n])*"|(?:\b[a-zA-Z_]\w*|[^\s\0-\x7F]+)[?!]?|\$.)/.source;t.languages.insertBefore("ruby","keyword",{"regex-literal":[{pattern:RegExp(/%r/.source+n+/[egimnosux]{0,6}/.source),greedy:!0,inside:{interpolation:e,regex:/[\s\S]+/}},{pattern:/(^|[^/])\/(?!\/)(?:\[[^\r\n\]]+\]|\\.|[^[/\\\r\n])+\/[egimnosux]{0,6}(?=\s*(?:$|[\r\n,.;})#]))/,lookbehind:!0,greedy:!0,inside:{interpolation:e,regex:/[\s\S]+/}}],variable:/[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,symbol:[{pattern:RegExp(/(^|[^:]):/.source+a),lookbehind:!0,greedy:!0},{pattern:RegExp(/([\r\n{(,][ \t]*)/.source+a+/(?=:(?!:))/.source),lookbehind:!0,greedy:!0}],"method-definition":{pattern:/(\bdef\s+)\w+(?:\s*\.\s*\w+)?/,lookbehind:!0,inside:{function:/\b\w+$/,keyword:/^self\b/,"class-name":/^\w+/,punctuation:/\./}}}),t.languages.insertBefore("ruby","string",{"string-literal":[{pattern:RegExp(/%[qQiIwWs]?/.source+n),greedy:!0,inside:{interpolation:e,string:/[\s\S]+/}},{pattern:/("|')(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|(?!\1)[^\\#\r\n])*\1/,greedy:!0,inside:{interpolation:e,string:/[\s\S]+/}},{pattern:/<<[-~]?([a-z_]\w*)[\r\n](?:.*[\r\n])*?[\t ]*\1/i,alias:"heredoc-string",greedy:!0,inside:{delimiter:{pattern:/^<<[-~]?[a-z_]\w*|\b[a-z_]\w*$/i,inside:{symbol:/\b\w+/,punctuation:/^<<[-~]?/}},interpolation:e,string:/[\s\S]+/}},{pattern:/<<[-~]?'([a-z_]\w*)'[\r\n](?:.*[\r\n])*?[\t ]*\1/i,alias:"heredoc-string",greedy:!0,inside:{delimiter:{pattern:/^<<[-~]?'[a-z_]\w*'|\b[a-z_]\w*$/i,inside:{symbol:/\b\w+/,punctuation:/^<<[-~]?'|'$/}},string:/[\s\S]+/}}],"command-literal":[{pattern:RegExp(/%x/.source+n),greedy:!0,inside:{interpolation:e,command:{pattern:/[\s\S]+/,alias:"string"}}},{pattern:/`(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|[^\\`#\r\n])*`/,greedy:!0,inside:{interpolation:e,command:{pattern:/[\s\S]+/,alias:"string"}}}]}),delete t.languages.ruby.string,t.languages.insertBefore("ruby","number",{builtin:/\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Fixnum|Float|Hash|IO|Integer|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|Stat|String|Struct|Symbol|TMS|Thread|ThreadGroup|Time|TrueClass)\b/,constant:/\b[A-Z][A-Z0-9_]*(?:[?!]|\b)/}),t.languages.rb=t.languages.ruby})(Prism);(function(t){t.languages.erb={delimiter:{pattern:/^(\s*)<%=?|%>(?=\s*$)/,lookbehind:!0,alias:"punctuation"},ruby:{pattern:/\s*\S[\s\S]*/,alias:"language-ruby",inside:t.languages.ruby}},t.hooks.add("before-tokenize",function(e){var n=/<%=?(?:[^\r\n]|[\r\n](?!=begin)|[\r\n]=begin\s(?:[^\r\n]|[\r\n](?!=end))*[\r\n]=end)+?%>/g;t.languages["markup-templating"].buildPlaceholders(e,"erb",n)}),t.hooks.add("after-tokenize",function(e){t.languages["markup-templating"].tokenizePlaceholders(e,"erb")})})(Prism);Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0,greedy:!0},"string-interpolation":{pattern:/(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=\}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,greedy:!0,alias:"string"},string:{pattern:/(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^[\t ]*)@\w+(?:\.\w+)*/m,lookbehind:!0,alias:["annotation","punctuation"],inside:{punctuation:/\./}},keyword:/\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:False|None|True)\b/,number:/\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,operator:/[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/};Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest=Prism.languages.python;Prism.languages.py=Prism.languages.python;Prism.languages.sql={comment:{pattern:/(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,lookbehind:!0},variable:[{pattern:/@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,greedy:!0},/@[\w.$]+/],string:{pattern:/(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,greedy:!0,lookbehind:!0},identifier:{pattern:/(^|[^@\\])`(?:\\[\s\S]|[^`\\]|``)*`/,greedy:!0,lookbehind:!0,inside:{punctuation:/^`|`$/}},function:/\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,keyword:/\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:COL|_INSERT)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:ING|S)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,boolean:/\b(?:FALSE|NULL|TRUE)\b/i,number:/\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,operator:/[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|ILIKE|IN|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,punctuation:/[;[\]()`,.]/};(function(t){var e=/(?:[\w-]+|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*")/.source;function n(a){return a.replace(/__/g,function(){return e})}t.languages.toml={comment:{pattern:/#.*/,greedy:!0},table:{pattern:RegExp(n(/(^[\t ]*\[\s*(?:\[\s*)?)__(?:\s*\.\s*__)*(?=\s*\])/.source),"m"),lookbehind:!0,greedy:!0,alias:"class-name"},key:{pattern:RegExp(n(/(^[\t ]*|[{,]\s*)__(?:\s*\.\s*__)*(?=\s*=)/.source),"m"),lookbehind:!0,greedy:!0,alias:"property"},string:{pattern:/"""(?:\\[\s\S]|[^\\])*?"""|'''[\s\S]*?'''|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*"/,greedy:!0},date:[{pattern:/\b\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?\b/i,alias:"number"},{pattern:/\b\d{2}:\d{2}:\d{2}(?:\.\d+)?\b/,alias:"number"}],number:/(?:\b0(?:x[\da-zA-Z]+(?:_[\da-zA-Z]+)*|o[0-7]+(?:_[0-7]+)*|b[10]+(?:_[10]+)*))\b|[-+]?\b\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?\b|[-+]?\b(?:inf|nan)\b/,boolean:/\b(?:false|true)\b/,punctuation:/[.,=[\]{}]/}})(Prism);Prism.languages.ini={comment:{pattern:/(^[ \f\t\v]*)[#;][^\n\r]*/m,lookbehind:!0},section:{pattern:/(^[ \f\t\v]*)\[[^\n\r\]]*\]?/m,lookbehind:!0,inside:{"section-name":{pattern:/(^\[[ \f\t\v]*)[^ \f\t\v\]]+(?:[ \f\t\v]+[^ \f\t\v\]]+)*/,lookbehind:!0,alias:"selector"},punctuation:/\[|\]/}},key:{pattern:/(^[ \f\t\v]*)[^ \f\n\r\t\v=]+(?:[ \f\t\v]+[^ \f\n\r\t\v=]+)*(?=[ \f\t\v]*=)/m,lookbehind:!0,alias:"attr-name"},value:{pattern:/(=[ \f\t\v]*)[^ \f\n\r\t\v]+(?:[ \f\t\v]+[^ \f\n\r\t\v]+)*/,lookbehind:!0,alias:"attr-value",inside:{"inner-value":{pattern:/^("|').+(?=\1$)/,lookbehind:!0}}},punctuation:/=/};(function(t){t.languages.diff={coord:[/^(?:\*{3}|-{3}|\+{3}).*$/m,/^@@.*@@$/m,/^\d.*$/m]};var e={"deleted-sign":"-","deleted-arrow":"<","inserted-sign":"+","inserted-arrow":">",unchanged:" ",diff:"!"};Object.keys(e).forEach(function(n){var a=e[n],r=[];/^\w+$/.test(n)||r.push(/\w+/.exec(n)[0]),n==="diff"&&r.push("bold"),t.languages.diff[n]={pattern:RegExp("^(?:["+a+`].*(?:\r
?|
|(?![\\s\\S])))+`,"m"),alias:r,inside:{line:{pattern:/(.)(?=[\s\S]).*(?:\r\n?|\n)?/,lookbehind:!0},prefix:{pattern:/[\s\S]/,alias:/\w+/.exec(n)[0]}}}}),Object.defineProperty(t.languages.diff,"PREFIXES",{value:e})})(Prism);(function(t){function e(u){return RegExp("(^(?:"+u+"):[ 	]*(?![ 	]))[^]+","i")}t.languages.http={"request-line":{pattern:/^(?:CONNECT|DELETE|GET|HEAD|OPTIONS|PATCH|POST|PRI|PUT|SEARCH|TRACE)\s(?:https?:\/\/|\/)\S*\sHTTP\/[\d.]+/m,inside:{method:{pattern:/^[A-Z]+\b/,alias:"property"},"request-target":{pattern:/^(\s)(?:https?:\/\/|\/)\S*(?=\s)/,lookbehind:!0,alias:"url",inside:t.languages.uri},"http-version":{pattern:/^(\s)HTTP\/[\d.]+/,lookbehind:!0,alias:"property"}}},"response-status":{pattern:/^HTTP\/[\d.]+ \d+ .+/m,inside:{"http-version":{pattern:/^HTTP\/[\d.]+/,alias:"property"},"status-code":{pattern:/^(\s)\d+(?=\s)/,lookbehind:!0,alias:"number"},"reason-phrase":{pattern:/^(\s).+/,lookbehind:!0,alias:"string"}}},header:{pattern:/^[\w-]+:.+(?:(?:\r\n?|\n)[ \t].+)*/m,inside:{"header-value":[{pattern:e(/Content-Security-Policy/.source),lookbehind:!0,alias:["csp","languages-csp"],inside:t.languages.csp},{pattern:e(/Public-Key-Pins(?:-Report-Only)?/.source),lookbehind:!0,alias:["hpkp","languages-hpkp"],inside:t.languages.hpkp},{pattern:e(/Strict-Transport-Security/.source),lookbehind:!0,alias:["hsts","languages-hsts"],inside:t.languages.hsts},{pattern:e(/[^:]+/.source),lookbehind:!0}],"header-name":{pattern:/^[^:]+/,alias:"keyword"},punctuation:/^:/}}};var n=t.languages,a={"application/javascript":n.javascript,"application/json":n.json||n.javascript,"application/xml":n.xml,"text/xml":n.xml,"text/html":n.html,"text/css":n.css,"text/plain":n.plain},r={"application/json":!0,"application/xml":!0};function s(u){var m=u.replace(/^[a-z]+\//,""),b="\\w+/(?:[\\w.-]+\\+)+"+m+"(?![+\\w.-])";return"(?:"+u+"|"+b+")"}var i;for(var o in a)if(a[o]){i=i||{};var c=r[o]?s(o):o;i[o.replace(/\//g,"-")]={pattern:RegExp("("+/content-type:\s*/.source+c+/(?:(?:\r\n?|\n)[\w-].*)*(?:\r(?:\n|(?!\n))|\n)/.source+")"+/[^ \t\w-][\s\S]*/.source,"i"),lookbehind:!0,inside:a[o]}}i&&t.languages.insertBefore("http","header",i)})(Prism);(function(t){var e=/\\[\r\n](?:\s|\\[\r\n]|#.*(?!.))*(?![\s#]|\\[\r\n])/.source,n=/(?:[ \t]+(?![ \t])(?:<SP_BS>)?|<SP_BS>)/.source.replace(/<SP_BS>/g,function(){return e}),a=/"(?:[^"\\\r\n]|\\(?:\r\n|[\s\S]))*"|'(?:[^'\\\r\n]|\\(?:\r\n|[\s\S]))*'/.source,r=/--[\w-]+=(?:<STR>|(?!["'])(?:[^\s\\]|\\.)+)/.source.replace(/<STR>/g,function(){return a}),s={pattern:RegExp(a),greedy:!0},i={pattern:/(^[ \t]*)#.*/m,lookbehind:!0,greedy:!0};function o(c,u){return c=c.replace(/<OPT>/g,function(){return r}).replace(/<SP>/g,function(){return n}),RegExp(c,u)}t.languages.docker={instruction:{pattern:/(^[ \t]*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)(?:\\.|[^\r\n\\])*(?:\\$(?:\s|#.*$)*(?![\s#])(?:\\.|[^\r\n\\])*)*/im,lookbehind:!0,greedy:!0,inside:{options:{pattern:o(/(^(?:ONBUILD<SP>)?\w+<SP>)<OPT>(?:<SP><OPT>)*/.source,"i"),lookbehind:!0,greedy:!0,inside:{property:{pattern:/(^|\s)--[\w-]+/,lookbehind:!0},string:[s,{pattern:/(=)(?!["'])(?:[^\s\\]|\\.)+/,lookbehind:!0}],operator:/\\$/m,punctuation:/=/}},keyword:[{pattern:o(/(^(?:ONBUILD<SP>)?HEALTHCHECK<SP>(?:<OPT><SP>)*)(?:CMD|NONE)\b/.source,"i"),lookbehind:!0,greedy:!0},{pattern:o(/(^(?:ONBUILD<SP>)?FROM<SP>(?:<OPT><SP>)*(?!--)[^ \t\\]+<SP>)AS/.source,"i"),lookbehind:!0,greedy:!0},{pattern:o(/(^ONBUILD<SP>)\w+/.source,"i"),lookbehind:!0,greedy:!0},{pattern:/^\w+/,greedy:!0}],comment:i,string:s,variable:/\$(?:\w+|\{[^{}"'\\]*\})/,operator:/\\$/m}},comment:i},t.languages.dockerfile=t.languages.docker})(Prism);Prism.languages.makefile={comment:{pattern:/(^|[^\\])#(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/,lookbehind:!0},string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"builtin-target":{pattern:/\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,alias:"builtin"},target:{pattern:/^(?:[^:=\s]|[ \t]+(?![\s:]))+(?=\s*:(?!=))/m,alias:"symbol",inside:{variable:/\$+(?:(?!\$)[^(){}:#=\s]+|(?=[({]))/}},variable:/\$+(?:(?!\$)[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,keyword:/-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/,function:{pattern:/(\()(?:abspath|addsuffix|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:list|s)?)(?=[ \t])/,lookbehind:!0},operator:/(?:::|[?:+!])?=|[|@]/,punctuation:/[:;(){}]/};(function(t){var e=/\$(?:\w[a-z\d]*(?:_[^\x00-\x1F\s"'\\()$]*)?|\{[^}\s"'\\]+\})/i;t.languages.nginx={comment:{pattern:/(^|[\s{};])#.*/,lookbehind:!0,greedy:!0},directive:{pattern:/(^|\s)\w(?:[^;{}"'\\\s]|\\.|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\s+(?:#.*(?!.)|(?![#\s])))*?(?=\s*[;{])/,lookbehind:!0,greedy:!0,inside:{string:{pattern:/((?:^|[^\\])(?:\\\\)*)(?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/,lookbehind:!0,greedy:!0,inside:{escape:{pattern:/\\["'\\nrt]/,alias:"entity"},variable:e}},comment:{pattern:/(\s)#.*/,lookbehind:!0,greedy:!0},keyword:{pattern:/^\S+/,greedy:!0},boolean:{pattern:/(\s)(?:off|on)(?!\S)/,lookbehind:!0},number:{pattern:/(\s)\d+[a-z]*(?!\S)/i,lookbehind:!0},variable:e}},punctuation:/[{};]/}})(Prism);Prism.languages.c=Prism.languages.extend("clike",{comment:{pattern:/\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,greedy:!0},string:{pattern:/"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,greedy:!0},"class-name":{pattern:/(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,lookbehind:!0},keyword:/\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\b/,function:/\b[a-z_]\w*(?=\s*\()/i,number:/(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,operator:/>>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/});Prism.languages.insertBefore("c","string",{char:{pattern:/'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n]){0,32}'/,greedy:!0}});Prism.languages.insertBefore("c","string",{macro:{pattern:/(^[\t ]*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,lookbehind:!0,greedy:!0,alias:"property",inside:{string:[{pattern:/^(#\s*include\s*)<[^>]+>/,lookbehind:!0},Prism.languages.c.string],char:Prism.languages.c.char,comment:Prism.languages.c.comment,"macro-name":[{pattern:/(^#\s*define\s+)\w+\b(?!\()/i,lookbehind:!0},{pattern:/(^#\s*define\s+)\w+\b(?=\()/i,lookbehind:!0,alias:"function"}],directive:{pattern:/^(#\s*)[a-z]+/,lookbehind:!0,alias:"keyword"},"directive-hash":/^#/,punctuation:/##|\\(?=[\r\n])/,expression:{pattern:/\S[\s\S]*/,inside:Prism.languages.c}}}});Prism.languages.insertBefore("c","function",{constant:/\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\b/});delete Prism.languages.c.boolean;(function(t){var e=/\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|char8_t|class|co_await|co_return|co_yield|compl|concept|const|const_cast|consteval|constexpr|constinit|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int16_t|int32_t|int64_t|int8_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|uint16_t|uint32_t|uint64_t|uint8_t|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,n=/\b(?!<keyword>)\w+(?:\s*\.\s*\w+)*\b/.source.replace(/<keyword>/g,function(){return e.source});t.languages.cpp=t.languages.extend("c",{"class-name":[{pattern:RegExp(/(\b(?:class|concept|enum|struct|typename)\s+)(?!<keyword>)\w+/.source.replace(/<keyword>/g,function(){return e.source})),lookbehind:!0},/\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/,/\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i,/\b\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/],keyword:e,number:{pattern:/(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,greedy:!0},operator:/>>=?|<<=?|->|--|\+\+|&&|\|\||[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,boolean:/\b(?:false|true)\b/}),t.languages.insertBefore("cpp","string",{module:{pattern:RegExp(/(\b(?:import|module)\s+)/.source+"(?:"+/"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|<[^<>\r\n]*>/.source+"|"+/<mod-name>(?:\s*:\s*<mod-name>)?|:\s*<mod-name>/.source.replace(/<mod-name>/g,function(){return n})+")"),lookbehind:!0,greedy:!0,inside:{string:/^[<"][\s\S]+/,operator:/:/,punctuation:/\./}},"raw-string":{pattern:/R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,alias:"string",greedy:!0}}),t.languages.insertBefore("cpp","keyword",{"generic-function":{pattern:/\b(?!operator\b)[a-z_]\w*\s*<(?:[^<>]|<[^<>]*>)*>(?=\s*\()/i,inside:{function:/^\w+/,generic:{pattern:/<[\s\S]+/,alias:"class-name",inside:t.languages.cpp}}}}),t.languages.insertBefore("cpp","operator",{"double-colon":{pattern:/::/,alias:"punctuation"}}),t.languages.insertBefore("cpp","class-name",{"base-clause":{pattern:/(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,lookbehind:!0,greedy:!0,inside:t.languages.extend("cpp",{})}}),t.languages.insertBefore("inside","double-colon",{"class-name":/\b[a-z_]\w*\b(?!\s*::)/i},t.languages.cpp["base-clause"])})(Prism);Prism.languages.go=Prism.languages.extend("clike",{string:{pattern:/(^|[^\\])"(?:\\.|[^"\\\r\n])*"|`[^`]*`/,lookbehind:!0,greedy:!0},keyword:/\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,boolean:/\b(?:_|false|iota|nil|true)\b/,number:[/\b0(?:b[01_]+|o[0-7_]+)i?\b/i,/\b0x(?:[a-f\d_]+(?:\.[a-f\d_]*)?|\.[a-f\d_]+)(?:p[+-]?\d+(?:_\d+)*)?i?(?!\w)/i,/(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?[\d_]+)?i?(?!\w)/i],operator:/[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,builtin:/\b(?:append|bool|byte|cap|close|complex|complex(?:64|128)|copy|delete|error|float(?:32|64)|u?int(?:8|16|32|64)?|imag|len|make|new|panic|print(?:ln)?|real|recover|rune|string|uintptr)\b/});Prism.languages.insertBefore("go","string",{char:{pattern:/'(?:\\.|[^'\\\r\n]){0,10}'/,greedy:!0}});delete Prism.languages.go["class-name"];(function(t){var e=/\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record(?!\s*[(){}[\]<>=%~.:,;?+\-*/&|^])|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/,n=/(?:[a-z]\w*\s*\.\s*)*(?:[A-Z]\w*\s*\.\s*)*/.source,a={pattern:RegExp(/(^|[^\w.])/.source+n+/[A-Z](?:[\d_A-Z]*[a-z]\w*)?\b/.source),lookbehind:!0,inside:{namespace:{pattern:/^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,inside:{punctuation:/\./}},punctuation:/\./}};t.languages.java=t.languages.extend("clike",{string:{pattern:/(^|[^\\])"(?:\\.|[^"\\\r\n])*"/,lookbehind:!0,greedy:!0},"class-name":[a,{pattern:RegExp(/(^|[^\w.])/.source+n+/[A-Z]\w*(?=\s+\w+\s*[;,=()]|\s*(?:\[[\s,]*\]\s*)?::\s*new\b)/.source),lookbehind:!0,inside:a.inside},{pattern:RegExp(/(\b(?:class|enum|extends|implements|instanceof|interface|new|record|throws)\s+)/.source+n+/[A-Z]\w*\b/.source),lookbehind:!0,inside:a.inside}],keyword:e,function:[t.languages.clike.function,{pattern:/(::\s*)[a-z_]\w*/,lookbehind:!0}],number:/\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,operator:{pattern:/(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,lookbehind:!0},constant:/\b[A-Z][A-Z_\d]+\b/}),t.languages.insertBefore("java","string",{"triple-quoted-string":{pattern:/"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,greedy:!0,alias:"string"},char:{pattern:/'(?:\\.|[^'\\\r\n]){1,6}'/,greedy:!0}}),t.languages.insertBefore("java","class-name",{annotation:{pattern:/(^|[^.])@\w+(?:\s*\.\s*\w+)*/,lookbehind:!0,alias:"punctuation"},generics:{pattern:/<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,inside:{"class-name":a,keyword:e,punctuation:/[<>(),.:]/,operator:/[?&|]/}},import:[{pattern:RegExp(/(\bimport\s+)/.source+n+/(?:[A-Z]\w*|\*)(?=\s*;)/.source),lookbehind:!0,inside:{namespace:a.inside.namespace,punctuation:/\./,operator:/\*/,"class-name":/\w+/}},{pattern:RegExp(/(\bimport\s+static\s+)/.source+n+/(?:\w+|\*)(?=\s*;)/.source),lookbehind:!0,alias:"static",inside:{namespace:a.inside.namespace,static:/\b\w+$/,punctuation:/\./,operator:/\*/,"class-name":/\w+/}}],namespace:{pattern:RegExp(/(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)(?!<keyword>)[a-z]\w*(?:\.[a-z]\w*)*\.?/.source.replace(/<keyword>/g,function(){return e.source})),lookbehind:!0,inside:{punctuation:/\./}}})})(Prism);(function(t){for(var e=/\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|<self>)*\*\//.source,n=0;n<2;n++)e=e.replace(/<self>/g,function(){return e});e=e.replace(/<self>/g,function(){return/[^\s\S]/.source}),t.languages.rust={comment:[{pattern:RegExp(/(^|[^\\])/.source+e),lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/,greedy:!0},char:{pattern:/b?'(?:\\(?:x[0-7][\da-fA-F]|u\{(?:[\da-fA-F]_*){1,6}\}|.)|[^\\\r\n\t'])'/,greedy:!0},attribute:{pattern:/#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/,greedy:!0,alias:"attr-name",inside:{string:null}},"closure-params":{pattern:/([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/,lookbehind:!0,greedy:!0,inside:{"closure-punctuation":{pattern:/^\||\|$/,alias:"punctuation"},rest:null}},"lifetime-annotation":{pattern:/'\w+/,alias:"symbol"},"fragment-specifier":{pattern:/(\$\w+:)[a-z]+/,lookbehind:!0,alias:"punctuation"},variable:/\$\w+/,"function-definition":{pattern:/(\bfn\s+)\w+/,lookbehind:!0,alias:"function"},"type-definition":{pattern:/(\b(?:enum|struct|trait|type|union)\s+)\w+/,lookbehind:!0,alias:"class-name"},"module-declaration":[{pattern:/(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/,lookbehind:!0,alias:"namespace"},{pattern:/(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/,lookbehind:!0,alias:"namespace",inside:{punctuation:/::/}}],keyword:[/\b(?:Self|abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,/\b(?:bool|char|f(?:32|64)|[ui](?:8|16|32|64|128|size)|str)\b/],function:/\b[a-z_]\w*(?=\s*(?:::\s*<|\())/,macro:{pattern:/\b\w+!/,alias:"property"},constant:/\b[A-Z_][A-Z_\d]+\b/,"class-name":/\b[A-Z]\w*\b/,namespace:{pattern:/(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,inside:{punctuation:/::/}},number:/\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:f32|f64|[iu](?:8|16|32|64|size)?))?\b/,boolean:/\b(?:false|true)\b/,punctuation:/->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,operator:/[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/},t.languages.rust["closure-params"].inside.rest=t.languages.rust,t.languages.rust.attribute.inside.string=t.languages.rust.string})(Prism);var qt={rb:"ruby",gemfile:"ruby",gemspec:"ruby",irb:"ruby",rake:"ruby",rails:"ruby",ru:"ruby",yml:"yaml",html:"markup",htm:"markup",xml:"markup",svg:"markup",xhtml:"markup",sh:"bash",shell:"bash",shellscript:"bash",zsh:"bash",ksh:"bash",console:"shell-session",terminal:"shell-session",js:"javascript",mjs:"javascript",cjs:"javascript",node:"javascript",ts:"typescript",md:"markdown",jsonc:"json",json5:"json",dockerfile:"docker",make:"makefile",mk:"makefile",patch:"diff",gitdiff:"diff",curl:"http",rest:"http",dotenv:"ini",env:"ini",cfg:"ini",conf:"nginx"};function qe(){let t=Object.create(null);t.render=(n,a)=>{a.innerHTML=I.parse(n),a.querySelectorAll("pre code").forEach(r=>e(r)),a.querySelectorAll("a").forEach(r=>{r.target="_blank",r.rel="noopener"})};function e(n){let a=/\blang(?:uage)?-([\w-]+)/i.exec(n.className||""),r=a&&a[1].toLowerCase(),s=r&&(qt[r]||r),i=s&&Se.default.languages[s];i&&(n.className=`language-${s}`,n.innerHTML=Se.default.highlight(n.textContent,i,s))}return t}function Ze(t={}){let e=Object.create(null),{url:n,body:a,headers:r,withCredentials:s=!1}=t,i=t.method||"POST",o={};e.CONNECTING=0,e.OPEN=1,e.CLOSED=2,e.readyState=e.CONNECTING,e.url=n;let c=null,u="",m=a==null?void 0:typeof a=="string"||a instanceof URLSearchParams||typeof FormData<"u"&&a instanceof FormData?a:new URLSearchParams(a),b=m instanceof URLSearchParams||m==null?{"Content-Type":"application/x-www-form-urlencoded",...r}:{...r},w=(l,d)=>{let g=typeof MessageEvent=="function"?new MessageEvent(l,{data:d}):{type:l,data:d};for(let f of o[l]||[])f(g)},k=l=>{let d="message",g=[];for(let f of l.split(`
`))f.startsWith("event:")?d=f.slice(6).trim():f.startsWith("data:")&&g.push(f.slice(5).trim());g.length&&w(d,g.join(`
`))},x=()=>{let l;for(;(l=u.indexOf(`

`))!==-1;){let d=u.slice(0,l);u=u.slice(l+2),k(d)}};e.addEventListener=(l,d)=>((o[l]||=[]).push(d),e),e.removeEventListener=(l,d)=>(o[l]=(o[l]||[]).filter(g=>g!==d),e),e.close=()=>{e.readyState!==e.CLOSED&&(e.readyState=e.CLOSED,c?.abort(),c=null)},e.active=()=>e.readyState===e.OPEN||e.readyState===e.CONNECTING,c=new AbortController;let p=c.signal;return fetch(n,{method:i,headers:b,body:m,signal:p,credentials:s?"include":"same-origin"}).then(async l=>{if(!l.ok)throw new Error(await l.text()||`${l.status}`);if(e.readyState===e.CLOSED)return;e.readyState=e.OPEN;let d=l.body.getReader(),g=new TextDecoder;for(;;){let{value:f,done:y}=await d.read();if(y)break;u+=g.decode(f,{stream:!0}),x()}e.close()}).catch(l=>{if(e.readyState===e.CLOSED||l.name==="AbortError"){e.close();return}e.close();let d=typeof MessageEvent=="function"?new MessageEvent("error",{data:l.message||String(l)}):{type:"error",data:l.message||String(l),message:l.message};for(let g of o.error||[])g(d)}),e}function Ye(t={}){let e=Object.create(null),{path:n,headers:a}=t,r=["onContent","onToolCall","onToolReturn","onGoodbye","onError"],s=null;return e.onContent=t.onContent||(i=>{}),e.onToolCall=t.onToolCall||(i=>{}),e.onToolReturn=t.onToolReturn||(i=>{}),e.onGoodbye=t.onGoodbye||(i=>{}),e.onError=t.onError||(i=>{}),e.attach=i=>{if(s)return e;let o=Ze({url:n,headers:a,body:{q:i}});for(let c of r)o.addEventListener(c,u=>{e[c]?.(JSON.parse(u.data)),(c==="onGoodbye"||c==="onError")&&e.close()});return o.addEventListener("error",c=>{e.onError({error:c.data}),e.close()}),s=o,e},e.close=()=>{s&&(s.close(),s=null)},e.active=()=>!!s,e}function Xe(){let t=Object.create(null);return t.active=new Map,t.completed=new Map,t.onToolCall=e=>{t.active.set(e.id,e.name)},t.onToolReturn=e=>{t.active.delete(e.id),t.completed.set(e.name,(t.completed.get(e.name)||0)+1)},t}function We(t={}){let e=Object.create(null),n=t.host,a=t.root,r=a.querySelector(".ac-answer"),s=a.querySelector(".ac-form"),i=a.querySelector(".ac-reset"),o=a.querySelector(".ac-expand"),c=Xe(),u={data:{...t.labels||{},fallback:{call:"Running {name} tool\u2026",return:"Tool {name} finished"}},for(h){let{data:E}=this;return E[h]||E["*"]||E.default||E.fallback},slot(h,E){for(let A of n.children){let L=A.getAttribute("slot");if(L===`tool.${h}.${E}`||L===`tool.*.${E}`)return A}},text(h,E,A){let L=E==="return"?"return":"call",_=this.slot(h,L);if(_)return _.textContent;let C=this.for(h);switch(E){case"return":return typeof C=="string"?A.count?C:void 0:C.return;default:return typeof C=="string"?C:C.call}},icon(h,E){let A=E==="return"?"return-icon":"call-icon",L=this.slot(h,A);if(L)return L;let _=this.for(h);return typeof _=="object"&&_&&_[A]?_[A]:f.default(E)},substitute(h,E){return h.replace(/\{(\w+)(?:\.(\w+))?\}/g,(A,L,_)=>L==="arguments"?_?E.arguments?.[_]??"":"":E[L]??"")},resolve(h,E){let A=this.text(h.name,E,h);return typeof A=="function"&&(A=A(h)),typeof A=="string"&&(A=this.substitute(A,h)),{text:A,icon:this.icon(h.name,E)}},active(h){return this.resolve(h,"active")},done(h){return this.resolve(h,"return")}},m={separator:a.querySelector(".ac-trace-separator"),label:a.querySelector(".ac-trace-label"),paint(){let h=b.el.children.length>0,E=w.entries.size;this.separator&&(this.separator.hidden=!h),this.label&&(this.label.textContent=`${E} ${E===1?"action":"actions"}`)}},b={el:a.querySelector(".ac-status"),thinking:"Thinking\u2026",render({text:h,icon:E,thinking:A}){let{el:L}=this;if(L.replaceChildren(),E&&L.append(E.cloneNode(!0)),h!=null){let _=document.createElement("span");_.textContent=h,A&&(_.className="is-thinking"),L.append(_)}m.paint()},follow(){let h=[...c.active.keys()].pop();if(h!=null){this.render(u.active({id:h,name:c.active.get(h)}));return}if(v){this.render({text:this.thinking,thinking:!0});return}this.render({})}},w={el:a.querySelector(".ac-trace"),details:a.querySelector(".ac-trace-details"),list:a.querySelector(".ac-trace-list"),entries:new Map,row(h){let{entries:E}=this,A=E.get(h.id);return A||(A=document.createElement("div"),A.className="ac-action",E.set(h.id,A),this.list.append(A)),A},paint(h,E,{text:A,icon:L}){let _=this.row(h);if(_.classList.toggle("is-running",E==="call"),_.classList.toggle("is-done",E==="return"),_.replaceChildren(),L&&_.append(L.cloneNode(!0)),A!=null){let C=document.createElement("span");C.textContent=A,_.append(C)}this.el.hidden=!1,this.summarise()},summarise(){m.paint()},call(h){this.paint(h,"call",u.active(h))},returned(h){this.paint(h,"return",u.done(h))},settle(){this.entries.forEach(h=>h.classList.remove("is-running"))},clear(){this.entries.clear(),this.list.replaceChildren(),this.details.open=!1,this.summarise()}},k={el:a.querySelector(".ac-placeholder"),last:a.querySelector(".ac-last-message"),show(){let{el:h}=this;h.hidden=!1,this.last&&(this.last.hidden=!0)},hide(){let{el:h}=this;h.hidden=!0,this.last&&(this.last.hidden=!0)},restore(h){this.last&&(t.renderer.render(h,this.last),this.el.classList.add("is-restored"),this.el.hidden=!0,this.last.hidden=!1)},forget(){this.last&&(this.el.classList.remove("is-restored"),this.el.hidden=!1,this.last.hidden=!0,this.last.innerHTML="")}},x={el:a.querySelector(".ac-loading"),show(){this.el&&(this.el.hidden=!1)},hide(){this.el&&(this.el.hidden=!0)}};k.hide(),x.show();let p={meter:a.querySelector(".ac-memory-meter"),fill:a.querySelector(".ac-memory-fill"),value:a.querySelector(".ac-memory-value"),figures:a.querySelector(".ac-memory-help-figures"),render(h){let E=Number(h?.context_used??0),A=Number(h?.context_available??0),L=A>0?100-E/A*100:100,_=Math.round(Math.min(100,Math.max(0,L)));this.fill&&(this.fill.style.width=`${_}%`),this.value&&(this.value.textContent=`${_}%`),this.figures&&(this.figures.textContent=A>0?`${E.toLocaleString()} of ${A.toLocaleString()}`:"Nothing known to be spent yet"),this.meter&&(this.meter.setAttribute("aria-valuenow",String(_)),this.meter.classList.toggle("is-critical",_<=20),this.meter.classList.toggle("is-low",_>20&&_<=50))}},l={el:a.querySelector(".ac-memory-help"),meter:a.querySelector(".ac-memory-meter"),open(){let{el:h,meter:E}=this;if(!h||!E||typeof h.showPopover!="function")return;let A=E.getBoundingClientRect();h.showPopover(),this.opened=!0;let L=h.offsetWidth||0,_=Math.min(Math.max(A.left,8),Math.max(8,window.innerWidth-L-8)),C=A.top<(h.offsetHeight||0)+16;h.style.left=`${Math.round(_)}px`,h.style.top=`${Math.round(C?A.bottom:A.top)}px`,h.style.transform=C?"translateY(0.5em)":"translateY(calc(-100% - 0.5em))",h.classList.toggle("is-below",C)},close(){let{el:h}=this;h&&this.opened&&typeof h.hidePopover=="function"&&(this.opened=!1,h.hidePopover())}};l.meter&&(l.meter.addEventListener("pointerenter",()=>l.open()),l.meter.addEventListener("pointerleave",()=>l.close()),l.meter.addEventListener("focus",()=>l.open()),l.meter.addEventListener("blur",()=>l.close()));let d=h=>{x.hide(),p.render(h),!R&&(h?.last_message?k.restore(h.last_message):k.show())},g=async()=>{try{let h=await t.http.describe();if(!h.ok)throw new Error(String(h.status));d(await h.json())}catch{d(void 0)}},f={el:a,default(h){let{el:E}=this,A=E.querySelector(h==="return"?".ac-icon-return":".ac-icon-call");return A?A.content.cloneNode(!0):void 0}},y={el:a.querySelector(".ac-input"),get value(){return this.el.value},clear(){this.el.value=""},busy(h){this.el.readOnly=h},focus(){this.el.focus({preventScroll:!0})}},T="",v=!1,R=!1,F=Ye({path:t.path,headers:t.headers,onContent(h){v=!1,b.follow(),k.hide(),T+=h.text,t.renderer.render(T,r)},onToolCall(h){c.onToolCall(h),v=!1,b.follow(),w.call(h)},onToolReturn(h){c.onToolReturn(h),h.count=c.completed.get(h.name)||0,v=!0,b.follow(),w.returned(h)},onGoodbye(h){c.active.clear(),w.settle(),v=!1,b.follow(),y.busy(!1),T.trim()===""&&h.answer&&t.renderer.render(h.answer,r),g()},onError(h){c.active.clear(),w.settle(),v=!1,b.follow(),y.busy(!1),k.hide(),r.classList.add("is-error");let E="Something went wrong. Please try again.";try{E=h.error||E}catch{}r.textContent=E,g()}});return e.talk=h=>{F.active()||(R=!0,c.active.clear(),c.completed.clear(),T="",r.innerHTML="",r.classList.remove("is-error"),k.hide(),y.busy(!0),v=!0,w.clear(),b.follow(),F.attach(h),y.clear(),y.focus())},e.restore=h=>{x.hide(),h?.last_message?k.restore(h.last_message):k.show()},e.reset=async()=>{F.close();try{await t.http.destroy()}catch{}r.innerHTML="",r.classList.remove("is-error"),k.forget(),k.show(),c.active.clear(),c.completed.clear(),v=!1,R=!1,b.follow(),w.clear(),y.busy(!1),y.focus(),g()},e.focus=()=>y.focus(),e.clear=()=>{r.innerHTML="",r.classList.remove("is-error")},s.addEventListener("submit",h=>{h.preventDefault();let E=y.value.trim();E&&e.talk(E)}),i.addEventListener("click",e.reset),o.addEventListener("click",()=>{let h=a.classList.toggle("is-expanded");n.toggleAttribute("expanded",h),o.setAttribute("aria-expanded",h?"true":"false"),o.title=h?"Collapse chat":"Expand chat",y.focus()}),w.summarise(),b.follow(),g(),e}var Zt=`
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
    /* The console's own gutter: the furniture - the composer and the trace -
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
       otherwise the same grey as the rest of the trace. It sits in a bar
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

  /* Markdown, at the sizes r.uby.dev's console ran at: headings tamed
     to 18/16/15/14px rather than arriving at the page's h1/h2 sizes,
     code chips on --ac-surface, pre with the accent on its edge.
     Everything is in em, so it follows --ac-font-size. */
  .ac-answer h1,
  .ac-answer h2,
  .ac-answer h3,
  .ac-answer h4,
  .ac-answer h5 {
    font-weight: 600;
    line-height: 1.3;
    margin: 1em 0 0.57em;
  }

  .ac-answer h1 { font-size: 1.29em; }
  .ac-answer h2 { font-size: 1.14em; }
  .ac-answer h3 { font-size: 1.07em; }
  .ac-answer h4,
  .ac-answer h5 { font-size: 1em; }

  .ac-answer p { margin: 0 0 0.86em; }
  .ac-answer ul,
  .ac-answer ol { margin: 0 0 0.71em; padding-left: 1.43em; }
  .ac-answer li { margin-bottom: 0.43em; }
  .ac-answer li > p { margin-bottom: 0.43em; }
  .ac-answer strong { font-weight: 700; }
  .ac-answer em { color: var(--ac-muted); }

  .ac-answer a {
    color: var(--ac-accent);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

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
    border-left: 2px solid var(--ac-border);
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

  /* The live line: which tool is running, "Thinking\u2026" while the turn waits
     on the model, and nothing at all in between. It is always on screen -
     the bar it sits in never blinks out - but it only speaks when it has
     something to say. */
  .ac-status {
    align-items: center;
    /* The live line carries the ink; the count beside it stays muted. */
    color: var(--ac-ink);
    display: flex;
    font-family: var(--ac-font-mono);
    font-size: 0.93em;
    gap: 0.57em;
    line-height: 1.2;
  }

  .ac-status .is-thinking { font-style: italic; }

  /* A trace of what the agent did, sitting at the top of the console:
     the live line says what is happening now, the summary counts what
     has happened, and the list is a disclosure away. Native <details>,
     so opening it is not our JavaScript. */
  .ac-trace {
    color: var(--ac-muted);
    /* The bar sits between the answer and the composer, so opening the
       list pushes the streamed content up and closing it lets the content
       back down. It runs the console's full width - bleeding out through
       the frame's own gutter, the way it did before - so its rules meet the
       borders; its text keeps the bar's own small inset. */
    flex: 0 0 auto;
    font-family: var(--ac-font-mono);
    line-height: 1.2;
    margin-left: calc(-1 * var(--ac-pad-x));
    margin-right: calc(-1 * var(--ac-pad-x));
    margin-top: 1.25em;
    max-height: 40%;
    overflow: auto;
    scrollbar-gutter: stable;
    scrollbar-width: thin;
  }

  .ac-trace-details { font-size: 0.86em; }

  /* The count stays on screen even at zero, so the line beside the
     live call never moves: "0 actions  Idle" is a resting state. */
  .ac-trace[hidden] { display: none; }
  /* The status bar: one line of information on the left - what is running,
     and how many calls have run - with the chevron alone at the right, so
     it marks the row as a disclosure without competing with either. It runs
     the console's full width and carries its own rules, and the list below
     opens out of it. */
  .ac-trace-summary {
    align-items: center;
    background: var(--ac-surface);
    border-bottom: 1px solid var(--ac-border);
    border-top: 1px solid var(--ac-border);
    cursor: pointer;
    display: flex;
    gap: 0.71em;
    list-style: none;
    padding: 0.5em 0.72em;
    user-select: none;
  }

  .ac-trace-summary:hover { color: var(--ac-accent); }

  .ac-trace-summary::-webkit-details-marker { display: none; }

  /* The dot separates the live line from the count, and is only there when
     the live line has something to say. */
  .ac-trace-separator { color: var(--ac-muted); }

  .ac-trace-separator[hidden] { display: none; }

  .ac-icon-chevron {
    flex: none;
    /* Alone at the right edge: it marks the row as a disclosure without
       competing with the live line or the count. */
    margin-left: auto;
    transition: transform 0.15s ease;
  }

  .ac-trace-details[open] .ac-icon-chevron { transform: rotate(180deg); }

  .ac-trace-list {
    display: flex;
    flex-direction: column;
    gap: 0.29em;
    margin-top: 0.43em;
    /* The bar's own padding, so the rows line up with the count above
       them rather than with the console's edge. */
    padding-left: 0.72em;
    padding-right: 0.72em;
  }

  /* Opened while there is nothing to show: the list says so, rather than
     leaving a gap where the rows would have been. */
  .ac-trace-empty {
    color: var(--ac-muted);
    display: none;
    padding: 0.43em 0.72em 0;
  }

  .ac-trace-details[open]:has(.ac-trace-list:empty) .ac-trace-empty { display: block; }

  @media (prefers-reduced-motion: reduce) {
    .ac-icon-chevron { transition: none; }
  }

  .ac-action {
    align-items: center;
    display: flex;
    gap: 0.57em;
    min-width: 0;
  }

  /* A call pulses while it runs; once it returns it settles down. */
  .ac-action.is-running { animation: ac-pulse 1.6s ease-in-out infinite; }
  .ac-action.is-done { opacity: 0.72; }

  @keyframes ac-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ac-action.is-running { animation: none; }
    .ac-loading span { animation: none; }
    .ac-memory-cells { transition: none; }
  }

  /* Default icons, used when the host slots none of its own - and the
     sizing for the ones it does slot, which arrive as plain images. */
  .ac-icon,
  .ac-action > img,
  .ac-action > svg,
  .ac-status > img,
  .ac-status > svg {
    flex: none;
    height: 1em;
    opacity: 0.75;
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
  /* The agent's memory, out past the caret at the far right of the bar.
     It is spent rather than filled, so it starts full and green and gets
     shorter as the conversation goes on, and it wears the words inside it
     the way a system progress bar does. */
  /* The agent's memory, out past the caret: a battery, which is the one
     icon everybody already reads as capacity, and which needs no words
     inside it. The case takes the console's own ink and the charge takes
     the colour of the band, so nothing has to stay legible over anything -
     what changes as the context is spent is how much of the case is
     filled, and then its colour. */
  .ac-memory {
    align-items: center;
    display: flex;
    flex: none;
    gap: 0.45em;
  }

  .ac-memory-meter {
    align-items: center;
    display: flex;
    gap: 0.45em;
  }

  .ac-memory-icon {
    /* The case. Its inside is a well the charge sits in, so the number
       written over both has one thing to be read against that is always
       dark: white holds on the well and on the charge alike. */
    background: rgba(0, 0, 0, 0.55);
    background: light-dark(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.45));
    border: 1px solid currentColor;
    border-radius: 0.16em;
    flex: none;
    height: 1.25em;
    padding: 0.1em;
    position: relative;
    width: 2.9em;
  }

  /* The nub the battery hangs on. */
  .ac-memory-icon::after {
    background: currentColor;
    border-radius: 0 0.08em 0.08em 0;
    content: "";
    height: 0.4em;
    left: 100%;
    margin-left: 0.1em;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 0.13em;
  }

  .ac-memory-fill {
    /* The charge: the blue a system shows while there is room, and the hues
       that follow it as the room runs out. The plain value is the light one
       and the light-dark() line picks per the page's own color-scheme,
       dropping back where a browser does not know the function. */
    background: var(--ac-memory, #1f6feb);
    background: var(--ac-memory, light-dark(#1f6feb, #0969da));
    border-radius: 0.1em;
    display: block;
    height: 100%;
    transition: background 0.35s ease, width 0.35s ease;
    width: 100%;
  }

  /* The number, in the case with the charge, where it costs no room of its
     own - set to the row's own size, so the case is only as big as the
     words need and not a size of its own. */
  .ac-memory-value {
    align-items: center;
    color: var(--ac-memory-ink, #fff);
    display: flex;
    font-size: 1em;
    font-variant-numeric: tabular-nums;
    inset: 0;
    justify-content: center;
    line-height: 1;
    position: absolute;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  }

  /* Getting close: the context is more than half spent. */
  .ac-memory-meter.is-low .ac-memory-fill {
    background: var(--ac-memory-low, #9a6700);
    background: var(--ac-memory-low, light-dark(#9a6700, #b45309));
  }

  /* Nearly full: the conversation is about to be compacted, so the meter
     says so in the colour a console already uses for trouble. */
  .ac-memory-meter.is-critical .ac-memory-fill {
    background: var(--ac-memory-critical, #cf222e);
  }

  .ac-memory-label {
    font-size: 0.72em;
    letter-spacing: 0.06em;
    line-height: 1;
    text-transform: uppercase;
  }

  /* The rule between the name and the case, so the two read as the two
     things they are. */
  .ac-memory-divider {
    background: currentColor;
    flex: none;
    height: 0.9em;
    opacity: 0.35;
    width: 1px;
  }

  /* The explanation, worn as a popover: in the top layer, so the bar's own
     scrolling cannot clip it, and out of the page's flow until it is asked
     for. It is a card in the console's own hand - mono, hairline, a small
     heading, figures and a note - rather than a speech bubble, and it
     carries a notch so it points at the case it is talking about. Its
     position is set from the meter's box, since a popover is not placed by
     the element that opened it. */
  .ac-memory-help {
    background: var(--ac-help-background, #fff);
    background: var(--ac-help-background, light-dark(#fff, #161b22));
    border: 1px solid var(--ac-border);
    border-radius: 0.375em;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
    color: var(--ac-help-ink, #1f2328);
    color: var(--ac-help-ink, light-dark(#1f2328, #e6edf3));
    font-family: var(--ac-font-mono);
    font-size: 0.86em;
    line-height: 1.45;
    margin: 0;
    max-height: none;
    max-width: 16em;
    /* The user agent gives a popover overflow: auto, which would both cut
       off the notch - it sits outside the card's box - and give a card this
       small a scrollbar it has no use for. */
    overflow: visible;
    padding: 0.62em 0.78em;
    position: fixed;
    width: max-content;
  }

  /* The notch: a rotated square sharing the card's fill and its edges, so
     it reads as the card pointing rather than as a second shape. */
  .ac-memory-help::after {
    background: inherit;
    border-bottom: 1px solid var(--ac-border);
    border-right: 1px solid var(--ac-border);
    bottom: -0.33em;
    content: "";
    height: 0.6em;
    position: absolute;
    right: 2.6em;
    transform: rotate(45deg);
    width: 0.6em;
  }

  /* Hanging below the case instead of above it, the notch turns over. */
  .ac-memory-help.is-below::after {
    border-bottom: 0;
    border-right: 0;
    border-left: 1px solid var(--ac-border);
    border-top: 1px solid var(--ac-border);
    bottom: auto;
    top: -0.33em;
  }

  .ac-memory-help-title {
    display: block;
    font-size: 0.86em;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .ac-memory-help-figures {
    display: block;
    font-variant-numeric: tabular-nums;
    margin-top: 0.29em;
  }

  .ac-form {
    align-items: center;
    display: flex;
    font-family: var(--ac-font-mono);
    gap: var(--ac-gap);
    padding-top: 0.72em;
  }

  .ac-form:focus-within .ac-prompt { color: var(--ac-accent); }

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

  <div class="ac-trace" part="trace">
    <details class="ac-trace-details" part="trace-details">
      <summary class="ac-trace-summary" part="trace-summary">
        <div class="ac-status" part="status" aria-live="polite"></div>

        <span class="ac-trace-separator" part="trace-separator" aria-hidden="true">&middot;</span>
        <span class="ac-trace-label" part="trace-label"></span>

        <svg class="ac-icon ac-icon-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>

        <!-- The agent's memory, out past the caret at the far right. -->
        <div class="ac-memory" part="memory">
          <span class="ac-memory-meter" part="memory-meter" role="progressbar" aria-label="Agent memory" aria-describedby="ac-memory-help" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100" tabindex="0">
            <span class="ac-memory-label" part="memory-label">Memory</span>
            <span class="ac-memory-divider" part="memory-divider" aria-hidden="true"></span>
            <span class="ac-memory-icon" part="memory-icon" aria-hidden="true">
              <span class="ac-memory-fill" part="memory-fill"></span>
              <span class="ac-memory-value" part="memory-value">100%</span>
            </span>
          </span>

          <!-- Shown when the meter is hovered or focused. A popover, so it
               is not clipped by the bar's own scrolling. -->
          <span class="ac-memory-help" part="memory-help" id="ac-memory-help" role="tooltip" popover>
            <span class="ac-memory-help-title" part="memory-help-title">Memory</span>
            <span class="ac-memory-help-figures" part="memory-help-figures"></span>
          </span>
        </div>
      </summary>

      <div class="ac-trace-list" part="trace-list"></div>

      <div class="ac-trace-empty" part="trace-empty">I haven't run any actions yet</div>
    </details>
  </div>

  <form class="ac-form" part="form">
    <span class="ac-prompt" part="prompt" aria-hidden="true">$</span>
    <input class="ac-input" part="input" type="text" autocomplete="off" placeholder="Ask\u2026" aria-label="Message">

    <div class="ac-buttons">
      <button class="ac-expand" part="expand" type="button" aria-expanded="false" title="Expand chat"><svg class="ac-icon ac-icon-expand" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg><svg class="ac-icon ac-icon-collapse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7"/></svg></button>
      <button class="ac-reset" part="reset" type="button" title="Reset console"><slot name="reset-icon"><svg class="ac-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 4v6h6M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg></slot></button>
      </div>
    </form>
</div>
`,Ke=document.createElement("template");Ke.innerHTML=Zt;function Ve(){return Ke.content.cloneNode(!0)}var Ee=class extends HTMLElement{static get observedAttributes(){return["path","agent","csrf","height","expanded","disabled","prompt","placeholder"]}constructor(){super(),this.attachShadow({mode:"open"}).append(Ve())}connectedCallback(){let e=this.path||(this.agent?`agents/${this.agent}`:""),n=this.headers(),a=Re({path:e,headers:n});this.console=We({host:this,root:this.shadowRoot.querySelector(".ac-console"),http:a,path:e,headers:n,renderer:qe(),labels:this.labels}),this.applyHeight(this.getAttribute("height")),this.applyPrompt(this.getAttribute("prompt")),this.applyPlaceholder(this.getAttribute("placeholder")),this.observePlaceholder(),this.disabled||this.focus()}attributeChangedCallback(e,n,a){e==="height"&&this.applyHeight(a),e==="prompt"&&this.applyPrompt(a),e==="placeholder"&&this.applyPlaceholder(a),e==="expanded"&&this.applyExpanded(a!==null)}applyExpanded(e){let n=this.shadowRoot?.querySelector(".ac-console");n&&n.classList.toggle("is-expanded",e)}applyPrompt(e){let n=this.shadowRoot?.querySelector(".ac-prompt");n&&(n.textContent=e||"$")}applyPlaceholder(e){let n=this.shadowRoot?.querySelector(".ac-input");n&&(n.placeholder=e||"Ask\u2026")}applyHeight(e){let n=this.shadowRoot?.querySelector(".ac-console");if(!n)return;if(e){n.style.setProperty("--ac-height",e);return}n.style.removeProperty("--ac-height");let a=this.height();a>0&&n.style.setProperty("--ac-height",`${a}px`)}height(){let e=this.shadowRoot.querySelector(".ac-console"),n=this.shadowRoot.querySelector(".ac-placeholder"),a=this.shadowRoot.querySelector(".ac-loading"),r=this.shadowRoot.querySelector(".ac-last-message"),s=[n.hidden,a.hidden,r.hidden];n.hidden=!1,a.hidden=!0,r.hidden=!0;let i=e.offsetHeight;return[n,a,r].forEach((o,c)=>{o.hidden=s[c]}),i}observePlaceholder(){let e=this.shadowRoot,n=e?.querySelector(".ac-placeholder"),a=e?.querySelector(".ac-answer");if(!n||!a)return;let r=()=>!this.hasAttribute("height")&&!n.hidden&&a.childNodes.length===0;"ResizeObserver"in window&&(this.observer?.disconnect(),this.observer=new ResizeObserver(()=>{r()&&this.applyHeight()}),this.observer.observe(n)),document.fonts?.ready.then(()=>{r()&&this.applyHeight()})}disconnectedCallback(){this.observer?.disconnect(),this.observer=void 0}get path(){return this.getAttribute("path")||""}set path(e){this.setAttribute("path",e)}get agent(){return this.getAttribute("agent")||""}set agent(e){this.setAttribute("agent",e)}get prompt(){return this.getAttribute("prompt")||"$"}set prompt(e){this.setAttribute("prompt",e)}get placeholder(){return this.getAttribute("placeholder")||"Ask\u2026"}set placeholder(e){this.setAttribute("placeholder",e)}get disabled(){return this.hasAttribute("disabled")}set disabled(e){e?this.setAttribute("disabled",""):this.removeAttribute("disabled")}reset(){this.console.reset()}focus(){this.console.focus()}talk(e){this.console.talk(e)}clear(){this.console.clear()}headers(){let e=this.getAttribute("csrf")||"auto";if(e==="none")return{};let n=e==="auto"?document.querySelector('meta[name="_csrf"]')?.content:e;return n?{"X-CSRF-Token":n}:{}}get labels(){return this._labels||{}}set labels(e){this._labels=e||{}}};customElements.get("agent-console")||customElements.define("agent-console",Ee);})();
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
