type ConnectionStatusProps = {
  connected: boolean;
};

export default function ConnectionStatus({
  connected,
}: ConnectionStatusProps) {
  return (
    <section>
      <h3>Connection Status</h3>
      <p>{connected ? "Connected" : "Disconnected"}</p>
    </section>
  );
}
