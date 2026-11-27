import { useRef } from "react";
import { useProductForm } from "../../../hooks/useProductForm";
import {
  PRODUCT_LIMITS,
  buildProduct,
} from "../../../utils/validateProduct";

const inputClass =
  "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-400";

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

function ProductForm({ categories, onSubmit }) {
  const { values, errors, isValid, getError, dispatch } = useProductForm();
  const fileInputRef = useRef(null);

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

  function handleSubmit(event) {
    event.preventDefault();
    dispatch({ type: "submit" });

    if (!isValid) {
      const firstInvalid = Object.keys(errors)[0];
      const fieldId =
        firstInvalid === "image"
          ? values.imageSource === "file"
            ? "product-image-file-trigger"
            : "product-image-url"
          : `product-${firstInvalid}`;
      document.getElementById(fieldId)?.focus();
      return;
    }

    const product = buildProduct(values);
    onSubmit({
      ...product,
      imagePreview:
        values.imageSource === "file"
          ? URL.createObjectURL(values.imageFile)
          : values.imageUrl.trim(),
      imageName: values.imageSource === "file" ? values.imageFile.name : "",
    });
  }

  function handleReset() {
    dispatch({ type: "reset" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleImageSourceChange(imageSource) {
    dispatch({ type: "change", field: "imageSource", value: imageSource });
    dispatch({ type: "change", field: "imageFile", value: null });
    dispatch({ type: "change", field: "imageUrl", value: "" });
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
            <p className="mb-1.5 text-sm font-medium text-gray-900">
              Файл изображения
            </p>
            <input
              ref={fileInputRef}
              id="product-image-file"
              name="imageFile"
              type="file"
              accept="image/*"
              aria-label="Файл изображения"
              tabIndex={-1}
              className="sr-only"
              onChange={(event) =>
                dispatch({
                  type: "change",
                  field: "imageFile",
                  value: event.target.files?.[0] ?? null,
                })
              }
              onBlur={() => dispatch({ type: "blur", field: "image" })}
            />
            <div className="flex flex-wrap items-center gap-3">
              <button
                id="product-image-file-trigger"
                type="button"
                onClick={() => fileInputRef.current?.click()}
                aria-invalid={getError("image") ? "true" : "false"}
                aria-describedby={
                  getError("image") ? "product-image-error" : undefined
                }
                className={`rounded-lg border px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 ${
                  getError("image") ? "border-red-400" : "border-gray-200"
                }`}
              >
                Обзор
              </button>
              <span className="text-sm text-gray-500">
                {values.imageFile?.name ?? "Файл не выбран"}
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
              placeholder="https://example.com/product.jpg"
              aria-invalid={getError("image") ? "true" : "false"}
              aria-describedby={
                getError("image") ? "product-image-error" : undefined
              }
              className={`${inputClass} ${
                getError("image") ? "border-red-400" : "border-gray-200"
              }`}
            />
          </div>
        )}

        {getError("image") && (
          <p id="product-image-error" className="text-xs text-red-400">
            {getError("image")}
          </p>
        )}
      </fieldset>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
        >
          Очистить форму
        </button>
        <button
          type="submit"
          className="rounded-lg bg-emerald-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
        >
          Добавить товар
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
