type NotificationCardProps = {
  title: string;
  message: string;
};

export default function NotificationCard({
  title,
  message,
}: NotificationCardProps) {
  return (
    <section>
      <h3>{title}</h3>
      <p>{message}</p>
    </section>
  );
}
