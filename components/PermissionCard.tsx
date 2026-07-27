type PermissionCardProps = {
  permission: string;
  granted: boolean;
};

export default function PermissionCard({
  permission,
  granted,
}: PermissionCardProps) {
  return (
    <section>
      <h3>{permission}</h3>
      <p>{granted ? "Granted" : "Not Granted"}</p>
    </section>
  );
}
