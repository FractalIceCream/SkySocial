import { useTheme } from '../../utils/ThemeContext';
import { TOGGLE_THEME } from '../../utils/actions';

export default function ThemeComponent() {
  const [, dispatch] = useTheme(); // We only need the dispatch function

  const handleThemeToggle = () => {
    dispatch({ type: TOGGLE_THEME });
  };

  return (
    <button
      id="themeToggleBtn"
      onClick={handleThemeToggle}
      className="btn btn-secondary"
      type="button"
    >Toggle Theme
    </button>
  );
}