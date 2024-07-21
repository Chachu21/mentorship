"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { backend_url } from "@/components/constant";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Card, CardTitle } from "@/components/ui/card";
import ModelForDelete from "@/components/ReusedComponent/ModelForDelete";
import { CheckCheck } from "lucide-react";

interface Contract {
  _id: string;
  mentee_id: {
    _id: string;
    fullName: string;
  };
  mentor_id: {
    _id: string;
    fullName: string;
  };
  status: string; // Fixed type from `String` to `string`
  isAgree: boolean;
  isApproved: boolean;
  mentorship_id: {
    _id: string;
    title: string;
    value: number; // Assuming this field exists
  } | null;
}

const Contracts = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [deleteContractId, setDeleteContractId] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.users.user);
  const token = user?.token;
  const role = user?.role;

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await axios.get(
          `${backend_url}/api/v1/contract/mentor`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Contracts fetched:", response.data);
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

  const handleDeleteContract = async () => {
    if (!deleteContractId) return;

    try {
      await axios.delete(
        `${backend_url}/api/v1/contract/delete/${deleteContractId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setContracts(
        contracts.filter((contract) => contract._id !== deleteContractId)
      );
      setDeleteContractId(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error deleting contract:", error);
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
            <Card key={contract._id} className="my-4 py-3 px-2 flex flex-col">
              <CardTitle className="underline text-cc">
                {contract.mentorship_id?.title || "No title available"}
              </CardTitle>
              <div className="flex justify-between">
                <ul>
                  {role === "mentee" && (
                    <li>
                      <p>Mentor: {contract.mentor_id.fullName}</p>
                      <p>Terms Accepted: {contract.isAgree.toString()}</p>
                    </li>
                  )}
                  {role === "mentor" && (
                    <li>
                      <p>Mentee: {contract.mentee_id.fullName}</p>
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
                  <span className="text-cc capitalize">{contract.status}</span>
                  <button
                    className="hover:text-red-700"
                    onClick={() => {
                      setDeleteContractId(contract._id);
                      setIsDialogOpen(true);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      <ModelForDelete
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onDelete={handleDeleteContract}
      />
    </Card>
  );
};

export default Contracts;
