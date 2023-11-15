export as namespace widont;

export = widont;

declare function widont(
  /** String to modify */
  str: string,
  /** Replacements */
  replacements?: widont.Replacements,
  /** Minimum number of words in string before modifying it (default = 3) */
  minWords?: number
): string;

declare namespace widont {
  interface ReplacementsObj {
    /** Space character to potentially insert */
    space: string;
    /** Soft-hyphen character to potentially insert */
    hyphen: string;
  }

  type Replacements = ReplacementsObj | 'unicode' | 'html' | 'ascii';
}
