"use client";
import { useEffect } from "react";
import { useState, useMemo } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Heading from "./Heading";
import FormView from "./FormView";
import Sidebar from "./SideBar";
import Input from "./Input";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";

enum STEPS {
  INFO = 0,
  ADDRESS = 1,
  BANK = 2,
  SUMMARY = 3,
  CONFIRMED = 4,
}

const Form = () => {
  const [userData, setUserData] = useState<FieldValues | null>(null);
  // const [imageFront, setImageFront] = useState<string>("");
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const router = useRouter();
  const user = useSelector((state: RootState) => state.users.user);
  const id = user?._id;
  const {
    register,
    handleSubmit,
    watch,
    setValue, // Function to set form values
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      bank_name: "",
      account_holder_name: "",
      account_no: "",
      address: "",
      city: "",
      bank_account: {
        bank_name: "",
        account_holder_name: "",
        account_no: "",
      },
      ID: {
        front: {
          public_id: "",
          url: "",
        },
        back: {
          public_id: "",
          url: "",
        },
      },
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/v1/users/get/${id}`
      );
      setUserData(response.data.user);
    };
    fetchUser();
  }, [id]);

  useEffect(() => {
    // Set the fetched user data to the form fields when userData changes
    if (userData) {
      Object.keys(userData).forEach((key) => {
        setValue(key, userData[key]);
      });
    }
  }, [userData, setValue]);

  const [step, setStep] = useState(STEPS.INFO);

  const onNext = () => {
    setStep((prev) => prev + 1);
  };

  const onBack = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.SUMMARY) return onNext();
    router.push("/dashboard");
    try {
      //check user name and accountholder name is same
      if (data.name === data.account_holder_name) {
        console.log(data.name, data.account_holder_name);
        // Prepare the data to be sent to the backend
        const bank_account = {
          bank_name: data.bank_name,
          account_holder_name: data.account_holder_name,
          account_no: data.account_no,
        };
        const updatedData = {
          updates: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            city: data.city,
            bank_account,
          },
        };

        // if (data.account_holder_name ===) {
        // }
        // Send the data to the backend
        await axios.put(
          `http://localhost:5000/api/v1/users/update/${id}`,
          updatedData
        );

        // Navigate to the confirmation step
        setStep(STEPS.CONFIRMED);
        toast.success(`Successfully updated your information`);
      }
    } catch (error) {
      toast.warning(
        "account name and your bank account holder name is not same"
      );
      console.error("Error uploading images:", error);
      // Handle error if the conversion or upload fails
      // You can display an error message to the user or handle it as needed
    }
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.SUMMARY) {
      return "Confirm";
    }

    return "Next Step";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return undefined;
    }

    return "Go Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Personal info"
        subTitle="Please provide your name, email address and phone number profile picture."
      />

      <Input
        type="text"
        errors={errors}
        id="name"
        label="Name"
        register={register}
        placeholder="E.g. Stephen King"
        required
      />
      <Input
        type="email"
        errors={errors}
        id="email"
        label="Email Address"
        register={register}
        placeholder="E.g. stephenking@lorem.com"
        required
      />
      <Input
        errors={errors}
        type="text"
        id="phone"
        label="Phone Number"
        register={register}
        placeholder="E.g. +1 234 567 890"
        required
      />
    </div>
  );

  if (step === STEPS.ADDRESS) {
    bodyContent = (
      <div className="flex flex-col gap-4 md:gap-10">
        <Heading
          title="Address info"
          subTitle="Please fill current residence information"
        />
        <Input
          type="text"
          errors={errors}
          id="address"
          label="Residence Address"
          register={register}
          placeholder="E.g.Bahir dar"
          required
        />
        <Input
          type="text"
          errors={errors}
          id="city"
          label="City"
          register={register}
          placeholder="E.g.Bahir dar"
          required
        />
      </div>
    );
  }

  if (step === STEPS.BANK) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Bank information for accepting payments"
          subTitle="please fill your bank information , Account holder name must same as your account name"
        />

        <Input
          type="text"
          errors={errors}
          id="bank_name"
          label=" Bank Name"
          register={register}
          placeholder="E.g. Commerical Bank Of Ethiopia"
          required
        />
        <Input
          type="text"
          errors={errors}
          id="account_holder_name"
          label="Account Holder Name"
          register={register}
          placeholder="E.g. abcd abcd abcd"
          required
        />
        <Input
          errors={errors}
          type="number"
          id="account_no"
          label="Account Number"
          register={register}
          placeholder="E.g. 1000234567890"
          required
        />
      </div>
    );
  }

  if (step === STEPS.SUMMARY) {
    bodyContent = (
      <div className="flex flex-col md:space-y-0 space-y-5 gap-4 md:gap-6">
        <Heading
          title="Finishing up"
          subTitle="Double-check everything looks OK before confirming."
        />
        <div className="bg-slate-50 p-5 rounded-lg">
          <div className="space-y-5">
            <div className=" text-blue-900 font-bold flex flex-col justify-start space-y-5 md:flex-row md:justify-between pb-3">
              <div className="capitalize">
                <div className="underline">Personal info</div>
                <p className="pt-3 text-neutral-400">
                  full name:{" "}
                  <span className="text-gray-500">{watch("name")}</span>
                </p>
                <p className="pt-3 text-neutral-400">
                  Email address:{" "}
                  <span className="text-gray-500 lowercase">
                    {watch("email")}
                  </span>
                </p>
                <p className="pt-3 text-neutral-400">
                  Phone Number:{" "}
                  <span className="text-gray-500">{watch("phone")}</span>
                </p>

                <div
                  onClick={() => setStep(STEPS.INFO)}
                  className="underline text-neutral-400 hover:text-blue-900 font-medium cursor-pointer transition"
                >
                  Change
                </div>
              </div>
              <div className="capitalize">
                <div className="underline">Address info </div>
                <p className="pt-3 text-neutral-400">
                  address:{" "}
                  <span className="text-gray-500">{watch("address")}</span>
                </p>
                <p className="pt-3 text-neutral-400">
                  city: <span className="text-gray-500">{watch("city")}</span>
                </p>
                <div
                  onClick={() => setStep(STEPS.ADDRESS)}
                  className="underline text-neutral-400 hover:text-blue-900 font-medium cursor-pointer transition"
                >
                  Change
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {imagePreviews &&
                imagePreviews.map((image, index) => (
                  <Image key={index} src={image} alt="alt" />
                ))}
            </div>
          </div>
          <hr />
          <div className=" text-blue-900 font-bold flex justify-between pb-3 items-center">
            <div className="capitalize">
              <div className="underline">Bank info</div>
              <p className="pt-3 text-neutral-400">
                Bank Name:{" "}
                <span className="text-gray-500">{watch("bank_name")}</span>
              </p>
              <p className="pt-3 text-neutral-400">
                Account Holder Name:{" "}
                <span className="text-gray-500">
                  {watch("account_holder_name")}
                </span>
              </p>
              <p className="pt-3 text-neutral-400">
                Account Number:{" "}
                <span className="text-gray-500">{watch("account_no")}</span>
              </p>
              <div
                onClick={() => setStep(STEPS.INFO)}
                className="underline text-neutral-400 hover:text-blue-900 font-medium cursor-pointer transition"
              >
                Change
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // if (step === STEPS.CONFIRMED) {
  //   bodyContent = (
  //     <div className="flex flex-col justify-center items-center h-full py-10 gap-5 md:py-0">
  //       <Image src={comfirmedIcon} alt="Thank You" className="w-14 md:w-16" />
  //       <Heading
  //         title="Thank you!"
  //         subTitle="Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, plase feel free to email us at support@loregaming.com."
  //         center
  //       />
  //     </div>
  //   );
  // }

  return (
    <div className="md:flex md:bg-white md:rounded-2xl md:p-5">
      <Sidebar currentStep={step} />
      <FormView
        step={step}
        actionLabel={actionLabel}
        body={bodyContent}
        onSubmit={handleSubmit(onSubmit)}
        secondaryAction={step === STEPS.INFO ? undefined : onBack}
        secondaryActionLabel={secondaryActionLabel}
      />
    </div>
  );
};

export default Form;
