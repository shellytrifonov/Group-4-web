/**
 * ShoppingList - displaying the user's shopping lists.
 */
import { useShoppingList } from '../hooks/shopping-list/useShoppingList';
import { ShoppingListItem } from '../components/shopping-list/ShoppingListItem';
import Loading from "../components/shared/Loading";

export default function ShoppingList() {
  const {
    loading,
    error,
    shoppingLists,
    handleDelete,
    handlePrint,
    formatDate
  } = useShoppingList();

  // If there are no shopping lists, show an empty state message
  if (shoppingLists.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Shopping List</h1>
        <p className="text-gray-600">Your shopping list is empty</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Loading loading={loading} error={error} />
      {!loading && !error && (
        <>
          <h1 className="text-3xl font-bold text-center mb-8">Shopping List</h1>
          <div className="space-y-6">
            {shoppingLists.map((list) => (
              <ShoppingListItem
                key={list._id}
                list={list}
                onDelete={handleDelete}
                onPrint={handlePrint}
                formatDate={formatDate}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}