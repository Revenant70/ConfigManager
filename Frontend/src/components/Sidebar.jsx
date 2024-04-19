import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {

  const navigate = new useNavigate();

  function functionToHome() {
    navigate("/home");
  }

  function functionToConfig() {
    navigate("/configs");
  }

  function functionToProfile() {
    navigate("/profile");
  }


  return (
    <>
      <div className=" w-2/12 h-screen bg-[#F2E9E4] flex flex-col justify-start items-center">
        <h2 className="text-2xl py-12">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 1 }} onClick={functionToHome}>
            Home
          </motion.button>
        </h2>
        <h2 className="text-2xl py-12">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 1 }} onClick={functionToConfig}>
            Configs
          </motion.button>
        </h2>
        <h2 className="text-2xl py-12">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 1 }} onClick={functionToProfile}>
            Profile
          </motion.button>
        </h2>
      </div>
    </>
  );
}
