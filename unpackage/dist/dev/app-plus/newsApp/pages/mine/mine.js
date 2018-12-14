
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead([[2,1],".",[1],"uni-product-title { text-align: center; font-size: ",[0,30],"; font-weight: 700; color: #007AFF; }\n.",[1],"nullImg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 10; }\n",],undefined,{path:"./pages/mine/mine.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/mine/mine.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      