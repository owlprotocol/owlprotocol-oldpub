import ContractCRUD from '../crud.js';
import { map, uniq, flatten, compact } from 'lodash-es';
/**
 * Get all contract tags
 */
export async function getTags(state: any, networkId: string | undefined) {
    if (!networkId) throw new Error('networkId undefined');

    const contracts = await ContractCRUD.db.all();
    const tags = compact(uniq(flatten(map(contracts, 'tags'))));
    return tags;
}

export default getTags;
