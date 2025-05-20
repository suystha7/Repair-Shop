"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { TextareaWithLabel } from "@/components/inputs/Textarea";
import { CheckboxWithLabel } from "@/components/inputs/Checkbox";
import { InputWithLabel } from "@/components/inputs/Input";
import { SelectWithLabel } from "@/components/inputs/Select";

import {
  insertTicketSchema,
  type insertTicketSchemaType,
  type selectTicketSchemaType,
} from "@/zod-schema/ticket";
import { selectCustomerSchemaType } from "@/zod-schema/customer";

import { useAction } from "next-safe-action/hooks";
import { saveTicketAction } from "@/app/actions/saveTicketAction";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { DisplayServerActionResult } from "@/components/DisplayServerAction";

type Props = {
  ticket?: selectTicketSchemaType;
  customer?: selectCustomerSchemaType;
  techs?: {
    id: string;
    description: string;
  }[];
  isEditable?: boolean;
};

export default function TicketForm({
  ticket,
  customer,
  techs,
  isEditable = true,
}: Props) {
  const isManager = Array.isArray(techs);

  const { success, error: showError } = useToast();

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

  const {
    execute: executeSave,
    result: saveResult,
    isExecuting: isSaving,
    reset: resetSaveAction,
  } = useAction(saveTicketAction, {
    onSuccess({ data }) {
      success(data?.message || "Ticket saved successfully! 🎉");
    },
    onError({ error }) {
      showError(error?.serverError || "Something went wrong while saving.");
    },
  });

  async function submitForm(data: insertTicketSchemaType) {
    executeSave(data);
  }

  return (
    <div className="flex flex-col h-[80vh] gap-6 sm:px-8 justify-center">
      <DisplayServerActionResult result={saveResult} />

      <div className="flex items-center justify-center">
        <h2 className="text-2xl font-bold text-center">
          {ticket?.id && isEditable
            ? `Edit Ticket #${ticket?.id}`
            : ticket?.id
            ? `View Ticket #${ticket?.id}`
            : "New Ticket Form"}
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
              disabled={!isEditable}
            />
            {isManager ? (
              <SelectWithLabel<insertTicketSchemaType>
                fieldTitle="Tech ID"
                nameInSchema="tech"
                data={[
                  {
                    id: "new-ticket@example.com",
                    description: "new-ticket@example.com",
                  },
                  ...techs,
                ]}
              />
            ) : (
              <InputWithLabel<insertTicketSchemaType>
                fieldTitle="Tech"
                nameInSchema="tech"
                disabled={true}
              />
            )}

            {ticket?.id ? (
              <CheckboxWithLabel<insertTicketSchemaType>
                fieldTitle="Completed"
                nameInSchema="completed"
                message="Yes"
                disabled={!isEditable}
              />
            ) : null}

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
              disabled={!isEditable}
            />

            {isEditable ? (
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="w-1/2"
                  variant="default"
                  title="Save"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <LoaderCircle className="animate-spin" /> Saving
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
                <Button
                  type="button"
                  className="w-1/2"
                  variant="destructive"
                  title="Reset"
                  onClick={() => {
                    form.reset(defaultValues);
                    resetSaveAction();
                  }}
                >
                  Reset
                </Button>
              </div>
            ) : null}
          </div>
        </form>
      </Form>
    </div>
  );
}
