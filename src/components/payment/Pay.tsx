"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { backend_url } from "../constant";
import { IUser } from "@/type";

interface FormState {
  amount: number;
  currency: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentorship_id?: string;
  amount?: number;
}

const Pay = ({ isOpen, onClose, mentorship_id, amount }: ModalProps) => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const user = useSelector((state: RootState) => state.users.user);
  const id = user?._id;

  const initialFormState = (userData?: IUser): FormState => {
    const fullName = userData?.fullName || "";
    const nameParts = fullName.split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    return {
      amount: amount || 0,
      currency: "ETB", // Set a default currency
      email: userData?.email || "",
      first_name: firstName,
      last_name: lastName,
      phone_number: userData?.phoneNumber || "",
    };
  };

  const [form, setForm] = useState<FormState>(initialFormState());

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        try {
          const res = await axios.get(`${backend_url}/api/v1/users/get/${id}`);
          if (res.status === 200) {
            const fetchedUser = res.data;
            setUserData(fetchedUser);
            setForm(initialFormState(fetchedUser)); // Update form state with fetched user data
          } else {
            console.error("Failed to fetch user data:", res);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUser();
  }, [id]);

  useEffect(() => {
    if (userData) {
      setForm((prevForm) => ({
        ...prevForm,
        ...initialFormState(userData),
      }));
    }
  }, [userData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      console.log(form.currency);
      const res = await axios.post(
        `${backend_url}/api/v1/payment/accept-payment`,
        {
          amount: form.amount,
          currency: form.currency,
          email: form.email,
          first_name: form.first_name,
          last_name: form.last_name,
          phone_number: form.phone_number,
          mentorship_id: mentorship_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if (res.data?.data?.checkout_url) {
        window.location.href = res.data.data.checkout_url;
      } else {
        console.error("Invalid response:", res);
      }

      setForm(initialFormState(userData ?? undefined));
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-scroll md:overflow-hidden ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="flex container mx-auto items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-20" onClick={onClose} />
        <div className="relative flex flex-col items-center py-3 px-5 md:space-y-2 bg-gray-100 rounded-lg w-full md:max-w-2xl min-h-screen md:min-h-[80vh]">
          <span
            className="absolute top-0 right-5 cursor-pointer hover:text-red-500 text-5xl"
            onClick={onClose}
          >
            &times;
          </span>
          <div className="flex items-center justify-center w-full h-full">
            <div className="flex flex-col justify-center items-center w-full space-y-8">
              <h1 className="font-mono font-extrabold text-lg">Welcome</h1>
              <form
                className="flex flex-col space-y-3 md:space-y-8"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 gap-5">
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="first_name">First Name</label>
                    <input
                      className="border border-black px-5 py-2 rounded-lg"
                      onChange={handleChange}
                      type="text"
                      name="first_name"
                      value={form.first_name}
                      placeholder="First Name"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                      className="border border-black px-5 py-2 rounded-lg"
                      onChange={handleChange}
                      type="text"
                      name="last_name"
                      placeholder="Last Name"
                      value={form.last_name}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 gap-5">
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="amount">Amount</label>
                    <input
                      className="border border-black px-5 py-2 rounded-lg"
                      onChange={handleChange}
                      type="number"
                      name="amount"
                      value={form.amount}
                      placeholder="Amount"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="currency">Currency</label>
                    <input
                      className="border border-black px-5 py-2 rounded-lg"
                      onChange={handleChange}
                      type="text"
                      name="currency"
                      value={form.currency}
                      placeholder="Currency"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 gap-5">
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="email">Your Email</label>
                    <input
                      className="border border-black px-5 py-2 rounded-lg"
                      onChange={handleChange}
                      type="email"
                      name="email"
                      value={form.email}
                      placeholder="Email"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="phone_number">Phone Number</label>
                    <input
                      className="border border-black px-5 py-2 rounded-lg"
                      onChange={handleChange}
                      type="tel"
                      name="phone_number"
                      placeholder="Phone Number"
                      value={form.phone_number}
                    />
                  </div>
                </div>
                <button
                  className="px-[100px] py-3 text-white font-bold text-xl rounded-md bg-green-600"
                  type="submit"
                >
                  Pay
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
