import { NFTGenerativeTraitBase } from './NFTGenerativeTraitBase.js';

/** NFTGenerativeTraitValueOption lists possible values for the generative attribute */
export interface NFTGenerativeTraitImageOption {
    /** Value */
    readonly value: string;
    /** Base64 encoded Image, image is blank if undefined */
    readonly image?: string;
    /** Image URL, image is blank if undefined */
    readonly image_url?: string;
}
/** NFTGenerativeTraitImage describes a generative attribute from a set of choices */
export interface NFTGenerativeTraitImage extends NFTGenerativeTraitBase {
    /** Trait Abi */
    readonly abi?: 'uint8' | 'uint16';
    /** This is what the data encodes. Usually, will refer to items in options array */
    readonly type: 'image';
    /** File type */
    readonly image_type: 'png' | 'svg';

    /** Generative attribute value options */
    options: NFTGenerativeTraitImageOption[];
}

export function isNFTGenerativeTraitImage(attribute: NFTGenerativeTraitBase): attribute is NFTGenerativeTraitImage {
    return attribute.type === 'image';
}
