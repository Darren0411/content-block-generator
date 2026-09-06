import { HeroBlock } from './HeroBlock';
import { FeaturesBlock } from './FeaturesBlock';
import { FooterBlock } from './FooterBlock';

export function ContentRenderer({ content, onEdit }) {
  if (!content || !content.blocks) {
    return null;
  }

  return (
    <div className="w-full">
      {content.blocks.map((block, idx) => {
        if (block.type === 'Hero') {
          return <HeroBlock key={idx} block={block} onEdit={onEdit} />;
        }
        if (block.type === 'Features') {
          return <FeaturesBlock key={idx} block={block} onEdit={onEdit} />;
        }
        if (block.type === 'Footer') {
          return <FooterBlock key={idx} block={block} onEdit={onEdit} />;
        }
        return null;
      })}
    </div>
  );
}