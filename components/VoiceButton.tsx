type VoiceButtonProps = {
  onPress?: () => void;
};

export default function VoiceButton({
  onPress,
}: VoiceButtonProps) {
  return (
    <button onClick={onPress}>
      🎤 Voice Assistant
    </button>
  );
}
