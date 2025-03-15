const fs = require('node:fs')
const path = require('node:path')

// 通过 window 对象向渲染进程注入 nodejs 能力
window.services = {

}
window.open = function(url){
  utools.shellOpenExternal(url)
}
utools.onPluginEnter((action) => {
  console.log('onPluginEnter', action);
  if (!action.code || action.code === 'open'){
    return
  }
  location.hash = '#' + action.code
})
