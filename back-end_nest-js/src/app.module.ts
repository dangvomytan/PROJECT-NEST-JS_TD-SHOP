import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './categoryModule/category/category.Module';
import { ProductModule } from './productModule/product/product.Model';
import  {config } from '../orm.config';
import { VersionModule } from './versionModule/version/Version.Module';
import { UserModule } from './userModule/user/User.Module';
import { OrderModule } from './orderModule/order/Order.Module';
import { OrderItemModule } from './orderItemModule/orderItem/OrderItem.Module';
import { CartItemModule } from './cartItemModule/cartItem/CartItem.Module';
import { AdminModule } from './adminModule/admin/Admin.Module';


@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    // add module
    CategoryModule,
    ProductModule,
    VersionModule,
    UserModule,
    CartItemModule,
    OrderModule,
    OrderItemModule,
    AdminModule,
  ],
})
export class AppModule {}
