import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Data } from './schemas/data.schema';
import { TransformedData } from './interfaces';

@Injectable()
export class DataService {
  constructor(@InjectModel(Data.name) private dataModel: Model<Data>) {}

  async saveData(data: TransformedData): Promise<Data> {
    const createdData = new this.dataModel(data);
    return createdData.save();
  }

  async getData(): Promise<Data> {
    return this.dataModel.findOne().exec();
  }
}
