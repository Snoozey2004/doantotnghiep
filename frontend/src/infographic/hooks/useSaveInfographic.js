import { useState } from 'react';
import { productInfographicApi } from '../services/productInfographicApi';
const mapLayoutToBlockType = (layout) => {
  switch (layout) {
    case 'HeroBanner': return 'Hero';
    case 'Statistics': return 'Statistics';
    case 'Timeline': return 'Timeline';
    case 'FAQ': return 'FAQ';
    case 'CTA': return 'CTA';
    default: return 'Content';
  }
};

export function useSaveInfographic() {
  const [isSaving, setIsSaving] = useState(false);

  const saveInfographic = async (productId, infographicId, blocks, isPublished = false) => {
    setIsSaving(true);
    try {
      const dataToSave = {
        productId: productId || "00000000-0000-0000-0000-000000000000",
        blocks: blocks.map((block, index) => ({
          productInfographicId: infographicId || "00000000-0000-0000-0000-000000000000",
          layoutType: block.layoutType,
          blockType: block.blockType !== "Default" && block.blockType ? block.blockType : mapLayoutToBlockType(block.layoutType),
          sortOrder: index,
          isVisible: block.isVisible !== false,
          dataJson: JSON.stringify(block.data)
        }))
      };

      if (!infographicId) {
        // Create new
        const res = await productInfographicApi.create(dataToSave);
        infographicId = res.data.id;
      } else {
        // Update existing
        await productInfographicApi.update(infographicId, dataToSave);
      }
      
      // Update publish state
      await productInfographicApi.publish(infographicId, isPublished);
      
      return infographicId;
    } catch (error) {
      console.error("Save error:", error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  return { saveInfographic, isSaving };
}
