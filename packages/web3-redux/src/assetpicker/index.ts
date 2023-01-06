/**
 * Store sha-256 preimages queried with https://www.AssetPicker.directory/
 * to be used for identifying Event & Function signatures.
 * @module AssetPicker
 *
 */

import { AssetPickerCRUD as CRUDModel } from './crud.js';
import * as Hooks from './hooks/index.js';
import { rootSaga } from './sagas/index.js';
export type { Asset } from './model/index.js'

export const AssetPicker = {
    name: CRUDModel.name,
    actions: {
        ...CRUDModel.actions,
    },
    actionTypes: CRUDModel.actionTypes,
    db: CRUDModel.db,
    hooks: {
        ...CRUDModel.hooks,
        useAssetPicker: Hooks.useAssetPicker,
    },
    sagas: {
        ...CRUDModel.sagas,
        rootSaga,
    },
    selectors: CRUDModel.selectors,
    isAction: CRUDModel.isAction,
    reducer: CRUDModel.reducer,
    validate: CRUDModel.validate,
    validateId: CRUDModel.validateId,
    hydrate: CRUDModel.hydrate,
    encode: CRUDModel.encode,
};

export default AssetPicker;
