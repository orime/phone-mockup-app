import { RefObject } from 'react';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';

interface UseImageExportOptions {
  filename?: string;
  pixelRatio?: number;
  containerWidth?: number;
  containerHeight?: number;
}

// 修改泛型类型，使其适用于任何HTML元素
const useImageExport = <T extends HTMLElement>(
  elementRef: RefObject<T>,
  options: UseImageExportOptions = {}
) => {
  const { 
    filename = 'phone-mockup.png', 
    pixelRatio = 2,
    containerWidth,
    containerHeight
  } = options;

  const exportToPng = async () => {
    if (!elementRef.current) return;

    try {
      // 使用设置的容器尺寸
      const width = containerWidth || elementRef.current.clientWidth;
      const height = containerHeight || elementRef.current.clientHeight;
      
      const dataUrl = await toPng(elementRef.current, {
        quality: 0.95,
        pixelRatio,
        width,
        height,
        canvasWidth: width * pixelRatio,
        canvasHeight: height * pixelRatio,
        style: {
          width: `${width}px`,
          height: `${height}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
        filter: (node) => {
          // 确保只导出预览容器内的内容
          return !node.classList?.contains('control-panel');
        }
      });
      
      saveAs(dataUrl, filename);
    } catch (error) {
      console.error('导出图片失败:', error);
    }
  };

  const copyToClipboard = async () => {
    if (!elementRef.current) return;

    console.log('copyToClipboard', elementRef.current);
    console.log('elementRef', elementRef);

    try {
      // 使用设置的容器尺寸
      const width = containerWidth || elementRef.current.clientWidth;
      const height = containerHeight || elementRef.current.clientHeight;

      console.log('width', width);
      console.log('height', height);
      
      const dataUrl = await toPng(elementRef.current, {
        quality: 0.95,
        pixelRatio,
        width,
        height,
        canvasWidth: width * pixelRatio,
        canvasHeight: height * pixelRatio,
        style: {
          width: `${width}px`,
          height: `${height}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
        filter: (node) => {
          // 确保只导出预览容器内的内容
          return !node.classList?.contains('control-panel');
        }
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