"use client";
import { Button, TextField } from "@radix-ui/themes"; // I'm didn't
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit, setValue } = useForm<IssueForm>();

  const handleDescriptionChange = (value: string) => {
    setValue("description", value);
  };

  const onSubmit = (data: IssueForm) => {
    // console.log(data);
  };  

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit((data) => console.log(data))}
      // onSubmit={handleSubmit(onSubmit)}
    >
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>
      {/* <Controller
        name="description"
        control={control}
        render={(field) => (
          <SimpleMDE placeholder="Description..." {...field} />
        )}
      /> */}
        <SimpleMDE
        onChange={handleDescriptionChange}
        options={{
          placeholder: "Description...",
        }}
      />
      <Button type="submit">Submit new issue</Button>
    </form>
  );
};

export default NewIssuePage;
