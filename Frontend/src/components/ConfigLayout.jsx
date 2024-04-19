import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";

import { useEffect, useRef } from "react";
import { useState } from "react";

import { motion } from "framer-motion";

export default function ConfigLayout() {
  const [configCards, setConfigCards] = useState([]);
  const codeBlockRef = useRef(null);

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

  return (
    <>
      <div className="grid gap-8 grid-cols-3 w-full">
        {configCards.length > 0
          ? configCards.map((configCard, index) => (
              <div key={index} className="p-4 rounded-md">
                <pre
                  ref={codeBlockRef}
                  className="bg-[#202127] p-4 rounded-xl overflow-auto"
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
  
                  <code className="text-md text-[#deded6] font-mono">
                    {configCard.content}
                  </code>
                </pre>
              </div>
            ))
          : null}
      </div>
    </>
  );
  
  
}
