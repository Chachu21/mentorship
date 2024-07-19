"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { backend_url } from "@/components/constant";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Card } from "@/components/ui/card";
import { CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

interface Contract {
  _id: string;
  mentee_id: string;
  mentor_id: string;
  isAgree: boolean;
  isApproved: boolean;
}

const Contracts = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  // const [updateContractId, setUpdateContractId] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.users.user);
  const token = user?.token;
  const role = user?.role;

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await axios.get(
          `${backend_url}/api/v1/contract/mentee`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setContracts(response.data);
      } catch (error) {
        console.error("Error fetching contracts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchContracts();
    }
  }, [token]);

  const handleUpdateContract = async (contractId: string) => {
    try {
      const response = await axios.put(
        `${backend_url}/api/v1/contract/update/${contractId}`,
        { isApproved: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("you accept the contract");
      }
      window.location.reload();
    } catch (error) {
      console.error("Error updating contract:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="px-2 py-3">
      <h1>Your Contracts</h1>
      {contracts.length === 0 ? (
        <div>No contracts available</div>
      ) : (
        <div>
          {contracts.map((contract) => (
            <Card
              key={contract._id}
              className="my-4 py-3 px-2 flex justify-between"
            >
              <ul>
                {role === "mentee" && (
                  <li>
                    <p>Mentor: {contract.mentor_id}</p>
                    <p>Terms Accepted: {contract.isAgree.toString()}</p>
                  </li>
                )}
                {role === "mentor" && (
                  <li>
                    <p>Mentee: {contract.mentee_id}</p>
                    {contract.isAgree && (
                      <p className="text-gray-500 text-lg flex">
                        <span className="text-cc pr-2">
                          <CheckCheck />
                        </span>
                        The user has agreed upon the rules and regulations of
                        mentoring.
                      </p>
                    )}
                  </li>
                )}
              </ul>
              <div className="flex flex-col space-y-2">
                <span className="text-cc capitalize">
                  {contract.isApproved ? "active" : "pending"}
                </span>
                {!contract.isApproved && (
                  <Button onClick={() => handleUpdateContract(contract._id)}>
                    Approve Contract
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
};

export default Contracts;
