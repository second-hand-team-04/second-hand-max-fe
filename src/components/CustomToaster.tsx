import { Toaster } from "react-hot-toast";
import { useTheme } from "styled-components";

export default function CustomToaster() {
  const { font, color } = useTheme();

  return (
    <Toaster
      position="top-center"
      containerStyle={{
        position: "absolute",
        top: "150px",
        font: font.displayDefault16,
        color: color.neutral.text,
      }}
      toastOptions={{
        success: {
          style: {
            color: color.system.success,
          },
        },
        error: {
          style: {
            color: color.system.warning,
          },
        },
      }}
    />
  );
}
