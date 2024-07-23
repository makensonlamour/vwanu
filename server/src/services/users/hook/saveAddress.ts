import { BadRequest } from '@feathersjs/errors';
import isAddressValid from '../../../lib/utils/isAddressValid';

export default async (context) => {
  const { data, result } = context;
  const { address } = data;
  if (!address) return context;

  if (!isAddressValid(address)) throw new BadRequest('Address is not valid');

  const {Address, EntityAddress } =
    context.app.get('sequelizeClient').models;

  // let streetId = null;
  // if (address.street && address.streetType) {
  //   [{ id: streetId }] = await Street.findOrCreate({
  //     where: {
  //       name: address.street,
  //       CityId: address.city,
  //       type: address.streetType,
  //     },
  //     defaults: {
  //       zipCode: address.zip,
  //       type: address.streetType,
  //     },
  //   });
  // }

  const [{ id: addressId }] = await Address.findOrCreate({
    where: {
      StateId: address.state,
      // StreetId: streetId,
      CityId: address.city,
      CountryId: address.country,
    },
  });

  const { id: userId } = result;

  await EntityAddress.findOrCreate({
    where: {
      UserId: userId,
      AddressTypeId: address.addressType,
      AddressId: addressId,
    },
    defaults: {},
  });

  return context;
};
