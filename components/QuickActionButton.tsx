type QuickActionButtonProps = {
  title: string;
  onPress?: () => void;
};

export default function QuickActionButton({
  title,
  onPress,
}: QuickActionButtonProps) {
  return (
    <button onClick={onPress}>
      {title}
    </button>
  );
}
