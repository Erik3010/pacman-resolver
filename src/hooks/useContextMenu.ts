import { ref, computed, watch, Ref, onUnmounted, nextTick } from "vue";

interface ContextMenuPosition {
  top: number;
  left: number;
}

interface ContextMenuPositionStyle {
  top: string;
  left: string;
}

export default function useContextMenu(
  wheelElement: Ref<HTMLDivElement | null>,
  initialVisible: Boolean
) {
  const isVisible = ref(initialVisible || false);
  const isForceClose = ref(false);
  const position = ref<ContextMenuPosition>({ top: 0, left: 0 });
  let tempPosition: ContextMenuPosition | null = null;

  const positionStyle = computed<ContextMenuPositionStyle>(() => {
    const { top, left } = position.value;
    return {
      top: `${top}px`,
      left: `${left}px`,
    };
  });

  watch(isForceClose, async (val) => {
    if (!val) return;

    await nextTick();

    isVisible.value = true;
    isForceClose.value = false;

    calculateContextMenuPosition(tempPosition!);
    tempPosition = null;
  });

  const calculateContextMenuPosition = (
    contextMenuPosition: ContextMenuPosition
  ) => {
    const el = <HTMLInputElement>wheelElement.value;
    const height = el.clientHeight;
    const width = el.clientWidth;

    if (contextMenuPosition.top + height >= window.innerHeight) {
      contextMenuPosition.top -= height;
    }

    if (contextMenuPosition.left + width >= window.innerWidth) {
      contextMenuPosition.left -= width;
    }

    position.value = contextMenuPosition;
  };

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

    if (isVisible.value) {
      isVisible.value = false;
      isForceClose.value = true;
      tempPosition = targetPosition;
      return;
    }

    isVisible.value = true;

    await nextTick();

    calculateContextMenuPosition(targetPosition);
  };

  window.addEventListener("click", clickHandler);
  window.addEventListener("contextmenu", contextMenuHandler);

  onUnmounted(() =>
    window.removeEventListener("contextmenu", contextMenuHandler)
  );

  return {
    isVisible,
    position,
    positionStyle,
  };
}
