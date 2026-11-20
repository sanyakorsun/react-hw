import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type CheckoutFormData } from "../schemas/checkoutSchema";

export default function CheckoutForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields, isValid, isDirty, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      phone: "",
      city: "",
      paymentMethod: undefined,
      comment: "",
    },
  });

  const getControlClass = (fieldName: keyof CheckoutFormData) => {
    if (errors[fieldName]) return "input-control error";
    if (dirtyFields[fieldName]) return "input-control success";
    return "input-control";
  };

  const onSubmit = async (data: CheckoutFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Дані замовлення:", data);
    alert(`Замовлення підтверджено!\n\n${JSON.stringify(data, null, 2)}`);
    reset();
  };

  return (
    <div className="container">
      <form id="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1>Оформлення замовлення</h1>
        <p className="subtitle">Заповніть дані для доставки товару</p>

        <div className={getControlClass("fullName")}>
          <label htmlFor="fullName">ПІБ отримувача</label>
          <input
            id="fullName"
            type="text"
            placeholder="Іван Петренко"
            {...register("fullName")}
          />
          <div className="error">{errors.fullName?.message}</div>
        </div>

        <div className={getControlClass("phone")}>
          <label htmlFor="phone">Номер телефону</label>
          <input
            id="phone"
            type="tel"
            placeholder="+380XXXXXXXXX"
            {...register("phone")}
          />
          <div className="error">{errors.phone?.message}</div>
        </div>

        <div className={getControlClass("city")}>
          <label htmlFor="city">Місто та відділення доставки</label>
          <input
            id="city"
            type="text"
            placeholder="Київ, відділення №12"
            {...register("city")}
          />
          <div className="error">{errors.city?.message}</div>
        </div>

        <div className={getControlClass("paymentMethod")}>
          <label htmlFor="paymentMethod">Спосіб оплати</label>
          <select id="paymentMethod" {...register("paymentMethod")}>
            <option value="">Оберіть спосіб оплати...</option>
            <option value="card">Оплата карткою онлайн</option>
            <option value="cod">Післяплата (при отриманні)</option>
            <option value="invoice">Безготівковий розрахунок</option>
          </select>
          <div className="error">{errors.paymentMethod?.message}</div>
        </div>

        <div className={getControlClass("comment")}>
          <label htmlFor="comment">Коментар до замовлення</label>
          <textarea
            id="comment"
            rows={3}
            placeholder="Побажання щодо доставки (необов'язково)"
            {...register("comment")}
          ></textarea>
          <div className="error">{errors.comment?.message}</div>
        </div>

        <button type="submit" disabled={!isValid || !isDirty || isSubmitting}>
          Підтвердити замовлення
        </button>
      </form>
    </div>
  );
}
