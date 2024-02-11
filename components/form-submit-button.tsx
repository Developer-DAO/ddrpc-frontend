import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"
import { Icons } from "./ui/icons"

export function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" disabled={pending}>
            {pending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up
        </Button>
    )
}