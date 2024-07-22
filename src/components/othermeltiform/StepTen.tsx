import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  prevStep,
  nextStep,
  setFormData,
} from "../../redux/features/formReducer";
import { RootState } from "../../redux/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import profile from "../../../public/assets/profile.jpeg";

const StepTen = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.form.data);

  const [profileImage, setProfileImage] = useState<string>("");
  const [profileImageUrl, setProfileImageUrl] = useState(
    data.profileImageUrl || profile
  );
  const [region, setAddress] = useState(data.region || "");
  const [city, setCity] = useState(data.city || "");
  const [state, setState] = useState(data.state || "");
  const [zipCode, setZipCode] = useState(data.zipCode || "");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePrev = () => {
    dispatch(prevStep());
  };

  const handleNext = () => {
    dispatch(
      setFormData({
        profileImage,
        profileImageUrl,
        region,
        city,
        state,
        zipCode,
      })
    );
    dispatch(nextStep());
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setProfileImage(imageData);
      };
      setProfileImageUrl(URL.createObjectURL(file));

      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col space-y-10">
      <div className="space-y-3">
        <h2 className="text-lg md:text-2xl font-semibold text-[#1F284F] max-w-2xl">
          A few Last details, then you can check and publish your profile
        </h2>
        <p className="max-w-4xl">
          A professional photo helps you build trust with your mentee or
          customer. To keep it simple and safe, they will pay you through us,
          which is why we need your personal information.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center space-y-4">
          <Label htmlFor="profileImage">Upload Profile Image</Label>
          <div
            onClick={handleImageClick}
            className="w-32 h-32 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden"
          >
            {profileImageUrl ? (
              <Image
                src={profileImageUrl}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
                width={128}
                height={128}
              />
            ) : (
              <div className="text-gray-400">Click to upload</div>
            )}
          </div>
          <Input
            id="profileImage"
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="state">Country</Label>
            <Input
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="Enter your state"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="region">Region</Label>
            <Input
              id="region"
              value={region}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your region"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter your city"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input
              id="zipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Enter your zip code"
              className="mt-2"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-10">
        <Button variant="outline" className="px-10" onClick={handlePrev}>
          Back
        </Button>
        <Button onClick={handleNext} className="px-10 w-fit flex justify-end">
          Check your profile
        </Button>
      </div>
    </div>
  );
};

export default StepTen;
