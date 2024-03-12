'use client'
import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";


const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
        <TextField.Root>
            <TextField.Input placeholder="Title" />
        </TextField.Root>
            <SimpleMDE placeholder="Enter a description of the issue here..." />
            <Button>Submit new issue</Button>
    </div>
  )
}

export default NewIssuePage