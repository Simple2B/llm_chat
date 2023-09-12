interface Props {
  setOpen: (value: boolean) => void;
  setPrompt: (value: string) => void;
}

const EmptyState = ({ setOpen, setPrompt }: Props) => {
  return (
    <div className="mt-96 md:mt-96 space-y-6 text-gray-500 text-base mx-8 sm:mx-4 sm:text-1xl leading-12">
      <p>
        I can{" "}
        <button
          className="prompt-button"
          onClick={() =>
            setPrompt("Explain how a neural network works like I'm five.")
          }>
          explain concepts
        </button>
        , write{" "}
        <button
          className="prompt-button"
          onClick={() =>
            setPrompt("Write a poem about Large Language Models. ")
          }>
          poems
        </button>{" "}
        and{" "}
        <button
          className="prompt-button"
          onClick={() => setPrompt("Write a simple FastAPI route.")}>
          code
        </button>
        ,{" "}
        <button
          className="prompt-button"
          onClick={() =>
            setPrompt(
              "Logic Puzzle: A man has 53 socks in his drawer: 21 identical blue, 15 identical black and 17 identical red. The lights are out and he is completely in the dark. How many socks must he take out to make 100 percent certain he has at least one pair of black socks? Let`s think step by step!"
            )
          }>
          solve logic puzzles
        </button>
        , or give{" "}
        <button
          className="prompt-button"
          onClick={() =>
            setPrompt(
              "Please provide 5 comedian films for evening with their short description."
            )
          }>
          film recommendations.
        </button>{" "}
      </p>
      <p>Send me a message.</p>
    </div>
  );
};

export default EmptyState;
