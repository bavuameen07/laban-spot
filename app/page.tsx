import { Hero } from '@/components/Hero';
import { Products } from '@/components/Products';
import { SiteNav } from '@/components/SiteNav';
import { StoreLocator } from '@/components/StoreLocator';
import { Story } from '@/components/Story';

export default function LabanSpotPage() {
  return <><SiteNav /><main><Hero /><Story /><Products /><StoreLocator /></main></>;
}
