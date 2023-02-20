export as namespace widont;

export = widont;

declare function widont(
  str: string,
  replacements?: widont.Replacements,
): string;

declare namespace widont {
  interface ReplacementsObj {
    space: string;
    hyphen: string;
  }

  type Replacements = ReplacementsObj | 'unicode' | 'html' | 'ascii';
}
