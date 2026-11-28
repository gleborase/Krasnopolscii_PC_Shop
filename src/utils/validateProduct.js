export const PRODUCT_LIMITS = {
  titleMin: 3,
  titleMax: 100,
  brandMin: 2,
  brandMax: 50,
  priceMax: 10000000,
  quantityMax: 100000,
  descriptionMin: 10,
  descriptionMax: 1000,
};

export const initialProductValues = {
  image: "",
  imageName: "",
  imageSource: "file",
  imageUrl: "",
  title: "",
  brand: "",
  categoryId: "",
  price: "",
  quantity: "",
  description: "",
};

export function validateProduct(values, { requireImage = true } = {}) {
  const errors = {};
  const title = values.title.trim();
  const brand = values.brand.trim();
  const price = values.price.trim();
  const quantity = values.quantity.trim();
  const description = values.description.trim();
  const imageSource = values.imageSource ?? initialProductValues.imageSource;
  const imageUrl = (values.imageUrl ?? "").trim();

  if (requireImage && imageSource === "file" && !values.image) {
    errors.image = "Выберите фото товара";
  } else if (requireImage && imageSource === "url" && !imageUrl) {
    errors.image = "Укажите ссылку на изображение";
  } else if (imageSource === "url" && imageUrl) {
    try {
      const url = new URL(imageUrl);
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        errors.image = "Используйте ссылку, начинающуюся с http:// или https://";
      }
    } catch {
      errors.image = "Введите корректную ссылку на изображение";
    }
  }

  if (!title) {
    errors.title = "Введите наименование товара";
  } else if (title.length < PRODUCT_LIMITS.titleMin) {
    errors.title = `Минимум ${PRODUCT_LIMITS.titleMin} символа`;
  } else if (title.length > PRODUCT_LIMITS.titleMax) {
    errors.title = `Максимум ${PRODUCT_LIMITS.titleMax} символов`;
  }

  if (!brand) {
    errors.brand = "Введите бренд";
  } else if (brand.length < PRODUCT_LIMITS.brandMin) {
    errors.brand = `Минимум ${PRODUCT_LIMITS.brandMin} символа`;
  } else if (brand.length > PRODUCT_LIMITS.brandMax) {
    errors.brand = `Максимум ${PRODUCT_LIMITS.brandMax} символов`;
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

  return errors;
}

export function buildProduct(values) {
  const quantity = Number(values.quantity);
  const imageSource = values.imageSource ?? initialProductValues.imageSource;
  const imageUrl = (values.imageUrl ?? "").trim();

  return {
    title: values.title.trim(),
    brand: values.brand.trim(),
    categoryId: Number(values.categoryId),
    price: Number(values.price),
    quantity,
    inStock: quantity > 0,
    description: values.description.trim(),
    image: imageSource === "file" ? values.image : imageUrl,
  };
}
