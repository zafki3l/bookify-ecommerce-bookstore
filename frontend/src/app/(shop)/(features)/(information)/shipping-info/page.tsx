import CoverageCard from './partials/coverage-card';
import DeliveryMethodsCard from './partials/delivery-methods-card';
import GlobalAccessCard from './partials/global-access-card';
import PackagingCard from './partials/packaging-card';
import ShippingInfoHeader from './partials/shipping-info-header';

type ShippingInfoProps = {};

export default function ShippingInfo({}: ShippingInfoProps) {
  return (
    <div className="bg-[#f7faf5] min-h-screen py-12 text-justify">
      <div className="max-w-6xl mx-auto px-6">
        <ShippingInfoHeader />

        <section className="mb-16 grid md:grid-cols-2 gap-8 items-start">
          <PackagingCard />
          <DeliveryMethodsCard />
        </section>

        <section className="mb-16 grid md:grid-cols-2 gap-6">
          <CoverageCard />
          <GlobalAccessCard />
        </section>
      </div>
    </div>
  );
}
