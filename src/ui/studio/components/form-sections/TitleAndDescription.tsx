import React from 'react';
import { FieldValues } from 'react-hook-form';
import { ToggleEditableField } from '~/components/ui/toggle-editable-field';
import { ToggleEditableTextArea } from '~/components/ui/toggle-editable-text-area';

export default function TitleAndDescription({
  form,
  id,
  title,
  description,
  edit,
  setEdit,
  onSubmit,
}: {
  form: FieldValues;
  id: string;
  title: string | null;
  description: string | null;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (data: FieldValues) => void;
}) {
  return (
    <div className="" key={id}>
      <div>
        <ToggleEditableField
          name="title"
          form={form}
          intent="title"
          formTextSize="lg"
          onSubmit={form.handleSubmit(onSubmit)}
          editText={edit}
          setEditText={setEdit}
          text={title ?? "Edit this lesson title"}
          hasForm={true}
        />
      </div>
      <div className="my-3">
        <ToggleEditableTextArea
          name="description"
          form={form}
          intent="description"
          formTextSize="md"
          onSubmit={form.handleSubmit(onSubmit)}
          editText={edit}
          setEditText={setEdit}
          text={description ?? "Edit description"}
          hideButtons={true}
          hasForm={true}
        />
      </div>
    </div>
  );
}