import { useRef, useState } from "react";
import { useProductForm } from "../../../hooks/useProductForm";
import {
  checkImageFile,
  readProductImage,
} from "../../../utils/imageFile";
import {
  PRODUCT_LIMITS,
  buildProduct,
} from "../../../utils/validateProduct";

const inputClass =
  "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-400";

const FIELD_ORDER = [
  "title",
  "categoryId",
  "price",
  "quantity",
  "description",
  "brand",
  "image",
];

function Field({ id, label, error, hint, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-xs text-gray-500">{hint}</p>
      )}
    </div>
  );
}

function ProductForm({
  categories,
  onSubmit,
  isSaving,
  submitError,
  initialValues,
  requireImage = true,
  submitLabel = "Добавить товар",
  resetLabel = "Очистить форму",
  onCancel,
}) {
  const {
    values,
    errors,
    isValid,
    getError,
    dispatch,
    reset: resetForm,
  } = useProductForm({ initialValues, requireImage });
  const fileInputRef = useRef(null);
  const [isReadingImage, setIsReadingImage] = useState(false);
  const [fileError, setFileError] = useState(null);
  const imageError = fileError ?? getError("image");
  const isBusy = isSaving || isReadingImage;
  const imagePreview =
    values.imageSource === "file" ? values.image : values.imageUrl.trim();

  function fieldProps(field) {
    const error = getError(field);

    return {
      id: `product-${field}`,
      name: field,
      value: values[field],
      onChange: (event) =>
        dispatch({ type: "change", field, value: event.target.value }),
      onBlur: () => dispatch({ type: "blur", field }),
      "aria-invalid": error ? "true" : "false",
      "aria-describedby": error ? `product-${field}-error` : undefined,
      className: `${inputClass} ${error ? "border-red-400" : "border-gray-200"}`,
    };
  }

  async function handleImageChange(event) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;

    const problem = checkImageFile(file);
    if (problem) {
      setFileError(problem);
      dispatch({ type: "clearImage" });
      input.value = "";
      return;
    }

    setFileError(null);
    dispatch({ type: "clearImage" });
    setIsReadingImage(true);

    try {
      const image = await readProductImage(file);
      dispatch({ type: "setImage", image, imageName: file.name });
    } catch (error) {
      const detail =
        error instanceof Error ? ` ${error.message}` : "";
      setFileError(`Не удалось обработать фото.${detail}`);
    } finally {
      setIsReadingImage(false);
      input.value = "";
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (isBusy) return;

    dispatch({ type: "submit" });

    if (!isValid) {
      const firstInvalid = FIELD_ORDER.find((field) => errors[field]);
      const fieldId =
        firstInvalid === "image"
          ? values.imageSource === "file"
            ? "product-image-file-trigger"
            : "product-image-url"
          : `product-${firstInvalid}`;
      document.getElementById(fieldId)?.focus();
      return;
    }

    onSubmit(buildProduct(values));
  }

  function handleReset() {
    setFileError(null);
    resetForm();
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleImageSourceChange(imageSource) {
    setFileError(null);
    dispatch({ type: "change", field: "imageSource", value: imageSource });
    dispatch({ type: "clearImage" });
    dispatch({ type: "change", field: "imageUrl", value: "" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <Field id="product-title" label="Наименование" error={getError("title")}>
        <input
          type="text"
          placeholder="Например, ASUS Dual GeForce RTX 4070 OC"
          maxLength={PRODUCT_LIMITS.titleMax + 20}
          {...fieldProps("title")}
        />
      </Field>

      <Field
        id="product-categoryId"
        label="Категория"
        error={getError("categoryId")}
      >
        <select {...fieldProps("categoryId")}>
          <option value="">Выберите категорию</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="product-price"
          label="Стоимость, ₽"
          error={getError("price")}
          hint="Целое число рублей"
        >
          <input
            type="text"
            inputMode="numeric"
            placeholder="69990"
            {...fieldProps("price")}
          />
        </Field>

        <Field
          id="product-quantity"
          label="Количество, шт."
          error={getError("quantity")}
          hint="0 — товара нет в наличии"
        >
          <input
            type="text"
            inputMode="numeric"
            placeholder="10"
            {...fieldProps("quantity")}
          />
        </Field>
      </div>

      <Field
        id="product-description"
        label="Описание"
        error={getError("description")}
        hint={`${values.description.trim().length} / ${PRODUCT_LIMITS.descriptionMax}`}
      >
        <textarea
          rows={5}
          placeholder="Основные характеристики и особенности товара"
          {...fieldProps("description")}
        />
      </Field>

      <Field
        id="product-brand"
        label="Бренд"
        error={getError("brand")}
      >
        <input type="text" placeholder="Например, Samsung" {...fieldProps("brand")} />
      </Field>

      <fieldset className="space-y-3">
        <legend className="mb-1.5 text-sm font-medium text-gray-900">
          Фото товара
        </legend>
        <p className="text-xs text-gray-500">
          Загрузите файл изображения (до 5 МБ) или укажите ссылку.
        </p>

        <div className="flex flex-wrap gap-4 text-sm text-gray-700">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="product-image-source"
              value="file"
              checked={values.imageSource === "file"}
              onChange={() => handleImageSourceChange("file")}
            />
            Загрузить файл
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="product-image-source"
              value="url"
              checked={values.imageSource === "url"}
              onChange={() => handleImageSourceChange("url")}
            />
            Указать ссылку
          </label>
        </div>

        {values.imageSource === "file" ? (
          <div>
            <label
              htmlFor="product-image"
              className="mb-1.5 block text-sm font-medium text-gray-900"
            >
              Файл изображения
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <input
                ref={fileInputRef}
                id="product-image"
                name="image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                aria-label="Фото товара"
                tabIndex={-1}
                className="sr-only"
                onChange={handleImageChange}
                onBlur={() => dispatch({ type: "blur", field: "image" })}
              />
              <button
                id="product-image-file-trigger"
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isBusy}
                aria-invalid={imageError ? "true" : "false"}
                aria-describedby={
                  imageError ? "product-image-error" : undefined
                }
                className={`rounded-lg border px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 ${
                  imageError ? "border-red-400" : "border-gray-200"
                } disabled:cursor-wait disabled:opacity-50`}
              >
                Обзор
              </button>
              <span className="text-sm text-gray-500">
                {values.imageName || "Файл не выбран"}
              </span>
            </div>
          </div>
        ) : (
          <div>
            <label
              htmlFor="product-image-url"
              className="mb-1.5 block text-sm font-medium text-gray-900"
            >
              Ссылка на изображение
            </label>
            <input
              id="product-image-url"
              name="imageUrl"
              type="url"
              value={values.imageUrl ?? ""}
              onChange={(event) =>
                dispatch({
                  type: "change",
                  field: "imageUrl",
                  value: event.target.value,
                })
              }
              onBlur={() => dispatch({ type: "blur", field: "image" })}
              disabled={isBusy}
              placeholder="https://example.com/product.jpg"
              aria-invalid={imageError ? "true" : "false"}
              aria-describedby={
                imageError ? "product-image-error" : undefined
              }
              className={`${inputClass} ${
                imageError ? "border-red-400" : "border-gray-200"
              } disabled:opacity-50`}
            />
          </div>
        )}

        {imageError && (
          <p id="product-image-error" className="text-xs text-red-400">
            {imageError}
          </p>
        )}

        {isReadingImage && (
          <p className="text-xs text-gray-500">Загрузка фото…</p>
        )}

        {imagePreview && (
          <div className="flex items-start gap-4">
            <img
              src={imagePreview}
              alt="Предварительный просмотр фото товара"
              className="size-24 rounded-lg border border-gray-200 bg-white object-cover"
            />
            {values.imageName && (
              <p className="break-all text-xs text-gray-500">
                {values.imageName}
              </p>
            )}
          </div>
        )}
      </fieldset>

      {submitError && (
        <p
          role="alert"
          className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          {submitError}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={handleReset}
          disabled={isBusy}
          className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
        >
          {resetLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isBusy}
            className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            Отмена
          </button>
        )}
        <button
          type="submit"
          disabled={isBusy}
          className="rounded-lg bg-emerald-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-60"
        >
          {isSaving ? "Сохранение…" : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
