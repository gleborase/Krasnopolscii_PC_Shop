import { useCallback, useState } from "react";
import { useOrders } from "./useAdminContent";
import { updateOrderStatus } from "../api/ordersApi";
import { getErrorMessage } from "../api/http";

export function useAdminOrders() {
  const { data, isLoading, error, refetch: reloadOrders } = useOrders();
  const [changes, setChanges] = useState({});
  const [pendingIds, setPendingIds] = useState([]);
  const [notice, setNotice] = useState(null);
  const [actionError, setActionError] = useState(null);

  const orders = (data ?? []).map((order) => changes[order.id] ?? order);

  const refetch = useCallback(() => {
    setChanges({});
    reloadOrders();
  }, [reloadOrders]);

  const updateStatus = useCallback(async (order, status) => {
    if (order.status === status) return;

    setPendingIds((ids) => [...ids, order.id]);
    setNotice(null);
    setActionError(null);

    try {
      const updated = await updateOrderStatus(order.id, status);
      setChanges((prev) => ({ ...prev, [order.id]: updated }));
      setNotice(`Статус заказа ${order.id} изменён на «${status}»`);
    } catch (err) {
      setActionError(
        `Не удалось изменить статус заказа ${order.id}. ${getErrorMessage(err)}`,
      );
    } finally {
      setPendingIds((ids) => ids.filter((id) => id !== order.id));
    }
  }, []);

  const clearMessages = useCallback(() => {
    setNotice(null);
    setActionError(null);
  }, []);

  return {
    orders,
    isLoading,
    error,
    refetch,
    pendingIds,
    notice,
    actionError,
    updateStatus,
    clearMessages,
  };
}
