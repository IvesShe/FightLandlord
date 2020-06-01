# 鬥地主(Cocos Creator + Node.js + MySQL)(開發中)

## Client端
[鬥地主](https://ivesshe.github.io/FightLandlord/)
<center class="half">
    <img src="https://github.com/IvesShe/CocosCreatorDemo/blob/master/image/FightLandlord/S__38658051.jpg?raw=true" width="600"/>
</center>

## SERVER端
<center class="half">
    <img src="https://github.com/IvesShe/CocosCreatorDemo/blob/master/image/FightLandlord/1588827127500.jpg?raw=true" width="800"/>
</center>

```node
//init時，entry point請輸入app.js
npm init
npm install socket.io --save
npm install mysql --save
```

## 數據庫端
<center class="half">
    <img src="https://github.com/IvesShe/CocosCreatorDemo/blob/master/image/FightLandlord/1588827229042.jpg?raw=true" width="700"/>
</center>

需安裝MySQL Workbench，並如下操作
```sql
create database fightlandlord;
```
```sql
show databases;
```
```sql
use fightlandlord;
```
```sql
show tables;
```
```sql
create table t_playerinfo(unique_id varchar(50),uid varchar(10),nick_name varchar(20),avatar_url varchar(255),hourse_card_count int);
```
```sql
show tables;
```
```sql
desc t_playerinfo;
```
