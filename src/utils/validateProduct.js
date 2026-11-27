export const PRODUCT_LIMITS = {
  titleMin: 3,
  titleMax: 100,
  priceMax: 10000000,
  quantityMax: 100000,
  descriptionMin: 10,
  descriptionMax: 1000,
  imageFileMaxSize: 5 * 1024 * 1024,
};

export const initialProductValues = {
  title: "",
  categoryId: "",
  price: "",
  quantity: "",
  description: "",
  imageSource: "file",
  imageFile: null,
  imageUrl: "",
};

export function validateProduct(values) {
  const errors = {};
  const title = values.title.trim();
  const price = values.price.trim();
  const quantity = values.quantity.trim();
  const description = values.description.trim();
  const imageSource = values.imageSource ?? initialProductValues.imageSource;
  const imageFile = values.imageFile ?? null;
  const imageUrl = (values.imageUrl ?? "").trim();

  if (!title) {
    errors.title = "Введите наименование товара";
  } else if (title.length < PRODUCT_LIMITS.titleMin) {
    errors.title = `Минимум ${PRODUCT_LIMITS.titleMin} символа`;
  } else if (title.length > PRODUCT_LIMITS.titleMax) {
    errors.title = `Максимум ${PRODUCT_LIMITS.titleMax} символов`;
  }

  if (!values.categoryId) {
    errors.categoryId = "Выберите категорию";
  }

  if (!price) {
    errors.price = "Введите стоимость";
  } else if (!/^\d+$/.test(price)) {
    errors.price = "Только целое число рублей, без пробелов и знаков";
  } else if (Number(price) <= 0) {
    errors.price = "Стоимость должна быть больше нуля";
  } else if (Number(price) > PRODUCT_LIMITS.priceMax) {
    errors.price = "Слишком большая стоимость";
  }

  if (!quantity) {
    errors.quantity = "Введите количество";
  } else if (!/^\d+$/.test(quantity)) {
    errors.quantity = "Только целое неотрицательное число";
  } else if (Number(quantity) > PRODUCT_LIMITS.quantityMax) {
    errors.quantity = "Слишком большое количество";
  }

  if (!description) {
    errors.description = "Введите описание товара";
  } else if (description.length < PRODUCT_LIMITS.descriptionMin) {
    errors.description = `Минимум ${PRODUCT_LIMITS.descriptionMin} символов`;
  } else if (description.length > PRODUCT_LIMITS.descriptionMax) {
    errors.description = `Максимум ${PRODUCT_LIMITS.descriptionMax} символов`;
  }

  if (imageSource === "file") {
    if (!imageFile) {
      errors.image = "Выберите файл с изображением";
    } else if (!imageFile.type?.startsWith("image/")) {
      errors.image = "Выберите файл изображения";
    } else if (imageFile.size === 0) {
      errors.image = "Файл изображения пуст";
    } else if (imageFile.size > PRODUCT_LIMITS.imageFileMaxSize) {
      errors.image = "Размер изображения не должен превышать 5 МБ";
    }
  } else if (!imageUrl) {
    errors.image = "Укажите ссылку на изображение";
  } else {
    try {
      const url = new URL(imageUrl);
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        errors.image = "Используйте ссылку, начинающуюся с http:// или https://";
      }
    } catch {
      errors.image = "Введите корректную ссылку на изображение";
    }
  }

  return errors;
}

export function buildProduct(values) {
  const quantity = Number(values.quantity);
  const imageSource = values.imageSource ?? initialProductValues.imageSource;
  const imageUrl = (values.imageUrl ?? "").trim();

  return {
    title: values.title.trim(),
    categoryId: Number(values.categoryId),
    price: Number(values.price),
    quantity,
    inStock: quantity > 0,
    description: values.description.trim(),
    image: imageSource === "file" ? values.imageFile ?? null : imageUrl,
  };
}
