import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import DialogBox from "~/components/dialog";
import DialogParagraph from "~/components/dialog/paragraph";
import { Course, User } from "~/types/db";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { useState } from "react";

export default function DialogCourseManager({
  dialogOpen,
  setDialogOpen,
  course,
}: {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  course: Course;
}) {
  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState<User | null>(null);

  const { data: searchUsers, isLoading } = api.user.getUserByName.useQuery({
    search: query,
  });
  const filteredPeople = query === "" ? [] : searchUsers ?? [];

  const ctx = api.useUtils();

  const { register, handleSubmit, reset } = useForm();

  const { mutate, isLoading: isLoadingAddCourseManager } =
    api.course.addCourseManager.useMutation({
      onSuccess: () => {
        setDialogOpen(false);
        toast.success("Course manager added!");
        void ctx.course.getCoursesByOwner.invalidate();
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        if (errorMessage) {
          toast.error("Some inputs are missing or invalid");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      },
    });

  function onSubmit(data: FieldValues) {
    if (selectedPerson) {
      mutate({
        courseCode: course.courseCode,
        userId: selectedPerson.id,
      });
    }
  }

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <DialogBox
      title="Add course manager"
      isForm={{
        buttonLabel: "Add",
        buttonDisabled: selectedPerson === null,
        buttonLoading: isLoadingAddCourseManager,
        handleSubmit: handleSubmit((data) => onSubmit(data)),
      }}
      open={dialogOpen}
      setOpen={setDialogOpen}
    >
      <DialogParagraph>
        A course manager can add and edit modules and contents.
      </DialogParagraph>

      <Combobox as="div" value={selectedPerson} onChange={setSelectedPerson}>
        <div className="relative mt-2">
          <Combobox.Input
            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(event) => setQuery(event.target.value)}
            //@ts-expect-error todo how to fix this
            displayValue={(person: User) => person?.name}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>

          {filteredPeople.length > 0 && (
            <Combobox.Options className="absolute z-60 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {searchUsers &&
                searchUsers.map((person) => {
                  return (
                    <Combobox.Option
                      key={person.id}
                      value={person}
                      className={({ active }) =>
                        classNames(
                          "relative cursor-default select-none py-2 pl-3 pr-9",
                          active ? "bg-indigo-600 text-white" : "text-gray-900",
                        )
                      }
                    >
                      {({ active, selected }) => (
                        <>
                          <div className="flex items-center">
                            {person.image && (
                              <img
                                src={person.image}
                                alt=""
                                className="h-6 w-6 flex-shrink-0 rounded-full"
                              />
                            )}
                            <span
                              className={classNames(
                                "ml-3 truncate",
                                selected ? "font-semibold" : "",
                              )}
                            >
                              {person.name}
                            </span>
                          </div>

                          {selected && (
                            <span
                              className={classNames(
                                "absolute inset-y-0 right-0 flex items-center pr-4",
                                active ? "text-white" : "text-indigo-600",
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </>
                      )}
                    </Combobox.Option>
                  );
                })}
            </Combobox.Options>
          )}
        </div>
      </Combobox>

      {/* <div className="mt-4 grid grid-cols-1 gap-y-4">
        <div className="flex flex-col gap-4">
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="search user by name"
              onChange={(event) => setQuery(event.target.value)}
              value={query}
            />
          </div>
        </div>
      </div> */}
    </DialogBox>
  );
}
