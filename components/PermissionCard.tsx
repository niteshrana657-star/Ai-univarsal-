type PermissionCardProps = {
  permission?: string;
  granted?: boolean;

  // Permission Center display props
  title?: string;
  description?: string;
  status?: string;
};

export default function PermissionCard({
  permission,
  granted,
  title,
  description,
  status,
}: PermissionCardProps) {
  const displayTitle = title ?? permission ?? "Permission";
  const displayStatus =
    status ?? (granted ? "Granted" : "Not Granted");

  return (
    <section className="rounded-lg border p-4 space-y-2">
      <h3 className="font-semibold">
        {displayTitle}
      </h3>

      {description && (
        <p className="text-sm text-gray-500">
          {description}
        </p>
      )}

      <p className="text-sm">
        {displayStatus}
      </p>
    </section>
  );
}
