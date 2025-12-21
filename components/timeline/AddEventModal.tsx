"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEvent } from "@/app/actions";
import { EventSchema, type EventFormData } from "@/lib/schemas";

type AddEventModalProps = {
  personId: string;
};

export default function AddEventModal({ personId }: AddEventModalProps) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EventFormData>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      personId, // Set the personId as a default value
    },
  });

  const onSubmit = async (data: EventFormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("date", data.date);
    if (data.description) formData.append("description", data.description);
    formData.append("personId", data.personId);

    await createEvent(formData);
    setOpen(false);
    reset();
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <Dialog.Trigger asChild>
        {/* TODO: Style this button like X/Bluesky compose button
            - Fixed position bottom-right? 
            - Or inline in sidebar?
        */}
        <button type="button">+ Add Event</button>
      </Dialog.Trigger>

      {/* Modal */}
      <Dialog.Portal>
        {/* Overlay - darkened background */}
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />

        {/* Content - the actual modal */}
        <Dialog.Content
          aria-describedby="add-event-modal"
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-lg p-6 w-[500px] max-h-[85vh] overflow-y-auto"
        >
          {/* Header */}
          <DialogDescription className="sr-only">
            This is a hidden description for accessibility.
          </DialogDescription>
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-xl font-semibold">
              Add Event
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </Dialog.Close>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-white mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                {...register("title")}
                className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="date" className="block text-white mb-1">
                Date
              </label>
              <input
                type="date"
                id="date"
                {...register("date")}
                className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="description" className="block text-white mb-1">
                Description
              </label>
              <textarea
                id="description"
                {...register("description")}
                className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              />
            </div>
            {/* Hidden input for personId is handled by defaultValues, but good to keep as fallback or if we weren't using RHF */}
            <input type="hidden" {...register("personId")} value={personId} />

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Adding..." : "Add Event"}
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
