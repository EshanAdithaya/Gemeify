import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GemsService } from './gems.service';
import { GemsController } from './gems.controller';
import { Gem } from './entities/gem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gem])],
  controllers: [GemsController],
  providers: [GemsService],
  exports: [GemsService],
})
export class GemsModule {}