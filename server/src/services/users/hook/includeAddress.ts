import isNill from 'lodash/isNil';
import { Op } from '@sequelize/core';

const addressToString = (address) => {
  if (isNill(address)) return '';
  const str = `${address.Street.type} ${address.Street.name}, ${address.City.name}, ${address.State.name}, ${address.Country.name}`;
  return str;
};

const setUserAddress = (result, addressString) => {
  if (result.id) return { ...result, addressString };
  if (result.data) {
    const { data } = result;
    if (Array.isArray(data)) {
      data.forEach((entity) => {
        // eslint-disable-next-line no-param-reassign
        entity.addressString = addressString;
      });
    } else {
      data.addressString = addressString;
    }
    return { ...result, data };
  }
  return null;
};
const getUserIds = (result) => {
  if (result.id) return [result.id];
  if (result.data) {
    const { data } = result;
    const userIds = [];
    if (Array.isArray(data)) {
      data.forEach((entity) => {
        userIds.push(entity.id);
      });
    } else {
      userIds.push(data.id);
    }
    return userIds;
  }
  return [];
};
export default async (context) => {
  const { result, app } = context;
  if (result.address) return context;

  const { EntityAddress, Address, Street, City, State, Country } =
    app.get('sequelizeClient').models;

  const userIds = getUserIds(result);
  const attributes = ['name'];
  const addresses = await EntityAddress.findAll({
    where: { UserId: { [Op.in]: userIds } },
    include: [
      {
        model: Address,
        include: [
          { model: City, attributes },
          { model: State, attributes },
          { model: Street, attributes: [...attributes, 'type'] },
          { model: Country, attributes },
        ],
      },
    ],
  });
  if (Address) {
    // addresses.forEach((address) => {
    //   console.log('found addresses', address.Address);
    // });
  }

  addresses?.forEach((foundAddress) => {
    if (foundAddress) {
      const addressString = addressToString(foundAddress?.Address);
      context.result.address = addressString;
      const modRes = setUserAddress(context.result, addressString);
      if (modRes) context.result = modRes;
    }
  });
  return context;
};
