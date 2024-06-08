import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { customers } from '@/app/lib/placeholder-data';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import Form from '@/app/ui/invoices/edit-form';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [invoice, customer] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);


  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />

      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
