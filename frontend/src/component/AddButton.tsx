"use client";

import { useState } from "react";
import { FaSquarePlus } from "react-icons/fa6";
import CreateModal from "@/component/CreateModal";

export default function AddButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="flex items-center bg-yellow-400 gap-x-2 text-zinc-900 font-semibold px-4 py-2 shadow-md rounded-lg hover:bg-yellow-500 transition-colors"
        onClick={() => setOpen(true)}
      >
        <FaSquarePlus />
        Ajouter un équipement
      </button>

      <CreateModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
