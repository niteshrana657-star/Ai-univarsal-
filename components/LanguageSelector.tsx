type LanguageSelectorProps = {
  language: string;
  onChange?: (language: string) => void;
};

export default function LanguageSelector({
  language,
  onChange,
}: LanguageSelectorProps) {
  return (
    <section>
      <label>Language</label>
      <select
        value={language}
        onChange={(e) => onChange?.(e.target.value)}
      >
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="ta">Tamil</option>
        <option value="te">Telugu</option>
        <option value="bn">Bengali</option>
      </select>
    </section>
  );
}
