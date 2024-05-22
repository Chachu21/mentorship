import React, { useState, useEffect } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const StepEight: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.form.data);

  const [pricing, setPricing] = useState(data.pricing || "free");
  const [hourlyRate, setHourlyRate] = useState(data.hourlyRate || "");
  const [monthlyRate, setMonthlyRate] = useState(data.monthlyRate || "");
  const [customDuration, setCustomDuration] = useState(
    data.customDuration || ""
  );
  const [customPrice, setCustomPrice] = useState(data.customPrice || "");

  const calculateServiceFee = (amount: string) => {
    const value = parseFloat(amount);
    if (isNaN(value)) return 0;
    return value * 0.05;
  };

  const formatCurrency = (amount: number) => {
    return amount.toFixed(2);
  };

  const hourlyRateServiceFee = calculateServiceFee(hourlyRate);
  const monthlyRateServiceFee = calculateServiceFee(monthlyRate);
  const customPriceServiceFee = calculateServiceFee(customPrice);

  const handlePrev = () => {
    dispatch(prevStep());
  };

  const handleNext = () => {
    dispatch(
      setFormData({
        pricing,
        hourlyRate,
        monthlyRate,
        customDuration,
        customPrice,
      })
    );
    dispatch(nextStep());
  };

  return (
    <div className="flex flex-col space-y-10">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-[#1F284F] max-w-2xl">
          Pricing Options
        </h2>
        <p className="max-w-4xl">
          Please select your pricing option. If you select `Paid`, please
          provide your rates.
        </p>
      </div>
      <div className="space-y-4">
        <Label>Pricing</Label>
        <RadioGroup
          value={pricing}
          onValueChange={setPricing}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="free" id="free" />
            <Label htmlFor="free">Free</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="paid" id="paid" />
            <Label htmlFor="paid">Paid</Label>
          </div>
        </RadioGroup>
      </div>
      {pricing === "paid" && (
        <div className="space-y-4 max-w-3xl">
          <div className="flex flex-col space-y-3">
            <Label htmlFor="hourlyRate">Hourly Rate</Label>
            <Input
              id="hourlyRate"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              placeholder="Enter your hourly rate"
              className="col-span-3"
            />
            {hourlyRate && (
              <p>
                Service Fee: ${formatCurrency(hourlyRateServiceFee)} - Final
                Payment: $
                {formatCurrency(parseFloat(hourlyRate) - hourlyRateServiceFee)}
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-3">
            <Label htmlFor="monthlyRate">Monthly Rate</Label>
            <Input
              id="monthlyRate"
              value={monthlyRate}
              onChange={(e) => setMonthlyRate(e.target.value)}
              placeholder="Enter your monthly rate"
              className="col-span-3"
            />
            {monthlyRate && (
              <p>
                Service Fee: ${formatCurrency(monthlyRateServiceFee)} - Final
                Payment: $
                {formatCurrency(
                  parseFloat(monthlyRate) - monthlyRateServiceFee
                )}
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-3">
            <Label htmlFor="customDuration">Custom Duration (in months)</Label>
            <Input
              id="customDuration"
              value={customDuration}
              onChange={(e) => setCustomDuration(e.target.value)}
              placeholder="Enter duration (e.g., 3 or 4 months)"
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col space-y-3">
            <Label htmlFor="customPrice">Price for Custom Duration</Label>
            <Input
              id="customPrice"
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value)}
              placeholder="Enter price for custom duration"
              className="col-span-3"
            />
            {customPrice && (
              <p>
                Service Fee: ${formatCurrency(customPriceServiceFee)} - Final
                Payment: $
                {formatCurrency(
                  parseFloat(customPrice) - customPriceServiceFee
                )}
              </p>
            )}
          </div>
        </div>
      )}
      <div className="flex justify-end space-x-10">
        <Button variant="outline" className="px-10" onClick={handlePrev}>
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={
            pricing === "paid" &&
            (!hourlyRate.trim() ||
              !monthlyRate.trim() ||
              !customDuration.trim() ||
              !customPrice.trim())
          }
          className="px-10 w-fit flex justify-end"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default StepEight;
