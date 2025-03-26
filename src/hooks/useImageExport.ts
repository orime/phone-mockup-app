import { RefObject } from 'react';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';

interface UseImageExportOptions {
  filename?: string;
  pixelRatio?: number;
}

// 修改泛型类型，使其适用于任何HTML元素
const useImageExport = <T extends HTMLElement>(
  elementRef: RefObject<T>,
  options: UseImageExportOptions = {}
) => {
  const { filename = 'phone-mockup.png', pixelRatio = 2 } = options;

  const exportToPng = async () => {
    if (!elementRef.current) return;

    try {
      // 获取容器实际尺寸
      const containerElement = elementRef.current;
      const containerWidth = containerElement.clientWidth;
      const containerHeight = containerElement.clientHeight;
      
      const dataUrl = await toPng(containerElement, {
        quality: 0.95,
        pixelRatio,
        width: containerWidth,
        height: containerHeight,
        canvasWidth: containerWidth * pixelRatio,
        canvasHeight: containerHeight * pixelRatio
      });
      
      saveAs(dataUrl, filename);
    } catch (error) {
      console.error('导出图片失败:', error);
    }
  };

  const copyToClipboard = async () => {
    if (!elementRef.current) return;

    try {
      // 获取容器实际尺寸
      const containerElement = elementRef.current;
      const containerWidth = containerElement.clientWidth;
      const containerHeight = containerElement.clientHeight;
      
      const dataUrl = await toPng(containerElement, {
        quality: 0.95,
        pixelRatio,
        width: containerWidth,
        height: containerHeight,
        canvasWidth: containerWidth * pixelRatio,
        canvasHeight: containerHeight * pixelRatio
      });
      
      const blob = await fetch(dataUrl).then(res => res.blob());
      
      // 使用剪贴板API复制图片
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
      
      alert('图片已复制到剪贴板');
    } catch (error) {
      console.error('复制到剪贴板失败:', error);
      alert('复制失败，请检查浏览器权限');
    }
  };

  return {
    exportToPng,
    copyToClipboard
  };
};

export default useImageExport; 