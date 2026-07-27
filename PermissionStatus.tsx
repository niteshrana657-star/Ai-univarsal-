type PermissionStatusProps = {
  name: string;
  granted: boolean;
};

export default function PermissionStatus({
  name,
  granted,
}: PermissionStatusProps) {
  return (
    <section>
      <h4>{name}</h4>
      <p>Status: {granted ? "Granted" : "Denied"}</p>
    </section>
  );
}
