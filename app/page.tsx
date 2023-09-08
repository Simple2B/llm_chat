"use client";

import { useEffect, useRef, useState } from "react";
import ChatForm from "./components/ChatForm";
import Message from "./components/Message";
import SlideOver from "./components/SlideOver";
import EmptyState from "./components/EmptyState";
import { Cog6ToothIcon } from "@heroicons/react/20/solid";
import LoadingChatLine from "./components/LoadingChatLine";
import { useCompletion } from "ai/react";
import { Model } from "./types/model";
import { MessageData } from "./types/message";

const MAX_TOKENS: number = 4096;

const MODELS: Model[] = [
  {
    name: "Model 7B",
    version: "v7",
    shortened: "7B",
  },
  {
    name: "Model 13B",
    version: "v13",
    shortened: "13B",
  },
  {
    name: "Model 70B",
    version: "v70",
    shortened: "70B",
  },
];

const approximateTokenCount = (text: string): number => {
  return Math.ceil(text.length * 0.4);
};

const HomePage = () => {
  const bottomRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  // Model params
  const [model, setModel] = useState(MODELS[0]); // default to 7B
  const [systemPrompt, setSystemPrompt] = useState("You are a helpful chat.");
  const [temp, setTemp] = useState(0.75);
  const [topP, setTopP] = useState(0.9);
  const [maxTokens, setMaxTokens] = useState(800);

  const { complete, completion, setInput, input, isLoading } = useCompletion({
    api: "/api/streaming",
    body: {
      model: model.version,
      systemPrompt: systemPrompt,
      temperature: temp,
      topP: topP,
      maxTokens: maxTokens,
    },
    onResponse: (res) => {
      console.log({ res });
    },
    onError: (error) => {
      setError(error);
    },
  });

  const setAndSubmitPrompt = (newPrompt: string): void => {
    handleSubmit(newPrompt);
  };

  const handleSettingsSubmit = async (event): Promise<void> => {
    console.log("Settings Submit EVENT", event);
    event.preventDefault();
    setOpen(false);
    setSystemPrompt(event.target.systemPrompt.value);
  };

  const generatePrompt = (messages: MessageData[]): string => {
    return messages
      .map((message: MessageData) =>
        message.isUser ? `[INST] ${message.text} [/INST]` : `${message.text}`
      )
      .join("\n");
  };

  const handleSubmit = async (userMessage: string): Promise<void> => {
    const SNIP: string = "<!-- snip -->";
    const messageHistory: MessageData[] = [...messages];
    if (completion.length > 0) {
      messageHistory.push({
        text: completion,
        isUser: false,
      });
    }
    messageHistory.push({
      text: userMessage,
      isUser: true,
    });

    console.log({ messageHistory });

    // Generate initial prompt and calculate tokens
    let prompt: string = `${generatePrompt(messageHistory)}\n`;
    console.log({ prompt });

    // Check if we exceed max tokens and truncate the message history if so.
    while (approximateTokenCount(prompt) > MAX_TOKENS) {
      if (messageHistory.length > 3) {
        setError(
          "Your message is too long. Please try again with a shorter message."
        );
        return;
      }

      // Remove the third message from history, keeping the original exchange.
      messageHistory.splice(1, 2);

      // Recreate the prompt
      prompt = `${SNIP}\n${generatePrompt(messageHistory)}\n`;
    }

    setMessages(messageHistory);
    complete(prompt);
  };

  useEffect(() => {
    if (messages?.length > 0 || completion?.length > 0) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, completion, error]);

  return (
    <>
      <nav className="grid grid-cols-2 pt-3 pl-6 pr-3 sm:grid-cols-3 sm:pl-0">
        <div className="hidden sm:inline-block"></div>
        <div className="font-semibold text-gray-500 sm:text-center">
          <span className="hidden sm:inline-block"> Simple2B Chat with</span>{" "}
          <button
            className="py-2 font-semibold text-rose-fog-600 hover:underline"
            onClick={() => setOpen(true)}>
            Model {model.shortened}
          </button>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 text-sm font-semibold text-rose-fog-500 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => setOpen(true)}>
            <Cog6ToothIcon
              className="w-5 h-5 text-rose-fog-600 sm:mr-2 group-hover:text-gray-900"
              aria-hidden="true"
            />{" "}
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>
      </nav>

      <main className="max-w-2xl pb-5 mx-auto mt-4 sm:px-4">
        <div className="text-center"></div>
        {messages.length == 0 && (
          <EmptyState setPrompt={setAndSubmitPrompt} setOpen={setOpen} />
        )}

        <SlideOver
          open={open}
          setOpen={setOpen}
          systemPrompt={systemPrompt}
          setSystemPrompt={setSystemPrompt}
          handleSubmit={handleSettingsSubmit}
          temp={temp}
          setTemp={setTemp}
          maxTokens={maxTokens}
          setMaxTokens={setMaxTokens}
          topP={topP}
          setTopP={setTopP}
          models={MODELS}
          model={model}
          setModel={setModel}
        />

        <ChatForm prompt={input} setPrompt={setInput} onSubmit={handleSubmit} />

        {error && <div>{error}</div>}

        <article className="pb-24">
          {messages.map((message: MessageData, index: number) => (
            <Message
              key={`message-${index}`}
              text={message.text}
              isUser={message.isUser}
            />
          ))}
          {isLoading && <LoadingChatLine />}
          <Message text={completion} isUser={false} />
          <div ref={bottomRef} />
        </article>
      </main>
    </>
  );
};

export default HomePage;
