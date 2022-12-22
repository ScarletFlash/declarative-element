import type { Node } from "./declarations/node.interface";
import { ElementTree } from "./element-tree.class";

describe("element-tree.class.ts", () => {
  describe("ElementTree.getElement", () => {
    it("should handle root text nodes without any tag", () => {
      const rootNode: Node.Text = {
        innerText: "node without any tag",
      };

      const resultDomEntry: HTMLElement | Text =
        ElementTree.getElement(rootNode);
      expect(resultDomEntry).toBeInstanceOf(Text);
      expect(resultDomEntry.data).toBe(rootNode.innerText);
    });

    it("should handle root text nodes with tag", () => {
      const rootNode: Node.TextWithTag = {
        innerText: "node with tag",
        tagName: "p",
      };

      const resultDomEntry: HTMLElement | Text =
        ElementTree.getElement(rootNode);
      expect(resultDomEntry).toBeInstanceOf(HTMLElement);
      expect(resultDomEntry.innerText).toBe(rootNode.innerText);
      expect(resultDomEntry.tagName.toLowerCase()).toBe(
        rootNode.tagName.toLowerCase()
      );
    });

    it("should throw error if node type is unsupported", () => {
      expect(() => ElementTree.getElement(Object.create({}))).toThrowError();
    });
  });
});
