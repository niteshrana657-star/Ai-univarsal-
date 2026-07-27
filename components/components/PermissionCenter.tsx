import PermissionCard from "./PermissionCard";

const permissions = [
  {
    title: "Accessibility Service",
    description:
      "Allows AI Companion to understand screen interactions and provide assistance.",
    status: "Not Granted",
  },
  {
    title: "Screen Capture",
    description:
      "Allows AI Companion to analyze screen content when you allow it.",
    status: "Not Granted",
  },
  {
    title: "Overlay Permission",
    description:
      "Allows AI Companion floating assistant features.",
    status: "Not Granted",
  },
  {
    title: "Notification Access",
    description:
      "Allows AI Companion to understand important notifications.",
    status: "Not Granted",
  },
  {
    title: "Microphone Permission",
    description:
      "Required for voice commands and AI conversation.",
    status: "Not Granted",
  },
  {
    title: "Camera Permission",
    description:
      "Required for camera-based AI features.",
    status: "Not Granted",
  },
  {
    title: "Storage / File Access",
    description:
      "Allows AI Companion to work with user selected files.",
    status: "Not Granted",
  },
];

export default function PermissionCenter() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">
          Permission Center
        </h1>

        <p className="text-gray-500">
          Manage AI Companion permissions securely.
        </p>
      </div>

      {permissions.map((permission) => (
        <PermissionCard
          key={permission.title}
          title={permission.title}
          description={permission.description}
          status={permission.status}
        />
      ))}
    </div>
  );
}
