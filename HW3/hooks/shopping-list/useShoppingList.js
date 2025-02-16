/**
 * Custom hook for managing shopping lists.
 * Handles fetching, deleting, and printing shopping lists.
 * Includes error handling and loading states.
 * Features print functionality with custom styling.
 * @returns {Object} Shopping lists data and management functions
 */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Helper function to escape HTML special characters
const escapeHtml = (unsafe) => {
  if (typeof unsafe !== 'string') return '';
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export const useShoppingList = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [shoppingLists, setShoppingLists] = useState([]);

  const handleDelete = async (listId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await fetch(
        `/api/shopping-list?listId=${listId}&userId=${user.email}`,
        { method: "DELETE" }
      );
  
      if (response.ok) {
        setShoppingLists((prev) => prev.filter(list => list._id !== listId));
      } else {
        console.error("Failed to delete shopping list");
      }
    } catch (error) {
      console.error("Error deleting shopping list:", error);
    }
  };

  const handlePrint = (list) => {
    if (!list || !list.items) {
      console.error('Invalid shopping list data');
      return;
    }

    const styles = `
      body {
        font-family: Arial, sans-serif;
        margin: 20px;
        background-color: #ffffff;
        color: #2b2929;
        text-align: center;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      
      .printList {
        background-color: white;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        text-align: center;
        max-width: 800px;
        margin: 0 auto;
      }
      
      .printList h1 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }
      
      .printList-time {
        color: #6b7280;
        font-size: 0.875rem;
        margin-bottom: 1rem;
      }
  
      ul {
        list-style-type: none;
        width: 100%;
        margin: 1rem auto;
        padding: 0;
        text-align: left;
      }
      
      .list-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        padding: 0.5rem;
        border-bottom: 1px solid #eee;
      }
      
      .list-item span {
        font-size: 1rem;
      }

      @media print {
        body {
          margin: 0;
          padding: 1rem;
        }
        .list-item {
          break-inside: avoid;
        }
      }
    `;

    try {
      // Remove any existing print iframe
      const existingIframe = document.getElementById('print-frame');
      if (existingIframe) {
        document.body.removeChild(existingIframe);
      }

      // Create and setup new iframe
      const iframe = document.createElement('iframe');
      iframe.id = 'print-frame';
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = 'none';

      document.body.appendChild(iframe);

      const content = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>${escapeHtml(list.recipeName)} - Shopping List</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>${styles}</style>
          </head>
          <body>
            <div class="printList">
              <h1>${escapeHtml(list.recipeName)}</h1>
              <div class="printList-time">
                Created: ${new Date(list.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <hr/>
              <ul>
                ${list.items
                  .map(
                    (item) => `
                      <li class="list-item">
                        <span>${escapeHtml(item.ingredientName)}</span>
                        <span>${escapeHtml(item.amount)} ${escapeHtml(item.unit)}</span>
                      </li>
                    `
                  )
                  .join("")}
              </ul>
            </div>
          </body>
        </html>
      `;

      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(content);
      doc.close();

      // Wait for content to be fully loaded before printing
      iframe.onload = () => {
        setTimeout(() => {
          iframe.contentWindow.print();
          // Remove iframe after printing dialog is closed
          setTimeout(() => {
            document.body.removeChild(iframe);
          }, 1000);
        }, 250);
      };
    } catch (error) {
      console.error('Error printing shopping list:', error);
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  useEffect(() => {
    const fetchShoppingLists = async () => {
      const user = localStorage.getItem('user') 
        ? JSON.parse(localStorage.getItem('user')) 
        : null;
    
      if (!user) {
        setError("User not logged in.");
        router.push('/auth/login');
        return;
      }
    
      try {
        const response = await fetch(`/api/shopping-list?userId=${user.email}`, {
          method: "GET",
        });
    
        if (!response.ok) {
          throw new Error(`Failed to fetch shopping lists: ${response.status}`);
        }
    
        const data = await response.json();
        setShoppingLists(data);
      } catch (error) {
        console.error('Error fetching shopping lists:', error);
        setError('Failed to fetch shopping lists. Please try again later.');
      } finally {
        setLoading(false);
      }
    };    

    fetchShoppingLists();
  }, [router]);

  return {
    loading,
    error,
    shoppingLists,
    handleDelete,
    handlePrint,
    formatDate
  };
};
