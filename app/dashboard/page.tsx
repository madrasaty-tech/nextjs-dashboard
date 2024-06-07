import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import { Suspense } from 'react';
import CardWrapper from '../ui/dashboard/cards';
import { lusitana } from '../ui/fonts';
import { CardsSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from '../ui/skeletons';

export default async function Page() {
 // const latestInvoices = await fetchLatestInvoices(); delete this line

  return (
    <main>

      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        لوحة التحكم في الفواتير
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

      <Suspense fallback={<CardsSkeleton/>}>
        <CardWrapper />
      </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* you must provide a full componsnet for the fall back to work */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
