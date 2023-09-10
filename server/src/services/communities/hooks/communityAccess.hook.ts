import { queryClause, communityQuery } from '../utils';
import serviceQuery from '../../../lib/utils/serviceQuery';

export default serviceQuery(queryClause, communityQuery);
