"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { createEvent } from "@/app/actions";

type AddEventModalProps = {
  personId: string;
};

export default function AddEventModal({ personId }: AddEventModalProps) {
  const [open, setOpen] = useState(false);

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
          <form
            action={async (formData) => {
              await createEvent(formData);
              setOpen(false); // Close modal on success
            }}
          >
            {/* TODO: Add form fields:
              - Person selector (dropdown)
              - Event title (text input)
              - Event date (date input)
              - Event description (textarea)
            */}
            <div>
              <label htmlFor="title" className="block text-white mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-white mb-1">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-white mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              />
              <input type="hidden" name="personId" value={personId} />
            </div>
            <button type="submit">Add Event</button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
