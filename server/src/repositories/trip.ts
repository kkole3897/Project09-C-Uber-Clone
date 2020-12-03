import { Trip, Rider } from '../models';

interface PlaceInterface {
  address: string;
  latitude: number;
  longitude: number;
}

export default {
  create: async (payload) => {
    return await Trip.create(payload);
  },
  findOneStatus: async (id) => {
    return await Trip.findById(id, 'status');
  },
  updateStatus: async(id, status) => {
    return await Trip.findByIdAndUpdate(id, { status });
  },
  open: async (
    riderEmail: string,
    origin: PlaceInterface,
    destination: PlaceInterface,
    startTime: Date,
    distance?: number) => {
    const fields = '_id email name';
    const rider = await Rider.findOne({ email: riderEmail }, fields).exec();
    if (rider) {
      return await Trip.create({ rider, origin, destination, startTime, distance, status: 'open' });
    }
    return null;
  },
};
