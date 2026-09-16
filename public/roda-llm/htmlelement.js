(()=>{var rt=Object.create;var Re=Object.defineProperty;var st=Object.getOwnPropertyDescriptor;var it=Object.getOwnPropertyNames;var ot=Object.getPrototypeOf,lt=Object.prototype.hasOwnProperty;var ct=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var ut=(t,e,n,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of it(e))!lt.call(t,a)&&a!==n&&Re(t,a,{get:()=>e[a],enumerable:!(r=st(e,a))||r.enumerable});return t};var pt=(t,e,n)=>(n=t!=null?rt(ot(t)):{},ut(e||!t||!t.__esModule?Re(n,"default",{value:t,enumerable:!0}):n,t));var Ge=ct((fn,oe)=>{var Xt=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};var T=(function(t){var e=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,n=0,r={},a={manual:t.Prism&&t.Prism.manual,disableWorkerMessageHandler:t.Prism&&t.Prism.disableWorkerMessageHandler,util:{encode:function p(l){return l instanceof s?new s(l.type,p(l.content),l.alias):Array.isArray(l)?l.map(p):l.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(p){return Object.prototype.toString.call(p).slice(8,-1)},objId:function(p){return p.__id||Object.defineProperty(p,"__id",{value:++n}),p.__id},clone:function p(l,h){h=h||{};var g,f;switch(a.util.type(l)){case"Object":if(f=a.util.objId(l),h[f])return h[f];g={},h[f]=g;for(var x in l)l.hasOwnProperty(x)&&(g[x]=p(l[x],h));return g;case"Array":return f=a.util.objId(l),h[f]?h[f]:(g=[],h[f]=g,l.forEach(function(_,E){g[E]=p(_,h)}),g);default:return l}},getLanguage:function(p){for(;p;){var l=e.exec(p.className);if(l)return l[1].toLowerCase();p=p.parentElement}return"none"},setLanguage:function(p,l){p.className=p.className.replace(RegExp(e,"gi"),""),p.classList.add("language-"+l)},currentScript:function(){if(typeof document>"u")return null;if(document.currentScript&&document.currentScript.tagName==="SCRIPT")return document.currentScript;try{throw new Error}catch(g){var p=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(g.stack)||[])[1];if(p){var l=document.getElementsByTagName("script");for(var h in l)if(l[h].src==p)return l[h]}return null}},isActive:function(p,l,h){for(var g="no-"+l;p;){var f=p.classList;if(f.contains(l))return!0;if(f.contains(g))return!1;p=p.parentElement}return!!h}},languages:{plain:r,plaintext:r,text:r,txt:r,extend:function(p,l){var h=a.util.clone(a.languages[p]);for(var g in l)h[g]=l[g];return h},insertBefore:function(p,l,h,g){g=g||a.languages;var f=g[p],x={};for(var _ in f)if(f.hasOwnProperty(_)){if(_==l)for(var E in h)h.hasOwnProperty(E)&&(x[E]=h[E]);h.hasOwnProperty(_)||(x[_]=f[_])}var L=g[p];return g[p]=x,a.languages.DFS(a.languages,function(b,u){u===L&&b!=p&&(this[b]=x)}),x},DFS:function p(l,h,g,f){f=f||{};var x=a.util.objId;for(var _ in l)if(l.hasOwnProperty(_)){h.call(l,_,l[_],g||_);var E=l[_],L=a.util.type(E);L==="Object"&&!f[x(E)]?(f[x(E)]=!0,p(E,h,null,f)):L==="Array"&&!f[x(E)]&&(f[x(E)]=!0,p(E,h,_,f))}}},plugins:{},highlightAll:function(p,l){a.highlightAllUnder(document,p,l)},highlightAllUnder:function(p,l,h){var g={callback:h,container:p,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};a.hooks.run("before-highlightall",g),g.elements=Array.prototype.slice.apply(g.container.querySelectorAll(g.selector)),a.hooks.run("before-all-elements-highlight",g);for(var f=0,x;x=g.elements[f++];)a.highlightElement(x,l===!0,g.callback)},highlightElement:function(p,l,h){var g=a.util.getLanguage(p),f=a.languages[g];a.util.setLanguage(p,g);var x=p.parentElement;x&&x.nodeName.toLowerCase()==="pre"&&a.util.setLanguage(x,g);var _=p.textContent,E={element:p,language:g,grammar:f,code:_};function L(u){E.highlightedCode=u,a.hooks.run("before-insert",E),E.element.innerHTML=E.highlightedCode,a.hooks.run("after-highlight",E),a.hooks.run("complete",E),h&&h.call(E.element)}if(a.hooks.run("before-sanity-check",E),x=E.element.parentElement,x&&x.nodeName.toLowerCase()==="pre"&&!x.hasAttribute("tabindex")&&x.setAttribute("tabindex","0"),!E.code){a.hooks.run("complete",E),h&&h.call(E.element);return}if(a.hooks.run("before-highlight",E),!E.grammar){L(a.util.encode(E.code));return}if(l&&t.Worker){var b=new Worker(a.filename);b.onmessage=function(u){L(u.data)},b.postMessage(JSON.stringify({language:E.language,code:E.code,immediateClose:!0}))}else L(a.highlight(E.code,E.grammar,E.language))},highlight:function(p,l,h){var g={code:p,grammar:l,language:h};if(a.hooks.run("before-tokenize",g),!g.grammar)throw new Error('The language "'+g.language+'" has no grammar.');return g.tokens=a.tokenize(g.code,g.grammar),a.hooks.run("after-tokenize",g),s.stringify(a.util.encode(g.tokens),g.language)},tokenize:function(p,l){var h=l.rest;if(h){for(var g in h)l[g]=h[g];delete l.rest}var f=new c;return d(f,f.head,p),o(p,f,l,f.head,0),w(f)},hooks:{all:{},add:function(p,l){var h=a.hooks.all;h[p]=h[p]||[],h[p].push(l)},run:function(p,l){var h=a.hooks.all[p];if(!(!h||!h.length))for(var g=0,f;f=h[g++];)f(l)}},Token:s};t.Prism=a;function s(p,l,h,g){this.type=p,this.content=l,this.alias=h,this.length=(g||"").length|0}s.stringify=function p(l,h){if(typeof l=="string")return l;if(Array.isArray(l)){var g="";return l.forEach(function(L){g+=p(L,h)}),g}var f={type:l.type,content:p(l.content,h),tag:"span",classes:["token",l.type],attributes:{},language:h},x=l.alias;x&&(Array.isArray(x)?Array.prototype.push.apply(f.classes,x):f.classes.push(x)),a.hooks.run("wrap",f);var _="";for(var E in f.attributes)_+=" "+E+'="'+(f.attributes[E]||"").replace(/"/g,"&quot;")+'"';return"<"+f.tag+' class="'+f.classes.join(" ")+'"'+_+">"+f.content+"</"+f.tag+">"};function i(p,l,h,g){p.lastIndex=l;var f=p.exec(h);if(f&&g&&f[1]){var x=f[1].length;f.index+=x,f[0]=f[0].slice(x)}return f}function o(p,l,h,g,f,x){for(var _ in h)if(!(!h.hasOwnProperty(_)||!h[_])){var E=h[_];E=Array.isArray(E)?E:[E];for(var L=0;L<E.length;++L){if(x&&x.cause==_+","+L)return;var b=E[L],u=b.inside,S=!!b.lookbehind,A=!!b.greedy,R=b.alias;if(A&&!b.pattern.global){var I=b.pattern.toString().match(/[imsuy]*$/)[0];b.pattern=RegExp(b.pattern.source,I+"g")}for(var O=b.pattern||b,F=g.next,P=f;F!==l.tail&&!(x&&P>=x.reach);P+=F.value.length,F=F.next){var N=F.value;if(l.length>p.length)return;if(!(N instanceof s)){var B=1,D;if(A){if(D=i(O,P,p,S),!D||D.index>=p.length)break;var V=D.index,nt=D.index+D[0].length,j=P;for(j+=F.value.length;V>=j;)F=F.next,j+=F.value.length;if(j-=F.value.length,P=j,F.value instanceof s)continue;for(var Z=F;Z!==l.tail&&(j<nt||typeof Z.value=="string");Z=Z.next)B++,j+=Z.value.length;B--,N=p.slice(P,j),D.index-=P}else if(D=i(O,0,N,S),!D)continue;var V=D.index,Q=D[0],le=N.slice(0,V),Te=N.slice(V+Q.length),ce=P+N.length;x&&ce>x.reach&&(x.reach=ce);var J=F.prev;le&&(J=d(l,J,le),P+=le.length),m(l,J,B);var at=new s(_,u?a.tokenize(Q,u):Q,R,Q);if(F=d(l,J,at),Te&&d(l,F,Te),B>1){var ue={cause:_+","+L,reach:ce};o(p,l,h,F.prev,P,ue),x&&ue.reach>x.reach&&(x.reach=ue.reach)}}}}}}function c(){var p={value:null,prev:null,next:null},l={value:null,prev:p,next:null};p.next=l,this.head=p,this.tail=l,this.length=0}function d(p,l,h){var g=l.next,f={value:h,prev:l,next:g};return l.next=f,g.prev=f,p.length++,f}function m(p,l,h){for(var g=l.next,f=0;f<h&&g!==p.tail;f++)g=g.next;l.next=g,g.prev=l,p.length-=f}function w(p){for(var l=[],h=p.head.next;h!==p.tail;)l.push(h.value),h=h.next;return l}if(!t.document)return t.addEventListener&&(a.disableWorkerMessageHandler||t.addEventListener("message",function(p){var l=JSON.parse(p.data),h=l.language,g=l.code,f=l.immediateClose;t.postMessage(a.highlight(g,a.languages[h],h)),f&&t.close()},!1)),a;var k=a.util.currentScript();k&&(a.filename=k.src,k.hasAttribute("data-manual")&&(a.manual=!0));function y(){a.manual||a.highlightAll()}if(!a.manual){var v=document.readyState;v==="loading"||v==="interactive"&&k&&k.defer?document.addEventListener("DOMContentLoaded",y):window.requestAnimationFrame?window.requestAnimationFrame(y):window.setTimeout(y,16)}return a})(Xt);typeof oe<"u"&&oe.exports&&(oe.exports=T);typeof global<"u"&&(global.Prism=T);T.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]};T.languages.markup.tag.inside["attr-value"].inside.entity=T.languages.markup.entity;T.languages.markup.doctype.inside["internal-subset"].inside=T.languages.markup;T.hooks.add("wrap",function(t){t.type==="entity"&&(t.attributes.title=t.content.replace(/&amp;/,"&"))});Object.defineProperty(T.languages.markup.tag,"addInlined",{value:function(e,n){var r={};r["language-"+n]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:T.languages[n]},r.cdata=/^<!\[CDATA\[|\]\]>$/i;var a={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:r}};a["language-"+n]={pattern:/[\s\S]+/,inside:T.languages[n]};var s={};s[e]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return e}),"i"),lookbehind:!0,greedy:!0,inside:a},T.languages.insertBefore("markup","cdata",s)}});Object.defineProperty(T.languages.markup.tag,"addAttribute",{value:function(t,e){T.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+t+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[e,"language-"+e],inside:T.languages[e]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}});T.languages.html=T.languages.markup;T.languages.mathml=T.languages.markup;T.languages.svg=T.languages.markup;T.languages.xml=T.languages.extend("markup",{});T.languages.ssml=T.languages.xml;T.languages.atom=T.languages.xml;T.languages.rss=T.languages.xml;(function(t){var e=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;t.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+e.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+e.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+e.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+e.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:e,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},t.languages.css.atrule.inside.rest=t.languages.css;var n=t.languages.markup;n&&(n.tag.addInlined("style","css"),n.tag.addAttribute("style","css"))})(T);T.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/};T.languages.javascript=T.languages.extend("clike",{"class-name":[T.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/});T.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;T.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:T.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:T.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:T.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:T.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:T.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/});T.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:T.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}});T.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}});T.languages.markup&&(T.languages.markup.tag.addInlined("script","javascript"),T.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript"));T.languages.js=T.languages.javascript;(function(){if(typeof T>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var t="Loading\u2026",e=function(k,y){return"\u2716 Error "+k+" while fetching file: "+y},n="\u2716 Error: File does not exist or is empty",r={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},a="data-src-status",s="loading",i="loaded",o="failed",c="pre[data-src]:not(["+a+'="'+i+'"]):not(['+a+'="'+s+'"])';function d(k,y,v){var p=new XMLHttpRequest;p.open("GET",k,!0),p.onreadystatechange=function(){p.readyState==4&&(p.status<400&&p.responseText?y(p.responseText):p.status>=400?v(e(p.status,p.statusText)):v(n))},p.send(null)}function m(k){var y=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(k||"");if(y){var v=Number(y[1]),p=y[2],l=y[3];return p?l?[v,Number(l)]:[v,void 0]:[v,v]}}T.hooks.add("before-highlightall",function(k){k.selector+=", "+c}),T.hooks.add("before-sanity-check",function(k){var y=k.element;if(y.matches(c)){k.code="",y.setAttribute(a,s);var v=y.appendChild(document.createElement("CODE"));v.textContent=t;var p=y.getAttribute("data-src"),l=k.language;if(l==="none"){var h=(/\.(\w+)$/.exec(p)||[,"none"])[1];l=r[h]||h}T.util.setLanguage(v,l),T.util.setLanguage(y,l);var g=T.plugins.autoloader;g&&g.loadLanguages(l),d(p,function(f){y.setAttribute(a,i);var x=m(y.getAttribute("data-range"));if(x){var _=f.split(/\r\n?|\n/g),E=x[0],L=x[1]==null?_.length:x[1];E<0&&(E+=_.length),E=Math.max(0,Math.min(E-1,_.length)),L<0&&(L+=_.length),L=Math.max(0,Math.min(L,_.length)),f=_.slice(E,L).join(`
`),y.hasAttribute("data-start")||y.setAttribute("data-start",String(E+1))}v.textContent=f,T.highlightElement(v)},function(f){y.setAttribute(a,o),v.textContent=f})}}),T.plugins.fileHighlight={highlight:function(y){for(var v=(y||document).querySelectorAll(c),p=0,l;l=v[p++];)T.highlightElement(l)}};var w=!1;T.fileHighlight=function(){w||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),w=!0),T.plugins.fileHighlight.highlight.apply(this,arguments)}})()});function _e(t={}){let e=Object.create(null),{path:n,headers:r}=t;return e.request=(a,s)=>{let i=`${n}${s?"?"+encodeURIComponent(s):""}`;return fetch(i,{method:a,headers:r})},e.create=()=>e.request("POST"),e.destroy=()=>e.request("DELETE"),e.describe=()=>e.request("GET"),e}function ge(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var G=ge();function Ne(t){G=t}var Y={exec:()=>null};function C(t,e=""){let n=typeof t=="string"?t:t.source,r={replace:(a,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(z.caret,"$1"),n=n.replace(a,i),r},getRegex:()=>new RegExp(n,e)};return r}var z={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},dt=/^(?:[ \t]*(?:\n|$))+/,ht=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,gt=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,K=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ft=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,fe=/(?:[*+-]|\d{1,9}[.)])/,Oe=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Pe=C(Oe).replace(/bull/g,fe).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),mt=C(Oe).replace(/bull/g,fe).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),me=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,bt=/^[^\n]+/,be=/(?!\s*\])(?:\\.|[^\[\]\\])+/,wt=C(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",be).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),kt=C(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,fe).getRegex(),se="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",we=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,yt=C("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",we).replace("tag",se).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ze=C(me).replace("hr",K).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",se).getRegex(),vt=C(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ze).getRegex(),ke={blockquote:vt,code:ht,def:wt,fences:gt,heading:ft,hr:K,html:yt,lheading:Pe,list:kt,newline:dt,paragraph:ze,table:Y,text:bt},Ie=C("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",K).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",se).getRegex(),xt={...ke,lheading:mt,table:Ie,paragraph:C(me).replace("hr",K).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ie).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",se).getRegex()},Et={...ke,html:C(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",we).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Y,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:C(me).replace("hr",K).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Pe).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},St=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,At=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,De=/^( {2,}|\\)\n(?!\s*$)/,Tt=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ie=/[\p{P}\p{S}]/u,ye=/[\s\p{P}\p{S}]/u,Me=/[^\s\p{P}\p{S}]/u,Rt=C(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ye).getRegex(),Be=/(?!~)[\p{P}\p{S}]/u,_t=/(?!~)[\s\p{P}\p{S}]/u,It=/(?:[^\s\p{P}\p{S}]|~)/u,Lt=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,He=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,$t=C(He,"u").replace(/punct/g,ie).getRegex(),Ct=C(He,"u").replace(/punct/g,Be).getRegex(),Ue="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ft=C(Ue,"gu").replace(/notPunctSpace/g,Me).replace(/punctSpace/g,ye).replace(/punct/g,ie).getRegex(),Nt=C(Ue,"gu").replace(/notPunctSpace/g,It).replace(/punctSpace/g,_t).replace(/punct/g,Be).getRegex(),Ot=C("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Me).replace(/punctSpace/g,ye).replace(/punct/g,ie).getRegex(),Pt=C(/\\(punct)/,"gu").replace(/punct/g,ie).getRegex(),zt=C(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Dt=C(we).replace("(?:-->|$)","-->").getRegex(),Mt=C("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Dt).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ne=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Bt=C(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ne).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),je=C(/^!?\[(label)\]\[(ref)\]/).replace("label",ne).replace("ref",be).getRegex(),qe=C(/^!?\[(ref)\](?:\[\])?/).replace("ref",be).getRegex(),Ht=C("reflink|nolink(?!\\()","g").replace("reflink",je).replace("nolink",qe).getRegex(),ve={_backpedal:Y,anyPunctuation:Pt,autolink:zt,blockSkip:Lt,br:De,code:At,del:Y,emStrongLDelim:$t,emStrongRDelimAst:Ft,emStrongRDelimUnd:Ot,escape:St,link:Bt,nolink:qe,punctuation:Rt,reflink:je,reflinkSearch:Ht,tag:Mt,text:Tt,url:Y},Ut={...ve,link:C(/^!?\[(label)\]\((.*?)\)/).replace("label",ne).getRegex(),reflink:C(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ne).getRegex()},pe={...ve,emStrongRDelimAst:Nt,emStrongLDelim:Ct,url:C(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},jt={...pe,br:C(De).replace("{2,}","*").getRegex(),text:C(pe.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ee={normal:ke,gfm:xt,pedantic:Et},W={normal:ve,gfm:pe,breaks:jt,pedantic:Ut},qt={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Le=t=>qt[t];function M(t,e){if(e){if(z.escapeTest.test(t))return t.replace(z.escapeReplace,Le)}else if(z.escapeTestNoEncode.test(t))return t.replace(z.escapeReplaceNoEncode,Le);return t}function $e(t){try{t=encodeURI(t).replace(z.percentDecode,"%")}catch{return null}return t}function Ce(t,e){let n=t.replace(z.findPipe,(s,i,o)=>{let c=!1,d=i;for(;--d>=0&&o[d]==="\\";)c=!c;return c?"|":" |"}),r=n.split(z.splitPipe),a=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),e)if(r.length>e)r.splice(e);else for(;r.length<e;)r.push("");for(;a<r.length;a++)r[a]=r[a].trim().replace(z.slashPipe,"|");return r}function X(t,e,n){let r=t.length;if(r===0)return"";let a=0;for(;a<r;){let s=t.charAt(r-a-1);if(s===e&&!n)a++;else if(s!==e&&n)a++;else break}return t.slice(0,r-a)}function Gt(t,e){if(t.indexOf(e[1])===-1)return-1;let n=0;for(let r=0;r<t.length;r++)if(t[r]==="\\")r++;else if(t[r]===e[0])n++;else if(t[r]===e[1]&&(n--,n<0))return r;return n>0?-2:-1}function Fe(t,e,n,r,a){let s=e.href,i=e.title||null,o=t[1].replace(a.other.outputLinkReplace,"$1");r.state.inLink=!0;let c={type:t[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:i,text:o,tokens:r.inlineTokens(o)};return r.state.inLink=!1,c}function Zt(t,e,n){let r=t.match(n.other.indentCodeCompensation);if(r===null)return e;let a=r[1];return e.split(`
`).map(s=>{let i=s.match(n.other.beginningSpace);if(i===null)return s;let[o]=i;return o.length>=a.length?s.slice(a.length):s}).join(`
`)}var ae=class{options;rules;lexer;constructor(t){this.options=t||G}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let n=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?n:X(n,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let n=e[0],r=Zt(n,e[3]||"",this.rules);return{type:"code",raw:n,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:r}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let n=e[2].trim();if(this.rules.other.endingHash.test(n)){let r=X(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:X(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let n=X(e[0],`
`).split(`
`),r="",a="",s=[];for(;n.length>0;){let i=!1,o=[],c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))o.push(n[c]),i=!0;else if(!i)o.push(n[c]);else break;n=n.slice(c);let d=o.join(`
`),m=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${d}`:d,a=a?`${a}
${m}`:m;let w=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(m,s,!0),this.lexer.state.top=w,n.length===0)break;let k=s.at(-1);if(k?.type==="code")break;if(k?.type==="blockquote"){let y=k,v=y.raw+`
`+n.join(`
`),p=this.blockquote(v);s[s.length-1]=p,r=r.substring(0,r.length-y.raw.length)+p.raw,a=a.substring(0,a.length-y.text.length)+p.text;break}else if(k?.type==="list"){let y=k,v=y.raw+`
`+n.join(`
`),p=this.list(v);s[s.length-1]=p,r=r.substring(0,r.length-k.raw.length)+p.raw,a=a.substring(0,a.length-y.raw.length)+p.raw,n=v.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:a}}}list(t){let e=this.rules.block.list.exec(t);if(e){let n=e[1].trim(),r=n.length>1,a={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),i=!1;for(;t;){let c=!1,d="",m="";if(!(e=s.exec(t))||this.rules.block.hr.test(t))break;d=e[0],t=t.substring(d.length);let w=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,h=>" ".repeat(3*h.length)),k=t.split(`
`,1)[0],y=!w.trim(),v=0;if(this.options.pedantic?(v=2,m=w.trimStart()):y?v=e[1].length+1:(v=e[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,m=w.slice(v),v+=e[1].length),y&&this.rules.other.blankLine.test(k)&&(d+=k+`
`,t=t.substring(k.length+1),c=!0),!c){let h=this.rules.other.nextBulletRegex(v),g=this.rules.other.hrRegex(v),f=this.rules.other.fencesBeginRegex(v),x=this.rules.other.headingBeginRegex(v),_=this.rules.other.htmlBeginRegex(v);for(;t;){let E=t.split(`
`,1)[0],L;if(k=E,this.options.pedantic?(k=k.replace(this.rules.other.listReplaceNesting,"  "),L=k):L=k.replace(this.rules.other.tabCharGlobal,"    "),f.test(k)||x.test(k)||_.test(k)||h.test(k)||g.test(k))break;if(L.search(this.rules.other.nonSpaceChar)>=v||!k.trim())m+=`
`+L.slice(v);else{if(y||w.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||f.test(w)||x.test(w)||g.test(w))break;m+=`
`+k}!y&&!k.trim()&&(y=!0),d+=E+`
`,t=t.substring(E.length+1),w=L.slice(v)}}a.loose||(i?a.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(i=!0));let p=null,l;this.options.gfm&&(p=this.rules.other.listIsTask.exec(m),p&&(l=p[0]!=="[ ] ",m=m.replace(this.rules.other.listReplaceTask,""))),a.items.push({type:"list_item",raw:d,task:!!p,checked:l,loose:!1,text:m,tokens:[]}),a.raw+=d}let o=a.items.at(-1);if(o)o.raw=o.raw.trimEnd(),o.text=o.text.trimEnd();else return;a.raw=a.raw.trimEnd();for(let c=0;c<a.items.length;c++)if(this.lexer.state.top=!1,a.items[c].tokens=this.lexer.blockTokens(a.items[c].text,[]),!a.loose){let d=a.items[c].tokens.filter(w=>w.type==="space"),m=d.length>0&&d.some(w=>this.rules.other.anyLine.test(w.raw));a.loose=m}if(a.loose)for(let c=0;c<a.items.length;c++)a.items[c].loose=!0;return a}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let n=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",a=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:n,raw:e[0],href:r,title:a}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let n=Ce(e[1]),r=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),a=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:e[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?s.align.push("right"):this.rules.other.tableAlignCenter.test(i)?s.align.push("center"):this.rules.other.tableAlignLeft.test(i)?s.align.push("left"):s.align.push(null);for(let i=0;i<n.length;i++)s.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:s.align[i]});for(let i of a)s.rows.push(Ce(i,s.header.length).map((o,c)=>({text:o,tokens:this.lexer.inline(o),header:!1,align:s.align[c]})));return s}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let n=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:n,tokens:this.lexer.inline(n)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let n=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=X(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=Gt(e[2],"()");if(s===-2)return;if(s>-1){let o=(e[0].indexOf("!")===0?5:4)+e[1].length+s;e[2]=e[2].substring(0,s),e[0]=e[0].substring(0,o).trim(),e[3]=""}}let r=e[2],a="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],a=s[3])}else a=e[3]?e[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Fe(e,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:a&&a.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let n;if((n=this.rules.inline.reflink.exec(t))||(n=this.rules.inline.nolink.exec(t))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),a=e[r.toLowerCase()];if(!a){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return Fe(n,a,n[0],this.lexer,this.rules)}}emStrong(t,e,n=""){let r=this.rules.inline.emStrongLDelim.exec(t);if(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(r[1]||r[2]||"")||!n||this.rules.inline.punctuation.exec(n)){let s=[...r[0]].length-1,i,o,c=s,d=0,m=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(m.lastIndex=0,e=e.slice(-1*t.length+s);(r=m.exec(e))!=null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(o=[...i].length,r[3]||r[4]){c+=o;continue}else if((r[5]||r[6])&&s%3&&!((s+o)%3)){d+=o;continue}if(c-=o,c>0)continue;o=Math.min(o,o+c+d);let w=[...r[0]][0].length,k=t.slice(0,s+r.index+w+o);if(Math.min(s,o)%2){let v=k.slice(1,-1);return{type:"em",raw:k,text:v,tokens:this.lexer.inlineTokens(v)}}let y=k.slice(2,-2);return{type:"strong",raw:k,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let n=e[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),a=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&a&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:e[0],text:n}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let n,r;return e[2]==="@"?(n=e[1],r="mailto:"+n):(n=e[1],r=n),{type:"link",raw:e[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let n,r;if(e[2]==="@")n=e[0],r="mailto:"+n;else{let a;do a=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(a!==e[0]);n=e[0],e[1]==="www."?r="http://"+e[0]:r=e[0]}return{type:"link",raw:e[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let n=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:n}}}},H=class de{tokens;options;state;tokenizer;inlineQueue;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||G,this.options.tokenizer=this.options.tokenizer||new ae,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:z,block:ee.normal,inline:W.normal};this.options.pedantic?(n.block=ee.pedantic,n.inline=W.pedantic):this.options.gfm&&(n.block=ee.gfm,this.options.breaks?n.inline=W.breaks:n.inline=W.gfm),this.tokenizer.rules=n}static get rules(){return{block:ee,inline:W}}static lex(e,n){return new de(n).lex(e)}static lexInline(e,n){return new de(n).inlineTokens(e)}lex(e){e=e.replace(z.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,n=[],r=!1){for(this.options.pedantic&&(e=e.replace(z.tabCharGlobal,"    ").replace(z.spaceLine,""));e;){let a;if(this.options.extensions?.block?.some(i=>(a=i.call({lexer:this},e,n))?(e=e.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.space(e)){e=e.substring(a.raw.length);let i=n.at(-1);a.raw.length===1&&i!==void 0?i.raw+=`
`:n.push(a);continue}if(a=this.tokenizer.code(e)){e=e.substring(a.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=`
`+a.raw,i.text+=`
`+a.text,this.inlineQueue.at(-1).src=i.text):n.push(a);continue}if(a=this.tokenizer.fences(e)){e=e.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.heading(e)){e=e.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.hr(e)){e=e.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.blockquote(e)){e=e.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.list(e)){e=e.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.html(e)){e=e.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.def(e)){e=e.substring(a.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=`
`+a.raw,i.text+=`
`+a.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[a.tag]||(this.tokens.links[a.tag]={href:a.href,title:a.title});continue}if(a=this.tokenizer.table(e)){e=e.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.lheading(e)){e=e.substring(a.raw.length),n.push(a);continue}let s=e;if(this.options.extensions?.startBlock){let i=1/0,o=e.slice(1),c;this.options.extensions.startBlock.forEach(d=>{c=d.call({lexer:this},o),typeof c=="number"&&c>=0&&(i=Math.min(i,c))}),i<1/0&&i>=0&&(s=e.substring(0,i+1))}if(this.state.top&&(a=this.tokenizer.paragraph(s))){let i=n.at(-1);r&&i?.type==="paragraph"?(i.raw+=`
`+a.raw,i.text+=`
`+a.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(a),r=s.length!==e.length,e=e.substring(a.raw.length);continue}if(a=this.tokenizer.text(e)){e=e.substring(a.raw.length);let i=n.at(-1);i?.type==="text"?(i.raw+=`
`+a.raw,i.text+=`
`+a.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(a);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(e,n=[]){return this.inlineQueue.push({src:e,tokens:n}),n}inlineTokens(e,n=[]){let r=e,a=null;if(this.tokens.links){let o=Object.keys(this.tokens.links);if(o.length>0)for(;(a=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)o.includes(a[0].slice(a[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,a.index)+"["+"a".repeat(a[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(a=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,a.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(a=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)r=r.slice(0,a.index)+"["+"a".repeat(a[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let s=!1,i="";for(;e;){s||(i=""),s=!1;let o;if(this.options.extensions?.inline?.some(d=>(o=d.call({lexer:this},e,n))?(e=e.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.escape(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.tag(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.link(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(o.raw.length);let d=n.at(-1);o.type==="text"&&d?.type==="text"?(d.raw+=o.raw,d.text+=o.text):n.push(o);continue}if(o=this.tokenizer.emStrong(e,r,i)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.codespan(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.br(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.del(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.autolink(e)){e=e.substring(o.raw.length),n.push(o);continue}if(!this.state.inLink&&(o=this.tokenizer.url(e))){e=e.substring(o.raw.length),n.push(o);continue}let c=e;if(this.options.extensions?.startInline){let d=1/0,m=e.slice(1),w;this.options.extensions.startInline.forEach(k=>{w=k.call({lexer:this},m),typeof w=="number"&&w>=0&&(d=Math.min(d,w))}),d<1/0&&d>=0&&(c=e.substring(0,d+1))}if(o=this.tokenizer.inlineText(c)){e=e.substring(o.raw.length),o.raw.slice(-1)!=="_"&&(i=o.raw.slice(-1)),s=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=o.raw,d.text+=o.text):n.push(o);continue}if(e){let d="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},re=class{options;parser;constructor(t){this.options=t||G}space(t){return""}code({text:t,lang:e,escaped:n}){let r=(e||"").match(z.notSpaceStart)?.[0],a=t.replace(z.endingNewline,"")+`
`;return r?'<pre><code class="language-'+M(r)+'">'+(n?a:M(a,!0))+`</code></pre>
`:"<pre><code>"+(n?a:M(a,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>
`}hr(t){return`<hr>
`}list(t){let e=t.ordered,n=t.start,r="";for(let i=0;i<t.items.length;i++){let o=t.items[i];r+=this.listitem(o)}let a=e?"ol":"ul",s=e&&n!==1?' start="'+n+'"':"";return"<"+a+s+`>
`+r+"</"+a+`>
`}listitem(t){let e="";if(t.task){let n=this.checkbox({checked:!!t.checked});t.loose?t.tokens[0]?.type==="paragraph"?(t.tokens[0].text=n+" "+t.tokens[0].text,t.tokens[0].tokens&&t.tokens[0].tokens.length>0&&t.tokens[0].tokens[0].type==="text"&&(t.tokens[0].tokens[0].text=n+" "+M(t.tokens[0].tokens[0].text),t.tokens[0].tokens[0].escaped=!0)):t.tokens.unshift({type:"text",raw:n+" ",text:n+" ",escaped:!0}):e+=n+" "}return e+=this.parser.parse(t.tokens,!!t.loose),`<li>${e}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let e="",n="";for(let a=0;a<t.header.length;a++)n+=this.tablecell(t.header[a]);e+=this.tablerow({text:n});let r="";for(let a=0;a<t.rows.length;a++){let s=t.rows[a];n="";for(let i=0;i<s.length;i++)n+=this.tablecell(s[i]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+r+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){let e=this.parser.parseInline(t.tokens),n=t.header?"th":"td";return(t.align?`<${n} align="${t.align}">`:`<${n}>`)+e+`</${n}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${M(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:n}){let r=this.parser.parseInline(n),a=$e(t);if(a===null)return r;t=a;let s='<a href="'+t+'"';return e&&(s+=' title="'+M(e)+'"'),s+=">"+r+"</a>",s}image({href:t,title:e,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let a=$e(t);if(a===null)return M(n);t=a;let s=`<img src="${t}" alt="${n}"`;return e&&(s+=` title="${M(e)}"`),s+=">",s}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:M(t.text)}},xe=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}},U=class he{options;renderer;textRenderer;constructor(e){this.options=e||G,this.options.renderer=this.options.renderer||new re,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new xe}static parse(e,n){return new he(n).parse(e)}static parseInline(e,n){return new he(n).parseInline(e)}parse(e,n=!0){let r="";for(let a=0;a<e.length;a++){let s=e[a];if(this.options.extensions?.renderers?.[s.type]){let o=s,c=this.options.extensions.renderers[o.type].call({parser:this},o);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(o.type)){r+=c||"";continue}}let i=s;switch(i.type){case"space":{r+=this.renderer.space(i);continue}case"hr":{r+=this.renderer.hr(i);continue}case"heading":{r+=this.renderer.heading(i);continue}case"code":{r+=this.renderer.code(i);continue}case"table":{r+=this.renderer.table(i);continue}case"blockquote":{r+=this.renderer.blockquote(i);continue}case"list":{r+=this.renderer.list(i);continue}case"html":{r+=this.renderer.html(i);continue}case"paragraph":{r+=this.renderer.paragraph(i);continue}case"text":{let o=i,c=this.renderer.text(o);for(;a+1<e.length&&e[a+1].type==="text";)o=e[++a],c+=`
`+this.renderer.text(o);n?r+=this.renderer.paragraph({type:"paragraph",raw:c,text:c,tokens:[{type:"text",raw:c,text:c,escaped:!0}]}):r+=c;continue}default:{let o='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return r}parseInline(e,n=this.renderer){let r="";for(let a=0;a<e.length;a++){let s=e[a];if(this.options.extensions?.renderers?.[s.type]){let o=this.options.extensions.renderers[s.type].call({parser:this},s);if(o!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=o||"";continue}}let i=s;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let o='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return r}},te=class{options;block;constructor(t){this.options=t||G}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}provideLexer(){return this.block?H.lex:H.lexInline}provideParser(){return this.block?U.parse:U.parseInline}},Wt=class{defaults=ge();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=U;Renderer=re;TextRenderer=xe;Lexer=H;Tokenizer=ae;Hooks=te;constructor(...t){this.use(...t)}walkTokens(t,e){let n=[];for(let r of t)switch(n=n.concat(e.call(this,r)),r.type){case"table":{let a=r;for(let s of a.header)n=n.concat(this.walkTokens(s.tokens,e));for(let s of a.rows)for(let i of s)n=n.concat(this.walkTokens(i.tokens,e));break}case"list":{let a=r;n=n.concat(this.walkTokens(a.items,e));break}default:{let a=r;this.defaults.extensions?.childTokens?.[a.type]?this.defaults.extensions.childTokens[a.type].forEach(s=>{let i=a[s].flat(1/0);n=n.concat(this.walkTokens(i,e))}):a.tokens&&(n=n.concat(this.walkTokens(a.tokens,e)))}}return n}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(a=>{if(!a.name)throw new Error("extension name required");if("renderer"in a){let s=e.renderers[a.name];s?e.renderers[a.name]=function(...i){let o=a.renderer.apply(this,i);return o===!1&&(o=s.apply(this,i)),o}:e.renderers[a.name]=a.renderer}if("tokenizer"in a){if(!a.level||a.level!=="block"&&a.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=e[a.level];s?s.unshift(a.tokenizer):e[a.level]=[a.tokenizer],a.start&&(a.level==="block"?e.startBlock?e.startBlock.push(a.start):e.startBlock=[a.start]:a.level==="inline"&&(e.startInline?e.startInline.push(a.start):e.startInline=[a.start]))}"childTokens"in a&&a.childTokens&&(e.childTokens[a.name]=a.childTokens)}),r.extensions=e),n.renderer){let a=this.defaults.renderer||new re(this.defaults);for(let s in n.renderer){if(!(s in a))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let i=s,o=n.renderer[i],c=a[i];a[i]=(...d)=>{let m=o.apply(a,d);return m===!1&&(m=c.apply(a,d)),m||""}}r.renderer=a}if(n.tokenizer){let a=this.defaults.tokenizer||new ae(this.defaults);for(let s in n.tokenizer){if(!(s in a))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let i=s,o=n.tokenizer[i],c=a[i];a[i]=(...d)=>{let m=o.apply(a,d);return m===!1&&(m=c.apply(a,d)),m}}r.tokenizer=a}if(n.hooks){let a=this.defaults.hooks||new te;for(let s in n.hooks){if(!(s in a))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let i=s,o=n.hooks[i],c=a[i];te.passThroughHooks.has(s)?a[i]=d=>{if(this.defaults.async)return Promise.resolve(o.call(a,d)).then(w=>c.call(a,w));let m=o.call(a,d);return c.call(a,m)}:a[i]=(...d)=>{let m=o.apply(a,d);return m===!1&&(m=c.apply(a,d)),m}}r.hooks=a}if(n.walkTokens){let a=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(i){let o=[];return o.push(s.call(this,i)),a&&(o=o.concat(a.call(this,i))),o}}this.defaults={...this.defaults,...r}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return H.lex(t,e??this.defaults)}parser(t,e){return U.parse(t,e??this.defaults)}parseMarkdown(t){return(n,r)=>{let a={...r},s={...this.defaults,...a},i=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&a.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));s.hooks&&(s.hooks.options=s,s.hooks.block=t);let o=s.hooks?s.hooks.provideLexer():t?H.lex:H.lexInline,c=s.hooks?s.hooks.provideParser():t?U.parse:U.parseInline;if(s.async)return Promise.resolve(s.hooks?s.hooks.preprocess(n):n).then(d=>o(d,s)).then(d=>s.hooks?s.hooks.processAllTokens(d):d).then(d=>s.walkTokens?Promise.all(this.walkTokens(d,s.walkTokens)).then(()=>d):d).then(d=>c(d,s)).then(d=>s.hooks?s.hooks.postprocess(d):d).catch(i);try{s.hooks&&(n=s.hooks.preprocess(n));let d=o(n,s);s.hooks&&(d=s.hooks.processAllTokens(d)),s.walkTokens&&this.walkTokens(d,s.walkTokens);let m=c(d,s);return s.hooks&&(m=s.hooks.postprocess(m)),m}catch(d){return i(d)}}}onError(t,e){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let r="<p>An error occurred:</p><pre>"+M(n.message+"",!0)+"</pre>";return e?Promise.resolve(r):r}if(e)return Promise.reject(n);throw n}}},q=new Wt;function $(t,e){return q.parse(t,e)}$.options=$.setOptions=function(t){return q.setOptions(t),$.defaults=q.defaults,Ne($.defaults),$};$.getDefaults=ge;$.defaults=G;$.use=function(...t){return q.use(...t),$.defaults=q.defaults,Ne($.defaults),$};$.walkTokens=function(t,e){return q.walkTokens(t,e)};$.parseInline=q.parseInline;$.Parser=U;$.parser=U.parse;$.Renderer=re;$.TextRenderer=xe;$.Lexer=H;$.lexer=H.lex;$.Tokenizer=ae;$.Hooks=te;$.parse=$;var tn=$.options,nn=$.setOptions,an=$.use,rn=$.walkTokens,sn=$.parseInline;var on=U.parse,ln=H.lex;var Ee=pt(Ge());Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/};Prism.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]};Prism.languages.markup.tag.inside["attr-value"].inside.entity=Prism.languages.markup.entity;Prism.languages.markup.doctype.inside["internal-subset"].inside=Prism.languages.markup;Prism.hooks.add("wrap",function(t){t.type==="entity"&&(t.attributes.title=t.content.replace(/&amp;/,"&"))});Object.defineProperty(Prism.languages.markup.tag,"addInlined",{value:function(e,n){var r={};r["language-"+n]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:Prism.languages[n]},r.cdata=/^<!\[CDATA\[|\]\]>$/i;var a={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:r}};a["language-"+n]={pattern:/[\s\S]+/,inside:Prism.languages[n]};var s={};s[e]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return e}),"i"),lookbehind:!0,greedy:!0,inside:a},Prism.languages.insertBefore("markup","cdata",s)}});Object.defineProperty(Prism.languages.markup.tag,"addAttribute",{value:function(t,e){Prism.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+t+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[e,"language-"+e],inside:Prism.languages[e]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}});Prism.languages.html=Prism.languages.markup;Prism.languages.mathml=Prism.languages.markup;Prism.languages.svg=Prism.languages.markup;Prism.languages.xml=Prism.languages.extend("markup",{});Prism.languages.ssml=Prism.languages.xml;Prism.languages.atom=Prism.languages.xml;Prism.languages.rss=Prism.languages.xml;(function(t){function e(n,r){return"___"+n.toUpperCase()+r+"___"}Object.defineProperties(t.languages["markup-templating"]={},{buildPlaceholders:{value:function(n,r,a,s){if(n.language===r){var i=n.tokenStack=[];n.code=n.code.replace(a,function(o){if(typeof s=="function"&&!s(o))return o;for(var c=i.length,d;n.code.indexOf(d=e(r,c))!==-1;)++c;return i[c]=o,d}),n.grammar=t.languages.markup}}},tokenizePlaceholders:{value:function(n,r){if(n.language!==r||!n.tokenStack)return;n.grammar=t.languages[r];var a=0,s=Object.keys(n.tokenStack);function i(o){for(var c=0;c<o.length&&!(a>=s.length);c++){var d=o[c];if(typeof d=="string"||d.content&&typeof d.content=="string"){var m=s[a],w=n.tokenStack[m],k=typeof d=="string"?d:d.content,y=e(r,m),v=k.indexOf(y);if(v>-1){++a;var p=k.substring(0,v),l=new t.Token(r,t.tokenize(w,n.grammar),"language-"+r,w),h=k.substring(v+y.length),g=[];p&&g.push.apply(g,i([p])),g.push(l),h&&g.push.apply(g,i([h])),typeof d=="string"?o.splice.apply(o,[c,1].concat(g)):d.content=g}}else d.content&&i(d.content)}return o}i(n.tokens)}}})})(Prism);(function(t){var e=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;t.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+e.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+e.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+e.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+e.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:e,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},t.languages.css.atrule.inside.rest=t.languages.css;var n=t.languages.markup;n&&(n.tag.addInlined("style","css"),n.tag.addAttribute("style","css"))})(Prism);Prism.languages.javascript=Prism.languages.extend("clike",{"class-name":[Prism.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/});Prism.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:Prism.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:Prism.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/});Prism.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}});Prism.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}});Prism.languages.markup&&(Prism.languages.markup.tag.addInlined("script","javascript"),Prism.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript"));Prism.languages.js=Prism.languages.javascript;(function(t){t.languages.typescript=t.languages.extend("javascript",{"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,lookbehind:!0,greedy:!0,inside:null},builtin:/\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/}),t.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/,/\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,/\btype\b(?=\s*(?:[\{*]|$))/),delete t.languages.typescript.parameter,delete t.languages.typescript["literal-property"];var e=t.languages.extend("typescript",{});delete e["class-name"],t.languages.typescript["class-name"].inside=e,t.languages.insertBefore("typescript","function",{decorator:{pattern:/@[$\w\xA0-\uFFFF]+/,inside:{at:{pattern:/^@/,alias:"operator"},function:/^[\s\S]+/}},"generic-function":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,greedy:!0,inside:{function:/^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,generic:{pattern:/<[\s\S]+/,alias:"class-name",inside:e}}}}),t.languages.ts=t.languages.typescript})(Prism);(function(t){var e=t.util.clone(t.languages.javascript),n=/(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source,r=/(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source,a=/(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;function s(c,d){return c=c.replace(/<S>/g,function(){return n}).replace(/<BRACES>/g,function(){return r}).replace(/<SPREAD>/g,function(){return a}),RegExp(c,d)}a=s(a).source,t.languages.jsx=t.languages.extend("markup",e),t.languages.jsx.tag.pattern=s(/<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/.source),t.languages.jsx.tag.inside.tag.pattern=/^<\/?[^\s>\/]*/,t.languages.jsx.tag.inside["attr-value"].pattern=/=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/,t.languages.jsx.tag.inside.tag.inside["class-name"]=/^[A-Z]\w*(?:\.[A-Z]\w*)*$/,t.languages.jsx.tag.inside.comment=e.comment,t.languages.insertBefore("inside","attr-name",{spread:{pattern:s(/<SPREAD>/.source),inside:t.languages.jsx}},t.languages.jsx.tag),t.languages.insertBefore("inside","special-attr",{script:{pattern:s(/=<BRACES>/.source),alias:"language-javascript",inside:{"script-punctuation":{pattern:/^=(?=\{)/,alias:"punctuation"},rest:t.languages.jsx}}},t.languages.jsx.tag);var i=function(c){return c?typeof c=="string"?c:typeof c.content=="string"?c.content:c.content.map(i).join(""):""},o=function(c){for(var d=[],m=0;m<c.length;m++){var w=c[m],k=!1;if(typeof w!="string"&&(w.type==="tag"&&w.content[0]&&w.content[0].type==="tag"?w.content[0].content[0].content==="</"?d.length>0&&d[d.length-1].tagName===i(w.content[0].content[1])&&d.pop():w.content[w.content.length-1].content==="/>"||d.push({tagName:i(w.content[0].content[1]),openedBraces:0}):d.length>0&&w.type==="punctuation"&&w.content==="{"?d[d.length-1].openedBraces++:d.length>0&&d[d.length-1].openedBraces>0&&w.type==="punctuation"&&w.content==="}"?d[d.length-1].openedBraces--:k=!0),(k||typeof w=="string")&&d.length>0&&d[d.length-1].openedBraces===0){var y=i(w);m<c.length-1&&(typeof c[m+1]=="string"||c[m+1].type==="plain-text")&&(y+=i(c[m+1]),c.splice(m+1,1)),m>0&&(typeof c[m-1]=="string"||c[m-1].type==="plain-text")&&(y=i(c[m-1])+y,c.splice(m-1,1),m--),c[m]=new t.Token("plain-text",y,null,y)}w.content&&typeof w.content!="string"&&o(w.content)}};t.hooks.add("after-tokenize",function(c){c.language!=="jsx"&&c.language!=="tsx"||o(c.tokens)})})(Prism);(function(t){var e=t.util.clone(t.languages.typescript);t.languages.tsx=t.languages.extend("jsx",e),delete t.languages.tsx.parameter,delete t.languages.tsx["literal-property"];var n=t.languages.tsx.tag;n.pattern=RegExp(/(^|[^\w$]|(?=<\/))/.source+"(?:"+n.pattern.source+")",n.pattern.flags),n.lookbehind=!0})(Prism);(function(t){var e=/(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/.source;function n(m){return m=m.replace(/<inner>/g,function(){return e}),RegExp(/((?:^|[^\\])(?:\\{2})*)/.source+"(?:"+m+")")}var r=/(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source,a=/\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(/__/g,function(){return r}),s=/\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source;t.languages.markdown=t.languages.extend("markup",{}),t.languages.insertBefore("markdown","prolog",{"front-matter-block":{pattern:/(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,lookbehind:!0,greedy:!0,inside:{punctuation:/^---|---$/,"front-matter":{pattern:/\S+(?:\s+\S+)*/,alias:["yaml","language-yaml"],inside:t.languages.yaml}}},blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:"punctuation"},table:{pattern:RegExp("^"+a+s+"(?:"+a+")*","m"),inside:{"table-data-rows":{pattern:RegExp("^("+a+s+")(?:"+a+")*$"),lookbehind:!0,inside:{"table-data":{pattern:RegExp(r),inside:t.languages.markdown},punctuation:/\|/}},"table-line":{pattern:RegExp("^("+a+")"+s+"$"),lookbehind:!0,inside:{punctuation:/\||:?-{3,}:?/}},"table-header-row":{pattern:RegExp("^"+a+"$"),inside:{"table-header":{pattern:RegExp(r),alias:"important",inside:t.languages.markdown},punctuation:/\|/}}}},code:[{pattern:/((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,lookbehind:!0,alias:"keyword"},{pattern:/^```[\s\S]*?^```$/m,greedy:!0,inside:{"code-block":{pattern:/^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,lookbehind:!0},"code-language":{pattern:/^(```).+/,lookbehind:!0},punctuation:/```/}}],title:[{pattern:/\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,alias:"important",inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#.+/m,lookbehind:!0,alias:"important",inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:"punctuation"},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:"punctuation"},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:"url"},bold:{pattern:n(/\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/.source),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^..)[\s\S]+(?=..$)/,lookbehind:!0,inside:{}},punctuation:/\*\*|__/}},italic:{pattern:n(/\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/.source),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^.)[\s\S]+(?=.$)/,lookbehind:!0,inside:{}},punctuation:/[*_]/}},strike:{pattern:n(/(~~?)(?:(?!~)<inner>)+\2/.source),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^~~?)[\s\S]+(?=\1$)/,lookbehind:!0,inside:{}},punctuation:/~~?/}},"code-snippet":{pattern:/(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,lookbehind:!0,greedy:!0,alias:["code","keyword"]},url:{pattern:n(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/.source),lookbehind:!0,greedy:!0,inside:{operator:/^!/,content:{pattern:/(^\[)[^\]]+(?=\])/,lookbehind:!0,inside:{}},variable:{pattern:/(^\][ \t]?\[)[^\]]+(?=\]$)/,lookbehind:!0},url:{pattern:/(^\]\()[^\s)]+/,lookbehind:!0},string:{pattern:/(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,lookbehind:!0}}}}),["url","bold","italic","strike"].forEach(function(m){["url","bold","italic","strike","code-snippet"].forEach(function(w){m!==w&&(t.languages.markdown[m].inside.content.inside[w]=t.languages.markdown[w])})}),t.hooks.add("after-tokenize",function(m){if(m.language!=="markdown"&&m.language!=="md")return;function w(k){if(!(!k||typeof k=="string"))for(var y=0,v=k.length;y<v;y++){var p=k[y];if(p.type!=="code"){w(p.content);continue}var l=p.content[1],h=p.content[3];if(l&&h&&l.type==="code-language"&&h.type==="code-block"&&typeof l.content=="string"){var g=l.content.replace(/\b#/g,"sharp").replace(/\b\+\+/g,"pp");g=(/[a-z][\w-]*/i.exec(g)||[""])[0].toLowerCase();var f="language-"+g;h.alias?typeof h.alias=="string"?h.alias=[h.alias,f]:h.alias.push(f):h.alias=[f]}}}w(m.tokens)}),t.hooks.add("wrap",function(m){if(m.type==="code-block"){for(var w="",k=0,y=m.classes.length;k<y;k++){var v=m.classes[k],p=/language-(.+)/.exec(v);if(p){w=p[1];break}}var l=t.languages[w];if(l)m.content=t.highlight(d(m.content),l,w);else if(w&&w!=="none"&&t.plugins.autoloader){var h="md-"+new Date().valueOf()+"-"+Math.floor(Math.random()*1e16);m.attributes.id=h,t.plugins.autoloader.loadLanguages(w,function(){var g=document.getElementById(h);g&&(g.innerHTML=t.highlight(g.textContent,t.languages[w],w))})}}});var i=RegExp(t.languages.markup.tag.pattern.source,"gi"),o={amp:"&",lt:"<",gt:">",quot:'"'},c=String.fromCodePoint||String.fromCharCode;function d(m){var w=m.replace(i,"");return w=w.replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi,function(k,y){if(y=y.toLowerCase(),y[0]==="#"){var v;return y[1]==="x"?v=parseInt(y.slice(2),16):v=Number(y.slice(1)),c(v)}else{var p=o[y];return p||k}}),w}t.languages.md=t.languages.markdown})(Prism);Prism.languages.json={property:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,lookbehind:!0,greedy:!0},string:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,lookbehind:!0,greedy:!0},comment:{pattern:/\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,greedy:!0},number:/-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,punctuation:/[{}[\],]/,operator:/:/,boolean:/\b(?:false|true)\b/,null:{pattern:/\bnull\b/,alias:"keyword"}};Prism.languages.webmanifest=Prism.languages.json;(function(t){var e=/[*&][^\s[\]{},]+/,n=/!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/,r="(?:"+n.source+"(?:[ 	]+"+e.source+")?|"+e.source+"(?:[ 	]+"+n.source+")?)",a=/(?:[^\s\x00-\x08\x0e-\x1f!"#%&'*,\-:>?@[\]`{|}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.source.replace(/<PLAIN>/g,function(){return/[^\s\x00-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/.source}),s=/"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/.source;function i(o,c){c=(c||"").replace(/m/g,"")+"m";var d=/([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\]|\}|(?:[\r\n]\s*)?#))/.source.replace(/<<prop>>/g,function(){return r}).replace(/<<value>>/g,function(){return o});return RegExp(d,c)}t.languages.yaml={scalar:{pattern:RegExp(/([\-:]\s*(?:\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/.source.replace(/<<prop>>/g,function(){return r})),lookbehind:!0,alias:"string"},comment:/#.*/,key:{pattern:RegExp(/((?:^|[:\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\s*:\s)/.source.replace(/<<prop>>/g,function(){return r}).replace(/<<key>>/g,function(){return"(?:"+a+"|"+s+")"})),lookbehind:!0,greedy:!0,alias:"atrule"},directive:{pattern:/(^[ \t]*)%.+/m,lookbehind:!0,alias:"important"},datetime:{pattern:i(/\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?))?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?/.source),lookbehind:!0,alias:"number"},boolean:{pattern:i(/false|true/.source,"i"),lookbehind:!0,alias:"important"},null:{pattern:i(/null|~/.source,"i"),lookbehind:!0,alias:"important"},string:{pattern:i(s),lookbehind:!0,greedy:!0},number:{pattern:i(/[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/.source,"i"),lookbehind:!0},tag:n,important:e,punctuation:/---|[:[\]{}\-,|>?]|\.\.\./},t.languages.yml=t.languages.yaml})(Prism);(function(t){var e="\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b",n={pattern:/(^(["']?)\w+\2)[ \t]+\S.*/,lookbehind:!0,alias:"punctuation",inside:null},r={bash:n,environment:{pattern:RegExp("\\$"+e),alias:"constant"},variable:[{pattern:/\$?\(\([\s\S]+?\)\)/,greedy:!0,inside:{variable:[{pattern:/(^\$\(\([\s\S]+)\)\)/,lookbehind:!0},/^\$\(\(/],number:/\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,operator:/--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,punctuation:/\(\(?|\)\)?|,|;/}},{pattern:/\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,greedy:!0,inside:{variable:/^\$\(|^`|\)$|`$/}},{pattern:/\$\{[^}]+\}/,greedy:!0,inside:{operator:/:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,punctuation:/[\[\]]/,environment:{pattern:RegExp("(\\{)"+e),lookbehind:!0,alias:"constant"}}},/\$(?:\w+|[#?*!@$])/],entity:/\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/};t.languages.bash={shebang:{pattern:/^#!\s*\/.*/,alias:"important"},comment:{pattern:/(^|[^"{\\$])#.*/,lookbehind:!0},"function-name":[{pattern:/(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,lookbehind:!0,alias:"function"},{pattern:/\b[\w-]+(?=\s*\(\s*\)\s*\{)/,alias:"function"}],"for-or-select":{pattern:/(\b(?:for|select)\s+)\w+(?=\s+in\s)/,alias:"variable",lookbehind:!0},"assign-left":{pattern:/(^|[\s;|&]|[<>]\()\w+(?:\.\w+)*(?=\+?=)/,inside:{environment:{pattern:RegExp("(^|[\\s;|&]|[<>]\\()"+e),lookbehind:!0,alias:"constant"}},alias:"variable",lookbehind:!0},parameter:{pattern:/(^|\s)-{1,2}(?:\w+:[+-]?)?\w+(?:\.\w+)*(?=[=\s]|$)/,alias:"variable",lookbehind:!0},string:[{pattern:/((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,lookbehind:!0,greedy:!0,inside:r},{pattern:/((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,lookbehind:!0,greedy:!0,inside:{bash:n}},{pattern:/(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,lookbehind:!0,greedy:!0,inside:r},{pattern:/(^|[^$\\])'[^']*'/,lookbehind:!0,greedy:!0},{pattern:/\$'(?:[^'\\]|\\[\s\S])*'/,greedy:!0,inside:{entity:r.entity}}],environment:{pattern:RegExp("\\$?"+e),alias:"constant"},variable:r.variable,function:{pattern:/(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cargo|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|java|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|sysctl|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,lookbehind:!0},keyword:{pattern:/(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,lookbehind:!0},builtin:{pattern:/(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,lookbehind:!0,alias:"class-name"},boolean:{pattern:/(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/,lookbehind:!0},"file-descriptor":{pattern:/\B&\d\b/,alias:"important"},operator:{pattern:/\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,inside:{"file-descriptor":{pattern:/^\d/,alias:"important"}}},punctuation:/\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,number:{pattern:/(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,lookbehind:!0}},n.inside=t.languages.bash;for(var a=["comment","function-name","for-or-select","assign-left","parameter","string","environment","function","keyword","builtin","boolean","file-descriptor","operator","punctuation","number"],s=r.variable[1].inside,i=0;i<a.length;i++)s[a[i]]=t.languages.bash[a[i]];t.languages.sh=t.languages.bash,t.languages.shell=t.languages.bash})(Prism);(function(t){var e=[/"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/.source,/'[^']*'/.source,/\$'(?:[^'\\]|\\[\s\S])*'/.source,/<<-?\s*(["']?)(\w+)\1\s[\s\S]*?[\r\n]\2/.source].join("|");t.languages["shell-session"]={command:{pattern:RegExp(/^/.source+"(?:"+(/[^\s@:$#%*!/\\]+@[^\r\n@:$#%*!/\\]+(?::[^\0-\x1F$#%*?"<>:;|]+)?/.source+"|"+/[/~.][^\0-\x1F$#%*?"<>@:;|]*/.source)+")?"+/[$#%](?=\s)/.source+/(?:[^\\\r\n \t'"<$]|[ \t](?:(?!#)|#.*$)|\\(?:[^\r]|\r\n?)|\$(?!')|<(?!<)|<<str>>)+/.source.replace(/<<str>>/g,function(){return e}),"m"),greedy:!0,inside:{info:{pattern:/^[^#$%]+/,alias:"punctuation",inside:{user:/^[^\s@:$#%*!/\\]+@[^\r\n@:$#%*!/\\]+/,punctuation:/:/,path:/[\s\S]+/}},bash:{pattern:/(^[$#%]\s*)\S[\s\S]*/,lookbehind:!0,alias:"language-bash",inside:t.languages.bash},"shell-symbol":{pattern:/^[$#%]/,alias:"important"}}},output:/.(?:.*(?:[\r\n]|.$))*/},t.languages["sh-session"]=t.languages.shellsession=t.languages["shell-session"]})(Prism);(function(t){t.languages.ruby=t.languages.extend("clike",{comment:{pattern:/#.*|^=begin\s[\s\S]*?^=end/m,greedy:!0},"class-name":{pattern:/(\b(?:class|module)\s+|\bcatch\s+\()[\w.\\]+|\b[A-Z_]\w*(?=\s*\.\s*new\b)/,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:BEGIN|END|alias|and|begin|break|case|class|def|define_method|defined|do|each|else|elsif|end|ensure|extend|for|if|in|include|module|new|next|nil|not|or|prepend|private|protected|public|raise|redo|require|rescue|retry|return|self|super|then|throw|undef|unless|until|when|while|yield)\b/,operator:/\.{2,3}|&\.|===|<?=>|[!=]?~|(?:&&|\|\||<<|>>|\*\*|[+\-*/%<>!^&|=])=?|[?:]/,punctuation:/[(){}[\].,;]/}),t.languages.insertBefore("ruby","operator",{"double-colon":{pattern:/::/,alias:"punctuation"}});var e={pattern:/((?:^|[^\\])(?:\\{2})*)#\{(?:[^{}]|\{[^{}]*\})*\}/,lookbehind:!0,inside:{content:{pattern:/^(#\{)[\s\S]+(?=\}$)/,lookbehind:!0,inside:t.languages.ruby},delimiter:{pattern:/^#\{|\}$/,alias:"punctuation"}}};delete t.languages.ruby.function;var n="(?:"+[/([^a-zA-Z0-9\s{(\[<=])(?:(?!\1)[^\\]|\\[\s\S])*\1/.source,/\((?:[^()\\]|\\[\s\S]|\((?:[^()\\]|\\[\s\S])*\))*\)/.source,/\{(?:[^{}\\]|\\[\s\S]|\{(?:[^{}\\]|\\[\s\S])*\})*\}/.source,/\[(?:[^\[\]\\]|\\[\s\S]|\[(?:[^\[\]\\]|\\[\s\S])*\])*\]/.source,/<(?:[^<>\\]|\\[\s\S]|<(?:[^<>\\]|\\[\s\S])*>)*>/.source].join("|")+")",r=/(?:"(?:\\.|[^"\\\r\n])*"|(?:\b[a-zA-Z_]\w*|[^\s\0-\x7F]+)[?!]?|\$.)/.source;t.languages.insertBefore("ruby","keyword",{"regex-literal":[{pattern:RegExp(/%r/.source+n+/[egimnosux]{0,6}/.source),greedy:!0,inside:{interpolation:e,regex:/[\s\S]+/}},{pattern:/(^|[^/])\/(?!\/)(?:\[[^\r\n\]]+\]|\\.|[^[/\\\r\n])+\/[egimnosux]{0,6}(?=\s*(?:$|[\r\n,.;})#]))/,lookbehind:!0,greedy:!0,inside:{interpolation:e,regex:/[\s\S]+/}}],variable:/[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,symbol:[{pattern:RegExp(/(^|[^:]):/.source+r),lookbehind:!0,greedy:!0},{pattern:RegExp(/([\r\n{(,][ \t]*)/.source+r+/(?=:(?!:))/.source),lookbehind:!0,greedy:!0}],"method-definition":{pattern:/(\bdef\s+)\w+(?:\s*\.\s*\w+)?/,lookbehind:!0,inside:{function:/\b\w+$/,keyword:/^self\b/,"class-name":/^\w+/,punctuation:/\./}}}),t.languages.insertBefore("ruby","string",{"string-literal":[{pattern:RegExp(/%[qQiIwWs]?/.source+n),greedy:!0,inside:{interpolation:e,string:/[\s\S]+/}},{pattern:/("|')(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|(?!\1)[^\\#\r\n])*\1/,greedy:!0,inside:{interpolation:e,string:/[\s\S]+/}},{pattern:/<<[-~]?([a-z_]\w*)[\r\n](?:.*[\r\n])*?[\t ]*\1/i,alias:"heredoc-string",greedy:!0,inside:{delimiter:{pattern:/^<<[-~]?[a-z_]\w*|\b[a-z_]\w*$/i,inside:{symbol:/\b\w+/,punctuation:/^<<[-~]?/}},interpolation:e,string:/[\s\S]+/}},{pattern:/<<[-~]?'([a-z_]\w*)'[\r\n](?:.*[\r\n])*?[\t ]*\1/i,alias:"heredoc-string",greedy:!0,inside:{delimiter:{pattern:/^<<[-~]?'[a-z_]\w*'|\b[a-z_]\w*$/i,inside:{symbol:/\b\w+/,punctuation:/^<<[-~]?'|'$/}},string:/[\s\S]+/}}],"command-literal":[{pattern:RegExp(/%x/.source+n),greedy:!0,inside:{interpolation:e,command:{pattern:/[\s\S]+/,alias:"string"}}},{pattern:/`(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|[^\\`#\r\n])*`/,greedy:!0,inside:{interpolation:e,command:{pattern:/[\s\S]+/,alias:"string"}}}]}),delete t.languages.ruby.string,t.languages.insertBefore("ruby","number",{builtin:/\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Fixnum|Float|Hash|IO|Integer|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|Stat|String|Struct|Symbol|TMS|Thread|ThreadGroup|Time|TrueClass)\b/,constant:/\b[A-Z][A-Z0-9_]*(?:[?!]|\b)/}),t.languages.rb=t.languages.ruby})(Prism);(function(t){t.languages.erb={delimiter:{pattern:/^(\s*)<%=?|%>(?=\s*$)/,lookbehind:!0,alias:"punctuation"},ruby:{pattern:/\s*\S[\s\S]*/,alias:"language-ruby",inside:t.languages.ruby}},t.hooks.add("before-tokenize",function(e){var n=/<%=?(?:[^\r\n]|[\r\n](?!=begin)|[\r\n]=begin\s(?:[^\r\n]|[\r\n](?!=end))*[\r\n]=end)+?%>/g;t.languages["markup-templating"].buildPlaceholders(e,"erb",n)}),t.hooks.add("after-tokenize",function(e){t.languages["markup-templating"].tokenizePlaceholders(e,"erb")})})(Prism);Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0,greedy:!0},"string-interpolation":{pattern:/(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=\}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,greedy:!0,alias:"string"},string:{pattern:/(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^[\t ]*)@\w+(?:\.\w+)*/m,lookbehind:!0,alias:["annotation","punctuation"],inside:{punctuation:/\./}},keyword:/\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:False|None|True)\b/,number:/\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,operator:/[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/};Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest=Prism.languages.python;Prism.languages.py=Prism.languages.python;Prism.languages.sql={comment:{pattern:/(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,lookbehind:!0},variable:[{pattern:/@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,greedy:!0},/@[\w.$]+/],string:{pattern:/(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,greedy:!0,lookbehind:!0},identifier:{pattern:/(^|[^@\\])`(?:\\[\s\S]|[^`\\]|``)*`/,greedy:!0,lookbehind:!0,inside:{punctuation:/^`|`$/}},function:/\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,keyword:/\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:COL|_INSERT)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:ING|S)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,boolean:/\b(?:FALSE|NULL|TRUE)\b/i,number:/\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,operator:/[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|ILIKE|IN|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,punctuation:/[;[\]()`,.]/};(function(t){var e=/(?:[\w-]+|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*")/.source;function n(r){return r.replace(/__/g,function(){return e})}t.languages.toml={comment:{pattern:/#.*/,greedy:!0},table:{pattern:RegExp(n(/(^[\t ]*\[\s*(?:\[\s*)?)__(?:\s*\.\s*__)*(?=\s*\])/.source),"m"),lookbehind:!0,greedy:!0,alias:"class-name"},key:{pattern:RegExp(n(/(^[\t ]*|[{,]\s*)__(?:\s*\.\s*__)*(?=\s*=)/.source),"m"),lookbehind:!0,greedy:!0,alias:"property"},string:{pattern:/"""(?:\\[\s\S]|[^\\])*?"""|'''[\s\S]*?'''|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*"/,greedy:!0},date:[{pattern:/\b\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?\b/i,alias:"number"},{pattern:/\b\d{2}:\d{2}:\d{2}(?:\.\d+)?\b/,alias:"number"}],number:/(?:\b0(?:x[\da-zA-Z]+(?:_[\da-zA-Z]+)*|o[0-7]+(?:_[0-7]+)*|b[10]+(?:_[10]+)*))\b|[-+]?\b\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?\b|[-+]?\b(?:inf|nan)\b/,boolean:/\b(?:false|true)\b/,punctuation:/[.,=[\]{}]/}})(Prism);Prism.languages.ini={comment:{pattern:/(^[ \f\t\v]*)[#;][^\n\r]*/m,lookbehind:!0},section:{pattern:/(^[ \f\t\v]*)\[[^\n\r\]]*\]?/m,lookbehind:!0,inside:{"section-name":{pattern:/(^\[[ \f\t\v]*)[^ \f\t\v\]]+(?:[ \f\t\v]+[^ \f\t\v\]]+)*/,lookbehind:!0,alias:"selector"},punctuation:/\[|\]/}},key:{pattern:/(^[ \f\t\v]*)[^ \f\n\r\t\v=]+(?:[ \f\t\v]+[^ \f\n\r\t\v=]+)*(?=[ \f\t\v]*=)/m,lookbehind:!0,alias:"attr-name"},value:{pattern:/(=[ \f\t\v]*)[^ \f\n\r\t\v]+(?:[ \f\t\v]+[^ \f\n\r\t\v]+)*/,lookbehind:!0,alias:"attr-value",inside:{"inner-value":{pattern:/^("|').+(?=\1$)/,lookbehind:!0}}},punctuation:/=/};(function(t){t.languages.diff={coord:[/^(?:\*{3}|-{3}|\+{3}).*$/m,/^@@.*@@$/m,/^\d.*$/m]};var e={"deleted-sign":"-","deleted-arrow":"<","inserted-sign":"+","inserted-arrow":">",unchanged:" ",diff:"!"};Object.keys(e).forEach(function(n){var r=e[n],a=[];/^\w+$/.test(n)||a.push(/\w+/.exec(n)[0]),n==="diff"&&a.push("bold"),t.languages.diff[n]={pattern:RegExp("^(?:["+r+`].*(?:\r
?|
|(?![\\s\\S])))+`,"m"),alias:a,inside:{line:{pattern:/(.)(?=[\s\S]).*(?:\r\n?|\n)?/,lookbehind:!0},prefix:{pattern:/[\s\S]/,alias:/\w+/.exec(n)[0]}}}}),Object.defineProperty(t.languages.diff,"PREFIXES",{value:e})})(Prism);(function(t){function e(d){return RegExp("(^(?:"+d+"):[ 	]*(?![ 	]))[^]+","i")}t.languages.http={"request-line":{pattern:/^(?:CONNECT|DELETE|GET|HEAD|OPTIONS|PATCH|POST|PRI|PUT|SEARCH|TRACE)\s(?:https?:\/\/|\/)\S*\sHTTP\/[\d.]+/m,inside:{method:{pattern:/^[A-Z]+\b/,alias:"property"},"request-target":{pattern:/^(\s)(?:https?:\/\/|\/)\S*(?=\s)/,lookbehind:!0,alias:"url",inside:t.languages.uri},"http-version":{pattern:/^(\s)HTTP\/[\d.]+/,lookbehind:!0,alias:"property"}}},"response-status":{pattern:/^HTTP\/[\d.]+ \d+ .+/m,inside:{"http-version":{pattern:/^HTTP\/[\d.]+/,alias:"property"},"status-code":{pattern:/^(\s)\d+(?=\s)/,lookbehind:!0,alias:"number"},"reason-phrase":{pattern:/^(\s).+/,lookbehind:!0,alias:"string"}}},header:{pattern:/^[\w-]+:.+(?:(?:\r\n?|\n)[ \t].+)*/m,inside:{"header-value":[{pattern:e(/Content-Security-Policy/.source),lookbehind:!0,alias:["csp","languages-csp"],inside:t.languages.csp},{pattern:e(/Public-Key-Pins(?:-Report-Only)?/.source),lookbehind:!0,alias:["hpkp","languages-hpkp"],inside:t.languages.hpkp},{pattern:e(/Strict-Transport-Security/.source),lookbehind:!0,alias:["hsts","languages-hsts"],inside:t.languages.hsts},{pattern:e(/[^:]+/.source),lookbehind:!0}],"header-name":{pattern:/^[^:]+/,alias:"keyword"},punctuation:/^:/}}};var n=t.languages,r={"application/javascript":n.javascript,"application/json":n.json||n.javascript,"application/xml":n.xml,"text/xml":n.xml,"text/html":n.html,"text/css":n.css,"text/plain":n.plain},a={"application/json":!0,"application/xml":!0};function s(d){var m=d.replace(/^[a-z]+\//,""),w="\\w+/(?:[\\w.-]+\\+)+"+m+"(?![+\\w.-])";return"(?:"+d+"|"+w+")"}var i;for(var o in r)if(r[o]){i=i||{};var c=a[o]?s(o):o;i[o.replace(/\//g,"-")]={pattern:RegExp("("+/content-type:\s*/.source+c+/(?:(?:\r\n?|\n)[\w-].*)*(?:\r(?:\n|(?!\n))|\n)/.source+")"+/[^ \t\w-][\s\S]*/.source,"i"),lookbehind:!0,inside:r[o]}}i&&t.languages.insertBefore("http","header",i)})(Prism);(function(t){var e=/\\[\r\n](?:\s|\\[\r\n]|#.*(?!.))*(?![\s#]|\\[\r\n])/.source,n=/(?:[ \t]+(?![ \t])(?:<SP_BS>)?|<SP_BS>)/.source.replace(/<SP_BS>/g,function(){return e}),r=/"(?:[^"\\\r\n]|\\(?:\r\n|[\s\S]))*"|'(?:[^'\\\r\n]|\\(?:\r\n|[\s\S]))*'/.source,a=/--[\w-]+=(?:<STR>|(?!["'])(?:[^\s\\]|\\.)+)/.source.replace(/<STR>/g,function(){return r}),s={pattern:RegExp(r),greedy:!0},i={pattern:/(^[ \t]*)#.*/m,lookbehind:!0,greedy:!0};function o(c,d){return c=c.replace(/<OPT>/g,function(){return a}).replace(/<SP>/g,function(){return n}),RegExp(c,d)}t.languages.docker={instruction:{pattern:/(^[ \t]*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)(?:\\.|[^\r\n\\])*(?:\\$(?:\s|#.*$)*(?![\s#])(?:\\.|[^\r\n\\])*)*/im,lookbehind:!0,greedy:!0,inside:{options:{pattern:o(/(^(?:ONBUILD<SP>)?\w+<SP>)<OPT>(?:<SP><OPT>)*/.source,"i"),lookbehind:!0,greedy:!0,inside:{property:{pattern:/(^|\s)--[\w-]+/,lookbehind:!0},string:[s,{pattern:/(=)(?!["'])(?:[^\s\\]|\\.)+/,lookbehind:!0}],operator:/\\$/m,punctuation:/=/}},keyword:[{pattern:o(/(^(?:ONBUILD<SP>)?HEALTHCHECK<SP>(?:<OPT><SP>)*)(?:CMD|NONE)\b/.source,"i"),lookbehind:!0,greedy:!0},{pattern:o(/(^(?:ONBUILD<SP>)?FROM<SP>(?:<OPT><SP>)*(?!--)[^ \t\\]+<SP>)AS/.source,"i"),lookbehind:!0,greedy:!0},{pattern:o(/(^ONBUILD<SP>)\w+/.source,"i"),lookbehind:!0,greedy:!0},{pattern:/^\w+/,greedy:!0}],comment:i,string:s,variable:/\$(?:\w+|\{[^{}"'\\]*\})/,operator:/\\$/m}},comment:i},t.languages.dockerfile=t.languages.docker})(Prism);Prism.languages.makefile={comment:{pattern:/(^|[^\\])#(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/,lookbehind:!0},string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"builtin-target":{pattern:/\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,alias:"builtin"},target:{pattern:/^(?:[^:=\s]|[ \t]+(?![\s:]))+(?=\s*:(?!=))/m,alias:"symbol",inside:{variable:/\$+(?:(?!\$)[^(){}:#=\s]+|(?=[({]))/}},variable:/\$+(?:(?!\$)[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,keyword:/-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/,function:{pattern:/(\()(?:abspath|addsuffix|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:list|s)?)(?=[ \t])/,lookbehind:!0},operator:/(?:::|[?:+!])?=|[|@]/,punctuation:/[:;(){}]/};(function(t){var e=/\$(?:\w[a-z\d]*(?:_[^\x00-\x1F\s"'\\()$]*)?|\{[^}\s"'\\]+\})/i;t.languages.nginx={comment:{pattern:/(^|[\s{};])#.*/,lookbehind:!0,greedy:!0},directive:{pattern:/(^|\s)\w(?:[^;{}"'\\\s]|\\.|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\s+(?:#.*(?!.)|(?![#\s])))*?(?=\s*[;{])/,lookbehind:!0,greedy:!0,inside:{string:{pattern:/((?:^|[^\\])(?:\\\\)*)(?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/,lookbehind:!0,greedy:!0,inside:{escape:{pattern:/\\["'\\nrt]/,alias:"entity"},variable:e}},comment:{pattern:/(\s)#.*/,lookbehind:!0,greedy:!0},keyword:{pattern:/^\S+/,greedy:!0},boolean:{pattern:/(\s)(?:off|on)(?!\S)/,lookbehind:!0},number:{pattern:/(\s)\d+[a-z]*(?!\S)/i,lookbehind:!0},variable:e}},punctuation:/[{};]/}})(Prism);Prism.languages.c=Prism.languages.extend("clike",{comment:{pattern:/\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,greedy:!0},string:{pattern:/"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,greedy:!0},"class-name":{pattern:/(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,lookbehind:!0},keyword:/\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\b/,function:/\b[a-z_]\w*(?=\s*\()/i,number:/(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,operator:/>>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/});Prism.languages.insertBefore("c","string",{char:{pattern:/'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n]){0,32}'/,greedy:!0}});Prism.languages.insertBefore("c","string",{macro:{pattern:/(^[\t ]*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,lookbehind:!0,greedy:!0,alias:"property",inside:{string:[{pattern:/^(#\s*include\s*)<[^>]+>/,lookbehind:!0},Prism.languages.c.string],char:Prism.languages.c.char,comment:Prism.languages.c.comment,"macro-name":[{pattern:/(^#\s*define\s+)\w+\b(?!\()/i,lookbehind:!0},{pattern:/(^#\s*define\s+)\w+\b(?=\()/i,lookbehind:!0,alias:"function"}],directive:{pattern:/^(#\s*)[a-z]+/,lookbehind:!0,alias:"keyword"},"directive-hash":/^#/,punctuation:/##|\\(?=[\r\n])/,expression:{pattern:/\S[\s\S]*/,inside:Prism.languages.c}}}});Prism.languages.insertBefore("c","function",{constant:/\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\b/});delete Prism.languages.c.boolean;(function(t){var e=/\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|char8_t|class|co_await|co_return|co_yield|compl|concept|const|const_cast|consteval|constexpr|constinit|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int16_t|int32_t|int64_t|int8_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|uint16_t|uint32_t|uint64_t|uint8_t|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,n=/\b(?!<keyword>)\w+(?:\s*\.\s*\w+)*\b/.source.replace(/<keyword>/g,function(){return e.source});t.languages.cpp=t.languages.extend("c",{"class-name":[{pattern:RegExp(/(\b(?:class|concept|enum|struct|typename)\s+)(?!<keyword>)\w+/.source.replace(/<keyword>/g,function(){return e.source})),lookbehind:!0},/\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/,/\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i,/\b\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/],keyword:e,number:{pattern:/(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,greedy:!0},operator:/>>=?|<<=?|->|--|\+\+|&&|\|\||[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,boolean:/\b(?:false|true)\b/}),t.languages.insertBefore("cpp","string",{module:{pattern:RegExp(/(\b(?:import|module)\s+)/.source+"(?:"+/"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|<[^<>\r\n]*>/.source+"|"+/<mod-name>(?:\s*:\s*<mod-name>)?|:\s*<mod-name>/.source.replace(/<mod-name>/g,function(){return n})+")"),lookbehind:!0,greedy:!0,inside:{string:/^[<"][\s\S]+/,operator:/:/,punctuation:/\./}},"raw-string":{pattern:/R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,alias:"string",greedy:!0}}),t.languages.insertBefore("cpp","keyword",{"generic-function":{pattern:/\b(?!operator\b)[a-z_]\w*\s*<(?:[^<>]|<[^<>]*>)*>(?=\s*\()/i,inside:{function:/^\w+/,generic:{pattern:/<[\s\S]+/,alias:"class-name",inside:t.languages.cpp}}}}),t.languages.insertBefore("cpp","operator",{"double-colon":{pattern:/::/,alias:"punctuation"}}),t.languages.insertBefore("cpp","class-name",{"base-clause":{pattern:/(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,lookbehind:!0,greedy:!0,inside:t.languages.extend("cpp",{})}}),t.languages.insertBefore("inside","double-colon",{"class-name":/\b[a-z_]\w*\b(?!\s*::)/i},t.languages.cpp["base-clause"])})(Prism);Prism.languages.go=Prism.languages.extend("clike",{string:{pattern:/(^|[^\\])"(?:\\.|[^"\\\r\n])*"|`[^`]*`/,lookbehind:!0,greedy:!0},keyword:/\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,boolean:/\b(?:_|false|iota|nil|true)\b/,number:[/\b0(?:b[01_]+|o[0-7_]+)i?\b/i,/\b0x(?:[a-f\d_]+(?:\.[a-f\d_]*)?|\.[a-f\d_]+)(?:p[+-]?\d+(?:_\d+)*)?i?(?!\w)/i,/(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?[\d_]+)?i?(?!\w)/i],operator:/[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,builtin:/\b(?:append|bool|byte|cap|close|complex|complex(?:64|128)|copy|delete|error|float(?:32|64)|u?int(?:8|16|32|64)?|imag|len|make|new|panic|print(?:ln)?|real|recover|rune|string|uintptr)\b/});Prism.languages.insertBefore("go","string",{char:{pattern:/'(?:\\.|[^'\\\r\n]){0,10}'/,greedy:!0}});delete Prism.languages.go["class-name"];(function(t){var e=/\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record(?!\s*[(){}[\]<>=%~.:,;?+\-*/&|^])|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/,n=/(?:[a-z]\w*\s*\.\s*)*(?:[A-Z]\w*\s*\.\s*)*/.source,r={pattern:RegExp(/(^|[^\w.])/.source+n+/[A-Z](?:[\d_A-Z]*[a-z]\w*)?\b/.source),lookbehind:!0,inside:{namespace:{pattern:/^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,inside:{punctuation:/\./}},punctuation:/\./}};t.languages.java=t.languages.extend("clike",{string:{pattern:/(^|[^\\])"(?:\\.|[^"\\\r\n])*"/,lookbehind:!0,greedy:!0},"class-name":[r,{pattern:RegExp(/(^|[^\w.])/.source+n+/[A-Z]\w*(?=\s+\w+\s*[;,=()]|\s*(?:\[[\s,]*\]\s*)?::\s*new\b)/.source),lookbehind:!0,inside:r.inside},{pattern:RegExp(/(\b(?:class|enum|extends|implements|instanceof|interface|new|record|throws)\s+)/.source+n+/[A-Z]\w*\b/.source),lookbehind:!0,inside:r.inside}],keyword:e,function:[t.languages.clike.function,{pattern:/(::\s*)[a-z_]\w*/,lookbehind:!0}],number:/\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,operator:{pattern:/(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,lookbehind:!0},constant:/\b[A-Z][A-Z_\d]+\b/}),t.languages.insertBefore("java","string",{"triple-quoted-string":{pattern:/"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,greedy:!0,alias:"string"},char:{pattern:/'(?:\\.|[^'\\\r\n]){1,6}'/,greedy:!0}}),t.languages.insertBefore("java","class-name",{annotation:{pattern:/(^|[^.])@\w+(?:\s*\.\s*\w+)*/,lookbehind:!0,alias:"punctuation"},generics:{pattern:/<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,inside:{"class-name":r,keyword:e,punctuation:/[<>(),.:]/,operator:/[?&|]/}},import:[{pattern:RegExp(/(\bimport\s+)/.source+n+/(?:[A-Z]\w*|\*)(?=\s*;)/.source),lookbehind:!0,inside:{namespace:r.inside.namespace,punctuation:/\./,operator:/\*/,"class-name":/\w+/}},{pattern:RegExp(/(\bimport\s+static\s+)/.source+n+/(?:\w+|\*)(?=\s*;)/.source),lookbehind:!0,alias:"static",inside:{namespace:r.inside.namespace,static:/\b\w+$/,punctuation:/\./,operator:/\*/,"class-name":/\w+/}}],namespace:{pattern:RegExp(/(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)(?!<keyword>)[a-z]\w*(?:\.[a-z]\w*)*\.?/.source.replace(/<keyword>/g,function(){return e.source})),lookbehind:!0,inside:{punctuation:/\./}}})})(Prism);(function(t){for(var e=/\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|<self>)*\*\//.source,n=0;n<2;n++)e=e.replace(/<self>/g,function(){return e});e=e.replace(/<self>/g,function(){return/[^\s\S]/.source}),t.languages.rust={comment:[{pattern:RegExp(/(^|[^\\])/.source+e),lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/,greedy:!0},char:{pattern:/b?'(?:\\(?:x[0-7][\da-fA-F]|u\{(?:[\da-fA-F]_*){1,6}\}|.)|[^\\\r\n\t'])'/,greedy:!0},attribute:{pattern:/#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/,greedy:!0,alias:"attr-name",inside:{string:null}},"closure-params":{pattern:/([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/,lookbehind:!0,greedy:!0,inside:{"closure-punctuation":{pattern:/^\||\|$/,alias:"punctuation"},rest:null}},"lifetime-annotation":{pattern:/'\w+/,alias:"symbol"},"fragment-specifier":{pattern:/(\$\w+:)[a-z]+/,lookbehind:!0,alias:"punctuation"},variable:/\$\w+/,"function-definition":{pattern:/(\bfn\s+)\w+/,lookbehind:!0,alias:"function"},"type-definition":{pattern:/(\b(?:enum|struct|trait|type|union)\s+)\w+/,lookbehind:!0,alias:"class-name"},"module-declaration":[{pattern:/(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/,lookbehind:!0,alias:"namespace"},{pattern:/(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/,lookbehind:!0,alias:"namespace",inside:{punctuation:/::/}}],keyword:[/\b(?:Self|abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,/\b(?:bool|char|f(?:32|64)|[ui](?:8|16|32|64|128|size)|str)\b/],function:/\b[a-z_]\w*(?=\s*(?:::\s*<|\())/,macro:{pattern:/\b\w+!/,alias:"property"},constant:/\b[A-Z_][A-Z_\d]+\b/,"class-name":/\b[A-Z]\w*\b/,namespace:{pattern:/(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,inside:{punctuation:/::/}},number:/\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:f32|f64|[iu](?:8|16|32|64|size)?))?\b/,boolean:/\b(?:false|true)\b/,punctuation:/->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,operator:/[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/},t.languages.rust["closure-params"].inside.rest=t.languages.rust,t.languages.rust.attribute.inside.string=t.languages.rust.string})(Prism);var Yt={rb:"ruby",gemfile:"ruby",gemspec:"ruby",irb:"ruby",rake:"ruby",rails:"ruby",ru:"ruby",yml:"yaml",html:"markup",htm:"markup",xml:"markup",svg:"markup",xhtml:"markup",sh:"bash",shell:"bash",shellscript:"bash",zsh:"bash",ksh:"bash",console:"shell-session",terminal:"shell-session",js:"javascript",mjs:"javascript",cjs:"javascript",node:"javascript",ts:"typescript",md:"markdown",jsonc:"json",json5:"json",dockerfile:"docker",make:"makefile",mk:"makefile",patch:"diff",gitdiff:"diff",curl:"http",rest:"http",dotenv:"ini",env:"ini",cfg:"ini",conf:"nginx"};function Ze(){let t=Object.create(null);t.render=(n,r)=>{r.innerHTML=$.parse(n),r.querySelectorAll("pre code").forEach(a=>e(a)),r.querySelectorAll("a").forEach(a=>{a.target="_blank",a.rel="noopener"})};function e(n){let r=/\blang(?:uage)?-([\w-]+)/i.exec(n.className||""),a=r&&r[1].toLowerCase(),s=a&&(Yt[a]||a),i=s&&Ee.default.languages[s];i&&(n.className=`language-${s}`,n.innerHTML=Ee.default.highlight(n.textContent,i,s))}return t}function We(t={}){let e=Object.create(null),{url:n,body:r,headers:a,withCredentials:s=!1}=t,i=t.method||"POST",o={};e.CONNECTING=0,e.OPEN=1,e.CLOSED=2,e.readyState=e.CONNECTING,e.url=n;let c=null,d="",m=r==null?void 0:typeof r=="string"||r instanceof URLSearchParams||typeof FormData<"u"&&r instanceof FormData?r:new URLSearchParams(r),w=m instanceof URLSearchParams||m==null?{"Content-Type":"application/x-www-form-urlencoded",...a}:{...a},k=(l,h)=>{let g=typeof MessageEvent=="function"?new MessageEvent(l,{data:h}):{type:l,data:h};for(let f of o[l]||[])f(g)},y=l=>{let h="message",g=[];for(let f of l.split(`
`))f.startsWith("event:")?h=f.slice(6).trim():f.startsWith("data:")&&g.push(f.slice(5).trim());g.length&&k(h,g.join(`
`))},v=()=>{let l;for(;(l=d.indexOf(`

`))!==-1;){let h=d.slice(0,l);d=d.slice(l+2),y(h)}};e.addEventListener=(l,h)=>((o[l]||=[]).push(h),e),e.removeEventListener=(l,h)=>(o[l]=(o[l]||[]).filter(g=>g!==h),e),e.close=()=>{e.readyState!==e.CLOSED&&(e.readyState=e.CLOSED,c?.abort(),c=null)},e.active=()=>e.readyState===e.OPEN||e.readyState===e.CONNECTING,c=new AbortController;let p=c.signal;return fetch(n,{method:i,headers:w,body:m,signal:p,credentials:s?"include":"same-origin"}).then(async l=>{if(!l.ok)throw new Error(await l.text()||`${l.status}`);if(e.readyState===e.CLOSED)return;e.readyState=e.OPEN;let h=l.body.getReader(),g=new TextDecoder;for(;;){let{value:f,done:x}=await h.read();if(x)break;d+=g.decode(f,{stream:!0}),v()}e.close()}).catch(l=>{if(e.readyState===e.CLOSED||l.name==="AbortError"){e.close();return}e.close();let h=typeof MessageEvent=="function"?new MessageEvent("error",{data:l.message||String(l)}):{type:"error",data:l.message||String(l),message:l.message};for(let g of o.error||[])g(h)}),e}function Xe(t={}){let e=Object.create(null),{path:n,headers:r}=t,a=["onContent","onToolCall","onToolReturn","onGoodbye","onError"],s=null;return e.onContent=t.onContent||(i=>{}),e.onToolCall=t.onToolCall||(i=>{}),e.onToolReturn=t.onToolReturn||(i=>{}),e.onGoodbye=t.onGoodbye||(i=>{}),e.onError=t.onError||(i=>{}),e.attach=i=>{if(s)return e;let o=We({url:n,headers:r,body:{q:i}});for(let c of a)o.addEventListener(c,d=>{e[c]?.(JSON.parse(d.data)),(c==="onGoodbye"||c==="onError")&&e.close()});return o.addEventListener("error",c=>{e.onError({error:c.data}),e.close()}),s=o,e},e.close=()=>{s&&(s.close(),s=null)},e.active=()=>!!s,e}function Ye(){let t=Object.create(null);return t.active=new Map,t.completed=new Map,t.onToolCall=e=>{t.active.set(e.id,e.name)},t.onToolReturn=e=>{t.active.delete(e.id),t.completed.set(e.name,(t.completed.get(e.name)||0)+1)},t}var Ke={dot:"M12 12h.01",chevron:"M6 9l6 6 6-6",list:"M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",person:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8",speech:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",tool:"M14.7 6.3a4 4 0 0 0 5 5l-9.4 9.4a2.1 2.1 0 0 1-3-3zM6 3l3 3M3 6l3 3",return:"M9 14l-4-4 4-4M5 10h9a5 5 0 0 1 0 10h-2",clock:"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",warn:"M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"},Kt=200,Vt=6;function Ve(t){let e=Ke[t]||Ke.dot,n=document.createElementNS("http://www.w3.org/2000/svg","svg");n.setAttribute("class","ac-icon"),n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2"),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-linejoin","round"),n.setAttribute("aria-hidden","true");let r=document.createElementNS("http://www.w3.org/2000/svg","path");return r.setAttribute("d",e),n.append(r),n}function Qe({root:t,host:e}){let n=Object.create(null),r=t.querySelector(".ac-panels"),a=t.querySelector(".ac-activity"),s=t.querySelector(".ac-panel-view"),i=s.querySelector(".ac-panel-title"),o=s.querySelector(".ac-panel-body"),c=s.querySelector(".ac-panel-note"),d=!1;n.items=[],n.open=null,n.set=b=>{n.items=b||[],r.innerHTML="",n.items.forEach((u,S)=>{S&&r.append(m());let A=document.createElement("button");A.type="button",A.className="ac-panel",A.dataset.panel=u.label,A.setAttribute("part","panel"),A.setAttribute("aria-expanded","false");let R=document.createElement("span");if(R.className="ac-panel-label",R.textContent=u.label,A.append(R),u.badge){let I=document.createElement("span");I.className="ac-panel-badge",I.textContent=u.badge,A.append(I)}k(u.label)==="hover"&&(A.addEventListener("pointerenter",()=>n.show(u.label)),A.addEventListener("pointerleave",g)),A.addEventListener("click",I=>{I.preventDefault(),I.stopPropagation(),n.toggle(u.label)}),u.aside&&A.append(...Array.isArray(u.aside)?u.aside:[u.aside]),r.append(A)}),n.open&&!n.items.some(u=>u.label===n.open)&&n.close()};function m(){let b=document.createElement("span");return b.className="ac-panel-divider",b.setAttribute("part","panel-divider"),b.setAttribute("aria-hidden","true"),b.textContent="|",b}function w(b){return r.querySelector(`.ac-panel[data-panel="${b}"]`)}n.refresh=()=>{for(let b of r.querySelectorAll(".ac-panel")){let u=b.dataset.panel===n.open;b.classList.toggle("is-open",u),b.setAttribute("aria-expanded",u?"true":"false")}},n.toggle=b=>{n.open===b?n.close():n.show(b)},n.show=async b=>{let u=n.items.find(S=>S.label===b);if(u){if(n.open!==b&&(n.open=b,n.refresh(),e.setAttribute("panel",b),i.textContent=b,o.innerHTML="",c.hidden=!0,v(b),f()),u.render){c.hidden=!0,o.innerHTML="",u.render(o);return}if(u.content){c.hidden=!0,o.innerHTML="";for(let S of u.content)o.append(S);return}o.childNodes.length||(c.textContent="Loading\u2026",c.hidden=!1);try{u.rows=await u.load()}catch{o.childNodes.length||(c.textContent="That could not be loaded.",c.hidden=!1);return}if(n.open===b){if(c.hidden=!0,u.html){o.innerHTML=u.rows||"";return}n.draw(u.rows)}}},n.close=()=>{n.open&&(n.open=null,n.refresh(),e.removeAttribute("panel"),x(),o.innerHTML="")};function k(b){let u=e.querySelectorAll("agent-panel[trigger]");for(let S of u)if(S.getAttribute("label")===b)return S.getAttribute("trigger");return null}function y(b){let u=e.querySelectorAll("agent-panel[data-side]");for(let S of u)if(S.getAttribute("label")===b)return S.dataset.side;return null}function v(b){if(y(b)==="right"){s.classList.add("is-side"),s.style.top=s.style.left=s.style.width=s.style.height=s.style.bottom="";return}s.classList.remove("is-side");let u=e.getBoundingClientRect(),A=(w(b)||a).getBoundingClientRect(),R=a.getBoundingClientRect(),I=Math.min(Math.max(Math.round(R.width/3),Kt),Math.round(R.width)),O=Math.min(Math.max(8,Math.round(A.left-u.left)),Math.max(8,Math.round(u.width-I-8)));s.style.left=`${O}px`,s.style.width=`${I}px`,s.style.top="auto",s.style.bottom=`${Math.round(u.bottom-A.top+Vt)}px`}function p(){if(d)return;d=!0,document.addEventListener("pointerdown",u=>{if(!n.open)return;let S=u.composedPath();!S.includes(s)&&!S.includes(r)&&n.close()},!0),document.addEventListener("keydown",u=>{u.key==="Escape"&&n.close()}),s.addEventListener("pointerenter",h),s.addEventListener("pointerleave",g);let b=s.querySelector(".ac-panel-close");b&&b.addEventListener("click",()=>n.close())}typeof ResizeObserver=="function"&&new ResizeObserver(()=>{n.open&&v(n.open)}).observe(e),typeof window<"u"&&window.addEventListener("resize",()=>{n.open&&v(n.open)});let l=null;function h(){l&&clearTimeout(l),l=null}function g(){h(),l=setTimeout(()=>{l=null,n.close()},240)}function f(){p(),s.classList.add("is-open")}function x(){s.classList.remove("is-open")}n.draw=b=>{o.innerHTML="";for(let u of _(b||[])){let S=u.rows.map(E);if(!u.name){S.forEach(F=>o.append(F));continue}let A=document.createElement("details");A.className="ac-panel-group",A.setAttribute("part","panel-group"),A.open=u.last;let R=document.createElement("summary");R.className="ac-panel-group-summary",R.setAttribute("part","panel-group-summary"),R.append(Ve("chevron"));let I=document.createElement("span");I.textContent=u.name,R.append(I);let O=document.createElement("span");O.className="ac-panel-group-count",O.textContent=`${u.rows.length}`,R.append(O),A.append(R),S.forEach(F=>A.append(F)),A.addEventListener("toggle",()=>{if(A.open)for(let F of o.querySelectorAll(".ac-panel-group[open]"))F!==A&&(F.open=!1)}),o.append(A)}o.childNodes.length||(c.textContent="Nothing here yet.",c.hidden=!1)};function _(b){let u=[];for(let S of b){let A=S.group||"",R=u[u.length-1];(!R||R.name!==A)&&(R={name:A,rows:[]},u.push(R)),R.rows.push(S)}return u.length&&(u[u.length-1].last=!0),u}function E(b){let u=document.createElement("div");u.className="ac-panel-row",b.tone&&u.classList.add(`is-${b.tone}`),b.icon&&(u.dataset.icon=b.icon),u.setAttribute("part","panel-row");let S=b.params||b.pairs||[],A=!!(S.length||b.result),R=document.createElement("details");R.className="ac-panel-row-details",R.open=!A;let I=document.createElement("summary");I.className="ac-panel-row-label";let O=document.createElement("span");O.className="ac-panel-row-what";let F=document.createElement("span");F.className="ac-panel-row-head";let P=document.createElement("span");if(P.className="ac-panel-row-kind",P.textContent=b.kind||"",b.running&&(P.dataset.running="true"),F.append(P),b.title){let N=document.createElement("span");N.className="ac-panel-row-title",N.textContent=b.title,F.append(N)}if(O.append(F),b.subject)O.append(L(b.subject,"ac-panel-row-subject"));else if(b.detail){let N=document.createElement("span");N.className="ac-panel-row-detail",N.textContent=b.detail,O.append(N)}if(I.append(Ve(b.icon),O),b.duration){let N=document.createElement("span");N.className="ac-panel-row-duration",N.textContent=b.duration,I.append(N)}if(R.append(I),A){let N=document.createElement("div");N.className="ac-panel-row-body";for(let[B,D]of S)D&&N.append(L([B,D],"ac-panel-row-pair"));if(b.result&&b.result[1]){let B=L(b.result,"ac-panel-row-pair ac-panel-row-result");b.tone&&B.classList.add(`is-${b.tone}`),N.append(B)}R.append(N)}return u.append(R),u}function L([b,u],S){let A=document.createElement("span");A.className=S;let R=document.createElement("span");if(R.className="ac-panel-row-key",R.textContent=b,u){let I=document.createElement("span");I.className="ac-panel-row-value",I.textContent=u,A.append(R,I)}return A}return n}function Je(t={}){let e=Object.create(null),n=t.host,r=t.root,a=r.querySelector(".ac-answer"),s=r.querySelector(".ac-form"),i=r.querySelector(".ac-reset"),o=r.querySelector(".ac-expand"),c=Ye(),d=Qe({root:r,host:n}),m=r.querySelector('slot[name="panels"]'),w=()=>(m?.assignedElements()||[]).filter(u=>u.localName==="agent-panel").map(u=>u.panel()),k=()=>[...w(),...t.panels||[]].filter(Boolean);m&&m.addEventListener("slotchange",()=>d.set(k()));let y={data:{...t.labels||{},fallback:{call:"Running {name} tool\u2026",return:"Tool {name} finished"}},for(u){let{data:S}=this;return S[u]||S["*"]||S.default||S.fallback},slot(u,S){for(let A of n.children){let R=A.getAttribute("slot");if(R===`tool.${u}.${S}`||R===`tool.*.${S}`)return A}},text(u,S,A){let R=S==="return"?"return":"call",I=this.slot(u,R);if(I)return I.textContent;let O=this.for(u);switch(S){case"return":return typeof O=="string"?A.count?O:void 0:O.return;default:return typeof O=="string"?O:O.call}},icon(u,S){let A=S==="return"?"return-icon":"call-icon",R=this.slot(u,A);if(R)return R;let I=this.for(u);return typeof I=="object"&&I&&I[A]?I[A]:f.default(S)},substitute(u,S){return u.replace(/\{(\w+)(?:\.(\w+))?\}/g,(A,R,I)=>R==="arguments"?I?S.arguments?.[I]??"":"":S[R]??"")},resolve(u,S){let A=this.text(u.name,S,u);return typeof A=="function"&&(A=A(u)),typeof A=="string"&&(A=this.substitute(A,u)),{text:A,icon:this.icon(u.name,S)}},active(u){return this.resolve(u,"active")},done(u){return this.resolve(u,"return")}},v={el:r.querySelector(".ac-status"),thinking:"Thinking\u2026",render({text:u,icon:S,thinking:A}){let{el:R}=this;if(R.replaceChildren(),S&&R.append(S.cloneNode(!0)),u!=null){let I=document.createElement("span");I.textContent=u,A&&(I.className="is-thinking"),R.append(I)}},follow(){let u=[...c.active.keys()].pop();if(u!=null){this.render(y.active({id:u,name:c.active.get(u)}));return}if(E){this.render({text:this.thinking,thinking:!0});return}this.render({})}},p={el:r.querySelector(".ac-placeholder"),last:r.querySelector(".ac-last-message"),show(){let{el:u}=this;u.hidden=!1,this.last&&(this.last.hidden=!0)},hide(){let{el:u}=this;u.hidden=!0,this.last&&(this.last.hidden=!0)},restore(u){this.last&&(t.renderer.render(u,this.last),this.el.classList.add("is-restored"),this.el.hidden=!0,this.last.hidden=!1)},forget(){this.last&&(this.el.classList.remove("is-restored"),this.el.hidden=!1,this.last.hidden=!0,this.last.innerHTML="")}},l={el:r.querySelector(".ac-loading"),show(){this.el&&(this.el.hidden=!1)},hide(){this.el&&(this.el.hidden=!0)}};p.hide(),l.show();let h=u=>{l.hide(),n.dispatchEvent(new CustomEvent("describe",{detail:u})),!L&&(u?.last_message?p.restore(u.last_message):p.show())},g=async()=>{try{let u=await t.http.describe();if(!u.ok)throw new Error(String(u.status));h(await u.json())}catch{h(void 0)}},f={el:r,default(u){let{el:S}=this,A=S.querySelector(u==="return"?".ac-icon-return":".ac-icon-call");return A?A.content.cloneNode(!0):void 0}},x={el:r.querySelector(".ac-input"),get value(){return this.el.value},clear(){this.el.value=""},busy(u){this.el.readOnly=u,r.classList.toggle("is-busy",u),n.toggleAttribute("busy",u),u?(this.resting=this.el.placeholder,this.el.placeholder="Working on your request..."):this.resting&&(this.el.placeholder=this.resting,this.resting=null)},focus(){this.el.focus({preventScroll:!0})}},_="",E=!1,L=!1,b=Xe({path:t.path,headers:t.headers,onContent(u){E=!1,v.follow(),p.hide(),_+=u.text,t.renderer.render(_,a)},onToolCall(u){c.onToolCall(u),E=!1,v.follow()},onToolReturn(u){c.onToolReturn(u),E=!0,v.follow()},onGoodbye(u){c.active.clear(),E=!1,v.follow(),x.busy(!1),_.trim()===""&&u.answer&&t.renderer.render(u.answer,a),g()},onError(u){c.active.clear(),E=!1,v.follow(),x.busy(!1),p.hide(),a.classList.add("is-error");let S="Something went wrong. Please try again.";try{S=u.error||S}catch{}a.textContent=S,g()}});return e.talk=u=>{b.active()||(L=!0,c.active.clear(),c.completed.clear(),_="",a.innerHTML="",a.classList.remove("is-error"),p.hide(),x.busy(!0),E=!0,v.follow(),b.attach(u),x.clear(),x.focus())},e.restore=u=>{l.hide(),u?.last_message?p.restore(u.last_message):p.show()},e.reset=async()=>{b.close();try{await t.http.destroy()}catch{}a.innerHTML="",a.classList.remove("is-error"),p.forget(),p.show(),c.active.clear(),c.completed.clear(),E=!1,L=!1,v.follow(),x.busy(!1),x.focus(),g()},e.focus=()=>x.focus(),e.clear=()=>{a.innerHTML="",a.classList.remove("is-error")},s.addEventListener("submit",u=>{u.preventDefault();let S=x.value.trim();S&&e.talk(S)}),i.addEventListener("click",e.reset),o.addEventListener("click",()=>{let u=r.classList.toggle("is-expanded");n.toggleAttribute("expanded",u),o.setAttribute("aria-expanded",u?"true":"false"),o.title=u?"Collapse chat":"Expand chat",x.focus()}),v.follow(),g(),d.set(k()),e.setPanels=u=>{t.panels=u||[],d.set(k())},e}var Qt=`
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
    font-weight: 500;
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

  .ac-panel-view { max-height: min(50vh, 26em); }

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
`,et=document.createElement("template");et.innerHTML=Qt;function tt(){return et.content.cloneNode(!0)}var Se=class extends HTMLElement{static get observedAttributes(){return["path","agent","csrf","height","expanded","disabled","prompt","placeholder"]}constructor(){super(),this.attachShadow({mode:"open"}).append(tt())}connectedCallback(){let e=this.path||(this.agent?`agents/${this.agent}`:""),n=this.headers(),r=_e({path:e,headers:n});this.console=Je({host:this,root:this.shadowRoot.querySelector(".ac-console"),http:r,path:e,headers:n,renderer:Ze(),labels:this.labels,panels:this.panels}),this.applyHeight(this.getAttribute("height")),this.applyPrompt(this.getAttribute("prompt")),this.applyPlaceholder(this.getAttribute("placeholder")),this.observePlaceholder(),this.disabled||this.focus()}attributeChangedCallback(e,n,r){e==="height"&&this.applyHeight(r),e==="prompt"&&this.applyPrompt(r),e==="placeholder"&&this.applyPlaceholder(r),e==="expanded"&&this.applyExpanded(r!==null)}applyExpanded(e){let n=this.shadowRoot?.querySelector(".ac-console");n&&n.classList.toggle("is-expanded",e)}applyPrompt(e){let n=this.shadowRoot?.querySelector(".ac-prompt-sign")||this.shadowRoot?.querySelector(".ac-prompt");n&&(n.textContent=e||"$")}applyPlaceholder(e){let n=this.shadowRoot?.querySelector(".ac-input");n&&(n.placeholder=e||"Ask\u2026")}applyHeight(e){let n=this.shadowRoot?.querySelector(".ac-console");if(!n)return;if(e){n.style.setProperty("--ac-height",e);return}n.style.removeProperty("--ac-height");let r=this.height();r>0&&n.style.setProperty("--ac-height",`${r}px`)}height(){let e=this.shadowRoot.querySelector(".ac-console"),n=this.shadowRoot.querySelector(".ac-placeholder"),r=this.shadowRoot.querySelector(".ac-loading"),a=this.shadowRoot.querySelector(".ac-last-message"),s=[n.hidden,r.hidden,a.hidden];n.hidden=!1,r.hidden=!0,a.hidden=!0;let i=e.offsetHeight;return[n,r,a].forEach((o,c)=>{o.hidden=s[c]}),i}observePlaceholder(){let e=this.shadowRoot,n=e?.querySelector(".ac-placeholder"),r=e?.querySelector(".ac-answer");if(!n||!r)return;let a=()=>!this.hasAttribute("height")&&!n.hidden&&r.childNodes.length===0;"ResizeObserver"in window&&(this.observer?.disconnect(),this.observer=new ResizeObserver(()=>{a()&&this.applyHeight()}),this.observer.observe(n)),document.fonts?.ready.then(()=>{a()&&this.applyHeight()})}disconnectedCallback(){this.observer?.disconnect(),this.observer=void 0}get path(){return this.getAttribute("path")||""}set path(e){this.setAttribute("path",e)}get agent(){return this.getAttribute("agent")||""}set agent(e){this.setAttribute("agent",e)}get prompt(){return this.getAttribute("prompt")||"$"}set prompt(e){this.setAttribute("prompt",e)}get placeholder(){return this.getAttribute("placeholder")||"Ask\u2026"}set placeholder(e){this.setAttribute("placeholder",e)}get disabled(){return this.hasAttribute("disabled")}set disabled(e){e?this.setAttribute("disabled",""):this.removeAttribute("disabled")}reset(){this.console.reset()}focus(){this.console.focus()}talk(e){this.console.talk(e)}clear(){this.console.clear()}headers(){let e=this.getAttribute("csrf")||"auto";if(e==="none")return{};let n=e==="auto"?document.querySelector('meta[name="_csrf"]')?.content:e;return n?{"X-CSRF-Token":n}:{}}get labels(){return this._labels||{}}set labels(e){this._labels=e||{}}get panels(){return this._panels||[]}set panels(e){this._panels=e||[],this.console&&this.console.setPanels(this._panels)}},Ae=class extends HTMLElement{get label(){return this.getAttribute("label")||""}set label(e){this.setAttribute("label",e)}get src(){return this.getAttribute("src")||""}set src(e){this.setAttribute("src",e)}panel(){let e=this.querySelector('[slot="aside"]'),n=[...this.children].filter(r=>r!==e);return{label:this.label,badge:this.getAttribute("badge")||"",icon:this.getAttribute("icon")||"dot",aside:e||null,content:n.length?n:null,html:this.hasAttribute("html"),load:async()=>{if(!this.src)return this.hasAttribute("html")?"":[];let r=await fetch(this.src);return this.hasAttribute("html")?await r.text():await r.json()}}}};customElements.get("agent-console")||customElements.define("agent-console",Se);customElements.get("agent-panel")||customElements.define("agent-panel",Ae);})();
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
