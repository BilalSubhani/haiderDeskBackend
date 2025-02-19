import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderStatus } from './schema/orders.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(createOrderDto: CreateOrderDto): Promise<{ message: string }> {
    const { username, userPhone, userEmail, paymentMethod, totalPrice, logos } =
      createOrderDto;

    const validatedLogos = logos.map((logo) => new Types.ObjectId(logo));

    const newOrder = new this.orderModel({
      username,
      userPhone,
      userEmail,
      paymentMethod,
      totalPrice,
      status: OrderStatus.Processing,
      logos: validatedLogos,
    });

    try {
      await newOrder.save();
      return { message: 'Order created successfully' };
    } catch (error) {
      throw new BadRequestException('Error creating order');
    }
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().populate('logos').exec();
  }

  async findOne(id: string): Promise<Order> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    const order = await this.orderModel.findById(id).populate('logos').exec();
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async updateStatus(id: string, status: string): Promise<{ message: string }> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    if (!Object.values(OrderStatus).includes(status as OrderStatus)) {
      throw new BadRequestException('Invalid status value');
    }

    const updatedOrder = await this.orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    if (!updatedOrder) {
      throw new NotFoundException('Order not found');
    }
    return { message: 'Status updated successfully' };
  }

  async remove(id: string): Promise<{ message: string }> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    const result = await this.orderModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Order not found');
    }
    return { message: 'Order deleted successfully' };
  }
}
