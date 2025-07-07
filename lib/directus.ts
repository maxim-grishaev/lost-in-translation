import type { DirectusTranslation, TranslationValue } from './types';

const API_URL = 'https://directus.altura.io/items/translationKeys';
const FIELDS =
  'key,updatedAt,variables,translations.id,translations.value,translations.languages_code';

export type FoundKey = Pick<
  DirectusTranslation,
  'key' | 'updatedAt' | 'variables'
> & {
  translations: Pick<TranslationValue, 'id' | 'value' | 'languages_code'>[];
};

export type KeysReqParams = {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
  sortBy?: string;
  sortReverse?: boolean;
};
export const getDirectusURLs = ({
  pageIndex,
  pageSize,
  search,
  dateFrom,
  dateTo,
  sortBy,
  sortReverse,
}: KeysReqParams) => {
  const url = new URL(API_URL);
  url.searchParams.set('fields', FIELDS);
  if (pageSize) {
    url.searchParams.set('limit', pageSize.toString());
  }
  if (pageIndex) {
    url.searchParams.set('page', (pageIndex + 1).toString());
  }
  if (search) {
    url.searchParams.set('search', search);
  }
  if (dateFrom) {
    url.searchParams.set('filter[updatedAt][_gte]', dateFrom.toISOString());
  }
  if (dateTo) {
    url.searchParams.set('filter[updatedAt][_lte]', dateTo.toISOString());
  }
  if (sortBy) {
    url.searchParams.set('sort', [sortReverse ? '-' : '', sortBy].join(''));
  }

  const itemsURL = url.toString();

  url.searchParams.delete('limit');
  url.searchParams.delete('page');
  url.searchParams.set('aggregate[count]', '*');
  const countURL = url.toString();

  return {
    countURL,
    itemsURL,
  };
};
