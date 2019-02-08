export as namespace widont;

export = widont;

declare function widont(
  str: String,
  replacements?: widont.Replacements,
) : String;

declare namespace widont {
  interface ReplacementsObj {
    space: String;
    hyphen: String;
  }

  type Replacements = ReplacementsObj | 'unicode' | 'html' | 'ascii';
}
