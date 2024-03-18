"use client";
import { Button, Callout, TextField, Text } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/Components/ErrorMessage";
import Spinner from "@/app/Components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

// The interface is being replaced by the type line above, pulling it from the validationSchema.
// interface IssueForm {
//   title: string;
//   description: string;
// }

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const handleDescriptionChange = (value: string) => {
    setValue("description", value);
  };

  const onSubmit = (data: IssueForm) => {
    // console.log(data);
  };

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        
        onSubmit={handleSubmit(async (data) => {
          try {
            setSubmitting(true);
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setSubmitting(false);
            setError("An unexpected error occurred.");
          }
        })}

        // onSubmit={handleSubmit(onSubmit)}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        {/* <Controller
        name="description"
        control={control}
        render={({field}) => (
          <SimpleMDE placeholder="Description..." {...field} />
        )}
      /> */}

        <SimpleMDE
          onChange={handleDescriptionChange}
          options={{
            placeholder: "Description...",
          }}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting} type="submit">
          Submit new issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

// The Controller and simpleMDE tag above is what works. It was recommended by ChatGPT when Mosh's code simpley didn't work. The code does nothing when clicking the button. It matched Mosh's perfectly, but still failed. I commented it out so i'd have it. But since it wasn't working, I asked ChatGPT. The code that is not commented is based on it's recommendations.

export default NewIssuePage;
