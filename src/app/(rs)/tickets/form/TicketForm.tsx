"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { TextareaWithLabel } from "@/components/inputs/Textarea";
import { CheckboxWithLabel } from "@/components/inputs/Checkbox";
import { InputWithLabel } from "@/components/inputs/Input";

import {
  insertTicketSchema,
  type insertTicketSchemaType,
  type selectTicketSchemaType,
} from "@/zod-schema/ticket";
import { selectCustomerSchemaType } from "@/zod-schema/customer";

type Props = {
  ticket?: selectTicketSchemaType;
  customer?: selectCustomerSchemaType;
};

export default function TicketForm({ ticket, customer }: Props) {
  const defaultValues: insertTicketSchemaType = {
    id: ticket?.id ?? "(New)",
    customerId: ticket?.customerId ?? customer.id,
    title: ticket?.title ?? "",
    description: ticket?.description ?? "",
    completed: ticket?.completed ?? false,
    tech: ticket?.tech ?? "new-ticket@example.com",
  };

  const form = useForm<insertTicketSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertTicketSchema),
    defaultValues,
  });

  async function submitForm(data: insertTicketSchemaType) {
    console.log(data);
  }

  return (
    <div className="flex flex-col h-[80vh] gap-6 sm:px-8 justify-center">
      <div className="flex items-center justify-center">
        <h2 className="text-2xl font-bold text-center">
          {ticket?.id ? "Edit" : "New"} Ticket{" "}
          {ticket?.id ? `# ${ticket?.id}` : "Form"}
        </h2>
      </div>

      <Form {...form}>
        <form
          onSubmit={form?.handleSubmit(submitForm)}
          className="flex flex-row gap-4 md:gap-8 justify-center"
        >
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<insertTicketSchemaType>
              fieldTitle="Title"
              nameInSchema="title"
            />
            <InputWithLabel<insertTicketSchemaType>
              fieldTitle="Tech"
              nameInSchema="tech"
              disabled={true}
            />
            <CheckboxWithLabel<insertTicketSchemaType>
              fieldTitle="Completed"
              nameInSchema="completed"
              message="Yes"
            />

            <div className="mt-4 space-y-2">
              <h3 className="text-lg">Customer Info</h3>
              <hr className="w-4/5" />
              <p>
                {customer?.firstName} {customer?.lastName}
              </p>
              <p>{customer?.address1}</p>
              {customer?.address2 ? <p>{customer?.address2}</p> : null}
              <p>
                {customer?.city}, {customer?.state} {customer?.zip}
              </p>
              <hr className="w-4/5" />
              <p>{customer?.email}</p>
              <p>Phone: {customer?.phone}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-xs">
            <TextareaWithLabel<insertTicketSchemaType>
              fieldTitle="Description"
              nameInSchema="description"
              className="h-96"
            />

            <div className="flex gap-2">
              <Button
                type="submit"
                className="w-1/2"
                variant="default"
                title="Save"
              >
                Save
              </Button>
              <Button
                type="button"
                className="w-1/2"
                variant="destructive"
                title="Reset"
                onClick={() => form.reset(defaultValues)}
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
