import { ref, Ref } from "vue";

const usePromiseAnimation = (boxElement: Ref<HTMLDivElement | null>) => {
  const box = boxElement.value!;

  const transitionHandlerCallback = ref<(() => void) | null>(null);

  const transitionendHandler = (resolve: () => void) => {
    box.removeEventListener("transitionend", transitionHandlerCallback.value!);

    resolve();
  };

  const animate = (
    className: string,
    { unmountClass } = { unmountClass: false }
  ) => {
    return new Promise<void>((resolve) => {
      const props = !unmountClass ? "add" : "remove";
      box.classList[props](className);

      transitionHandlerCallback.value = transitionendHandler.bind(
        this,
        resolve
      );

      box.addEventListener("transitionend", transitionHandlerCallback.value);
    });
  };

  return { animate };
};

export default usePromiseAnimation;
