type AIStatusProps = {
  status: "online" | "offline" | "processing";
};

export default function AIStatus({
  status,
}: AIStatusProps) {
  return (
    <section>
      <h3>AI Status</h3>
      <p>{status}</p>
    </section>
  );
}
