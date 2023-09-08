interface Props {
  setOpen: (value: boolean) => void;
  setPrompt: (value: string) => void;
}

const EmptyState = ({ setOpen, setPrompt }: Props) => {
  return (
    <div className="mt-12 sm:mt-24 space-y-6 text-gray-500 text-base mx-8 sm:mx-4 sm:text-2xl leading-12">
      <p>
        {" "}
        Customize my personality by clicking the{" "}
        <button
          className="prompt-button inline-flex items-center"
          onClick={() => setOpen(true)}>
          Settings{" "}
        </button>{" "}
        button.
      </p>
      <p>Send me a message.</p>
    </div>
  );
};

export default EmptyState;
