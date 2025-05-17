import BackButton from "@/components/BackButton";
import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTicket";
import * as Sentry from "@sentry/nextjs";

export const metadata = {
  title: "Ticket Form",
};

export default async function TickerForm({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId, ticketId } = await searchParams;

    if (!customerId && !ticketId) {
      return (
        <div className="mx-auto h-[90vh] flex flex-col gap-6 items-center justify-center">
          <h2 className="text-2xl mb-2">
            Ticket ID or Customer ID required to load ticket form
          </h2>
          <BackButton title="Go Back" variant="default" />
        </div>
      );
    }

    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));

      if (!customer) {
        return (
          <div className="mx-auto h-[90vh] flex flex-col gap-6 items-center justify-center">
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} not found
            </h2>
            <BackButton title="Go Back" variant="default" />
          </div>
        );
      }

      if (!customer.active) {
        return (
          <div className="mx-auto h-[90vh] flex flex-col gap-6 items-center justify-center">
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} is not active
            </h2>
            <BackButton title="Go Back" variant="default" />
          </div>
        );
      }

      //   return ticket form
      console.log(customer);
    }

    if (ticketId) {
      const ticket = await getTicket(parseInt(ticketId));

      if (!ticket) {
        return (
          <div className="mx-auto h-[90vh] flex flex-col gap-6 items-center justify-center">
            <h2 className="text-2xl mb-2">Ticket ID #{ticketId} not found</h2>
            <BackButton title="Go Back" variant="default" />
          </div>
        );
      }

      const customer = await getCustomer(ticket.customerId);

      //   return ticket form
      console.log("ticket:", ticket);
      console.log("customer:", customer);
    }

    // put customer form comp
  } catch (e) {
    if (e instanceof Error) {
      Sentry.captureException(e);
      throw e;
    }
  }
}
