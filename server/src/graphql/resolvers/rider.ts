import { withFilter } from 'apollo-server-express';
import { Rider } from '../../services';

import DriverRepository from '../../repositories/driver';
import { DRIVER_RESPONDED, CALL_REQUESTED } from '../subscriptions';

interface LoginPayload{
  email:string;
  password:string;
}

interface createRiderArgs {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
}

interface Position {
  lat: number
  lng: number
}

interface riderPublishInfo {
  riderId: string
  riderEmail: string
  riderName: string
  riderPos: Position
  driverIds: string[]
  pickUpPos: Position
  pickUpAddress: string
  destinationPos: Position
  destinationAddress: string
  tripStatus: string
}

interface DriverCallArgs {
  riderPublishInfo: riderPublishInfo
}

export default {
  Query: {
    async rider(parent: any, args: { email: string }, context: any, info: any) {
      return await Rider.getRiderInfo({ email: args.email });
    },
  },
  Mutation: {
    async loginRider(_: any, payload:LoginPayload, context) {
      return await Rider.login(context, payload);
    },
    async createRider (parent: any, payload: createRiderArgs, context: any) {
      return await Rider.signup(payload);
    },
    async driverCall(parent:any, args: DriverCallArgs, { req, pubsub }:any) {
      const driverIds = await DriverRepository.findAllByDistance(args.riderPublishInfo.riderPos);

      args.riderPublishInfo = {
        ...args.riderPublishInfo,
        driverIds: driverIds.map(v => v.toString()),
        riderId: req.user.data._id,
        riderEmail: req.user.data.email,
        riderName: req.user.data.name,
      };

      pubsub.publish(CALL_REQUESTED, { driverListen: args });
      return args;
    },
  },
  Subscription: {
    driverResponded: {
      subscribe: withFilter((parent, args, context) => {
        return context.pubsub.asyncIterator([DRIVER_RESPONDED]);
      },
      (payload, variables, context) => {
        return payload.driverResponded.riderId === context.data.currentUser.data._id.toString();
      },
      ),
    },
  },
};
