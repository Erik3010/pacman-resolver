import { ref, onMounted, onUnmounted } from "vue";

const useShiftKey = () => {
  const isShiftKeyPressed = ref(false);

  const shiftKeyHandler = (event: KeyboardEvent) => {
    isShiftKeyPressed.value = event.shiftKey;
  };

  onMounted(() => {
    window.addEventListener("keyup", shiftKeyHandler);
    window.addEventListener("keydown", shiftKeyHandler);
  });
  onUnmounted(() => {
    window.removeEventListener("keyup", shiftKeyHandler);
    window.removeEventListener("keydown", shiftKeyHandler);
  });

  return { isShiftKeyPressed };
};

export default useShiftKey;
