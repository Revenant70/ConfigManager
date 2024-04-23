import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useRef } from "react";
import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

export default function ConfigLayout() {
  const [createCardOpen, setCreateCardOpen] = useState(false);
  const [observeConfigCard, setObserveConfigCard] = useState(false);
  const [configCards, setConfigCards] = useState([]);

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
        delay: i * 0.050,
      },
    }),
    hidden: { opacity: 0 },
  }

  const mockConfigs = [
    {
      id: 1,
      name: "Config 1",
      description: "This is the first configuration",
      content: `
            worker_processes 1;
            events {
                worker_connections 1024;
            }
            
            http {
                server {
                    listen 80;
                    server_name example.com;
                    location / {
                        proxy_pass http://localhost:3000;
                        proxy_http_version 1.1;
                        proxy_set_header Upgrade $http_upgrade;
                        proxy_set_header Connection 'upgrade';
                        proxy_set_header Host $host;
                        proxy_cache_bypass $http_upgrade;
                    }
                }
            }
          `,
    },
    {
      id: 2,
      name: "Config 2",
      description: "This is the second configuration",
      content: `
            worker_processes 2;
            events {
                worker_connections 2048;
            }
            
            http {
                server {
                    listen 8080;
                    server_name example.net;
                    location / {
                        proxy_pass http://localhost:4000;
                        proxy_http_version 1.1;
                        proxy_set_header Upgrade $http_upgrade;
                        proxy_set_header Connection 'upgrade';
                        proxy_set_header Host $host;
                        proxy_cache_bypass $http_upgrade;
                    }
                }
            }
          `,
    },
    {
      id: 1,
      name: "Config 1",
      description: "This is the first configuration",
      content: `
            worker_processes 1;
            events {
                worker_connections 1024;
            }
            
            http {
                server {
                    listen 80;
                    server_name example.com;
                    location / {
                        proxy_pass http://localhost:3000;
                        proxy_http_version 1.1;
                        proxy_set_header Upgrade $http_upgrade;
                        proxy_set_header Connection 'upgrade';
                        proxy_set_header Host $host;
                        proxy_cache_bypass $http_upgrade;
                    }
                }
            }
          `,
    },
    {
      id: 2,
      name: "Config 2",
      description: "This is the second configuration",
      content: `
            worker_processes 2;
            events {
                worker_connections 2048;
            }
            
            http {
                server {
                    listen 8080;
                    server_name example.net;
                    location / {
                        proxy_pass http://localhost:4000;
                        proxy_http_version 1.1;
                        proxy_set_header Upgrade $http_upgrade;
                        proxy_set_header Connection 'upgrade';
                        proxy_set_header Host $host;
                        proxy_cache_bypass $http_upgrade;
                    }
                }
            }
          `,
    },
    {
      id: 1,
      name: "Config 1",
      description: "This is the first configuration",
      content: `
            worker_processes 1;
            events {
                worker_connections 1024;
            }
            
            http {
                server {
                    listen 80;
                    server_name example.com;
                    location / {
                        proxy_pass http://localhost:3000;
                        proxy_http_version 1.1;
                        proxy_set_header Upgrade $http_upgrade;
                        proxy_set_header Connection 'upgrade';
                        proxy_set_header Host $host;
                        proxy_cache_bypass $http_upgrade;
                    }
                }
            }
          `,
    },
    {
      id: 2,
      name: "Config 2",
      description: "This is the second configuration",
      content: `
            worker_processes 2;
            events {
                worker_connections 2048;
            }
            
            http {
                server {
                    listen 8080;
                    server_name example.net;
                    location / {
                        proxy_pass http://localhost:4000;
                        proxy_http_version 1.1;
                        proxy_set_header Upgrade $http_upgrade;
                        proxy_set_header Connection 'upgrade';
                        proxy_set_header Host $host;
                        proxy_cache_bypass $http_upgrade;
                    }
                }
            }
          `,
    },
    {
      id: 1,
      name: "Config 1",
      description: "This is the first configuration",
      content: `
            worker_processes 1;
            events {
                worker_connections 1024;
            }
            
            http {
                server {
                    listen 80;
                    server_name example.com;
                    location / {
                        proxy_pass http://localhost:3000;
                        proxy_http_version 1.1;
                        proxy_set_header Upgrade $http_upgrade;
                        proxy_set_header Connection 'upgrade';
                        proxy_set_header Host $host;
                        proxy_cache_bypass $http_upgrade;
                    }
                }
            }
          `,
    },
    {
      id: 2,
      name: "Config 2",
      description: "This is the second configuration",
      content: `
            worker_processes 2;
            events {
                worker_connections 2048;
            }
            
            http {
                server {
                    listen 8080;
                    server_name example.net;
                    location / {
                        proxy_pass http://localhost:4000;
                        proxy_http_version 1.1;
                        proxy_set_header Upgrade $http_upgrade;
                        proxy_set_header Connection 'upgrade';
                        proxy_set_header Host $host;
                        proxy_cache_bypass $http_upgrade;
                    }
                }
            }
          `,
    },
    {
      id: 1,
      name: "Config 1",
      description: "This is the first configuration",
      content: `
            worker_processes 1;
            events {
                worker_connections 1024;
            }
            
            http {
                server {
                    listen 80;
                    server_name example.com;
                    location / {
                        proxy_pass http://localhost:3000;
                        proxy_http_version 1.1;
                        proxy_set_header Upgrade $http_upgrade;
                        proxy_set_header Connection 'upgrade';
                        proxy_set_header Host $host;
                        proxy_cache_bypass $http_upgrade;
                    }
                }
            }
          `,
    },
    {
      id: 2,
      name: "Config 2",
      description: "This is the second configuration",
      content: `
            worker_processes 2;
            events {
                worker_connections 2048;
            }
            
            http {
                server {
                    listen 8080;
                    server_name example.net;
                    location / {
                        proxy_pass http://localhost:4000;
                        proxy_http_version 1.1;
                        proxy_set_header Upgrade $http_upgrade;
                        proxy_set_header Connection 'upgrade';
                        proxy_set_header Host $host;
                        proxy_cache_bypass $http_upgrade;
                    }
                }
            }
          `,
    },
    {
      id: 1,
      name: "Config 1",
      description: "This is the first configuration",
      content: `
            worker_processes 1;
            events {
                worker_connections 1024;
            }
            
            http {
                server {
                    listen 80;
                    server_name example.com;
                    location / {
                        proxy_pass http://localhost:3000;
                        proxy_http_version 1.1;
                        proxy_set_header Upgrade $http_upgrade;
                        proxy_set_header Connection 'upgrade';
                        proxy_set_header Host $host;
                        proxy_cache_bypass $http_upgrade;
                    }
                }
            }
          `,
    },
    {
      id: 2,
      name: "Config 2",
      description: "This is the second configuration",
      content: `
            worker_processes 2;
            events {
                worker_connections 2048;
            }
            
            http {
                server {
                    listen 8080;
                    server_name example.net;
                    location / {
                        proxy_pass http://localhost:4000;
                        proxy_http_version 1.1;
                        proxy_set_header Upgrade $http_upgrade;
                        proxy_set_header Connection 'upgrade';
                        proxy_set_header Host $host;
                        proxy_cache_bypass $http_upgrade;
                    }
                }
            }
          `,
    },

    
  ];

  // TODO - Make the clipboard and file title absolute within the card and not move around with the text

  useEffect(() => {
    setConfigCards(mockConfigs);
  }, [mockConfigs]);

  const copyCodeToClipboard = () => {
    const codeBlock = codeBlockRef.current;
    if (codeBlock) {
      const textArea = document.createElement("textarea");
      textArea.value = codeBlock.innerText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  };

  const openCreateNewCard = () => {
    setCreateCardOpen(!createCardOpen);
  };

  const createNewCard = async (e) => {
    e.preventDefault();
    console.log(e);
  };

  const openObserveConfig = () => {
    setObserveConfigCard(!observeConfigCard);
  }

  return (
    <>
      <motion.div
        className="grid gap-2 grid-cols-3 w-full"
        variants={list}
        initial="hidden"
        animate="visible"
        
      >
        {configCards.map((configCard, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            className="p-4 rounded-md cursor-pointer"
          >
            <pre
              ref={codeBlockRef}
              className="bg-[#202127] p-4 rounded-xl overflow-hidden"
            >
              <div className="flex flex-row justify-between">
                <div className="bg-[#32363F] rounded-lg w-9 h-9 flex justify-center items-center text-[#B892FF]">
                  <motion.button
                    className=""
                    onClick={copyCodeToClipboard}
                    whileTap={{ scale: 0.8 }}
                    transition={{ duration: 0.05 }}
                  >
                    <FontAwesomeIcon icon={faClipboard} size="lg" />
                  </motion.button>
                </div>
                <div className="text-lg text-[#B892FF] rounded-lg h-9 flex justify-end p-2 items-center bg-[#32363F]">
                  {configCard.name}
                </div>
              </div>

              <code className="text-md text-[#deded6] font-mono ">
                {configCard.content}
              </code>
            </pre>
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
              onSubmit={createNewCard}
              className="bg-[#161618] text-[#deded6] w-1/4 min-h-96 h-3/5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-lg rounded-xl flex justify-center items-center align-middle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div className="p-4 h-full flex justify-start items-center flex-col">
                <h2 className="text-4xl font-bold text-center pt-2 pb-4">
                  Enter Config details below
                </h2>
                <label className="label m-4">
                  <span className="label-text text-3xl">Name</span>
                </label>
                <input
                  type="text"
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
                  className="text-lg bg-[#32363F] w-32 h-12 rounded-xl mt-7 text-[#B892FF]"
                  onClick={openCreateNewCard}
                >
                  Submit task
                </button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {observeConfigCard && <div></div>}
        </AnimatePresence>
      </div>
    </>
  );
}
