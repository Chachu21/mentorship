import { RootState } from "@/redux/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { backend_url } from "../../constant";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

interface Mentee {
  _id: string;
  name: string;
}

interface CreateGroupChatProps {
  handleCloseModal: () => void;
}

const CreateGroupChat: React.FC<CreateGroupChatProps> = ({
  handleCloseModal,
}) => {
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [selectedMentees, setSelectedMentees] = useState<string[]>([]);
  const [groupName, setGroupName] = useState<string>("");
  const user = useSelector((state: RootState) => state.users.user);
  const id = user?._id;

  useEffect(() => {
    const fetchMentees = async () => {
      try {
        const mentorId = id;
        const response = await axios.get(
          `${backend_url}/api/v1/users/mentees/${mentorId}`
        );
        setMentees(response.data);
      } catch (error) {
        console.error("Error fetching mentees:", error);
      }
    };

    fetchMentees();
  }, [id]);

  const handleMenteesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setSelectedMentees(selectedOptions);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${backend_url}/api/v1/chats/group`, {
        users: selectedMentees,
        name: groupName,
        groupAdmin: id,
      });
      console.log("Group chat created:", response.data);
      handleCloseModal();
    } catch (error) {
      console.error("Error creating group chat:", error);
    }
  };

  return (
    <div>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <Label
            htmlFor="group-name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Group Name
          </Label>
          <Input
            type="text"
            id="group-name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter group name"
            required
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <Label
            htmlFor="mentees"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Mentees
          </Label>
          <select
            id="mentees"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            multiple
            required
            value={selectedMentees}
            onChange={handleMenteesChange}
          >
            {mentees.map((mentee) => (
              <option key={mentee._id} value={mentee._id}>
                {mentee.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create
        </button>
        <button
          type="button"
          className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-2 mx-2"
          onClick={handleCloseModal}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateGroupChat;
