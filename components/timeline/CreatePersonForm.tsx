// components/timeline/CreatePersonForm.tsx
'use client';

import { createPerson } from '@/app/actions';

export default function CreatePersonForm() {
    // TODO: Add form with fields:
    // - name (text input, required)
    // - birthDate (date input)
    // - deathDate (date input)  
    // - description (textarea)

    // TODO: Use <form action={createPerson}> to call the server action

    // TODO: Add a submit button

    // For now, just return a placeholder:
    return (
        <div className="bg-black border border-gray-700 rounded-lg p-4 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white">Create New Person</h2>
            <form action={createPerson} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-white mb-1">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="birthDate" className="block text-white mb-1">Birth Date</label>
                    <input 
                        type="date" 
                        id="birthDate" 
                        name="birthDate" 
                        className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="deathDate" className="block text-white mb-1">Death Date</label>
                    <input 
                        type="date" 
                        id="deathDate" 
                        name="deathDate" 
                        className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-white mb-1">Description</label>
                    <textarea 
                        id="description" 
                        name="description" 
                        className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    />
                </div>

                <button 
                    type="submit" 
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black transition-colors"
                >
                    Create
                </button>
            </form>
        </div>
    );
}