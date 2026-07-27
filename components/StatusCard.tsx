type StatusCardProps = {
  title: string;
  status: string;
};

export default function StatusCard({
  title,
  status,
}: StatusCardProps) {
  return (
    <section>
      <h3>{title}</h3>
      <p>{status}</p>
    </section>
  );
}
