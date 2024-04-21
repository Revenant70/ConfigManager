import Sidebar from "./Sidebar";

import { motion, AnimatePresence } from "framer-motion";

import { useState } from "react";

import { serveraddress } from "../api/serveraddress";

import axios from "axios";

export default function Profile() {

    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const editUserProfile = async (e) => {
        e.preventDefault();
    
        // Check if password and confirm password match
        if (password !== confirmPassword) {
          setFeedbackMessage("Password and confirm password do not match");
          return;
        }
    
        try {
          const token = localStorage.getItem("JWT");
          const response = await axios.put(
            `${serveraddress}/api/users/edit-profile`,
            {
              username: username,
              password: password,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          if (response.status === 200) {
            setFeedbackMessage("Profile updated successfully");
          } else {
            setFeedbackMessage("Unexpected response status: " + response.status);
          }
        } catch (error) {
          setFeedbackMessage("Error during profile update. Please try again.");
        }
      };
    
      const handleDeleteClick = () => {
        setDeleteConfirmation(true);
      };
    
      const handleCancelDelete = () => {
        setDeleteConfirmation(false);
      };
    
      const handleConfirmDelete = async () => {
        try {
          const token = localStorage.getItem("JWT");
          const response = await axios.delete(
            `${serveraddress}/api/users/delete-profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          if (response.status === 200) {
            setFeedbackMessage("Profile updated successfully");
          } else {
            setFeedbackMessage("Unexpected response status: " + response.status);
          }
          setFeedbackMessage("Profile deleted!");
        } catch (error) {
          setFeedbackMessage("Error deleting profile: " + error.message);
        } finally {
          setDeleteConfirmation(false);
        }
      };

  return (
    <>
      <div className="flex flex-col bg-[#202127]">
        <Sidebar />
        <div className="fixed top-10 left-10 z-50"></div>
        <div className="min-h-screen flex items-center justify-center">
          <motion.div
            className="bg-base-200 drop-shadow-lg p-8 rounded-lg w-96"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-4xl font-semibold mb-6 text-center text-[#deded6]">
              Edit Profile
            </h2>

            <form onSubmit={editUserProfile}>
              <div className="mb-4">
                <label htmlFor="username" className="label text-[#deded6]">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="username"
                  className="input input-bordered mt-1 p-2 rounded-md w-full"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="label text-[#deded6]">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered mt-1 p-2 rounded-md w-full"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword" className="label text-[#deded6]">
                  Confirm password:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="password"
                  className="input input-bordered mt-1 p-2 rounded-md w-full"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="bg-[#B892FF] text-white px-4 py-2 rounded-md hover:bg-[#a879ff] w-full"
              >
                Save Changes
              </button>
            </form>

            {/* Display feedback message with animation */}
            <AnimatePresence>
              {feedbackMessage && (
                <motion.div
                  key="feedback"
                  className="mt-4 text-red-500"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {feedbackMessage}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-4">
              <button
                onClick={handleDeleteClick}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full"
              >
                Delete Profile
              </button>
              <AnimatePresence>
                {deleteConfirmation && (
                  <motion.div
                    key="deleteConfirmation"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <p className="mb-2">
                      Are you sure you want to delete your profile?
                    </p>
                    <button
                      onClick={handleConfirmDelete}
                      className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600"
                    >
                      Yes, Delete
                    </button>
                    <button
                      onClick={handleCancelDelete}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
