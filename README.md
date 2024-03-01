## 部署须知

mysql版本：8.* 
nodejs版本：20.10.0 

解包后在根目录下手动添加 .env.local 文件 
并在文件中写入 

```
MYSQL_HOST="你的数据库接口地址"
MYSQL_PORT="你的数据库接口端口号"
MYSQL_USER="你的数据库用户名"
MYSQL_PASSWORD="你的数据库密码"
MYSQL_DATABASE="ups_db"
```

然后使用数据库软件执行ups_db.sql 

完毕后在根目录下执行  
```
npm install -g yarn 
npm install 
```

到此部署结束 

## 运行

根目录下执行 
```
yarn dev
```