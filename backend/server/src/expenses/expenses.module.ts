import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { AccountingModule } from '../accounting/accounting.module';

@Module({
  imports: [TypeOrmModule.forFeature([Expense]), AccountingModule],
  controllers: [ExpensesController],
  providers: [ExpensesService],
  exports: [ExpensesService, TypeOrmModule],
})
export class ExpensesModule {}
