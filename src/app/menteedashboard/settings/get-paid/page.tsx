"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import { IUser } from "@/type";
import ModelForDelete from "@/components/ReusedComponent/ModelForDelete";
import { CheckCircle } from "lucide-react";
import Pay from "@/components/payment/Pay";
import PayOutModel from "@/components/ReusedComponent/PayOutModel";
import { backend_url } from "@/components/constant";

interface BankDetails {
  bank_name: string;
  account_holder_name: string;
  account_no: string;
}

const Paid = () => {
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const [isEditing, setIsEditing] = useState(false); // State to check if editing
  const [showDeleteDialog, setShowDeleteDialog] = useState(false); // State to control delete dialog visibility
  const [showPayOutModel, setShowPayOutModel] = useState(false); // State to control payout modal visibility
  const user = useSelector((state: RootState) => state.users.data);
  const data = useSelector((state: RootState) => state.users.user);
  const [userData, setUserData] = useState<IUser | null>(null);

  const [bankDetails, setBankDetails] = useState<BankDetails>({
    bank_name: "",
    account_holder_name: "",
    account_no: "",
  });

  const user_id = data?._id;
  const id = user?._id ? user?._id : user_id;
  const price = userData?.remainingBalance;
  // console.log(price);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${backend_url}/api/v1/users/get/${id}`);
        setUserData(res.data.user);
        // console.log(res.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setBankDetails((prevBankDetails) => ({
      ...prevBankDetails,
      [id]: value,
    }));
  };

  const handleBankDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`${backend_url}/api/v1/users/update/${id}`, {
        updates: { bank_account: [bankDetails] }, // Wrap bankDetails in an array
      });
      setShowForm(false); // Close the dialog after form submission
      setIsEditing(false); // Reset editing state
      setUserData(
        (prev) => (prev ? { ...prev, bank_account: [bankDetails] } : prev) // Wrap bankDetails in an array
      );
    } catch (error) {
      console.error("Error updating bank details:", error);
    }
  };

  const handleEditClick = () => {
    setBankDetails({
      bank_name: userData?.bank_account?.[0]?.bank_name || "", // Access first element if array
      account_holder_name:
        userData?.bank_account?.[0]?.account_holder_name || "", // Access first element if array
      account_no: userData?.bank_account?.[0]?.account_no || "", // Access first element if array
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async () => {
    try {
      await axios.put(`${backend_url}/api/v1/users/update/${id}`, {
        updates: { bank_account: [] }, // Set to empty array if that's the expected type
      });
      setShowDeleteDialog(false); // Close the delete dialog
      setUserData(
        (prev) => (prev ? { ...prev, bank_account: [] } : prev) // Set to empty array
      );
    } catch (error) {
      console.error("Error deleting bank account:", error);
    }
  };

  const handlePayment = () => {
    setShowModal(true);
  };

  const approvePayment = async () => {
    try {
      await axios.post(`${backend_url}/api/v1/payments/approve`, {
        userId: id,
        amount: price,
      });
      setShowPayOutModel(false); // Close the payout modal
    } catch (error) {
      console.error("Error approving payment:", error);
    }
  };

  return (
    <div className="md:px-8">
      <div className="space-y-8">
        <Card className="space-y-4">
          <CardHeader className="text-xl font-semibold">
            Available Balance
          </CardHeader>
          <CardContent>
            <span className="text-cc">${price}</span>
          </CardContent>
          <CardFooter>
            <Button
              variant={price === 0.0 ? "outline" : "default"}
              disabled={price === 0.0}
              className="cursor-pointer"
              onClick={() => setShowPayOutModel(true)}
            >
              Get Paid Now
            </Button>{" "}
            <Button
              variant={"default"}
              className="ml-8 capitalize cursor-pointer"
              onClick={handlePayment}
            >
              Pay
            </Button>
          </CardFooter>
        </Card>
        <Card className="space-y-8">
          <CardHeader>
            <div className="flex md:flex-row flex-col justify-center space-y-5 md:justify-between items-center">
              <h2 className="text-xl font-semibold">Withdrawal methods</h2>
              <Button
                onClick={() => setShowForm(true)} // Show form on button click
                className="text-cc hover:text-white bg-white border border-gray-300 md:px-5 px-20"
              >
                Add a method
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {userData?.bank_account?.length ? (
              <div className="flex md:flex-row flex-col space-y-5 md:justify-between items-center">
                <p className="flex w-full flex-wrap space-x-2">
                  <CheckCircle className="text-cc" />
                  <span className="text-gray-500 capitalize">
                    {userData.bank_account[0].bank_name}
                  </span>{" "}
                  with account number{" "}
                  <span className="text-gray-500">
                    {userData.bank_account[0].account_no}
                  </span>
                </p>
                <div className="flex space-x-8">
                  <Button
                    variant={"outline"}
                    className="text-cc"
                    onClick={handleEditClick}
                  >
                    Edit
                  </Button>
                  <Button
                    variant={"outline"}
                    className="text-red-700 bg-white"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <p>No withdrawal methods available.</p>
            )}
          </CardContent>
        </Card>
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Edit withdrawal method" : "Set up withdrawals"}
              </DialogTitle>
            </DialogHeader>
            <form
              onSubmit={handleBankDetailsSubmit}
              className="flex flex-col space-y-3"
            >
              <div className="space-y-3">
                <Label htmlFor="account_holder_name">
                  Account Holder Name:
                </Label>
                <Input
                  type="text"
                  id="account_holder_name"
                  value={bankDetails.account_holder_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="bank_name">Bank Name:</Label>
                <Input
                  type="text"
                  id="bank_name"
                  value={bankDetails.bank_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="account_no">Account Number:</Label>
                <Input
                  type="text"
                  id="account_no"
                  value={bankDetails.account_no}
                  onChange={handleChange}
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <ModelForDelete
          isOpen={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          onDelete={handleDelete}
        />

        <Pay isOpen={showModal} onClose={() => setShowModal(false)} />
        <PayOutModel
          isOpen={showPayOutModel}
          onClose={() => setShowPayOutModel(false)}
          approve={approvePayment}
        />
      </div>
    </div>
  );
};

export default Paid;
