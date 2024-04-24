import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { serveraddress } from "../api/serveraddress";

import { motion, AnimatePresence } from "framer-motion";

export default function ConfigLayout() {
  const [createCardOpen, setCreateCardOpen] = useState(false);
  const [editCardOpen, setEditCardOpen] = useState(false);

  const [configCards, setConfigCards] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [importCard, setImportCard] = useState(null);

  const [configName, setConfigName] = useState();
  const [content, setContent] = useState();

  const codeBlockRef = useRef(null);

  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
  }


  const variants = {
    visible: i => ({
      opacity: 1,
      transition: {
        delay: i * 0.090,
      },
    }),
    hidden: { opacity: 0 },
  }

  const onCardClick = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const fetchConfigCards = async () => {
    try {
      const token = localStorage.getItem("JWT");
      const result = await axios.get(`${serveraddress}/api/config`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.data.isEmpty) {
        console.log("No data");
      } else {
        setConfigCards(result.data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const createNewConfig = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("JWT");
      const response = await axios.post(`${serveraddress}/api/config`, 
      {
        "name": configName,
        "content": content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        console.log("Task added");
        fetchConfigCards();
      }
    } catch (e) {
      console.log("Failed to add config to system: ", e.message);
    }
  };

  useEffect(() => {
    fetchConfigCards()
  }, []);

  const copyCodeToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  };

  const openCreateNewCard = () => {
    setCreateCardOpen(!createCardOpen);
  };

  return (
    <>
      <motion.div
        className={`grid grid-cols-3 gap-2 w-full h-full relative`}
        variants={list}
        initial="hidden"
        animate="visible"
        
      >
        {expandedIndex !== null && (
        <div className="bg-black opacity-50 w-full h-full absolute z-30"></div>
          )}
        {configCards.map((configCard, index) => (
          <motion.div
            layout 
            key={index.id}
            custom={index}
            initial={"hidden"}
            animate={"visible"}
            exit="hidden"
            variants={variants}
            className={`p-4 rounded-md ${expandedIndex === index ? 'absolute inset-0 m-auto left-0 right-0 top-0 bottom-0 z-40' : ''}`}
            transition={{ duration: 0.3 }}
          >

            <motion.pre
              ref={codeBlockRef}
              className="bg-[#202127] p-4 rounded-xl overflow-hidden h-[44vh] relative"

            >
              <div className="flex flex-row justify-between">
                <motion.button className="bg-[#32363F] rounded-lg w-9 h-9 flex justify-center items-center text-[#B892FF]"
                onClick={() => copyCodeToClipboard(configCard.content)}
                whileTap={{ scale: 0.85 }}
                >
                    <FontAwesomeIcon icon={faClipboard} size="lg" />
                </motion.button>
                <div className="text-lg text-[#B892FF] rounded-lg h-9 flex justify-end p-2 items-center bg-[#32363F]">
                  {configCard.name}
                </div>
              </div>
              <code className="text-sm text-[#deded6] font-mono ">
                {configCard.content}
              </code>
              <motion.button className="absolute left-4 bottom-4 text-[#B892FF] bg-[#32363F] rounded-md h-9 w-9 flex justify-center items-center"
                whileTap={{ scale: 0.85 }}
                onClick={() => onCardClick(index)}
              >
                <FontAwesomeIcon icon={faPenToSquare}  size="md"/>
              </motion.button>
              <motion.button
              className="absolute right-4 bottom-4 text-[#B892FF] bg-[#32363F] rounded-md h-9 w-9 flex justify-center items-center"
              whileTap={{ scale: 0.85 }}
              onClick={() => onCardClick(index)}
              >
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </motion.button>
            </motion.pre>
          </motion.div>
        ))}
      </motion.div>
      <div className="fixed right-12 bottom-12 bg-[#32363F] text-[#B892FF] w-16 h-16 opacity-35 rounded-lg flex justify-center items-center">
        <button onClick={openCreateNewCard}>
          <FontAwesomeIcon icon={faPlus} size="2xl" />
        </button>
      </div>
      <div>
        <AnimatePresence>
          {createCardOpen && (
            <motion.form
              onSubmit={createNewConfig}
              className="bg-[#161618] text-[#deded6] w-1/4 min-h-96 h-3/5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-lg rounded-xl flex justify-center items-center align-middle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div className="p-4 h-full flex justify-center items-center flex-col">
                <h2 className="text-4xl font-bold text-center pt-2 pb-4">
                  Enter Config details below
                </h2>
                <label className="label m-4">
                  <span className="label-text text-3xl">Name</span>
                </label>
                <input
                  type="text"
                  maxLength={30}
                  placeholder="config name"
                  onChange={(e) => setConfigName(e.target.value)}
                  className="input input-bordered rounded-xl pl-2 h-12 w-5/6"
                />
                <div className="form-control flex justify-center items-center flex-col">
                  <label className="label m-6">
                    <span className="label-text text-3xl">Content</span>
                  </label>
                  <textarea
                    rows="4"
                    cols="50"
                    type="text"
                    placeholder="config content"
                    onChange={(e) => setContent(e.target.value)}
                    className="input input-bordered w-5/6 rounded-xl p-2 max-h-10/12"
                  />
                </div>
                <button
                  className="text-lg bg-[#32363F] w-32 h-12 rounded-xl mt-9 text-[#B892FF]"
                  onClick={openCreateNewCard}
                >
                  Submit task
                </button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
