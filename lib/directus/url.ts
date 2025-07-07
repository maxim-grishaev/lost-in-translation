export const getDirectusCollectionURL = (collectionKey: string) =>
  `https://directus.altura.io/items/${collectionKey}`;

export const DIRECTUS_URL_LANG = getDirectusCollectionURL('languages');
export const DIRECTUS_URL_TR_KEYS = getDirectusCollectionURL('translationKeys');
