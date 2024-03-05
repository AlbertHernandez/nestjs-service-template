import { Inject, Injectable } from '@nestjs/common';
import { CreateTestProductDto } from './dto/create-test-product.dto';
import { UpdateTestProductDto } from './dto/update-test-product.dto';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { sleepTest } from './helpers/sleepFunction';

@Injectable()
export class TestProductService {

  constructor(
    // Paso necesario para el uso de cache.
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  create(createTestProductDto: CreateTestProductDto) {
    return 'Esta acción agrega un nuevo testProduct';
  }

  async latency() {
    const key = 'UsersfindAll';

    const usersCache = await this.cacheManager.get(key);

    if (usersCache) {
      return usersCache;
    }

    const users = [
      { name: 'user1', age: 25 },
      { name: 'user2', age: 30 },
      { name: 'user3', age: 28 }
    ];

    await sleepTest();

    await this.cacheManager.set(key, users, 1000 * 10);


    return users;
  }

  findOne(id: number) {
    return `Esta acción devuelve un testProduct #${id}`;
  }

  update(id: number, updateTestProductDto: UpdateTestProductDto) {
    return `Esta acción actualiza un testProduct #${id}`;
  }

  remove(id: number) {
    return `Esta acción elimina un testProduct #${id}`;
  }
}
