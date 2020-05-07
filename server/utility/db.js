//引用mysql庫
const mysql = require('mysql');


let client = undefined;
const query = function(sql, cb) {
    console.log('query = ' + sql);
    client.getConnection(function(err, connection) {
        if (err) {
            console.log('connection mysql err = ' + err);
            cb(err);
            throw err;
        } else {
            connection.query(sql, function(connerr, result, fileds) {
                if (connerr) {
                    console.log('query err = ' + connerr);
                    cb(connerr);
                } else {
                    cb(null, result);
                }
                connection.release();
            })
        }
    });
};


exports.connect = function(config) { //連接數據庫(僅建立池，但未實際連接)
    client = mysql.createPool(config);
};

exports.checkPlayer = function(uniqueID, cb) { //查找(取出)玩家數據    
    let sql = 'select * from t_playerinfo where unique_id = ' + uniqueID + ';';
    query(sql, function(err, data) {
        if (err) {
            console.log('err = ' + err);
        }
        console.log('check player = ' + JSON.stringify(data));
        cb(err, data);
    });
}

const insertSql = function(table, data) { //處理插入玩家數據SQL語句
    let sql = 'insert into ' + table;
    let valuesStr = ' values(';
    let keyStr = ' (';
    for (let i in data) {
        keyStr += i + ',';
        //判斷若不是字串的話，不用加雙括號
        if ((typeof data[i]).indexOf('string') === 0) {
            valuesStr += "'" + data[i] + "'" + ',';
        } else {
            valuesStr += data[i] + ',';
        }

    }
    //去除最後一個逗號
    keyStr = keyStr.substring(0, keyStr.length - 1);
    keyStr += ') ';
    valuesStr = valuesStr.substring(0, valuesStr.length - 1);
    valuesStr += ') ';
    sql += keyStr + valuesStr;
    return sql;

}
exports.insertPlayerInfo = function(data) { //插入玩家數據
    let sql = insertSql('t_playerinfo', data);
    console.log('sql = ' + sql);
    //let sql = 'insert into t_playerif (unique_id,uid,nick_name,hourse_card_count) values('+data.uniqueID+
    query(sql, function(err, res) {
        if (err) {
            console.log('insert player info err = ' + err);
        } else {
            console.log('res = ' + JSON.stringify(res));
        }
    });
}

const updataSql = function(tabel, mainKey, mainValue, data) { //處理更新玩家數據SQL語句
    // update t_playerinfo set nick_name = '琪琪' ,avatar_url = 'google.com' where unique_id = '100000';
    let sql = 'update ' + tabel + ' set '; // + mainKey + JSON.stringify(data);
    for (let i in data) {
        if ((typeof data[i]).indexOf('string') === 0) { //若是字符串時
            sql += i + '=' + "'" + data[i] + "'" + ',';
        } else { //若為整數時
            sql += i + '=' + data[i] + ',';
        }
    }
    sql = sql.substring(0, sql.length - 1);

    if ((typeof mainValue).indexOf('string') === 0) { //若是字符串時
        sql += ' where ' + mainKey + ' = ' + "'" + mainValue + "'" + ';';
    } else { //若為整數時
        sql += ' where ' + mainKey + ' = ' + mainValue + ';';
    }
    return sql;
}

exports.updataPlayerInfo = function(mainKey, mainValue, data) { //更新玩家數據
    let sql = updataSql('t_playerinfo', mainKey, mainValue, data);
    query(sql, function(err, data) {
        if (err) {
            console.log('updata player info err = ' + err);
        } else {
            console.log('updata player info success = ' + JSON.stringify(data));
        }
    })
}