import upperFirst from 'lodash.upperfirst';
import camelCase from 'lodash.camelcase';
import { ThemePrefixType, ThemeTypeUpperCase } from '../templates/types';
import { pipe } from 'ramda';

export interface IdentifierMeta {
  name: string;
  themeSuffix?: ThemeTypeUpperCase;
  themePrefix?: ThemePrefixType;
}

export interface GetIdentifierType {
  (meta: IdentifierMeta): string;
}

export const getIdentifier: GetIdentifierType = pipe(
  ({ name, themeSuffix, themePrefix }: IdentifierMeta) =>
    [themePrefix, name, themeSuffix].filter(Boolean).join('-'),
  camelCase,
  upperFirst
);
