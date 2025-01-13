// api.js
export const fetchProducts = async (token) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/get/products", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return response.ok ? result : null;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

export const fetchSwapRequests = async (token) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/getAllswap", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return response.ok ? result : null;
  } catch (error) {
    console.error("Error fetching swap requests:", error);
    return null;
  }
};

export const handleRequestAction = async (requestId, action, token) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/acceptswap/${requestId}?action=${action}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();
    return response.ok ? result : null;
  } catch (error) {
    console.error("Error updating swap request:", error);
    return null;
  }
};
