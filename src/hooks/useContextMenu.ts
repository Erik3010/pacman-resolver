import { ref, computed, Ref, onUnmounted, nextTick } from "vue";
import {
  ContextMenuPosition,
  ContextMenuPositionStyle,
} from "@/types/ContextMenu";

const useContextMenu = ({
  element,
  initialVisible,
  cantOpenContextMenu,
}: {
  element: Ref<HTMLDivElement | null>;
  initialVisible: Boolean;
  cantOpenContextMenu: () => boolean;
}) => {
  const isVisible = ref(initialVisible || false);
  const position = ref<ContextMenuPosition>({ top: 0, left: 0 });

  const positionStyle = computed<ContextMenuPositionStyle>(() => {
    const { top, left } = position.value;
    return {
      top: `${top}px`,
      left: `${left}px`,
    };
  });

  const calculateContextMenuPosition = (
    contextMenuPosition: ContextMenuPosition
  ) => {
    const el = <HTMLInputElement>element.value;
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

  const closeContextMenu = () => (isVisible.value = false);

  const clickHandler = (event: MouseEvent) => {
    event.stopPropagation();

    if (!isVisible.value) return;

    const target = <HTMLInputElement>event.target;
    const el = <HTMLInputElement>element.value;

    !el.contains(target) && closeContextMenu();
  };

  const contextMenuHandler = async (event: MouseEvent) => {
    event.preventDefault();

    if (cantOpenContextMenu()) return;

    const targetPosition = {
      top: event.pageY,
      left: event.pageX,
    };

    isVisible.value && closeContextMenu();

    await nextTick();

    isVisible.value = true;
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
    closeContextMenu,
  };
};

export default useContextMenu;
