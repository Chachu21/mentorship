import React from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPay: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onPay,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Insufficient Balance</h2>
          <p className="mb-4">
            Your balance is insufficient to apply for this mentorship. Please
            make a payment to proceed.
          </p>
          <div className="flex justify-end space-x-4">
            <button className="border border-gray-100 px-3" onClick={onClose}>Cancel</button>
            <Button onClick={onPay} className="bg-cc text-white">
              Pay Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
