import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, authTokens, logoutUser } = useContext(AuthContext);
  const navigateTo = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all registered users (excluding the current logged-in user)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/users/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUsers(data.filter((u) => u.username !== user.username));
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [authTokens, user.username]);

  // Handle user click to create a room and navigate to the chat
  const startChat = async (selectedUser) => {
    try {
      const roomName = [user.username, selectedUser.username].sort().join("_");
      const response = await fetch("http://localhost:8000/room/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: roomName, password: "default" }),
      });

      const data = await response.json();
      if (data.status === 200) {
        navigateTo(`/room/${roomName}/default`);
      } else {
        alert("Failed to create room.");
      }
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 h-screen">
      <header className="flex justify-between items-center w-full max-w-2xl p-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-xl font-bold">Welcome, {user.username}</h1>
        <button
          onClick={logoutUser}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </header>
      <div className="w-full max-w-2xl mt-4">
        <h2 className="text-lg font-semibold mb-2">All Registered Users</h2>
        <ul className="space-y-2">
          {users.map((u) => (
            <li
              key={u.id}
              className="flex justify-between items-center p-4 bg-white shadow-sm rounded-lg hover:bg-gray-100 cursor-pointer"
              onClick={() => startChat(u)}
            >
              <span className="text-md font-medium">{u.username}</span>
              <button className="px-3 py-1 bg-blue-500 text-white rounded-lg">
                Chat
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
