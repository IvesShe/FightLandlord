const socket = require('socket.io')
const config = require("./config.json")
const app = socket('3000')
const mydb = require('./utility/db')
const playerController = require('./game/player')
mydb.connect(config.mysqlConfig);
// mydb.checkPlayer('100000', function(err, cb) {

// });
// mydb.insertPlayerInfo({
//     unique_id: '100000',
//     uid: '1200000',
//     nick_name: '小明',
//     avatar_url: 'baidu.com',
//     hourse_card_count: 5
// });

mydb.updataPlayerInfo('unique_id', '100000', {
    nick_name: 'ChiChi',
    avatar_url: 'chichi.com',

});

app.on('connection', function(socket) {
    console.log('a user connected');
    socket.emit('welcome', 'hello world');

    //監聽login事件
    //socket.on('login', function(res) {
    socket.on('notify', function(res) {
        //輸出所收到的data
        console.log('一個玩家登入!');
        console.log('a user login = ' + JSON.stringify(res));
        let notifyData = res.data;
        let callbackIndex = res.callbackIndex;
        let msg = res.msg;
        switch (msg) {
            case 'login':
                mydb.checkPlayer(notifyData.uniqueID, function(err, data) {
                    if (err) {
                        console.log('err = ' + err);
                    } else {
                        if (data.length === 0) {
                            //不存在這個玩家
                            console.log('不存在這個玩家');
                            let uid = '1';
                            for (let i = 0; i < 7; i++) {
                                uid += Math.floor(Math.random() * 10);
                            }
                            // res.uid = uid;
                            // res.hourseCardCount = 5;
                            mydb.insertPlayerInfo({
                                unique_id: notifyData.uniqueID,
                                uid: uid,
                                nick_name: notifyData.nickName,
                                avatar_url: notifyData.avatarUrl,
                                hourse_card_count: 5
                            });
                            playerController.createPlayer(socket, {
                                uid: uid,
                                nickName: notifyData.nickName,
                                avatarUrl: notifyData.avatarUrl,
                                houseCardCount: 5,
                                callBackIndex: callbackIndex
                            });
                        } else {
                            //存在這個玩家
                            nsole.log('玩家存在');
                            mydb.updatePlayerInfo('unique_id', notifyData.uniqueID, {
                                nick_name: notifyData.nickName,
                                avatar_url: notifyData.avatarUrl
                            })
                            playerController.createPlayer(socket, {
                                uid: data[0].uid,
                                nickName: notifyData.nickName,
                                avatarUrl: notifyData.avatarUrl,
                                houseCardCount: data[0].house_card_count,
                                callBackIndex: callbackIndex
                            });
                        }
                    }
                })
                break;

            default:
                break;
        }

    })
})

console.log('liste* 3000');