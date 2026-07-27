type MainToggleProps = {
  enabled: boolean;
  onToggle?: () => void;
};

export default function MainToggle({
  enabled,
  onToggle,
}: MainToggleProps) {
  return (
    <section>
      <button onClick={onToggle}>
        {enabled ? "AI ON" : "AI OFF"}
      </button>
    </section>
  );
}
