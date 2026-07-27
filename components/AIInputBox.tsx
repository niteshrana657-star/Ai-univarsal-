type AIInputBoxProps = {
  placeholder?: string;
};

export default function AIInputBox({
  placeholder = "Ask anything...",
}: AIInputBoxProps) {
  return (
    <section>
      <input
        type="text"
        placeholder={placeholder}
      />
    </section>
  );
}
