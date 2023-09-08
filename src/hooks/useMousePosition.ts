import { ref, onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';  // 加type 只导入类型而不导入值

interface MousePosition {
    x: Ref<number>,
    y: Ref<number>,
};

function useMousePosition():MousePosition {
    let [x, y] = [ref(0), ref(0)];
    const updateMouse = (e: MouseEvent) => {
        x.value = e.pageX;
        y.value = e.pageY
    }
    onMounted(() =>  {
        addEventListener('click', updateMouse)
    })
    onUnmounted(() => {
        addEventListener('click', updateMouse)
    })
    return { x, y }
}

export default useMousePosition;