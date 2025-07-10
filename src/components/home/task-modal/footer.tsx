/**
 * Footer component
 * 
 * This component is used to display the footer of the task modal.
 */
import { Button } from "@/components/ui/button"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"

interface FooterProps {
    isEditMode: boolean;
    closeButtonRef: React.RefObject<HTMLButtonElement | null>;
}

export const Footer = ({ isEditMode, closeButtonRef }: FooterProps) => {
    return (
        <DialogFooter>
            <Button type="submit" className="my-button">
                {isEditMode ? "Update" : "Create"}
            </Button>
            <DialogClose asChild>
                <Button
                    type="button"
                    variant="secondary"
                    className="my-button"
                    ref={closeButtonRef}
                >
                    Cancel
                </Button>
            </DialogClose>
        </DialogFooter>
    )
}