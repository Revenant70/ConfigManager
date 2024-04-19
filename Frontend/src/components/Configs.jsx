import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { useRef } from "react";

import { motion } from "framer-motion";

export default function Configs() {
  const codeBlockRef = useRef(null);

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
  return (
    <>
      <div className="flex flex-row">
        <Sidebar />
        <div className="w-10/12 h-screen overflow-x-auto">
          <div className="flex justify-center items-center w-full h-screen">
            <div className="grid">
              <div className="p-4 rounded-md">
                <pre
                  ref={codeBlockRef}
                  className="bg-[#1b1b1f] p-4 rounded-md overflow-auto"
                >
                  <div className="bg-[#202127] rounded-lg w-9 h-9 flex justify-center items-center text-[#deded6]">
                    <motion.button
                      className=""
                      onClick={copyCodeToClipboard}
                      whileTap={{ scale: 0.8 }}
                      transition={{ duration: 0.05 }}
                    >
                      <FontAwesomeIcon icon={faClipboard} size="lg" />
                    </motion.button>
                  </div>

                  <code className="text-md text-[#deded6] font-mono">
                    {`
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
          `}
                  </code>
                </pre>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-full h-screen">
            hello world
          </div>
          <div className="flex justify-center items-center w-full h-screen">
            hello world
          </div>
          <div className="flex justify-center items-center w-full h-screen">
            hello world
          </div>
        </div>
      </div>
    </>
  );
}
