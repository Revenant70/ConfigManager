import { motion } from "framer-motion";

export default function Sidebar() {
  return (
    <>
      <div className=" w-2/12 bg-[#F2E9E4] flex flex-col justify-start items-center">
        <h2 className="text-2xl py-12">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 1 }}>
            Home
          </motion.button>
        </h2>
        <h2 className="text-2xl py-12">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 1 }}>
            Configs
          </motion.button>
        </h2>
        <h2 className="text-2xl py-12">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 1 }}>
            Profile
          </motion.button>
        </h2>
      </div>
    </>
  );
}
