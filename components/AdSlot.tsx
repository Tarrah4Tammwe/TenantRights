import { useEffect } from 'react';

const ADSENSE_ID = 'pub-8935274984783226';

interface AdSlotProps {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'leaderboard';
  className?: string;
}

export default function AdSlot({ slot = '1234567890', format = 'auto', className = '' }: AdSlotProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <div className={`overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={`ca-${ADSENSE_ID}`}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
