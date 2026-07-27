type PrivacyIndicatorProps = {
  enabled: boolean;
};

export default function PrivacyIndicator({
  enabled,
}: PrivacyIndicatorProps) {
  return (
    <section>
      <h3>Privacy</h3>
      <p>{enabled ? "Protected" : "Inactive"}</p>
    </section>
  );
}
