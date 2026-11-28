export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const MAX_SIDE = 900;
const QUALITY = 0.85;
const LOAD_TIMEOUT_MS = 3000;

export function checkImageFile(file) {
  if (!IMAGE_TYPES.includes(file.type)) {
    return "Допустимы изображения JPG, PNG или WebP";
  }

  if (file.size === 0) {
    return "Файл изображения пуст";
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return "Размер файла не должен превышать 5 МБ";
  }

  return null;
}

function readAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("Не удалось прочитать изображение"));
        return;
      }

      resolve(reader.result);
    };
    reader.onerror = () =>
      reject(reader.error ?? new Error("Не удалось прочитать изображение"));
    reader.readAsDataURL(file);
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const timer = setTimeout(
      () => reject(new Error("Загрузка изображения заняла слишком долго")),
      LOAD_TIMEOUT_MS,
    );

    image.onload = () => {
      clearTimeout(timer);
      if (!image.naturalWidth || !image.naturalHeight) {
        reject(new Error("У изображения некорректный размер"));
        return;
      }
      resolve(image);
    };
    image.onerror = () => {
      clearTimeout(timer);
      reject(new Error("Не удалось открыть изображение"));
    };
    image.src = src;
  });
}

export async function readProductImage(file) {
  const original = await readAsDataUrl(file);
  const image = await loadImage(original);
  const scale = Math.min(1, MAX_SIDE / Math.max(image.naturalWidth, image.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Браузер не смог обработать изображение");
  }

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  const compressed = canvas.toDataURL("image/jpeg", QUALITY);
  if (!compressed.startsWith("data:image/jpeg;base64,")) {
    throw new Error("Не удалось сжать изображение");
  }

  return compressed.length < original.length ? compressed : original;
}
