// components/ShareButton.tsx
"use client";

import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { saveDocument } from "@/app/actions";
import ShareModal from "./timeline/ShareModal";

type ShareButtonProps = {
  people: string[];
};

export default function ShareButton({ people }: ShareButtonProps) {
  const { userId } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [docData, setDocData] = useState<{
    slug: string;
    deleteToken?: string | null;
  } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleShare = async () => {
    if (people.length === 0) return;

    setIsSaving(true);
    try {
      // Call the server action to save the document
      const doc = await saveDocument(people, userId ?? undefined);

      if (doc) {
        setDocData({
          slug: doc.slug,
          deleteToken: doc.deleteToken,
        });
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Failed to share:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleShare}
        disabled={isSaving || people.length === 0}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {isSaving ? "Saving..." : "Share Timeline"}
      </button>

      {docData && (
        <ShareModal
          isOpen={isModalOpen}
          onOpenChangeAction={setIsModalOpen}
          slug={docData.slug}
          deleteToken={docData.deleteToken}
        />
      )}
    </>
  );
}
