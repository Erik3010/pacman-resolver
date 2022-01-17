import { ref, computed, Ref, onUnmounted, nextTick } from "vue";

export default function useContextMenu(
  wheelElement: Ref<HTMLDivElement | null>,
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

  const calculateContextMenuPosition = () => {};

  const clickHandler = (event: MouseEvent) => {
    event.stopPropagation();

    if (!isVisible.value) return;

    const target = <HTMLInputElement>event.target;
    const el = <HTMLInputElement>wheelElement.value;

    !el.contains(target) && (isVisible.value = false);
  };

  const contextMenuHandler = async (event: MouseEvent) => {
    event.preventDefault();

    const targetPosition = {
      top: event.pageY,
      left: event.pageX,
    };

    isVisible.value = true;

    await nextTick();

    const el = <HTMLInputElement>wheelElement.value;
    const height = el.clientHeight;
    const width = el.clientWidth;

    if (targetPosition.top + height >= window.innerHeight) {
      targetPosition.top -= height;
    }

    if (targetPosition.left + width >= window.innerWidth) {
      targetPosition.left -= width;
    }

    position.value = targetPosition;
  };

  window.addEventListener("click", clickHandler);
  window.addEventListener("contextmenu", contextMenuHandler);

  onUnmounted(() =>
    window.removeEventListener("contextmenu", contextMenuHandler)
  );

  return { isVisible, position, positionStyle };
}
