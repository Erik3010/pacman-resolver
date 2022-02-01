import { ref, onMounted, onUnmounted } from "vue";

const useShiftKey = () => {
  const isShiftKeyPressed = ref(false);

  const keyDownHandler = (event: KeyboardEvent) => {
    isShiftKeyPressed.value = event.shiftKey;
  };

  onMounted(() => window.addEventListener("keydown", keyDownHandler));
  onUnmounted(() => window.removeEventListener("keydown", keyDownHandler));

  return { isShiftKeyPressed };
};

export default useShiftKey;
