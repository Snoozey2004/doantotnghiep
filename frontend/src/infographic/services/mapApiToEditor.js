export function mapApiToEditor(infographic) {
  if (!infographic || !infographic.blocks) return [];
  
  return infographic.blocks.map((block) => ({
    id: block.id,
    layoutType: block.layoutType,
    blockType: block.blockType,
    name: block.layoutType,
    isVisible: block.isVisible,
    sortOrder: block.sortOrder,
    data: block.dataJson ? JSON.parse(block.dataJson) : {}
  }));
}
