import { MessageData } from "../types/message";

const Message = ({ text, isUser }: MessageData) => {
  let containerClass: string = "bg-gray-50";

  if (isUser) {
    containerClass = "";
  }

  if (Array.isArray(text)) {
    text = text.join("");
  }

  if (!text || text === "") {
    return null;
  }

  return (
    <div className={`flex gap-x-4 rounded-md ${containerClass} py-5 px-5`}>
      {isUser ? (
        <span className="text-xl sm:text-2xl" title="user">
          🧑‍💻
        </span>
      ) : (
        <span className="text-xl sm:text-2xl" title="AI">
          💻
        </span>
      )}

      <div className="flex flex-col text-sm sm:text-base flex-1 gap-y-4 mt-1">
        {text.split("\n").map(
          (text, index) =>
            text.length > 0 && (
              <span key={index} className="min-w-0">
                {text}
              </span>
            )
        )}
      </div>
    </div>
  );
};

export default Message;
