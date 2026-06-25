import React from 'react';
import HeroBannerRenderer from './HeroBannerRenderer';
import TextOnlyRenderer from './TextOnlyRenderer';
import ImageLeftTextRightRenderer from './ImageLeftTextRightRenderer';
import ImageRightTextLeftRenderer from './ImageRightTextLeftRenderer';
import StatisticsRenderer from './StatisticsRenderer';
import TimelineRenderer from './TimelineRenderer';
import QuoteRenderer from './QuoteRenderer';
import FAQRenderer from './FAQRenderer';
import CTARenderer from './CTARenderer';
import GalleryRenderer from './GalleryRenderer';
import FeaturesGridRenderer from './FeaturesGridRenderer';
import VideoRenderer from './VideoRenderer';

export default function BlockRenderer({ block }) {
  if (!block || block.isVisible === false) return null;

  const { layoutType, data } = block;

  switch (layoutType) {
    case 'HeroBanner':
      return <HeroBannerRenderer data={data} />;
    case 'TextOnly':
      return <TextOnlyRenderer data={data} />;
    case 'ImageLeftTextRight':
      return <ImageLeftTextRightRenderer data={data} />;
    case 'ImageRightTextLeft':
      return <ImageRightTextLeftRenderer data={data} />;
    case 'Statistics':
      return <StatisticsRenderer data={data} />;
    case 'Timeline':
      return <TimelineRenderer data={data} />;
    case 'Quote':
      return <QuoteRenderer data={data} />;
    case 'FAQ':
      return <FAQRenderer data={data} />;
    case 'CTA':
      return <CTARenderer data={data} />;
    case 'Gallery':
      return <GalleryRenderer data={data} />;
    case 'FeaturesGrid':
      return <FeaturesGridRenderer data={data} />;
    case 'Video':
      return <VideoRenderer data={data} />;
    default:
      return (
        <div style={{ padding: '20px', border: '1px dashed #ccc', margin: '20px' }}>
          Unknown block type: {layoutType}
        </div>
      );
  }
}
