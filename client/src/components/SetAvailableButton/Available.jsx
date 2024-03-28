import React from "react";
import { useUser } from "../../context/userContext";
import useFetch from "../../hooks/useFetch";

export default function Available() {
  const { user } = useUser();

  if (!user?._id || user?.role === "client") return null;

  const onSuccess = () => {
    window.location.reload();
  };

  const { performFetch } = useFetch(`/driver/${user?._id}`, onSuccess);
  const handleChange = async () => {
    performFetch({
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      available: !user?.available,
    });
  };

  return (
    <div className="mr-2">
      <button
        onClick={handleChange}
        type="button"
        className={`rounded-full text-xs ${
          user?.available
            ? "bg-green-600 hover:bg-green-500"
            : "bg-red-600 hover:bg-red-500"
        } sm:w-28 h-7 py-0                text-xs font-medium uppercase leading-normal text-white w-7 sm:rounded-lg sm:h-9`}
      >
        {user?.available ? "Available" : "Unavailable"}
      </button>
    </div>
  );
}
