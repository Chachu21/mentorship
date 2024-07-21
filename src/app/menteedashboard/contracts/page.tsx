"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { backend_url } from "@/components/constant";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Card, CardTitle } from "@/components/ui/card";
import { CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import RatingModel from "@/components/ReusedComponent/RatingModel";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedContractId, setSelectedContractId] = useState<string | null>(
    null
  );
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
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
        console.log(response.data);
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
        toast.success("You accepted the contract");
        setContracts((prevContracts) =>
          prevContracts.map((contract) =>
            contract._id === contractId
              ? { ...contract, isApproved: true }
              : contract
          )
        );
      }
    } catch (error) {
      console.error("Error updating contract:", error);
    }
  };

  const handleApprovePayment = (contractId: string, mentorId: string) => {
    setSelectedContractId(contractId);
    setSelectedMentor(mentorId);
    setShowModal(true);
  };

  const handleApprovePaymentConfirmation = async (contractId: string) => {
    try {
      const response = await axios.put(
        `${backend_url}/api/v1/contract/update/${contractId}`,
        { paid: "Yes" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("You approved the payment");
        setShowModal(false);
        setSelectedContractId(null);
        setSelectedMentor(null);
        // Optionally refresh the contracts list
      }
    } catch (error) {
      console.error("Error approving payment:", error);
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
              className="my-4 py-3 px-2 flex flex-col space-y-2"
            >
              <CardTitle className="underline text-cc">
                {contract.mentorship_id?.title || "No title available"}
              </CardTitle>
              <div className="flex justify-between">
                <ul>
                  {role === "mentee" && (
                    <li>
                      <p>Mentor: {contract.mentor_id.fullName}</p>
                      <p>Terms Accepted: {contract.isAgree.toString()}</p>
                      <p>
                        The mentor shall provide guidance and support to the
                        mentee in accordance with the agreed-upon mentorship
                        plan. The mentee agrees to actively participate,
                        complete assignments, and respect the mentor&apos;s time
                        and expertise. Both parties commit to maintaining
                        regular communication, providing feedback, and adhering
                        to scheduled meetings. Confidentiality must be upheld,
                        and any proprietary information shared during the
                        mentorship shall remain protected. Upon approval of the
                        mentorship application, the mentee shall make the
                        required payment as specified in the mentorship
                        agreement. Any disputes shall be resolved through
                        amicable discussion. Both parties reserve the right to
                        terminate the mentorship with appropriate notice,
                        ensuring mutual respect and professionalism throughout
                        the engagement.
                      </p>
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
                          The mentor shall provide guidance and support to the
                          mentee in accordance with the agreed-upon mentorship
                          plan. The mentee agrees to actively participate,
                          complete assignments, and respect the mentor&apos;s
                          time and expertise. Both parties commit to maintaining
                          regular communication, providing feedback, and
                          adhering to scheduled meetings. Confidentiality must
                          be upheld, and any proprietary information shared
                          during the mentorship shall remain protected. Upon
                          approval of the mentorship application, the mentee
                          shall make the required payment as specified in the
                          mentorship agreement. Any disputes shall be resolved
                          through amicable discussion. Both parties reserve the
                          right to terminate the mentorship with appropriate
                          notice, ensuring mutual respect and professionalism
                          throughout the engagement.
                        </p>
                      )}
                    </li>
                  )}
                </ul>
                <div className="flex flex-col space-y-2">
                  <span className="text-cc capitalize">{contract.status}</span>
                  {!contract.isApproved && (
                    <Button onClick={() => handleUpdateContract(contract._id)}>
                      Approve Contract
                    </Button>
                  )}
                  {contract.isApproved && contract.status === "active" && (
                    <Button
                      onClick={() =>
                        handleApprovePayment(
                          contract._id,
                          contract.mentor_id._id
                        )
                      }
                    >
                      Approve Payment
                    </Button>
                  )}
                </div>
              </div>
              <RatingModel
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                approve={() =>
                  handleApprovePaymentConfirmation(selectedContractId!)
                }
                mentor={selectedMentor!}
              />
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
};

export default Contracts;
