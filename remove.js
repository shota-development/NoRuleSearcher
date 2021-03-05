//ルールカードの状態保持
let status = ''

//ボタン定義
const button = document.createElement('button')
button.textContent = 'ON/OFF'
button.addEventListener('click', changeStatus)
Object.assign(
  button.style,
  {
    'position': 'fixed',
    'bottom': '28px',
    'right': '20px',
    'z-index': '1000',
    'background-color': '#eb3483',
    'font-size': '2em',
    'border-radius': '10px'
  }
)
//ボタン設置
document.body.appendChild(button)

//除外関数
function listRemove() {
  //remove
  [...document.querySelectorAll(".SearchResultList-box li")].forEach(li => {
    if (["EX", "GX", "V", "プリズムスター"].some(k => li.querySelector("img")?.getAttribute("alt").includes(k))) li.style.display = status
  })
}

//監視関数
function changeCheck() {
  //監視対象の要素オブジェクト
  const target = document.getElementById('SearchResultListArea')
  //監視時のオプション
  const config = {
    attributes: true,
    childList: true,
    //characterData: true,
    //attributeFilter: ["id"],
    subtree:	true
  };
  //要素の変化監視をスタート
  observer.observe(target, config);
}

//リストが更新されたときに除外関数を実行
var observer = new MutationObserver(function(){
  listRemove()
});

//ルールカードの状態が更新されたときに除外関数を実行
function changeStatus() {
  if(status === 'list-item'){
    status = 'none'
  }else {
    status = 'list-item'
  }
  listRemove()
}

//起動時の初期化
window.onload = function(){
  status = 'list-item'
  listRemove()
  changeCheck()
}
