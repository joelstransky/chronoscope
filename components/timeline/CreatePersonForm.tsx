"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createPerson } from "@/app/actions";
import { type PersonFormData, PersonSchema } from "@/lib/schemas";

export default function CreatePersonForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PersonFormData>({
    resolver: zodResolver(PersonSchema),
  });

  const onSubmit = async (data: PersonFormData) => {
    // TODO: Call the server action with the validated data
    // Note: Since we are using useForm, we handle the submission here instead of the form action directly
    // to allow for client-side validation before sending to the server.

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("birthDate", data.birthDate);
    if (data.deathDate) formData.append("deathDate", data.deathDate);
    if (data.description) formData.append("description", data.description);

    await createPerson(formData);
    reset();
  };

  return (
    <div className="bg-black border border-gray-700 rounded-lg p-4 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Create New Person
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-white mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="birthDate" className="block text-white mb-1">
            Birth Date
          </label>
          <input
            type="date"
            id="birthDate"
            {...register("birthDate")}
            className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.birthDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.birthDate.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="deathDate" className="block text-white mb-1">
            Death Date
          </label>
          <input
            type="date"
            id="deathDate"
            {...register("deathDate")}
            className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.deathDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.deathDate.message}
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}
