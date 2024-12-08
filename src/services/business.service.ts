import BusinessRepository from '../repositories/business.repository';
import { IBusiness } from '../models/business.model';
import AppError, { ErrorConstants } from '../classes/AppError';
import {
  IBusinessResponseDTO,
  toBusinessResponse,
} from '../classes/dtos/business.dto';
import mongoose from 'mongoose';
import businessRepository from '../repositories/business.repository';

class BusinessService {
  async get(): Promise<IBusinessResponseDTO[]> {
    const businesses: IBusiness[] | null = await BusinessRepository.find();
    return businesses.map(toBusinessResponse);
  }

  async getById(id: string): Promise<IBusinessResponseDTO> {
    if (!id) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(ErrorConstants.NOT_FOUND);
    const business: IBusiness | null = await BusinessRepository.findById(id);
    if (!business) throw new AppError(ErrorConstants.NOT_FOUND);
    return toBusinessResponse(business);
  }
  async getManagerIDById(id: string): Promise<string> {
    if (!id) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(ErrorConstants.NOT_FOUND);
    const business: IBusiness | null = await businessRepository.findById(id);
    if (!business) throw new AppError(ErrorConstants.NOT_FOUND);
    return business.managerId;
  }

  async create(
    data: IBusinessResponseDTO,
    managerId: string
  ): Promise<IBusiness> {
    const { name, description, address, email } = data;
    if (!name || !description || !email || !address)
      throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    const businesstoCreate: Partial<IBusiness> = {
      name: data.name,
      email: data.email,
      description: data.description,
      address: data.address,
      managerId: managerId,
      telephone: data.telephone || null,
    };
    return await BusinessRepository.create(businesstoCreate);
  }

  async update(
    id: string,
    updates: Partial<IBusinessResponseDTO>
  ): Promise<IBusinessResponseDTO> {
    if (!id) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(ErrorConstants.NOT_FOUND);
    const business = await BusinessRepository.findById(id);
    if (!business) throw new AppError(ErrorConstants.NOT_FOUND);
    const res: IBusiness = await BusinessRepository.updateById(id, updates);
    return toBusinessResponse(res);
  }

  async delete(id: string): Promise<void> {
    if (!id) throw new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS);
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(ErrorConstants.NOT_FOUND);
    const business = await BusinessRepository.findById(id);
    if (!business) throw new AppError(ErrorConstants.NOT_FOUND);
    await BusinessRepository.deleteById(id);
    //TODO:  add status parameter
  }
}

export default new BusinessService();
