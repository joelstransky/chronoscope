"use client";

import { useClerk } from "@clerk/nextjs";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

type ShareModalProps = {
  isOpen: boolean;
  onOpenChangeAction: (open: boolean) => void;
  slug: string;
  deleteToken?: string | null;
};

export default function ShareModal({
  isOpen,
  onOpenChangeAction,
  slug,
  deleteToken,
}: ShareModalProps) {
  const { openSignIn } = useClerk();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/t/${slug}`;
  const deleteUrl = deleteToken
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/delete/${deleteToken}`
    : null;

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChangeAction}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1e293b] border border-gray-700 rounded-lg p-6 w-[90vw] max-w-[600px] shadow-2xl z-50 text-white">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-bold">
              Save Timeline
            </Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-white transition-colors">
              ✕
            </Dialog.Close>
          </div>

          <div className="space-y-6">
            {/* Share Link */}
            <div>
              <label
                htmlFor="shareUrl"
                className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider"
              >
                Link to Timeline
              </label>
              <div className="flex gap-2">
                <input
                  id="shareUrl"
                  name="shareUrl"
                  readOnly
                  value={shareUrl}
                  className="flex-1 bg-[#0f172a] border border-gray-700 rounded px-3 py-2 text-sm font-mono text-blue-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => copyToClipboard(shareUrl, "share")}
                  className="bg-[#334155] hover:bg-[#475569] px-3 py-2 rounded transition-colors"
                >
                  {copiedField === "share" ? "✓" : "📋"}
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-400 bg-[#0f172a]/50 p-2 border-l-2 border-green-500">
                Your timeline has been saved and may be accessed with this link
                by anybody you give it to.
              </p>
            </div>

            {/* Delete Link (Anonymous Only) */}
            {deleteUrl && (
              <div>
                <label
                  htmlFor="deleteTimelineUrl"
                  className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider"
                >
                  Delete Timeline
                </label>
                <div className="flex gap-2">
                  <input
                    id="deleteTimelineUrl"
                    name="deleteTimelineUrl"
                    readOnly
                    value={deleteUrl}
                    className="flex-1 bg-[#0f172a] border border-gray-700 rounded px-3 py-2 text-sm font-mono text-red-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => copyToClipboard(deleteUrl, "delete")}
                    className="bg-[#334155] hover:bg-[#475569] px-3 py-2 rounded transition-colors"
                  >
                    {copiedField === "delete" ? "✓" : "📋"}
                  </button>
                </div>
                <div className="mt-2 text-xs text-gray-400 bg-[#0f172a]/50 p-2 border-l-2 border-gray-500">
                  Because you are not signed in, this entry has not been linked
                  to an account. It is recommended you{" "}
                  <button
                    type="button"
                    onClick={() => openSignIn()}
                    className="text-blue-400 hover:underline"
                  >
                    sign in
                  </button>{" "}
                  so that your entries are never lost.
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end">
            <Dialog.Close className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded font-semibold transition-colors">
              Close
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
