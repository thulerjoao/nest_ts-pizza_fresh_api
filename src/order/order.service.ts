import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { handleError } from 'src/utils/handleError';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateOrderDto) {
    const data: Prisma.OrderCreateInput = {
      user: {
        connect: {
          id: dto.userId,
        },
      },
      table: {
        connect: {
          number: dto.tableNumber,
        },
      },
      products: {
        connect: dto.products.map((productId) => ({
          id: productId,
        })),
      },
    };
    return this.prisma.order
      .create({
        data,
        select: {
          id: true,
          table: {
            select: {
              number: true,
            },
          },
          user: {
            select: {
              name: true,
            },
          },
          products: {
            select: {
              title: true,
            },
          },
        },
      })
      .catch(handleError);
  }

  async findAll() {
    return this.prisma.order.findMany({
      select:{
        id: true,
        table: {
          select: {
            number: true
          }
        },
        products: {
          select: {
            title: true,
          },
        },
        // _count: {
        //   select: {
        //     products: true
        //   }
        // },
      }
    }).catch(handleError)
  }

  async findOne(id: string) {
    return this.prisma.order.findUnique(
      { where: {id},
        select:{
          id: true,
          user:{
            select:{
              name: true
            }
          },
          table:{
            select:{
              number: true
            }
          },
          products:{
            select:{
              id: true,
              title: true,
              price: true,
              photo: true,
              description: true,
            }
          }
        }
      },
      ).catch(handleError)
  }
}
