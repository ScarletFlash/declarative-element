export namespace Node {
  export interface WithTag {
    elementTag: string;
    attributes?: Record<string, string>;
  }

  export interface WithChildren extends WithTag {
    children: Node.Any[];
  }

  export interface Text {
    innerText: string;
  }

  export interface TextWithTag extends WithTag, Text {}

  export type Any = WithTag | WithChildren | Text | TextWithTag;
}
