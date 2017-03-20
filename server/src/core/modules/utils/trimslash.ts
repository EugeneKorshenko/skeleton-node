const TRIM_TRAILING_SLASH_REGEX: RegExp = /\/+$/;

export default function trimslash (str: string) {
  return str.replace(TRIM_TRAILING_SLASH_REGEX, '');
}
