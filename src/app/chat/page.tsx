import React from "react";
import { CreateMLCEngine } from "@mlc-ai/web-llm";
import Head from "next/head";
import ChatComponent from "./chat_component";
import { Inter } from "next/font/google";


type Props = {};

const inter = Inter({ subsets: ["latin"] });

const ChatPage = (props: Props) => {
  return (
    <>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <ChatComponent />
      </main>
    </>
  );
};

export default ChatPage;
