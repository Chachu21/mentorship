import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface ModelForDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  title?: string;
  description?: string;
}

const ModelForDelete = ({
  isOpen,
  onClose,
  onDelete,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. Are you sure you want to permanently delete this file from our servers?",
}: ModelForDeleteProps) => {
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center items-center my-8">
            <DialogClose asChild className="md:flex hidden mr-10">
              <Button
                type="button"
                variant="secondary"
                className="px-4"
                onClick={onClose}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={onDelete}
              className="mr-2 bg-red-600 hover:bg-red-400 text-white px-4"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModelForDelete;
