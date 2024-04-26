'use client';

import { useState } from 'react'; // Importamos useState
import { StaffField } from '@/app/lib/definitions';
import Link from 'next/link';
import { CheckIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createProject } from '@/app/lib/actions';

export default function Form({ staff }: { staff: StaffField[] }) {
  const [selectedStaff, setSelectedStaff] = useState<string[]>([]); // Estado para almacenar el personal seleccionado

  const handleStaffSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStaffId = event.target.value;
    if (selectedStaffId && !selectedStaff.includes(selectedStaffId)) {
      setSelectedStaff([...selectedStaff, selectedStaffId]);
    }
  };

  return (
    <form action={createProject}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Project Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Project Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="block w-full rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
            required
          />
        </div>

        {/* Associated Staff */}
        <div className="mb-4">
          <label htmlFor="staff" className="mb-2 block text-sm font-medium">
            Choose Staff
          </label>
          <select
            id="staff"
            name="staffId"
            className="block w-full cursor-pointer rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
            defaultValue=""
            required
            onChange={handleStaffSelection}
          >
            <option value="" disabled>
              Select Staff
            </option>
            {staff.map((staffMember) => (
              <option key={staffMember.id} value={staffMember.id}>
                {staffMember.name}
              </option>
            ))}
          </select>
        </div>

        {/* Selected Staff Display */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Selected Staff
          </label>
          <ul className="list-disc pl-6">
            {selectedStaff.map((staffId) => (
              <li key={staffId}>{staff.find((staffMember) => staffMember.id === staffId)?.name}</li>
            ))}
          </ul>
        </div>

        {/* Project Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Indicate Project Status 
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-4 py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="active"
                  name="status"
                  type="radio"
                  value="active"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  defaultChecked
                />
                <label
                  htmlFor="active"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Active <CheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="completed"
                  name="status"
                  type="radio"
                  value="completed"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="completed"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Completed <ClockIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>

        {/* Project Staff */}
        <div className="mb-4">
          <label htmlFor="staffCount" className="mb-2 block text-sm font-medium">
            Staff Count
          </label>
          <div className="relative">
            <input
              id="staffCount"
              name="staffCount"
              type="number"
              min="0"
              className="block w-full rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
              required
            />
            <UserGroupIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/projects"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Project</Button>
      </div>
    </form>
  );
}
