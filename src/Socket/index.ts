
// socket-io
import io from 'socket.io-client'
import DataManager from '../Runtime/DataManager';
import EventManager from '../Runtime/EventManager';
import { EVENT_ENUM } from '../Enum';
import { game } from '../index';
import Battle from '../Scenes/Battle/index';
import MenuScene from '../Scenes/Menu';

interface ActionType {
  type: number
  text?: string
  name?: string
  actionType?: string
  socketId?: string
  
}

export  const operationObj = {
  socketId:''
}

function renderMsg({ type, text, name }: ActionType) {
  const child = $('#msg-list').children('.msg')
  const len = child.length
  if (len > 9) {
    // 移除第一条
    $('#msg-list').children('.msg:first').remove();
  } 
  const el = '<p class="msg">'+name+'：'+text+'</p>'
  $('#msg-list').append(el)
}

// 触发相应的动作
function actionType({ type, text, name, actionType, socketId }: ActionType) {
  console.log({ fun: 'actionType', type, text, name ,actionType, socketId})
  renderMsg({ type, text, name })
  switch (type) {
    // 开始游戏
    case 1001:
      DataManager.Instance.fm.fadeIn(300).then(() => {
        game.scene.destroy();
        game.loadScene({
          scene: Battle(),
        });
      });
      break;
    // 暂停
    case 1002:
      break;
    // 退出游戏
    case 1003:
      game.scene.destroy();
      game.loadScene({
        scene: MenuScene(),
      });
      break;
    // 继续游戏
    case 1004:
      EventManager.Instance.emit(EVENT_ENUM.RESTART_LEVEL);
      break;
    // 回退上一步
    case 1005:
      EventManager.Instance.emit(EVENT_ENUM.REVOKE_STEP);
      break;
    // 控制人物动作
    case 2001:
    case 2002:
    case 2003:
    case 2004:
    case 2005:
    case 2006:
      EventManager.Instance.emit(EVENT_ENUM.PLAYER_CTRL, {type:actionType, socketId});
      break;
    default:
      break;
  }
 
}

// 创建websocket通信，触发相应的动作。
const socket = io('http://localhost:7000',{
  path: '/socket/game'
})
// ws链接成功
socket.on('connect', () => {
  console.log('connect',socket.id); 
  // socket.emit('data', 'world222222');
});
// 断开链接
socket.on('disconnect', reason => {
  console.log('disconnect',reason); // undefined
});
// 事件订阅
socket.on('data', data => {
  console.log('data', data)
  actionType(data)
});
// 游戏数据更新
socket.on('game-data', data => {
  console.log('game-data', data)
  let el = ''
  const list: any[] = []
  Object.keys(data.onLineUsers).forEach(key => {
    list.push({
      ...data.onLineUsers[key],
      id: key
})
  })
  list.sort((a, b) => {
    return b.count - a.count
  }).forEach((item, index) => {
    el+= '<p class="msg">'+(index+1)+'. '+item.name+'-'+item.id.slice(0,4)+'：'+item.count+'</p>'
  })
  $('#rank-list').empty()
  $('#rank-list').append(el)
  $('#count').text(list.length)
});

// 异常重试
socket.on('connect_error', () => {
  setTimeout(() => {
    socket.connect();
  }, 5000);
});

export function tapAction(data: any) {
  socket.emit('data', data);
}

export function tapScore(data: any) {
  socket.emit('score', data);
}

export function socketInit() {
  console.log('int socket')
}
