import React from "react";

interface Props {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (value: string) => void;
}

const ChatForm = ({ prompt, setPrompt, onSubmit }: Props) => {
  const handleSubmit = async (event): Promise<void> => {
    event.preventDefault();
    onSubmit(event.target.prompt.value);
    setPrompt("");
    event.target.reset();
  };

  return (
    <footer className="z-10 fixed bottom-0 left-0 right-0 bg-slate-100 border-t-2">
      <div className="container max-w-2xl mx-auto p-5 pb-8">
        <form className="w-full flex" onSubmit={handleSubmit}>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            name="prompt"
            className="flex-grow block w-full rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:leading-6"
            placeholder="Send a message"
            required={true}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            className="bg-rose-fog-600 hover:bg-rose-fog-700 items-center font-semibold text-white rounded-r-md px-5 py-3"
            type="submit">
            Chat
          </button>
        </form>
      </div>
    </footer>
  );
};

export default ChatForm;
