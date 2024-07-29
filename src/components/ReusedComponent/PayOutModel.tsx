"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { backend_url } from "../constant";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { IUser } from "@/type";

interface PayoutProps {
  isOpen: boolean;
  onClose: () => void;
  approve: () => void;
}

const validationSchema = Yup.object().shape({
  bank: Yup.string().required("Bank is required"),
  amount: Yup.number()
    .min(1, "Amount must be at least 1")
    .required("Amount is required"),
});

const PayOutModel = ({ isOpen, onClose, approve }: PayoutProps) => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [bankDetails, setBankDetails] = useState<{
    account_number?: string;
    holder_name?: string;
  }>({}); // Added state for bank details
  const isLogin = useSelector((state: RootState) => state.users.isLogin);
  const user = useSelector((state: RootState) => state.users.user);
  const token = user?.token;
  const user_id = user?._id;

  const formik = useFormik({
    initialValues: {
      amount: 0,
      bank: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (isLogin && token) {
        try {
          // Include account number and holder name in the payload
          const response = await axios.post(
            `${backend_url}/api/v1/payment/initiate-transfer/${user_id}`,
            {
              ...values,
              // bank: selectedBank,
              account_number: bankDetails.account_number,
              account_name: bankDetails.holder_name,
              currency: "ETB",
              reference: "chachu1234@",
              bank_code: "CBET",
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          // console.log(response.data);
          toast.success("Successfully submitted");
          onClose(); // Close the dialog
          approve(); // Approve the payment
          window.location.reload();
        } catch (error) {
          toast.error("Error submitting the form");
          console.error("Submission error:", error);
        }
      } else {
        toast.error("You need to be logged in to submit the form.");
      }
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (isLogin && token) {
          const response = await axios.get(
            `${backend_url}/api/v1/users/get/${user_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserData(response.data.user);
          if (
            response.data.user.bank_account &&
            response.data.user.bank_account.length > 0
          ) {
            // Set initial bank value for formik if user has bank accounts
            const initialBank =
              response.data.user.bank_account[0].bank_name || "";
            formik.setFieldValue("bank", initialBank);
            setSelectedBank(initialBank);
            setBankDetails({
              account_number: response.data.user.bank_account[0].account_no,
              holder_name:
                response.data.user.bank_account[0].account_holder_name,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [isLogin, token, user_id]);

  const handleBankChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const bankName = e.target.value;
    setSelectedBank(bankName);
    formik.setFieldValue("bank", bankName); // Sync Formik with selected bank

    // Update bank details based on selected bank
    const selectedBankDetails = userData?.bank_account?.find(
      (bank) => bank.bank_name === bankName
    );
    setBankDetails({
      account_number: selectedBankDetails?.account_no,
      holder_name: selectedBankDetails?.account_holder_name,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div className="container bg-white dark:bg-gray-900 dark:text-white space-y-3">
          <p className="text-xl capitalize">
            Withdrawal of money from{" "}
            <strong className="">{userData?.remainingBalance}</strong> Birr
          </p>
          {userData && (
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="form-group">
                <Label className="block mb-1">Bank:</Label>
                <select
                  id="bank"
                  name="bank"
                  value={formik.values.bank}
                  onChange={handleBankChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-3 border border-gray-300 outline-cc rounded-lg shadow-sm"
                >
                  <option value="">Select a bank</option>
                  {userData.bank_account &&
                    userData.bank_account.map((bank, index) => (
                      <option key={index} value={bank.bank_name}>
                        {bank.bank_name}
                      </option>
                    ))}
                </select>
                {formik.touched.bank && formik.errors.bank && (
                  <div className="text-red-500">{formik.errors.bank}</div>
                )}
              </div>
              {formik.values.bank && (
                <>
                  {userData.bank_account &&
                    userData.bank_account
                      .filter((bank) => bank.bank_name === formik.values.bank)
                      .map((bank, index) => (
                        <div key={index} className="flex flex-col space-y-3">
                          <div className="form-group">
                            <Label className="block mb-1">
                              Account Holder Name:
                            </Label>
                            <Input
                              id="account_holder_name"
                              name="account_holder_name"
                              value={bank.account_holder_name}
                              readOnly
                              className="w-full p-3 border border-gray-300 outline-cc rounded-lg shadow-sm"
                            />
                          </div>
                          <div className="form-group">
                            <Label className="block mb-1">
                              Account Number:
                            </Label>
                            <Input
                              id="account_no"
                              name="account_no"
                              value={bank.account_no}
                              readOnly
                              className="w-full p-3 border border-gray-300 outline-cc rounded-lg shadow-sm"
                            />
                          </div>
                        </div>
                      ))}
                </>
              )}
              <div className="form-group">
                <Label className="block mb-1">Amount:</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-3 border border-gray-300 outline-cc rounded-lg shadow-sm"
                />
                {formik.touched.amount && formik.errors.amount && (
                  <div className="text-red-500">{formik.errors.amount}</div>
                )}
              </div>
              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  className="bg-gray-200 px-5 py-2 rounded-lg text-gray-700 mr-4"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-cc text-white py-2 px-5 rounded-lg font-semibold"
                >
                  Submit
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PayOutModel;
