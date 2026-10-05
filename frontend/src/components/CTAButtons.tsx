interface CTAButtonsProps {
  saving: boolean;
  onSave: () => void;
}

export default function CTAButtons({ saving, onSave }: CTAButtonsProps) {
  return (
    <button
      onClick={onSave}
      disabled={saving}
      className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white px-5 py-2 rounded-lg text-xs font-medium shadow-sm shadow-indigo-200 transition-all flex items-center gap-2"
    >
      {saving && <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
      {saving ? 'Saving...' : 'Save Changes'}
    </button>
  );
}