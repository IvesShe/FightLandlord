//玩家類
const Player = function(socket, data) {
    let that = {};
    let _socket = socket;
    let _uid = data.uid;
    let _nickName = data.nickName;
    let _avatarUrl = data.avatarUrl;
    let _house_card_count = data._house_card_count;
    let _callBackIndex = data.callBackIndex;
    console.log("登入提示:");
    console.log(data);
    //_socket.emit('login', 'welcome');
    // _socket.emit('notify', { msg: 'login', callBackIndex: _callBackIndex, data: 'welcome111' });
    _socket.emit('notify', { msg: 'login', call: 'eeee', data: 'welcome111' });
    //const notify = function(msg, index, data, ) {
    ///_socket.emit('notify', { msg: msg, callBackIndex: index, data: data });
    //};
    return that;
}

let _playerList = [];
exports.createPlayer = function(socket, data) { //創建新玩家\
    console.log("創建新玩家:")
    console.log('create player = ' + JSON.stringify(data));
    let player = Player(socket, data);
    _playerList.push(player);
}