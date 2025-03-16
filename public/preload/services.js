
// 通过 window 对象向渲染进程注入 nodejs 能力
const Traceroute = require('nodejs-traceroute');

window.services = {
  Traceroute: Traceroute,
}

// 替换能力
window.open = function(url){
  utools.shellOpenExternal(url)
}

utools.onPluginEnter((action) => {
  console.log('onPluginEnter', action);
  if (!action.code || action.code === 'open'){
    return
  }
  if (action.type === 'text'){
    location.hash = '#' + action.code
  }else{
    location.hash = '#' + action.code + '?search=' + action.payload
  }
})



