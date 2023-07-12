import { Controller, Body, Param, Put } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Put(':id')
  findOne(@Param('id') id: string, @Body() dto: UpdateStockDto) {
    return this.stocksService.updateStockProduct(id, dto.quantity);
  }
}
