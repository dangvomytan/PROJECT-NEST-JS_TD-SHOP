import { AdminEntity } from "src/adminModule/database/Admin.Entity";
import { CartItemEntity } from "src/cartItemModule/database/CartItem.Entity";
import { CategoryEntity } from "src/categoryModule/database/category.entity"
import { OrderItemEntity } from "src/orderItemModule/database/OrderItem.Entity";
import { OrderEntity } from "src/orderModule/database/Order.Entity";
import { ProductEntity } from "src/productModule/database/Product.Entity"
import { UserEntity } from "src/userModule/database/User.Entity";
import { VersionEntity } from "src/versionModule/database/Version.Entity";
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

require('dotenv').config()

export const config:MysqlConnectionOptions={
    type:  'mysql',
    host: process.env.DB_HOST  || 'localhost',
    port:Number(process.env.DB_PORT)  ||  8000,
    username: process.env.DB_USER  || 'root', 
    password: process.env.DB_PASS  || 'root', 
    database: process.env.DB_NAME  ||  'nest-js', 
    entities: [
      ProductEntity,
      CategoryEntity,
      VersionEntity,
      UserEntity,
      CartItemEntity,
      OrderEntity,
      OrderItemEntity,
      AdminEntity    
    ],
    synchronize: true
  }