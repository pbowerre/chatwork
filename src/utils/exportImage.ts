import { toPng, toJpeg } from 'html-to-image';

export const exportAsImage = async (
  elementId: string,
  filename: string,
  format: 'png' | 'jpg' = 'png',
  scale: number = 2
) => {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Element not found');

  // Small delay to ensure all animations and images are loaded
  await new Promise(r => setTimeout(r, 100));

  const options = {
    pixelRatio: scale,
    quality: 0.95,
    skipFonts: false,
    style: {
      transform: 'scale(1)',
      transformOrigin: 'top left',
    }
  };

  try {
    const dataUrl = format === 'png' 
      ? await toPng(element, options)
      : await toJpeg(element, options);
      
    const link = document.createElement('a');
    link.download = `${filename}.${format}`;
    link.href = dataUrl;
    link.click();
    return true;
  } catch (error) {
    console.error('Failed to export image:', error);
    throw error;
  }
};
