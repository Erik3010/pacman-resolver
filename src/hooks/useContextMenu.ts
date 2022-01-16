import { ref, computed, Ref, onUnmounted } from "vue";

export default function useContextMenu(
  wheelEl: Ref<HTMLDivElement>,
  initialVisible: Boolean
) {
  const isVisible = ref(initialVisible || false);
  const position = ref({ top: 0, left: 0 });

  const positionStyle = computed(() => {
    const { top, left } = position.value;
    return {
      top: `${top}px`,
      left: `${left}px`,
    };
  });

  const clickHandler = (event: MouseEvent) => {
    event.stopPropagation();

    if (!isVisible.value) return;

    const target = <HTMLInputElement>event.target;
    const element = <HTMLInputElement>wheelEl.value;

    !element.contains(target) && (isVisible.value = false);
  };

  const contextMenuHandler = (event: MouseEvent) => {
    event.preventDefault();

    const { offsetX, offsetY } = event;
    position.value = { top: offsetX, left: offsetY };

    isVisible.value = true;
  };

  window.addEventListener("click", clickHandler);
  window.addEventListener("contextmenu", contextMenuHandler);

  onUnmounted(() =>
    window.removeEventListener("contextmenu", contextMenuHandler)
  );

  return { isVisible, position, positionStyle };
}
